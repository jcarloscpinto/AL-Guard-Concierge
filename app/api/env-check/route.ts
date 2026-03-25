import { NextResponse } from "next/server";
import { getEnvCheckSummary } from "@/lib/env";

export async function GET() {
  return NextResponse.json(getEnvCheckSummary());
}
