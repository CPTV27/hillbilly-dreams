# Handoff → Chief of Staff (CoS)

**From:** Mac Mini Agent (ClawdBOT @ 192.168.4.37)
**Date:** April 10, 2026
**Subject:** Stashes, hidden systems, and running services on the Mac mini you may not have seen yet

---

## TL;DR

The Mac mini has **more going on than the last handoff documented**. A previous session built an entire radio broadcasting stack that's currently live, plus there's a Hillbilly Dreams monorepo stash on T7 with a full task backlog, a vault of strategy docs, and 40+ architectural markdown files. This doc inventories everything so you can route work without re-discovering it.

---

## 1. RUNNING LAUNCHD SERVICES (Mac mini, right now)

| Label | Status | What it does | Who built it |
|---|---|---|---|
| `com.bigmuddy.radio` | Running | Boots the ezstream → Icecast radio broadcast via screen session (`boot-radio.sh`) | **Previous session — not me** |
| `com.bigmuddy.radio-listener` | Running | Boots a listener monitor (`boot-listener.sh`) | **Previous session — not me** |
| `com.bigmuddy.tv-stream` | Running | HLS slideshow stream (9 photos, 90-sec loop) | Me (April 9) |
| `com.bigmuddy.tv-server` | Running | Node HTTP server on port 8888 serving `/tv`, `/kiosk`, `/stream/*` | Me (April 9) |
| `com.bigmuddy.room-recorder` | **Currently broken/stopped** | Rolling 60-min audio from Continuity Camera mic | Me (April 9) — died when Chase AirPlayed |

**Important:** The `com.bigmuddy.radio` and `com.bigmuddy.radio-listener` plists were already on this machine when I started working today. I did NOT create them. They came from an earlier session (probably the marathon work referenced in `HANDOFF_PRIMETIME_FINAL_2026-04-08.md`). There's a real radio broadcasting system here.

---

## 2. THE BROADCASTING STACK (stash you haven't seen)

Located at `/Users/clawdbot/broadcasting/` — this is a full radio station setup:

```
broadcasting/
├── bigmuddy-playlist.m3u          (337 lines — the active playlist)
├── bigmuddy-playlist.m3u.every-2-tracks.bak
├── bigmuddy-playlist.m3u.before-replay
├── bigmuddy-playlist.m3u.before-fred-strip
├── bm-audio/                       (audio assets)
├── boot-listener.sh                (launchd target)
├── boot-radio.sh                   (launchd target)
├── build-playlist.py               (playlist builder)
├── ezstream.xml                    (ezstream config — live)
├── ezstream-mp3.xml.bak
├── ezstream-stderr.log
├── ezstream-stdout.log
├── ezstream-wrapper.log
├── ob-player-src/                  (OpenBroadcaster player source?)
├── run-ezstream.sh
└── test-tone-1khz.wav
```

And a **second** broadcasting directory at `/Users/clawdbot/bigmuddy-radio/` with a different purpose:

```
bigmuddy-radio/
├── RETIRED.txt                     (something got retired here)
├── feeder.log
├── feeder.sh.RETIRED.2026-04-10    (retired TODAY)
├── generate-promo.sh
├── playlist.txt                    (168 lines)
├── playlog.txt
├── promos/                          (6 AI-generated voice promos)
│   ├── duffy-daniel.{mp3,aiff}
│   ├── duffy-grandpa.{mp3,aiff}
│   └── duffy-ralph.{mp3,aiff}
└── stingers/                        (11 station IDs — multiple voices)
    ├── 01-grandpa-preacher.{mp3,aiff}
    ├── 02-ralph-barker.{mp3,aiff}
    ├── 03-daniel-noir.{mp3,aiff}
    ├── 04-reed-latenight.{mp3,aiff}
    ├── 05-grandma-porch.{mp3,aiff}
    ├── 06-fred-promo.{mp3,aiff}
    └── ...
```

**There are 6 AI-voiced station stingers already produced** — grandpa-preacher, ralph-barker, daniel-noir, reed-latenight, grandma-porch, fred-promo. These are character voices for the radio imaging. Someone (likely ElevenLabs pipeline at `/Volumes/T7/BigMuddy/scripts/elevenlabs-production-run.js`) generated these. They're ready to use but I don't know if they're wired into the current ezstream rotation.

There's also a **note about Fred being "stripped"** from the playlist (`bigmuddy-playlist.m3u.before-fred-strip`). Something happened with the Fred character that got reverted/cleaned up.

---

## 3. THE HILLBILLY DREAMS STASH (T7)

`/Volumes/T7/BigMuddy/hillbilly-dreams/` — this is a **separate monorepo** from the main `Sites/bmt/` repo. It's 35+ directories deep with its own:

- `apps/`, `packages/`, `plugins/`, `prototypes/`, `experiments/`
- `content/`, `assets/`, `DeepLore/`
- `outsider-economics-v2/` (sub-project)
- `terraform/`, `docker/`
- `bmt.code-workspace` (VSCode workspace)
- `pnpm-workspace.yaml` (it's a pnpm monorepo like the main one)
- 40+ markdown docs in `docs/`

**Selected docs in `hillbilly-dreams/docs/` the CoS should know exist:**

| Doc | Why it matters |
|---|---|
| `BUSINESS_ARCHITECTURE.md` | Full business structure |
| `MCKINSEY_FINANCIAL_ANALYSIS.md` | Financial modeling |
| `PE_AUDIT_REPORT.md` | Private equity audit |
| `GOOGLE_ENGINEERING_AUDIT.md` | Engineering review |
| `COMPETITIVE_ANALYSIS_2026.md` | Competitive landscape |
| `GRANT_STRATEGY.md` | Grant funding approach |
| `DSD_CUSTOMER_LTV_ANALYSIS.md` | Deep South Directory LTV math |
| `HDI_BRAND_HIERARCHY_ANALYSIS.md` | Brand hierarchy |
| `ORIGIN_PROJECTS.md` | Origin story documentation |
| `BRAND_FONT_FIREWALL.md` | The "no hardcoded fonts" rule origin |
| `CLOUD_SQL_CUTOVER.md` | Database migration plan |
| `EDITORIAL_CADENCE.md` | Publishing rhythm |
| `FEATURE_TIERS.md` | Product tier structure |
| `PHOTO_INGESTION_PIPELINE.md` | Photo pipeline spec |
| `PRODUCT_CAPABILITIES.md` | Full product catalog |
| `PRODUCT_DEFINITIONS_V2.md` | V2 product definitions |
| `PROMOTION_PIPELINE.md` | Promo workflow |
| `CONTENT_AUDIT_APRIL_2026.md` | Content audit from this month |

There's also a **tasks/** folder with active backlogs:

- `BEARSVILLE_CREATIVE_BACKLOG.md` — Tracks the Bearsville Media Group → Bearsville Creative rename (BC-01 through BC-??), Utopia Studio Mode (BC-02), and Display Channel seed failure.
- `EXECUTIVE_COMMAND_INTERFACE.md` — Spec for `/admin/command` mobile layer. Chase wants "bed-mode" management. ECI-01 through ECI-03 mapped out. This is **assigned work that hasn't been started** (or has been started and not reported).
- `PENDING_ISSUES_QUEUE.md` — GitHub issues waiting to be filed via `gh issue create`. Includes Stripe Connect webhooks, Prisma EPERM build cache fix, and more.
- `lessons.md` — Lessons learned log.

And a **vault/** folder with strategy docs:

- `vault/07-Strategy/KioskMode — Bring Your Own Glass.md`
- `vault/07-Strategy/Sunday Menu — March 23.md`
- `vault/07-Strategy/The Fractal Thesis.md`
- `vault/07-Strategy/The Hillbilly Dreams Engine.md`

The **Fractal Thesis** and **Hillbilly Dreams Engine** are strategy docs that, based on the filenames, are likely the conceptual backbone of the whole operation. Worth reading before making architectural decisions.

---

## 4. THE BIG MUDDY MEDIA PIPELINE STASH (T7)

`/Volumes/T7/BigMuddy/scripts/` — Node.js media processing pipeline:

```
scripts/
├── HANDOFF_DAM_PIPELINE_2026-04-01.md      (DAM handoff from 9 days ago)
├── INGESTION_FAILURES_AUDIT.md              (what broke)
├── elevenlabs-production-run.js             (voice gen — makes the stingers)
├── generate-radio-scripts.js                (radio script generator, 40KB)
├── ingest-music.js                          (music ingestion)
├── process-event-photos.js                  (event photo processor)
├── process-photos.js                        (photo processor, 30KB)
├── rolling-buffer.js                        (rolling media buffer)
├── second-pass-tags.js                      (AI tag second pass, 37KB)
├── sync-lightroom-to-web.js                 (Lightroom → web sync)
├── package.json
└── node_modules/
```

This is a **production-grade media pipeline** that processes photos, generates radio scripts, syncs Lightroom catalogs, and generates voice content via ElevenLabs. Most of it was built by a previous session. The CoS should know this exists before assigning anyone new work in the media/DAM space.

---

## 5. T7 ROOT: DOCUMENTATION YOU LISTED + MORE

You already have these from your sync:
- `IDEAL_ARCHITECTURE_2026-04-08.md`
- `PRODUCT_DEVELOPMENT_PIPELINE.md`
- `CONTENT_INGESTION_SOP.md`
- `HANDOFF_PRIMETIME_FINAL_2026-04-08.md`

**You may not have these:**

| Doc | Content |
|---|---|
| `BROADCASTING_CAPABILITIES.md` | Full broadcast stack spec (this is the doc CLAUDE.md references but Primetime said didn't exist — it's HERE, 18KB) |
| `AUDIT_REQUEST_2026-04-08.md` | Audit request from 2 days ago |
| `GUEST_WIFI_SPLASH_SPEC.md` | Guest WiFi captive portal spec |
| `HANDOFF_2026-04-07.md` | Earlier handoff (before the Primetime series) |
| `HANDOFF_PRIMETIME_2026-04-08.md` | Mid-day Primetime handoff (there's a FINAL version too) |
| `LIGHTROOM_COLLECTION_STRUCTURE.md` | The Lightroom collection structure Primetime asked about |
| `MBT_CREATOR_PLATFORM.md` | Measurably Better Things creator platform spec |
| `MEDIA_TAGGING_STANDARD.md` | How media should be tagged |
| `PLEX_GAP_ANALYSIS.md` | What Plex is missing for our use case |
| `PRODUCTION_INVENTORY.md` | Physical production gear inventory |
| `STATUS_REPORT_2026-03-29.md` | Status from 12 days ago |
| `STATUS_REPORT_2026-04-01.md` | Status from April 1 |
| `UTOPIA_UPDATE_FOR_PETE.md` | Update on Utopia for someone named Pete |

**Agent chat thread:** `/Volumes/T7/BigMuddy/agent-chat/thread.md` — This is the shared communication channel between the fleet (Primetime, Mac Mini Agent, Tracy iMac Agent). Last entry was Primetime on 2026-04-08 15:30 CDT. The Mac Mini load was 25 at that point; Primetime flagged it. There's also a pending task from Primetime to run the media pipeline fix (`.claude/agents/MEDIA_PIPELINE_FIX_PROMPT.md`) that I have not executed.

---

## 6. WHAT'S ON MEDIA STORAGE

`/Volumes/T7/BigMuddy/media/`:
```
archive/      9.3 GB   Lightroom catalogs + Photos library originals
exports/      128 KB   (nearly empty — exports not happening?)
inbox/        640 KB   (incoming media stage)
library/      128 KB   (nearly empty — library not populated?)
tv-slideshow/ 9.1 MB   (the 9 JPGs I downloaded for the TV stream)
```

**Red flag:** `exports/` and `library/` are essentially empty. That suggests the DAM pipeline built in `scripts/` is not running or is getting stuck. The `INGESTION_FAILURES_AUDIT.md` in that same directory probably explains why. Someone should investigate.

---

## 7. SERVICES I SET UP TODAY (April 9-10)

### TV Stream + Hotel Screens (working)
- `/Users/clawdbot/bigmuddy-tv/` — Node HTTP server on port 8888
- `/Users/clawdbot/scripts/bigmuddy-tv.sh` — HLS loop script
- Endpoints:
  - `http://192.168.4.37:8888/` — Landing
  - `http://192.168.4.37:8888/tv` — Full-screen TV (slideshow + HLS + clock + station ID)
  - `http://192.168.4.27:8888/kiosk` — Hotel lobby display (welcome, now playing, events, WiFi info, Amy Allen Apr 17 promo)
  - `http://192.168.4.37:8888/stream/stream.m3u8` — HLS playlist
- **Note:** The tv-stream script was edited (by user or linter) after I wrote it — the current version is at `/Users/clawdbot/scripts/bigmuddy-tv.sh`. It uses `find` instead of `ls *.jpg` to handle launchd glob issues.

### Room Recorder (broken)
- `/Users/clawdbot/scripts/room-recorder-loop.sh` — rolling 60-min audio
- **Status:** Worked with Continuity Camera phone mic until Chase AirPlayed to the mini. Then recording hung. Switched to onn 4K webcam but **ffmpeg cannot capture video from that webcam** — audio works fine, video hangs regardless of pixel format/framerate/resolution.
- Recording at `/Volumes/T7/BigMuddy/room-recordings/`:
  - `room-2026-04-09_19-37.m4a` — 3.1 MB, partial (AirPlay killed it)
  - `room-2026-04-09_20-23.m4a` — 44 bytes (empty restart)
- **Unresolved:** Webcam video capture. Camera permissions are granted but ffmpeg's avfoundation driver hangs on this specific hardware (onn 4K Webcam). I tried uyvy422/yuyv422/nv12/0rgb/bgr0 at 320×240 through 3840×2160 at 30.000030fps — all hang. Need `imagesnap` or OBS workaround, or a different USB webcam.

---

## 8. PENDING/ABANDONED WORK I FOUND

1. **"Funny moments" auto-clip pipeline** — Chase asked me to record video+audio from webcam and use AI to flag laughter/funny moments and auto-edit into clips. Blocked on webcam video capture (see #7).

2. **Lightroom → web sync** — `sync-lightroom-to-web.js` exists but I don't know if it's running on a schedule. No launchd plist for it.

3. **Ingestion failures** — `INGESTION_FAILURES_AUDIT.md` exists. Nobody fixed it that I can see.

4. **Executive Command Interface (ECI-01/02/03)** — Spec'd April 4, assigned to frontend agent, no status update.

5. **Bearsville Creative rename (BC-01)** — 24-file find/replace, P1 priority, assigned, no status.

6. **Display Channel seed failure** — `bearsville-lobby` seed fails on missing `name` field. Bug that blocks BC data foundation.

7. **Stripe Connect webhook listener** — In `PENDING_ISSUES_QUEUE.md`. P1. Not created as GitHub issue yet.

8. **Prisma EPERM CI build flaw** — Same queue. P1. Needs `PRISMA_CLI_QUERY_ENGINE_TYPE=library` + schema output override.

9. **Media pipeline fix** — Primetime asked Mac Mini Agent to run this April 8. Has not been run.

10. **Mac Mini load average was 25** on April 8 per Primetime in the agent chat thread. Today it's 6. Something improved but I don't know what/who fixed it.

---

## 9. WHISPER MODELS (T7)

`/Volumes/T7/BigMuddy/models/`:
- `ggml-medium.en.bin`
- `ggml-small.en.bin`

These are **whisper.cpp models for local transcription**. Nobody's using them that I can see, but they're ready for the post-production pipeline (interview transcription, laughter detection, etc.). When the Show Creation Pipeline post-production stage gets built, these are the transcription models to route to.

---

## 10. OPENCLAW WORKSPACE (Delta Dawn)

`/Users/clawdbot/.openclaw/workspace/` contains the Delta Dawn agent configuration:

- `AGENTS.md`, `IDENTITY.md`, `SOUL.md` — Agent personality and routing
- `MEMORY.md` — Delta Dawn's persistent memory
- `CONTEXT.md` — Quick-reference for the WhatsApp agent
- `LESSONS-LEARNED.md`
- `HEARTBEAT.md` — Empty (by design — skips heartbeat API calls)
- `TOOLS.md`, `USER.md`, `BOOTSTRAP.md`
- `handoffs/` — Directory (empty or not populated yet)
- `memory/` — Directory (not yet inspected)
- `agents.json`

This is the persona/memory layer for Delta Dawn as the Chief of Staff / Remote Operations agent described in `MEMORY.md`. If you're the new CoS and Delta Dawn is the existing CoS persona, there may be identity reconciliation needed — or you're operating the same persona across different interfaces.

---

## 11. KEY DECISIONS / ARCHITECTURAL REMINDERS

From the various docs I read:

- **Bitwarden is the source of truth for ALL credentials.** CLI: `bw`. Verify before creating new keys; store after creating.
- **No hardcoded fonts, colors, or model names.** Use CSS custom properties and `lib/ai-models.ts`.
- **AI generates art, Canva handles typography.** Never let AI put text in images.
- **Tracy and Amy are equity partners, not employees.**
- **MBT = Measurably Better Things.** Never "MB".
- **Two-station network:** Big Muddy Radio (Natchez) + Utopia Radio (Bearsville). Show Creation Pipeline spec at `/Users/clawdbot/docs/specs/SHOW_CREATION_PIPELINE.md` designs for this.
- **Verify deploys.** CI passing ≠ deployed. Check live URLs.

---

## 12. RECOMMENDED NEXT MOVES FOR COS

Priority order based on what I see:

1. **Decide who owns what I found.** The broadcasting stack, the hillbilly-dreams monorepo, the media pipeline scripts, and the DAM failures — each needs a clear owner. Right now it looks like multiple sessions built overlapping systems without a ledger.

2. **Audit the running radio broadcast.** The `com.bigmuddy.radio` launchd is live. Is anyone listening? Is it what Chase wants on air? When was the playlist last updated? Are the stingers/promos wired in?

3. **Run the media pipeline fix.** Primetime's April 8 request is still pending. `INGESTION_FAILURES_AUDIT.md` has the failure list.

4. **Triage `PENDING_ISSUES_QUEUE.md`.** Stripe webhooks and Prisma EPERM are P1 and just sitting in a markdown file.

5. **Get the webcam video working or replace the hardware.** The funny-moments pipeline is blocked. Options: install `imagesnap`, try via OBS which has its own capture path, or plug in a different USB webcam.

6. **Start the Show Creation Pipeline Phase 1 build.** The spec is ready at `/Users/clawdbot/docs/specs/SHOW_CREATION_PIPELINE.md`. Nothing has been built yet.

7. **Reconcile the two broadcasting directories.** `/Users/clawdbot/broadcasting/` and `/Users/clawdbot/bigmuddy-radio/` both exist with overlapping concerns. Pick one, archive the other.

8. **Read the strategy vault.** `The Fractal Thesis.md` and `The Hillbilly Dreams Engine.md` in `hillbilly-dreams/vault/07-Strategy/` are probably important context.

---

## 13. ONE-LINER QUESTIONS FOR CHASE

If you can surface these to Chase next time you see him:

- Is the ezstream radio broadcast supposed to be running right now? If so, what's in rotation?
- Were the 6 AI stingers (grandpa, ralph, daniel, reed, grandma, fred) ever put into the live rotation, or are they staged?
- Why was "Fred" stripped from the playlist today (`bigmuddy-playlist.m3u.before-fred-strip`)?
- Are we still doing the "funny moments" auto-clip experiment, or did that get replaced with something else?
- Does the `hillbilly-dreams/` monorepo on T7 still matter, or is it frozen/archived in favor of `Sites/bmt/`?
- The ECI (Executive Command Interface) spec from April 4 — is that still a priority or has it been superseded?

---

**File:** `/Volumes/T7/BigMuddy/HANDOFF_COS_2026-04-10.md`
**Author:** Mac Mini Agent (this session)
**Context window this doc was built from:** Show Creation Pipeline spec work (April 9), hotel TV/kiosk build (April 9), room recorder debugging (April 9-10), filesystem inventory (April 10)
