# Outsider Economics — Full Illustration Overhaul

## Mission

Replace every placeholder, stock photo, and bare page on outsidereconomics.com with custom editorial illustrations. No photos anywhere on OE — illustrations only. Use the 12 styles from the lookbook and generate new illustrations as needed.

## Style Guide

All illustrations use the Big Muddy editorial palette:
- **Primary colors:** Burnt orange (#C4441A), cream (#F0E6D3), ink (#1A1A1A)
- **Style:** Warm, hand-drawn, editorial. Think woodcut prints meets Southern literary magazine.
- **No photorealism. No stock art. No AI-generated faces.**

## Available Styles (from Lookbook)

| Style | Folder | Prompt Prefix | Best For |
|-------|--------|--------------|----------|
| Woodcut / Linocut | 01-woodcut | "Editorial woodcut illustration in burnt orange and cream palette, warm hand-drawn linocut style, bold lines —" | Core concepts, diagrams, chapter headers |
| Folk Art / Outsider Art | 08-folk-art | "Folk art illustration in warm earth tones, naive outsider art style, hand-painted feel —" | Community scenes, marketplace, human stories |
| Letterpress / Broadside | 07-letterpress | "Vintage letterpress broadside style, aged paper texture, typographic illustration —" | Quotes, callouts, section dividers |
| Map / Cartographic | 12-cartographic | "Hand-drawn cartographic illustration, vintage map style, warm tones —" | Corridor maps, location references, geographic context |
| Watercolor Landscape | 10-watercolor | "Loose watercolor landscape illustration, warm Southern palette, editorial feel —" | Scene-setting, environmental, atmospheric |
| Blueprint / Technical | 09-blueprint | "Technical blueprint diagram style, white lines on deep blue, architectural drawing feel —" | Data diagrams, system architecture, how-it-works |

## Existing Illustrations (Already in GCS)

20 illustrations at `gs://bmt-media-bigmuddy/illustrations/outsider-economics/`:

| File | Already Used In |
|------|----------------|
| 01-small-town-value-flow.webp | philosophy/what-is-outsider-economics |
| 02-people-network-skills.webp | philosophy/people-are-the-currency |
| 03-tributaries-river-value.webp | toolkit/make-money |
| 04-extraction-vs-circulation.webp | philosophy/the-extraction-trap |
| 05-federation-vs-scale.webp | philosophy/coordination-not-scale |
| 06-farmers-market-federation.webp | philosophy/the-federation-effect |
| 07-kanban-task-board.webp | toolkit/the-task-board |
| 08-five-revenue-blocks.webp | toolkit/building-without-banks |
| 09-phone-directory-tourist.webp | toolkit/the-directory |
| 10-saas-price-ladder.webp | toolkit/the-20-revolution + resources/technology-tools |
| 11-cut-the-strings.webp | toolkit/technology-sovereignty |
| 12-shared-services-hub.webp | toolkit/shared-services |
| 13-mississippi-grant-map.webp | resources/grants-and-funding |
| 14-grant-stacking-blocks.webp | (available) |
| 15-entity-flowchart.webp | resources/legal-frameworks |
| 16-photo-pipeline-flow.webp | (available) |
| 17-show-night-timeline.webp | (available) |
| 18-shows-revenue-cycle.webp | (available) |
| 19-day-night-team-split.webp | (available) |
| 20-content-funnel.webp | (available) |

## What to Generate

### Homepage (outsidereconomics.com / apps/web/app/economics/page.tsx)

The homepage needs a full visual overhaul. Currently text-heavy with no images.

| Section | Illustration Needed | Style |
|---------|-------------------|-------|
| Hero background | Mississippi corridor at dawn — river, bluffs, small town silhouettes | Watercolor |
| Core Concepts grid (6 cards) | One icon-sized illustration per concept: $450K (money flow), Extraction (drain), Coordination (network), Time (clock/hands), Federation (nodes), Task Board (board) | Woodcut |
| "The Thesis" section | Community building together — barn-raising energy | Folk Art |
| "Read the Room" trends grid | Small icon per trend: AI robot, broken bank, digital dollar, platform skim, supply chain, house | Blueprint |
| "You Already Know Your 20" CTA | Circle of 20 people, porch gathering | Folk Art |
| Substack section | Dispatch newspaper/broadside | Letterpress |

### Docusaurus Docs (apps/books/)

Each doc already has one hero illustration. Add:

**Section dividers** — thin horizontal illustrations between major sections:
- Woodcut border patterns (vine, river wave, road line)
- Generate 3-4 reusable divider strips at 1200x80px

**Inline diagrams** — where the text describes a system or flow:
- Philosophy docs: network diagrams, flow charts (use Blueprint style)
- Toolkit docs: step-by-step process illustrations (use Woodcut style)
- Resources docs: map callouts, organizational charts (use Cartographic style)

**Case Studies index page** — each volume needs a cover illustration:
- Volume 1: Field manual, compass, tools (Woodcut)
- Volume 2: Construction, building, blueprints (Blueprint)
- Volume 3: Horizon, road ahead, sunrise (Watercolor)
- Corridor: Map with route highlighted (Cartographic)

### Specific Illustrations to Generate

1. **Hero: Mississippi Corridor Dawn** — watercolor, wide format (1920x600), river winding through bluffs at sunrise, warm golden light, small town silhouettes on the banks
2. **$450K Icon** — woodcut, square (400x400), coins/money flowing in a circular pattern, tributaries merging
3. **Extraction Icon** — woodcut, square (400x400), funnel draining money upward out of a town
4. **Coordination Icon** — woodcut, square (400x400), hands connecting, network nodes
5. **Time Icon** — woodcut, square (400x400), hourglass with hands/tools instead of sand
6. **Federation Icon** — woodcut, square (400x400), interconnected circles, each with its own center
7. **Task Board Icon** — woodcut, square (400x400), kanban-style board with cards
8. **AI Robot Trend** — blueprint, small (300x300), friendly robot with question mark
9. **Broken Bank Trend** — blueprint, small (300x300), bank building with crack
10. **Digital Dollar Trend** — blueprint, small (300x300), dollar sign with circuit lines
11. **Platform Skim Trend** — blueprint, small (300x300), hand taking percentage off conveyor
12. **Supply Chain Trend** — blueprint, small (300x300), broken chain link
13. **Housing Trend** — blueprint, small (300x300), house with price tag
14. **Community Circle CTA** — folk art, wide (1200x400), 20 people on a porch, warm evening
15. **Dispatch Broadside** — letterpress, square (600x400), vintage newspaper masthead "The Dispatch"
16. **Divider: River Wave** — woodcut, strip (1200x80), flowing water pattern
17. **Divider: Road Line** — woodcut, strip (1200x80), highway center line perspective
18. **Divider: Vine Border** — woodcut, strip (1200x80), kudzu or muscadine vine pattern
19. **Volume 1 Cover** — woodcut, portrait (600x800), compass + field guide + wrench
20. **Volume 2 Cover** — blueprint, portrait (600x800), building under construction
21. **Volume 3 Cover** — watercolor, portrait (600x800), road disappearing into sunrise horizon
22. **Corridor Cover** — cartographic, portrait (600x800), Memphis-to-NOLA map route

## Image Generation

Use the `/api/media/generate` endpoint:
```
POST https://bigmuddytouring.com/api/media/generate
Body: { "prompt": "[style prefix] [description]", "negativePrompt": "photorealistic, 3d render, stock photo, human faces", "aspectRatio": "[ratio]" }
```

Or use Vertex AI Imagen directly, or any image generation tool available.

**Upload to GCS at:** `gs://bmt-media-bigmuddy/illustrations/outsider-economics/`
**Naming convention:** `oe-[section]-[description].webp` (e.g., `oe-hero-corridor-dawn.webp`)

## After Generation

1. Upload all illustrations to GCS
2. Update `apps/web/app/economics/page.tsx` — add illustrations to every section
3. Update `apps/books/docs/` — add new illustrations to Docusaurus docs
4. Add section dividers between major content blocks
5. Update case studies index with volume cover illustrations
6. Verify: no photos remain anywhere on outsidereconomics.com — illustrations only
