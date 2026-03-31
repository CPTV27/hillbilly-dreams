# HUCK TECH REPORT — March 27, 2026
## Platform Architecture, Product State, and Priority Roadmap
**Compiled by:** Huck (Chief of Staff / Build Agent)
**Date:** March 27, 2026

---

## EXECUTIVE SUMMARY

The platform is live and stable. All 11 domains returned 200 as of the Vercel Pro consolidation completed today. The infrastructure is clean. The product has honest gaps between what's built and what's promised. The April 27 launch is achievable if 4 specific capabilities ship in the next 31 days. Here is the full picture.

---

## 1. PLATFORM ARCHITECTURE

### Monorepo Structure

```
hillbilly-dreams/
├── apps/
│   └── web/              # Next.js 14.2.0 — the entire product
│       ├── app/          # All route groups (touring, directory, measurably-better, etc.)
│       ├── lib/          # API clients, AI, auth, embeddings, data services
│       └── config/       # domain-routes.ts (hostname → route group mapping)
├── packages/
│   ├── database/         # Prisma schema (51 models), seed scripts, staging dir
│   ├── config/           # tokens.css (25+ theme classes), design tokens
│   ├── shared/           # Shared utilities
│   ├── ui/               # UI component library
│   ├── apple-kit/        # macOS automation scripts
│   └── mcp-server/       # MCP server (in development)
├── e2e/                  # Playwright E2E tests (80 routes)
└── AGENT_LEDGER.md       # Multi-agent coordination log
```

**Package Manager:** pnpm v9 only. npm breaks on `workspace:*` protocol.
**Framework:** Next.js 14.2.0, App Router, TypeScript

### Deployment: Vercel Pro [PRODUCTION]

- **Project:** `hillbilly-dreams` (`prj_Lv9eXtk1M2R3QCQrwNmI33eigHSf`)
- **Team:** `chase-piersons-projects` (me@chasepierson.tv)
- **Repo:** `CPTV27/hillbilly-dreams`, branch `main`
- **Root directory:** `apps/web` (set in Vercel dashboard)
- **Deploy:** `git push origin main` → auto-build → auto-deploy
- **Last deploy:** March 27, 2026 ~16:00 CT (commit `6cd3942`)

**Decommissioned today:** Firebase App Hosting, Cloud Run `bmt-web` (still exists in GCP, needs `gcloud auth login` to delete), 11 stale Vercel projects, Cloudflare proxy (now DNS-only).

### Database: Neon Postgres [PRODUCTION]

- **ORM:** Prisma, 51 models, `packages/database/prisma/schema.prisma` (1,150 lines)
- **Extensions:** pgvector (IVFFlat cosine index for embeddings)
- **Preview features:** `postgresqlExtensions` — `Unsupported("vector(768)")` on Embedding model means Prisma skips it; all vector ops use raw SQL

**All 51 models:** Article, Playlist, Event, NewsletterIssue, Contact, Metric, MetricSnapshot, BridgeClient, SocialAccount, SocialPost, Client, Review, ContentCalendar, Report, Invoice, ClientIntegration, PublishJob, Artist, Track, Split, SyncOpportunity, SyncSubmission, PRORegistration, RoyaltyPayment, Showcase, ShowcaseSlot, TourStop, PhotoSession, Photo, PhotoClaim, Publication, User, Account, Session, VerificationToken, LaunchTask, ContentPack, OpsActivity, ChatMessage, ArtistProfile, Artwork, ArtOrder, ArtistApplication, DirectoryBusiness, HDXNode, SpatialScan, NotebookDrop, Embedding, CensusData, EconomicIndicator, EnrichmentJob

**Seeded:** 19 Natchez businesses in `DirectoryBusiness`. **Empty:** CensusData, EconomicIndicator, Embedding, MetricSnapshot (new), most Records-domain tables, Track.

### DNS: Cloudflare → Vercel [PRODUCTION]

All domains: A record → `76.76.21.21`, www CNAME → `cname.vercel-dns.com`. DNS-only (gray cloud). Vercel handles SSL.

### Monitoring

- **Sentry:** Configured (client/server/edge). Source maps NOT uploading — `SENTRY_AUTH_TOKEN` missing from Vercel env.
- **GA4:** Configured via `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Checkly:** Config present at `checkly.config.ts` — status unclear post-migration

---

## 2. ALL 11 DOMAINS — STATUS

| Domain | Route Group | Status | Notes |
|--------|------------|--------|-------|
| measurablybetterthings.com | /measurably-better | [LIVE/WORKING] | Hero copy violates honest-claims rule; notebook 500 |
| measurablybetter.life | /measurably-better | [LIVE/WORKING] | Alias domain |
| bigmuddytouring.com | /touring | [LIVE/WORKING] | Weddings 500 bug fixed; Cloudbeds not connected |
| deepsouthdirectory.com | /directory | [LIVE/WORKING] | Enrichment blocked by missing GOOGLE_MAPS_API_KEY; crons unscheduled |
| hillbillydreamsinc.com | /hillbilly | [LIVE/WORKING] | GChat bot reachable now; GCP registration pending |
| bigmuddyentertainment.com | /entertainment | [LIVE/THIN] | Single placeholder page; full build needed |
| outsidereconomics.com | /economics | [LIVE/WORKING] | Recently restyled; demo-ready |
| bigmuddymagazine.com | /magazine | [LIVE/WORKING] | Demo data; no editorial workflow |
| bigmuddyradio.com | /radio | [LIVE/WORKING] | No audio hosting; no episodes released yet |
| buycurious.art | /gallery | [LIVE/WORKING] | Demo data; intake not active |

**Internal/admin routes (auth-gated, accessible on any domain):** /admin/login through /admin/newsletter, /ops/*, /tracy, /amy, /portal/*, /media/*, /records/*, /studio, /tuthill, /book

---

## 3. PRODUCT STATE (HONEST)

### Built and Demoable TODAY [PRODUCTION]
11 live domains returning 200, MBT pricing page, Big Muddy Inn full site, wedding brochure (printable), Directory submit writing to DB, Outsider Economics content site, Magazine with 18 city guides, Radio with animated waveform, Art gallery, Holding company pitch deck, Metrics endpoint (time-series), Auth system (Google OAuth + credentials), RBAC, Sentry (partial), Vector search endpoint (empty until reindex), QuickBooks OAuth integration, 25+ theme classes, Google Chat bot endpoint.

### Built but Broken [BROKEN]
- `/measurably-better/notebook` — 500, NotebookDrop not in prod DB schema
- Some `/api/ops/*` routes — 500 after restore from `_disabled/`
- Directory enrichment — silently fails (no `GOOGLE_MAPS_API_KEY`)
- Vector search — returns empty (Embedding table has 0 rows, reindex not run)
- Census/BLS data — 0 rows, crons not scheduled
- Sentry source maps — `SENTRY_AUTH_TOKEN` not set
- S2PX db-health-cron — fails at "Fetch Secrets" (`SLACK_WEBHOOK_URL` missing)

### Specced but Not Built [NOT BUILT]
Social media publishing (Hootsuite replacement), Review management flow, Google Business Profile OAuth takeover, Monthly report card PDF, Competitor snapshot, Big Muddy Entertainment full page, MBT homepage hero rewrite, Cloudbeds integration, Directory social layer (referrals/endorsements/network map), Directory content prompt system, Three-mode app (Text/Tasks/Gallery), Editorial workflow (magazine), Basic ticketing, Visual dashboard, Email newsletter, MelodyVault/Records features, CivicX municipal platform, MB Learn.

### Aspirational (No Spec)
Morning briefing SMS push, voice-to-action bookkeeping, ambient mode, photo magic moment, decision card stack, streak/habit loop, migration calculator UX.

---

## 4. DESIGN SYSTEM STATE

### Token System [PRODUCTION]
- **Location:** `packages/config/tokens.css`, 25+ theme classes
- **Naming:** `--bg` / `--surface` / `--text` / `--accent` / `--border` (never `--app-*`)
- **Font variables:** `--font-body` / `--font-display` (never hardcode `font-family`)

**Font Firewall (HARD RULE):**
- MBT pages: Inter ONLY. No Abril Fatface.
- Big Muddy brand pages: Abril Fatface display + Inter body.

**QC violations (March 27 audit — 30 violations total):**
- 7 MBT pages with hardcoded `font-family` in inline styles
- Multiple pages with hardcoded hex colors
- 9 route files with stale `gemini-1.5-pro-002` strings (should use `pickModel()` from `@/lib/ai-models`)

### Photo / Image Situation
- 604 photos in GCS bucket `bmt-media-bigmuddy`. 59 reviewed/used. 545 in `archive/` unreviewed.
- Real photos preferred over AI-generated (AI images show garbled text at full resolution).
- No admin photo picker — hardcoded URLs in components. Gap for content management.
- Missing shots: business owner at counter, overhead food, golden hour storefront, barber mid-cut.

---

## 5. DATA PLATFORM

### Key API Endpoints

**Working [PRODUCTION]:** `GET /api/search`, `POST /api/directory/submit`, `POST /api/metrics`, `GET /api/data/health`, `/api/ingestion/quickbooks`, `/api/ingestion/google`, `/api/gchat/bot`, `/api/gchat/pending`, `/api/gchat/reply`

**Blocked by missing env vars:** `POST /api/directory/enrich` (needs `GOOGLE_MAPS_API_KEY`), `POST /api/embeddings/index` (needs Vertex auth), `POST /api/cron/sync-census` (needs `BLS_API_KEY`)

**Known issue:** `GET /api/directory` reads from `Client` table; `POST /api/directory/submit` writes to `DirectoryBusiness` table. Two separate tables, no FK between them. Discrepancy needs resolution.

### Cron Jobs — ALL UNSCHEDULED
`/api/cron/process-enrichment-queue` (every 5 min), `/api/cron/enrich-directory` (weekly), `/api/cron/sync-census` (annually), `/api/cron/sync-bls` (monthly). No Vercel Cron or Cloud Scheduler confirmed active for any of these.

### Integrations
- **Cloudbeds:** Fully specced, Prisma model ready, code skeleton written. NOT connected. Missing `CLOUDBEDS_API_KEY`, `CLOUDBEDS_PROPERTY_ID`. `lib/cloudbeds.ts` and `/api/webhooks/cloudbeds` not yet built.
- **MelodyVault/Records:** Prisma models exist. No API routes, no UI. Not started.
- **QuickBooks:** Working OAuth integration. Does NOT yet write `MetricSnapshot` rows (Ledger flagged gap).

---

## 6. TESTING & QUALITY

### E2E Coverage
- **80 routes** covered by Playwright (`e2e/routes.spec.ts`)
- **Last result:** 28/29 passed. 1 failure (`/touring/inn/weddings` Server Component bug) — fixed in file, needs fresh server run to confirm
- **Additional:** `e2e/smoke.spec.ts` (brand visibility), `apps/web/tests/kioskmode.spec.ts` (kiosk + printable)
- **Gaps:** Auth flows, form submissions, API responses, DB writes, payment flows, production URL verification

### Build
- Last confirmed: commit `6cd3942`, Vercel ~16:00 CT March 27
- Build risk: pgvector `previewFeatures` + `Unsupported("vector(768)")` — verify after schema changes

### Known 500 Errors
- `/measurably-better/notebook` — NotebookDrop not in prod DB
- Some `/api/ops/*` routes — restored from `_disabled/`, needs audit

### Auth
- Re-enabled today. Import path: `@/lib/auth`. NextAuth v5, Google OAuth + credentials.

---

## 7. TECHNICAL DEBT & PRIORITIES

### Top 10 by Impact

1. **MBT Hero Copy Rewrite** — violates honest-claims rule, weakens every demo. File: `apps/web/app/measurably-better/page.tsx`. [ROUTE TO FRONTEND + VOICE AGENTS]

2. **Big Muddy Entertainment Full Page** — thin placeholder, should be the entertainment flywheel story. Files: `apps/web/app/(entertainment)/page.tsx`, `entertainment.css`, `layout.tsx`. No names on public pages until JP deal signed.

3. **Social Media Publishing Pipeline** — blocks $99 value prop. FB/IG/Google Posts OAuth + queue + scheduling + approval flow. Ship by Apr 21.

4. **Review Management Flow** — GBP → AI draft → text approval → post back. Core $99 differentiator. Ship by Apr 14.

5. **Google Business Profile Takeover (Onboarding Flow 1)** — first onboarding flow, mostly built. Ship by Apr 7.

6. **GOOGLE_MAPS_API_KEY + Enrichment Cron** — enrichment pipeline built but silently failing. Add key to Vercel, enable Places API (New) in GCP `bigmuddy-ff651`, schedule `process-enrichment-queue` cron, run reindex once. ~4 hours.

7. **NotebookDrop 500 Fix** — `prisma db push` against prod. ~30 minutes.

8. **QC Sweep: Fonts, Colors, Model Strings** — 30 violations. Replace hardcoded fonts/hex/model names with CSS vars and `pickModel()`. ~1-2 days.

9. **SENTRY_AUTH_TOKEN** — add to Vercel, enables source map uploads, makes error debugging fast. ~15 minutes.

10. **Cloudbeds Phase 1** — Inn revenue not visible to platform. Get API key, set env vars, build `lib/cloudbeds.ts`, wire to `/api/metrics`. ~3-5 days.

### What Blocks the Demo
Hard blockers: social media publishing pipeline, GBP OAuth onboarding, MBT hero copy. Can demo without: review management (show mock), competitor snapshot (show design), Cloudbeds.

### What Blocks April 27 Launch
Social media publishing, review management, GBP onboarding, competitor snapshot, honest claims on MBT page, Big Muddy Entertainment page full build.

---

## APPENDIX: MISSING ENV VARS

| Variable | Purpose | Status |
|----------|---------|--------|
| `GOOGLE_MAPS_API_KEY` | Directory enrichment | NOT CONFIRMED in Vercel |
| `BLS_API_KEY` | BLS employment data | NOT CONFIRMED |
| `CLOUDBEDS_API_KEY` | Inn PMS | NOT SET |
| `CLOUDBEDS_PROPERTY_ID` | Inn identifier | NOT SET |
| `CLOUDBEDS_WEBHOOK_SECRET` | Webhook verification | NOT SET |
| `SENTRY_AUTH_TOKEN` | Source map uploads | NOT SET |
| `VERTEX_PROJECT_ID` | Embeddings | Defaults to `bigmuddy-ff651` — confirm |
| `VERTEX_LOCATION` | Embeddings region | Defaults to `us-east4` — confirm |

---

*Sources: AGENT_LEDGER.md, CONTEXT_DUMP.md, INFRA_ALIGNMENT_2026-03-27.md, URL_DIRECTORY.md, ENV_VARS.md, MONOREPO.md, HANDOFF_HEAD_OF_PRODUCT_2026-03-27.md, PRODUCT_CAPABILITIES.md, FEATURE_TIERS.md, PRODUCT_GAP_ANALYSIS.md, PRODUCT_ONBOARDING_PROMPT.md, APP_UX_SPEC.md, UX_RETHINK.md, DESIGN_SYSTEM.md, DESIGN_VISION.md, BRAND_DESIGN_RULES.md, AG_DESIGN_HANDOFF.md, DATA_HANDOFF_PROMPT.md, LEDGER_TO_HUCK_HANDOFF.md, DIRECTORY_CONTENT_ENGINE_SPEC.md, DIRECTORY_SOCIAL_SPEC.md, cloudbeds-integration.md, melodyvault-integration.md, HUCK_TEST_HANDOFF.md, e2e/routes.spec.ts, feedback_qc_policy.md, feedback_verify_deploys.md, feedback_ai_model_routing.md, project_token_system.md, project_photo_library.md, Prisma schema*
