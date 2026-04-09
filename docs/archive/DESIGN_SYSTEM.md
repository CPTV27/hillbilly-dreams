# MEASURABLY BETTER — DESIGN SYSTEM & VISION
## Last Updated: March 25, 2026

## 1. THE VIBE
"Zen and the Art of Motorcycle Maintenance meets Delta Blues."
- **NOT:** Tech startup, corporate, neon, SaaS-aggressive, victim-mentality.
- **IS:** Mississippi, river water, red clay, cream paper, iron bridges, forward motion.
- **Aesthetic:** Analog warmth meets digital precision. Google Cloud clarity with Southern editorial texture.

---

## 2. TYPOGRAPHY
**Two font families only. No exceptions.**

1. **Headlines / Display: Abril Fatface**
   - *The Analog Character.* Used for large statements, editorial headers, and brand moments. It carries the weight of an independent press and the soul of the Delta. Not generic.
2. **Body / UI: Inter**
   - *The Digital Precision.* Highly readable, works losslessly at small sizes on mobile devices. Clean, trustworthy, and invisible.

---

## 3. COLOR PALETTES BY BRAND LEVEL

### A. Measurably Better (Product Brand)
*Vibe: Warm, analog-meets-digital. The workhorse.*
- **Background (Cream Paper):** `#FAFAF8` (Warm white, avoiding clinical pure white)
- **Surface (Clean):** `#FFFFFF` (For depth on cards)
- **Text (Iron Bridge):** `#1A1A1A` (Near-black, softer on the eyes)
- **Accent (Red Clay / Amber):** `#B45309` (Hover: `#92400E`)
- **Borders (River Sand):** `#E5E5E0`

### B. Big Muddy Entertainment (Independent Record Label)
*Vibe: Late nights, vinyl sleeves, independent swagger.*
- **Background (Vintage Sleeve):** `#FAF7F2`
- **Text (Charcoal):** `#2D2926`
- **Accent (Delta Night / Periwinkle):** `#6477AD`
- **UI Elements:** High contrast, sharp edges.

### C. Big Muddy Publishing (Independent Press)
*Vibe: Printer's ink, heavy paper stock, literary weight.*
- **Background (Newsprint):** `#F3EFE9`
- **Text (Rich Ink):** `#111111`
- **Accent (Editor's Red / Burgundy):** `#7B1B46`

### D. Big Muddy Hospitality (Boutique Hotel)
*Vibe: Warmth, invitation, physical comfort.*
- **Background (Magnolia Cream):** `#FDFAFC`
- **Text (Deep Espresso):** `#2A2421`
- **Accent (Natchez Burgundy):** `#7B1B46` (Shared with publishing, but applied to softer surfaces)

### E. Hillbilly Dreams, Inc. (Holding Company)
*Vibe: Executive, understated, serious.*
- **Background (Cool Slate White):** `#F7F8FA`
- **Text (Boardroom Navy):** `#1B2A4A`
- **Accent (Steel Slate):** `#4A5568`

---

## 4. PAGE MOCKUPS & LAYOUTS

### A. The Front Door (`measurablybetter.life/`) — Name Gate
**Goal:** Feel like a Google sign-in page, but with Southern hospitality. Clean, purposeful, trustworthy.
- **Layout:** Vertically and horizontally centered in the viewport.
- **Visuals:** `#FAFAF8` background. No patterns.
- **Content:** 
  - Wordmark at the top (Abril Fatface, `#1A1A1A`).
  - Single, elegant text input: "Enter your name to continue".
  - Input styling: Only a bottom border (`#E5E5E0`), transitioning to Red Clay (`#B45309`) on focus. No harsh boxes.
  - Soft fade-in animation on load.

### B. `/measurably-better` — Product Landing & Pricing
**Goal:** The deal closer. Readability of Stripe docs with Google Cloud's confidence.
- **Hero:** Large Abril Fatface headline. Inter subtitle. One prominent Red Clay button. No hero graphics—just typography and whitespace.
- **Value Props:** 3-column grid. Inter for body copy. Icons are simple geometric CSS shapes (circles, squares) in Red Clay.
- **Pricing Cards (The Workhorse):**
  - Three cards side-by-side. Deep white surface (`#FFFFFF`), subtle shadow.
  - The $99/mo "Engine" tier has a 2px top border of `#B45309`.
  - Feature lists use CSS-drawn checkmarks.
  - Bottom CTA buttons: Solid Red Clay for the recommended tier, outlined for others.

### C. THE $20 LANDING PAGE (The Most Important Page)
**Goal:** One scroll, one button, one price. Target: SMB owner paying for ChatGPT.
- **Layout:** Single column, max-width 720px (`--mb-content-width`). No navigation bar, no footer noise, no distractions.
- **Hero Statement:**
  > **"You're already paying $20/mo for an AI that doesn't know your business."**
  > *"Pay the same $20 for one that does. Except this one reads your books, knows your margins, and writes your marketing."*
- **Visuals:** Warm Paper background (`#FAFAF8`). Iron Black text.
- **The Call to Action:** A single, massive Red Clay button centered at the bottom of the visible screen: **"Start 7-Day Trial — $20/mo"**.
- **Rule:** If they scroll, they just see a single, stark comparison table (Us vs. Generic AI), ending in the exact same button.

### D. `/big-muddy` — The Ecosystem Overview
**Goal:** Feel like a premium magazine homepage.
- **Layout:** Editorial grid structure. Abril Fatface dominates the headers.
- **Colors:** Vintage Sleeve background (`#FAF7F2`).
- **Cards:** Link out to Entertainment, Hospitality, Publishing. Cards have no borders, just image placeholders (gray boxes with specific aspect ratios) and Charcoal typography underneath. 

### E. `/welcome/[name]` — Personalized Tour
**Goal:** Personal briefing document.
- **Header:** "[Name], welcome to the platform." (Abril Fatface, massive).
- **Body:** Single column, highly readable narrative text (Inter, 1.8 line-height).
- **Modules:** Insert personalized data components (e.g., "Here is your localized P&L comparison") inside white surface cards with subtle shadows.
- **Tone:** Direct, warm, saying what we mean and then stopping.
