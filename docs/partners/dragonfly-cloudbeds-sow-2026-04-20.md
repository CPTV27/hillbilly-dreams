# SOW — Dragonfly Strategists × Big Muddy Inn

**Status:** Draft, pre-free-consult. Canonical version pending Dragonfly consult call.
**Date:** 2026-04-20
**Owner:** Chase (pre-sign); Tracy (post-sign, day-to-day).
**Engagement type:** Fixed-fee project. NOT retainer. NOT hourly.
**Operational dependency for:** 90-day plan Inn occupancy ramp — Cloudbeds config quality directly affects Q3-Q4 peak revenue capture.

---

## Engagement Type

Fixed-fee project. Not a retainer. Not hourly. One-time engagement with optional post-launch check-ins.

## In Scope — What Dragonfly Does

1. **Cloudbeds audit** — current rate plans, room types, tax/fee config, restrictions, channel connections, reporting setup. Gap analysis.
2. **Rate plan architecture** — BAR, advance purchase, LOS-based, corporate/group, package rates.
3. **Dynamic pricing rules** — configured inside Cloudbeds: seasonality, day-of-week, demand triggers, competitor response.
4. **Policy framework** — cancellation, deposit, no-show, incidentals, check-in/out, pet fees, damage, minimum age. Written policy doc.
5. **Stay restrictions** — min-LOS on high-demand dates, closed-to-arrival, cutoff rules.
6. **OTA channel strategy** — which OTAs to list on, commission model, rate parity, inventory allocation, shut-off rules.
7. **KPI & reporting setup** — RevPAR, ADR, occupancy, pace, channel mix, pickup reports. Built inside Cloudbeds.
8. **Tracy training** — 2–4 live sessions so she can run it after handoff.
9. **Handoff documentation** — every rule, rate, and policy documented so Tracy + Cos can maintain it.

## Explicitly OUT of Scope

- Blues Room programming — event calendar, booking artists, show schedule. Owned by the Inn team + Arrie Aslin.
- Big Muddy Magazine — content, editorial, SEO. Owned by Tracy + MBT platform.
- MBT platform — Next.js site, Sanity CMS, direct booking flow, guest portal, email/SMS automation. Owned by MBT dev (Cos + Patch).
- Website design, booking engine UX, brand, creative, photography.
- Marketing campaigns — social, email, paid, PR.
- CRM, guest comms, automation.
- PMS selection — Cloudbeds is already chosen. No re-litigating.
- F&B — catering is third-party, no restaurant.

## Critical Inputs Dragonfly Must Consume

- Blues Room programming calendar → feeds demand-based pricing on show nights.
- Natchez festival/event calendar → seasonality model.
- Historical booking data from current Cloudbeds instance.
- Target direct-vs-OTA mix (we want direct to climb over time).
- Catering partner availability windows.

Their pricing and policy recommendations must assume this programming layer exists and feeds pricing — not the other way around.

## Deliverables (Fixed)

1. Cloudbeds audit report with gap list + fixes applied.
2. Rate plan & restriction matrix (document).
3. Dynamic pricing rules live in Cloudbeds.
4. Written policy document (cancellation, deposit, fees, restrictions).
5. OTA channel strategy memo.
6. Reporting dashboard / KPI setup inside Cloudbeds.
7. Tracy training — recorded sessions.
8. Final handoff pack — every config documented so MBT dev can reference it.

## Timeline — 6 to 8 Weeks

- Week 1: Discovery call, Cloudbeds access, audit
- Weeks 2–3: Strategy — rates, restrictions, policies, channel plan
- Weeks 4–5: Implementation inside Cloudbeds
- Week 6: Tracy training + handoff
- Weeks 7–8: 30-day pacing review + tune

## Expected Spend — Target Range (Pending Consult)

| Item | Target |
|------|--------|
| Fixed-fee engagement | **$12K – $18K** |
| Optional 30-day tune-up | $1.5K – $2.5K |
| Optional 60-day tune-up | $1.5K – $2.5K |
| **Total ceiling** | **$25K** |

Above $25K, walk. They're a Phoenix-based firm that services Drury and Outrigger — boutique-inn pricing should not be enterprise pricing.

Payment structure to propose: 40% on kickoff, 40% on implementation complete, 20% on handoff.

*Honesty flag: no real Dragonfly quote yet. This is a defensible target based on scoped hospitality consulting rates. Free consult will confirm or kill it.*

## Go / No-Go Gate — Before Signing

Walk if any of these come back from consult:

- Retainer-only model
- Hourly-only model with no cap
- Scope expansion into marketing, programming, or platform work
- Refusal to work inside Cloudbeds + respect the MBT platform boundary
- Quote above $25K without strong justification
- No named senior advisor attached to the project

## Success Looks Like

- Cloudbeds fully configured and documented by Week 6.
- Tracy running day-to-day without Dragonfly by Week 8.
- 30-day pacing review shows measurable improvement in ADR, channel mix, or pace vs. baseline.
- Zero ongoing dependency. We own the outputs.

## Integration With 90-Day Plan (Q2 May–July)

Dragonfly engagement, if signed, runs during Weeks 2–8 of the 90-day plan. Specifically:

- **Week 2 (May 8–14):** Discovery call + Cloudbeds access (if signed Week 1)
- **Weeks 3–4:** Strategy phase (Tracy feeds Blues Room calendar + Natchez festival data)
- **Weeks 5–6:** Implementation (Amy supports with room-type + catering context)
- **Week 7:** Tracy training sessions
- **Week 8:** 30-day pacing review (beginning of June)

**Critical dependency:** Dragonfly's dynamic pricing rules consume Blues Room programming calendar. Amy must have a realistic Blues Room calendar locked by May 14 (already in the 90-day plan as Week 1 deliverable). If Amy's calendar slips, Dragonfly's pricing model goes in half-built.

**Budget impact:** $12-18K spend in May–June. Adjust the Y1 cost structure: original $296k run-rate → $308-314k after Dragonfly. Cost per Y1 ADR point captured should justify this in the first Q4 peak booking window.

## Open Questions Before Signing

1. Which senior advisor at Dragonfly is attached to the project? Named individual, not "our team."
2. Does Dragonfly have experience with 6–10 room boutique properties specifically? Their Drury/Outrigger portfolio skews enterprise.
3. Will they respect the MBT platform boundary — specifically, not recommending PMS changes or pushing for integrations into our custom Next.js booking flow?
4. Can they onboard our existing Cloudbeds instance without requiring a fresh setup?
5. What's the data-sharing model — do we retain all config post-engagement, or do they hold anything proprietary?

---

**Companion docs:**
- `docs/THE_THESIS.md` — overall ecosystem thesis
- `docs/90_DAY_PLAN.md` — the 90-day operational plan Dragonfly plugs into
- `docs/STORY_KIT.md` — canonical framing (send to Dragonfly pre-consult so they see the context)
