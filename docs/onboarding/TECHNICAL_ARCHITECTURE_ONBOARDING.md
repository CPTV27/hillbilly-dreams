# HDI Technical Architecture — Onboarding for Miles & Elijah

*April 7, 2026. Written by Chase with Claude Code.*

**Read this first. Reference it daily. Ask questions about anything that doesn't make sense.**

---

## 1. The Big Picture

Hillbilly Dreams Inc (HDI) is a media-hospitality ecosystem. One codebase, one Vercel deployment, 14 domains. Total infrastructure cost: **$167/month**.

**Three layers:**
- **HDI** = holding company (backstage, minimal public presence)
- **MBT (Measurably Better Things)** = the technology platform (the engine)
- **Implementations** = Big Muddy (Natchez, MS) + Bearsville Creative (Woodstock, NY)

The idea: the same architecture that runs a Viacom can run a small-town media economy. We proved it in Natchez. Now we're replicating it in Woodstock.

---

## 2. The Stack (and Why Each Piece)

| Layer | Technology | Why This One |
|-------|-----------|-------------|
| **Framework** | Next.js 14 App Router | Server components, file-based routing, middleware rewrites for multi-tenant. We tried Pages Router first — App Router is better for our domain-based routing. |
| **Language** | TypeScript everywhere | No exceptions. Catches bugs before production. Every file, every script. |
| **Styling** | Inline CSS + CSS variables | No Tailwind. We use `var(--font-body)`, `var(--font-display)`, `var(--bg)`, `var(--text)`, `var(--accent)`. This gives us per-tenant theming without class name conflicts. QC rule: no hardcoded fonts or colors. |
| **ORM** | Prisma | 122 models. Type-safe database queries. Schema as documentation. |
| **Database** | PostgreSQL on Neon | Serverless Postgres. Connection pooling built in. Branching for dev. $0 on free tier. |
| **Auth** | next-auth v5 | Google OAuth. Session management. Admin role gating. |
| **Deployment** | Vercel | Git push → deployed in 2 minutes. Preview URLs for every branch. Edge network. |
| **AI** | Google Gemini 2.5 Flash | Primary model. $9.33/month total AI costs. Function calling for database tools. |
| **AI Fallback** | Grok (xAI) | Strategic advisor layer. Falls back when Gemini is down. |
| **Search** | Perplexity | Research queries. |
| **Storage** | Google Cloud Storage | Bucket: `bmt-media-bigmuddy`. All photos, videos, media. |
| **DNS** | Cloudflare | All 14 domains. Gray cloud (DNS only). A → 76.76.21.21, www CNAME → cname.vercel-dns.com. |
| **Secrets** | Bitwarden | Source of truth for ALL credentials. Vercel env vars for deployment. Never hardcode secrets. |

---

## 3. Multi-Tenant Architecture

Four tenants share one deployment:

| Tenant | Domains | Route Group |
|--------|---------|-------------|
| Big Muddy | bigmuddytouring.com, bigmuddymagazine.com, bigmuddyradio.com, bigmuddyentertainment.com, bigmuddyrecordlabel.com, deepsouthdirectory.com, outsidereconomics.com | touring, magazine, radio, entertainment, records, directory, economics |
| Bearsville | bearsvillemediagroup.com, bearsvillemedia.com | bearsville |
| Studio C | studiocvideo.com | studioc |
| Tuthill | tuthilldesign.com | tuthill |

**How it works:**

1. Request hits `bearsvillemediagroup.com/magazine`
2. **Middleware** (`apps/web/middleware.ts`) extracts hostname
3. Matches against **domain-routes.ts** → finds `bearsville` route group
4. Rewrites URL to `/bearsville/magazine` internally
5. Next.js renders `apps/web/app/bearsville/magazine/page.tsx`
6. User sees `bearsvillemediagroup.com/magazine` in their browser

**Key files:**
- `apps/web/config/domain-routes.ts` — hostname → route group mapping
- `apps/web/config/tenants.ts` — tenant registry (domains, themes, features, GCS bucket)
- `apps/web/middleware.ts` — the routing engine

**The rule:** hostname routing runs BEFORE brand prefix checks. Domain identity always wins.

---

## 4. The Database (122 Prisma Models)

**Location:** `packages/database/prisma/schema.prisma`

### Key model groups:

**Directory & Corridor:**
- `DirectoryBusiness` — 5,605 businesses with Google Places data, GPS, ratings
- `CorridorCity` — 13 cities (Memphis → New Orleans) with Census demographics
- `ConstellationNode` / `ConstellationEdge` — derived graph layer

**Touring:**
- `Artist` — musicians in our network
- `Track` — audio files with metadata, AI analysis, revenue splits
- `Split` — revenue splits per track (80% artist / 15% label / 5% platform)
- `TouringVenue` — 735 venues with capacity, stage specs, booking contacts
- `TouringHotel` — 660 hotels with band-friendly ratings
- `TouringRestaurant` — 1,571 restaurants with musician-friendly flags
- `TourRoute` / `TourRouteStop` — pre-built touring routes

**Content:**
- `Article` — magazine articles
- `SocialPost` — scheduled social content
- `Event` — shows and performances

**Gallery:**
- `ArtistProfile` — visual artists
- `Artwork` — individual pieces with Stripe pricing

**Commerce:**
- `Client` — DSD paying customers
- `Review` — Google/Yelp reviews with AI-drafted responses
- `Report` — monthly client performance reports

**AI/Ops:**
- `AgentAction` — every AI action logged (Delta Dawn voice relay, etc.)
- `AgentContext` — persistent AI memory per domain
- `MelodyVaultLog` — music pipeline audit trail

### Commands:
```bash
# Generate Prisma client after schema changes
pnpm --filter @bigmuddy/database exec prisma generate

# Push schema to DB (no migration history)
pnpm --filter @bigmuddy/database exec prisma db push

# Create migration (versioned history)
pnpm --filter @bigmuddy/database exec prisma migrate dev --name description-here

# Deploy migrations to production
pnpm --filter @bigmuddy/database exec prisma migrate deploy
```

---

## 5. AI Layer — Delta Dawn

Delta Dawn is our AI assistant. She has 10 database tools and runs on every page via a chat widget.

### Two endpoints, same tools:

| Endpoint | Input | Auth | Used By |
|----------|-------|------|---------|
| `POST /api/dawn/chat` | JSON messages | None (public) | DD widget on every page |
| `POST /api/voice/stream` | Audio or JSON | Admin session OR SIRI_API_KEY | Siri Shortcut, voice callers |

### The 10 tools:

| Tool | What It Queries |
|------|----------------|
| `search_directory` | Client table (CRM) |
| `get_shows` | Event table |
| `get_articles` | Article table |
| `get_business_reviews` | Review table |
| `get_constellation_stats` | ConstellationNode/Edge counts |
| `get_constellation_subgraph` | BFS neighborhood from constellation |
| `search_touring_venues` | TouringVenue table |
| `list_corridor_cities` | CorridorCity table |
| `list_tour_routes` | TourRoute table |
| `search_directory_listings` | DirectoryBusiness table |

### The rule:
**NEVER let the AI make up business names, addresses, or details.** Every factual claim must come from a tool call. If a tool returns no results, Dawn says "I don't have that in the database."

### Model routing:

| Role | Primary | Fallback |
|------|---------|----------|
| Chat / Generation | Gemini 2.5 Flash | Grok 3 |
| Search | Perplexity | Gemini Flash |
| Images | Vertex AI Imagen 3 | — |
| Speech-to-Text | Google Cloud STT | — |

API keys in Vercel: `GEMINI_API_KEY`, `XAI_API_KEY`, `PERPLEXITY_API_KEY`, `GOOGLE_APPLICATION_CREDENTIALS_JSON`

---

## 6. The Constellation Graph

A Postgres-native graph layer — no Neo4j (see ADR-001).

**What it is:** Every venue, hotel, restaurant, city, route, and brand is a node. Relationships between them are edges. The graph lets you ask "what's near this venue?" or "what's connected to this city?"

**Numbers:** 8,548 nodes, 11,552 edges. All from real Google Places data.

**Key files:**
- `packages/database/prisma/schema.prisma` — ConstellationNode, ConstellationEdge models
- `scripts/graph-lab/seed-constellation.ts` — rebuilds graph from touring/directory data
- `apps/web/app/api/constellation/route.ts` — `GET ?entityType=venue&entityId=123&depth=2`
- `apps/web/app/constellation/` — visual explorer (Canvas renderer)
- `scripts/graph-lab/constellation-views.sql` — 4 materialized views

**Commands:**
```bash
pnpm --filter @bigmuddy/database run seed:constellation
pnpm --filter @bigmuddy/database run refresh:constellation-views
```

---

## 7. Content Pipeline (Photos & Video)

Photos flow from your phone to the website automatically.

### How it works:
1. Take a photo/video on your iPhone
2. Add it to a shared Apple Photos album
3. iCloud syncs to Chase's MacBook
4. `launchd` cron runs every 30 minutes (`com.hdi.photos-to-gcs`)
5. Script exports from Photos → converts to WebP → extracts GPS → uploads to GCS
6. Videos get thumbnail + Google Cloud STT transcription

### Three shared albums:
| Album | GCS Path | Content Type |
|-------|----------|-------------|
| Big Muddy Magazine | `photos/magazine/` | Editorial, city guides, food |
| Big Muddy Entertainment | `photos/entertainment/` | Shows, performers, music |
| Deep South Directory | `photos/directory/` | Storefronts, businesses |

### Photo rules:
- WebP format, 2400px long edge, quality 82
- No over-sharpening (Lightroom: sharpening 25-40, clarity 0-10)
- Check orientation — no sideways photos
- Warm, natural look — not crunchy or over-processed
- No AI-generated people on customer-facing pages

**Script:** `scripts/media/photos-to-gcs.sh`

---

## 8. Data Pipeline (Google Places + Census)

We scraped the entire Memphis-to-New Orleans corridor.

| Script | What It Does | Output |
|--------|-------------|--------|
| `scripts/media/scrape-corridor-places.ts` | Google Places API for venues, food, lodging, interests | 2,249 businesses |
| `scripts/media/scrape-corridor-deep.ts` | Deep South specifics: juke joints, soul food, civil rights sites | 3,225 businesses |
| `scripts/media/scrape-census-economic.ts` | Census Bureau: population, income, poverty, demographics | 11 cities with data |
| `scripts/media/ingest-music.ts` | Music library → Artist + Track + Split records | 55 tracks, 3 artists |

**Totals:** 5,605 businesses, 735 venues, 660 hotels, 1,571 restaurants, 13 corridor cities.

---

## 9. Key API Routes

| Route | What | Auth |
|-------|------|------|
| `POST /api/dawn/chat` | Delta Dawn chat with 10 tools | Public |
| `POST /api/voice/stream` | Voice AI endpoint | Admin or SIRI_API_KEY |
| `GET /api/constellation` | Graph queries (entityType, entityId, depth) | Public |
| `POST /api/grok/chat` | Grok strategic advisor with tool execution | Admin |
| `POST /api/marketing/scout` | Business research + social/radio/review generation | Admin |
| `POST /api/marketing/social` | Social campaign from Marketing DNA | Admin |
| `POST /api/marketing/campaign-calendar` | 30-day marketing roadmap | Admin |
| `POST /api/ops/reviews/draft` | AI-drafted review responses | Admin |
| `POST /api/clients/[id]/report` | Monthly client performance report | Admin/Cron |
| `GET /api/cron/ai-ceo-brief` | Automated morning briefing → Asana task | Cron |

---

## 10. Broadcasting (Mac Mini)

The Mac Mini runs our radio and media services.

| Detail | Value |
|--------|-------|
| IP | 192.168.4.37 |
| User | ClawdBOT |
| SSH | `ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37` |
| PATH | Add `/opt/homebrew/bin` — tools are there but not on default PATH |

### Services:

| Service | Port | URL |
|---------|------|-----|
| OpenBroadcaster | 8080 | http://192.168.4.37:8080 |
| Icecast | 8010 | http://192.168.4.37:8010 |
| Plex | 32400 | http://192.168.4.37:32400 |
| Postiz | 4007 | http://192.168.4.37:4007 |

### Music library (T7 drive):
- **Amy Allen:** 9 tracks (Big Muddy Radio Singles)
- **Chase Pierson:** 6 tracks (Rough Mixes)
- **Mechanical Bull:** 40 tracks across 3 albums
- **6 M3U playlists** ready for Plex/Icecast
- **93 slideshow photos** for Plex Photos

---

## 11. Machines & Credentials

| Machine | Role | Access |
|---------|------|--------|
| MacBook Pro | Dev, code, deployment | Local (Chase's laptop) |
| Mac Mini | Broadcasting, Plex, services | SSH with `~/.ssh/id_mini` |

### Credential rules:
1. **Bitwarden is the source of truth.** No exceptions.
2. Before creating any credential: CHECK BITWARDEN FIRST.
3. After creating any credential: PUT IT IN BITWARDEN.
4. Never hardcode secrets. Use environment variables.
5. Vercel env vars = deployment source. Bitwarden = master store.

### Get env vars locally:
```bash
vercel env pull    # Downloads .env.local from Vercel
```

---

## 12. QC Rules (Hard Requirements)

These are not suggestions. These are rules.

- **No hardcoded fonts** — use `var(--font-body)` or `var(--font-display)`
- **No hardcoded colors** — use CSS custom properties
- **No hardcoded model names** — import from `lib/ai-models.ts`
- **No tech jargon** on customer-facing pages
- **No high-tech imagery** — Main Street, not Silicon Valley
- **AI generates art, Canva handles typography** — never let AI put text in images
- **DSD product name is "Deep South Directory"** — not "MBT" on customer pages
- **Tracy and Amy are equity partners** — never employees
- **Bitwarden for all secrets** — no exceptions
- **Verify deploys** — CI passing ≠ deployed. Check live URLs.
- **Arrie Aslin** — correct spelling. Not "Arri Aslan."

---

## 13. How to Get Started

```bash
# Clone
git clone https://github.com/CPTV27/hillbilly-dreams.git
cd hillbilly-dreams

# Install
pnpm install

# Get env vars from Vercel
vercel link    # Follow prompts to link to the project
vercel env pull

# Generate Prisma client
pnpm --filter @bigmuddy/database exec prisma generate

# Run dev server
pnpm dev

# Open
open http://localhost:3000
```

### Key commands:
```bash
# Type check
pnpm --filter @bigmuddy/web exec tsc --noEmit

# Build
pnpm --filter @bigmuddy/web build

# Prisma
pnpm --filter @bigmuddy/database exec prisma generate
pnpm --filter @bigmuddy/database exec prisma db push
pnpm --filter @bigmuddy/database exec prisma studio    # Visual DB browser

# Seed constellation
pnpm --filter @bigmuddy/database run seed:constellation
pnpm --filter @bigmuddy/database run refresh:constellation-views

# Health check
bash scripts/health-check.sh
```

---

## 14. Architecture Decision Records

| ADR | Decision | Status |
|-----|----------|--------|
| ADR-001 | Neo4j deferred to Phase 2 — Postgres handles all current queries | Accepted |
| ADR-002 | Voice pipeline: Gemini + whitelisted Prisma tools, no Dialogflow | Accepted |
| ADR-003 | EmDash (Cloudflare CMS) as white-label site builder for DSD customers | Phase 2 |

Full ADRs at `docs/adr/`.

---

## 15. The 14 Domains

| Domain | Brand | Status |
|--------|-------|--------|
| bigmuddytouring.com | Big Muddy Touring | Active |
| bigmuddymagazine.com | Big Muddy Magazine | Active |
| bigmuddyradio.com | Big Muddy Radio | Active |
| bigmuddyentertainment.com | Big Muddy Entertainment | Active |
| bigmuddyrecordlabel.com | Big Muddy Records | Active |
| deepsouthdirectory.com | Deep South Directory | Active — primary revenue |
| outsidereconomics.com | Outsider Economics | Active — editorial |
| hillbillydreamsinc.com | HDI Corporate | Active — sparse |
| tuthilldesign.com | Tuthill Design | Active — partner |
| bearsvillemediagroup.com | Bearsville Creative | Live — summer activation |
| bearsvillemedia.com | Bearsville (alias) | Redirects to above |
| measurablybetter.life | MBT (B2B platform) | B2B only — not consumer |
| buycurious.art | Gallery/Storefront | Routes to gallery |
| studiocvideo.com | Studio C Video | Not our domain — partner controls |

---

## Questions?

Chase: me@chasepierson.tv
Asana workspace: chasepierson.tv (all tasks here)
Repo: github.com/CPTV27/hillbilly-dreams
