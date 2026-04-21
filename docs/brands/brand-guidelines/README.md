# Brand Guidelines — The HDI / MBT / Big Muddy Family

**Created:** 2026-04-21
**Author:** Cos (Chief of Staff)
**Modeled on:** The Big Muddy Inn + Blues Room Brand Identity Guidelines by Rosemary Hallmark Creative, March 2023. Full PDF lives at `/Users/chasethis/Downloads/Big Muddy - Brand Guidelines.pdf` and is the exemplar every doc in this folder tracks against.

---

## What this folder is

One specification doc per brand, modeled after Rosemary Hallmark Creative's Big Muddy guideline PDF. Each doc is a **written spec we execute ourselves** — not a finished visual PDF (yet). The intent is:

1. Lock canonical positioning, palette, typography, and logo direction for each brand so agents and designers stop re-inventing.
2. Give **Chase + the HDI team** a clean brief each brand's visual execution tracks against — built in Canva, Figma, or Illustrator in-house, not outsourced.
3. Keep every brand inside the family coherent — same structural template, same level of discipline — without flattening what makes each one distinct.

**Designer: we are.** Chase has the visual eye (he's a working photographer, he's been running the visual direction for every HDI property since day one, he has Canva Team + Figma access, and he's the person whose taste the family tracks to). Rosemary Hallmark Creative's existing Big Muddy Inn guideline is the structural exemplar we copy — not a retainer we re-engage. Tuthill Design (Elijah) and Studio C (Miles) consult when their own brands come up, but the execution is in-house.

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
| [tuthill-design-brand-guidelines-2026-04-21.md](./tuthill-design-brand-guidelines-2026-04-21.md) | Tuthill Design | Elijah's real estate media + design house. Northern-hemisphere anchor. | `docs/voice/tuthill-design.md` |
| [studio-c-brand-guidelines-2026-04-21.md](./studio-c-brand-guidelines-2026-04-21.md) | Studio C | Miles's production arm of Tuthill. Broadcast, events, MBT production. | `docs/voice/studio-c.md` |
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
  Northern-hemisphere partner brands; Elijah + Miles operate these.
```

---

## Usage rules (shared across every brand in this folder)

1. **Canonical spellings are enforced.** Arrie Aslin (not Ari, not Arri, not Aslan). The Big Muddy Inn and Blues Room (not just "the Inn" in external copy). Tuthill Design (not Tuthill Designs). Studio C (not Studio-C or StudioC). These rules come from `CLAUDE.md` and override any variant you find in older drafts.
2. **Bitwarden is the source of truth for every brand asset URL, font license, and stock image subscription.** Before creating any new licensed asset, check Bitwarden. After creating, put it in Bitwarden.
3. **Real photography only — no AI-generated humans.** Every photo on every brand page must resolve to a URL containing `/approved/` so we know it came from Chase's library.
4. **Tokens over hardcoded values.** When these specs move into the codebase, every color becomes a CSS custom property (`var(--brand-*)`), every font becomes `var(--font-*)`. The hex codes in the specs are for print and for designers; the web layer references tokens.
5. **The Rosemary Hallmark Creative designer credit belongs on the Big Muddy Inn guideline only.** Every other brand in this folder lists the *intended* designer credit (Tuthill Design, Rosemary if re-engaged, etc.) on its application-examples page. Do not attribute work to a designer who hasn't done it.

---

## How to execute these ourselves

Per-brand process, walkable in a single work session each:

1. **Pick one brand.** Don't try to do all eight at once — you'll blur them.
2. **Read the spec end to end** and the matching voice doc in `docs/voice/`.
3. **Pull reference photography** from `gs://bmt-media-bigmuddy/approved/` (must have `/approved/` in the URL — that's the "real Chase photo" guarantee from CLAUDE.md).
4. **Open the Rosemary Hallmark PDF** (`/Users/chasethis/Downloads/Big Muddy - Brand Guidelines.pdf`) side by side. It's the structural reference — match its layout rhythm even where colors and type differ.
5. **Build the logo first in Figma** (or Illustrator). Lock the wordmark, monogram, and primary mark before touching the guideline PDF — everything downstream references these files.
6. **Assemble the guideline PDF in Canva** (Canva Team subscription is already paid — per `docs/ecosystem-subscriptions-2026-04-20.md`). Use the Rosemary PDF as a template: 8.5" × 11" landscape, ~18 pages per brand. Canva handles typography, exporting, versioning, and brand-kit color locking.
7. **Export final PDF + source files.** Store in `gs://bmt-media-bigmuddy/brand-guidelines/<brand>/` with the spec `.md` alongside. Canva keeps its own source; export an editable `.canva` share link into Bitwarden as the backup.
8. **Update the Sanity `brand` document** so the relevant website uses the same palette + typography tokens — the specs reference CSS custom properties that the Next.js app already supports (`var(--brand-*)`, `var(--font-*)`).

## Tooling

| Task | Tool | Why |
|------|------|-----|
| Logo marks (wordmarks, monograms) | **Figma** (free for Chase) | Vector, shareable URL, easy iteration. Illustrator is fine if preferred. |
| Guideline PDF layout | **Canva Team** (already paid) | 18-page template fits Canva's document format; brand kits lock colors; export to print-quality PDF |
| Moodboards / palette exploration | **Figma + Pinterest** | Fastest iteration; no cost |
| AI-assisted logo concepts | **Claude + Midjourney / Vertex Imagen** (HDI has credit) | Use for *direction only* — final marks are vector-drawn by hand, not AI-generated |
| Photography | **Chase's own library** (`gs://bmt-media-bigmuddy/approved/`) | No stock, no AI humans, per CLAUDE.md |
| Font licensing | **Google Fonts** (free) first, paid only where Google doesn't cover | See substitution table below |
| Version control | **This repo** (`docs/brands/brand-guidelines/`) for specs; **GCS** for visual source files | Markdown is the canonical brief; PDFs and source files are artifacts |

## Free-font substitution table (Google Fonts — all free, all web-licensed)

The specs name some paid typefaces (Nathan, Citrus Gothic, Graphik, Söhne, Canela, GT America, Input Mono) because they match the Rosemary PDF lineage. For DIY execution, use these free Google Fonts substitutions — they're close enough to hold the family look without the licensing bill:

| Spec'd typeface | Role | Free Google Fonts substitute |
|---|---|---|
| **Nathan** (script) | Big Muddy family wordmark accent | **Yellowtail** (warm), **Sacramento** (thin), or **Allura** (formal) |
| **Citrus Gothic** (condensed sans) | Big Muddy headline | **Oswald Bold** or **Barlow Condensed Black** |
| **Abril Fatface** | Magazine masthead + drop caps | **Abril Fatface** (already Google Fonts, free) |
| **Montserrat** | Body across Big Muddy family | **Montserrat** (already Google Fonts, free) |
| **GT America** / **Söhne** | CPP + Utopia body | **Inter** (the closest free analog, used everywhere) |
| **GT America Mono** / **Söhne Mono** / **Input Mono** | CPP + Studio C + Utopia technical | **JetBrains Mono** or **IBM Plex Mono** |
| **Söhne Breit** | Studio C display | **Bricolage Grotesque** or **Inter Display** |
| **Graphik** | Tuthill Design whole system | **Inter** or **Manrope** |
| **Canela** | Utopia + editorial serifs | **Playfair Display** or **Cormorant Garamond** |
| **Butler** | Utopia alt | **Playfair Display** |

Web layer already uses Google Fonts via `next/font` per the existing stack, so this substitution also aligns the brand-guideline PDFs with what actually renders on the sites. No font drift between print and web.

---

## Execution roadmap — which brand first, and why

Not all eight brands are equal in urgency. Sequenced by what's blocking revenue or the 90-day plan:

| Order | Brand | Why this one next | Time estimate |
|---|---|---|---|
| **1** | **Big Muddy Touring** | The Sprinter van wrap is queued and the road asset is the most visible public-facing brand moment of Q2. Simplest lockup (Asphalt Black + Highway Sodium + BMT monogram). Do this first. | 1 focused work day |
| **2** | **Arrie Aslin** | Blocking Amy's website (`arrieaslin.com`), any Big Muddy Records release artwork, and her radio-show podcast cover art. Borrows heavily from the existing Inn palette so it moves fast. | 1 day |
| **3** | **Big Muddy Radio** | Needed for the player redesign at `bigmuddyradio.com`, podcast cover art for Arrie's show, and the station swag. Paired with Phase 4 of the AzuraCast runbook. | 1 day |
| **4** | **Big Muddy Magazine** | Tracy is editor; the brand needs to exist before Issue 1 ships. Inherits the entire Inn palette so execution is largely masthead + layout decisions, not new color work. | 1.5 days |
| **5** | **Chase Pierson Photography** | Already has de-facto execution on `chasepierson.tv`. This is a **cleanup pass** more than a new build — lock the minimal wordmark + align existing site to the spec. | 0.5 day |
| **6** | **Studio C** | Miles's brand. Execute *with* Miles, not for him. Can wait until he's set up in NY and active in the production pipeline. | 1 day (with Miles) |
| **7** | **Tuthill Design** | Elijah's brand. Execute *with* Elijah. He may already have his own visual direction; we align to what he has, we don't impose. | 1 day (with Elijah) |
| **8** | **Utopia** | Tied to the Chase Pierson Studios book project, which is months out. Not on the critical path. | 1 day (when book approaches) |

**Total DIY effort across all 8:** ~8–10 focused work days spread over 6–8 weeks. That's 2 days of brand work per working week, leaving the rest of each week for revenue, ops, and the 90-day plan.

---

## Open questions (now scoped to DIY reality)

1. **Logo files** for brands that don't have them yet. Chase draws them in Figma as the first step of each brand's sprint. Wordmarks are low-complexity (type-setting + tracking); monograms need one round of sketch iteration; signet/badge marks like Studio C's `C` or Big Muddy Radio's Tower need 2–3 rounds.
2. **Final domain choice for Arrie Aslin** — `arrieaslin.com` availability check still pending. Do this before the Arrie Aslin sprint starts.
3. **Canva Team brand kits** — set up one brand kit per brand inside Canva Team so colors and fonts lock per document. Takes ~10 minutes per brand at the top of its sprint.
4. **Nathan font license.** The original Rosemary guideline uses Nathan for the `Big Muddy` script wordmark. If we're keeping the Inn's existing wordmark (we should — it's already in print on signage), we either (a) use Yellowtail as a free substitute for all *new* Big Muddy family script and live with the slight mismatch, or (b) buy a one-time Nathan desktop license (~$40–80 from the foundry) once and reuse across Touring, Radio, Magazine, Arrie Aslin. Recommend (b) — the license is cheap and family coherence is worth it.

---

*End of folder README.*
