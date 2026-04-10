# MBT Enterprise Sales — Operational Report & Forecast
**Author:** SALES_MBT_ENTERPRISE agent (new department)
**Date:** 2026-04-10
**Reporting period:** Q2 2026 + forward 24 months

Scope: program sales to towns, brokers, banks, districts, and institutional buyers. NOT walk-in DSD $25/mo sales — that belongs to the DSD Walk-in Sales department.

---

## 1. Current State

**Mission in one sentence.** Sell the MBT program — setup fees and recurring platform licenses — to institutional buyers who need coordination capacity (brokers, towns, chambers, districts, banks).

**Current owner(s).** Chase (primary, only). No backup. No named sales lead. No AE. No BDR. No CRM.

**What's live and shipping now.**
- Two landing pages: `apps/web/app/mbt/real-estate/page.tsx` (broker) and `apps/web/app/mbt/civic/page.tsx` (town).
- Pricing catalog: `docs/MBT_REAL_ESTATE_PRICING.md`.
- Two pilots in flight:
  - **Broker Pilot 1 — Vicki Wolpert**, Hudson Valley NY. "Promised, ready to close." Fulfilled by Tuthill Design (Elijah). Source: `docs/MBT_REAL_ESTATE_PRICING.md` line 61.
  - **Town Pilot 1 — Natchez MS**. Fulfilled by Studio C. Founding broker not yet identified [?]. Source: same file, line 62.
- Regina Charboneau / Biscuits & Blues running as dogfood proof point under the Big Muddy umbrella (`docs/BUSINESS_ARCHITECTURE.md` line 247).

**Pricing (locked).**
| SKU | Setup | Recurring |
|---|---|---|
| Broker Platform | $1,500 | $199/mo |
| Broker Marketing | $1,500 | $500/mo |
| Broker Production | $1,500 | $1,500/mo |
| Agent under broker | $0 | $99–150/mo [?] |
| Town Kickstart | $10,000 | $500/mo SLA + business subs |

First month of any broker tier is $500 (full Marketing) regardless of eventual tier. Pick tier after 30 days, no contract. Source: `docs/MBT_REAL_ESTATE_PRICING.md`.

**Headcount equivalent.** Chase = 0.25 FTE on sales. Fulfillment partners: Tuthill Design (Hudson Valley), Studio C (Natchez/Deep South). Zero sales-specific headcount.

**Spend / revenue contribution this quarter.** $0 closed enterprise revenue YTD. Pipeline value at list: $1,500 setup + $500 first month = $2,000 (Vicki, signable), plus $10,000 kickstart pending Natchez broker identification. Total signable this quarter if both close: **$12,000 setup + ~$1,000/mo recurring**.

**Tooling.** None. No CRM. No pipeline tracker. No sequence tool. No proposal template. Contacts live in Chase's head and iMessage. This is the single biggest operational gap in the department.

---

## 2. Strategic Growth

**Where leverage lives.** Every enterprise deal is a multiplier: a broker brings agents, a town brings 20–50 businesses into DSD at paid tiers, a bank brings branch-level sponsorship budgets. One town close = ~$10k setup + $500 SLA + $500–$2,500/mo downstream business subscriptions. One broker close = $2k setup/first month + $199–$1,500/mo.

**Next-10 prospect model (by segment).**

*Hudson Valley brokers (Tuthill fulfillment).* Vicki Wolpert (signable). Then three more brokerages in Woodstock/Kingston/Hudson via Vicki referral and Elijah's network [?]. Target: 4 Hudson Valley brokers by Q4.

*Deep South brokers (Studio C fulfillment).* Founding Natchez broker [?]. Then Vicksburg, Baton Rouge, Clarksdale, Memphis corridor brokers seeded by the touring circuit. Target: 3 corridor brokers by Q4.

*Mississippi corridor towns.* Natchez (pilot), then Vicksburg, Clarksdale, Greenwood, Helena, Tunica, Memphis suburbs. Corridor already seeded with 13 cities in the Touring DB (`docs/BUSINESS_ARCHITECTURE.md` line 285). Touring shows provide the warm door: we're already booking bands into their venues. Target: 2–3 pilot towns by Q4.

*Banks.* Local community banks along the corridor (Britton & Koontz, Planters Bank, Trustmark branch level) — sponsorship and financial-literacy content angle. Long sales cycle, use touring + magazine as warm intro. Target: 1 bank pilot conversation opened by Q4.

*Education / MB Learn.* Mississippi school districts via Title IV-A (referenced in memory `project_mb_learn.md`). Not launching Q2. Seed conversations only — 1–2 districts opened by Q4.

**Referral flywheel.** Regina Charboneau → James Beard network → hospitality brokers. Vicki → Hudson Valley real estate. Shows → venue owners → town officials. The media company is the top of funnel. Every magazine feature and radio spot is a warm intro.

**Moat.** Program sale, not SaaS. Fulfillment requires a local production crew (Studio C or Tuthill). Competitors (Hibu, LocaliQ, Yelp) can't show up with a camera crew and put the mayor in a magazine.

**6 / 12 / 24 month leverage:**
- 6mo: Close 1 town + 1 broker, turn them into case studies.
- 12mo: Use case studies to open 3 towns and 5 brokers. Hire first AE if Chase-led cycle is maxed.
- 24mo: Regional licensing — sell MBT as a platform to a multi-market operator (another Studio C-style implementer in a different region).

---

## 3. Operations

**Sales process (proposed — none formalized today).**
1. **Discovery call** (30 min) — understand their market, existing marketing spend, pain.
2. **Proof-of-concept shoot** — 1 day on site, free or at-cost (budget: ~$500 Studio C day rate [?]). Produces a sample reel. Becomes the pitch.
3. **Pilot proposal** — $1,500 broker or $10,000 town. Written one-pager, not a 40-slide deck.
4. **Tier selection** — 30 days after launch, pick ongoing tier.
5. **Renewal / expansion** — at month 6, pitch expansion (more listings, agents under broker, adjacent town).

**Activity cadence.**
- Daily: 3 outbound touches (email, call, or walk-in) by Chase.
- Weekly: Pipeline review Monday AM (Chase + whoever fulfills).
- Monthly: Health check on every active pilot with fulfillment partner.

**CRM recommendation.** Start dumb and cheap — **Attio** ($0–$29/seat) or a Notion/Airtable pipeline if we need it free this week. Do NOT adopt Salesforce or HubSpot Sales Hub. Requirements: deal stages, last-touch date, next action, linked contact, linked fulfillment partner, MRR field. Migrate to something heavier only when deal count > 25.

**Handoff to Customer Success.** Once a pilot signs, the deal is handed to the new Customer Success department (dept #16 per `docs/tasks/HDI_DEPARTMENT_OPERATIONAL_REPORTS.md`) at kickoff call. Sales stays on as account sponsor but does not own delivery.

**Single points of failure.** Chase. Studio C availability. Tuthill availability. No redundancy on any of the three.

**Runbook.** To be created as `docs/runbooks/sales-mbt-enterprise.md` [?].

---

## 4. Insurance & Risk

**Top 5 exposures.**

1. **Overpromise / claim-ladder violation.** Sales pages and pitches may claim features not yet shipped (radio rotation, magazine features, report cards). Violates the "measurably must be measurable" rule (`docs/BUSINESS_ARCHITECTURE.md` line 268). Covered by: nothing today. Mitigation: every pitch reviewed against the claim ladder; QA agent gates. **Risk type:** misrepresentation → E&O.
2. **Contract liability.** No MSA, no SOW template, no SLA language, no termination clause. A $10k town deal signed on a handshake is legally exposed both ways. **Covered:** No. Mitigation: Legal dept (#12) drafts broker + town MSA templates before first close. **Risk type:** contract → legal + E&O.
3. **Fulfillment partner dependency.** Studio C and Tuthill are the only delivery arms. Chase is 40% owner of Studio C but Tuthill is Elijah's independent company. If either is unavailable the pipeline stalls. **Covered:** No. Mitigation: written fulfillment agreement with each partner, priced day rates, backup crew plan. **Risk type:** business interruption → operational.
4. **Customer concentration.** Vicki + Natchez = 100% of Q2 pipeline. If either falls, the department is at zero. **Covered:** No. Mitigation: open 5 more conversations this quarter even if they don't close.
5. **Data / privacy liability at town level.** Municipal contracts may trigger public-records and PII obligations we're not prepared for. **Covered:** No. Mitigation: Legal reviews first municipal contract; cyber liability policy via insurance dept.

**Tie to the unified insurance exploration brief:** E&O is the primary policy need for this department. Cyber liability becomes critical before first municipal signature.

---

## 5. Forecast — 3 Scenarios

All numbers assume Chase-led selling, no AE hire.

| Metric | Conservative | Base | Aggressive |
|---|---|---|---|
| Brokers signed by Q4 2026 | 1 (Vicki) | 3 | 5 |
| Towns signed by Q4 2026 | 1 (Natchez) | 2 | 3 |
| Broker setup revenue | $2,000 | $6,000 | $10,000 |
| Broker MRR exit 2026 | $500 | $1,500 | $3,500 |
| Town setup revenue | $10,000 | $20,000 | $30,000 |
| Town SLA MRR exit 2026 | $500 | $1,000 | $1,500 |
| **Total setup 2026** | **$12,000** | **$26,000** | **$40,000** |
| **Exit MRR 2026** | **$1,000** | **$2,500** | **$5,000** |
| Revenue Y1 (2026) | ~$18k | ~$40k | ~$70k |
| Revenue Y3 (2028) | ~$150k | ~$400k | ~$900k |
| Cost Y1 (tools + partner day rates) | ~$5k | ~$12k | ~$25k |
| Headcount Y3 | Chase + 1 AE | Chase + 2 AE + 1 CSM | Chase + 4 AE + 2 CSM + regional lead |
| Key risk | Vicki stalls, Natchez founding broker not found | Studio C capacity | Outrunning fulfillment |

Conservative assumes the two named pilots close and nothing else. That is the honest floor. Base assumes referral flywheel starts after case studies exist. Aggressive assumes a second region (Hudson Valley or Memphis) starts replicating.

---

## 6. Asks

**From Chase (decisions).**
- Decide: Chase-led through 2026, or name a sales lead now? (Recommend: Chase-led until 3 closes, then hire.)
- Identify the Natchez founding broker by April 30.
- Approve CRM selection (Attio recommended) by April 15.
- Sign off on one-page MSA template draft when Legal delivers it.

**From other departments.**
- **Product / Patch:** Shippable claim ladder. What can we honestly promise a broker on signing day vs. day 30 vs. day 90? Feature-lock for enterprise tier.
- **Marketing:** First Vicki case study by day 60 of pilot. Regina proof point packaged as a one-pager.
- **Finance:** Broker MSA + SOW template. Town municipal contract template. Stripe invoice flow for $1,500 setup and $10k kickstart (not payment links — these are invoiced).
- **Legal (dept #12):** MSA, SOW, SLA, termination and IP language. Priority 1 blocker for any signed deal.
- **Insurance (dept #11):** E&O quote before first signature. Cyber liability before first municipal.
- **Customer Success (dept #16):** SLA definition and kickoff checklist so handoff is clean on day 1 of Vicki's pilot.

**From capital.**
- $500–$2,500 CRM + sequence tooling (year 1).
- $2,000 legal template drafting (one-time).
- $5,000 contingency fund for fulfillment travel / overflow crew.
- First AE hire not funded until 3 closes. No hire before signal.

**Timeline.** All asks above are needed before the Vicki close, targeted **by April 30, 2026.**

---

## Open Questions

- [ ] Natchez founding broker — who? Source: pilot is "TBD" per `docs/MBT_REAL_ESTATE_PRICING.md`.
- [ ] Agent-under-broker price — $99 or $150? Currently a range on the sales page.
- [ ] Studio C day rate for POC shoots — what's the internal transfer price?
- [ ] Does Tuthill Design bill HDI or bill the broker directly?
- [ ] Is the $10k town kickstart inclusive of Studio C travel, or is that a passthrough?
- [ ] Bank vertical — do we have a single named prospect or is this greenfield?
- [ ] MB Learn / Title IV-A — is this department selling it, or is Education a separate motion?
