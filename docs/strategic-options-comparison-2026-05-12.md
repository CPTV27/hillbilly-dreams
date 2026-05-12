# Strategic Options — Side-by-Side Comparison

**Date:** 2026-05-12
**Status:** Comparison of three real strategic paths for Big Muddy Touring + Big Muddy Inn, given the locked-in decisions:
- MBT brand dropped (per `memory/feedback_drop_mbt_brand.md`)
- Job Two (productizable platform) dropped (per `memory/feedback_job_one_focus.md`)
- Two-umbrella brand picture: Big Muddy Touring + Big Muddy Inn

**Companions:**
- `docs/first-principles-strategy-2026-05-12.md` — the underlying strategy
- `docs/operational-simplicity-option-2026-05-12.md` — Option A in detail
- `docs/off-the-shelf-ecosystem-analysis-2026-05-12.md` — the prior service-by-service analysis
- `docs/infrastructure-cost-analysis-2026-05-11.md` + `docs/infrastructure-cost-reduction-analysis-2026-05-11.md` — current state baseline

---

## The three options

| | **Option A — Operational Simplicity** | **Option B — Hybrid** | **Option C — Status Quo** |
|---|---|---|---|
| **One-line summary** | Everything off-the-shelf. One Squarespace site + SaaS for each function. | Keep ONE thing custom (the Directory), off-the-shelf the rest. | Continue running the custom Next.js platform. Iterate on what exists. |
| **Custom code we maintain** | Effectively zero. The whole `apps/web` codebase frozen. | One small surface: the `/circuit/venues` Directory module + minimal hosting. | The full multi-tenant Next.js app + Sanity + Neon + Hetzner stack. |
| **Public-facing tools** | Squarespace (1–2 sites) · Cloudbeds · Beehiiv · Airtable · DistroKid · Klaviyo · Buffer · Eventbrite · Shopify Lite | Same as A, but Directory stays as a `/circuit/venues` page on Squarespace OR keep one tiny Next.js deployment for the Directory | Next.js app on Vercel · Sanity CMS · Neon Postgres · Hetzner box · DigitalOcean droplet · custom AI routing · custom Directory · custom Commerce |
| **Monthly BMT-side spend** | ~$601 | ~$650 | $740–1,005 (today) |
| **Annual BMT-side spend** | ~$7,200 | ~$7,800 | $8,900–12,100 |
| **Savings vs. today** | $1,700–4,800/yr | $1,300–4,200/yr | $0 baseline |
| **Chase's labor on platform maintenance** | ~0 hrs/wk | ~2–3 hrs/wk | 5–10 hrs/wk |
| **Number of active domains** | 2–3 (bigmuddytouring.com + bigmuddyinn.com + maybe redirects) | 2–3 + the Directory page on Squarespace or its own subdomain | 14 (current state) |
| **Time to migrate** | 90 days (3-phase plan in operational-simplicity doc) | 60 days (just the magazine + radio + commerce moves) | 0 days (no migration; just continue) |
| **Reversibility** | Reversible — repo stays as historical reference; could rebuild custom later | Highly reversible — only partial migration | N/A (already where we are) |

---

## What each option preserves vs. gives up

### Option A — Operational Simplicity

**Preserves:**
- 5–10 hrs/week of Chase's time (the biggest single value).
- Brand consistency under Big Muddy Touring (one site, one design system).
- All current business functions (Inn, touring, magazine, records, radio, directory).
- Ability to add Sean Davis as a partner without onboarding him to a custom stack.
- Easy handoff if any partner steps back.
- Maximum predictability of monthly bills.

**Gives up:**
- The Directory's bespoke filterable UI (becomes an Airtable embed).
- Cross-brand data integration (each SaaS is a silo).
- The custom multi-party Commerce flow (Shopify Lite or Stripe Payment Links instead).
- Any future ability to add bespoke product features without paying SaaS limits or switching providers.
- The sunk cost of the custom platform (parked as historical reference; not actively used).

**Best fit if:**
- Chase wants to fully exit platform engineering.
- The 5–10 hrs/week of recovered time is the most valuable lever.
- We want to onboard new partners (Sean, future Hospitality Coordinator) with zero stack learning curve.
- Lifestyle goal from THE_THESIS is the primary driver.

### Option B — Hybrid

**Preserves:**
- All of Option A's preservation list, plus:
- The Directory as a bespoke Big Muddy asset. It's a real moat — search-indexed, BMT-branded, growing scout map of the corridor. Today this lives at `/circuit/venues`. Could continue running as a small Next.js deployment on Hetzner ($40/mo) or even just a static page rebuilt from the YAML data.

**Gives up:**
- Less than A. Loses cross-brand integration, the custom Commerce flow, the multi-tenant routing. Keeps the one piece that's genuinely unique.

**Costs more than A:**
- ~$50/mo more (Hetzner stays for the Directory).
- ~2–3 hrs/week more (some maintenance on the Directory remains).

**Best fit if:**
- Chase values keeping at least one piece of unique-asset differentiation.
- The Directory specifically is worth the modest extra cost + labor.
- This is the "sensible middle" path that doesn't fully abandon what's been built.

### Option C — Status Quo

**Preserves:**
- Everything as it exists today.
- Maximum flexibility for any future bespoke feature.
- Brand consistency that the custom platform delivers (full control of every UI).
- The technical asset of the multi-tenant Next.js app.
- "We could productize this later" optionality (though this was already dropped per the Job One decision).

**Gives up:**
- $1,700–4,800/yr in potential savings.
- 5–10 hrs/week of Chase's time, indefinitely.
- The simplicity of one-platform-per-function.
- Ease of partner onboarding (Sean needs to learn the BMT stack at some point).

**Best fit if:**
- Chase actively enjoys the platform engineering work.
- The team has slack to keep maintaining custom infrastructure.
- We expect to need bespoke features that no SaaS can deliver.
- The lifestyle pressure from THE_THESIS isn't acute right now.

---

## How each option lands against THE_THESIS objectives

| THE_THESIS objective | Option A | Option B | Option C |
|---|:-:|:-:|:-:|
| Rich, exciting life for three equity partners | ✓✓✓ | ✓✓ | ✓ |
| The Inn becomes meaningfully profitable | ✓ | ✓ | ✓ |
| Amy plays music + records | ✓ | ✓ | ✓ |
| Chase's photography practice continues | ✓✓✓ | ✓✓ | ✓ |
| MBT keeps costs low (Job One) | ✓✓✓ | ✓✓ | ✓ |
| Partner studios amplified | ✓ | ✓ | ✓ |
| Hit $200k floor / $250k profit / $330k baseline | ✓✓ | ✓✓ | ✓ |
| Quality of life as the ceiling | ✓✓✓ | ✓✓ | ✓ |

Most objectives are served by all three. **The differentiation is on labor cost (Chase's time) and operational complexity.** Option A is clearly best on those dimensions; Option C is clearly worst.

---

## Adjacent decisions also on the menu

These intersect with the above but are separate calls. Each has its own decision space.

### Sean Davis partnership scope

| | Option | Cost / time |
|---|---|---|
| Aggressive | Full Season One: 6–8 Arcade shows + Records signing + public collaborator credit | Higher commitment, higher risk |
| **Recommended** | **One trial Arcade show with Doug Duffy and Badd. Decide on full Season One based on the result.** | Lower commitment, learns by doing |
| Conservative | Delay any Sean engagement until Inn hits $250k profit milestone | Defers the upside |

### Bearsville Creative

Already decided per `feedback_drop_mbt_brand.md` and the first-principles strategy: **defer activation to Y2+**. Chase living in the Hudson Valley personally is independent of brand launch.

### Big Muddy Radio audio stack

Already on the table per the partner review packet (Tracy + Amy reviewing in Asana now): freeze / commit / partial / status quo. The infrastructure-simplicity options above all align with **freeze** if not already chosen.

### The legal entity name

Tracy is filing **Measurably Better Things LLC**. With the brand dropped, the entity name question is separate:
- Keep MBT LLC as the legal entity, operate Big Muddy Touring as a DBA (lowest disruption).
- Switch the filing to **Big Muddy Touring LLC** if not yet final (cleanest, but needs to happen fast).
- Switch to a more neutral parent name (e.g., Big Muddy Holdings) for future flexibility.

**This is the most time-sensitive open item.** If Tracy has already filed, option 1 (keep MBT LLC name, operate as DBA) is the easy path. If filing isn't done yet, the brand-aligned name is on the table. Worth a check with Tracy this week.

### DSD (Deep South Directory)

With MBT gone, DSD's positioning changes. Options:
- **Retire DSD entirely** — `deepsouthdirectory.com` 301-redirects to bigmuddytouring.com.
- **Keep DSD as a sibling SEO brand** operating independently (per the 2026-04-17 positioning update).
- **Fold DSD into Big Muddy Directory** — the corridor-wide listings become part of `bigmuddytouring.com/circuit/venues`.

Default suggestion: fold DSD into Big Muddy Directory under the Big Muddy Touring umbrella. Less surface area, consistent brand. But Chase's call.

---

## The decision frame

Three real options on infrastructure. Three reasonable choices.

**The question is what Chase optimizes for.**

| Optimize for: | Pick: |
|---|---|
| Maximum recovered Chase time + maximum simplicity | **Option A** |
| Reasonable simplicity + one unique-asset moat preserved (the Directory) | **Option B** |
| Maximum flexibility for future bespoke features + active platform-engineering work | **Option C** |

Given the decisions already made (drop MBT brand, drop Job Two productization, focus on Job One, lifestyle goal from THE_THESIS as primary), **Option A or Option B is most consistent.** Option C is internally inconsistent with the prior decisions — keeping the custom platform while having explicitly given up the reasons to have it.

But this is just an analysis — Chase decides.

---

## What happens after the decision

Whichever option Chase picks, there's a Tracy + Amy review step. The infrastructure decision affects:
- Their workflow (especially Amy on magazine + show comms; Tracy on past-guest email + Inn marketing)
- The financial frame in THE_THESIS ($12k/yr line item changes)
- The hand-off picture (Option A is most easily handed off; Option C least)

This is partner-decision territory. The doc that goes to Tracy + Amy on this should be neutral-fact (per the saved memory rule), not advocacy.

---

## Open follow-ups

- **Cross-check the legal entity name** with Tracy + counsel this week. Time-sensitive.
- **Decide on DSD** when the brand decision is fully implemented.
- **Update partner-facing docs** that reference MBT regardless of option chosen.
- **Pick a pilot** (the Beehiiv Magazine pilot is the cheapest test for Option A or B).

— Chase, May 2026
