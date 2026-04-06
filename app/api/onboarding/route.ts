import { NextResponse } from "next/server";
import {
  createOnboardingRecords,
  validateOnboardingCreateInput,
} from "@/lib/onboarding";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "invalid_json",
        field_errors: [],
      },
      { status: 400 },
    );
  }

  const validation = validateOnboardingCreateInput(body);

  if (!validation.ok) {
    return NextResponse.json(
      {
        error: "validation_failed",
        field_errors: validation.errors,
      },
      { status: 400 },
    );
  }

  const result = createOnboardingRecords(validation.data);

  return NextResponse.json(
    {
      tenant_id: result.tenant.tenant_id,
      property_id: result.property.property_id,
      municipality_profile_code: result.property.municipality_profile_code,
      ops_review_required: result.property.ops_review_required,
    },
    { status: 201 },
  );
}
