# Content Audit — April 2026

*Audited 2026-04-01 against `docs/BUSINESS_ARCHITECTURE.md` (source of truth), `QA_CHASE.md`, and the claim ladder.*

---

## Scorecard

| Page | Domain | Verdict | Priority | Issues |
|------|--------|---------|----------|--------|
| `/touring` | bigmuddytouring.com | NEEDS WORK | NOW | BuyCurious in ecosystem, missing MBT footer, hardcoded hex |
| `/entertainment` | bigmuddyentertainment.com | NEEDS WORK | THIS WEEK | BuyCurious in ecosystem, "four divisions" meta, sleeper bus claim |
| `/magazine` | bigmuddymagazine.com | PASS | BACKLOG | Missing MBT footer only |
| `/radio` | bigmuddyradio.com | PASS | BACKLOG | Missing MBT footer only |
| `/records` | bigmuddyrecords.com | REWRITE | NOW | Package pricing (Copy Reset flags), BuyCurious, missing footer, hardcoded hex |
| `/directory` | deepsouthdirectory.com | NEEDS WORK | NOW | Claim ladder violations ($49/$99 not gated), SaaS jargon |
| `/bearsville` | bearsvillemediagroup.com | PASS | BACKLOG | Footer says HDI instead of MBT |
| `/measurably-better` | measurablybetter.life | NEEDS WORK | THIS WEEK | Missing MBT footer |
| `/measurably-better/technology` | measurablybetter.life | NEEDS WORK | THIS WEEK | Gemini specs not attributed, startup jargon |
| `/measurably-better/life` | measurablybetter.life | PASS | BACKLOG | Hardcoded hex |
| `/hillbilly` | hillbillydreamsinc.com | NEEDS WORK | THIS WEEK | Hardcoded font (HARD FAIL), wrong voice, Google Cloud partner feel |
| `/economics` | outsidereconomics.com | PASS | BACKLOG | Missing MBT footer only. Best-written page in the set. |
| `/studioc` | studiocvideo.com | NEEDS WORK | NOW | "Arri Aslin" misspelled 6x, missing footer |
| `/tuthill` | tuthilldesign.com | NEEDS WORK | THIS WEEK | BuyCurious in portfolio, "AI publishing engine" jargon |

---

## Cross-Cutting Issues

### 1. "Arrie Aslin" spelled wrong in ~25 files

**Correct:** Arrie Aslin / Arrie B. Aslin
**Found:** "Arri Aslin" and "Arri B. Aslin" (missing the 'e')

Affected: studioc, touring/inn/weddings, touring/inn/blog, touring/inn/events/flyer, snap, task-sync, sidecar-writer, ops/chat, kiosk test, llms.txt

**Fix:** Global find-and-replace.

### 2. "BuyCurious" still live — Tracy vetoed this name

Appears on: touring ecosystem, records ecosystem + footer, tuthill portfolio, entire /gallery section, whiteboard pages.

**Fix:** Replace with "Venture Gallery" everywhere.

### 3. Missing "Powered by Measurably Better Things" footer

Rule 10: "Powered by Measurably Better Things in every footer."
Present on: `/directory`, `/entertainment` only.
Missing on everything else.

**Fix:** Create shared `PoweredByFooter.tsx` component. Add to all route group layouts.

### 4. Hardcoded hex colors

Touring, directory, records layout, hillbilly, MBT/life all have inline hex values.
QC rule: "No hardcoded colors — use CSS custom properties."
Google brand colors (#4285F4 etc.) get a pass as external brand assets.

### 5. Hardcoded font on /hillbilly

Uses `'Plus Jakarta Sans', system-ui` inline. QC rule: use `var(--font-body)` or `var(--font-display)`.

---

## Page Detail

### /touring (bigmuddytouring.com) — NEEDS WORK

**Voice:** Good. Road-worn, aspirational.
**Architecture:** Correct.
**Issues:**
- BuyCurious Art in ecosystem links
- "Prevost buses" mentioned (Sprinter van is current reality)
- Missing MBT footer
- Hardcoded hex: #1a1a1a, #2d1810, #c8943e

**Fix:** Remove BuyCurious from ecosystem. Add MBT footer. Soften Prevost claim to aspirational.

### /entertainment (bigmuddyentertainment.com) — NEEDS WORK

**Voice:** Excellent. Best consumer page. "We bring the party."
**Architecture:** Correct.
**Issues:**
- Layout meta says "Four divisions" (Copy Reset flags this)
- BuyCurious in ECOSYSTEM array
- "Sleeper bus for longer runs" — not yet acquired
- "House band" section — operational status unclear

**Fix:** Update meta. Remove BuyCurious. Gate unshipped claims.

### /magazine (bigmuddymagazine.com) — PASS

**Voice:** Clean editorial. Garden & Gun meets Kinfolk.
**Issue:** Missing MBT footer.

### /radio (bigmuddyradio.com) — PASS

**Voice:** Good. Fun, inviting.
**Issue:** Missing MBT footer.

### /records (bigmuddyrecords.com) — REWRITE

**Voice:** Good indie label tone.
**Issues:**
- Package pricing ($100/$250/$500) — Copy Reset Plan says remove
- BuyCurious in ecosystem and layout footer
- Missing MBT footer
- Hardcoded hex in layout

**New direction (per Copy Reset Plan):** Non-exclusive deals. Keep your masters. Promotion through catalog, radio, magazine. No tiered packages.

### /directory (deepsouthdirectory.com) — NEEDS WORK

**Voice:** Mostly good, but SaaS jargon creeping in.
**Issues:**
- **Claim ladder violation:** The Works ($49, opens Apr 21) and The Engine ($99, opens Apr 14) listed without date gates. As of April 1, only Entry and The Listing ($20) are sellable.
- SaaS jargon: "AI assistant", "analytics dashboard", "auto-publishing", "content calendar", "integrations"
- Hardcoded hex

**Fix:** Add "Opens April 14" / "Opens April 21" badges. Soften tech language.

### /bearsville (bearsvillemediagroup.com) — PASS

**Voice:** Good. Hudson Valley creative.
**Issue:** Footer says "powered by Hillbilly Dreams Inc" — should say MBT per Rule 10.

### /measurably-better (measurablybetter.life) — NEEDS WORK

**Voice:** Good. Swiss-clean authority.
**Architecture:** Correct — MBT as platform, Big Muddy as proof.
**Issue:** Footer says "Built by Hillbilly Dreams Inc" — needs MBT footer.

### /measurably-better/technology — NEEDS WORK

**Issues:**
- "~85ms latency", "120-180 tokens/sec" — these are Gemini specs, needs attribution
- "Agentic Engine" language — startup-y

### /measurably-better/life — PASS

Functional community dashboard. Hardcoded hex (backlog).

### /hillbilly (hillbillydreamsinc.com) — NEEDS WORK

**Voice:** Wrong. Should be Duncan Trussell energy. Reads like Google Cloud partner page.
**Issues:**
- Hardcoded font: `'Plus Jakarta Sans', system-ui` — **HARD FAIL**
- Hardcoded hex throughout
- "The AI That Runs Your Business" — bold claim
- "99.9% Platform Uptime SLA" — is this contracted?
- "Mechanized marketing pipeline" — jargon
- Missing MBT footer

### /economics (outsidereconomics.com) — PASS

**Voice:** Excellent. Best-written page. Sophisticated, field manual energy.
**Issue:** Missing MBT footer.

### /studioc (studiocvideo.com) — NEEDS WORK

**Voice:** Good. Production professional.
**Issues:**
- "Arri Aslin" misspelled 6 times (should be "Arrie")
- "Co-owner" claim for Arrie — verify
- Missing MBT footer

### /tuthill (tuthilldesign.com) — NEEDS WORK

**Voice:** Good.
**Issues:**
- BuyCurious Art in portfolio list
- "AI publishing engine" — jargon for design audience
- Missing MBT footer

---

## Action Items

### NOW (today)
1. Fix "Arri" → "Arrie" across all files
2. Replace "BuyCurious" → "Venture Gallery" across all files
3. Add claim ladder badges to DSD pricing tiers
4. Fix hardcoded font on /hillbilly

### THIS WEEK
5. Create shared PoweredByFooter component
6. Fix entertainment layout meta
7. Move hardcoded hex to CSS variables

### BACKLOG
8. /records full rewrite (remove package pricing)
9. /hillbilly voice overhaul
10. DSD jargon softening

---

## Fixed April 2, 2026

*Items from the original audit that have been resolved.*

### HARD FAILS Fixed
- ✅ "Arrie Aslin" spelling corrected across 25+ files (was "Arri Aslan" / "Ari Aslan")
- ✅ "BuyCurious Art" → "Venture Gallery" in 21 consumer-facing files
- ✅ Hardcoded font in `/hillbilly` (Plus Jakarta Sans → `var(--font-body)`)
- ✅ Claim ladder badge — The Engine ($99) shows "Coming April 14", The Works ($49) shows "Coming April 21"
- ✅ "Powered by MBT" footer added to shared Footer component (propagates to touring, magazine, radio, economics, studioc, tuthill), Bearsville, and records

### SOFT FAILS Fixed
- ✅ Entertainment layout meta: removed "Four divisions" language
- ✅ Bearsville footer: changed from "Hillbilly Dreams Inc" to "Measurably Better Things"
- ✅ Domain routes: buycurious now routes to `/gallery` (not `/measurably-better`)
- ✅ Admin form labels improved: "Slug" → "URL Path", "Markdown" → formatting hint, "JSON array" → plain English
- ✅ Admin form redirects: all 5 forms now redirect to `/admin/*` (were going to public pages)
- ✅ 11 API routes with hardcoded model names → `pickModel()`

### New Features Shipped (not in original audit)
- ✅ Musician directory onboarding at `/directory/onboard/musician` (PR #21)
- ✅ WiFi captive portal at `/welcome/wifi` (PR #19)
- ✅ Gallery redesign — Chase Pierson Photography, 45 prints (PR #18)
- ✅ Touring absorbed into Entertainment (bigmuddytouring.com shows Entertainment content)
- ✅ Touring headline: "Gateway to the heart of soul music"
- ✅ Records page rewrite with real artist roster
- ✅ Hillbilly Inc page rewrite
- ✅ Magazine Heritage Journal parallax redesign
- ✅ Bearsville studio pivot — "The Visual Side of Sound"
- ✅ Voice AI — Southern Concierge at measurablybetter.life/life
- ✅ Client photo delivery gallery (Brittany) with tip jar + print ordering
- ✅ Tracy Alderson Gallery infrastructure
- ✅ Regina Charboneau DSD listing + Magazine feature article
- ✅ 16,936 photos tagged via Vision API and indexed

### Still Open (Backlog)
- 41 "BuyCurious" references remaining in non-consumer code
- 416 hardcoded hex colors across pages
- `/records` pricing model needs alignment with new non-exclusive deal structure
- `/hillbilly` voice still reads corporate (should be Duncan Trussell energy)
- Enrichment pipeline waiting on API keys (SPOTIFY_CLIENT_ID, GOOGLE_PLACES_API_KEY)
