# Handoff: Tracy Fort iMac Workstation Setup
**To:** Chief of Staff
**From:** Claude (workstation assessment session)
**Date:** April 2, 2026
**Branch:** `claude/imac-workstation-assessment-dbs2w`
**Related:** [`TRACY_IMAC_ASSESSMENT_2026-04-02.md`](./TRACY_IMAC_ASSESSMENT_2026-04-02.md)

---

## TL;DR

Tracy's Late 2015 iMac is now set up for Big Muddy admin work and Adobe Lightroom. Memory pressure remains the #1 bottleneck — the 8 GB RAM is at 99.5% before Lightroom even runs. Disk cleanup recovered ~14 GB but the real fix is a $50 RAM upgrade. Tracy's file organization was preserved exactly as she had it.

---

## What Got Done (In Order)

### 1. Hardware & Performance Assessment
- Documented full specs (iMac17,1, i5 3.2 GHz, 8 GB DDR3, 953 GB drive, macOS Monterey 12.7.6)
- Identified critical memory bottleneck: 99.5% RAM used, heavy disk swapping (30M+ swap events)
- Confirmed disk space is healthy: 407 GB free at start, 416 GB free after cleanup

### 2. Tracy's Desktop Organization Documented
Tracy organizes her work into 5 top-level Desktop folders. **These were catalogued and protected:**
1. Amy Allen Products (17 subfolders — artist management)
2. Big Muddy World and Links (12 subfolders — Inn & Touring business)
3. Business Folder (18 subfolders — family/business affairs)
4. Daily Working itme link (active workspace)
5. tracyafort (personal home)

**Rule for any future agent: do not modify or reorganize this structure.**

### 3. Chrome Bookmarks Configured
Added a "Big Muddy" folder to the Bookmarks Bar with 10 admin tools:
- Admin Dashboard, Events, Articles, Creative Studio, Clients, Media Upload, Newsletter, Venture Gallery, Getting Started Guide, Command Center
- All point to `bigmuddytouring.com/admin/*` and `/welcome`

### 4. Adobe Creative Cloud Setup
- Adobe CC + Lightroom installation kicked off under `admin@hillbillydreamsinc.com`
- Adobe Bridge identified as needed (free with CC) — install pending after Lightroom completes

### 5. Non-Destructive Cleanup (~14 GB Recovered)
Executed via a parallel Claude Code session running locally on the iMac. **Nothing in Tracy's working files was touched.**

| Action | Recovered |
|--------|-----------|
| Cleared `~/Library/Caches/*` (kept iMessage cache) | ~6.2 GB |
| Cleared Chrome service worker + GPU caches | ~1.3 GB |
| Cleared `~/Library/Logs/` and CrashReporter | ~17 MB |
| Deleted spent .dmg installers (ChatGPT, Amazon Music, 2x Lightroom) | ~209 MB |
| Removed 36 orphaned Office `~$` lock files | trivial |
| **Total** | **~14 GB** |

Full cleanup report saved to Tracy's Desktop at `~/Desktop/CLEANUP-REPORT.txt`.

### 6. Documentation Committed
- `docs/TRACY_IMAC_ASSESSMENT_2026-04-02.md` — full assessment report (committed 8c247cb)
- `docs/HANDOFF_TRACY_IMAC_2026-04-02.md` — this document
- Branch pushed to `claude/imac-workstation-assessment-dbs2w`

---

## What's Still Pending

### Chase's Plate
1. **Order 32 GB RAM kit (~$50)** — DDR3L 1867 MHz PC3-14900 SO-DIMM, 204-pin, 1.35V. Buy from OWC (macsales.com) or Crucial. **This is the #1 fix.**
2. **Order external HD** — for Photos/Pictures archive before any larger cleanup
3. **Empty Trash** — Terminal lacked Full Disk Access; needs a manual right-click → Empty Trash

### Tracy's Plate
1. **Decide on iMessage cache** (7.6 GB) — safe to clear but preserves message attachment previews. Tracy's call.
2. **Decide on Wormwood Records QuickBooks backups** — 56 small files (~12 MB total) from 2013–2014 in home directory. Archive or delete.

### Claude's Plate (next session)
1. Install Adobe Bridge once Lightroom finishes
2. After RAM is installed and external HD is connected: run Photos/Pictures archive and second-pass cleanup
3. Set up "Big Muddy Tools" folder on Desktop with launcher shortcuts (waiting on backup confirmation)

---

## Protected Items (Hands-Off List)

For any future agent working on this machine:
- All 5 Desktop folders (the structure is correct, do not "improve" it)
- All `.docx`, `.xlsx`, `.pdf`, `.webloc` files
- `~/tracyafort/Google Drive/` (deleting local = deleting cloud)
- `~/Library/Photos/` (52 GB Apple Photos library)
- `~/Pictures/` (79 GB)
- `~/Library/Caches/com.apple.MobileSMS/` (iMessage attachments)
- `Wormwood Records.qb2013-*.dmg` (until Tracy decides)

---

## Key Context for the CoS

- **Adobe account:** `admin@hillbillydreamsinc.com`
- **Google Drive on machine:** `tracyaldersonallen@gmail.com`
- **Tracy is an equity partner**, not an employee — flag any copy or comms that gets this wrong
- **Tracy's organization is sacred** — she has a system, it works for her, it should not be "optimized" by agents
- **The real bottleneck is RAM**, not disk. Cleanup is a band-aid until the upgrade lands.

---

## Files Created/Modified This Session

| Path | What |
|------|------|
| `docs/TRACY_IMAC_ASSESSMENT_2026-04-02.md` | Full assessment report |
| `docs/HANDOFF_TRACY_IMAC_2026-04-02.md` | This handoff |
| `~/Desktop/CLEANUP-REPORT.txt` (on iMac) | Cleanup execution log |
| `~/Desktop/BEFORE-CLEANUP-20260402.png` (on iMac) | Pre-cleanup screenshot |
| Chrome bookmarks (on iMac) | Big Muddy folder added to bookmarks bar |

---

*Generated by Claude Code · April 2, 2026*
