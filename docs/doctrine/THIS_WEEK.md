# This Week

**Purpose:** Lightweight operational state. What is actually happening *this week*, who owes what to whom, and which decisions have a deadline. Read before proposing anything time-bound.
**Last revised:** 2026-05-12

This is not a status report. It is the working snapshot. Update when state changes; don't fluff it with summaries.

---

## Week of 2026-05-11

### Hard deadlines

| Date | Item | Owner | Status |
|---|---|---|---|
| **Fri 2026-05-15** | Infrastructure A / B / C decision (Option A pure off-the-shelf, Option B hybrid keep Directory custom, Option C status quo). Default recommendation pending: **Option B.** | Chase | **Decision open.** Reference: `docs/strategic-options-comparison-2026-05-12.md`, `docs/pivot-prd-2026-05-12.md` Workstream 5. |

### Active partner items

| Item | With | Status |
|---|---|---|
| Sean Davis partnership — scoped to trial Arcade show only | Sean + Tracy + Amy | Documents distributed via Asana (tasks 1214728322433158 + 1214728558363027). Tracy + Amy reviewing. Trial show date not yet scheduled. |
| Radio go/no-go (freeze pending audience) | Tracy + Amy | Decision memo distributed (Asana 1214728786343378 + 1214728804325966). Recommendation: freeze AzuraCast stack, run on Spotify playlists + occasional podcast. |
| Cost reduction sweep | Chase (parent task 1214728950562286) + 7 subtasks | In flight. Tied to the Friday infrastructure decision. |
| Tracy 30-min call — 3 items (legal entity name, Studio C clarification, monthly stabilization-capital envelope) | Tracy | Agenda drafted: `docs/partners/tracy-call-agenda-2026-05-12.md`. Call not yet scheduled. |
| Tracy-created Asana items (3 overdue) | Tracy → Chase | Includes Restream double-charge investigation + Studio C clarification. Surface in next Tracy call. |

### In flight (Chase)

- Doctrine layer landed and committed locally (`569082ca`). **Push to `origin/main` pending Chase confirmation.**
- Autonomy layer (AUTONOMY_RULES + THIS_WEEK + OPEN_LOOPS) being built today, 2026-05-12.
- Destination-events scoring session not yet scheduled with Tracy + Amy. Frame: `docs/destination-events-decision-frame-2026-05-12.md`.

### Uncommitted code

`apps/web/app/touring/circuit/page.tsx`, `/circuit/venues/*`, `lib/directory/venue-derived.ts`, `lib/directory/venue-relationship.ts`, plus modifications to `catalogs.ts`, `brands.ts`, venue seed/catalog files.

**Disposition deferred to the Friday 2026-05-15 infrastructure decision.** Under Option A (full off-the-shelf), this code does not ship; under Option B (hybrid keep Directory custom), it does. Do not commit, do not delete, do not extend until the decision lands.

### Not happening this week (explicit)

- Bearsville activation (deferred to Y2+ per `DECISIONS.md` 2026-05-12).
- MBT-as-product or MBT-as-brand work (dropped 2026-05-12).
- Multi-tenant scale work, generic festival planning, enterprise platform features.
- New artist signings to Records beyond the existing Y1 scope (Amy's projects + Mechanical Bull catalog + Doug Duffy and Badd if Sean trial show lands).
- 24/7 radio infrastructure investment.

---

## How to use this file

- **Before proposing time-bound work**, check the deadline table. If your proposal pushes a hard deadline, escalate.
- **Before contacting a partner**, check the active partner items. Don't duplicate an open thread.
- **When state changes that matters to the next pickup**, update this file. Not every action — material state.
- **When the week rolls over**, supersede this file with the new week's snapshot. Keep the previous week only if items genuinely carry over.

---

*This file is operational, not historical. For settled decisions, see `DECISIONS.md`. For unresolved items, see `OPEN_LOOPS.md`.*
