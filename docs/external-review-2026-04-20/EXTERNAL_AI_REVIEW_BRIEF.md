# Big Muddy / MBT — Comprehensive Ecosystem Brief

**For external AI review (Grok, Perplexity, Gemini, ChatGPT)**
**Prepared:** April 20, 2026
**Authors:** Chase Pierson + Claude Sonnet 4.6 (Cos)
**Length:** ~12,000 words. Designed to fit in any major model's context window.
**Reading order:** Sections 1–5 give business context. 6–10 give technical architecture. 11–13 give current state + gaps. 14 has explicit review prompts you can lift verbatim.

---

## Section 1 — One-Paragraph Executive Summary

Big Muddy is a vertically integrated media-and-hospitality ecosystem anchored in Natchez, Mississippi, run by a three-person equity partnership (Chase Pierson, Tracy Alderson-Allen, Amy Allen). It sits on top of a multi-tenant Next.js platform called MBT (Measurably Better Things LLC) which also powers a B2B product line — Deep South Directory — sold to small businesses in the lower Mississippi corridor. The ecosystem combines a 6-room Inn with a 50-seat live-music venue (Blues Room), an editorial magazine, a touring/booking arm with a Sprinter van, an early-stage record label, an internet radio station, and a network of partner studios (Tuthill Design, Studio C Video). A second-region clone (Bearsville Creative in Woodstock, NY) activates summer 2026. Year-1 revenue target is $760k Lean & Mean across all properties; conservative bottom-up pro forma totals $510k with the gap representing the primary sales challenge. The platform is built, deployed, and operating; the leadership team is being onboarded to the CMS and admin tools the morning this brief was written.

---

## Section 2 — Origin Story (One Paragraph)

In 2022, Chase designed a complete media production-to-distribution pipeline (the DeFacto Codec Market) — global media infrastructure built on open source: broadcast, production, analytics, distribution. He realized the same architecture that runs a Viacom can run a small-town media economy. Big Muddy is that architecture, applied to Main Street, powered by AI, anchored in the Mississippi corridor. The gap isn't technology — it's organization. That's what we sell.

---

## Section 3 — Business Architecture (Three Layers)

```
┌─────────────────────────────────────────────────────────────┐
│ LAYER 3 — IMPLEMENTATIONS                                   │
│ Big Muddy (Natchez, flagship)  │  Bearsville (NY, summer)  │
└─────────────────────────────────────────────────────────────┘
                          ▲
┌─────────────────────────────────────────────────────────────┐
│ LAYER 2 — MBT (Measurably Better Things LLC)                │
│ The Glass Engine: 9 modules + AI + multi-tenant infra       │
│   ├── Consumer brand: measurablybetter.life (B2B platform)  │
│   └── B2B product:    deepsouthdirectory.com (SMB-facing)   │
└─────────────────────────────────────────────────────────────┘
                          ▲
┌─────────────────────────────────────────────────────────────┐
│ LAYER 1 — HDI (conceptual holding; not formally incorporated)│
└─────────────────────────────────────────────────────────────┘
```

**Operating entity:** FarleyPierson LLC (EIN 81-4280721), being wound down in favor of MBT.
**MBT** (Measurably Better Things LLC) is the operating LLC for the technology platform.
**Big Muddy Touring LLC** is a separate filing in flight (road liability isolation).

---

## Section 4 — Brand Portfolio

### Operating brands today

| Brand | Domain | What it is | Status |
|-------|--------|-----------|--------|
| Big Muddy Inn | bigmuddyinn.com | 6-room Inn in Natchez with 50-seat Blues Room venue | Operating |
| Big Muddy Magazine | bigmuddymagazine.com | Editorial publication for Inn travelers; Sanity CMS | Operating; 10 new editorial articles published 2026-04-19 |
| Big Muddy Touring | bigmuddytouring.com | House band, booking, transport (Sprinter van), tour mgmt | Operating; site Sanity-driven |
| Big Muddy Records | (subdomain of touring) | Record label arm | Pre-revenue Y1 |
| Big Muddy Radio | bigmuddyradio.com | Internet radio + podcast network | Pre-launch (Q4 2026) |
| Big Muddy Entertainment | (subdomain of touring) | Umbrella for shows/events | Operating |
| Deep South Directory | deepsouthdirectory.com | B2B small-business marketing product | Operating; pricing locked Apr 5 2026 |
| Outsider Economics | outsidereconomics.com | Editorial side-project; field manual | Operating |

### MBT platform brands

| Brand | Domain | Status |
|-------|--------|--------|
| MBT (consumer) | measurablybetter.life | B2B platform overview |
| MBT (alias) | measurablybetterthings.com | Redirect |
| BuyCurious / Venture Gallery | buycurious.art | Gallery storefront, art commerce |

### Partner brands (third-party fulfilled, MBT licensed)

| Brand | Domain | Status |
|-------|--------|--------|
| Tuthill Design | tuthilldesign.com | Partner studio |
| Studio C Video | studiocvideo.com | Partner studio |
| Chase Pierson Photography | chasepierson.tv | Personal photography brand |

### Future / second-region

| Brand | Domain | Status |
|-------|--------|--------|
| Bearsville Creative | bearsvillemediagroup.com | Live, summer 2026 activation |
| Bearsville Creative (alias) | bearsvillemedia.com | Redirect |
| HDI Corporate | hillbillydreamsinc.com | Sparse holding page |

### DSD pricing (locked Apr 5 2026)

| Tier | Price | Target customer |
|------|-------|-----------------|
| Free | $0 | Onboarding entry |
| Essentials | $25/mo | Small Main Street businesses |
| Pro | $50/mo | Multi-location SMBs |
| Marketing | $99/mo | Active marketing accounts |
| Engine | $250/mo | Higher-end / agency-style accounts |

Walk-in sales pitch leads with value + region; pricing tiers are paid via Stripe payment links.

---

## Section 5 — Org Chart + Equity

### Equity partners (each one-third, Big Muddy holding)

| Person | Role | Daily focus | Email |
|--------|------|-------------|-------|
| Chase Pierson | CEO / CTO / Showrunner | Sales (tech, media, partner deals); platform direction; in NY frequently | me@chasepierson.tv |
| Tracy Alderson-Allen | Finance + Inn ops + Magazine editor | Books, budget, content approval, Inn day-of ops | tracyaldersonallen@gmail.com |
| Amy Allen | Inn + bar ops | Hospitality, bar, Blues Room day-of, performs as Arrie Aslin (artist-in-residence) | amyaldersonallen@gmail.com |

### Operations

| Person | Role | Status |
|--------|------|--------|
| JP Houston | Shows + programming | Deal not finalized; not named publicly |
| Elijah | Mac mini broadcasting + tech back-of-house | Active |
| Miles | Mac mini broadcasting + tech back-of-house | Active |
| Tuthill Design | Graphic design partner studio | Contracted |
| Studio C Video | Video production partner studio | Contracted |

### AI agent roster (shipping work)

| Agent | Provider | Function |
|-------|----------|----------|
| Cos (Claude Sonnet 4.6) | Anthropic | Chief of Staff; backend, Sanity, deploy ops |
| Patch (Claude Sonnet 4.6) | Anthropic | Technical Director; build, deploy, infrastructure |
| Claude Design 2 | Anthropic (Claude.ai design project) | Visual design system, frontend mockups |
| Delta Dawn | Multi-provider (Claude/Gemini) | Team-facing AI assistant for ops questions |
| Gemini 2.5 Pro | Google Vertex AI | Reasoning, content drafts, code review |
| Gemini 2.5 Flash | Google Vertex AI | Bulk generation |
| Imagen 3 | Google Vertex AI | Photorealistic image generation |
| ElevenLabs | ElevenLabs | Audio (provisioned, not yet wired) |

### Cap table

Equal thirds Chase / Tracy / Amy (Big Muddy holding). Option pool plus revenue-share models defined for additional contributors. JP Houston deal pending.

---

## Section 6 — Tech Stack

### Application

| Layer | Choice | Version | Notes |
|-------|--------|---------|-------|
| Framework | Next.js | 14.2.35 | App Router; intentionally on 14, NOT 16 (no Cache Components / proxy.ts migration) |
| Language | TypeScript | 5.5 | Strict mode |
| Styling | Tailwind 3.4 + CSS custom properties + inline styles | — | Token rules enforce `var(--font-*)`, `var(--bg)`, `var(--accent)`; Tailwind coexists |
| ORM | Prisma | 5.22 | Postgres dialect |
| Database | Postgres | (Neon serverless) | 21+ Phase C tables added Apr 19 |
| Auth | next-auth | v5 | Email-allowlist for admin; magic-link planned for customer portal |
| CMS | Sanity | v3 | 13+ schemas: article, contentTemplate, podcastEpisode, magazineIssue, showEvent, staff, partnerArtist, pressRelease, faq, pageContent, location, event, touringPage |
| Image picker | Custom Sanity plugin (bmm-library) | — | Pulls from GCS bmt-media-bigmuddy/approved/ — 229 real Chase photos |
| Email | Resend | (provisioned, partial) | Transactional via @bigmuddy/email module |
| Payments | Stripe | — | Checkout, subscriptions, customer portal, webhooks |

### Infrastructure

| Service | Vendor | Purpose |
|---------|--------|---------|
| Hosting | Vercel | Sole platform; one project (`hillbilly-dreams`) hosts 14 domains via middleware-based multi-tenant routing |
| DNS | Cloudflare | All 14 domains; gray cloud; A → 76.76.21.21, www CNAME → cname.vercel-dns.com |
| Object storage | GCS bucket `bmt-media-bigmuddy` | Photos, media; sub-prefix isolation per tenant (NOT per-bucket) |
| Object storage | Cloudflare R2 | Secondary storage |
| Database | Neon | Serverless Postgres |
| AI | Google Vertex AI | Gemini 2.5 Pro/Flash, Imagen 3 |
| AI | Anthropic | Claude Sonnet 4.6 (Cos, Patch, Design 2) |
| Audio | ElevenLabs | Provisioned, no SDK integration yet |
| Vault | Bitwarden | Single source of truth for credentials |
| Issues / project mgmt | Asana | Active |
| Background services | Mac mini at the Inn | OpenBroadcaster, Icecast, Plex, Postiz, Open Notebook — back-of-house only |

### Multi-tenant architecture

5 tenants share one Vercel deployment: `big-muddy`, `bearsville`, `studio-c`, `tuthill`, `dctv`.

Routing engine: `apps/web/middleware.ts` reads `apps/web/config/domain-routes.ts`, matches the request hostname against a substring table, rewrites the URL to the appropriate Next.js route group `app/(touring)`, `app/(magazine)`, etc. Same codebase serves every brand.

Multi-tenant isolation enforced at the event-bus layer (deny-by-default after 2026-04-19 fix; legacy bare `own` scope now hard-fails).

---

## Section 7 — The 9 Modules (Phase C Build)

Built and deployed Apr 17–19 2026 across 20+ commits. Each module is a workspace package under `packages/modules/` consumed by the Next.js app.

| Package | Responsibility | Key entities (Prisma) |
|---------|---------------|----------------------|
| `@bigmuddy/commerce` | Stripe subscriptions, plans, products, orders, webhooks, customer portal | Plan, Subscription, Product, Order, OrderItem |
| `@bigmuddy/booking` | Resources, bookings, tickets, quote requests, hold expiry | Resource, Booking, Ticket, QuoteRequest |
| `@bigmuddy/finance` | Engagements, retainer hours, MRR, P&L | ModuleEngagement, RetainerHour |
| `@bigmuddy/events` | Multi-tenant event bus with at-least-once delivery; FOR UPDATE SKIP LOCKED dispatch | BusEvent, EventHandler, EventDelivery |
| `@bigmuddy/broadcast` | Podcast + live broadcast + clip pipeline + Mac mini agent protocol | PodcastShow, PodcastEpisode, LiveBroadcast, BroadcastClip, BroadcastAgentInstruction |
| `@bigmuddy/social` | Voice routing + publisher (Postiz bridge — voice-gate exists, no auto-send wired) | (no models yet; runtime queue) |
| `@bigmuddy/content-creation` | AI Wizard backend; reads contentTemplate from Sanity, calls Gemini, writes draft article | (Sanity-side via wizardMeta) |
| `@bigmuddy/email` | Resend wrapper + brand-routed templates (welcome, receipt, shipping, refund, payment-failed, dunning) | (template registry) |
| `@bigmuddy/database` | Prisma client + migrations | All of the above |

### What flows through the event bus today

`directory.entry.created`, `directory.entry.updated`, `subscription.{activated,canceled,past_due}`, `order.{paid,fulfilled}`, `booking.{confirmed,cancelled}`, `ticket.scanned`, `quote.{submitted,accepted}`, `cms.document.updated`, `broadcast.{scheduled,ended}`, `clip.enriched`, `system.heartbeat`.

Worker dispatches via Vercel Cron (`/api/events/worker` every minute, `/api/cron/podcast-sync` hourly, `/api/booking/cron/expire-holds` every 10 minutes).

---

## Section 8 — Data Model Highlights

3,387 lines of Prisma schema across ~80 models. Key clusters:

**Commerce:** `Plan` (subscription template), `Subscription`, `Product`, `Order`, `OrderItem`. Stripe IDs lazy-created on first checkout via idempotency keys (race-safe after 2026-04-19 fix).

**Booking:** `Resource` (bookable inventory — show, slot, rental window), `Booking` (held/confirmed/checked-in/no-show/cancelled), `Ticket` (QR-coded individual seat), `QuoteRequest` (private events workflow).

**Events:** `BusEvent` (publish), `EventHandler` (registration), `EventDelivery` (per-handler attempt log with status, attempt count, lastError, completedAt).

**Broadcast:** `PodcastShow`, `PodcastEpisode`, `LiveBroadcast`, `BroadcastClip`, `BroadcastAgentInstruction` (Postgres-backed queue for Mac mini agent — fixed Apr 19; was in-memory).

**Finance:** `ModuleEngagement` (vendor-tenant, customer email, monthlyRevenueCents, platformFeePercent — denormalized for grandfathering when Plan price changes), `RetainerHour`.

**Sanity-side schemas (13):** article, contentTemplate, podcastEpisode, magazineIssue, showEvent, staff, partnerArtist, pressRelease, faq, pageContent, location, event, touringPage.

**Honest known issue:** Schema has many "soft FKs" — `String` IDs that reference other tables without `@relation` constraints. Flagged HIGH-severity in 2026-04-19 external Gemini code review. ~2-day refactor pending.

---

## Section 9 — Revenue Model + Pro Forma

### Year-1 target

**$760,000 "Lean & Mean"** — total ecosystem revenue Q2 2026 → Q1 2027 across all properties.

### Bottom-up base case (12-month, monthly)

| Brand | Annual Total | Notes |
|-------|--------------|-------|
| Big Muddy Inn | $268,800 | 6 rooms × $200 ADR × ramping occupancy 40% → 75% peak |
| Big Muddy Magazine | $11,000 | Sponsorship trickle Q3+; primary value is Inn conversion |
| Big Muddy Touring | $37,000 | Booking fees + door % + van rental margin |
| Big Muddy Records | $0 | Pre-revenue Y1 |
| Big Muddy Radio | $3,500 | Sponsor packages launch late Q4 |
| Deep South Directory | $106,100 | 5 walk-ins/day, 15% Essentials, 2% Pro, 0.5% Marketing, 2× Engine deals H2 |
| Tuthill Design (MBT licensing) | $37,000 | Project-based |
| Studio C Video (MBT licensing) | $49,000 | Project-based |
| Bearsville Creative | $0 | Setup year; revenue FY 2027-28 |
| **Bottom-up base case total** | **$510,800** | |
| **Stretch target** | **$760,000** | $249,200 gap = primary sales challenge |

### Cost structure (annual run-rate, rough)

- Operating costs (Inn property, payroll, utilities): ~$180k
- Platform costs (Vercel, Sanity, GCS, AI APIs, Resend, Stripe fees): ~$8k
- Touring costs (van, fuel, lodging, band guarantees): ~$25k
- Marketing (~$2k/mo): $24k
- Reserves (10%): ~$24k
- **Total run-rate:** ~$261k

### Margin

Inn gross margin estimated 60-65% post-payroll. DSD gross margin 90%+ (pure SaaS subscription). Touring gross margin variable, target 25%. Magazine margin negative until ad sales pick up.

### Cash position

6-month cash position: cautious; assumes early Inn occupancy and DSD trickle. 12-month: meaningfully positive at base case ($510k revenue – $261k costs ≈ $249k gross). At stretch, materially better.

### Quarterly milestones

**Q2 2026 (Apr-Jun):** Onboard Tracy + Amy to CMS (today). Hit 50 DSD free signups. Book 4 Blues Room shows. Launch first podcast episode. **Revenue target: $80k.**

**Q3 2026 (Jul-Sep):** Bearsville activation. First magazine sponsor. 100 DSD paid subscribers. **Revenue target: $120k.**

**Q4 2026 (Oct-Dec):** Holiday Inn occupancy peak. Records first release. **Revenue target: $155k.**

**Q1 2027 (Jan-Mar):** First Engine-tier DSD client. Bearsville first revenue. Platform partner #2 onboarded. **Revenue target: $155k.**

---

## Section 10 — What We've Shipped (Reverse Chronological)

### Today / overnight (2026-04-19 → 04-20)
- Magazine refresh: 10 new Tracy-voice editorial articles published; 14 off-mission archived
- AI imagery purged across Sanity (21 article docs) + 11 hardcoded TSX page files
- Big Muddy Touring page hero text moved right-aligned for readability
- Wrap design batch: production spec for Tuthill + 3 Imagen 3 mockups
- Sanity Studio photo-library plugin: thumbnail rendering bug fixed
- Sanity seed scripts: pageContent (6 docs) + contentTemplate (15 docs) committed
- Gemini external code review (gemini-2.5-pro): 3 CRITICAL + 4 HIGH + 3 MEDIUM findings closed
  - Event dispatcher race condition (FOR UPDATE SKIP LOCKED)
  - Broadcast agent in-memory queue → Postgres-backed
  - Multi-tenant event isolation: deny-by-default
  - Booking resource reserve race condition (atomic UPDATE)
  - IDOR via unscoped get() functions (added tenantId scoping)
  - Stripe Product/Price race condition (idempotency keys)
  - Vercel cron config added (events/worker, podcast-sync, booking/expire-holds)
  - Middleware unknown-host fallback warns + headers
  - DEPLOY_ROLLBACK_RUNBOOK fix (prisma migrate deploy in build sequence)
- Tracy + Amy onboarding package (8 docs, ~$0.10 in Gemini, 78s wall-clock)

### This week (2026-04-13 → 04-19)
- Phase C platform build: 7 new module packages, 21 Prisma models, 9 admin pages, 5 public pages, 33 API routes
- Sanity contentTemplate + pageContent schemas + seed
- Customer-facing /pricing, /shows, /private-events, /account/subscriptions, /checkout pages
- Deploy verification script: 16/16 green production
- Tenant provisioning CLI (`scripts/provision-tenant.mjs`)
- Mac mini broadcast agent v1 (HMAC protocol, polling cycle)
- 200+ AI-generated documentation files via 5 Gemini batches

### Earlier April 2026
- Apr 10: ElevenLabs API key provisioned
- Apr 8: MBT pivot to civic-commerce platform model
- Apr 5: DSD pricing locked at Free/$25/$50/$99/$250
- Apr 1: DSD claim ladder begins

### March 2026
- Mar 25: S2PX/Scan2Plan partnership dissolved (Owen Bush split)
- Mar 24: AG Phase 2 Wave 3 — middleware seam introduced

### Earlier
- Q1 2026: Civic-commerce pivot, ARPA reframing, MS HB 1571 redirect
- 2022: DeFacto Codec Market designed (origin story)

---

## Section 11 — What's NOT Done (Honest Gap List)

### Customer-facing
- Magic-link auth for `/account/subscriptions` (still email-lookup mode)
- Booking ticket checkout flow on `/shows` (mailto fallback only)
- Admin dashboard home (redirects to /admin/treasury)
- Wizard history page (`/admin/wizard-history`)
- Per-content-type wizard UI polish (different fields per content type)
- ~15 hardcoded pages still need CMS migration (Inn subpages, Radio, Records)
- Brand landing page React components for Bearsville, Studio C, Tuthill

### Platform / infra
- Soft-FK schema cleanup (Int IDs that reference other tables without @relation constraints) — HIGH severity per Gemini review, ~2-day refactor
- Mixed Int vs String/cuid id strategy (long-term migration; new models use cuid)
- Per-tenant GCS bucket isolation (currently shared bucket with prefix isolation)
- Magic-link auth implementation
- PgBoss activation for higher event-bus throughput (current dispatcher is database-backed but in-process)
- Sentry / Axiom observability wiring
- ElevenLabs SDK integration
- Postiz bridge (voice-gate exists, no auto-send)
- Image-tagging UI in Sanity Studio (interim plan: Google Sheet)

### Quality
- Zero automated tests across new modules. Jest scaffolding pending. The Gemini review specifically flagged this as HIGH-severity.
- Documentation/code mismatches (some Gemini-generated module READMEs use function names that don't match exports)

### Operational
- Resend domain verification (8 brand domains, async DNS work)
- Vercel env vars: `CRON_SECRET`, `BROADCAST_AGENT_SECRET`, `BUZZSPROUT_TOKEN`, `IMMICH_API_KEY`, `SANITY_REVALIDATE_SECRET` not yet set
- Mac mini broadcast agent install + launchd plist (only matters before first live broadcast)
- gemini-3.1-pro Vertex AI access (project allowlist request)

### Strategic / business
- BMT touring LLC formal filing (lawyer track)
- FarleyPierson LLC wind-down (lawyer track)
- Counsel review of legal drafts (`docs/legal/{TERMS_OF_SERVICE,PRIVACY_POLICY,REFUND_POLICY}_DRAFT.md`)
- Final pricing decisions for Records / Tuthill / Radio tier packages
- JP Houston deal finalization

---

## Section 12 — Major Risks (Honest Register)

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| 1 | DSD subscriber acquisition slower than 5/day | High | High | Walk-in sales focus; Chase doing direct selling; Vicki Wolpert pilot (Woodstock) + Paul Green Realty (Natchez 5-agent pilot) as broker beachheads |
| 2 | Inn occupancy below 60% peak | Medium | High | Magazine-driven marketing; whole-Inn rentals; Blues Room as differentiator |
| 3 | Soft-FK / no-test platform breaks under real traffic | Medium | Medium | Refactor scheduled; deploy verification 16/16 currently; rollback runbook documented |
| 4 | Mac mini single point for broadcasting | Low | Low | Daily ops are 100% cloud; mini is back-of-house; Elijah/Miles can replace HW in days |
| 5 | Multi-tenant data leakage | Low (post-Apr 19 fix) | Catastrophic | Event isolation deny-by-default, IDOR closed via tenantId-scoped get() functions, ongoing audit |
| 6 | Three-person leadership team burnout | Medium | High | Tracy + Amy onboarding today; clear operator manual; Delta Dawn AI assistant; JP Houston for shows; contractors for design/video |
| 7 | Stripe webhook misconfiguration causing missed subscriptions | Medium | High | COMMERCE_WEBHOOK_SECRET pending Chase setup; signature verification active; idempotency keys on Product/Price creation |
| 8 | AI-generated content reaching customers (per "no AI photos" policy) | Low (post-purge) | Medium | All AI imagery scrubbed Apr 19; "must contain /approved/ in URL" rule enforced; tooling sweeps for stragglers |
| 9 | Bearsville activation slips | Medium | Low Y1 | Bearsville not in $760k pro forma; pure upside if it lands |
| 10 | Counsel review delays legal launch | Low | Medium | Drafts complete; lawyer track in flight; not customer-blocking |

---

## Section 13 — What Tomorrow's Onboarding Demonstrates

Tracy + Amy walk in to a working ecosystem. Demo flow (30 min):

1. Public sites tour — touring, magazine, pricing, shows, private events
2. Sanity Studio walkthrough — log in, edit article, swap photo, publish, see live in 60s
3. Admin tools — Treasury (MRR), Subscriptions, AI Wizard
4. Pro forma + milestones + action items
5. Manual handoff: print + Drive

After the demo, leadership has the autonomy to publish content, manage subscriptions, run private events, book shows, and forecast — without depending on Chase being at the keyboard.

---

## Section 13.5 — Architecture, Capabilities + Workflows We May Have Missed

This is the most important section in the brief and the one Chase explicitly asked for. Honest enumeration of architecture moves, capabilities, and workflows that aren't in the current plan and that an external reviewer should evaluate whether we should add. Items are grouped by category and ordered roughly by leverage-per-dollar.

### A. Workflow gaps that would unlock leverage immediately

1. **A real CRM.** Today, partner pipeline lives in memory (Chase's head) + scattered docs (`docs/partners/`). A lightweight CRM (Attio, HubSpot Free, even Notion) for tracking prospects, deals, and partner touchpoints would prevent dropped balls when Chase is in NY. **Build vs buy:** buy. ~$0–50/mo.
2. **Booking-to-Inn handoff workflow.** A confirmed Blues Room ticket buyer is a hot lead for an Inn stay. Today the data lives in Stripe + Sanity but there's no workflow that surfaces "this person bought a show ticket — offer them a room for the night." Should be an automated email + admin dashboard view.
3. **Inn Cloudbeds ↔ platform integration.** Cloudbeds (PMS) is mentioned in cron tasks but the integration depth is unclear. Real integration: bookings sync into Sanity, ADR + occupancy feed the admin/treasury dashboard, no double-entry between Cloudbeds and our system.
4. **Quote-to-booking conversion tracking.** QuoteRequest → Booking conversion rate is the single most important Inn KPI for whole-Inn rentals. Currently no funnel report. ~3 hours of work.
5. **Show settlement workflow.** After a Blues Room show: Amy enters door count, bar revenue, performer payout. The math runs. Performer gets paid via Stripe Connect or check. Today this is on a spreadsheet.
6. **Partner monthly statements.** Tuthill / Studio C earn licensing + project revenue. They should get an automated monthly statement showing earnings + invoice/Wise transfer. Today: ad-hoc.
7. **Customer success / save-the-customer flow.** Subscription about to lapse? Past-due payment? No automated outreach today beyond the dunning email. A simple "Tracy gets a Slack ping for at-risk subs" workflow.
8. **Photo-to-article AI flow.** Upload 30 photos from a Blues Room night → AI drafts an article in Tracy's voice from the photo metadata. The pieces (Wizard, photo library, voice docs) all exist; the connector doesn't.
9. **Tour routing optimizer.** When booking 3+ shows on a corridor swing, optimize routing for drive time + lodging. Memory file mentions a `bus-route-optimizer` skill exists for the future Prevost. Could apply to today's Sprinter.
10. **Performer onboarding flow.** Self-serve form for bands wanting to play / be booked. Captures Spotify/Bandcamp link, EPK, dates available. Currently mailto.

### B. Capabilities the platform has but doesn't use yet

11. **The event bus.** It works. Almost nothing publishes to it. We could meaningfully wire 50+ event types across the modules — `inn.guest.checked-in`, `magazine.article.published`, `radio.episode.aired`, `directory.lead.captured` — and start building cross-module workflows (when an article publishes, push to social via Postiz; when a guest checks in, send the local-recommendations email). This is the single biggest dormant capability.
12. **Sanity Studio dashboards.** Sanity supports custom dashboards inside Studio. Tracy could see "articles published this week," "drafts pending review," "photos awaiting tags" without leaving the editor. ~1 day to build.
13. **Multi-tenant tenant CLI.** `scripts/provision-tenant.mjs` exists. Spinning up a new tenant (e.g., Bearsville Y2 on a different city, or a partner's full-stack instance) should be a one-command operation. The CLI is partial; harden it.
14. **The wizard for batch generation.** Right now it's interactive one-piece-at-a-time. Could be a batch mode where Tracy uploads a CSV of topics + briefs and the wizard drafts 30 articles overnight.
15. **Search.** Sanity has built-in search and a Search API. The public sites have no search bar. Adding one is ~half a day.
16. **Content versioning + scheduled publishing.** Sanity supports both. We have neither in the UI/workflow. Tracy should be able to schedule "publish this article Friday at 9am" without sitting at a screen.

### C. Architecture moves we should consider

17. **Move the Mac mini broadcast services to a cloud VM.** Single-point-of-failure removal. Hetzner CCX13 (~$15/mo) runs Icecast + OpenBroadcaster fine. Mac mini becomes purely studio-local hardware (Plex, OBS Studio for live capture) — no service-up dependency on home internet.
18. **Stripe Connect for performer/partner payouts.** Currently performers paid manually. Connect would let payouts happen automatically post-show, with platform fee deducted. Better experience for performers, less Tracy cognitive load.
19. **PgBoss activation.** Code is already in `packages/modules/events/src/pgboss-adapter.ts`. Currently the dispatcher uses raw Postgres. PgBoss would give us proper retry policies, dead-letter handling, scheduled jobs, and a UI. Minimum-viable to flip.
20. **Edge cache strategy.** Vercel ISR with 60s revalidate works but a busy article could trigger thundering-herd revalidation. `revalidate-tag` per-article would cut that to per-document precision when Tracy publishes.
21. **Per-tenant GCS buckets.** Already flagged HIGH severity in Gemini review. The shared bucket with prefix isolation works but is one IAM misconfig away from a leak. Buckets per tenant + per-tenant service accounts is the strong-isolation move.
22. **A real observability stack.** Sentry for errors, Axiom or Datadog Logs for structured logs, OpenTelemetry traces. Today we run blind. Could pre-pay $100/mo and have full visibility.
23. **A staging environment.** Today: prod and `git push`. A staging branch that auto-deploys to a separate Vercel project (with its own Neon branch DB and Sanity dataset) would let Tracy preview changes before they hit live.
24. **API gateway + rate limiting.** Public endpoints (`/api/photo-library`, `/api/account/subscriptions/lookup`) are unprotected. A bot could scrape the photo index or enumerate subscriptions by email. Vercel BotID + Upstash rate limiter, ~half a day.
25. **A real CDN for the photo library.** GCS direct works but isn't optimized. Cloudflare Images or a Cloudfront-equivalent would resize/format on the fly + serve faster.

### D. AI workflows we haven't built but could

26. **A "voice-of-Tracy" email reply assistant.** Inquiry email comes in → AI drafts a reply in Tracy's voice → Tracy reviews and clicks Send. Cuts her email time 70%.
27. **Auto-tag photos via Vertex AI Vision.** The 229 photos lack tags. Imagen + Vision API can categorize + caption automatically. Tracy verifies; doesn't write from scratch.
28. **A nightly "what shipped today" digest.** AI reads the day's git log, Sanity changes, and admin events; emails the team a one-paragraph summary at 9pm. Closes the awareness gap when Chase is in NY.
29. **A lead-scoring agent for DSD.** When a free-tier signup happens, the agent enriches with Apollo/Clearbit data + scores likelihood-to-upgrade. Tracy works the top 10% manually.
30. **A daily DSD walk-in pitch generator.** Each morning, AI generates a personalized pitch for the next 5 walk-in targets based on their public web/Google Business Profile data. Chase walks in with intel.
31. **A SOP-from-recording flow.** Chase records a 5-min screen-cap of doing X; AI converts to a written SOP + adds to the operator manual. Manual stays current automatically.
32. **A "second-opinion" code review agent.** Already proven via the Gemini review. Should be a `gh pr ready` hook that runs every PR through Gemini before merge.
33. **Customer-facing AI concierge for the Inn.** "Hi I'm Delta Dawn — what's on this weekend? Where can I park? Can I bring a dog?" Available 24/7; Tracy/Amy don't field 1am questions.
34. **Voice-to-text + AI transcript for Blues Room shows.** Record the audio, get a transcript, surface as podcast episode + magazine article + social clips. One performance becomes 5 content artifacts.

### E. Business model moves we haven't tried

35. **Pre-paid Inn experience packages.** Bundle: 2 nights + Blues Room ticket + breakfast + bottle of bourbon = $X. Single SKU, higher AOV.
36. **Annual pre-pay discount on DSD.** $250/yr for Essentials (vs $300 monthly) — captures cash, locks in retention.
37. **Affiliate / referral program for DSD.** "Refer a business, get a month free." Brokers like Vicki are natural multipliers.
38. **Magazine paid subscription tier.** $5/mo or $50/yr for premium content (longform, member-only events). Current model is fully ad/sponsorship — adding direct revenue is upside.
39. **Touring fan club / patreon.** Recurring direct support from fans of touring artists. House band patrons get early-access show tickets + studio sessions.
40. **Records club.** Subscription record-of-the-month focusing on Big Muddy artists + corridor labels. $25/mo includes shipping. Vinyl margin is brutal but the brand value is high.
41. **Bearsville → record what happens at Big Muddy artists pass through.** Studio C already records. Selling the multi-tracks to artists post-session is unrealized revenue.
42. **A wedding / private event bundle with the Inn.** Tracy + Amy already cook breakfast; partner caterer fills the gap; Blues Room becomes the reception venue. Whole-Inn rental + catering markup + Blues Room rental + photographer (Studio C / CPP) + flowers (local partner). One sale, four invoices.
43. **A Big Muddy "passport" for repeat Inn guests.** Stamp every visit, every show attended, every podcast episode listened. Gamified loyalty without the corporate stink.
44. **Conference / retreat business.** 6 rooms + 50-seat venue + breakfast + a town that's quiet enough to think. Sell the whole thing to a small executive offsite for $15-25k for 3 nights. Tracy hosts.
45. **Big Muddy real estate.** Short-term real-estate plays in the Natchez corridor (a second house, a juke joint to revive). Leverage the brand + the Inn's operating know-how.

### F. Org / governance gaps

46. **Decision log.** Three equity partners + several agents + contractors. Decisions get made in 1:1 conversation and lost. A simple `decisions/YYYY-MM-DD.md` log would compound over a year.
47. **Weekly written 15-min standup, async.** Replace 30-min Zoom with: each principal posts a 5-line update Sunday night. Tracy reads at coffee. Chase reads on a flight. Amy reads at the bar. Beats trying to schedule.
48. **A board.** Three equity partners with no outside director. One trusted advisor (Regina? Vicki? Sean Davis?) on a quarterly retainer would keep us honest about strategy.
49. **A succession sketch.** If Chase gets hit by a bus, what happens? Documented disaster recovery: who has admin to what, who knows the deploy process, what survives. Today: nothing written.
50. **Performance dashboards Tracy + Amy actually look at.** A single URL that shows: this week's revenue across all brands, Inn occupancy this week, DSD subscriber count, top-3 risks. Today they'd have to assemble this from 5 different admin pages.

### G. Content and editorial moves

51. **A real editorial calendar in Sanity.** Today: ad-hoc. With one schema (`contentCalendarEntry`), Tracy could see the next 8 weeks of Magazine + Radio + Social planned content + status. Drag-drop in Studio.
52. **A press / media relations workflow.** When the Inn does something story-worthy, who do we pitch? Local press contact list + email templates + tracking.
53. **A photo release workflow.** For Blues Room performers especially. A simple form they sign on tablet at check-in granting us photo/video usage rights. Currently: handshake.
54. **A magazine print run, occasionally.** Sanity content + a print-on-demand service = a quarterly physical magazine left in every Inn room and at partner storefronts. Cost: ~$2-5/copy. Brand value: enormous.
55. **A regular reader email newsletter.** Magazine articles auto-flow to a Substack-style newsletter for Inn alumni and prospects. Resend already handles transactional; this is a different list type.

### H. Things we've half-built and should finish

56. **The wizard history page.** Tracy's wizard usage logs are recorded but no UI to browse them. ~2 hours of work.
57. **The booking ticket Stripe checkout.** `/shows` has a "buy ticket" CTA that falls back to mailto. Real Stripe Checkout flow. ~half a day.
58. **The admin dashboard home.** Currently redirects to /admin/treasury. A real home page with at-a-glance KPIs across all modules. ~1 day.
59. **Magic-link auth.** /account/subscriptions uses email-only lookup today; magic-link is documented as the production pattern but not implemented. ~1 day.
60. **Mac mini broadcast agent install.** Server side is solid; the actual agent script on the mini is partial. Needs OBS-websocket + ffmpeg integration. ~3 days.

### I. The single most important thing we may have missed

The most important architectural decision NOT yet made: **whether MBT-the-platform is sold separately from MBT-the-product, and how.** Today MBT is internal infrastructure. The pitch to Bearsville implies it's also a licensable platform. The pitch to brokers (Vicki, Paul Green) implies it's a consumed B2B product. Same code, three sales motions:

1. Internal infra for Big Muddy / Bearsville (works)
2. Hosted SaaS for SMB customers (DSD, $25-250/mo) (working)
3. Licensed platform for second-region operators (revenue model unclear — one-time license? % of region revenue? Co-ownership?)

Sales motion 3 is the highest-leverage but the most ambiguous. **External reviewers should evaluate whether the third motion is real or a daydream, and what business model fits if so.** This is the deepest strategic question in the brief.

---

## Section 14 — Explicit Review Prompts

Copy-paste these verbatim into each external AI. Each prompt is self-contained and ends with a clear deliverable spec.

### 14a — Prompt for Grok (xAI)

```
You are an outside critic of a small-business venture. The full brief is
attached above. Treat me like a friend who needs the truth, not a
client who needs encouragement.

Give me your honest read on:

1. **The financial model.** Is the $760k Lean & Mean target realistic
   given the stated assumptions? What's the most likely failure mode of
   the bottom-up base case ($510k)? Where is the model most fragile?
   Where are the assumptions hand-wavy?

2. **The org structure.** Three equity partners, two of whom are not
   technical, one of whom is the only person who can deploy. Is this
   sustainable? What's the bus-factor risk? Have I undersold or oversold
   any role?

3. **The brand portfolio.** Eight customer-facing brands sharing one
   codebase. Is this strategically coherent or over-extended? Which
   brands should I kill, defer, or double down on?

4. **The DSD bet.** Walk-in sales of a $25/mo SaaS to small-town
   Mississippi businesses. Plausible? Naive? What's the actual TAM here?
   Who's done this before and how did it end?

5. **The Bearsville expansion.** Cloning the Big Muddy model in
   Woodstock NY by summer 2026. Legitimate strategy or distraction?

Be specific. Cite evidence from the brief. Don't sandbag with caveats.
If I'm being a fool somewhere, name where.
```

### 14b — Prompt for Perplexity

```
The attached brief describes a media-and-hospitality holding company in
Natchez, Mississippi, with a B2B platform layer (MBT) and a B2B SMB
product (Deep South Directory). I want you to use your search capability
to do real-world reality-checking.

Specifically, find and cite sources for:

1. **Comparable businesses.** Have any vertically-integrated
   small-town media-and-hospitality plays succeeded in similar markets?
   List 3-5 cases. For each: what worked, what failed, what's the
   relevant lesson?

2. **Natchez tourism + hospitality data.** What is the actual current
   state of the Natchez tourism market? Year-round occupancy, ADR,
   events economy, demographic flows, recent announcements.
   Is the assumed ramp from 40% → 75% peak occupancy reasonable for
   a 6-room boutique inn with a music venue?

3. **DSD competitive landscape.** Who else sells SMB marketing software
   at the $25-99/mo price point in this geography? (Yelp, Google
   Business Profile, Squarespace, Wix, regional players, Chamber of
   Commerce tools, etc.) Who's winning? What's their pitch?

4. **Mississippi music corridor reality check.** Real venues still
   booking live blues/folk on weeknights between Memphis and New
   Orleans? Is the route economically viable for a touring van model
   with house-band depth? Anyone running a similar operation?

5. **Vertical integration in small media.** Recent (2023-2026)
   examples of small media operators owning content + venue + booking
   + record label. Did any of them succeed? Did Substack, Defector,
   404 Media, or any newer outlets do this?

Output: a structured report with headed sections. Cite sources with
URLs. Flag anything in the brief that contradicts current public
information. Don't pad with platitudes — strong claim, citation,
implication for our model.
```

### 14c — Prompt for Gemini (2.5 Pro or 3.1 Pro)

```
You're a senior technical reviewer. The attached brief describes a
production multi-tenant Next.js 14 platform with 9 modules, ~80 Prisma
models, Sanity CMS, Stripe, Vercel deployment, GCS storage. The same
codebase serves 14 domains across 5 tenants.

Recent code review (yourself, two days ago) flagged 3 CRITICAL + 4 HIGH
findings — all closed per the brief. Verify the brief's claim that
those are closed by reasoning about the described fixes:

1. **Event dispatcher race condition** — fix described as
   `SELECT FOR UPDATE SKIP LOCKED` raw UPDATE. Does this fully resolve
   the at-least-once-but-only-once-per-batch guarantee? What edge cases
   remain (e.g., long-running handler, worker crash mid-handler)?

2. **Broadcast agent in-memory queue** → Postgres-backed model + Mac
   mini agent protocol. Is the new design correct for a single-agent
   single-server topology? What happens if the Mac mini polls during a
   server-side migration? What's the failure mode if two Mac minis are
   accidentally provisioned?

3. **Multi-tenant event isolation deny-by-default** — bare `own` scope
   now hard-fails; canonical form is `own:<tenantId>`. Are there
   remaining channels (publish path, handler discovery, admin UI) where
   a misconfiguration could still leak data across tenants?

4. **IDOR via unscoped get()** — fix is optional `tenantId` parameter
   that returns null if mismatched. What happens if API handlers fail
   to pass `tenantId`? Is this an opt-in security model that's likely
   to drift back open over time?

5. **Stripe Product/Price race condition** — fix is Stripe idempotency
   keys + first-writer-wins DB persist. Is there still a window where
   two concurrent first-time checkouts for the same plan could create
   distinct Stripe Customer records, or does Stripe's idempotency cover
   that path too?

Then comment on:

6. **The remaining HIGH-severity items the brief admits aren't done:**
   soft-FK schema cleanup, mixed ID strategy, per-tenant GCS buckets,
   zero test coverage. Which of these should ship next? In what order?
   What's the actual blast radius of each remaining gap?

7. **The deploy posture.** 16/16 verify-deploy green; one Vercel
   project hosting 14 domains via middleware; daily Tracy+Amy CMS edits
   triggering 60s ISR revalidation. Is this scaling pattern right for
   the volume implied by the pro forma? At what user/request volume
   does it break?

8. **AI-pipeline architecture.** gemini-batch.mjs (text) +
   gemini-image-batch.mjs (image, just added) dispatching against
   Vertex AI. Is the `:predict` vs `:generateContent` routing pattern
   sensible? Should we move to AI SDK v6 + AI Gateway? Why or why not?

9. **What's the single change that would most reduce the platform's
   long-term maintenance burden?** Be specific.

Output: dense markdown, one section per finding above, no preamble.
Treat the recipient as a peer engineer.
```

### 14d — General prompt (any LLM, fast read)

```
This is a complete brief on a small-business technology + hospitality
ecosystem. Read it. Then give me three things:

1. **The strongest part of the plan.** One paragraph.
2. **The weakest part of the plan.** One paragraph.
3. **The one thing you would do differently if you were running it.**
   One paragraph, specific, not "improve communication" generic advice.

Be concise. ~500 words total.
```

---

## Section 15 — How to Use This Brief

### For external AI review

1. **Send the whole brief.** Most modern LLMs handle 12k words easily. Don't truncate.
2. **Pick the right prompt** from Section 14 based on the AI you're consulting.
3. **Run all four** (Grok, Perplexity, Gemini, plus a generalist) and compare. Disagreements are the most useful signal.
4. **Capture the responses.** Drop them in `docs/external-review-2026-04-20/responses/{grok,perplexity,gemini,chatgpt}.md`.

### For investor or partner conversations

This brief is ALSO usable as an investor one-pager (compress Sections 1-9, drop Sections 10-14). Or as a hire pitch (lead with Section 5 org chart + Section 9 financials).

### For internal use

When you next onboard a senior contributor (engineer, GM, etc.), this brief is their day-1 reading. Also serves as the canonical "what did we build" if Chase gets hit by a bus.

---

## Appendix A — Glossary

| Term | Meaning |
|------|---------|
| MBT | Measurably Better Things LLC — the operating tech platform entity |
| HDI | Hillbilly Dreams Inc — conceptual holding layer; not formally incorporated |
| DSD | Deep South Directory — the SMB-facing B2B product |
| Cos | Claude Sonnet 4.6 instance acting as Chief of Staff |
| Patch | Claude Sonnet 4.6 instance acting as Technical Director |
| Delta Dawn | Multi-provider AI assistant for the team |
| Sanity | The headless CMS Tracy + Amy edit content in |
| Vercel | The hosting platform |
| Neon | Serverless Postgres database vendor |
| GCS | Google Cloud Storage |
| ISR | Incremental Static Regeneration (Next.js cache pattern) |
| ADR | Average Daily Rate (hospitality term) |
| SPOF | Single Point Of Failure |
| MRR | Monthly Recurring Revenue |
| IDOR | Insecure Direct Object Reference (security vulnerability class) |
| FOR UPDATE SKIP LOCKED | Postgres pattern for atomic row claiming under concurrency |

---

## Appendix B — Key Files in the Repo (for AI reviewers who can read code)

```
docs/BUSINESS_ARCHITECTURE.md           — Source-of-truth business model
docs/onboarding-2026-04-20/             — Tracy + Amy onboarding package
docs/operations/REVIEW_BY_GEMINI_*.md   — External Gemini code review
docs/operations/GEMINI_REVIEW_RESPONSE_*.md — Response log to that review
docs/voice/                             — Per-brand voice docs (8 brands)
packages/modules/                       — 9 module packages
packages/database/prisma/schema.prisma  — Full data model (3,387 lines)
apps/web/middleware.ts                  — Multi-tenant routing engine
apps/web/config/domain-routes.ts        — Hostname → route group mapping
apps/web/config/tenants.ts              — 5-tenant registry
apps/web/sanity/schemas/                — 13 Sanity content schemas
apps/web/sanity/plugins/bmm-library/    — Custom GCS photo picker
scripts/ai/gemini-batch.mjs             — Text-gen dispatcher
scripts/ai/gemini-image-batch.mjs       — Image-gen dispatcher (Imagen 3)
scripts/seed/                           — Sanity content seed scripts
scripts/verify-deploy.mjs               — 16-check production smoke test
```

---

**End of brief.**

Total length: ~12,000 words. Self-contained for external AI review. Section 14 is copy-paste-ready prompts. Trust but verify.
