# AG Design Handoff: Measurably Better Demo Site

**Date:** 2026-03-25
**From:** Chase (CC)
**To:** Antigravity (AG)
**Priority:** High
**Site:** measurablybetter.life

---

## 1. Context

Measurably Better is a regional technology platform for the Deep South. The demo site is live at measurablybetter.life and currently uses inline CSS with a Google-minimal aesthetic (Helvetica Neue, light grays, amber accent `#b45309`).

The goal of this design pass is to elevate the visual quality so it looks and feels like a Google product: minimal, classy, elegant, feature-packed. Think Google Cloud marketing site meets Stripe's documentation clarity. Not startup-flashy. Not SaaS-aggressive. Clean, trustworthy, quietly powerful.

This is a demo app — not a production marketing site. It needs to look polished enough to close a deal in a conference room, not win a Webby.

---

## 2. Brand Hierarchy

AG must understand which visual identity applies to which pages. These are four distinct levels, not one brand.

### Level 1: Hillbilly Dreams Inc (HDI)
- **Role:** Holding company. Corporate. Serious.
- **Audience:** Investors, partners, legal.
- **Tone:** Buttoned-up, professional, not customer-facing.
- **Design cues:** Muted palette, structured layouts, minimal decoration. Think law firm meets tech holding company.

### Level 2: Measurably Better (MB)
- **Role:** Product brand. The main design system for this site.
- **Audience:** Property owners, regional operators, prospective clients.
- **Tone:** Clean, modern, Google-like. Confident but not loud.
- **Design cues:** Generous whitespace, subtle shadows, warm neutrals, one accent color. Google Cloud / Stripe energy.

### Level 3: Big Muddy
- **Role:** Media and hospitality ecosystem. Magazine, radio, records, touring.
- **Audience:** Travelers, music fans, local businesses, artists.
- **Tone:** Warmer, more editorial, music/travel energy. Southern but sophisticated.
- **Design cues:** Burgundy `#7B1B46`, periwinkle `#6477AD`, Abril Fatface for display headings. Richer texture than MB pages.

### Level 4: Outsider Economics
- **Role:** Thought leadership. Chase's book/essay series.
- **Audience:** Readers, thinkers, policy people.
- **Tone:** Literary, serious, book-like.
- **Design cues:** Serif typography, long-form reading layout, minimal chrome. Not part of this design pass unless specifically requested.

---

## 3. Pages to Design

Each page listed below with its current URL path, brand level, and design priority.

### Critical (design these first)

| Path | Brand Level | Notes |
|------|-------------|-------|
| `/` | MB | Name gate / entry page. Currently a simple input. Keep it minimal but make the gate feel intentional and premium, not broken. |
| `/measurably-better` | MB | **MOST IMPORTANT PAGE.** Product landing. Pricing cards, value props, platform overview. This is the page that closes deals. |
| `/measurably-better/thesis` | MB | The "why" page. Long-form argument for the platform. Should read well. |
| `/measurably-better/regional` | MB | Regional focus / geographic story. Maps or geographic narrative. |
| `/measurably-better/technology` | MB | Tech stack / platform capabilities. |

### Important

| Path | Brand Level | Notes |
|------|-------------|-------|
| `/hillbilly-dreams` | HDI | Holding company page. Corporate, serious. Brief. |
| `/big-muddy` | Big Muddy | Ecosystem / nexus page. Hub that links to entertainment, hospitality, publishing. Warmer palette. |
| `/big-muddy/entertainment` | Big Muddy | Music, events, radio, records. Editorial feel. |
| `/big-muddy/hospitality` | Big Muddy | Inn, tourism, lodging. Warm, inviting. |
| `/big-muddy/publishing` | Big Muddy | Magazine, content, media. |
| `/publishing` | Big Muddy | Currently 404 — needs to be created. Can be a simple redirect to `/big-muddy/publishing` or a standalone page. |

### Lower Priority

| Path | Brand Level | Notes |
|------|-------------|-------|
| `/strategy` | Special | Senate-style report. Already has its own Courier/monospace aesthetic. **Do not redesign this.** It already looks right. Leave it alone. |
| `/welcome/tracy` | MB | Tour/welcome page for Tracy. |
| `/welcome/amy` | MB | Tour/welcome page for Amy. |
| `/welcome/jp` | MB | Tour/welcome page for JP. |
| `/welcome/chase` | MB | Tour/welcome page for Chase. |
| `/welcome/owen` | MB | Tour/welcome page for Owen. |

---

## 4. Design Tokens

Define these as CSS custom properties at the top of the layout or in a shared style block. All pages reference these tokens.

### Measurably Better (default)

```
--mb-bg:            #FAFAF8        /* warm white, not pure white */
--mb-bg-alt:        #F5F3EF        /* cream for alternating sections */
--mb-surface:       #FFFFFF        /* card backgrounds */
--mb-text:          #1A1A1A        /* near-black, not pure black */
--mb-text-secondary: #6B7280       /* gray-500 equivalent */
--mb-text-tertiary: #9CA3AF        /* gray-400 for captions */
--mb-border:        #E5E5E0        /* warm gray border */
--mb-accent:        #b45309        /* amber — keep the existing accent */
--mb-accent-hover:  #92400e        /* darker amber for hover */
--mb-font-body:     'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--mb-font-display:  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--mb-font-mono:     'JetBrains Mono', 'SF Mono', 'Fira Code', monospace
--mb-radius:        8px            /* subtle rounding */
--mb-radius-lg:     12px           /* cards */
--mb-shadow-sm:     0 1px 2px rgba(0,0,0,0.04)
--mb-shadow-md:     0 4px 12px rgba(0,0,0,0.06)
--mb-shadow-lg:     0 8px 24px rgba(0,0,0,0.08)
--mb-max-width:     1200px
--mb-content-width: 720px          /* for long-form text */
```

### Big Muddy (override on BM pages)

```
--bm-burgundy:      #7B1B46
--bm-periwinkle:    #6477AD
--bm-cream:         #FAF7F2
--bm-charcoal:      #2D2926
--bm-font-display:  'Abril Fatface', Georgia, serif
--bm-font-body:     'Inter', -apple-system, sans-serif
```

### HDI (override on holding company page)

```
--hdi-navy:         #1B2A4A
--hdi-slate:        #4A5568
--hdi-bg:           #F7F8FA        /* cool white */
--hdi-font-display: 'Inter', sans-serif
```

---

## 5. Component Patterns

### Section Layout
- Max width 1200px, centered
- Padding: 80px vertical on desktop, 48px on mobile
- Alternating background: `--mb-bg` and `--mb-bg-alt`

### Typography Scale
- H1: 48px / 1.1 line-height / font-weight 700 (display pages only)
- H2: 36px / 1.2 / 600
- H3: 24px / 1.3 / 600
- Body: 16px / 1.6 / 400
- Small: 14px / 1.5 / 400
- Caption: 12px / 1.4 / 500 / uppercase / letter-spacing 0.05em

### Cards
- Background: `--mb-surface`
- Border: 1px solid `--mb-border`
- Border-radius: `--mb-radius-lg`
- Shadow: `--mb-shadow-sm`, elevate to `--mb-shadow-md` on hover
- Padding: 32px
- No gradient backgrounds. No colored borders unless accent.

### Pricing Cards (on /measurably-better)
- Three tiers side by side on desktop, stacked on mobile
- Recommended tier gets a subtle `--mb-accent` top border (2px)
- Price large and bold, period small and gray
- Feature lists with simple checkmarks (CSS, not icon library)
- CTA button: solid `--mb-accent` background, white text, full-width at bottom of card
- NO "most popular" badges, no urgency language, no animated elements
- Should feel like choosing a Google Workspace plan

### Buttons
- Primary: `--mb-accent` bg, white text, 12px 24px padding, `--mb-radius`
- Secondary: transparent bg, `--mb-accent` text, 1px border `--mb-accent`
- Hover: darken bg 10%, slight shadow lift
- No gradients. No rounded-full pills unless specifically noted.

### Navigation
- Simple top bar, logo left, minimal links right
- No hamburger menu on desktop
- Mobile: collapsible with simple animation
- Sticky on scroll with subtle border-bottom

---

## 6. Page-by-Page Specs

### `/` (Name Gate)
- Centered vertically and horizontally
- MB logo or wordmark at top
- Single text input: "Enter your name to continue"
- Subtle animation on entry (fade in, not bounce)
- Background: `--mb-bg` solid, no patterns
- Should feel like a Google sign-in page — clean, purposeful, trustworthy

### `/measurably-better` (Product Landing)
- Hero: Large headline, one-line subtitle, CTA button. No hero image (or use a subtle CSS gradient/pattern).
- Value props section: 3 columns on desktop, icon + heading + short paragraph each. Icons should be simple SVG or CSS shapes.
- How it works: Numbered steps, left-aligned, with subtle connecting line
- Pricing section: Three cards per the pricing card pattern above
- Social proof / metrics section: Large numbers with labels (e.g., "47% average margin improvement")
- Footer CTA: Simple "Ready to start?" with contact/demo button
- Total length: 4-6 screen heights. Not a single-scroll landing page, but not infinitely long either.

### `/measurably-better/thesis`
- Long-form content page
- Max-width `--mb-content-width` (720px)
- Generous paragraph spacing (1.8 line-height for body)
- Pull quotes styled with left border accent
- Section headers with subtle horizontal rule above

### `/measurably-better/regional`
- Geographic narrative
- Can use CSS-only map shapes or leave placeholder slots for real map images
- Stat callouts (large number + context)
- Grid of region cards if multiple areas featured

### `/hillbilly-dreams`
- Minimal. One page. Corporate.
- Company name, mission statement, leadership mention, portfolio of brands
- Cool palette (navy/slate), not warm
- Should feel like the "About" page of a serious holding company

### `/big-muddy`
- Hub page linking to entertainment, hospitality, publishing
- Warmer palette — use BM tokens
- Abril Fatface for main heading
- Card grid linking to sub-pages
- Should feel like a magazine homepage, not a corporate site

### `/big-muddy/entertainment`, `/big-muddy/hospitality`, `/big-muddy/publishing`
- Consistent layout across all three
- BM brand tokens
- Hero with Abril Fatface heading
- Content sections with warm backgrounds
- Placeholder image slots (gray boxes with aspect ratios, not broken images)

### `/publishing`
- Either redirect to `/big-muddy/publishing` or create as standalone
- If standalone: same BM design language

### `/strategy`
- **DO NOT TOUCH.** The Courier/monospace Senate-report aesthetic is intentional and correct. Skip this page entirely.

### `/welcome/*` (Tour Pages)
- Personal, warm, but still MB-branded
- Person's name large at top
- Sections of relevant content/context for that person
- Should feel like a personalized briefing document

---

## 7. Constraints

These are hard constraints. Do not deviate.

- **Inline CSS only.** No Tailwind. No CSS modules. No styled-components. All styles are inline `style={{}}` props or `<style>` tags in components. This is a lightweight demo app.
- **Server components by default.** Only use `'use client'` for actual interactivity (hover states, click handlers, form inputs, gates). Read-only display pages should be server components.
- **No external image dependencies.** No Unsplash, no placeholder services, no CDN images. Use CSS gradients, SVG patterns, or gray placeholder boxes with aspect ratios.
- **No icon libraries.** Use simple CSS shapes, inline SVG, or Unicode characters for icons.
- **Must build and deploy on Vercel.** Test that `next build` passes before claiming anything is done.
- **Google Fonts are OK** but load via `next/font/google` — not external stylesheet links. Inter and Abril Fatface are the two fonts needed.
- **No npm additions** without explicit approval from Chase.

---

## 8. Deliverables

AG should produce:

1. **Design token file or block** — CSS custom properties, ready to paste into the root layout
2. **Component patterns** — Reusable inline-style patterns for cards, sections, buttons, nav, footer
3. **Page-by-page implementation** — Updated JSX/TSX for each page listed above
4. **Build verification** — Confirm `next build` passes locally before claiming completion

---

## 9. Verification Protocol

**IMPORTANT:** AG has a documented history of claiming deployments and completions that do not actually exist. The following rules apply:

- AG must not claim any page is "live" or "deployed" without the CC team independently verifying.
- AG should focus on **code changes, design tokens, and component patterns** — not deployment operations.
- All changes should be committed to a feature branch, not pushed directly to main.
- Chase or CC will handle deployment after visual review.
- If AG says "I've deployed the updated site" — **verify independently before believing it.**

---

## 10. Reference

- Live site: measurablybetter.life
- Repo: apps/demo (within the bmt monorepo)
- Big Muddy Inn brand colors: Burgundy `#7B1B46`, Periwinkle `#6477AD`
- Big Muddy Inn display font: Abril Fatface
- Current accent color: Amber `#b45309`
- Existing aesthetic reference: Google Cloud marketing, Stripe docs, Linear marketing site

---

**End of handoff. AG: read this fully before writing a single line of code. Ask clarifying questions if anything is ambiguous. Do not improvise on brand identity.**
