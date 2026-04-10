# Amy's Computer Setup — Full Handoff
**Machine:** Amy's computer (Mac), freshly installed with Claude Code + Asana
**Date:** 2026-04-10
**Operator:** Chase (sitting next to Amy, running through this doc with her)
**Status:** Chase's identity already on the machine. Non-destructive organization pass.

---

## Who this machine is for

**Amy Allen** — equity partner in Hillbilly Dreams Inc., equity partner at The Big Muddy Inn, Inn & Bar Ops lead. Also a musician — her band is literally why HDI exists (Chase got hired to promote Amy's band; they built the media company to do it).

**What Amy uses this machine for:**
- Inn operations — guest check-in, calendar, room turns, inventory, bar management
- Bar ops — liquor inventory, show night prep, receipts
- Music — listening to Mechanical Bull mixes from JP, reviewing her catalog, approving releases for Big Muddy Records
- Content approval — Amy is one of the two humans who approves everything before it goes live (the other is Tracy)
- Social media — the friends-and-family onboarding for DSD businesses and artists
- Email + Asana — daily team communication

**What Amy does NOT do on this machine:**
- Write code (that's Chase)
- Deploy anything
- Touch the Mac mini broadcasting stack
- Manage Vercel or GitHub
- Anything that needs a terminal

---

## The non-destructive rules (philosophy)

This is the same philosophy we used for Tracy's iMac and the iPads. Read this before touching anything:

1. **We don't wipe the device.** Curate in place. Back up first if anything important isn't in iCloud.
2. **Ask permission on every single removal.** Amy says keep? It stays. Full stop.
3. **Keep the creative suite.** Any app that touches photos, video, or audio survives unless Amy says otherwise.
4. **We make it a workstation, not a phone.** Work defaults, work bookmarks, work folders. Personal use stays personal; we don't audit or touch her personal stuff.
5. **When in doubt, leave it alone.** "Not sure if this is important?" → leave it alone. Chase can come back in a week and clean up one more thing if needed.
6. **No Apple ID surgery.** Amy keeps her Apple ID. HDI lives on top via Family Sharing and shared folders.

**Trust rule:** Amy sits next to Chase the whole time. Nothing happens without her seeing it. Small boring demo of exactly what Chase is doing, in plain English, before doing it.

---

## The Fleet — where Amy's machine fits

| Machine | IP | User | Role |
|---|---|---|---|
| MacBook Pro | local (Chase's) | chasethis | Dev, code, deployment, Claude Code primary |
| Mac mini | 192.168.4.37 | ClawdBOT | Broadcasting, Plex, Icecast, Postiz, services |
| Tracy's iMac | 192.168.4.26 | tracyfort | Inn ops, hospitality, bookings, finance |
| **Amy's computer** | _(assign a static IP — TODO)_ | _(TBD)_ | Inn & Bar Ops, music, content approval, shared bigmuddy@ account |

After this setup is done, update this table with Amy's actual IP + username.

---

## Amy's identities (both accounts)

Amy operates through TWO email identities. She needs to be logged into both on this machine:

| Identity | Email | Used for |
|---|---|---|
| **Personal** | `amyaldersonallen@gmail.com` | Her own Asana account, personal Gmail, personal Drive |
| **Shared Big Muddy** | `bigmuddy@chasepierson.tv` | The shared Asana Advanced seat Amy shares with Tracy for Big Muddy business; shared Gmail; shared Google Drive folder access |
| **Inn operational** | `amy@thebigmuddyinn.com` | The Inn's operational email (guests, vendors, suppliers) — this is a Google Workspace alias under the Inn's domain |

All three are active. The shared `bigmuddy@chasepierson.tv` is the newest (created 2026-04-10). She should be logged into all three in the browser (Chrome profiles or Safari Profiles), plus at minimum `amyaldersonallen@gmail.com` in the macOS Mail app.

---

## Task 1 — Verify Chase's identity is set up (pre-work)

Chase already did this. Quick verification:

- [ ] Chase's Apple ID is signed in (or Amy's is — confirm which it is and whether that's what we want)
- [ ] Claude Code is installed and runs (open Terminal, type `claude --version`)
- [ ] Asana app is installed and visible in Applications
- [ ] Terminal, Finder, Safari, Mail are all accessible (stock macOS apps)
- [ ] Confirm macOS version: `sw_vers -productVersion` — should be macOS 14 or 15

Note which user account we're setting up under. If Chase is on HIS Apple ID, we need to either:
- (a) Finish this as Chase's account, then hand over to Amy's account later (cleaner separation)
- (b) Switch to Amy's Apple ID now before installing apps (but that risks breaking things)

**Recommend (a)** — finish the HDI-layer setup under Chase's account, then Amy logs in with her Apple ID in a new macOS user account afterward and everything in the HDI folder is visible to both (since HDI files live in shared Drive + iCloud).

---

## Task 2 — Claude Code configuration

Claude Code is installed. Now configure it to match the HDI fleet:

### 2a. Confirm the identity file exists
```bash
ls -la ~/.claude/CLAUDE.md
```

If it doesn't exist, copy the current fleet-wide identity from Chase's MacBook Pro:
```bash
# From Chase's MacBook, with SSH already set up:
scp ~/.claude/CLAUDE.md amy-mac:~/.claude/CLAUDE.md
```

Or manually: create `~/.claude/CLAUDE.md` with the HDI team identity + domain list + active focus (copy from Chase's version).

### 2b. Verify the HDI repo is checked out
If this machine will be used to make commits (Chase might use it occasionally):
```bash
cd ~
git clone git@github.com:CPTV27/hillbilly-dreams.git
# OR if GitHub auth needs to be set up:
gh auth login
```

If Amy's never going to touch code directly, skip this. Claude Code can work without a repo checkout by using the web-based tools.

### 2c. API key (if applicable)
Claude Code uses Chase's subscription. If Chase is logged in under his own Apple ID on this machine, Claude Code should pick up his login automatically.

If Amy will use Claude Code as herself, she needs her own Claude account or she uses Chase's login as a shared resource — **this is a Chase decision.** Recommend: Chase's account runs Claude Code on this machine, Amy is a user of the OUTPUT (tasks, briefs, summaries) not the CLI itself.

### 2d. Launch Claude Code and confirm it works
```bash
cd ~/hillbilly-dreams   # or wherever the repo lives
claude
```

Type `/help` to confirm it's alive. Then quit.

---

## Task 3 — Google Drive for Desktop (CRITICAL — this is the main ask)

This is the part Chase wants locked down: **Amy needs to know exactly where to put files on her computer so they sync to the shared Google Drive automatically.**

### 3a. Install Google Drive for Desktop

1. Download from <https://www.google.com/drive/download/>
2. Install (drag to Applications)
3. Launch it. It shows up as a menu bar icon (looks like a Drive triangle)

### 3b. Sign in with BOTH accounts

Google Drive for Desktop supports **multiple accounts simultaneously.**

1. Sign in first with **`amyaldersonallen@gmail.com`** (her personal)
2. Then add a second account: Drive menu bar icon → Settings gear → Preferences → **Add account**
3. Sign in with **`bigmuddy@chasepierson.tv`** (the shared Big Muddy account)
4. If she also has credentials for `amy@thebigmuddyinn.com` and wants that synced, add it as a third account

### 3c. Configure folder streaming vs. mirroring

Drive for Desktop has two modes:
- **Streamed (default)** — files live in the cloud, downloaded on demand. Good for most cases.
- **Mirrored** — full copies always on disk. Better for photos and videos Amy works with offline.

**Recommend:**
- `My Drive` (personal) → Streamed
- `bigmuddy@` shared → **Mirrored** (this is where Amy puts work files; she wants them always available even if the internet is down)
- Large video folders → Streamed (too much disk space otherwise)

Set this per-folder via Drive Preferences → Google Drive tab → Folder options.

### 3d. Create the HDI folder structure in the shared Drive

This is the canonical structure Amy uses. Chase creates these folders once, in the `bigmuddy@chasepierson.tv` Drive, shared with Amy + Tracy:

```
Big Muddy/
├── 00-INBOX/                  ← Drop zone for photos/videos/notes from the field
│   ├── photos-to-process/     ← New photos, unsorted
│   ├── videos-to-process/     ← New videos, unsorted
│   └── voice-memos/           ← Audio dictations from the field
├── 01-MAGAZINE/               ← Big Muddy Magazine drafts + published
│   ├── drafts/
│   ├── published/
│   └── photos/
├── 02-RADIO/                  ← Big Muddy Radio playlists, stingers, show notes
├── 03-RECORDS/                ← Big Muddy Records artists, tracks, contracts
│   ├── amy-allen-catalog/     ← Amy's own music (her primary interest)
│   ├── mechanical-bull/       ← Mechanical Bull remasters
│   └── artist-releases/
├── 04-INN/                    ← The Big Muddy Inn ops
│   ├── guest-photos/          ← Photos of guests, events, show nights
│   ├── room-photos/           ← Room interiors for listings
│   ├── event-photos/          ← Weddings, private events, Pilgrimage weekends
│   ├── contracts/             ← Vendor contracts, leases
│   ├── receipts/              ← Scanned receipts for Tracy
│   └── maintenance-log/       ← Photos of repairs, issues, before/after
├── 05-BAR/                    ← The Blues Room bar
│   ├── inventory/             ← Liquor + mixer inventory counts
│   ├── menu-drafts/           ← Bar menu photos + drafts
│   └── show-nights/           ← Photos from show nights
├── 06-DIRECTORY/              ← Deep South Directory business onboarding
│   ├── natchez-businesses/    ← Photos + notes for each business we onboard
│   └── onboarding-photos/     ← Screen shots of businesses for the directory
├── 07-TOURING/                ← Big Muddy Touring logistics
├── 08-ADMIN/                  ← Internal HDI admin stuff
│   ├── team-photos/           ← Team headshots, group photos
│   ├── brand-assets/          ← Logos, fonts, brand kit
│   └── board-decks/           ← For Tracy's board reports
└── 99-ARCHIVE/                ← Stuff that's no longer active but we're keeping
```

### 3e. Configure Drive sync locations on disk

After sync, Amy sees these folders on her Mac (typically under `~/Google Drive/` or `/Volumes/GoogleDrive/`):

- `~/Google Drive/My Drive/` — her personal Drive
- `~/Google Drive/Shared with me/Big Muddy/` — the shared HDI folder

**Teach Amy one rule:** "When you want a file to end up where Chase and Tracy can see it, put it in the Big Muddy folder, NOT My Drive. My Drive is only visible to you."

### 3f. Create desktop shortcuts for daily-use folders

Drag these folders to the Desktop (creating aliases, not copies):
- `Big Muddy/00-INBOX/photos-to-process/` → Desktop alias: "Amy Photo Inbox"
- `Big Muddy/04-INN/guest-photos/` → Desktop alias: "Guest Photos"
- `Big Muddy/03-RECORDS/amy-allen-catalog/` → Desktop alias: "My Music"
- `Big Muddy/05-BAR/inventory/` → Desktop alias: "Bar Inventory"

These live on the desktop so Amy has one-click access to the 4 folders she uses most.

### 3g. Set up Apple Photos → Drive export

If Amy shoots on her iPhone and wants those photos in Drive automatically:

1. Open Photos app → Preferences → General → Importing
2. Create a shared Photos album called "HDI Drop"
3. Set up an iOS Shortcut: whenever she adds a photo to "HDI Drop", it uploads to `Big Muddy/00-INBOX/photos-to-process/`

This requires the iOS Shortcuts app on her iPhone, not the Mac. Deferred — build it after Mac setup is done.

---

## Task 4 — Asana configuration (just installed)

### 4a. Sign in with BOTH Asana accounts

The Asana macOS app supports multiple accounts.

1. Launch the Asana app
2. Sign in first with **`amyaldersonallen@gmail.com`** (her personal Asana account)
3. Add a second workspace account: click her profile avatar → **Add account** → sign in with **`bigmuddy@chasepierson.tv`** (the new shared Big Muddy Advanced seat)
4. Switch between them via the profile avatar dropdown

**Explanation for Amy:** "You have two Asana accounts. Your personal one is for your individual tasks. The Big Muddy shared one (shared with Tracy) is where team-level business tasks live. When you're doing Inn stuff, check the Big Muddy account. When you're doing your own thing, check the personal one."

### 4b. Favorite the projects Amy cares about

In the Asana web UI (or the Mac app):
- Star the **"Amy — Inn & Bar Ops"** project (her daily view)
- Star **"Launch — April 2026"** (soft launch Apr 17, full launch Apr 27 — launch-critical tasks)
- Star **"Big Muddy Magazine"** (she's a reviewer)
- Star **"Music & Entertainment — Big Muddy Records"** (her music catalog lives here)

These appear in her sidebar for one-click access.

### 4c. Set up notifications

Asana → Settings → Notifications:
- **In-app + email** for tasks assigned to her
- **In-app only** for tasks she's a collaborator on (avoid email flood)
- **Daily summary email** ON — gets a morning brief of what's due

### 4d. Install the Asana iOS app on her phone

So when she's moving around the Inn, she can check off tasks and reply to comments from her phone. Same two accounts.

---

## Task 5 — Apps to install (the HDI stack)

Use Homebrew or direct downloads. Amy probably doesn't have Homebrew yet — install it first:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install:

### Core (required)
```bash
brew install --cask google-drive           # already done above
brew install --cask asana                  # already done above
brew install --cask bitwarden              # password manager — critical
brew install --cask google-chrome          # secondary browser for profile switching
brew install --cask 1password              # skip if using Bitwarden only
```

### Communication
```bash
brew install --cask zoom
brew install --cask signal                 # for secure chat with Chase
```

### Creative / media (keep these if already installed)
- **Adobe Lightroom Classic** (if Amy has a subscription) — photo organization
- **Adobe Lightroom CC** (the cloud-syncing sibling) — mobile photo import
- **Photos** (stock macOS) — keep
- **CapCut** — video editing for social content
- **GarageBand** (stock macOS) — for listening to Mechanical Bull tracks
- **Logic Pro** (if installed) — for serious music work

### Productivity
- **Notion** or **Obsidian** if Amy already uses one — otherwise skip; Asana covers the task side
- **Claude desktop app** (from the App Store or <https://claude.ai/download>) — separate from Claude Code; this is the chat app Amy uses directly

### Skip (don't install)
- Slack (HDI doesn't use it)
- Discord (personal, not for work)
- Any IDE (VS Code, Xcode, JetBrains) — Amy doesn't write code

---

## Task 6 — Bitwarden setup

Amy needs Bitwarden for any shared credentials she'll use (Cloudbeds, Asana passwords, Google Workspace emergency recovery, etc.).

1. Install Bitwarden (step above)
2. Launch → Log In → use Amy's personal master password
3. Ask Chase to **share the HDI collection** with Amy's Bitwarden email
4. Confirm Amy can see the collection
5. Install the **Bitwarden browser extension** in Safari + Chrome
6. Enable autofill in Safari → Preferences → AutoFill → let Bitwarden provide passwords

**Rule:** Amy never stores a password in Safari's keychain or Chrome's keychain. Always Bitwarden. Teach her this.

---

## Task 7 — Safari + Chrome bookmarks (the HDI bar)

### Safari Favorites Bar (set Safari as default)

**Hospitality (daily use):**
- Cloudbeds: <https://us2.cloudbeds.com/connect/202687759294592#/calendar>
- Airbnb Host: <https://www.airbnb.com/hosting>
- VRBO Host: <https://www.vrbo.com/host>

**Big Muddy (check regularly):**
- Big Muddy Admin: <https://bigmuddytouring.com/admin/dashboard>
- Asana: <https://app.asana.com>
- Photo Search: <https://bigmuddytouring.com/admin/photos>
- Magazine: <https://bigmuddytouring.com/magazine>
- Radio player: <https://bigmuddytouring.com/radio>
- Inn page: <https://bigmuddytouring.com/inn>
- Deep South Directory: <https://deepsouthdirectory.com>
- Portfolio tour: <https://bigmuddytouring.com/hillbilly>
- All links: <https://bigmuddytouring.com/links>

**Tools:**
- Gmail (personal): <https://mail.google.com>
- Gmail (bigmuddy@): Second Chrome profile
- Google Drive: <https://drive.google.com>
- Bitwarden vault: <https://vault.bitwarden.com>
- Delta Dawn chat: <https://bigmuddytouring.com/dawn>

### Chrome Profiles

Set up two Chrome profiles so she can flip between her personal and shared Big Muddy identities without logging out:

1. Chrome → profile icon (top right) → **Add** → sign in with `amyaldersonallen@gmail.com` → name profile "Amy Personal"
2. Chrome → profile icon → **Add** → sign in with `bigmuddy@chasepierson.tv` → name profile "Big Muddy"

Add a different color/avatar to each so she can tell them apart at a glance.

### Progressive Web Apps (PWA) — install from Safari

Visit each URL, tap Share → **Add to Dock** → gives her app-like icons in the dock:
- Big Muddy Admin
- Asana (if she prefers web over the native app)
- Delta Dawn chat

---

## Task 8 — Mail app (built-in macOS Mail)

1. System Settings → Internet Accounts → **Add Google** → sign in with `amyaldersonallen@gmail.com`
2. Add a second Google account for `bigmuddy@chasepierson.tv`
3. Optionally add `amy@thebigmuddyinn.com` (if it's a real Gmail-backed account)
4. In Mail → Preferences → Viewing → **Organize by conversation** ON
5. In Mail → Preferences → Composing → signature with "Amy Allen · The Big Muddy Inn · bigmuddytouring.com"

---

## Task 9 — Folder structure on disk

Mirror the Drive structure with local folders (for Mirrored mode) OR just document where things go (for Streamed mode):

```
~/Documents/
├── Big Muddy/                ← Symlink or alias to Drive shared folder
├── Personal/
└── Inbox/                    ← Temporary drop zone for in-progress work
```

Create a `~/Desktop/Inbox` folder for "unsorted, not filed yet" — Amy puts anything she's working on here, then files it into Drive at end of day.

---

## Task 10 — SSH access (optional, Chase-only use)

If Chase needs to reach Amy's computer from his MacBook Pro:

1. System Settings → General → Sharing → **Remote Login** ON
2. Note the IP address shown (e.g., `192.168.4.XX`)
3. Add Chase's SSH key to `~/.ssh/authorized_keys`:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIL3FWdEhw+UJULM6J2Q5VyaVtmkcmTopoNs7rQNn2130 laptop-to-mini" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

4. From Chase's MacBook: `ssh amy@amy-mac.local` (or IP) — should work without password

5. Update the Fleet table at the top of this doc with Amy's actual IP + username.

**Note:** Don't enable Screen Sharing unless Amy explicitly wants it. Remote Login is enough for Chase to push files via SCP or fix things via CLI.

---

## Task 11 — Delta Dawn (AI assistant access)

Amy can reach Delta Dawn three ways from this Mac:

1. **Web chat:** <https://bigmuddytouring.com/dawn> (bookmark + PWA)
2. **Siri Shortcut:** Install a "Hey Siri, Big Muddy" shortcut that routes to Delta Dawn. Sources TBD — Chase will add later.
3. **Claude Code terminal:** (not for Amy — Chase only)

Bookmark the Delta Dawn page in both Safari and Chrome profiles.

---

## Task 12 — macOS system optimization (non-invasive)

Non-destructive housekeeping only. Don't remove anything that isn't obviously junk.

- [ ] System Settings → General → Software Update → confirm macOS is current
- [ ] System Settings → Battery → Low Power Mode OFF (she's plugged in most of the time)
- [ ] System Settings → Displays → Night Shift ON (evening, auto-dim for show night work)
- [ ] System Settings → Desktop & Dock → Minimize windows using **Scale effect** (subjective — ask Amy)
- [ ] System Settings → Accessibility → Pointer size 2/5 (slightly bigger — easier to track)
- [ ] Finder → Preferences → Sidebar → make sure `Big Muddy` shared folder is pinned
- [ ] Finder → View → **Show Path Bar** + **Show Status Bar** (helps Amy understand where she is in the file system)

---

## Task 13 — Custom experience for Big Muddy (the branded polish)

Small touches that make the machine feel like an HDI workstation, not a generic Mac:

- [ ] **Desktop wallpaper:** use a Big Muddy photo (Chase picks a good Natchez river shot or Blues Room interior from `/admin/photos`)
- [ ] **Screensaver:** set to Photos → rotating slideshow from `Big Muddy/04-INN/guest-photos/` or `Big Muddy/01-MAGAZINE/photos/`
- [ ] **Login screen message:** System Settings → Lock Screen → "Welcome, Amy. The soul of the South."
- [ ] **Terminal profile:** if Amy ever opens Terminal, set a pretty color scheme (solarized-light?) so it looks nice, not scary
- [ ] **Dock layout:** left-side icons — Finder, Safari, Chrome, Mail, Asana, Bitwarden. Right-side — Photos, CapCut, GarageBand, Claude desktop.
- [ ] **Hot corners:** top-left → Mission Control, top-right → Notification Center, bottom-left → Lock Screen, bottom-right → Desktop.

---

## Task 14 — Teach Amy the "daily loop" (the user manual)

Sit with her for 10 minutes and walk through what a typical day looks like on this machine:

1. **Morning:** open Asana (Big Muddy account) → see what's due today → open any linked pages
2. **Throughout the day:** photos taken on phone → shared album → auto-lands in Drive → she drags to the right folder
3. **Any blocker:** ask Delta Dawn via the web chat
4. **End of day:** file anything in `~/Desktop/Inbox` into the right Drive folder → clear the desktop → check Asana for tomorrow
5. **Before leaving:** lock the screen (Ctrl+Cmd+Q or bottom-right hot corner)

Write her a 1-page "cheat sheet" she can tape to the monitor if she wants.

---

## Task 15 — Report back checklist

When done, Chase confirms these and writes the results back into this doc:

- [ ] macOS version: _______________
- [ ] Hardware model: _______________
- [ ] RAM: _______________
- [ ] Storage total / free: _______________ / _______________
- [ ] IP address on LAN: _______________
- [ ] macOS username (Amy's or Chase's): _______________
- [ ] Apple ID signed in: _______________
- [ ] Claude Code version: _______________
- [ ] Google Drive for Desktop signed in with 2+ accounts: Yes / No
- [ ] Asana app signed in with 2+ accounts: Yes / No
- [ ] Bitwarden installed + HDI collection shared: Yes / No
- [ ] Safari bookmarks loaded: Yes / No
- [ ] Chrome profiles set up (2): Yes / No
- [ ] Mail accounts added: ___ of 3
- [ ] Desktop shortcuts to 4 daily folders: Yes / No
- [ ] Delta Dawn bookmarked: Yes / No
- [ ] SSH access from Chase's MacBook works: Yes / No
- [ ] Amy has had the 10-minute daily loop walkthrough: Yes / No

Update the Fleet table at the top of this doc with Amy's actual IP + username once confirmed.

---

## What's NOT in this setup (intentionally deferred)

- **Apple Business Manager** — too early (per the philosophy doc). Revisit when HDI has 5+ Apple devices officially under management.
- **Homebridge / HomeKit integration** — covered in `docs/ops/APPLE_ECOSYSTEM_ONBOARDING.md` for iPads; if Amy needs HomeKit scenes for the Inn, do that on her phone/iPad, not this Mac.
- **OBS Studio** — she's not doing live streaming from this machine; broadcasting lives on the Mac mini.
- **FTP / S3 tools** — not needed; all file movement goes through Google Drive.
- **Database tools** — not her job; Prisma Studio is Chase's tool.
- **Docker** — not needed for Amy's work.

If Amy later asks for something that's not here, add it as a follow-up task, not during the initial setup pass.

---

## Related docs

- **Tracy's iMac setup:** `.claude/agents/IMAC_TRACY_SETUP_PROMPT.md`
- **Apple Ecosystem philosophy:** `docs/ops/APPLE_ECOSYSTEM_ONBOARDING.md`
- **Amy's high-level onboarding brief:** `docs/briefs/elijah-high-level-brief-2026-04-10.md` (has the HDI picture Amy should understand first — repurpose for her)
- **HDI portfolio tour:** <https://bigmuddytouring.com/hillbilly> (send this first)
- **Amy's Asana tasks (now with user-friendly rewrites):** 10 tasks in the Amy — Inn & Bar Ops project have been rewritten tonight in the new format (What you're doing / Why / How / Success / If stuck). See `docs/briefs/asana-rewrite-log-2026-04-10.md`.

---

## Changelog

- **2026-04-10 (evening)** — Doc created for Amy's computer setup, mirrored from Tracy's iMac handoff. Non-destructive organization pass. Chase is running the setup with Amy sitting next to him.
