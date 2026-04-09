# Architecture Review Briefing — Hillbilly Dreams Inc / MBT

*April 8, 2026. Paste this entire document into your session. Read everything before responding.*

---

## Your Role

You are an external technical and business architecture reviewer. We need you to evaluate the business model, data architecture, technical stack, and 24-hour shipping plan for a company called Hillbilly Dreams Inc (HDI). Be blunt. Tell us what's strong, what's weak, what's missing, and what you'd change.

---

## PART 1: THE BUSINESS

### What We Are

Hillbilly Dreams Inc is a media-hospitality ecosystem anchored in Natchez, Mississippi. One Next.js codebase, one Vercel deployment, multiple brands across two regions.

### The Structure

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

- **HDI** = Parent company. Contracts, partnerships, IP. Legal entity: FarleyPierson LLC. Equal thirds equity: Chase Pierson, Tracy Alderson-Allen, Amy Alderson-Allen.
- **MBT (Measurably Better Things)** = Licensed civic-commerce operating system sold to institutions. The product.
- **Big Muddy** = Flagship proof market. Music-hospitality ecosystem in Natchez, MS. Customer zero.
- **Deep South Directory (DSD)** = Public business/participation layer of MBT. Brand-visible, architecturally subordinate.
- **Studio C** = Implementation + media services arm. Chase 40% owner.
- **Bearsville** = Northeast node (Woodstock, NY). Summer 2026 activation.

### The Business Model Pivot (April 8, 2026)

MBT was previously positioned as self-serve SaaS with individual tier pricing (Free/$25/$50/$99/$250). As of today, MBT is repositioned as a **licensed civic-commerce operating system** sold to institutions.

**Why the pivot:** Self-serve SaaS requires polished UI, massive marketing, and low-ticket churn management. The institutional path has a clearer buyer with budget, higher ticket, stickier relationships, and a reason all the pieces (directory + media + publishing) belong together.

**What MBT actually sells:** Coordination capacity. Not a tool people sign up for individually — a community operating agreement, a local economic activation program, implemented with services, relationships, and software.

### The Multi-Stakeholder Model

Multiple institutions can operate in the same market simultaneously. Programs stack, not compete.

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 1: MUNICIPAL                                     │
│  City / Tourism Bureau / Visit Natchez                  │
│  Buys: City-wide program                                │
│  Gets: Directory, reporting, tourism metrics,           │
│        grant justification, economic dev proof           │
│  Incentive: Tourism dollars, funder ROI                  │
├─────────────────────────────────────────────────────────┤
│  LAYER 2: BUSINESS LEADERS / BROKERAGES                 │
│  Local broker, Realtor association, Main Street org      │
│  Buys: Sponsor program (pays to upgrade businesses)     │
│  Gets: Monthly reports on street vitality, foot traffic  │
│  Incentive: Vibrant Main Street = higher property values │
├─────────────────────────────────────────────────────────┤
│  LAYER 3: VENUE / HOSPITALITY CLUSTERS                  │
│  Inn operators, restaurant groups, venue networks        │
│  Buys: Cluster program for their portfolio              │
│  Gets: Coordinated promotion, event-to-listing pipeline  │
│  Incentive: Cross-promotion, tourism capture             │
├─────────────────────────────────────────────────────────┤
│  PARTICIPANTS: INDIVIDUAL BUSINESSES                     │
│  Restaurants, shops, studios, musicians, services        │
│  Join: One or more programs above (or self-serve)        │
│  Get: Listing, promotion, media, measurement             │
│  Cost: $0 (sponsored) or self-serve ($99/$250)           │
└─────────────────────────────────────────────────────────┘
```

### Two Pricing Tracks

**Primary (Institutional):** Setup fee + annual platform license + optional service packages. Program sale, not a tier chart. Each engagement is a tailored proposal.

**Secondary (Individual/Self-Serve):** For walk-in businesses not part of a program: Free / $99 Marketing / $250 Engine.

### The Flywheel

```
Shows → Recordings → Records releases
  ↓                        ↓
Magazine features    Radio rotation
  ↓                        ↓
Social media posts   Audience growth
  ↓                        ↓
Directory listings → Program participants
  ↓                        ↓
Venue partnerships   Inn bookings
  ↓                        ↓
More shows ←─────────────┘
```

Every show has a 2:1 ecosystem multiplier. A $1,000 show generates $500+ in downstream revenue.

### The 9 Modules

| Module | What It Does |
|---|---|
| Directory | AI-powered business listings, review monitoring, competitor watch, report cards |
| Magazine | Editorial content pipeline — articles, city guides, photo essays |
| Radio | Streaming infrastructure — shows, playlists, live sessions |
| Records | Artist services — catalog, sessions, distribution. Non-exclusive. |
| Touring/Events | Booking, ticketing, event management, show-to-content pipeline |
| Commerce | Storefront, payments, subscriptions, Stripe Connect |
| Broadcasting | Live production — OBS, Icecast, multi-stream |
| AI Content Pipeline | Social posts, spotlights, voice profiles. Gemini + Claude. |
| Analytics | Monthly report cards, Google review alerts, competitor snapshots |

### Target Markets

**Natchez, MS (customer zero):** 14,000 residents, 700,000 annual visitors, 400+ new businesses since 2020, $100M in building permits. Entry points: Downtown Natchez Alliance (nationally accredited Main Street program), Natchez Inc. (economic development), Visit Natchez (CVB), one real estate brokerage.

**El Dorado, AR (second market):** 17,000 population. $54M Murphy Arts District, $50M El Dorado Promise (universal college tuition), $25M Murphy USA Charitable Foundation. Voter-approved 1% sales tax generating $12M+/year. $1.5B Standard Lithium plant starting construction mid-2026. Entry: Tracy's high-level relationships, El Dorado Wins Board, new Chamber CEO.

---

## PART 2: THE TECH STACK

### Current Architecture

- **Framework:** Next.js 14.2 App Router, TypeScript, Inline CSS (no Tailwind)
- **Database:** Neon PostgreSQL via Prisma ORM
- **Auth:** next-auth v5 (but no end-user auth exists — admin only)
- **Deploy:** Vercel ($20/mo Pro plan)
- **Storage:** GCS bucket `bmt-media-bigmuddy`, Cloudflare R2
- **DNS:** All 14 domains in Cloudflare, gray cloud, A → 76.76.21.21
- **Broadcasting:** Mac mini (192.168.4.37) running OpenBroadcaster + Icecast in Docker

### Domain Routing (Current)

14+ domains route to route groups via hostname matching in middleware:

```
bigmuddytouring.com      → /touring (default)
bigmuddymagazine.com     → /magazine
bigmuddyradio.com        → /radio
deepsouthdirectory.com    → /directory
bigmuddyrecordlabel.com  → /records
bigmuddyentertainment.com → /entertainment
outsidereconomics.com     → /economics
measurablybetter.life     → /measurably-better
hillbillydreamsinc.com    → /hillbilly
studiocvideo.com          → /studioc
bearsvillemediagroup.com  → /bearsville
```

### Content Management (Current)

No CMS. 18 articles hardcoded in `apps/web/lib/articles.ts`. Comment in code: "Replace with prisma queries once DATABASE_URL is connected." Tracy and Amy cannot edit content without a developer.

### What Does NOT Exist Yet

- End-user auth (no login, no sessions for customers)
- CMS (articles hardcoded)
- Monitoring (no Sentry, no PostHog)
- Public radio streaming (Mac mini on local network only)
- Institutional admin console (data models exist, no UI)

---

## PART 3: THE DATA MODEL

### Existing Models (Production)

Key models already in Prisma schema (2800+ lines):

- **DirectoryBusiness** — public listings with Google/Yelp enrichment, geo coordinates, tier system, visibility controls, musician fields, corridor/touring links
- **Client** — paid DSD subscribers with tier, status lifecycle, Stripe Connect, voice profiles
- **Artist** — 31 seeded, with genre, streaming links, Spotify/MusicBrainz enrichment
- **TouringVenue/Hotel/Restaurant/Route** — 13 cities, 26 venues, 20 hotels seeded
- **Article, Event, Playlist, NewsletterIssue** — content models
- **SocialAccount, SocialPost, PublishJob** — social media pipeline
- **Review, ContentCalendar, Report, Invoice** — client service models
- **Track, Split, SyncOpportunity, RoyaltyPayment** — full records/music catalog
- **User** — sovereign tier system, credit wallet, guild referrals (admin/ops/artist/viewer roles)
- **Embedding** — pgvector for semantic search (768-dim, Vertex AI)
- **CensusData, EconomicIndicator** — regional economic data
- **EnrichmentJob** — async queue for Google Places, Yelp, embedding generation
- **AgentContext, AgentAction** — shared brain for AI agent swarm

### New Institutional Models (Just Added, Migration Ready)

```prisma
enum OrganizationType {
  TOWN
  TOURISM_BUREAU
  CHAMBER
  MAIN_STREET_ORG
  BROKERAGE
  VENUE_CLUSTER
  HOSPITALITY_PORTFOLIO
  DISTRICT
  OTHER
}

enum ProgramStatus { DRAFT  ACTIVE  PAUSED  COMPLETED  ARCHIVED }
enum ParticipantStatus { INVITED  AGREEMENT_SENT  ONBOARDING  ACTIVE  SUSPENDED  CHURNED }
enum AgreementStatus { DRAFT  SENT  SIGNED  EXPIRED  CANCELLED }
enum AgreementType { LICENSE  IMPLEMENTATION  SERVICE_PACKAGE  MERCHANT_ONBOARDING }

model Organization {
  id                String             @id @default(cuid())
  name              String
  slug              String             @unique
  type              OrganizationType   @default(OTHER)
  contactName       String?
  contactEmail      String?
  contactPhone      String?
  address           String?
  city              String?
  state             String?
  zip               String?
  website           String?
  logoUrl           String?
  notes             String?            @db.Text
  stripeCustomerId  String?
  metadata          Json?              // Modules enabled, branding, config
  programs          Program[]
  agreements        InstitutionalAgreement[]
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
}

model Program {
  id                   String          @id @default(cuid())
  organizationId       String
  organization         Organization    @relation(...)
  name                 String
  slug                 String          @unique
  description          String?         @db.Text
  status               ProgramStatus   @default(DRAFT)
  startDate            DateTime?
  endDate              DateTime?
  targetBusinessCount  Int?
  namespace            String?         // Scoping: "deep_south_directory"
  config               Json?           // Modules enabled, tier defaults, branding
  participants         ProgramParticipant[]
  agreements           InstitutionalAgreement[]
  reports              ProgramReport[]
}

model ProgramParticipant {
  id                      String              @id @default(cuid())
  programId               String
  program                 Program             @relation(...)
  directoryBusinessId     Int
  directoryBusiness       DirectoryBusiness   @relation(...)
  status                  ParticipantStatus   @default(INVITED)
  sponsoredTier           String?             // Overrides DirectoryBusiness.tier
  joinedAt                DateTime?
  onboardingCompletedAt   DateTime?
  notes                   String?             @db.Text
  metadata                Json?
  onboardingTasks         OnboardingTask[]
  @@unique([programId, directoryBusinessId])  // One participation per program
}

model InstitutionalAgreement {
  id                String            @id @default(cuid())
  organizationId    String
  organization      Organization      @relation(...)
  programId         String?           // Null = org-level, set = program-specific
  program           Program?          @relation(...)
  type              AgreementType     @default(LICENSE)
  status            AgreementStatus   @default(DRAFT)
  title             String
  description       String?           @db.Text
  setupFeeCents     Int?
  annualFeeCents    Int?
  startDate         DateTime?
  endDate           DateTime?
  signedAt          DateTime?
  signedByName      String?
  signedByEmail     String?
  documentUrl       String?
  terms             Json?             // Modules, scope, SLA
}

model ProgramReport {
  id              String    @id @default(cuid())
  programId       String
  program         Program   @relation(...)
  reportDate      DateTime
  periodStart     DateTime
  periodEnd       DateTime
  data            Json      // participantCount, listingsPublished, totalViews,
                            // totalClicks, totalLeads, eventsPromoted, etc.
  summary         String?   @db.Text  // AI-generated narrative
  pdfUrl          String?
  generatedAt     DateTime  @default(now())
  sentAt          DateTime?
  recipientEmails String[]
}

model OnboardingTask {
  id              String              @id @default(cuid())
  participantId   String
  participant     ProgramParticipant  @relation(...)
  taskType        String              // agreement_signed | form_completed | listing_approved |
                                      // assets_collected | listing_published | training_completed
  status          String              @default("pending") // pending | in_progress | completed | skipped
  completedAt     DateTime?
  completedByUserId String?
  notes           String?             @db.Text
}
```

**Key design decisions:**
- `ProgramParticipant.sponsoredTier` overrides `DirectoryBusiness.tier` when an institution pays for the business
- A business can participate in multiple programs (unique constraint on [programId, directoryBusinessId])
- `ProgramReport.data` is JSON so the metrics schema can evolve without migrations
- `DirectoryBusiness` gained an optional `organizationId` field (soft FK)
- All new fields on existing models are optional — no breaking changes

---

## PART 4: THE 24-HOUR SHIPPING PLAN

A technical architect produced this spec. We need you to evaluate it.

### Principle: Ship a Funnel + Content Engine, Not a Platform

We are not building a platform in 24 hours. We are building a funnel (measurablybetter.life) and a content engine (bigmuddytouring.com) that look like a platform. Auth is stripped for v1. Third-party systems handle it: Sanity for CMS auth, Stripe for payment auth, Cloudflare for edge routing.

### 1. System Architecture

- **DNS & Edge (Cloudflare):** All domains point here. Bulk Redirects handle 301s for deprecated domains before they hit Vercel.
- **Compute (Vercel):** Next.js 14 App Router monorepo. Serves bigmuddytouring.com (consumer) and measurablybetter.life (MBT institutional).
- **Database (Neon PostgreSQL):** Source of truth for institutional contracts, directory data, platform metadata.
- **CMS (Sanity):** Embedded at bigmuddytouring.com/studio. Source of truth for articles, events, Inn content. Sanity handles Tracy/Amy authentication.
- **Payments (Stripe):** Headless checkout via Payment Links. Stripe handles sessions; we listen via webhooks.
- **Media (Cloudflare R2 + GCS):** Existing media in GCS. New media through Sanity CDN or R2.
- **Broadcast (Mac mini):** OpenBroadcaster → Icecast → Cloudflare Tunnel → stream.bigmuddytouring.com

### 2. CMS: Sanity Integration

Sanity is NOT installed yet. Starting from scratch. 3 content schemas:

- **article** (Magazine): title, slug, author, publishedAt, heroImage, body (Portable Text with pullQuote + photoGallery blocks)
- **location** (Inn/Blue Room): name, type, hours, address, contact, heroImage, description
- **event** (Show Calendar): title, date, venue reference, ticketLink, artist, coverImage

**Important:** Directory data stays in Postgres (DirectoryBusiness model). It has enrichment pipelines, geo coordinates, ProgramParticipant relations, and tier overrides. Sanity is for editorial content only.

Data fetching: Next.js ISR with revalidate: 3600. Sanity webhook triggers on-demand revalidatePath() on publish.

### 3. Domain Consolidation

Big Muddy sub-domains become sections of bigmuddytouring.com. Redirects happen at Cloudflare edge (Bulk Redirects), NOT in Next.js middleware:

- bigmuddymagazine.com/* → bigmuddytouring.com/magazine/$1 (301)
- bigmuddyradio.com/* → bigmuddytouring.com/radio/$1 (301)
- bigmuddyentertainment.com/* → bigmuddytouring.com/entertainment/$1 (301)
- bigmuddyrecordlabel.com/* → bigmuddytouring.com/records/$1 (301)

Next.js middleware simplifies — it only sees traffic for active domains after Cloudflare handles redirects.

### 4. Radio Integration

Mac mini (192.168.4.37) → Cloudflare Tunnel → stream.bigmuddytouring.com

```bash
brew install cloudflared
cloudflared tunnel create radio-stream
cloudflared tunnel route dns radio-stream stream.bigmuddytouring.com
# Config: http://localhost:8010 (Icecast)
cloudflared tunnel run radio-stream
```

Web player at /radio: HTML5 audio tag → stream URL. "Now Playing" from Icecast status-json.xsl polled every 15s.

### 5. API Routes (Minimal)

| Route | Purpose |
|-------|---------|
| POST /api/webhooks/sanity | Revalidate pages on Sanity publish |
| POST /api/webhooks/stripe | Create Organization + InstitutionalAgreement on institutional purchase |
| GET /api/radio/now-playing | Proxy Icecast JSON (if CORS issues) |

### 6. Stripe Configuration

No user accounts = no Stripe Billing Portal. Payment Links only.
- Create MBT institutional products in Stripe
- "Initialize Program" buttons on measurablybetter.life href to Payment Links
- Payment Link collects billing address + organization name via custom field
- Webhook writes Organization + InstitutionalAgreement to Postgres

### 7. Deploy Sequence

1. Database: `npx prisma migrate deploy` (institutional models to Neon)
2. Mac Mini: Install + run Cloudflare Tunnel, verify stream.bigmuddytouring.com externally
3. Cloudflare Edge: Create Bulk Redirects (test on dummy domain first)
4. Vercel: Deploy with Sanity Studio, Stripe webhooks, restructured routes
5. Sanity: Run article migration script, hand Tracy/Amy the /studio URL

### 8. Risks

| Risk | Mitigation |
|------|-----------|
| Mac mini drops off network | Icecast fallback mount: 1-hour MP3 loop on R2 |
| Sanity image bandwidth exceeds free tier | Next.js Image Optimization for Sanity domains |
| Cloudflare redirects loop | Test on superchase.app before real domains |
| Prisma migration breaks existing queries | All new fields optional/nullable |

---

## PART 5: WHAT WE WANT YOU TO EVALUATE

Please review and provide your assessment on:

### Business Architecture
1. Does the civic-commerce OS model make sense as a business? Is the institutional buyer thesis credible?
2. Is the multi-stakeholder stacking model (city + broker + hospitality cluster) realistic or overengineered?
3. Is the pricing model (institutional program sales + self-serve fallback) the right approach?
4. What risks do you see in the business model that we might be blind to?

### Data Architecture
5. Is the institutional data model (Organization → Program → ProgramParticipant → OnboardingTask) well-designed? What would you change?
6. Is `ProgramReport.data` as JSON the right call, or should metrics be normalized into columns?
7. Does the `sponsoredTier` override pattern make sense for institutional-pays-for-business scenarios?
8. Are there missing models or relations we'll regret not having?

### Technical Architecture
9. Is the Sanity + Postgres split correct (editorial in Sanity, transactional/enriched data in Postgres)?
10. Is the Cloudflare Bulk Redirect approach for domain consolidation sound, or should it stay in middleware?
11. Is Cloudflare Tunnel the right approach for exposing the Mac mini radio stream?
12. Is stripping auth entirely for v1 (relying on Sanity auth + Stripe Payment Links) viable?
13. What's missing from the 24-hour shipping plan that will bite us?

### Strategic
14. Should we be building this ourselves or using an existing platform (WordPress + directory plugin, Webflow + Airtable, etc.)?
15. Is the 9-module architecture too ambitious for a 3-person team, or is the modular activation approach (only turn on what you need) sufficient?
16. What's the single biggest risk to this entire venture?

Be direct. We'd rather hear hard truths now than discover them after shipping.

---

## CONSTRAINTS FOR YOUR REVIEW

- 3-person team (Chase codes + sells, Tracy + Amy operate the Inn and manage finances)
- $20/mo Vercel Pro plan
- Natchez, MS — 14,000 population, 700,000 annual visitors
- Revenue comes from shows, the Inn, and (soon) institutional MBT licenses
- No outside funding. Bootstrapped.
- Photography-first design philosophy. Real photos, not stock.

---

*End of briefing. Please provide your complete assessment.*
