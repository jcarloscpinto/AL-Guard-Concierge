import { beforeEach, describe, expect, test } from "vitest";
import {
  assignPropertyToUser,
  getAssignedPropertyScope,
  getPropertyAssignmentSnapshot,
  resetPropertyAssignmentsForTests,
  revokePropertyFromUser,
} from "@/lib/access";
import { listAuditLogEvents, resetAuditStoreForTests } from "@/lib/audit";

describe("property assignment mutations", () => {
  beforeEach(() => {
    resetPropertyAssignmentsForTests();
    resetAuditStoreForTests();
  });

  test("assigns property and returns deterministic snapshot with audit attempt/outcome", () => {
    const result = assignPropertyToUser({
      tenant_id: "tenant-a",
      user_id: "user-1",
      property_id: "property-a",
      actor_id: "admin-1",
      actor_role: "internal_admin",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.status).toBe("assigned");
    expect(result.snapshot).toEqual({
      tenant_id: "tenant-a",
      user_id: "user-1",
      property_ids: ["property-a"],
      version: 1,
      updated_at: result.snapshot.updated_at,
    });

    const [attempt, outcome] = result.audit_events;
    expect(attempt.stage).toBe("attempt");
    expect(outcome.stage).toBe("outcome");
    expect(outcome.correlation_id).toBe(attempt.correlation_id);
    expect(outcome.outcome).toBe("assigned");
    expect(outcome.applied).toBe(true);
    expect(outcome.resulting_version).toBe(1);

    const events = listAuditLogEvents();
    expect(events).toHaveLength(2);
    expect(events[0]).toMatchObject({
      category: "assignment_mutation",
      event_type: "assignment.mutation.attempt",
      payload: {
        stage: "attempt",
        operation: "assign",
        tenant_id: "tenant-a",
        user_id: "user-1",
      },
    });
    expect(events[1]).toMatchObject({
      category: "assignment_mutation",
      event_type: "assignment.mutation.outcome",
      payload: {
        stage: "outcome",
        outcome: "assigned",
      },
    });
  });

  test("revokes property and updates assignment scope immediately", () => {
    assignPropertyToUser({
      tenant_id: "tenant-a",
      user_id: "user-1",
      property_id: "property-a",
      actor_id: "admin-1",
      actor_role: "internal_admin",
    });

    const revokeResult = revokePropertyFromUser({
      tenant_id: "tenant-a",
      user_id: "user-1",
      property_id: "property-a",
      actor_id: "admin-1",
      actor_role: "internal_admin",
    });

    expect(revokeResult.ok).toBe(true);
    if (!revokeResult.ok) {
      return;
    }

    expect(revokeResult.status).toBe("revoked");
    expect(revokeResult.snapshot.property_ids).toEqual([]);
    expect(getAssignedPropertyScope("tenant-a", "user-1")).toEqual([]);
  });

  test("returns conflict with current snapshot when expected_version mismatches", () => {
    assignPropertyToUser({
      tenant_id: "tenant-a",
      user_id: "user-1",
      property_id: "property-a",
      actor_id: "admin-1",
      actor_role: "internal_admin",
    });

    const conflict = assignPropertyToUser({
      tenant_id: "tenant-a",
      user_id: "user-1",
      property_id: "property-b",
      actor_id: "admin-1",
      actor_role: "internal_admin",
      expected_version: 0,
    });

    expect(conflict.ok).toBe(false);
    if (conflict.ok) {
      return;
    }

    expect(conflict.reason).toBe("conflict");
    expect(conflict.snapshot).toEqual({
      tenant_id: "tenant-a",
      user_id: "user-1",
      property_ids: ["property-a"],
      version: 1,
      updated_at: conflict.snapshot.updated_at,
    });
    expect(conflict.audit_events[1].outcome).toBe("conflict");
    expect(conflict.audit_events[1].applied).toBe(false);
  });

  test("keeps deterministic sorted property mapping in snapshots", () => {
    assignPropertyToUser({
      tenant_id: "tenant-a",
      user_id: "user-1",
      property_id: "property-c",
      actor_id: "admin-1",
      actor_role: "internal_admin",
    });
    assignPropertyToUser({
      tenant_id: "tenant-a",
      user_id: "user-1",
      property_id: "property-a",
      actor_id: "admin-1",
      actor_role: "internal_admin",
    });

    const snapshot = getPropertyAssignmentSnapshot("tenant-a", "user-1");
    expect(snapshot).not.toBeNull();
    expect(snapshot?.property_ids).toEqual(["property-a", "property-c"]);
  });
});
