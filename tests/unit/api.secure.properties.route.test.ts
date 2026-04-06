import { beforeEach, describe, expect, test } from "vitest";
import { GET } from "@/app/api/secure/properties/[propertyId]/route";
import { assignPropertyToUser, resetPropertyAssignmentsForTests } from "@/lib/access";
import { listAuditLogEvents, resetAuditStoreForTests } from "@/lib/audit";
import { createOnboardingRecords, resetOnboardingStoreForTests } from "@/lib/onboarding";

function makeRequest(input: {
  tenantId: string;
  propertyId: string;
  userId?: string;
  role?: string;
  claimsTenantId?: string;
  propertyScope?: string;
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

describe("GET /api/secure/properties/[propertyId]", () => {
  beforeEach(() => {
    resetAuditStoreForTests();
    resetOnboardingStoreForTests();
    resetPropertyAssignmentsForTests();
  });

  test("returns 403 and denied event metadata when property scope is violated", async () => {
    const created = createOnboardingRecords({
      tenant_name: "Tenant A",
      tenant_email: "tenant-a@example.com",
      property_name: "Property A",
      property_address_line1: "Address A",
      property_municipality: "Lisbon",
    });

    const response = await GET(makeRequest({
      tenantId: created.tenant.tenant_id,
      propertyId: created.property.property_id,
      userId: "user-1",
      role: "client",
      claimsTenantId: created.tenant.tenant_id,
      propertyScope: "property-b,property-c",
    }), {
      params: { propertyId: created.property.property_id },
    });

    expect(response.status).toBe(403);
    const body = await response.json();

    expect(body.error).toBe("forbidden");
    expect(body.reason_code).toBe("property_scope_violation");
    expect(body.metadata.denied_event).toMatchObject({
      actor_id: "user-1",
      actor_role: "client",
      tenant_id: created.tenant.tenant_id,
      property_id: created.property.property_id,
      action: "property.read",
      resource_type: "property",
      resource_id: created.property.property_id,
      decision: "deny",
      reason_code: "property_scope_violation",
    });
    expect(typeof body.metadata.denied_event.correlation_id).toBe("string");
    expect(typeof body.metadata.denied_event.occurred_at).toBe("string");

    const events = listAuditLogEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      category: "access_denied",
      event_type: "access.denied",
      payload: {
        actor_id: "user-1",
        reason_code: "property_scope_violation",
        decision: "deny",
      },
    });
  });

  test("returns 200 for allowed access", async () => {
    const created = createOnboardingRecords({
      tenant_name: "Tenant A",
      tenant_email: "tenant-a@example.com",
      property_name: "Property A",
      property_address_line1: "Address A",
      property_municipality: "Lisbon",
    });

    const response = await GET(makeRequest({
      tenantId: created.tenant.tenant_id,
      propertyId: created.property.property_id,
      userId: "user-1",
      role: "internal_ops",
      claimsTenantId: created.tenant.tenant_id,
    }), {
      params: { propertyId: created.property.property_id },
    });

    expect(response.status).toBe(200);
    const body = await response.json();

    expect(body).toEqual({
      data: {
        id: created.property.property_id,
        tenant_id: created.tenant.tenant_id,
        resource_type: "property",
        action: "property.read",
      },
    });
  });

  test("uses assignment scope for immediate authorization decisions", async () => {
    const created = createOnboardingRecords({
      tenant_name: "Tenant A",
      tenant_email: "tenant-a@example.com",
      property_name: "Property A",
      property_address_line1: "Address A",
      property_municipality: "Lisbon",
    });

    assignPropertyToUser({
      tenant_id: created.tenant.tenant_id,
      user_id: "user-1",
      property_id: created.property.property_id,
      actor_id: "admin-1",
      actor_role: "internal_admin",
    });

    const response = await GET(makeRequest({
      tenantId: created.tenant.tenant_id,
      propertyId: created.property.property_id,
      userId: "user-1",
      role: "client",
      claimsTenantId: created.tenant.tenant_id,
      propertyScope: "different-property",
    }), {
      params: { propertyId: created.property.property_id },
    });

    expect(response.status).toBe(200);
  });
});