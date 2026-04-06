import { NextResponse } from "next/server";
import { listOnboardingTenants } from "@/lib/onboarding";

export async function GET() {
  return NextResponse.json({ tenants: listOnboardingTenants() });
}
