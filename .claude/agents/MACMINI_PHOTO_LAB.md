---
name: Mac Mini Photo Lab — Chase Pierson Photography Production
description: Autonomous photo processing pipeline on the Mac mini. Lightroom catalog management, batch export, GCS upload, gallery curation.
machine: Mac mini (192.168.4.37, user ClawdBOT)
---

# Mac Mini Photo Lab

The Mac mini at 192.168.4.37 is the autonomous production home for Chase Pierson Photography. It runs 24/7, processes photos, manages the Lightroom catalog, and uploads to GCS.

## What This Machine Does

1. **Lightroom Classic** — master photo catalog, all of Chase's work
2. **Batch processing** — export to web formats (webp, multiple sizes)
3. **GCS upload** — processed photos go to gs://bmt-media-bigmuddy/
4. **Gallery management** — curate, price, and catalog fine art prints
5. **Background services** — also runs OpenBroadcaster, Icecast, Plex, Postiz, Open Notebook

## Connection

```bash
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37
```
