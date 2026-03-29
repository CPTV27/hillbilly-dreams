# Illustration Integration Prompt — For Frontend Design Agent

## Context

We have 36 editorial illustrations across 12 styles, plus 20 Outsider Economics illustrations, all in GCS. Your job is to integrate them throughout the Big Muddy platform so every page has visual personality.

## Asset Locations

**Outsider Economics (20 illustrations):**
`https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/outsider-economics/{filename}.webp`

Files: 01-small-town-value-flow, 02-people-network-skills, 03-tributaries-river-value, 04-extraction-vs-circulation, 05-federation-vs-scale, 06-farmers-market-federation, 07-kanban-task-board, 08-five-revenue-blocks, 09-phone-directory-tourist, 10-saas-price-ladder, 11-cut-the-strings, 12-shared-services-hub, 13-mississippi-grant-map, 14-grant-stacking-blocks, 15-entity-flowchart, 16-photo-pipeline-flow, 17-show-night-timeline, 18-shows-revenue-cycle, 19-day-night-team-split, 20-content-funnel

**Lookbook (36 illustrations, 12 styles x 3 each):**
`https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/{style-folder}/{image-name}.webp`

### Style → Brand Mapping

| Style | Folder | Best For | Use On |
|-------|--------|----------|--------|
| Woodcut / Linocut | 01-woodcut | Outsider Economics, Magazine | /economics, /magazine headers, OE docs |
| Vintage Travel Poster | 02-travel-poster | Touring, Inn | /touring, /inn, route pages, booking CTAs |
| Risograph / Screen Print | 03-risograph | Radio, Records | /radio, /records, show announcements |
| Chalkboard | 04-chalkboard | Inn bar, Entertainment | /entertainment, bar menu, show listings |
| Botanical Line Drawing | 05-botanical | Inn, Gallery | /inn room pages, /gallery, seasonal content |
| Retro Neon | 06-neon | Radio, Entertainment nightlife | /radio, /entertainment, late-night content |
| Letterpress / Broadside | 07-letterpress | Magazine, Records editorial | /magazine features, /records releases |
| Folk Art / Outsider Art | 08-folk-art | Economics, Gallery | /economics, /gallery, community pages |
| Blueprint / Technical | 09-blueprint | Admin, Platform | /admin, /platform, /measurably-better, tech docs |
| Watercolor Landscape | 10-watercolor | Touring, Magazine headers | /touring hero, /magazine cover, corridor pages |
| Gig Poster / Concert Art | 11-gig-poster | Records, Entertainment | /records, /entertainment, show pages, event cards |
| Map / Cartographic | 12-cartographic | Touring, Directory | /touring route map, /directory, corridor overview |

### Image Names per Style

Each style has 3 images:
- 01-woodcut: community-gathering, main-street-storefront, river-landscape
- 02-travel-poster: delta-juke-joint, mississippi-river-bridge, natchez-bluff
- 03-risograph: musician-on-stage, radio-tower, vinyl-record
- 04-chalkboard: bar-menu, tonights-lineup, welcome-sign
- 05-botanical: delta-wildflowers, live-oak-spanish-moss, magnolia-bloom
- 06-neon: juke-joint-entrance, live-music-sign, on-air-studio
- 07-letterpress: concert-broadside, dispatch-header, poetry-broadside
- 08-folk-art: community-quilt, marketplace, town-dancing
- 09-blueprint: building-floorplan, dashboard-wireframe, data-flow
- 10-watercolor: cotton-field, river-golden-hour, small-town-street
- 11-gig-poster: big-muddy-presents, blues-musician, guitar-headstock
- 12-cartographic: corridor-route, delta-region, touring-circuit

## Integration Plan

### Hero Sections (full-width, behind text with overlay)
| Page | Illustration | Style |
|------|-------------|-------|
| /touring | natchez-bluff.webp | travel-poster |
| /magazine | dispatch-header.webp | letterpress |
| /radio | on-air-studio.webp | neon |
| /records | guitar-headstock.webp | gig-poster |
| /entertainment | big-muddy-presents.webp | gig-poster |
| /directory | main-street-storefront.webp | woodcut |
| /economics | river-landscape.webp | woodcut |
| /gallery | marketplace.webp | folk-art |

### Section Dividers (between content blocks, 120px tall, muted opacity)
Use the watercolor and botanical sets as horizontal dividers between major page sections. Apply `opacity: 0.15` and `object-fit: cover` with `height: 120px`.

### Card Accents (small, in card headers or backgrounds)
- Directory listing cards: woodcut style as subtle card header backgrounds
- Show event cards: gig-poster or chalkboard style
- Magazine feature cards: letterpress style
- Radio show cards: risograph or neon style

### Empty States (when no content loaded)
Use folk-art or watercolor illustrations with text overlay: "Nothing here yet — check back soon."

### Admin Dashboard
Use blueprint style for admin/internal pages:
- dashboard-wireframe for the Mission Control background
- data-flow for the analytics section
- building-floorplan for the operations section

### Loading States
Use the cartographic corridor-route as a subtle loading background animation (slow pan across the map).

## Implementation Notes

- All images are WebP, hosted on GCS, publicly accessible
- Use `loading="lazy"` on all illustrations below the fold
- For hero images: `object-fit: cover`, full-width, with a dark gradient overlay for text readability
- For card accents: `opacity: 0.08-0.15`, `mix-blend-mode: multiply` on light backgrounds or `screen` on dark
- Maintain the existing dark theme — illustrations should enhance, not overwhelm
- The Big Muddy aesthetic is warm, dark, editorial. Never bright or corporate.

## Color Palette Reference
- Background: #0f0f0d
- Surface: #1a1816
- Accent: #c8943e (gold)
- Text: #e8e0d4 (warm white)
- Muted: #8a8074
- Border: #2a2520
