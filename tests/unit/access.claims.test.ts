import { describe, expect, test } from "vitest";
import {
  DENY_REASONS,
  parseAccessJwtClaims,
  type AccessDenyReason,
} from "@/lib/access";

describe("parseAccessJwtClaims", () => {
  test("normalizes valid claims", () => {
    const result = parseAccessJwtClaims({
      sub: "  user-123 ",
      tenant_id: " tenant-123 ",
      role: "INTERNAL_OPS",
      exp: 1_900_000_000,
      iat: 1_800_000_000,
      property_scope: [" prop-a ", "prop-b"],
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.claims).toEqual({
        sub: "user-123",
        tenant_id: "tenant-123",
        role: "internal_ops",
        exp: 1_900_000_000,
        iat: 1_800_000_000,
        property_scope: ["prop-a", "prop-b"],
      });
    }
  });

  test("returns auth_invalid when required claims are missing", () => {
    const result = parseAccessJwtClaims({
      sub: "user-123",
      role: "client",
      exp: 1_900_000_000,
      iat: 1_800_000_000,
    });

    expect(result).toEqual({ ok: false, reason: "auth_invalid" });
  });

  test("returns role_unknown for unknown roles", () => {
    const result = parseAccessJwtClaims({
      sub: "user-123",
      tenant_id: "tenant-123",
      role: "owner",
      exp: 1_900_000_000,
      iat: 1_800_000_000,
    });

    expect(result).toEqual({ ok: false, reason: "role_unknown" });
  });
});

describe("deny reasons contract", () => {
  test("covers all canonical deny reasons", () => {
    const expected: AccessDenyReason[] = [
      "auth_invalid",
      "role_unknown",
      "tenant_scope_violation",
      "property_scope_violation",
      "policy_denied",
      "resource_not_accessible",
    ];

    expect(DENY_REASONS).toEqual(expected);
  });
});
