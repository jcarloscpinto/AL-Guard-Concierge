export type OnboardingCreateInput = {
  tenant_name: string;
  tenant_email: string;
  property_name: string;
  property_address_line1: string;
  property_municipality: string;
};

export type ValidationError = {
  field: keyof OnboardingCreateInput;
  message: string;
};

export type TenantRecord = {
  tenant_id: string;
  tenant_name: string;
  tenant_email: string;
  created_at: string;
};

export type PropertyRecord = {
  property_id: string;
  tenant_id: string;
  property_name: string;
  property_address_line1: string;
  property_municipality: string;
  municipality_profile_code: string;
  ops_review_required: boolean;
  created_at: string;
};

export type OnboardingCreateResult = {
  tenant: TenantRecord;
  property: PropertyRecord;
};
