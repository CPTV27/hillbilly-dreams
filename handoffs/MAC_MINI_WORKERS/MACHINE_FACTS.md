# Mac Mini — Machine Facts

**Read first.** Every worker loads this before doing anything else.

- **Hostname:** ClawdBOT
- **IP:** 192.168.4.37
- **User:** clawdbot
- **Role:** Broadcasting + media services + photo pipeline + git mirror + TV/kiosk server
- **External drive:** `/Volumes/T7/BigMuddy/` — Lightroom catalog, hillbilly-dreams monorepo stash, media pipeline scripts, handoff docs, whisper models

## Running launchd services (do NOT restart without explicit authority)

| Label | Status | Who owns restart |
|---|---|---|
| `com.bigmuddy.radio` | Running | **Broadcast Worker** only |
| `com.bigmuddy.radio-listener` | Running | **Broadcast Worker** only |
| `com.bigmuddy.tv-stream` | Running | **Broadcast Worker** (shared with Chase) |
| `com.bigmuddy.tv-server` | Running | **Broadcast Worker** (shared with Chase) |
| `com.bigmuddy.room-recorder` | **Broken/stopped** (webcam driver blocker) | Nobody — needs Chase's hardware decision |

## Services + ports (LAN only)

| Port | Service | URL |
|------|---------|-----|
| 8010 | Icecast (the live radio stream) | http://192.168.4.37:8010 |
| 8080 | OpenBroadcaster | http://192.168.4.37:8080 |
| 8888 | Big Muddy TV HTTP + HLS | http://192.168.4.37:8888 |
| 32400 | Plex Media Server | http://192.168.4.37:32400 |
| 4007 | Postiz (social scheduling) | http://192.168.4.37:4007 |
| 5055 | Open Notebook (knowledge mgmt) | http://192.168.4.37:5055 |

## Canonical locations on this machine

| Path | What's there |
|---|---|
| `~/broadcasting/` | Live ezstream stack + playlist + boot scripts (Broadcast Worker territory) |
| `~/bigmuddy-radio/` | 6 AI-voiced stingers + 3 promos + retired feeder (Broadcast Worker territory) |
| `~/bigmuddy-tv/` | Node HTTP server for TV/kiosk (port 8888) |
| `~/Sites/bmt/` | `CPTV27/bmt` git repo |
| `~/Sites/bigmuddy/` | `CPTV27/bigmuddy-portal` git repo (HAD SECURITY ISSUE — leaked PAT, rotation pending) |
| `~/ops/bigmuddy-ops/` | ops tooling git repo |
| `~/.openclaw/workspace/` | Delta Dawn persona/memory layer |
| `/Volumes/T7/BigMuddy/` | T7 drive root — docs, handoffs, media |
| `/Volumes/T7/BigMuddy/hillbilly-dreams/` | **Separate pnpm monorepo stash** with 40+ docs + tasks + vault |
| `/Volumes/T7/BigMuddy/scripts/` | Node.js media pipeline (Photo Lab Worker territory) |
| `/Volumes/T7/BigMuddy/media/` | Archive (9.3 GB) + inbox + exports + library (empty, pipeline broken) |
| `/Volumes/T7/BigMuddy/models/` | whisper.cpp transcription models |
| `/Volumes/T7/BigMuddy/agent-chat/thread.md` | Fleet communication thread (append your session markers) |

## Handoff docs to read (all on T7)

1. `/Volumes/T7/BigMuddy/HANDOFF_COS_2026-04-10.md` — **the canonical handoff from the Mac Mini Agent to the CoS (THIS DEFINES WHY YOU EXIST)**
2. `/Volumes/T7/BigMuddy/HANDOFF_PRIMETIME_FINAL_2026-04-08.md` — earlier Primetime handoff
3. `/Volumes/T7/BigMuddy/BROADCASTING_CAPABILITIES.md` — 18 KB full broadcast spec
4. `/Volumes/T7/BigMuddy/CONTENT_INGESTION_SOP.md` — content ingestion standard
5. `/Volumes/T7/BigMuddy/IDEAL_ARCHITECTURE_2026-04-08.md` — architectural north star
6. `/Volumes/T7/BigMuddy/LIGHTROOM_COLLECTION_STRUCTURE.md` — canonical Lightroom collections
7. `/Volumes/T7/BigMuddy/MEDIA_TAGGING_STANDARD.md` — how to tag photos

## The fleet

- **Chase's MacBook Pro** — main dev clone, owns deploys, runs the Asana Coordinator
- **Mac mini (you)** — broadcasting, media pipeline, git mirror, workers live here
- **Tracy's iMac** (192.168.4.26, user `tracyfort`) — Inn ops workstation

## Hard rules for every worker on this machine

- **Bitwarden is the source of truth for ALL credentials.** Never hardcode secrets.
- **No `git push --force` on any branch, ever.**
- **No restarting Icecast, ezstream, or any `com.bigmuddy.*` service during a live window without explicit Chase authorization.** Amy or Tracy may be listening.
- **Never delete photos from `/Volumes/T7/BigMuddy/media/archive/`.** Ever.
- **Never modify `~/.ssh/`, `~/.netrc`, `~/.git-credentials`, or any `.env*` file.**
- **Never push binaries >10 MB to git.** Binary media goes to GCS.
- **Append to `agent-chat/thread.md` at the start and end of every session.**

## Worker identities (you are exactly one of these)

- **Broadcast** (`~/mini-workers/broadcast/CLAUDE.md`) — radio, stingers, Icecast, ezstream, TV stream, FM, Plex
- **Photo Lab** (`~/mini-workers/photo-lab/CLAUDE.md`) — Lightroom, DAM pipeline, GCS uploads, tagging, gallery curation
- **Ops Sync** (`~/mini-workers/ops-sync/CLAUDE.md`) — git repos, disk hygiene, backups, security scanning, service health snapshots, P1 issue backlog, fleet thread

If your `CLAUDE.md` says you are one of these, stay in your lane. If it doesn't, you are not a worker — go read `~/mini-workers/ARCHIVE_AND_BOOTSTRAP.md` instead.
