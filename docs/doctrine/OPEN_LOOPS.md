# Open Loops

**Purpose:** Unresolved items that don't have a hard deadline but should not be forgotten. Each loop has an owner, a state, and what would close it.
**Last revised:** 2026-05-12

A loop closes one of three ways: **resolved** (move to `DECISIONS.md` if material), **abandoned** (note and delete after a cycle), or **superseded** (note what replaced it). Loops should not linger forever; if a loop has been open more than two months without movement, surface it for explicit resolve/abandon.

---

## Strategic loops

| Loop | Owner | State | What closes it |
|---|---|---|---|
| Legal entity name decision (MBT LLC operating Big Muddy Touring as DBA, or switch the LLC to Big Muddy Touring LLC) | Tracy + counsel | Open since 2026-05-12 pivot. Decision deferred from the brand decision. | Counsel input + Tracy preference; result lands in `DECISIONS.md`. |
| Fate of "Deep South Directory" (DSD) | Chase | Open. Previously a public-facing layer of MBT-as-product; with MBT dropped, DSD is unmoored. Probably folds into Big Muddy Directory. | Decision in `DECISIONS.md`, plus DNS disposition for `deepsouthdirectory.com`. |
| Fate of "Outsider Economics" | Chase | Open. Editorial sibling brand; status unclear under the two-umbrella model. | Decision: keep as editorial sibling, fold into Magazine, or sunset. |
| Three destination events for Y1 — final picks | Chase + Tracy + Amy | Scoring frame drafted (`docs/destination-events-decision-frame-2026-05-12.md`). Scoring session not yet scheduled. | A scoring session with all three partners; result lands in `DECISIONS.md`. |
| Push commit `569082ca` (doctrine layer) to `origin/main` | Chase | Committed locally, not pushed. Pending Chase confirmation. | Chase says "push." |

## Partner loops

| Loop | Owner | State | What closes it |
|---|---|---|---|
| Sean Davis trial show — date, lineup, P&L target | Sean + Chase | Conservative scope locked (`DECISIONS.md` 2026-05-12). Trial show details not scheduled. | A booked date with Doug Duffy and Badd at Arcade Theater + agreed per-show P&L target. |
| Tracy 30-min call — 3 items | Tracy + Chase | Agenda drafted (`docs/partners/tracy-call-agenda-2026-05-12.md`). Call not scheduled. | Call happens; notes land; any items requiring follow-up move to `THIS_WEEK.md` or `DECISIONS.md`. |
| Studio C scope clarification | Tracy → Chase | Tracy-created Asana task, currently overdue. | Clarification in Tracy call; updated scope doc if needed. |
| Restream double-charge investigation | Tracy → Chase | Tracy-created Asana task, currently overdue. | Resolved via vendor support; refund or cancellation; close Asana task. |
| Tuthill Design scope (post-FarleyPierson) | Chase | Documented in `docs/partners/tuthill-photography-scope-2026-04-20.md`. State as of pivot unclear. | Confirm scope still holds under the two-umbrella model; note in `DECISIONS.md` if changed. |

## Infrastructure loops

| Loop | Owner | State | What closes it |
|---|---|---|---|
| Infrastructure A / B / C decision | Chase | **Hard deadline Fri 2026-05-15.** Tracked in `THIS_WEEK.md`. | Decision in `DECISIONS.md`. Then disposition of uncommitted `/circuit/venues` code. |
| AzuraCast SSL repair (Big Muddy Radio stream) | Chase | Deferred — radio stack frozen pending audience (`DECISIONS.md` 2026-05-11). | Either audience milestone met (unfreeze + repair) or formal sunset of the stack. |
| FarleyPierson LLC closure + Stripe/vendor migration to MBT LLC | Chase + Tracy | Plan exists (`docs/partners/tuthill-photography-scope-2026-04-20.md` §10). Execution status unclear under the 2026-05-12 pivot. | Stripe account migration complete + LLC closure filed. |
| Bitwarden as canonical credentials store | Chase | Rule established in CLAUDE.md. Periodic audit not scheduled. | Quarterly sweep of Vercel env vs. Bitwarden; resolve drift. |

## Editorial / content loops

| Loop | Owner | State | What closes it |
|---|---|---|---|
| Magazine publishing cadence under the two-umbrella model | Chase | Unclear. The Magazine is Layer 4 (identity engine) but cadence not set. | A documented cadence (monthly? quarterly?) that fits the documentary-paced rule. |
| Big Muddy Touring podcast (post-`The_Flywheel_of_Big_Muddy.mp4`) | Chase | One episode generated 2026-05-12. Future episodes not scheduled. | A simple cadence decision + next episode topic. Or formal "occasional, not a series" framing. |
| Sean Davis ecosystem brief — what gets shared and when | Chase | Brief PDF drafted (`~/Documents/sean-davis-bmt-brief-2026-05-11.pdf`). Distribution to Sean held pending Tracy + Amy review. | Tracy + Amy review completes; Chase shares with Sean (Tier 3 — requires approval). |

## Doctrine / housekeeping loops

| Loop | Owner | State | What closes it |
|---|---|---|---|
| `CURRENT_STATE.md` referenced in `README_FOR_AGENTS.md` but does not exist | Agent | `THIS_WEEK.md` now serves that role. Update the README to point at `THIS_WEEK.md`. | Edit to `README_FOR_AGENTS.md`. |
| `FAILED_IDEAS.md` (Chase suggested, deferred) | Chase | Not built yet. Held by Chase: "not this week, later." | Chase signals "now." |
| Agent personas (Cos / Patch / Delta Dawn / Archivist / Scout) — formal specification | Chase | Deliberately not built. Should emerge through operational friction. | Multiple friction points where a specific persona would have helped; then specify. |
| Continuous audit procedures (night-watch loops, scheduled doctrine compliance) | Chase | Deliberately not built. Same reason. | Real evidence that scheduled audits would catch drift current behavior misses. |

---

## How to use this file

- **When something starts** that won't finish in the same session, add a loop with owner + state + what-closes-it.
- **When something closes**, move it: to `DECISIONS.md` if it's a settled decision, to `THIS_WEEK.md` if it's a deadline this week, or just delete with a one-line note in the next update.
- **Don't pad.** Loops are real unresolved items, not status updates.
- **Don't let loops linger.** Two months without movement → surface for resolve/abandon.

---

*If a loop is closed and you don't see it move to `DECISIONS.md` or get deleted, the next agent will treat it as still open. That's the failure mode this file prevents.*
