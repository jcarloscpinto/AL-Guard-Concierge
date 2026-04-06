export const ACCESS_ROLES = [
  "internal_admin",
  "internal_ops",
  "client",
] as const;

export type AccessRole = (typeof ACCESS_ROLES)[number];

export const DENY_REASONS = [
  "auth_invalid",
  "role_unknown",
  "tenant_scope_violation",
  "property_scope_violation",
  "policy_denied",
  "resource_not_accessible",
] as const;

export type AccessDenyReason = (typeof DENY_REASONS)[number];

export type AccessJwtClaims = {
  sub: string;
  tenant_id: string;
  role: AccessRole;
  exp: number;
  iat: number;
  property_scope?: string[];
};
