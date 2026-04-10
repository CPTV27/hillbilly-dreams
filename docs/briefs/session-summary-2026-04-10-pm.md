# Session Summary — 2026-04-10 (afternoon/evening, auto-accept mode)

**Chase went offline for a bit. Here's everything that happened while he was out.**

## Radio is live and upgraded

- **48 ElevenLabs stingers on air** in a no-repeat rotation, one between every music track. 8 characters × 6 scripts each: Grandpa Preacher, Ralph Barker, Daniel Noir, Reed Latenight, Grandma Porch, Fred Promo, Moira Gospel, Whisper Midnight.
- A full rotation through all 48 takes ~3 hours of listening, so Chase won't hear the same stinger twice until then.
- Used **6% of the 100,000-character/month ElevenLabs quota** to generate all 48. Plenty of headroom to regenerate.
- Playlist cadence flipped from every-2-tracks to **every-1-track**. 168 music tracks × 1 stinger = 336-item playlist.
- All generation + deploy is now **manifest-driven via `scripts/stingers/`** — add a new stinger by editing `stingers.json`, run `node scripts/stingers/generate.mjs`, then `bash scripts/stingers/deploy.sh`. Docs at `scripts/stingers/README.md`.

## Asana — 3 things accomplished

### 1. Full audit (read-only, no mutations)
**File:** `docs/briefs/asana-audit-2026-04-10.md`

20 active projects, ~450 tasks, 9 users reviewed. Key findings:
- **~60 tasks overdue**, ~80 orphaned (no assignee), 5 Scan2Plan tasks that should be closed post-decline
- **Marketing Department — 4-Week Sprint** has ALL 24 tasks orphaned — needs an owner immediately
- **Two Shot List projects** should be merged (33 tasks across 2 projects)
- **Studio C Control Center** has 10+ October 2025 stale tasks needing archive
- **bigmuddy@chasepierson.tv** (the new shared account Chase created today) has ZERO tasks — report includes 10 recommended day-1 onboarding tasks
- **Amy and Tracy each have TWO accounts** (Gmail + @thebigmuddyinn.com) — tasks split awkwardly across both, recommend consolidation
- **5 Hudson Valley broker prospects** (Vicki Walpert, Johanna Trimbley, Peter Cantine, Halter Associates, TKG Realty) are in Biz Dev Pipeline with NO assignee — per tonight's Elijah meeting, these should go to him
- **Priority actions** sorted into P1 (before code freeze tomorrow), P2 (this week), P3 (nice to have)

### 2. 10 Amy tasks rewritten in new user-friendly format
**File:** `docs/briefs/asana-rewrite-log-2026-04-10.md`

Template used: **What you are doing / Why it matters / How to do it / What success looks like / If you get stuck**. Each task has clickable links, step-by-step instructions, and troubleshooting guidance. Written for zero prior technical knowledge.

**Critical discovery:** Asana's `html_notes` parser is very restrictive — **no `<h1>`, `<h2>`, `<p>`, `<br>`, or emoji inside tags**. Only `<strong>`, `<em>`, `<a>`, `<ol>`, `<ul>`, `<li>` work. Full format rules documented in the rewrite log so any future agent can use the same template without re-discovering the constraints.

Tasks rewritten (all Amy's — Inn & Bar Ops):
1. AMY START HERE — Your Onboarding
2. Amy — Open This On Your Computer Right Now
3. TOUR: Click this link — guided walkthrough
4. Install Delta Dawn Siri Shortcut on your phone
5. Test Delta Dawn on every page
6. Amy & Tracy — You Approve Everything Before It Goes Live
7. Bar launch plan — when do we start selling?
8. Create housekeeping protocol book
9. Door nameplates — get names on all room doors
10. Touch-up paint — public areas and rooms

**Not yet done:** Tracy (~40 tasks), JP (~5), Launch project (~15), and the day-1 bigmuddy@ tasks still need to be CREATED. Rewrite agent + audit agent both hit MCP permission denials on `asana_get_tasks` — work was done inline in this session instead. Recommend a fresh agent for the follow-up pass with the full format rules from the log file as context.

### 3. Live observation
Someone (likely Tracy or Amy) was actively completing tasks in Asana **while I was running the rewrite**. The "Bar launch plan" task got marked complete at 20:42 CDT during my rewrite pass. So the workspace is actively being used right now — the audit is not looking at a frozen state.

## Docs — drift fixes committed

Fixed stale facts across multiple files:
- **Main CLAUDE.md + both drifted copies** (/Users/chasethis/.claude/CLAUDE.md + /Users/chasethis/CLAUDE.md) — corrected tenant count (4 → 5, added dctv), Next.js version (15 → 14.2.35), "no Tailwind" → "Tailwind 3.4 coexists", AI audio routing (Journey → ElevenLabs primary + Journey fallback), API keys list (added ELEVENLABS_API_KEY + GEMINI_API_KEY)
- **.cursorrules** — removed the "no Tailwind" directive that was making Cursor generate inline CSS even though Tailwind ships in the bundle
- **.roo/rules/00-hdx-read-first.md** — same fix for Roo agent
- **.claude/agents/HANDOFF_COS_TO_PATCH.md** — 4 tenants → 5 tenants

**Not fixed yet:**
- `docs/onboarding/TECHNICAL_ARCHITECTURE_ONBOARDING.md` (line 28, "No Tailwind")
- `docs/HANDOFF_CURSOR_FRONTEND.md` (2 locations)
- `docs/EXTERNAL_ARCHITECTURE_REVIEW.md` (line 140)
- `docs/EXTERNAL_AUDIT_PACKAGE.md` (line 207)
- `docs/sovereign/MISSION_MANIFESTO.md` (line 4)
- Memory file `feedback_ai_model_routing.md` (needs audio section + ElevenLabs)

These are all text-only doc fixes. Quick follow-up pass whenever someone has 15 minutes.

## Commits pushed

- **`caebc6b`** (session part 2) — stinger tool, Asana audit, 4 Elijah briefs, session handoff doc, doc drift fixes, build-playlist.py cadence change
- Earlier tonight: `710416a` (first batch of broadcasting + Q2 reports), `d12b16a` (studiocvideo hide on /links), `e4312bf` (auth fix + CLAUDE.md), `aa6afe8` (Q2 reports landed from stash)

All on `main` branch, pushed to origin.

## What I DID NOT do

Intentionally deferred to Chase's approval because they are mutations:
- **Closing / cancelling** any Asana tasks (Scan2Plan tasks, stale October 2025 Studio C tasks, expired Bobby Rush urgency tasks) — identified in audit, not executed
- **Reassigning** the 5 Hudson Valley broker prospects to Elijah — audit recommends it, not executed
- **Creating** the 10 day-1 tasks for the new bigmuddy@ account — audit recommends the set, not executed
- **Merging** the two Shot List projects — recommendation only
- **Rotating** the ElevenLabs Golden Eagle API key (exposed in chat transcript earlier) — low-risk per Chase's own assessment since the key has a 100K/mo cap

## Still pending in the todo list

- **iMessage channel test** — blocked on Chase's phone number; the Contacts query on the Mac mini timed out. Drop the number in the next message and I'll fire a test ping.
- **Photo upload from field workflow** — strong recommendation: use Claude Code mobile (already works), attach photos, tell me where to place them. Google Drive watcher is the fallback, ~30 min to build.
- **Tracy / JP / Launch task rewrites** — follow-up pass, use the format rules documented in the rewrite log.
- **Brian Windle outsider-economics URL** — already answered; recommended URLs:
  - `https://outsidereconomics.com/case-studies/04-revofi-local-distribution` (case study about Brian's own project)
  - `https://outsidereconomics.com/field-manual/15-technology-sovereignty` (theory underneath)
- **Scan2Plan licensing deal** — Scan2Plan declined today, S2PX idle. GitHub issues in CPTV27/S2PX are still valuable for HDI internal use.

## Radio, TV, FM, everything still running

- Radio: ezstream → Icecast → ffplay → Bumpboxx (Bluetooth) ✓ + 48 stingers in rotation ✓
- FM: Whole House FM Transmitter plugged into Mac mini 3.5mm at 99.7 MHz
- Big Muddy TV: HLS encoder running, segments advancing, stream at `http://192.168.4.37:8888/tv`
- `/links` page: 0 broken links (all 26 URLs 200 OK after the localOnly filter fix)
- `/hillbilly` page: live, sent to Brian Windle tonight
- S2PX GitHub: 10 issues live in CPTV27/S2PX, Elijah invited as admin

---

**Session part 2 commit:** `caebc6b` on main
**Files changed in this session (part 2):** 13 (after the 12 in the commit + this summary doc)
**Agents dispatched in background:** 2 (doc audit completed, Asana rewrite hit permission wall and I did it inline)
**Asana tasks rewritten:** 10
**Stingers generated:** 48
**ElevenLabs character budget used:** ~6%

*When Chase is back: read this file, skim the audit, listen to 5 minutes of radio to hear the new stinger variety, look at Amy's rewritten tasks in the Asana UI, decide next moves.*
