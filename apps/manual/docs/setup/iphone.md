---
title: iPhone Setup
sidebar_position: 4
---

# iPhone Setup — The HDI Protocol

Use this guide when adding any iPhone to the HDI fleet. This is the MOBILE version of the [Mac Setup](/setup/mac) protocol — same five phases, different details.

## Phase 0 — Pre-work

- [ ] iCloud Backup is current (Settings → [Apple ID] → iCloud → iCloud Backup → Back Up Now)
- [ ] Owner has consent for the setup pass
- [ ] You're working FROM the phone, WITH the owner — never behind their back

## Phase 1 — Identity

1. Confirm the owner's personal Apple ID is signed in — do NOT change it
2. Confirm Family Sharing includes Chase, Tracy, Amy (and eventually Elijah, Miles)
3. Settings → [Apple ID] → Find My → confirm Find My iPhone is ON + Find My Network is ON

## Phase 2 — HDI stack install (from the App Store)

Install:

- **Google Drive** — Drive app (supports multiple accounts)
- **Asana** — for task management on the go
- **Gmail** — if the owner prefers Gmail over Apple Mail
- **Bitwarden** — password manager + autofill
- **Claude** — official Anthropic app for voice conversations
- **Signal** — secure team chat
- **Plex** — connects to the Mac mini Plex server (for viewing Inn photo archive on the go)

Optional per-person:
- **CapCut** — mobile video editing
- **Lightroom CC** — photo editing + cloud sync (not Lightroom Classic — that's desktop only)
- **Shortcuts** — critical for voice automations (see Phase 3)

## Phase 3 — Non-destructive curation

**Same rules as Mac:** walk through the home screen with the owner, ask about every app they don't use, never remove anything without verbal OK.

### Keep by default
- All stock Apple apps (unless the owner explicitly hates one)
- Camera, Photos, Music, Podcasts, Maps, Weather, Health, Wallet, Notes, Reminders, Calendar, Clock, Calculator, Compass, Voice Memos
- The HDI stack (from Phase 2)

### Organize by folder (NOT remove)
Group apps into folders on the home screen:
- **HDI** — Drive, Asana, Gmail, Bitwarden, Claude, Signal, Plex
- **Camera** — Camera, Lightroom CC, CapCut, photo editors
- **Home** — Home, Find My, Settings
- **Personal** — everything else the owner actually uses

Goal: home screen page 1 has less than 20 icons, organized. Page 2+ can have whatever.

## Phase 4 — Multi-account setup (the important phone part)

### Google Drive — multi-account

Drive app supports multiple accounts. Add:
1. Owner's personal Gmail
2. Owner's HDI shared account (e.g., `bigmuddy@chasepierson.tv`)

Switch via the profile avatar at the top of the Drive app.

### Gmail — multi-account

Same multi-account pattern. Add personal + HDI identities.

### Asana — two accounts

Sign in with the personal Asana account first, then add the HDI shared account via profile → Add account.

### iCloud Photos shared album

Create a shared album called **"HDI Drop"**:
1. Photos app → Albums → + → New Shared Album → name it "HDI Drop"
2. Invite Chase, Tracy, whoever else
3. Owner's workflow: take a photo → pick it → Share → Shared Album → HDI Drop → done. Photo is now visible to the team.

Optional follow-up: build an iOS Shortcut that automatically uploads "HDI Drop" photos to the Drive `Big Muddy/00-INBOX/photos-to-process/` folder. (See [Photo Workflow](/getting-started/photo-workflow).)

## Phase 5 — Siri Shortcuts (the voice layer)

Install Siri Shortcuts that make HDI voice-accessible. Minimum set:

- **"Hey Siri, Delta Dawn"** — opens [bigmuddytouring.com/dawn](https://bigmuddytouring.com/dawn) and starts a chat
- **"Hey Siri, Big Muddy Admin"** — opens [bigmuddytouring.com/admin/dashboard](https://bigmuddytouring.com/admin/dashboard)
- **"Hey Siri, Photo Inbox"** — opens the Google Drive Photo Inbox folder
- **"Hey Siri, Play Big Muddy Radio"** — opens the radio player (or the Icecast stream URL when on LAN)
- **"Hey Siri, Tonight's Show"** — opens the events page to see the Blues Room lineup

Build these in the Shortcuts app. Name matters — Siri matches on name, so be consistent.

## Phase 6 — Widgets + lock screen

Add HDI widgets to the home screen and lock screen:

- **Reminders widget** — shared "Big Muddy Inn" list (if using Apple Reminders for quick ops)
- **Calendar widget** — the Big Muddy events calendar (once it exists)
- **Weather widget** — for Natchez, MS
- **Shortcut widget** — the Delta Dawn and Big Muddy Admin shortcuts for one-tap access

Lock screen customization:
- Background photo: a Big Muddy photo (real Natchez shot, not stock)
- Widgets: Weather, Calendar, Reminders

## Verification checklist

- [ ] iOS version current
- [ ] Apple ID confirmed (not changed)
- [ ] Google Drive multi-account working
- [ ] Gmail multi-account working
- [ ] Asana multi-account working
- [ ] Bitwarden installed + unlocked
- [ ] HDI Drop shared album created
- [ ] At least 3 Siri Shortcuts installed
- [ ] Home screen page 1 organized, under 20 icons
- [ ] Delta Dawn bookmarked / shortcut works
- [ ] Owner has had the "how to send a photo to the team" walkthrough

## Related

- [Mac Setup](/setup/mac)
- [iPad Setup](/setup/ipad)
- [Google Drive Structure](/reference/google-drive-structure)
- [Photo Workflow](/getting-started/photo-workflow)
