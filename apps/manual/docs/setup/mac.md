---
title: Mac Setup
sidebar_position: 2
---

# Mac Setup — The HDI Protocol

Use this guide when setting up any Mac (MacBook, iMac, Mac mini) for HDI work. Follow the [five phases from the overview](/setup/overview) — this guide is the Mac-specific detail for each phase.

## Phase 0 — Pre-work

- [ ] Confirm the Mac is online and updated (`softwareupdate -l` or System Settings → General → Software Update)
- [ ] Owner has a current Time Machine backup (or equivalent)
- [ ] Owner gave explicit consent for the setup pass
- [ ] Bitwarden collection is ready to share

## Phase 1 — Identity

1. Confirm the primary Apple ID signed in: `System Settings → Apple ID` (top of sidebar)
2. Do NOT change the Apple ID. Leave the owner's personal identity alone.
3. Confirm Family Sharing is set up if the owner is in the HDI family (Chase, Tracy, Amy, and eventually Elijah/Miles)
4. Add secondary macOS users ONLY if the machine will genuinely be shared (rare — most HDI machines have one user)

### Chase's SSH key (for fleet management)

If this machine will be managed remotely by Chase from the MacBook Pro, add Chase's SSH key:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
cat >> ~/.ssh/authorized_keys <<'EOF'
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIL3FWdEhw+UJULM6J2Q5VyaVtmkcmTopoNs7rQNn2130 laptop-to-mini
EOF
chmod 600 ~/.ssh/authorized_keys
```

Then enable Remote Login in `System Settings → General → Sharing`. Confirm with:
```bash
ssh owner@this-mac.local "echo ok"
```
from Chase's MacBook.

## Phase 2 — HDI stack install

### Homebrew (required for the rest)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Required apps (install via brew cask)
```bash
brew install --cask google-drive       # multi-account Drive sync
brew install --cask bitwarden           # password manager
brew install --cask google-chrome       # secondary browser for profile switching
brew install --cask asana               # native Asana app
```

### Optional per-person apps
- **Creative tools** (Lightroom, Photoshop, CapCut, Logic Pro) — install if the owner uses them; otherwise skip
- **Claude desktop** (from the App Store or https://claude.ai/download) — for owners who use Claude directly
- **Claude Code CLI** — only for Chase. Others don't need it.
- **Signal** — for secure team chat
- **Zoom** — for external calls

### Skip (don't install)
- IDEs (VS Code, Xcode, JetBrains) — unless the person writes code
- Docker — unless the person runs containers
- Slack / Discord — HDI doesn't use them
- Banking apps — personal only, never on work machines

## Phase 3 — Non-destructive curation

Walk through the Applications folder with the owner. Sort apps into three categories:

### Keep (don't touch)
- System apps (Mail, Safari, Calendar, Reminders, Notes, Messages, FaceTime, Maps, Weather, Photos, Music, Podcasts, GarageBand, Freeform, Shortcuts, Files, Find My, Settings)
- Creative suite (Lightroom, Photoshop, CapCut, Logic, Final Cut, Pages, Numbers, Keynote)
- Bitwarden, Google Drive, Asana, Claude, Chrome (the HDI stack)
- Zoom, Signal (communication)

### Remove (with owner's verbal OK on each)
- Games the owner doesn't actively play
- Subscription apps the owner isn't paying for
- "Trial" apps from 2019
- Duplicate utilities (three different PDF merge tools)
- Dead apps the Dock launcher says aren't installed anymore

### Defer
- Anything the owner isn't sure about → leave it, revisit in a week

Document what was removed in the owner's per-person setup log (e.g., `amy/computer-setup.md`).

## Phase 4 — Folder structure + Google Drive

### Install Google Drive for Desktop
```bash
brew install --cask google-drive
```

Launch it, sign in with BOTH accounts:
1. The owner's personal Gmail (e.g., `amyaldersonallen@gmail.com`)
2. The HDI shared account (e.g., `bigmuddy@chasepierson.tv` or `team@chasepierson.tv`)

Drive for Desktop supports multiple accounts simultaneously — set each up in Drive preferences.

### Configure streamed vs. mirrored

- **My Drive (personal):** Streamed (cloud-only, downloads on demand)
- **Big Muddy shared:** **Mirrored** (always on disk, works offline) — this is where HDI work files live
- **Large video folders:** Streamed (too much disk space for mirror)

### Create desktop shortcuts for daily-use folders

Drag these shared folder locations to the desktop as aliases:
- `Big Muddy/00-INBOX/photos-to-process/` — "Photo Inbox"
- Per-person active folder (e.g., Amy → `04-INN/guest-photos/`)
- Per-person music / content folder (e.g., Amy → `03-RECORDS/amy-allen-catalog/`)

See [Google Drive Structure](/reference/google-drive-structure) for the full folder map.

### Teach the owner ONE rule

> "When you want a file to end up where Chase and Tracy can see it, put it in the Big Muddy folder, NOT My Drive. My Drive is only visible to you."

This single rule is the load-bearing piece. If they remember only one thing, it's this.

## Phase 5 — Daily loop walkthrough

Sit with the owner for 10 minutes. Walk through a typical day on this machine:

1. **Morning:** open Asana → see what's due today → open any linked pages
2. **Throughout the day:** photos taken on phone → shared album → auto-lands in Drive → they drag to the right folder
3. **Any blocker:** ask Delta Dawn via the web chat at [bigmuddytouring.com/dawn](https://bigmuddytouring.com/dawn)
4. **End of day:** file anything in `~/Desktop/Inbox` into the right Drive folder → clear the desktop → check Asana for tomorrow
5. **Before leaving:** lock the screen (Ctrl+Cmd+Q or bottom-right hot corner)

Write the owner a 1-page "cheat sheet" they can tape to their monitor if they want.

## Verification checklist

- [ ] macOS version confirmed
- [ ] Hardware model + RAM + storage recorded
- [ ] IP address on LAN recorded
- [ ] Apple ID confirmed (not changed)
- [ ] Homebrew installed
- [ ] Google Drive signed in with 2+ accounts
- [ ] Asana signed in with 2+ accounts
- [ ] Bitwarden installed + HDI collection shared
- [ ] Safari + Chrome bookmarks loaded
- [ ] Mail accounts added (personal + HDI)
- [ ] Desktop shortcuts to 4 daily folders
- [ ] SSH access from Chase's MacBook tested
- [ ] Owner has had the 10-minute daily loop walkthrough
- [ ] Per-person setup log written

## Related

- [Amy's computer setup log](/amy/computer-setup)
- [Tracy's iMac setup log](/tracy/computer-setup)
- [Fleet Registry](/reference/fleet-registry)
- [Google Drive Structure](/reference/google-drive-structure)
- [Safari + Chrome bookmarks](#safari-and-chrome-bookmarks) *(TODO: extract to reference)*
