# MBT Civic Product — Municipal AI for Small Towns

*April 6, 2026. Research-backed pricing and capabilities.*

---

## The Market

- **16,000+ US municipalities under 5,000 population** have no AI strategy, no IT department, one person doing everything
- **70% of small towns** have fewer staff than 2019
- Typical IT budget: 2-5% of general fund (~$300K-$1M for Natchez)
- Current software: spreadsheets, paper, QuickBooks, one legacy system nobody understands
- Competitors charge **$5K-$175K/year** for siloed solutions (iWorQ, CivicPlus, OpenGov, GovPilot)
- Covington, KY built an AI chatbot for **under $200/year** — proving small towns can do this cheaply

## Why MBT Wins

The platform already runs the directory, radio, events, and payments for the businesses in these towns. Adding city services is turning on modules, not building from scratch. No competitor has a local radio station, magazine, event calendar, AND business directory already running in the same town.

---

## Pricing (DRAFT — Chase to finalize)

| Tier | Monthly | Annual | What's Included |
|------|---------|--------|-----------------|
| **City Basic** | $250/mo | $3,000/yr | City website/directory, event calendar with public meetings, AI chatbot for FAQs, auto-generated newsletter/public notices, council meeting streaming (radio infra), WiFi portal at city hall/library |
| **City Works** | $750/mo | $9,000/yr | Everything in Basic + online permit applications and payments, code enforcement request tracking, utility bill payment portal, park/facility reservations, Sovereign Pi kiosk at city hall |
| **City Engine** | $1,500/mo | $18,000/yr | Everything in Works + analytics dashboard (tourism, occupancy tax, business trends), AI meeting minutes from recordings, predictive code enforcement, budget forecasting, cross-department analytics |
| **City Partner** | $3,000/mo | $36,000/yr | Everything in Engine + dedicated support, custom integrations with existing systems, monthly review with city manager, on-site training, grant compliance reporting |
| **Regional (PDD)** | $5,000/mo | $60,000/yr | Multi-town deployment through Planning & Development District. 5-10 towns on shared instance. Per-town cost drops to $500-$1,000/mo. Southwest Mississippi PDD is the target. |

**Competitive comparison:**
- iWorQ (permits/code only): $5K-$15K/yr
- Citizenserve (5 users): $13,500/yr
- OpenGov: $20K-$175K/yr
- GovPilot: $10K-$30K/yr (estimated)
- CivicPlus (website only): $3K-$8K/yr
- **MBT City Basic: $3,000/yr** — more integrated than any of them

---

## Module Mapping (What Exists vs What Needs Building)

| Civic Need | MBT Module | Status |
|---|---|---|
| City website/directory | Directory | **Ready** — add "city" tenant |
| Event calendar | Events | **Ready** — add public meetings |
| AI chatbot | AI Pipeline | **Ready** — same as Delta Dawn |
| Newsletter/notices | Magazine + AI Pipeline | **Ready** — auto-generate from events |
| Council meeting streaming | Radio/Broadcasting | **Ready** — Icecast already runs |
| Public WiFi portal | WiFi Portal | **Ready** — parameterize for city hall |
| Sovereign Pi kiosk | Sovereign Pi | **Ready** — kiosk mode exists |
| Online payments | Commerce/Stripe | **Ready** — add payment types |
| Facility booking | Events | **Ready** — extend for reservations |
| Permit tracking | **Needs build** | New models: Permit, PermitApplication, PermitType |
| Code enforcement | **Needs build** | New models: CodeCase, Violation, Inspection |
| AI meeting minutes | AI Pipeline | **Partial** — needs audio-to-text integration |
| Analytics dashboard | Analytics | **Partial** — needs civic-specific views |
| Budget forecasting | **Needs build** | New feature on existing analytics |

**8 of 14 capabilities are ready today.** The remaining 6 are extensions of existing modules.

---

## Phased Rollout ("Don't Turn Over the Apple Cart")

### Phase 1: Public-Facing (Month 1-3) — City Basic $250/mo
- City directory and business registry on MBT
- Event calendar with council meetings, public hearings
- AI chatbot trained on city ordinances, FAQs, zoning
- Auto-generated weekly newsletter from events/meetings
- Council meeting live streaming through existing radio infrastructure
- WiFi portal at city hall showing city services
- **No internal systems change required. City just gets a better public face.**

### Phase 2: Citizen Services (Month 4-8) — City Works $750/mo
- Online permit applications with Stripe payments
- Code enforcement request submission and tracking
- Park and facility reservation system
- Sovereign Pi kiosk at city hall entrance
- Utility bill payment portal
- **City starts replacing paper forms with digital. One system at a time.**

### Phase 3: AI Operations (Month 9-18) — City Engine $1,500/mo
- Dashboard: tourism metrics, occupancy tax revenue, business license trends
- AI-generated meeting minutes from audio recordings
- Predictive code enforcement (identifying violation patterns)
- Budget forecasting from historical data
- Cross-department analytics and reporting
- **The city manager sees everything in one place for the first time.**

---

## Funding Sources (How Cities Pay for This)

| Source | Amount | Timeline | Notes |
|---|---|---|---|
| **ARPA (unspent)** | Varies | **Deadline Dec 2026** | MS has unspent funds. Technology is eligible. URGENT. |
| **CDBG** | Annual formula | Ongoing | Eligible when serving LMI communities (70% threshold) |
| **USDA Rural Development** | Up to $500K | FY 2027 | Technical assistance to rural communities |
| **Existing IT budget** | $3K-$12K/yr | Immediate | At $250-$1K/mo, fits in discretionary budget — no council vote needed |
| **PDD shared services** | Contract | Ongoing | Southwest Mississippi PDD aggregates multiple towns |
| **Mississippi ITS** | Partnership | Ongoing | AI Innovation Hub actively seeking partners |

**The pitch:** "Your ARPA money expires in 8 months. Your IT budget is a person and a spreadsheet. For $250 a month — less than your water testing contract — your city gets an AI that answers citizen questions, streams your meetings, sends your newsletter, and puts every business in your directory online. No new staff. No training. We set it up."

---

## Sales Strategy

### Target 1: City of Natchez (Proof of Concept)
- Population: ~14,500, Adams County
- Already has DSD businesses in the directory
- Big Muddy Radio already streams from Natchez
- The Inn is a Natchez landmark
- **Chase already knows the mayor and city officials**
- Pitch: "We already run the directory for your businesses. Let us add city services for $250/month."

### Target 2: Southwest Mississippi PDD (Regional Scale)
- Covers 10+ towns in Chase's territory
- Chartered to provide technical assistance to local governments
- One PDD contract = 5-10 towns at once
- $5,000/mo for the PDD, $500-$1,000/mo effective per town

### Target 3: Mississippi Municipal League (Statewide)
- Present at MML Annual Conference
- "We built this for Natchez. It works. Here's what it costs."
- Case study from Natchez → statewide adoption

---

## Competitive Positioning vs Existing Vendors

| Feature | iWorQ | CivicPlus | OpenGov | GovPilot | **MBT** |
|---|---|---|---|---|---|
| Price (annual) | $5-15K | $3-8K | $20-175K | $10-30K | **$3-36K** |
| Permits | Yes | No | Yes | Yes | **Phase 2** |
| Website | No | Yes | No | Yes | **Yes** |
| AI chatbot | No | No | No | No | **Yes** |
| Meeting streaming | No | No | No | No | **Yes** |
| Business directory | No | No | No | No | **Yes** |
| Emergency alerts | No | No | No | No | **Yes** |
| Newsletter auto-gen | No | No | No | No | **Yes** |
| Analytics | Basic | No | Yes | Basic | **Yes** |
| Hardware kiosk | No | No | No | No | **Yes ($165)** |

---

## What We Can Honestly Say Today

**TRUE:**
- "We already manage the business directory for your town"
- "We already stream radio from your town"
- "We can add a city chatbot for under $200/year in AI costs"
- "Council meeting streaming works today — same infrastructure as our radio"
- "Online payments through Stripe are already wired"
- "We cost less than any competitor for more integrated functionality"

**NOT YET TRUE (needs building):**
- Permit workflow management (needs Prisma models + UI — 4-6 weeks)
- Code enforcement tracking (needs build — 4-6 weeks)
- AI meeting minutes from audio (needs Whisper integration — 2-3 weeks)
- Budget forecasting (needs build — 3-4 weeks)

---

*Tracy approves all pricing decisions. No external civic sales conversations without her sign-off. Natchez is the proof of concept — prove it works before pitching the PDD.*
