# Presentation Layer Redesign — For Antigravity (AG)

## Mission

Own the front-layer marketing and presentation UX across the entire platform. This is now a product category — the way we communicate to anyone evaluating the company. Redesign the /tour, /whiteboard, and all presentation interfaces to be world-class.

## Before You Start

Read these files in order:
1. `.claude/agents/MASTER_HANDOFF.md` — system overview
2. `.claude/agents/ORIGIN_STORY.md` — the narrative
3. `.claude/agents/BRAND_NARRATIVE_OVERHAUL.md` — value props, voice
4. `memory/feedback_chase_voice.md` — Chase's writing voice
5. `memory/feedback_qc_policy.md` — QC rules including illustrations

## What Failed

The guided tour at /tour tried to be clever — chat panel, step-by-step, Delta Dawn narrating. JP opened it and had no idea what to do. The current version is just buttons, which works but isn't impressive.

The whiteboard at /whiteboard has 11 tabs of great content but no visual design — it's all text and basic layout. On a 50-inch TV from a couch, it's hard to read.

## What We Need

A presentation system that:
1. Works on a laptop, a 50-inch TV from a couch, an iPad, and a phone
2. Is immediately obvious — no instructions needed
3. Looks like a premium product demo, not a developer dashboard
4. Tells the Big Muddy story through the interface itself
5. Markets the Google stack throughout without being heavy-handed

## Design Requirements

### Responsive Modes
- **TV Mode** (50+ inches, viewed from 8-10 feet) — huge text, high contrast, minimal content per screen
- **Laptop Mode** (13-16 inches) — current density is fine, better typography
- **iPad Mode** — touch-optimized, swipeable between sections
- **Phone Mode** — single column, thumb-friendly navigation

### Visual Standards
- Dark theme (#0a0a08 background, #c8943e gold accents)
- Use the lookbook illustrations as visual backgrounds (see ILLUSTRATION_INTEGRATION_PROMPT.md)
- Big, bold typography — if someone can't read it from 10 feet away on a TV, it's too small
- Animations: subtle, purposeful. Fade in content as you navigate. No bouncing or spinning.
- The Google Cloud logo and "Built on Google" badge should appear in the footer/corner of presentation pages

### Google Stack Positioning

Throughout all presentation and marketing pages, the Google products should be visible:

**Where to emphasize:**
- /tour, /whiteboard, /demo-deck — "Built on Google Cloud" badge
- /admin/creative — "Powered by Vertex AI" on each generation tab
- /admin/ecosystem — Tech Stack lens shows every Google product
- /platform/architecture — the "Then vs Now" shows Google evolution
- Pricing pages — "Enterprise Google AI" as a trust signal

**Where to de-emphasize:**
- Customer-facing pages (directory, magazine, radio) — the tech should be invisible
- Public content pages — nobody cares what powers it, they care what it does

**The Google products in our stack:**
- Vertex AI Imagen 3 (image generation)
- Vertex AI Veo 3.1 (video generation)
- Gemini 2.5 Flash / 3.1 Pro (text, reasoning)
- Cloud TTS Journey (voice generation)
- Google Cloud Storage (all media)
- Google OAuth (authentication)
- Google Workspace (email, docs — deploying)
- Google Calendar (scheduling)
- Google Drive (file management)

**The message:** "Built entirely on Google Cloud infrastructure. Enterprise-grade AI. The same tools Fortune 500 companies use, configured for Main Street."

## Pages to Redesign

### 1. /tour — The Welcome Experience
**Current:** Buttons page with links
**Target:** A premium onboarding experience that adapts to who's viewing it

Variations to design:
- **Investor version** — leads with the business model, flywheel, revenue
- **Partner version** (JP, Elijah) — leads with what they'd do, their tools, their options
- **Client version** (business owner) — leads with "here's what $20/mo gets you"
- **Google version** — leads with the tech stack, the architecture, the replicability

Each version should be a URL parameter: `/tour?audience=investor`, `/tour?audience=partner`

### 2. /whiteboard — The Presentation Tool
**Current:** 11 tabs with text-heavy views
**Target:** A Keynote-quality presentation tool in the browser

- Each "lens" should fill the screen with one big idea + supporting visual
- Keyboard navigation (arrow keys to advance)
- Presenter notes hidden but accessible (press N)
- Auto-play mode for lobby/kiosk display
- "Built on Google Cloud" watermark in corner

### 3. /demo-deck.html — The Slide Deck
**Current:** Static HTML with scroll-snap
**Target:** Merge into /whiteboard or replace with a better format

### 4. New: /story — The Origin Story
A cinematic scroll experience telling Chase's journey from Democracy Now to Big Muddy. Not a bio — a story. Visual, emotional, factual. Uses the lookbook illustrations. Ends with "Now deploying to your town."

## Technical Integration

### Google Products to Integrate into the Presentation Layer

1. **Gemini Live** — Real-time voice conversation with Delta Dawn during presentations. Presenter asks a question, Delta Dawn answers live. (Multimodal Live API)

2. **Vertex AI Imagen** — Generate presentation visuals on the fly. "Show me what Bearsville would look like" → generates an illustration during the presentation.

3. **Cloud TTS** — Voice narration option. Toggle on "narrated mode" and Delta Dawn reads each slide.

4. **Google Vids** — Link out to Google Vids for timeline-based video editing of presentation recordings.

## Files You Own

- `apps/web/app/tour/page.tsx` — The welcome experience
- `apps/web/app/whiteboard/page.tsx` — The presentation tool
- `apps/web/public/demo-deck.html` — The slide deck
- `apps/web/app/platform/architecture/page.tsx` — The origin story page
- Any new presentation-layer pages you create

## Files to Reference (Don't Modify)

- `apps/web/app/admin/*` — Huck Jr owns the admin panel
- `config/tenants.ts` — Tenant configuration
- `lib/ai-models.ts` — AI model routing
- `lib/imagen.ts` — Image generation

## QC Rules

- Diverse illustrations (mix of races, ages, genders)
- No high-tech imagery (Main Street, not Silicon Valley)
- No wide AI maps (zoom tight)
- AI generates art, Canva handles typography
- No hardcoded fonts or colors — use CSS custom properties
- Test on all 4 screen sizes before merging
- Work on branches, not main. Test preview URLs before merging.

## Deliverables

1. **3 design variations** for /tour (different audiences)
2. **Redesigned /whiteboard** with TV/laptop/iPad/phone modes
3. **Origin story page** at /story
4. **Google positioning** integrated throughout
5. **Preview URLs** for Chase to review before merging
