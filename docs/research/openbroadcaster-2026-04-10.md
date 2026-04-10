# OpenBroadcaster.org Research Report
**Date:** 2026-04-10
**Purpose:** Understand the OpenBroadcaster.org (OBServer + OBPlayer) architecture so we can migrate from the tactical ezstream solution to the "correct" OB pipeline as a Q2 followup after code lock.
**Researcher:** General-purpose agent (dispatched from the broadcasting sprint session)

## TL;DR

**OpenBroadcaster.org is a two-component system.** The docker container running on our Mac mini (`openbroadcaster-server`) is only the **scheduling brain** — it cannot stream audio by itself. The actual playout requires a separate **OBPlayer** client (Python + GStreamer) that runs on a Linux host, syncs schedules from OBServer over HTTP, and streams audio to Icecast via libshout.

**Current Mac mini broadcasting is ezstream + screen + launchd** — see `docs/runbooks/broadcasting.md`. This report is the migration guide.

## 1. Architecture

```
[OBServer (web UI, scheduler)]  ◄── user creates playlists, shows, dayparting rules
         │
         │ HTTP sync every 60s
         ▼
[OBPlayer (Python/GStreamer)]  ◄── pulls schedule, downloads media if missing
         │
         │ libshout/GStreamer
         ▼
[Icecast]  ◄── serves listeners
```

- **OBServer GitHub:** https://github.com/openbroadcaster/observer
- **OBPlayer GitHub:** https://github.com/openbroadcaster/obplayer
- **OBServer** is what we already have running in Docker. It is a PHP/MariaDB web app.
- **OBPlayer** is what's missing. It is a Python 3 app with heavy GStreamer 1.0 + GTK 3 dependencies.

## 2. Data Model

Tables in the `openbroadcaster` database:

| Table | Purpose |
|---|---|
| `media` | Individual tracks — artist, title, album, duration, file_location (hash of uploaded file), status |
| `playlists` + `playlists_items` | Named collections of media |
| `players` | Virtual radio stations — each has a `default_playlist_id` |
| `shows` | Scheduled playouts — `player_id` + `item_id` (media OR playlist OR linein) + start/end + recurring mode |
| `timeslots` | User time blocks for per-player scheduling |
| `dayparting` | Time-of-day rules that constrain what plays when |

**The `players` table has NO stream/URL/password columns.** This was our first confusion — we thought OBServer streamed to Icecast itself. It doesn't. The Player is the thing that streams, and the Player stores its own Icecast config locally.

## 3. How OBPlayer Connects to Icecast

From OBPlayer's settings (Streaming tab in the dashboard):
- `audio_mode = intersink` — GStreamer uses an intersink pad for live streaming
- `streamer_1_enabled = 1`
- `streamer_1_server = http://openbroadcaster-icecast:8000`
- `streamer_1_mount = /bigmuddy.mp3` (or whatever mount name)
- `streamer_1_password = bigmuddy-source`
- `streamer_1_bitrate = 128` (or 192, or 320)
- `streamer_1_format = mp3` (or ogg)

OBPlayer uses **libshout via GStreamer**, which is why it needs the full gstreamer1.0 plugin suite at install time.

## 4. OBPlayer Install Dependencies (Debian/Ubuntu)

From `obplayer/install.txt`:

```
ntp python3 python3-pycurl python3-openssl python3-apsw python3-magic
python3-dateutil python3-requests python3-gi python3-gi-cairo
gir1.2-gtk-3.0 gir1.2-gdkpixbuf-2.0 gir1.2-pango-1.0
python3-gst-1.0 gir1.2-gstreamer-1.0 gir1.2-gst-plugins-base-1.0
gir1.2-gst-rtsp-server-1.0 gstreamer1.0-tools gstreamer1.0-libav
gstreamer1.0-alsa gstreamer1.0-pulseaudio gstreamer1.0-plugins-base
gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly
ffmpeg

# pip3:
passlib[bcrypt] apsw
```

Run helpers (bundled with obplayer):
- `bash obplayer_check` — dependency sanity check
- `bash obplayer_loop` — run the player in a restart loop (similar to our ezstream wrapper)

## 5. macOS Installation Path

OBPlayer has no native macOS port. The options are:

**Option A — Debian Docker container on the Mac mini** (recommended)
- Add an `obplayer` service to the existing docker-compose.yml with OBServer
- Same Docker network so Player can reach OBServer at `http://openbroadcaster-server/` and Icecast at `http://openbroadcaster-icecast:8000/`
- Expose the dashboard port (23233) to localhost:23233
- Volume mount the music library read-only

**Option B — Run OBPlayer on a second Linux machine** (Raspberry Pi 4/5, old laptop, VPS)
- Simpler in isolation but adds a machine to manage
- Network reachability to OBServer + Icecast (both behind the mini's LAN) must work

**Option C — Linux VM on the Mac mini** (OrbStack, UTM, Parallels)
- Heavier than a container, no real advantage over Option A

## 6. Shortest Path to "Playlist on Icecast" via OBPlayer

1. **Build a Debian 12 Docker image** with the dependency list above + `git clone https://github.com/openbroadcaster/obplayer` into `/app`.
2. **Add the container to the Docker network** that already hosts `openbroadcaster-server`, `openbroadcaster-db`, `openbroadcaster-icecast`.
3. **In OBServer web UI:** create a Player record named `bigmuddy-01`, set a password, note the Device ID.
4. **In OBPlayer dashboard** (http://localhost:23233, login `admin` / `admin`, change password):
   - Settings → Sync → OBServer URL = `http://openbroadcaster-server/`, Device ID, password → Save
   - Settings → Streaming → enable Streamer 1 → point at `http://openbroadcaster-icecast:8000/bigmuddy.mp3` with source pass
5. **In OBServer web UI:** drag-drop the 114 music files into the Media library. Create a Playlist `BigMuddy-DPL`, add all tracks, shuffle. Assign BigMuddy-DPL as the Default Playlist for Player `bigmuddy-01`.
6. **Verify:** `curl http://192.168.4.37:8010/bigmuddy.mp3` should return a growing MP3. If 404, check mount name. If 401, check password.

## 7. What Doesn't Exist

- **No `media:scan` CLI command.** OBServer's CLI (`tools/cli/ob.php`) only has `check`, `cron`, `modules`, `updates`, `passwd`. Bulk import is drag-drop in the web UI or direct DB inserts + file placement in the media volume.
- **No YouTube tutorials for OBServer/OBPlayer.** The project is too niche. Community Radio Canada and a handful of Inuit/First Nations stations use it; documentation is mostly in the GitHub READMEs and https://support.openbroadcaster.com/.
- **No documented OBPlayer → OBS Studio simulcast pipeline.** The OB community is audio-only. The Icecast handoff is clean enough that pairing it with OBS for video overlays is trivial; just nobody writes it up because nobody does it.

## 8. Community Stations Running OpenBroadcaster

All audio-only, all small/community/indigenous:

1. **Kitikmeot Radio Network (KRN)** — Canadian high Arctic. Multi-node satellite network, Cambridge Bay + Kugluktuk + Ottawa. Inuit language preservation. https://openbroadcaster.com/case-studies/kitikmeot-radio-network/
2. **Nuxalk Radio CKNN 91.1 FM** — Bella Coola, BC. Volunteer-run, Nuxalk language preservation. Running OB since ~2013. https://openbroadcaster.com/case-studies/nuxalk-radio-911
3. **CJUC Radio Whitehorse** — Yukon community radio. https://openbroadcaster.com/case-studies/cjuc-radio-whitehorse/
4. **Tsilhqot'in Community Radio** — BC First Nations station, federally funded.
5. **Kitikmeot Heritage Society** affiliates across the Nunavut network.

## 9. Key Issues Worth Reading

- https://github.com/openbroadcaster/obplayer/issues/25 — "Connect obplayer to observer" (the exact sync question)
- https://github.com/openbroadcaster/obplayer/issues/26 — "Stream obplayer to Icecast" (exact streaming config question)
- https://github.com/openbroadcaster/obplayer/issues/39 — GStreamer Icecast auth error debugging

## 10. Sources

- OpenBroadcaster main site: https://www.openbroadcaster.com/
- OBServer GitHub: https://github.com/openbroadcaster/observer
- OBPlayer GitHub: https://github.com/openbroadcaster/obplayer
- OBPlayer install.txt: https://github.com/openbroadcaster/obplayer/blob/main/install.txt
- OBPlayer README: https://github.com/openbroadcaster/obplayer/blob/main/README.md
- OBServer support docs: https://support.openbroadcaster.com/observer/
- OBPlayer support docs: https://support.openbroadcaster.com/obplayer/
- Quick Start: https://support.openbroadcaster.com/quick-start/
- Troubleshooting: https://support.openbroadcaster.com/troubleshooting
- Jan 2026 manual PDF: https://www.openbroadcaster.com/wp-content/uploads/2026/01/openbroadcaster-manual-01042026.pdf
- Case studies: https://openbroadcaster.com/case-studies/

## 11. OBS Streaming to Icecast (For Reference)

The OBS side of the eventual OB → Icecast → OBS Studio → RTMP video pipeline:

- OBS Studio has no native Icecast output plugin. For OBS to push to Icecast, use the FFmpeg custom output mode:
  - Settings → Output → Output Mode: Advanced → Recording → Type: Custom Output (FFmpeg)
  - File path: `icecast://source:<password>@host:8010/mountname`
  - Container: mpegts (or ogg)
  - Video encoder: libx264 or hardware
  - Audio encoder: libmp3lame or libvorbis
- Reference blog post: https://epir.at/2018/03/08/obs-icecast-streaming/

For our use case, OBS pulls FROM Icecast (Media Source → URL) and pushes video out via HLS or RTMP to the Big Muddy TV server — no need for OBS to push to Icecast.

## Related Docs

- `docs/runbooks/broadcasting.md` — current stack operational runbook
- `infra/broadcasting/` — ezstream config, boot script, launchd plist
- Asana task: "Broadcasting — migrate from ezstream bandaid to OBPlayer + OBServer" (Q2 followup)
