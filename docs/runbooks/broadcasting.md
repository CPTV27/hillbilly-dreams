# Broadcasting Runbook — Big Muddy Radio + Big Muddy TV

**Last updated:** 2026-04-10
**Owner:** Chase (primary), Mac mini automation (secondary)
**Host:** Mac mini at 192.168.4.37 (ClawdBOT)

This runbook covers the broadcasting stack running on the Mac mini:
- **Radio** — Big Muddy Radio, audio-only Icecast stream at port 8010
- **TV** — Big Muddy TV, HLS video stream at port 8888
- **OpenBroadcaster Server** — Docker-based radio automation platform at port 8080

---

## Stack at a Glance

```
[ BigMuddy-Radio-Library + Stingers ]
          │
          ▼
[ ezstream (screen session, auto-restart) ]
          │  Ogg Vorbis 160kbps over HTTP
          ▼
[ openbroadcaster-icecast (Docker) ]  ◄── source pass: bigmuddy-source
    localhost:8010 / container 8000
          │
          ├──► listeners (bigmuddyradio.com player)
          └──► OBS Studio Media Source → Big Muddy TV overlay
```

**What's running where:**

| Component | Type | Location | Starts via |
|---|---|---|---|
| openbroadcaster-server | Docker container | localhost:8080 | Docker Desktop autostart |
| openbroadcaster-db | Docker container (MariaDB 11) | localhost:3307 | Docker Desktop autostart |
| openbroadcaster-icecast | Docker container (moul/icecast) | localhost:8010 | Docker Desktop autostart |
| ezstream | Homebrew binary in screen session | `/Users/ClawdBOT/broadcasting/` | launchd agent `com.bigmuddy.radio` → `boot-radio.sh` → `screen` |
| Big Muddy TV server | Node.js via launchd | localhost:8888 | `com.bigmuddy.tv-server` |
| Big Muddy TV HLS encoder | ffmpeg via launchd | `/Users/clawdbot/bigmuddy-tv/stream/` | `com.bigmuddy.tv-stream` |
| Room recorder | bash loop via launchd | writes to disk | `com.bigmuddy.room-recorder` |

---

## Credentials

All stored in **Bitwarden** under `Mac mini — Broadcasting`. Values below are reference only.

| Thing | User | Password |
|---|---|---|
| OB Server admin web UI (localhost:8080) | `admin` or `Chase` | (in Bitwarden) |
| OB Server MariaDB | `openbroadcaster` | `bigmuddy2026` |
| Icecast source | `source` | `bigmuddy-source` |
| Icecast admin | `admin` | `bigmuddy-admin` |
| Icecast relay | `relay` | `bigmuddy-relay` |
| Mac mini SSH | `ClawdBOT` | SSH key `~/.ssh/id_mini` |

---

## Start / Stop / Check the Radio

### Check status
```bash
# SSH into mini
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37

# Is a source currently connected?
curl -s http://localhost:8010/status-json.xsl | python3 -m json.tool

# What's ezstream playing right now?
curl -s http://localhost:8010/status-json.xsl | python3 -c 'import sys,json; print(json.load(sys.stdin)["icestats"]["source"].get("title"))'

# Is the screen session alive?
screen -list | grep bigmuddy-radio

# Is the ezstream process alive?
pgrep -fl ezstream
```

### Start manually (if auto-start failed)
```bash
# Trigger the boot script directly
/Users/ClawdBOT/broadcasting/boot-radio.sh

# Or start the launchd agent
launchctl load ~/Library/LaunchAgents/com.bigmuddy.radio.plist
```

### Stop
```bash
# Kill the screen session + ezstream
screen -S bigmuddy-radio -X quit
pkill -f ezstream
pkill -f oggenc

# Unload launchd agent (prevents auto-restart on next login)
launchctl unload ~/Library/LaunchAgents/com.bigmuddy.radio.plist
```

### Restart after config change
```bash
# Kill the running session (the auto-restart loop will pick up the new config)
screen -S bigmuddy-radio -X quit
# screen won't relaunch automatically; run boot-radio.sh:
/Users/ClawdBOT/broadcasting/boot-radio.sh
```

### Tail the live ezstream log
```bash
# ezstream writes to this file via the wrapper loop
tail -f /Users/ClawdBOT/broadcasting/ezstream-wrapper.log
```

---

## Rebuild the Playlist

The playlist is `/Users/ClawdBOT/broadcasting/bigmuddy-playlist.m3u` — an interleaved shuffle of music tracks + 8 station ID stingers (every 2 tracks).

### When to rebuild
- You've added new music to `/Volumes/T7/Music/BigMuddy-Radio-Library`
- You've added new stingers to `/Users/ClawdBOT/bigmuddy-radio/stingers/`
- You want a fresh shuffle

### How to rebuild
```bash
# From the repo
scp infra/broadcasting/build-playlist.py ClawdBOT@192.168.4.37:/Users/ClawdBOT/broadcasting/

ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 'python3 /Users/ClawdBOT/broadcasting/build-playlist.py'

# Restart ezstream to pick up the new playlist
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 'screen -S bigmuddy-radio -X quit; sleep 2; /Users/ClawdBOT/broadcasting/boot-radio.sh'
```

---

## Station ID Stingers

Location: `/Users/ClawdBOT/bigmuddy-radio/stingers/`

Current roster (as of 2026-04-10):
1. `01-grandpa-preacher.mp3`
2. `02-ralph-barker.mp3`
3. `03-daniel-noir.mp3`
4. `04-reed-latenight.mp3`
5. `05-grandma-porch.mp3`
6. `06-fred-promo.mp3`
7. `07-moira-gospel.mp3`
8. `08-whisper-midnight.mp3`

Cadence: one stinger every 2 music tracks (~every 6–8 minutes).

To change cadence, edit `infra/broadcasting/build-playlist.py` and rerun.

To add a new stinger: drop the `.mp3` into `/Users/ClawdBOT/bigmuddy-radio/stingers/` and rebuild the playlist.

---

## Listen URLs

| URL | Use |
|---|---|
| http://192.168.4.37:8010/stream | Direct Ogg Vorbis stream from Icecast (LAN) |
| http://localhost:8010/stream | Same, from the Mac mini itself |
| http://192.168.4.37:8010/status-json.xsl | Icecast status + now-playing metadata (JSON) |
| http://192.168.4.37:8010/ | Icecast public page (mount list) |
| http://192.168.4.37:8010/admin/ | Icecast admin (user `admin`, see Bitwarden) |
| https://bigmuddyradio.com | Public-facing player (pulls from Icecast) |

**Test playback from your laptop:**
```bash
curl -s http://192.168.4.37:8010/stream | ffplay -autoexit -
# or
open http://192.168.4.37:8010/stream  # uses VLC/iTunes if registered
```

---

## OBS Studio Integration (Big Muddy TV)

OBS Studio on the Mac mini is the video broadcast layer. Intended scene structure:

```
Scene: "ON AIR"
├── Media Source: Icecast radio (URL mode)
│     URL: http://localhost:8010/stream
│     Loop: no, Restart on activate: yes, Hardware decode: off
├── Video background (BigMuddyTV/backdrop.mp4 or studio camera)
├── Browser Source: lower third (HTML overlay)
├── Image: "ON AIR" bug (corner)
└── Text (GDI+): Now Playing — populated via OBS WebSocket script polling the Icecast status
```

**Status as of 2026-04-10:** OBS scenes are NOT YET CONFIGURED. This is the next step after tonight's code lock.

### To configure OBS (manual GUI work required)
1. Open OBS Studio on the Mac mini (needs a screen or Screen Sharing session)
2. Add a new Scene: "ON AIR"
3. Add Media Source → Local File OFF → Input: `http://localhost:8010/stream` → OK
4. Add Image Source for the ON AIR bug
5. Add Browser Source for the lower third (HTML template in `Overlay/` once designed)
6. Configure stream output: Settings → Output → Streaming → Service: Custom → Server: `rtmp://localhost:1935/live` (or whatever the TV HLS encoder expects)
7. Click "Start Streaming"

### Polling now-playing metadata for the lower third
Use the obs-websocket plugin + a small Python poller that hits the Icecast status JSON every 10 seconds and updates the text source. Scaffold TBD.

---

## Common Failures + Fixes

### "Music stopped" — no audio on the stream

1. Check if ezstream is still running: `pgrep -fl ezstream`
2. Check the screen session: `screen -list | grep bigmuddy-radio`
3. Check the Icecast source: `curl -s http://localhost:8010/status-json.xsl`
4. If ezstream is dead, check wrapper log: `tail -50 /Users/ClawdBOT/broadcasting/ezstream-wrapper.log`
5. Manually restart: `/Users/ClawdBOT/broadcasting/boot-radio.sh`

### "403 Forbidden" / "Login failed" when starting ezstream

The Icecast mount is already held by another source. Happens when two ezstream instances race. Fix:
```bash
pkill -9 -f ezstream
sleep 3
/Users/ClawdBOT/broadcasting/boot-radio.sh
```

### Icecast container is down

```bash
docker ps | grep icecast
# If not running:
cd /Users/ClawdBOT/openbroadcaster-docker  # or wherever docker-compose.yml lives
docker compose up -d openbroadcaster-icecast
```

### Another process is feeding the bandaid feeder again

Previous setup at `/Users/ClawdBOT/bigmuddy-radio/feeder.sh` was a bandaid ffmpeg loop that fought with ezstream for the Icecast mount. It has been renamed to `feeder.sh.RETIRED.2026-04-10`. If a resurrected version appears:
```bash
# Kill it, rename it
pkill -9 -f 'bigmuddy-radio/feeder'
mv /Users/ClawdBOT/bigmuddy-radio/feeder.sh /Users/ClawdBOT/bigmuddy-radio/feeder.sh.RETIRED
# Check who launched it (look for the parent process)
```

### Cold boot — Docker hasn't started yet when launchd runs boot-radio.sh

boot-radio.sh waits up to 120 seconds for Icecast to come up. If boot takes longer, bump the retry count in boot-radio.sh or add a launchd `ThrottleInterval`.

---

## The "Correct" Architecture (Future — Q2 Followup)

The current setup (ezstream + screen + launchd + shell wrapper) is a tactical solution. The long-term architecture per openbroadcaster.org is:

```
OBServer (Docker, already running) — schedules shows + playlists via web UI
          │
          │ HTTP sync
          ▼
OBPlayer (Python + GStreamer) — pulls schedule, plays tracks, streams to Icecast
          │
          ▼
openbroadcaster-icecast (Docker, already running)
```

**Why we didn't do this tonight:** OBPlayer requires Python + GStreamer + GTK on Debian/Ubuntu. On macOS, it needs a dedicated Debian Docker container with GUI support. That's 2–3 hours minimum, and the research is already done.

**To migrate later:**
1. Follow `docs/research/openbroadcaster-2026-04-10.md` — the full research agent report
2. Key steps:
   - Build a Debian Docker image with the OBPlayer dependency list
   - Register a Player in OBServer web UI, get Device ID
   - Configure OBPlayer Settings → Sync with OBServer URL + Device ID + password
   - Configure OBPlayer Streaming tab to output to `http://openbroadcaster-icecast:8000/stream`
   - Import music via OBServer web UI drag-drop
   - Create a playlist, assign as Default Playlist for the Player
3. Kill the ezstream screen session once OBPlayer is confirmed working
4. Update this runbook

Asana task for this migration: see "Broadcasting — migrate from ezstream bandaid to OBPlayer + OBServer".

---

## Files Owned by This Runbook

On the Mac mini:
- `/Users/ClawdBOT/broadcasting/ezstream.xml` — ezstream config
- `/Users/ClawdBOT/broadcasting/bigmuddy-playlist.m3u` — the playlist
- `/Users/ClawdBOT/broadcasting/boot-radio.sh` — launchd entry point
- `/Users/ClawdBOT/broadcasting/run-ezstream.sh` — (unused, kept for debugging)
- `/Users/ClawdBOT/broadcasting/ezstream-wrapper.log` — live ezstream output
- `/Users/ClawdBOT/Library/LaunchAgents/com.bigmuddy.radio.plist` — launchd agent
- `/Users/ClawdBOT/bigmuddy-radio/stingers/` — 8 station ID stingers
- `/Users/ClawdBOT/bigmuddy-radio/feeder.sh.RETIRED.2026-04-10` — dead bandaid, do not revive

In the repo:
- `infra/broadcasting/ezstream.xml` — version-controlled config
- `infra/broadcasting/boot-radio.sh` — version-controlled boot script
- `infra/broadcasting/com.bigmuddy.radio.plist` — version-controlled launchd plist
- `infra/broadcasting/build-playlist.py` — playlist generator
- `docs/research/openbroadcaster-2026-04-10.md` — research agent report
- `docs/runbooks/broadcasting.md` — this file
