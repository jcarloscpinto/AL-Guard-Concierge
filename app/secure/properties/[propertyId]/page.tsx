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

export default async function SecurePropertyPage({
  params,
  searchParams,
}: {
  params: Promise<{ propertyId: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { propertyId } = await params;
  const resolvedParams = await searchParams;

  const tenantId = getSingleParam(resolvedParams, "tenant_id") ?? "";
  const userId = getSingleParam(resolvedParams, "user_id") ?? null;
  const role = getSingleParam(resolvedParams, "role") ?? null;
  const claimsTenantId =
    getSingleParam(resolvedParams, "claims_tenant_id") ?? null;
  const propertyScope =
    getSingleParam(resolvedParams, "property_scope") ?? null;

  const uiAccess = resolvePropertyReadUiAccess({
    userId,
    role,
    claimsTenantId,
    tenantId,
    propertyId,
    propertyScope,
  });

  const roleLabel = role ?? "unknown";
  const scopeLabel = propertyScope ?? "tenant default scope";

  if (!uiAccess.allowed) {
    const guidance = getForbiddenGuidance(uiAccess.reason);

    return (
      <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
        <section className="rounded-2xl border border-rose-200 bg-rose-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-rose-700">
            Access blocked
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-rose-950">
            {guidance.title}
          </h1>
          <p className="mt-4 text-rose-900">{guidance.message}</p>
          <p className="mt-2 text-sm text-rose-800">
            If this persists, contact Internal Admin for access verification.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-md border border-rose-300 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2"
              href="/"
            >
              Back to home
            </Link>
            <Link
              className="rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white hover:bg-rose-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700 focus-visible:ring-offset-2"
              href={`/forbidden?reason=${uiAccess.reason}&property_id=${encodeURIComponent(propertyId)}&tenant_id=${encodeURIComponent(tenantId)}`}
            >
              Open guidance page
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Access granted
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-emerald-950">
          Property {propertyId}
        </h1>
        <p className="mt-4 text-emerald-900">
          UI actions are gated by the same policy engine as secure API routes.
        </p>
        <dl className="mt-4 grid gap-2 text-sm text-emerald-900">
          <div>
            <dt className="font-semibold">Active role</dt>
            <dd>{roleLabel}</dd>
          </div>
          <div>
            <dt className="font-semibold">Tenant context</dt>
            <dd>{tenantId || "unknown"}</dd>
          </div>
          <div>
            <dt className="font-semibold">Scope context</dt>
            <dd>{scopeLabel}</dd>
          </div>
        </dl>
        <ul className="mt-6 list-disc pl-5 text-sm text-emerald-900">
          {uiAccess.visibleActions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
