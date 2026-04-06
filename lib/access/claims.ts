import {
  ACCESS_ROLES,
  type AccessJwtClaims,
  type AccessRole,
} from "@/lib/access/contracts";

export type ParseAccessClaimsResult =
  | { ok: true; claims: AccessJwtClaims }
  | { ok: false; reason: "auth_invalid" | "role_unknown" };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isUnixSeconds(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function toAccessRole(value: unknown): AccessRole | null {
  if (!isNonEmptyString(value)) {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  return ACCESS_ROLES.includes(normalized as AccessRole)
    ? (normalized as AccessRole)
    : null;
}

export function parseAccessJwtClaims(input: unknown): ParseAccessClaimsResult {
  if (!isPlainObject(input)) {
    return { ok: false, reason: "auth_invalid" };
  }

  const { sub, tenant_id, role, exp, iat, property_scope } = input;

  if (!isNonEmptyString(sub) || !isNonEmptyString(tenant_id)) {
    return { ok: false, reason: "auth_invalid" };
  }

  if (!isUnixSeconds(exp) || !isUnixSeconds(iat)) {
    return { ok: false, reason: "auth_invalid" };
  }

  const parsedRole = toAccessRole(role);
  if (!parsedRole) {
    return { ok: false, reason: "role_unknown" };
  }

  if (property_scope !== undefined) {
    if (!Array.isArray(property_scope)) {
      return { ok: false, reason: "auth_invalid" };
    }

    if (!property_scope.every(isNonEmptyString)) {
      return { ok: false, reason: "auth_invalid" };
    }
  }

  return {
    ok: true,
    claims: {
      sub: sub.trim(),
      tenant_id: tenant_id.trim(),
      role: parsedRole,
      exp,
      iat,
      property_scope: property_scope?.map((entry) => entry.trim()),
    },
  };
}
