import { beforeEach, describe, expect, test } from "vitest";
import { GET } from "@/app/api/secure/properties/[propertyId]/route";
import {
  getForbiddenGuidance,
  resetPropertyAssignmentsForTests,
  resolvePropertyReadUiAccess,
} from "@/lib/access";
import {
  createOnboardingRecords,
  resetOnboardingStoreForTests,
} from "@/lib/onboarding";

function makeApiRequest(input: {
  tenantId: string;
  propertyId: string;
  userId: string | null;
  role: string | null;
  claimsTenantId: string | null;
  propertyScope: string | null;
}) {
  const headers = new Headers();

  if (input.userId) {
    headers.set("x-user-id", input.userId);
  }
  if (input.role) {
    headers.set("x-role", input.role);
  }
  if (input.claimsTenantId) {
    headers.set("x-tenant-id", input.claimsTenantId);
  }
  if (input.propertyScope) {
    headers.set("x-property-scope", input.propertyScope);
  }

  return new Request(
    `http://localhost:3000/api/secure/properties/${input.propertyId}?tenant_id=${input.tenantId}`,
    {
      method: "GET",
      headers,
    },
  );
}

function seedProperty() {
  const created = createOnboardingRecords({
    tenant_name: "Tenant A",
    tenant_email: "tenant-a@example.com",
    property_name: "Property A",
    property_address_line1: "Address A",
    property_municipality: "Lisbon",
  });

  return {
    tenantId: created.tenant.tenant_id,
    propertyId: created.property.property_id,
  };
}

describe("UI and API access parity", () => {
  beforeEach(() => {
    resetOnboardingStoreForTests();
    resetPropertyAssignmentsForTests();
  });

  test("matches allowed outcome for internal ops", async () => {
    const seeded = seedProperty();

    const ui = resolvePropertyReadUiAccess({
      tenantId: seeded.tenantId,
      userId: "user-1",
      role: "internal_ops",
      claimsTenantId: seeded.tenantId,
      propertyId: seeded.propertyId,
      propertyScope: null,
    });

    const apiResponse = await GET(
      makeApiRequest({
        tenantId: seeded.tenantId,
        propertyId: seeded.propertyId,
        userId: "user-1",
        role: "internal_ops",
        claimsTenantId: seeded.tenantId,
        propertyScope: null,
      }),
      {
        params: { propertyId: seeded.propertyId },
      },
    );

    expect(ui.allowed).toBe(true);
    expect(apiResponse.status).toBe(200);
  });

  test("matches property scope denial reason", async () => {
    const seeded = seedProperty();

    const ui = resolvePropertyReadUiAccess({
      tenantId: seeded.tenantId,
      userId: "user-1",
      role: "client",
      claimsTenantId: seeded.tenantId,
      propertyId: seeded.propertyId,
      propertyScope: "property-z",
    });

    const apiResponse = await GET(
      makeApiRequest({
        tenantId: seeded.tenantId,
        propertyId: seeded.propertyId,
        userId: "user-1",
        role: "client",
        claimsTenantId: seeded.tenantId,
        propertyScope: "property-z",
      }),
      {
        params: { propertyId: seeded.propertyId },
      },
    );
    const apiBody = await apiResponse.json();

    expect(ui).toEqual({
      allowed: false,
      reason: "property_scope_violation",
      visibleActions: [],
    });
    expect(apiResponse.status).toBe(403);
    expect(apiBody.reason_code).toBe("property_scope_violation");
  });

  test("matches tenant mismatch denial reason", async () => {
    const seeded = seedProperty();

    const ui = resolvePropertyReadUiAccess({
      tenantId: seeded.tenantId,
      userId: "user-1",
      role: "internal_admin",
      claimsTenantId: "tenant-b",
      propertyId: seeded.propertyId,
      propertyScope: null,
    });

    const apiResponse = await GET(
      makeApiRequest({
        tenantId: seeded.tenantId,
        propertyId: seeded.propertyId,
        userId: "user-1",
        role: "internal_admin",
        claimsTenantId: "tenant-b",
        propertyScope: null,
      }),
      {
        params: { propertyId: seeded.propertyId },
      },
    );
    const apiBody = await apiResponse.json();

    expect(ui).toEqual({
      allowed: false,
      reason: "tenant_scope_violation",
      visibleActions: [],
    });
    expect(apiResponse.status).toBe(403);
    expect(apiBody.reason_code).toBe("tenant_scope_violation");
  });

  test("matches invalid claims denial reason", async () => {
    const seeded = seedProperty();

    const ui = resolvePropertyReadUiAccess({
      tenantId: seeded.tenantId,
      userId: null,
      role: "client",
      claimsTenantId: seeded.tenantId,
      propertyId: seeded.propertyId,
      propertyScope: seeded.propertyId,
    });

    const apiResponse = await GET(
      makeApiRequest({
        tenantId: seeded.tenantId,
        propertyId: seeded.propertyId,
        userId: null,
        role: "client",
        claimsTenantId: seeded.tenantId,
        propertyScope: seeded.propertyId,
      }),
      {
        params: { propertyId: seeded.propertyId },
      },
    );
    const apiBody = await apiResponse.json();

    expect(ui).toEqual({
      allowed: false,
      reason: "auth_invalid",
      visibleActions: [],
    });
    expect(apiResponse.status).toBe(403);
    expect(apiBody.reason_code).toBe("auth_invalid");
  });
});

describe("forbidden guidance", () => {
  test("returns tenant guidance for tenant scope violations", () => {
    const guidance = getForbiddenGuidance("tenant_scope_violation");

    expect(guidance).toEqual({
      title: "Tenant mismatch",
      message:
        "This property belongs to a different tenant context. Switch tenant scope and try again.",
    });
  });

  test("returns property guidance for property scope violations", () => {
    const guidance = getForbiddenGuidance("property_scope_violation");

    expect(guidance).toEqual({
      title: "Property out of scope",
      message:
        "Your current role can only open properties assigned to your scope. Ask an internal operator to update access.",
    });
  });
});
