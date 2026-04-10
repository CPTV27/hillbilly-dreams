---
title: Computer Setup Log
sidebar_position: 4
---

# Tracy's iMac Setup Log

**Machine:** Tracy's iMac, 24 GB RAM, 192.168.4.26, user: tracyfort
**Setup date:** 2026-04-08 (original), updated per this handbook 2026-04-10
**Operator:** Chase (sitting next to Tracy)
**Status:** Active in fleet
**Full source doc:** See [IMAC_TRACY_SETUP_PROMPT.md](https://github.com/CPTV27/hillbilly-dreams/blob/main/.claude/agents/IMAC_TRACY_SETUP_PROMPT.md) for the original handoff
**Protocol reference:** [Mac Setup](/setup/mac)

---

## Machine facts

- **Model:** iMac
- **RAM:** 24 GB (freshly upgraded, April 2026)
- **IP:** 192.168.4.26
- **Username:** tracyfort
- **Apple ID:** Tracy's personal
- **Role in fleet:** Inn ops, hospitality, bookings, finance — Tracy's daily driver

---

## Who this machine is for

**Tracy Alderson Allen** — equity partner in Hillbilly Dreams Inc., manages the Big Muddy Inn (411 North Congress Street, Natchez), handles bookings, finances, and is the operations backbone.

---

## What's already set up (from the April 8 pass)

- [x] SSH access from Chase's MacBook — key installed, Remote Login ON, tested
- [x] Safari as default browser with favorites bar populated:
  - Cloudbeds calendar
  - Airbnb Host, VRBO Host
  - Squarespace (Inn website)
  - Big Muddy Admin, Asana, Big Muddy Touring, Magazine, Radio, Entertainment
  - Deep South Directory
  - Gmail, Google Drive
- [x] Apple Mail configured with `tracyaldersonallen@gmail.com`
- [x] System optimization — reduce motion, reduce transparency, login items cleaned
- [x] Kiosk launcher on desktop (`~/Desktop/BigMuddy-Kiosk.command`) with editable URL list
- [x] Delta Dawn bookmarked: https://bigmuddytouring.com/dawn
- [x] Network services documented: Plex, Open Notebook, Postiz, Big Muddy Radio Icecast

---

## What needs to be added (per the new handbook standard)

This section is the **delta between the original April 8 setup and the current handbook standard** (defined 2026-04-10). Everything here is recommended but not yet done.

### Google Drive for Desktop — multi-account
- [ ] Install Google Drive for Desktop
- [ ] Sign in with `tracyaldersonallen@gmail.com` (personal)
- [ ] Sign in with `bigmuddy@chasepierson.tv` (shared Big Muddy account)
- [ ] Sign in with `tracy@thebigmuddyinn.com` (Inn operational)
- [ ] Configure sync modes per the [Google Drive Structure](/reference/google-drive-structure)
- [ ] Desktop shortcuts for Tracy's daily folders:
  - `Big Muddy/08-ADMIN/legal/` → "Legal Files"
  - `Big Muddy/04-INN/contracts/` → "Inn Contracts"
  - `Big Muddy/04-INN/receipts/` → "Receipts"
  - `Big Muddy/05-BAR/inventory/` → "Bar Inventory"

### Asana — multi-account
- [ ] Install Asana native app
- [ ] Sign in with `tracyaldersonallen@gmail.com`
- [ ] Sign in with `bigmuddy@chasepierson.tv`
- [ ] Star projects: Tracy Business & Finance, Launch April 2026, Biz Dev Pipeline
- [ ] Configure daily summary email

### Bitwarden
- [ ] Install Bitwarden (desktop)
- [ ] Share HDI collection with Tracy
- [ ] Install browser extension in Safari + Chrome

### Chrome profiles (for multi-account browsing)
- [ ] Install Google Chrome
- [ ] Profile 1: `tracyaldersonallen@gmail.com`
- [ ] Profile 2: `bigmuddy@chasepierson.tv`
- [ ] Profile 3: `tracy@thebigmuddyinn.com` (optional)

### Daily loop walkthrough
- [ ] Sit with Tracy for 10 minutes, walk through a typical day on the iMac using the new tools

---

## Fleet integration

- **IP:** 192.168.4.26 (assign static if not already)
- **SSH:** Chase's laptop-to-mini key installed — test from Chase's MacBook with `ssh tracyfort@192.168.4.26 "echo ok"`
- **Backup:** Time Machine to *(TBD — confirm backup target exists)*

---

## Related

- [Mac Setup Protocol](/setup/mac) — the full Mac protocol
- [Fleet Registry](/reference/fleet-registry)
- [Google Drive Structure](/reference/google-drive-structure)
- [Tracy's Guide](/tracy/overview)
- [Original IMAC_TRACY_SETUP_PROMPT.md](https://github.com/CPTV27/hillbilly-dreams/blob/main/.claude/agents/IMAC_TRACY_SETUP_PROMPT.md) — the April 8 handoff source
