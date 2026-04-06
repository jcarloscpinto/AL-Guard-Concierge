type ClaimsHeaderInput = {
  "x-user-id": string | null;
  "x-tenant-id": string | null;
  "x-role": string | null;
  "x-property-scope": string | null;
};

function parsePropertyScopeHeader(raw: string | null): string[] | undefined {
  if (!raw) {
    return undefined;
  }

  const scope = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);

  return scope.length > 0 ? scope : undefined;
}

export function buildClaimsInputFromHeaders(
  headers: Headers,
): Record<string, unknown> {
  const now = Math.floor(Date.now() / 1000);

  const parsedHeaders: ClaimsHeaderInput = {
    "x-user-id": headers.get("x-user-id"),
    "x-tenant-id": headers.get("x-tenant-id"),
    "x-role": headers.get("x-role"),
    "x-property-scope": headers.get("x-property-scope"),
  };

  return {
    sub: parsedHeaders["x-user-id"],
    tenant_id: parsedHeaders["x-tenant-id"],
    role: parsedHeaders["x-role"],
    exp: now + 3600,
    iat: now,
    property_scope: parsePropertyScopeHeader(parsedHeaders["x-property-scope"]),
  };
}
