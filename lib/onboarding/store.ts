import { generatePropertyId, generateTenantId } from "@/lib/access";
import type {
  OnboardingCreateInput,
  OnboardingCreateResult,
  PropertyRecord,
  TenantRecord,
} from "@/lib/onboarding/types";
import { resolveMunicipalityFallback } from "@/lib/onboarding/fallback";
import { appendAuditLogEvent } from "@/lib/audit";

const tenants = new Map<string, TenantRecord>();
const properties = new Map<string, PropertyRecord>();

function currentTimestamp(): string {
  return new Date().toISOString();
}

export function createOnboardingRecords(
  input: OnboardingCreateInput,
): OnboardingCreateResult {
  const tenant_id = generateTenantId();
  const property_id = generatePropertyId();
  const created_at = currentTimestamp();

  const tenant: TenantRecord = {
    tenant_id,
    tenant_name: input.tenant_name,
    tenant_email: input.tenant_email,
    created_at,
  };

  const fallback = resolveMunicipalityFallback(input.property_municipality);
  const property: PropertyRecord = {
    property_id,
    tenant_id,
    property_name: input.property_name,
    property_address_line1: input.property_address_line1,
    property_municipality: input.property_municipality,
    municipality_profile_code: fallback.municipality_profile_code,
    ops_review_required: fallback.ops_review_required,
    created_at,
  };

  tenants.set(tenant.tenant_id, tenant);
  properties.set(property.property_id, property);

  if (fallback.ops_review_required) {
    appendAuditLogEvent({
      category: "onboarding_fallback",
      event_type: "onboarding.municipality_fallback_applied",
      payload: {
        tenant_id,
        property_id,
        property_municipality: input.property_municipality,
        municipality_profile_code: fallback.municipality_profile_code,
        ops_review_required: fallback.ops_review_required,
      },
    });
  }

  return { tenant, property };
}

export function listOnboardingTenants(): TenantRecord[] {
  return [...tenants.values()];
}

export function getOnboardingProperty(
  propertyId: string,
): PropertyRecord | null {
  return properties.get(propertyId) ?? null;
}

export function resetOnboardingStoreForTests(): void {
  tenants.clear();
  properties.clear();
}
