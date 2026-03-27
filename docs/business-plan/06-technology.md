# 6. Technology Platform & Product State

**Author:** Huck (Tech Agent / Chief of Staff)
**Date:** March 27, 2026
**Status:** Honest engineering assessment. No vaporware.

---

## 6.1 Platform Architecture

### Monorepo Structure

The entire HDI ecosystem runs as a single Next.js 14.2 application inside a pnpm monorepo.

```
hillbilly-dreams/
  apps/web/           # Next.js 14.2.35 — the product
  packages/
    database/         # Prisma 5.14 schema + client (51 models)
    config/           # tokens.css, brand config
    shared/           # Shared utilities
    ui/               # Shared UI components
    apple-kit/        # macOS automation scripts
  e2e/                # Playwright smoke tests
  docs/               # Documentation
```

**Package manager:** pnpm 9.0 with workspace protocol. npm will not work.

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| Next.js | 14.2.35 | App framework, SSR, API routes |
| React | 18.3 | UI library |
| Prisma | 5.14 | ORM for Neon Postgres |
| NextAuth | 5.0.0-beta.30 | Authentication (Google OAuth + credentials) |
| Stripe | 20.4 | Payments, subscriptions, Connect |
| @sentry/nextjs | 10.46 | Error tracking (configured 3/27) |
| @google/genai | 1.46 | Gemini AI integration |
| @anthropic-ai/sdk | 0.78 | Claude AI integration |
| Tailwind CSS | 3.4 | Utility-first styles |
| Framer Motion | 12.35 | Animations |
| Three.js / R3F | 0.183 | 3D rendering (SuperChase platform) |

### Deployment: Vercel Pro

As of March 27, 2026, all hosting is consolidated on a single Vercel Pro project.

| Component | Detail |
|-----------|--------|
| **Platform** | Vercel Pro |
| **Project** | `hillbilly-dreams` (ID: `prj_Lv9eXtk1M2R3QCQrwNmI33eigHSf`) |
| **Team** | `chase-piersons-projects` (me@chasepierson.tv) |
| **Git repo** | `CPTV27/hillbilly-dreams`, branch `main` |
| **Root directory** | `apps/web` |
| **Deploy trigger** | Push to `main` = auto-build + auto-deploy |
| **Build command** | `NODE_OPTIONS='--max-old-space-size=7168' next build` |

**Previous platforms (deprecated 3/27):** Firebase App Hosting and Cloud Run have been decommissioned. Dockerfile, apphosting.yaml, .firebaserc, and firebase.json have been deleted from the repo. There were 11 days (March 16-27) where deploys were silently broken because a repo rename severed the Firebase connection while CI kept passing.

### Database: Neon Postgres

- **Provider:** Neon (serverless Postgres)
- **ORM:** Prisma 5.14
- **Models:** 51 total
- **Connection:** Via `DATABASE_URL` env var in Vercel

Key model groups:
- **Content:** Article, Playlist, Event, NewsletterIssue, Publication, ContentPack, ContentCalendar
- **Directory/SMB:** DirectoryBusiness, Client, ClientIntegration, Review, Report, Invoice, SocialAccount, SocialPost, PublishJob
- **Music/Records:** Artist, Track, Split, SyncOpportunity, SyncSubmission, PRORegistration, RoyaltyPayment
- **Gallery:** ArtistProfile, Artwork, ArtOrder, ArtistApplication
- **Hospitality:** TourStop, PhotoSession, Photo, PhotoClaim, Showcase, ShowcaseSlot
- **Civic/Data:** CensusData, EconomicIndicator, EnrichmentJob, HDXNode
- **Platform:** User, Account, Session, VerificationToken, Embedding, NotebookDrop, SpatialScan
- **Ops:** Contact, Metric, MetricSnapshot, BridgeClient, LaunchTask, OpsActivity, ChatMessage

### DNS: Cloudflare

All 11 domains managed under the ChasePierson.TV Cloudflare account, set to DNS-only (gray cloud, no proxy). Vercel handles CDN and SSL.

- **Apex domains:** A record to `76.76.21.21` (Vercel)
- **www subdomains:** CNAME to `cname.vercel-dns.com`

### Monitoring

- **Sentry:** Configured 3/27 with client, server, and edge configs. Source maps not yet uploading (needs `SENTRY_AUTH_TOKEN` env var).
- **Google Analytics 4:** Integrated across public pages.
- **Checkly:** Synthetic monitoring (currently limited to smoke test).

### Other GCP Services Still in Use

| Service | Purpose |
|---------|---------|
| Neon Postgres (via Prisma) | Primary database |
| Cloud Storage (`bmt-media-bigmuddy`) | 604 photos |
| Cloud Scheduler | Cron jobs (6 active) |
| Vertex AI / Gemini | AI model inference |
| Secret Manager | Some legacy secrets (migrating to Vercel env vars) |

---

## 6.2 All 11 Domains -- Status

The platform uses hostname-based routing via middleware. A single Next.js app serves all domains, rewriting incoming requests to the correct route group based on the hostname match in `apps/web/config/domain-routes.ts`.

### Domain Status Table

| # | Domain | Route Group | Content | Status (3/27) | Notes |
|---|--------|-------------|---------|---------------|-------|
| 1 | **measurablybetterthings.com** | /measurably-better | MBT SaaS product landing, pricing, technology, thesis, enterprise | 200 | Hero copy needs rewrite (generic, overclaims). `/notebook` returns 500 (NotebookDrop not in prod schema). |
| 2 | **bigmuddytouring.com** | /touring | Big Muddy Inn, hospitality, weddings, events, blog, touring route | 200 | Primary editorial hub. Working well. Dark warm aesthetic. |
| 3 | **deepsouthdirectory.com** | /directory | Deep South Directory -- submit, onboard, dashboard | 200 | Core revenue product. Submit and onboard forms functional. Dashboard needs build-out for paid clients. |
| 4 | **hillbillydreamsinc.com** | /hillbilly | HDI holding company, directory pitch, Scan2Plan proposal | 200 | Investor-facing. Clean. Working. |
| 5 | **bigmuddyentertainment.com** | /entertainment | Entertainment hub | 200 | Currently a stub. Full story page (Records, Radio, Touring, Rise Up, Talent Search, Community Enrichment) specced but not built. |
| 6 | **outsidereconomics.com** | /economics | Outsider Economics -- field manual, the math, community, rise up | 200 | Content pages live. Working. |
| 7 | **bigmuddymagazine.com** | /magazine | Magazine articles, city guides | 200 | Content pages render. No editorial workflow backend yet. |
| 8 | **bigmuddyradio.com** | /radio | Radio playlists, live sessions, podcast, directory | 200 | Pages render. No audio hosting -- links to external streaming. |
| 9 | **buycurious.art** | /gallery | Art gallery -- artists, about, apply | 200 | Application flow built. Gallery management in admin. |
| 10 | **superchase.app** | /platform | SuperChase platform | 200 | Three.js/R3F experimental interface. Demo-only. |
| 11 | **measurablybetter.life** | /measurably-better | Alias for MBT | 200 | Same route group as measurablybetterthings.com. |

**Total public pages:** 113 across all domains.

**Admin/internal routes (behind auth):** 37 routes including /admin/*, /ops/*, /tracy, /amy, /portal/*, plus internal tools (/media/*, /records/*, /studio, /tuthill, /book).

---

## 6.3 Product State (Honest)

This section is governed by one rule: we only claim what is demoable on Chase's phone today. The gap analysis at `~/tax-db/PRODUCT_GAP_ANALYSIS.md` is the canonical source of truth.

### Built and Demoable TODAY

| Capability | Route/Feature | Evidence |
|-----------|---------------|----------|
| AI business directory listings | `/directory/submit`, `/directory/[slug]` | DirectoryBusiness model, submit API, slug-based pages |
| Google review monitoring alerts | `/api/cron/sync-google` | Cron job exists, Google Places API integration |
| QuickBooks OAuth integration | `/api/ingestion/quickbooks`, `/api/cron/sync-qbo` | OAuth flow, P&L pull, sync cron |
| AI chat against business data | `/api/ai/analyze` | Gemini-powered analysis endpoint |
| Stripe payment processing | `/api/stripe/checkout`, `/api/stripe/webhook`, `/api/billing/*` | Checkout, subscriptions, webhooks |
| Multi-tenant hostname routing | `middleware.ts` + `domain-routes.ts` | 11 domains, 17 pattern matches, all returning 200 |
| Auth with role-based access | NextAuth 5, `requireAdmin()`, `requireRole()` | Re-enabled 3/27 after debugging bypass |
| Content CMS (articles, events, playlists, newsletters) | `/api/articles/*`, `/api/events/*`, `/api/playlists/*`, `/api/newsletter/*` | Full CRUD APIs |
| Client management | `/api/clients/*` | Client model, reviews, reports, integrations, calendar, voice |
| Social content generation | `/api/social/generate` | AI-generated posts from business data |
| Media pipeline | `/api/media/*` | Upload, enhance, generate, ingest |
| Gallery application flow | `/api/gallery/*` | Artist applications, approvals, artwork management |
| Cloudbeds integration (read-only) | `/api/integrations/cloudbeds`, `/api/cron/cloudbeds-sync`, `/api/webhooks/cloudbeds` | Just provisioned. Read-only API, sync cron, webhook receiver |
| Sentry error tracking | `@sentry/nextjs` configs | Client, server, edge -- configured 3/27 |
| Google Chat bot endpoint | `/api/gchat/bot` | Agent communication hub |

### Built but Broken or Incomplete

| Issue | Route/Feature | Severity | What Needs to Happen |
|-------|---------------|----------|---------------------|
| NotebookDrop 500 | `/measurably-better/notebook` | Medium | DB migration needed -- NotebookDrop model not in prod schema |
| Some ops API 500s | `/api/ops/*` | Low | Restored admin APIs need database context/seed data |
| Sentry source maps | Build pipeline | Low | Needs `SENTRY_AUTH_TOKEN` env var in Vercel |
| GCP orphan resources | Cloud Run `bmt-web` | Low | Old service still running. Needs `gcloud auth login` to delete |
| Social publishing | `/api/social/*` | HIGH | AI generates content but cannot auto-publish to FB/IG/Google. Manual copy-paste only. |
| Review response flow | `/api/clients/[id]/reviews/respond` | HIGH | Endpoint exists but not wired to Google review API for posting responses back |
| Monthly report PDF | `/api/clients/[id]/report` | HIGH | API exists but PDF generation not implemented |
| Competitor snapshot | N/A | HIGH | Not built. Core $99 demo closer. |
| MBT homepage copy | `/measurably-better/page.tsx` | Medium | Hero is generic ("Run your business, not your software"). Claims $1,350 savings -- violates honest-claims policy. Needs rewrite. |
| Entertainment page | `/(entertainment)/page.tsx` | Medium | Currently a stub. Full story page specced. |

### Specced but Not Built

| Feature | Spec Location | Ship Target | Revenue Impact |
|---------|--------------|-------------|----------------|
| Social media auto-publishing APIs | PRODUCT_GAP_ANALYSIS.md | Apr 21 | Blocks every $49 sale -- core promise |
| Review response flow (full round-trip) | PRODUCT_GAP_ANALYSIS.md | Apr 14 | Core $99 differentiator vs Yext |
| Monthly report card PDF | PRODUCT_GAP_ANALYSIS.md | Apr 21 | Retention tool -- proves value monthly |
| Competitor snapshot generator | PRODUCT_GAP_ANALYSIS.md | Apr 7 | Demo closer for walk-in sales |
| Text-message approval flow for social/reviews | PRODUCT_ONBOARDING_PROMPT.md | Apr 14 | Business owners don't log into dashboards |
| Content calendar management | Feature Tiers doc | Apr 21 | $49 tier feature |
| Migration Calculator page | PRODUCT_ONBOARDING_PROMPT.md | May | Powerful sales tool -- shows savings vs current stack |

### Aspirational (Not Specced for Near-Term)

- Visual analytics dashboard (charts, KPI cards) -- $499 tier
- Editorial workflow for magazine (drafts, editor review, publish pipeline)
- Basic ticketing engine for events
- Email newsletter automation (AI-drafted, approval flow)
- CivicX municipal platform (311, permits, records search)
- MB Learn K-12 AI curriculum
- KioskMode tablet interface
- Dynamic pricing engine for hospitality

---

## 6.4 Design System State

### Theme Architecture

The design system lives in `packages/config/tokens.css`. It defines CSS custom properties using the `--bg`/`--surface`/`--text`/`--accent` naming convention (NOT AG's `--app-*` convention).

**Root variables:** 80+ custom properties covering colors, typography, spacing, borders, shadows, z-index, transitions, and container widths.

**Theme classes found in tokens.css:** 21 total:

| Theme Class | Brand | Aesthetic |
|-------------|-------|-----------|
| `.theme-touring` | Big Muddy Touring | Dark warm, amber/gold, road-worn |
| `.theme-magazine` | Big Muddy Magazine | Aged newsprint, generous line height |
| `.theme-radio` | Big Muddy Radio | Deepest black, vinyl studio at night |
| `.theme-records` | Big Muddy Records | Music-forward dark |
| `.theme-gallery` | Buy Curious Art | Gallery aesthetic |
| `.theme-gallery-funky` | Buy Curious (alt) | Funkier gallery variant |
| `.theme-economics` | Outsider Economics | (2 definitions in file) |
| `.theme-hillbilly` | HDI Holding Company | (2 definitions in file) |
| `.theme-bm-entertainment` | Big Muddy Entertainment | Warm, editorial |
| `.theme-admin` | Admin interface | (2 definitions in file) |
| `.theme-inn` | Big Muddy Inn | Hospitality warmth |
| `.theme-mb` | Measurably Better | Swiss-clean authority |
| `.theme-mb-console` | MBT Console | Dashboard variant |
| `.theme-dsd` | Deep South Directory | Storefront brick accent, warm cream bg |

**Font strategy:**
- Display: `Playfair Display` with Georgia/Times New Roman serif fallback
- Body: `DM Sans` with system-ui sans-serif fallback
- Mono: `JetBrains Mono` with ui-monospace fallback
- All commercial fonts have free fallback chains so themes work today

**Font firewall rule:** MBT (Inter only) and Big Muddy (Abril Fatface display, Inter body) must never look related. Enforced per `feedback_qc_policy.md`.

### QC Policy (Enforced)

Per the 30-violation audit on 3/27:
1. **No hardcoded fonts** -- always `var(--font-body)` or `var(--font-display)`
2. **No hardcoded hex colors** -- always CSS custom properties
3. **No hardcoded AI model names** -- import from `@/lib/ai-models.ts` (`pickModel('reasoning')` / `pickModel('generation')` / `pickModel('editorial')`)
4. **No tech jargon on customer-facing pages**
5. **All deploys verified by hitting live URLs**, not CI status

### Photo/Image Situation

- **604 photos** in GCS bucket `bmt-media-bigmuddy`
- **545 unreviewed** -- bulk uploaded, no admin picker built yet
- Known issues: bad crops, missing alt text, no taxonomy
- Photo models: `PhotoSession`, `Photo`, `PhotoClaim` in Prisma schema
- Media API: `/api/media/*` handles upload, enhance, generate, ingest

---

## 6.5 Data Platform

### Database Tables and State

51 Prisma models mapped to Neon Postgres. Key tables and their state:

| Table | Status | Row Count Estimate | Notes |
|-------|--------|--------------------|-------|
| DirectoryBusiness | Seeded | ~20-50 | Natchez demo listings, some Clarksdale |
| Client | Sparse | <10 | Paid customer records -- pre-launch |
| Article | Seeded | ~30-50 | Magazine content, city guides |
| Event | Seeded | ~10-20 | Touring events |
| Playlist | Seeded | ~10 | Radio playlists |
| Artist | Seeded | ~15-20 | Records roster |
| Track | Seeded | ~50+ | Music catalog |
| User | Active | ~5-10 | Admin accounts (Chase, Tracy, Amy) |
| Contact | Growing | ~50+ | Lead/contact database |
| CensusData | Seeded | ~500+ | Mississippi census data via enrichment |
| EconomicIndicator | Seeded | ~100+ | County-level economic data |
| Embedding | Growing | Varies | Vector embeddings for search |
| NotebookDrop | BROKEN | 0 | Model not in prod schema -- blocks /notebook |

### API Endpoints

97 API route files across the following domains:

| Domain | Count | Key Endpoints |
|--------|-------|---------------|
| `/api/articles/*` | 3 | CRUD + slug lookup |
| `/api/clients/*` | 7 | Full client management, reviews, reports, voice, calendar |
| `/api/directory/*` | 5 | Submit, enrich, claim, slug lookup |
| `/api/social/*` | 5 | Accounts, posts CRUD, generate |
| `/api/billing/*` | 3 | Stripe checkout, subscribe, webhook |
| `/api/stripe/*` | 3 | Checkout, onboard (Connect), webhook |
| `/api/media/*` | 5 | Upload, enhance, generate, ingest, proxy |
| `/api/gallery/*` | 5 | Applications, approvals, artists, artworks |
| `/api/ai/*` | 2 | Analyze, notebook chat |
| `/api/cron/*` | 6 | Cloudbeds sync, dynamic pricing, enrichment queue, census, Google, QBO |
| `/api/newsletter/*` | 4 | CRUD, publish, subscribe |
| `/api/connect/*` | 3 | Onboard, status, webhook (Stripe Connect) |
| `/api/publish/*` | 3 | Batch, execute, status |
| Other | 43 | Auth, contacts, events, playlists, publications, tracks, search, embeddings, gchat, etc. |

### Cron Jobs (6 Active)

| Cron | Schedule | Status |
|------|----------|--------|
| `cloudbeds-sync` | Periodic | Just provisioned, read-only |
| `dynamic-pricing` | Periodic | Exists, untested in prod |
| `process-enrichment-queue` | Periodic | Data enrichment pipeline |
| `sync-census` | Periodic | Mississippi census data |
| `sync-google` | Periodic | Google Business Profile data |
| `sync-qbo` | Periodic | QuickBooks Online sync |

### Integrations

| Integration | Status | Direction |
|------------|--------|-----------|
| **Stripe** | LIVE | Bidirectional (checkout, webhooks, Connect) |
| **Google OAuth** | LIVE | Auth only |
| **QuickBooks Online** | LIVE | Read (OAuth, P&L pull, sync cron) |
| **Cloudbeds** | PROVISIONED | Read-only (API, sync cron, webhook receiver) |
| **Google Places API** | LIVE | Read (business data, reviews) |
| **Google Gemini (Vertex AI)** | LIVE | AI inference |
| **Claude (Anthropic)** | LIVE | AI inference |
| **Google Cloud Storage** | LIVE | Photo/media storage |
| **Sentry** | CONFIGURED | Error tracking |
| **Facebook/Instagram APIs** | NOT BUILT | Needed for social publishing ($49 tier) |
| **Google Posts API** | NOT BUILT | Needed for social publishing ($49 tier) |

---

## 6.6 Testing & Quality

### E2E Coverage

- **Framework:** Playwright (`@playwright/test` 1.58)
- **Test files:** 1 (`e2e/smoke.spec.ts`) with 2 tests
- **Route coverage expanded:** From 27 to 80 routes verified in URL directory audit (3/27), but these are documented routes, not automated tests
- **Automated test coverage is minimal** -- the smoke test checks that `/touring` loads and `/` renders without crashing

### Build Status

- **Production build works** on Vercel (last successful deploy: 3/27)
- **Build requires** `NODE_OPTIONS='--max-old-space-size=7168'` due to app size
- **TypeScript strict mode:** Enabled but numerous `any` types exist

### Known 500 Errors

| Route | Error | Fix |
|-------|-------|-----|
| `/measurably-better/notebook` | NotebookDrop model not in prod DB | Run Prisma migration |
| Some `/api/ops/*` routes | Missing DB context | Seed data needed |

### Auth State

- **Re-enabled 3/27** after being completely bypassed during debugging
- **Middleware:** `admin-auth.ts` and `requireRole.ts` enforce access control
- **Roles:** admin, ops, artist, viewer, citizen
- **Import path:** `@/lib/auth` (NOT `@/auth` -- updated 3/27)

---

## 6.7 Deep South Directory -- The Revenue Product

DSD is the product that generates revenue starting April 1, 2026. Everything else in the ecosystem supports it.

### Three-Tier Pricing (Final -- Decided 3/27)

| Tier | Name | Price | Stripe ID | Ship Date |
|------|------|-------|-----------|-----------|
| 1 | **The Listing** | $20/mo | `dsd-listing-20` | Apr 1 |
| 2 | **The Works** | $49/mo | `dsd-works-49` | Apr 21 (when social APIs ship) |
| 3 | **The Engine** | $99/mo | `dsd-engine-99` | Apr 14 (when review mgmt ships) |

### Feature Matrix

| Feature | The Listing ($20) | The Works ($49) | The Engine ($99) |
|---------|-------------------|-----------------|------------------|
| AI business listing on DSD | Yes | Enhanced | Premium + featured |
| Google review alerts | Yes | Yes | Yes |
| Monthly report card | Basic | Detailed | Full analytics |
| AI chat (knows your business) | Yes | Yes | Yes |
| Social posts generated | 1/week | 4/week | 4/week + custom |
| Social auto-publishing | No (manual) | Yes (FB, IG, Google) | Yes + scheduling |
| Content calendar | No | Yes | Yes |
| Review response drafts | No | No | Yes |
| Competitor watch | No | No | Yes (3 competitors) |
| QuickBooks integration | No | No | Yes |
| Magazine feature | No | No | Quarterly |
| Support | Email only | Email | Text Chase directly |

### Walk-In Sales Cadence

- **Week 1 (Apr 1):** "$20/mo" -- The Listing only. Demo 3 Natchez listings on phone.
- **Week 3 (Apr 14):** "$99 if you want reviews handled too" -- Review flow ships.
- **Week 4 (Apr 21):** "$49 for social posting" -- Social APIs ship, middle tier opens.
- **Target at 100 customers** (40/35/25 split): $4,555/mo recurring.

### What Must Ship by April 27 Launch

| Feature | Ship By | Blocks |
|---------|---------|--------|
| Competitor snapshot | Apr 7 | Demo closer |
| Review response flow | Apr 14 | $99 tier value prop |
| Social publishing APIs (FB, IG, Google Posts) | Apr 21 | $49 tier -- core promise |
| Monthly report card PDF | Apr 21 | Retention tool |

### The Honest Competitive Claim

**What we say:** "We replace your directory listing, review management, and social content creation. We connect to the tools you already use. Most businesses pay $500-800/month for Yext + Hootsuite + a freelancer. We do all three for $99."

**What we do NOT say:** "We replace 11 tools costing $2,839/month." That is aspirational. The gap analysis tracks what moves from "don't have" to "replace" as features ship. Marketing only claims what is in the "WE REPLACE" column.

### Gap Analysis Summary (as of 3/27)

| Status | Count | Functions |
|--------|-------|-----------|
| WE REPLACE | 1 | Business Directory |
| PARTIAL REPLACE | 5 | Magazine CMS, Events, AI Intel, Social, Municipal |
| WE INTEGRATE | 3 | Hotel/PMS (Cloudbeds), QuickBooks, Stripe/Payments |
| WE DON'T HAVE | 5 | Radio hosting, Record distro, Photography, Full e-commerce, Full social publishing |

---

## 6.8 Technical Debt & Priorities

### Top 10 Things to Fix, Ranked by Impact

| # | Issue | Impact | Effort | Blocks |
|---|-------|--------|--------|--------|
| 1 | **Social publishing APIs** (FB, IG, Google Posts) | Blocks every $49 sale | 2-3 weeks | $49 tier launch (Apr 21) |
| 2 | **Review response round-trip** (pull reviews, AI draft, text approve, post back) | Core $99 differentiator | 1-2 weeks | $99 tier credibility (Apr 14) |
| 3 | **Monthly report card PDF** | Retention tool | 1 week | Proving value to customers (Apr 21) |
| 4 | **Competitor snapshot** (3 competitors, 4 metrics, plain English) | Demo closer | 3-5 days | Walk-in conversion (Apr 7) |
| 5 | **MBT homepage copy rewrite** | First impression for every visitor | 2-3 days | Honest-claims compliance |
| 6 | **Entertainment page build** | Tells the ecosystem story | 3-5 days | Brand credibility |
| 7 | **NotebookDrop migration** | /notebook returns 500 | 1 hour | Demo route |
| 8 | **Sentry source maps** | Debugging production errors | 1 hour | Incident response quality |
| 9 | **Photo admin picker** | 545 unreviewed photos unusable | 2-3 days | Content quality |
| 10 | **Automated E2E test expansion** | 2 tests covering 80 routes is inadequate | 1-2 weeks | Regression safety |

### What Blocks the Demo (Today)

- MBT homepage overclaims $1,350/mo savings (violates honest-claims policy)
- Entertainment page is a stub (should tell the full brand story)
- `/measurably-better/notebook` returns 500

### What Blocks April 27 Launch

1. **Competitor snapshot** must ship by Apr 7 (demo ammunition)
2. **Review response flow** must ship by Apr 14 ($99 tier unlocks)
3. **Social publishing APIs** must ship by Apr 21 ($49 tier unlocks)
4. **Report card PDF** must ship by Apr 21 (retention proof)
5. **Stripe payment links** for all 3 tiers must be live and tested

---

## 6.9 MBT Ecosystem Architecture

The broader Measurably Better ecosystem is a single engine serving multiple verticals. The business model is not selling software -- it is selling ecosystem access (Directory, Magazine, Radio).

### Platform Product Lines

| Product Line | Vertical | Status | Revenue Model |
|-------------|----------|--------|---------------|
| **Deep South Directory** | SMB services | Building (Apr 1 launch) | $20/$49/$99/mo subscriptions |
| **Micromedia in a Bottle** | Hotel + media | Live (Big Muddy Inn) | Licensable to regional operators |
| **CivicX** | Municipal | Designed, not built | $9,600-18,000/yr (grant-funded) |
| **MB Learn** | K-12 education | Designed | Title IV-A / E-Rate funded |
| **SPX** | 3D scanning (AEC) | Paused | Available as capability |

### The 11 Onboarding Flows

The PRODUCT_ONBOARDING_PROMPT specifies 11 replacement flows, each targeting a specific tool category. Priority order by revenue impact:

| Priority | Flow | What It Replaces | Ship By |
|----------|------|-----------------|---------|
| P0 | GBP Takeover | Manual Google management | Apr 7 |
| P0 | Review Management | Yelp Business, Birdeye, Podium | Apr 14 |
| P0 | Social Media | Hootsuite, Buffer, Later | Apr 14 |
| P1 | Competitor Monitoring | SEMrush (simplified) | Apr 7 |
| P1 | Website/Listing | Wix, Squarespace | Apr 7 (mostly built) |
| P1 | QuickBooks Integration | Manual bookkeeping | Apr 7 (already built) |
| P2 | POS Integration | Square/Clover reporting | May |
| P2 | Email Marketing | Mailchimp, Constant Contact | June |
| P2 | Booking System | Cloudbeds (integrate, don't replace) | June |
| P3 | Ad Management | Google Ads agencies | Q3 |
| P3 | Magazine/Content | N/A (unique differentiator) | Q3 |

### Integration Philosophy

**Build where our AI layer is genuinely better:** Reviews, social content, competitive analysis, reporting.

**Integrate where tools are entrenched:** Cloudbeds ($300/mo, don't rebuild a PMS), DistroKid ($7/mo, don't rebuild music distribution), Square/Clover (entrenched POS), Mailchimp/Loops (commodity email).

**Never build:** Full hotel PMS, music distribution, audio hosting, print fulfillment, full POS, ADA compliance certification.

---

## 6.10 Agent Architecture

The platform is built and maintained by a federated agent swarm, coordinated through the AGENT_LEDGER.md.

| Agent | Role | Domain |
|-------|------|--------|
| **Huck** (CC) | Chief of Staff + Build | Infrastructure, deploys, routing, coordination |
| **Delta Dawn** | Big Muddy Ecosystem | Inn, magazine, radio, records, hospitality ops |
| **Ledger** | Data & Metrics | Database, census, enrichment, pricing, analytics |
| **Chuck** | Road Manager | Touring, venues, logistics, fleet, scheduling |
| **Rook** | Strategy (Chase-only) | HDI holding company, valuations, investors |

Communication flows through Google Chat (HDI Agent Desk space) with per-agent webhooks. The bot endpoint at `hillbillydreamsinc.com/api/gchat/bot` is live as of 3/27.

---

*Last verified: March 27, 2026, 16:45 CT. All 11 domains returning HTTP 200. Deploy pipeline is Vercel Pro, auto-deploy from main. The honest truth: we have a working multi-tenant platform with real integrations, real data, and real payments -- but the four features that make the $49 and $99 tiers sellable (social publishing, review responses, competitor snapshots, report PDFs) are not built yet. They ship in the next 25 days or the April 27 launch stalls.*
