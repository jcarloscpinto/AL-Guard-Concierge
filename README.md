# AL Guard Concierge

AL Guard Concierge is a concierge-first operations platform concept for short-term rental property operations in Portugal.

The current focus is defining and validating an MVP that enables:

- tenant and property operational access control
- task lifecycle orchestration with SLA-oriented queues
- notifications, escalations, and scheduling
- evidence capture and auditability
- incident communications
- KPI reporting and decision gates
- billing/offboarding/GDPR operational flows

Core MVP technology direction:

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase Postgres + Supabase Storage (EU)
- Supabase scheduled functions for background operations
- Email integration (Resend or Postmark)
- Sentry for observability

Status: planning and MVP definition in progress.

## Runtime Bootstrap (Steps 1-2-3)

This repository now includes a baseline runtime scaffold for:

1. Next.js App Router + TypeScript + Tailwind
2. Supabase environment contract and client/server helpers
3. Playwright baseline e2e configuration and smoke tests

### Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file from example:

```bash
cp .env.example .env.local
```

3. Fill required values in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Run

```bash
npm run dev
```

Then check:

- `/` for app shell
- `/api/health` for runtime health check
- `/api/env-check` for env readiness

### E2E Baseline

```bash
npm run test:e2e
```
