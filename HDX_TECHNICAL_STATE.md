# HDX_TECHNICAL_STATE.md
> Generated: 2026-03-24 by CC (Claude Code)
> Purpose: Authoritative technical handoff for Lead Cloud Architect. No marketing language. Codebase reality only.
> Scope: `/Users/chasethis/bmt` — the BMT monorepo (Big Muddy Touring / Hillbilly Dreams Inc. web platform)

---

## 1. THE CORE STACK

### Frontend
- **Framework:** Next.js 14.2.0 (App Router, not Pages Router)
- **React:** 18.3.0
- **Language:** TypeScript 5.5.0 (strict mode)
- **Package manager:** pnpm 9.0.0 (Turborepo monorepo)
- **Styling:** CSS-in-JS via inline `<style>` blocks for brand pages; global CSS tokens in `packages/config/tokens.css`; no Tailwind, no CSS Modules across the board — inline style objects on most components
- **State management:** None at the app level. React `useState`/`useEffect` only. No Zustand, Redux, or Jotai.
- **Animation:** Framer Motion 12.35.1 (installed, usage selective)
- **Forms:** react-hook-form + zod resolvers
- **Session:** `next-auth@5.0.0-beta.30` (JWT strategy, not database sessions)
- **Rendering:** `output: 'standalone'` in next.config.mjs — full SSR/SSG hybrid, no static export

### Backend
- **Runtime:** Node.js ≥20 (Next.js API routes — no separate Express server in this repo)
- **API structure:** REST via Next.js App Router Route Handlers (`app/api/**/route.ts`)
- **No tRPC, no GraphQL.** Flat REST with manual auth checks per route.
- **95 API routes** across editorial, CRM, billing, AI generation, social media, Stripe, webhooks, and ops tools
- **Validation:** Zod at API boundaries
- **Auth enforcement pattern:** Most public routes — no guard. `/ops/*` and `/admin/*` routes call `auth()` from next-auth; bridge routes use HMAC verification

### Database
- **Engine:** PostgreSQL (Cloud SQL or compatible — `provider = "postgresql"` in Prisma schema)
- **ORM:** Prisma 5.14.0 (`@prisma/client` + `@bigmuddy/database` workspace package)
- **Connection:** `DATABASE_URL` (pooled) + `DIRECT_DATABASE_URL` (direct, for migrations) via environment
- **Binary targets:** `["native", "debian-openssl-3.0.x"]` — built for Cloud Run (Debian) + local (native)
- **Schema location:** `packages/database/prisma/schema.prisma`
- **Model count:** 47 models across 11 domains (see Section 2)
- **No Row-Level Security (RLS) at the SQL layer.** All tenant isolation is application-layer only.

### Infrastructure
- **Hosting:** Firebase App Hosting (Cloud Run under the hood)
  - Config: `firebase.json` → `{"apphosting":{"backendId":"bmt"}}`
  - Runtime spec: `apphosting.yaml` — nodejs20, maxInstances: 10, memoryMiB: 1024, cpu: 2
  - URL: `bmt--bigmuddy-ff651.us-east4.hosted.app` (Firebase-assigned), custom domain `hillbillydreamsinc.com` pending DNS
- **Secrets:** Firebase Secret Manager (all credentials injected as env vars at runtime — no `.env` in container)
  - Managed secrets: `DATABASE_URL`, `DIRECT_DATABASE_URL`, `NEXTAUTH_SECRET`, `ADMIN_SESSION_TOKEN`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_URL`, `ANTHROPIC_API_KEY`, `PERPLEXITY_API_KEY`
- **Static assets / media:** Google Cloud Storage bucket `bmt-media-bigmuddy`, Cloudflare R2 (secondary)
- **Image optimization:** Custom loader at `lib/image-loader.ts` serving WebP/AVIF from GCS; `next/image` remotePatterns configured for `storage.googleapis.com` and `*.r2.cloudflarestorage.com`
- **Error tracking:** Sentry (`@sentry/nextjs@10.45.0`), project `javascript-react`, source maps hidden in production
- **Analytics:** Google Analytics (GA4, `G-XXXXXXXXXX` placeholder — not yet replaced with real property ID), Microsoft Clarity (`vyek5nvhzf`)
- **Node memory override:** `NODE_OPTIONS=--max-old-space-size=4096` in both apphosting.yaml and CI

---

## 2. SOVEREIGN ARCHITECTURE IMPLEMENTATION

### Entity Map
The codebase manages 5 distinct business entities. There is **no sixth entity** implemented in this repo despite the "six sovereigns" narrative. Current entities:

| Entity | Brand | Domain(s) | Stripe BrandClass |
|--------|-------|-----------|-------------------|
| Big Muddy Media | BMT | bigmuddytouring.com, bigmuddymagazine.com, bigmuddyradio.com | `BMT` — 20% fee |
| Scan2Plan XR | S2PX | (separate repo — see S2PX monorepo) | `S2PX` — 15% fee |
| BuyCurious Art | BuyCurious | buycurious.com, buycuriousart.com | `BuyCurious` — 25% fee |
| Deep South Directory | HDX | deepsouthdirectory.com, bigmuddymedia.com | `Corporate` — 0% |
| Hillbilly Dreams Inc. | Corporate | hillbillydreamsinc.com, superchase.com | `Corporate` — 0% |

### Isolation Mechanisms (Actual Code)

**Layer 1 — Hostname routing (`middleware.ts:1-211`)**
Every incoming request is routed based on `request.headers.host`. The middleware rewrites:
- `bigmuddytouring.com` → `/touring`
- `bigmuddymagazine.com` → `/magazine`
- `bigmuddyradio.com` → `/radio`
- `deepsouthdirectory.com` / `bigmuddymedia.com` → `/media`
- `outsidereconomics.com` → `/economics`
- `buycurious.com` / `buycuriousart.com` → `/gallery`
- `bigmuddyrecords.net` → `/records`
- `superchase.com` / `hillbillydreams.com` → `/hillbilly` or `/platform`

Each route group has its own layout, not shared with other brands. This is the primary isolation wall.

**Layer 2 — Database schema partitioning**
Entities use distinct, non-overlapping model sets:

- **BMT editorial:** `Article`, `NewsletterIssue`, `Event`, `Playlist`, `Contact`
- **Media-as-a-Service (S2PX bridge ingest):** `Client`, `BridgeClient`, `Review`, `ContentCalendar`, `Report`, `Invoice`, `ClientIntegration`, `SocialAccount`, `SocialPost`
- **BuyCurious:** `ArtistProfile`, `Artwork`, `ArtOrder`, `ArtistApplication`
- **Deep South Directory:** `DirectoryBusiness` (recently added, `db push` status against production unknown)
- **Talent pipeline:** `Artist`, `Track`, `Split`, `Showcase`, `ShowcaseSlot`, `TourStop`, `SyncOpportunity`, `SyncSubmission`, `PRORegistration`, `RoyaltyPayment`
- **Cross-cutting:** `User`, `Account`, `Session` (NextAuth), `LaunchTask`, `ContentPack`, `OpsActivity`, `ChatMessage`, `Metric`

**Cross-tenant foreign keys that exist:**
- `Article.clientId` → `Client` (BMT editorial can be linked to a Media-as-a-Service client)
- `SocialPost.sourceId` → string reference to any content source (not type-safe)
- `Showcase.eventId` → `Event` (talent pipeline to BMT events)

**Layer 3 — Stripe revenue attribution (`lib/stripe.ts`)**
`calculateApplicationFee(amount, brandClass)` computes platform fee per entity. Destination Charges model: platform collects full amount, splits to Stripe Connect Express accounts by `brand_class` metadata on the transfer.

**Layer 4 — Auth and roles**
- `User.brandAffiliation`: S2PX | BMT | BuyCurious | Corporate
- `User.role`: admin | ops | artist | viewer
- Routes under `/ops/*` and `/admin/*` check `auth()` — unauthenticated requests redirect to `/admin/login`

### What Is NOT Implemented
- **No SQL Row-Level Security.** Prisma does not generate RLS policies; isolation is enforced only at the application layer. A compromised API route with direct Prisma access could read cross-entity data.
- **No separate databases per entity.** All entities share one PostgreSQL instance.
- **No schema prefixes.** Tables are in the default `public` schema.
- **Delta Dawn cross-sovereign read** is described as reading "six sovereign databases via scoped Service Accounts" — in the actual code, Delta Dawn (`app/api/ops/chat/route.ts`) makes direct Prisma queries against the single shared DB. No separate Service Accounts, no cross-DB reads. It reads `Client`, `Event`, `Article`, `Playlist`, `Review` models in one query block.

---

## 3. AI & AGENT INTEGRATIONS

### Critical Discrepancy: Narrative vs. Reality
**The external narrative says "Gemini / Vertex AI is the sovereign production engine."**
**The actual production AI engine is Anthropic Claude (claude-sonnet-4-20250514 and claude-haiku-4-5-20251001).**

Both `@google-cloud/aiplatform@6.5.0` and `openai@6.32.0` are installed as dependencies but are not the primary AI backends for any user-facing feature scanned. Anthropic SDK (`@anthropic-ai/sdk@0.78.0`) handles all live AI inference.

### Model Invocation Map

| Route | Model | Use Case | Max Tokens |
|-------|-------|----------|------------|
| `app/api/ops/chat/route.ts` | `claude-sonnet-4-20250514` | Delta Dawn — streaming ops chat | 4096 |
| `app/api/social/generate/route.ts` | `claude-sonnet-4-20250514` | Platform-specific social post generation with brand voice | 4096 |
| `app/api/clients/[id]/calendar/route.ts` | `claude-sonnet-4-20250514` | Monthly content calendar generation | 4096 |
| `app/api/clients/[id]/report/route.ts` | `claude-sonnet-4-20250514` | Narrative metrics summary | 4096 |
| `app/api/clients/[id]/reviews/respond/route.ts` | `claude-sonnet-4-20250514` | AI-drafted review response | 4096 |
| `app/api/ops/reviews/draft/route.ts` | `claude-sonnet-4-20250514` | Review response drafts for ops team | 4096 |
| `app/api/directory/submit/route.ts` | `claude-haiku-4-5-20251001` | Spotlight paragraph for new directory listings | 512 |

### Delta Dawn — Architecture Detail

**File:** `apps/web/app/api/ops/chat/route.ts` (~685 lines)
**Not LangChain, not an agent loop.** Single-turn Anthropic streaming call with injected context.

**Request flow:**
1. Authenticated request arrives (`auth()` check)
2. Three parallel context builders run:
   - `buildDatabaseContext()` — Prisma queries for `Client`, `Event`, `Article`, `Playlist`, `Review`, `Metric` (CloudBeds inn metrics)
   - `buildAsanaContext()` — Asana REST API call to project GID `1213753731475702` (Hillbilly Dreams Inc.), fetches open tasks by section
   - `buildUserContext()` — Maps authenticated `session.user.email` → persona:
     - `tracy@thebigmuddyinn.com` → Inn Operations persona
     - `amy@thebigmuddyinn.com` → Artist Relations persona
     - Chase emails → Technical Decision-Maker persona
3. System prompt assembled (~507 lines of inline string): character definition (Delta Dawn, Tanya Tucker reference), 7-brand ecosystem knowledge, capability definitions, response style rules
4. `anthropic.messages.stream()` SSE stream opened → response piped as Server-Sent Events to client
5. `ChatMessage` records written to Postgres (sessionId, role, userId, content)
6. Sentry circuit breaker on error (`delta_dawn_fallback` tag)

**Intent detection:** Regex-based keyword router (no LLM pre-classification). Detects: `booking_query`, `review_help`, `media_generation`, `revenue_metrics`, `audio_mastering`, `social_content`, `show_topics`, `directory_onboarding`. Used to prepend intent-specific context to the prompt.

**Frontend:** `app/(ops)/ops/chat/page.tsx` + `app/admin/components/DeltaDawnFloat.tsx` (floating widget with sessionStorage persistence)

### Vertex AI / Google Cloud AI
- `@google-cloud/aiplatform@6.5.0` is installed
- Used in `app/api/media/generate/route.ts` and `app/api/media/enhance/route.ts` for image generation/enhancement
- Not used for any text/language inference in scanned routes
- No Gemini API calls found in primary application routes

### MCP Server (`packages/mcp-server`)
- Package: `@modelcontextprotocol/sdk@1.12.1`
- Purpose: Read-only MCP server exposing Prisma models to external AI agents
- Status: Scaffolded. Implementation at `packages/mcp-server/src/index.ts` — full depth not confirmed production-ready

### Estimating Pipeline (S2PX)
**Not in this repo.** The AEC field capture → estimate → delivery → billing pipeline is in the S2PX monorepo (`/Users/chasethis/S2PX/server/`), not BMT. The BMT monorepo has a bridge ingest point:
- `app/api/bridge/s2px/route.ts` — Receives HMAC-signed POST payloads from S2PX, creates `Article` drafts with `sourceSystem: 's2px'` and `sourceProjectId` (UPID reference)
- Auth: HMAC-SHA256 signature verification against `BridgeClient.apiSecret` (bcrypt-hashed)

---

## 4. ZERO-IT & HARDWARE OPS

**There are no scripts, Webhooks, or Workspace Admin API calls in this repo that manage Apple endpoints.**

Google Workspace Endpoint Management is referenced in external narrative as the "Zero-IT hardware provisioning" layer. In the codebase:
- `google-auth-library@10.6.2` and `googleapis@171.4.0` are installed at the monorepo root
- Used for: Google OAuth via NextAuth, Google Business Profile API (in `clients` routes), Gmail API (notifications)
- No endpoint provisioning, MDM enrollment, or Workspace Admin SDK calls found

**Current state:** Zero-IT node provisioning is handled manually via the GCP/Google Workspace consoles. Not automated in code.

---

## 5. TECHNICAL DEBT & IMMEDIATE GAPS

### 🔴 Critical

**1. Hardcoded fallback credential in auth.ts**
```ts
// apps/web/auth.ts — CredentialsProvider
credentials: {
  password: { type: 'password' }
},
async authorize(credentials) {
  const validPassword = process.env.TEAM_PASSWORD || 'Wormwood66!';
  // ...
}
```
If `TEAM_PASSWORD` is not set in Firebase Secret Manager, the fallback `'Wormwood66!'` becomes a valid production password for any email address on the allowlist. Should be: throw if `TEAM_PASSWORD` is unset.

**2. No SQL Row-Level Security**
All 47 Prisma models share one schema in one database with no RLS policies. A single SQL injection or Prisma misconfiguration in any route can read cross-entity data. For a platform pitching "Sovereign Architecture" to enterprise customers, this is the largest structural gap.

**3. DirectoryBusiness model not pushed to production**
`packages/database/prisma/schema.prisma` contains the `DirectoryBusiness` model. `prisma db push` has not been confirmed against the production database. Routes at `app/api/directory/submit/route.ts` and `app/directory/` will throw Prisma runtime errors on production until the table exists.

### 🟡 Significant

**4. Narrative/reality AI stack mismatch**
All production AI inference runs on Anthropic Claude. The "Built on Google Cloud / Vertex AI" positioning is technically accurate for infrastructure (Cloud Run, GCS) but not for AI model invocation. If a customer or investor audits the codebase, the primary AI SDK is `@anthropic-ai/sdk`, not `@google-cloud/aiplatform`. This is not a bug, but it is an inconsistency that needs to be either resolved (migrate inference to Vertex AI / Gemini API) or acknowledged explicitly in technical conversations.

**5. GA4 property ID is a placeholder**
`next.config.mjs` and the layout embed `G-XXXXXXXXXX` as the GA4 measurement ID. Production analytics are not being collected.

**6. Delta Dawn system prompt is a 507-line inline string**
The Delta Dawn system prompt is hardcoded in `app/api/ops/chat/route.ts`. No versioning, no A/B testing, no external config. Changes require a redeploy. Should be extracted to a database-backed `SystemPrompt` model or GCS file with versioning.

**7. openai@6.32.0 installed but purpose unclear**
The OpenAI SDK is a declared dependency but no primary route was found using it. Possible: legacy code, unused import, or used in a utility not scanned. Should be audited and removed if unused (supply chain / licensing hygiene).

**8. copilot-autofix.yml is a no-op**
`.github/workflows/copilot-autofix.yml` contains a placeholder that does nothing. Not a security issue, but it's noise in the CI config.

**9. `trust proxy` set twice in S2PX server/index.ts**
```ts
app.set('trust proxy', 1);
app.set('trust proxy', 1);  // duplicate — line 41
```
Harmless but indicates a copy-paste artifact. Remove the duplicate.

### 🟢 Structural (Future Proofing)

**10. Auth tenant isolation**
All brands (BMT, BuyCurious, ops team) share a single NextAuth user table. If BuyCurious artists and BMT ops staff both authenticate through the same `User` model, role confusion is possible and enterprise B2B onboarding of external clients cannot be cleanly isolated. Pre-requisite for Customer #2 on the Media-as-a-Service tier: separate auth tenant or strict role gating.

**11. Connection pool arithmetic**
`apphosting.yaml` sets `maxInstances: 10`. If the Prisma connection pool is at default (5 connections per instance), worst-case is 50 connections. Cloud SQL `db-f1-micro` caps at ~100. Headroom exists but a pool misconfiguration or scale-up event could exhaust it. Cloud SQL instance tier and `connection_limit` pragma should be explicitly set in the Prisma URL.

**12. No database backup confirmation**
No backup schedule is defined in any config in this repo. Cloud SQL automatic backups should be confirmed enabled in GCP Console. Point-in-time recovery is not referenced.

---

## 6. DEPENDENCY INVENTORY (KEY PACKAGES)

### apps/web
```
next@14.2.0
react@18.3.0 / react-dom@18.3.0
typescript@5.5.0
@prisma/client@5.14.0
next-auth@5.0.0-beta.30
@auth/prisma-adapter@2.11.1
@anthropic-ai/sdk@0.78.0          ← Primary AI SDK (production)
@google-cloud/aiplatform@6.5.0    ← Installed, media generation only
@google-cloud/storage@7.19.0      ← Active: GCS bucket operations
openai@6.32.0                     ← Installed, usage unclear
stripe@20.4.1
googleapis@171.4.0
google-auth-library@10.6.2
bcryptjs@3.0.3
zod@3.23.0
framer-motion@12.35.1
@sentry/nextjs@10.45.0
react-hook-form + @hookform/resolvers
sharp@0.33.0
dompurify@3.3.2 / isomorphic-dompurify@3.0.0
```

### Root / CI
```
turbo@2.0.0        (monorepo task runner)
pnpm@9.0.0         (package manager)
checkly@7.7.0      (synthetic monitoring)
@playwright/test@1.58.2
prettier@3.3.0
```

### Workspace Packages
```
@bigmuddy/database    — Prisma client + migrations
@bigmuddy/config      — tokens.css, brands.ts, types.ts
@bigmuddy/ui          — shared React component library
@bigmuddy/shared      — dispatch utilities
@bigmuddy/mcp-server  — MCP server (read-only DB access for external agents)
```

---

## 7. CI/CD PIPELINE

### GitHub Actions (`.github/workflows/ci.yml`)
- **Trigger:** Push to `main`, PR to `main`
- **Jobs:**
  1. `lint-and-typecheck` — `pnpm lint` + `pnpm turbo typecheck` (NODE_OPTIONS: `--max-old-space-size=4096`)
  2. `build` — `pnpm build` + `du -sh apps/web/.next/` (bundle size report)
- **Always runs:** `pnpm db:generate` (Prisma client generation — uses schema without connecting to DB)
- **Caching:** pnpm store + Turborepo remote cache (TURBO_TOKEN, TURBO_TEAM)
- **Deploy trigger:** Firebase App Hosting CI/CD wired to `main` branch (automatic deploy on green CI)

### Synthetic Monitoring (`checkly.config.ts`)
- **Target:** `https://bmt--bigmuddy-ff651.us-east4.hosted.app` (Firebase URL)
- **Tests:** 2 Playwright smoke tests every 10 minutes from `us-east-1` and `eu-central-1`
  1. `/media` — Deep South Directory loads, brand text present
  2. `/` — Root page loads, no error boundary triggered
- **Alerts:** `me@chasepierson.tv` on failure/recovery
- **Note:** Target URL is the Firebase-assigned URL, not the custom domain. If App Hosting switches URLs, the monitor target needs updating.

---

## 8. ROUTING & DOMAIN ARCHITECTURE

```
hillbillydreamsinc.com  →  /hillbilly    (Corporate homepage — pending DNS)
superchase.com          →  /platform     (HDX platform product page)
bigmuddytouring.com     →  /touring      (Big Muddy Touring — default fallback)
bigmuddymagazine.com    →  /magazine
bigmuddyradio.com       →  /radio
outsidereconomics.com   →  /economics
deepsouthdirectory.com  →  /media
buycurious.com          →  /gallery      (BuyCurious Art Marketplace)
bigmuddyrecords.net     →  /records
```

All routing is in `apps/web/middleware.ts`. The `/api` prefix bypasses middleware entirely. Static assets (`.next/static`) also bypass.

**Dev override:** Setting `NEXT_PUBLIC_BRAND` env var disables hostname detection for local development.

---

## 9. S2PX MONOREPO (SEPARATE REPO — `/Users/chasethis/S2PX`)

The S2PX / Twinner codebase is a distinct monorepo with:
- **Backend:** Express.js (`server/index.ts`) — not Next.js
- **AI:** Gemini API (Google AI SDK) — this is where the Vertex AI / Gemini usage actually lives
- **Auth:** Firebase Auth (JWT Bearer tokens) — `requireAuth` middleware validates Firebase ID tokens
- **DB:** PostgreSQL via pg.Pool (not Prisma)
- **Hosting:** Firebase Hosting (SPA) + Cloud Run (`s2px-api` in `us-east4`)
- **Environments:** production, staging, sandbox (sandbox region: `us-central1`)
- **Firestore:** Used for wiki/knowledge base — rules locked (`request.auth != null`, default deny)

The BMT monorepo and S2PX monorepo communicate via the HMAC-signed bridge endpoint only (`/api/bridge/s2px`). No shared database. No shared auth.

---

*End of HDX_TECHNICAL_STATE.md*
*For architectural decisions, see ARCHITECTURE.md. For change history, see AGENT_LEDGER.md.*
