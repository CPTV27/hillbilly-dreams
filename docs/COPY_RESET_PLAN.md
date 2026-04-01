# Copy Reset Plan — April 2026

*The business architecture changed on 2026-03-31. Every page carries old positioning. We're deleting the copy and rewriting from the new architecture.*

---

## What Changed

- MBT is the technology platform, not a B2B-only brand
- MBT has TWO products: consumer AI agent + business marketing (same engine)
- Big Muddy Touring is the entertainment engine, not just a website
- DSD is one skin on the MBT platform, not a separate product
- "Powered by Measurably Better Things" is correct and intentional
- Photography first, AI illustrations second
- Dogfood phase — no external sales claims until proven

## Pages That Need Copy Reset

### Tier 1: Rewrite Immediately (Customer-Facing)

| Page | Current Problem | New Direction |
|---|---|---|
| `/touring` | Generic touring page | "We bring the party. Booking, transport, promotion, the whole show." Van is the hero. |
| `/entertainment` | Abstract "four divisions" structure | Big Muddy Entertainment = the entertainment company. We book, promote, transport. One-stop shop. |
| `/records` | Label page with package pricing | Non-exclusive deals. Keep your masters. We promote through our catalog, radio, magazine. |
| `/directory` | "Marketing partner" SaaS language | "Find locals. Get found." Two-sided directory. Business owners pay to be listed and promoted. |
| `/magazine` | Functional but generic editorial | Premium publication feel. Monocle × NatGeo. Photography-first. Vesper's layout incoming. |
| `/radio` | Functional | Keep mostly as-is. The radio works. |

### Tier 2: Rewrite This Month

| Page | Current Problem | New Direction |
|---|---|---|
| `/measurably-better` | Just rebuilt tonight — platform positioning is correct | Fine for now. Add slider pricing UI later. |
| `/bearsville` | Scaffold with images | Flesh out when summer activation starts |
| `/gallery` | BuyCurious art storefront | Keep as-is, low priority |
| `/economics` | Outsider Economics editorial | Keep as-is, content is good |
| `/hillbilly` | HDI corporate | Keep minimal. Berkshire Hathaway energy. |

### Tier 3: Internal / Low Priority

| Page | Action |
|---|---|
| `/studioc` | Keep |
| `/tuthill` | Keep |
| `/admin/*` | Internal, no copy reset needed |
| `/measurably-better/technology` | Keep — good technical reference |
| `/measurably-better/thesis` | Keep — business thesis still valid |

## The Copy Rules (For All Rewrites)

1. **Read `docs/BUSINESS_ARCHITECTURE.md` before writing anything**
2. **Read `memory/project_brand_voices.md` for the voice of each property**
3. **Read `.claude/agents/NORTH_STAR_MANIFESTO.md` for visual direction**
4. **Photography first** — design serves the image, not the other way around
5. **No SaaS jargon** on consumer pages — no "pipeline," "leverage," "scalable"
6. **No feature claims that aren't shipped** — check the claim ladder
7. **The van is the hero** for Touring/Entertainment
8. **"We bring the party"** — not "we provide event management services"
9. **Chase's voice** — short, declarative, specific numbers, end with action

## Who Does What

- **Vesper (Gemini):** Designs the layouts, picks the photo/type pairings
- **Claude Code:** Implements the components, writes the copy to spec, ensures QC compliance
- **Chase:** Final approval on voice and positioning
