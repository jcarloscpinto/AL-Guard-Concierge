import type { AccessRole } from "@/lib/access/contracts";
import {
  createAssignmentMutationAttemptEvent,
  createAssignmentMutationOutcomeEvent,
  type AssignmentMutationAuditEvent,
} from "@/lib/audit/assignment-mutation-events";
import { appendAuditLogEvent } from "@/lib/audit/store";

export type PropertyAssignmentSnapshot = {
  tenant_id: string;
  user_id: string;
  property_ids: string[];
  version: number;
  updated_at: string;
};

export type AssignmentMutationOperation = "assign" | "revoke";

type AssignmentMutationBaseInput = {
  tenant_id: string;
  user_id: string;
  property_id: string;
  actor_id: string;
  actor_role: AccessRole;
  expected_version?: number;
};

export type AssignPropertyInput = AssignmentMutationBaseInput;
export type RevokePropertyInput = AssignmentMutationBaseInput;

export type AssignmentMutationSuccess = {
  ok: true;
  status: "assigned" | "already_assigned" | "revoked" | "already_revoked";
  snapshot: PropertyAssignmentSnapshot;
  audit_events: readonly [
    AssignmentMutationAuditEvent,
    AssignmentMutationAuditEvent,
  ];
};

export type AssignmentMutationConflict = {
  ok: false;
  reason: "conflict";
  snapshot: PropertyAssignmentSnapshot;
  audit_events: readonly [
    AssignmentMutationAuditEvent,
    AssignmentMutationAuditEvent,
  ];
};

export type AssignmentMutationResult =
  | AssignmentMutationSuccess
  | AssignmentMutationConflict;

type AssignmentState = {
  tenant_id: string;
  user_id: string;
  property_ids: Set<string>;
  version: number;
  updated_at: string;
};

const assignmentStore = new Map<string, AssignmentState>();

function makeStoreKey(tenantId: string, userId: string): string {
  return `${tenantId}:${userId}`;
}

function nowIsoTimestamp(): string {
  return new Date().toISOString();
}

function toSnapshot(state: AssignmentState): PropertyAssignmentSnapshot {
  return {
    tenant_id: state.tenant_id,
    user_id: state.user_id,
    property_ids: [...state.property_ids].sort(),
    version: state.version,
    updated_at: state.updated_at,
  };
}

function getOrCreateAssignmentState(
  tenantId: string,
  userId: string,
): AssignmentState {
  const key = makeStoreKey(tenantId, userId);
  const existing = assignmentStore.get(key);
  if (existing) {
    return existing;
  }

  const created: AssignmentState = {
    tenant_id: tenantId,
    user_id: userId,
    property_ids: new Set<string>(),
    version: 0,
    updated_at: nowIsoTimestamp(),
  };
  assignmentStore.set(key, created);
  return created;
}

function mutateAssignment(
  input: AssignmentMutationBaseInput & {
    operation: AssignmentMutationOperation;
  },
): AssignmentMutationResult {
  const state = getOrCreateAssignmentState(input.tenant_id, input.user_id);

  const attempt = createAssignmentMutationAttemptEvent({
    actor_id: input.actor_id,
    actor_role: input.actor_role,
    tenant_id: input.tenant_id,
    user_id: input.user_id,
    property_id: input.property_id,
    operation: input.operation,
    expected_version: input.expected_version,
    current_version: state.version,
  });

  if (
    input.expected_version !== undefined &&
    input.expected_version !== state.version
  ) {
    const snapshot = toSnapshot(state);
    const outcome = createAssignmentMutationOutcomeEvent({
      ...attempt,
      outcome: "conflict",
      applied: false,
      resulting_version: state.version,
    });

    appendAuditLogEvent({
      category: "assignment_mutation",
      event_type: "assignment.mutation.attempt",
      payload: attempt,
    });
    appendAuditLogEvent({
      category: "assignment_mutation",
      event_type: "assignment.mutation.outcome",
      payload: outcome,
    });

    return {
      ok: false,
      reason: "conflict",
      snapshot,
      audit_events: [attempt, outcome],
    };
  }

  const hasProperty = state.property_ids.has(input.property_id);
  let status: AssignmentMutationSuccess["status"];
  let applied = false;

  if (input.operation === "assign") {
    if (hasProperty) {
      status = "already_assigned";
    } else {
      state.property_ids.add(input.property_id);
      status = "assigned";
      applied = true;
    }
  } else if (hasProperty) {
    state.property_ids.delete(input.property_id);
    status = "revoked";
    applied = true;
  } else {
    status = "already_revoked";
  }

  if (applied) {
    state.version += 1;
    state.updated_at = nowIsoTimestamp();
  }

  const snapshot = toSnapshot(state);
  const outcome = createAssignmentMutationOutcomeEvent({
    ...attempt,
    outcome: status,
    applied,
    resulting_version: snapshot.version,
  });

  appendAuditLogEvent({
    category: "assignment_mutation",
    event_type: "assignment.mutation.attempt",
    payload: attempt,
  });
  appendAuditLogEvent({
    category: "assignment_mutation",
    event_type: "assignment.mutation.outcome",
    payload: outcome,
  });

  return {
    ok: true,
    status,
    snapshot,
    audit_events: [attempt, outcome],
  };
}

export function assignPropertyToUser(
  input: AssignPropertyInput,
): AssignmentMutationResult {
  return mutateAssignment({ ...input, operation: "assign" });
}

export function revokePropertyFromUser(
  input: RevokePropertyInput,
): AssignmentMutationResult {
  return mutateAssignment({ ...input, operation: "revoke" });
}

export function getPropertyAssignmentSnapshot(
  tenantId: string,
  userId: string,
): PropertyAssignmentSnapshot | null {
  const state = assignmentStore.get(makeStoreKey(tenantId, userId));
  return state ? toSnapshot(state) : null;
}

export function getAssignedPropertyScope(
  tenantId: string,
  userId: string,
): string[] | undefined {
  const snapshot = getPropertyAssignmentSnapshot(tenantId, userId);
  if (!snapshot) {
    return undefined;
  }

  return snapshot.property_ids;
}

export function resetPropertyAssignmentsForTests(): void {
  assignmentStore.clear();
}
