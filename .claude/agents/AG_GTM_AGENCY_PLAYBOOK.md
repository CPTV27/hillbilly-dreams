# GTM Agency Playbook — Hillbilly Dreams Inc

**Every brand in the HDI ecosystem gets treated like a new agency client.** Different voice, different audience, different plan. No two brands should ever sound the same.

## Required Reading (Before You Start)

Read these in order before working on any brand:
1. `.claude/agents/ORIGIN_STORY.md` — Why this exists
2. `.claude/agents/brand-directive.md` — Products, pricing, principles
3. `.claude/agents/BRAND_DESIGN_RULES.md` — Visual identity per brand
4. `memory/feedback_chase_voice.md` — Chase's writing voice (universal overlay)

Then read the specific Brand DNA file for the brand you're working on:
- `.claude/agents/brands/BRAND_DNA_{BRAND}.md`

---

## The Process

### Phase 1 — Client Onboarding & Discovery

Before writing a single word for a brand, answer these:

| Question | Why It Matters |
|---|---|
| **Who is the customer?** | Not "everyone." One person. Name them. What's their day like? |
| **What problem do they have right now?** | Not aspirational. What hurts today. |
| **Who else is trying to solve this for them?** | The competitive landscape — could be a person, a platform, or doing nothing |
| **What does this brand already have live?** | Pages, content, social, radio shows — inventory what exists |
| **How does this brand feed the ecosystem?** | Every brand either drives audience, revenue, or credibility to the others |

Output: A one-page brand brief. No fluff. Facts and observations.

### Phase 2 — Brand DNA

This is the voice document. It's the most important deliverable because everything else flows from it.

**Structure (mandatory for every Brand DNA file):**

```markdown
# Brand DNA — [Brand Name]

## Identity
- Entity / Parent
- Domains
- Theme class (from BRAND_DESIGN_RULES.md)
- Tagline

## Voice Attributes
3-5 adjectives, each with a one-sentence explanation and an example phrase.

## Anti-Patterns
What this brand NEVER sounds like. Specific examples of bad copy.

## Tone Spectrum
- When formal: [situation]
- When casual: [situation]
- When urgent: [situation]

## Vocabulary
- Words to use: [list]
- Words to avoid: [list]

## Reference Voices
"This brand sounds like [publication/person] talking to [audience] about [topic]."

## Differentiation
One sentence: how this brand sounds different from every other HDI brand.

## Example Paragraphs
Three paragraphs written in this brand's voice. Different topics, same voice.
These are the calibration samples — any agent should be able to match this tone.

## Visual Identity
Pulled from BRAND_DESIGN_RULES.md. Colors, fonts, photography style.
```

**Quality test:** Read the three example paragraphs out loud. If they could come from any of the other brands, the voice isn't distinct enough. Rewrite.

### Phase 3 — GTM Plan

90-day go-to-market plan. Not aspirational — what ships in the next 90 days.

**Structure:**

```markdown
# GTM Plan — [Brand Name]

## 90-Day Priorities
3-5 things, ranked. What ships first.

## Channel Strategy
Which of our owned channels matter for this brand:
- Radio (Big Muddy Radio — 18 shows)
- Magazine (Big Muddy Magazine — city guides, features)
- Directory (Deep South Directory — business listings)
- Social (Postiz — scheduled posts)
- Newsletter (email list)
- Website (the brand's own pages)

## Content Calendar — Month 1
Week-by-week: what gets published, where, in what format.

## Partnerships & Distribution
Who amplifies this brand? Municipality? CVB? Artists? Venues?

## Revenue Model
How does this brand make money or feed one that does?

## Success Metrics
What "working" looks like at 30, 60, 90 days. Be specific.
```

### Phase 4 — Production Order

Every GTM plan produces a list of assets that need to be created. Each asset maps to a ProductionJob in the pipeline.

**For each asset, specify:**

| Field | Maps to ProductionJob |
|---|---|
| Title | `title` |
| Format | `format` (:15 / :30 / :60 / 3:00 / 10:00 / static / article) |
| Visual direction | `veoPrompt` |
| Voiceover script | `ttsScript` |
| Music direction | `musicDirection` |
| Text overlays | `textOverlays` |
| CTA | `cta` |
| Voice | `voicePreset` |
| Quality | `veoQuality` (draft for testing, premium for final) |
| Campaign | Which ProductionCampaign this belongs to |

Assets can be created via `POST /api/productions` or through `/admin/productions/new`.

### Phase 5 — Quality Gate

**Before production starts:**
1. Chase reviews the Brand DNA file
2. Chase approves or sends back with notes
3. No content ships until Brand DNA is approved

**First 3 assets per brand:**
1. Agent produces the asset
2. Chase grades it (A through F)
3. If not an A, agent revises with specific feedback
4. Iterate until A
5. After 3 A-grade assets, the voice is locked

**After voice is locked:**
- Agent produces autonomously
- Chase does spot checks (1 in 5)
- Any drift gets flagged and the Brand DNA file gets updated

---

## The Brands

| # | Brand | DNA File | GTM File | Priority |
|---|---|---|---|---|
| 1 | Big Muddy Touring | `brands/BRAND_DNA_TOURING.md` | `gtm/GTM_TOURING.md` | High — anchor brand |
| 2 | Big Muddy Magazine | `brands/BRAND_DNA_MAGAZINE.md` | `gtm/GTM_MAGAZINE.md` | High — content engine |
| 3 | Big Muddy Radio | `brands/BRAND_DNA_RADIO.md` | `gtm/GTM_RADIO.md` | High — 18 shows live |
| 4 | Big Muddy Records | `brands/BRAND_DNA_RECORDS.md` | `gtm/GTM_RECORDS.md` | Medium — Mechanical Bull first |
| 5 | Big Muddy Entertainment | `brands/BRAND_DNA_ENTERTAINMENT.md` | `gtm/GTM_ENTERTAINMENT.md` | High — talent pipeline |
| 6 | Outsider Economics | `brands/BRAND_DNA_OE.md` | `gtm/GTM_OE.md` | Medium — philosophy arm |
| 7 | Measurably Better Things | `brands/BRAND_DNA_MBT.md` | `gtm/GTM_MBT.md` | High — revenue engine |
| 8 | Deep South Directory | `brands/BRAND_DNA_DSD.md` | `gtm/GTM_DSD.md` | High — data moat |
| 9 | BuyCurious Art | `brands/BRAND_DNA_GALLERY.md` | `gtm/GTM_GALLERY.md` | Low — marketplace |
| 10 | Studio C / Tuthill | `brands/BRAND_DNA_STUDIO.md` | `gtm/GTM_STUDIO.md` | Low — service business |

---

## Rules

1. **No brand sounds like another brand.** If you can swap the logo and the copy still works, the voice is wrong.
2. **No jargon.** Every brand talks to real people. "Leverage" is banned. "Synergy" is banned. "Disrupt" is banned.
3. **Start with the problem.** Every piece of content opens with what hurts, not what we sell.
4. **End with action.** Every piece ends with something the reader can do. Not inspiration — action.
5. **The ecosystem is invisible to the customer.** They don't care that 15 domains run from one codebase. They care that their problem gets solved.
6. **Production orders use real specs.** No "create some social media posts." Specify format, voice, visual direction, CTA.
7. **Chase approves all Brand DNA before production.** Non-negotiable.
