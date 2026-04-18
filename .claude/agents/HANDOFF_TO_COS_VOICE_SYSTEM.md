# Handoff to Chief of Staff — Voice System

**From:** Session on branch `claude/exciting-heyrovsky-ce81f5`
**Date:** 2026-04-18
**Status:** Humanizer shipped. Tracy onboarding in motion. Amy + per-brand voices still open.

---

## What Shipped

### 1. Humanizer filter is live

File: [memory/feedback_humanizer.md](../../../../../.claude/projects/-Users-chasethis-hillbilly-dreams/memory/feedback_humanizer.md)

Three-gate filter that runs on top of `feedback_chase_voice.md`. Every agent that writes text for Chase runs through it before output.

- **Gate 1** — hard ban list on AI-isms (delve, leverage, utilize, robust, synergy, journey, etc.)
- **Gate 2** — tone sync to Chase's voice doc. Em-dashes explicitly preserved, overriding the generic "no dashes" rule.
- **Gate 3** — the "bot or Chase?" read-back check.

Indexed in `MEMORY.md` so it auto-loads every session.

### 2. Per-brand voice architecture decided

| Brand | Voice | Status |
|---|---|---|
| Chase personal / OE / Touring | Chase | Live in `feedback_chase_voice.md` |
| Big Muddy Magazine | Tracy | Onboarding task sent |
| Big Muddy Radio | Amy + Chase + Tracy (three hosts, not blended) | Not started |
| Big Muddy Records | TBD | Not started |
| Big Muddy Entertainment | TBD | Not started |

Radio is explicitly three distinct profiles plus a routing rule, not a merged voice. A blended radio voice would sound like a committee.

### 3. Tracy onboarding task created

Asana task: https://app.asana.com/1/1211216881488780/project/1213945999434115/task/1214126060819601

- Project: Big Muddy Magazine (GID `1213945999434115`)
- Assignee: Tracy Alderson-Allen (GID `1213857209814579`, tracyaldersonallen@gmail.com)
- Asks for 8-15 writing samples via five channels (forwarded emails, Drive folder, pasted comments, voice memo, public links)
- No deadline, just "sooner is better"

---

## Open Threads — COS Owns These Now

### Amy onboarding task — needs to be created

Same structure as Tracy's, but weighted toward voice memos since radio is audio-first. Amy's natural written output is lighter than Tracy's. A five-minute voice memo describing a show night is worth ten emails.

- Assignee: Amy Allen (amyaldersonallen@gmail.com)
- Best project home: probably Big Muddy Radio if it exists, or create one. Alternative: "Amy — Inn & Bar Ops" workstream if that's the pattern.
- Emphasis in the ask: "Talk into your phone for 10 min about last Saturday's show. That's worth more than a polished essay."

### Voice ingestion pipeline — not built yet

When Tracy's samples arrive, something has to:
1. Collect the samples from Gmail forwards and Drive shares
2. Run them through `brand-voice:document-analysis` or `brand-voice:conversation-analysis` agents
3. Produce `feedback_tracy_voice.md` in the same structure as Chase's doc
4. Route it back to Tracy for sign-off before it locks

No agent owns this today. Decide: does the Chief of Staff run it, or spawn a dedicated Voice Ingestion agent?

### Per-brand voice doc for Records / Entertainment

Still undefined. Chase hasn't named a voice owner for these. Until he does, Humanizer defaults them to "soul-and-history register, not features-and-benefits register" per the note in `feedback_chase_voice.md`. Flag this the next time Records or Entertainment copy comes up — don't let an agent guess.

### Radio routing rule

Not written yet. When the three radio voice docs exist (Chase done, Tracy pending, Amy pending), we need a small rule in Humanizer that says: "For Big Muddy Radio copy, identify the speaker first. Assign by segment type. For station-level copy (IDs, promos, web), default to Chase's station-owner voice."

---

## Conflicts / Overrides to Remember

- **Em-dashes:** Humanizer Gate 2 explicitly allows them. Chase's voice uses them for asides. Don't let a future agent "clean them up."
- **Magazine voice is Tracy's, not Chase's.** Any agent writing for bigmuddymagazine.com must switch filter from Chase to Tracy once her doc exists. Today it still falls back to Chase.
- **Tracy and Amy are equity partners, not employees.** Standing rule — applies doubly to voice-doc framing.

---

## Files Touched This Session

- `memory/feedback_humanizer.md` — created
- `memory/MEMORY.md` — indexed the new file
- Asana task `1214126060819601` — created in Big Muddy Magazine project

No code changes. No deploys needed.

---

## Suggested First Move for COS

Create Amy's Asana task. Same template as Tracy's, lighter writing ask, heavier voice-memo ask. Then decide who owns the ingestion pipeline before Tracy's samples arrive, so they don't sit in an inbox.
