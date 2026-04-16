# Uncommitted Work Audit — 2026-04-16

*Snapshot of everything sitting in `main`'s working tree that hasn't been committed yet. One row per file/group with a recommendation. Chase reviews, we commit what makes sense.*

**State at audit:** 30 modified files + 29 untracked items, ~4,800 lines of net change across all of it.
**Just committed:** `09327d9 docs(strategy): HDI review board rewrite + Born Free prototype spec` (this session's work)

---

## Verdict Legend

- **COMMIT** — ready to go, no risk
- **REVIEW** — needs eyes on the diff before commit
- **HOLD** — probably not for git (local-only, binary, bloat)
- **DROP** — stale / superseded / delete from working tree

---

## Group A — Web App Page Updates (`apps/web/`)

All look like deliberate copy + UI improvements, continuing the "Cursor Batch 3" pattern from commit `28172a5`. **Biggest changes:**

| File | Lines | Change | Verdict |
|---|---|---|---|
| `radio/page.tsx` | ~65 touched | Removed mock "Recently played" list, replaced with live "What's On" section — real improvement | **COMMIT** |
| `entertainment/page.tsx` | +64 | Substantial page update | **REVIEW** |
| `gallery/GalleryPageClient.tsx` | +83 | Gallery UI rework | **REVIEW** |
| `magazine/page.tsx` | -58 net | Significant reduction — content cut or refactor | **REVIEW** |
| `bearsville/page.tsx` | +30 | Page additions | **REVIEW** |
| `dctv/page.tsx` | +22 | Page additions | **REVIEW** |
| `directory/onboard/page.tsx` | +10 | Onboarding tweaks | **COMMIT** |
| `directory/dashboard/page.tsx` | +8 | Dashboard tweaks | **COMMIT** |
| `directory/layout.tsx` | +7 | Layout adjustment | **COMMIT** |
| `gallery/clients/brittany/page.tsx` | +8 | Client gallery tweak | **COMMIT** |
| `measurably-better/page.tsx` | +7 | Copy tweak | **COMMIT** |
| `gallery/page.tsx` | +5 | Small | **COMMIT** |
| **17 files at 2 lines each** | 34 total | Small copy tweaks across directory, gallery, hillbilly, records, sovereign-pi, store, strategy, tour, touring, welcome | **COMMIT** |

**New directories (untracked):**
- `apps/web/app/admin/pulse/` — 2 files (PrintPulseButton.tsx + page.tsx), new admin dashboard route — **REVIEW** (brand new, confirm it works)
- `apps/web/app/studioc/` — 1 file (page.tsx), Studio C landing page — **REVIEW**
- `apps/web/app/tuthill/` — 1 file (page.tsx), Tuthill landing page — **REVIEW**

**Recommendation:** Split into two commits once reviewed:
- `feat(web): small copy + page updates across directory, gallery, sovereign-pi, welcome` (the 17 tiny ones)
- `feat(web): radio page refactor + new studioc/tuthill/admin-pulse routes + entertainment/gallery/bearsville/dctv/magazine updates` (the bigger ones)

---

## Group B — April 15 Strategy Session Artifacts (`docs/`)

Session documentation from the 04-15 business architecture review. Real work product.

| File | Size | Purpose | Verdict |
|---|---|---|---|
| `NARRATIVE_BIBLE.md` | 535 lines | Voice/narrative playbook across brands | **COMMIT** |
| `VOICE_MEMO_ANALYSIS_2026-04-15.md` | 497 lines | Full decomposition of Chase's voice memo, 19 decisions | **COMMIT** |
| `BUSINESS_ANALYSIS_2026.md` | 432 lines | Year-end business analysis | **REVIEW** |
| `SCHEMA_BLUEPRINTS.md` | 353 lines | Database schema designs | **REVIEW** |
| `LAND_AND_EXPAND_CONCEPT.md` | 264 lines | Cooperative community concept — Marika pilot + MS buildout | **COMMIT** |
| `PRESENTATION_NOTES_2026-04-15.md` | 224 lines | Session notes | **COMMIT** |
| `TECH_STACK_HANDOFF.md` | 166 lines | Tech stack documentation | **REVIEW** |
| `PRESENTATION_GUIDE.md` | 107 lines | How to deliver the Rhea pitch | **COMMIT** |
| `TECH_DEBT_REGISTER_2026-04-15.md` | 97 lines | Debt tracking (created this session) | **COMMIT** |
| `BIG-MUDDY-MICROMEDIA-PLAN.md` | 747 lines | Micromedia thesis / strategy | **REVIEW** (huge — is this current or superseded?) |
| `OE_PLATFORM_MAPPING.md` | 44 lines | Outsider Economics platform mapping | **COMMIT** |
| `HDI_Business_Review_April_2026.pptx` | binary | PowerPoint of the review deck | **HOLD** — consider GCS bucket instead of committing a `.pptx` to git (bloat) |

**Recommendation:** Commit the clear ones as `docs(strategy): April 15 session artifacts`. Review the three flagged, then decide. Move the `.pptx` to `gs://bmt-media-bigmuddy/presentations/` (or similar) and reference by URL.

---

## Group C — Agent Coordination + Handoffs

Work product from the April 15 multi-agent session.

| File | Size | Purpose | Verdict |
|---|---|---|---|
| `AGENT_LEDGER.md` (modified) | +77 lines | Session log: TinyFish MCP setup + Business Architecture Review Session with 19 decisions | **COMMIT** — this is canonical agent coordination history |
| `.claude/agents/TINYFISH_MCP.md` | 102 lines | How agents use TinyFish — read `fetch_content` vs `run_web_automation` rules | **COMMIT** — foundational agent doc |
| `docs/COS_HANDOFF_2026-04-15.md` | 180 lines | CoS → Patch handoff document | **COMMIT** |
| `docs/COS_TO_PATCH_RADIO_RESPONSE.md` | 91 lines | CoS response on radio strategy question | **COMMIT** |
| `docs/RADIO_STRATEGY_UPDATE.md` | 39 lines | Radio strategy summary | **COMMIT** or **DROP** — content may now be superseded by this session's podcast pivot in the review deck |

**Recommendation:** Commit as `docs(agents): April 15 coordination — TinyFish MCP + CoS handoff + agent ledger`. Read `RADIO_STRATEGY_UPDATE.md` — if it conflicts with the radio pivot just committed, drop it.

---

## Group D — Internal HTML Dashboards

| File | Size | Purpose | Verdict |
|---|---|---|---|
| `docs/technical-resource-guide.html` | 1,828 lines | Technical resource guide — previously named master-report-site.html, renamed 04-16 | **COMMIT** |
| `docs/big-muddy-presentation.html` | 1,292 lines | Big Muddy presentation artifact | **REVIEW** — confirm this isn't superseded by hdi-review-board.html |
| `docs/tracy-briefing.html` | 651 lines | Tracy briefing dashboard | **COMMIT** |
| `docs/task-router.html` | 307 lines | HDI Task Router — agent kanban board | **COMMIT** |

**Recommendation:** Commit three as `docs(internal): presentation + task-router + tracy-briefing + tech-resource-guide dashboards`. Diff `big-muddy-presentation.html` against `hdi-review-board.html` to confirm both should exist.

---

## Group E — Scripts + Workflow Notes

| File | Size | Purpose | Verdict |
|---|---|---|---|
| `scripts/miro-board-builder.sh` | 214 lines | Miro board builder | **REVIEW** — is this complete or exploratory? |
| `scripts/miro-fractal-board.sh` | 213 lines | Miro fractal board | **REVIEW** |
| `scripts/miro-org-hierarchy.sh` | 171 lines | Miro org hierarchy | **REVIEW** |
| `.workflow/CURSOR_OVERNIGHT_COPY_FIXES.md` | 210 lines | Cursor overnight batch instructions | **COMMIT** or **DROP** — is this a spec for a batch that already ran? |
| `.workflow/CURSOR_OVERNIGHT_TEARSEET.md` | 78 lines | Cursor tear-sheet | **REVIEW** (likely typo: should be TEARSHEET) |
| `.workflow/OVERNIGHT_COPY_QA.md` | 81 lines | Copy QA process | **COMMIT** |

**Recommendation:** Review the Miro scripts — if they work, commit. If exploratory, drop. The `.workflow/` markdowns look like Cursor batch specs — commit the evergreen ones, drop the one-off batch runbooks if they're already executed.

---

## Group F — Tooling / Settings

| File | Size | Purpose | Verdict |
|---|---|---|---|
| `.claude/settings.local.json` | +211 lines | New bash allow-list patterns (npm view, vercel ls, gsutil du, etc.) + MCP tool permissions | **HOLD** — this file is conventionally local-only. Check if it's in `.gitignore`; if not, commit; if yes, leave alone. |

**Recommendation:** Check `.gitignore`. If the file isn't ignored, commit as `chore: expand Claude Code local permissions allow-list`. If it's ignored, no action needed.

---

## Summary of Recommended Actions

**Ready to commit with confidence (7 commits):**

1. `docs(agents): April 15 coordination — TinyFish MCP + CoS handoff + agent ledger + tracy briefing`
2. `docs(strategy): April 15 session — narrative bible + voice memo + L&E concept + presentation notes + tech debt register`
3. `docs(internal): task-router + technical-resource-guide internal dashboards`
4. `feat(web): radio page refactor to live stream + What's On`
5. `feat(web): new studioc + tuthill + admin-pulse routes`
6. `feat(web): small copy tweaks across 17 pages`
7. `chore: workflow notes + overnight copy QA`

**Needs review before commit (7 items):**

1. `docs/BIG-MUDDY-MICROMEDIA-PLAN.md` — is it current or has this session's deck superseded it?
2. `docs/big-muddy-presentation.html` — overlap with `hdi-review-board.html`?
3. `docs/RADIO_STRATEGY_UPDATE.md` — conflicts with the podcast pivot?
4. `docs/BUSINESS_ANALYSIS_2026.md` — sanity check claims
5. `docs/SCHEMA_BLUEPRINTS.md` — is the schema still aligned with the code?
6. `docs/TECH_STACK_HANDOFF.md` — is it current?
7. `scripts/miro-*.sh` — working or exploratory?
8. Bigger `.tsx` changes (entertainment, gallery, magazine, bearsville, dctv) — quick eye-check

**Move out of git:**

- `docs/HDI_Business_Review_April_2026.pptx` → GCS or R2, reference by URL (keeps the `.pptx` out of git history bloat)

**Check first:**

- `.claude/settings.local.json` — is it in `.gitignore`? If yes, leave alone. If no, commit the allow-list expansion.

**Potentially drop:**

- `.workflow/CURSOR_OVERNIGHT_COPY_FIXES.md` if it's a batch runbook that's already been executed
- `.workflow/CURSOR_OVERNIGHT_TEARSEET.md` if stale

---

## Next Steps

1. Chase reviews this audit
2. For items tagged **REVIEW**, decide: commit / drop / amend
3. Execute the 7 recommended commits in order
4. Resolve the `.pptx` and `settings.local.json` questions
5. Push to `origin/main` when complete

*Audit generated 2026-04-16. Re-run if more than a day elapses before decisions are made — working state drifts fast.*
