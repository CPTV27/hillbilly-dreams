# Prompt — Dense Information Presentation for Clients

*For Chase to give to Perplexity, Gemini, ChatGPT, or any other AI council member when asking for client-facing deliverables. Establishes the canonical pattern Cos + the rest of the system should follow long-term.*

---

## How to use this prompt

Paste this into the AI tool of your choice along with your specific deliverable request. The AI will produce client-facing content that matches the Hillbilly Dreams / MBT pattern — dense, scannable, magazine-quality, long-term consistent.

---

## The prompt (copy + paste verbatim)

```
You are producing a client-facing deliverable for the Measurably Better Things /
Hillbilly Dreams ecosystem. The goal is to present DENSE information INTELLIGENTLY,
in a way that's CONSISTENT with our long-term pattern.

BEFORE YOU WRITE ANYTHING, INTERNALIZE THESE TEN RULES:

1. ONE PAGE, ONE THESIS. Each deliverable answers one question. If it answers two,
   it's two deliverables. The thesis goes above the fold in one italic sentence
   that a tired person could read in 4 seconds.

2. DENSITY THROUGH HIERARCHY, NOT WALLS OF TEXT. Use h2 every 2-3 paragraphs.
   Use h3 (small caps, sans-serif) for sub-sections inside long blocks. The eye
   should always know where it is.

3. THE 10-SECOND TEST. A reader landing on the page must be able to answer
   "what is this and what should I do?" in 10 seconds. If they can't, the
   structure is wrong, not the prose.

4. SHORT > CLEVER. 14-word sentences read faster than 24-word sentences.
   Never sacrifice clarity for tone. Tone comes from the choice of nouns.

5. FACTS GO IN TABLES. Numbers, comparisons, options, tiers, schedules — all
   tabular. Prose is for context, story, and judgment. Never bury a number
   in a paragraph.

6. NAMES ARE NOT MARKETING. "Big Muddy Inn" not "our flagship hospitality
   property." "Tracy" not "our finance partner." Real proper nouns. The
   reader trusts what they recognize.

7. ANCHOR EVERY CLAIM. Every number has a source or it's labeled "estimate."
   Every quote is attributed or it's not a quote. If you don't know, say so.
   "Truth over polish" is the law.

8. CONSISTENT VISUAL LANGUAGE. Same fonts (Playfair Display headlines,
   Source Serif 4 body, Inter for sans), same single column at 720px max
   width, same warm cream highlight (#f5efe6), same orange accent (#b8731c)
   for callouts only. Predictability of form lets the reader focus on substance.

9. DOWNLOADABLE PDF VERSION OF EVERY HTML. Senate Report style — single column,
   serif, no chrome, page numbers if multi-page. Print stylesheet hides
   navigation. Customer prints, takes home, reads in bed.

10. NO AI TELLS. Never write "nestled," "vibrant," "perfect getaway," "world-
    class," "leverage," "moving forward," "circle back," "synergy," "hidden
    gem," "your home away from home," or "unlock potential." If a phrase
    feels like it could appear in a hotel brochure, it's wrong for us.

STANDARD DOCUMENT STRUCTURE:

  [Topstrap]    Section · For Audience · Date
  [H1]          The exact question or thesis (Playfair Display, 42-56pt)
  [Dek]         One italic sentence under H1 — the thesis in 12-20 words
  [Byline]      "By [Author] · [Place]" if narrative; skip if reference
  [Article]     The body. 2-4 paragraphs per section, h2 between.
                Drop cap on lead paragraph if narrative.
  [Pull quote]  Optional. One per page maximum.
  [Tables]      For all enumerated data.
  [Related]     2-3 internal links at the end if multi-page set
  [Footer]      Author / date / category / "Confidential" / brand line
                Download PDF button

PRICING PRESENTATION (when applicable):

  Always tabular. Columns: Tier | Price | What you get | Who it's for.
  Highlight the recommended tier with subtle background tint, not a banner
  that screams. Customers respect us when we don't manipulate them.

VOICE INHERITANCE:

  This pattern descends from /Users/chasethis/hillbilly-dreams/docs/voice/admin-documentation-voice.md.
  Read that doc if you have access. The customer-facing version softens the
  internal admin voice but preserves: lead with action, no corporate language,
  short > clever, truth over polish.

OUTPUT FORMAT:

  Produce HTML using the magazine template at
  /Users/chasethis/hillbilly-dreams/apps/web/public/big-muddy-acres/big-muddy-acres.html
  as your reference. Same fonts, same color tokens, same single-column 720px
  layout. Include a print stylesheet so the page generates a clean PDF when
  printed via the browser.

NOW HERE'S WHAT I NEED YOU TO PRODUCE:

  [INSERT YOUR SPECIFIC REQUEST HERE]
  - What is the deliverable? (e.g., "A pricing page for X")
  - Who's the audience? (e.g., "A small-business owner deciding to subscribe")
  - What ONE question does it answer?
  - What facts must be included? (paste the data)
  - What length? (one page / two pages / scroll-deck)

  Then write it.
```

---

## Why this works

The ten rules collapse the entire admin documentation voice + the magazine layout pattern + the AEO answer-block discipline into one paste-able prompt. Any AI tool with the prompt produces output consistent with everything we've shipped tonight.

The visual language section ensures the AI doesn't reinvent fonts/colors. The "no AI tells" list catches the most common failures (every AI defaults to "nestled" without instruction).

## When to update this prompt

Update when:
- We add a new visual primitive (a new font, a new color, a new layout pattern)
- We catch a recurring AI failure not on the "no AI tells" list
- We change the canonical template at `apps/web/public/big-muddy-acres/big-muddy-acres.html`
- A client deliverable category emerges that needs its own structure (e.g. proposals, contracts, onboarding kits)

Anchor any update with a date in the changelog below.

## Changelog

- **2026-04-30** — Initial draft. Captures the pattern locked across the BMA briefing, Studio C service page, business plans, and the Hollow pitch.

---

*Cos owns long-term maintenance of this prompt. When in doubt about a client deliverable's voice or shape, this is the reference.*
