# Handoff — Hetzner Media Infrastructure

**Session:** 2026-04-17/18
**Status:** Live and operational. T7 sync in progress (~57 GB of ~590 GB done).

---

## What We Built and Why

Chase had ~1.3 TB of photos scattered across a Mac mini T7 SSD, Lightroom CC cloud cache, and a GCS bucket — none of it tagged, none of it searchable. The goal: consolidate everything into a self-hosted photo DAM (digital asset manager) with AI tagging, face recognition, and CLIP semantic search, so every photo in the ecosystem is findable.

The result: a Hetzner cloud server running Immich (self-hosted Google Photos alternative), fed by GCS and the Mac mini, accessible from anywhere including Chase's iPhone.

---

## The Server

**Hetzner CCX23** — 4 vCPU dedicated · 16 GB RAM · 160 GB NVMe + 1 TB block storage

| | |
|---|---|
| **Public IP** | `5.161.61.151` |
| **Tailscale IP** | `100.89.173.28` |
| **Tailscale hostname** | `bigmuddy-services` |
| **SSH** | `ssh -i ~/.ssh/id_hetzner chase@5.161.61.151` |
| **Cost** | $39.99/mo (server) + ~$5/mo (1 TB volume) |
| **Location** | Ashburn, VA (us-east) |
| **OS** | Ubuntu 24.04 LTS |

All credentials are in **Bitwarden** under "Hetzner" and "Immich — bigmuddy-services."

SSH key: `~/.ssh/id_hetzner` on both the MacBook Pro and Mac mini (`/Users/ClawdBOT/.ssh/id_hetzner`).

---

## Storage Layout (`/mnt/storage` — 1 TB volume)

```
/mnt/storage/
├── photos/
│   ├── gcs-exports/        ← GCS bucket bmt-media-bigmuddy (53k files, 3.8 GB) — COMPLETE
│   ├── t7-originals/       ← T7 SSD originals from Mac mini (~590 GB) — IN PROGRESS
│   ├── upload/             ← Immich uploads (phone backups go here)
│   ├── library/            ← Immich internal library
│   └── thumbs/             ← Immich thumbnails
└── logs/
    └── gcs-sync.log
```

---

## Services Running (all Docker)

All services managed via Docker Compose under `/opt/services/` on the Hetzner server.

### Caddy (reverse proxy)
- `/opt/services/caddy/`
- Handles TLS (Let's Encrypt auto) for all subdomains
- Routes: immich → `immich_server:2283`

### Immich (photo DAM)
- **URL:** https://immich.hillbillydreamsinc.com
- **Login:** `me@chasepierson.tv` / password in Bitwarden as "Immich — bigmuddy-services"
- **iPhone app:** connected and backing up
- **External library:** `/mnt/storage` mounted at `/external_library` inside container
- `/opt/services/immich/`

### What Immich is doing right now
- **52,892 assets ingested** from GCS exports
- Face detection running (clusters faces automatically)
- CLIP semantic search active (search by description, not just filename)
- Smart previews + thumbnails generating in background
- Phone backup active

---

## Data Pipelines

### Pipeline 1: GCS → Hetzner (COMPLETE)
- **What:** All 53,427 files from `bmt-media-bigmuddy` GCS bucket
- **Where:** `/mnt/storage/photos/gcs-exports/`
- **Size:** 3.8 GB (web exports, WEBPs — not RAW originals)
- **Status:** Done. rclone config at `~/.config/rclone/rclone.conf` on the server.
- **To re-sync:** `ssh -i ~/.ssh/id_hetzner chase@5.161.61.151 "rclone sync gcs:bmt-media-bigmuddy /mnt/storage/photos/gcs-exports --transfers=16"`

### Pipeline 2: Mac mini T7 → Hetzner (IN PROGRESS — ~57 GB of ~590 GB done)
- **What:** Real RAW/DNG/JPEG originals from `/Volumes/T7/Photos/` on the Mac mini
- **Excludes:** `Lightroom-CC-Cache/` (737 GB of previews — not originals, skipped)
- **ETA:** ~2.5 days at 21 Mbps upload
- **Script:** `/Users/ClawdBOT/sync-t7-hetzner.sh`
- **Log:** `/Users/ClawdBOT/logs/t7-to-hetzner.log`
- **Auto-restart:** cron on Mac mini checks every 5 min, restarts if not running
- **Completion alert:** iMessage to `me@chasepierson.tv` when done (via osascript)

To check progress from any machine:
```bash
ssh -i ~/.ssh/id_hetzner chase@5.161.61.151 "du -sh /mnt/storage/photos/t7-originals/"
```

To check rsync is still running on the mini:
```bash
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 "ps aux | grep rsync | grep -v grep"
```

To restart manually if needed:
```bash
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 "nohup /Users/ClawdBOT/sync-t7-hetzner.sh >> /Users/ClawdBOT/logs/t7-sync-cron.log 2>&1 &"
```

### Pipeline 3: iPhone → Immich (ACTIVE)
- Immich mobile app installed on Chase's phone
- Auto-backup active to https://immich.hillbillydreamsinc.com
- Photos land in `/mnt/storage/photos/upload/`

---

## rclone (GCS Access)

Installed on the Hetzner server at `/usr/bin/rclone` (v1.73.4).

Config at `~/.config/rclone/rclone.conf` — GCS remote named `gcs`, authenticated via OAuth to GCP project `bigmuddy-ff651`.

Available buckets:
- `gcs:bmt-media-bigmuddy` — main media bucket (53k files)
- `gcs:sovereign-lore-vault-bigmuddy-ff651` — secondary

The OAuth refresh token handles token renewal automatically.

---

## DNS (all Cloudflare)

| Subdomain | Points to | Service |
|---|---|---|
| `immich.hillbillydreamsinc.com` | `5.161.61.151` | Immich photo DAM |
| `postiz.hillbillydreamsinc.com` | `5.161.61.151` | Postiz (not yet deployed) |
| `notebook.hillbillydreamsinc.com` | `5.161.61.151` | Open Notebook (not yet deployed) |

---

## Immich Operational Notes

**Adding a new external library path** (e.g., after T7 sync completes):
```bash
# Login and get token
TOKEN=$(curl -s -X POST https://immich.hillbillydreamsinc.com/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"me@chasepierson.tv","password":"<from bitwarden>"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['accessToken'])")

# Create library
curl -s -X POST https://immich.hillbillydreamsinc.com/api/libraries \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"name":"T7 Originals","ownerId":"fe8ec4c0-acca-45f0-8ffa-2f37de33165c","importPaths":["/external_library/photos/t7-originals"]}'

# Trigger scan
curl -s -X POST https://immich.hillbillydreamsinc.com/api/libraries/<LIB_ID>/scan \
  -H "Authorization: Bearer $TOKEN"
```

**Admin user ID:** `fe8ec4c0-acca-45f0-8ffa-2f37de33165c`

**Triggering a re-scan of existing libraries:**
Go to https://immich.hillbillydreamsinc.com → Administration → Libraries → scan.

---

## Pending / What's Next

| Task | Notes |
|---|---|
| **Add T7 library to Immich** | After sync completes, create external library pointing to `/external_library/photos/t7-originals` |
| **Install Tailscale on MBP** | App Store. Lets you use Tailscale SSH (`ssh chase@bigmuddy-services`) instead of key auth |
| **SMB share for Lightroom CC** | Set up Samba on Hetzner so Lightroom CC can write originals directly to the server |
| **Postiz container** | DNS record exists, container not yet deployed |
| **Open Notebook container** | DNS record exists, container not yet deployed |
| **Hetzner volume limit increase** | Email support@hetzner.com — account capped at 1 TB, need 6 TB |
| **Lightroom CC album download** | Chase wants to pull specific albums from Lightroom CC directly to Hetzner — needs workflow design |

---

## Architecture Diagram

```
iPhone ──────────────────────────────────────────────┐
                                                     │ Immich app
MacBook Pro (chasethis)                              ▼
  └── Lightroom CC ──── (SMB, future) ──→  Hetzner CCX23 (5.161.61.151)
                                             ├── Caddy (TLS proxy)
Mac mini (ClawdBOT@192.168.4.37)             ├── Immich (photo DAM + ML)
  └── T7 SSD (1.2 TB Photos)                │     └── Face recognition
       └── rsync (in progress) ─────────────┤          CLIP search
                                             │          Smart previews
GCS bmt-media-bigmuddy (3.8 GB)             ├── /mnt/storage (1 TB volume)
  └── rclone (complete) ─────────────────────┘         gcs-exports/
                                                        t7-originals/ (syncing)
                                                        upload/ (phone)

Google Drive (15 TB workspace) ← future cloud backup destination
GCS bmt-media-bigmuddy ← existing cloud backup (keep)
```

---

## Key Files on Hetzner Server

| Path | What |
|---|---|
| `/opt/services/immich/docker-compose.yml` | Immich stack |
| `/opt/services/immich/.env` | DB password, upload path, external path |
| `/opt/services/caddy/Caddyfile` | Reverse proxy rules |
| `/mnt/storage/` | All media storage |
| `~/.config/rclone/rclone.conf` | GCS remote config |

---

## Operational Commands

```bash
# SSH to server
ssh -i ~/.ssh/id_hetzner chase@5.161.61.151

# Check all containers
ssh -i ~/.ssh/id_hetzner chase@5.161.61.151 "docker ps"

# Restart Immich
ssh -i ~/.ssh/id_hetzner chase@5.161.61.151 "cd /opt/services/immich && docker compose restart immich-server"

# Check storage
ssh -i ~/.ssh/id_hetzner chase@5.161.61.151 "df -h /mnt/storage && du -sh /mnt/storage/photos/*"

# Check T7 sync progress
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 "tail -20 /Users/ClawdBOT/logs/t7-to-hetzner.log"
```
