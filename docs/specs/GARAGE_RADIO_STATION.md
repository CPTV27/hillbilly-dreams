# Garage Radio Station — Hardware Spec + Ingest Workflow

**Date:** 2026-04-11
**Author:** CoS (MacBook Pro session)
**Station computer:** Tracy's Late 2015 iMac (iMac17,1) — moving from Tracy's desk to the garage
**Budget target:** Tier 1 at ~$2,100 (assumes SM7B already owned)

---

## Design philosophy

Every surface has one job and it's obvious what the job is.

- A CD goes in the CD deck. You hit play. The computer captures.
- A record goes on the turntable. You drop the needle. The computer captures.
- A thumb drive goes in a front-panel USB. A watch script routes the files.
- A file gets dragged to a network share. Same watch script.
- Every input flows into one mixer with real analog VU meters on the face.
- The mixer feeds into the iMac via USB and into headphones and monitors.
- Everything is rack-mounted. Nothing is loose. Nothing is a laptop on a card table.
- There's an ON AIR light that lights red when the station is broadcasting live.
- There's a clock on the wall showing the time in big red digits.

---

## The station computer — Tracy's iMac

Not a new purchase. This iMac was assessed on April 2, 2026 (`docs/TRACY_IMAC_ASSESSMENT_2026-04-02.md`) and is being repurposed from Tracy's desk to the garage studio.

| Spec | Value |
|---|---|
| Model | iMac17,1 (Late 2015) |
| CPU | Intel Core i5 3.2 GHz |
| RAM | 8 GB DDR3L 1867 MHz (upgrade to **32 GB** with $50 OWC/Crucial kit) |
| Storage | 953 GB internal, 407 GB free after April 2 cleanup |
| Display | 27" Retina 5K (2560x1440 effective) |
| OS | macOS Monterey 12.7.6 |
| USB | 4x USB 3.0, 2x Thunderbolt 2 (use TB-to-USB-C adapter for modern peripherals) |
| Audio | 3.5mm headphone jack + internal speakers (not used for monitoring — use the mixer) |
| Network | Gigabit Ethernet + WiFi ac |
| Adobe CC | Already installed under `admin@hillbillydreamsinc.com` |
| Chrome | Already has Big Muddy admin bookmarks from the April 2 setup |

**The $50 RAM upgrade is the single most important purchase.** Order first, install before anything else. Part number: DDR3L 1867 MHz PC3-14900 SO-DIMM, 204-pin, 1.35V, 2x16 GB kit. OWC (macsales.com) or Crucial.

**Software to install on the iMac for station duty:**

| App | Purpose | Cost |
|---|---|---|
| **Audio Hijack** (Rogue Amoeba) | Capture from any audio source (CD deck, turntable, mic) to WAV/FLAC | $72 |
| **SoundSource** (Rogue Amoeba) | Per-app audio routing + system-wide EQ + metering | $49 |
| **meters.fyi** (Youlean alternative) | Full-screen broadcast-style VU/PPM/LUFS metering on the 5K display | $5 |
| **Youlean Loudness Meter** | LUFS loudness metering (free version) | Free |
| **VLC** | Playback + stream monitoring | Free |
| **OBS Studio** | If you ever want to video-stream the DJ booth | Free |
| **Homebrew** | Package manager for CLI tools (rsync, ffmpeg, fswatch) | Free |
| **rsync** (via Homebrew) | Nightly sync of ingested files to the production mini's T7 | Free |
| **fswatch** (via Homebrew) | File watcher for the ingest folder | Free |

Total software cost: ~$126.

---

## Tier 1 build — "Real station for two grand"

### Hardware list

| # | Item | Model | Est. price | Notes |
|---|---|---|---|---|
| 1 | **Mixer with analog VU meters + USB interface** | **Tascam Model 16** | $999 | 16 channels, real analog VU meters on the face, built-in USB 2.0 audio interface (16-in/2-out to iMac), multitrack recording to SD card as backup. Feels like a 1970s console. The centerpiece. |
| 2 | **CD deck (rackmount)** | **Tascam CD-200** | $349 | Single-disc, pitch control, cue to speakers, analog RCA + S/PDIF optical out. Drops into the rack. Front-loading tray. |
| 3 | **Turntable** | **Audio-Technica AT-LP120XUSB-BK** | $399 | Direct drive (Technics SL-1200 clone). Built-in switchable phono preamp. Analog RCA out to the mixer AND a USB output for direct-to-computer ingest (bypasses the mixer for cleanest capture). 33/45/78 RPM. |
| 4 | **Broadcast microphone** | **Shure SM7B** | *already owned* | THE radio mic. If you don't already have one, $399 new. |
| 5 | **Mic boom arm** | **Rode PSA1+** | $130 | Desk-mounted, reaches over the mixer, locks in position for broadcast, swings out of the way when not in use. |
| 6 | **Monitor headphones** | **Sony MDR-7506** | $100 | Industry standard closed-back. Every radio studio in America has a pile of these. Replaceable ear pads ($15), lasts forever. |
| 7 | **8U studio rack** | **Gator GRR-8L** | $180 | 8U rolling rack. Houses the mixer (if rackmounted — the Model 16 is desktop, so it sits ON TOP), the CD deck (1U), a power conditioner (1U), a future Dorrough meter (1U), and empty slots for expansion. |
| 8 | **Rack power conditioner** | **Furman M-8x2** | $90 | Surge protection + EMI filtering for the rack. 8 rear outlets, 2 front. Front-panel light. Every real studio has one as the first thing in the rack. |
| 9 | **ON AIR light** | Vintage-style (eBay, Etsy, Amazon) | $50 | Red, wall-mounted above the studio door. Wired to a smart plug or manual toggle. Lights up when you're broadcasting live. Non-negotiable for the vibe. |
| 10 | **Wall clock** | **La Crosse 513-1311OT** or similar red LED | $35 | Big red digital numbers visible from the desk. NTP-sync if you wire it to WiFi, or just plug it in and set it. Every station has one. |
| 11 | **USB 3.0 front-panel hub** | Anker 4-port USB 3.0 | $15 | Mounted to the front of the rack or the desk edge. Labeled "INGEST." Thumb drives go here. |
| 12 | **Cables and misc** | XLR x4, 1/4" TRS x4, RCA x2, USB-A/B x2, headphone extension, mic windscreen, headphone hanger hook | $150 | Buy once, buy decent. Mogami or Hosa for audio. |

### Price summary

| If you already own... | Total |
|---|---|
| SM7B + cables + headphones | **~$2,097** |
| Nothing | **~$2,647** |

### What you're NOT buying at Tier 1

- No Dorrough meters (software meters on the 5K iMac screen are better at this price point — upgrade to hardware in Tier 2)
- No broadcast console (the Tascam Model 16 IS the board — it's not a dedicated broadcast console with talkback and mix-minus, but it has real VUs and sounds great)
- No cue speakers (use the headphones at Tier 1 — add Yamaha HS5 nearfield monitors later for $400/pair)
- No patch bay (not needed until you have more than 8 sources)
- No acoustic treatment (the garage has concrete walls — hang some moving blankets for now, proper panels later)

---

## Tier 2 upgrades (add when budget allows, $2,000-4,000 more)

| Upgrade | Model | Est. price | Why |
|---|---|---|---|
| **Dorrough level meters (pair)** | Dorrough 40-A (used) | $600-1000 | THE iconic radio meter. One for program out, one for stream return. Rackmount. Makes any visitor say "this is a real station." |
| **Nearfield monitors** | Yamaha HS5 (pair) | $400 | Cue speakers so you're not always on headphones. |
| **Broadcast console upgrade** | RadioSystems R-1 or Wheatstone E-1 (used) | $1,500-3,500 | Actual on-air console with VCA faders, talkback, cue bus. Replaces the Tascam as the main board. |
| **Dual CD deck** | Denon DN-500CB | $499 | Two trays, seamless cueing, pitch control. |
| **Vintage reel-to-reel** (decorative) | Revox A77 or B77 (used) | $400-800 | Doesn't have to work. Just has to be there with the heads visible. The listener count goes up when there's a reel-to-reel in the room. |
| **Cloudlifter + preamp for SM7B** | Cloudlifter CL-1 ($149) + Heritage Audio HA-73 ($750) | $900 | The SM7B is quiet. +20 dB of clean gain from a Cloudlifter is the minimum; a Heritage 1073 clone is the "sounds like NPR" upgrade. |
| **Acoustic panels** | GIK Acoustics 244 (6-pack) | $600 | Bass traps + absorption panels. Makes the room sound like a studio, not a garage. |

---

## The ingest workflow

### Four input paths, one destination

```
┌────────────────────────────────────────────────────────────┐
│  THE GARAGE STUDIO                                          │
│                                                              │
│  [1. CD deck]                                                │
│       │ analog out ──→ Tascam Model 16 ch 1-2               │
│       │ (or S/PDIF ──→ iMac directly via adapter)           │
│                                                              │
│  [2. Turntable]                                              │
│       │ phono pre (internal) ──→ Model 16 ch 3-4            │
│       │ (or USB ──→ iMac directly for cleanest capture)     │
│                                                              │
│  [3. Thumb drive / SD card]                                  │
│       │ front-panel USB hub ──→ Finder auto-mounts          │
│       │ ──→ ~/ingest/usb/ (fswatch picks up)                │
│                                                              │
│  [4. Network drop]                                           │
│       │ email / AirDrop / shared folder / Dropbox            │
│       │ ──→ ~/ingest/network/ (fswatch picks up)            │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│                                                              │
│  Tascam Model 16 ──USB──→ iMac (Audio Hijack captures)     │
│                                                              │
│  iMac writes to:  ~/ingest/{cd,vinyl,usb,network}/          │
│       ▼                                                      │
│  [ingest-watch.sh] — prompts for metadata (artist, title,   │
│  genre, source), writes ID3 tags, moves to staging          │
│       ▼                                                      │
│  ~/BigMuddy-Ingest-Staging/  (tagged, reviewed, approved)   │
│       ▼ (nightly rsync via SSH at 3 AM)                     │
│  Mac mini T7: /Volumes/T7/Music/BigMuddy-Radio-Library/     │
│       ▼                                                      │
│  OpenBroadcaster media library scan (auto or manual)         │
│       ▼                                                      │
│  Scheduled playlist or "Fresh Ingest" rotation               │
└────────────────────────────────────────────────────────────┘
```

### The nightly rsync

```bash
#!/bin/bash
# sync-ingest-to-mini.sh — runs nightly via launchd on the iMac
# Pushes approved ingest files from the iMac to the production mini's T7

STAGING=~/BigMuddy-Ingest-Staging
REMOTE=ClawdBOT@192.168.4.37:/Volumes/T7/Music/BigMuddy-Radio-Library/Ingest-$(date +%Y-%m-%d)/

rsync -avz --progress \
  -e "ssh -i ~/.ssh/id_mini" \
  "$STAGING/" "$REMOTE"

# If rsync succeeds, move staged files to a "sent" archive on the iMac
if [ $? -eq 0 ]; then
  mkdir -p ~/BigMuddy-Ingest-Archive/$(date +%Y-%m-%d)
  mv "$STAGING"/* ~/BigMuddy-Ingest-Archive/$(date +%Y-%m-%d)/ 2>/dev/null
  echo "[$(date)] Synced $(ls ~/BigMuddy-Ingest-Archive/$(date +%Y-%m-%d)/ | wc -l) files to mini" \
    >> ~/BigMuddy-Ingest-Archive/sync.log
fi
```

### The ingest watch script

```bash
#!/bin/bash
# ingest-watch.sh — runs on the iMac via launchd
# Watches ~/ingest/ for new audio files, sends a notification

INBOX=~/ingest

/opt/homebrew/bin/fswatch -0 --event Created "$INBOX" | while read -d "" file; do
  ext="${file##*.}"
  case "$ext" in
    wav|mp3|flac|m4a|aiff|ogg)
      osascript -e "display notification \"New file: $(basename "$file")\" with title \"Big Muddy Ingest\""
      # Future: auto-prompt for metadata via a simple Automator/SwiftUI dialog
      ;;
  esac
done
```

### Metadata tagging

For Tier 1, metadata tagging is manual:
1. Audio Hijack captures the file
2. Operator opens the file in a metadata editor (Kid3, MusicBrainz Picard, or just Finder's Get Info)
3. Tags: Artist, Title, Album (use "Big Muddy Radio Library"), Genre, Year, Comment ("source: cd" or "source: vinyl" or "source: usb")
4. Moves the tagged file from `~/ingest/` to `~/BigMuddy-Ingest-Staging/`
5. The nightly rsync picks it up

For Tier 2, this becomes a lightweight web UI on the iMac (localhost:3000) where you can see the ingest queue, add metadata via form fields, preview audio, and approve for staging. Not built yet — future work.

---

## Physical room layout

```
┌──────────────────────────────────────────────────────┐
│                   GARAGE STUDIO                       │
│                                                        │
│   ┌─────────────────────────────────────────────┐     │
│   │  [WALL: ON AIR light + clock + show posters] │     │
│   └─────────────────────────────────────────────┘     │
│                                                        │
│   ┌──────────────────┐  ┌──────────────────────┐      │
│   │                  │  │                      │      │
│   │   iMac 27"       │  │  Tascam Model 16     │      │
│   │   (meters, dash, │  │  (mixer, center of   │      │
│   │    AzuraCast,    │  │   desk, VU meters    │      │
│   │    now playing)  │  │   facing operator)   │      │
│   │                  │  │                      │      │
│   └──────────────────┘  └──────────────────────┘      │
│          │                        │                    │
│    [keyboard/mouse]         [SM7B on boom]             │
│                                                        │
│   ┌────────────────────────────────┐                  │
│   │  8U RACK (beside or under desk) │                  │
│   │  ┌──────────────────────────┐  │                  │
│   │  │ Furman M-8x2 (power)    │  │                  │
│   │  ├──────────────────────────┤  │                  │
│   │  │ Tascam CD-200            │  │                  │
│   │  ├──────────────────────────┤  │                  │
│   │  │ (future: Dorrough meters)│  │                  │
│   │  ├──────────────────────────┤  │                  │
│   │  │ (future: patch bay)      │  │                  │
│   │  ├──────────────────────────┤  │                  │
│   │  │ USB hub — "INGEST"       │  │                  │
│   │  └──────────────────────────┘  │                  │
│   └────────────────────────────────┘                  │
│                                                        │
│   [Turntable on a side table or shelf]                 │
│   [Vinyl crate within arm's reach]                     │
│   [Guest stool / chair opposite the mic]               │
│                                                        │
│   [Headphones on a hook by the iMac]                   │
│   [CD wall rack behind the desk]                       │
│                                                        │
└──────────────────────────────────────────────────────┘
```

---

## Build checklist

### Phase 1 — Buy (week 1)

- [ ] Order 32 GB RAM kit for the iMac ($50, OWC or Crucial, DDR3L 1867 MHz)
- [ ] Order Tascam Model 16 ($999)
- [ ] Order Tascam CD-200 ($349)
- [ ] Order Audio-Technica AT-LP120XUSB ($399)
- [ ] Order Rode PSA1+ boom arm ($130)
- [ ] Order Sony MDR-7506 headphones ($100)
- [ ] Order Gator GRR-8L 8U rack ($180)
- [ ] Order Furman M-8x2 power conditioner ($90)
- [ ] Order ON AIR light ($50)
- [ ] Order wall clock ($35)
- [ ] Order USB hub + cables ($165)
- [ ] Source SM7B (confirm already owned)

### Phase 2 — Install (week 2)

- [ ] Install 32 GB RAM in the iMac (10-minute job, YouTube guide for iMac17,1)
- [ ] Move iMac from Tracy's desk to the garage studio desk
- [ ] Set up the rack: power conditioner (bottom), CD deck (middle), USB hub (top, front-facing)
- [ ] Place mixer on desk, connect to iMac via USB
- [ ] Place turntable on side table, connect RCA to mixer ch 3-4 + USB to iMac
- [ ] Connect CD deck analog out to mixer ch 5-6
- [ ] Mount boom arm, attach SM7B, connect XLR to mixer ch 1
- [ ] Mount ON AIR light above the door
- [ ] Mount clock on the wall in the operator's eyeline
- [ ] Hang headphones on a hook by the iMac

### Phase 3 — Software (week 2-3)

- [ ] Install Homebrew on the iMac: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- [ ] `brew install rsync fswatch ffmpeg`
- [ ] Buy + install Audio Hijack ($72): https://rogueamoeba.com/audiohijack/
- [ ] Install meters.fyi ($5) or Youlean Loudness Meter (free)
- [ ] Install VLC (free)
- [ ] Create ingest directory structure: `mkdir -p ~/ingest/{cd,vinyl,usb,network} ~/BigMuddy-Ingest-Staging ~/BigMuddy-Ingest-Archive`
- [ ] Write and install `ingest-watch.sh` as a launchd agent
- [ ] Write and install `sync-ingest-to-mini.sh` as a launchd agent (nightly 3 AM)
- [ ] Set up SSH key from the iMac to the mini (`ssh-keygen -t ed25519` + copy public key to mini's authorized_keys)
- [ ] Test rsync: `rsync -avz -e "ssh -i ~/.ssh/id_ed25519" ~/ingest/test.wav ClawdBOT@192.168.4.37:/Volumes/T7/Music/test/`
- [ ] Open Audio Hijack, create a "CD Ingest" session (input: Tascam USB ch 5-6, output: ~/ingest/cd/)
- [ ] Create a "Vinyl Ingest" session (input: Tascam USB ch 3-4, output: ~/ingest/vinyl/)
- [ ] Create a "Mic Record" session (input: Tascam USB ch 1, output: ~/ingest/mic/)

### Phase 4 — Verify (week 3)

- [ ] Ingest a test CD: insert, play, Audio Hijack captures, file appears in ~/ingest/cd/
- [ ] Ingest a test record: place, play, capture, file appears in ~/ingest/vinyl/
- [ ] Ingest a test thumb drive: plug in USB, file appears in ~/ingest/usb/, fswatch notification fires
- [ ] Verify nightly rsync: manually trigger sync-ingest-to-mini.sh, confirm file appears on T7
- [ ] Verify OB picks up the new file in its media library scan
- [ ] Play the ingested file on Big Muddy Radio and verify it streams to the droplet
- [ ] Full chain test: vinyl → mixer → iMac → ingest → rsync → T7 → OB → AzuraCast → listener

### Phase 5 — Cosmetic (ongoing)

- [ ] Print and mount Big Muddy show posters on the garage walls
- [ ] Set up a CD wall rack for incoming discs
- [ ] Build or buy a vinyl crate/shelf within arm's reach of the turntable
- [ ] Decide if you want a guest mic (second SM7B + boom for interviews)
- [ ] Consider acoustic treatment (moving blankets for now, GIK panels for Tier 2)

---

## Tracy's replacement workstation

The iMac is moving to the garage. Tracy needs something for her admin/finance/editorial work.

**Cheapest path:** Tracy already has the `bigmuddy@chasepierson.tv` shared seat on Asana (set up tonight). She can use her iPhone or iPad for Asana, Gmail, Google Drive, and the admin dashboard. For actual document editing (QuickBooks, spreadsheets), an iPad with keyboard cover works. She doesn't need a desktop for her current role — she needs Asana, email, Drive, and occasionally the admin dashboard.

**If she needs a screen:** a used iMac or a Mac mini M2 ($599) + any monitor. But don't buy this until she asks for it. The iPad-first workflow we built tonight may be enough.

---

## What this spec does NOT cover

- **Broadcast console upgrade** (Tier 2 — Wheatstone or RadioSystems, $1,500-3,500)
- **Audio processing** (Omnia VOLT or Orban stream processor for "sounds like FM" quality, $1,500-3,000)
- **LPFM licensing** (if Big Muddy Radio ever applies for an FCC low-power FM license, there's a whole separate equipment + compliance stack)
- **Video streaming from the booth** (OBS + a webcam + streaming to TikTok/YouTube — possible but separate spec)
- **The FM transmitter chain** (already on the mini, stays there — the iMac doesn't touch FM)

---

**File:** `docs/specs/GARAGE_RADIO_STATION.md`
**Author:** CoS, with pricing verified against B&H Photo and Amazon as of April 2026
**Status:** Ready for Chase to review and authorize purchases
