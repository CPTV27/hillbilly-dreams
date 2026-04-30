# `/the-case/` Photo Swap Proposal — 2026-04-30

> **Page:** `apps/web/public/the-case/index.html` (565 lines, static HTML, single-column 720px-max editorial layout, full-bleed `figure.full` images that overflow ±80px on desktop)
> **Current state:** 3 inline `figure.full` blocks, all using AI renderings under `/big-muddy-acres/renderings/`
> **Operating principle (Chase, 2026-04-30):** "Use real photos whenever we can — even gratuitously." AI renderings ONLY for things that don't yet exist (the Pull Barn, future tiny homes, van wrap mockups).
> **Photo policy:** every customer-facing image URL must contain `/approved/` to confirm real Chase photo, not AI.

This proposal is **proposal-only** — Cos applies the changes after Chase signs off. No HTML is edited in this pass.

---

## Asset URL convention

All approved photos are served from `https://storage.googleapis.com/bmt-media-bigmuddy/approved/...`. For inline use in the static HTML, the URLs are absolute (the static page can hit GCS directly — no Next image proxy in this file). Use the `-grid.webp` variant (~1067–1600px wide) for inline editorial; the `figure.full` block bleeds to about 880px max on desktop, so the grid width is the right size with no upscaling and no oversized payload.

Asset URL template: `https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/{city}/{shoot}/{hash}-grid.webp`

---

## Section walk + decisions

The page has 12 headed sections. Below each section: what's there now, what changes, and the specific image URL + caption + alt text to use.

### Section 1 — Headline + dek + opening drop-cap paragraph (lines 362–374)

**Currently:** No image. Pure typography opener.

**Proposal — INSERT (gratuitously):** Add a single full-bleed hero **above the headline** to set tone. The page reads as a New Yorker-style essay; an editorial photo opener earns its keep here.

| Slot | Asset | Caption |
|---|---|---|
| Hero, above `<h1>` | `https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/save-the-hall-ball/f3ce526c5d86-grid.webp` | *"A small operating company in Natchez, Mississippi. Adams County, late spring."* — attribution: `Photograph · Chase Pierson` |

**Why this image:** trio playing on a candlelit antebellum veranda at twilight, lamppost glow halo, deep shadow — establishes Natchez, music, and after-dark atmosphere in one frame. Reads "we operate here" instead of "we render here." Vertical composition slimmer than the renderings — works as a tall hero.

**Alternative if we want horizontal:** `bdd5fdf79ed9-grid.webp` (doorway entry, columns + vines + guests being received).

---

### Section 2 — "What Studio C is" intro paragraphs (lines 379–386)

**Currently:** No image between intro and first existing figure. Three text paragraphs about three layers / two meters.

**Proposal — INSERT (gratuitously):** Drop a side-by-side or single editorial still here that anchors "the team behind the chat." Use the only real founder portrait we have.

| Slot | Asset | Caption |
|---|---|---|
| After paragraph 3 ("…at the bottom of every conversation…"), before the divider | `https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/save-the-hall-ball/03284582b241-grid.webp` | *"Chase Pierson, founder, with two members of the operations team during a March benefit at a Natchez estate. Studio C is the company underneath the chat."* — attribution: `Photograph · Chase Pierson Photography` |

**Why this image:** the only real founder shot in the entire `/approved/` bucket. Roast pig + golden hour + oak trees + three real people — instantly answers "who is Studio C" with a face, not a logo or a render. Hospitality-coded, on-brand, on-place.

---

### Section 3 — Existing figure: the Pull Barn interior (lines 389–392)

**Currently:**
```html
<figure class="full">
  <img src="/big-muddy-acres/renderings/bma-pull-barn-interior-mixing-03.png" alt="..." />
  <figcaption>The Studio C control room at the center of the property the company is building outside Natchez...
    <span class="attribution">Architectural rendering · Studio C</span></figcaption>
</figure>
```

**Decision: KEEP.**

**Why:** the Pull Barn does not exist yet. The building is the headline of `/big-muddy-acres/`, the parcel is being optioned, and Phase 1 construction is still ahead. An architectural rendering is the right asset here, and the existing caption already discloses it as a rendering. Real interior photo will exist in 6–18 months and can swap in then.

---

### Section 4 — "Why this matters now" / Inverted Intelligence (lines 394–402)

**Currently:** Three text paragraphs, then a pullquote ("Software is cheap. Humans are the premium…"). No image.

**Proposal — INSERT (gratuitously):** A graphic editorial still that pairs visually with the Inverted Intelligence thesis. The pullquote can sit either above or below the image; either works.

| Slot | Asset | Caption |
|---|---|---|
| Either right before the pullquote (line 402) or right after | `https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/save-the-hall-ball/01cdce632e02-grid.webp` | *"The ledger is the thing. An antique terrestrial globe + tapers + silver service at a Natchez benefit, March 2026."* — attribution: `Photograph · Chase Pierson Photography` |

**Why this image:** B&W antique desk-globe + candles + silver bowl. Reads "operating ledger" / "old measurement instruments" — a quiet visual rhyme with the thesis that this company prices things honestly the old-fashioned way (humans premium, software cheap, both visible on the meter). Doesn't compete with the pullquote, supports it.

**Alternative if we want a more graphic / less literal still:** `1ac47cdd4256-grid.webp` (B&W column + cascading vine on a checkered floor — abstract, architectural).

---

### Section 5 — "The product, in motion" (lines 406–414)

**Currently:** Four narrative paragraphs about the bed-and-breakfast scenario. No image. The voice gets specific here ("a bed-and-breakfast with eight rooms, or a venue with a kitchen").

**Proposal — INSERT (gratuitously):** A real Mississippi small-business storefront — exactly the customer the page is describing. This is the strongest possible "Main Street, not Silicon Valley" anchor in the whole bucket.

| Slot | Asset | Caption |
|---|---|---|
| After paragraph 1 ("…it's ready.") and before paragraph 2 | `https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/liberty-ms/untitled-75-of-97-dxo_deepprime-3jpg/b99631060954-grid.webp` *(Lady V's Fashion Boutique & Things, Liberty MS)* | *"The customer Studio C is built around: an eight-room inn, a side-street boutique, a venue with a kitchen. Lady V's, Liberty, Mississippi — March 2026."* — attribution: `Photograph · Chase Pierson Photography` |

**Why this image:** real Mississippi small-business storefront, daylit, vacant sidewalk. The exact mental picture the paragraph above is painting. Far more honest than any rendering could be.

**Alternative — if we want richer color and more "place identity":** `5c40cd3613c2-grid.webp` (Liberty Drug Store hero — "Serving Amite County Since 1903", blue + red mural, Rexall sign).

---

### Section 6 — "What it costs" / pricing table (lines 418–478)

**Currently:** Tier table + paragraphs. No image. Heavy-text section.

**Proposal — INSERT (gratuitously):** A single graphic still between the table and the "Two structural discounts" subhead to give the eye a rest before the next text block.

| Slot | Asset | Caption |
|---|---|---|
| After the price-table closing `</table>`, between the "five times that and gives you both" paragraph and the `<h3 class="kicker">Two structural discounts</h3>` | `https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/silver-street-antiques-business-listing-exterior-only/bb58b4fcc34a-grid.webp` *(hand-painted "Fine Gifts / Jewelry / China / Souvenirs" sign on brick)* | *"Pricing the way it should have been priced from the start. Hand-painted sign, Silver Street, Natchez Under-the-Hill."* — attribution: `Photograph · Chase Pierson Photography` |

**Why this image:** a literal hand-painted price-list sign carries the metaphor and the page's pricing-honesty argument without being heavy-handed about it. Vertical, fits the column elegantly, breaks up a 1500-word heavy-text section.

---

### Section 7 — "Who Studio C is" / team (lines 482–488)

**Currently:** Three narrative paragraphs naming Chase, Tracy, Amy, Elijah, Miles. No image.

**Proposal — INSERT (gratuitously):** A live-music + small-team-on-stage frame to anchor "the team is small by design" and to give a face to the work. Per CLAUDE.md, JP can't be named on public-facing pages until his deal finalizes — but the live-music image isn't a portrait, so we're safe from naming issues.

| Slot | Asset | Caption |
|---|---|---|
| After the closing paragraph ("…operations team is the moat.") | `https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/save-the-hall-ball/fbbf195cbfc2-grid.webp` *(three vocalists on stage, mirrored back, gold satin)* | *"The team is small by design. Most of what would be a forty-person operations department is handled by the chat — and by the people in the room when something needs to be done."* — attribution: `Photograph · Chase Pierson Photography` |

**Why this image:** three vocalists on a small stage, working — visual analogue for the small-by-design team thesis. Editorial-grade, on-brand for the Big Muddy ecosystem the page is talking about. Replaces what could otherwise have been a generic team-photo placeholder.

---

### Section 8 — Existing figure: the Pull Barn exterior (lines 498–501)

**Currently:**
```html
<figure class="full">
  <img src="/big-muddy-acres/renderings/bma-pull-barn-exterior-wide-01.png" alt="..." />
  <figcaption>Big Muddy Acres, Adams County, Mississippi...
    <span class="attribution">Architectural rendering · Big Muddy</span></figcaption>
</figure>
```

**Decision: KEEP.**

**Why:** same as the interior — the Pull Barn exterior does not exist yet. The page caption already says "Architectural rendering" — that disclosure is honest and works. Replace when the building is built.

---

### Section 9 — "The proof — Big Muddy" supporting text (lines 494–503)

**Currently:** Three paragraphs around the Pull Barn exterior figure. The first paragraph names the operating businesses ("an inn on the river bluff in Natchez, a touring booking company, a quarterly magazine, a small record label, a streaming radio station, and a working photography practice"). No image accompanying that list.

**Proposal — INSERT (gratuitously):** A real Natchez-riverfront ID frame near that paragraph, since the page is naming the inn "on the river bluff in Natchez" and we have approved photos of that exact stretch (Silver Street Under-the-Hill is the riverfront — bridge in the background = unmistakable Natchez ID).

| Slot | Asset | Caption |
|---|---|---|
| Right before the "The mid-scenario forecast for the twelve months ending April 2027…" sentence (mid-paragraph 1, line 494) — OR break the paragraph and insert between paragraph 1 and the existing Pull Barn figure | `https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/silver-street-antiques-business-listing-exterior-only/fba4491546f5-grid.webp` *(Silver Street + Mississippi state flag + green motorcycle + Natchez bridge in distance + "Chicks Rule" black helmet in foreground)* | *"Silver Street, Natchez Under-the-Hill, looking south. The Natchez-Vidalia bridge crosses the Mississippi to Louisiana in the background. The inn is one block up from this sidewalk."* — attribution: `Photograph · Chase Pierson Photography` |

**Why this image:** instant Natchez identification (the bridge), Mississippi flag overhead, real sidewalk + real motorcycle + real rider's helmet — all the storytelling weight of "this is a real place we operate in" in a single frame. Far stronger than the Pull Barn rendering at carrying "this is Big Muddy."

---

### Section 10 — "The proof — Scan2Plan" (lines 507–513)

**Currently:** Three text paragraphs. No image.

**Proposal — SKIP image insertion.** Scan2Plan is a vertical deployment we don't have approved imagery for. Better to leave the section text-only than reach for a tangential photo. Flag this as a gap to a future Scan2Plan-specific shoot.

---

### Section 11 — "The unlock — Chicken Burke" (lines 517–523)

**Currently:** Three text paragraphs. No image.

**Proposal — SKIP image insertion** (with caveat). Chicken Burke is a named real person who has not yet signed; per CLAUDE.md ("JP's deal is not finalized — do not name him on public-facing pages") logic, also be cautious about visualizing a deal that has not closed. The page already names him in body text — adding a photo would over-commit. **If** the curation pass turns up a usable Chicken Burke / studio session photo in `/approved/` later, that becomes the obvious slot.

If we want a non-portrait moment here, the only candidate is `8bc188921450-grid.webp` (bokeh band on stage with mixing-laptop in foreground — reads "studio session"), captioned generically as a Big Muddy session. **Default: leave text-only.**

---

### Section 12 — "What ships next" / pilot rollout (lines 527–533)

**Currently:** Three text paragraphs. No image.

**Proposal — INSERT (gratuitously):** A Liberty MS Main Street wide that visualizes "the corridor towns Studio C is being put in front of."

| Slot | Asset | Caption |
|---|---|---|
| After paragraph 1 ("…not large enough to hire a full-time ops person and not small enough to make do with a free chatbot.") | `https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/liberty-ms/untitled-87-of-97-dxo_deepprime-3jpg/b6822f6ab469-grid.webp` *(Barber Shop + Sign Here + Auto Parts + water tower wide)* | *"The pilot opens in the corridor towns: working operators, real budgets, no Silicon Valley overhead. Liberty, Mississippi, looking east toward the water tower — March 2026."* — attribution: `Photograph · Chase Pierson Photography` |

**Why this image:** literal Main Street commercial strip — the customer the page is describing. The water tower in frame doubles as a small-town visual signature. Cool desaturated treatment matches the editorial palette of the page.

---

### Section 13 — Existing figure: the porch vista (lines 537–540)

**Currently:**
```html
<figure class="full">
  <img src="/big-muddy-acres/renderings/bma-property-vista-porch-06.png" alt="..." />
  <figcaption>The view from the south porch at the end of a working day...
    <span class="attribution">Architectural rendering · Big Muddy</span></figcaption>
</figure>
```

**Decision: SWAP TO REAL PHOTO.**

**Why swap:** the rendering is captioned "the view from the south porch at the end of a working day" of a property that does not yet exist. The closing image of the page should land emotionally — a real photograph of an end-of-working-day Mississippi scene will land harder than a rendering of a future porch. The page's emotional close deserves a real moment.

| Replace with | Caption |
|---|---|
| `https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/liberty-ms/untitled-88-of-97-dxo_deepprime-3jpg/05a0f56a117f-grid.webp` *(Liberty Cleaners corrugated-metal facade, golden afternoon light)* | *"End of a working day. The product Studio C sells is the chat. The product Studio C has built around the chat is everything else."* — attribution: `Photograph · Chase Pierson Photography` |

**Why this image:** stunning low-angle golden hour against a corrugated-metal small-town storefront — patient, painterly, no people, lets the page exhale. Carries the same emotional beat the rendering tried to (quiet, end-of-day, real place) but does so with a real photograph of a real place.

**Alternative if we want something more atmospheric** (twilight, with a person in frame): `f3ce526c5d86-grid.webp` (trio + candlelit veranda). But that's already the proposed opening hero in Section 1, and reusing it as the closer would be heavy-handed.

---

## Summary table

| # | Section | Action | Asset hash | Asset summary |
|---|---|---|---|---|
| 1 | Above headline | INSERT | `f3ce526c5d86` | Trio + candlelit Natchez veranda at twilight |
| 2 | After "What Studio C is" intro | INSERT | `03284582b241` | Chase + roast pig + two attendees, golden hour |
| 3 | Pull Barn interior | **KEEP rendering** | — | Building doesn't exist yet |
| 4 | Before/after Inverted Intelligence pullquote | INSERT | `01cdce632e02` | B&W globe + tapers + silver — "the ledger" |
| 5 | "Product in motion" mid-section | INSERT | `b99631060954` | Lady V's Fashion Boutique, Liberty MS |
| 6 | After pricing table, before discounts subhead | INSERT | `bb58b4fcc34a` | "Fine Gifts / Jewelry / China / Souvenirs" hand-painted sign |
| 7 | After "Who Studio C is" closing paragraph | INSERT | `fbbf195cbfc2` | Three vocalists on stage, gold satin back |
| 8 | Pull Barn exterior | **KEEP rendering** | — | Building doesn't exist yet |
| 9 | Mid "The proof — Big Muddy" | INSERT | `fba4491546f5` | Silver Street + Mississippi flag + bike + Natchez bridge |
| 10 | "The proof — Scan2Plan" | SKIP | — | Gap; no approved Scan2Plan imagery |
| 11 | "The unlock — Chicken Burke" | SKIP | — | Deal not closed; defer until photographed |
| 12 | After "What ships next" intro | INSERT | `b6822f6ab469` | Barber Shop + Sign Here + water tower, Liberty MS |
| 13 | Closing porch vista | **SWAP rendering → real photo** | `05a0f56a117f` | Liberty Cleaners + corrugated metal + golden hour |

**Total:** 2 KEEPs (renderings of unbuilt buildings), 1 SWAP (closing image), 8 INSERTs (gratuitous-but-earned), 2 SKIPs (gaps to fill in future shoots).

Final image count on `/the-case/`: from **3 figures** (all renderings) → **11 figures** (2 renderings of unbuilt structures, 9 real Chase photographs). Roughly one editorial moment per major section, paced about every 2–3 paragraphs of body text. Matches the New Yorker / Atavist pacing the page is already after.

---

## Implementation notes for Cos

1. The page is static HTML. Edit `apps/web/public/the-case/index.html` directly.
2. Use the absolute GCS URL — `https://storage.googleapis.com/bmt-media-bigmuddy/approved/...{hash}-grid.webp` — for every new `<img src>`. Do not use the `/big-muddy-acres/renderings/` path for any of the inserts; that path is for renderings only.
3. Wrap each insert in the existing `<figure class="full">` pattern with `<figcaption>` and the `<span class="attribution">Photograph · Chase Pierson Photography</span>` span. Match the styling and bleed already in use; do not introduce new CSS classes.
4. Keep the existing image alt-text style (descriptive, not promotional) — write a fresh alt for each swap/insert based on the proposed caption.
5. **Verify after change:** open `/the-case/` locally, scroll the entire page, confirm every image loads (no 404s from GCS), confirm the captions read in the page's voice, and confirm `figure.full` desktop-bleed (-80px margin) still works at 1280px+ widths.
6. For the SWAP at section 13, do not delete the rendering file from disk — that file is referenced from `/big-muddy-acres/`; only change the `<img src>` and the `<figcaption>` attribution line.

---

## Sequencing recommendation — what page to swap second

**Recommendation: `/big-muddy-acres/` is the right second page.** Reasoning:

- It has the densest concentration of AI renderings on the site (the renderings live in `/big-muddy-acres/renderings/` and are referenced from there).
- Most of those renderings are correctly visualizing the unbuilt Pull Barn / RV pads / tiny houses, so most should KEEP — but the page also uses generic "property vista" and "porch view" renderings where a real Liberty MS Main Street, Natchez riverfront, or Save the Hall Ball still would land harder. Same swap pattern as `/the-case/`.
- After `/the-case/` runs as the swap pattern reference, `/big-muddy-acres/` is the obvious next deployment of that pattern.

Other candidates considered:
- **`/dispatch/` / Dispatch 01** — the Dispatch landing pages use cover/mid imagery (`dispatch-01-cover.png`, `dispatch-01-mid.png`); worth a separate audit. Lower priority because Dispatch is an editorial product with its own art-direction discipline; swapping wholesale could undercut the magazine voice. Defer until a Dispatch-specific curation pass.
- **`/big-muddy-magazine/`** — likely uses a mix of real and AI imagery; depends on what's currently shipping. Audit before swapping.
- **`/the-inn/` or `/big-muddy-inn/`** — would normally be the obvious priority, but **the bucket has zero approved Inn photos** (see gap report in companion inventory). New shoot needed before swap is possible. Schedule a one-day Inn shoot, then this page becomes the third swap.

**Sequence:** `/the-case/` (now) → `/big-muddy-acres/` (next, same swap pattern) → Inn shoot day → `/the-inn/` swap.

---

*Proposal authored by Gallery Director agent, 2026-04-30. No HTML modified; awaiting Chase approval before Cos applies.*
