---
title: iPad Setup
sidebar_position: 3
---

# iPad Setup — The HDI Protocol

Use this guide when adding an iPad to the HDI fleet. Based on the philosophy in the original [Apple Ecosystem Onboarding](https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/ops/APPLE_ECOSYSTEM_ONBOARDING.md) doc — that doc has more depth if you need it.

## Phase 0 — Pre-work

- [ ] Full Finder backup of the iPad (Finder → select iPad → Back Up All Data → Encrypt Local Backup ON → save encryption password in Bitwarden)
- [ ] iCloud Backup current
- [ ] Owner consent confirmed

**Do not proceed until the backup is visible as an `.ipa` file on the backup Mac.**

## Phase 1 — Identity + Family Sharing

1. Settings → General → Software Update → install latest iPadOS (plugged in)
2. Settings → [Apple ID] → iCloud → confirm owner's personal Apple ID is signed in — do NOT change
3. Settings → [Apple ID] → Family Sharing → include Chase, Tracy, Amy, Elijah, Miles
4. Settings → Privacy & Security → Location Services → leave ON for Camera, Maps, Weather, Find My. Off for everything else by default.
5. Settings → Apple ID → Find My → Find My iPad ON, Find My Network ON

### Handoff + Universal Control
6. Settings → General → AirPlay & Handoff → Handoff ON
7. If the owner has a Mac on the same Apple ID: enable Universal Control so they can drive the iPad from the Mac's keyboard/trackpad

### iCloud Drive + HDI shared folder
8. Settings → [Apple ID] → iCloud → iCloud Drive ON
9. Open Files app → create a Family Shared folder called `HDI` with subfolders:
   - `HDI/Photos Inbox`
   - `HDI/Video Inbox`
   - `HDI/Briefs`
   - `HDI/Contracts`
10. Share the `HDI` folder with the Family Sharing group

Also install Google Drive separately — both iCloud Drive AND Google Drive are used. Google Drive is the HDI canonical store; iCloud Drive is the faster sync for iOS-to-iOS work.

## Phase 2 — HDI stack install (from the App Store)

### Keep
Creative suite — anything that touches photos/video/audio stays:
- Camera (system), Photos (system), Lightroom, Lightroom CC, Photoshop, Creative Cloud, CapCut, LumaFusion, Halide, ProCamera, Darkroom, Procreate, Affinity Photo/Designer, GarageBand, Ferrite, Voice Memos

### Install
- **Google Drive** + **Google Docs** + **Google Sheets** + **Google Slides** + **Gmail**
- **Bitwarden** (set as autofill provider: Settings → Passwords → AutoFill)
- **Claude** (App Store — for voice conversations)
- **Asana**
- **Plex**
- **Zoom** (for meetings)
- **Signal** (for secure team chat)

### Chase only (not Tracy/Amy iPads)
- Working Copy (git)
- Termius (SSH)
- a-Shell or iSH

## Phase 3 — The brutal curation pass

See the [Apple Ecosystem Onboarding](https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/ops/APPLE_ECOSYSTEM_ONBOARDING.md) for the full "remove these" list. Summary:

**Remove (with owner's OK on each):**
- Social media (Facebook, Instagram, TikTok, Twitter/X, Threads, Reddit) — unless the owner actively posts to one for HDI
- Games (all of them, unless one is specifically kept in an "Off Duty" folder)
- Shopping (Amazon, Target, Walmart) — iPad is not a shopping device
- Food delivery apps
- Streaming (Netflix, Hulu, Disney+, HBO, Prime) — unless the iPad lives at the Inn as a TV
- Banking apps — leave on personal devices only
- Dead utility apps (old flashlights, level apps, QR scanners)
- Pre-installed Apple apps the owner doesn't use (Tips, Stocks, News)

**Keep:** Pinterest (photo reference is useful), Safari, Mail, Calendar, Contacts, Notes, Reminders, Messages, FaceTime, Maps, Weather, Files, Shortcuts, Freeform, Home, Find My, Settings, GarageBand, Music, Podcasts.

## Phase 4 — HDI home screen folder structure

After Phase 3, organize page 1 into these folders:

```
HDI        — BMT Admin PWA, Photo Search PWA, DSD Admin PWA,
             Delta Dawn, Foreman (when it ships)
📷 CAMERA   — Camera, Halide/ProCamera, Lightroom, Photoshop, Darkroom, Procreate
🎬 VIDEO    — CapCut, LumaFusion, Voice Memos, GarageBand, Ferrite
🏠 HOME     — Home, Find My, Shortcuts, Settings
📂 FILES    — Files, Notes, GoodNotes, Freeform, Adobe Scan
```

Front page (no folder): Safari, Mail, Messages, Calendar, Reminders, Bitwarden, Claude.

## Phase 4b — Progressive Web Apps (PWAs)

Visit each URL in Safari, tap Share → **Add to Home Screen**, add a clean name. Drop into the HDI folder.

| URL | Home Screen Name |
|---|---|
| https://bigmuddytouring.com/admin/dashboard | BMT Admin |
| https://bigmuddytouring.com/admin/photos | Photo Search |
| https://deepsouthdirectory.com/admin | DSD Admin |
| https://bigmuddytouring.com/hillbilly | HDI Portfolio |
| https://bigmuddytouring.com/dawn | Delta Dawn |
| http://192.168.4.37:8080 | Broadcast *(LAN only)* |
| http://192.168.4.37:5055 | Notebook *(LAN only)* |

## Phase 5 — Siri Shortcuts

Same list as the [iPhone Setup](/setup/iphone). The iPad can run all the same shortcuts. Highly recommended: "Hey Siri, Delta Dawn" for hands-free question answering during show nights.

## Phase 6 — HomeKit (if applicable)

If this iPad will be the HomeKit hub for the Inn, or will control scenes like "Show Time" or "Closing Time":
1. Settings → Home → allow this iPad to be a home hub
2. Add the iPad to the "Big Muddy" Home (created earlier on another device)
3. Set up HomeKit scenes tied to the Blues Room, Inn lobby, etc.
4. See the [Apple Ecosystem Onboarding](https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/ops/APPLE_ECOSYSTEM_ONBOARDING.md) for the Homebridge install on the Mac mini

## Verification checklist

- [ ] iPadOS version current
- [ ] Apple ID confirmed (not changed)
- [ ] Family Sharing includes HDI team
- [ ] iCloud Drive HDI folder shared
- [ ] Google Drive signed in with 2+ accounts
- [ ] Creative suite preserved
- [ ] Home screen page 1 organized into 5 folders
- [ ] All HDI PWAs installed
- [ ] Bitwarden autofill working
- [ ] At least 3 Siri Shortcuts installed
- [ ] Backup file location documented

## Related

- [Mac Setup](/setup/mac)
- [iPhone Setup](/setup/iphone)
- [Apple Ecosystem Onboarding](https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/ops/APPLE_ECOSYSTEM_ONBOARDING.md) — full source document with Homebridge setup
- [Google Drive Structure](/reference/google-drive-structure)
