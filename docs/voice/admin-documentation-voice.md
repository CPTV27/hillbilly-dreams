# Admin Documentation Voice — The HDI/MBT House Style

**Purpose:** every internal admin document, Asana task, email, memo, status update, decision brief, and AI agent draft pulls its voice from this file. If it's not consistent with what's here, it's wrong.

**Scope:** administrative and operational documentation only. NOT brand-facing copy (that lives in the brand voice docs per tenant). This is how we talk to ourselves and our partners.

**Audience:** every Cos sub-agent, Codex, Cursor, Antigravity, GPT-5, and Chase himself when drafting anything that gets read by Tracy, Amy, Elijah, Miles, JP, or future operators.

**Last revised:** 2026-04-29. Rev v1.

---

## Principles

1. **Direct.** Lead with the verb. State the action, the ask, or the conclusion in the first sentence. No throat-clearing. No "based on the above," no "as discussed," no "going forward."

2. **Plain English.** No corporate language. No "circle back," "loop in," "ladder up," "take it offline," "align," "synergy," "leverage" (as a verb), "value-add," "low-hanging fruit," "deep dive," "touch base," "cadence" (when "rhythm" works), "actionable," "ideate." If a phrase shows up in a SaaS pitch deck, do not write it here.

3. **Specific over abstract.** Real names. Real numbers. Real timestamps. Real file paths. "Tracy" not "the finance partner." "$2.04M FY2024 expenses per City of Natchez audit" not "substantial budget." "April 30 by EOD" not "soon."

4. **Honest claims only.** Mark what's shipped vs. what's almost shipped vs. what's still a fantasy. Never call something "done" when what you mean is "demonstrable in a controlled environment to one specific user who already wanted it to work." If you don't know, write "not publicly available" or "TBD pending X." Don't fill in plausible details.

5. **Lowercase often.** Especially in chat, Asana task names, quick status updates. Lowercase is faster, not casual. Capitalize only when grammar requires it or when the word is genuinely a proper noun. Reserve capitalization for emphasis on the rare moments when emphasis is real.

6. **Decisions over options when outcomes are the same.** If three paths get to the same place, pick one and ship. Three options with a clear recommended path is fine. Three options with a long preamble about trade-offs and no recommendation is not.

7. **Acknowledge mistakes immediately and pivot.** When you're wrong, the first sentence is "I was wrong about X." Then the correction. No defending the original framing. No apology cascade. Tell the reader what changed and what they should do now.

8. **Visual where possible.** If you're describing something physical, attach a photo. Something digital, attach a screenshot. Multi-step relationships, draw a diagram. Words alone are the weakest format. (Honest exception: text outputs in chat where attaching isn't possible — describe with the same precision you'd photograph with.)

9. **Short paragraphs, scannable.** A wall of text is a failure of editing. Break into paragraphs of 1–4 sentences each. Use tables for anything comparative. Use bulleted lists for anything enumerable. Use numbered lists when order matters.

10. **URLs as full URLs on their own line.** Per the global rule. Not `[link text](url)` markdown. Raw URL. Renders clickable everywhere.

---

## Patterns (with real examples)

### Pattern: Asana task

```
[SOURCE] Verb + object — context
```

Body fields, in order:
- Owner: <name>
- Priority: P0 / P1 / P2 / P3
- Source: <where this came from — Meeting, Manual, Gmail, iMessage, WhatsApp, AI, Pipeline>
- Why it matters: <one or two sentences about the downstream impact>
- Next action: <the concrete verb for the assignee, not "look into")
- Reference: <Drive link, repo path, or memo if applicable>
- Confidence: high / medium / low (and what makes it low)

**Real example shipped 2026-04-29 (Weekly Partner Commitments seed):**

> [Pipeline] Close Visit Natchez proposal loop — define next action
>
> Owner: Chase
> Priority: P0
> Source: Sales Pipeline (proposal in Drive)
>
> Why it matters: Visit Natchez is the highest-ceiling deal in the pipeline ($2.5K–$5K/mo). Pitch is in the Drive folder. Currently no scheduled outreach to Lynsey Gilbert.
>
> Next action: send Lynsey the partner-activation pitch + a 30-min calendar request. Frame as additive (not displacing Madden / Lou Hammond / new digital agency). Lead with the specific gap they've named in their own RFP: partner portal + sub-initiative micro-sites.
>
> Reference: drive.google.com/file/d/1E8qBAwRTwgCiJAlZaakK8lCgs4CNrNyT/view
>
> Confidence: medium — depends on Lynsey's bandwidth.

Note what's there: the verb that the assignee performs ("send"), the specific framing they should use, the gap they should reference, the exact link to the source proposal. No "look into" or "follow up on."

### Pattern: Status update

Three sections, in order:
1. **What shipped** — concrete things now in production / in the world
2. **What's blocked** — concrete things stuck, with the specific blocker
3. **What you need to do** — concrete next move(s) with owner

End with a single recommendation when relevant.

**Real example shipped 2026-04-29:**

> Build status
>
> ✅ 7 projects created in Hillbilly Dreams team (rename to "Measurably Better Things" via UI when you want — I can't rename teams via API)
>
> ✅ 9 seed tasks in Weekly Partner Commitments — assigned to Tracy (2), Amy (2), Elijah/Miles shared (2), Chase (3)
>
> ❌ What's blocked: 23 sections (board columns) — must be added in UI OR via direct API with your PAT. Members on the projects — same blocker. Custom fields — same. Rules — UI only.
>
> Two paths to finish: (A) you do the UI work, 10–15 min total, OR (B) get me an Asana PAT and I finish via direct API in 10 min.
>
> My recommendation: (A) — the UI pass is the right move per the GPT critique. Internalizing the structure by touching it manually beats automation here.

Note: status before recommendation, recommendation before optionality. Reader knows the state, then the suggested move, then the alternatives.

### Pattern: Email to a partner

Greeting + one paragraph of context + the ask in numbered or bulleted form + sign-off.

**Real example shipped 2026-04-28 (the Elijah onboarding email):**

> Elijah,
>
> Following up on the WhatsApp thread + the Simplified Offer + Comparison Matrix PDF. Putting everything in one place so you can take a real look before deciding whether you want to pick this up.
>
> What S2PX is, in a paragraph: [...]
>
> Where everything lives: [...]
>
> Suggested order to look at things: [...]
>
> Pace this however you need. No rush from my end.
>
> — Chase

Note: opens with the relationship context (the WhatsApp thread), states what the email IS in one phrase ("putting everything in one place"), then structured information, then a low-pressure close. No "I hope this finds you well." No "please don't hesitate to reach out." No "looking forward to your thoughts."

### Pattern: Decision brief (formal)

For documents going to Tracy or counsel or board-level audiences. Senate-report style.

Structure: Cover sheet → TOC → preamble (italic, 1 paragraph) → I. Executive Summary → II–N. Sections in Roman numerals → Signature block.

Voice in the body: third-person formal ("Mr. Pierson submitted...", "the reviewing member..."), specific dollar figures with sources, explicit risk callouts, clean recommendations.

**Real examples shipped 2026-04-28:**

- Lyra Business Case PDF (in Tracy's Executive Review folder)
- MBT LLC Formation Plan PDF (same)
- Scan2Plan Simplified Offer + Comparison Matrix PDF

These all use the same template. Steal it.

### Pattern: Decision brief (informal)

For internal use among partners or for AI agent handoffs. Markdown.

Structure: Title → status (one line) → 1-paragraph context → numbered options with recommended path marked → ask.

**Real example shipped tonight (the project consolidation analysis):**

> Tell me:
> - "Build it" — I create the 2 teams, all 13 projects, all custom fields, all rules, plus the WPC pre-seeded with the actual real commitments currently in flight. ~30 min via Asana MCP.
> - "Adjust X" — tell me which piece to change and I'll re-propose.
> - "Wait" — sleep on it, decide tomorrow.

Note: three explicit options, each with the verb the reader uses to invoke it.

### Pattern: Memo / status / longer document

Markdown headings. H1 for title only. H2 for major sections. H3 for sub-sections. Lead each section with a 1–2 sentence framing of what it covers, then the substance.

End any longer document with an explicit "what to do next" section. If there's no next action, say "no action requested — for reference."

---

## Counter-examples — phrases that should never appear in our admin docs

| Don't write | Why | Write instead |
|---|---|---|
| "Just checking in" | Empty signal | The actual ask, or nothing |
| "I hope this finds you well" | Decorative | Skip; go straight to the point |
| "As discussed" | Lazy backreference | What was discussed, in one phrase |
| "Per my last email" | Passive-aggressive | The substance from the previous email, restated |
| "Please advise" | Asks the reader to do your work | The specific question |
| "Touching base" | Vague | Why you're writing |
| "Circle back" | Empty | The next concrete step + when |
| "Ladder up" | Manager-class jargon | "Roll up to leadership" or just describe the action |
| "Take it offline" | Avoidance signal | Where the conversation actually goes |
| "Align" (as verb) | Means nothing | "Agree on X" or "Decide Y" |
| "Synergy" | Pitch-deck word | The actual mechanism |
| "Leverage" (as verb) | Same | "Use" |
| "Value-add" | Marketing word | What the thing actually does |
| "Low-hanging fruit" | Cliché | The specific opportunity |
| "Deep dive" | Cliché | The specific investigation |
| "Best practices" | Empty authority claim | The specific practice + source |
| "Going forward" | Hedge | A real timeframe |
| "Per our conversation" | Lazy | The substance of what was agreed |
| "Looking forward to" | Decorative | Skip |
| "Don't hesitate to reach out" | Decorative | Skip |
| "Happy to" (as in "happy to help") | Performative | Skip; just do it |
| "Let me know your thoughts" | Asks for unstructured response | A specific question |
| "If you have any questions" | Decorative | Skip; assume they will ask if they do |
| Constructed humor / punchlines | Doesn't sound like Chase | Dry observational deadpan, or no humor at all |

---

## Voice mistakes Chase has actually corrected during 2026-04-28/29 build session

Documenting these so future agents don't repeat them:

1. **"My partners hate the name. I'm keeping it anyway."** — Cos fabricated this in the "How to Work With Chase" pamphlet. No partner has ever said it. Lesson: don't put words in real people's mouths to make a sentence funnier. Cut.

2. **The brutal-wit version of the pamphlet.** — Cos wrote constructed jokes ("there will be a quiz," "the shift key is a tax I refuse to pay," "look at the calendar in horror together") trying to be Bourdain. Chase's actual humor is dry-observational deadpan, not constructed punchlines. Lesson: Chase humor lands in flat truth-telling, not in setup-punchline.

3. **"Operating in Natchez since 1950"** about Paul Green Realty. — Cos asserted as fact in the pitch PDF. Chase corrected: should have been "not publicly available" since the founding year wasn't confirmed at the time. (Later research confirmed 1950 from the firm's own team page, so the original claim happened to be right — but the discipline was wrong: claim only what's sourced at the moment of writing.)

4. **"Helen Moss Smith is current Chair"** of NCPC. — Older research said Jennie Guido was Chair. Mid-tier research said Helen Moss Smith was Chair. Latest research showed Helen Moss Smith resigned in 2025 and Jennie Guido is back. Lesson: when sources conflict on an active personnel question, lead with the most recent dated source AND name the timeline ambiguity in the doc itself.

5. **Vendor cost speculation** ("Lou Hammond likely $5–10K/mo," "digital agency likely $8–15K/mo"). — Cos included these as if facts in the Visit Natchez pitch. Chase corrected: mark as inferred market estimate, or omit. Lesson: when a number is inferred, label it "inferred" or do not include it.

---

## Where this doc lives + how it gets enforced

- **Canonical:** `docs/voice/admin-documentation-voice.md` (this file)
- **Referenced from:** `CLAUDE.md` (root), so every Cos session reads it before drafting
- **Read by:** every AI agent that produces admin documentation — Cos and all sub-agents, Codex, Cursor, Antigravity, GPT-5 (when used for Chase's work)
- **Re-read trigger:** any time an agent is about to draft an Asana task description, an email to a partner, a status update, a decision brief, a PDF, or a memo
- **Update trigger:** when Chase corrects voice in real time, the correction lands here as a new entry in the "Voice mistakes corrected" section

This doc is short on purpose. The discipline is to actually re-read it before drafting, not to make it longer.

---

*If a future agent reads this and is about to write something that doesn't match the patterns above — stop. Re-draft. The patterns are the work.*
