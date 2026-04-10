# Asana Task Rewrite Log — 2026-04-10

**Objective:** Rewrite HDI Asana tasks in a user-friendly format (markdown-styled, clickable links, full explanations, assume zero prior knowledge) so Amy, Tracy, and JP can use them without asking Chase what anything means.

**Scope completed:** 10 of Amy's highest-priority tasks in the **Amy — Inn & Bar Ops** project (and one cross-project onboarding task in HDI).

**Not yet done (scope deferred):** Tracy — Business & Finance (~40 tasks), JP — Shows & Programming (~5 tasks), Launch — April 2026 (~15 tasks), bigmuddy@ day-1 tasks (don't exist yet).

---

## The template used

Every rewrite follows this structure. Chase can copy it for future rewrites.

**IMPORTANT format constraints** — discovered through trial and error with Asana's html_notes parser:

- Wrap content in `<body>...</body>`
- Use `<strong>` for section headers (NOT `<h1>`, `<h2>`, or `<p>` — they fail with "XML is invalid")
- Use `<ol><li>` and `<ul><li>` for lists (they work correctly)
- Use `<a href="https://...">display text</a>` for clickable links
- Use `<em>` and `<strong>` for inline emphasis
- **NO emoji in HTML tags.** Asana's XML parser rejects 4-byte UTF-8 characters inside tag markup. Emoji is fine in text content of the TASK TITLE but NOT inside html_notes tags.
- **NO `<br>` or `<br/>`.** Use plain newlines between sections for spacing.
- **NO `<p>` tags.** Asana rejects them. Just use plain text between `<strong>` sections.

### The template
```html
<body><strong>What you are doing</strong>
[1-2 sentence plain-English description. No corporate jargon.]

<strong>Why it matters</strong>
[1-2 sentence business context. Why this is not busywork.]

<strong>How to do it</strong>
<ol><li>First step with <a href="https://url">clickable link</a></li><li>Second step</li><li>Third step</li></ol>
<strong>What success looks like</strong>
[Observable finished state. "When you can X, you are done."]

<strong>If you get stuck</strong>
<ul><li><strong>Problem one:</strong> solution</li><li><strong>Problem two:</strong> solution</li><li><strong>Problem three:</strong> solution</li></ul></body>
```

### Voice rules
- Write in **Chase's voice** — direct, warm, zero corporate fluff
- **First person singular** when Chase is the narrator ("I need you to..." or "Chase wants...")
- **Absolute URLs** only (`https://bigmuddytouring.com/...` never `/...`)
- **Assume zero technical knowledge** — explain jargon inline the first time it appears
- **Under 800 words per task** — if a rewrite is getting longer, simplify the task itself
- **Use straight apostrophes and quotes** — no curly quotes, em dashes are fine

---

## Tasks rewritten (10)

| # | GID | Title | Project | Due | Notes |
|---|---|---|---|---|---|
| 1 | 1213911798896813 | AMY START HERE — Your Onboarding (30 min) | Hillbilly Dreams Inc | 2026-04-03 | Overdue onboarding task, now has a real walkthrough |
| 2 | 1213966802945296 | Amy — Open This On Your Computer Right Now | Amy — Inn & Bar Ops | 2026-04-06 | Workstation setup, explains why laptop > phone |
| 3 | 1213965326394294 | TOUR: Click this link — guided walkthrough | Amy — Inn & Bar Ops | 2026-04-05 | 5-minute HDI portfolio tour, explains the two-node story |
| 4 | 1213942117102917 | Install Delta Dawn Siri Shortcut on your phone | Amy — Inn & Bar Ops | 2026-04-05 | iPhone Shortcut setup with step-by-step Safari instructions |
| 5 | 1213946030636421 | Test Delta Dawn on every page — tap DD button, ask a question | Amy — Inn & Bar Ops | 2026-04-05 | QC task framed as "you are the human in the loop" |
| 6 | 1213948107144798 | Amy & Tracy — You Approve Everything Before It Goes Live | Amy — Inn & Bar Ops | 2026-04-06 | Editorial gate role explained, approval workflow documented |
| 7 | 1213864768832869 | Bar launch plan — when do we start selling? | Amy — Inn & Bar Ops | 2026-04-07 | Full bar launch playbook (completed by Tracy/Amy during this rewrite pass, ✓) |
| 8 | 1213865196494703 | Create housekeeping protocol book | Amy — Inn & Bar Ops | 2026-04-07 | Full SOP template with 6-step checklist hierarchy |
| 9 | 1213864768576375 | Door nameplates — get names on all room doors | Amy — Inn & Bar Ops | 2026-04-11 | Physical signage playbook with sourcing options |
| 10 | 1213865198212393 | Touch-up paint — public areas and rooms | Amy — Inn & Bar Ops | 2026-04-14 | Yearly maintenance schedule with photo-audit approach |

## Tasks SKIPPED (with reason)

None of Amy's active tasks were skipped — I worked through them in priority order and stopped at 10 to preserve quality over quantity.

**Broader project skips** (from the original scope plan):
- **Hillbilly Dreams Inc** — dump project, 100+ tasks, mostly Chase's technical backlog (not user-facing)
- **Biz Dev Pipeline** — Chase + Elijah scope, not end-user friendly
- **Studio C Control Center** — 10+ October 2025 stale tasks that need archiving before rewriting
- **Music & Entertainment — Big Muddy Records** — 75+ tasks, many are "Review: [artist]" items that should be batched into tiered decisions, not individually rewritten
- **Marketing Department — 4-Week Sprint** — all 24 tasks are orphaned (no assignee), rewriting would not help until ownership is assigned
- **Shot List** projects — should be merged first before rewriting
- **Small projects** (Big Muddy Magazine, Radio, Touring, Deep South Directory, Bearsville Creative) — small and mostly clean already

## Critical discovery — Asana html_notes format constraints

The Asana MCP's `html_notes` field is MUCH more restrictive than standard HTML. These findings are documented in case Chase or a future agent needs to write a rewrite pass:

**WORKS:**
- `<body>...</body>` (required wrapper)
- `<strong>`, `<em>`, `<u>`, `<s>` inline formatting
- `<a href="...">link text</a>` clickable links
- `<ol><li>...</li></ol>` ordered lists
- `<ul><li>...</li></ul>` unordered lists
- Plain newlines for paragraph breaks
- Emoji in text content (inside `<li>`, `<strong>`, plain text)
- Straight apostrophes, quotes, em dashes, en dashes

**FAILS with "XML is invalid":**
- `<h1>`, `<h2>`, `<h3>` — heading tags (use `<strong>` instead)
- `<p>` — paragraph tags (use plain text with newlines)
- `<br>` or `<br/>` — line break tags (use plain newlines)
- Emoji inside tag markup (e.g., `<h2>🎯 heading</h2>` fails because the parser chokes on the 4-byte UTF-8 character near the tag)
- `<h2>` even without emoji — apparently heading tags are just not supported

**Note:** The `notes` field in the API response is the plain-text flattened version of `html_notes`. When Amy opens the task in the Asana UI, she SHOULD see clickable links, bolded sections, and list formatting — but the plain text API response strips all that. To verify visual formatting, check in the Asana web UI, not the JSON.

## Recommended next pass

When Chase wants Tracy + JP + Launch done, dispatch a FRESH agent with:
1. This log file as context (so it uses the same template without re-discovering the format constraints)
2. Permission for `asana_get_tasks` AND `asana_update_task` (the audit agent was blocked on get_tasks, ended up doing this work inline)
3. A hard cap of ~40 tasks per session to preserve quality

**Priority order for the next pass:**
1. Tracy's overdue operational tasks (liquor license, IRS payment, financial review, RESEARCH tasks)
2. Tracy's onboarding series 1-12 (but skip the 3 that are already marked complete)
3. JP's 5 active show/booking tasks
4. Launch — April 2026 critical path tasks (soft launch April 17, full launch April 27)
5. Day-1 bigmuddy@ tasks (doesn't exist yet — need to CREATE not rewrite)

---

*10 tasks rewritten, ~200 words to ~800 words each. Total content added to Amy's visible Asana queue: ~5,000 words of plain-English instructions. Amy should be able to work every rewritten task without asking Chase a single clarifying question.*
