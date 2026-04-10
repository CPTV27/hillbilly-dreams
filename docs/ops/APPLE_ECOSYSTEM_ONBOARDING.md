# Apple Ecosystem Onboarding — The HDI Way

**Who this is for:** Chase, Tracy (first), then Amy, then anyone else who joins HDI with an Apple device.
**What this does:** Turns a normal iPad into a focused HDI creative workstation, wires it into HomeKit / Homebridge, and leaves you with something you can hand to someone without apologizing.
**How long it takes:** 90 minutes per iPad the first time, 30 minutes after you've done one.
**Prerequisites:** Bitwarden installed and unlocked on whatever machine you're prepping from. No Apple ID surgery required — everyone keeps their personal Apple ID.

---

## The Philosophy

1. **We don't steal Apple IDs.** Chase keeps his, Tracy keeps hers, Amy keeps hers. Personal identity stays personal. HDI lives on top of it via Family Sharing, shared Home, and shared iCloud Drive folders.
2. **We don't wipe the device.** Wiping costs a day and breaks trust. We curate in place: back up first, remove the clutter with the owner watching, install the HDI stack, leave them smiling.
3. **We keep the creative suite.** CapCut, Lightroom, Photoshop, and everything else used to make pictures or video stays. The rule: if it touches a camera, a photo, or a video, it survives.
4. **We remove the rest.** Every pre-installed app that doesn't serve HDI's work goes. Every random game, every social trap, every "might use it someday" free app. The home screen ends with <40 icons and five folders.
5. **We make it a workstation, not a phone.** The iPad's job when it's at HDI is to run The Foreman, edit photos, review copy, and control HomeKit scenes. Personal usage is fine but the defaults point at work.

---

## Phase 0 — Before You Touch the Device

### Credentials audit (in Bitwarden)
Confirm these exist in Bitwarden before starting. If any are missing, add them first.

- [ ] Apple ID (owner's personal)
- [ ] Apple ID 2FA recovery phone (owner's)
- [ ] HDI Google Workspace account (me@chasepierson.tv, etc.)
- [ ] Bitwarden master password (owner's)
- [ ] Adobe Creative Cloud login
- [ ] Vercel dashboard access (Chase only)
- [ ] Mac mini SSH key and password (Chase only — ClawdBOT)
- [ ] Bigmuddytouring.com admin credentials
- [ ] Deep South Directory admin credentials
- [ ] Postiz admin (http://192.168.4.37:4007)
- [ ] OpenBroadcaster admin (admin/bigmuddy2026)
- [ ] Any other HDI service the person will actually need

### Hardware shopping list (one-time)
Buy these before you start:

- [ ] **APC Back-UPS 850VA** — ~$120 (UPS for the Mac mini — prerequisite for everything)
- [ ] **HomePod mini** — ~$100 (the real HomeKit hub; sits at the Inn eventually)
- [ ] **USB-C to Lightning / USB-C cable** that's long enough to leave the iPad tethered during setup
- [ ] Optional: **Apple TV 4K** (~$130) if the Inn will have a TV station — also qualifies as a HomeKit hub

You can start on the iPads without the HomePod, but Homebridge and Home app remote access need an Apple hub on the network before they're fully useful.

### Backup the iPad
Before removing anything:

1. Plug the iPad into a Mac with enough free disk space (~30–100 GB depending on contents)
2. Open Finder → select the iPad in the sidebar → **Back up all of the data on this iPad to this Mac**
3. Check **Encrypt local backup** (required to back up passwords and Health data)
4. Save the encryption password in Bitwarden
5. Wait for the backup to finish before doing anything destructive

If the iPad is the owner's personal primary device: ALSO make sure iCloud Backup is on and current (Settings → [Apple ID] → iCloud → iCloud Backup → Back Up Now).

**Do not proceed until the backup finishes and you can see the .ipa file on the Mac.**

---

## Phase 1 — Apple Account + Device Setup

### On the iPad

1. **Settings → General → Software Update** → install the latest iPadOS. Do this with the iPad plugged in.
2. **Settings → [Apple ID] → iCloud** → confirm the owner's personal Apple ID is signed in. Do not change it.
3. **Settings → [Apple ID] → Family Sharing** → set up Family Sharing if not already done. Invite Chase, Tracy, Amy to the same family. This lets you share:
   - One HomeKit Home
   - Shared iCloud Drive folders
   - App purchases (so HDI doesn't buy the same app four times)
   - Calendar and Reminders lists
4. **Settings → Screen Time** → leave this off unless the owner wants it. Do not set it up as a surveillance tool — that destroys trust instantly.
5. **Settings → Privacy & Security → Location Services** → leave on for Camera, Maps, Weather, Find My. Turn off for everything else.
6. **Settings → Apple ID → Find My** → confirm Find My iPad is on. Add the iPad to Chase's Find My network so a lost iPad at a show or the Inn can be located.

### Set up Handoff + Universal Control
7. **Settings → General → AirPlay & Handoff** → turn on Handoff. This lets the iPad pass work to a Mac in the same Apple ID seamlessly.
8. If the owner has a Mac as well: **Universal Control** on so they can drive the iPad with the Mac's keyboard and trackpad when sitting next to it.

### Set up iCloud Drive
9. **Settings → [Apple ID] → iCloud → iCloud Drive** → ON.
10. Create a Family Shared folder in Files app called **`HDI`** with subfolders:
    - `HDI/Photos Inbox` — drop zone for photos before they go into Lightroom
    - `HDI/Video Inbox` — same for video
    - `HDI/Briefs` — project briefs from Chase
    - `HDI/Handoffs` — handoff documents from spawned agents (once The Foreman ships)
    - `HDI/Contracts` — signed vendor / artist contracts
    - `HDI/Financials` — read-only for Amy + Miles + Elijah, read-write for Tracy + Chase

Share the `HDI` folder with the Family Sharing group.

---

## Phase 2 — App Curation (The Brutal Pass)

### Apps to KEEP (creative suite + essential system)

**Creative — cameras, photos, video (the "our creative suite" rule):**
- Camera (system)
- Photos (system)
- Lightroom (Adobe)
- Photoshop (Adobe)
- Lightroom sync / Creative Cloud (Adobe)
- CapCut
- LumaFusion (if installed — pro alternative for video)
- Halide or ProCamera (if installed — pro manual camera)
- Darkroom (if installed — photo editing)
- Procreate (if installed — illustration)
- Affinity Photo / Designer (if installed)

**Audio:**
- Voice Memos (system)
- Music (system — for radio curation reference)
- Podcasts (system — for show research)
- GarageBand (system) — keep, it's free and useful for quick edits
- Ferrite (if installed — podcast production)

**Productivity — the boring load-bearing stuff:**
- Safari (system — default browser)
- Mail (system)
- Calendar (system)
- Contacts (system)
- Notes (system)
- Reminders (system)
- Messages (system)
- FaceTime (system)
- Maps (system)
- Weather (system)
- Files (system — shared folders live here)
- Shortcuts (system — CRITICAL for HDI voice automation)
- Freeform (system — whiteboarding)
- Home (system — HomeKit control)
- Find My (system)
- Settings (system)

**Creative adjacent:**
- GoodNotes or Notability (whichever the owner prefers — handwritten notes for interviews)
- Adobe Capture (color picking for brand work)
- Microsoft Lens or Adobe Scan (document scanning)

### Apps to INSTALL (HDI stack)

**The HDI creative cloud:**
- Claude (from the App Store — the official Anthropic app for voice conversations)
- Google Drive, Google Docs, Google Sheets, Google Slides (for shared working docs)
- Gmail (for me@chasepierson.tv and related HDI addresses)
- Google Calendar (sync with iCloud calendar)

**Password manager:**
- Bitwarden (set as autofill provider in Settings → Passwords → Autofill)

**Code + dev (Chase only — remove from Tracy's iPad):**
- Working Copy (git on iPad)
- Termius (SSH client — for reaching the Mac mini)
- a-Shell or iSH (terminal emulator for light work)

**Communication + meetings:**
- Zoom
- Slack (if we adopt it)

**Media production pipeline:**
- Postiz is a web app — bookmark http://192.168.4.37:4007 in Safari with the "Add to Home Screen" flow so it behaves like a native app
- Plex (from App Store) — connects to the Mac mini's Plex server
- OpenBroadcaster admin is a web app — bookmark http://192.168.4.37:8080

### HDI Home Screen folder structure

When you're done removing and installing, organize the home screen into exactly these folders on page one:

```
HDI        — The Foreman (PWA), bigmuddytouring admin, DSD admin,
             deepsouthdirectory, Delta Dawn, photo search
📷 CAMERA   — Camera, Halide / ProCamera, Lightroom, Photoshop,
             Darkroom, Procreate
🎬 VIDEO    — CapCut, LumaFusion, Voice Memos, GarageBand, Ferrite
🏠 HOME     — Home (HomeKit), Find My, Shortcuts, Settings
📂 FILES    — Files, Notes, GoodNotes, Freeform, Adobe Scan

Front page (no folder):
Safari, Mail, Messages, Calendar, Reminders, Bitwarden, Claude
```

Everything else goes on page 2 or gets removed.

### Apps to REMOVE (the brutal pass)

**Pre-installed Apple apps that can be removed (long-press → Remove App → Delete App):**
- Tips
- Stocks (unless Chase actively uses it)
- News (use a real RSS reader if needed)
- Apple TV app (unless the iPad lives at the Inn as a display)
- iTunes Store (if present — redundant with Music/Podcasts)
- Home depot of random Apple demo apps

**Social / attention traps (ALL go on Tracy's iPad; Chase's iPad keeps only what he actively uses for work):**
- Facebook
- Instagram (keep on Chase's if he posts for the brands; otherwise the posting happens through Postiz anyway)
- TikTok (same rule — keep on Chase's only if he still scouts there)
- Twitter / X (remove unless it's a work channel)
- Reddit
- Threads
- Mastodon / Bluesky
- Pinterest (actually keep — useful for photo reference)

**Games:** All of them. No exceptions. Even the "I just play this sometimes" ones. If the owner protests, compromise on ONE game kept in a folder called "Off Duty" that gets checked once a month for whether it stayed useful.

**Shopping:** Amazon, Target, Walmart, etc — remove. The iPad is not a shopping device. If you need to buy something, the owner can use their phone.

**Food delivery:** DoorDash, Uber Eats, etc — remove. Not for work.

**Streaming:** Netflix, Hulu, Disney+, HBO, Prime Video — remove from work iPads. If the iPad lives at the Inn as a TV, that's a different device category.

**Banking apps:** Leave on the owner's personal iPad only. Never on a "work" iPad, period. Financial exposure risk + confusion over whose device did the transaction.

**Utility junk:** flashlights, level apps, QR scanners (built into Camera now), weather-besides-the-default, random "free PDF merge" apps. All go.

**Dating apps, news aggregators, horoscopes, free-trial apps from 2019:** All go.

### The Rule When You're Unsure

> If removing it would make the owner uncomfortable, leave it. If installing it would make the owner roll their eyes, skip it. This is their device first and a work device second.

---

## Phase 3 — HDI Integration (Shortcuts + PWAs + Siri)

### Add Progressive Web Apps (PWAs) to the Home Screen

In Safari, visit each of these URLs, tap the Share button, tap **Add to Home Screen**, and give it a clean name. These behave like native apps after that.

| URL | Home Screen Name | Icon Location |
|---|---|---|
| https://bigmuddytouring.com/admin | BMT Admin | HDI folder |
| https://bigmuddytouring.com/admin/photos | Photo Search | HDI folder |
| https://deepsouthdirectory.com/admin | DSD Admin | HDI folder |
| https://bigmuddytouring.com/demo/presentation | Whole Story | HDI folder |
| http://192.168.4.37:4007 | Postiz | HDI folder (only when on Mac mini LAN) |
| http://192.168.4.37:8080 | Broadcast | HDI folder (only when on Mac mini LAN) |
| http://192.168.4.37:5055 | Notebook | HDI folder (only when on Mac mini LAN) |
| (future) The Foreman URL | Foreman | HDI folder, top-left |

### Install Siri Shortcuts

Open the Shortcuts app and import these (we'll ship the .shortcut files once they exist; for now this is a checklist of what to build):

- [ ] **"Spawn an agent"** — Hey Siri, spawn an agent → voice dictation → POST to The Foreman's agent-spawn endpoint
- [ ] **"What's happening today?"** — reads the Chief of Staff digest (once that ships) aloud
- [ ] **"Open the Foreman"** — opens the PWA
- [ ] **"Play Big Muddy Radio"** — starts the Icecast stream in Music
- [ ] **"Show me the Inn"** — opens the Inn admin dashboard
- [ ] **"Go live"** — triggers the Blues Room show scene (HomeKit) AND starts the broadcast
- [ ] **"Call Tracy"** (Chase's iPad only)
- [ ] **"Text Amy"** (Chase's iPad only)

Until these shortcuts are built, skip this section. Come back after the Foreman ships a real API.

### Set Default Browser, Mail Client
- Settings → Safari → leave as default browser
- Settings → Mail → leave as default
- Do not switch to Chrome/Gmail as defaults — iPad integrations break when the default is not Apple's.

---

## Phase 4 — HomeKit + Homebridge Setup

### Step 1: Plug in the HomePod mini at the studio
1. Unbox the HomePod mini, plug it in
2. Bring the iPad near it
3. Follow the on-screen setup prompts — add to the owner's Home (the Family Sharing Home)
4. Room: "Studio"
5. This is now your HomeKit hub

### Step 2: Create the HDI Home (if not already)
1. Open Home app
2. Tap the **+** → **Add New Home**
3. Name it: **"Big Muddy"**
4. Add rooms: Studio, Blues Room, Inn Lobby, Inn Room 1, Inn Room 2, etc.
5. Invite Tracy, Amy, Chase as **Owners** (not Guests — they need scene control)
6. Invite future guests (Arrie, visiting artists) as **Guests** with scoped access

### Step 3: Install Homebridge on the Mac mini
On the Mac mini (SSH in from the MacBook, or use Screen Sharing):

```bash
# Prerequisites
brew install node

# Install Homebridge + Config UI
sudo npm install -g --unsafe-perm homebridge homebridge-config-ui-x

# Set up as a service that auto-starts
sudo hb-service install --user homebridge
```

Then on the iPad, open Safari → `http://192.168.4.37:8581` (Homebridge's default UI port) → configure.

Pair the Homebridge bridge to the Home app by scanning the QR code it generates.

### Step 4: Add starter plugins
From the Homebridge UI:
- **homebridge-http-switch** — turn any URL into a HomeKit switch (use this to wire OpenBroadcaster's "on air" status into the Home app)
- **homebridge-camera-ffmpeg** — expose any RTSP/HTTP camera as a HomeKit camera
- **homebridge-http-temperature-sensor** — for monitoring the Mac mini's CPU temp as a fake thermometer
- **homebridge-dummy** — creates virtual switches you can use as scene triggers

### Step 5: First useful automation
Wire one thing end to end to prove it works:

> When an iPad taps "Go Live" in Shortcuts, Homebridge switches the virtual "On Air" accessory on, which triggers a HomeKit automation that turns a physical smart plug on (connected to an "ON AIR" sign), and simultaneously calls the OpenBroadcaster start-stream API.

If you can do that once, you can do anything. Every other HomeKit automation is the same pattern with different endpoints.

---

## Phase 5 — The "Take Over Tracy's iPad" Procedure

This is the trust-critical part. Do it with Tracy in the room, not behind her back.

### Before
1. Text Tracy: *"Want to let me set up your iPad as the HDI workstation tomorrow? About an hour, I'll do it in front of you, and you tell me to leave anything alone."*
2. Wait for yes.
3. Confirm backup from Phase 0 is done (full Finder backup + iCloud backup current).

### During (with Tracy sitting next to you)
1. Walk through Phase 1 together. Show her Family Sharing, explain iCloud Drive folders, confirm you're not changing her Apple ID.
2. Phase 2 — apps. **Ask her on every single app you want to remove.** She says keep? It stays. She says remove? Done. Document her requests in `docs/ops/tracy-ipad-preferences.md` so the next time someone does this, they know.
3. Phase 3 — install PWAs and bookmarks together. Let her log into BMT Admin herself. Do not handle her passwords.
4. Phase 4 — add her to the HDI Home. Show her the Home app, show her the Scenes she'll use.
5. Walk her through her home screen. If she hates the layout, rearrange until she likes it.

### After
1. Tell her: *"Anything on here you regret, text me and I'll put it back in two minutes."*
2. Write a short note in `docs/ops/tracy-ipad-setup-YYYY-MM-DD.md` with what changed, and pin the .ipa backup location.
3. Come back in a week. Ask what's bothering her. Fix it.

### For Chase's own iPad
Same procedure, but Chase is both the operator and the owner. No need to ask himself permission. Still do the backup first.

---

## Phase 6 — Apple Business Manager (LATER)

If HDI ever has 5+ Apple devices (Tracy, Amy, Chase, Miles, Elijah, a shared Inn iPad, an Arrie iPad...), stop using Family Sharing and set up **Apple Business Manager**. That gets you:
- Device enrollment program (DEP)
- Managed Apple IDs under the HDI domain
- Centralized app deployment
- Remote wipe without losing the personal stuff
- Audit logs

**Do not set this up now.** Family Sharing is the right call for 2–4 devices. Revisit when Elijah and Miles join officially.

---

## Changelog

- **2026-04-10** — Doc created by Claude (vigilant-dubinsky worktree) after Chase said "we need to do proper onboarding with all the Apple stuff because I don't even know how to do it." First target: Tracy's iPad, then Chase's.
