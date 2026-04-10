---
name: Insurance & Risk Management
description: The department that owns every insurance exposure across the HDI ecosystem — Big Muddy Touring, Studio C, Big Muddy Inn, Blues Room, MBT platform, Bearsville, Chase Pierson Photography, and every vehicle, venue, artist, and vendor relationship. New department created 2026-04-10 at Chase's request. Anchor task is exploring a unified policy covering all operating entities.
---

# Insurance & Risk Management — HDI

**Created:** 2026-04-10, in response to Chase's direct ask during a presentation to Tracy and Carrie.
**Status:** NEW DEPARTMENT. No named human owner yet. Recommend Tracy takes point because her Finance Director role already touches every entity and vendor relationship, and because her equity partner status aligns incentives.

---

## Mission

Keep the house from burning down. Literally and figuratively. Own every exposure across HDI, know which policies cover them, know which ones don't, and make sure Chase never signs an institutional deal without the COI the counterparty will demand.

## Scope

Every operating entity, every physical space, every vehicle, every digital system, every vendor contract, every artist relationship, every customer PII flow.

**Entities in scope:**
- FarleyPierson LLC (the operating entity today)
- Hillbilly Dreams Inc (when incorporated — currently not a filed entity)
- Studio C (vendor, separate LLC structure)
- Tuthill Design (vendor)
- Any future LLCs for brand-level IP ownership

**Physical locations:**
- Big Muddy Inn (Natchez)
- Blues Room venue at 411 N Congress St, Natchez
- Studio C space
- Mac mini location (shared server + broadcasting infrastructure)
- Bearsville Creative (Woodstock, NY — summer 2026 activation)
- Chase Pierson Photography / Venture Gallery print space

**Vehicles:**
- Sprinter van (touring, production)
- Any personal vehicles used for business travel (all personal auto policies explicitly exclude business use — this is the most-missed gap in the portfolio)
- Prevost bus (future, Snowbird Circuit concept — insurance is the gate for financing)

**Digital exposures:**
- DSD platform (customer PII from business directory signups)
- MBT platform (broker and municipal customer data)
- Stripe integration (payment card environment — PCI adjacent)
- GCS bucket `bmt-media-bigmuddy` (asset storage)
- CMS and editorial database (source and subject information)

---

## Top 10 Exposures (ranked by urgency)

1. **Liquor liability** — Blues Room bar + Inn bar. Mississippi dram-shop exposure with zero coverage. Hard gate for landlords, ASCAP/BMI, permit renewals. **P0.**
2. **Commercial auto — Sprinter van.** Personal auto explicitly excludes business use. An at-fault touring accident would be denied. Blocker for Prevost bus financing. **P0.**
3. **Cyber / data breach.** DSD, MBT, Stripe customer data flowing through the platform with no breach-response coverage. Gate for any bank, broker, or municipal enterprise deal requiring $1M+ cyber COI. **P0.**
4. **General liability — live venue.** 50-seat Blues Room with public performances, no GL policy. One patron injury ends the venue permanently. **P1.**
5. **Inland marine / scheduled equipment.** Cameras, audio gear, instruments, laptops. Standard property policies don't cover high-value mobile gear off-premises. **P1.**
6. **Errors & omissions.** MBT platform advisory, magazine editorial, radio programming. First claim (libel, defamation, platform misconfiguration) is catastrophic uncovered. **P1.**
7. **Property — Blues Room + Inn.** Building contents, FF&E, business income interruption. Current coverage status: unknown. **P1.**
8. **Workers comp exposure.** Equity partners (Tracy, Amy) can often elect exemption under MS law but this requires a filed election. Contractors on set (Studio C crew, touring artists, JP Houston) create gray-zone exposure. **P2.**
9. **Directors & Officers.** Only relevant once HDI incorporates and starts talking to investors. Today it is moot. **P3.**
10. **Employment Practices Liability.** Even without W-2 employees, contractor disputes and artist-in-residence agreements can generate EPL claims. Low probability, high defense cost. **P3.**

Full heat map lives in `docs/reports/2026-Q2/insurance-and-risk.md`.

---

## What This Department Does Day To Day

1. **Maintains the COI register** — every policy, every certificate holder, every renewal date. Tracy can pull up any vendor's active certificate in under 30 seconds.
2. **Runs the broker relationship.** One primary broker. One backup broker. Annual market check. Chase never talks to carriers directly.
3. **Triages new risks** as they appear. A new venue, a new vehicle, a new employee, a new integration — each one triggers a 15-minute risk review before the ink dries.
4. **Coordinates with Finance** on premium as a P&L line, loss ratios, and deductible strategy.
5. **Coordinates with Legal & Entity Structure** (another new department queued) on the entity named-insured stack as HDI incorporates.
6. **Owns the incident response playbook** — who gets called when something actually happens. Property damage, auto accident, data breach, defamation complaint, injury at a show.
7. **Reports monthly** to Chief of Staff on status, upcoming renewals, open gaps, and recommended actions.

## What This Department Does NOT Do

- Does not purchase or bind policies. Tracy approves direction, Chase signs.
- Does not give legal advice. Partners with Legal & Entity Structure department.
- Does not replace the broker. Manages the broker relationship.

---

## The Unified Policy Question

Chase asked specifically whether Big Muddy Touring and Studio C could go on the same policy. The answer: **yes, probably, via a commercial package policy with named insureds** covering both operating LLCs, but it depends on the entity-of-entities structure HDI ends up with. The key considerations:

- **Named insured + additional insured** structure lets one policy cover multiple LLCs
- **Entertainment-industry specialist carriers** (Heffernan Entertainment, Front Row, Allied) write packages covering live venues + production + touring under one schedule
- **Entity structure matters** — if HDI incorporates as a holding company, it becomes the natural named insured with operating LLCs as additional insureds
- **Do not shop until entity structure is stable** — changing entity mid-policy triggers endorsements that cost time and goodwill with the broker

Short answer for Chase: yes, it's worth pursuing, and the right sequencing is **incorporate HDI → name HDI as lead insured → schedule BMT, Studio C, Inn, and future entities as additionals**. Budget 6–8 weeks from "we want this" to "bound policy in hand."

---

## Annual Premium Ranges (DIRECTIONAL — not quotes)

Based on similar-sized entertainment + hospitality operations in similar markets. These are ranges, not quotes. Real numbers come from broker shopping.

- **Conservative** (GL + auto only, bare minimum): **$12,000–$18,000 / year**
- **Base** (full package BOP: GL, property, inland marine, commercial auto, liquor, basic cyber): **$28,000–$45,000 / year**
- **Aggressive** (everything: full package + E&O, expanded cyber, D&O, workers comp, EPL, bus fleet when added): **$65,000–$95,000 / year**

None of this is cheap. All of it is cheaper than the first uncovered claim.

---

## Recommended First Actions (for the person who takes this seat)

1. **Inventory what exists today.** Any active policies, any COIs on file, any riders on personal policies, any existing relationships with brokers. Most founders think they have less coverage than they actually do, and more coverage than they actually do, at the same time.
2. **Read `docs/reports/2026-Q2/insurance-and-risk.md` end to end.** The heat map and gap analysis live there.
3. **Get three broker meetings** with entertainment-industry specialists: Heffernan, Front Row, Allied. Do not shop commodity carriers first — they don't understand the venue + production + platform stack and will either overprice or miss coverage.
4. **Do NOT change anything** until Chase signs off on direction. This department reports, recommends, and executes on Chase's direction — it does not bind.
5. **Coordinate with Legal & Entity Structure** on the HDI incorporation timing. Insurance waits for entity structure. That's a dependency, not a blocker — both can move in parallel on prep work.

---

## Relationship To Other Departments

- **Chief of Staff** — reports to. Escalates open gaps monthly.
- **Finance Director (Tracy)** — partners with. Premium is a P&L line and a cash flow concern.
- **Legal & Entity Structure** (new dept, queued) — waits for incorporation decisions. Can prep in parallel.
- **Technical / Build (Patch)** — depends on for cyber exposure assessment. Patch's tech report flags the Mac mini SPOF and Prisma migration gap — both become insurance conversations about business interruption and data breach coverage.
- **Broadcasting Operations** (new dept, queued) — depends on for Mac mini and physical space risk profile.
- **Facilities & Real Estate** (new dept, queued) — partners on landlord COI requirements and property coverage.

---

## Honest Claims Gate

This department does not yet have:
- Any in-force policy on file (that we know of)
- A named broker relationship
- A COI register
- An incident response playbook
- A human owner

Everything above is aspirational scope. The first 30 days of this department's existence are about inventory, not action.

---

## Changelog

- **2026-04-10** — Department created by Claude (vigilant-dubinsky worktree) at Chase's direct request. Anchor task is the unified insurance exploration queued in `tasks/PENDING_ISSUES_QUEUE.md`. Full operational report at `docs/reports/2026-Q2/insurance-and-risk.md`. No human owner assigned yet.
