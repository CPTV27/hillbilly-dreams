# Session Handoff — April 7, 2026

**Previous session:** ~12 hours across April 5-7
**Agent:** Claude Opus (1M context)
**Pick up here. Don't re-read the whole codebase — this doc has everything.**

---

## What Was Built This Session

### Infrastructure & Data
- **5,605 businesses** scraped from Google Places across 13 corridor cities (was 131)
- **735 venues, 660 hotels, 1,571 restaurants** in database
- **Census data** loaded for 11/13 corridor cities (population, income, poverty, demographics)
- **Constellation graph**: 8,548 nodes, 11,552 edges from real data
- **Delta Dawn chat** wired with 10 Prisma database tools (was hallucinating, now queries real data)
- **Delta Dawn voice** via Siri Shortcut — SIRI_API_KEY auth bypass deployed
- **Media pipeline** — Apple Photos shared albums → WebP → GCS, launchd cron every 30 min
- **3 shared albums**: Big Muddy Magazine, Big Muddy Entertainment, Deep South Directory
- **Grok chat** fixed — tool calls now execute server-side instead of streaming raw
- **Marketing scout** fixed — checks DB before asking AI to research

### Pages Deployed
- `/constellation` — spatial graph explorer (Canvas renderer, registry pattern)
- `/bearsville/magazine` — 59 real studio photos (fixed: server component event handlers, CSS variable fallbacks)
- `/bearsville/onboarding` — 13-slide presentation for Miles & Elijah (keyboard nav)
- `/studioc/call-sheet` — session management with 4 mock sessions
- `/studioc/call-sheet/[id]` — individual session detail + video services
- `/studioc/call-sheet/qr` — QR code generator (Google Charts API)
- `/admin/strategic-mural` — 10-panel interactive strategic analysis
- `/touring` — NEW "The Hottest Room on the River" landing page
- `/gallery/apply` — fixed (useSession → direct fetch)
- Magazine images — 8 broken local paths replaced with GCS URLs

### Architecture Decisions
- **ADR-001**: Neo4j deferred to Phase 2 (Postgres handles all current queries)
- **ADR-002**: Voice pipeline — Gemini + whitelisted Prisma tools, no Dialogflow
- **ADR-003**: EmDash (Cloudflare CMS) as white-label site builder for DSD customers

### Middleware Fix
- Hostname routing now runs BEFORE brand prefix passthrough
- `bearsvillemediagroup.com/magazine` correctly shows Bearsville content (was showing Big Muddy)

### Documents Created
- `docs/onboarding/TECHNICAL_ARCHITECTURE_ONBOARDING.md` — full system walkthrough for Miles/Elijah
- `docs/clients/SCAN2PLAN_ELIJAH_BRIEF.md` — free-to-paid deal for Owen
- `docs/creative/ART_DIRECTION_ANALYSIS.md` — Claude's 367-line photography analysis
- `docs/creative/GEMINI_ART_DIRECTION.md` — Gemini's art direction (4 styles, photographer refs)
- `docs/creative/PERPLEXITY_ART_DIRECTION.md` — Perplexity's research on Southern brand identity
- `docs/adr/ADR-001-neo4j-hybrid-deferred.md`
- `docs/adr/ADR-002-voice-pipeline-gemini-prisma.md`
- `docs/adr/ADR-003-emdash-white-label-site-builder.md`
- `docs/specs/SPATIAL_CONSTELLATION_CRM.md`
- `docs/ops/SIRI_DELTA_DAWN_SETUP.md`
- Context folder: 26 documents at `~/Desktop/context/`

### Scripts Created
- `scripts/media/photos-to-gcs.sh` — Apple Photos → GCS pipeline (launchd)
- `scripts/media/scrape-corridor-places.ts` — Google Places API scraper
- `scripts/media/scrape-corridor-deep.ts` — Deep South expanded scraper (juke joints, soul food, etc.)
- `scripts/media/scrape-census-economic.ts` — Census Bureau data loader
- `scripts/media/ingest-music.ts` — MelodyVault ingestion (needs pnpm install on Mac Mini)
- `scripts/graph-lab/` — NetworkX flywheel analysis, constellation seeder, SQL views

### EmDash Prototype
- Cloned EmDash at `~/emdash/`
- Mississippi Magazine seed tested (8 articles, 2 bylines, 12 corridor cities)
- DSD business template created with 3 sample seeds (Fat Mama's, King's Tavern, Magnolia Grill)
- Demo launcher: `bash ~/emdash/templates/dsd-business/demo.sh fat-mamas-tamales`
- Custom collection rendering blocked by EmDash v0.1 content loader — Phase 2

### Miro Board
- Board URL: `https://miro.com/app/board/uXjVGlmufrs=/`
- Populated with 11 panels: Brand Voice, Design System, Creative Styles, Revenue Model, Cross-Promotion, Demographics, Targeting, Media Buying, Real Estate Broker Model, Tracy's View, Competitive Positioning

### Asana Tasks Created
- Tracy: 5-day gentle onboarding flow (Day 1-5, starting today)
- Tracy: Editorial session — pick first 2 real magazine articles
- Tracy: Review Scan2Plan deal before Elijah sends to Owen
- Elijah: Scan2Plan free-to-paid proposal
- Tracy + Amy: Siri shortcut install, DD testing, command center review, constellation test, press articles, Inn TV, DSD homepage, shared photo albums

---

## What's Next (Priority Order)

### 1. AI Swarm Router (Chase wants this)
Build `/api/swarm` or a CLI tool that:
- Takes any strategic prompt
- Optimizes for each model (Gemini=creative, Grok=harsh honesty, Perplexity=research, Claude=synthesis)
- Fires all models in parallel
- Collects results
- Claude synthesizes best ideas
- Everything saved to `docs/creative/` or `docs/analysis/`
- Play models against each other for accelerated results

### 2. AI Workspace Prototype (Chase wants this)
Miro-like visual workspace where every block has a Delta Dawn chat:
- Draggable blocks on a canvas
- Each block = topic + AI conversation
- Blocks reference each other
- Theme switcher with multiple design styles
- Start at `/workspace`

### 3. Style Catalog
- 11 template images downloaded to `~/Downloads/` (Gb36G.jpg, Id1kq.jpg, c7SXF.jpg, etc.)
- Chase likes "paper aesthetic with 60s mid-century vibe and charts"
- Also wants to explore sansaninternational.com for design inspiration
- Extract design tokens from each template image
- Build theme configs for the workspace

### 4. Tracy's Editorial Flow
- Day 1 (today): Read the magazine — 15 min
- Day 2: Flag 3 things — 10 min
- Day 3: Make first article real with Chase — 1 hour
- Day 4: Talk to Delta Dawn — 5 min
- Day 5: Drop photos in shared album — 5 min
- Chase wants the magazine to be REAL this week — factually correct, Tracy-approved
- Tone: high energy, minimal details, no overpromising

### 5. Touring Page Polish
- "The Hottest Room on the River" is deployed
- House band = rotating cast of Chase's friends (don't name them)
- May need real photos from shows (currently using studio shots)
- The page sets the tone: heat, not details

### 6. Real Estate Broker Play
- Full analysis on Miro board
- Cinematic listing videos, AI staging via Tuthill Design, podcasts about real estate
- 3 deal structures: production fee ($500/listing), revenue share (5-10%), license ($2-5K/mo)
- Find one broker in Natchez who gets it
- This is a real revenue opportunity

### 7. MelodyVault on Mac Mini
- Script is written (`scripts/media/ingest-music.ts`)
- Needs `pnpm install` on Mac Mini (Prisma client not generated)
- Mac Mini git auth needs SSH key for GitHub (currently HTTPS with no token)
- 55 tracks ready: Amy Allen (9), Chase Pierson (6), Mechanical Bull (40)

### 8. Bearsville Homepage
- `bearsvillemediagroup.com/` still shows wrong layout/nav in some cases
- The page content is correct (Bearsville Creative) but browser caching + layout inheritance cause issues
- Need to verify after latest deploy

---

## Known Issues

| Issue | Status |
|-------|--------|
| studiocvideo.com not resolving | Not our domain — partner controls |
| Bearsville homepage sometimes shows Big Muddy nav | Browser cache / layout inheritance |
| Mac Mini can't push to GitHub | HTTPS remote, no token. Use SSH push from MacBook. |
| Constellation seed is slow (O(n²) proximity) | Skip proximity edges, seed in seconds |
| EmDash custom collections don't render | EmDash v0.1 content loader issue — Phase 2 |
| Grok SSE endpoint returns minimal data via curl | Auth/streaming format mismatch — works in browser |

---

## Key Files

| File | What |
|------|------|
| `CLAUDE.md` | Master context — read first |
| `docs/onboarding/TECHNICAL_ARCHITECTURE_ONBOARDING.md` | Full system walkthrough |
| `docs/creative/ART_DIRECTION_ANALYSIS.md` | Claude art direction (367 lines) |
| `docs/creative/GEMINI_ART_DIRECTION.md` | Gemini art direction |
| `docs/creative/PERPLEXITY_ART_DIRECTION.md` | Perplexity research |
| `apps/web/middleware.ts` | Multi-tenant routing engine |
| `apps/web/config/domain-routes.ts` | Hostname → route group |
| `apps/web/config/tenants.ts` | Tenant registry |
| `apps/web/app/api/dawn/chat/route.ts` | Delta Dawn chat with tools |
| `apps/web/app/api/voice/stream/route.ts` | Voice endpoint with Siri auth |
| `apps/web/app/api/voice/tools.ts` | 10 whitelisted Prisma tools |
| `scripts/media/photos-to-gcs.sh` | Photo pipeline (launchd) |
| `.workflow/CURSOR_DISPATCH_OVERNIGHT.md` | Cursor tasks |
| `~/Desktop/context/` | 26 context docs for external AI |
| `~/emdash/` | EmDash prototype |

---

## The Big Idea Chase Is Driving Toward

An AI routing system that hits multiple models, gets diversity of perspectives, synthesizes results, and uses Claude as the gatekeeper. Not for everything — for strategic decisions. 3x the tokens, 3x the perspectives, better outcomes. This is the "swarm" architecture.

The immediate expression: art direction analysis from 3 models, synthesized into one recommendation. The long-term expression: every strategic question gets the swarm treatment automatically.

---

## LATE ADDITION: Business Model Clarity (Chase's final word)

**MBT = Licensing company.** Licenses the platform tools (AI, CMS, pipeline, constellation, Delta Dawn) to operators. Never touches end customers. B2B only.

**Studio C = Integrator + Implementer.** Builds, deploys, customizes MBT tools for each client/region. Provides ongoing production services (video, audio, photo). Bills for setup + production.

**Content Brands = The product people see.** Big Muddy, Bearsville, future clients. Each is a branded media ecosystem powered by MBT, built by Studio C. The customer never sees "platform" — they see their brand.

This is the canonical model. Every future operator, pitch, and onboarding should use this framework.

---

## LATE ADDITION 2: Workflow Presentation for Miles & Elijah

The onboarding needs to show CUSTOMIZABLE WORKFLOWS, not just "what we built." Show them what THEY can build.

Four example workflows to present:

1. **"Band walks in"** — booking → call sheet → QR check-in → recording → MelodyVault → radio → magazine → social → 80% to artist

2. **"Business wants marketing"** — DSD signup → Google data auto-populates → Delta Dawn manages reviews → social posts generated → magazine feature → radio spot → monthly report

3. **"Sell a house"** — broker brings listing → Studio C cinematic video → Tuthill AI staging → magazine feature → radio spot → directory neighborhood data → Delta Dawn answers area questions

4. **"Throw a show"** — JP picks band → call sheet → Studio C recording → show → video clips same night → radio gets live recording → magazine covers it → Inn sells rooms → directory businesses promoted

Each workflow is modular — steps can be reordered, added, skipped. The tools are building blocks. MBT licenses the blocks, Studio C assembles them, the content brand is what customers see.

Build this as an interactive workflow builder on the onboarding deck — draggable steps that show how tools connect. Chase wants Miles and Elijah to see it's totally customizable for their own workflow.

---

## LATE ADDITION 3: STOP ALL FRONTEND DESIGN (Chase's directive)

**Effective immediately:** No more frontend design work. Strip branding assumptions. Start with a blank palette. Let Tracy decide what we're building.

The directory page is broken (showing "Listing Not Found"). The design is getting ahead of the strategy.

### The Two Prime Objectives (in order)

1. **Get the Inn breaking even** — stop losing money
2. **Make money** — so we can focus on creating magical experiences with music

### What "magical experiences with music" means

- Developing Amy's music career
- Getting her a band together
- Getting her on stages
- Marketing that properly with media (magazine, radio, social)

### How you do that

You do it with media. That's why we built this thing. Magazine, radio, touring, directory — they're all tools to accomplish those two objectives.

### Tracy's Onboarding: Choose Your Own Adventure

Tracy should NOT be shown "here's what we built." She should be taken through a storyline:

**"You want Amy on stages. How do you make that happen?"**

- Need a venue → Blues Room (we have it)
- Need an audience → How do you get people there? → Magazine articles, radio, social, directory
- Need bookings → How do you book other venues? → Touring module, corridor database
- Need money → How does the Inn cover costs? → Shows drive bookings (2:1 multiplier)
- Need marketing → How do you promote? → AI-generated social, review management, Delta Dawn
- Need photos/video → How do you capture it? → Photo pipeline, Studio C, shared albums

Each branch leads to a module. Tracy discovers the tools by following her own goals, not by being shown a feature list.

**This is the onboarding process for EVERYONE.** Customize it to whatever the person wants. Miles and Elijah get the Bearsville version. A DSD customer gets the "I want more customers" version. Tracy gets the "I want Amy on stages" version.

### What to build next

NOT more pages. NOT more design. Build the choose-your-own-adventure onboarding flow that walks Tracy (or anyone) through THEIR goals and shows them which tools accomplish each step.

---

## LATE ADDITION 4: Raya Mochiak Full Pitch Page (BUILD NEXT SESSION)

Chase wants a comprehensive web page for Raya Mochiak that tells the FULL story. NOT on the DSD domain. On bigmuddyentertainment.com.

### What the page covers (in order):

1. **The Route** — Memphis to New Orleans, 13 cities, 735 venues. The touring corridor map.

2. **The Van** — The indie grip van / tour bus. Dual branded Big Muddy Touring × Studio C. Show cool van photos. Also show a 40-footer Prevost-style tour bus as the aspiration.

3. **The Dual Studio** — Partnership between Utopia (Raya's vintage studio coming to Natchez) and Studio C (Chase's video/tech production). Two studios, one ecosystem. Raya = audio king, Chase = video/tech king.

4. **The Micro-Media Company** — Big Muddy Magazine (editorial), Big Muddy Radio (streaming), Big Muddy Entertainment (shows). How one show becomes a magazine article, a radio session, a concert film, and 15 social clips.

5. **Workflow Automation + Publishing** — How content flows automatically: show → recording → radio → magazine → social → distribution. The pipeline is automated, not manual.

6. **The Record Label** — Big Muddy Records. 80/15/5 split. Music publishing. Marketing. Producing. Distribution via SoundCloud, Spotify, Apple Music.

7. **The House Band** — Swampers model. Deep roster. Rotating cast. Session players who can back anyone.

8. **The Ritz Theater** — Show what it looks like NOW (from Historic Natchez Foundation / Library of Congress photos). Then show what it COULD look like as a studio/gallery/performance space. Use AI visualization or reference images of converted theater studios.
   - Historic Natchez Foundation: https://natchez.org/properties/the-ritz-theatre
   - Library of Congress photos: https://www.loc.gov/item/2017703300/
   - 6,385 sq ft, Art Deco facade, on Commerce Street, empty since 1986

9. **"There's more"** — Brief mention that DSD and MBT exist, with links, but don't feature them. This page is about the creative/music/production story.

### Design notes:
- Use Chase's real photos from /images/studio-c/ (59 utopiademo shots)
- Use theater show photos from /images/processed/bearsville/
- Find or generate tour bus / van photos
- Dark theme, gold accents, same aesthetic as touring and house-band pages
- Long scroll, immersive, photo-forward
- Server component, no event handlers
- Mobile responsive

### Raya's credentials (for the page):
- Most famous musician in Israel as a teenager
- Founding member of Gogol Bordello (bass player)
- Drummer for David Byrne of Talking Heads
- Worked with The National (the console is from that session)
- Owns the console Taylor Swift recorded on (1960s, fully restored)
- Expert on Delta Blues (Israeli who knows the Delta better than most locals)
- Full studio of vintage analog gear

---

## LATE ADDITION 5: Technical Studio Page for Raya + Stage Trailer

### Technical Detail Page (build next session)
Show Raya the full technical plan:

**Audio Signal Path:**
- Midas MR18 vs Soundcraft Ui24R vs Behringer XR18 — RESEARCH which is best for this use case
  - Midas MR18: Midas preamps, 18-input, rack-mount, WiFi control, ~$650
  - Soundcraft Ui24R: 24-channel, browser-based control (no app needed), ~$900
  - Behringer XR18: Same hardware as Midas MR18 but Behringer preamps, ~$550
  - COMPARE: preamp quality, channel count, control interface, reliability, recording capability
- Stage box: 16-channel XLR snake → rack case
- Sennheiser EW-D wireless (6 channels)
- Zoom P8 as podcast submix feed
- Signal routing diagram showing the full path

**Video Signal Path:**
- Sony cameras on DJI RS gimbals (2x)
- DJI wireless video transmitter → control module
- DJI Osmo for run-and-gun
- Aputure lights + C-stands
- Monitor wall (Samsung 65" + LG 43")
- Mac Mini as media server / Plex / streaming
- Full camera package breakdown

**The Road Kit:**
- What fits in the indie grip van
- What the full production package looks like deployed
- How 2 people + the van = broadcast-quality production

**The Stage Trailer:**
- Horse trailer that converts to a mobile stage
- Chase has photos in Lightroom from an October shoot
- Gallery name: "Long Steel Railway" (check Lightroom catalog)
- Need to find those photos and use them
- Create a rendering/mockup with "Big Muddy" branding on the trailer
- This is for outdoor shows, festivals, parking lot concerts, corridor touring

### Lightroom Photo Search
- Look in Chase's Lightroom catalog for "Long Steel Railway" gallery
- October 2025 or 2026 shoot
- Contains photos of a horse trailer / mobile stage setup
- These are REAL photos from a REAL event — use them on the page

### Mixer Comparison Task
Research and present a comparison:
- Midas MR18 ($650) — Midas preamps, proven reliability, Behringer ecosystem
- Soundcraft Ui24R ($900) — 24 channels, browser control, Harman/Soundcraft quality
- Behringer XR18 ($550) — budget option, same form factor as Midas
- For THIS use case: live sound at 50-seat venue, recording, podcast, mobile production
- Recommendation with reasoning
