# AGENT_LEDGER.md
> Coordination log for the SuperChase federated agent swarm.
> Read before acting. Write after completing.
> Agents: CC (Claude Code) | AG (Antigravity) | GA (Google AI)

---

## [2026-03-21 17:00] — AG — COMPLETE

**Task:** hillbillydreamsinc.com — Visual experience built on CC's skeleton

### What AG Did
Built the full Hillbilly Dreams landing page on CC's routing/skeleton foundation. Used the correct Big Muddy ecosystem brands (not S2PX properties — those are a separate equity structure).

1. **Added `theme-hillbilly` CSS tokens** to `packages/config/tokens.css`
   - Iron-dark blue-blacks (`--bg: #0a0f1a`, `--surface: #111827`) 
   - Aged gold accent (`--accent: #c8943e`) — same gold, cooler backgrounds than touring
   - Full variable set: bg, surface (3 levels), accent (4 states), border (2 levels), shadow-glow

2. **Rebuilt `apps/web/app/hillbilly/page.tsx`** — Full page from CC's skeleton:
   - **Hero** — Playfair Display hero type, "Hillbilly Dreams, Inc." with eyebrow (Natchez, Mississippi), tagline, CTA buttons (Ecosystem / Story), scroll indicator. Background pattern using radial gradients.
   - **Brand Ecosystem Grid** — 7 cards with icons, names, taglines, descriptions, hover effects (lift + glow + arrow animation). Correct brands: Touring, Magazine, Radio, Records, BuyCurious Art, Outsider Economics, Deep South Directory.
   - **The Story** — First-person narrative in Chase's voice. Origin story (left corporate, moved to Mississippi, built from scratch). Blockquote pull-quote. Covers the ecosystem flywheel concept.
   - **Philosophy** — Three principle cards: Sovereignty, Locality, Durability.
   - **Footer** — HD mark, company name, Natchez MS, email, copyright, tagline.

3. **Design system** — All CSS uses existing BMT design tokens (`--font-display`, `--text-hero`, `--space-*`, `--radius-*`, etc.). BEM naming convention (`hd-hero__title`, `hd-brand-card__name`). Inline `<style>` block matching the pattern in `touring/page.tsx`.

### What AG Did NOT Build (Intentional)
- **No Team section** — Chase said corporate structure of Hillbilly Dreams Inc. hasn't been defined yet. Tracy and Amy own the Big Muddy Inn; Chase is consultant/operator. Team section should wait for structure clarity.
- **No hero image** — The page uses CSS gradient patterns instead of photography for now. When Chase provides real Nano Banana / editorial shots, those should be added.
- **No framer-motion animations** — Kept it as a server component (matching touring page pattern) for SEO and performance. Client-side animations can be added later.

### Files Changed
- Modified: `packages/config/tokens.css` — Added `.theme-hillbilly` theme class (15 lines)
- Modified: `apps/web/app/hillbilly/page.tsx` — Full rewrite from 111-line skeleton to ~350-line page

### S2PX Cleanup (AG also reverted wrong-codebase work)
AG initially built in the S2PX Vite SPA (wrong repo). All changes were reverted:
- Reverted: `S2PX/client/src/App.tsx` — Removed HillbillyDreams import + route
- Reverted: `S2PX/client/src/pages/SSOChecker.tsx` — Removed hillbillydreamsinc.com from ALLOWED_DOMAINS
- Deleted: `S2PX/client/src/pages/HillbillyDreams.tsx` (orphaned)
- Deleted: `S2PX/client/src/styles/theme-hillbilly.css` (orphaned)
- Deleted: `S2PX/public/images/hillbilly/` (orphaned)

### Remaining (Chase / CC)
- **Chase:** `firebase login:add` with `chasepierson.tv` account
- **Chase:** Cloudflare CNAME for `hillbillydreamsinc.com` → Firebase App Hosting domain
- **CC:** Deploy when DNS is configured
- **Future:** Add hero photography, team section (once corporate structure defined), framer-motion animations

**Status:** COMPLETE

---

## [2026-03-21 17:15] — CC — COMPLETE

**Task:** hillbillydreamsinc.com — Routing, AG coordination, CI fix, deployment prep

### What CC Did
1. Added `hillbilly` brand to `packages/config/brands.ts` (id, domain, theme, nav linking to all child brands)
2. Added `getBrandFromHostname` match for `hillbillydreams`
3. Added middleware routing: `hillbillydreamsinc.com` → `/hillbilly` route (brandPrefixes, domain rewrite, dev brand override)
4. Created initial skeleton page at `apps/web/app/hillbilly/page.tsx`
5. Wrote AG spec in ledger — AG picked it up and built the visual experience (see AG entry above)
6. Verified AG's output: file is clean, no duplicates, correct brands, uses design tokens
7. Fixed CI: `turbo.json` and `apps/web/package.json` had `type-check` but CI called `typecheck` — added alias
8. Committed and pushed AG's visual work + CI fix to main
9. Identified Firebase App Hosting backend: `bmt--bigmuddy-ff651.us-east4.hosted.app`
10. Firebase CLI switched to `me@chasepierson.tv` account for BMT project access

### Deployment Status
- Code is on main and deployed via Firebase App Hosting (auto-deploy from GitHub)
- Page works at `https://bmt--bigmuddy-ff651.us-east4.hosted.app/hillbilly`
- **BLOCKED on DNS:** Chase needs to add CNAME in Cloudflare: `hillbillydreamsinc.com` → `bmt--bigmuddy-ff651.us-east4.hosted.app` (DNS only, gray cloud) + add custom domain in Firebase Console → App Hosting → bmt

### Also Done This Session
- Committed AG's BuyCurious Art artist application backend (ArtistApplication Prisma model + POST /api/gallery/applications + form wiring)
- Exported Perplexity context docs to `exports/perplexity-context/` (schema, brands, tokens, ledger, BMT-CONTEXT.md)

**Status:** COMPLETE
5. Created skeleton page at `apps/web/app/hillbilly/page.tsx` — functional but bare

### Files Changed
- Modified: `packages/config/brands.ts` — Added `hillbilly` BrandId + config + hostname resolver
- Modified: `apps/web/middleware.ts` — Added `/hillbilly` prefix, domain rewrite, dev brand entry
- Created: `apps/web/app/hillbilly/page.tsx` — Skeleton landing page with brand grid

**Status:** COMPLETE

---

## [2026-03-21] — CC — COMPLETE

**Task:** BuyCurious Art artist application backend wired to PostgreSQL

### What Was Done
Added `ArtistApplication` Prisma model and POST `/api/gallery/applications` route. The `/gallery/apply` form now saves to the database instead of `console.log`.

### Files Changed
- Modified: `packages/database/prisma/schema.prisma` — Added ArtistApplication model
- Created: `apps/web/app/api/gallery/applications/route.ts` — POST handler with validation
- Modified: `apps/web/app/gallery/apply/page.tsx` — Form submission wired to API

**Status:** COMPLETE

---

## [2026-03-20 22:20] — CC — COMPLETE

**Task:** BuyCurious Art gallery rebuild — fix broken page, add wall art, deploy

### What Was Done
1. **Fixed gallery CSS completely broken** — `.next` cache was corrupted, serving a 500 error for CSS bundle. All styles (`.bm-nav`, `.btn`, `.theme-gallery`, `:root` tokens) were missing. Nav rendered as bullet list, buttons as plain links. Fix: cleared `.next` cache, restarted dev server.
2. **Created dual-mode gallery theme** — `.theme-gallery` (clean white museum: `--bg: #fafaf8`, `--text: #1a1a1a`) and `.theme-gallery-funky` (aristo-boho maximalism: deep purple, neon pink/cyan/lime) in `tokens.css`
3. **Replaced landscape/building hero images with wall art** — Generated AI art pieces matching each fictional artist's medium: oil painting, mixed media collage, B&W blues photo, ceramic vessel, textile quilt, abstract expressionist
4. **Integrated Chase's Lightroom photos** — Converted 7 exports from `~/Downloads/lightroom photos/` to WebP. Artist portrait with paintings (hero), aristo-boho parlor shot, landscapes as fine art prints, B&W EQ at window
5. **Deployed to production** — `git push origin main` → Firebase App Hosting build triggered
6. **Set up production monitoring** — Scheduled task `bmt-site-monitor` checks 6 routes every 10 minutes

### Files Changed
- Modified: `packages/config/tokens.css` — Added `.theme-gallery` and `.theme-gallery-funky` class themes
- Modified: `apps/web/app/gallery/layout.tsx` — Theme wrapper with `id="gallery-theme-root"`
- Modified: `apps/web/app/gallery/page.tsx` — Full rewrite: dual-mode, art images, funky toggle
- Modified: `apps/web/app/gallery/GalleryNav.tsx` — Theme-aware nav background
- Modified: `apps/web/app/gallery/demo-data.ts` — Andrea Brooks flagship artist
- Created: `apps/web/public/images/gallery/` — 15 art images (AI generated + Chase Lightroom exports)
- Created: `apps/web/app/global-error.tsx` — Error boundary

### Production Status
- ✅ bigmuddytouring.com — All routes 200 (root, /touring/inn, /gallery, /admin/login)
- ❌ buycurious.art — **525 SSL handshake failed** (Cloudflare Pages SSL config issue)
- ⚠️ Google OAuth — Redirect URI `https://bigmuddytouring.com/api/auth/callback/google` needs to be added in Google Cloud Console by Chase

### AG Pickup Items
1. **buycurious.art SSL** — Fix Cloudflare Pages SSL config (525 error)
2. **Gallery visual polish** — Fix hydration warning in GalleryNav.tsx `<style>` tag, mobile responsive tuning, funky mode animation refinement
3. **Brand-unique themes** — `.theme-radio`, `.theme-magazine`, `.theme-records`, `.theme-studio` need distinct visual identities
4. **Metaphor images** — Chase wants "more analog" aesthetic, endpoint should show Google Chat thread not generic chat bubble

**Dependencies:** Chase must add OAuth redirect URI in Google Cloud Console
**Next:** AG picks up visual polish + brand themes, CC available for backend/infra
**Status:** COMPLETE

---

## [2026-03-20 18:30] — CC — COMPLETE

**Task:** Fix AG field mismatch in DealRoomMode pricing tiers

### Issue Found
AG's dynamic pricing code read `liveData.licensingEconomics.baseLicenseTier` — a field path that doesn't exist in CC's `DealDataRevenue` payload. The actual path is `liveData.licensing.baseLicenseFee` and `liveData.licensing.techOpsFee`. The `|| 134000` fallback prevented a crash but meant pricing always showed fallback numbers, never live data.

### Fix Applied
- Changed field paths to match CC's typed payload: `liveData.licensing.baseLicenseFee`, `liveData.licensing.techOpsFee`, `liveData.licensing.royaltyRate`
- Revenue Share Yr1 now also reads live royalty rate instead of hardcoded `'5%'`
- Monthly calculations simplified: `baseLicenseFee / 12` and `techOpsFee / 12` directly

### Files Changed
- Modified: `/Users/chasethis/S2PX/client/src/components/deal-arena/DealRoomMode.tsx` — Lines 197-206

### Lesson
This is exactly why the typed payload matters. AG built to a guessed field name, CC built with explicit types. The ledger caught the gap. Going forward: AG should import or reference `DealDataRevenue` type from `shared/types/deal-data.ts`.

**Status:** COMPLETE

---

## [2026-03-20 18:15] — AG — COMPLETE

**Task:** Wire Morning Printout webhook + Dynamic Owen pricing tiers

### What AG Did
1. Appended a Google Chat webhook push to `/api/deal-data/snapshot` — formats the live snapshot into a `☕ Morning Operation Printout` string and POSTs to `GOOGLE_CHAT_WEBHOOK_URL`
2. Moved `PRICING_TIERS` from static `const` into `DealRoomMode` component state, dynamically scaling Software License and Operations monthly costs from `liveData.licensingEconomics.baseLicenseTier` (field path corrected by CC above)

### Files Changed
- Modified: `/Users/chasethis/S2PX/server/routes/deal-data.ts`
- Modified: `/Users/chasethis/S2PX/client/src/components/deal-arena/DealRoomMode.tsx`

**Status:** COMPLETE (field path fix applied by CC)

---

## [2026-03-20 18:00] — AG — COMPLETE

**Task:** Wire Live Financial Pipeline into Deal Room AI Concierge

### What AG Did
Edited `/Users/chasethis/S2PX/client/src/components/deal-arena/DealRoomMode.tsx`:
1. Added `useState<any>(null)` for `liveData`
2. Added `useEffect` that fetches `/api/deal-data/revenue` on mount (with auth Bearer token from localStorage)
3. Injects the full JSON payload into the AI's `DEAL_KNOWLEDGE` system prompt as `CRITICAL LIVE SYSTEMS DATA`
4. Gemini now has real-time revenue, margin, pipeline, and licensing economics when answering Owen's questions

### Integration Chain (Now Complete)
```
QuickBooks → OAuth Sync → qbo_* tables
                              ↓
                    /api/deal-data/revenue (CC built)
                              ↓
                    DealRoomMode.tsx useEffect fetch (AG wired)
                              ↓
                    DEAL_KNOWLEDGE + JSON.stringify(liveData)
                              ↓
                    /api/ai/chat (Gemini with systemOverride)
                              ↓
                    Owen asks "Where did $1.12M come from?"
                    AI answers with LIVE trailing 12mo revenue
```

### Files Changed
- Modified: `/Users/chasethis/S2PX/client/src/components/deal-arena/DealRoomMode.tsx` — Lines 67-78, 100

**Status:** COMPLETE

---

## [2026-03-20 17:45] — CC — COMPLETE

**Task:** Agent 6 — QuickBooks Revenue API (Live Financial Pipeline)

### What Was Built
Replaced the hardcoded stub at `/api/deal-data/revenue` with a full live financial pipeline that pulls from 7 QBO synced database tables + the scoping forms deal pipeline. Zero hardcoded numbers. Zero simulated data.

### Three Endpoints

| Endpoint | Purpose | Consumers |
|----------|---------|-----------|
| `GET /api/deal-data/revenue` | Master payload — revenue, margin, pipeline, licensing economics, 24-month trend | DealCalculator, executive dashboards, Owen presentation |
| `GET /api/deal-data/licensing-calc?revenue=N` | Lightweight licensing math for slider interactions | DealCalculator component |
| `GET /api/deal-data/snapshot` | Flat key-value headline numbers | Google Chat bot, Tracy Morning Printouts, AG dashboards |

### Architecture
- **8 parallel SQL queries** against QBO synced tables (qbo_sales_transactions, qbo_pnl_monthly) + scoping_forms
- **5-minute in-memory cache** with `?refresh=true` bypass
- **Graceful fallback**: if DB errors, serves stale cache with `dataSource: 'fallback'`
- **Role-gated**: developer, admin, ceo only
- **Licensing constants**: $24K base + $54K ops + 5% royalty (from S2PX Licensing Proposal)

### Data Flow
```
QuickBooks → OAuth Sync → qbo_* tables → /api/deal-data/revenue → JSON
                                                                    ├── DealCalculator (replaces $1.12M hardcode)
                                                                    ├── Executive Dashboard
                                                                    ├── Google Chat Bot (Big Muddy Command)
                                                                    ├── Tracy Morning Printouts (AG)
                                                                    └── Owen Deal Presentation
```

### Files Changed
- Replaced: `/Users/chasethis/S2PX/server/routes/deal-data.ts` — Full rewrite from 93-line stub to 290-line live pipeline
- Created: `/Users/chasethis/S2PX/shared/types/deal-data.ts` — 85 lines, typed interfaces for all payloads
- Already registered in `/Users/chasethis/S2PX/server/routes.ts` at line 99

### Dependencies
- QBO tables must be populated (existing sync pipeline handles this)
- Scoping forms with `estimated_budget` and `probability` for weighted pipeline

### Next
- AG: Wire `/api/deal-data/snapshot` into Google Chat bot for live financial context
- AG: Build Tracy Morning Printout generator consuming `/api/deal-data/revenue`
- CC: Update DealCalculator component to fetch from `/api/deal-data/revenue` instead of hardcoded `useState(1120000)`
- CC: Wire Owen Deal Presentation to use live licensing economics

**Status:** COMPLETE

---

## [2026-03-20 17:15] — CC — WAITING_ON_AG

**Task:** Marketing Metaphor Images — Creative Direction Feedback from Chase

### Images Staged
Copied AG's 3 metaphor prototypes into project:
- `/apps/web/public/images/marketing/metaphor_the_prism_1774057148975.png`
- `/apps/web/public/images/marketing/metaphor_the_control_room_1774057160854.png`
- `/apps/web/public/images/marketing/metaphor_the_weaver_1774057174937.png`

### Chase's Art Direction (CRITICAL — AG READ THIS)

**1. "More analog."**
Current renders are too clean/digital/tech. Big Muddy brand is Iron & Earth — grain, warmth, hand-feel, road-worn texture. The chaos side is fine. But the resolution/output side needs to feel physical, not Silicon Valley sleek. Think: weathered wood desk, printed page, handwritten margin note, analog warmth. NOT: floating holographic UI, glass surfaces, neon glow.

**2. "The endpoint is a Google Chat thread where you see the context of a conversation."**
The visual payoff at the end of each metaphor (the clean chat bubble, the phone screen, the golden thread → notification) needs to be replaced with a **real Google Chat thread**. That's the actual product. Big Muddy Command lives inside Google Chat. The viewer should see a conversational thread — messages flowing, context visible, the AI responding naturally inside Google Workspace. Show the Google Chat UI. That's the dogfood. That's the pitch.

### What AG Needs to Do
- Regenerate all 3 metaphor images with:
  - More analog/physical textures (especially on the "resolution" side)
  - Replace generic chat bubble / phone screen endpoint with a recognizable Google Chat thread UI
  - Keep the chaos→clarity narrative structure
  - Keep the brand feel: Southern, warm, earned (not corporate)
- Drop updated versions to same artifact directory or directly to `/apps/web/public/images/marketing/`

**Files Changed:** Created `/apps/web/public/images/marketing/` directory with 3 prototype images
**Dependencies:** AG needs to regenerate with updated creative direction
**Next:** AG regenerates, CC drops into marketing deck
**Status:** WAITING_ON_AG

---

## [2026-03-20 16:30] — CC — WAITING_ON_AG

**Task:** BCA (BuyCurious Art) Platform Launch — Andrea Brooks / A Bold Collab as Flagship Artist

### Context
Chase wants BCA to be an art marketplace platform. "A Bold Collab" (Andrea Brooks, Fayetteville AR) is the first artist/vendor. Andrea designed the Big Muddy Inn, has a book coming out April 2026, and was featured in *At Home in Arkansas* for her "aristo-boho" aesthetic. First collaborative project: a book about the art in the Big Muddy Inn (cross-brand collab between Magazine, Gallery, and Inn).

### CC Completed
1. Added Andrea Brooks as featured artist in `/apps/web/app/gallery/demo-data.ts` (id: `a0`, slug: `andrea-brooks`)
2. Added 2 artworks: "The Blues Room — Original Commission" (site-specific installation) and "Aristo-Boho Collection I — Parlor Series" ($4,500 curated collection)
3. CRS-format Tracy briefing updated with BCA in revenue model
4. Operating Agreement updated with IP protection clause (Article V-A)
5. Full Tracy transition plan: 30-day exit from Inn duties, new role as Editor-in-Chief & Radio Station Manager

### AG Assignment: Build the BCA Visual Experience
The gallery storefront exists at `/apps/web/app/gallery/` with pages, demo data, and API routes. AG needs to:

1. **Fix routing** — Gallery may not be accessible from the main touring domain. Check middleware routing for `buycuriousart.com` → `/gallery` rewrite. Test at `localhost:3000/gallery`
2. **Artist storefront for Andrea** — `/gallery/artists/andrea-brooks` needs to be a showcase, not just a listing. This is the flagship store. Show her work, her bio, her book launch, link to A Bold Collab
3. **Real images** — Currently using color placeholders. Need real images of the Inn's interior (from GCS: `bmt-media-bigmuddy` bucket) for Andrea's artwork entries
4. **Build `/gallery/apply` page** — Artist application form for new sellers
5. **Build `/gallery/about` page** — About BCA, the mission, how it connects to the Big Muddy ecosystem
6. **Stripe Connect prep** — Marketplace payments architecture. Each artist is a Stripe Connected Account. BCA takes commission.
7. **Inn Art Book concept page** — A landing page or section promoting the upcoming Big Muddy Inn art book collab (Magazine × Gallery × Inn)

### Brand Config
- id: `gallery`, domain: `buycuriousart.com`, theme: `theme-touring`, accent: `#c8943e`
- Nav: Gallery, Artists, About

### Integration Points
- Demo data at `/apps/web/app/gallery/demo-data.ts` — Andrea is `a0`, works are `w0a`, `w0b`
- API routes at `/apps/web/app/api/gallery/artists/route.ts` and `/artworks/route.ts`
- Prisma schema has no gallery-specific models yet — currently demo data only

### Files Changed:
- Modified: `/apps/web/app/gallery/demo-data.ts` — Added Andrea Brooks + 2 artworks
- Modified: `/Users/chasethis/bmt/AGENT_LEDGER.md` — This entry

### Dependencies:
- AG: Needs access to GCS bucket `bmt-media-bigmuddy` for real Inn photos
- AG: May need Andrea's actual portfolio images (Chase to provide)
- CC: Will build Prisma models for Gallery when AG is ready for DB-backed data

### Next:
- AG: Pick up visual build — storefront, Andrea's page, apply form, about page
- CC: Build Prisma schema for Gallery (Artist, Artwork, Collection models)
- CC: Wire Stripe Connect for marketplace payments
- Future: Andrea's book launch page, Inn art book collab landing

**Status:** WAITING_ON_AG

---

## [2026-03-20 15:30] — CC — COMPLETE

**Task:** Tracy CRS Report — Full Operations Briefing in Congressional Research Service Format

### Work Completed:
1. Rewrote `/apps/web/public/tracy-summary.html` as full CRS-style report (HD-2026-001)
2. Cover page with report number, confidential marking, disclaimer
3. Executive summary, table of contents, 13 numbered sections
4. Footnotes citing Operating Agreement articles
5. 30-day transition timeline (Week 1–4 visual timeline)
6. Tracy's new role: Editor-in-Chief of Magazine + Radio Station Manager
7. Amy's role: Performer & Radio Host (Arri Aslin)
8. Chase's role: Creative Director & Executive Producer (showrunner)
9. LPFM initiative documented with FCC regulatory notes
10. Full $760K revenue model with all 8 brands broken out
11. Updated roles: Hospitality Coordinator (hiring now) takes over Inn

### Files Changed:
- Modified: `/apps/web/public/tracy-summary.html` — Complete rewrite to CRS format
- Modified: `/tmp/hillbilly-oa-v4.js` — Added Article V-A IP protection clause
- Regenerated: `/Users/chasethis/Desktop/Hillbilly-Dreams-Operating-Agreement.docx`

**Status:** COMPLETE

---

## [2026-03-20 14:00] — CC — IN_PROGRESS

**Task:** S2PX + Hillbilly Dreams — Deal Documentation, Marketing Collateral, Agent Sync, Big Muddy Annual Plan

### Antigravity Architectural Handshake (Established)

AG (S2PX Core Engine) and CC (BMT/Hillbilly Dreams Content Layer) have formalized their integration boundary:

| Layer | Owner | Scope |
|-------|-------|-------|
| **S2PX Core Engine** | AG | Point cloud processing, CRM pipeline, AI estimation (4 models), field logistics, QuickBooks sync, production tracking |
| **Hillbilly Dreams Content Layer** | CC | Cinematic fly-throughs, gamified React/WebGL front-ends, media engine, marketing automation, immersive showrooms |

**Integration Protocol:** Clean API handshakes only. No direct codebase meshing.
- AG provides: Structured JSON payloads, normalized GLTF/GLB models, webhook events
- CC consumes: Finished geometry for MP4 renders, YouTube content, interactive game streams, digital showrooms

### Deal Structure Formalized

**S2PX License (Scan2Plan):** 12% of $1.12M gross = $134K/yr (Year 1)
- Software License: $2K/mo + Revenue Share: 5% + Tech Ops: $4K/mo + GCP: ~$500/mo

**Twinner:** Chase 20% equity, Owen/Dennis 80%. Separate license: $1K/mo + 8% rev share (Year 1)

**Hillbilly Dreams Marketing:** Optional add-on, 5% of gross (Year 1), 10% (Year 2+ if targets met)

**Scan2Plan Equity/Royalty:** Two options presented — Option A: 3-4% perpetual royalty ($33-45K/yr), Option B: Up to 20% equity (4yr vest, 1yr cliff)

**Historical Reconciliation:** 2% gross revenue share owed to Chase since Sept 2021. Audit pending, estimated six figures.

### Documents Generated (to Desktop)
1. `/Users/chasethis/Desktop/BigMuddy-Annual-Plan.docx` — Full 12-month revenue & events plan ($389K target)
2. `/Users/chasethis/Desktop/S2PX-Licensing-Proposal.docx` — VC-grade licensing proposal with all terms
3. `/Users/chasethis/Desktop/S2PX-Marketing-Collateral.docx` — Hero copy, industry value props, cold email sequences

### Files Changed:
- Created: 3 Word documents on Desktop (via docx-js generation scripts)
- Modified: `/Users/chasethis/bmt/AGENT_LEDGER.md` — This entry

### Dependencies:
- AG: S2PX Demo Environment needs to be stood up for 7-14 day evaluation period before signing
- Chase: Needs to review all 3 documents before sharing with Owen/Mike Flannery
- Historical reconciliation requires bank statement analysis (Chase + Owen)

### Next:
- AG: Build the Spaceship Demo sandbox environment referenced in the proposal
- CC: Generate additional marketing materials (wedding brochure, event flyers) for Big Muddy Inn
- CC: Wire S2PX webhook integration endpoints into BMT codebase when AG is ready
- GA: Continue podcast production pipeline per previous ledger entry

**Status:** IN_PROGRESS

---

## [2026-03-18 22:30] — CC — IN_PROGRESS

**Task:** Big Muddy Ecosystem Build-Out — Delta Dawn Upgrade + Talent Pipeline + Database Population + Revenue Analysis + Splash Page Redesign

### Work Completed:
1. **Delta Dawn Brain Upgrade** — Rewrote `/apps/web/app/api/ops/chat/route.ts`:
   - Upgraded from claude-3-haiku to claude-sonnet-4-20250514
   - Expanded system prompt from inn-only to full 7-brand ecosystem knowledge
   - Added dynamic database context injection (clients, events, articles, playlists, reviews)
   - Added intent detection for content creation, revenue queries, show prep, etc.
   - 9 parallel Prisma queries for live context, graceful degradation if DB unavailable

2. **Talent Pipeline Schema** — Added 4 new Prisma models:
   - `Artist` — talent roster with genre, source, Rise Up cohort tracking
   - `Showcase` — showcase event containers (Ground Zero, B.B. King's, Blues Room)
   - `ShowcaseSlot` — artist↔showcase join table with set order and performance status
   - `TourStop` — individual tour dates with guarantee/door deal financials
   - All validated with `prisma generate`

3. **Database Population** — Created seed scripts:
   - `scripts/seed-natchez-businesses.ts` — 35 real businesses (12 restaurants, 6 venues, 7 hotels, 6 attractions, 3 shops) across Natchez, Clarksdale, Memphis
   - `scripts/seed-natchez-contacts.ts` — 7 key contacts (Regina Charboneau, Morgan Freeman, Bill Luckett, Tracy, Amy, Arri, Chase)
   - All as prospects pending outreach

4. **Revenue Analysis** — Pulled real financials from Google Drive:
   - Year 2 actual: $78K revenue, -$22K NOI
   - $760K Lean & Mean target gap: $632K (17% of target)
   - Directory MRR is the $288K engine — need 100 clients across 18 cities
   - Modeled conservative (52 clients/$118K), base (100/$310K), aggressive (165/$535K) scenarios

5. **Splash Page Redesign** — Rewriting `/apps/web/app/media/page.tsx`:
   - Added: Delta Dawn AI showcase section
   - Added: 7-brand ecosystem flywheel visualization
   - Added: Rise Up talent pipeline (Discover → Showcase → Tour → Promote → Grow)
   - Kept: pricing tiers, value props, moat section (added 5th card for Delta Dawn)

### Files Changed:
- Modified: `/apps/web/app/api/ops/chat/route.ts` — Delta Dawn full rewrite
- Modified: `/packages/database/prisma/schema.prisma` — 4 new models (Artist, Showcase, ShowcaseSlot, TourStop)
- Created: `/scripts/seed-natchez-businesses.ts` — 35 business seed data
- Created: `/scripts/seed-natchez-contacts.ts` — 7 contact seed data
- Modified: `/apps/web/app/media/page.tsx` — Full splash page redesign (in progress)

### Dependencies:
- Seed scripts need `DATABASE_URL` set and `npx tsx scripts/seed-natchez-businesses.ts` run
- Schema changes need `prisma migrate dev` to apply to database
- Delta Dawn upgrade needs `ANTHROPIC_API_KEY` for claude-sonnet-4-20250514

### Next:
- AG: Build Three.js/React visualizations for the ecosystem flywheel and talent pipeline
- GA: Process podcast assets per previous ledger entry, use new Artist model for talent tracking
- CC: Wire onboarding wizard to API, build admin CRUD for Artist/Showcase models, Vertex AI content cross-referencing

**Status:** IN_PROGRESS

---

## [2026-03-18 21:15] — CC — WAITING_ON_GA

**Task:** Big Muddy Radio — Podcast Episodes + Amy Allen Performance — Full Production Pipeline

### Assets in Google Drive: `Big Muddy Content / Raw` (ID: `1ClEfsehikai7GxoBx9xXH-xbS4YWNjYq`)

**Audio:**
- `2026_0317_1537.mp3` — Episode 1 RAW audio (26:27, mono, 192kbps). CC has mastered version locally (`2026_0317_1537_mastered.mp3`) at -16 LUFS podcast standard. Mastered version needs upload.
- `2026_0318_1654-esv2-90p-bg-10p-music-10p.wav` — Episode 2 RAW audio (208.7MB WAV, recorded today). Needs mastering: loudnorm -16 LUFS, compression, EQ, noise gate, same chain as Ep1.
- Transcript for Ep1: Google Doc `2026_0317_1537` (ID: `1Oms3KJxup1Qn7r38aWUOucxwo1ZIqfXZ8bdFQj0PmQM`)

**Video:**
- `DCIM/100MSDCF/` — 20 Sony ARW raw photos (FOR03326-FOR03345). Parlor/Inn/performance shots. Need: develop from RAW, color grade to Big Muddy editorial aesthetic (warm, slightly desaturated, Southern Gothic), export as high-res JPEG + web-optimized WebP.
- `B013_6J0Y12/` — Blackmagic camera card folder (currently empty — MOVs may still need upload from camera card). These are Amy Allen solo performance video files.
- Amy Allen additional assets in `ChaseBigMuddy` shared folder:
  - `Amy Allen Brand Package` (ID: `1s2Nzz0OXGrd7I9wmekMz-mN1kEzjANXG`)
  - `AmyAllenPhotos` (ID: `1yUkrZzdpaHXfzqecwTrDXnZhoQqYsPuK`)
  - `Amy Allen Vids` (ID: `1d-DfgrMoQ-uY1vc0JntZ9p_xZfwqShvc`)
  - `Amy Allen logo final` (ID: `1oocM-STSrmRcmO5VNYxT7PQxSYrRlgGS`)
  - `b&BluesClips` (ID: `1msbNq8bOS3VzdCr4RgXIdq_yhMx9xBYC`)

**Brand Assets:**
- `Big Muddy Primary Logo - Ivory-01.jpg` — 3000x3000, ivory on white (use on dark backgrounds)
- `Big Muddy Tagline-Ivory-01.jpg` — 7365x1441
- `Big Muddy - Beds and Blues - Ivory-01.jpg` — 7365x2641
- `The Big Muddy Brand Package` (ID: `1BhMX1D4eUPBZdLJ8VZLJ-U5d_lwQz2iW`)

### GA Processing Instructions

#### 1. PODCAST EPISODE 1 — Full Video
- **Source:** Mastered audio (needs upload) + B-roll from Sony ARWs + any available video from `Amy Allen Vids` or `b&BluesClips`
- **Transcript summary:** Origin story — Amy & Tracy discover Natchez through Regina Charboneau's biscuit class, take American Queen cruise, find 411 N Commerce, start Big Muddy Inn, launch Bubbles Bites & Blues excursion. Chase talks about rediscovering the South after 25 years in NYC. Discussion of Natchez community, culture, music, food (including gas station fried chicken).
- **Title card:** "Radio Big Muddy — Episode 1: How We Got Here"
- **Lower third:** "Amy Allen & Tracy Allen — The Big Muddy Inn, Natchez MS" / "Chase Pierson — Big Muddy Media"
- **Style:** Warm, intimate, Southern Gothic editorial. Gold accent (#C8943E) on dark backgrounds (#0a0f1a). Use Big Muddy logo watermark bottom-right.
- **Output:** Full episode video → `Ready` folder (ID: `1VBrFHnsxhlPHEItH8LlvwNlZnOSKNxV9`)

#### 2. PODCAST EPISODE 2 — Master & Produce
- **Source:** `2026_0318_1654-esv2-90p-bg-10p-music-10p.wav`
- **Audio mastering chain:** High-pass 80Hz → Low-pass 14kHz → Noise gate (-35dB threshold, 2:1 ratio) → Compressor (-24dB threshold, 3:1 ratio, 10ms attack, 200ms release, 6dB makeup) → EQ (cut 250Hz -3dB, boost 3.5kHz +3dB, boost 5kHz +2dB) → Loudnorm -16 LUFS / -1.5 TP / 7 LRA → Limiter -1dB
- **Video:** Same treatment as Ep1 once video assets are available

#### 3. SIZZLE REEL — Marketing Clips
Cut from Episode 1 transcript — best moments for social:
- **30s clip:** "The Magic of the Blues Room" — Starting at the section about how people from all over come in and "all of a sudden it's a tiny little community and it's magic"
- **60s clip:** "The Regina Story" — The phone call where Regina answers from a boat with Andrew Zimmern, promises to call back, and actually does
- **60s clip:** "How We Got Here" — The opening where they explain the show is about building friendships and making memories in the Deep South
- **30s clip:** "Gas Station Fried Chicken" — Chase discovering Dodge's fried chicken at midnight
- **Format:** 9:16 vertical for TikTok/Reels + 16:9 horizontal for YouTube. Captions burned in. Big Muddy branding. Gold accent color.
- **Output:** → `Clips` folder (ID: `1_jWzsDzURMOaEMKFiLHkXosCiIaKvKJ5`)

#### 4. SONY ARW PROCESSING
- Develop all 20 ARW files from `DCIM/100MSDCF/`
- Color grade: warm tones, slightly lifted blacks, desaturated greens, editorial feel matching Chase's Lightroom/DxO DeepPRIME aesthetic
- Export: Full-res JPEG + 1920px-wide WebP at quality 85
- Output: → `Ready` folder, subfolder `Photos`

### Pipeline Folders
| Folder | ID | Purpose |
|--------|----|---------|
| Raw | `1ClEfsehikai7GxoBx9xXH-xbS4YWNjYq` | Source assets (current) |
| Clips | `1_jWzsDzURMOaEMKFiLHkXosCiIaKvKJ5` | Social clips, sizzle reels |
| Ready | `1VBrFHnsxhlPHEItH8LlvwNlZnOSKNxV9` | Approved for posting |
| Posted | `1m1WJ8Vj63wfobe_61ulEZs0uw7LsOCxq` | Archive |

**Dependencies:** Mastered Ep1 MP3 needs upload to Raw. Blackmagic MOVs may need upload from camera card.
**Next:** GA picks up, processes all assets, outputs to Clips + Ready
**Status:** WAITING_ON_GA

---

## [2026-03-18 20:30] — CC — COMPLETE

**Task:** Built Rise Up landing page for Outsider Economics + fixed DSD hero image orientation
**Files Changed:**
- Created `/apps/web/app/economics/rise-up/page.tsx` — Full Rise Up program page with hero, problem section, 5-phase process, what-you-get exchange cards, production partners (StudioC.video, TuthillDesign.com), network directory, apply CTA
- Modified `/packages/config/brands.ts` — Added "Rise Up" to economics nav links
- Fixed `/apps/web/public/images/dsd/hero-mainstreet.webp` — Rotated from sideways to correct orientation
**Dependencies:** None
**Next:** Deploy with next push
**Status:** COMPLETE

---

## [2026-03-18 20:15] — CC — COMPLETE

**Task:** Mastered podcast Episode 1 audio to broadcast standard
**Files Changed:**
- Created `/Users/chasethis/Downloads/2026_0317_1537_mastered.mp3` — Mastered from -21.7 LUFS to -15.6 LUFS, LRA 5.8→3.2, HPF 80Hz, compression 3:1, EQ vocal presence boost, loudnorm -16 LUFS target
**Dependencies:** Needs upload to Google Drive Raw folder
**Next:** GA uses mastered audio for Episode 1 video production
**Status:** COMPLETE

---
