import Link from "next/link";
import {
  getForbiddenGuidance,
  resolvePropertyReadUiAccess,
} from "@/lib/access";

type SearchParams = Record<string, string | string[] | undefined>;

function getSingleParam(
  searchParams: SearchParams,
  key: string,
): string | undefined {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await searchParams;
  const propertyId =
    getSingleParam(resolvedParams, "property_id") ?? "property-a";
  const tenantId = getSingleParam(resolvedParams, "tenant_id") ?? "tenant-a";
  const userId = getSingleParam(resolvedParams, "user_id") ?? "user-1";
  const role = getSingleParam(resolvedParams, "role") ?? "client";
  const claimsTenantId =
    getSingleParam(resolvedParams, "claims_tenant_id") ?? tenantId;
  const propertyScope =
    getSingleParam(resolvedParams, "property_scope") ?? propertyId;

  const uiAccess = resolvePropertyReadUiAccess({
    userId,
    role,
    claimsTenantId,
    tenantId,
    propertyId,
    propertyScope,
  });
  const propertyHref = `/secure/properties/${propertyId}?tenant_id=${encodeURIComponent(tenantId)}&user_id=${encodeURIComponent(userId)}&role=${encodeURIComponent(role)}&claims_tenant_id=${encodeURIComponent(claimsTenantId)}&property_scope=${encodeURIComponent(propertyScope)}`;
  const forbiddenHref = `/forbidden?reason=${uiAccess.allowed ? "auth_invalid" : uiAccess.reason}&property_id=${encodeURIComponent(propertyId)}&tenant_id=${encodeURIComponent(tenantId)}`;
  const guidance = uiAccess.allowed
    ? null
    : getForbiddenGuidance(uiAccess.reason);

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          MVP Foundation Ready
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">
          AL Guard Concierge
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Next.js App Router runtime is scaffolded with Supabase wiring and
          Playwright baseline coverage.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="rounded-md bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
            href="/api/health"
          >
            Health endpoint
          </Link>
          <Link
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
            href="/api/env-check"
          >
            Env check
          </Link>
          {uiAccess.allowed ? (
            <Link
              className="rounded-md border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              href={propertyHref}
            >
              Secure property view
            </Link>
          ) : (
            <Link
              className="rounded-md border border-amber-300 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
              href={forbiddenHref}
            >
              Access guidance
            </Link>
          )}
        </div>
        {!uiAccess.allowed ? (
          <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <span className="font-semibold">{guidance?.title}:</span>{" "}
            {guidance?.message}
          </p>
        ) : null}
      </section>
    </main>
  );
}
