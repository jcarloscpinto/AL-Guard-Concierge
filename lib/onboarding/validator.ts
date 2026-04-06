import type {
  OnboardingCreateInput,
  ValidationError,
} from "@/lib/onboarding/types";

type ValidationSuccess = {
  ok: true;
  data: OnboardingCreateInput;
};

type ValidationFailure = {
  ok: false;
  errors: ValidationError[];
};

export type OnboardingValidationResult = ValidationSuccess | ValidationFailure;

const REQUIRED_FIELDS: Array<keyof OnboardingCreateInput> = [
  "tenant_name",
  "tenant_email",
  "property_name",
  "property_address_line1",
  "property_municipality",
];

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateOnboardingCreateInput(
  input: unknown,
): OnboardingValidationResult {
  if (!input || typeof input !== "object") {
    return {
      ok: false,
      errors: REQUIRED_FIELDS.map((field) => ({
        field,
        message: "This field is required.",
      })),
    };
  }

  const payload = input as Partial<
    Record<keyof OnboardingCreateInput, unknown>
  >;
  const errors: ValidationError[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (!toTrimmedString(payload[field]).length) {
      errors.push({ field, message: "This field is required." });
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      tenant_name: toTrimmedString(payload.tenant_name),
      tenant_email: toTrimmedString(payload.tenant_email),
      property_name: toTrimmedString(payload.property_name),
      property_address_line1: toTrimmedString(payload.property_address_line1),
      property_municipality: toTrimmedString(payload.property_municipality),
    },
  };
}
