# Big Muddy Illustration Lookbook

> 12 styles, 36 sample images. Every prompt prefix below is copy-paste ready for Vertex AI Imagen 3.0.
> All images: `gs://bmt-media-bigmuddy/illustrations/lookbook/`

---

## How to Use This Lookbook

1. **Pick a style** that fits your brand and context (see Brand Fit for each)
2. **Copy the Prompt Prefix** — paste it before your subject description
3. **Generate** via the `/api/media/generate` endpoint or direct Vertex AI call
4. **Aspect ratios:** 16:9 (headers/banners), 1:1 (social), 9:16 (stories), 4:3 (cards)

### Generation Settings
- **Model:** `imagen-3.0-generate-002`
- **Project:** `bigmuddy-ff651`
- **Bucket:** `bmt-media-bigmuddy`
- **Format:** PNG → WebP (cwebp -q 85)
- **Negative prompt:** `photorealistic, 3d render, stock photo`

---

## Style 1: Woodcut / Linocut

**Brand Fit:** Outsider Economics, Magazine editorial, Economics field manual
**Palette:** Burnt orange `#C4441A` + Cream `#F0E6D3`
**Vibe:** Hand-carved block print, teaching diagrams, warm and analog

**Prompt Prefix:**
```
Editorial woodcut illustration in burnt orange (#C4441A) and cream (#F0E6D3) palette, warm hand-drawn linocut style, bold carved lines, block print texture, no photorealism —
```

| Sample | URL |
|--------|-----|
| Community Gathering | [community-gathering.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/01-woodcut/community-gathering.webp) |
| Main Street Storefront | [main-street-storefront.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/01-woodcut/main-street-storefront.webp) |
| River Landscape | [river-landscape.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/01-woodcut/river-landscape.webp) |

---

## Style 2: Vintage Travel Poster

**Brand Fit:** Touring, Inn, Directory, tourism marketing
**Palette:** Deep teal + warm gold + burnt red
**Vibe:** 1930s WPA National Parks, flat color blocks, dramatic perspective

**Prompt Prefix:**
```
Vintage travel poster illustration in the style of 1930s WPA National Parks posters, deep teal and warm gold and burnt red palette, flat color blocks, dramatic perspective, bold sans-serif lettering space, no photorealism —
```

| Sample | URL |
|--------|-----|
| Mississippi River Bridge | [mississippi-river-bridge.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/02-travel-poster/mississippi-river-bridge.webp) |
| Natchez Bluff | [natchez-bluff.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/02-travel-poster/natchez-bluff.webp) |
| Delta Juke Joint | [delta-juke-joint.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/02-travel-poster/delta-juke-joint.webp) |

---

## Style 3: Risograph / Screen Print

**Brand Fit:** Radio, Records, Entertainment, indie music content
**Palette:** Electric blue `#00b4ff` + Burnt orange `#e87820` overprint
**Vibe:** Halftone dots, misregistration, gritty indie print shop

**Prompt Prefix:**
```
Risograph screen print illustration with halftone dot texture and color overprint effects, limited to electric blue (#00b4ff) and burnt orange (#e87820) on off-white paper, misregistration overlap, gritty indie print aesthetic, no photorealism —
```

| Sample | URL |
|--------|-----|
| Musician on Stage | [musician-on-stage.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/03-risograph/musician-on-stage.webp) |
| Vinyl Record | [vinyl-record.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/03-risograph/vinyl-record.webp) |
| Radio Tower | [radio-tower.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/03-risograph/radio-tower.webp) |

---

## Style 4: Hand-Lettered Chalkboard

**Brand Fit:** Inn bar, Entertainment venues, show posters, menus
**Palette:** Dark slate + chalk white/cream + amber `#c8943e` + burnt orange `#C4441A`
**Vibe:** Chalk art, decorative flourishes, vintage hand lettering

**Prompt Prefix:**
```
Hand-lettered chalkboard illustration on dark slate background, chalk white and cream text with amber and burnt orange accent colors, vintage chalk art style, decorative flourishes and banners, no photorealism —
```

| Sample | URL |
|--------|-----|
| Bar Menu | [bar-menu.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/04-chalkboard/bar-menu.webp) |
| Tonight's Lineup | [tonights-lineup.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/04-chalkboard/tonights-lineup.webp) |
| Welcome Sign | [welcome-sign.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/04-chalkboard/welcome-sign.webp) |

---

## Style 5: Botanical / Nature Line Drawing

**Brand Fit:** Inn, Gallery, Magazine nature features
**Palette:** Sage green `#9aab98` + cream `#F0E6D3` + magenta `#994878`
**Vibe:** Scientific illustration, fine pen ink, elegant and detailed

**Prompt Prefix:**
```
Delicate botanical line drawing illustration in sage green (#9aab98) and cream (#F0E6D3) with touches of magenta (#994878), fine pen ink lines on natural paper texture, scientific illustration style, elegant and detailed, no photorealism —
```

| Sample | URL |
|--------|-----|
| Live Oak & Spanish Moss | [live-oak-spanish-moss.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/05-botanical/live-oak-spanish-moss.webp) |
| Magnolia Bloom | [magnolia-bloom.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/05-botanical/magnolia-bloom.webp) |
| Delta Wildflowers | [delta-wildflowers.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/05-botanical/delta-wildflowers.webp) |

---

## Style 6: Retro Neon Sign

**Brand Fit:** Radio, Entertainment, nightlife, venue marketing
**Palette:** Electric blue `#00b4ff` + hot pink `#ff3366` + amber `#c8943e` on midnight black
**Vibe:** Glowing neon tubes, realistic glow/reflection, vintage sign

**Prompt Prefix:**
```
Retro neon sign illustration on midnight black background, glowing electric blue (#00b4ff) and hot pink (#ff3366) and warm amber (#c8943e) neon tube lettering and outlines, realistic neon glow and reflection, vintage sign aesthetic, no photorealism —
```

| Sample | URL |
|--------|-----|
| Juke Joint Entrance | [juke-joint-entrance.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/06-neon/juke-joint-entrance.webp) |
| Live Music Sign | [live-music-sign.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/06-neon/live-music-sign.webp) |
| On Air Studio | [on-air-studio.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/06-neon/on-air-studio.webp) |

---

## Style 7: Letterpress / Broadside

**Brand Fit:** Magazine, Records, editorial layouts, literary content
**Palette:** Deep ink on aged cream paper + burnt orange `#C4441A` accent
**Vibe:** Wood type + metal type, printing imperfections, old newspaper

**Prompt Prefix:**
```
Vintage letterpress broadside print on aged cream paper with deep ink typography, wood type and metal type mix, single accent color burnt orange (#C4441A), printing imperfections and ink spread visible, old-fashioned newspaper aesthetic, no photorealism —
```

| Sample | URL |
|--------|-----|
| Dispatch Header | [dispatch-header.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/07-letterpress/dispatch-header.webp) |
| Concert Broadside | [concert-broadside.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/07-letterpress/concert-broadside.webp) |
| Poetry Broadside | [poetry-broadside.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/07-letterpress/poetry-broadside.webp) |

---

## Style 8: Folk Art / Outsider Art

**Brand Fit:** Economics, Gallery, community storytelling
**Palette:** Primary colors (red, blue, yellow) + earth tones
**Vibe:** Naive flat perspective, self-taught artist, joyful and direct

**Prompt Prefix:**
```
American folk art outsider art painting with naive flat perspective, primary colors red blue yellow with earth tones, self-taught artist style, simplified human figures, pattern and repetition, joyful and direct, no photorealism —
```

| Sample | URL |
|--------|-----|
| Town Dancing | [town-dancing.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/08-folk-art/town-dancing.webp) |
| Marketplace | [marketplace.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/08-folk-art/marketplace.webp) |
| Community Quilt | [community-quilt.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/08-folk-art/community-quilt.webp) |

---

## Style 9: Blueprint / Technical Drawing

**Brand Fit:** MB Console, S2PX, platform/tech content, architecture docs
**Palette:** White/amber lines on deep slate blue `#020617`
**Vibe:** Architectural drafting, dimension lines, engineering precision

**Prompt Prefix:**
```
Architectural blueprint technical drawing, white and amber lines on deep slate blue (#020617) background, precise drafting style with dimension lines and annotations, engineering diagram aesthetic, grid paper texture, no photorealism —
```

| Sample | URL |
|--------|-----|
| Building Floor Plan | [building-floorplan.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/09-blueprint/building-floorplan.webp) |
| Dashboard Wireframe | [dashboard-wireframe.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/09-blueprint/dashboard-wireframe.webp) |
| Data Flow Diagram | [data-flow.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/09-blueprint/data-flow.webp) |

---

## Style 10: Watercolor Landscape

**Brand Fit:** Touring, Magazine editorial headers, website hero backgrounds
**Palette:** Warm washes — amber, burnt sienna, river blue
**Vibe:** Loose wet-on-wet, white paper showing through, atmospheric

**Prompt Prefix:**
```
Loose watercolor landscape painting with warm washes of amber and burnt sienna and river blue, wet-on-wet blending, white paper showing through, editorial illustration quality, atmospheric and impressionistic, no photorealism —
```

| Sample | URL |
|--------|-----|
| River at Golden Hour | [river-golden-hour.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/10-watercolor/river-golden-hour.webp) |
| Cotton Field | [cotton-field.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/10-watercolor/cotton-field.webp) |
| Small Town Street | [small-town-street.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/10-watercolor/small-town-street.webp) |

---

## Style 11: Gig Poster / Concert Art

**Brand Fit:** Records, Entertainment, Radio, event marketing
**Palette:** Bold limited 3-color (midnight blue + burnt orange + cream typical)
**Vibe:** Psychedelic, expressive, thick outlines, rock poster meets Delta blues

**Prompt Prefix:**
```
Bold gig poster concert art illustration with limited color palette of 3 colors, high contrast, psychedelic and expressive, thick outlines, dramatic composition, rock poster aesthetic meets Delta blues, no photorealism —
```

| Sample | URL |
|--------|-----|
| Blues Musician | [blues-musician.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/11-gig-poster/blues-musician.webp) |
| Guitar Headstock | [guitar-headstock.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/11-gig-poster/guitar-headstock.webp) |
| Big Muddy Presents | [big-muddy-presents.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/11-gig-poster/big-muddy-presents.webp) |

---

## Style 12: Map / Cartographic

**Brand Fit:** Touring, Directory, Economics corridor content
**Palette:** Aged parchment + ink brown + red/blue route markers
**Vibe:** Hand-drawn vintage map, compass rose, illustrated landmarks

**Prompt Prefix:**
```
Hand-drawn vintage cartographic map illustration on aged parchment paper, ink brown lines with red and blue route markers, compass rose, decorative cartouche, illustrated landmarks, treasure map aesthetic meets travel guide, no photorealism —
```

| Sample | URL |
|--------|-----|
| Corridor Route | [corridor-route.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/12-cartographic/corridor-route.webp) |
| Delta Region | [delta-region.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/12-cartographic/delta-region.webp) |
| Touring Circuit | [touring-circuit.webp](https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/12-cartographic/touring-circuit.webp) |

---

## Quick Reference: Style → Brand Matrix

| Style | OE | Magazine | Touring | Inn | Radio | Records | Entertainment | Gallery | MB Console |
|-------|:--:|:-------:|:------:|:---:|:-----:|:-------:|:------------:|:-------:|:---------:|
| Woodcut | **X** | X | | | | | | | |
| Travel Poster | | | **X** | X | | | | | |
| Risograph | | | | | **X** | **X** | X | | |
| Chalkboard | | | | **X** | | | **X** | | |
| Botanical | | X | | **X** | | | | X | |
| Neon | | | | | **X** | | **X** | | |
| Letterpress | | **X** | | | | X | | | |
| Folk Art | X | | | | | | | **X** | |
| Blueprint | | | | | | | | | **X** |
| Watercolor | | X | **X** | | | | | | |
| Gig Poster | | | | | X | **X** | **X** | | |
| Cartographic | X | | **X** | | | | | | |

**Bold X** = primary fit, regular X = secondary fit

---

## GCS Structure

```
gs://bmt-media-bigmuddy/illustrations/
├── lookbook/
│   ├── 01-woodcut/
│   ├── 02-travel-poster/
│   ├── 03-risograph/
│   ├── 04-chalkboard/
│   ├── 05-botanical/
│   ├── 06-neon/
│   ├── 07-letterpress/
│   ├── 08-folk-art/
│   ├── 09-blueprint/
│   ├── 10-watercolor/
│   ├── 11-gig-poster/
│   └── 12-cartographic/
└── outsider-economics/    (20 OE teaching illustrations)
```

---

*Generated 2026-03-28 via Vertex AI Imagen 3.0 on project bigmuddy-ff651*
