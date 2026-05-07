# Arrie Aslin — Direction Lock + Pause (2026-05-06)

**Status:** Paused. Not in active build.
**Next milestone trigger:** Lineup, repertoire, and one ensemble photo session — see "Resume conditions" below.

---

## What changed

On 2026-05-06 the Arrie Aslin direction shifted in two material ways:

1. **Arrie Aslin is now a band, not a stage name.** Previously framed as Amy Allen's solo identity. Now it's the band name; lineup TBD. Photography must show the ensemble experience, not a single performer.
2. **Genre + geography reframed.** Previously: Southern soul-blues, Natchez residency, Big Muddy Records. New direction: country, Arkansas roots ("Arkansas by Blood"), comeback narrative. Whether the Natchez Blues Room residency, Big Muddy Radio show, and Big Muddy Records label survive the reframe is **TBD**.

This invalidates everything in PR #166 (the brand package, the multi-tenant config, the website, and the visual treatment) and largely invalidates the April 21 visual spec at `docs/brands/brand-guidelines/arrie-aslin-brand-guidelines-2026-04-21.md`.

---

## Locked direction (per the 2026-05-06 reference image)

The image Chase shared is the brand artifact we are designing toward when work resumes.

### Wordmark + marks

- **Primary wordmark:** "ARRIE / ASLIN" — two-line lockup, condensed display serif (looks like a Bodoni/Didone variant — placeholder candidates: **Bodoni Moda**, **Playfair Display Black**, **Abril Fatface compressed**). Cream on black. Generous letter-spacing. Slight grit/texture in the strokes.
- **Underline + tagline:** thin rust-orange horizontal rule with `ARKANSAS BY BLOOD` set in tight small-caps below it.
- **Secondary wordmark:** same style, slightly tighter, with `ARKANSAS BY BLOOD` under in rust.
- **Signature mark:** "Arrie Aslin" handwritten signature (single line, stylized).
- **Monogram:** "AA" — two condensed-serif capitals overlapping, slight overlap at the diagonal of the second A.
- **Simple lockup:** `ARRIE ASLIN` set on a single line in tracked small caps with a small star centered between two horizontal rules, `ARKANSAS BY BLOOD` underneath.

### Strapline / category labels

- `COUNTRY MUSIC · ARKANSAS ROOTS · A COMEBACK WORTH THE WAIT`

### Palette (extracted from reference image)

| Role | Name (working) | Hex (approx — confirm from final assets) |
|---|---|---|
| Primary dark | **Field Black** | `#0B0B0B` |
| Primary light | **Bone** | `#EFE6D2` |
| Accent | **Arkansas Rust** | `#B85B2A` |

### Typography (working set — confirm with whoever made the reference)

- **Display (wordmark):** condensed display serif. Need actual typeface name from designer. Bodoni Moda / Playfair Display Black are placeholders.
- **Subhead / small caps:** tight tracked sans (looks like Trade Gothic, GT America Mono, or similar industrial sans).
- **Signature mark:** custom-drawn or a script font (Hello Sunshine, Magnolia Script, etc.).
- **Body (web):** TBD — likely a serif like Source Serif or a humanist sans. Pick when resuming.

---

## What is now invalid

- `docs/brands/brand-guidelines/arrie-aslin-brand-guidelines-2026-04-21.md` — Indigo Deep / Cloud Dancer / Natchez Magenta palette, Nathan script wordmark, Blues Room residency framing. **Keep the file as historical reference but do not build to it.**
- `docs/brands/arrie-aslin-brand-package-2026-04-20.md` (in PR #166) — Southern soul-blues genre, solo-artist voice canon, Natchez/Mississippi geography. **Will be rewritten on resume.**
- `apps/web/app/arrie-aslin/` (in PR #166) — entire route group built to the old palette + solo-portrait imagery. **Will be rebuilt on resume.**
- `apps/web/config/tenants.ts` `arrie-aslin` entry (in PR #166) — accent color and tagline reflect old direction. **Will be updated on resume.**

---

## Open / unresolved (must be answered before resume)

1. **Lineup** — names, instruments, lead vocalist. Is Amy Allen the front of the band? Is "Arrie Aslin" decoupled from her name entirely, or does she remain the public face?
2. **Repertoire** — at minimum a setlist (originals + covers). Cannot write bios, press copy, or song-page placeholders without something real.
3. **Geography lock** — "Arkansas by Blood" is the tagline, but does the band live/play Natchez, Arkansas, both, or somewhere else? This decides Big Muddy Inn residency status.
4. **"Comeback worth the wait"** — what previous career are we referencing? Specific facts. Honesty gate: cannot write "comeback" copy without something true to point to.
5. **Label** — Big Muddy Records still the home, or new label?
6. **Big Muddy Radio show** — still happening, or off the table?
7. **Photography** — ensemble shoot date. Existing 28 solo Amy `.webp` files at `apps/web/public/images/arrie-aslin/` do not work for a band. Choose: (a) shoot before launch, (b) launch with venue/instrument/landscape imagery only and shoot later.
8. **Domain** — `arrieaslin.com` registration status. (Whois could not be run from the agent sandbox; defer to MBP terminal.)

---

## Resume conditions

Reactivate the brand package + website build when **all** of the following are true:

- Lineup confirmed (at minimum: lead vocalist + decision on whether band is fronted)
- A real setlist exists (≥ 5 songs identified)
- Geography lock decided (Arkansas, Natchez, both)
- "Comeback" provenance documented (one paragraph of true facts)
- Either (a) one ensemble photo session in the can, or (b) explicit decision to launch with no-people imagery v1
- Final typeface names from whoever made the reference image (so we don't ship placeholder fonts)

When those land: brand package rewrites in an afternoon, website is a half-day rebuild against the locked direction.

---

## What survived from the prior pass (still useful on resume)

- `apps/web/config/tenants.ts` schema is correct; the entry just needs an updated accent + tagline + features list when re-added.
- `apps/web/config/domain-routes.ts` pattern is correct; reuse as-is.
- The `/arrie-aslin/` route-group structure (layout + 6 pages) is a fine skeleton to rebuild against, but **delete the old palette + content first** rather than evolving it in place.
- The five-question framework in the original brief at `docs/agent-briefs/arrie-aslin-brand-and-site-2026-04-20.md` is still the right scoping checklist; the answers just changed.

---

## Cross-references

- Original scoping brief: `docs/agent-briefs/arrie-aslin-brand-and-site-2026-04-20.md`
- Old visual spec (now reference-only): `docs/brands/brand-guidelines/arrie-aslin-brand-guidelines-2026-04-21.md`
- Closed PR with the now-invalidated v1 build: CPTV27/hillbilly-dreams#166
- This pause + lock doc: `docs/brands/arrie-aslin-direction-lock-2026-05-06.md` (you are reading it)

---

*End of pause / direction-lock note. Update this file when resume conditions are met or when direction shifts again.*
