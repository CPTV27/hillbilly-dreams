# Hillbilly Dreams Inc — Business Architecture

*Canonical reference. Every agent reads this. Every page aligns to this. Updated 2026-04-17.*

*April 17 amendments: DSD soft-decoupled from Big Muddy (see `docs/POSITIONING_UPDATE_2026-04-17.md`). Big Muddy Touring operates its own music-industry directory separate from DSD. Two-directory architecture — one moat (Big Muddy Touring circuit), one SEO asset (DSD).*

---

## The Structure

The brands are proof markets. Big Muddy is the flagship. Within Big Muddy, there is a music-industry directory (venues, musicians, hospitality) that IS part of the moat. DSD is a sibling SEO + local-guide brand operating independently. Both share infrastructure; neither brand is nested under the other.

```
┌───────────────────────────────────────────────────────────┐
│                  HILLBILLY DREAMS INC                      │
│              Parent / Contracts / Partnerships             │
└──────┬──────────────────┬──────────────────┬─────────────┘
       │                  │                  │
   ┌───┴───────┐    ┌────┴─────┐     ┌─────┴──────┐
   │    MBT    │    │ Big Muddy│     │ Studio C   │
   │  Licensed │    │ Flagship │     │ Implement- │
   │  Civic OS │    │  Proof   │     │  ation &   │
   │           │    │  Market  │     │  Services  │
   └───┬───────┘    └────┬─────┘     └────────────┘
       │                 │
   ┌───┴───────┐    ┌───┴─────────┐
   │   DSD     │    │  Bearsville │
   │  Public   │    │  Northeast  │
   │  Layer    │    │  (Summer    │
   │           │    │   2026)     │
   └───────────┘    └─────────────┘
```

**MBT is a licensed operating system.** Institutions buy the program.
**DSD is the public participation layer.** Brand-visible, architecturally subordinate to MBT.
**Big Muddy is the flagship proof market.** Natchez is customer zero.
**Studio C is the implementation arm.** Media production, setup, training.
**HDI owns everything.** Contracts, partnerships, IP.

---

## Hillbilly Dreams Inc (HDI)

**Role:** Parent company. Contracts, billing, partnerships, IP ownership.
**Website:** hillbillydreamsinc.com — owner's command center for Chase, Tracy, and Amy. Not a public marketing site.
**Legal entity:** Registered LLC. HDI not yet formally incorporated.
**Equity:** Chase Pierson (CEO/CTO/Showrunner), Tracy Alderson-Allen (equity partner — finance, Inn, magazine), Amy Alderson-Allen (equity partner — Inn, bar, shows, radio/podcast).

---

## Measurably Better Things (MBT) — The Licensed Operating System

**Role:** A licensed civic-commerce operating system for towns, districts, brokerages, and cultural operators. Not a self-serve SaaS tool. A program sale.
**Website:** measurablybetter.life — shows the platform to institutional buyers, operators, and licensees.

### What MBT Is

MBT combines directory infrastructure, publishing, media distribution, business onboarding, and service delivery into one operating model. An institution buys the program. Businesses participate under that umbrella.

### The Sales Motion

1. **License** — A city, broker, chamber, venue group, or district buys the program.
2. **Implementation** — We stand up the directory, content, onboarding, and local partner structure.
3. **Participation** — Businesses, creators, or operators join under that umbrella.
4. **Services** — Studio C / Big Muddy provide media, setup, campaigns, training, publishing, and activation.

This is a program sale, not a tool subscription. Fewer customers, higher trust, higher price, longer cycle, more services, stickier relationships, stronger moat.

### The 9 Modules

| Module | What It Does |
|---|---|
| **Directory** | AI-powered business listings, review monitoring, competitor watch, report cards |
| **Magazine** | Editorial content pipeline — articles, city guides, photo essays, AI-assisted drafts |
| **Radio** | Podcast + curated playlists (Phase 1). 24/7 streaming infrastructure built, activates with first sponsor (Phase 2). |
| **Records** | Artist services — catalog, sessions, distribution. Artists keep masters. Non-exclusive. |
| **Touring / Events** | Booking, ticketing, event management, show-to-content pipeline |
| **Commerce** | Storefront, payments, subscriptions, Stripe Connect for multi-party splits |
| **Broadcasting** | Live production — OBS, Icecast, multi-stream to radio/web/social |
| **AI Content Pipeline** | Social posts, spotlights, voice profiles, search optimization. Gemini + Claude. |
| **Analytics** | Monthly report cards, Google review alerts, competitor snapshots, audience metrics |

Institutional buyers activate the modules they need. A music corridor needs all 9. A Main Street program might need Directory + Magazine + Commerce + Analytics.

### Institutional Pricing (Primary Track)

| Component | What It Is |
|---|---|
| **Setup/Implementation Fee** | Standing up the directory, content, onboarding, local partner structure |
| **Annual Platform License** | Access to MBT modules, admin console, reporting, publishing workflows |
| **Content/Media Package** | Studio C photography/video, editorial, training workshops (optional) |
| **Merchant Onboarding Package** | Business onboarding, asset collection, listing setup at scale (optional) |

Exact pricing is set per engagement. This is not a tier chart — it's a program proposal.

### Individual Pricing (Secondary Track — Self-Serve)

For businesses not part of an institutional program, DSD self-serve tiers remain:

| Tier | Price | What You Get |
|---|---|---|
| Free | $0/mo | Basic directory listing |
| Starter | $25/mo | Enhanced listing, review monitoring, report card |
| Growth | $50/mo | AI listing, social posting, competitor watch |
| Marketing | $99/mo | Full AI stack — reviews, Magazine feature, campaigns |
| Engine | $250/mo | Dedicated account, custom integrations, priority support |

This is the fallback for walk-in businesses. The primary sales motion is institutional.

### Who Buys MBT

The first customer is not "a creator." The first customer is:
- A town or city government
- A tourism bureau or CVB
- A Main Street organization
- A real estate broker with a local ecosystem thesis
- A developer or district operator
- A chamber of commerce or business alliance
- A venue cluster or hospitality portfolio

These buyers have budgets, reasons to care, and a need for coordination capacity — which is what MBT actually sells.

---

## Deep South Directory (DSD) — Sibling Brand, SEO Asset

*Soft-decoupled from Big Muddy as of 2026-04-17. See `docs/POSITIONING_UPDATE_2026-04-17.md`.*

**What:** An independent corridor directory and local-guide brand. General-purpose businesses — restaurants, shops, services, any vertical. AI-generated bulk + human field reports + business self-submitted listings.
**Domain:** deepsouthdirectory.com
**Role:** Sibling brand. Not part of the Big Muddy moat. Not a module. Infrastructure-shared, brand-independent.

DSD is:
- A compounding SEO asset targeting commercial corridor searches ("best coffee in natchez," "things to do in clarksdale")
- A local-guide publication with its own voice (*"three locals who eat out a lot"*), operated informally by Chase, Tracy, and Amy alongside the Inn
- A self-serve listing product at tiers $0 / $25 / $50 / $99 / $250
- Content-shared with Big Muddy Touring where useful (cross-links, not nested brand)

DSD is NOT:
- Part of the Big Muddy family footer or navigation
- A lead-gen funnel for Big Muddy media (that job moves to the Big Muddy Touring directory)
- A walk-in sales product (the walk-in pitch is now Big Muddy media kit bundles — see `/admin/pulse`)
- Editorially tone-policed — it has its own voice, distinct from the magazine

### The Big Muddy Touring Directory (separate)

Big Muddy Touring operates its **own** directory — music venues, musicians, music-adjacent hospitality, press contacts — at `bigmuddytouring.com/circuit` (URL TBD). This one IS part of the moat. It feeds publicity packages, tour routing, and the circuit narrative. Shared Prisma model (`DirectoryBusiness`) uses a `scope` field to distinguish `'touring'` vs `'general'`.

### Revenue split

| Directory | Y1 target | Revenue model |
|---|---|---|
| DSD (general) | $1–3K/mo | Self-serve subscriptions, passive |
| Big Muddy Touring directory (music + hospitality) | $3–5K/mo | Publicity packages ($500 Spotlight, $2,500 Album Launch, etc.) |

---

## Big Muddy (ACTIVE — Flagship Proof Market)

**What:** Music-hospitality ecosystem, Natchez, Mississippi. Customer zero.
**Domains:** bigmuddytouring.com, bigmuddymagazine.com, bigmuddyradio.com, bigmuddyentertainment.com, bigmuddyrecordlabel.com
**Modules used:** All 9.

Big Muddy Touring is the engine:
- Books bands and venues along the corridor
- Provides transportation (Sprinter van now, 40-foot sleeper bus coming)
- Promotes every show through the media company (Magazine, Radio, social)
- Non-exclusive record deals through Big Muddy Records
- Every venue becomes a DSD participant
- Every show feeds every module (2:1 ecosystem multiplier)

**The pitch to bands:** "We book your shows, drive you there, put you on the radio, write about you in the magazine, release your record, and sell it in the store. Non-exclusive. You keep your masters."

**The pitch to venues:** "We bring the talent, the production, the promotion, and the audience. Your venue ends up in the Directory where every tourist finds it."

Natchez is the live case study that proves MBT works before licensing to other markets.

---

## The Other Brands

### Bearsville Creative (Summer 2026)

**What:** Northeast media imprint, Hudson Valley / Catskills.
**Domains:** bearsvillemediagroup.com, bearsvillemedia.com
**Modules used:** Directory, Radio, Magazine, Studio
**Status:** Minimal node live. First non-Natchez MBT deployment.

### Outsider Economics (ACTIVE)

**What:** Economic philosophy publishing.
**Domain:** outsidereconomics.com
**Modules used:** Magazine, AI Content Pipeline
**Voice:** Sophisticated, accessible. Field manual energy.

### Studio C Video (PARTNER — Two-Market Production)

**What:** Production and implementation services. Recording, video, broadcasting, training.
**Domain:** studiocvideo.com
**Ownership:** Chase is a 40% owner.
**Growth move (Q2/Q3 2026):** Expanding into the Natchez market. Adds capability, region, and customer base. Opens a working exchange between Utopia in Bearsville and the Deep South — radio shows and content move between the two rooms. The remote workflow gets tested on real paying projects in both markets at once.

### Tuthill Design (PARTNER — Two-Market Design + Real Estate)

**What:** Design studio and real estate media specialist, proven in the Hudson Valley.
**Domain:** tuthilldesign.com
**Ownership:** Elijah's company. Integrates operationally with Studio C.
**Growth move (Q2/Q3 2026):** Expanding the platform built in Woodstock into the Deep South so HDI has coverage in both markets. Post-production is remote anyway. Chase works with Tracy as interior designer to push Tuthill design services into the Natchez corridor. Same platform, two markets.

### Chase Pierson Photography (OWNED — Independent Practice)

**What:** Chase's personal photography practice. Editorial, portraits, commercial, fine art.
**Positioning:** Separate from Tuthill Design's default real estate media pricing. Chase publishes his own rates and his own book. Tuthill clients can *request Chase* specifically as an upgrade.
**Booking website (Q2 2026 — NEW):** A dedicated booking site for Chase's rates and availability, usable in the Deep South market immediately. See `PENDING_ISSUES_QUEUE.md`.
**Availability rule:** Chase is increasingly in Natchez. The booking flow must handle his actual location and quote travel when needed. He does not silently decline — he quotes.

---

## The Flywheel

```
Shows → Recordings → Records releases
  ↓                        ↓
Magazine features    Podcast episodes + playlist rotation
  ↓                        ↓
Social media posts   Audience growth
  ↓                        ↓
Directory listings → Program participants
  ↓                        ↓
Venue partnerships   Inn bookings
  ↓                        ↓
More shows ←─────────────┘
```

Every show has a 2:1 ecosystem multiplier. A $1,000 show generates $500+ in downstream revenue across the other modules.

---

## The Data Flywheel

Every brand feeds the same regional data supply:
- DSD business listings make MBT smarter about the region
- MBT users generate local knowledge that makes DSD listings more valuable
- Magazine articles build the knowledge graph
- Shows bring people who generate data
- Every layer feeds every other layer

HDI is becoming the data supply for the corridors it covers. That's the long-term moat.

---

## What Each Domain Does

| Domain | Brand | Audience | Purpose |
|---|---|---|---|
| hillbillydreamsinc.com | HDI | Owners (Chase, Tracy, Amy) | Owner's dashboard — all properties, revenue, admin |
| measurablybetter.life | MBT | Institutional buyers, operators | Licensed platform overview |
| deepsouthdirectory.com | DSD | Local businesses, tourists | Public participation/commerce layer |
| bigmuddytouring.com | Big Muddy | Music fans, bands, venues | The touring circuit |
| bigmuddymagazine.com | Big Muddy | Readers, tourists | Editorial content |
| bigmuddyradio.com | Big Muddy | Listeners | Podcast + playlists (radio infrastructure built, activates with first sponsor) |
| bigmuddyentertainment.com | Big Muddy | Industry, talent | Entertainment umbrella |
| bigmuddyrecordlabel.com | Big Muddy | Artists, music buyers | Record label + store |
| bearsvillemediagroup.com | Bearsville | Hudson Valley audience | Northeast media imprint |
| outsidereconomics.com | OE | Readers, thinkers | Economic philosophy publishing |
| tuthilldesign.com | Tuthill | Design clients | Partner design studio |
| studiocvideo.com | Studio C | Production clients | Implementation + media services |

---

## Current Phase: Dogfood → First Institutional Pilot (April 2026)

Running the system on ourselves before licensing to an external institution:

| Client | Business | What We're Testing |
|---|---|---|
| Big Muddy Touring | The touring circuit | Full flywheel |
| Big Muddy Magazine | The editorial arm | Content → Directory pipeline |
| Biscuits & Blues | Regina Charboneau | Real external test — does DSD help a restaurant? |
| The Big Muddy Inn | The hotel/venue | Full stack — listing, reviews, events, radio |

**Next step:** First institutional pilot. Natchez (city, tourism bureau, or Main Street org) as the first external buyer of the MBT program. Use Big Muddy as the proof case, onboard 20-50 local businesses under the program umbrella.

---

## Revenue Streams

| Stream | Owner | Current | Y1 Target |
|--------|-------|---------|-----------|
| Inn (6 rooms) | Amy + Tracy | $3,000/mo | $7,500/mo |
| Bar | Amy | $2,000/mo | $4,000/mo |
| Shows / Events | Chase + Amy | $1,500/mo | $4,000/mo |
| Weddings | Tracy | $0 | $5,000/mo |
| DSD Subscriptions | Chase | $500/mo | $10,000/mo |
| Podcast | Chase + Amy | $0 | $2,000/mo |
| Bundle Packages | Chase | $0 | $5,000/mo |
| Artist Packages | Chase (via Studio C) | $0 | $3,000/mo |
| Membership (Club) | Chase | $0 | $1,000/mo |

Podcast revenue model: sponsorship reads ($200-500/episode) + YouTube ad revenue + premium episodes behind membership wall.

---

## Scorecard — Podcast (Phase 1)

| Metric | Target |
|--------|--------|
| Primary KPI | Downloads per episode |
| Secondary | YouTube views |
| Weekly target | 1 episode published |
| Monthly target | 500 downloads, 1,000 YouTube views |
| Owner | Chase (production) + Amy (hosting/talent) |

Phase 2 (24/7 streaming) scorecard activates with first sponsor. KPIs shift to concurrent listeners, play count, SoundExchange compliance.

---

## Operator Map

| Person | Role | Scope |
|--------|------|-------|
| Chase Pierson | CEO/CTO/Showrunner | Tech, media, DSD sales (daytime), artist development, production |
| Tracy Alderson-Allen | Equity Partner | Finance, Inn operations, magazine editorial, wedding coordination |
| Amy Alderson-Allen | Equity Partner | Inn/bar operations, show hosting, podcast talent, event management |
| Entertainment Director | OPEN | Revenue partner structure. Books shows, manages talent pipeline. (JP Houston departed April 15) |

---

## Corridor Research Sprint

Weekly cadence across 7 corridor cities: Natchez, Monroe, Jackson, Baton Rouge, St. Francisville, Alexandria, El Dorado.

**Cycle:** Research (venue/business discovery) → Chase review → outreach to venue contacts → booking pipeline.

Corridor partners provide local relationships and institutional credibility. They are collaborators, not employees or equity holders. Not listed on org charts or public pages. Referenced as "corridor partner" in internal docs only.

---

## Radio Strategy — Phased Rollout

**Phase 1 (now):** Big Muddy Radio = podcast + curated playlists
- Weekly podcast episodes (interviews, live sessions, Blues Room recordings)
- Curated playlists on Spotify/Apple Music/YouTube
- YouTube channel for video sessions and audiograms
- Zero SoundExchange overhead

**Phase 2 (triggered by sponsor or audience):** Flip to 24/7 streaming
- AzuraCast already configured and SSL live
- 116 tracks ready in MelodyVault
- RadioPlayLog schema designed
- Mac mini stack stays running (OpenBroadcaster :8080, Icecast :8010) for content production and testing

Language rule: Use "podcast + playlists" for Phase 1 public-facing. Use "radio infrastructure built, activates with first sponsor" for internal docs. Never say "radio is dead" or "we pivoted away from radio."

---

## The Rules

1. **MBT is the product being licensed.** Not a sibling platform — the thing institutions buy.
2. **Build for Big Muddy first.** It's the proof market. Everything we build gets tested here before licensing.
3. **DSD is the public layer of MBT.** Brand-visible, architecturally subordinate. Not a separate product.
4. **Program first, software second.** Sell coordination capacity. Implement with services. Keep standard modules.
5. **Institutional buyers come first.** Self-serve individual tiers are the fallback, not the primary sales motion.
6. **Shows are the engine.** Every show feeds every module. Book the shows, the flywheel does the rest.
7. **Non-exclusive.** Artists keep masters. Bands can release elsewhere. Low friction = more artists.
8. **Photography first.** Real photos, not AI illustrations. The design serves the image.
9. **Dogfood before licensing.** Run it on ourselves. Know what works. Then license what's proven.
10. **"Powered by Measurably Better Things"** in every footer. It tells the user they're connected to the whole network.
11. **"Measurably" must be backed by measurement.** Outcome reporting is mandatory. If you can't prove it, don't claim it.

---

*This document is the source of truth. If any other doc, page, or agent contradicts this, this document wins.*

---

## Shipped April 1-2, 2026

### New Modules & Features
- **WiFi Captive Portal** (`/welcome/wifi`) — Email capture for Inn guests. Branded splash page, shows tonight's events, links to Radio. Future: deploy at any ecosystem business.
- **Musician Directory** (`/directory/onboard/musician`) — Same tier model as DSD ($0/$25/$50/$99/$250, Apr 5 canon) but for bands. Genre, streaming links, availability, fee range. Listing page detects musicians and shows "Book This Artist" CTA.
- **Client Photo Delivery** (`/gallery/clients/[name]`) — Masonry grid with lightbox, heart favorites, print ordering ($25-$350), tip jar (Stripe), share buttons, download requests. Template for all future client deliveries.
- **Voice AI** (`/measurably-better/life`) — Southern Concierge. Tap-to-talk mic button, Whisper STT, Gemini Flash reasoning with real database queries.

### Database
- **Touring DB** — 6 new Prisma models: TouringVenue, TouringHotel, TourRoute, TourRouteStop, TouringRestaurant, CorridorCity
- **Corridor seeded** — 13 cities (New Orleans → Memphis), 31 artists, 26 venues, 20 hotels, 15 restaurants, 1 complete route (Delta Run)
- **Touring-to-Directory bridge** — `lib/touring-to-directory.ts` auto-creates DirectoryBusiness records for touring entities
- **Spotify + MusicBrainz API clients** — Built, waiting on API keys to activate enrichment
- **16,936 photos tagged** — Google Cloud Vision API (labels, landmarks, objects), XMP metadata written, indexed in repo

### Infrastructure
- **Records domain** — `bigmuddyrecordlabel.com` DNS pointing to Vercel (we don't own bigmuddyrecords.com)
- **Delta Dawn** — Group created in Google Workspace (`deltadawn@hillbillydreamsinc.com`), Google Chat bot routes already built
- **FM Radio** — Part 15 transmitter ordered for property-only broadcast, LPFM license research underway (potential Delta Blues Museum partnership)
- **Photo pipeline** — Adobe Bridge + Google Vision API dual tagging, Lightroom catalog integration, auto-inference for mood/brand/subject
