# Delta Dawn Report — Broadcasting Capabilities Brief
## For Claude Code Agents

**Last updated**: 2026-03-28 23:00 CST
**Station**: Big Muddy Radio — The Voice of the Mississippi Corridor
**Location**: Mac Mini M1 (8GB) — Natchez, Mississippi
**Architecture**: Docker containers on Colima + native macOS apps
**Storage**: Samsung T7 4TB SSD mounted at /Volumes/T7

---

## 1. SERVICES RUNNING ON THIS MACHINE

### Broadcasting Stack
| Service | Container | URL | Port | Purpose |
|---------|-----------|-----|------|---------|
| OpenBroadcaster Server | `openbroadcaster-server` | http://localhost:8080 | 8080 | Radio automation, scheduling, media library, playout control |
| OpenBroadcaster DB | `openbroadcaster-db` | — | 3307 (external) | MariaDB 11 — OB's database |
| Icecast | `openbroadcaster-icecast` | http://localhost:8010 | 8010 | Audio streaming server (SHOUTcast/Icecast protocol) |
| Plex Media Server | native app | http://localhost:32400 | 32400 | VoD archive, music library, photo browsing |
| OBS Studio | native app | — | — | Video compositing, camera mixing, stream output |

### Social & Content Stack
| Service | Container | URL | Port | Purpose |
|---------|-----------|-----|------|---------|
| Postiz | `postiz` | http://localhost:4007 | 4007 | Social media scheduling and publishing (X, FB, IG, YT, TikTok, LinkedIn) |
| Temporal | `temporal` | — | 7233 | Workflow engine for Postiz scheduled posts |
| Temporal UI | `temporal-ui` | http://localhost:8085 | 8085 | Temporal admin dashboard |

### Knowledge & AI Stack
| Service | Container | URL | Port | Purpose |
|---------|-----------|-----|------|---------|
| Open Notebook | `open-notebook-open_notebook-1` | http://localhost:5055 | 5055, 8502 | AI notebook, research, content generation |
| SurrealDB | `open-notebook-surrealdb-1` | — | 8000 | Open Notebook's database |

---

## 2. HOW TO INTERFACE WITH OPENBROADCASTER

### Database Access (Direct)
```bash
docker exec openbroadcaster-db mariadb -u openbroadcaster -pbigmuddy2026 openbroadcaster -e "YOUR SQL HERE;"
```

### Key Tables
| Table | Purpose | Key Fields |
|-------|---------|------------|
| `playlists` | Show definitions | id, name, description, type, status, owner_id |
| `media` | Audio/video files | id, artist, title, album, duration, file_location, media_type |
| `media_genres` | Genre categories | id, name, description, media_category_id |
| `media_categories` | Content types | id, name (Music, Spoken Word, Station IDs, etc.) |
| `shows` | Scheduled timeslots | player_id, item_id, item_type, start, show_end, mode, recurring_interval |
| `players` | Stream endpoints | id, name, stream_url, timezone |
| `users` | DJ/host accounts | id, username, display_name, name, email |
| `settings` | Station config | name, value |
| `playlog` | What played and when | media_id, playlist_id, datetime |

### API Access
OpenBroadcaster has a JSON API at `http://localhost:8080/api.php`:
```bash
# Example: Search media
curl -X POST http://localhost:8080/api.php \
  -d 'c=media&a=search&d={"query":"blues","limit":10}'

# Example: Get playlists
curl -X POST http://localhost:8080/api.php \
  -d 'c=playlist&a=search&d={"query":"","limit":50}'
```
Note: Most API calls require authentication cookies from a login session.

### Admin Credentials
- **Username**: admin
- **Password**: bigmuddy2026
- **Password hash uses salt**: OB_HASH_SALT from config.php

### Uploading Media
Media files can be uploaded through:
1. **Web UI** — drag and drop in the media section
2. **API** — POST to media upload endpoint
3. **Direct mount** — The T7 music library is mounted at `/mnt/music` inside the container (read-only)
4. **Sync tool** — `tools/cli/ob` has import capabilities

### Music Library Location
```
/Volumes/T7/Music/Mechanical-Bull/    → mounted at /mnt/music in container
  ├── MB AI/
  ├── Million yesterdays Album/
  └── Songs to get divorced to/
```

---

## 3. CURRENT PROGRAMMING (18 Shows)

### Weekday Schedule (Monday-Friday)
| Time (CST) | Show | Playlist ID | Format |
|------------|------|-------------|--------|
| 12:00 AM | The Overnight | 19 | Automated deep playlist — blues, ambient, field recordings |
| 6:00 AM | Delta Dawn Report | 18 | Morning news, weather, river conditions (5 min) |
| 6:15 AM | Morning Levee Rise | 2 | Wake-up mix — delta blues, gospel, acoustic |
| 9:00 AM Mon/Wed/Fri | Porch Talk | 3 | Conversations with locals, storytelling |
| 9:00 AM Tue/Thu | Miss Pearline Kitchen Table Hour | 12 | Recipes, gossip, sermons. Natchez institution |
| 10:00 AM | Corridor Crossroads | 5 | Midday mix — all Mississippi Corridor music |
| 12:00 PM | The Juke Joint Hour | 4 | Raw juke joint recordings, hill country blues |
| 1:00 PM Mon/Wed | Buddy Boy Backroads | 15 | Field recordings from Adams County back roads |
| 1:00 PM Tue/Thu | The Outsider Economics Hour | 8 | Culture meets commerce interviews |
| 1:00 PM Fri | Velvet Grit | 17 | Curated deep cuts, rare vinyl |
| 2:00 PM Mon/Wed | Swamp Thing | 7 | Zydeco, Cajun, swamp rock |
| 3:00 PM | Mechanical Bull Sessions | 6 | Live studio recordings from Natchez |
| 4:00 PM | Honky Tonk Highway | 9 | Drive-time honky tonk, outlaw country, Southern rock |
| 6:00 PM Mon/Wed/Fri | River Rat Radio | 16 | Requests from river community, tugboat captains |
| 6:00 PM Tue/Thu | The Deacon Slim Show | 14 | Soul, Motown, fire-and-brimstone commentary |
| 7:00 PM | Late Night Levee | 10 | Slow blues, soul, whiskey music |
| 10:00 PM Mon-Thu | Catfish Carl After Dark | 13 | Houseboat broadcast. Conspiracy theories, catfish recipes |

### Weekend
| Time (CST) | Show | Playlist ID | Format |
|------------|------|-------------|--------|
| 8:00 AM Sunday | Sunday Morning Gospel Train | 11 | Gospel, spirituals, hymns from the bluff |

### Music Genres (14 configured)
Delta Blues, Americana, Southern Rock, Gospel & Spirituals, Zydeco & Cajun, Country, Folk & Singer-Songwriter, Soul & R&B, Honky Tonk, Outlaw Country, Swamp Rock, Mississippi Hill Country, Juke Joint, Local Artists

### Content Categories (8 configured)
Music, Spoken Word, Station IDs, Bumpers & Sweepers, Ads & Sponsorships, Podcasts, Field Recordings, Live Sessions

---

## 4. DJ/HOST CHARACTERS

These are the fictional on-air personalities for Big Muddy Radio. They should be created as user accounts in OpenBroadcaster:

| Character | Username | Show | Description |
|-----------|----------|------|-------------|
| Miss Pearline Washington | miss_pearline | Kitchen Table Hour | Has opinions about everything. Recipes, relationship advice, local gossip, occasional sermons. Natchez institution since 1987 |
| Catfish Carl | catfish_carl | After Dark | Broadcasts from his houseboat below the bluff. Nobody knows his last name. Topics: river levels, conspiracy theories, catfish recipes, why the government is hiding the real blues |
| Deacon Slim Johnson | deacon_slim | The Deacon Slim Show | Part preacher, part DJ, all trouble. Plays what the Lord tells him — mostly soul and Motown with fire-and-brimstone commentary between tracks |
| Buddy Boy Thibodeaux | buddy_boy | Backroads | Drives Adams County with a tape recorder talking to whoever he finds. Gas station philosophers, roadside produce stands, hunting dog trainers |
| River Rat Ray Comeaux | river_rat_ray | River Rat Radio | Voice of the river community. Tugboat captains, barge workers, marina regulars call in their favorites |
| Velvet Sinclair | velvet | Velvet Grit | The intersection of rough and refined. Curates deep cuts, rare vinyl, music you have never heard but immediately need |
| Chase Pierson | chase | Morning Levee Rise / Station Manager | Station manager, morning host, photographer. The person who actually keeps the lights on |

---

## 5. STREAMING ARCHITECTURE

```
OpenBroadcaster (Playout Engine)
    │ sends audio stream
    ▼
Icecast (localhost:8010)
    │ distributes to listeners
    ├── Web Player (bigmuddyradio.com — HTML5 audio)
    ├── Mobile Apps (any Icecast-compatible player)
    └── External Aggregators (TuneIn, etc.)

OBS Studio (Video Compositing)
    │ camera + audio + graphics
    ▼
Restream.io (Multi-platform)
    ├── YouTube Live
    ├── Facebook Live
    ├── Twitch
    └── Other platforms
```

### Icecast Configuration
- **Source password**: bigmuddy-source
- **Admin password**: bigmuddy-admin
- **Stream URL**: http://localhost:8010/stream
- **Admin panel**: http://localhost:8010/admin/
- **Note**: Icecast image is linux/amd64 running via Rosetta on M1 (works but not native)

---

## 6. STORAGE LAYOUT

```
/Volumes/T7/
├── BigMuddy/                    # Repos, tools, configs
│   ├── hillbilly-dreams/        # Main website repo (Next.js monorepo)
│   ├── openbroadcaster-server/  # OBServer source + Docker config
│   ├── openbroadcaster-player/  # OBPlayer source
│   ├── postiz-app/              # Postiz social publishing
│   ├── open-notebook/           # AI notebook
│   ├── media/                   # GCS media assets
│   └── S2PX/                    # Superchase platform
├── Music/
│   └── Mechanical-Bull/         # Mechanical Bull Studio recordings
├── Photos/
│   ├── Lightroom-Catalog/       # Master Lightroom Classic catalog (new)
│   ├── Lightroom-CC-Cache/      # Lightroom CC local storage
│   ├── Lightroom-Library/       # Old CC library (125 GB)
│   ├── Ocean-Springs/           # Photo shoot (59 GB)
│   ├── Natchez/                 # Photo shoot (59 GB)
│   ├── Chase-Pierson/           # Photo shoots (100 GB)
│   ├── PureRAW-Output/          # DxO processed DNGs (17 GB)
│   ├── Inbox/                   # Card dumps land here
│   ├── Selects/                 # Flagged picks
│   ├── Exports/                 # Final exports → hot folder
│   └── Deletion-Queue/          # Non-selects (30-day hold)
├── Production/
│   ├── Active/                  # Active production projects
│   ├── EVERYTHING/              # Legacy project dump
│   └── Enfuse/                  # HDR output
├── Clients/
│   ├── Ardent/                  # Ardent Studios (133 GB)
│   ├── Photography/             # Client photo work (53 GB)
│   ├── Studio-C/                # Studio C projects (60 GB)
│   ├── Tuthill-Miles/           # Tuthill-Miles projects (25 GB)
│   ├── Monumental-Taco/         # Restaurant client (1.6 GB)
│   ├── Brian-Mitchell/          # (on Blue SSD, not migrated — 1.1 TB)
│   └── Legacy-Code/             # Old codebase (9.8 GB)
├── Documents/
│   └── Financial-Records/       # Business finances, tax docs
├── Archive/
│   ├── MacMini-PreTahoe/        # Today's Mac Mini backup (54 GB)
│   ├── MBP-Cleanup-2026-02/     # MacBook Pro cleanup (127 GB)
│   ├── HDX-Repos-2026-03/       # Old GitHub repos (85 GB)
│   └── Mac-Archive-2026-03/     # Legacy Mac archive items
├── Plex-Media/
│   ├── Music/                   # Plex music library
│   ├── Photos/                  # Plex photo library
│   ├── Videos/                  # Plex video library
│   └── Home-Videos/             # Personal video archive
└── _MASTERS/, _MISC/, _RESOURCES/  # Legacy folders
```

---

## 7. COMMON OPERATIONS

### Start/Stop Services
```bash
# OpenBroadcaster
cd /Volumes/T7/BigMuddy/openbroadcaster-server && docker compose up -d
cd /Volumes/T7/BigMuddy/openbroadcaster-server && docker compose down

# Postiz
cd /Volumes/T7/BigMuddy/postiz-app && docker compose up -d
cd /Volumes/T7/BigMuddy/postiz-app && docker compose down

# Open Notebook
cd /Volumes/T7/BigMuddy/open-notebook && docker compose up -d

# Plex
open "/Applications/Plex Media Server.app"

# View all running containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Add Media to OpenBroadcaster
```bash
# Via database (for bulk import)
docker exec openbroadcaster-db mariadb -u openbroadcaster -pbigmuddy2026 openbroadcaster -e "INSERT INTO media ..."

# Via web UI
# Navigate to http://localhost:8080 → Media tab → Upload
```

### Create a New Show/Playlist
```bash
docker exec openbroadcaster-db mariadb -u openbroadcaster -pbigmuddy2026 openbroadcaster \
  -e "INSERT INTO playlists (owner_id, type, name, file_location, description, status, created, updated) \
  VALUES (1, 'standard', 'Show Name', '', 'Description', 'public', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());"
```

### Schedule a Show
```bash
# Weekly recurring show (e.g., Monday 9 AM - 10 AM)
docker exec openbroadcaster-db mariadb -u openbroadcaster -pbigmuddy2026 openbroadcaster \
  -e "INSERT INTO shows (player_id, user_id, item_id, item_type, start, show_end, mode, recurring_interval, recurring_end) \
  VALUES (1, 1, PLAYLIST_ID, 'playlist', '2026-03-30 09:00:00', '2026-03-30 10:00:00', 'weekly', 1, '2027-03-30');"
```

### Create a DJ Account
```bash
# Generate password hash (must include the salt from config.php)
HASH=$(docker exec openbroadcaster-server php -r "echo password_hash('PASSWORD' . 'bMr-2026-bigmuddy-radio-salt-x7k9p', PASSWORD_DEFAULT);")

# Insert user
docker exec openbroadcaster-db mariadb -u openbroadcaster -pbigmuddy2026 openbroadcaster \
  -e "INSERT INTO users (username, display_name, name, email, password, enabled) \
  VALUES ('username', 'Display Name', 'Full Name', 'email@bigmuddyradio.com', '$HASH', 1);"
```

### Check What's Playing / Playlog
```bash
docker exec openbroadcaster-db mariadb -u openbroadcaster -pbigmuddy2026 openbroadcaster \
  -e "SELECT * FROM playlog ORDER BY id DESC LIMIT 10;"
```

---

## 8. INTEGRATION POINTS

### Website (hillbilly-dreams Next.js app)
- Radio player page at bigmuddyradio.com
- Icecast stream URL embeds in HTML5 audio player
- Show schedule can be pulled from OB API or database
- Live "Now Playing" can be built from Icecast status XML: `http://localhost:8010/status-json.xsl`

### Social Media (Postiz)
- Show clips → Postiz → all platforms
- Automated show announcements possible via Temporal workflows
- Postiz URL: http://localhost:4007

### Video Simulcast (OBS + Restream)
- OBS composites studio camera + audio + show graphics
- Restream.io pushes to YouTube/Twitch/Facebook simultaneously
- NDI Camera app on iPad/phone for additional camera angles

### Content Pipeline
```
Record/Import Audio → OpenBroadcaster Media Library
    → Assign to Playlist/Show
    → Automated Playout via Schedule
    → Icecast Stream → Web Player + Apps
    → OBS captures audio + adds video → Restream → Social
    → Show recordings → Plex VoD archive
    → Clips → Postiz → Social channels
```

---

## 9. CONFIGURATION FILES

| File | Location | Purpose |
|------|----------|---------|
| OB Server config | Container: `/var/www/html/config.php` | Database, salt, media paths, site URL |
| OB Docker Compose | `/Volumes/T7/BigMuddy/openbroadcaster-server/docker-compose.yml` | Container orchestration |
| OB Dockerfile | `/Volumes/T7/BigMuddy/openbroadcaster-server/Dockerfile` | Server image build |
| Postiz Docker Compose | `/Volumes/T7/BigMuddy/postiz-app/docker-compose.yaml` | Postiz stack |
| Postiz Handoff | `/Volumes/T7/BigMuddy/postiz-app/HANDOFF_CC.md` | Postiz setup documentation |
| This document | `/Volumes/T7/BigMuddy/BROADCASTING_CAPABILITIES.md` | Broadcasting capabilities brief |

---

## 10. KNOWN LIMITATIONS & TODO

### Current Limitations
- Icecast image is x86 (runs via Rosetta on M1) — works but not optimal
- No OBPlayer configured yet — playout engine needs setup to actually stream to Icecast
- Media library is empty — Mechanical Bull tracks need to be uploaded
- DJ user accounts need to be created via the method above
- Social media API keys not configured in Postiz yet
- No SSL/HTTPS on local services (fine for LAN, needs reverse proxy for public)

### Next Steps
1. Upload Mechanical Bull tracks to OB media library
2. Create DJ user accounts with proper password hashes
3. Configure OBPlayer to connect to OBServer and stream to Icecast
4. Wire up the web player on bigmuddyradio.com to the Icecast stream
5. Set up Postiz social media API keys (X, Facebook, YouTube, etc.)
6. Configure Restream.io with OBS for video simulcast
7. Build automated show announcement pipeline (OB schedule → Postiz → social)
8. Set up hot folder for automatic media ingest (card dump → library)

### Automation Goals (Robot Radio Co-op)
- 24/7 automated playout with no human intervention required
- Dynamic playlist rotation based on time of day, genre rules, and artist separation
- Automated station IDs and bumpers between songs
- Voice tracking support for pre-recorded DJ segments
- Live assist mode for when DJs want to go live during their show
- Automated social media posts when shows start ("Now playing: The Juke Joint Hour")
- VoD archiving of all broadcast content to Plex
- Clip extraction pipeline for social media highlights

---

## 11. QUICK REFERENCE

```
OpenBroadcaster:  http://localhost:8080  (admin / bigmuddy2026)
Icecast Admin:    http://localhost:8010/admin/  (admin / bigmuddy-admin)
Icecast Stream:   http://localhost:8010/stream
Postiz:           http://localhost:4007
Plex:             http://localhost:32400
Open Notebook:    http://localhost:5055
Temporal UI:      http://localhost:8085

DB Access:        docker exec openbroadcaster-db mariadb -u openbroadcaster -pbigmuddy2026 openbroadcaster
OB CLI:           docker exec openbroadcaster-server php /var/www/html/tools/cli/ob [command]
Container Logs:   docker logs openbroadcaster-server -f

OBS WebSocket:    ws://localhost:4455 (password in Bitwarden: "OBS-WebSocket")
OBS Control:      cd /tmp && node -e "const O=require('obs-websocket-js').default;const o=new O();o.connect('ws://localhost:4455','PASSWORD').then(()=>o.call('StartRecord'))"
OBS Stop:         cd /tmp && node -e "const O=require('obs-websocket-js').default;const o=new O();o.connect('ws://localhost:4455','PASSWORD').then(()=>o.call('StopRecord'))"
Camera:           DJI Pocket 3 (USB, gimbal-stabilized 4K)
Mic:              DJI Pocket 3 built-in (default system input)
Recordings:       /Users/clawdbot/Movies/
```
