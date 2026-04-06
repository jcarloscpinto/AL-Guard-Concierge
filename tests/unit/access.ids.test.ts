import { describe, expect, test } from "vitest";
import {
  generatePropertyId,
  generateTenantId,
  isUuidV7,
  type AccessDenyReason,
} from "@/lib/access";

describe("UUIDv7 helper contract", () => {
  test("generateTenantId and generatePropertyId produce UUIDv7 values", () => {
    const tenantId = generateTenantId();
    const propertyId = generatePropertyId();

    expect(isUuidV7(tenantId)).toBe(true);
    expect(isUuidV7(propertyId)).toBe(true);
  });

  test("isUuidV7 rejects non-v7 or malformed UUID values", () => {
    expect(isUuidV7("not-a-uuid")).toBe(false);
    expect(isUuidV7("550e8400-e29b-41d4-a716-446655440000")).toBe(false);
  });
});

describe("deny reason type safety", () => {
  test("accepts canonical reason values at compile time", () => {
    const reason: AccessDenyReason = "policy_denied";
    expect(reason).toBe("policy_denied");

    // @ts-expect-error Non-canonical deny reason must not be assignable.
    const badReason: AccessDenyReason = "random_reason";
    expect(badReason).toBe("random_reason");
  });
});
