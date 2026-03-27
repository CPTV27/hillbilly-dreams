# Head of Product — Directive: MBT Homepage + Big Muddy Entertainment Page

**Date:** 2026-03-27
**From:** Chase (via CC build agent)
**Priority:** This sprint

---

## What's Happening

Two connected page builds are in progress:

### 1. MBT Homepage Copy Rewrite
The current miserablybetterthings.com hero is weak:
- "Run your business. Not your software." — generic, could be any SaaS
- "For less than your electric bill." — leads with price, frames MBT as a commodity
- Comparison section claims $1,350/mo savings — violates the honest-claims rule

**What needs to happen:**
- New hero that leads with the *problem* (fragmented tools that don't understand small towns)
- Comparison section uses $500-800/mo honest figure, not $1,350
- Kill the "electric bill" framing
- Voice must be "Swiss-clean authority" — not folksy

**File to update:** `apps/web/app/measurably-better/page.tsx`
**CSS (no changes needed):** `apps/web/app/measurably-better/mbt-landing.css`

### 2. Big Muddy Entertainment — Top-Level Story Page
New public-facing page for bigmuddyentertainment.com. Tells the story of how all entertainment brands interconnect.

**Sections:**
1. Hero — "Records. Radio. Touring. Rise Up."
2. Four brand cards (Radio, Records, Touring, Rise Up) with one-liners
3. Talent Search — finding artists along the corridor, what they get (stage, studio, audience, platform)
4. Community Enrichment — free MBT access for qualifying artists, businesses, community members through an interactive learning program (sign up → learn → earn credits → use the platform)
5. Flywheel — how the brands feed each other
6. Footer

**New files needed:**
- `apps/web/app/(entertainment)/page.tsx`
- `apps/web/app/(entertainment)/entertainment.css`
- `apps/web/app/(entertainment)/layout.tsx`

Domain routing already configured in `apps/web/config/domain-routes.ts` line 66.

---

## Rules for This Work

1. **No names on public pages.** JP Houston is a likely candidate for Entertainment division head but NO DEAL IS FINALIZED. Do not put JP's name, title, or any reference to him on any public-facing page. Same for any other unconfirmed person.

2. **Honest claims only.** MBT replaces $500-800/mo in tools. Not $1,350. Not $2,839. Only claim what's demoable on Chase's phone today. Gap analysis at `~/tax-db/PRODUCT_GAP_ANALYSIS.md`.

3. **No revenue breakdowns on public pages.** The Entertainment page tells product stories, value propositions, and brand synergy. How the brands make money stays internal.

4. **Brand voice separation:**
   - MBT = "Swiss-clean authority. The most elegant way to do everything." Inter font only.
   - Big Muddy Entertainment = warm, editorial, the Big Muddy cream/charcoal/periwinkle palette. Abril Fatface display, Inter body.
   - These two brands must NOT look related. Font firewall enforced.

5. **No tech jargon on customer-facing pages.** No tokens, latency, throughput, Vertex AI, Cloud Run, namespaces. Write for a restaurant owner, not a developer.

6. **Community Enrichment tiers:**
   - Artists/Musicians → up to $99/mo free MBT access (The Engine)
   - Small Businesses → up to $49/mo free MBT access (The Works)
   - Community/Individuals → up to $20/mo free MBT access (The Listing)
   - Eligibility: tiered by need across all three tracks

---

## Files to Update

After reviewing this directive, update these files:

| File | What to Update |
|------|---------------|
| `memory/agent_handoff_head_of_product.md` | Add Big Muddy Entertainment page + MBT homepage rewrite to Active Work section. Add community enrichment program to Product Decisions Made. |
| `memory/project_big_muddy_entertainment.md` | Already exists — verify accuracy, add any product decisions |
| `~/tax-db/PRODUCT_GAP_ANALYSIS.md` | Add community enrichment as a product line if not already there |

---

## Product Decisions Needed

1. **Community enrichment qualification criteria** — What's the actual process for determining who qualifies? Self-attestation? Income verification? Application review? This affects the onboarding flow.

2. **Credits system spec** — How do credits work? 1 module = X credits? What do credits unlock? This needs a product spec before Frontend can build it.

3. **Talent search application flow** — What does an artist submit? Audio samples? Bio? Where does it go? Who reviews it?

These are P2 behind the page builds themselves (the pages can launch with "coming soon" CTAs for the application flows), but they need specs before Month 2.

---

## Routing

- `[ROUTE TO VOICE]` — MBT hero copy, Entertainment page copy, community enrichment messaging
- `[ROUTE TO FRONTEND]` — Both page builds (tsx + css)
- `[ROUTE TO HUCK]` — Domain routing verification, layout files, build/deploy
- `[ROUTE TO ASANA]` — Add tasks if not already in the sprint
