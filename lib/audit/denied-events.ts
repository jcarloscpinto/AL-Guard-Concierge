import { randomUUID } from "crypto";
import type { AccessDenyReason, AccessRole } from "@/lib/access";
import { appendAuditLogEvent } from "@/lib/audit/store";

export type DeniedAuditEvent = {
  actor_id: string;
  actor_role: AccessRole;
  tenant_id: string;
  property_id?: string;
  action: string;
  resource_type: string;
  resource_id: string;
  decision: "deny";
  reason_code: AccessDenyReason;
  correlation_id: string;
  occurred_at: string;
};

type CreateDeniedAuditEventInput = Omit<
  DeniedAuditEvent,
  "decision" | "correlation_id" | "occurred_at"
> & {
  correlation_id?: string;
  occurred_at?: string;
};

export function createDeniedAuditEvent(
  input: CreateDeniedAuditEventInput,
): DeniedAuditEvent {
  const deniedEvent: DeniedAuditEvent = {
    ...input,
    decision: "deny",
    correlation_id: input.correlation_id ?? randomUUID(),
    occurred_at: input.occurred_at ?? new Date().toISOString(),
  };

  appendAuditLogEvent({
    category: "access_denied",
    event_type: "access.denied",
    payload: deniedEvent,
  });

  return deniedEvent;
}
