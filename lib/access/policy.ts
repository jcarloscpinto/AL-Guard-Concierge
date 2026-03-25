import type { AccessDecision } from "@/lib/access/decision";
import type { AccessJwtClaims, AccessRole } from "@/lib/access/contracts";

export const ACCESS_ACTIONS = ["property.read"] as const;

export type AccessAction = (typeof ACCESS_ACTIONS)[number];

type PolicyEvaluationInput = {
  claims: AccessJwtClaims;
  action: AccessAction;
  tenantId: string;
  propertyId?: string;
  propertyScope?: string[];
};

const ROLE_POLICY: Readonly<Record<AccessAction, readonly AccessRole[]>> = {
  "property.read": ["internal_admin", "internal_ops", "client"],
};

function normalizeScope(scope: string[] | undefined): string[] | undefined {
  if (!scope) {
    return undefined;
  }

  const normalized = scope
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  return normalized.length > 0 ? normalized : undefined;
}

export function evaluateAccessPolicy({
  claims,
  action,
  tenantId,
  propertyId,
  propertyScope,
}: PolicyEvaluationInput): AccessDecision {
  const allowedRoles = ROLE_POLICY[action];

  if (!allowedRoles || !allowedRoles.includes(claims.role)) {
    return { allowed: false, reason: "policy_denied" };
  }

  if (claims.tenant_id !== tenantId) {
    return { allowed: false, reason: "tenant_scope_violation" };
  }

  if (!propertyId) {
    return { allowed: true, claims };
  }

  const effectiveScope = normalizeScope(propertyScope ?? claims.property_scope);
  if (!effectiveScope) {
    return claims.role === "client"
      ? { allowed: false, reason: "property_scope_violation" }
      : { allowed: true, claims };
  }

  if (!effectiveScope.includes(propertyId)) {
    return { allowed: false, reason: "property_scope_violation" };
  }

  return { allowed: true, claims };
}
