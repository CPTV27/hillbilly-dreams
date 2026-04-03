# Workflow decisions (deferred / product)

**Purpose:** Record choices that unblock engineering without hiding risk. Update when product changes.

---

## 2026-04-05 — API security & logging

- **`/api/metrics` (GET/POST/PUT) and `/api/metrics/[key]`:** Mutations require **`requireCronOrAdmin`** (Bearer `CRON_SECRET` in production or admin session). **GET** requires **admin session** — HQ dashboard only.
- **`POST /api/publish/batch`:** Callers in production must send **`Authorization: Bearer ${CRON_SECRET}`** for cron; admin UI uses session (unchanged; see `lib/cron-or-admin.ts`).
- **`POST /api/marketing/scout-photo`:** Remains **public** (field demo / Scout flow). Vertex cost is accepted; add rate limits or token auth later if abused.
- **`POST /api/ops/chat` (Delta Dawn):** Remains **session-optional** (anonymous allowed). Tightening to require auth is a product change — track separately.

---

## Tier & pricing language (reconciled)

| Source | Role |
|--------|------|
| **`docs/DSD_MARKETING_COPY.md`** | **Tier names** for public copy: **Free / Core / Growth / Partner**. Retail dollar amounts **TBD** in that doc. |
| **`CLAUDE.md`** (DSD table) | **Walk-in / ops** canonical **dates and prices** when you ship retail ($20 / $49 / $99 ladder with effective dates). |
| **`docs/BUSINESS_ARCHITECTURE.md`** | Three-layer business model; align tier bullets with the two above — do not invent a third naming scheme. |

**Rule:** Customer-facing pages say **“Deep South Directory”** and tier names from marketing copy; **do not** put **Measurably Better Things** in walk-in customer copy.

---

## Sentry (source maps)

- **`SENTRY_AUTH_TOKEN`:** Add to **GitHub Actions** repository secrets so **CI `build`** uploads maps (see `apps/web/next.config.mjs` `withSentryConfig`).
- **Alternative:** Vercel **Sentry** integration uploads maps without GitHub secret.
- **`instrumentationHook`:** Left **disabled** in `next.config.mjs` (OpenTelemetry + edge conflict noted there). Sentry uses `sentry.server.config.ts` / client / edge configs.

---

## Database

- **Prisma migrate baseline / prod `db push`:** **Chase/CC approval only** — not automated here.

---

## Dependabot / supply chain

- Triage **critical/high** in **small PRs** with green CI.
- **Deferred** low/moderate: document here if you consciously skip (package name + CVE + next review date).
- **2026-04-05 `pnpm audit`:** 42 findings (1 critical, 18 high, …) across transitive deps (e.g. **checkly → lodash**, **path-to-regexp** via **@google/genai** chain). Address in targeted bumps; not a single bulk upgrade.
