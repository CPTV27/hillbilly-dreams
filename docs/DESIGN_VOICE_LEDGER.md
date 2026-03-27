# Design ↔ Voice Coordination Ledger

**Purpose:** Single source of truth for how visual design and brand voice stay in sync across all HDI properties. Updated by the Frontend Design Agent and reviewed by the Brand Voice Agent (and vice versa). The Data Scientist Agent logs data story formats here too.

**Last updated:** 2026-03-26

---

## Agents & Roles

| Agent | Owns | Does NOT do |
|---|---|---|
| **Frontend Design Agent** (this file's primary author) | Visual direction, CSS themes, component layouts, typography, color, editorial aesthetics | Write production code, deploy, define brand voice/copy tone |
| **Brand Voice Agent** (AG) | Copy tone, headline voice, microcopy, brand personality per property | Pick colors, choose fonts, define layouts |
| **Build Agent** (CC / Claude Code) | Code implementation, architecture, deployment | Design direction, copy decisions |
| **Data Scientist Agent** | Data stories, metrics, chart aesthetics, dashboard content | Brand voice, layout structure |

---

## Brand Direction Summary (from CEO, 2026-03-26)

| Brand | Visual Direction | Voice Direction | Status |
|---|---|---|---|
| **Hillbilly Dreams Inc** | Psychedelic, electric, Duncan Trussell / Midnight Gospel. Weird & playful, NOT corporate iron. | TBD — Voice Agent to propose | Design preview: done |
| **Measurably Better** | Swiss-clean, Inter/Helvetica, white/light, authoritative. "The most elegant way to do everything." | TBD — Voice Agent to propose | Design preview: done |
| **Big Muddy (hub)** | Artsy tourism/hospitality, warm cream, Abril Fatface, magazine feel | TBD — Voice Agent to propose | Design preview: done |
| **Big Muddy Radio** | Fun outlaw radio, friendly, wacky, silly, great personalities | TBD — Voice Agent to propose | Design preview: pending |
| **Big Muddy Touring** | Artist-facing, professional but creative, "come play with us" | TBD — Voice Agent to propose | Design preview: pending |
| **Big Muddy Records** | Between Radio and Touring, indie music industry, warm | TBD — Voice Agent to propose | Design preview: pending |
| **Big Muddy Magazine + Books** | Classy, high-end bookstore, Tracy's department, senate-staffer polish | TBD — Voice Agent to propose | Design preview: pending |
| **Outsider Economics** | Under Publishing arm — sophisticated, NOT insurgent red | TBD — Voice Agent to propose | Design preview: pending |
| **The Big Muddy Inn** | Tracy's official brand: Magenta #994878, Sage #6FA088, Cloud Dancer | Tracy's existing brand guidelines | Existing .theme-inn |

---

## How This Ledger Works

### When the Design Agent proposes a theme:
1. Log it here with: theme name, palette, fonts, mood reference, preview file path
2. Tag Voice Agent to review if the visual energy matches the copy tone they've defined
3. Note any headlines or placeholder copy that need Voice Agent input

### When the Voice Agent proposes brand voice:
1. Log it here with: brand, tone words, headline examples, do/don't rules
2. Tag Design Agent to review if the typography and color match the voice energy
3. Note any visual requirements the voice implies (e.g., "playful" voice needs rounded type)

### When the Data Scientist creates a data story:
1. Log the chart/metric type and which brand context it lives in
2. Design Agent proposes visual treatment (chart colors, typography)
3. Voice Agent proposes the narrative framing (headline, caption tone)

---

## Design Decisions Log

### 2026-03-26 — Initial proposals

**Hillbilly Dreams Inc (.theme-hillbilly v2)**
- Preview: `prototypes/brand-previews/hillbilly-dreams-inc.html`
- Palette: Deep purple-black `#0a0612`, electric purple accent `#c74eff`, mint `#4ae8c4`, warm amber `#ffb347`
- Fonts: Unbounded (display), Space Grotesk (body) — both need to be added to layout.tsx
- Mood: Midnight Gospel, Adult Swim, psychedelic dream state
- Radius: 16px (rounder than other brands)
- Status: **Awaiting CEO review**
- Voice Agent: Please propose tone — is this brand funny? Cosmic? Irreverent?

**Measurably Better (.theme-mb)**
- Preview: `prototypes/brand-previews/measurably-better.html`
- Palette: Pure white `#FFFFFF`, near-black text `#111111`, amber highlight `#b45309`
- Fonts: Inter everywhere — the modern Helvetica
- Mood: Google Cloud, Stripe, Linear. Swiss-clean authority.
- Radius: 6-10px (tighter, more precise)
- Primary CTA color: Black (not amber). Amber reserved for highlights/badges.
- Status: **Awaiting CEO review**
- Voice Agent: Headlines should sound confident & minimal. "It does all the cool stuff you don't know how to do." is the energy.

**Big Muddy Hub (.theme-big-muddy)**
- Preview: `prototypes/brand-previews/big-muddy-hub.html`
- Palette: Warm cream `#FAF7F2`, burgundy accent `#7B1B46`, periwinkle `#6477AD`
- Fonts: Abril Fatface (display), DM Sans (body)
- Mood: Boutique travel magazine in a hotel lobby. Kinfolk meets Garden & Gun.
- Nav: Magazine masthead style (centered logo, section links below)
- Status: **Awaiting CEO review**
- Voice Agent: Tone is Southern-sophisticated, not corporate. Headlines sound like stories.

---

## Pending Voice Decisions (for Brand Voice Agent)

- [ ] HDI: What's the personality? Cosmic? Irreverent? Stoner-philosophical?
- [ ] MB: How technical should copy get? Always plain English? Or some jargon for credibility?
- [ ] Radio: "Outlaw" how? Pirate radio? NPR-with-personality? Morning zoo?
- [ ] Records: Artist-facing copy vs fan-facing copy — same voice or different?
- [ ] Magazine/Books: Is Tracy's voice the brand voice? Or does the publication have its own editorial voice?
- [ ] OE: Moving away from "insurgent" — what replaces it? Academic? Accessible economics?

---

## Pending Design Decisions (for Frontend Design Agent — me)

- [ ] Remaining previews: Radio, Touring, Records, Publishing, Inn
- [ ] Font loading strategy: Several proposed fonts aren't in layout.tsx yet
- [ ] Photo treatment: Each brand needs a distinct approach to imagery
- [ ] Mobile breakpoints: Magazine nav needs mobile-specific treatment
- [ ] Dark/light mode: Some brands are dark-native (Radio, Records), some light-native (MB, Inn, Magazine)

---

## Data Story Formats (for Data Scientist Agent)

_No entries yet. When the Data Scientist Agent produces charts or metrics stories, log the visual format here so Design can propose the right theme treatment._
