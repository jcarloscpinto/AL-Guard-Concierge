import { randomUUID } from "crypto";

export type AuditCategory =
  | "access_denied"
  | "onboarding_fallback"
  | "assignment_mutation";

export type AuditRetentionControls = {
  max_entries?: number;
  max_age_ms?: number;
  now?: () => number;
};

export type AuditLogEvent<
  TPayload extends Record<string, unknown> = Record<string, unknown>,
> = {
  event_id: string;
  category: AuditCategory;
  event_type: string;
  occurred_at: string;
  payload: Readonly<TPayload>;
};

type AppendAuditLogEventInput<TPayload extends Record<string, unknown>> = {
  category: AuditCategory;
  event_type: string;
  payload: TPayload;
  event_id?: string;
  occurred_at?: string;
};

const DEFAULT_RETENTION_CONTROLS: AuditRetentionControls = {
  max_entries: undefined,
  max_age_ms: undefined,
};

let retentionControls: AuditRetentionControls = {
  ...DEFAULT_RETENTION_CONTROLS,
};
let auditEvents: AuditLogEvent[] = [];

function deepFreeze<T>(value: T): Readonly<T> {
  if (value && typeof value === "object") {
    Object.freeze(value);

    const entries = Object.values(value as Record<string, unknown>);
    for (const entry of entries) {
      deepFreeze(entry);
    }
  }

  return value as Readonly<T>;
}

function applyRetentionControls(): void {
  const now = retentionControls.now?.() ?? Date.now();

  if (typeof retentionControls.max_age_ms === "number") {
    const cutoff = now - retentionControls.max_age_ms;
    auditEvents = auditEvents.filter((event) => {
      const occurredAt = Date.parse(event.occurred_at);
      return Number.isNaN(occurredAt) ? true : occurredAt >= cutoff;
    });
  }

  if (
    typeof retentionControls.max_entries === "number" &&
    retentionControls.max_entries >= 0 &&
    auditEvents.length > retentionControls.max_entries
  ) {
    auditEvents = auditEvents.slice(-retentionControls.max_entries);
  }
}

export function appendAuditLogEvent<TPayload extends Record<string, unknown>>(
  input: AppendAuditLogEventInput<TPayload>,
): AuditLogEvent<TPayload> {
  const event: AuditLogEvent<TPayload> = {
    event_id: input.event_id ?? randomUUID(),
    category: input.category,
    event_type: input.event_type,
    occurred_at: input.occurred_at ?? new Date().toISOString(),
    payload: deepFreeze(structuredClone(input.payload)),
  };

  auditEvents.push(deepFreeze(event));
  applyRetentionControls();

  return event;
}

export function listAuditLogEvents(): readonly AuditLogEvent[] {
  return auditEvents.slice();
}

export function configureAuditRetentionControls(
  controls: AuditRetentionControls,
): void {
  retentionControls = { ...controls };
  applyRetentionControls();
}

export function resetAuditStoreForTests(): void {
  auditEvents = [];
  retentionControls = { ...DEFAULT_RETENTION_CONTROLS };
}
