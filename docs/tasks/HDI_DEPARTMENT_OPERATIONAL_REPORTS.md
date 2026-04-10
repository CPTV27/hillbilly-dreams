# HDI Department Operational Reports — Master Dispatch
**Requested by:** Chase
**Date:** 2026-04-10
**Status:** DISPATCHED — all departments produce reports in parallel

---

## The Ask

Every department produces a **full operational report and forecast** covering:

1. **Current state** — what the department is doing, who's on it, what's shipping
2. **Strategic growth** — where this department creates leverage in the next 6/12/24 months
3. **Operations** — how it runs day-to-day, cadence, dependencies, SLAs
4. **Insurance / Risk** — what exposures live in this department, what's covered, what isn't
5. **Forecast** — 3-scenario model (conservative / base / aggressive) tied to revenue impact
6. **Asks** — what the department needs from Chase, from other departments, from capital

Each report answers the same 6 questions so they can stack into a single board-ready dossier.

---

## Existing Departments

These already have named agents. Each runs its own report against the template above.

| # | Department | Agent | Owner | Scope |
|---|---|---|---|---|
| 01 | **Executive / Chief of Staff** | `Chief of Staff` | Chase | Big picture, cross-department priorities, decision memory |
| 02 | **Finance & Accounting** | `Finance Director` | Tracy + Finance agent | Revenue model, P&L, cap table, 3-year forecast (high/mid/low) |
| 03 | **Technical / Build** | `Patch` | Chase | Stack, deploy, infra, database, integrations, multi-tenant arch |
| 04 | **Infrastructure / Design Systems** | `Clem` | Chase | Token system, QC compliance, CSS vars, cross-agent memory |
| 05 | **Content & Editorial (Magazine + Radio)** | `Bearsville Studio Agent` (partial) | Tracy (exec producer) | Publication cadence, article pipeline, radio show scheduling |
| 06 | **Bearsville Creative (NE node)** | `Bearsville Studio Agent` | Elijah + Miles | Studio photography, frontend, Woodstock activation timeline |
| 07 | **Gallery / Photography** | `Gallery Director` | Chase | Print catalog, Chase Pierson Photography, Venture Gallery, Tracy Alderson Gallery |
| 08 | **Photo Production (Mac mini)** | `Mac Mini Photo Lab` | Chase + automation | Lightroom pipeline, batch export, GCS upload, curation |
| 09 | **R&D / Touring & Talent** | `R&D Touring` | Chase | House band model, EU festivals, tour economics, scouting |
| 10 | **QA / Brand Voice** | `QA Agent` | Chase | Brand voice, code, honesty gate, launch-ready checks |

---

## Departments We DO NOT Have Yet (Invent These)

These don't exist as agents or org units. Each gets a brand-new agent definition AND an initial operational report.

| # | New Department | Why It Matters | First Task |
|---|---|---|---|
| 11 | **Insurance & Risk Management** | No one owns GL, property, auto, liquor, E&O, cyber, workers comp coordination across BMT + Studio C + Inn + MBT. See `PENDING_ISSUES_QUEUE.md` for the full insurance brief Chase requested. | Run the insurance exploration brief; produce coverage-gap heat map |
| 12 | **Legal & Entity Structure** | FarleyPierson LLC operates everything. HDI not incorporated. Multi-tenant data boundaries need contractual hardening. IP ownership across MBT platform vs Big Muddy content unclear. | Entity structure audit + IP assignment map |
| 13 | **People & Talent Operations (HR-lite)** | Equity partners (Tracy/Amy) are owners not employees. JP Houston deal not finalized. Vendor contractors (Studio C, Tuthill, JP) need clean agreements. Artist-in-residence (Arrie Aslin) needs contract. | Equity ledger, contractor schedule, artist contract templates |
| 14 | **Sales — Deep South Directory (DSD)** | Walk-in sales playbook exists but no agent owns the pipeline, conversion, follow-up. 5 businesses/day target with no CRM mechanics. | Sales forecast, pipeline model, pitch optimization |
| 15 | **Sales — MBT Enterprise (towns, brokers, banks)** | $10k town kickstart + $1.5k broker pilot needs structured pipeline. Vicki Wolpert is pilot 1. Natchez founding broker TBD. Zero deal flow infrastructure. | Enterprise pipeline spec, pilot scorecards, referral model |
| 16 | **Customer Success / Post-Sale Ops** | After a town signs $10k, who keeps them happy? After a broker lands, who manages the SLA? This is the "you never think about it again" promise — it has no owner. | SLA definition, health scoring, renewal playbook |
| 17 | **Marketing & Distribution** | Magazine, radio, TikTok, Instagram, print, Postiz are all running without a unified comms calendar or attribution. | Marketing mix audit, channel attribution, Q2/Q3 calendar |
| 18 | **Broadcasting Operations (Mac mini stack)** | OpenBroadcaster, Icecast, Plex, Postiz, Hotel TV, Kiosk — critical infra, no SLA, no backup, single point of failure. | Service audit, runbook, redundancy plan |
| 19 | **Product Management — MBT Platform** | Nine modules, two products (life + directory), unclear roadmap priority. Release model needs PM rigor. | Module roadmap, release plan through Q3, feature prioritization |
| 20 | **Data & Analytics** | 16,936 photos, 5,605 corridor businesses, RAG audits, tax-db with 15+ tables — huge asset surface with no analytics discipline. | Data asset inventory, warehouse design, dashboard plan |
| 21 | **Facilities & Real Estate** | Blues Room, Big Muddy Inn, Studio C space, Bearsville, Mac mini location — physical plant with no unified management. Insurance implications. | Location schedule, lease status, capacity plan |
| 22 | **Procurement & Vendor Management** | Studio C, Tuthill, Mac mini services, SaaS (Vercel, Cloudflare, GCS, ElevenLabs, Veo 3, Suno, Anthropic). No vendor register, no renewal calendar, no spend audit. | Vendor register, SaaS cost audit, renewal timeline |
| 23 | **Artist Relations & Licensing** | Arrie Aslin, the house band concept, Rea Mochiach, touring artists. Master rights, sync licensing, performance royalties all floating. | Artist roster, rights ledger, licensing framework |
| 24 | **Government Relations & Grants** | ARPA was missed. MS HB 1571 redirected funds. Title IV-A for MB Learn. Civic sales need public-sector fluency. | Grant radar, pilot-to-grant pipeline, civic pitch deck |
| 25 | **Investor Relations / Capital** | 3-year model exists but no investor-ready dossier. Big Muddy + MBT narrative needs capital framing if/when you raise. | Pitch deck, data room, cap table cleanup |
| 26 | **Hospitality Operations (Inn + Bar)** | Amy runs this, but there's no agent representing the P&L, occupancy, guest flow in the cross-department stack. | Occupancy model, bar P&L, guest → show conversion analysis |

**Total departments in scope:** 26 (10 existing + 16 invented)

---

## Report Template (every department uses this)

```markdown
# [Department Name] — Operational Report & Forecast
**Author:** [Agent name]
**Date:** 2026-04-10
**Reporting period:** Q2 2026 + forward 24 months

## 1. Current State
- Mission in one sentence
- Current owner(s) — person + backup
- What's live and shipping now
- Headcount equivalent (equity / vendor / contractor / AI)
- Spend / revenue contribution this quarter

## 2. Strategic Growth
- Where this function creates leverage in 6 / 12 / 24 months
- Top 3 initiatives with expected impact
- Dependencies on other departments
- Moat / defensibility

## 3. Operations
- Daily / weekly / monthly cadence
- Key systems and tools
- SLAs and response times
- Single points of failure
- Runbook link (create if missing)

## 4. Insurance & Risk
- Top 5 exposures (liability, property, data, regulatory, reputational)
- Currently covered? (yes / no / partially / unknown)
- Mitigation recommendations
- Tie to unified insurance exploration brief

## 5. Forecast — 3 Scenarios
| Metric | Conservative | Base | Aggressive |
|---|---|---|---|
| Revenue Y1 | | | |
| Revenue Y3 | | | |
| Cost Y1 | | | |
| Headcount Y3 | | | |
| Key risk | | | |

## 6. Asks
- From Chase (decisions needed)
- From other departments (dependencies)
- From capital (spend approvals, hires, gear)
- Timeline for asks

## Open Questions
- [ ] ...
```

---

## Dispatch Strategy

**Wave 1 — start immediately (5 agents in parallel):**
- Finance & Accounting (pulls from tax-db, BUSINESS_ARCHITECTURE, cap table)
- Insurance & Risk Management (runs the queued insurance brief as anchor)
- Technical / Build (Patch) — inventories the stack, deploy, infra, database
- Product Management — MBT Platform (module audit, roadmap through Q3)
- Sales — MBT Enterprise (pipeline model, Vicki Wolpert pilot scorecard)

**Wave 2 — queue for sequential dispatch after Wave 1:**
- Content & Editorial
- Bearsville Creative
- Customer Success / Post-Sale Ops
- Marketing & Distribution
- Broadcasting Operations (Mac mini stack)

**Wave 3 — queue for sequential dispatch after Wave 2:**
- People & Talent Ops
- Legal & Entity Structure
- Sales — DSD Walk-in
- Data & Analytics
- Facilities & Real Estate
- Procurement & Vendor Management
- Artist Relations & Licensing
- Government Relations & Grants
- Investor Relations / Capital
- Hospitality Operations (Inn + Bar)
- Gallery / Photography
- Photo Production (Mac mini lab)
- R&D Touring
- QA / Brand Voice
- Infrastructure / Design Systems (Clem)
- Executive / Chief of Staff consolidation

**Final consolidation:**
- Chief of Staff agent consumes all 26 reports and produces the **HDI State of the Union Q2 2026** — a single board-ready dossier with cross-department dependencies mapped, top 10 risks, top 10 opportunities, and a prioritized action queue for Chase.

---

## Output Location

- Individual reports → `docs/reports/2026-Q2/[dept-slug].md`
- Consolidated dossier → `docs/reports/2026-Q2/HDI_STATE_OF_UNION.md`
- New agent definitions → `.claude/agents/[dept-name].md`
- Cross-department risk register → `docs/reports/2026-Q2/RISK_REGISTER.md`

---

## Rules for Every Agent

1. **No invented facts.** If you don't know something, put it in "Open Questions" with a `[?]` tag. Do not hallucinate financials, headcount, or customer names.
2. **No pitch language.** Chase's voice. Short sentences. What things ARE, not benefits.
3. **Tie to the insurance brief.** Every department identifies its top risks and what policy type covers them.
4. **Honest claim gate.** Features not yet shipped cannot be claimed as revenue.
5. **Equity partners ≠ employees.** Tracy and Amy are owners.
6. **Cite sources.** Every number has a file path or URL. No orphan data.
7. **Under 2,000 words per report.** Tight, board-ready, not a term paper.
