# Ecosystem Lens Dashboard — Multi-Perspective Org Viewer

## Mission

Build an interactive dashboard at `/admin/ecosystem` that shows the Big Muddy ecosystem from multiple strategic perspectives. One button click switches the entire view. Same data, different story.

## The Lenses

### 1. Audience Growth Lens
**Question it answers:** "How do we grow our audience?"

Show the funnel:
- **Discover** — How people find us (SEO, social, radio, word of mouth, directory, magazine)
- **Engage** — What keeps them (shows, content, community, newsletter)
- **Convert** — What they pay for (lodging, directory listing, prints, subscriptions)
- **Retain** — What brings them back (events, radio, magazine features, loyalty)

Each brand mapped to its role in the funnel:
- DSD/Directory → Discovery (tourists searching, businesses listing)
- Magazine → Engagement (stories keep people reading)
- Radio → Engagement + Retention (daily listening habit)
- Entertainment/Shows → Conversion (tickets, bar revenue)
- Inn → Conversion (room bookings)
- Photography → Conversion (print sales)
- OE/Economics → Thought leadership (attracts operators, not tourists)

**Live data:** subscriber counts, page views, show attendance, booking rates, social followers

### 2. Personnel & AI Lens
**Question it answers:** "Who does what, and where does AI fill the gaps?"

Show every role and whether it's human, AI, or hybrid:

| Function | Traditional Hire | Our Setup | AI Contribution |
|---|---|---|---|
| Social media manager | $3,500/mo | Content Studio | 90% AI-generated, human approves |
| Review manager | $2,000/mo | Delta Dawn + AI drafts | 95% AI-drafted, human sends |
| Radio DJ (18 shows) | 7 people, $15K/mo | OpenBroadcaster + AI characters | 100% automated playout, human programs |
| Photographer | $4,000/mo | Chase + AI enhancement | Human shoots, AI processes/enhances |
| Bookkeeper | $2,000/mo | Tracy + QuickBooks | Human oversight, AI categorization |
| Front desk | $2,500/mo | Amy + Delta Dawn | Human hospitality, AI handles FAQs |
| Booking agent | $3,000/mo | JP + Content Studio | Human books, AI promotes |
| Web developer | $8,000/mo | Claude Code agents | 95% AI-built, human directs |
| Magazine editor | $4,000/mo | Content Studio + Scout | AI drafts, human curates |
| Marketing director | $6,000/mo | Multi-model AI routing | AI generates strategy, human decides |

**Total traditional cost:** ~$50K/mo for 10 hires
**Our cost:** 3 humans + AI stack at ~$500/mo in API costs

**Live data:** tasks completed by AI vs human (from Asana), content pieces generated, API usage costs

### 3. Corporate Org Chart Lens (Viacom Model)
**Question it answers:** "What does this look like as a media conglomerate?"

```
Hillbilly Dreams Inc (Holding Company)
├── Big Muddy Touring (Hospitality Division)
│   ├── The Big Muddy Inn (Lodging)
│   ├── The Blues Room (Live Entertainment)
│   └── Corridor Tours (Travel Experiences)
├── Big Muddy Media (Content Division)
│   ├── Big Muddy Magazine (Publishing)
│   ├── Big Muddy Radio (Broadcasting)
│   └── Big Muddy Records (Music Label)
├── Big Muddy Entertainment (Talent Division)
│   ├── Rise Up (Artist Development)
│   └── Talent Search (Scouting)
├── Deep South Directory (SaaS Division)
│   ├── The Listing (Free tier)
│   ├── The Assistant ($20 AI tier)
│   ├── The Works ($49 Social tier)
│   └── The Engine ($99 Full tier)
├── Outsider Economics (Publishing/Education)
│   └── Field Manual, Toolkit, Resources
├── BuyCurious Art (Marketplace)
│   └── Chase Pierson Photography (Studio)
└── MBT Platform (Technology)
    ├── Vertex AI Pipeline (Generative AI)
    ├── Multi-tenant Infrastructure
    └── Broadcasting Stack (OB + Icecast + Plex)
```

**Live data:** revenue per division, headcount per division, active projects per division

### 4. Revenue Lens
**Question it answers:** "Where does the money come from?"

Revenue streams mapped by:
- **Recurring** — DSD subscriptions ($20-$99/mo per business), magazine subscriptions
- **Transactional** — Room bookings, bar sales, print sales, show tickets
- **Licensing** — Photography licensing, content syndication, platform licensing (LYRAI future)
- **Grants/Sponsorship** — Tourism board funding, arts council grants, municipal partnerships

Show each stream's current MRR/ARR, growth trajectory, and which division owns it.

**Live data:** Stripe MRR, CloudBeds revenue, bar receipts, print orders

### 5. Technology Stack Lens
**Question it answers:** "What infrastructure runs this?"

Visual map of every service, how they connect, and what they cost:
- Vercel (hosting) → 15 domains
- Neon (database) → public + private schemas
- GCS (storage) → media assets
- Vertex AI (generation) → images, video, audio, text
- OpenBroadcaster (radio) → 18 shows
- Plex (in-room) → 4 channels
- Postiz (social) → multi-platform publishing
- Stripe (payments) → subscriptions + marketplace

**Live data:** uptime, API usage, storage costs, deployment count

### 6. Flywheel Lens
**Question it answers:** "How do all the pieces feed each other?"

Animated circular diagram showing the ecosystem flywheel:
```
Shows → Audience → Bar Revenue → More Shows
         ↓
    Content (photos, video, articles)
         ↓
    Magazine + Radio + Social
         ↓
    Discovery (tourists find us)
         ↓
    Directory (businesses join)
         ↓
    Revenue (subscriptions)
         ↓
    Investment (better shows, more content)
         ↓
    [back to Shows]
```

Each node shows real-time metrics. Click any node to drill into that division.

## Implementation

### Route: `/admin/ecosystem`

### UI:
- Top bar: lens selector buttons (Audience | Personnel | Org Chart | Revenue | Tech | Flywheel)
- Click a lens → entire view transforms
- Each lens uses the same underlying data but presents it differently
- Animated transitions between lenses
- Every number is live from the database/APIs where possible

### Data Sources:
- Prisma: clients, events, articles, invoices, metrics
- Asana API: task counts by project
- Stripe: MRR, subscription counts
- Vercel: deployment count, domain list
- GCS: storage usage
- AgentContext: business intelligence

### Design:
- Dark theme matching admin
- Each lens has its own visual treatment:
  - Audience: funnel diagram
  - Personnel: comparison table with AI badges
  - Org Chart: tree/hierarchy
  - Revenue: bar charts + MRR ticker
  - Tech: service map with connection lines
  - Flywheel: circular animated diagram

## Files to Create:
1. `apps/web/app/admin/ecosystem/page.tsx` — Main page with lens selector
2. `apps/web/app/admin/ecosystem/AudienceLens.tsx`
3. `apps/web/app/admin/ecosystem/PersonnelLens.tsx`
4. `apps/web/app/admin/ecosystem/OrgChartLens.tsx`
5. `apps/web/app/admin/ecosystem/RevenueLens.tsx`
6. `apps/web/app/admin/ecosystem/TechStackLens.tsx`
7. `apps/web/app/admin/ecosystem/FlywheelLens.tsx`
8. `apps/web/app/api/ecosystem/metrics/route.ts` — Aggregated metrics endpoint

## Why This Matters:
This is the pitch deck that's always live. When Chase walks into a tourism board meeting, he opens one lens. When he talks to an investor, he opens another. When Tracy asks "what's our headcount equivalent," she opens Personnel. When JP asks "how do shows feed the rest of the business," he opens Flywheel. Same data, different story, always current.
