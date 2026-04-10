# Technical / Build — Operational Report & Forecast
**Author:** Patch (Technical Director)
**Date:** 2026-04-10
**Reporting period:** Q2 2026 + forward 24 months

---

## 1. Current State

**Mission:** Keep one Next.js monorepo deploying cleanly to one Vercel project while serving 14 domains, 5 tenants, and 9 MBT modules without cross-tenant data bleed.

**Owner:** Chase (CTO, solo). Backup: AI agents (Patch, Clem, CoS). No human backup engineer.

### Stack inventory (from `apps/web/package.json`)
- **Framework:** Next.js **14.2.35** App Router (not 15 — CLAUDE.md overstates). React 18.3, TypeScript 5.5.
- **Auth:** next-auth **5.0.0-beta.30** with `@auth/prisma-adapter`.
- **DB:** Prisma **5.14** client + PostgreSQL. Schema at `packages/database/prisma/schema.prisma` — **2,801 lines, ~125 models.**
- **CMS:** Sanity v3 (`@sanity/client` 6, `next-sanity` 9, `sanity` 3) — added in commit `3a85c51` civic-commerce pivot.
- **AI SDKs in tree:** `@anthropic-ai/sdk` 0.78, `@google/genai` 1.46, `@google-cloud/vertexai` 1.10, `@google-cloud/aiplatform` 6.5, `openai` 6.32. Model routing in `apps/web/lib/ai-models.ts` (340 lines).
- **Media/3D:** `sharp`, `@react-three/fiber`, `three`, `maplibre-gl`, `framer-motion` 12, `@react-pdf/renderer`.
- **Payments:** `stripe` 20.4.
- **Search:** `meilisearch`, `chromadb` (vector).
- **Observability:** `@sentry/nextjs` 10.46, OpenTelemetry SDKs + Google Cloud Trace exporter.
- **Realtime:** `socket.io` 4.7 via custom `tsx server.ts` dev entry (non-standard Next dev server).
- **Styling:** Tailwind 3.4 + inline CSS + CSS custom properties. CLAUDE.md says "Inline CSS (no Tailwind)" — **this is wrong**; Tailwind ships in the bundle. Needs doc correction or cleanup.

### Multi-tenant routing
- `apps/web/middleware.ts` (249 lines) — reads `apps/web/config/domain-routes.ts` and rewrites by hostname.
- `apps/web/config/tenants.ts` registers **5 tenants** (not 4 as CLAUDE.md says): `big-muddy`, `bearsville`, `studio-c`, `tuthill`, **`dctv`** (Downtown Community Television — added, not in CLAUDE.md).
- Magazine and radio domains consolidated to `bigmuddytouring.com` via Cloudflare Bulk Redirects (April 2026, per `domain-routes.ts` comment).
- Domain → route-group rewrite is substring-matched. `big-muddy` tenant owns 10 domains in one blob including `measurablybetter.life` and `hillbillydreamsinc.com`, which blurs the "MBT is a separate layer" architecture in `docs/BUSINESS_ARCHITECTURE.md`.

### Integrations live
Stripe · Cloudflare (DNS + Bulk Redirects + D1 for Google Chat bot) · GCS bucket `bmt-media-bigmuddy` · Cloudflare R2 · Sentry · Vercel (deploy + env vars) · Anthropic · Google AI Studio / Vertex (Imagen, Veo, Gemini) · OpenAI · ElevenLabs · Meilisearch · Chroma · Sanity · Postiz (Mac mini) · OpenBroadcaster (Mac mini) · Icecast (Mac mini) · Plex (Mac mini) · MusicBrainz + Spotify (keys pending per business architecture doc).

### Database (Prisma)
~125 models spanning: content (Article, Publication, Playlist), commerce (Invoice, Stripe Connect splits, ArtOrder), directory (DirectoryBusiness, BusinessProfile, DraftBusiness), touring (6 new models per Apr 1-2 ship), music rights (Artist, Track, Split, PRORegistration, RoyaltyPayment, SyncOpportunity), constellation graph (ConstellationNode/Edge), agent memory (AgentContext, AgentAction, ReasoningTrace, Decision), and civic-commerce institutional models (HDXNode, Entity, CommunityProfile, CreditLedger, Lore).

**Migration hygiene problem:** `packages/database/prisma/migrations/` contains exactly **one folder** (`20260405163000_constellation_layer`) plus `migration_lock.toml`. 125 models, one migration. This means the schema is being pushed via `prisma db push` or migrations are being regenerated ad hoc. **There is no migration history to audit or roll back.**

### Recent shipping (last 2 weeks of commits)
- `3889987` MBT product pages (overview, real-estate, civic)
- `faaaaf1` ecosystem demo presentation
- `3a85c51` **Civic-commerce OS pivot — institutional data model + Sanity CMS + domain consolidation** (the biggest arch commit in the window)
- `b960922` Page image editor (admin photo swap)
- `2f751b0` Entertainment pages, photo search, media pipeline docs
- `df01253` House Band page
- `d893118` MelodyVault ingestion (T7 drive → GCS → DB)
- `21d0e43`/`286345c` Google Chat bot on Cloudflare D1 (async write fix)
- `67426df` Type-error sweep (Set iteration, dup keys, implicit any)
- `854f4b5` **Merge `mini/main`** — the Mac-mini git remote was merged into the MacBook branch. Remote still wired (`ssh://ClawdBOT@192.168.4.37/Users/ClawdBOT/hillbilly-dreams`), which is a second working tree that can diverge silently.

### Headcount-equivalent
Chase (1.0 FTE as CTO) + AI agents (Patch for build, Clem for tokens, CoS for routing). **Zero human backup.** Studio C / Tuthill can consume specs but do not commit code to this repo.

### Quarterly spend
Unknown at this level of audit; itemized spend is Finance/Procurement scope. Known line items: Vercel, Cloudflare (DNS + D1 + Bulk Redirects), GCS `bmt-media-bigmuddy`, R2, Anthropic, Google AI/Vertex, OpenAI, Sentry, Meilisearch host (if hosted), ElevenLabs, Sanity, domain renewals (14). [?]

---

## 2. Strategic Growth

**Where engineering creates leverage:**

**6 months — platform-ize MBT as a config-driven product.** Today `tenants.ts` is the closest thing to multi-tenancy; feature flags per tenant are hardcoded arrays. To license MBT to a town, we need tenant provisioning as a data operation (DB row + DNS + env), not a code commit. Three initiatives:
1. **Tenant provisioning API** — one admin form creates a tenant, registers a domain, seeds directory, copies theme. Cuts institutional onboarding from "days of Chase" to "hours of Tracy."
2. **Schema rationalization** — 125 models is past the point where a single engineer can hold the graph in their head. Split into `content`, `commerce`, `directory`, `music`, `agents`, `civic` schemas and establish real migration history. **Prerequisite for any external audit, any SOC2 conversation, any investor data room.**
3. **AI cost governance** — `lib/ai-models.ts` routes by role but we have no per-tenant meter. Add request logging + monthly cost reports per module. Critical before institutional clients with fixed-fee SLAs.

**12 months** — Self-serve DSD signup (Stripe Checkout → tenant row → Sanity space), Mac-mini workloads migrated to redundant cloud or a second mini, automated photo pipeline from Lightroom to live pages.

**24 months** — Full "civic OS" platform sellable to 5+ institutions simultaneously without Chase in the loop for ops. Engineering team of 2-3 humans.

**Moat:** The 125-model graph itself is the moat once it's clean — nobody else has a directory + music rights + touring + civic data + agent memory schema that composes.

---

## 3. Operations

**Deploy cadence:** Vercel auto-deploy on push to `main`. Feature branches → preview URLs. No formal staging environment. CI = Vercel build. TypeScript check via `pnpm type-check`. No test suite on the web app beyond Playwright scaffolding in devDependencies.

**Secrets:** Vercel env vars are the active source; Bitwarden is the policy-level master store. Every key listed in CLAUDE.md (`ANTHROPIC_API_KEY`, `PERPLEXITY_API_KEY`, `GOOGLE_APPLICATION_CREDENTIALS_JSON`, `STRIPE_PAYMENT_LINK_*`) lives in both. **No automated drift check between Vercel and Bitwarden.**

**Monitoring:** Sentry wired (`@sentry/nextjs` 10.46). OpenTelemetry → Google Cloud Trace configured. Uptime monitoring for the 14 domains: **unclear / assumed absent.** [?]

**Incident response:** Informal. Chase gets paged by Sentry or by a Tracy text. No runbook, no on-call rotation, no status page.

**SPOFs:**
- One Vercel project, one Vercel account.
- One Postgres (assumed Vercel/Neon/external — not inspected). [?]
- One Mac mini at `192.168.4.37` running OpenBroadcaster, Icecast, Plex, Postiz, Open Notebook, **and a git remote**. Residential network, residential power. No UPS documented.
- One CTO (Chase).
- One GCS bucket.

**Runbook:** Does not exist for the tech stack. Broadcasting department has a partial service list in CLAUDE.md. **Action: create `docs/runbooks/` in Q2.**

---

## 4. Insurance & Risk

| Exposure | Severity | Covered? | Policy type |
|---|---|---|---|
| Customer data breach (DirectoryBusiness, Lead, Contact, User, Stripe customer IDs) | High | Unknown | **Cyber liability + Tech E&O** |
| Stripe payment fraud / chargeback exposure | Medium | Partial (Stripe dispute) | **Cyber + commercial crime** |
| Vercel outage / single-platform SPOF | High | Not insurable; mitigate | — |
| Mac mini physical loss (fire/theft/flood) kills broadcasting + git remote | High | **Partially — property/BOP, not data** | **BOP + cyber for data restoration** |
| AI provider rate-limit or deprecation (Anthropic/Gemini) | Medium | Not insurable | Contract SLAs |
| IP ownership dispute on MBT platform code vs client customizations | Medium | No | **Tech E&O** |
| GDPR/CCPA claim on directory data | Medium | No | **Cyber + regulatory defense** |
| Service outage causing institutional client SLA breach | High (once signed) | No | **Tech E&O with performance clause** |

**Top mitigation asks to Insurance & Risk dept:**
1. Quote a **$1M–$3M Cyber + Tech E&O** policy sized to MBT as a licensed OS.
2. Confirm BOP on the Mac-mini location covers data restoration, not just hardware.
3. DPA (data-processing addendum) template for every institutional contract — Legal dept.

---

## 5. Forecast — 3 Scenarios

| Metric | Conservative | Base | Aggressive |
|---|---|---|---|
| Infra spend Y1 (Vercel + DB + GCS + AI) | $18K | $36K | $90K |
| Infra spend Y3 | $36K | $90K | $300K |
| Eng headcount Y1 | 1 (Chase) + agents | 1 + 1 contractor | 2 FTE + Chase |
| Eng headcount Y3 | 2 FTE | 3–4 FTE | 6–8 FTE |
| Tenants supported | 5 (today) | 12 | 40+ |
| Key risk | Chase burnout, no backup | Schema debt blocks growth | Hiring mis-fires, platform fragmentation |

Conservative = dogfood-only through 2026, add one external pilot. Base = 3-5 institutional pilots, one hire. Aggressive = raise capital, hire eng team, scale MBT as a product.

**Scaling inflection points:**
- **5 tenants → 10:** hit DB performance limits, need migration history, need tenant provisioning API.
- **10 → 25:** need real staging env, CI tests, on-call.
- **25+:** need SRE function, multi-region, audit/compliance stack.

---

## 6. Asks

**From Chase (decisions needed within 30 days):**
1. Commit to **Prisma migration history reset + baseline**. One day of work to save a quarter of pain.
2. Decide fate of the `mini/main` git remote. Kill it or formalize it as a deploy-target mirror. Right now it's a silent divergence risk.
3. Approve creation of `docs/runbooks/` and a 1-page incident playbook.
4. Fix CLAUDE.md inaccuracies: Tailwind is in the stack; there are 5 tenants not 4; Next is 14.2 not 15.

**From other departments:**
- **Finance:** itemized SaaS spend for Q2 so Procurement can build the vendor register.
- **Legal:** DPA template + IP assignment for Studio C / Tuthill contributions.
- **Insurance:** Cyber + Tech E&O quote sized to MBT-as-platform.
- **Broadcasting Ops:** SLA definition for the Mac mini and a backup plan before hurricane season / before first institutional pilot ships, whichever is first.
- **Product Management:** a locked Q2/Q3 feature list so engineering isn't reactive.

**From capital:**
- **One contract backend engineer** (3-month engagement, ~$30K) to execute the schema rationalization and migration reset while Chase keeps shipping product pages.
- **$500/mo** for proper uptime monitoring + status page (BetterStack or similar).
- **$2K one-time** for a second Mac mini or cloud mirror of broadcasting stack.

**Timeline:** All asks actionable by May 1, 2026, so the first institutional pilot (Natchez or Vicki Wolpert) opens against a hardened stack rather than a hopeful one.

---

## Open Questions

- [?] Where is Postgres hosted — Neon, Vercel Postgres, Supabase, self-hosted? Not visible from package.json.
- [?] Actual Q2 spend per vendor — Procurement dept owns.
- [?] Is the Mac-mini git remote still receiving pushes, or is `854f4b5` the last merge?
- [?] Is there any test suite currently running in CI beyond `type-check`?
- [?] Does Sentry have an active paid plan or is it free-tier event-capped?
- [?] Uptime monitoring across 14 domains — who watches, how often?
- [?] Sanity Studio hosting — self-hosted at `/studio` or Sanity cloud?
