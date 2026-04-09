# Radio & TV Demo Prep

*Handoff for the Mac mini agent and Chase. How to demonstrate the broadcasting stack is working.*

---

## What You're Demonstrating

1. **Big Muddy Radio** — live streaming audio at bigmuddytouring.com/radio
2. **The TV channel** — Inn lobby TV content (Big Muddy TV)
3. **The full pipeline** — show happens → gets on radio → gets in magazine → shows up in directory

---

## Radio Demo Checklist

### Before the Demo

| Step | Where | Status |
|---|---|---|
| AzuraCast setup wizard completed | http://206.189.200.208 in browser | Pending — Chase does this |
| AzuraCast station "Big Muddy Radio" created | AzuraCast dashboard | After wizard |
| OpenBroadcaster pushing to AzuraCast | Mac mini (192.168.4.37:8080) | Mac mini agent configures |
| stream.bigmuddytouring.com resolves to droplet | DNS | Done (gray cloud) |
| Fallback MP3 uploaded to R2 | bmt-media-bigmuddy/radio/fallback-loop.mp3 | Mac mini agent creates |
| Web player at /radio works | bigmuddytouring.com/radio | Deployed |

### The Demo Script

1. **Open bigmuddytouring.com/radio** on a laptop or phone
2. **Hit play** — audio should stream. Show the Now Playing metadata updating.
3. **Show the schedule** — 18 shows, 7 DJs. "This is real programming, not a playlist."
4. **Open the AzuraCast dashboard** (http://206.189.200.208) — show the listener count, stream health, source status
5. **Show the Mac mini** — OpenBroadcaster is the automation engine. It runs 24/7. When a DJ isn't live, it plays scheduled programming.
6. **Kill the Mac mini source** (unplug briefly) — the fallback MP3 kicks in on AzuraCast. "The stream never goes silent."
7. **Reconnect** — OB picks back up automatically

### What to Say

"Big Muddy Radio is a real internet radio station. 18 scheduled shows, 7 DJs, broadcasting 24/7. The automation runs on our Mac mini in Natchez. The stream is hosted on a relay server so it's always available, even if our internet goes down. Every show feeds the ecosystem — the bands we play get listed in the directory, featured in the magazine, and booked for touring."

---

## TV Channel Demo

### What Exists

The TV channel runs via Plex on the Mac mini (port 32400). Content types:
- Live show recordings from the Blues Room
- Music videos from Big Muddy Records artists
- City guide video tours (Memphis, Natchez, Clarksdale, etc.)
- Ambient Inn footage (lobby camera, river views)
- Radio show replays with visual overlays

### The Demo Script

1. **Show the Inn TV** — if physically at the Inn, the lobby TV runs the Plex channel
2. **Open Plex in browser** — http://192.168.4.37:32400 — show the library organization
3. **Play a Blues Room recording** — "This was last Saturday's show. It goes from the stage to the TV to the radio to the magazine."
4. **Show the content pipeline** — "A band plays the Blues Room on Saturday. By Monday, the recording is on the TV channel, clips are on radio rotation, the magazine has a photo essay, and the band's listing in the directory links to everything."

### What to Say

"The TV channel is the visual arm of Big Muddy Media. Same content pipeline as the radio — shows become TV content, become magazine features, become directory listings. Every piece of content serves every channel."

---

## Mac Mini Agent Tasks

Give the Mac mini agent (ClawdBOT@192.168.4.37) these instructions after AzuraCast is set up:

1. Verify OpenBroadcaster is streaming to AzuraCast
2. Create a 1-hour fallback MP3 from the Plex library
3. Upload fallback to R2: `bmt-media-bigmuddy/radio/fallback-loop.mp3`
4. Verify Plex library is organized by content type (shows, music videos, city guides)
5. Test the full chain: play something on OB → verify it appears at stream.bigmuddytouring.com → verify Now Playing updates at /radio

---

## Demo Environment Requirements

- Laptop with speakers or external speaker (for radio playback)
- Good WiFi (streaming audio)
- The /radio page loaded in a browser tab
- AzuraCast dashboard in another tab
- Plex in another tab (for TV demo)
- If at the Inn: the lobby TV showing the Plex channel

---

*The radio and TV demos prove the media flywheel is real. Every show feeds every channel. That's what makes MBT different from any directory or software competitor — we own the media.*
