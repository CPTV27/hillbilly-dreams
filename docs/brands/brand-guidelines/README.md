# Brand Guidelines — The HDI / MBT / Big Muddy Family

**Created:** 2026-04-21
**Author:** Cos (Chief of Staff)
**Modeled on:** The Big Muddy Inn + Blues Room Brand Identity Guidelines by Rosemary Hallmark Creative, March 2023. Full PDF lives at `/Users/chasethis/Downloads/Big Muddy - Brand Guidelines.pdf` and is the exemplar every doc in this folder tracks against.

---

## What this folder is

One specification doc per brand, modeled after Rosemary Hallmark Creative's Big Muddy guideline PDF. Each doc is a **written spec a designer can execute** — not a finished visual PDF. The intent is:

1. Lock canonical positioning, palette, typography, and logo direction for each brand so agents and designers stop re-inventing.
2. Hand Tuthill Design + Rosemary (or whichever designer) a clean brief they can turn into a finished 18-page PDF per brand.
3. Keep every brand inside the family coherent — same structural template, same level of discipline — without flattening what makes each one distinct.

Every spec follows the same 11-section structure from the Big Muddy template:

1. Cover concept
2. Table of contents
3. Primary logo
4. Secondary logo
5. Brand colors (Pantone / Hex / CMYK / RGB)
6. Incorrect usage
7. Typography (display + subhead + body + accent)
8. Submark + brand marks
9. Patterns
10. Logo filetypes (web + print)
11. Application examples + designer contact

---

## The 8 brands in this folder

| File | Brand | Role in the ecosystem | Voice doc anchor |
|------|-------|------------------------|-------------------|
| [arrie-aslin-brand-guidelines-2026-04-21.md](./arrie-aslin-brand-guidelines-2026-04-21.md) | Arrie Aslin | Amy Allen's stage identity — artist in residence, Big Muddy Records, radio show host | New (see `docs/brands/arrie-aslin-brand-package-2026-04-20.md` when drafted) |
| [big-muddy-touring-brand-guidelines-2026-04-21.md](./big-muddy-touring-brand-guidelines-2026-04-21.md) | Big Muddy Touring | The entertainment engine. Books bands, moves bands, settles the shows. | `docs/voice/big-muddy-touring.md` |
| [big-muddy-radio-brand-guidelines-2026-04-21.md](./big-muddy-radio-brand-guidelines-2026-04-21.md) | Big Muddy Radio | Always-on audio layer. Curated corridor music + Arrie Aslin's show. | `docs/voice/big-muddy-radio.md` |
| [big-muddy-magazine-brand-guidelines-2026-04-21.md](./big-muddy-magazine-brand-guidelines-2026-04-21.md) | Big Muddy Magazine | Heritage journal that sells rooms at the Inn. Tracy is editor. | `docs/voice/big-muddy-magazine.md` |
| [chase-pierson-photography-brand-guidelines-2026-04-21.md](./chase-pierson-photography-brand-guidelines-2026-04-21.md) | Chase Pierson Photography | Premium editorial + documentary photography. Chase's personal brand. | `docs/voice/chase-pierson-photography.md` |
| [tuthill-design-brand-guidelines-2026-04-21.md](./tuthill-design-brand-guidelines-2026-04-21.md) | Tuthill Design | Miles's real estate media + design house. Northern-hemisphere anchor. | `docs/voice/tuthill-design.md` |
| [studio-c-brand-guidelines-2026-04-21.md](./studio-c-brand-guidelines-2026-04-21.md) | Studio C | Elijah's production arm of Tuthill. Broadcast, events, MBT production. | `docs/voice/studio-c.md` |
| [utopia-brand-guidelines-2026-04-21.md](./utopia-brand-guidelines-2026-04-21.md) | Utopia | The recording studio at Bearsville. Todd Rundgren's legacy room Chase photographs. | New (Bearsville studio lineage) |

## The existing Big Muddy Inn + Blues Room guideline

That PDF is canonical for the Inn. We are **not** rewriting it. Its palette (Cloud Dancer cream, the indigo family 6094C/6098C/2119C/5265C, the magenta family 680C/682C/683C/426C) and typography (Nathan script, Citrus Gothic headline, Abril Fatface subhead, Montserrat body) anchor the visual family that Big Muddy Touring, Radio, and Magazine all orbit around. The corridor brands inherit from it and extend, not replace.

---

## Brand family relationship map

```
                    THE BIG MUDDY
                    (Inn + Blues Room — Rosemary's guideline, the anchor)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
  BIG MUDDY         BIG MUDDY         BIG MUDDY
   TOURING            RADIO            MAGAZINE
  (the road)       (the air)        (the page)
        │                │                │
        └────────── ARRIE ASLIN ─────────┘
                 (the artist — Amy Allen;
                  lives inside all three)

MBT platform (invisible infrastructure) — no public guideline; not a brand the audience sees

CHASE PIERSON PHOTOGRAPHY — the photographer who made all the Big Muddy imagery; a parallel personal brand

TUTHILL DESIGN ───── STUDIO C ───── UTOPIA
(RE media house)   (production arm)  (recording studio client)
  Northern-hemisphere partner brands; Miles + Elijah operate these.
```

---

## Usage rules (shared across every brand in this folder)

1. **Canonical spellings are enforced.** Arrie Aslin (not Ari, not Arri, not Aslan). The Big Muddy Inn and Blues Room (not just "the Inn" in external copy). Tuthill Design (not Tuthill Designs). Studio C (not Studio-C or StudioC). These rules come from `CLAUDE.md` and override any variant you find in older drafts.
2. **Bitwarden is the source of truth for every brand asset URL, font license, and stock image subscription.** Before creating any new licensed asset, check Bitwarden. After creating, put it in Bitwarden.
3. **Real photography only — no AI-generated humans.** Every photo on every brand page must resolve to a URL containing `/approved/` so we know it came from Chase's library.
4. **Tokens over hardcoded values.** When these specs move into the codebase, every color becomes a CSS custom property (`var(--brand-*)`), every font becomes `var(--font-*)`. The hex codes in the specs are for print and for designers; the web layer references tokens.
5. **The Rosemary Hallmark Creative designer credit belongs on the Big Muddy Inn guideline only.** Every other brand in this folder lists the *intended* designer credit (Tuthill Design, Rosemary if re-engaged, etc.) on its application-examples page. Do not attribute work to a designer who hasn't done it.

---

## How to execute these into finished visual guideline PDFs

1. Pick a brand.
2. Read the spec end to end.
3. Pull the voice doc from `docs/voice/` for tone context.
4. Pull photography from `gs://bmt-media-bigmuddy/approved/` matching the brand.
5. Open the Rosemary Hallmark PDF side by side for layout reference.
6. Execute in InDesign or Figma. 8.5" × 11" landscape (matching Rosemary's format), ~18 pages per brand.
7. Export final PDF + .indd/.fig source files. Store in `gs://bmt-media-bigmuddy/brand-guidelines/<brand>/` with the spec `.md` file alongside.
8. Update the relevant Sanity `brand` document so the website uses the same palette + typography tokens.

---

## Open questions for Chase to answer before execution

1. **Who executes the PDFs?** Options: re-engage Rosemary Hallmark Creative (she owns the family look already), hand to Tuthill Design (Miles), or AI-assisted in Canva / Figma then human polish. My recommendation: re-engage Rosemary for 3 of the 4 Big Muddy family brands (Touring, Radio, Magazine) since they're extensions of her existing work; Tuthill Design handles its own guideline + Studio C's + Chase Pierson Photography; Utopia is a client-facing piece Chase produces himself because he's making the book.
2. **Budget?** Rosemary's fee for the original Big Muddy guideline is not in Bitwarden as a line item. Re-engagement quote needed.
3. **Final domain choice for Arrie Aslin** — arrieaslin.com (recommended) or arrieaslinmusic.com. Affects the guideline's contact/URL page.
4. **Logo files** for brands that don't have them yet (Big Muddy Touring, Big Muddy Radio, Big Muddy Magazine, Chase Pierson Photography, Tuthill Design wordmark, Studio C wordmark, Utopia wordmark, Arrie Aslin wordmark). The specs describe direction; designer produces the actual marks.

---

*End of folder README.*
