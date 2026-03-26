# Big Muddy Touring — System Context for External AI Agents
> Last updated: 2026-03-21

## What This Is
Big Muddy Touring (BMT) is a multi-tenant Next.js 14 monorepo powering 10+ branded websites from a single codebase. It is the technology arm of Hillbilly Dreams, Inc., a holding company based in Natchez, Mississippi.

## Architecture
- **Framework:** Next.js 14 (App Router), TypeScript, Tailwind CSS 3
- **Database:** PostgreSQL on Neon, accessed via Prisma ORM
- **Hosting:** Firebase App Hosting (Cloud Run) — auto-deploy from GitHub `main`
- **CDN/Images:** Google Cloud Storage (GCS) — `storage.googleapis.com/bmt-media-bigmuddy/`
- **Auth:** NextAuth v5 with Google OAuth + credentials
- **Monorepo:** pnpm workspaces + Turborepo
- **CI:** GitHub Actions

## Brand Domains → Route Mapping
Each domain resolves to a route prefix via Next.js middleware:
| Domain | Route | Description |
|--------|-------|-------------|
| bigmuddytouring.com | /touring | Music corridor hub — lodging, routes, cities |
| bigmuddymagazine.com | /magazine | Editorial, interviews, photo essays |
| bigmuddyradio.com | /radio | Playlists, live sessions, podcast |
| bigmuddyrecords.net | /records | Independent label |
| buycurious.art / buycuriousart.com | /gallery | Art marketplace for Mississippi corridor artists |
| outsidereconomics.com | /economics | Economic philosophy / book |
| deepsouthdirectory.com | /media | Local business directory |
| hillbillydreamsinc.com | /hillbilly | Parent company landing page (LIVE as of 2026-03-21) |
| admin.bigmuddytouring.com | /admin | Admin dashboard |

## Current Production Status (as of 2026-03-21)
| Domain | Status | Notes |
|--------|--------|-------|
| bigmuddytouring.com | ✅ 200 | All routes healthy |
| buycurious.art | ❌ 525 | Cloudflare SSL handshake failed — OPEN BLOCKER |
| hillbillydreamsinc.com | ⏳ Pending DNS | CNAME not yet added in Cloudflare |
| bigmuddytouring.com/api/auth/providers | ✅ 200 | NextAuth returns 400 on HEAD (expected), 200 on GET |

## Ops Dashboard (/ops)
Internal operations dashboard for Tracy (inn owner) and Amy (guest experience coordinator). Includes:
- KPI cards, task management, content library
- Delta Dawn AI chat (Anthropic Claude API)
- Reviews pipeline, property info
- Artist application management (BuyCurious Art)

## BuyCurious Art — Gallery System (FULLY BUILT)
The gallery is a complete system with the following:

### Public Pages (buycurious.art → /gallery/*)
- `/gallery` — Landing page with dual theme (museum clean / funky mode toggle)
- `/gallery/artists` — Artist directory with medium filters
- `/gallery/artists/[slug]` — Individual artist profile
- `/gallery/work/[slug]` — Artwork detail with price, specs, inquiry
- `/gallery/about` — Mission + ecosystem overview
- `/gallery/apply` — Artist application form (saves to DB)

### Ops/Admin Pages (/ops/gallery/*)
- `/ops/gallery` — Dashboard: pending/approved/rejected application counts + table
- `/ops/gallery/[id]` — Full application review with Approve / Reject actions

### API Endpoints
- `POST /api/gallery/applications` — Submit artist application
- `POST /api/gallery/applications/[id]/approve` — Approve + create Stripe Express account
- `POST /api/gallery/applications/[id]/reject` — Reject application
- `GET /api/gallery/artists` — Filter artists by medium, featured, status
- `GET /api/gallery/artworks` — Filter artworks by medium, artist, category, availability

### Database Models (see schema.prisma for full detail)
- `ArtistApplication` — Application form submissions (pending/approved/rejected)
- `ArtistProfile` — Approved artists in the marketplace (with Stripe account ID)
- `Artwork` — Gallery pieces (price in cents, images as JSON array of GCS URLs)
- `ArtOrder` — Purchase records (Stripe payment ID, shipping address JSON)

### What's Still Missing in the Gallery
- Checkout/payment UI (ArtOrder model exists, no customer-facing flow)
- Artist dashboard (no auth or UI for approved artists to upload work)
- Real images wired to DB (currently using demo data in demo-data.ts)
- Frontend connected to real API (gallery pages use static demo-data.ts, not live DB queries)

## Key People
| Person | Role |
|--------|------|
| Chase Pierson | Builder/CEO — built 100% of the technology, runs all operations |
| Tracy | Co-owner of The Big Muddy Inn, Natchez MS |
| Amy (Arri) | Guest Experience & Artist Operations Coordinator |

## The Property
- **Name:** The Big Muddy Inn
- **Location:** Natchez, Mississippi
- **Type:** Boutique inn / music venue / creative residency
- **PMS:** CloudBeds
- **Current base rate:** $125/night
- **Competitor range:** $174–$263/night (Pilgrimage season)
- **Spring Pilgrimage:** March 19 – mid-April (active now — peak season)

## Database Models (key ones)
See schema.prisma for full details. Key models:
- Article, Playlist, Event, City — content/editorial
- LaunchTask, ContentPack, OpsActivity — ops dashboard
- ChatMessage — Delta Dawn conversations
- ArtistApplication — BuyCurious Art submissions
- ArtistProfile — Approved gallery artists (with Stripe Express account)
- Artwork — Gallery pieces
- ArtOrder — Purchase records
- UserProfile — auth + role management

## External Integrations
- CloudBeds — property management system (PMS)
- Airbnb / TripAdvisor — review platforms
- Google Business — local listings
- Anthropic Claude API — Delta Dawn chat
- Google Cloud Storage — media assets
- Stripe — artist payout accounts (Express) + future customer checkout

## What Perplexity Should Focus On
1. **Competitor pricing** — monitor Natchez lodging rates on Airbnb/Booking.com
2. **Review monitoring** — track new reviews on Airbnb and TripAdvisor
3. **Event calendar** — Natchez Pilgrimage season (active now through mid-April), festivals, local events
4. **SEO/content opportunities** — what people search for about Natchez, the Mississippi corridor
5. **Industry trends** — boutique hospitality, independent music venues, art marketplaces
6. **Art marketplace research** — commission structures, subscription box models for art collectors

## What Perplexity Should NOT Do
- Do not generate code or claim to deploy anything
- Do not make database changes
- Do not generate seed data or schemas
- The codebase is managed by Claude Code (CC) and Antigravity (AG)
