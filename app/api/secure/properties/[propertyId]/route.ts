import { NextResponse } from "next/server";
import {
  buildClaimsInputFromHeaders,
  evaluateAccessPolicy,
  getAssignedPropertyScope,
  parseAccessJwtClaims,
  type AccessDenyReason,
} from "@/lib/access";
import { createDeniedAuditEvent } from "@/lib/audit/denied-events";
import { getOnboardingProperty } from "@/lib/onboarding";

function buildDeniedResponse(input: {
  actorId: string;
  actorRole: "internal_admin" | "internal_ops" | "client";
  tenantId: string;
  propertyId: string;
  reasonCode: AccessDenyReason;
}) {
  const deniedEvent = createDeniedAuditEvent({
    actor_id: input.actorId,
    actor_role: input.actorRole,
    tenant_id: input.tenantId,
    property_id: input.propertyId,
    action: "property.read",
    resource_type: "property",
    resource_id: input.propertyId,
    reason_code: input.reasonCode,
  });

  return NextResponse.json(
    {
      error: "forbidden",
      reason_code: input.reasonCode,
      metadata: {
        denied_event: deniedEvent,
      },
    },
    { status: 403 },
  );
}

export async function GET(
  request: Request,
  context: { params: Promise<{ propertyId: string }> },
) {
  const params = await context.params;
  const propertyId = params.propertyId;
  const url = new URL(request.url);
  const tenantId = url.searchParams.get("tenant_id")?.trim() ?? "";

  const claimsInput = buildClaimsInputFromHeaders(request.headers);

  const parsedClaims = parseAccessJwtClaims(claimsInput);

  if (!parsedClaims.ok) {
    return NextResponse.json(
      {
        error: "forbidden",
        reason_code: parsedClaims.reason,
      },
      { status: 403 },
    );
  }

  if (!tenantId) {
    return buildDeniedResponse({
      actorId: parsedClaims.claims.sub,
      actorRole: parsedClaims.claims.role,
      tenantId: parsedClaims.claims.tenant_id,
      propertyId,
      reasonCode: "auth_invalid",
    });
  }

  const property = getOnboardingProperty(propertyId);
  if (!property || property.tenant_id !== tenantId) {
    return buildDeniedResponse({
      actorId: parsedClaims.claims.sub,
      actorRole: parsedClaims.claims.role,
      tenantId,
      propertyId,
      reasonCode: "resource_not_accessible",
    });
  }

  const assignmentScope = getAssignedPropertyScope(
    parsedClaims.claims.tenant_id,
    parsedClaims.claims.sub,
  );

  const decision = evaluateAccessPolicy({
    claims: parsedClaims.claims,
    action: "property.read",
    tenantId,
    propertyId,
    propertyScope: assignmentScope,
  });

  if (!decision.allowed) {
    return buildDeniedResponse({
      actorId: parsedClaims.claims.sub,
      actorRole: parsedClaims.claims.role,
      tenantId,
      propertyId,
      reasonCode: decision.reason,
    });
  }

  return NextResponse.json({
    data: {
      id: propertyId,
      tenant_id: tenantId,
      resource_type: "property",
      action: "property.read",
    },
  });
}
