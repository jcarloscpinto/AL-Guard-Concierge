import Link from "next/link";

export default function HomePage() {
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
            className="rounded-md bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800"
            href="/api/health"
          >
            Health endpoint
          </Link>
          <Link
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            href="/api/env-check"
          >
            Env check
          </Link>
        </div>
      </section>
    </main>
  );
}
