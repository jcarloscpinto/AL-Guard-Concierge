import { beforeEach, describe, expect, test } from "vitest";
import {
  appendAuditLogEvent,
  configureAuditRetentionControls,
  listAuditLogEvents,
  resetAuditStoreForTests,
} from "@/lib/audit";

describe("audit store", () => {
  beforeEach(() => {
    resetAuditStoreForTests();
  });

  test("appends immutable events without mutating earlier entries", () => {
    const first = appendAuditLogEvent({
      category: "access_denied",
      event_type: "access.denied",
      payload: {
        actor_id: "user-1",
        reason_code: "policy_denied",
      },
    });

    const second = appendAuditLogEvent({
      category: "onboarding_fallback",
      event_type: "onboarding.municipality_fallback_applied",
      payload: {
        tenant_id: "tenant-1",
        property_id: "property-1",
        municipality_profile_code: "BASELINE_UNKNOWN_MUNICIPALITY",
      },
    });

    const events = listAuditLogEvents();
    expect(events).toHaveLength(2);
    expect(events.map((event) => event.event_id)).toEqual([
      first.event_id,
      second.event_id,
    ]);
    expect(Object.isFrozen(events[0])).toBe(true);
    expect(Object.isFrozen(events[0].payload)).toBe(true);
    expect(events[0].payload).toMatchObject({
      actor_id: "user-1",
      reason_code: "policy_denied",
    });
  });

  test("applies retention controls for age and maximum entries", () => {
    configureAuditRetentionControls({
      max_age_ms: 60_000,
      max_entries: 1,
      now: () => Date.parse("2026-03-25T10:00:00.000Z"),
    });

    appendAuditLogEvent({
      category: "access_denied",
      event_type: "access.denied",
      occurred_at: "2026-03-25T09:50:00.000Z",
      payload: { actor_id: "old-user" },
    });

    appendAuditLogEvent({
      category: "access_denied",
      event_type: "access.denied",
      occurred_at: "2026-03-25T09:59:30.000Z",
      payload: { actor_id: "new-user" },
    });

    const events = listAuditLogEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      category: "access_denied",
      event_type: "access.denied",
      payload: { actor_id: "new-user" },
    });
  });
});
