import { describe, expect, test } from "vitest";
import { validateOnboardingCreateInput } from "@/lib/onboarding";

describe("onboarding input validator", () => {
  test("returns field-level errors for missing required fields", () => {
    const result = validateOnboardingCreateInput({
      tenant_name: "",
      tenant_email: "",
      property_name: "",
      property_address_line1: "",
      property_municipality: "",
    });

    expect(result.ok).toBe(false);

    if (result.ok) {
      throw new Error("Expected validation failure");
    }

    expect(result.errors).toEqual([
      { field: "tenant_name", message: "This field is required." },
      { field: "tenant_email", message: "This field is required." },
      { field: "property_name", message: "This field is required." },
      { field: "property_address_line1", message: "This field is required." },
      { field: "property_municipality", message: "This field is required." },
    ]);
  });
});
