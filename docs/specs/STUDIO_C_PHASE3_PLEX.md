# Studio C — Phase 3+ media pipeline (Plex + lobby playout)

**Region:** **Bearsville, NY** (Utopia Studios) — production HQ for Studio C Video; Natchez work is field / remote as scheduled. Do **not** describe Studio C as Natchez-based.

## Goals (#77)

1. **Plex playlist management** — API-driven playlists on the Mac Mini (`192.168.4.37:32400`) for Inn TV and lobby loops.
2. **DisplayChannel scheduling** — map `DisplayChannel` content to time-of-day schedules for kiosks / lobby TVs.
3. **Finished Studio C jobs → Plex** — when a `StudioCRequest` / deliverable is marked **delivered**, optionally ingest MP4 into a named Plex library (e.g. `Studio C Masters`).

## Architecture (draft)

| Layer | Responsibility |
|-------|----------------|
| **Vercel API** | Admin-only routes; holds `PLEX_TOKEN` (server env) — never browser. |
| **Mac Mini** | Plex Media Server; music + video libraries on attached storage. |
| **Prisma** | `AgentContext` or new `MediaPlayoutJob` rows for “pending Plex add” queue if async copy is required. |

## API sketches (not all implemented)

- `POST /api/admin/plex/playlist` — append item by file path or hosted URL (requires server-side download to NAS — **blocked** until SSH/rsync path defined).
- `GET /api/admin/plex/libraries` — list sections for admin UI.

## Blockers

- **Network:** Vercel cannot reach `192.168.4.37` unless **Cloudflare Tunnel** or **VPN** exposes Plex API securely — **do not** port-forward raw 32400 to the public internet.
- **Auth:** Plex token in Bitwarden; rotate if leaked.
- **SSH file moves** — agent cannot operate Mac Mini without Chase/Elijah shell access (`ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37`).

## Next engineering step

1. Add **read-only** health check route that pings Plex from a **trusted runner** (Mac mini cron hitting Vercel, or GitHub self-hosted) — not from serverless alone.
