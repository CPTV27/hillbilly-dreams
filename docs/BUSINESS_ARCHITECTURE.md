# Hillbilly Dreams Inc — Business Architecture

*Canonical reference. Every agent reads this. Every page aligns to this. Updated 2026-03-31.*

---

## The Three Layers

```
┌─────────────────────────────────────────────────┐
│           HILLBILLY DREAMS INC                   │
│           Holding Company                        │
│           The Foundation                         │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────┐
│        MEASURABLY BETTER THINGS                  │
│        Technology Platform                       │
│        The Intelligence                          │
│                                                  │
│   9 Modules:                                     │
│   Directory · Magazine · Radio · Records         │
│   Touring/Events · Commerce · Broadcasting       │
│   AI Content Pipeline · Analytics                │
│                                                  │
│   One codebase. Any skin. Any industry.          │
└──┬───────────────┬───────────────┬──────────────┘
   │               │               │
┌──┴──┐      ┌─────┴────┐   ┌─────┴────┐
│ Big │      │Bearsville │   │ [Future] │
│Muddy│      │  Media    │   │ Client   │
│     │      │  Group    │   │          │
└──┬──┘      └──────────┘   └──────────┘
   │
   ├── bigmuddytouring.com
   ├── bigmuddymagazine.com
   ├── bigmuddyradio.com
   ├── bigmuddyentertainment.com
   ├── bigmuddyrecords.com
   └── deepsouthdirectory.com
```

---

## Layer 1: Hillbilly Dreams Inc

**Role:** Holding company. Owns everything. Backstage only.
**Website:** hillbillydreamsinc.com — minimal, mysterious. Think Berkshire Hathaway.
**Legal entity:** FarleyPierson LLC (EIN 81-4280721). HDI not yet formally incorporated.
**Equity:** Chase Pierson, Tracy Alderson-Allen, Amy Alderson-Allen — equal thirds.

HDI does not appear on customer-facing materials. It's the name on the paperwork.

---

## Layer 2: Measurably Better Things (MBT)

**Role:** The technology platform. Builds and manages the modules. The Glass Engine.
**Website:** measurablybetter.life — positions the platform to operators, investors, and licensees.

### The Platform Has Two Products

**Product A: Consumer AI Agent (measurablybetter.life)**

A personal AI agent. The "Southern Concierge." Usage-based pricing with a slider.

| Usage | Price | What You Get |
|---|---|---|
| 0-3 messages/day | Free | Open source, self-hosted. Hardware kit available. Digital minimalism supported. |
| ~50 messages/day | ~$10/mo | Moderate daily use |
| Unlimited (soft cap) | $20/mo | "Better ChatGPT" — add-on modules available |
| Creative/heavy output | $99/mo | Full creative suite, premium features |

The free tier is a real product for people who want LESS tech. Open source, self-hosted, hardware kit. "Say goodbye to your digital life."

**Product B: Business Services (deepsouthdirectory.com and future directories)**

Business marketing platform. Same engine, business-facing skin.

| Tier | Price | What You Get |
|---|---|---|
| Entry | Free | Basic directory listing |
| The Listing | $20/mo | AI-managed listing, review alerts, monthly report |
| The Works | $49/mo | + social posting, content calendar (opens Apr 21) |
| The Engine | $99/mo | + review management, competitor watch, Magazine feature |

DSD is one implementation of the business product. Any MBT client can activate a directory module for their corridor/industry.

**The Key Insight:** Both products are the same platform with different skins. The $99/mo DSD customer and the $99/mo MBT consumer both talk to the same AI infrastructure. Different modules active, different branding, same engine.

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

Clients activate the modules they need. A music corridor needs all 9. A food corridor might need Directory + Magazine + Commerce. An AEC company might need Directory + Analytics + Content Pipeline.

---

## Layer 3: Implementations (Clients)

Each client is a tenant in the multi-tenant system. Same codebase, different config, different brand.

### Big Muddy (ACTIVE — flagship)

**What:** Music-hospitality ecosystem, Natchez, Mississippi.
**Domains:** 6 live properties (touring, magazine, radio, entertainment, records, directory)
**Modules:** All 9 active.
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

### Bearsville Media Group (ACTIVE — summer 2026)

**What:** Northeast media imprint, Hudson Valley / Catskills.
**Domains:** bearsvillemediagroup.com, bearsvillemedia.com
**Modules:** Directory, Radio, Magazine, Studio
**Status:** Minimal node live. Full activation summer 2026.

### Future Clients

Any corridor, any industry, any town. The monorepo is cloneable at any level:
- **HDI level:** License the whole stack ("micro media company in a bottle")
- **Client level:** Activate specific modules for your industry
- **Module level:** Just the directory, just the radio, just the content pipeline

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

## What Each Domain Does

| Domain | Layer | Audience | Purpose |
|---|---|---|---|
| hillbillydreamsinc.com | HDI | Investors, partners | Holding company. Minimal. |
| measurablybetter.life | MBT | Consumers, operators, licensees | AI agent product + platform overview |
| deepsouthdirectory.com | MBT (business skin) | Business owners | Directory + marketing services |
| bigmuddytouring.com | Big Muddy | Music fans, bands, venues | The touring circuit |
| bigmuddymagazine.com | Big Muddy | Readers, tourists | Editorial content |
| bigmuddyradio.com | Big Muddy | Listeners | Streaming radio |
| bigmuddyentertainment.com | Big Muddy | Industry, talent | Entertainment umbrella |
| bigmuddyrecords.com | Big Muddy | Artists, music buyers | Record label + store |
| bearsvillemediagroup.com | Bearsville | Hudson Valley audience | Northeast media imprint |
| outsidereconomics.com | Editorial | Readers, thinkers | Economic philosophy publishing |
| tuthilldesign.com | Partner | Design clients | Partner design studio |
| studiocvideo.com | Partner | Production clients | Partner production studio |

---

## The Rules

1. **Build for Big Muddy first.** If a feature helps Big Muddy run better, build it. If it's good enough to sell, package it later.
2. **MBT is the platform, not a separate product to build.** The codebase IS MBT.
3. **Same engine, different skins.** Consumer AI and business marketing are the same platform with different tenant configs.
4. **The monorepo is cloneable at any level.** HDI sells the stack. Clients buy modules.
5. **Shows are the engine.** Every show feeds every module. Book the shows, the flywheel does the rest.
6. **Non-exclusive.** Artists keep masters. Bands can release elsewhere. Low friction = more artists.
7. **Photography first.** Real photos, not AI illustrations. The design serves the image.
8. **Dogfood before selling.** Run it on ourselves. Know what works. Then sell what's proven.

---

*This document is the source of truth. If any other doc, page, or agent contradicts this, this document wins.*
