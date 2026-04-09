# Status Report — Mac Mini Service Audit
## 2026-04-01 / 04-02 Session

---

## EXECUTIVE SUMMARY

**Docker Desktop is NOT running.** All Dockerized services (Postiz, OpenBroadcaster, Icecast, Open Notebook, SurrealDB) are DOWN. Only native apps (Plex) and the Node.js photo batch are operational. This is the single biggest finding — 4 of 6 services are offline because Docker wasn't started.

The photo processing batch is running successfully at 3,776/17,366 (21.7%) with good Vision API tagging. XMP metadata is being written to source files and is readable by Adobe Bridge/exiftool.

Internal disk is at 92% — 17GB free. A 17GB Lightroom CC cache on the internal drive is the main culprit and should be relocated to the T7.

---

## SERVICE STATUS OVERVIEW

| Service | Type | Port | Status | Action Needed |
|---------|------|------|--------|---------------|
| **Photo Batch** | Node.js | — | **RUNNING** | None — let it finish |
| **Plex** | Native app | 32400 | **RUNNING** (auth stale) | Re-claim server |
| **Docker Desktop** | Runtime | — | **DOWN** | Start Docker Desktop |
| **OpenBroadcaster** | Docker | 8080 | **DOWN** | Start Docker |
| **Icecast** | Docker | 8010 | **DOWN** | Start Docker |
| **Postiz** | Docker (9 containers) | 4007 | **DOWN** | Start Docker + configure API keys |
| **Open Notebook** | Docker (2 containers) | 5055, 8502 | **DOWN** | Start Docker |
| **Adobe Bridge** | Native app | — | **Installed** | Works — XMP tags visible |

---

## TASK 1: Adobe Bridge & XMP Tags

### Status: VERIFIED WORKING

**XMP tags are being written correctly to source files.** Confirmed via exiftool:

```
File: D623F1A2-06E5-4714-90AC-0320B2DDF208.dng
Subject: landscape,big-muddy,south,unknown
Description: Tree, Residential area, Bird's-eye view, House, Home — Unknown, Unknown
Creator: Chase Pierson
```

- Adobe Bridge 2026 installed and functional
- Launched Bridge and pointed at smart previews directory
- DNG thumbnails render; metadata panel shows XMP data
- Keyword search in Bridge will work once Bridge indexes the folders
- Screenshot saved to `~/Desktop/bridge-screenshot-5.png`

### Tag Quality Issues

| Metric | Value | Assessment |
|--------|-------|------------|
| Total in manifest | 3,550 | Growing (batch at 3,776/17,366) |
| Unknown location | 3,550 (100%) | **CRITICAL** — no geo inference working |
| Empty mood | 2,878 (81%) | High — mood detection underperforming |
| Flagged for review | 676 (19%) | Expected for AI tagging |
| Low confidence (<0.7) | 671 (19%) | Acceptable |
| Vision API cost | $15.98 | On budget |

### Subject Tag Distribution
| Tag | Count | % |
|-----|-------|---|
| venue | 1,276 | 36% |
| portrait | 1,018 | 29% |
| night | 965 | 27% |
| performer | 743 | 21% |
| landscape | 283 | 8% |
| street | 270 | 8% |
| food | 154 | 4% |
| architecture | 24 | 1% |

### Usable As (all photos)
- article: 3,550 (100%)
- social: 3,550 (100%)
- thumbnail: 3,550 (100%)

### Action Items for Tag Quality
1. **Location inference is 100% Unknown** — the smart previews are DNGs stripped of GPS EXIF. The inference logic in `process-photos.js` needs to fall back to Lightroom catalog metadata or folder-name parsing. Chase should review whether the Lightroom catalog has GPS data for these files.
2. **Mood detection is underperforming** — 81% empty. The mood inference logic may need tuning or a secondary pass using the Vision API label descriptions.
3. **All brand = "big-muddy"** — expected since these are all from one catalog, but post-processing should cross-reference with actual shoot locations to assign Bearsville, DSD, etc.
4. **All "usable_as" is identical** — the logic assigns the same three categories to everything. Needs refinement based on resolution, subject, and composition quality.

---

## TASK 2: Postiz Social Media Scheduling

### Status: DOWN (Docker not running)

**Current State:**
- Docker Compose file intact at `/Volumes/T7/BigMuddy/postiz-app/docker-compose.yaml`
- 9-container stack (Postiz, Postgres, Redis, Temporal, Elasticsearch, etc.)
- **No admin account created yet** — first user to register becomes admin
- **ALL social media API keys are empty** — zero platforms connected

### API Keys Needed (all empty in docker-compose.yaml)

| Platform | Env Vars | Developer Portal |
|----------|----------|-----------------|
| X (Twitter) | X_API_KEY, X_API_SECRET | https://developer.x.com/en/portal/dashboard |
| Facebook/Instagram | FACEBOOK_APP_ID, FACEBOOK_APP_SECRET | https://developers.facebook.com/apps/ |
| YouTube | YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET | GCP console (project: bigmuddy-ff651) |
| TikTok | TIKTOK_CLIENT_ID, TIKTOK_CLIENT_SECRET | https://developers.tiktok.com/ |
| LinkedIn | LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET | https://www.linkedin.com/developers/apps/ |

### Bitwarden
- CLI installed, vault at `admin@hillbillydreamsinc.com`, status: **locked**
- No existing Postiz or social API credentials found (vault needs unlock to fully confirm)

### To Bring Online
1. Start Docker Desktop
2. `cd /Volumes/T7/BigMuddy/postiz-app && docker compose up -d`
3. Go to http://localhost:4007 and register admin account
4. Chase creates developer apps on each platform and provides API keys
5. Add keys to `docker-compose.yaml` and restart

---

## TASK 3: Radio Playout System (OpenBroadcaster + Icecast)

### Status: DOWN (Docker not running)

**What Exists:**
- Docker Compose at `/Volumes/T7/BigMuddy/openbroadcaster-server/docker-compose.yml`
- 3-container stack: OB Server (8080), MariaDB (3307), Icecast (8010)
- Credentials: admin/bigmuddy2026 (OB), bigmuddy-source/bigmuddy-admin (Icecast)
- **18 shows configured** in OB database (from March 28 session)
- **7 DJ/host characters** designed
- **14 music genres** + **8 content categories** configured
- OBPlayer source code at `/Volumes/T7/BigMuddy/openbroadcaster-player/` (not connected)
- Cannot query OB database without Docker running

**Audio Inventory:**

| Location | Files | Size | Content |
|----------|-------|------|---------|
| `/Volumes/T7/Music/` | 66 | 1.9 GB | Mechanical Bull tracks, radio promos |
| `/Volumes/T7/Plex-Media/` | 84 | 1.8 GB | Radio station IDs, music |
| `/Volumes/T7/Clients/` | 185 | 794 MB | Client audio files |
| Archive/misc | 224 | ~500 MB | CapCut drafts, old recordings |
| **Total** | **559** | **~5 GB** | |

**Radio Promo Content (70 files in `/Volumes/T7/Music/BigMuddy-Radio-Promos/`):**
- Station IDs, show promos, bumpers, sweepers
- v3 ElevenLabs voice versions
- Voice casting samples
- Show poster artwork

### To Bring Online
1. Start Docker Desktop
2. `cd /Volumes/T7/BigMuddy/openbroadcaster-server && docker compose up -d`
3. Verify 18 shows + media library still intact in OB database
4. Upload Mechanical Bull tracks to OB media library
5. Configure OBPlayer to connect OB → Icecast
6. Test stream at http://localhost:8010/stream

### To Go Fully Live
- OBPlayer needs to be configured and running as the playout engine
- Icecast stream URL needs to be wired into bigmuddyradio.com
- Music library needs significant expansion (559 audio files total is thin)
- Need proper music licensing for any non-original content

---

## TASK 4: Plex Media Server

### Status: RUNNING (auth issue)

- Plex Media Server app launched successfully
- Responds on port 32400 but returns **401 Unauthorized** with stored token
- Token in Preferences.xml: `GupMqbsHZHVggPwQ-C8a` (stale — server was shut down March 30)
- Plex data directory is only **540KB** — minimal configuration
- Server name: "HillbillyDreams Mac mini" (from previous session)

**Media on Disk (`/Volumes/T7/Plex-Media/` — 4.1 GB total):**

| Library | Files | Size | Content |
|---------|-------|------|---------|
| BigMuddy-Radio | 74 | 17 MB | Station IDs, promos |
| Music | 132 | 2.2 GB | Mechanical Bull AI tracks, recordings |
| Video | 13 | 1.9 GB | DJI Pocket 3 recordings, live stream archives |
| Photos | 50 | 7.9 MB | Show poster art (WebP) |
| Home-Videos | 0 | — | Empty |
| Videos | 0 | — | Empty |

### Gap Analysis (per PLEX_GAP_ANALYSIS.md)
- **Content quality**: Still robot TTS promos + 1 ElevenLabs voice
- **Video**: Only raw DJI test recordings, no produced content
- **Inn TV**: Not operational — no branded home screen, no curated collections
- **Remote access**: Not configured

### To Fix
1. Chase needs to re-claim the Plex server via http://localhost:32400/web (Plex account login)
2. Re-add libraries pointing to `/Volumes/T7/Plex-Media/` subfolders
3. Enable remote access (optional — for team viewing)
4. Create collections and playlists for Inn TV experience

---

## TASK 5: Open Notebook Knowledge Base

### Status: DOWN (Docker not running)

- Docker Compose at `/Volumes/T7/BigMuddy/open-notebook/docker-compose.yml`
- 2 containers: SurrealDB (v2) + Open Notebook app
- **No persistent data directories found** on disk (volumes are Docker-managed)
- **Encryption key is DEFAULT** (`change-me-to-a-secret-string`) — SECURITY ISSUE
- No evidence of any documents indexed yet
- Alternative config exists at `hillbilly-dreams/docker/open-notebook/docker-compose.yml` using Gemini 2.5 Flash + Neon Postgres

### Key Docs to Index (when running)
- `BROADCASTING_CAPABILITIES.md` — Complete radio stack reference
- `.claude/agents/ORIGIN_STORY.md` — HDI narrative
- `.claude/agents/BRAND_NARRATIVE_OVERHAUL.md` — Voice and copy rules
- `memory/` directory — All feedback and policy files
- `STATUS_REPORT_2026-03-29.md` — Previous session state
- `PLEX_GAP_ANALYSIS.md` — Entertainment gaps
- This report

### To Bring Online
1. Start Docker Desktop
2. Generate a real encryption key: `openssl rand -hex 32`
3. Update `docker-compose.yml` with the new key
4. Store key in Bitwarden
5. `cd /Volumes/T7/BigMuddy/open-notebook && docker compose up -d`
6. Access web UI at http://localhost:8502
7. Configure Gemini API key for AI features
8. Upload key documents

---

## TASK 6: Disk Space & Health

### Disk Usage

| Drive | Total | Used | Free | Capacity | Status |
|-------|-------|------|------|----------|--------|
| Internal (Data) | 228 GB | 180 GB | 17 GB | 92% | **CRITICAL** |
| T7 SSD | 3.6 TB | 1.7 TB | 1.9 TB | 48% | Healthy |

### Internal Disk Breakdown (Top Consumers)
| Path | Size | Notes |
|------|------|-------|
| `~/Library/Caches/com.adobe.lightroomCC/` | 17 GB | **Should move to T7** |
| `~/Library/Application Support/` | 11 GB | Normal |
| `~/Library/Caches/Homebrew/` | 579 MB | Can clean |
| `~/Library/Caches/Google/` | 566 MB | Can clean |

### T7 SSD Health
- **SMART Status: Not Supported** (ExFAT on USB — Samsung T7 doesn't expose SMART via USB interface)
- No way to monitor drive health without Samsung Magician software
- File system: ExFAT (limits: no permissions, no symlinks, no journaling)

### Memory
- **Free pages: ~55-60 MB** (extremely low)
- **Inactive (reclaimable): ~1.1 GB**
- **Active: ~1.2 GB**
- With Docker down, memory pressure is manageable. When Docker restarts with 14 containers, memory will be extremely tight on 8GB RAM.

### Photo Batch Progress
| Metric | Value |
|--------|-------|
| Position | 3,776 / 17,366 |
| Progress | 21.7% |
| Manifest images | 3,550 |
| GCS files uploaded | ~10,951 (3 sizes per photo) |
| GCS size | 69.75 MB |
| Vision API cost | $15.98 |
| Rate | 0.4 images/sec |
| Est. remaining | ~9.5 hours |

---

## CRITICAL ACTION ITEMS FOR CHASE

### Immediate (Today)
1. **Start Docker Desktop** — 4 services are dead without it
2. **Move Lightroom CC cache to T7** — internal disk at 92%, 17GB cache is the culprit
   - Lightroom CC > Preferences > Local Storage > Change cache location to `/Volumes/T7/Photos/Lightroom-CC-Cache/`
3. **Re-claim Plex server** — go to http://localhost:32400/web and log in with Plex account

### This Week
4. **Create social media developer apps** — needed for Postiz:
   - X: https://developer.x.com/en/portal/dashboard
   - Facebook: https://developers.facebook.com/apps/
   - YouTube: GCP console (project: bigmuddy-ff651)
   - TikTok: https://developers.tiktok.com/
   - LinkedIn: https://www.linkedin.com/developers/apps/
5. **Update Open Notebook encryption key** — currently using default (security risk)
6. **Review photo tag quality** — 100% unknown locations, 81% empty moods
   - Provide location data or confirm Lightroom catalog has GPS metadata
   - Consider a second tagging pass for mood and location

### Future
7. **Consider cloud migration for Postiz** — 9 containers for social scheduling is heavy for 8GB RAM Mini
8. **Expand music library** — 559 audio files is thin for a radio station
9. **Produce video content for Plex** — only raw DJI recordings, no produced Inn TV content
10. **Monitor T7 health** — SMART not available via USB; consider Samsung Magician or periodic backup verification

---

## DOCKER RESTART SEQUENCE

When Chase starts Docker Desktop, all services should come back automatically (restart: always). If not:

```bash
# OpenBroadcaster + Icecast
cd /Volumes/T7/BigMuddy/openbroadcaster-server && docker compose up -d

# Postiz (9 containers)
cd /Volumes/T7/BigMuddy/postiz-app && docker compose up -d

# Open Notebook
cd /Volumes/T7/BigMuddy/open-notebook && docker compose up -d
```

**WARNING**: Starting all 14 containers on 8GB RAM with the photo batch running will be very tight. Consider starting services one stack at a time and monitoring `vm_stat`.

---

## FILES GENERATED THIS SESSION
- `~/Desktop/bridge-screenshot-*.png` — Adobe Bridge verification screenshots
- `/Volumes/T7/BigMuddy/scripts/output/PHOTO_MANIFEST.json` — Growing photo manifest (3,550 entries)
- `/Volumes/T7/BigMuddy/scripts/output/run.log` — Batch processing log
- This status report

---

## PREVIOUS SESSION REFERENCE
See `STATUS_REPORT_2026-03-29.md` for the setup session that installed all services.
