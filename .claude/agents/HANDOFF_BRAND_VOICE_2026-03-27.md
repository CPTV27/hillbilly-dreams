# Brand Voice Agent — Directive: MBT + Entertainment Copy

**Date:** 2026-03-27
**From:** Chase (via CC build agent)
**Priority:** This sprint

---

## Assignment

Write copy for two pages. These are connected but use completely different brand voices.

---

## Page 1: MBT Homepage Rewrite

**Voice:** Swiss-clean authority. Confident, direct, elegant. No folksy metaphors, no SaaS buzzwords, no "electric bill" comparisons. Think Apple product page meets Stripe landing page. The most elegant way to do everything.

**Font:** Inter only. Never a serif.

**What to replace:**

Current hero (kill this):
> "Run your business. Not your software."
> "One system that handles your reviews, social media, bookkeeping, and customer outreach. For less than your electric bill."

**New hero direction:** Lead with the problem, not the solution. Main Street businesses are drowning in fragmented tools that don't talk to each other and don't understand their town.

**Constraints:**
- Savings claim: $500-800/mo. NOT $1,350. NOT $2,839. Only what's demoable today.
- No tech jargon. Customer is a barber shop owner, not a developer.
- Three value prop cards currently: "Reviews on autopilot," "Social media that runs itself," "Know your numbers" — these are okay but could be sharper. Rewrite if you have something better.
- Comparison section: "The old way" vs "Measurably Better" — fix the line items and totals to match honest claims.
- CTA section: Replace "Less than your electric bill" with something value-forward.

**Deliver:** Full copy for all sections of `apps/web/app/measurably-better/page.tsx`. Include headline, subtitle, value prop cards (heading + body text), comparison line items, and CTA section.

---

## Page 2: Big Muddy Entertainment

**Voice:** Warm, editorial, inviting. The Big Muddy voice — not dark like Touring, not silly like Radio, but the umbrella tone that connects all four brands. Think: a well-written program you'd pick up at a music festival. Confident but approachable. Story-driven.

**Font:** Abril Fatface for display headings, Inter for body. Big Muddy cream/charcoal/periwinkle palette.

**Sections to write:**

### Hero
Headline: Something around "Records. Radio. Touring. Rise Up." or your own take.
Subtitle: One sentence about what Big Muddy Entertainment is — the Mississippi corridor's entertainment ecosystem.

### Four Brand Cards
One-liner descriptions. Keep them punchy:
- **Big Muddy Records** — indie label, masters retained, analog warmth
- **Big Muddy Radio** — the sound of the Delta, outlaw energy
- **Big Muddy Touring** — Memphis to New Orleans, 14+ cities, live shows
- **Rise Up Entertainment** — talent search, artist development, the pipeline

### Talent Search Section
Heading + 2-3 sentences. The pitch: "The talent has always been here. We find artists along the Mississippi corridor and give them a stage, a studio, an audience, and a platform."
Include a CTA placeholder: "Submit your music" or similar.

### Community Enrichment Section
Heading + explanation of the program. Three tracks:
- Artists/Musicians → free MBT access (up to $99/mo value)
- Small Businesses → free MBT access (up to $49/mo value)
- Community/Individuals → free MBT access (up to $20/mo value)

The framing: This is an interactive learning program. Sign up, complete modules, earn credits, use the platform. It's investment in the people who make Main Street work — not charity, not a handout. You learn the tools, you earn access.

**Do NOT mention revenue, funding sources, municipal grants, or "how this makes money." That's internal. The public page is about the value to the participant.**

### Flywheel / How It Connects
2-3 sentences or a simple narrative showing how the brands feed each other: artists perform → shows create content → content builds audience → audience supports local businesses → businesses strengthen the corridor. Tell it as a story, not a diagram.

---

## Hard Rules

1. **NO NAMES.** No JP Houston, no division heads, no personnel. Brand-forward only.
2. **Brand separation is absolute.** MBT copy must never feel like Big Muddy copy. Different voice, different font, different energy. If you wrote both and they sound similar, one is wrong.
3. **No tech jargon.** No tokens, APIs, AI models, cloud infrastructure. Write for humans.
4. **No revenue language on public pages.** No "revenue streams," "monetization," "funding." The public page tells the story. The pitch deck tells the business model.

---

## Files to Update After Writing

| File | What to Update |
|------|---------------|
| `memory/project_brand_voices.md` | Add Big Muddy Entertainment umbrella voice description if not already there |
| `.claude/agents/BRAND_DESIGN_RULES.md` | Add Entertainment page voice/palette if missing |

---

## Deliver Format

Return copy as plain text organized by section, ready to paste into the TSX files. Use markdown headings to label each section. Frontend agent will handle the markup and styling.

Example:
```
## MBT Hero
**Badge:** Measurably Better Things
**Headline:** [your headline]
**Subtitle:** [your subtitle]
**CTA Primary:** [button text]
**CTA Secondary:** [button text]

## MBT Value Prop 1
**Heading:** [heading]
**Body:** [body text]
```
