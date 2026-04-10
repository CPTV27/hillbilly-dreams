---
title: Google Drive Structure
sidebar_position: 2
---

# Google Drive Structure — The Canonical Map

**This is the authoritative folder layout for the HDI shared Google Drive.** Every device, every person, every agent references this structure. Do not invent new top-level folders without a decision.

## The account model

There are multiple Google accounts on the `chasepierson.tv` Google Workspace:

| Account | Used by | Purpose |
|---|---|---|
| `me@chasepierson.tv` | Chase | Chase's personal HDI identity, admin on most things |
| `team@chasepierson.tv` | Elijah | Studio C shared account (Elijah + Miles) |
| `bigmuddy@chasepierson.tv` | Amy + Tracy | Big Muddy shared account (hospitality, Inn, bar, touring) |
| `amy@thebigmuddyinn.com` | Amy | The Inn's operational email (guests, vendors) |
| `tracy@thebigmuddyinn.com` | Tracy | The Inn's financial + legal email |
| Personal Gmails | Everyone | Individual personal drives (`amyaldersonallen@`, `tracyaldersonallen@`, etc.) |

**The canonical shared Drive** lives under **`bigmuddy@chasepierson.tv`**. Everything HDI-wide goes there. Personal Gmails hold personal stuff only.

Studio C files live under `team@chasepierson.tv` in a separate shared drive (Studio C is operated by Tuthill Design LLC, structurally separate).

## The top-level structure

Under `bigmuddy@chasepierson.tv` → My Drive → `Big Muddy/`:

```
Big Muddy/
├── 00-INBOX/
│   ├── photos-to-process/     ← Drop zone for new photos from the field
│   ├── videos-to-process/     ← Same for videos
│   └── voice-memos/           ← Audio dictations awaiting transcription
│
├── 01-MAGAZINE/
│   ├── drafts/                ← Magazine article drafts
│   ├── published/             ← Live articles (mirror of bigmuddymagazine.com)
│   └── photos/                ← Magazine-specific photo pulls
│
├── 02-RADIO/
│   ├── playlists/             ← Curated playlists for different dayparts
│   ├── stingers/              ← Station ID files (also synced to the Mac mini)
│   ├── show-notes/            ← Per-show notes, interview prep
│   └── guest-list/            ← Musicians on deck for interviews
│
├── 03-RECORDS/
│   ├── amy-allen-catalog/     ← Amy's music, the flagship
│   ├── mechanical-bull/       ← Mechanical Bull remasters
│   ├── artist-releases/       ← Other Big Muddy Records artists
│   └── contracts/             ← Signed non-exclusive deal memos
│
├── 04-INN/
│   ├── guest-photos/          ← Photos of guests, show nights, events
│   ├── room-photos/           ← Interior photos for Cloudbeds / Airbnb listings
│   ├── event-photos/          ← Weddings, Pilgrimage weekends, private events
│   ├── contracts/             ← Vendor contracts, lease, maintenance agreements
│   ├── receipts/              ← Scanned receipts for Tracy's bookkeeping
│   └── maintenance-log/       ← Photos of repairs, issues, before/after
│
├── 05-BAR/
│   ├── inventory/             ← Monthly liquor + mixer counts
│   ├── menu-drafts/           ← Menu photos, drafts, updates
│   └── show-nights/           ← Photos from show nights, bar receipts
│
├── 06-DIRECTORY/
│   ├── natchez-businesses/    ← Per-business photos + notes (DSD onboarding)
│   ├── onboarding-photos/     ← Screenshots of businesses for directory listings
│   └── reviews-pending/       ← Client-facing content awaiting approval
│
├── 07-TOURING/
│   ├── routes/                ← Tour itineraries, logistics
│   ├── venue-photos/          ← Corridor venue reference photos
│   └── van/                   ← Sprinter van maintenance, wrap, receipts
│
├── 08-ADMIN/
│   ├── team-photos/           ← Team headshots, group photos, about-us
│   ├── brand-assets/          ← Logos, fonts, brand kit (single source of truth)
│   ├── board-decks/           ← Tracy's financial reports, presentations
│   └── legal/                 ← Entity filings, operating agreements
│
└── 99-ARCHIVE/
    └── [year-month]/          ← Monthly archive of stuff no longer active but kept
```

## The one rule every user must know

> **"When you want a file to end up where the team can see it, put it in the Big Muddy folder, NOT My Drive. My Drive is only visible to you."**

This is the most important concept. Teach it first, repeat it often.

## Sync modes per folder

Google Drive for Desktop supports two modes per folder:

- **Streamed** — files live in the cloud, download on demand
- **Mirrored** — files are always on disk, work offline

### Recommended modes

| Folder | Recommended mode | Why |
|---|---|---|
| `00-INBOX/` | **Mirrored** | Active work, need instant access |
| `01-MAGAZINE/` | Streamed | Bulk archive, download when editing |
| `02-RADIO/stingers/` | **Mirrored** | Broadcast-critical, must be local |
| `03-RECORDS/*` | Streamed | Large audio files |
| `04-INN/` | **Mirrored** | Active ops, constant access |
| `04-INN/guest-photos/` | Streamed | Photo archive, grows quickly |
| `05-BAR/` | **Mirrored** | Active ops |
| `06-DIRECTORY/` | **Mirrored** | Active DSD onboarding |
| `07-TOURING/` | Streamed | Reference material |
| `08-ADMIN/` | **Mirrored** | Legal + contracts + brand need instant access |
| `99-ARCHIVE/` | Streamed | By definition inactive |

Set per-folder in Google Drive → Preferences → Google Drive → Folder options.

## Sharing permissions

**Default:** the `Big Muddy/` root folder is shared with:
- `me@chasepierson.tv` (Chase) — Editor
- `bigmuddy@chasepierson.tv` (the shared account itself) — Owner
- Amy's personal Gmail — Editor
- Tracy's personal Gmail — Editor
- Elijah's `team@chasepierson.tv` — **Viewer only** (Studio C doesn't need to edit Big Muddy files)

**Exceptions:**
- `04-INN/contracts/` and `08-ADMIN/legal/` → **Tracy Editor, Amy Viewer, Chase Editor**. Legal stuff is Tracy's domain.
- `03-RECORDS/amy-allen-catalog/` → **Amy Editor, Chase Viewer**. Her music, her decisions.
- `06-DIRECTORY/reviews-pending/` → **Amy + Tracy Editor** (they approve), **Chase Editor**, everyone else Viewer.

## Absolute "do not put anything here" folders

- **`My Drive/`** (personal) — never put HDI work here. If it's in your personal Drive, the team can't see it.
- **The Trash** — empty regularly. Drive keeps deleted files for 30 days.

## Naming conventions

### Photo files
Format: `YYYY-MM-DD_SUBJECT_##.jpg`
- Example: `2026-04-10_blues-room-setup_01.jpg`
- Keeps files sortable by date
- Subject is a short slug, lowercase, hyphen-separated
- `##` is a sequence number for multi-photo shoots

### Article drafts
Format: `YYYY-MM-DD_title-slug.md`
- Example: `2026-04-10_regina-biscuits-and-blues.md`

### Contracts
Format: `YYYY-MM-DD_counterparty_type.pdf`
- Example: `2026-04-10_vicki-wolpert_broker-pilot-msa.pdf`

### Receipts
Format: `YYYY-MM-DD_vendor_amount.pdf`
- Example: `2026-04-10_sysco_847-23.pdf`

### Event photos
Grouped by event folder: `04-INN/event-photos/2026-04-12_art-show-opening/`

## What goes where (cheat sheet for common situations)

| If you have... | Put it here |
|---|---|
| A photo from your phone you want on the team drive | `00-INBOX/photos-to-process/` |
| A draft of a magazine article | `01-MAGAZINE/drafts/` |
| A new stinger for the radio | `02-RADIO/stingers/` |
| A receipt from buying bar inventory | `04-INN/receipts/` and `05-BAR/inventory/` |
| A signed vendor contract | `04-INN/contracts/` |
| A team photo for the About page | `08-ADMIN/team-photos/` |
| Legal paperwork from the state of Mississippi | `08-ADMIN/legal/` |
| A photo from a show night (to archive) | `05-BAR/show-nights/` |
| A voice memo dictating notes | `00-INBOX/voice-memos/` |

## Related

- [Mac Setup](/setup/mac) — how Drive for Desktop gets installed
- [iPhone Setup](/setup/iphone) — mobile Drive configuration
- [iPad Setup](/setup/ipad) — iPad Drive configuration
- [Photo Workflow](/getting-started/photo-workflow) — how photos move from camera to published page
