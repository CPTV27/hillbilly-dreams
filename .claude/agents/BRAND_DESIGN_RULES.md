# Brand Design Rules

**Purpose:** Single reference for all agents (Delta Dawn, Huck, Frontend Design) to enforce correct visual identity per brand. When generating images, posters, social assets, or page layouts — consult this document to pick the right palette, fonts, and tone.

**Source of truth for colors:** `packages/config/tokens.css`
**Last updated:** 2026-03-27

---

## Quick Lookup: "Which brand is this for?"

| If the request mentions... | Use brand... | Theme class |
|---|---|---|
| The Inn, rooms, Blues Room, lodging, weddings, Natchez hospitality | **Big Muddy Inn** | `.theme-inn` |
| Arri, artist-in-residence, Amy, Tracy's artist | **Arri Aslin** | `.theme-inn` (shared) |
| Touring, the circuit, Rise Up, route, venues, booking artists | **Big Muddy Touring** | `.theme-touring` |
| Radio, shows, playlists, episodes, on-air, broadcast | **Big Muddy Radio** | `.theme-radio` |
| Records, albums, releases, masters, label, vinyl | **Big Muddy Records** | `.theme-records` |
| Magazine, articles, city guides, features, contributors | **Big Muddy Magazine** | `.theme-magazine` |
| Books, publishing, long-form, editorial | **Big Muddy Publishing** | `.theme-magazine` (shared for now) |
| Outsider Economics, OE, economics, porch economics | **Outsider Economics** | `.theme-economics` |
| Gallery, art, prints, Buy Curious | **Gallery** | `.theme-gallery` |
| Measurably Better, MB, the product, AI business OS, SMB tool | **Measurably Better** | `.theme-mb` |
| MB Console, dashboard, admin, data, metrics | **MB Console** | `.theme-mb-console` |
| Hillbilly Dreams, HDI, holding company, the parent | **Hillbilly Dreams Inc** | `.theme-hillbilly` |
| Friday show, weekend event, blues night (at the Inn) | **Big Muddy Inn** | `.theme-inn` |

---

## Brand Rules by Property

### 1. The Big Muddy Inn

**Theme class:** `.theme-inn`
**Domain:** thebigmuddyinn.com

| Element | Rule |
|---|---|
| **Background** | Cloud Dancer ivory `#F1F0EC` |
| **Primary accent** | Magenta `#994878` |
| **Hover/pressed** | Magenta dark `#7C2855` |
| **Secondary accent** | Sage mid `#6FA088` |
| **Deep accent** | Sage dark `#235B4E` |
| **Text** | Dark grey `#25282A` |
| **Display font** | Citrus Gothic (commercial, self-hosted) → fallback: Abril Fatface |
| **Subhead font** | Abril Fatface |
| **Body font** | Montserrat Light (300/400/500) |
| **Logo placement** | Top left, horizontal lockup |
| **Tone** | "Offbeat Opulence" — boutique, Southern charm, not fussy, warm |
| **Photography** | Real photos only. Golden hour, intimate interiors, blues performers. NO AI landscapes. |
| **Poster dimensions** | 11x17 (print), 1080x1350 (Instagram), 1920x1080 (event banner) |

**DO:** Use magenta for CTAs, sage for secondary elements, ivory backgrounds
**DON'T:** Use amber/gold (that's Touring), use dark backgrounds (that's Radio/Records), use Inter/Helvetica (that's MB)

---

### 2. Big Muddy Touring

**Theme class:** `.theme-touring`
**Domain:** bigmuddytouring.com

| Element | Rule |
|---|---|
| **Background** | Warm near-black `#1a1816` |
| **Primary accent** | Amber gold `#c8943e` |
| **Hover** | Light amber `#d4a44e` |
| **Text** | Warm cream `#f0ebe0` |
| **Text muted** | `#9d968a` |
| **Display font** | Playfair Display (italic for emphasis) |
| **Body font** | DM Sans |
| **Logo** | "Big Muddy Touring" horizontal, amber on dark |
| **Tone** | Road-worn, rock & roll, dark twilight. Professional but creative. "Come play with us." |
| **Photography** | Real road photos, venues at night, the van/bus branded shots. Wet streets, neon, stage lights. |
| **Poster dimensions** | 11x17 (venue poster), 1080x1080 (social square), 1920x1080 (hero banner) |

**DO:** Use dark backgrounds, amber accents, italic Playfair for headlines, full-bleed photo breaks
**DON'T:** Use magenta (that's the Inn), use light/cream backgrounds (that's the Inn/Gallery), use bright colors

---

### 3. Big Muddy Radio

**Theme class:** `.theme-radio`
**Domain:** bigmuddyradio.com

| Element | Rule |
|---|---|
| **Background** | Midnight blue `#060b18` |
| **Primary accent** | Electric blue `#00b4ff` |
| **Hover** | Light blue `#33c4ff` |
| **Text** | Cool cream `#e8ecf4` |
| **Text muted** | `#8899bb` |
| **Display font** | Playfair Display |
| **Body font** | DM Sans |
| **Tone** | Fun outlaw radio. Friendly, wacky, silly, great personalities. NOT dark brooding. Inviting chaos. |
| **Photography** | Studio shots, microphones, headphones, live sessions. Warm tungsten lighting. |
| **Poster dimensions** | 1080x1080 (episode art), 1920x1080 (show banner), 3000x3000 (podcast cover) |

**DO:** Use deep blue backgrounds, electric blue accents, show personality in copy
**DON'T:** Use amber (that's Touring), use formal/corporate tone, use serif fonts for body copy

---

### 4. Big Muddy Records

**Theme class:** `.theme-records`
**Domain:** bigmuddyrecordlabel.com

| Element | Rule |
|---|---|
| **Background** | Vinyl black `#0c0806` |
| **Primary accent** | Burnt orange `#e87820` |
| **Hover** | Light orange `#f09040` |
| **Text** | Warm cream `#f0e8e0` |
| **Text muted** | `#b09888` |
| **Display font** | Playfair Display (italic preferred) |
| **Body font** | DM Sans |
| **Tone** | Indie label with taste. Analog warmth. "You keep your masters." Credible but warm. |
| **Photography** | Artist portraits, vinyl close-ups, studio sessions, turntables. High contrast, warm tones. |
| **Poster dimensions** | 3000x3000 (album art), 1080x1080 (release announcement), 1080x1350 (artist feature) |

**DO:** Use near-black backgrounds, orange accents, italic display type, vinyl/analog visual metaphors
**DON'T:** Use blue (that's Radio), use light backgrounds, use corporate language

---

### 5. Big Muddy Magazine

**Theme class:** `.theme-magazine`
**Domain:** bigmuddymagazine.com

| Element | Rule |
|---|---|
| **Background** | Deep forest `#0a120c` |
| **Primary accent** | Warm gold `#d4a04a` |
| **Hover** | Light gold `#e0b060` |
| **Text** | Warm cream `#f0ede4` |
| **Text muted** | Sage `#9aab98` |
| **Display font** | Playfair Display |
| **Body font** | DM Sans |
| **Line height** | 1.75 (generous for long-form reading) |
| **Tone** | Editorial, print-quality. City guides, long-form features. Garden & Gun meets Kinfolk. |
| **Photography** | Real editorial photography. Landscapes, food, architecture, portraits. Natural light. |
| **Poster dimensions** | 1080x1350 (article card), 1920x1080 (feature banner), 8.5x11 (print layout) |

**DO:** Use forest-green backgrounds, gold accents, generous white space, editorial layouts
**DON'T:** Use magenta (that's the Inn), use compact UI layouts (this is editorial, not SaaS)

---

### 6. Big Muddy Publishing (Magazine + Books)

**Theme class:** `.theme-magazine` (shared with Magazine for now)
**Managed by:** Tracy Alderson-Allen

Publishing shares the Magazine theme but with more literary weight. Books and Outsider Economics live here.

**Additional rules for Publishing:**
- Book covers get their own palette per title — not locked to any theme
- Outsider Economics uses `.theme-economics` (see below)
- Tracy's editorial voice is the brand voice
- Print-first thinking: everything should look good as a PDF or physical book

---

### 7. Outsider Economics

**Theme class:** `.theme-economics`
**Domain:** outsidereconomics.com

| Element | Rule |
|---|---|
| **Background** | Cool dark `#111318` (or warm dark `#0f0e0d` — two variants exist) |
| **Primary accent** | Red `#b54c4c` |
| **Hover** | Bright red `#c85c5c` |
| **Text** | Cool cream `#e4e8f0` |
| **Display font** | Playfair Display |
| **Body font** | DM Sans |
| **Tone** | Sophisticated economics publishing. NOT insurgent/gritty — moving toward classy, accessible. |
| **Photography** | Main Street businesses, small-town commerce, real people working. Documentary style. |

**NOTE FROM CEO (2026-03-26):** Outsider Economics is moving under the Publishing arm. It should feel like sophisticated publishing, not insurgent media. The red accent may shift to something more editorial in future iterations.

---

### 8. Gallery (Buy Curious Art)

**Theme class:** `.theme-gallery`
**Domain:** buycuriousart.com

| Element | Rule |
|---|---|
| **Background** | Museum white `#FAFAF8` |
| **Primary accent** | Muted gold `#b8963e` |
| **Text** | Near-black `#1a1a1a` |
| **Display font** | Playfair Display |
| **Body font** | DM Sans |
| **Tone** | Clean, minimal, the art speaks. Museum-gallery feel. |
| **Photography** | Art photography with neutral backgrounds. The art IS the content. |

**DO:** Let the art be the hero. Minimal chrome. White space.
**DON'T:** Compete with the artwork visually. No heavy borders, no busy backgrounds.

---

### 9. Measurably Better

**Theme class:** `.theme-mb`
**Domain:** measurablybetterthings.com

| Element | Rule |
|---|---|
| **Background** | Pure white `#FFFFFF` |
| **Primary accent** | Burgundy `#7B1B46` |
| **Hover** | Dark burgundy `#5C1234` |
| **Text** | Near-black `#1A1A1A` |
| **Text muted** | `#6B7280` |
| **Display font** | Inter (or system sans-serif). **NEVER Abril Fatface, NEVER Playfair, NEVER any Big Muddy serif.** |
| **Body font** | Inter |
| **Tone** | Swiss-clean authority. "The most elegant way to do everything." Confident, minimal, warm but professional. |
| **Photography** | Real small businesses, Main Street, real people using technology. Warm, natural, not stock-photo sterile. |
| **Logo** | Clean wordmark, no decorative elements |

### FONT FIREWALL

**Measurably Better MUST use Inter (or a clean sans-serif) for ALL typography.**
- No Abril Fatface
- No Playfair Display
- No Citrus Gothic
- No decorative serifs of any kind
- The entire point of MB is that it looks different from the Big Muddy ecosystem
- MB is the product. Big Muddy is the media company. They must not look related.

**DO:** Use white backgrounds, clean sans-serif, black/burgundy CTAs, generous spacing, minimal decoration
**DON'T:** Use Big Muddy fonts, use dark backgrounds, use amber/gold accents, use editorial layouts

---

### 10. Measurably Better Console

**Theme class:** `.theme-mb-console`

| Element | Rule |
|---|---|
| **Background** | Slate dark `#020617` |
| **Primary accent** | Sky blue `#0ea5e9` |
| **Text** | Slate light `#cbd5e1` |
| **Font** | Inter + monospace for data |
| **Tone** | Industrial command center. Data-forward. Clean. |

Same font firewall as MB — no Big Muddy fonts.

---

### 11. Hillbilly Dreams Inc (Holding Company)

**Theme class:** `.theme-hillbilly`
**Domain:** hillbillydreamsinc.com

| Element | Rule |
|---|---|
| **Background** | Iron navy `#0a0f1a` |
| **Primary accent** | Amber gold `#c8943e` |
| **Text** | Warm cream `#f0ebe0` |
| **Display font** | Playfair Display |
| **Body font** | DM Sans |
| **Tone** | CEO direction: Duncan Trussell / Midnight Gospel energy. Electric, psychedelic, weird, playful. NOT corporate iron. (Current theme doesn't match this yet — redesign pending.) |

**NOTE:** The current `.theme-hillbilly` in tokens.css is iron-dark corporate. Chase wants this to shift toward psychedelic/electric. The theme will be updated in a future iteration.

---

## Cross-Brand Rules

### Never Cross-Pollinate These:

| Rule | Why |
|---|---|
| Never use MB fonts on Big Muddy properties | They're different companies visually |
| Never use Big Muddy serifs on MB | Font firewall — MB must look like a tech product |
| Never use Inn magenta on Touring | Different sub-brands, different palettes |
| Never use Radio blue on Records | Each entertainment property has its own accent |
| Never use dark backgrounds for the Inn | The Inn is light/cream — "Cloud Dancer" |
| Never use light backgrounds for Radio/Records | They're dark-native brands |

### Image Rules (All Brands):

1. **Real photos preferred over AI** — AI is acceptable only for fleet mock-ups and aspirational concepts
2. **No unnatural skies** — teal, pink, split-tone skies get killed immediately
3. **Golden hour > midday** — warm, directional light is the standard
4. **Every image needs a registry entry** — filename, source, location, keywords, AI/real flag
5. **No stock photography** — if we didn't shoot it or generate it, we don't use it

### Poster Generation Rules (for Delta Dawn / Imagen):

When generating a poster or visual asset:
1. Identify the brand from context (use the lookup table above)
2. Apply that brand's palette and fonts
3. Use the correct poster dimensions for the intended platform
4. Include the brand logo in the correct position
5. Post preview to Google Chat for approval before publishing to GCS
6. Never generate assets that mix brand identities (no Inn magenta on a Touring poster)

---

## Photography Style (All Brands)

Reference: Chase's photography style guide (`memory/style_guide_photography.md`)

**One-line style:** "Saturated warm editorial photography of the Deep South — orange-teal cinema color grade, DxO DeepPRIME clarity, high contrast, magazine-quality sharpness."

### Imagen Prompt Modifiers (append to all generation prompts):

**Base modifiers (always include):**
```
editorial photography, magazine quality, high saturation, warm amber color grade,
orange and teal color grading, high contrast, deep rich shadows with detail,
sharp micro-contrast detail, Southern United States, inviting atmosphere,
environmental storytelling, sense of place, shot on full-frame DSLR
```

**Night scenes (add):**
```
warm sodium vapor lighting, glowing neon signs, string lights,
golden amber atmosphere, blue hour, dark rich sky, inviting nightlife
```

**Daytime scenes (add):**
```
bright midday sun, vivid blue sky with cumulus clouds, strong shadows,
Gulf Coast sunshine, punchy saturated colors
```

**Food/detail shots (add):**
```
shallow depth of field, creamy warm bokeh, extreme close-up,
table-level perspective, warm ambient restaurant light
```

### Image Generation DON'Ts:
- No desaturated, muted, or pastel palettes
- No cool/clinical blue-toned night photography
- No film grain or analog texture overlays
- No flat, low-contrast editorial looks
- No stock photography sterility
- No people posed or looking at camera
- No unnatural skies (teal, pink, split-tone)
- No obviously HDR halos or tone-mapped artifacts

---

## For Huck (Build Agent)

This document is ready to be embedded in Delta Dawn's system prompt. Key sections to include:
- The "Quick Lookup" table (so she picks the right brand from context)
- The per-brand color/font/tone rules
- The photography style modifiers (append to every Imagen prompt)
- The "Never Cross-Pollinate" rules
- The poster generation workflow

The existing infrastructure (`lib/imagen.ts`, `/api/media/generate`, GCS upload) just needs the brand context injected into the generation prompt. Delta Dawn should:
1. Identify the brand from context using the lookup table
2. Pull that brand's colors/fonts/tone
3. Append the photography style modifiers
4. Generate via Imagen
5. Post preview to Google Chat for approval
6. On approval, upload to GCS and register in image database
