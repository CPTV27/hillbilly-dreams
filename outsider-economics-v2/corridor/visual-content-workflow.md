# Visual Content Workflow — Big Muddy Media

**Last updated:** 2026-03-18
**Status:** Operational playbook

---

## The Problem

Big Muddy Media operates 5 brands, each requiring constant visual output:

| Brand | Domain | Primary Color | Visual Needs |
|-------|--------|--------------|--------------|
| **Big Muddy Touring** | bigmuddytouring.com | `#c8943e` (gold) | Inn promos, route maps, travel social, event posters |
| **Big Muddy Magazine** | bigmuddymagazine.com | `#c8943e` (gold) | Feature headers, photo essay layouts, city guide cards |
| **Big Muddy Radio** | bigmuddyradio.com | `#c8943e` (gold) | Episode art, playlist covers, live session promos, show flyers |
| **Outsider Economics** | outsidereconomics.com | `#b54c4c` (rust red) | Book covers, social quote cards, Rise Up graphics, field manual diagrams |
| **BuyCurious Art** | buycuriousart.com | `#c8943e` (gold) | Artwork spotlights, artist profiles, marketplace banners, merch mockups |

All brands share: dark backgrounds (`#0a0a0a`), light text, warm editorial photography aesthetic (saturated orange-teal cinema grade, DxO DeepPRIME clarity).

Chase is one person. He cannot manually design every social graphic, poster, and email header across 5 brands. The visual pipeline needs to be as automated as the text content pipeline already is.

---

## Delta Dawn Capabilities — What AI Can Actually Do

### Tier 1: Fully Automated (No Canva, No Human in the Loop)

These run without Chase touching anything:

| Deliverable | Method | Notes |
|-------------|--------|-------|
| Social media text posts | Gemini content engine | Already built and operational |
| OG images / link preview cards | HTML/CSS template → Puppeteer screenshot | Brand colors + text + logo, rendered server-side |
| Email newsletter headers | HTML template → PNG render | Swap headline text and brand color per property |
| Simple quote cards | HTML/CSS template → PNG render | Text over solid/gradient background using brand fonts |
| Placeholder art for web | Programmatic SVG/Canvas generation | The colored squares currently in BuyCurious demo data |
| Photo batch processing | Lightroom/DxO preset auto-apply | One-click export with consistent color grade across all brands |
| Auto-crop for platforms | ImageMagick or Sharp.js pipeline | One source image → Instagram square, X header, Facebook cover, Story |

**Cost:** Essentially free. Puppeteer rendering is self-hosted. Lightroom presets are a one-time setup.

### Tier 2: Semi-Automated (AI Generates, Chase Approves)

Delta Dawn produces options. Chase picks one, maybe tweaks it, publishes.

| Deliverable | Method | Chase's Role |
|-------------|--------|-------------|
| Event posters | Google Imagen generates 3-4 layout options from brand template + event details | Pick the best one, adjust text if needed |
| Social graphics with photos | AI composites Chase's editorial photos with text overlays | Approve or request a re-generate |
| Radio episode art | Templated: episode title + guest photo + brand elements, AI fills gaps | Approve; swap guest photo if wrong |
| Photography book cover concepts | Imagen/DALL-E generates cover compositions using Chase's photo library | Select direction, iterate 1-2 rounds |
| Merch mockups | AI generates designs on t-shirt/hat/sticker templates | Pick winners for production |
| Event flyer variations | Base design → AI generates size/platform variants | Quick scan, approve batch |
| Artist spotlight cards (BuyCurious) | Template + artist photo + artwork thumbnail → AI composites | Verify artist name/details are correct |

**Turnaround:** Generate in under 60 seconds. Chase review adds 2-5 minutes per piece.

### Tier 3: Canva Territory (Human-Driven, Templates Help)

Some things still need a human dragging boxes around:

- Complex multi-element posters with precise layout control
- Print-ready materials (exact bleed, CMYK conversion, trim marks)
- Branded slide decks for presentations or pitches
- Multi-page brochures (inn welcome packet, advertiser media kit)
- Anything requiring brand-police-level precision on a one-off
- Quick one-off designs where dragging is genuinely faster than prompting
- Materials for external partners who need editable source files

---

## The Pipeline

```
Content Need Identified
(new event, new episode, new article, new listing, seasonal push)
        │
        ▼
   Is it templated?
   ┌────┴────┐
  YES        NO
   │          │
   ▼          ▼
Delta Dawn   Canva
generates    (manual design)
from template
   │          │
   ▼          ▼
Chase reviews Chase designs
in admin panel in Canva
   │          │
   ▼          ▼
Approve ────► Export
   │
   ▼
Auto-resize for all platforms
(1080x1080, 1200x630, 1080x1920, 820x312)
   │
   ▼
Upload to GCS bucket → serve on web
Post to social channels
```

### Decision Rule

Ask one question: **"Does this look like something we've made before?"**

- **Yes** → Delta Dawn. Use a template. Generate, review, ship.
- **No** → Canva. Design it once, then turn it into a template for next time.

Every Canva design should eventually become a Delta Dawn template. The manual pipeline feeds the automated one.

---

## Brand Template System

### Shared Design DNA (All Brands)

- **Background:** `#0a0a0a` (near-black) — the signature Big Muddy dark canvas
- **Text:** White (`#fafafa`) primary, warm gray (`#a3a3a3`) secondary
- **Photography style:** Saturated warm editorial, orange-teal cinema grade, DxO DeepPRIME clarity (see photography style guide for AI generation parameters)
- **Mood:** Inviting, warm, alive. The South as a place you want to be right now.

### Per-Brand Specifics

| Brand | Accent Color | Suggested Font Pairing | Logo Placement |
|-------|-------------|----------------------|----------------|
| Touring | `#c8943e` gold | Playfair Display + Inter | Top-left, small |
| Magazine | `#c8943e` gold | Playfair Display + Source Serif Pro | Bottom-left, with tagline |
| Radio | `#c8943e` gold | Bebas Neue + Inter | Top-center, bold |
| Economics | `#b54c4c` rust red | Space Grotesk + Inter | Bottom-right, minimal |
| BuyCurious | `#c8943e` gold | Cormorant Garamond + Inter | Top-right, elegant |

### Template Sizes Per Platform

Every template must exist in these sizes:

| Platform | Size | Aspect | Use |
|----------|------|--------|-----|
| Instagram Post | 1080 x 1080 | 1:1 | Primary social |
| Instagram Story | 1080 x 1920 | 9:16 | Story/Reels cover |
| X (Twitter) Post | 1200 x 675 | 16:9 | Timeline card |
| X Header | 1500 x 500 | 3:1 | Profile banner |
| Facebook Cover | 820 x 312 | ~2.6:1 | Page header |
| OG Image | 1200 x 630 | ~1.9:1 | Link previews |
| Email Header | 600 x 200 | 3:1 | Newsletter top |
| Poster (print) | 11 x 17" @ 300dpi | ~1:1.5 | Blues Room flyers |
| Poster (digital) | 1080 x 1350 | 4:5 | Instagram/Facebook event |

---

## Integration Architecture

### Delta Dawn Integration Points

```
┌─────────────────────────────────────────────┐
│              Big Muddy Admin Panel           │
│         (admin.bigmuddytouring.com)         │
├─────────────────────────────────────────────┤
│                                             │
│  Content Engine          Visual Engine      │
│  ┌───────────┐          ┌──────────────┐   │
│  │ Gemini API │          │ Google Imagen │   │
│  │ (text)     │────────►│ (AI images)  │   │
│  └───────────┘  prompt   └──────┬───────┘   │
│                                 │            │
│  Template Engine               │            │
│  ┌──────────────┐              │            │
│  │ HTML/CSS     │              │            │
│  │ → Puppeteer  │              │            │
│  │ → PNG        │              │            │
│  └──────┬───────┘              │            │
│         │                      │            │
│         ▼                      ▼            │
│  ┌─────────────────────────────────┐       │
│  │     Review Queue (Admin UI)     │       │
│  │  Chase approves / rejects       │       │
│  └──────────────┬──────────────────┘       │
│                 │                            │
│                 ▼                            │
│  ┌─────────────────────────────────┐       │
│  │  GCS Bucket → CDN → Web/Social  │       │
│  └─────────────────────────────────┘       │
│                                             │
└─────────────────────────────────────────────┘
```

**Existing infrastructure already in play:**
- Google Imagen API — integrated in admin panel for image generation
- Gemini API — already generating text content; can generate image prompts/descriptions
- GCS buckets — already hosting images for the web properties

**To build:**
- Puppeteer template renderer (HTML/CSS → PNG service)
- Review queue in admin UI (thumbnail grid, approve/reject/regenerate buttons)
- Auto-resize pipeline (Sharp.js — one image in, all platform sizes out)
- Scheduling integration (approved visual → queued for posting at optimal time)

### Canva Integration Points

- **Canva Brand Kit:** Upload all 5 brand palettes, logos, and font files. This is the single source of truth for anyone (Tracy, Amy) who opens Canva.
- **Canva Templates:** Create master templates for each deliverable type. Team members duplicate and customize — they cannot break the original.
- **Canva API** (future): If volume justifies it, programmatic generation of templated designs via Canva's Connect API. Not needed yet.
- **Export workflow:** Canva → download PNG/PDF → upload to GCS bucket → available on website and for social posting.

---

## Specific Deliverable Templates (20 Priority Templates)

### Daily / Weekly Cadence

| # | Template | Brand(s) | Frequency | Method |
|---|----------|----------|-----------|--------|
| 1 | Social media quote card | All 5 | Daily | Delta Dawn (Tier 1) |
| 2 | Radio episode announcement | Radio | 2-3x/week | Delta Dawn (Tier 2) |
| 3 | "New on BuyCurious" artwork spotlight | Gallery | 2-3x/week | Delta Dawn (Tier 2) |
| 4 | Inn availability / booking reminder | Touring | Weekly | Delta Dawn (Tier 1) |
| 5 | Magazine article social card | Magazine | 2-3x/week | Delta Dawn (Tier 1, OG-style) |
| 6 | Outsider Economics "theory drop" card | Economics | 3x/week | Delta Dawn (Tier 1) |
| 7 | Playlist of the week graphic | Radio | Weekly | Delta Dawn (Tier 2) |

### Event-Based (As Needed)

| # | Template | Brand(s) | Trigger | Method |
|---|----------|----------|---------|--------|
| 8 | Blues Room show poster | Touring/Radio | Per show | Delta Dawn (Tier 2) |
| 9 | Workshop / class announcement | Touring | Per event | Delta Dawn (Tier 2) |
| 10 | Pilgrimage season promotion | Touring/Magazine | Seasonal buildup | Canva (Tier 3) first, then template |
| 11 | Special event flyer (one-off) | Any | Ad hoc | Canva (Tier 3) |
| 12 | Live session promo (guest artist) | Radio | Per session | Delta Dawn (Tier 2) |

### Seasonal Campaigns

| # | Template | Brand(s) | When | Method |
|---|----------|----------|------|--------|
| 13 | Snowbird Circuit tour poster | Touring | Oct-Nov | Canva → then Delta Dawn variant |
| 14 | Spring Pilgrimage tie-in graphics | Touring/Magazine | March | Canva (Tier 3) |
| 15 | Fall Pilgrimage tie-in graphics | Touring/Magazine | October | Canva (Tier 3) |
| 16 | Holiday gift guide (BuyCurious) | Gallery | Nov-Dec | Canva → email + social variants |

### One-Time (But High-Impact)

| # | Template | Brand(s) | Timeline | Method |
|---|----------|----------|----------|--------|
| 17 | Photography book covers (4 books) | Touring/Magazine | 2026 | Imagen concepts → Canva refinement |
| 18 | Outsider Economics book cover | Economics | 2026 | Imagen concepts → professional designer for final |
| 19 | Brand launch graphics package | Any new brand | As needed | Canva (Tier 3) |
| 20 | Merch designs (tees, hats, stickers) | All 5 | 2026 Q2 | Imagen concepts → print vendor templates |

---

## Action Items — Setup Checklist

Do these in order. Each step unlocks the next.

| # | Action | Est. Time | Depends On |
|---|--------|-----------|------------|
| 1 | **Export brand assets** — Pull all 5 logos, color values from `brands.ts`, and font files into a single `/assets/brand-kit/` folder | 30 min | Nothing |
| 2 | **Set up Canva Pro** — Create team account, invite Tracy and Amy | 15 min | Nothing |
| 3 | **Upload Brand Kit to Canva** — All 5 palettes, logos, fonts | 45 min | Steps 1, 2 |
| 4 | **Design 7 daily/weekly Canva templates** — One of each from the Daily/Weekly list above. These become the "golden masters." | 3-4 hours | Step 3 |
| 5 | **Convert daily templates to HTML/CSS** — Recreate the quote card, OG image, and episode art templates as HTML files that Puppeteer can render | 2-3 hours | Step 4 (for reference) |
| 6 | **Build Puppeteer render service** — Node.js script: takes JSON input (headline, brand, image URL) → renders HTML template → outputs PNG | 3-4 hours | Step 5 |
| 7 | **Build auto-resize pipeline** — Sharp.js script: takes one PNG → outputs all platform sizes (1080x1080, 1200x675, 1080x1920, etc.) | 1-2 hours | Step 6 |
| 8 | **Wire into admin panel** — Add "Generate Visual" button to content creation flow. Calls Puppeteer service, shows preview, offers approve/regenerate | 4-6 hours | Steps 6, 7 |
| 9 | **Connect Imagen for Tier 2 templates** — Event poster and episode art generators that call Imagen API with brand-specific prompts from photography style guide | 3-4 hours | Step 8 |
| 10 | **Build review queue** — Admin panel grid view: pending visuals with approve/reject/regenerate. Approved items auto-upload to GCS. | 3-4 hours | Step 8 |
| 11 | **Design 4 event-based Canva templates** — Blues Room poster, workshop, pilgrimage promo, special event | 2-3 hours | Step 3 |
| 12 | **Design 4 seasonal Canva templates** — Snowbird, Spring/Fall Pilgrimage, Holiday gift guide | 2-3 hours | Step 3 |
| 13 | **Test full pipeline end-to-end** — Create a Radio episode → content engine generates text + visual → review queue → approve → live on site + social | 1-2 hours | Steps 1-10 |

**Total estimated setup time:** 25-35 hours spread across 2-3 weeks.

Steps 1-4 can happen in a single focused day. Steps 5-10 are engineering work that can be done incrementally. Steps 11-12 are design work that Tracy or Amy can handle once the Brand Kit is in Canva.

---

## Cost Analysis

### Monthly Fixed Costs

| Item | Cost | Notes |
|------|------|-------|
| Canva Pro (team) | $13/month ($120/year if annual) | Up to 5 team members. Covers Tracy, Amy, Chase. |
| Google Cloud (Imagen API) | ~$0.02-0.04/image | Estimated 200-400 images/month = **$8-16/month** |
| Google Cloud (Puppeteer/Cloud Run) | ~$5-10/month | Minimal compute for rendering templates to PNG |
| GCS Storage | ~$2-5/month | Already paying this for web image hosting |
| Sharp.js / ImageMagick | $0 | Self-hosted, open source |

### Monthly Variable Costs (Scaled by Output)

| Output Level | Images/Month | Imagen Cost | Total Pipeline Cost |
|--------------|-------------|-------------|-------------------|
| **Lean** (current) | 100-200 | $2-8 | ~$22-36/month |
| **Cruising** (target) | 300-500 | $6-20 | ~$26-48/month |
| **Full throttle** | 500-1000 | $10-40 | ~$30-68/month |

### Comparison: What This Replaces

| Alternative | Cost | Output |
|------------|------|--------|
| Freelance designer (part-time) | $500-1500/month | 20-40 deliverables |
| Design agency retainer | $2000-5000/month | 30-60 deliverables |
| **This pipeline** | **$25-50/month** | **300-500+ deliverables** |

The pipeline pays for itself the first week. At cruising speed, you are producing more visual content than a part-time designer at roughly 3% of the cost.

---

## Photography Integration

All AI-generated images must match Chase's editorial photography aesthetic. The system prompt for Imagen/DALL-E calls includes these modifiers:

```
editorial photography, magazine quality, high saturation, warm amber color grade,
orange and teal color grading, high contrast, deep rich shadows with detail,
sharp micro-contrast detail, DxO processed look, Southern United States,
inviting atmosphere, environmental storytelling, sense of place,
shot on full-frame DSLR, professional photography
```

The full photography style guide lives in the project memory and should be embedded in any Imagen API system prompt. AI-generated images that don't match the look get rejected in the review queue. Over time, Delta Dawn learns which prompts produce approved results and which get rejected.

---

## Team Roles

| Person | Role in Visual Pipeline |
|--------|------------------------|
| **Chase** | Approves all output. Designs complex one-offs in Canva. Shoots original photography. Sets brand direction. |
| **Tracy** | Uses Canva templates for inn-specific materials (booking reminders, guest info, local guides). |
| **Amy** | Uses Canva templates for event-specific materials (show posters, workshop flyers). |
| **Delta Dawn** | Generates Tier 1 and Tier 2 content automatically. Handles the high-volume, templated, repetitive visual work that would otherwise eat Chase's entire week. |

---

## Success Metrics

After 30 days of running the pipeline:

- [ ] 5+ social graphics published per brand per week (25+ total/week) without Chase designing any of them manually
- [ ] Average time from "content need identified" to "published visual" under 10 minutes for templated content
- [ ] Chase spending less than 2 hours/week on visual content review (down from current all-manual approach)
- [ ] Zero brand inconsistency complaints — every piece uses correct colors, fonts, logo placement
- [ ] Tracy and Amy self-serving 80%+ of their visual needs through Canva templates without asking Chase

---

## What This Document Is Not

This is not a style guide (that exists in the photography style guide and `brands.ts`). This is not a content calendar (that is the Sheets Command Center per brand). This is the **operational workflow** — who does what, using which tool, in what order, at what cost. When someone asks "how do we make a poster for Friday's show," this document answers that question.
