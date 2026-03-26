export { generatePropertyId, generateTenantId } from "@/lib/access";
export * from "@/lib/onboarding/types";
export {
  validateOnboardingCreateInput,
  type OnboardingValidationResult,
} from "@/lib/onboarding/validator";
export {
  resolveMunicipalityFallback,
  type MunicipalityFallbackResolution,
} from "@/lib/onboarding/fallback";
export {
  createOnboardingRecords,
  listOnboardingTenants,
  getOnboardingProperty,
  resetOnboardingStoreForTests,
} from "@/lib/onboarding/store";
