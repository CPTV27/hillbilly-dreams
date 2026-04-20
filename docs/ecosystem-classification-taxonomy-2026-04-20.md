# Ecosystem Classification Taxonomy

**Purpose:** One shared list of classification codes for every hour worked, every expense paid, every revenue line received across the ecosystem. Applied by Studio C, Tuthill Design, MBT platform work, Chase's time, and anyone else billing into the ecosystem. So expenses hit the right entity's P&L, each brand's real profitability is visible, and the accountant has a clean shared language to work in.

**Date:** April 20, 2026
**Canonical source:** this file.
**Status:** Internal. Partners + counsel + accountant use.

---

## 1. Why we're doing this

Chase's prompt, 2026-04-20: "When Studio C is working on those hours, there needs to be classification for: is it Big Muddy Magazine and stuff for the Inn, or is it stuff for Big Muddy Touring? We need classifications on that because then we can track the expenses."

Without classification:
- Every retainer hour gets pooled under "ecosystem work" and there's no way to see what the Inn actually costs vs. what Touring actually costs
- When Big Muddy Touring LLC spins out (proposed separate entity for road liability), its P&L has no history to inherit
- Accountant can't do clean inter-entity allocation
- We can't answer "is Touring actually viable as a standalone business line?" because the expense side is invisible

With classification:
- Every hour (and every expense, and every dollar of revenue) routes to a specific entity and a specific brand/product within that entity
- Entity-level P&L becomes real
- Cost-allocation decisions (should MBT bill the Inn for X% of platform infra? should Touring absorb the full van-wrap cost or split it with Magazine marketing?) become legible
- Accountant + counsel have one shared taxonomy

---

## 2. The taxonomy — 8 primary codes

Use these codes on every hours-log entry, every expense line, every revenue entry.

| Code | Meaning | Billing entity / P&L destination |
|---|---|---|
| **INN** | Big Muddy Inn operations — rooms, F&B, breakfast, daily guest ops, same-week turnover work | Big Muddy Natchez LLC |
| **MAG** | Big Muddy Magazine — editorial, content production, design, publishing, distribution | Big Muddy Natchez LLC |
| **BLUES** | Blues Room — show production, physical venue ops, ticketing, show promotion | Big Muddy Natchez LLC (shifts to Big Muddy Touring LLC if/when shows flow through Touring's P&L) |
| **EVENTS** | Private events — weddings, retreats, corporate offsites, whole-inn buyouts | Big Muddy Natchez LLC |
| **TOUR** | Big Muddy Touring — road ops, artist bookings, Sprinter van, corridor circuit work, artist EPKs | Big Muddy Touring LLC (once formed; until then, sits on MBT books with clean classification so it can be transferred) |
| **CPP** | Chase Pierson Photography — non-RE work (portraits, events including weddings, editorial, fine art, brand, travel, Blues Room documentation) | MBT, DBA Chase Pierson Photography (pending counsel) |
| **TUTHILL-PHOTO** | Tuthill Design Photography — real estate photography service line, both regions, both tiers | Tuthill Design |
| **TUTHILL-DESIGN** | Tuthill Design non-photography work — brand, print, graphic, identity, collateral, the Sprinter wrap | Tuthill Design |
| **MBT-PLATFORM** | MBT platform — infrastructure, CMS, code, AI agents, shared photo library, cross-brand systems | MBT |
| **PARTNER-MKT** | Big Muddy marketing + promotion done FOR a partner studio's whole brand (Studio C promo, Tuthill promo, driving outside-ecosystem clients to them) | MBT (investment in the partner-amplification thesis) |

**Out-of-scope codes** (included for completeness; not counted toward ecosystem P&L):

| Code | Meaning | Notes |
|---|---|---|
| **S2P** | Scan2Plan work | Bills to Tuthill Design → Scan2Plan. Ecosystem doesn't count Scan2Plan work hours against Tuthill's $1k/mo Big Muddy retainer — Scan2Plan is Tuthill's own external account. |
| **BEARSVILLE** | Bearsville Creative work | Summer 2026 activation. Separate JV entity once formed. |
| **PERSONAL** | Non-ecosystem personal time | Never billed to ecosystem. Included only so contractors don't miscode personal time as ecosystem time. |

---

## 3. How to apply it — Studio C + Tuthill retainer hours

**Engagement structure (confirmed 2026-04-20 PM):** $500/month is the engagement floor. The current Big Muddy retainers are TWO $500/mo accounts per partner studio, classified at the billing level:

| Studio | Account A | Account B |
|---|---|---|
| Studio C Video | $500/mo · 10 hrs · `TOUR` | $500/mo · 10 hrs · `INN` + `MAG` |
| Tuthill Design | $500/mo · 10 hrs · `TOUR` | $500/mo · 10 hrs · `INN` + `MAG` |

Same pattern as the existing Utopia account. Vicki Wolpert's first engagement will start at $500/mo (one account) and can stack additional accounts as she takes on more brands or project scopes.

Each account gets its own shared Google Sheet with columns:

| Date | Who | Hours | Code | Brief description |
|---|---|---|---|---|
| 2026-04-22 | Elijah | 2.5 | MAG | Big Muddy Magazine Spring Issue — photo selection + layout review |
| 2026-04-22 | Elijah | 1.0 | MBT-PLATFORM | Cloudbeds ride-along session with Fiverr specialist |
| 2026-04-23 | Elijah | 3.0 | TOUR | Sprinter van wrap artwork review with Miles |
| 2026-04-24 | Miles | 2.0 | TUTHILL-DESIGN | Tuthill brand refresh review (self-amplification work under PARTNER-MKT? see note) |
| 2026-04-25 | Miles | 1.5 | INN | Inn signage design |

**Edge-case reminder:** if Miles works on Tuthill's own brand refresh, that's `TUTHILL-DESIGN` (work on Tuthill's own stuff — paid for by Tuthill, not by Big Muddy). If MBT is *marketing* Tuthill's work as part of the partner-amplification thesis (social posts about Tuthill's own capabilities, Magazine feature on Tuthill's portfolio), that's `PARTNER-MKT` on MBT's books.

---

## 4. How to apply it — expenses

Every expense the ecosystem pays gets the same classification on the receipt / accounting record.

Examples:
- Sprinter van fuel on a touring trip → `TOUR`
- Sanity CMS subscription → `MBT-PLATFORM`
- Magazine print run → `MAG`
- Wedding package flowers → `EVENTS`
- Housekeeping contractor payment → `INN`
- Blues Room sound-rental for a specific show → `BLUES`
- Resend email domain verification for all brands → `MBT-PLATFORM` (shared infra); if a specific brand's allocation matters, can be split
- Fiverr Cloudbeds specialist engagement → `INN` (the Fiverr gig is Inn-PMS-specific)
- Tuthill's production insurance premium → `TUTHILL-DESIGN` (they hold the policy) — with a reimbursement note if MBT / Inn / Touring pay Tuthill a share for coverage they receive

---

## 5. How to apply it — revenue

Same taxonomy applies to revenue routing. When a dollar comes in, code it.

- Room booking payment → `INN`
- Wedding package deposit → `EVENTS`
- Magazine sponsor payment (if inbound and accepted) → `MAG`
- Photography shoot (non-RE, Chase shooting) → `CPP`
- Tuthill Photography shoot (standard or Chase-premium tier) → `TUTHILL-PHOTO`
- Scan2Plan royalty payment to Tuthill → `S2P` (out of scope for ecosystem P&L; Tuthill-internal)
- B2B Directory engagement (Vicki, Paul Green) → `MBT-PLATFORM`
- Inn → MBT $1k/mo platform payment → `MBT-PLATFORM` on MBT's books; `INN` on the Inn's books (intra-ecosystem transfer)

---

## 6. Edge cases and tie-breakers

**"Cross-brand" work that touches multiple brands:**
Pick the *primary* beneficiary. If it truly splits, log two entries with split hours or split dollars, each with its own code. Don't use blended codes.

**Elijah's Cloudbeds ride-along:**
`INN` (he's learning the Inn's PMS so he can be Tier-1 support for Tracy + Amy). If the ride-along teaches him skills useful for other brands later, that future work codes to whichever brand benefits — the ride-along itself stays `INN`.

**Sprinter van wrap:**
Split between `TOUR` (the van itself is a touring asset), `MAG` (if the wrap explicitly advertises Magazine), and `TUTHILL-DESIGN` (if Tuthill does the actual wrap design work — that work is billed to Big Muddy, coded to whichever brand owns the surface). Studio C logo on the back = `PARTNER-MKT` (MBT marketing Studio C as a partner brand on a touring asset).

**Chase's photography work when the shoot is for the Inn/Magazine:**
The photo *work* is coded to whichever brand is using the photos. If the Magazine uses them, `MAG`. If the Inn uses them for listing photos, `INN`. The fact that Chase did the shooting doesn't make it `CPP` — `CPP` is for work where CPP is the billing vehicle (i.e., external client paid CPP to do a shoot). Internal ecosystem shoots are coded to the ecosystem brand that benefits.

**Amy's time as Arrie Aslin:**
Performance time at the Inn = `BLUES`. Tour performance = `TOUR`. Recording time = `TOUR` (currently — when Records has its own P&L, it gets its own code).

**Tracy's biz dev time:**
Whoever she's selling for. If she closes a Paul Green Realty B2B Directory deal, that's `MBT-PLATFORM`. If she books a wedding, `EVENTS`. If she sells Magazine sponsorship, `MAG`. If she sources a Tuthill Photography client, `TUTHILL-PHOTO`.

---

## 7. What this enables

Once hours + expenses + revenue are consistently classified, the accountant can produce:

1. **Entity-level P&L** — Big Muddy Natchez LLC profit/loss, MBT profit/loss, Tuthill Design profit/loss. Without classification, these are just blended ecosystem totals.
2. **Brand-level contribution margin** — what does the Inn actually cost to run? What does Magazine cost? What's the marginal profit on each wedding package?
3. **Partner retainer utilization reports** — "Studio C used 18 of their 20 April hours, 60% on `MAG`, 25% on `TOUR`, 15% on `MBT-PLATFORM`." Shows where the retainer is landing.
4. **Informed entity-structure decisions** — does Big Muddy Touring LLC need to spin out now? Look at the 90 days of `TOUR`-coded expenses and revenue and make the call with real numbers.
5. **Tax-efficient cost allocation** — some expenses are deductible in some entities and not others. Clean classification = easier for the accountant to optimize.

---

## 8. Action items

| Item | Owner | By when |
|---|---|---|
| Approve this taxonomy — Chase's go/no-go + any refinements | Chase | Before next retainer hours get logged |
| Share the taxonomy with Elijah + Miles + Tracy + Amy | Chase | After approval |
| Create the shared Google Sheet for Studio C retainer hours + copy for Tuthill | Chase or Cos | Week 1 of the 90-day plan |
| Add the code column to any existing expense tracker (QuickBooks line memos, Chase's personal expense sheet, MBT receipts) | Chase + accountant | Next accountant engagement |
| Retroactively code the known April-to-date hours (Chase's ramp-up work, scope docs, coordination) | Chase | With Tracy + Amy review |
| Code the December 2025 + Jan/Feb 2026 Tracy+Amy payments per this taxonomy (they'd be `MBT-PLATFORM` investment, with the December $2,500 as Arden pass-through which is its own code outside this taxonomy) | Chase | Before counsel engagement |

---

## 9. Cross-reference

- `docs/partners/tuthill-photography-scope-2026-04-20.md` §3 — the retainer bucket that uses this taxonomy for hours logging
- `docs/partners/inn-mbt-investment-history-2026-04-20.md` — the Tracy+Amy + Arden pass-through ledger referenced in §8 above
- `docs/partners/scan2plan-tuthill-account-2026-04-20.md` — why `S2P` is out of ecosystem P&L
- `docs/partners/vrbo-position-2026-04-20.md` + `channel-yield-strategy-2026-04-20.md` — Inn OTA strategy (classification-relevant for `INN` expenses)
- `docs/THE_THESIS.md` — ecosystem context
- `docs/90_DAY_PLAN.md` — operational week-by-week plan
- `tax-db/chase_finance.db` + CSVs — existing financial records that need this taxonomy applied retroactively when accountant engages

---

*End of taxonomy doc.*
