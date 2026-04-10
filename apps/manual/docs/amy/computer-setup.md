---
title: Computer Setup Log
sidebar_position: 4
---

# Amy's Computer Setup Log

**Machine:** Amy's Mac, freshly installed with Claude Code + Asana
**Setup date:** 2026-04-10
**Operator:** Chase (sitting next to Amy)
**Status:** Chase's identity already on the machine. Non-destructive organization pass in progress.
**Full protocol:** See [Mac Setup](/setup/mac)

---

## Machine facts (fill in during setup)

- **macOS version:** _(fill in)_
- **Hardware model:** _(fill in)_
- **RAM:** _(fill in)_
- **Storage total / free:** _(fill in)_
- **IP address on LAN:** _(fill in)_
- **macOS username:** _(fill in — Chase's or Amy's)_
- **Apple ID signed in:** _(fill in)_

---

## Who this machine is for

**Amy Allen** — equity partner in Hillbilly Dreams Inc., equity partner at The Big Muddy Inn, Inn & Bar Ops lead. Also a musician — her band is literally why HDI exists (Chase got hired to promote Amy's band; they built the media company to do it).

### What Amy uses this machine for
- Inn operations — guest check-in, calendar, room turns, inventory, bar management
- Bar ops — liquor inventory, show night prep, receipts
- Music — listening to Mechanical Bull mixes, reviewing her catalog, approving Big Muddy Records releases
- Content approval — Amy + Tracy are the two humans who approve everything before it goes live
- Social media — friends-and-family DSD onboarding
- Email + Asana — daily team communication

### What Amy does NOT do on this machine
- Write code (that's Chase)
- Deploy anything
- Touch the Mac mini broadcasting stack
- Manage Vercel, GitHub, or any backend
- Anything that needs a terminal

---

## Amy's three identities

Amy operates through three email identities. She should be able to switch between them cleanly on this machine:

| Identity | Email | Used for |
|---|---|---|
| **Personal** | `amyaldersonallen@gmail.com` | Her own Asana account, personal Gmail, personal Drive |
| **Shared Big Muddy** | `bigmuddy@chasepierson.tv` | The shared Asana Advanced seat Amy shares with Tracy; shared Gmail; shared Drive folder access |
| **Inn operational** | `amy@thebigmuddyinn.com` | The Inn's operational email (guests, vendors, suppliers) |

All three are active. The `bigmuddy@chasepierson.tv` shared identity is the newest (created 2026-04-10). She should be signed into all three in the browser (Chrome profiles or Safari Profiles), plus at minimum `amyaldersonallen@gmail.com` in the macOS Mail app.

---

## Setup checklist

Follow the [Mac Setup protocol](/setup/mac) phases, with Amy-specific notes below.

### Phase 1 — Identity
- [ ] Primary Apple ID confirmed (Amy's — do NOT change)
- [ ] Family Sharing includes HDI family (Chase, Tracy, Amy)
- [ ] Chase's SSH key installed (for fleet management) — see [Fleet Registry](/reference/fleet-registry)
- [ ] Remote Login enabled
- [ ] This machine added to the Fleet Registry with IP

### Phase 2 — HDI stack install
- [ ] Homebrew installed
- [ ] Google Drive for Desktop (multi-account)
- [ ] Asana (multi-account)
- [ ] Bitwarden + HDI collection shared
- [ ] Google Chrome + 2 Chrome profiles set up
- [ ] Bitwarden browser extension in Safari + Chrome
- [ ] Claude desktop app
- [ ] Signal
- [ ] Zoom
- [ ] Adobe Lightroom Classic (if Amy has an Adobe subscription)
- [ ] CapCut (if Amy edits video)
- [ ] GarageBand (system — already installed, just confirm)

### Phase 3 — Non-destructive curation

Walk through Applications folder with Amy. Document removals here:

**Removed (with Amy's verbal OK):**
- *(fill in during setup — list each app removed)*

**Deferred (Amy wasn't sure, leaving for now):**
- *(fill in)*

**Kept (explicit request):**
- *(fill in — e.g., "kept Photoshop even though she hasn't opened it in a year")*

### Phase 4 — Folder structure + Google Drive

- [ ] Google Drive for Desktop signed in with `amyaldersonallen@gmail.com`
- [ ] Added second account: `bigmuddy@chasepierson.tv`
- [ ] Optional third account: `amy@thebigmuddyinn.com`
- [ ] Sync modes configured per [Google Drive Structure](/reference/google-drive-structure):
  - `Big Muddy/` → Mirrored (always on disk)
  - `Big Muddy/04-INN/` → Mirrored
  - `Big Muddy/05-BAR/` → Mirrored
  - `Big Muddy/99-ARCHIVE/` → Streamed
- [ ] Desktop shortcuts created for:
  - `Big Muddy/00-INBOX/photos-to-process/` → "Photo Inbox"
  - `Big Muddy/04-INN/guest-photos/` → "Guest Photos"
  - `Big Muddy/03-RECORDS/amy-allen-catalog/` → "My Music"
  - `Big Muddy/05-BAR/inventory/` → "Bar Inventory"

### Phase 5 — Daily loop walkthrough

- [ ] Amy has had the 10-minute "day in the life" walkthrough
- [ ] Amy has a 1-page cheat sheet (optional) taped to the monitor

### Phase 6 — Custom experience (the branded polish)

- [ ] Desktop wallpaper: Big Muddy photo (Natchez river or Blues Room interior)
- [ ] Screensaver: rotating Photos slideshow from the Guest Photos folder
- [ ] Login screen message: "Welcome, Amy. The soul of the South."
- [ ] Dock layout: Finder, Safari, Chrome, Mail, Asana, Bitwarden, Photos, CapCut, GarageBand, Claude
- [ ] Hot corners: Mission Control (TL), Notification Center (TR), Lock Screen (BL), Desktop (BR)

### Phase 7 — Asana accounts (both)

- [ ] Asana app signed in with `amyaldersonallen@gmail.com`
- [ ] Asana app signed in (second account) with `bigmuddy@chasepierson.tv`
- [ ] Starred projects: Amy Inn & Bar Ops, Launch April 2026, Big Muddy Magazine, Music & Entertainment
- [ ] Notifications: In-app + email for assigned, in-app only for collaborator, daily summary ON
- [ ] Asana iOS app installed on her iPhone with same two accounts

### Phase 8 — Mail app

- [ ] `amyaldersonallen@gmail.com` added
- [ ] `bigmuddy@chasepierson.tv` added
- [ ] `amy@thebigmuddyinn.com` added (if Gmail-backed)
- [ ] Mail signature set

### Phase 9 — Bookmarks + PWAs

Bookmarks bar set up per [Mac Setup](/setup/mac). Key links Amy uses:
- [Big Muddy Admin Dashboard](https://bigmuddytouring.com/admin/dashboard)
- [HDI Portfolio Tour](https://bigmuddytouring.com/hillbilly)
- [All HDI links](https://bigmuddytouring.com/links)
- [Delta Dawn chat](https://bigmuddytouring.com/dawn)
- [Photo Search](https://bigmuddytouring.com/admin/photos)
- Cloudbeds, Airbnb Host, VRBO Host (hospitality dailies)
- Asana web (backup for the native app)

---

## Report back

When setup is complete, update this document with the machine facts at the top and check off all the items in the checklist. Commit the changes.

## Related

- [Mac Setup Protocol](/setup/mac) — the full protocol
- [Machine Setup Overview](/setup/overview) — the philosophy + five phases
- [Google Drive Structure](/reference/google-drive-structure) — the folder map
- [Fleet Registry](/reference/fleet-registry) — where Amy's machine fits
- [Amy's Guide](/amy/overview) — what Amy does day to day
- [Amy Asana task rewrites log (2026-04-10)](https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/briefs/asana-rewrite-log-2026-04-10.md) — 10 of Amy's tasks just got user-friendly rewrites
