# Hillbilly Dreams Inc — Business Architecture

*Canonical reference. Every agent reads this. Every page aligns to this. Updated 2026-04-01.*

---

## The Structure

HDI owns everything. MBT and all the brands are siblings — MBT powers the others, but it doesn't sit above them.

```
┌───────────────────────────────────────────────────────────┐
│                  HILLBILLY DREAMS INC                      │
│                  Holding Company                           │
│                  Owns everything                           │
└──────┬────────┬────────┬────────┬────────┬───────┬───────┘
       │        │        │        │        │       │
   ┌───┴───┐ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐
   │  MBT  │ │ Big │ │Bear-│ │ DSD │ │MBT  │ │ OE  │  ...
   │       │ │Muddy│ │sville│ │     │ │.life│ │     │
   │Platform│ │     │ │Media│ │     │ │     │ │     │
   └───┬───┘ └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘ └─────┘
       │        │        │       │       │
       │   uses ←───────←───────←───────←┘
       │
   9 Modules:
   Directory · Magazine · Radio · Records
   Touring/Events · Commerce · Broadcasting
   AI Content Pipeline · Analytics
```

**MBT is the shared technology platform.** It powers all the sibling brands.
**The brands are clients of MBT.** They use its modules. They don't report to it.
**HDI owns both MBT and all the brands.** Like Disney owning both Imagineering and the theme parks.

---

## Hillbilly Dreams Inc (HDI)

**Role:** Holding company. Owns MBT and all brands. The owner's dashboard.
**Website:** hillbillydreamsinc.com — owner's command center for Chase, Tracy, and Amy. Not a public marketing site.
**Legal entity:** FarleyPierson LLC (EIN 81-4280721). HDI not yet formally incorporated.
**Equity:** Chase Pierson, Tracy Alderson-Allen, Amy Alderson-Allen — equal thirds.

---

## Measurably Better Things (MBT) — The Platform

**Role:** The shared technology that powers everything. The Glass Engine. A sibling that serves all other siblings.
**Website:** measurablybetter.life — shows the platform to operators, investors, and licensees.

### The 9 Modules

| Module | What It Does |
|---|---|
| **Directory** | AI-powered business listings, review monitoring, competitor watch, report cards |
| **Magazine** | Editorial content pipeline — articles, city guides, photo essays, AI-assisted drafts |
| **Radio** | Streaming infrastructure — shows, playlists, live sessions, broadcasting |
| **Records** | Artist services — catalog, sessions, distribution. Artists keep masters. Non-exclusive. |
| **Touring / Events** | Booking, ticketing, event management, show-to-content pipeline |
| **Commerce** | Storefront, payments, subscriptions, Stripe Connect for multi-party splits |
| **Broadcasting** | Live production — OBS, Icecast, multi-stream to radio/web/social |
| **AI Content Pipeline** | Social posts, spotlights, voice profiles, search optimization. Gemini + Claude. |
| **Analytics** | Monthly report cards, Google review alerts, competitor snapshots, audience metrics |

Clients activate the modules they need. A music corridor needs all 9. A food corridor might need Directory + Magazine + Commerce.

### MBT Also Has Its Own Consumer Product

**Measurably Better Life (measurablybetter.life)** — a personal AI agent. Same engine, consumer-facing skin. Usage-based pricing:

| Usage | Price | What You Get |
|---|---|---|
| 0-3 messages/day | Free | Open source, self-hosted. Hardware kit available. Digital minimalism. |
| ~50 messages/day | ~$10/mo | Moderate daily use |
| Unlimited (soft cap) | $20/mo | "Better ChatGPT" — add-on modules available |
| Creative/heavy output | $99/mo | Full creative suite, premium features |

---

## The Brands (All Siblings, All Clients of MBT)

### Big Muddy (ACTIVE — flagship)

**What:** Music-hospitality ecosystem, Natchez, Mississippi.
**Domains:** bigmuddytouring.com, bigmuddymagazine.com, bigmuddyradio.com, bigmuddyentertainment.com, bigmuddyrecords.com
**Modules used:** All 9.
**The business:** Booker and promoter of bands and venues in the Deep South.

Big Muddy Touring is the engine:
- Books bands and venues along the corridor
- Provides transportation (Sprinter van now, 40-foot sleeper bus coming)
- Promotes every show through the media company (Magazine, Radio, social)
- Non-exclusive record deals through Big Muddy Records
- Record store promotion through the catalog
- Every venue becomes a DSD client
- Every show feeds every module (2:1 ecosystem multiplier)

**The pitch to bands:** "We book your shows, drive you there, put you on the radio, write about you in the magazine, release your record, and sell it in the store. Non-exclusive. You keep your masters."

**The pitch to venues:** "We bring the talent, the production, the promotion, and the audience. Your venue ends up in the Directory where every tourist finds it."

### Deep South Directory (ACTIVE)

**What:** Business marketing product for the corridor.
**Domain:** deepsouthdirectory.com
**Modules used:** Directory, AI Content Pipeline, Analytics, Commerce
**Pricing:**

| Tier | Price | What You Get |
|---|---|---|
| Entry | Free | Basic directory listing |
| The Listing | $20/mo | AI-managed listing, review alerts, monthly report |
| The Works | $49/mo | + social posting, content calendar (opens Apr 21) |
| The Engine | $99/mo | + review management, competitor watch, Magazine feature |

DSD is the mainstream entry point. Any business doing under $200K/year can afford it.

### Bearsville Media Group (ACTIVE — summer 2026)

**What:** Northeast media imprint, Hudson Valley / Catskills.
**Domains:** bearsvillemediagroup.com, bearsvillemedia.com
**Modules used:** Directory, Radio, Magazine, Studio
**Status:** Minimal node live. Full activation summer 2026.

### Outsider Economics (ACTIVE)

**What:** Economic philosophy publishing.
**Domain:** outsidereconomics.com
**Modules used:** Magazine, AI Content Pipeline
**Voice:** Sophisticated, accessible. Field manual energy.

### Chase Pierson Photography (PLANNED)

**What:** Fine art and editorial photography gallery.
**Domain:** TBD (buycurious.art name vetoed by Tracy)
**Modules used:** Commerce, Gallery
**Curator:** Tracy Alderson-Allen manages the artist roster.

### Studio C Video (PARTNER)

**What:** Production arm. Recording, video, broadcasting.
**Domain:** studiocvideo.com
**Modules used:** Gallery, Studio, Radio, Creative
**Note:** Chase 40% owner. Serves Big Muddy, Bearsville, and external clients.

### Tuthill Design (PARTNER)

**What:** Design studio.
**Domain:** tuthilldesign.com
**Modules used:** Gallery, Studio, Creative
**Note:** Elijah's company. Integrates with Studio C.

### Future Clients

Any corridor, any industry, any town. The monorepo is cloneable at any level:
- **HDI level:** License the whole stack ("micro media company in a bottle")
- **Brand level:** Activate specific modules for your industry
- **Module level:** Just the directory, just the radio, just the content pipeline

Scan2Plan would be a client of MBT — same as Big Muddy. Different industry, different modules, same platform.

---

## The Flywheel

```
Shows → Recordings → Records releases
  ↓                        ↓
Magazine features    Radio rotation
  ↓                        ↓
Social media posts   Audience growth
  ↓                        ↓
Directory listings → DSD subscribers
  ↓                        ↓
Venue partnerships   Inn bookings
  ↓                        ↓
More shows ←─────────────┘
```

Every show has a 2:1 ecosystem multiplier. A $1,000 show generates $500+ in downstream revenue across the other modules.

---

## The Data Flywheel

Every brand feeds the same regional data supply:
- DSD business listings make MBT.life smarter about the region
- MBT.life users generate local knowledge that makes DSD listings more valuable
- Magazine articles build the knowledge graph
- Shows bring people who generate data
- Every layer feeds every other layer

HDI is becoming the data supply for the corridors it covers. That's the long-term moat.

---

## What Each Domain Does

| Domain | Brand | Audience | Purpose |
|---|---|---|---|
| hillbillydreamsinc.com | HDI | Owners (Chase, Tracy, Amy) | Owner's dashboard — all properties, revenue, admin |
| measurablybetter.life | MBT | Consumers + operators | AI agent product + platform overview |
| deepsouthdirectory.com | DSD | Business owners | Directory + marketing services |
| bigmuddytouring.com | Big Muddy | Music fans, bands, venues | The touring circuit |
| bigmuddymagazine.com | Big Muddy | Readers, tourists | Editorial content |
| bigmuddyradio.com | Big Muddy | Listeners | Streaming radio |
| bigmuddyentertainment.com | Big Muddy | Industry, talent | Entertainment umbrella |
| bigmuddyrecords.com | Big Muddy | Artists, music buyers | Record label + store |
| bearsvillemediagroup.com | Bearsville | Hudson Valley audience | Northeast media imprint |
| outsidereconomics.com | OE | Readers, thinkers | Economic philosophy publishing |
| tuthilldesign.com | Tuthill | Design clients | Partner design studio |
| studiocvideo.com | Studio C | Production clients | Partner production studio |

---

## Dogfood Phase (April 2026)

Before selling to external businesses, we're running the system on ourselves:

| Client | Business | What We're Testing |
|---|---|---|
| Big Muddy Touring | The touring circuit | Full flywheel |
| Big Muddy Magazine | The editorial arm | Content → Directory pipeline |
| Biscuits & Blues | Regina Charboneau | Real external test — does DSD help a restaurant? |
| The Big Muddy Inn | The hotel/venue | Full stack — listing, reviews, events, radio |

No external sales until we've eaten our own dog food and know exactly what to sell.

---

## The Rules

1. **HDI owns everything.** MBT and all brands are siblings. MBT powers the others but doesn't sit above them.
2. **Build for Big Muddy first.** If a feature helps Big Muddy run better, build it. If it's good enough to sell, package it later.
3. **MBT is the platform, not a parent.** The codebase IS MBT. The brands are its clients, not its children.
4. **Same engine, different skins.** Consumer AI and business marketing are the same platform with different tenant configs.
5. **The monorepo is cloneable at any level.** HDI sells the stack. Clients buy modules.
6. **Shows are the engine.** Every show feeds every module. Book the shows, the flywheel does the rest.
7. **Non-exclusive.** Artists keep masters. Bands can release elsewhere. Low friction = more artists.
8. **Photography first.** Real photos, not AI illustrations. The design serves the image.
9. **Dogfood before selling.** Run it on ourselves. Know what works. Then sell what's proven.
10. **"Powered by Measurably Better Things"** in every footer. It tells the user they're connected to the whole network.

---

*This document is the source of truth. If any other doc, page, or agent contradicts this, this document wins.*
