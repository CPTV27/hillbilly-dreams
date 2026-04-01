---
name: Vesper Magazine Design Spec — The Heritage Journal
description: Full design spec for Big Muddy Magazine homepage redesign. 100vh hero, slide-under content, parallax bridges, editorial typography.
---

# Big Muddy Magazine — The Heritage Journal Layout

*Design spec from Vesper (Creative Director). Priority 1. Implement before HDI dashboard.*

## 1. The Obsidian Hero (100vh)
- Full-bleed 100vh image
- Subtle vignette (CSS radial-gradient overlay)
- Large serif display font (Playfair Display or var(--font-display)) — centered or bottom-left
- On scroll: image stays fixed (background-attachment: fixed) while content slides over at normal speed
- Photo: Golden Hour Natchez family portrait (/images/processed/natchez-golden-hour-family.webp)

## 2. Slide-Under Content Architecture
- Layer 0: High-res photography (fixed or parallax)
- Layer 1: Content cards with "Paper" white background (#F9F9F7), high margins
- Transition: text blocks slide UP over photos, momentarily obscure them, then reveal next photo below
- Creates depth and tactile feel — like turning pages in a coffee table book

## 3. Asset Placement

| Asset Set | Placement | Note |
|---|---|---|
| Golden Hour Natchez | Main Hero | The welcome hook |
| Arrie Aslin Portraits | Featured Editorial | Two-column split: text left, portrait right, 10% overlap |
| Natchez Night Scenes | Transitional Breaks | Full-width, low-exposure breathers between text |
| Bearsville Theater/Studio | "The Process" Section | Gritty, high-contrast, showing the work |

## 4. Components to Build

### EditorialContainer
- max-width: 1440px
- padding: 0 5vw
- Headlines: var(--font-display) (serif)
- Body: var(--font-body) (sans-serif), line-height 1.6

### ParallaxImageBridge
- Full-width image between story sections
- background-attachment: fixed OR scroll-transform for "window" effect
- Creates cinematic transition between articles

### SignatureHook
- Small metadata stamp on each major photo
- Date, Location, Photographer credit
- All-caps, letter-spacing: 0.1em, font-size: 10px
- Example: "MARCH 2026 // NATCHEZ, MS // CHASE PIERSON"

## 5. Technical Rules (for Patch)
- All styles via var() tokens from theme-magazine (NOT hardcoded)
- Server component (no client JS needed for the layout)
- Images via Next.js Image component with priority loading on hero
- No emojis in production code
- Mobile: hero stays 100vh, content cards go full-width with reduced margins
- The parallax effect should degrade gracefully on mobile (just fixed background, no JS scroll transforms)

## 6. The Standard
"If Chase's eye is the product, the UI needs to get out of the way and let the glass do the talking." — Vesper
