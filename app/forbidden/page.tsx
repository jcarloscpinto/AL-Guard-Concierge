import Link from "next/link";
import {
  getForbiddenGuidance,
  type AccessDenyReason,
  DENY_REASONS,
} from "@/lib/access";

type SearchParams = Record<string, string | string[] | undefined>;

function getSingleParam(
  searchParams: SearchParams,
  key: string,
): string | undefined {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function parseReason(reasonParam: string | undefined): AccessDenyReason {
  if (!reasonParam) {
    return "auth_invalid";
  }

  const normalized = reasonParam.trim().toLowerCase();
  return DENY_REASONS.includes(normalized as AccessDenyReason)
    ? (normalized as AccessDenyReason)
    : "auth_invalid";
}

export default async function ForbiddenPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await searchParams;
  const reason = parseReason(getSingleParam(resolvedParams, "reason"));
  const propertyId = getSingleParam(resolvedParams, "property_id") ?? "unknown";
  const tenantId = getSingleParam(resolvedParams, "tenant_id") ?? "unknown";
  const guidance = getForbiddenGuidance(reason);

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          Forbidden guidance
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-amber-950">
          {guidance.title}
        </h1>
        <p className="mt-4 text-amber-900">{guidance.message}</p>
        <p className="mt-2 text-sm text-amber-800">
          Access guidance is shown here; internal policy diagnostics are logged
          in audit trails.
        </p>
        <dl className="mt-6 grid gap-2 text-sm text-amber-900">
          <div>
            <dt className="font-semibold">Tenant</dt>
            <dd>{tenantId}</dd>
          </div>
          <div>
            <dt className="font-semibold">Property</dt>
            <dd>{propertyId}</dd>
          </div>
        </dl>
        <div className="mt-8">
          <Link
            className="rounded-md border border-amber-300 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
            href="/"
          >
            Return to dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
