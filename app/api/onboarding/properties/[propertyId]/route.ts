import { NextResponse } from "next/server";
import {
  buildClaimsInputFromHeaders,
  evaluateAccessPolicy,
  getAssignedPropertyScope,
  parseAccessJwtClaims,
} from "@/lib/access";
import { getOnboardingProperty } from "@/lib/onboarding";

type ParamsContext = {
  params: { propertyId: string } | Promise<{ propertyId: string }>;
};

export async function GET(request: Request, context: ParamsContext) {
  const { propertyId } = await Promise.resolve(context.params);
  const property = getOnboardingProperty(propertyId);

  const parsedClaims = parseAccessJwtClaims(
    buildClaimsInputFromHeaders(request.headers),
  );
  if (!parsedClaims.ok) {
    return NextResponse.json(
      {
        error: "forbidden",
        reason_code: parsedClaims.reason,
      },
      { status: 403 },
    );
  }

  if (!property) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const assignmentScope = getAssignedPropertyScope(
    parsedClaims.claims.tenant_id,
    parsedClaims.claims.sub,
  );

  const decision = evaluateAccessPolicy({
    claims: parsedClaims.claims,
    action: "property.read",
    tenantId: property.tenant_id,
    propertyId,
    propertyScope: assignmentScope,
  });

  if (!decision.allowed) {
    return NextResponse.json(
      {
        error: "forbidden",
        reason_code: decision.reason,
      },
      { status: 403 },
    );
  }

  return NextResponse.json({ property });
}
