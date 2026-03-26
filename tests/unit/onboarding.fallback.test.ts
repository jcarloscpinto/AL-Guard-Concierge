import { describe, expect, test } from "vitest";
import { resolveMunicipalityFallback } from "@/lib/onboarding";

describe("municipality fallback resolver", () => {
  test("returns baseline profile and review flag for unknown municipality", () => {
    const result = resolveMunicipalityFallback("UnknownTown");

    expect(result).toEqual({
      municipality_profile_code: "BASELINE_UNKNOWN_MUNICIPALITY",
      ops_review_required: true,
    });
  });

  test("returns known profile and no review flag for mapped municipality", () => {
    const result = resolveMunicipalityFallback("Lisbon");

    expect(result).toEqual({
      municipality_profile_code: "MUNICIPALITY_LISBON_STANDARD",
      ops_review_required: false,
    });
  });
});
