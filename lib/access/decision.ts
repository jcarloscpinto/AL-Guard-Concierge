import type { AccessDenyReason, AccessJwtClaims } from "@/lib/access/contracts";

export type AccessDecision =
  | {
      allowed: true;
      claims: AccessJwtClaims;
    }
  | {
      allowed: false;
      reason: AccessDenyReason;
    };
