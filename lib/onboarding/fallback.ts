const BASELINE_PROFILE = "BASELINE_UNKNOWN_MUNICIPALITY";

const MUNICIPALITY_PROFILE_BY_KEY: Record<string, string> = {
  LISBON: "MUNICIPALITY_LISBON_STANDARD",
  PORTO: "MUNICIPALITY_PORTO_STANDARD",
  FARO: "MUNICIPALITY_FARO_STANDARD",
};

export type MunicipalityFallbackResolution = {
  municipality_profile_code: string;
  ops_review_required: boolean;
};

function normalizeMunicipalityKey(municipality: string): string {
  return municipality.trim().toUpperCase();
}

export function resolveMunicipalityFallback(
  municipality: string,
): MunicipalityFallbackResolution {
  const profileCode =
    MUNICIPALITY_PROFILE_BY_KEY[normalizeMunicipalityKey(municipality)];

  if (!profileCode) {
    return {
      municipality_profile_code: BASELINE_PROFILE,
      ops_review_required: true,
    };
  }

  return {
    municipality_profile_code: profileCode,
    ops_review_required: false,
  };
}
