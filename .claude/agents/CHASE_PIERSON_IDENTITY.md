---
name: Chase Pierson — Canonical Identity
description: The single source of truth for who Chase is. Every agent reads this before referring to Chase in any copy, bio, email, agent prompt, or public artifact. Violations are bugs. NOT a general context file — this is about Chase the person.
---

# Chase Pierson — The Record

**Every agent on every machine reads this before writing anything about Chase.** Past agents have made critical mistakes (the "from the Delta" error on Outsider Economics). This file exists so that never happens again.

---

## Who He Is

**Full name:** Chase Tuthill Pierson

**Profession:** Photographer and filmmaker. Full stop. Everything else — CEO, CTO, founder, platform architect, radio host — is downstream of that. He is an image-maker who learned to build the systems that ship the images.

**The band:** Chase **was** Mechanical Bull. Not a member of it — he was the band. Mechanical Bull appeared in many movies. Do not say "he was in the band Mechanical Bull" — say "he was Mechanical Bull" or "his band Mechanical Bull appeared in..." The phrasing matters.

**Where he is from:** **NOT the Delta.** Do not, under any circumstance, call Chase a "Delta kid," "Delta native," "from the Delta," or anything of the sort. He operates in the Mississippi corridor now — he lives and works out of Natchez, Mississippi — but that is not the same thing as being from there. If you don't know his specific origin, say "based in Natchez" or "working out of the Mississippi corridor." Do not invent a backstory.

**What he actually runs now:**
- Hillbilly Dreams Inc (HDI) — holding company
- Big Muddy Touring — the entertainment company (radio, records, magazine, touring, house band)
- Measurably Better Things (MBT) — the platform product
- Big Muddy Inn — hospitality, co-run with equity partners Tracy and Amy
- Chase Pierson Photography + Venture Gallery — his personal photography practice

**The 2022 thing:** He designed the DeFacto Codec Market in 2022 — a complete media production-to-distribution pipeline. That architecture is the direct ancestor of everything HDI runs today. Big Muddy is that system, applied to Main Street.

---

## Hard Rules For Copy About Chase

1. **Never** call him "from the Delta," a "Delta kid," a "native," a "son of the Delta," or any variant.
2. **Never** reduce him to "a guy in tech" or "an entrepreneur." He is a photographer and filmmaker.
3. **Never** misname the band. It is **Mechanical Bull**, and he **was** it.
4. **Never** invent biographical details (hometown, schools, first camera, etc.) without explicit source.
5. **Never** call Tracy or Amy employees. They are co-founders and equity partners.
6. **Always** name Natchez as where he currently works, not where he is from.
7. When in doubt about bio details, write less — say "Chase Pierson" with no qualifier, or stop at "photographer and filmmaker based in Natchez, Mississippi."
8. **Never** credit one person with founding Hillbilly Dreams Inc or any of its brands alone. **Amy Allen, Chase Pierson, and Tracy Alderson-Allen are all co-founders and equal-thirds equity partners.** When describing origin or founding, always name all three, or say "the HDI founders" — never "Chase founded it" or "Amy started it" or "Tracy built it." They started it together. Confirmed by Chase on 2026-04-10 during an ecosystem audit after Delta Dawn incorrectly told a test query that Amy founded Big Muddy Touring.

---

## Working Style (what every agent should expect)

- **Voice input preferred.** He hates navigating on screens. If you build him anything, it should accept voice, minimize taps, and use swipe gestures over menus.
- **Direct sentences.** Short. Declarative. Iron & Earth voice (see `iron-earth-comms` skill). No corporate fluff.
- **Photography first, technology invisible.** Every artifact defaults to hero photos at full bleed and dark theme. See `.claude/agents/NORTH_STAR_MANIFESTO.md`.
- **Gatekeeper.** Chase decides what goes to Tracy or Amy. Do not ambush them.
- **Honest claims.** Never claim a feature that hasn't shipped.
- **Presentation mode.** Chase shows work on big screens from an iPad. Design for that viewing context.

---

## If You Break These Rules

You are writing a bug. Fix it immediately. Apologize briefly to Chase, make the correction, and add the rule you violated to this file so the next agent doesn't repeat it.

---

## Changelog

- **2026-04-10** — File created after "Delta kid" error was found on Outsider Economics about page (`apps/web/app/economics/about/page.tsx`). Chase: "I can't believe nobody — we have a team of agents and nobody knows me." Rules codified by Claude (vigilant-dubinsky worktree) immediately after the fix.
