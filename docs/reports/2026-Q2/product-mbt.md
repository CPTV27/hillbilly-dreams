# Product Management — MBT Platform — Operational Report & Forecast
**Author:** Product Management (new department — first report)
**Date:** 2026-04-10
**Reporting period:** Q2 2026 + forward 24 months

---

## 1. Current State

**Mission:** Turn the Glass Engine into a licensed product institutions can buy, operators can run, and businesses can plug into — without any of them building software.

**Owner:** Chase (acting Head of Product). Backup: none. This department is brand new. First task of the department is to stop Chase being the bottleneck.

**Headcount equivalent:** 0.5 Chase + AI agents. No dedicated PM. Studio C and Tuthill fulfill; they are not product owners.

**Spend / revenue contribution this quarter:** $0 external MBT revenue booked. Two pilots promised (Vicki Wolpert / Woodstock broker, Natchez town + founding broker TBD). Dogfood clients not billed.

### What MBT actually is (canonical)

One engine, multiple skins. See `docs/BUSINESS_ARCHITECTURE.md`. MBT is sold as a licensed program — not a self-serve SaaS — to towns, brokers, chambers, and venue clusters. DSD is the public layer of any MBT deployment. The `measurablybetter.life` domain is the institutional storefront plus the Southern Concierge voice AI demo.

### The 9 Modules — honest build status

| # | Module | Status | Evidence |
|---|---|---|---|
| 1 | **Directory** | **Shipped** — listings, onboarding flow, dashboard, admin | `apps/web/app/directory/{page,onboard,dashboard,submit,map}` |
| 2 | **Magazine** | **Shipped (content light)** — articles, city guides, print | `apps/web/app/magazine/*`, `outsider-economics-v2/` feeds `lib/posts.ts` |
| 3 | **Radio** | **Shipped (infra) / partial (programming)** — Icecast + OpenBroadcaster on Mac mini; player live | `apps/web/app/radio/*`, Mac mini 8010/8080 |
| 4 | **Records** | **Shipped as listing pages only.** No distribution pipeline. Non-exclusive deal structure drafted, not contracted | `apps/web/app/records/{artists,releases,sessions}` |
| 5 | **Touring / Events** | **Shipped (data + routing)** — 6 Prisma models, 13 corridor cities, Delta Run route seeded. Ticketing not live. | `apps/web/app/touring/*`, touring Prisma models |
| 6 | **Commerce** | **Partial.** Stripe payment links wired for DSD tiers. No Stripe Connect multi-party splits yet. Print ordering shipped for client gallery. | Env: `STRIPE_PAYMENT_LINK_*`; `/gallery/clients/[name]` |
| 7 | **Broadcasting** | **Shipped (Mac mini stack)** — OpenBroadcaster, Icecast, OBS, Postiz. Single point of failure, no SLA. | See Broadcasting Ops report |
| 8 | **AI Content Pipeline** | **Partial.** Gemini + Claude wired. Social posting via Postiz. Voice profiles and search opt spec only. | `lib/ai-models.ts`, `apps/web/app/api/ai/*` |
| 9 | **Analytics** | **Spec only.** Monthly report cards, Google review alerts, competitor snapshots promised on pages — **not shipped.** | No `/api/analytics/report-card` or equivalent found |

**Honest-claims flag.** The MBT Civic and Real Estate pages claim "review management," "monthly report cards," and "competitor watch" as features of ongoing tiers. The data pipes exist; the packaged, customer-visible deliverable does not. This is a Q2 gating risk. See Section 4.

### Pricing — current canonical

**DSD self-serve (LOCKED Apr 5, 2026, `CLAUDE.md`):**
Free · Essentials $25 · Pro $50 · Marketing $99 · Engine $250.

**MBT Civic (`docs/MBT_REAL_ESTATE_PRICING.md`):**
$10,000 kickstart + $500/mo SLA. Businesses subscribe at DSD tiers under the program.

**MBT Real Estate (broker):**
$1,500 setup, $500 first month, then tiered: Platform $199, Marketing $500, Production $1,500. Agent product under broker: $99–$150/mo (TBD).

**Gap:** Two different DSD tier tables exist in the repo. `BUSINESS_ARCHITECTURE.md` still lists an old Free/$99/$250 structure; `CLAUDE.md` and `MBT_REAL_ESTATE_PRICING.md` reference the 5-tier Apr 5 lock. Product must pick one and purge the other. **Recommendation: lock the 5-tier ladder everywhere.**

### Dogfood clients (Q2 phase)

| Client | Modules used | Status |
|---|---|---|
| Big Muddy Touring | Directory, Touring, Radio, Magazine, AI Pipeline | Live, internal |
| Big Muddy Magazine | Magazine, AI Pipeline | Live, internal |
| Biscuits & Blues (Regina Charboneau) | Directory, Magazine feature | External dogfood — first real feedback loop |
| The Big Muddy Inn | Directory, WiFi captive portal, Radio integration | Live |

### Pilots (first external dollars)

| Market | Customer | Product | Status |
|---|---|---|---|
| Woodstock, NY | Vicki Wolpert (broker) | MBT Real Estate — Broker | Promised. Ready to close. Tuthill fulfills. |
| Natchez, MS | Town + founding broker TBD | MBT Civic + Broker bundle | $10k kickstart scoped. Broker identity unresolved. Studio C fulfills. |

---

## 2. Strategic Growth

**The thesis.** Same engine, different skin. The moat is not any single module — it is the fact that a town, broker, or chamber can buy one program and get directory + magazine + radio + social + commerce running in 30 days with Studio C on-site. Competitors sell one tool. MBT sells coordination capacity.

**Where product creates leverage:**

**6 months (Q2–Q3 2026).** Close both pilots. Ship Analytics module (real report cards, not claims). Collapse DSD pricing contradictions. Publish release notes. Build an institutional admin console so a town or broker can log in and see what the AI agents shipped this week — this is the "never think about it again" promise made visible.

**12 months.** Package 3 verticals as repeatable kits: Real Estate, Civic, Entertainment. Each kit = configured modules + fulfillment SOP + pricing + pitch. Third pilot (second broker or second town) without custom work. Start Bearsville activation on the same platform.

**24 months.** MBT is sold on the program, implemented in 30 days, run by the operator, monitored by AI. Chase is no longer the bottleneck. 10–20 institutional licenses active. Data flywheel (DSD listings + user behavior) becomes the moat.

**Top 3 initiatives:**
1. **Honest-claims audit.** Every feature claim on every MBT page matched to a shipped file path or removed. Gates the pilots.
2. **Analytics module v1.** Monthly report card PDF, Google review alert, basic competitor snapshot. Three things. Shipped.
3. **Vertical kit packaging.** Turn "what we did for Vicki" and "what we did for Natchez" into reusable configurations, not bespoke builds.

**Dependencies:** Technical (Patch) for ship velocity. Sales (MBT Enterprise) for pilot close + scorecard feedback. Customer Success (new) for post-sale SLA. Content & Editorial for Magazine pipeline. Broadcasting Ops for Radio SLA.

---

## 3. Operations

**Release model (locked).**
- **Code freeze:** Apr 10, 2026 (today)
- **Test window:** Apr 10–17
- **Soft launch:** Apr 17
- **Ongoing cadence post-launch:** weekly ship, bi-weekly release notes.

**Dogfood loop.** Every internal client (BMT, Magazine, Inn, Biscuits & Blues) files feedback through the admin console. Product reviews weekly, groups into module backlogs.

**QA gate.** Every release runs the QA agent (`.claude/agents/QA_CHASE.md`) honest-claims checklist before deploy. No shipping features that contradict a live page, no pages claiming features that don't ship.

**Single points of failure.**
- Chase as sole product owner
- Mac mini as sole broadcasting node (single-host Icecast/OpenBroadcaster/OBS)
- Vercel as sole deployment surface
- No staging environment with production data parity

**Tools:** Vercel (deploy), Prisma/Postgres, GCS `bmt-media-bigmuddy`, Cloudflare R2, next-auth v5, Stripe payment links, Postiz, Gemini + Claude via `lib/ai-models.ts`.

---

## 4. Insurance & Risk

| # | Exposure | Covered? | Mitigation | Policy type |
|---|---|---|---|---|
| 1 | **Honest-claims gate.** Pages advertise features (report cards, competitor watch, review management) that are spec only. Customer could claim misrepresentation. | No | Audit every page against shipped code before Apr 17 soft launch. Strip or ship. | E&O (professional liability) |
| 2 | **Data privacy — multi-tenant.** 4 tenants share one deployment (`config/tenants.ts`). No formal tenant-isolation audit. A leak of Regina's data into Tuthill tenant would be material. | Partially | Schedule tenant-boundary audit. Add row-level checks in Prisma middleware. | Cyber liability |
| 3 | **Customer concentration.** First 2 pilots = 100% of MBT revenue. Vicki or Natchez walking = zero. | No | Third pilot identified in Q2. Document failure modes. | — (commercial risk) |
| 4 | **Platform dependency.** Vercel (deploy), Anthropic + Google (AI), Stripe (payments), Cloudflare (DNS). Any one outage halts the product. No runbook for provider failover. | No | Draft provider-outage runbook. Document AI fallback chain already in `lib/ai-models.ts`. | Cyber + business interruption |
| 5 | **Product liability — outcomes.** "Measurably Better" implies measurement. If a broker or town cannot see outcomes, the brand breaks. | No | Analytics module v1 is the mitigation. Ships Q2. | E&O + reputational |

**Tie to unified insurance brief:** E&O, cyber liability, and commercial contracts (MSA with limitation-of-liability) are the three policies Product needs Insurance & Risk dept to prioritize before external pilots sign.

---

## 5. Forecast — 3 Scenarios

| Metric | Conservative | Base | Aggressive |
|---|---|---|---|
| **Pilots closed by Q3** | 1 (Vicki only) | 2 (Vicki + Natchez) | 3 (+ second broker or second town) |
| **Modules shipped by Q3** | 7/9 (+ Analytics partial) | 8/9 (+ Analytics v1) | 9/9 (+ Commerce Connect) |
| **MBT MRR exit Q4** | $2,000 | $8,500 | $22,000 |
| **DSD self-serve businesses exit Q4** | 20 | 75 | 200 |
| **Revenue Y1 (to Apr 2027)** | $40k | $180k | $450k |
| **Revenue Y3 (to Apr 2029)** | $250k | $900k | $2.4M |
| **Cost Y1 (product + fulfillment)** | $60k | $140k | $280k |
| **Headcount Y3 (FTE + vendor)** | 3 | 7 | 14 |
| **Key risk** | Chase bottleneck; pilots stall on claims audit | Analytics v1 slips, churn in month 3 | Fulfillment capacity (Studio C / Tuthill) can't keep up with sales |

**Base case logic:** Vicki closes May. Natchez closes June–July. 50 DSD businesses onboard through Q3 under Natchez program umbrella. Second broker pilot starts Q4.

---

## 6. Asks

**From Chase (decisions needed — by Apr 17):**
- Lock one DSD pricing table. Kill the other. `BUSINESS_ARCHITECTURE.md` must be updated.
- Approve the honest-claims audit and authorize stripping any page feature not shipped.
- Name a backup product owner (even part-time). Chase cannot be the only one.
- Sign off on Analytics v1 scope: monthly PDF report card, Google review alert, competitor snapshot. Three things, shipped by end of Q2.

**From other departments:**
- **Technical (Patch):** ship Analytics v1 by Jun 30; tenant-boundary audit by May 15.
- **Sales — MBT Enterprise:** pilot scorecards for Vicki + Natchez by close date; weekly pipeline sync.
- **Customer Success (new):** SLA definition before first external dollar arrives. What does $500/mo actually guarantee?
- **Content & Editorial:** content production SLA for Magazine features bundled in Marketing tier.
- **Legal:** MSA template with limitation of liability before Vicki signs.
- **Insurance & Risk:** E&O + cyber quotes before pilot launch.

**From capital:**
- No outside capital requested for Q2. Product spend covered by existing Studio C cash flow.
- Q3 ask (pending Vicki + Natchez close): $15k for Analytics module acceleration + staging environment.

**Timeline for asks:** All Chase decisions by Apr 17 soft launch. All cross-department by May 15. Capital decision at July board review.

---

## Open Questions
- [?] Who is the Natchez founding broker? Product cannot package the Civic + Broker bundle without this name.
- [?] Is Bearsville a third pilot market for MBT program sales or just a content node? Clarify with Bearsville Creative dept.
- [?] Does the existing `/measurably-better/enterprise/console` page represent a shipped tenant admin console or UI-only mock? Need Patch to confirm behind-the-glass state.
- [?] Agent-tier pricing for brokers ($99–$150) — pick a number before Vicki onboards her agents.
- [?] Records module: do non-exclusive artist agreements exist in legal templates, or only in pitch language?
