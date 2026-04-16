# Voice Memo Analysis — April 15, 2026
**Source:** Chase Pierson voice memo, ~15 minutes
**Analyst:** Chief of Staff (Claude Code)
**Purpose:** Decompose every decision, map against current architecture, identify gaps

---

## Part 1: Discrete Decisions Extracted from Voice Memo

I identified **19 distinct decisions or concepts** in this memo. Each is numbered, quoted, analyzed, and mapped to current state.

---

### Decision 1: Big Muddy Magazine = Marketing Channel for Big Muddy Inn

**What Chase said:**
> "I want to put Big Muddy Magazine as basically dedicated as a marketing channel for the Big Muddy Inn."

**Current state:** BUSINESS_ARCHITECTURE.md positions Magazine as one of MBT's 9 modules — "Editorial content pipeline: articles, city guides, photo essays, AI-assisted drafts." The Media Playbook describes it as "The Authority Signal" with weekly long-form pieces and monthly Main Street Profiles. It's positioned as a general editorial brand, not Inn-specific.

**Delta:** This is a **scope narrowing**. Magazine was a standalone editorial brand serving the whole ecosystem. Now it's being dedicated to the Inn. This simplifies the editorial question ("what do we write about?") by giving it a clear patron and audience.

**Impact on code:**
- `bigmuddymagazine.com` route currently consolidated into `bigmuddytouring.com` via Cloudflare Bulk Redirects (see domain-routes.ts line 48). Magazine content lives at `/magazine` paths. This routing is fine — no change needed.
- Magazine pages exist: `magazine/page.tsx`, `magazine/articles/[id]/page.tsx`, `magazine/articles/page.tsx`, `magazine/city-guides/page.tsx`, `magazine/print/page.tsx`. All still relevant.
- **Change needed:** Copy and positioning on magazine pages should reflect "The Big Muddy Inn's Magazine" rather than a standalone editorial brand. The hero, about section, and submission guidelines should reference Tracy and the Inn.

**Conflict with current docs:** Media Playbook says "operator: Chase + freelance contributors." Voice memo says Tracy is editor-in-chief. This is a personnel/governance change.

---

### Decision 2: Tracy = Editor-in-Chief of Magazine

**What Chase said:**
> "Tracy will be the editor-in-chief of that, and it will be whatever Tracy wants. So arts, culture, anything."

**Current state:** Media Playbook lists "Chase + freelance contributors" as Magazine operator. Tracy is listed as "Finance & Inn ops" across all docs.

**Delta:** Tracy's role expands from finance/Inn ops to include editorial control of Magazine. This is significant — it means Magazine content direction comes from Tracy, not Chase.

**Impact on code:**
- Tracy already has an onboarding page at `admin/onboarding/tracy/page.tsx` — needs to include Magazine editor tools.
- Article builder at `admin/articles/page.tsx` and `admin/articles/new/page.tsx` exists — Tracy needs easy access.
- **New need:** Voice profile training for Tracy (see Decision 3).

---

### Decision 3: AI Article Builder Trained on Tracy's Voice

**What Chase said:**
> "She has her way to make articles with the article builder, where she can say what the article's about. AI will help her write it and we'll develop it in her voice. So we'll gather a writing sample from her and train it on her policies."

**Current state:** Article builder exists at `/admin/articles/new`. Voice AI exists (Southern Concierge). Chase's voice profile exists in `memory/feedback_chase_voice.md`. No Tracy voice profile exists — the handoff doc (line 93) explicitly flags "Tracy & Amy voice profiles — Not captured yet."

**Delta:** New requirement — voice profile capture + AI writing assistant tuned to Tracy's style.

**Gap:**
- No voice profile onboarding flow for non-Chase users
- No writing sample collection tool
- Article builder likely uses generic AI generation, not per-user voice profiles
- **Build needed:** Voice profile questionnaire → writing sample ingestion → per-user AI generation config

---

### Decision 4: Personalized Onboarding Questionnaire (Tracy, Amy, Everyone)

**What Chase said:**
> "We need to create an onboarding form for her, for her writing style and management style. The questionnaire should include stuff that will help with the user interface and her preferences... she likes that aesthetic where it actually looks like it's paper, typed on paper, Senate style... Different questions that will help us personalize the experience for them, both from a UI/UX experience, but also just lifestyle, Google calendars and everything."

**Current state:** Onboarding pages exist: `admin/onboarding/tracy/page.tsx`, `admin/onboarding/amy/page.tsx`, `directory/onboard/page.tsx`, `directory/onboard/musician/page.tsx`. These are likely basic forms, not comprehensive preference-capture questionnaires.

**Delta:** Onboarding becomes a full preference engine — not just "set up your account" but "tell us how you like to work."

**Gap — this is a significant new feature:**
1. **Writing style preferences** — sample text, tone words, vocabulary, favorite publications
2. **UI/UX preferences** — aesthetic choices (Senate/paper style for Tracy), layout density, theme
3. **Tool connections** — Google Calendar, Asana, email
4. **Management style** — delegation preferences, notification frequency, approval workflows
5. **Lifestyle/schedule** — working hours, availability, communication preferences

**Build needed:** A multi-step onboarding wizard that captures all of this and feeds it into:
- AI generation (voice profile)
- UI theming (per-user CSS preferences)
- Tool integrations (calendar, task management)
- Notification/workflow settings

---

### Decision 5: Asana as Primary Task Management (Minimize Custom Software)

**What Chase said:**
> "If I want to create a new task, how do I do that? Oh, okay, I use Asana? Because they love Asana. And Asana should really be a big part of it, 'cause that's why I got us on a pro. I want to use Asana's capability so we don't have to build that support in those capabilities. We'll be much more like a database."

**Current state:** Asana integration exists — PAT configured, task sync working (per handoff doc). Asana workspace GIDs documented in `reference_asana_workspace.md`. Marketing sprint tracked in Asana. But the app also has its own `/ops/tasks/page.tsx` task management UI.

**Delta:** Strategic direction — lean on Asana instead of building custom task management. The app should be a **database** and **content engine**, not a project management tool.

**Impact:** Stop building custom task UIs. Instead, build Asana integration deeper:
- Production requests → Asana tasks automatically
- Photo requests → Asana tasks
- Article assignments → Asana tasks
- The admin UI should link to Asana, not replace it

---

### Decision 6: Gallery as Content Source for Magazine/Marketing

**What Chase said:**
> "They can select through the gallery of photos, which has our whole photo gallery online, and can also create AI stuff in there with our AI tools, or she can create a request for production, to create an asset, or, like, 'can you go photograph this restaurant?' And then that'll turn into an Asana task."

**Current state:** Gallery exists: `gallery/page.tsx`, `gallery/artists/page.tsx`, multiple sub-pages. Photo library has 16,936 tagged photos in GCS. Admin has `admin/photos/page.tsx` and `admin/media/page.tsx`.

**Delta:** Gallery becomes a **self-service content picker** for Magazine/Marketing, not just a public-facing art gallery. Two new workflows:
1. **Photo selection for articles** — browse gallery, pick images, attach to article draft
2. **Production requests** — "photograph this restaurant" → Asana task → Chase goes and shoots → photos appear in gallery

**Gap:**
- No "pick photos for my article" workflow connecting gallery to article builder
- No production request form that creates Asana tasks
- AI image generation exists (Imagen 3) but not integrated into the article creation flow

---

### Decision 7: Big Muddy Touring = Focused on Three Audiences

**What Chase said:**
> "With Big Muddy Touring, I really want to focus it singularly on the touring company and our relationship with bands, our relationship with venues, and our relationship with fans."

**Current state:** Touring page exists at `touring/page.tsx` with sub-pages: `touring/route/page.tsx`, `touring/events/art-show/page.tsx`, `touring/inn/` (4 sub-pages). The DB has 6 touring models (TouringVenue, TouringHotel, TourRoute, TourRouteStop, TouringRestaurant, CorridorCity) with 13 cities, 31 artists, 26 venues seeded.

**Delta:** Touring page needs three clear audience sections:
1. **Bands** — "Here's what we do for you" (booking, transport, promotion, recording)
2. **Venues** — "Here's what we bring" (talent, production, promotion, audience)
3. **Fans** — "Here's what's happening" (events, tickets, the experience)

**Current touring page likely doesn't have this three-audience structure.** Needs redesign.

---

### Decision 8: Kate Squire Band Case Study Model

**What Chase said:** (Detailed walkthrough of bringing Kate Squire solo, using house band, doing a show at the Inn, $50 tickets, guest on radio, signed to record label non-exclusive, booking gigs, splitting revenue after expenses)

**Current state:** No case study pages for specific artists. Entertainment has `entertainment/page.tsx` and `entertainment/house-band/page.tsx`.

**Delta:** This is the **canonical touring business model**. Needs to be documented and turned into:
1. A case study template page
2. A financial model (budget template for artist visits)
3. A touring package calculator

**The Kate Squire scenario, itemized:**
- Solo artist flies in, uses house band
- Show at Big Muddy Inn, $50 tickets
- Guest on radio show (promotion)
- Non-exclusive record deal (promotion)
- BMT books 2-3 more gigs that week at other venues
- Van transport to gigs
- PA system provided where needed
- Band stays at Big Muddy Inn
- Revenue split after expenses
- Optional: gospel brunch ($75-100 tickets)

**Gap:** No touring economics calculator or case study template exists in code.

---

### Decision 9: Artist Subscription Packages ($99/$250/$500)

**What Chase said:**
> "If you want to extend the coverage... we have packages that you can subscribe to — $99/month, $250/month, $500/month. Some packages can include video production services."

**Current state:** DSD pricing exists ($0/$25/$50/$99/$250). Musician onboarding exists at `directory/onboard/musician/page.tsx`. No artist-specific subscription packages.

**Delta:** New revenue stream — ongoing artist services packages, separate from DSD business packages.

| Tier | Price | Includes |
|------|-------|----------|
| Base | $99/mo | Extended marketing, social promotion, radio rotation |
| Pro | $250/mo | Above + video content, featured magazine coverage |
| Premium | $500/mo | Above + Studio C production services, custom video |

**Gap:** No artist subscription pricing page or Stripe products exist. Musician onboarding exists but doesn't offer subscriptions.

---

### Decision 10: Studio C = Production Company for Everything

**What Chase said:**
> "All of those things will basically be sold by Studio C. All the different packages that are available, like our tech stack and tech production stack, those will be products sold by Studio C. In the non-music world, those products will be sold by Tuthill Design and Measurably Better Things."

**Current state:** Studio C tenant exists in `tenants.ts` with domain `studiocvideo.com`, route group `studioc`. Pages: `studio-c/sessions/[id]/page.tsx`. Admin tools: `admin/studio-c/jobs/page.tsx`, `admin/studio-mode/page.tsx`, `admin/studio-omnipush/page.tsx`.

**Delta:** Studio C becomes the **billing/fulfillment entity** for all production services in the music world. This is a business structure decision more than a code decision, but it affects:
- Who sends invoices (Studio C, not Big Muddy)
- Which Stripe account processes payments
- How the Studio C website presents its services

**Current Studio C page likely doesn't reflect this role.** Needs:
- Service catalog page
- Music industry packages
- "Powered by" relationship to Big Muddy

---

### Decision 11: Venue Directory with Deep Data

**What Chase said:**
> "An amazing catalog, a directory of venues that should have floor plans, photos, anything we can scrape off the internet and from our database already. Build out a custom page for each venue with all the stats in our format. We can search by different sized rooms, and we can import all of their calendars so we can see availability, and use that for our own smart routing system."

**Current state:** Touring DB has 26 venues seeded. `TouringVenue` Prisma model exists. Directory page at `directory/page.tsx` with `directory/[slug]/page.tsx` for individual listings. `touring-to-directory.ts` bridge auto-creates directory records.

**Delta:** Venues need to become **first-class entities** with much richer data:

| Data Point | Current | Needed |
|------------|---------|--------|
| Basic info (name, address) | Yes | Yes |
| Photos | Partial (from GCS) | Comprehensive |
| Floor plans | No | Yes |
| Capacity/room sizes | Probably in model | Needs search/filter UI |
| Calendar/availability | No | Yes — import from external calendars |
| Stats (shows hosted, audience) | No | Yes |
| Searchable by room size | No | Yes |
| Custom venue page | directory/[slug] exists | Needs venue-specific layout |

**Gap — significant build:**
- Calendar import system (iCal/Google Calendar scraping)
- Floor plan upload/display
- Venue search with filters (capacity, location, availability)
- Smart routing system (match artist to available venues by date + size)
- Social media data source integration (Twitter, Meta)

---

### Decision 12: Twitter + Meta as Data Sources

**What Chase said:**
> "We should also use Twitter and Meta for data sources."

**Current state:** Social admin page exists (`admin/social/page.tsx`) but APIs not connected (per handoff doc). No social data ingestion.

**Gap:** Social media API integration for:
- Venue buzz/mention tracking
- Fan engagement data
- Event promotion effectiveness
- Artist social presence metrics

---

### Decision 13: Roles & Responsibilities Clarified

**What Chase said:**
> "Tracy and Amy running the Inn and the Magazine. Amy performing in the band, being the star of the radio show. The video portion of the radio show is produced by Studio C."

**Current state:** Operator split documented in `project_operator_split.md` — Chase sells tech/media daytime, Tracy/Amy/JP run Inn/bar/shows at night.

**Delta — refined role assignments:**

| Person | Roles |
|--------|-------|
| Tracy | Inn operations + Magazine editor-in-chief |
| Amy | Inn operations + Band performer + Radio show star |
| Chase | Technology + Sales + Photography + Production oversight |
| **OPEN ROLE** | Entertainment Director / Revenue Partner — books shows, fills rooms, manages venues, sells merch. Rev-share structure (pays for itself). |
| Studio C | Production company for any "produced" content (radio video, etc.) |

---

### Decision 14: Studio C = Workflow Pipeline Owner

**What Chase said:**
> "The production company makes sure we have all the equipment we need, manages all the formats and the storage solution, the whole workflow pipeline, review and approval pipeline. That's part of the Studio C interface."

**Current state:** Admin has productions (`admin/productions/page.tsx`), creative studio (`admin/creative/page.tsx`), media upload (`admin/upload/page.tsx`). Studio C has `admin/studio-c/jobs/page.tsx`.

**Delta:** Studio C owns the entire production pipeline — not just filming, but:
- Equipment management
- File formats and storage (GCS, R2)
- Review and approval workflows
- Delivery and export

**Gap:** No formal review/approval pipeline exists. Productions exist but likely lack a status workflow (draft → review → approved → published).

---

### Decision 15: Records + Radio = Same Page

**What Chase said:**
> "Big Muddy Records and Big Muddy Radio should probably be the same page. We should have artwork up for the albums in rotation, start promoting them, make a list of albums we're gonna add."

**Current state:** Records and Radio are separate route groups with separate pages:
- Radio: `radio/page.tsx`, `radio/live/page.tsx`, `radio/player/page.tsx`, `radio/playlists/page.tsx`, `radio/podcast/page.tsx`, `radio/shows/page.tsx`, `radio/directory/page.tsx`
- Records: `records/page.tsx`, `records/artists/page.tsx`, `records/artists/[slug]/page.tsx`, `records/releases/page.tsx`, `records/sessions/page.tsx`, `records/artists/onboard/page.tsx`

Both are consolidated under `bigmuddytouring.com` via Cloudflare redirects (domain-routes.ts lines 48, 62).

**Delta:** Merge the public-facing experience. Radio listeners should see what's playing → what album it's from → the record label. One cohesive music experience.

**Impact on code:**
- Don't delete either route group — they serve different admin functions
- Create a unified public page that combines radio player + album artwork + current rotation
- The individual pages can remain for deep-linking

---

### Decision 16: RSS Feed Aggregation for Script Generation

**What Chase said:**
> "Our script generation database should be tied into news and event calendars from the region. We should get into whatever publication has the best event aggregator. We need to have a shit ton of RSS feeds set up."

**Current state:** An RSS 2.0 feed *output* endpoint exists at `/api/feed` for magazine articles (revalidates hourly). However, no RSS feed *ingestion* — the app publishes feeds but doesn't consume external ones.

**Gap — new infrastructure:**
- RSS feed **ingestion** system (consuming external feeds, not publishing — publishing already works)
- Regional event calendar scraping
- Feed → script generation pipeline (for radio shows, social posts, magazine topics)
- Feed management UI in admin

---

### Decision 17: Touring Economics Case Studies

**What Chase said:** (Detailed $2,500 door + merch + bar = ~$3,500 night, plane ticket, 3 musicians + Kate, 2-3 more shows that week, van transport, band stays at the Inn, PA system provided, gospel brunch option at $75-100)

**Current state:** Show ecosystem multiplier documented (2:1). Financial models in `tax-db/`. No per-show budget calculator or case study pages.

**Delta:** Need concrete, publishable case studies showing the economics:

**Kate Squire Week — Budget Template:**
| Line Item | Cost | Revenue |
|-----------|------|---------|
| Artist flight | -$400 | |
| House band (3 musicians × 3 nights) | -$2,700 | |
| Van/transport | -$500 | |
| Lodging at Inn (comped/internal) | -$0 (internal) | |
| PA rental/setup | -$300 | |
| Inn show (50 tickets × $50) | | +$2,500 |
| Merch | | +$300 |
| Bar revenue | | +$700 |
| Venue 2 | | +$1,500 |
| Venue 3 | | +$1,200 |
| Gospel brunch (20 × $75) | | +$1,500 |
| **Net** | **-$3,900** | **+$7,700** |
| **Profit** | | **$3,800** |

Plus downstream: radio content, magazine article, record promotion, directory listings for venues.

---

### Decision 18: Minimize Custom Software, Use Reliable Services

**What Chase said:**
> "Start trending towards minimizing our software and using services that are super performant and reliable. Even if we build them ourselves, right? Because there are certain things I think we can build and certify as stable."

**Current state:** The codebase is LARGE — 765 files, 128+ pages, custom admin tools for nearly everything.

**Delta:** Strategic direction shift. Build less custom UI. Lean on:
- Asana for task management
- Stripe for payments
- Google Calendar for scheduling
- Sanity CMS for content (already in pivot)
- The app becomes a **database + content engine + public-facing pages**, not an all-in-one SaaS

**Impact:** Stop expanding admin tools. Stabilize what works. Integrate with services for the rest.

---

### Decision 19: Willingness to Tear Down and Rebuild

**What Chase said:**
> "I want to fit it to what we have built already without being too disruptive. But if we need to tear it all down and build it again, I'll do it."

**Current state:** 765 files, working build, 14 domains routing, multi-tenant system functional.

**Assessment:** The infrastructure is solid. The routing works. The database models exist. What needs to change is **the story each page tells** and **the workflows connecting the pieces**. This is a reorganization, not a rebuild.

---

## Part 2: Gap Analysis — What Exists vs. What's Needed

### GREEN (Exists and Aligns)

| Need | What Exists | Status |
|------|------------|--------|
| Magazine pages | `/magazine/*` (5 pages) | Needs copy update, not rebuild |
| Article builder | `/admin/articles/new` | Working, needs voice profile integration |
| Radio player | `/radio/*` (7 pages) | Working |
| Records pages | `/records/*` (6 pages) | Working |
| Touring pages | `/touring/*` (7 pages) | Working, needs three-audience redesign |
| Directory listings | `/directory/*` (6 pages) | Working |
| Photo gallery | `/gallery/*` + GCS (16,936 photos) | Working |
| Venue database | Prisma TouringVenue model, 26 seeded | Working, needs enrichment |
| Artist database | 31 artists seeded, musician onboarding | Working |
| Multi-tenant routing | domain-routes.ts + middleware.ts | Working |
| Asana integration | PAT + hourly cron scanning 6 projects, auto-creates follow-up tasks from comments, `lib/asana-client.ts` with full CRUD | Working — deeper than expected |
| Admin dashboard | 40+ admin pages | Working |
| Production tracking | `/admin/productions/*` | Working |

### YELLOW (Exists but Needs Modification)

| Need | What Exists | What's Missing |
|------|------------|----------------|
| Magazine as Inn marketing | Magazine pages exist | Copy/positioning doesn't reference Inn or Tracy |
| Touring three-audience story | Touring page exists | Not structured around bands/venues/fans |
| Records + Radio merged view | Both exist separately | No unified music experience page |
| Tracy/Amy onboarding | Basic onboarding pages exist | No preference questionnaire or voice capture |
| Photo picker for articles | Gallery + article builder exist | No connection between them |
| Studio C as production company | Studio C pages + admin exist | Doesn't present service catalog or packages |
| Venue detail pages | directory/[slug] exists | Missing floor plans, calendars, capacity search |

### RED (Doesn't Exist — Needs Building)

| Need | Priority | Complexity |
|------|----------|------------|
| Voice profile capture for Tracy/Amy | HIGH | Medium — questionnaire + writing samples + AI config |
| Production request → Asana task pipeline | HIGH | Low — API integration, form → task creation |
| Artist subscription packages ($99/$250/$500) | HIGH | Medium — Stripe products, package pages, billing |
| Venue calendar import system | MEDIUM | High — iCal parsing, Google Calendar API, availability UI |
| RSS feed aggregation for scripts | MEDIUM | Medium — RSS parser, feed management UI, storage |
| Smart venue routing system | LOW | High — date/capacity matching, optimization algorithm |
| Touring economics calculator | MEDIUM | Low — budget template page, editable fields |
| Social media data ingestion (Twitter/Meta) | LOW | High — API access, rate limits, data pipeline |
| Per-user UI theming (Senate style for Tracy) | LOW | Medium — theme preference system, CSS vars |
| Review/approval pipeline for productions | MEDIUM | Medium — status workflow, notification system |
| Case study template pages | MEDIUM | Low — content template + CMS integration |

---

## Part 3: Architecture Deltas — What Changes in the Docs

### BUSINESS_ARCHITECTURE.md Updates Needed

1. **Magazine section** — Change from general editorial to "Marketing channel for Big Muddy Inn, editor-in-chief: Tracy"
2. **Touring section** — Add three-audience structure (bands, venues, fans)
3. **Records + Radio** — Note they present as one public experience
4. **Studio C section** — Expand to show it as the production/billing entity for all music packages
5. **Artist packages** — Add $99/$250/$500 subscription tiers for artists
6. **Services strategy** — Add note about minimizing custom software, leaning on Asana/Stripe/Google Calendar

### BIG_MUDDY_MEDIA_PLAYBOOK.md Updates Needed

1. **Magazine operator** — Change from "Chase + freelance contributors" to "Tracy (editor-in-chief)"
2. **Magazine purpose** — Narrow to Inn marketing channel
3. **Artist packages** — Add section for touring subscription tiers
4. **Production pipeline** — Add Studio C as production entity for all video/audio

### domain-routes.ts — No Changes Needed

Current routing is fine. Magazine and Radio already consolidated under bigmuddytouring.com. Records and Entertainment already consolidated there too.

### tenants.ts — No Changes Needed

Big Muddy tenant already includes all relevant features.

---

## Part 4: Recommended Build Priority

### Sprint 1: Foundation (This Week)

1. **Tracy voice profile questionnaire** — Build the onboarding form that captures writing style, aesthetic preferences (Senate/paper), and management preferences
2. **Production request → Asana** — Wire the "request a photoshoot" button to create Asana tasks
3. **Magazine copy update** — Reposition magazine pages as Inn marketing channel

### Sprint 2: Revenue (Next Week)

4. **Artist subscription packages** — Create Stripe products ($99/$250/$500), build package comparison page on touring site
5. **Touring page three-audience redesign** — Bands section, Venues section, Fans section
6. **Kate Squire case study** — Build the first case study page as the template

### Sprint 3: Integration (Week 3)

7. **Records + Radio unified page** — Merge the public experience (album art + now playing + rotation)
8. **RSS feed system** — Build feed ingestion for regional event calendars
9. **Photo picker in article builder** — Connect gallery to article creation flow

### Sprint 4: Deep Data (Week 4)

10. **Venue enrichment** — Floor plans, photos, capacity search, custom venue pages
11. **Calendar import** — iCal/Google Calendar for venue availability
12. **Studio C service catalog** — Present packages and billing on studiocvideo.com

---

## Part 5: What NOT to Build

Per Chase's direction to "minimize custom software":

- **Don't expand `/ops/tasks`** — Use Asana
- **Don't build custom scheduling** — Use Google Calendar
- **Don't build custom CRM** — Use the directory database + Asana
- **Don't build custom review/approval UI** — Use Asana workflows
- **Don't build custom analytics dashboards** — Use Vercel Analytics + Google Analytics
- **Focus the app on:** Database, content engine, public-facing pages, AI generation

---

*This analysis should be used as the basis for updating BUSINESS_ARCHITECTURE.md and planning the next sprint. Every decision above came directly from Chase's voice memo — nothing was invented or extrapolated beyond what he said.*
