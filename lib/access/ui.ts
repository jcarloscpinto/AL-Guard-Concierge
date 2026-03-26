import { parseAccessJwtClaims } from "@/lib/access/claims";
import type { AccessDenyReason } from "@/lib/access/contracts";
import { evaluateAccessPolicy } from "@/lib/access/policy";

export type PropertyUiAccessInput = {
  userId: string | null;
  role: string | null;
  claimsTenantId: string | null;
  tenantId: string;
  propertyId: string;
  propertyScope: string | null;
};

export type ForbiddenGuidance = {
  title: string;
  message: string;
};

function parsePropertyScope(raw: string | null): string[] | undefined {
  if (!raw) {
    return undefined;
  }

  const parsed = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);

  return parsed.length > 0 ? parsed : undefined;
}

export function resolvePropertyReadUiAccess(
  input: PropertyUiAccessInput,
):
  | { allowed: true; visibleActions: ["property.read"] }
  | { allowed: false; reason: AccessDenyReason; visibleActions: [] } {
  const now = Math.floor(Date.now() / 1000);

  const parsedClaims = parseAccessJwtClaims({
    sub: input.userId,
    tenant_id: input.claimsTenantId,
    role: input.role,
    exp: now + 3600,
    iat: now,
    property_scope: parsePropertyScope(input.propertyScope),
  });

  if (!parsedClaims.ok) {
    return { allowed: false, reason: parsedClaims.reason, visibleActions: [] };
  }

  if (!input.tenantId.trim()) {
    return { allowed: false, reason: "auth_invalid", visibleActions: [] };
  }

  const decision = evaluateAccessPolicy({
    claims: parsedClaims.claims,
    action: "property.read",
    tenantId: input.tenantId,
    propertyId: input.propertyId,
  });

  if (!decision.allowed) {
    return { allowed: false, reason: decision.reason, visibleActions: [] };
  }

  return { allowed: true, visibleActions: ["property.read"] };
}

export function getForbiddenGuidance(
  reason: AccessDenyReason,
): ForbiddenGuidance {
  switch (reason) {
    case "tenant_scope_violation":
      return {
        title: "Tenant mismatch",
        message:
          "This property belongs to a different tenant context. Switch tenant scope and try again.",
      };
    case "property_scope_violation":
      return {
        title: "Property out of scope",
        message:
          "Your current role can only open properties assigned to your scope. Ask an internal operator to update access.",
      };
    case "policy_denied":
      return {
        title: "Action not permitted",
        message:
          "Your role is not allowed to read property details in this workflow.",
      };
    case "role_unknown":
    case "auth_invalid":
      return {
        title: "Session is invalid",
        message: "Refresh your session and try opening the property again.",
      };
    case "resource_not_accessible":
      return {
        title: "Resource unavailable",
        message:
          "The requested resource cannot be accessed in the current context.",
      };
  }
}
