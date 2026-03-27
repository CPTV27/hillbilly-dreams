# Plan: MBT Homepage Rewrite + Big Muddy Entertainment Page + Compliance Fixes

## Context

A full compliance audit (March 27, 2026) revealed the MBT landing page violates every QC rule simultaneously — tech jargon on a customer page, hardcoded fonts/colors, stale model names, inflated savings claims, deprecated copy in the hero. Beyond the copy problems, there are 4 RED issues, 5 YELLOW, and 9 ORANGE findings across the codebase.

Chase's reframe: the MBT page shouldn't be a SaaS pitch at all. It should be a magazine-style editorial page that tells the story of getting your life back — not "cheaper better software" but "what if running a business felt like running a business again?"

Separately, a new Big Muddy Entertainment page needs to tell the ecosystem story (Radio, Records, Touring, Rise Up, talent search, community enrichment).

---

## Part 1: MBT Homepage — Editorial Rewrite

**File:** `apps/web/app/measurably-better/page.tsx`
**CSS:** `apps/web/app/measurably-better/mbt-landing.css`

### The Creative Direction

Not a SaaS landing page. A magazine feature. And not a software story — an **ecosystem story**.

**Core reframe:** The $99 isn't for software. It's for membership in a media ecosystem. Deep South Directory puts you on the map. Big Muddy Magazine tells your story. Big Muddy Radio puts your name in someone's ear. Social campaigns feature your business alongside the entertainment and the corridor. The AI tools are the delivery mechanism — they make participation effortless. But the product is access to the audience.

No SaaS competitor can offer this because they don't own media properties.

The magazine-feature structure:

1. **The Image** — Full-bleed photo. You're already there, you feel it before you read a word.
2. **The Tension** — Not "bad software" but *invisibility*. You're great at what you do, but nobody knows you're here. The chains have marketing departments. You have a Facebook page you haven't updated since October.
3. **The Turn** — "What if the whole town was telling your story?" What if a magazine wrote about you, a radio show mentioned you, a directory surfaced you to every visitor, and your social media just... ran?
4. **The Proof** — We built it, we live it, here's Natchez. The Directory. The Magazine. The Radio. Real businesses, real coverage, real results.
5. **The Vision** — Not a product demo. A picture of what it feels like when your business is part of something bigger — a corridor, a community, a media network that works for you.
6. **The Invitation** — Not "sign up" but "come see." Or "get listed."

### What This Means for the Code

- **Longer page, more photography, more white space, fewer feature cards.** The current 7-section rush (hero→value→compare→CTA→footer) becomes a slower editorial scroll.
- **Pricing section moves to its own route** (`/measurably-better/pricing`). It breaks the spell on the story page. Dedicated URL is better for walk-in sales conversations anyway.
- **Kill all tech jargon.** No tokens, latency, throughput, Vertex AI, Cloud Run, Cloud SQL, Sovereign VPC. Write for a restaurant owner.
- **Kill "MB" logo reference** — must be "MBT" per `feedback_mbt_not_mb`.
- **Hardcoded fonts → `var(--font-body)` / `var(--font-display)`**
- **Hardcoded hex colors → CSS custom properties** (`var(--bg)`, `var(--text)`, `var(--accent)`, etc.)
- **Voice: Swiss-clean authority.** Confident, elegant, direct. No folksy metaphors.

### Compliance Fixes Bundled In (RED #1, #4)

| Audit Finding | Fix |
|---|---|
| "MB" not "MBT" | Fix badge text |
| Tech jargon (tokens, latency, throughput) | Remove entirely — not on customer page |
| "Gemini 1.5 Pro · Vertex AI · Cloud Run" tech strip | Remove entirely |
| Hardcoded `fontFamily: 'system-ui'` | Replace with `var(--font-body)` |
| Hardcoded hex colors object | Replace with CSS custom property references |
| Deprecated "reads your books" hero | Replace with editorial hero |
| $1,350/mo comparison | Either honest $500-800 figure on pricing page, or no comparison on story page at all |

### New File Structure

| File | Action |
|---|---|
| `apps/web/app/measurably-better/page.tsx` | **Rewrite** — editorial magazine-style story page |
| `apps/web/app/measurably-better/mbt-landing.css` | **Rewrite** — support editorial layout (full-bleed images, generous whitespace, typographic hierarchy) |
| `apps/web/app/measurably-better/pricing/page.tsx` | **Create** — dedicated pricing page (moved from main page) |
| `apps/web/app/measurably-better/pricing/pricing.css` | **Create** — pricing page styles |

### Pricing Page Content (Locked Decisions)

| Tier | Price | Key Feature |
|---|---|---|
| Free | $0 | Directory browsing, 100 AI queries/mo |
| The Listing | $20/mo | Featured listing + basic tools |
| The Engine | $99/mo | Full AI business OS |
| The Operator | $1,500/mo | 10 seats, full outsourced OS, $500K+/yr businesses |
| Institutional | Custom | Tourism boards, municipalities |

**Honest claims rule:** Features not yet shipped get "Coming Soon" tags. As of March 27:
- Apr 7: Competitor snapshot
- Apr 14: Review response flow
- Apr 21: Social media publishing + monthly report PDF

---

## Part 2: Big Muddy Entertainment Page

**New file:** `apps/web/app/(entertainment)/page.tsx`
**CSS:** `apps/web/app/(entertainment)/entertainment.css`
**Layout:** `apps/web/app/(entertainment)/layout.tsx`

Domain routing already configured: `bigmuddyentertainment` → `entertainment` (domain-routes.ts:66).

### Guiding Principles
- Product stories, value propositions, brand synergy. No org charts, no revenue breakdowns.
- **No individual names** — JP Houston deal not finalized. Brand-forward only.
- Voice: Warm editorial umbrella. Abril Fatface display + Inter body. Big Muddy cream/charcoal/periwinkle palette.

### Page Structure

1. **Hero** — "Records. Radio. Touring. Rise Up." Photo of live show. One-liner about the Mississippi corridor entertainment ecosystem.

2. **The Four Brands** — Visual cards:
   - **Records** — "Indie label. You keep your masters. Always."
   - **Radio** — "The sound of the Delta."
   - **Touring** — "Memphis to New Orleans and fourteen cities in between."
   - **Rise Up** — "The talent has always been here."

3. **Talent Search** — How we find artists, what they get (stage, studio, audience, platform). CTA to apply/submit.

4. **Community Enrichment** — "Learn. Earn. Build." Free MBT access for qualifying:
   - Artists/Musicians → up to $99/mo (The Engine)
   - Small Businesses → up to $49/mo (The Works)
   - Community/Individuals → up to $20/mo (The Listing)
   Interactive learning: sign up → complete modules → earn credits → use the platform.

5. **How It All Connects** — The flywheel told as a story: artists perform → shows create content → content builds audience → audience supports local businesses → businesses strengthen the corridor.

6. **Footer** — "Big Muddy Entertainment — a division of Hillbilly Dreams, Inc."

### Existing Code to Reuse
- Demo page: `apps/demo/app/big-muddy/entertainment/page.tsx` — card pattern, color constants
- CSS pattern: BEM naming, CSS custom properties (follow mbt-landing.css pattern)
- Domain routing: `apps/web/config/domain-routes.ts` line 66

---

## Part 3: Compliance Fixes (Waves 2-3)

### Wave 2: Owen/S2PX Removal (RED #3)

| File | Action |
|---|---|
| `apps/web/app/welcome/owen/page.tsx` | Delete or redirect to generic welcome |
| `apps/web/app/strategy/page.tsx:354` | Remove S2PX reference |
| `apps/web/app/nexus/page.tsx:91` | Remove "V. Owen Bush" |
| `apps/web/app/measurably-better/scan2plan/` | Disable or move to `_disabled/` |
| `apps/web/app/measurably-better/enterprise/` | Redirect away from Owen's experience |
| `apps/web/app/api/siri/analyze/route.ts` | Remove Owen fallback text |

### Wave 2: Stale Model Names (RED #2)

Replace "Gemini 1.5 Pro" with correct references across 12+ files. Customer-facing pages: remove model name entirely. Internal/API files: use `pickModel()` registry.

### Wave 3: Doc Cleanup (YELLOW)

| File | Action |
|---|---|
| `docs/PAGE_COPY_AND_UX.md` | Fix $499→$1,500 Operator price, remove deprecated hero, add "Coming Soon" to unshipped features |
| `docs/PRODUCT_CAPABILITIES.md` | Fix free tier to 100 queries/mo |
| `apps/web/config/hdx-narrative.ts` | Gut or delete — stale, references "Big Buddy", Owen, wrong pricing, wrong design language |
| `docs/DEPLOY.md` | Update from Vercel to Firebase App Hosting |
| `.claude/agents/brand-directive.md` | Clarify pricing ladder ($499 reference → $1,500 Operator) |

---

## Agent Handoffs

Two handoff prompts already created:
- `.claude/agents/HANDOFF_HEAD_OF_PRODUCT_2026-03-27.md` — Product decisions, file updates, routing
- `.claude/agents/HANDOFF_BRAND_VOICE_2026-03-27.md` — Copy assignments for both pages

**Voice agent delivers copy → Frontend builds pages → Huck deploys.**

---

## Verification

1. Run dev server (`pnpm dev` in apps/web)
2. MBT story page: `NEXT_PUBLIC_BRAND=measurably-better` — verify editorial layout, no tech jargon, no hardcoded styles, no "MB", no "electric bill"
3. MBT pricing page: `/measurably-better/pricing` — verify tiers, honest claims, "Coming Soon" tags on unshipped features
4. Entertainment page: `NEXT_PUBLIC_BRAND=entertainment` — verify all sections, no names, brand cards link correctly
5. `pnpm lint && pnpm build` — zero errors
6. Grep for "Owen", "S2PX", "Gemini 1.5", "electric bill" across customer-facing routes — zero hits
7. Grep for hardcoded `fontFamily` and hex colors in modified files — zero hits
