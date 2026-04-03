# Architecture Document -- Hillbilly Dreams Inc. Platform

> Prepared for external engineering review. Last updated March 27, 2026.
>
> This document describes the complete technical architecture of the HDI multi-tenant platform:
> a single Next.js 14 monorepo serving 11 custom domains, 113 pages, 114 API routes,
> 54 database models, and an AI agent coordination layer.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Frontend Architecture](#2-frontend-architecture)
3. [Routing & Domain Mapping](#3-routing--domain-mapping)
4. [Backend Architecture](#4-backend-architecture)
5. [Database](#5-database)
6. [Agent Coordination System](#6-agent-coordination-system)
7. [Deployment Pipeline](#7-deployment-pipeline)
8. [Integrations](#8-integrations)
9. [Known Technical Debt](#9-known-technical-debt)
10. [Diagrams](#10-diagrams)
11. [Marketing Engine (March 27)](#11-marketing-engine-added-march-27-2026)
12. [Agent Context Database](#12-agent-context-database)
13. [Design System Roadmap](#13-design-system-roadmap)
14. [Integrations Added March 27](#14-integrations-added-march-27-2026)
15. [Business Logic](#15-business-logic)
16. [Updated Infrastructure](#16-updated-infrastructure-march-27-2026)

---

## 1. System Overview

The HDI platform is a **single Next.js 14 monorepo** that serves **multiple production hostnames** from one codebase (`BMT_DOMAIN_ROUTES` in `apps/web/config/domain-routes.ts` lists **18 production hostname patterns**, including aliases such as multiple gallery domains; `CLAUDE.md` lists **14** product/marketing domains — use the routing table for engineering counts). Multi-tenancy is achieved at the routing layer: Next.js middleware inspects the incoming hostname, resolves it against a domain routing table, and rewrites the request to the appropriate route group. Each route group has its own layout, theme, and content, but all share a common API layer, database, and authentication system.

**Key numbers:**

| Metric | Count |
|--------|-------|
| Production hostname patterns (`BMT_DOMAIN_ROUTES`) | 18 |
| Next.js route groups | 16+ |
| Total pages | 113 |
| API routes | 114 |
| Prisma models | 54 |
| Schema lines | 1,207 |
| CSS theme classes | 20 (consolidating to 5 presets) |
| Agent context fragments | 4,320+ |
| Marketing API routes | 8 |
| Cataloged images (GCS) | 606 |

**Monorepo structure (Turborepo):**

```
hillbilly-dreams/
  apps/
    web/                    # The Next.js 14 application (sole deployable)
      app/
        (touring)/          # Route group: bigmuddytouring.com
        (magazine)/         # Route group: bigmuddymagazine.com
        (radio)/            # Route group: bigmuddyradio.com
        (directory)/        # Route group: deepsouthdirectory.com
        (measurably-better)/ # Route group: measurablybetterthings.com
        (economics)/        # Route group: outsidereconomics.com
        (gallery)/          # Route group: buycurious.art
        (records)/          # Route group: bigmuddyrecords.com
        (hillbilly)/        # Route group: hillbillydreamsinc.com
        (entertainment)/    # Route group: bigmuddyentertainment.com
        (admin)/            # Internal admin UI
        (ops)/              # Operations dashboard
        (portal)/           # Partner portal
        (studio)/           # Studio C
        (tuthill)/          # Tuthill Design
        api/                # 114 API route handlers
      middleware.ts         # Hostname routing engine
      config/
        domain-routes.ts    # Domain-to-route-group mapping table
      components/
        theme-provider.tsx  # Runtime theme switching (React context)
      lib/
        auth.ts             # NextAuth config + admin guards
  packages/
    config/
      tokens.css            # 20 CSS theme classes, design token system
    database/
      prisma/
        schema.prisma       # 54 models, 1,207 lines
    ui/                     # Shared UI component library
  docs/                     # Architecture, policies, handoffs
```

---

## 2. Frontend Architecture

### 2.1 Framework

- **Next.js 14** with App Router (not Pages Router)
- **Pinned version:** `apps/web/package.json` → `next` (e.g. `14.2.x`) — treat that file as source of truth when docs disagree with other markdown.
- Server Components by default; Client Components opt-in via `'use client'`
- Route groups (`(groupName)/`) for multi-tenant page isolation
- Sentry integration via `@sentry/nextjs` (client, server, and edge configs)

### 2.2 Fonts

Five Google Fonts are loaded globally in the root layout (`apps/web/app/layout.tsx`) and exposed as CSS custom properties:

| Font | CSS Variable | Usage |
|------|-------------|-------|
| Playfair Display | `--font-display` | Serif headlines (Inn, Magazine) |
| DM Sans | `--font-body` | Default body text |
| Plus Jakarta Sans | `--font-jakarta` | SaaS/tech brands (MBT) |
| Abril Fatface | `--font-abril` | Display/hero text |
| Inter | `--font-inter` | Clean UI text |

Fonts are loaded with `next/font/google` (automatic subsetting, `display: swap`). The CSS variable names are applied to the `<html>` element as class names.

### 2.3 Design Token System

All visual theming is controlled through CSS custom properties defined in `packages/config/tokens.css`. The system has two layers:

**Layer 1: `:root` defaults (Southern Gothic base theme)**

```
:root {
  --bg:              #1a1816    /* Near-black warm background */
  --surface:         #231f1c    /* Card/panel background */
  --surface-2:       #2d2824    /* Elevated surfaces */
  --surface-3:       #38322c    /* Hover states */
  --text:            #f0ebe0    /* Primary text (warm cream) */
  --text-muted:      #9d968a    /* Secondary text */
  --text-disabled:   #6b635a    /* Disabled states */
  --accent:          #c8943e    /* Primary interactive (amber gold) */
  --accent-hover:    #d4a44e    /* Hover state */
  --accent-muted:    rgba(...)  /* Tinted backgrounds */
  --accent-subtle:   rgba(...)  /* Very subtle highlight */
  --slate:           #4a6274    /* Secondary accent */
  --success / --warning / --error  /* Semantic colors */
  --border / --border-strong / --border-subtle
  --font-display / --font-body
  --radius-sm / --radius-md / --radius-lg
  --shadow-sm / --shadow-md / --shadow-lg / --shadow-xl / --shadow-glow
}
```

**Layer 2: `.theme-{id}` class overrides**

Each brand gets a theme class that overrides the `:root` variables. Components only reference the abstract variables (never hardcoded colors), so switching the class on the wrapper element re-themes the entire tree.

Current theme classes (20 defined):

| Class | Brand | Aesthetic |
|-------|-------|-----------|
| `.theme-touring` | Big Muddy Inn | Dark warm, amber gold, Southern Gothic |
| `.theme-magazine` | Big Muddy Magazine | Editorial, warm tones |
| `.theme-radio` | Big Muddy Radio | Dark, musical |
| `.theme-records` | Big Muddy Records | Dark, vinyl aesthetic |
| `.theme-gallery` | Buy Curious | Gallery white, artistic |
| `.theme-gallery-funky` | Buy Curious alt | Funky/colorful variant |
| `.theme-economics` | Outsider Economics | Intellectual, muted |
| `.theme-hillbilly` | HDI Holding | Corporate-clean |
| `.theme-admin` | Admin UI | Dark utility |
| `.theme-inn` | Inn-specific | Hospitality warm |
| `.theme-mb` | Measurably Better | White, clean, Inter font, burgundy accent |
| `.theme-mb-console` | MBT Console | Dark industrial, sky-blue accent |
| `.theme-dsd` | Deep South Directory | Directory-specific |

Each theme class can override any variable from `:root`, including typography:

```css
.theme-mb {
  --bg: #FFFFFF;
  --text: #1A1A1A;
  --accent: #1A1A1A;
  --font-display: 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --text-base: 18px;
  /* ... full override set */
}
```

### 2.4 ThemeProvider

Runtime theme switching is handled by `ThemeProvider` (`apps/web/components/theme-provider.tsx`), a React context provider:

1. Each route group layout sets a `defaultTheme` prop (e.g., `"touring"`, `"mb"`)
2. On mount, the provider checks `localStorage` for a user override
3. It applies `.theme-{activeTheme}` as a class on a wrapper `<div>`
4. The `useTheme()` hook exposes `theme`, `setTheme()`, and `resetTheme()`
5. Before hydration, `defaultTheme` is used to avoid a flash of wrong theme

**KNOWN ISSUE:** The entire token system lives in a single `tokens.css` file. When multiple agents or developers edit this file simultaneously, CSS cascade collisions occur -- later edits overwrite earlier ones. The mitigation path is per-theme files or CSS Modules, but this has not been implemented.

### 2.5 Image Handling

- Custom image loader (`apps/web/lib/image-loader.ts`) that serves pre-optimized `.webp`/`.avif` from GCS directly and routes everything else through Next.js `/_next/image`
- Remote patterns configured for `storage.googleapis.com`, Cloudflare R2, and `cdn.bigmuddytouring.com`
- Static assets cached with 1-year `Cache-Control: immutable`

---

## 3. Routing & Domain Mapping

### 3.1 Middleware Engine

The routing engine lives in `apps/web/middleware.ts`. It is designed as a **platform-portable** engine: the routing logic is generic, and all tenant-specific configuration is imported from `config/domain-routes.ts`.

**Request processing order:**

1. **Hostname extraction** -- reads `x-forwarded-host`, `x-fah-host`, `x-original-host`, `host` header, or `nextUrl.hostname` (in that priority order)
2. **www redirect** -- `www.{domain}` gets a 301 redirect to the apex domain (SEO canonical)
3. **Passthrough rules** -- API routes (`/api/*`), Next.js internals (`/_next/*`), static files (paths containing `.`), login page, demo routes, welcome pages, and partner dashboards (`/tracy`, `/amy`) all pass through without rewriting
4. **Brand prefix detection** -- if the path already starts with a known route group prefix (e.g., `/touring/inn`), pass through to avoid double-rewriting
5. **Hostname matching** -- the hostname is matched against `ALL_BMT_DOMAIN_ROUTES` using substring matching (e.g., hostname contains `"bigmuddytouring"` maps to route group `"touring"`)
6. **Per-domain redirects** -- matched routes can define path redirects (e.g., `/dashboard` on bigmuddytouring.com redirects to `/ops`)
7. **URL rewriting** -- the request is rewritten from `/{path}` to `/{routeGroup}/{path}`
8. **Dev override** -- `NEXT_PUBLIC_BRAND` environment variable bypasses hostname detection for local development
9. **Admin fallback** -- unmatched hostnames with admin-like paths rewrite to `/admin/*`
10. **Default fallback** -- all other requests rewrite to the `touring` route group

### 3.2 Domain Routing Table

The `BMT_DOMAIN_ROUTES` array in `config/domain-routes.ts` maps hostnames to route groups:

| Hostname Pattern | Route Group | Notes |
|-----------------|-------------|-------|
| `bigmuddytouring` | `touring` | excludeAdmin, redirects /dashboard to /ops |
| `bigmuddymagazine` | `magazine` | |
| `bigmuddyradio` | `radio` | |
| `deepsouthdirectory` | `directory` | excludeAdmin |
| ~~`bigmuddymedia`~~ | ~~`media`~~ | **Removed** — domain owned by unrelated company |
| `outsidereconomics` | `economics` | |
| `buycurious` | `gallery` | |
| `buycuriousart` | `gallery` | Alternate domain, same route group |
| `bigmuddyrecord` | `records` | |
| `studiocvideo` / `studio-c` / `studioc.video` | `studio` | Three patterns, one group |
| `tuthilldesign` | `tuthill` | |
| `bigmuddyentertainment` | `entertainment` | |
| `hillbillydreams` | `hillbilly` | |
| `measurablybetter` | `measurably-better` | |
| `venturegallery` | `gallery` | Alternate hostname, same group as BuyCurious |
| `bearsville` | `bearsville` | Northeast node |

**Local development** uses `.local` TLD variants (e.g., `bigmuddytouring.local`) that resolve via `/etc/hosts`. Local routes are checked first because their patterns are more specific.

### 3.3 DomainRoute Interface

```typescript
interface DomainRoute {
  pattern: string;       // Substring to match against hostname
  routeGroup: string;    // Target Next.js route group
  excludeAdmin?: boolean; // Skip if hostname also contains 'admin'
  redirects?: Array<{
    pathPrefix: string;  // Path to match
    target: string;      // Redirect destination
  }>;
}
```

### 3.4 Matcher Configuration

The middleware matcher excludes `_next/static`, `_next/image`, and `favicon.ico` from processing:

```
/((?!api|_next/static|_next/image|favicon.ico).*)
```

Note: API routes are excluded from the matcher but also have an early-return check inside the middleware function.

---

## 4. Backend Architecture

### 4.1 API Routes

114 API route handlers organized under `apps/web/app/api/`. Major groups:

| Path Prefix | Purpose | Example Routes |
|------------|---------|---------------|
| `/api/auth` | NextAuth authentication | `[...nextauth]/route.ts` |
| `/api/agent` | AI agent coordination | `context/route.ts`, `action/route.ts` |
| `/api/ops` | Operations dashboard | `chat/route.ts`, `tasks/route.ts`, `reviews/` |
| `/api/articles` | Magazine CMS | CRUD, slug lookup |
| `/api/directory` | Deep South Directory | Submit, claim, enrich, CRUD |
| `/api/clients` | Client management | CRUD, calendar, reviews, voice, reports |
| `/api/cron` | Scheduled jobs | Cloudbeds sync, QBO sync, Google sync, enrichment, census, pricing |
| `/api/gallery` | Art gallery | Applications (approve/reject), artists, artworks |
| `/api/media` | Media management | Upload, enhance, generate, ingest |
| `/api/billing` | Stripe billing | Subscribe, webhook |
| `/api/stripe` | Stripe Connect | Checkout, onboard, webhook |
| `/api/social` | Social media | Accounts, posts, generate |
| `/api/newsletter` | Newsletter | CRUD, subscribe, publish |
| `/api/publications` | Publications | CRUD |
| `/api/playlists` | Radio playlists | CRUD |
| `/api/tracks` | Music tracks | CRUD, splits |
| `/api/integrations` | Third-party integrations | Cloudbeds, generic |
| `/api/gchat` | Google Chat bot | Bot endpoint, pending, reply |
| `/api/embeddings` | Vector embeddings | Index |
| `/api/search` | Full-text search | Search |
| `/api/ingestion` | Data ingestion | Google, QuickBooks |
| `/api/ai` | AI features | Analyze, notebook chat |
| `/api/connect` | Stripe Connect | Onboard, status, webhook |

### 4.2 Authentication

- **NextAuth** (`next-auth`) with `next-auth/jwt` for session management
- **Google OAuth** as the primary provider
- **Team password fallback** for non-Google users
- Session stored in JWT (not database sessions)
- Auth configuration at `apps/web/lib/auth.ts`

**Admin access control:**
- `requireAdmin()` -- checks for admin role before allowing access
- `requireRole(role)` -- checks for specific role membership
- Both were temporarily bypassed during a debugging period and have been re-enabled as of March 27, 2026
- **`/api/agent/context`**, **`/api/agent/action`**, **`/api/publish`** (list/create/execute), **`/api/media/generate`**, and related marketing media routes are **admin-session** gated unless a route documents an alternate (e.g. **`CRON_SECRET`** on **`/api/publish/batch`** for schedulers).

**Middleware auth flow:**
- `getToken()` from `next-auth/jwt` (not `auth()` wrapper in some paths — legacy compatibility with earlier hosting; **production is Vercel**)
- `/admin/login` is always accessible without auth
- Partner dashboards (`/tracy`, `/amy`) pass through without auth check at middleware level

### 4.3 Cron Jobs

Six scheduled jobs run via GCP Cloud Scheduler hitting API endpoints:

| Job | Endpoint | Purpose |
|-----|----------|---------|
| Cloudbeds Sync | `/api/cron/cloudbeds-sync` | Sync reservations from Cloudbeds PMS |
| QBO Sync | `/api/cron/sync-qbo` | Sync QuickBooks Online financials |
| Google Sync | `/api/cron/sync-google` | Sync Google Places data for directory |
| Enrichment Queue | `/api/cron/process-enrichment-queue` | Process async enrichment jobs |
| Census Sync | `/api/cron/sync-census` | Sync census demographic data |
| Dynamic Pricing | `/api/cron/dynamic-pricing` | Update hospitality pricing |

### 4.4 Security Headers

Applied globally via `next.config.mjs`:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 5. Database

### 5.1 Provider

**Neon Postgres** on AWS us-east-1.

| Field | Value |
|-------|-------|
| Provider | Neon (neon.tech) |
| Host | `ep-little-snow-ailobi9d` |
| Region | AWS us-east-1 |
| Database | `neondb` |
| ORM | Prisma |
| Plan | Launch ($19/mo) |

**Connection strings:**
- `DATABASE_URL` -- pooled connection (for serverless/API routes, used by Prisma `url`)
- `DIRECT_DATABASE_URL` -- direct connection (for migrations, used by Prisma `directUrl`)

### 5.2 Schema Overview

The Prisma schema (`packages/database/prisma/schema.prisma`) is 1,207 lines with 54 models.

**Generator configuration:**
```prisma
generator client {
  provider        = "prisma-client-js"
  binaryTargets   = ["native", "debian-openssl-3.0.x"]
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  directUrl  = env("DIRECT_DATABASE_URL")
  extensions = [vector]
}
```

**Key model groups:**

| Domain | Models | Description |
|--------|--------|-------------|
| Magazine | Article, Category | CMS for bigmuddymagazine.com |
| Directory | Business, Listing, Claim | Deep South Directory listings |
| Hospitality | Reservation, Property, Room | Cloudbeds-synced hospitality data |
| Gallery | Artist, Artwork, GalleryApplication | Buy Curious art gallery |
| Music | Track, Playlist, Release, Split | Radio + Records |
| Contact/CRM | Contact, Client, Lead | Customer relationship management |
| Events | Event, Calendar | Event management |
| Media | MediaAsset, Photo | Media library with GCS integration |
| Newsletter | Newsletter, Subscriber | Email newsletter system |
| Social | SocialAccount, SocialPost | Social media management |
| Agent | AgentContext, AgentAction, Decision | AI agent coordination |
| Auth | User, Account, Session | NextAuth tables |
| Enrichment | EnrichmentJob | Async enrichment queue |
| Billing | Subscription, Invoice | Stripe billing |
| Embeddings | Embedding (pgvector) | 768-dim Vertex AI vectors |
| Metrics | Metric, MetricSnapshot | Time-series data |

### 5.3 pgvector

The schema enables the `vector` PostgreSQL extension for semantic search:

- 768-dimensional vectors generated by Vertex AI embedding models
- Stored in an `Embedding` model
- Used for semantic search across articles, directory listings, and agent context
- Vector operations use raw SQL (Prisma does not natively support pgvector queries)

### 5.4 AgentContext Table

The `AgentContext` table stores 4,320+ knowledge fragments that AI agents can query and update:

- **Composite unique key:** `(domain, key)` -- upserting on the same domain+key overwrites the previous value
- **Fields:** `domain`, `topic`, `key`, `content`, `source`, `agentAuthor`, `confidence` (float), `validUntil` (nullable datetime)
- **Query API:** `GET /api/agent/context` with filters for agent, topic, domain, keyword, key, freshness
- **Write API:** `POST /api/agent/context` with upsert semantics

### 5.5 EnrichmentJob Queue

Async enrichment is handled by an `EnrichmentJob` model that acts as a job queue:

- Jobs are created when directory listings need Google Places enrichment
- The `/api/cron/process-enrichment-queue` cron picks up pending jobs
- Enriched data is written back to the `Business` model

### 5.6 KNOWN ISSUES

1. **No transactions on multi-step writes.** Prisma operations that span multiple models are not wrapped in `$transaction()`. If a multi-model write fails midway, the database can be left in an inconsistent state.

2. **No migration files.** The schema is deployed using `prisma db push` (direct schema sync), not `prisma migrate`. There are no migration files in the repository. This means no rollback capability and no audit trail of schema changes.

3. **N+1 query patterns.** Several API routes fetch a list of records and then query related records in a loop instead of using `include` or `select` with joins.

4. **Soft foreign keys.** Some relationships are stored as string IDs without Prisma `@relation` declarations. Referential integrity is enforced at the application layer, not the database layer.

---

## 6. Agent Coordination System

### 6.1 Named Agents

The platform operates with five named AI agents, each with a defined domain:

| Agent | Role | Primary Domain |
|-------|------|---------------|
| **Huck** | Head of Product / Engineering Lead | Code, architecture, deployment |
| **Delta Dawn** | Operations AI | Ops chat, task management, reviews |
| **Ledger** | Finance Agent | Revenue tracking, tax, bookkeeping |
| **Chuck** | Marketing / Content | Social media, newsletter, SEO |
| **Rook** | Data Scientist | Analytics, embeddings, enrichment |

### 6.2 Shared Knowledge Layer

Agents share knowledge through the `AgentContext` table and its API:

**Read (GET /api/agent/context):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `topic` | string | Partial match on topic field |
| `domain` | string | Exact match, comma-separated for multiple |
| `q` | string | ILIKE keyword search on content |
| `key` | string | Exact key lookup |
| `fresh` | boolean | Exclude expired content (validUntil < now, confidence < 0.3) |
| `limit` | integer | Max results (default 20, max 100) |

Results are ordered by `confidence DESC, updatedAt DESC`.

**Write (POST /api/agent/context):**

Required fields: `domain`, `topic`, `key`, `content`. Optional: `source`, `agentAuthor`, `validUntil`, `confidence`.

Writes use upsert semantics on the `(domain, key)` composite key, so knowledge is updated in place rather than duplicated.

### 6.3 Action Log

The `AgentAction` API (`POST /api/agent/action`) provides a coordination log:

- Records what each agent did, when, and why
- Used for audit trail and conflict detection
- Queryable for recent actions by a specific agent

### 6.4 Google Chat Webhooks

Agents communicate with human operators via Google Chat:

- Bot endpoint at `/api/gchat/bot`
- Pending message queue at `/api/gchat/pending`
- Reply handler at `/api/gchat/reply`
- Used for notifications, approvals, and human-in-the-loop workflows

### 6.5 KNOWN ISSUE: File Collision

When multiple agents edit the same file (particularly `tokens.css`), later writes overwrite earlier ones. There is no merge strategy or locking mechanism. This has caused production regressions where one agent's theme changes were silently lost.

---

## 7. Deployment Pipeline

### 7.1 Hosting

**Vercel Pro** is the sole hosting platform.

| Setting | Value |
|---------|-------|
| Vercel project | `hillbilly-dreams` |
| Deploy trigger | Push to `main` branch (auto-deploy) |
| Build command | Turborepo build pipeline |
| Framework | Next.js 14 (auto-detected) |
| Node.js | 18.x |
| Region | Auto (Vercel edge network) |

**Previous hosting (decommissioned):** Firebase App Hosting on `bigmuddy-ff651` and Cloud Run `bmt-web`. All Firebase configs (Dockerfile, apphosting.yaml, .firebaserc, firebase.json) have been deleted from the repository.

### 7.2 DNS

**Cloudflare** manages DNS for all 11 domains (ChasePierson.TV account).

- All domains set to **DNS-only** (gray cloud) -- no Cloudflare proxy
- Vercel handles SSL termination and CDN
- CNAME records point to Vercel's edge network

### 7.3 CI/CD

**GitHub Actions** runs on every push:

- ESLint (lint)
- TypeScript type checking (typecheck)
- Next.js build (build)

Merges to `main` trigger Vercel auto-deploy. There is no staging environment -- `main` deploys directly to production.

### 7.4 Error Tracking

**Sentry** (`@sentry/nextjs`) is configured with:

- Client, server, and edge runtime configs
- Tunnel route at `/monitoring` (avoids ad-blocker interference)
- Source map upload configured but **not reliably uploading** (see Known Issues)
- Org: `chasepiersontv`, project: `javascript-react`
- Middleware routes excluded from Sentry instrumentation (edge runtime incompatible)

### 7.5 Media Storage

**Google Cloud Storage** bucket `bmt-media-bigmuddy`:

- 606 cataloged images (mix of real photography and AI-generated)
- Pre-optimized WebP/AVIF variants
- Served via custom Next.js image loader
- No CDN layer in front of GCS (direct `storage.googleapis.com` URLs)

### 7.6 Analytics

- **Microsoft Clarity** for session recordings, heatmaps, and rage-click detection (project `vyek5nvhzf`)
- Custom `<Analytics />` component in root layout (likely Vercel Analytics)
- JSON-LD structured data for SEO (`getOrganizationSchema()`)

---

## 8. Integrations

### 8.1 Cloudbeds API

- **Purpose:** Hospitality property management system (PMS)
- **Access:** Read-only API integration
- **Sync:** Cron job at `/api/cron/cloudbeds-sync`
- **Webhook:** `/api/webhooks/cloudbeds` for real-time updates
- **Data:** Reservations, room availability, pricing

### 8.2 Google Places API

- **Purpose:** Directory listing enrichment
- **Flow:** New directory submissions trigger enrichment jobs; the cron processes them and enriches with Google Places data (hours, photos, reviews, categories)
- **Endpoint:** `/api/directory/enrich`

### 8.3 Vertex AI

- **Purpose:** Text embeddings for semantic search
- **Model:** 768-dimensional embedding vectors
- **Storage:** pgvector extension in Neon Postgres
- **Endpoint:** `/api/embeddings/index`

### 8.4 Anthropic API

- **Purpose:** AI-powered ops chat (Delta Dawn agent)
- **Endpoint:** `/api/ops/chat`
- **Usage:** Conversational interface for operations tasks, content review, and decision support

### 8.5 Stripe

- **Purpose:** Billing and payment processing
- **Endpoints:** `/api/stripe/checkout`, `/api/stripe/onboard`, `/api/stripe/webhook`
- **Stripe Connect:** For marketplace payments to directory businesses

### 8.6 QuickBooks Online

- **Purpose:** Financial data sync
- **Sync:** Cron job at `/api/cron/sync-qbo`
- **Ingestion:** `/api/ingestion/quickbooks`

### 8.7 Microsoft Clarity

- **Purpose:** Session recordings, heatmaps, rage-click detection
- **Integration:** Script tag in root layout
- **Project ID:** `vyek5nvhzf`

### 8.8 Google Chat

- **Purpose:** Agent-to-human communication
- **Bot endpoint:** `/api/gchat/bot`
- **Flow:** Agents post messages; humans reply in Google Chat; replies are routed back to the system

---

## 9. Known Technical Debt

### 9.1 Critical

| Issue | Impact | Mitigation Path |
|-------|--------|-----------------|
| **No database transactions** | Multi-step writes can leave data inconsistent on partial failure | Wrap multi-model writes in `prisma.$transaction()` |
| **No migration files** | No rollback capability, no schema change audit trail | Switch from `db push` to `prisma migrate dev` |
| **CSS cascade collisions** | Multiple agents editing `tokens.css` silently overwrite each other | Split into per-theme files or use CSS Modules |
| **Soft foreign keys** | Referential integrity enforced only at application layer | Add `@relation` declarations to Prisma schema |

### 9.2 High

| Issue | Impact | Mitigation Path |
|-------|--------|-----------------|
| **N+1 query patterns** | Unnecessary database round-trips in list endpoints | Audit and add `include`/`select` to Prisma queries |
| **No staging environment** | All merges to `main` deploy directly to production | Add Vercel preview deployments or a staging branch |
| **Sentry source maps not uploading** | Error stack traces are minified/unreadable in Sentry | Fix `SENTRY_AUTH_TOKEN` in CI and verify upload |
| **No admin image picker** | Media assets must be managed via direct GCS access | Build admin UI for image selection and upload |

### 9.3 Medium

| Issue | Impact | Mitigation Path |
|-------|--------|-----------------|
| **Single tokens.css file** | ~600 lines, hard to maintain, merge conflicts | Split into `tokens/{theme-name}.css` |
| **Agent file collision** | No locking or merge strategy for concurrent agent edits | File-level advisory locks or agent queue |
| **Raw SQL for pgvector** | Prisma queries can't express vector operations | Monitor Prisma pgvector support; consider Drizzle |
| **Orphaned Cloud SQL** | `micro-media-db` on GCP billing ~$8/mo, nothing uses it | Confirm no dependencies, then delete |
| **D1 message queue** | Cloudflare D1 `openclaw-db` used for GChat queue | Migrate `chat_messages` to Neon |
| **OpenTelemetry disabled** | `instrumentationHook` crashes Vercel edge runtime | Monitor Vercel/OTel compatibility |

---

## 10. Diagrams

### 10.1 Request Flow

```
                    INTERNET
                       |
                       v
              +----------------+
              | Cloudflare DNS |  (DNS-only, no proxy)
              |  (gray cloud)  |
              +-------+--------+
                      |
                      | CNAME to Vercel edge
                      v
              +----------------+
              |  Vercel Edge   |  SSL termination, CDN
              |    Network     |
              +-------+--------+
                      |
                      v
        +---------------------------+
        |    Next.js Middleware      |
        |   (middleware.ts)         |
        |                           |
        |  1. Extract hostname      |
        |  2. www -> apex redirect  |
        |  3. Passthrough checks    |
        |  4. Match domain table    |
        |  5. Rewrite URL           |
        +---------------------------+
           |          |          |
           v          v          v
     +---------+ +---------+ +---------+
     | /touring| |/magazine| |/measur- |   ... 16+ route groups
     |  group  | |  group  | |ably-    |
     |         | |         | |better   |
     +---------+ +---------+ +---------+
           |          |          |
           v          v          v
     +---------+ +---------+ +---------+
     | Layout  | | Layout  | | Layout  |   Each group has its own
     | + Theme | | + Theme | | + Theme |   layout with ThemeProvider
     +---------+ +---------+ +---------+
           |          |          |
           v          v          v
        +---------------------------+
        |      Page Component       |   Server Component (default)
        |  Uses CSS vars from       |   or Client Component
        |  .theme-{id} class        |
        +---------------------------+
```

### 10.2 Domain Routing Detail

```
    Incoming request: https://bigmuddymagazine.com/articles/blues-trail

    hostname = "bigmuddymagazine.com"
    pathname = "/articles/blues-trail"

    Step 1: www check .............. hostname does not start with "www." -> skip
    Step 2: passthrough check ...... pathname is not /api, /_next, etc. -> continue
    Step 3: brand prefix check ..... "/articles" is not in BMT_BRAND_PREFIXES -> continue
    Step 4: domain table match ..... hostname.includes("bigmuddymagazine") -> MATCH
             routeGroup = "magazine"
    Step 5: rewrite ................ /articles/blues-trail -> /magazine/articles/blues-trail

    Next.js resolves:
      apps/web/app/(magazine)/articles/[slug]/page.tsx
```

### 10.3 Data Flow: Agent Context

```
    +----------------+     POST /api/agent/context      +------------------+
    |  AI Agent      | --------------------------------> |  Next.js API     |
    |  (e.g., Huck)  |                                   |  Route Handler   |
    +----------------+                                   +--------+---------+
                                                                  |
                                                    prisma.agentContext.upsert()
                                                                  |
                                                                  v
                                                         +--------+---------+
                                                         |  Neon Postgres   |
                                                         |  AgentContext    |
                                                         |  table           |
                                                         |  (4,320+ rows)    |
                                                         +--------+---------+
                                                                  ^
                                                    prisma.agentContext.findMany()
                                                                  |
    +----------------+     GET /api/agent/context       +--------+---------+
    |  AI Agent      | --------------------------------> |  Next.js API     |
    |  (e.g., Rook)  | <------ JSON response ---------- |  Route Handler   |
    +----------------+                                   +------------------+

    Query parameters:
      ?domain=finance           Exact domain match
      &topic=pricing            Partial topic match (ILIKE)
      &q=enterprise             Keyword search on content
      &fresh=true               Exclude expired/low-confidence
      &limit=20                 Max results
```

### 10.4 Theme Cascade

```
    CSS Cascade (specificity increases top to bottom):

    +----------------------------------------------------+
    | :root                                              |
    |   --bg: #1a1816  (dark warm)                       |   Layer 0: Base defaults
    |   --text: #f0ebe0 (cream)                          |   (Southern Gothic)
    |   --accent: #c8943e (amber gold)                   |
    |   --font-display: var(--font-playfair)             |
    +----------------------------------------------------+
                          |
                          | Overridden by theme class
                          v
    +----------------------------------------------------+
    | .theme-mb                                          |
    |   --bg: #FFFFFF  (white)                           |   Layer 1: Brand theme
    |   --text: #1A1A1A (near-black)                     |   (.theme-{id} class on
    |   --accent: #1A1A1A                                |    ThemeProvider wrapper)
    |   --font-display: 'Inter', system-ui               |
    +----------------------------------------------------+
                          |
                          | Consumed by components
                          v
    +----------------------------------------------------+
    | Component styles                                   |
    |   background: var(--bg);                           |   Layer 2: Components
    |   color: var(--text);                              |   reference abstract vars
    |   border: 1px solid var(--border);                 |   (never hardcoded colors)
    +----------------------------------------------------+

    Runtime flow:
    1. Root layout loads Google Fonts as CSS variables on <html>
    2. tokens.css provides :root defaults + .theme-{id} overrides
    3. Route layout wraps children in <ThemeProvider defaultTheme="mb">
    4. ThemeProvider renders <div className="theme-mb">{children}</div>
    5. All descendant components inherit the theme variables
```

### 10.5 Infrastructure Overview

```
    +---------------------+       +---------------------+
    |   Cloudflare DNS    |       |   GitHub Actions    |
    |   (11 domains)      |       |   (CI: lint, type,  |
    |   DNS-only mode     |       |    build)           |
    +----------+----------+       +----------+----------+
               |                             |
               v                             | push to main
    +----------+----------+       +----------+----------+
    |    Vercel Pro        |<-----| Git Repository      |
    |    (auto-deploy)     |      | (hillbilly-dreams)  |
    |    SSL + CDN         |      +---------------------+
    +----------+----------+
               |
               v
    +----------+------------------------------+
    |          Next.js 14 Application         |
    |                                          |
    |  +------------+  +-------------------+  |
    |  | Middleware  |  | 114 API Routes    |  |
    |  | (routing)  |  | (CRUD, cron, AI)  |  |
    |  +------------+  +---+---------------+  |
    |                      |                   |
    +----------------------|-------------------+
                           |
            +--------------+----------------+
            |              |                |
            v              v                v
    +-------+------+ +----+-------+ +------+--------+
    | Neon Postgres | | Google     | | External APIs |
    | (AWS us-e-1) | | Cloud      | |               |
    |              | | Storage    | | - Cloudbeds    |
    | 54 models    | | (606 imgs) | | - Stripe       |
    | pgvector     | |            | | - Google Places|
    |4,320 ctx frag| |            | | - Vertex AI    |
    +--------------+ +------------+ | - Anthropic    |
                                    | - QuickBooks   |
                                    | - Google Chat  |
                                    +----------------+
```

---

## Appendix A: Environment Variables

Key environment variables required for operation:

| Variable | Purpose | Source |
|----------|---------|--------|
| `DATABASE_URL` | Neon pooled connection | Vercel env vars |
| `DIRECT_DATABASE_URL` | Neon direct connection | Vercel env vars |
| `NEXTAUTH_SECRET` | JWT signing secret | Vercel env vars |
| `NEXTAUTH_URL` | Auth callback URL | Vercel env vars |
| `GOOGLE_CLIENT_ID` | OAuth provider | Vercel env vars |
| `GOOGLE_CLIENT_SECRET` | OAuth provider | Vercel env vars |
| `ANTHROPIC_API_KEY` | AI ops chat | Vercel env vars |
| `STRIPE_SECRET_KEY` | Payment processing | Vercel env vars |
| `STRIPE_WEBHOOK_SECRET` | Webhook verification | Vercel env vars |
| `CLOUDBEDS_API_KEY` | PMS integration | Vercel env vars |
| `GOOGLE_PLACES_API_KEY` | Directory enrichment | Vercel env vars |
| `SENTRY_AUTH_TOKEN` | Source map upload | Vercel env vars |
| `SENTRY_DSN` | Error reporting | Vercel env vars |
| `NEXT_PUBLIC_BRAND` | Dev-only brand override | Local `.env.local` |

All credentials are stored in **Bitwarden** as the canonical secret store, then synced to Vercel environment variables for runtime access.

| `GCP_PROJECT_ID` | Vertex AI project | Vercel env vars |
| `VERTEX_LOCATION` | Vertex AI region (us-east4) | Vercel env vars |

---

## 11. Marketing Engine (Added March 27, 2026)

The Marketing Engine is an 8-route AI-powered API layer that generates complete marketing packages for local businesses. All routes live under `apps/web/app/api/marketing/` and use Vertex AI (Gemini 2.5 Flash) for generation. Every generated artifact is persisted to the AgentContext database for cross-agent reuse.

### 11.1 Route Inventory

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/api/marketing/dna` | POST | Admin | Analyze a business URL to generate a Marketing DNA profile (colors, voice, audience, category) |
| `/api/marketing/social` | POST | Admin | Generate a 3-post Instagram campaign from a business's DNA |
| `/api/marketing/radio-spot` | POST | Admin | Generate a 30-second radio spot script from DNA |
| `/api/marketing/reskin` | POST | Admin | Generate a brand-matched image via Vertex AI Imagen 3 |
| `/api/marketing/reviews` | POST | Admin | Draft AI responses to Google reviews, voice-matched to brand DNA |
| `/api/marketing/campaign-calendar` | POST | Admin | Generate a 30-day cross-channel marketing roadmap |
| `/api/marketing/scout` | POST | None | All-in-one Scout: name input produces DNA + social + radio + reviews in a single call |
| `/api/marketing/scout-photo` | POST | None | Photo-first Scout: camera capture, Gemini Vision extraction, then full scout cascade |

### 11.2 Route Details

**`/api/marketing/dna`** -- Brand DNA Ingestion
- **Input:** `{ businessId?: number, websiteUrl: string, businessName: string }`
- **Output:** `{ success: true, dna: { primaryColors, brandVoice, keyValueProps, targetAudience, aestheticFlavor, oneLiner, suggestedCategory }, contextKey }`
- **Side effects:** Upserts to `AgentContext` (domain: `marketing`, key: `dna.business.{id}` or `dna.url.{slug}`). If `businessId` provided, updates the `DirectoryBusiness` record with category and description.
- **AI model:** Gemini 2.5 Flash via `@google-cloud/vertexai`

**`/api/marketing/social`** -- Social Campaign Generator
- **Input:** `{ contextKey: string }` or `{ businessId: number }`
- **Output:** Array of 3 posts, each with `caption`, `imagePrompt`, `platform`, `strategy`
- **Dependency:** Requires DNA to exist in AgentContext (runs `/dna` first)
- **Storage key pattern:** `campaign.business.{id}`

**`/api/marketing/radio-spot`** -- Radio Spot Script Generator
- **Input:** `{ contextKey: string }` or `{ businessId: number }`
- **Output:** `{ title, duration, script, voiceDirection, musicBed, tagline, callToAction }`
- **Storage domain:** `entertainment` (not `marketing` -- intentional, radio is entertainment vertical)
- **TODO:** Cloud Text-to-Speech integration for audio rendering

**`/api/marketing/reskin`** -- Brand Image Generator
- **Input:** `{ businessName: string, aestheticFlavor: string, subject: string }`
- **Output:** `{ success: true, aestheticFlavor, imageBase64 }`
- **AI model:** Vertex AI Imagen 3 (`imagen-3.0-generate-001`) via direct REST API
- **Style map:** 5 aesthetic flavors mapped to detailed Imagen prompts:
  - The Delta Dark: Southern Gothic noir, charcoal and amber
  - The Modern MainStreet: Clean minimal, bright natural light
  - The Broadside: Classic editorial, warm eggshell
  - The White Walls: Minimal gallery, soft neutral
  - The Paper Trail: Academic muted, warm sepia
- **TODO:** Upload generated images to GCS instead of returning base64

**`/api/marketing/reviews`** -- Reputation Guardian
- **Input:** `{ contextKey: string, businessId?: number, reviews?: array }`
- **Output:** Array of `{ reviewAuthor, reviewRating, reviewComment, draftResponse, sentiment, urgency }`
- **Fallback:** Uses sample reviews for demo when no real reviews provided
- **TODO:** Google My Business API integration for fetching real reviews

**`/api/marketing/campaign-calendar`** -- 30-Day Marketing Roadmap
- **Input:** `{ contextKey: string }` or `{ businessId: number }`
- **Output:** `{ businessName, month, weeklyThemes[], magazineFeatures[], radioSpots[], socialPosts[], reviewResponses, totalAssets }`
- **Purpose:** Shows business owners what the $99/mo subscription delivers each month

**`/api/marketing/scout`** -- All-in-One Scout (Text Input)
- **Input:** `{ businessName: string, city?: string }`
- **Output:** Complete scout result with DNA + socialPosts + radioSpot + reviewResponses
- **Auth:** None (field demo tool)
- **Storage:** `marketing` domain, key: `scout.{slugified-name}`
- **Design:** Single Gemini call generates everything at once (faster than chaining individual routes)

**`/api/marketing/scout-photo`** -- Photo-First Scout (Camera Input)
- **Input:** `{ imageBase64: string, city?: string, lat?: number, lng?: number }`
- **Output:** Same as `/scout` but with extracted `phone` and `address` from the photo
- **AI model:** Gemini 2.5 Flash with multimodal input (image + text prompt)
- **Auth:** None (field demo tool)
- **Confidence:** 0.85 (lower than text scout due to OCR uncertainty)

### 11.3 Scout & Sell Admin UI

The Scout & Sell interface lives at `apps/web/app/admin/scout/page.tsx`. It is a mobile-first client component designed for field use (walking Main Street in Natchez).

**Flow:**
1. User taps camera button to photograph a business sign, card, or storefront
2. Photo is base64-encoded and sent to `/api/marketing/scout-photo`
3. Gemini Vision extracts business name, phone, address, website
4. Full scout results render: DNA card, 3 social posts, radio spot, review responses
5. Alternatively, user can type a business name and hit Scout for text-based lookup

**UI:** Southern Gothic design (dark background, amber gold accents, Inter font). Inline styles, no external CSS dependencies. Designed to work on a phone screen at 480px max-width.

### 11.4 Scout & Sell Flow Diagram

```
    FIELD USE (Main Street, Natchez)
    ================================

    +------------------+          +------------------+
    |  Snap a Photo    |    OR    |  Type a Name     |
    |  (camera/gallery)|          |  + City           |
    +--------+---------+          +--------+---------+
             |                             |
             v                             v
    /api/marketing/scout-photo    /api/marketing/scout
             |                             |
             |   Gemini Vision (extract    |   Gemini 2.5 Flash
             |   name, phone, address)     |   (research + generate)
             |                             |
             +-------------+---------------+
                           |
                           v
              +------------------------+
              |   SCOUT RESULT         |
              |                        |
              |  +------------------+  |
              |  | Brand DNA        |  |  Colors, voice, audience,
              |  | (Marketing DNA)  |  |  aesthetic flavor, category
              |  +------------------+  |
              |                        |
              |  +------------------+  |
              |  | 3 Social Posts   |  |  Captions + image prompts
              |  | (Instagram)      |  |  + strategy notes
              |  +------------------+  |
              |                        |
              |  +------------------+  |
              |  | Radio Spot       |  |  30-sec script + tagline
              |  | (Big Muddy Radio)|  |  + music direction
              |  +------------------+  |
              |                        |
              |  +------------------+  |
              |  | Review Responses |  |  Draft replies to sample
              |  | (Reputation Mgr) |  |  positive + negative reviews
              |  +------------------+  |
              +------------------------+
                           |
                           v
              +------------------------+
              |  AgentContext DB        |
              |  (Neon Postgres)       |
              |  key: scout.{name}     |
              +------------------------+
```

### 11.5 Marketing Engine API Topology

```
    /api/marketing/
    |
    +-- dna .............. POST  Brand DNA ingestion (URL analysis)
    |                              |
    |                              | DNA stored in AgentContext
    |                              | (domain: marketing, topic: business-dna)
    |                              v
    +-- social ........... POST  3-post social campaign (reads DNA)
    |                              | stored as campaign.business.{id}
    |
    +-- radio-spot ....... POST  30-sec radio script (reads DNA)
    |                              | stored in domain: entertainment
    |
    +-- reskin ........... POST  Brand-matched image (Imagen 3)
    |                              | uses aestheticFlavor from DNA
    |
    +-- reviews .......... POST  Review response drafts (reads DNA)
    |                              | voice-matched to brandVoice
    |
    +-- campaign-calendar  POST  30-day roadmap (reads DNA)
    |                              | magazine + radio + social plan
    |
    +-- scout ............ POST  All-in-one (text input, NO AUTH)
    |                              | Single Gemini call -> full package
    |
    +-- scout-photo ...... POST  All-in-one (photo input, NO AUTH)
                                   | Gemini Vision -> extract -> generate

    Dependency chain (individual route flow):
    dna --> social
        --> radio-spot
        --> reskin
        --> reviews
        --> campaign-calendar

    Scout routes bypass the chain — single call generates everything.
```

---

## 12. Agent Context Database

### 12.1 Schema Models

Three Prisma models support the agent coordination system:

**AgentContext** -- Shared knowledge store
- Composite unique key: `@@unique([domain, key], name: "domain_key")`
- Fields: `id`, `domain` (String), `topic` (String), `key` (String), `content` (String), `source` (String), `agentAuthor` (String?), `confidence` (Float, default 1.0), `validUntil` (DateTime?), `createdAt`, `updatedAt`
- Upsert semantics on `(domain, key)` -- knowledge is updated in place, never duplicated

**AgentAction** -- Coordination audit log
- Fields: `id`, `agent` (String), `action` (String), `summary` (String), `detail` (String?), `domain` (String), `impact` (String?), `createdAt`
- Append-only log -- no upsert, no delete

**Decision** -- Business decisions record
- Fields: `id`, `domain`, `key`, `decision`, `rationale`, `agent`, `createdAt`

### 12.2 Fragment Count: 4,320+

The AgentContext table contains 4,320+ knowledge fragments across these domains:

| Domain | Content | Source |
|--------|---------|--------|
| `finance` | Tax data, pipeline, entities, revenue | ~/tax-db/*.md |
| `strategy` | GTM plans, competitive analysis, research | docs/strategy/*.md |
| `operations` | Agent configs, handoffs, comms protocols | .claude/agents/*.md |
| `product` | Brand guidelines, product specs, SEO | docs/*.md |
| `memory` | User prefs, feedback, project notes | .claude/memory/*.md |
| `brand` | Content guidelines, narrative docs | docs/content/*.md |
| `marketing` | DNA profiles, campaigns, scout results | Marketing Engine API |
| `entertainment` | Radio spots, show data | Marketing Engine API |

### 12.3 Ingestion Pipeline

The ingestion script at `scripts/ingest-context.ts` migrates all markdown knowledge into the database:

**Source mappings:**
- `~/tax-db/*.md` --> domain: `finance`
- `docs/strategy/*.md` --> domain: `strategy`
- `docs/google-ecosystem/*.md` --> domain: `operations`
- `docs/research/*.md` --> domain: `strategy`
- `docs/*.md` --> domain: `product` (with topic auto-detection from filename)
- `.claude/agents/*.md` --> domain: `operations`
- `.claude/memory/*.md` --> domain: `memory`
- `docs/content/*.md` --> domain: `brand`
- `docs/handoffs/*.md` --> domain: `operations`

**Chunking strategy:**
- Documents are split on markdown headers (`#{1,3}`)
- Max chunk size: 2,000 characters
- Small documents stay as a single fragment
- Large documents get keys like `docs.architecture.chunk-0`, `docs.architecture.chunk-1`, etc.

**Usage:** `DATABASE_URL="..." npx tsx scripts/ingest-context.ts`

### 12.4 Query API

```
    Agent Context Query Flow
    ========================

    +------------------+     GET /api/agent/context          +------------------+
    |  Any Agent       |  -------------------------------->  |  API Route       |
    |  (or Admin UI)   |     ?domain=marketing               |  Handler         |
    |                  |     &topic=business-dna              +--------+---------+
    +------------------+     &q=tamales                                |
                             &fresh=true                     prisma.agentContext
                             &limit=10                       .findMany({ where })
                                                                      |
                                                             ORDER BY confidence
                                                             DESC, updatedAt DESC
                                                                      |
                                                                      v
                                                             +--------+---------+
                                                             |  Neon Postgres   |
                                                             |  AgentContext    |
                                                             |  4,320+ rows    |
                                                             +------------------+

    Write flow:

    +------------------+     POST /api/agent/context         +------------------+
    |  Marketing API   |  -------------------------------->  |  API Route       |
    |  (or ingest      |     { domain, topic, key,           |  Handler         |
    |   script)        |       content, source,              +--------+---------+
    +------------------+       agentAuthor,                           |
                               confidence }                 prisma.agentContext
                                                            .upsert({ where:
                                                              { domain_key:
                                                                { domain, key }
                                                              }
                                                            })
                                                                      |
                                                                      v
                                                             +------------------+
                                                             |  Neon Postgres   |
                                                             +------------------+

    Action log:

    +------------------+     POST /api/agent/action          +------------------+
    |  Any Agent       |  -------------------------------->  |  API Route       |
    +------------------+     { agent, action,                |  Handler         |
                               summary, domain,              +--------+---------+
                               impact }                               |
                                                             prisma.agentAction
                                                             .create({ data })
```

---

## 13. Design System Roadmap

### 13.1 Five Style Presets

The design system consolidates 20+ theme classes into 5 visual languages. Each preset maps to specific fonts from the 5 Google Fonts already loaded:

| Preset | Mood | Heading Font | Body Font | Brands |
|--------|------|-------------|-----------|--------|
| **The Delta Dark** | Southern Gothic / Noir | Abril Fatface | DM Sans | Inn, Radio, Entertainment, Records |
| **The Modern MainSt** | Tech-Forward / SaaS | Plus Jakarta Sans | Inter | MBT, HDI |
| **The Broadside** | Traditional Editorial | Playfair Display | DM Sans | Magazine, DSD |
| **The White Walls** | Minimal / High-Art | Inter | Inter | BuyCurious Gallery |
| **The Paper Trail** | Academic / Muted | Playfair Display | Inter | Outsider Economics |

### 13.2 design-tokens.json

A machine-readable source of truth at `packages/config/design-tokens.json` defines all spacing, radii, shadows, and typography scales:

- Spacing: xs (0.25rem) through xxl (4rem)
- Border radius: sm (0.25rem) through full (9999px)
- Shadows: sm through xl, plus `glow` (amber gold outer glow)
- Typography: 16px base, 1.25 scale, weights 400/500/700
- Default colors: bg, surface, text, accent, slate, error, success

**Agent workflow:** Agents edit the JSON; a build step generates `base/variables.css` from it. All brands inherit changes automatically.

### 13.3 CSS Modularization Plan

The migration splits the monolithic `tokens.css` (600+ lines) into isolated per-theme files:

**Phase 1 (Days 1-2):** Foundation
- Create `packages/config/design-tokens.json` as source of truth
- Extract `:root` variables into `base/variables.css`
- Create `base/reset.css` for global resets

**Phase 2 (Days 3-5):** Tenant Isolation
- Split each `.theme-{id}` class into `themes/{name}.css` (14 theme files)
- Deploy hardened `ThemeProvider` with typed theme union
- Audit all `packages/ui` components for `var()` compliance

**Phase 3 (Days 6-7):** Hardening
- Enable Vercel Preview Deployments
- Fix Sentry source map upload
- Delete legacy `tokens.css`
- Update ingestion scripts and agent docs

**Safety protocol:** Freeze `tokens.css` during migration, run both systems simultaneously, switch tenant-by-tenant (HDI first, then Inn, then MBT), verify each domain, maintain instant rollback capability.

### 13.4 Hardened ThemeProvider

The updated ThemeProvider (`apps/web/components/theme-provider.tsx`) adds:
- **Typed themes:** Union type of all valid theme IDs (not freeform `string`)
- **Error boundary:** `useTheme()` throws if called outside provider
- **Updated localStorage key:** `hdi-theme-override` (was `hdx-theme`)
- **SSR safety:** Uses `defaultTheme` before hydration, mounted state prevents flash

### 13.5 Delta Dawn Style Guide

The ops agent (Delta Dawn) has a brand style guide for content creation:
- Typography toolkit: 5 approved fonts with specific use cases
- Visual presets by content type (Delta Dark for shows, Broadside for features, Modern MainSt for product)
- Color tokens: bg, text, accent, surface, shadow-glow
- Rules: never hardcode hex, match preset to route, use spacing tokens, request new tokens from Huck

---

## 14. Integrations Added March 27, 2026

### 14.1 Vertex AI Expansion

**Gemini 2.5 Flash** (`gemini-2.5-flash`) via `@google-cloud/vertexai` SDK:
- Used by all 8 marketing routes for text generation
- Multimodal support (image + text) for scout-photo route
- Project: `bigmuddy-ff651`, Region: `us-east4`
- Authentication: Application Default Credentials (ADC)

**Vertex AI Imagen 3** (`imagen-3.0-generate-001`) via direct REST API:
- Used by `/api/marketing/reskin` for brand-matched image generation
- 16:9 aspect ratio, `block_few` safety filter
- Authentication: Google Auth Library (`google-auth-library`)
- Endpoint: `https://us-east4-aiplatform.googleapis.com/v1/projects/{project}/locations/us-east4/publishers/google/models/imagen-3.0-generate-001:predict`

### 14.2 Google APIs Enabled

12 new Google APIs enabled on project `bigmuddy-ff651`:
- Vertex AI API (Gemini + Imagen)
- Cloud Vision API
- Cloud Natural Language API
- Cloud Text-to-Speech API (provisioned, not yet integrated)
- Cloud Translation API
- Places API (New)
- Maps JavaScript API
- Geocoding API
- Directions API
- Cloud Storage API
- Identity and Access Management API
- Service Usage API

### 14.3 Cloudbeds API

- PMS integration for the Big Muddy Inn
- Read-only: reservations, room availability, pricing
- Synced via cron job at `/api/cron/cloudbeds-sync`
- Webhook at `/api/webhooks/cloudbeds` for real-time updates

---

## 15. Business Logic

### 15.1 Pricing Tiers

| Tier | Price | Target | Includes |
|------|-------|--------|----------|
| **Free** | $0 | Directory listing only | Basic DSD listing, business name + description |
| **Starter** | $20/mo | Micro businesses | Directory listing + magazine mention + review monitoring |
| **Growth** | $50/mo | Growing businesses | Starter + social posts + radio mentions |
| **Professional** | $99/mo | Main Street SMBs | Full marketing engine: DNA + social + radio + reviews + calendar |
| **Enterprise** | $499/mo | Regional brands | Professional + dedicated account manager + custom campaigns |

### 15.2 Scout & Sell Flow

The Scout & Sell playbook is the field sales tool for onboarding Deep South Directory businesses:

```
    The Scout & Sell Playbook
    =========================

    1. WALK Main Street in Natchez
       |
    2. SNAP a photo of a business sign/card/storefront
       |
       v
    3. GEMINI VISION reads the photo
       |  Extracts: business name, phone, address, website
       |
       v
    4. BRAND DNA generated (single Gemini call)
       |  Colors, voice, audience, aesthetic flavor, category
       |
       +---> 5a. 3 SOCIAL POSTS generated (Instagram-ready)
       |
       +---> 5b. RADIO SPOT scripted (30-sec for Big Muddy Radio)
       |
       +---> 5c. REVIEW RESPONSES drafted (positive + negative)
       |
       v
    6. SHOW the business owner on your phone:
       "This is what $99/month looks like for YOUR business"
       |
       v
    7. CLOSE: "Want to join the Deep South Directory?"
```

### 15.3 Marketing Value > Software Value Pivot

The MBT platform pivoted from selling software features to selling ecosystem access:
- **What we sell:** Directory listing + Magazine features + Radio spots + Social campaigns + Review management
- **What we don't sell:** SaaS dashboards or analytics tools
- **Value proposition:** Access to the Big Muddy media ecosystem (Magazine, Radio, Gallery, Events)
- **Proof point:** The Scout & Sell demo shows $99/mo of tangible marketing deliverables in 30 seconds

### 15.4 Deep South Directory as Onboarding Funnel

The DSD is the primary customer acquisition channel:
1. Business gets a free directory listing (name + description)
2. Listing is enriched with Google Places data (hours, photos, reviews)
3. Scout & Sell generates a marketing preview package
4. Business owner sees what paid tiers deliver
5. Upsell to $20/$50/$99 based on which deliverables they want

---

## 16. Updated Infrastructure (March 27, 2026)

### 16.1 Hosting & Deployment

| Component | Provider | Plan | Cost |
|-----------|----------|------|------|
| **Application** | Vercel Pro | Pro | ~$20/mo |
| **Database** | Neon Postgres | Launch | $19/mo |
| **Media Storage** | Google Cloud Storage | Pay-as-you-go | ~$2/mo |
| **DNS** | Cloudflare | Free | $0 |
| **Error Tracking** | Sentry | Free tier | $0 |
| **Analytics** | Microsoft Clarity | Free | $0 |
| **CI/CD** | GitHub Actions | Free tier | $0 |

### 16.2 Updated Numbers

| Metric | Count |
|--------|-------|
| Production hostname patterns (`domain-routes.ts`) | 18 |
| Total pages | 113 |
| API routes | 114+ (8 new marketing routes) |
| Prisma models | 54 |
| Schema lines | 1,207 |
| CSS theme classes | 20 (consolidating to 5 presets) |
| Agent context fragments | 4,320+ |
| Cataloged images in GCS | 606 |
| Design spec documents | 5 new (style matrix, CSS plan, tokens, theme provider, Delta Dawn guide) |

### 16.3 Domain Status

Primary marketing domains (subset — engineering routing uses **hostname patterns** in `domain-routes.ts`, including aliases):

| Domain | Status | SSL |
|--------|--------|-----|
| measurablybetterthings.com | Live | Vercel |
| bigmuddytouring.com | Live | Vercel |
| deepsouthdirectory.com | Live | Vercel |
| hillbillydreamsinc.com | Live | Vercel |
| bigmuddyentertainment.com | Live | Vercel |
| outsidereconomics.com | Live | Vercel |
| bigmuddymagazine.com | Live | Vercel |
| bigmuddyradio.com | Live | Vercel |
| buycurious.art | Live | Vercel |
| measurablybetter.life | Live | Vercel |

### 16.4 Sentry Configuration

- Org: `chasepiersontv`, Project: `javascript-react`
- Client, server, and edge runtime configs installed
- Tunnel route at `/monitoring` (avoids ad-blocker interference)
- Source map upload: configured but requires `SENTRY_AUTH_TOKEN` fix in CI

### 16.5 Database Policy

Codified in `docs/DATABASE_POLICY.md`:
- **Neon Postgres** is the ONE database for all HDI production data
- All new data goes to Neon -- no new databases, no new providers
- Use Prisma exclusively (raw SQL only for pgvector)
- Credentials always in Bitwarden, synced to Vercel
- Orphaned databases identified for cleanup: Cloud SQL `micro-media-db` ($8/mo), Cloudflare D1 `openclaw-db`

---

## Appendix B: Active Domains

| Domain | Route Group | Description |
|--------|-------------|-------------|
| measurablybetterthings.com | measurably-better | SaaS product (MBT) |
| bigmuddytouring.com | touring | Inn + hospitality |
| deepsouthdirectory.com | directory | Business directory |
| hillbillydreamsinc.com | hillbilly | Holding company |
| bigmuddyentertainment.com | entertainment | Entertainment hub |
| outsidereconomics.com | economics | Economics content |
| bigmuddymagazine.com | magazine | Magazine |
| bigmuddyradio.com | radio | Radio |
| buycurious.art | gallery | Art gallery |
| measurablybetter.life | measurably-better | MBT alias |
