import { beforeEach, describe, expect, test } from "vitest";
import { POST as createOnboarding } from "@/app/api/onboarding/route";
import { GET as listTenants } from "@/app/api/onboarding/tenants/route";
import { GET as getProperty } from "@/app/api/onboarding/properties/[propertyId]/route";
import { resetOnboardingStoreForTests } from "@/lib/onboarding";
import {
  assignPropertyToUser,
  resetPropertyAssignmentsForTests,
} from "@/lib/access";
import { listAuditLogEvents, resetAuditStoreForTests } from "@/lib/audit";

function toJsonRequest(body: unknown): Request {
  return new Request("http://localhost/api/onboarding", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("onboarding API handlers", () => {
  beforeEach(() => {
    resetOnboardingStoreForTests();
    resetPropertyAssignmentsForTests();
    resetAuditStoreForTests();
  });

  test("returns field-level validation errors when required fields are missing", async () => {
    const response = await createOnboarding(
      toJsonRequest({ tenant_name: "Tenant Only" }),
    );

    expect(response.status).toBe(400);

    const payload = await response.json();
    expect(payload.error).toBe("validation_failed");
    expect(payload.field_errors).toEqual(
      expect.arrayContaining([
        { field: "tenant_email", message: "This field is required." },
        { field: "property_name", message: "This field is required." },
        { field: "property_address_line1", message: "This field is required." },
        { field: "property_municipality", message: "This field is required." },
      ]),
    );
  });

  test("creates linked tenant and property, exposes identifiers consistently, and applies deterministic fallback", async () => {
    const createResponse = await createOnboarding(
      toJsonRequest({
        tenant_name: "Blue Coast Rentals",
        tenant_email: "ops@bluecoast.pt",
        property_name: "Rua das Flores 10",
        property_address_line1: "Rua das Flores 10",
        property_municipality: "UnknownTown",
      }),
    );

    expect(createResponse.status).toBe(201);
    const createPayload = await createResponse.json();

    expect(createPayload.tenant_id).toBeTypeOf("string");
    expect(createPayload.property_id).toBeTypeOf("string");
    expect(createPayload.municipality_profile_code).toBe(
      "BASELINE_UNKNOWN_MUNICIPALITY",
    );
    expect(createPayload.ops_review_required).toBe(true);

    const listResponse = await listTenants();
    const listPayload = await listResponse.json();

    expect(listResponse.status).toBe(200);
    expect(listPayload.tenants).toHaveLength(1);
    expect(listPayload.tenants[0].tenant_id).toBe(createPayload.tenant_id);

    assignPropertyToUser({
      tenant_id: createPayload.tenant_id,
      user_id: "client-user-1",
      property_id: createPayload.property_id,
      actor_id: "admin-1",
      actor_role: "internal_admin",
    });

    const propertyRequest = new Request("http://localhost", {
      headers: {
        "x-user-id": "client-user-1",
        "x-role": "client",
        "x-tenant-id": createPayload.tenant_id,
      },
    });

    const propertyResponse = await getProperty(propertyRequest, {
      params: { propertyId: createPayload.property_id },
    });
    expect(propertyResponse.status).toBe(200);

    const propertyPayload = await propertyResponse.json();
    expect(propertyPayload.property.property_id).toBe(
      createPayload.property_id,
    );
    expect(propertyPayload.property.tenant_id).toBe(createPayload.tenant_id);
    expect(propertyPayload.property.municipality_profile_code).toBe(
      "BASELINE_UNKNOWN_MUNICIPALITY",
    );
    expect(propertyPayload.property.ops_review_required).toBe(true);

    const fallbackEvents = listAuditLogEvents().filter(
      (event) => event.category === "onboarding_fallback",
    );
    expect(fallbackEvents).toHaveLength(1);
    expect(fallbackEvents[0]).toMatchObject({
      category: "onboarding_fallback",
      event_type: "onboarding.municipality_fallback_applied",
      payload: {
        tenant_id: createPayload.tenant_id,
        property_id: createPayload.property_id,
        property_municipality: "UnknownTown",
        municipality_profile_code: "BASELINE_UNKNOWN_MUNICIPALITY",
        ops_review_required: true,
      },
    });
  });

  test("denies direct navigation to onboarding property when assignment is missing", async () => {
    const createResponse = await createOnboarding(
      toJsonRequest({
        tenant_name: "Blue Coast Rentals",
        tenant_email: "ops@bluecoast.pt",
        property_name: "Rua das Flores 10",
        property_address_line1: "Rua das Flores 10",
        property_municipality: "Lisbon",
      }),
    );
    const createPayload = await createResponse.json();

    const propertyRequest = new Request("http://localhost", {
      headers: {
        "x-user-id": "client-user-2",
        "x-role": "client",
        "x-tenant-id": createPayload.tenant_id,
      },
    });

    const propertyResponse = await getProperty(propertyRequest, {
      params: { propertyId: createPayload.property_id },
    });

    expect(propertyResponse.status).toBe(403);
    const payload = await propertyResponse.json();
    expect(payload).toEqual({
      error: "forbidden",
      reason_code: "property_scope_violation",
    });
  });
});
