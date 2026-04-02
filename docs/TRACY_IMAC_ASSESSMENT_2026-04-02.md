# Tracy Fort iMac — Workstation Assessment & Setup Report
**Date:** April 2, 2026
**Prepared for:** Chief of Staff
**Supervised by:** Chase

---

## Hardware Specifications

| Spec | Detail |
|------|--------|
| **Model** | iMac 17,1 (Retina 5K, 27-inch, Late 2015) |
| **Processor** | Quad-Core Intel Core i5 @ 3.2 GHz |
| **RAM** | 8 GB DDR3 (4 slots available) |
| **Storage** | 953 GB total, ~407 GB free |
| **Serial Number** | C02S59WGGG7L |
| **macOS** | 12.7.6 Monterey |

---

## Performance Assessment

### Current State: MEMORY BOTTLENECK

| Metric | Value | Status |
|--------|-------|--------|
| **RAM Used** | 8,153 MB of 8,192 MB | CRITICAL — 99.5% used |
| **RAM Free** | 37 MB | Effectively zero |
| **Swap Events** | 30M+ swapins / 30M+ swapouts | Heavy disk swapping |
| **CPU Usage** | 26% user / 61% system / 12% idle | System overhead from swap |
| **Load Average** | 1.79 | Moderate |

**Bottom line:** This machine is running out of memory constantly. The high system CPU usage (61%) is largely the OS managing swap. Adding Lightroom to this workload will make it worse without a RAM upgrade.

---

## Disk Space Breakdown

### By Location

| Location | Size | Notes |
|----------|------|-------|
| Desktop | 207 GB | Tracy's organized folders + working files |
| ~/tracyafort | 107 GB | Personal folder (Applications, Dropbox, Google Drive, etc.) |
| Library/Photos | 52 GB | Apple Photos library |
| Pictures | 79 GB | Image files |
| Library/Caches | 13 GB | Safe to clear — rebuilds automatically |
| Library (total) | 84 GB | Includes Photos, Caches, App Support |
| Documents | 6.2 GB | |
| Music | 3.8 GB | |
| Downloads | 1.1 GB | Old installers and media files |
| Movies | 606 MB | |

### Cloud Storage Connected
- **Google Drive:** tracyaldersonallen@gmail.com

### Notable Items in Downloads
- IMG_2755.MOV (234 MB)
- Amazon Music Installer.dmg (137 MB) — can be deleted after install
- ChatGPT.dmg (60 MB) — can be deleted after install
- Various photos and videos (~100 MB combined)

### Old QuickBooks Backups in Home Directory
- 5x `Wormwood Records.qb2013-*.dmg` files (tiny — 220K each, from 2013-2014)

### Time Machine
- No local snapshots found

---

## Software Installed

| Software | Status |
|----------|--------|
| Google Chrome | Installed |
| Safari | Installed |
| Adobe Creative Cloud | Installing (April 2, 2026) |
| Adobe Lightroom | Installing (April 2, 2026) |
| Adobe Bridge | NOT installed — available free via Creative Cloud |
| Xcode Command Line Tools | NOT installed (download in progress) |
| MasterWriter 2.0 | Present in ~/tracyafort |

**Adobe Account:** admin@hillbillydreamsinc.com

---

## Tracy's Desktop Organization

Tracy has organized her Desktop into the following folder structure. **This structure is correct and must not be modified.**

### 1. Amy Allen Products (17 subfolders)
Artist management files for Amy Allen:
- 8th Street Blues, A2, AldersonAllenClips
- Amy Allen Brand Package, Concerts, General, Vids, logo final
- Amy Photoshoot 4/8/25, AmyAllenMusic, AmyAllenPhotos, AmyAllenPress
- ChartsLyrics, Mad Clips, amys website, b&BluesClips

### 2. Big Muddy World and Links (12 subfolders)
Big Muddy Inn & Touring business files:
- The Big Muddy Brand Package (logos, guidelines, print/web files)
- BMI Paint Schedule, Big Muddy Gift Certificates, Big Muddy Insurance
- Big Muddy Parties and Showers, Big Muddy Wedding Photo
- Bios, Blues Room, Website
- Natchez Season Events, whiskey and Rummy

### 3. Business Folder (18 subfolders)
Business and family affairs:
- AbbeyLayne, Alderson Properties, Blaire, David Fort
- EBATRUSTLegal, ED, Ebay, FortAlderson
- Jewell Murphy Fort, John Hudson Fort, Josie
- Kids Trust Documents, Personal Finance, Rockin A
- Scroggs Estate, Tracy&Amy Trust

### 4. Daily Working itme link (active workspace)
Current working files including:
- Big Muddy letters, show schedules (25/26), spring shows
- Bank accounts, Chase Trust info, 2025 consumer debt
- Cloudbeds/InnRoad login shortcuts, Squarespace dashboard
- Natchez contacts, Blueprint Portal
- Tracy Notes 1-8 (working notes)
- Various .webloc browser shortcuts

### 5. tracyafort (personal)
- Applications, Downloads, Dropbox, Google Drive
- Music, Movies, Pictures, Public, Sites
- MasterWriter 2.0, License.pdf
- A few personal documents

### Loose Files on Desktop
- ~30 temporary Office lock files (`~$*.docx`, `~$*.xlsx`) — these are created when Word/Excel documents are open and sometimes persist after closing
- Desktop screenshot (BEFORE-CLEANUP-20260402.png)

---

## Completed Setup Actions

### Chrome Bookmarks — "Big Muddy" Folder
Added to the Bookmarks Bar with the following links:

| Bookmark | URL |
|----------|-----|
| Admin Dashboard | bigmuddytouring.com/admin |
| Events | bigmuddytouring.com/admin/events |
| Articles | bigmuddytouring.com/admin/articles |
| Creative Studio | bigmuddytouring.com/admin/creative |
| Clients | bigmuddytouring.com/admin/clients |
| Media Upload | bigmuddytouring.com/admin/upload |
| Newsletter | bigmuddytouring.com/admin/newsletter |
| Venture Gallery | bigmuddytouring.com/gallery |
| Getting Started Guide | bigmuddytouring.com/first-content-guide.html |
| Command Center | bigmuddytouring.com/welcome |

---

## Recommended: RAM Upgrade

### Why This Is the #1 Priority

The machine currently has 8 GB of RAM and is using 99.5% of it before Lightroom is even running. Adobe Lightroom alone recommends 16 GB minimum. This upgrade will have the single biggest impact on daily performance.

### Upgrade Options

| Option | Configuration | Approx Cost | Recommendation |
|--------|--------------|-------------|----------------|
| **32 GB** | 4x 8GB DDR3L 1867 MHz SO-DIMM | $40–55 | **RECOMMENDED** — best value |
| **64 GB** | 4x 16GB DDR3L 1867 MHz SO-DIMM | $80–120 | Maximum supported — future-proof |

**Memory spec required:** DDR3L 1867 MHz PC3-14900 SO-DIMM, 204-pin, 1.35V

### Where to Order
1. **OWC (macsales.com)** — Mac-specific retailer, guaranteed compatible, includes install video
2. **Crucial.com** — Use compatibility scanner for iMac17,1
3. **Amazon / Newegg** — Search "DDR3L 1867 MHz SO-DIMM 32GB kit"

### Installation (5 minutes, no tools required)
1. Shut down the iMac and lay it face-down on a soft towel
2. Press the small button above the power port — the RAM door pops open
3. Pull the levers to release the existing memory sticks
4. Insert new sticks and press until they click
5. Close the door and boot up

Apple's official guide with photos: https://support.apple.com/en-us/108317

---

## Pending Actions

| Action | Status | Owner |
|--------|--------|-------|
| External HD purchase | Pending | Chase |
| Back up all files to external HD | Waiting on drive | Chase |
| Clear 13 GB of system caches | Waiting on backup | Claude |
| Install Adobe Bridge (free) | After Lightroom install | Chase / Tracy |
| RAM upgrade (32 GB recommended) | Needs to be ordered | Chase |
| Clean up old .dmg installers in Downloads | After backup | Chase |
| Xcode Command Line Tools install | Download in progress | Automatic |
| Set up Big Muddy Tools folder on Desktop | After backup confirmed | Claude |

---

## Summary

Tracy's iMac is functional but memory-constrained. The 8 GB of RAM is the primary bottleneck — the system is swapping constantly, which causes the sluggish feel. Disk space is adequate at 407 GB free, but an external drive is the right move for archiving before any cleanup.

**Immediate priorities:**
1. **Order 32 GB RAM kit (~$50)** — biggest bang for the buck
2. **Get the external HD** — back up everything before cleanup
3. **Clear caches** (13 GB) after backup is confirmed
4. **Install Adobe Bridge** once Lightroom setup is complete

Tracy's file organization is intact and untouched. The Big Muddy Chrome bookmarks are live. Adobe Creative Cloud is being configured under admin@hillbillydreamsinc.com.

---

*Report generated by Claude Code on April 2, 2026*
*Desktop screenshot saved: ~/Desktop/BEFORE-CLEANUP-20260402.png*
