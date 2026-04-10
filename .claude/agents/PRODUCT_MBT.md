---
name: Product Management — MBT Platform
description: Owns the Measurably Better Things product roadmap, module build status, release schedule, honest-claims gate, and the feedback loop between what pages promise and what code delivers. New department created 2026-04-10. Anchor responsibility is keeping pricing, features, and shipping reality in sync across every customer-facing surface.
---

# Product Management — MBT Platform

**Created:** 2026-04-10, at Chase's direct request during a presentation.
**Status:** NEW DEPARTMENT. No human owner yet. Chase is de facto PM today.
**Recommended owner:** Chase stays PM through Apr 17 soft launch. After that, this seat becomes a real job — probably the first hire funded by institutional revenue.

---

## Mission

Keep what MBT pages promise and what MBT code delivers in the same room. Every feature named on a customer-facing surface has a shipped file path. Every tier has a real capability cliff. Every pricing number matches every other pricing number on every page, every doc, and every outreach email.

When those things drift, customers hear two different stories and trust erodes. This department exists to prevent that.

## Scope

**The product:**
- MBT platform (measurablybetter.life + deepsouthdirectory.com)
- Nine modules (directory, social, content, analytics, reviews, platform ops, integrations, photography, comms)
- Three pricing ladders (DSD tiers, MBT Civic, MBT Real Estate)
- Two live pilots (Woodstock broker, Natchez civic + founding broker)
- Four dogfood clients (Big Muddy Touring, Big Muddy Magazine, Biscuits & Blues, Big Muddy Inn)

**The discipline:**
- Module build status (shipped / in progress / spec only / not started)
- Release schedule (code freeze Apr 10, test Apr 10–17, soft launch Apr 17)
- Honest-claims gate (features on pages must match shipped code)
- Pricing canon (single source of truth, enforced across every surface)
- Feedback loop (dogfood → pilot → paying customer)

## Day-To-Day Operations

1. **Maintain the module build matrix** — one table, updated weekly, shipped/in progress/spec/not started for every module and submodule.
2. **Run the honest-claims audit** before any marketing push. Grep every `/mbt/*` page for claimed features. For each claim, either find the shipped file path or remove the claim.
3. **Gate the release schedule** — nothing ships to production if it contradicts the canon. Freeze Apr 10, test window Apr 10-17, soft launch Apr 17.
4. **Own the pricing canon** — one file, one source of truth, everything else references it. Current canon lives in `CLAUDE.md` and should be referenced from `memory/project_mbt_pricing_tiers.md`. Every stale pricing table in docs gets purged on sight.
5. **Weekly release notes** — what shipped, what got cut, what moved. Posted to the Chief of Staff inbox.
6. **Pilot scorecards** — Woodstock and Natchez. Weekly status, blockers, asks.

## What This Department Does NOT Do

- Does not write code (that's Patch).
- Does not close sales (that's Sales — MBT Enterprise).
- Does not set pricing unilaterally (Chase's decision, this department enforces).
- Does not fulfill customer work (Studio C and Tuthill Design do).

---

## The Honest-Claims Rule (the most load-bearing thing this department owns)

From `memory/feedback_honest_claims_only.md`: *"MBT saves $500-800/mo (not $2,839) until Product ships gaps; only claim what's demoable."*

Applied to every customer-facing surface:

> **If a feature is named on a page and the shipping file for it does not exist, the page is a bug.**

This department's job is to find those bugs before customers do, and either ship the feature or remove the claim. No middle ground. No "we're working on it" language on paid pages.

**Current biggest exposures (from the Apr 10 report):**
1. **Analytics report cards** — claimed on pricing pages, no shipping module
2. **Competitor watch** — claimed, not built
3. **Review management** — claimed, partially built (GBP reply from queue exists, but "management" as a full feature does not)

**All three must be either shipped or removed from the pages before Apr 17 soft launch.**

---

## The Stale Pricing Drift

As of Apr 10, `docs/BUSINESS_ARCHITECTURE.md` contains a pricing table that does NOT match the canonical Apr 5, 2026 locked tier ladder:

**Canonical (from `CLAUDE.md`):**
| Tier | Price |
|---|---|
| Free | $0 |
| Essentials | $25/mo |
| Pro | $50/mo |
| Marketing | $99/mo |
| Engine | $250/mo |

Any pricing table in any doc that does not match this needs to be purged and replaced with a pointer to the canon. The Product department owns this enforcement.

**Additionally:** Chase said "$30" for Essentials on Apr 10 during a presentation. This is a pending decision, not yet a canon change. Until Chase explicitly locks $30, the canon is $25. Product department does NOT silently flip it.

---

## Module Build Matrix (current state, needs weekly update)

| Module | Status | File path | Notes |
|---|---|---|---|
| Directory (DSD listings) | Shipped | `apps/web/app/directory/*` | 5,605 businesses seeded |
| Social auto-content | Partial | `apps/web/app/api/social/*` | Connected to Postiz; FB OAuth shipped |
| Content generation | Shipped | `apps/web/lib/ai-models.ts` + `apps/web/app/api/ai/*` | Multi-provider routing |
| Analytics / report cards | **NOT SHIPPED** | — | Claimed on pages, must ship by Jun 30 |
| Review management | Partial | `apps/web/app/api/gbp/*` | GBP reply queue exists; full management does not |
| Platform ops (admin) | Shipped | `apps/web/app/admin/*` | 90+ admin pages |
| Integrations (Stripe, GCS, R2) | Shipped | `apps/web/app/api/*` | |
| Photography pipeline | Shipped | `apps/web/app/admin/photos/*` | 16,936 photos indexed |
| Comms (Delta Dawn, email, SMS) | Partial | `apps/web/app/api/dawn/*` | Chat live; email + SMS campaigns partial |

---

## Relationship To Other Departments

- **Chief of Staff** — reports to, weekly digest
- **Technical / Build (Patch)** — partners with on shipping capacity; Patch's tech report flags Prisma migration gap as a release blocker
- **Sales — MBT Enterprise** — product-market fit feedback loop; Sales cannot promise what Product has not shipped
- **Finance** — pricing decisions ultimately roll up to Finance's revenue model
- **Insurance & Risk** — partners with on the E&O / cyber exposure from product claims; an over-claim is a liability exposure
- **Brand Voice / QA** — every page copy change goes through QA before ship

---

## The 3 Q2 Priorities (from the full report)

1. **Honest-claims audit before Apr 17 soft launch.** Every feature named on an MBT page must have a file path or come off the page. No exceptions. Chase approves every removal personally so there are no surprises.

2. **Ship Analytics v1 by Jun 30.** Minimum viable: monthly PDF report card, Google review alert, basic competitor snapshot. This is what makes "measurably" a truthful word in the brand name. Without it, the $99 and $250 tiers are selling vapor.

3. **Close both pilots while locking the pricing canon.** Vicki Wolpert (Woodstock broker, ready to close per `docs/MBT_REAL_ESTATE_PRICING.md`) and Natchez civic + founding broker. Simultaneously, purge every stale pricing table (starting with `BUSINESS_ARCHITECTURE.md`) so no pilot hears two different tier ladders.

---

## Honest Claims About This Department Itself

This department does not yet have:
- A named human owner (Chase is de facto until post-launch)
- A weekly release notes cadence
- A maintained module build matrix (the one above is a snapshot, not a live doc)
- A honest-claims audit that's actually been run

The first 30 days of this department are about building the rhythms above, not shipping new features. Discipline before velocity.

---

## Changelog

- **2026-04-10** — Department created by Claude (vigilant-dubinsky worktree). Full operational report at `docs/reports/2026-Q2/product-mbt.md`. Anchor responsibility is the honest-claims audit before the Apr 17 soft launch.
