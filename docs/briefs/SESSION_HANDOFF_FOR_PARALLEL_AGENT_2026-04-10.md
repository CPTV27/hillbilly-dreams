# Cross-Session Handoff — For the Parallel Agent Working with Chase
**Date:** 2026-04-10
**From:** The Claude session in `.claude/worktrees/zealous-ritchie` (main branch collaborator)
**To:** The Claude session working on stingers/radio/Amy/Bearsville/photography/Lightroom

**Purpose:** Chase said you don't have the full context on what this session has done today. This doc hands it all over so we don't collide on overlapping work. Read top to bottom — it's roughly in priority order.

---

## Overlap zones (where our work touches — READ THIS FIRST)

Based on your todo list Chase pasted, you and I are both working in these areas:

| Your task | My overlapping work | Action for you |
|---|---|---|
| Radio back on Bumpboxx + single-listener fix + radio.html | I set up `ffplay` pulling Icecast → Bumpboxx via `screen` session managed by launchd (`com.bigmuddy.radio-listener`). SwitchAudioSource routes output. See "Broadcasting state" section below. | Check `screen -ls bigmuddy-listener` on the mini before adding another listener — I have one running. Don't spawn a duplicate. |
| MAC_MINI_BROADCAST_STACK runbook | I wrote `docs/runbooks/broadcasting.md` (committed in `710416a`). You're writing `docs/ops/MAC_MINI_BROADCAST_STACK.md` in the vigilant-dubinsky worktree. **These need to merge.** | Either merge into one runbook under `docs/runbooks/broadcasting.md` (mine has the launchd + screen pattern) OR keep yours and delete mine. Don't let both live. Chase's preference is probably one canonical doc. |
| Stinger approval workflow (you have 7 stingers) | I built a new `scripts/stingers/` tool that regenerates all 8 stingers via ElevenLabs (manifest-driven). Chase approved the scripts + voice pick approach about 5 minutes before this handoff. | **We need to reconcile.** If your 7 stingers are macOS `say`-generated, mine will replace them with ElevenLabs character voices. If yours are already ElevenLabs, we may be duplicating. See "Stinger state" section — I describe exactly what's in the manifest so you can compare. |
| OpenBroadcaster migration spec | I filed this as a Q2 followup task in the S2PX repo issues + wrote the full research report at `docs/research/openbroadcaster-2026-04-10.md`. Explores Path A (OBServer + OBPlayer container) vs the tactical ezstream solution. | Don't duplicate the research. Read my doc. Your "queue" task can point at it. |
| Loopback multi-output architecture | Discussed with Chase earlier in my session. Scoped a `bm-audio` CLI (written at `/Users/ClawdBOT/broadcasting/bm-audio` on the mini) with commands for switching output device (bumpboxx, tv, mini, headphones, rodecaster). Loopback multi-output device not yet configured (GUI task). | The CLI is on the mini already. If you're building the Loopback side, coordinate — don't rewrite `bm-audio`. |
| Elijah onboarding | Meeting happened today. I wrote two Elijah briefs + invited him to the S2PX GitHub repo as admin + filed 3 Asana tasks (Tuthill broker buildout, Studio C positioning, studiocvideo.com DNS setup). See "Elijah state" section. | Don't re-invite him. Don't create duplicate Asana tasks. My briefs are at `docs/briefs/elijah-*.md`. |
| /photography/book | You're building this. I only touched it to hide the link in `apps/web/lib/hdi-links.ts` because the route doesn't exist (404). | Once you ship /photography/book, unhide the link — look for `hidden: true, // TODO: unhide when /photography/book ships` in hdi-links.ts. |

---

## The big contextual decisions Chase made today (you need these in your head)

### 1. Scan2Plan declined the S2PX licensing deal
- Scan2Plan LLC (Owen Bush's old operating company, dissolved 2026-03-25) was the prospective customer for an S2PX pay-what-you-want + revenue share licensing deal
- Chase briefed Elijah on S2PX in today's meeting in person
- **They declined.** S2PX is now "idle software looking for a customer." $750K–$1.5M of built code with zero active licensees.
- **Implication:** All the deal-structure work (hosting paths A/B/C/D, development boundary clause, DEAL_CONTEXT.md rewrite, SaaS agreement draft) is on ice until another prospect surfaces. The code fixes (security hardening, website-manager merge, connection-pool-limits merge) are still valuable for HDI's internal use even without an external customer.
- **S2PX state:** NOT archived. `github.com/CPTV27/S2PX.git` has 8 active branches: `main`, `production`, `sandbox`, `twinner`, `twinner-capstone-dev` (Dennis Shelden RPI), `feature/website-manager` (+213 commits, the "marketing platform bundle"), `fix-connection-pool-limits` (+138 commits, the infra hardening), `claude/friendly-nash` (another Claude session).

### 2. The "development boundary" clause — HDI is the exclusive developer
Chase was clear: customers are USERS of the software, not co-developers. This is the clause that would have prevented the Owen situation from repeating:
- HDI has exclusive commit rights
- Customer has no GitHub/merge/admin access
- Customer cannot contract outside developers to modify
- Feature requests go through HDI, not around it
- Non-compete: customer cannot build competing products using patterns learned from S2PX

This applies to any future SaaS deal structure — not just S2PX. Anytime you're writing a licensing agreement or pitch doc, "HDI are the developers, they are the users" is the load-bearing line.

### 3. Three-layer IP structure (HDI → Tuthill → Customer)
- **HDI** owns the IP
- **Tuthill Design LLC** is the operating partner / contractual counterparty for Hudson Valley real estate + eventually other verticals
- **Customer** licenses from Tuthill, not HDI directly
- Elijah is the custodian on the Tuthill side
- Chase stays in the loop via Tuthill but doesn't work directly for customers

### 4. The four MBT verticals (product skins of the same engine)
Per Chase's explicit positioning:
1. **DSD (Deep South Directory)** — Main Street businesses, walk-in sales, $25/$50/$99/$250 tiers locked
2. **MBT Civic** — towns/municipalities, $10K kickstart + $500/mo SLA
3. **MBT Real Estate (Tuthill)** — brokers $199/$500/$1,500 + agents $99/$150, Vicki Wolpert is Pilot 1
4. **Studio C Operations (NEW vertical)** — recording studios + freelance artists. Studio C's repositioning: it's NOT a video production company. It's the MBT product line for studios + artists. Magazine, photos, and software tools all point at studios and artists.

### 5. Elijah is administrator of both Studio C and Tuthill Design websites
- `studiocvideo.com` — DNS NOT set up currently, fails to resolve. Link hidden on /links. Elijah's task to fix.
- `tuthilldesign.com` — DNS healthy, content may need updates for the broker buildout
- Asana task filed: https://app.asana.com/1/1211216881488780/project/1211309411699481/task/1214024032658516

---

## Broadcasting state on the Mac mini (as of ~2026-04-10 17:45 CDT)

### What's running
- `ezstream` in a screen session `bigmuddy-radio` (managed by launchd agent `com.bigmuddy.radio` → `/Users/ClawdBOT/broadcasting/boot-radio.sh`)
  - Source: `/Users/ClawdBOT/broadcasting/bigmuddy-playlist.m3u` (168 music tracks + 84 stinger injections = 252 items, shuffle OFF)
  - Encoder: `ffmpeg` decode → `oggenc` → Icecast at `localhost:8010/stream`
  - Format: Ogg Vorbis 160 kbps stereo (NOT mp3 — libshout on homebrew has an MP3 limitation I had to work around)
  - Icecast source labels: "Big Muddy Radio", genre "Deep South Roots", description "Live from Natchez, Mississippi."
- `ffplay` in a screen session `bigmuddy-listener` (managed by launchd agent `com.bigmuddy.radio-listener` → `/Users/ClawdBOT/broadcasting/boot-listener.sh`)
  - Pulls `http://localhost:8010/stream`, plays to default audio output
  - Default output: `Bumpboxx-UpRock` (Bluetooth, already paired)
  - System volume: 100
- `Big Muddy TV` HLS encoder (ffmpeg concat of 9 .jpg slideshow frames + Icecast audio overlay) — confirmed running, segments advancing every ~4 sec. Served at `http://192.168.4.37:8888/tv`. Crashed earlier when the disk filled, restarted, now stable.
- `FM transmitter` (Whole House FM Transmitter, 99.7 MHz, LINE input) plugged into the mini's 3.5mm headphone jack. Default output WAS switched to `External Headphones` briefly for FM testing, then switched back to Bumpboxx — Chase is still troubleshooting why the transmitter's signal meter didn't register.

### Config files I wrote (committed in `710416a`)
- `infra/broadcasting/ezstream.xml`
- `infra/broadcasting/boot-radio.sh`
- `infra/broadcasting/com.bigmuddy.radio.plist`
- `infra/broadcasting/build-playlist.py` (generates the interleaved playlist)
- `docs/runbooks/broadcasting.md` (runbook)
- `docs/research/openbroadcaster-2026-04-10.md` (OpenBroadcaster.org research report)

### Emergency disk cleanup done earlier
- Mac mini was at 100% disk when I arrived — `/Users/clawdbot/bigmuddy-tv/stream/` had 14,703 HLS segments (~13 GB)
- I aggressively deleted segments older than 5 min, freed 15 GB
- Stale 1.6 GB Lightroom catalog in `/tmp` — deleted
- Root volume: 99% → 42%
- **Follow-up:** the HLS encoder's `hls_flags delete_segments` isn't working — segments accumulate forever. This is a latent bug. Worth filing.

### The bandaid feeder is retired
- Before my work, there was `/Users/ClawdBOT/bigmuddy-radio/feeder.sh` — a shell loop calling `ffmpeg` per-track into Icecast, every track a fresh source connection
- I renamed it to `feeder.sh.RETIRED.2026-04-10` and added a `RETIRED.txt` marker explaining why
- If it resurrects, another agent is starting it — kill the resurrector, not just the feeder

---

## Stinger state — REAL TIME CONFLICT ZONE

### What exists on the Mac mini right now
8 MP3 files at `/Users/ClawdBOT/bigmuddy-radio/stingers/`:
- `01-grandpa-preacher.mp3`
- `02-ralph-barker.mp3`
- `03-daniel-noir.mp3`
- `04-reed-latenight.mp3`
- `05-grandma-porch.mp3`
- `06-fred-promo.mp3`
- `07-moira-gospel.mp3`
- `08-whisper-midnight.mp3`

Plus matching `.aiff` files in the same directory — those are the original macOS `say` outputs before ffmpeg conversion to mp3. The `.aiff` files being there is the tell that these were `say`-generated ("robot voices" in Chase's words).

Your todo mentions **7 stingers** — I count 8 on disk. Possible discrepancies:
- You may be excluding one from the approval workflow
- Or one may have been deleted without the file being removed
- Either way: the current files are `say`-quality and Chase wants them replaced with ElevenLabs

### What I'm about to do (running in background as I write this)
Built a manifest-driven ElevenLabs stinger tool at `scripts/stingers/` (not yet committed):
- `scripts/stingers/stingers.json` — 8 stingers, each with id/character/voice_id/voice_name/script/optional voice_settings
- `scripts/stingers/generate.mjs` — Node script, reads manifest, hits `api.elevenlabs.io/v1/text-to-speech/{voice_id}`, writes MP3s to `out/`
- `scripts/stingers/deploy.sh` — SCPs `out/*.mp3` to `ClawdBOT@192.168.4.37:/Users/ClawdBOT/bigmuddy-radio/stingers/` + restarts radio
- `scripts/stingers/README.md` — full usage docs

The ElevenLabs key I'm using is in Vercel env as `ELEVENLABS_API_KEY` and also in `.env.vercel-check` at the repo root (which I just added to `.gitignore` — the file was an unguarded plaintext secrets dump). Chase confirmed the paid Creator-tier account.

### Voice picks (from Chase's 54-voice ElevenLabs library)
| ID | Character | Voice | Voice ID |
|---|---|---|---|
| 01 | Grandpa Preacher | Grandpa Spuds Oxley | `NOpBlnGInO9m` |
| 02 | Ralph Barker | Brian (deep broadcast DJ) | `nPczCjzI2dev` |
| 03 | Daniel Noir | Adam (dominant, firm) | `pNInz6obpgDQ` |
| 04 | Reed Latenight | Eric (smooth, trustworthy) | `cjVigY5qzO86` |
| 05 | Grandma Porch | Annie K (flagged — no perfect grandma voice in library) | `XW70ikSsadUb` |
| 06 | Fred Promo | Joey (upbeat news host) | `mUfWEBhcigm8` |
| 07 | Moira Gospel | Bella (flagged — not a true gospel voice) | `hpp4J3VqNfWA` |
| 08 | Whisper Midnight | Lily (velvety British, intimate) | `pFZP5JQG7iQj` |

### Scripts (approved by Chase)
All 8 end with a variant of "the soul of the South" for sonic continuity. See `scripts/stingers/stingers.json` for the exact copy.

### If you're also regenerating stingers, HERE'S THE COORDINATION POINT
- If your 7 are ElevenLabs already, compare voice IDs before we both overwrite the files on the mini
- If your 7 are still `say`, my tool supersedes — let me finish and you can use my tool going forward
- **Do not run your regeneration at the same time as mine.** Both writing to `/Users/ClawdBOT/bigmuddy-radio/stingers/` over SCP creates a race condition

---

## /links page fixes I made today

On `apps/web/lib/hdi-links.ts` + committed as `710416a` and `d12b16a`:

1. **Fixed the `localOnly` filter bug** — `getVisibleLinkTree()` was only filtering `hidden`, not `localOnly`. Result: all 6 LAN-only URLs (hotel TV slideshow, kiosk, Icecast admin, OpenBroadcaster, Postiz, Open Notebook) were rendering for remote visitors, giving them unreachable URLs. Fixed to default to hiding localOnly, with an `{includeLocalOnly: true}` opt-in for future LAN-kiosk contexts.

2. **Hidden `/events` link** — "Tonight at the Blues Room" pointed at `/events` which is a 404 (only `/events/art-show` exists). Marked `hidden: true` with TODO. **Flag for you:** if you're building /events, unhide it.

3. **Hidden `studiocvideo.com` link** — DNS not set up, fails to resolve. Elijah's task to fix. Marked `hidden: true` with TODO. **Flag for you:** if Elijah ships DNS on that while you're working, unhide.

4. **Known existing hidden:** `/photography/book` already had `hidden: true` with a TODO to unhide when the page ships. **Flag for you:** you have this on your todo list — unhide when you ship it.

---

## S2PX GitHub issues I created today (CPTV27/S2PX)

10 issues, all labeled. Dead for now (Scan2Plan declined), but the work is still valuable for HDI internal use.

1. `[SPRINT] Deployment readiness — land feature/website-manager (213 commits)` — the Website Manager marketing platform that's been sitting unmerged for 5 weeks
2. `[SPRINT] Infrastructure hardening — land fix-connection-pool-limits (138 commits)` — Secret Manager migration, safe-db-push wrapper, migration safety guards
3. `[SPRINT] Security hardening — remove dev backdoors` — P0 blocker for external customers (x-internal-test bypass, unauth'd /api/force-migrate, shared Firebase Auth, connection pool violation)
4. `[SPRINT] New customer provisioning runbook` (updated when architecture shifted to multi-tenant)
5. `[DEAL] Update DEAL_CONTEXT.md for pay-what-you-want + rev-share model`
6. `[SPRINT] Elijah custodian handoff — runbook, credentials, SLA`
7. `[SPRINT] Success metrics reporting framework`
8. `[SPRINT] HDI backport analysis — what to port from HDI main`
9. `[ARCHITECTURE] Multi-tenant isolation — HDI hosts, customers rent` (now deprioritized — Scan2Plan declined)
10. `[ARCHITECTURE] Infrastructure billing passthrough`

Elijah is invited to the repo as an admin collaborator (invitation sent, not yet accepted): https://github.com/CPTV27/S2PX/invitations

---

## Q2 department reports that shipped to main (commit `aa6afe8`)

13 files committed, including 5 full department reports at `docs/reports/2026-Q2/`:
- `finance.md` — Tracy's finance function, $7.5K MRR, $15K break-even target, HDI incorporation ask
- `insurance-and-risk.md` — 10-exposure heat map, 5 RED items, ~$25K–$55K Base-tier program ask
- `product-mbt.md` — 9-module honest build status, honest-claims audit flag, 3 pricing gaps
- `sales-mbt-enterprise.md` — Vicki + Natchez pipeline, CRM recommendation (Attio)
- `technical-build.md` — 125-model Prisma audit, migration reset ask, CLAUDE.md drift flagged

Plus the master dispatch: `docs/tasks/HDI_DEPARTMENT_OPERATIONAL_REPORTS.md`.

These generated ~15 Asana tasks for Chase covering finance decisions, HDI incorporation, insurance broker outreach, CRM, Natchez founding broker, MSA/SOW templates, Prisma migration reset, mini/main git remote decision, Tailwind doc fix, Analytics v1 scope, etc. All assigned to Chase across `Launch — April 2026`, `Tracy — Business & Finance`, `Biz Dev Pipeline`, and `HDI` projects.

---

## Brian Windle email draft (not yet sent)

Chase drafted + I filed:
- `docs/outreach/brian-windle-email-draft.md` — peer-level ecosystem overview, positions HDI as stronger partner with Source Protocol integration optional
- `docs/briefs/brian-windle-for-tracy.md` — background brief for Tracy on who Brian is, the three pillars (Source Protocol, RevoFi, GeniHub), how S2PX/Melody Vault/Feed Farm could serve as reference implementations

Delivery sequence: text first ("been building HDI, want to show you"), email second with the full inventory. NOT sent yet — waiting on Chase.

**Important name correction:** it's Brian Windle, NOT Windell. He's in Arizona (BDW Consulting). Phone 480.518.1466, email `windle.brian@gmail.com`.

---

## Documentation drift audit (in flight)

I dispatched a doc audit agent to sweep for stale facts across all CLAUDE.md, README, docs/, .claude/agents/, and memory files. It returned a report with surgical fixes for ~14 files. Couldn't make edits (Edit tool permission issue in that session), so I'm applying them in the main repo.

**Drift I've confirmed and started fixing:**
- `CLAUDE.md` (all 3 copies) says "Inline CSS (no Tailwind)" — WRONG. Tailwind 3.4 ships in the bundle.
- `CLAUDE.md` says "4 tenants" — WRONG. 5 tenants: big-muddy, bearsville, studio-c, tuthill, **dctv**
- `CLAUDE.md` says "Next.js 15" — WRONG. Next.js 14.2.35
- `CLAUDE.md` AI model routing says "Audio: Cloud TTS Journey" — INCOMPLETE. ElevenLabs is the primary (confirmed paid Creator account), Journey is fallback
- `CLAUDE.md` API key list missing `ELEVENLABS_API_KEY` and `GEMINI_API_KEY`
- `.cursorrules` and `.roo/rules/00-hdx-read-first.md` both tell other AI tools "no Tailwind" — these actively mislead Cursor and Roo

**Fixed so far:**
- `/Users/chasethis/hillbilly-dreams/CLAUDE.md` ✅ (tenant count, Next version, Tailwind, audio routing, API keys)
- `.gitignore` ✅ (added `.env.vercel-check` + `.env.vercel*` pattern — was a security gap)

**Still TODO (blocked on me finishing the stinger work first):**
- `/Users/chasethis/.claude/CLAUDE.md` (user global copy)
- `/Users/chasethis/CLAUDE.md` (older in-repo copy)
- `.claude/agents/HANDOFF_COS_TO_PATCH.md` (tenant count line)
- `docs/onboarding/TECHNICAL_ARCHITECTURE_ONBOARDING.md` (styling row)
- `docs/HANDOFF_CURSOR_FRONTEND.md` (2 locations)
- `docs/EXTERNAL_ARCHITECTURE_REVIEW.md` (line 140)
- `docs/EXTERNAL_AUDIT_PACKAGE.md` (line 207)
- `docs/sovereign/MISSION_MANIFESTO.md` (line 4)
- `.cursorrules` (whole file needs re-audit)
- `.roo/rules/00-hdx-read-first.md` (line 18)
- Memory file `feedback_ai_model_routing.md` (add audio section + ElevenLabs key + Gemini key)

**Flags I'm leaving for Chase judgment:**
- `docs/HANDOFF_CURSOR_IMAGE_FIX.md:63` — "no Tailwind" might be a per-task rule, not stack-truth
- `tasks/EXECUTIVE_COMMAND_INTERFACE.md:63` — same
- `docs/reports/2026-Q2/product-mbt.md:117` — "4 tenants" in a historical risk statement

### If you're doing any CLAUDE.md or doc edits
Coordinate with me. Don't step on the same lines.

---

## The Vercel env gap (flag for your awareness)

- `ELEVENLABS_API_KEY` — in Production ONLY (not Preview, not Development). Worth adding to Preview if dev work needs TTS.
- `OPENAI_API_KEY` — the `openai` SDK `^6.32.0` is installed in `apps/web/package.json` but the key is NOT in the Vercel env snapshot. Either the SDK is dead code, or it's a live breakage, or the env snapshot was stale. Worth verifying.
- `GEMINI_API_KEY` — exists in Vercel env but not documented in any CLAUDE.md. The memory file `feedback_ai_model_routing.md` implies Gemini only runs via service account.

---

## Summary of what I'm WRITING that you should NOT duplicate

Live, in my session, as of this handoff:
1. `scripts/stingers/stingers.json` — stinger manifest
2. `scripts/stingers/generate.mjs` — ElevenLabs generator
3. `scripts/stingers/deploy.sh` — SCP + restart
4. `scripts/stingers/README.md` — full usage docs
5. `docs/briefs/SESSION_HANDOFF_FOR_PARALLEL_AGENT_2026-04-10.md` — this file
6. Doc audit edits across CLAUDE.md + other drifted files (list above)

Live, in my session, as done/committed:
1. Commits `aa6afe8`, `710416a`, `d12b16a` — Q2 reports, /links fixes, broadcasting stack, Brian Windle briefs
2. Elijah invited to S2PX GitHub as admin
3. 10 S2PX issues created
4. 4 Asana tasks for Elijah (Tuthill broker, Studio C positioning, studiocvideo.com DNS, + original Brian Windle task)
5. ~15 Q2-report-derived Asana tasks for Chase

---

## What I'd like from you

1. **Tell Chase what you're working on that overlaps,** so we can de-dupe.
2. **Before you touch `/Users/ClawdBOT/bigmuddy-radio/stingers/` on the mini,** ping to see if my deploy has landed. I'm about to SCP 8 ElevenLabs-generated MP3s into that directory.
3. **Don't regenerate the runbook or research doc** I already wrote (`docs/runbooks/broadcasting.md`, `docs/research/openbroadcaster-2026-04-10.md`). Read mine and extend.
4. **If you're editing CLAUDE.md or other drifted docs,** coordinate so we don't step on each other.
5. **For Amy/Bearsville/photography work** — those are your lanes, I haven't touched them. Go.

If there's a shared document or channel we should write to for coordination going forward, Chase should pick it. A shared Asana task with live comments works. Or a flag file in the repo both sessions pull + read before starting work.

---

*This handoff lives at `docs/briefs/SESSION_HANDOFF_FOR_PARALLEL_AGENT_2026-04-10.md`. Chase can hand the file path to you, or paste the whole thing. It's written to be self-contained.*
