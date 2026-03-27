# Plan: MBT Homepage Copy Fix + Big Muddy Entertainment Page

## Context

The MBT homepage at `measurablybetterthings.com` has weak messaging:
- **"Run your business. Not your software."** — generic SaaS tagline, could be any platform
- **"Less than your electric bill"** — leads with price, frames MBT as a commodity
- **$1,350/mo comparison** — violates the honest-claims rule ($500-800/mo until gaps ship)
- **Feature-list subtitle** — sounds like Hootsuite + QuickBooks, not a sovereign business engine

Chase wants this fixed alongside a new **Big Muddy Entertainment** top-level story page that shows how Radio, Records, Touring, and Rise Up interconnect — plus the talent search and community enrichment program (free MBT credits for qualifying people).

---

## Part 1: MBT Homepage Copy Rewrite

**File:** `apps/web/app/measurably-better/page.tsx`

### New Hero
Replace the current hero with messaging that leads with the *problem* (fragmented tools that don't understand small towns), not a generic SaaS pitch.

**Proposed headline direction:**
> "Eleven tools. One town. Zero time."
> *or*
> "Your town deserves better tools."

**Proposed subtitle direction:**
> "Main Street businesses pay $500-800 a month across tools that don't talk to each other and don't understand your town. MBT replaces that stack — reviews, social, reporting, outreach — one system, $99/mo."

### Fix the Comparison Section
- Change "The old way" total from $1,350/mo to $500-800/mo range
- Remove inflated line items (Yelp ads $300, Bookkeeper $400)
- Keep honest items: Social media management ($200-300), Review monitoring ($50-100), Email platform ($30-50), Freelance content ($200+)
- Total: ~$500-800/mo → MBT: $99/mo

### Kill "Less than your electric bill"
Replace the CTA section headline with something value-forward:
> "One system. One login. Your whole business."

### Voice Check
MBT voice = "Swiss-clean authority." Current copy is folksy. New copy should be confident, clean, direct — no folksy metaphors.

### No CSS changes needed
The layout/design is solid. This is a copy-only rewrite.

---

## Part 2: Big Muddy Entertainment Page

**New file:** `apps/web/app/(entertainment)/page.tsx`
**CSS:** `apps/web/app/(entertainment)/entertainment.css`

Domain routing already configured: `bigmuddyentertainment` → `entertainment` route group.

### Guiding Principle
Product stories, value propositions, and synergy between brands. No org charts, no internal language, no revenue breakdowns. The finances stay on the back end.

**No individual names (JP or anyone else) — no deal is finalized.**

### Page Structure (long-scroll, single page)

1. **Hero** — "Records. Radio. Touring. Rise Up." + one-liner about the Mississippi corridor entertainment ecosystem. Photo of live show.

2. **The Four Brands** — Visual cards, each with a one-liner about what it does and why it matters:
   - **Records** — "Indie label. You keep your masters. Always."
   - **Radio** — "The sound of the Delta."
   - **Touring** — "Memphis to New Orleans and fourteen cities in between."
   - **Rise Up** — "The talent has always been here."

3. **Talent Search** — How we find artists along the corridor and what they get: a stage (Touring), a studio (Records), an audience (Radio), and a platform (Rise Up). CTA to apply/submit.

4. **Community Enrichment** — "Learn. Earn. Build." Free access to Measurably Better Things tools for qualifying artists, businesses, and community members. Interactive learning program: sign up → complete modules → earn credits → use the platform. Framed as investment in the people who make Main Street work.

5. **How It All Connects** — Simple visual showing the synergy: artists perform → shows create content → content builds audience → audience supports local businesses → businesses strengthen the corridor. The flywheel, told as a story.

6. **Footer** — "Big Muddy Entertainment — a division of Hillbilly Dreams, Inc."

### Design Tokens
Use the Big Muddy cream/charcoal/periwinkle palette from the demo app (already has `--bm-cream`, `--bm-charcoal`, `--bm-periwinkle` tokens). Convert inline styles to CSS classes using the project's token system.

### Existing Code to Reuse
- Demo page structure: `apps/demo/app/big-muddy/entertainment/page.tsx` — brand card pattern, color constants
- CSS pattern: Follow `apps/web/app/measurably-better/mbt-landing.css` — BEM naming, CSS custom properties
- Nav component: Check what the web app uses for navigation
- Domain routing: Already configured in `apps/web/config/domain-routes.ts` line 66

---

## File Changes Summary

| File | Action |
|---|---|
| `apps/web/app/measurably-better/page.tsx` | Edit — rewrite hero, comparison, CTA copy |
| `apps/web/app/(entertainment)/page.tsx` | Create — Big Muddy Entertainment story page |
| `apps/web/app/(entertainment)/entertainment.css` | Create — page styles using BM tokens |
| `apps/web/app/(entertainment)/layout.tsx` | Create — metadata/OG tags for bigmuddyentertainment.com |

---

## Verification

1. Run dev server (`pnpm dev` in apps/web)
2. Check MBT page at localhost with `NEXT_PUBLIC_BRAND=measurably-better` — verify new copy, honest comparison numbers, no "electric bill"
3. Check Entertainment page at localhost with `NEXT_PUBLIC_BRAND=entertainment` — verify all sections render, cards link correctly, enrichment tiers display
4. Run `pnpm lint` and `pnpm build` to ensure no build errors
5. Screenshot both pages for visual review