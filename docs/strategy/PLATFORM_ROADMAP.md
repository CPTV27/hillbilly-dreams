# Big Muddy Media — Platform Roadmap & Business Services Model

**Last updated:** 2026-03-16
**Status:** Strategic planning — pre-launch

---

## The Vision

Big Muddy Media is a **media-as-a-service platform** for small businesses along the Mississippi corridor. We built a multi-brand media engine to run our own properties (The Inn, Magazine, Radio, Touring, Outsider Economics). Now we productize that same infrastructure — AI content generation, social media management, local SEO, media production — and offer it to local businesses at price points that make sense for a restaurant in Natchez or a venue in Clarksdale.

The platform already exists. The five brands prove the model works. The next step is opening the door.

---

## Part 1: What We're Selling

### The Problem for Local Businesses

Small businesses along the corridor face the same handful of problems:

1. **No content engine.** They post when they remember. No strategy, no consistency.
2. **No media production.** A phone photo of today's special. Maybe a Canva flyer.
3. **No local SEO.** Google Business Profile unclaimed or stale. No review strategy.
4. **No social presence.** One platform, sporadic posts, no cross-posting.
5. **No analytics.** They don't know what's working because they can't measure it.
6. **No budget for agencies.** Traditional agencies charge $2k–$5k/month. A 40-seat restaurant in Vicksburg isn't paying that.

### What We Offer

The same stack we built for ourselves — but pointed at their brand:

| Capability | Our Stack | Their Version |
|---|---|---|
| AI content generation | Claude API + brand voice profiles | Same engine, their voice |
| Social media management | Admin dashboard, multi-platform | Same dashboard, their accounts |
| Image generation/enhancement | Vertex AI Imagen + Sharp pipeline | Same tools, their branding |
| Local SEO | Google Reviews strategy, structured data | Setup + ongoing optimization |
| Newsletter/email | Beehiiv integration | Managed campaigns |
| Media production | Remotion video pipeline, photography | Content packages |
| Website | Multi-tenant Next.js platform | Managed microsite or landing page |
| Analytics | Dashboard metrics | Monthly report |

---

## Part 2: Tiered Pricing Model

### Design Principles

- **Low entry point.** A business owner should be able to say yes without a meeting.
- **Value ramp.** Each tier unlocks capabilities that create visible results, making the next tier feel obvious.
- **No contracts on Tier 1.** Month-to-month. Earn the relationship.
- **Annual discount on Tier 2+.** Reward commitment.
- **Corridor discount.** Businesses in our route cities get preferred pricing — they're also our content.

---

### Tier 1: "Front Porch" — $99/month

_The entry point. Low enough that any small business can try it._

**What they get:**
- Google Business Profile optimization (initial setup + monthly refresh)
- 12 social media posts/month (AI-generated, human-reviewed, 1 platform)
- Basic brand voice profile (we interview them once, build the voice)
- Monthly performance snapshot (1-page PDF: reviews, reach, engagement)
- Listed in Big Muddy Magazine's local business directory

**What it costs us to deliver:**
- ~15 min/month human review of AI-generated posts
- Automated GBP refresh via API
- Report auto-generated from analytics data

**Margin:** ~85% at scale (AI does the heavy lifting)

**Upgrade trigger:** "I want to be on Instagram AND Facebook" → Tier 2

---

### Tier 2: "The Route" — $299/month

_The workhorse tier. This is where most businesses should land._

**Everything in Front Porch, plus:**
- 30 social posts/month across 2–3 platforms (AI-generated, human-reviewed)
- 4 enhanced images/month (AI-enhanced photos of their space, food, events)
- Review response management (AI-drafted responses to Google/Yelp reviews, human-approved)
- Bi-weekly email newsletter (template-based, their content, our design)
- Featured in Big Muddy Magazine articles (when relevant to city guide coverage)
- Basic website or landing page (hosted on our platform, their subdomain)
- Quarterly strategy call (30 min)

**What it costs us to deliver:**
- ~45 min/month human review + strategy
- AI handles content generation, image enhancement, review drafting
- Newsletter template is reusable; content is AI-generated from their events/menu/news

**Margin:** ~75% at scale

**Upgrade trigger:** "Can you do a video for us?" or "We need help with an event" → Tier 3

---

### Tier 3: "River Room" — $599/month

_Full-service media management for businesses that are serious about growth._

**Everything in The Route, plus:**
- 60 social posts/month across all platforms
- 8 enhanced/generated images per month
- 2 short-form videos/month (Remotion-generated or edited from their footage)
- Full review management (respond to all reviews, flag issues, trend reporting)
- Weekly email campaigns
- Event promotion package (social blitz, email blast, calendar listing)
- Dedicated brand page on bigmuddymagazine.com
- Monthly strategy call (60 min)
- Priority placement in Big Muddy content (touring guides, radio spotlights)

**Margin:** ~65% at scale

**Upgrade trigger:** "Can you run our whole marketing?" → Tier 4

---

### Tier 4: "The Blues Room" — $1,200+/month (Custom)

_Enterprise-level for venues, hotels, tourism boards, and destination businesses._

**Everything in River Room, plus:**
- Custom content strategy (quarterly planning, competitive analysis)
- Professional photography session (quarterly, from our media team)
- Long-form video production (monthly brand story, event recap, or promo)
- Managed advertising (Google Ads, Meta Ads — ad spend separate)
- PR/media outreach (local press, travel bloggers, music journalists)
- White-label analytics dashboard
- Booking/reservation system integration (where applicable)
- Co-branded events with Big Muddy properties

**Margin:** ~50–60% (more human involvement)

---

### Add-Ons (Available at Any Tier)

| Add-On | Price | Notes |
|---|---|---|
| Additional social platform | +$49/mo | Per platform beyond tier limit |
| Extra video (short-form) | +$99 each | Remotion-generated |
| Professional photo session | +$299 | On-location, 20 edited images |
| Event promotion package | +$149 | Social blitz + email + calendar |
| Menu/offerings refresh | +$79 | Seasonal update across all channels |
| Crisis/review response | +$199 | Emergency reputation management |
| Website redesign | +$499 one-time | Full microsite rebuild |

---

### Revenue Projections

| Scenario | Clients | Mix | Monthly Revenue | Annual |
|---|---|---|---|---|
| **Seed (Month 3)** | 5 | 3×T1, 2×T2 | $895 | $10,740 |
| **Growth (Month 6)** | 15 | 6×T1, 6×T2, 2×T3, 1×T4 | $4,788 | $57,456 |
| **Scale (Month 12)** | 30 | 10×T1, 12×T2, 5×T3, 3×T4 | $11,183 | $134,196 |
| **Cruise (Month 24)** | 60 | 15×T1, 25×T2, 12×T3, 8×T4 | $24,063 | $288,756 |

_Assumes no add-on revenue and no annual discount. Real numbers will be higher._

---

## Part 3: Platform Buildout Roadmap

### Phase 0: Ship What We Have (Now → Week 2)

_Deploy the foundation. Everything here is built or nearly built._

- [ ] **Run Prisma migration on production DB** — SocialAccount and SocialPost tables
- [ ] **Set ANTHROPIC_API_KEY in Firebase Secret Manager** — enables AI content generation
- [ ] **Seed DB from static content** — articles, playlists, events into PostgreSQL
- [ ] **Commit video pipeline** — apps/video/ with 30 Remotion compositions
- [ ] **Push all pending changes** — articles index fix is deployed; social system needs migration

**Result:** Admin dashboard fully operational with real DB-backed content.

---

### Phase 1: Multi-Tenant Client System (Weeks 2–4)

_Turn the single-admin system into a client-serving platform._

- [ ] **1a. Client model in Prisma** — `Client` table: name, slug, brand voice, platforms, tier, billing status
- [ ] **1b. Client onboarding flow** — `/admin/clients/new` — intake form that captures business info, voice, platforms, goals
- [ ] **1c. Brand voice generator** — Use Claude to generate a voice profile from the intake form (like we did for our 5 brands)
- [ ] **1d. Per-client content queue** — Filter social posts, images, newsletters by client in admin
- [ ] **1e. Client dashboard** — Read-only view for clients: their posts, their metrics, their calendar

**Technical:** Extend the existing SocialAccount model with a `clientId` foreign key. Add Client to Prisma schema. Reuse existing admin components with client filtering.

---

### Phase 2: Content Automation Engine (Weeks 4–8)

_Make AI-generated content the default, with human review as the quality gate._

- [ ] **2a. Content calendar generator** — AI generates a month of posts for a client based on their voice + upcoming events + seasonal hooks
- [ ] **2b. Approval workflow** — Draft → Review → Approved → Scheduled → Published pipeline with email notifications
- [ ] **2c. Auto-scheduling** — Posts auto-schedule to optimal times per platform (configurable per client)
- [ ] **2d. Image generation per client** — Use Imagen with client brand context (their colors, their space, their food)
- [ ] **2e. Review monitoring + response drafting** — Poll Google Business Profile API, draft responses via Claude, queue for approval

**Technical:** New `ContentCalendar` model. Cron job (Cloud Scheduler) for weekly content generation. Google Business Profile API integration.

---

### Phase 3: Publishing Pipeline (Weeks 6–10)

_Actually post to platforms, not just draft content._

- [ ] **3a. Twitter/X API integration** — OAuth 2.0, post creation, media upload
- [ ] **3b. Instagram/Facebook (Meta Graph API)** — Business account posting via API
- [ ] **3c. TikTok API** — Video upload + caption posting
- [ ] **3d. Google Business Profile posting** — Direct post to GBP (events, offers, updates)
- [ ] **3e. Bluesky AT Protocol** — Post creation (simpler API, good for early adoption)
- [ ] **3f. LinkedIn API** — Company page posting
- [ ] **3g. Publishing queue** — Retry logic, rate limiting, error handling, status tracking

**Technical:** Each platform gets a `publisher` module in `packages/publishers/`. Shared interface: `publish(post: SocialPost, account: SocialAccount): Promise<PublishResult>`. Cloud Functions or Cloud Run jobs for scheduled publishing.

---

### Phase 4: Local SEO & Reviews (Weeks 8–12)

_The highest-ROI service for local businesses._

- [ ] **4a. Google Business Profile API integration** — Claim, verify, optimize programmatically
- [ ] **4b. Review aggregation dashboard** — Pull reviews from Google, Yelp, TripAdvisor into one view
- [ ] **4c. AI review response engine** — Claude drafts responses matching the business voice, queued for approval
- [ ] **4d. Review request automation** — Post-visit email/SMS with direct review links (timing configurable)
- [ ] **4e. Local SEO audit tool** — Automated check: NAP consistency, categories, photos, posts, Q&A completeness
- [ ] **4f. Structured data injection** — Schema.org LocalBusiness, Restaurant, Event markup for client sites
- [ ] **4g. Competitor monitoring** — Track review counts/ratings of nearby competitors

**Technical:** Google My Business API (now Google Business Profile API). Review polling via cron. Store reviews in new `Review` model.

---

### Phase 5: Newsletter & Email (Weeks 8–12, parallel with Phase 4)

_Email is still the highest-converting channel for local businesses._

- [ ] **5a. Beehiiv API integration** — Create publications, manage subscribers, send campaigns
- [ ] **5b. Email template library** — 5–10 templates: restaurant weekly, venue events, hotel deals, general business
- [ ] **5c. AI newsletter composer** — Generate newsletter content from client's recent posts, events, and promotions
- [ ] **5d. Subscriber capture widgets** — Embeddable signup forms for client websites
- [ ] **5e. Campaign analytics** — Open rates, click rates, subscriber growth per client

**Technical:** Beehiiv API v2. Templates stored in DB. Generation via Claude API with client voice profile.

---

### Phase 6: Video & Media Production (Weeks 10–14)

_Visual content at scale — the differentiator._

- [ ] **6a. Remotion render pipeline** — Batch render videos from templates + client data
- [ ] **6b. Client video templates** — Restaurant spotlight, event promo, testimonial, seasonal special
- [ ] **6c. Photo enhancement service** — Upload → enhance → deliver workflow for client photos
- [ ] **6d. AI image generation for clients** — Menu items, ambiance shots, event graphics with client branding
- [ ] **6e. Media library per client** — Organized storage, tagging, search
- [ ] **6f. Content-to-video pipeline** — Turn a social post or article into a 15-second video automatically

**Technical:** Cloud Run job for Remotion rendering. GCS bucket per client (or prefix-based separation). Existing Sharp + Imagen pipeline extended with client context.

---

### Phase 7: Analytics & Reporting (Weeks 12–16)

_Prove the value. This is what keeps clients paying._

- [ ] **7a. Unified analytics dashboard** — Per-client view: social reach, engagement, reviews, email, website
- [ ] **7b. Automated monthly report** — PDF generated and emailed to client: what we did, what happened, what's next
- [ ] **7c. ROI tracking** — Connect social/review activity to business outcomes (reservations, calls, direction requests)
- [ ] **7d. Benchmark comparisons** — How they stack up vs. similar businesses in their city
- [ ] **7e. Admin overview** — All clients at a glance: health scores, churn risk, upsell opportunities

**Technical:** New `AnalyticsSnapshot` model (daily aggregation). Report generation via Puppeteer or React-PDF. Platform APIs for metrics pull.

---

### Phase 8: Client Portal & Self-Service (Weeks 14–18)

_Let clients see what's happening and participate when they want to._

- [ ] **8a. Client login** — Separate auth flow (not admin). Email + magic link.
- [ ] **8b. Content calendar view** — See upcoming posts, approve/reject, suggest changes
- [ ] **8c. Media upload** — Client uploads photos/videos for us to use in their content
- [ ] **8d. Event submission** — Client adds events that auto-populate their content calendar
- [ ] **8e. Billing & plan management** — See current tier, upgrade, add-ons, invoices
- [ ] **8f. Support/chat** — In-app messaging to their account manager

**Technical:** New `/portal` route group with client-scoped auth. Reuse admin components with restricted permissions.

---

### Phase 9: Billing & Operations (Weeks 14–18, parallel with Phase 8)

_Get paid. Scale operations._

- [ ] **9a. Stripe integration** — Subscription billing for tiers, one-time charges for add-ons
- [ ] **9b. Usage tracking** — Posts generated, images created, videos rendered per client per month
- [ ] **9c. Capacity planning** — How many clients can one human reviewer handle per tier
- [ ] **9d. Onboarding automation** — Client signs up → intake form → voice profile → first month content generated → review queue
- [ ] **9e. Churn detection** — Flag clients with declining engagement or approaching contract end

**Technical:** Stripe Billing API. Usage metering stored in DB. Webhooks for subscription events.

---

### Phase 10: Corridor Network Effects (Ongoing)

_The flywheel that makes this defensible._

- [ ] **10a. Cross-promotion engine** — Clients in the same city promote each other ("Dinner at [restaurant], then live music at [venue]")
- [ ] **10b. Big Muddy Magazine integration** — Client businesses featured in city guide articles (earned media, not ads)
- [ ] **10c. Big Muddy Radio mentions** — Client events announced on playlists/podcasts
- [ ] **10d. Touring tie-ins** — Client businesses as stops on the Big Muddy route
- [ ] **10e. Event packaging** — Bundle client offerings ("Weekend in Natchez: Inn + Blues Room + [restaurant] + [tour]")
- [ ] **10f. Corridor-wide campaigns** — Seasonal marketing across all client businesses (Mississippi Music Month, etc.)
- [ ] **10g. Local business directory** — SEO-optimized, magazine-quality pages for every client

**This is the moat.** No agency can offer "we'll feature you in our magazine, mention you on our radio station, and include you in our touring guide" — because they don't own the media properties. We do.

---

## Part 4: Technical Architecture for Scale

### Current Stack (Proven)

```
Next.js 14 (App Router) → Firebase App Hosting → Cloud Run
PostgreSQL (Neon) via Prisma ORM
Google Cloud Storage (images/media)
Vertex AI Imagen 3.0 (image generation)
Claude API (content generation)
NextAuth v5 (Google OAuth)
Turborepo monorepo (apps + packages)
```

### Additions Needed

```
Platform Publishing APIs (Twitter, Meta, TikTok, Bluesky, LinkedIn)
Google Business Profile API (reviews, posts, insights)
Beehiiv API (email campaigns)
Stripe Billing API (subscriptions, invoicing)
Cloud Scheduler (cron jobs for content generation, publishing, review polling)
Cloud Functions or Cloud Run Jobs (async processing)
Puppeteer or React-PDF (report generation)
Remotion Cloud (video rendering at scale)
```

### Data Model Extensions

```prisma
model Client {
  id              Int       @id @default(autoincrement())
  name            String
  slug            String    @unique
  tier            String    @default("front-porch") // front-porch | route | river-room | blues-room
  businessType    String    // restaurant | venue | hotel | shop | tour | other
  city            String
  state           String
  voiceProfile    Json      // AI-generated brand voice document
  platforms       String[]  // which social platforms they're on
  gbpPlaceId      String?   // Google Business Profile place ID
  stripeCustomerId String?
  status          String    @default("onboarding") // onboarding | active | paused | churned
  onboardedAt     DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  accounts        SocialAccount[]
  posts           SocialPost[]
  reviews         Review[]
  reports         Report[]
  @@index([city])
  @@index([tier, status])
}

model Review {
  id          Int       @id @default(autoincrement())
  clientId    Int
  client      Client    @relation(fields: [clientId], references: [id])
  platform    String    // google | yelp | tripadvisor
  externalId  String    @unique
  author      String
  rating      Int
  text        String?   @db.Text
  response    String?   @db.Text
  responseStatus String @default("pending") // pending | drafted | approved | posted
  postedAt    DateTime
  respondedAt DateTime?
  createdAt   DateTime  @default(now())
  @@index([clientId, platform])
  @@index([responseStatus])
}

model ContentCalendar {
  id          Int       @id @default(autoincrement())
  clientId    Int
  month       Int
  year        Int
  posts       Json      // Array of planned post objects
  status      String    @default("draft") // draft | review | approved | active
  generatedAt DateTime  @default(now())
  approvedAt  DateTime?
  @@unique([clientId, month, year])
}

model Report {
  id          Int       @id @default(autoincrement())
  clientId    Int
  client      Client    @relation(fields: [clientId], references: [id])
  month       Int
  year        Int
  data        Json      // Metrics snapshot
  pdfUrl      String?   // GCS URL for generated PDF
  sentAt      DateTime?
  createdAt   DateTime  @default(now())
  @@unique([clientId, month, year])
}
```

---

## Part 5: Go-to-Market

### Launch Strategy

**Month 1: Prove it with 3 friends.**
- Hand-pick 3 businesses in Natchez that we already know (restaurant, shop, venue)
- Offer Tier 1 free for 60 days in exchange for testimonials and feedback
- Deliver manually what we'll later automate — learn the workflow

**Month 2: Refine and charge.**
- Onboard 2 more at Tier 1 ($99/month, no contract)
- Upsell 1–2 of the beta businesses to Tier 2
- Build the case studies from Month 1 results

**Month 3: Expand the corridor.**
- Launch in Vicksburg and Clarksdale (we already have city guide content there)
- Target 10 clients across 3 cities
- First "Corridor Campaign" — cross-promote all clients in a seasonal push

**Month 4–6: Scale the machine.**
- Automate content generation and publishing (Phases 2–3 of technical roadmap)
- Hire first part-time content reviewer ($20/hr, 10 hrs/week)
- Target 15–20 clients, $4k–$6k MRR

**Month 6–12: Regional expansion.**
- Open to all 18 corridor cities (Memphis → Branson loop)
- Launch client portal (self-service)
- Target 30+ clients, $10k+ MRR
- First Blues Room tier client (likely a tourism board or destination hotel)

### Sales Channel

The magazine IS the sales funnel. Every city guide we publish is a warm intro to every business we mention. "Hey, we featured you in our Natchez guide — want us to help you with your social media too?"

The radio is the relationship builder. Feature a venue's live music → they become a client for their broader marketing needs.

The touring route is the network. Every stop on the route is a potential client and a referral source.

---

## Part 6: What Makes This Defensible

1. **We own the media.** Agencies rent attention. We own the magazine, the radio station, the touring brand. Client businesses get distribution through our properties — no one else can offer that.

2. **AI economics.** Content generation at $99/month is only possible because Claude and Imagen do 90% of the work. Traditional agencies need humans for everything. We need humans for quality control.

3. **Corridor network effects.** Every client we add makes the network more valuable for every other client. Cross-promotion, event packaging, corridor campaigns — these only work at density.

4. **Brand voice at scale.** We've proven we can create distinct, authentic brand voices for 5 different properties. That same engine works for 50 or 500 local businesses.

5. **Vertical integration.** Content → distribution → booking → commerce. We're not just posting on social media. We're driving people down the corridor, into the businesses, spending money.

---

## Execution Priority

| Priority | Phase | Effort | Revenue Impact |
|---|---|---|---|
| NOW | Phase 0: Ship what we have | 1 week | Unblocks everything |
| HIGH | Phase 1: Client system | 2 weeks | Enables onboarding |
| HIGH | Phase 2: Content automation | 3 weeks | Core product |
| HIGH | Phase 4: Local SEO & Reviews | 3 weeks | Highest ROI for clients |
| MEDIUM | Phase 3: Publishing pipeline | 3 weeks | Automation, not revenue |
| MEDIUM | Phase 5: Newsletter | 2 weeks | Tier 2+ differentiator |
| MEDIUM | Phase 9: Billing | 2 weeks | Get paid |
| LOWER | Phase 6: Video | 3 weeks | Tier 3+ differentiator |
| LOWER | Phase 7: Analytics | 3 weeks | Retention tool |
| LOWER | Phase 8: Client portal | 3 weeks | Scale enabler |
| ONGOING | Phase 10: Network effects | Continuous | The moat |

---

_This document is the operating plan. Update it as phases complete._
