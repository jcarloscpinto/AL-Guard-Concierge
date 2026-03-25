import { randomUUID } from "crypto";
import type { AccessRole } from "@/lib/access/contracts";
import type { AssignmentMutationOperation } from "@/lib/access/property-assignments";

type AssignmentMutationBaseEvent = {
  event_type: "assignment_mutation";
  stage: "attempt" | "outcome";
  actor_id: string;
  actor_role: AccessRole;
  tenant_id: string;
  user_id: string;
  property_id: string;
  operation: AssignmentMutationOperation;
  expected_version?: number;
  current_version: number;
  resulting_version?: number;
  applied?: boolean;
  outcome?:
    | "assigned"
    | "already_assigned"
    | "revoked"
    | "already_revoked"
    | "conflict";
  correlation_id: string;
  occurred_at: string;
};

export type AssignmentMutationAuditEvent =
  Readonly<AssignmentMutationBaseEvent>;

type CreateAttemptEventInput = Omit<
  AssignmentMutationBaseEvent,
  "event_type" | "stage" | "correlation_id" | "occurred_at"
> & {
  correlation_id?: string;
  occurred_at?: string;
};

export function createAssignmentMutationAttemptEvent(
  input: CreateAttemptEventInput,
): AssignmentMutationAuditEvent {
  return {
    event_type: "assignment_mutation",
    stage: "attempt",
    actor_id: input.actor_id,
    actor_role: input.actor_role,
    tenant_id: input.tenant_id,
    user_id: input.user_id,
    property_id: input.property_id,
    operation: input.operation,
    expected_version: input.expected_version,
    current_version: input.current_version,
    correlation_id: input.correlation_id ?? randomUUID(),
    occurred_at: input.occurred_at ?? new Date().toISOString(),
  };
}

type CreateOutcomeEventInput = Omit<
  AssignmentMutationBaseEvent,
  "event_type" | "stage" | "occurred_at"
> & {
  occurred_at?: string;
};

export function createAssignmentMutationOutcomeEvent(
  input: CreateOutcomeEventInput,
): AssignmentMutationAuditEvent {
  return {
    event_type: "assignment_mutation",
    stage: "outcome",
    actor_id: input.actor_id,
    actor_role: input.actor_role,
    tenant_id: input.tenant_id,
    user_id: input.user_id,
    property_id: input.property_id,
    operation: input.operation,
    expected_version: input.expected_version,
    current_version: input.current_version,
    resulting_version: input.resulting_version,
    applied: input.applied,
    outcome: input.outcome,
    correlation_id: input.correlation_id,
    occurred_at: input.occurred_at ?? new Date().toISOString(),
  };
}
