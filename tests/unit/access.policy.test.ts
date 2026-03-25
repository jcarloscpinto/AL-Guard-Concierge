import { describe, expect, test } from "vitest";
import { evaluateAccessPolicy, type AccessJwtClaims } from "@/lib/access";

function makeClaims(overrides?: Partial<AccessJwtClaims>): AccessJwtClaims {
  return {
    sub: "user-1",
    tenant_id: "tenant-a",
    role: "client",
    exp: 1_900_000_000,
    iat: 1_800_000_000,
    property_scope: ["property-a", "property-b"],
    ...overrides,
  };
}

describe("evaluateAccessPolicy", () => {
  test("allows when tenant and property scope are valid", () => {
    const claims = makeClaims();

    const result = evaluateAccessPolicy({
      claims,
      action: "property.read",
      tenantId: "tenant-a",
      propertyId: "property-a",
    });

    expect(result).toEqual({ allowed: true, claims });
  });

  test("denies with tenant_scope_violation on tenant mismatch", () => {
    const result = evaluateAccessPolicy({
      claims: makeClaims(),
      action: "property.read",
      tenantId: "tenant-z",
      propertyId: "property-a",
    });

    expect(result).toEqual({
      allowed: false,
      reason: "tenant_scope_violation",
    });
  });

  test("denies client with property_scope_violation when property is outside scope", () => {
    const result = evaluateAccessPolicy({
      claims: makeClaims(),
      action: "property.read",
      tenantId: "tenant-a",
      propertyId: "property-z",
    });

    expect(result).toEqual({
      allowed: false,
      reason: "property_scope_violation",
    });
  });

  test("allows internal_ops without explicit property scope", () => {
    const claims = makeClaims({
      role: "internal_ops",
      property_scope: undefined,
    });

    const result = evaluateAccessPolicy({
      claims,
      action: "property.read",
      tenantId: "tenant-a",
      propertyId: "property-z",
    });

    expect(result).toEqual({ allowed: true, claims });
  });
});
