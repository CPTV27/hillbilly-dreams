# Big Muddy Touring — Claude Code Handoff Document

**Last updated:** March 15, 2026
**Last commit:** `be25348` — feat(economics): add posts 11-15, complete Substack drafts, voice guide

---

## What Is This Project?

A **multi-tenant Next.js 14 monorepo** deployed on **Firebase App Hosting** that serves five branded websites from a single codebase:

| Brand | Domain | Purpose |
|---|---|---|
| **Touring** | bigmuddytouring.com | Primary editorial hub — inn, music route, travel |
| **Magazine** | bigmuddymagazine.com | Long-form articles, 18 city guides |
| **Radio** | bigmuddyradio.com | Curated playlists, live sessions, podcast |
| **Economics** | outsidereconomics.com | Field manual for independent economic systems — Chase's book |
| **Admin** | admin.bigmuddytouring.com / localhost:3000 | Operations center — CMS, CRM, metrics, AI media generation |

All four sites share one Next.js deployment. **Middleware** (`apps/web/middleware.ts`) reads the hostname and rewrites requests to the correct route group.

---

## Repository Structure

```
bmt/
├── apps/web/                         # Next.js 14 app (App Router)
│   ├── lib/
│   │   ├── gcs.ts                    # Google Cloud Storage helper
│   │   ├── imagen.ts                 # Vertex AI Imagen 3.0 wrapper
│   │   └── posts.ts                  # Markdown post discovery/rendering
│   ├── app/
│   │   ├── touring/                  # bigmuddytouring.com pages
│   │   │   ├── page.tsx              # Homepage (hero, suites, route, articles)
│   │   │   ├── inn/page.tsx          # The Inn (18-city corridor guide)
│   │   │   └── route/page.tsx        # Music route map
│   │   ├── magazine/                 # bigmuddymagazine.com pages
│   │   │   ├── page.tsx              # Magazine homepage
│   │   │   ├── articles/[id]/page.tsx # Article detail (SSG)
│   │   │   └── city-guides/page.tsx  # City guides listing
│   │   ├── radio/                    # bigmuddyradio.com pages
│   │   │   ├── page.tsx              # Radio homepage (playlists + events)
│   │   │   ├── playlists/page.tsx    # All playlists with hero image
│   │   │   ├── live/page.tsx         # Live sessions with hero image
│   │   │   └── podcast/page.tsx      # Podcast (coming soon) with hero image
│   │   ├── economics/                # outsidereconomics.com pages
│   │   │   ├── page.tsx              # Homepage (concept cards, CTA)
│   │   │   ├── field-manual/page.tsx  # 10-post index (auto-discovers markdown)
│   │   │   ├── field-manual/[slug]/   # Individual post pages (dynamic)
│   │   │   ├── the-math/page.tsx     # 6 equations with worked examples
│   │   │   ├── community/page.tsx    # "Find Your 20" playbook
│   │   │   └── about/page.tsx        # Origin story + Big Muddy brands
│   │   ├── admin/                    # admin.bigmuddytouring.com pages
│   │   │   ├── dashboard/page.tsx    # KPI dashboard
│   │   │   ├── articles/             # Article CRUD (list, new, [id]/edit)
│   │   │   ├── playlists/            # Playlist CRUD
│   │   │   ├── events/               # Event CRUD
│   │   │   ├── newsletter/           # Newsletter CRUD
│   │   │   ├── contacts/             # CRM contacts
│   │   │   └── calendar/page.tsx     # Calendar view
│   │   ├── api/                      # REST endpoints for all resources
│   │   ├── layout.tsx                # Root layout (fonts, metadata)
│   │   └── globals.css               # Global styles
│   ├── lib/articles.ts               # 18 hardcoded city guide articles
│   ├── middleware.ts                  # Hostname-based multi-tenant routing
│   ├── next.config.mjs               # Image optimization, caching, transpilation
│   └── public/images/                # All static images (46 files, all .webp)
│       ├── heroes/     (4 files)     # Hero backgrounds
│       ├── real/       (15 files)    # Property/location photography
│       ├── magazine/   (12 files)    # City guide photography
│       ├── fleet/      (11 files)    # Tour vehicle images
│       └── command/    (4 files)     # Atmospheric admin images
├── packages/
│   ├── config/                       # Shared brand config + TypeScript types
│   │   ├── brands.ts                 # BRANDS object, getBrandFromHostname()
│   │   ├── types.ts                  # Article, Playlist, Event, etc.
│   │   └── tokens.css                # Design tokens (CSS custom properties)
│   ├── database/                     # Prisma ORM (PostgreSQL)
│   │   └── prisma/schema.prisma      # 8 models: Article, Playlist, Event, etc.
│   └── ui/                           # Shared React components
│       └── index.ts                  # Navigation, ArticleCard, PlaylistCard, etc.
├── outsider-economics-v2/            # 15 posts + Substack drafts + voice guide
├── apps/video/                       # Remotion video pipeline (untracked)
├── apphosting.yaml                   # Firebase App Hosting config
├── firebase.json                     # Firebase project config
├── turbo.json                        # Turborepo task config
└── pnpm-workspace.yaml              # Monorepo workspace definition
```

---

## How Multi-Tenant Routing Works

**File:** `apps/web/middleware.ts`

1. Reads `x-forwarded-host` (Firebase) or `host` header
2. Skips rewrites for `/api`, `/_next`, static assets, and paths already prefixed with a brand (`/touring/*`, `/radio/*`, etc.)
3. Admin-only paths (`/dashboard`, `/articles`, `/calendar`, `/contacts`, `/events`, `/newsletter`) rewrite to `/admin/*` from any domain
4. **Important:** `/playlists` is NOT in adminPaths — it's used by both radio and admin. Radio resolves via hostname routing; admin resolves via the fallback.
5. Hostname routing: `bigmuddytouring.com` → `/touring/*`, `bigmuddymagazine.com` → `/magazine/*`, `bigmuddyradio.com` → `/radio/*`
6. Fallback (admin domain, localhost): → `/admin/*`
7. Dev override: set `NEXT_PUBLIC_BRAND=touring` in `.env.local` to bypass hostname detection

---

## Navigation Links (from brands.ts)

| Brand | Nav Items |
|---|---|
| Touring | The Inn, The Route, Magazine (external), Radio (external) |
| Magazine | Features, City Guides, Interviews, Photo Essays |
| Radio | Playlists (`/playlists`), Live Sessions (`/live`), Podcast (`/podcast`) |
| Admin | Dashboard, Articles, Playlists, Events, Newsletter, Contacts, Calendar |

---

## Styling System

- **No Tailwind** in practice — all styling uses CSS custom properties (design tokens)
- Tokens defined in `packages/config/tokens.css`
- Theme variants via `.theme-touring`, `.theme-radio`, etc.
- Inline `<style>` blocks in page components (BEM-style class naming)
- Fonts: **Playfair Display** (display/serif) + **DM Sans** (body/sans-serif)
- Primary color across all brands: `#c8943e` (amber gold)

---

## Database

- **Prisma** ORM targeting **PostgreSQL**
- Connection via `DATABASE_URL` (pooled) and `DIRECT_DATABASE_URL` (direct)
- Models: Article, Playlist, Event, NewsletterIssue, Contact, Metric, User, Account, Session
- **Current state:** Most pages use hardcoded placeholder data arrays. Database is wired up but pages read from `PLACEHOLDER_*` arrays until full DB integration.
- Seed script: `POST /api/articles/seed` populates from `lib/articles.ts`

---

## Deployment

- **Platform:** Firebase App Hosting → Cloud Run container
- **Runtime:** Node.js 20
- **Deploy trigger:** `git push origin main` triggers auto-deploy
- **Secrets:** DATABASE_URL, DIRECT_DATABASE_URL, NEXTAUTH_SECRET, ADMIN_SESSION_TOKEN (in Firebase Secret Manager)
- **Build time:** ~12 seconds (Turborepo cached)
- **Image optimization:** Sharp enabled, AVIF + WebP, aggressive caching (1 year)

---

## 18-City Guide Network

All hardcoded in `apps/web/lib/articles.ts`. Each city has a full article with:
- Hero image mapped to a file in `/images/magazine/`
- Full body content (Southern Gothic editorial style)
- Category, city, reading time metadata

**Cities (Memphis → Branson):** Memphis, Clarksdale, Vicksburg, Natchez, St. Francisville, Baton Rouge, New Orleans, Lafayette, Alexandria, Monroe, Ruston, Natchitoches, Shreveport, El Dorado, Little Rock, Fayetteville, Bentonville, Branson

---

## Recent Work (What Was Fixed)

### Session 1 (Feb 26 – Mar 3)
- Middleware `x-forwarded-host` fix for Firebase App Hosting
- Admin path routing fix (dashboard, articles, etc. accessible from any domain)
- 18 city guide hero images mapped to existing photography
- Performance optimization (Sharp, caching headers, font trimming, JPG→WebP conversion, unreferenced image cleanup)

### Session 2 (Mar 3 – Mar 4)
- **User testing** — manually tested all 4 sites in Chrome
- **Fixed 3 broken article hero images** on touring homepage (`PLACEHOLDER_ARTICLES` in `touring/page.tsx` referenced nonexistent `*-guide.webp` paths → updated to real filenames)
- **Removed broken auto-generation** of hero image paths in `admin/articles/new/page.tsx`
- **Fixed `/playlists` routing** — removed from middleware `adminPaths` so `bigmuddyradio.com/playlists` routes to the public playlists page instead of admin
- **Added hero images** to radio subpages: `/live` (blues-room-live-show.webp), `/playlists` (record-player.webp), `/podcast` (musician-performing.webp)
- **Added cover images** to all playlists on the playlists page (previously all `null`)
- **Created `/podcast` page** — coming soon page with hero image, season 1 details, newsletter signup

---

## Known State / What's Working

| Area | Status |
|---|---|
| Touring homepage | ✅ All images, links, sections working |
| Touring /inn | ✅ 18-city guide with hero images |
| Touring /route | ✅ Route map page |
| Magazine homepage | ✅ Featured articles, grid |
| Magazine /articles/[id] | ✅ All 18 city articles render |
| Magazine /city-guides | ✅ City guide listing |
| Radio homepage | ✅ Playlists, events, fleet image |
| Radio /playlists | ✅ Hero image + 8 playlists with covers |
| Radio /live | ✅ Hero image + 4 upcoming sessions |
| Radio /podcast | ✅ Hero image + coming soon content |
| Admin dashboard | ✅ KPI metrics |
| Admin CRUD pages | ✅ All working |
| API routes | ✅ All CRUD endpoints |
| Economics homepage | ✅ Concept cards link to field manual posts |
| Economics /field-manual | ✅ 10 posts auto-discovered from markdown |
| Economics /field-manual/[slug] | ✅ All 10 render with styled prose |
| Economics /the-math | ✅ 6 equations with worked examples |
| Economics /community | ✅ "Find Your 20" playbook |
| Economics /about | ✅ Origin story + Big Muddy brands |
| Admin /media (generate) | ✅ AI image generation panel |
| Video pipeline | ⚠️ Working locally, not committed |
| Mobile responsive | ⚠️ Not thoroughly tested |
| Database integration | ⚠️ Wired but pages use placeholder arrays |

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Dev server (all apps)
pnpm dev

# Build
pnpm build

# Override brand locally (no /etc/hosts needed)
NEXT_PUBLIC_BRAND=touring pnpm dev

# Database
pnpm db:generate    # Generate Prisma client
pnpm db:push        # Push schema to database
```

---

## Key Files to Know

| File | Why It Matters |
|---|---|
| `apps/web/middleware.ts` | All routing logic — hostname → route group |
| `packages/config/brands.ts` | Brand config, nav links, domains |
| `packages/config/types.ts` | Shared TypeScript types |
| `apps/web/lib/articles.ts` | All 18 city guide articles (hardcoded) |
| `apps/web/app/radio/page.tsx` | Radio homepage with placeholder data |
| `apps/web/app/touring/page.tsx` | Touring homepage with placeholder articles |
| `apps/web/next.config.mjs` | Image optimization, caching, remote patterns |
| `apps/web/lib/imagen.ts` | Vertex AI Imagen wrapper for AI image generation |
| `apps/web/lib/posts.ts` | Markdown post pipeline for economics |
| `outsider-economics-v2/VOICE-GUIDE.md` | Chase's writing voice rules |
| `apps/video/src/data/equations.ts` | All video content (stories, stats, quotes) |
| `apphosting.yaml` | Firebase deployment config + secrets |

---

## Session 3 — March 15, 2026

### Outsider Economics (5th Brand)
- **Full website built** — homepage, field manual (10 posts w/ markdown pipeline), the math (6 equations), community ("Find Your 20"), about
- **15 posts written** in `outsider-economics-v2/` (~30K words total, chapters 1-15)
- **Markdown rendering pipeline** — `lib/posts.ts` auto-discovers posts, parses with gray-matter/remark, renders to styled HTML
- **10 Substack drafts** ready to paste in `outsider-economics-v2/substack/`
- **Twitter hooks** for all 10 core posts (2-3 options each) in `twitter-hooks.md`
- **Voice guide** at `outsider-economics-v2/VOICE-GUIDE.md`
- **Content matrix** — 30 rows seeded via Google Apps Script engine, all 30 social posts generated
- **SEO** — OG images, Twitter cards, sitemap.ts, robots.ts

### Google Imagen AI Media Generation
- **`lib/imagen.ts`** — Vertex AI Imagen 3.0 wrapper using Application Default Credentials
- **`POST /api/media/generate`** — admin-only endpoint: prompt → Imagen → PNG → WebP → GCS
- **Admin media UI** updated with "Generate with AI" panel (prompt textarea, album picker, aspect ratio selector)
- **GCP setup done:** Vertex AI API enabled on `bigmuddy-ff651`, IAM role granted to Firebase App Hosting service account

### Video Pipeline (`apps/video/`) — NOT YET COMMITTED
- **Remotion-based** programmatic video generation
- **3 composition types:** EquationReveal (narrative story beats), StatCounter (animated number reveals), QuoteCard (line-by-line quote reveals)
- **30 compositions registered** — 6 stories + 4 stats + 5 quotes, each in YouTube (1920×1080) and Shorts (1080×1920) format
- **Test renders completed** — `extraction-v3-shorts.mp4` is latest (3.9 MB, 60s vertical)
- **Data:** `src/data/equations.ts` has all video content (stories, stats, quotes)
- **Commands:**
  - `pnpm --filter @bigmuddy/video exec remotion studio src/index.ts` — preview
  - `pnpm --filter @bigmuddy/video exec remotion render src/index.ts <composition-id> --output <path>` — render single

### Infrastructure
- **gcloud** switched from `chase@scan2plan.io` / `s2px-production` → `me@chasepierson.tv` / `bigmuddy-ff651`
- Projects confirmed airlocked — no cross-contamination
- Apps Script content engine redeployed as @3

### Pending / Needs Chase
- Set up Substack account → paste 10 prepped drafts
- Point `outsidereconomics.com` DNS → Firebase Console
- Post Twitter hooks
- Commit `apps/video/` after approving render style
- Batch render all 30 videos

---

## Gotchas

1. **`/playlists` is shared** between radio and admin — middleware handles this by NOT including it in `adminPaths`. Radio gets it via hostname routing; admin gets it via fallback.
2. **Images appear blank on first load** — this is lazy loading (Next.js Image component). Scrolling back re-triggers the load. Not a bug.
3. **Route groups use parentheses** in the filesystem (`(touring)`, `(radio)`) but the actual folder names are without parens (`touring/`, `radio/`). The directory listing says `touring/` but the comment at the top of each file says `(touring)` — this is just a naming convention in the comments.
4. **All placeholder data** is hardcoded in page files as `PLACEHOLDER_*` arrays until DB is fully connected.
5. **Font optimization:** Only `latin` subset loaded; display weights trimmed to what's used (400, 700, 800 for Playfair; 400, 500, 600, 700 for DM Sans).
