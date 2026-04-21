# Infrastructure Migration — Mac Mini → Hetzner

**Date:** April 20, 2026
**Decision:** Chase is retiring the Mac mini as a services server. Everything runs on the Hetzner box going forward.
**Why:** The Mac mini is a single point of failure in a physical location (Natchez), tied to residential power + internet. Hetzner is a real server in a real datacenter, reachable from anywhere, priced appropriately for what we're doing, always-on.
**Status:** Plan. Execution sequenced over the next 2–3 weeks.

---

## 1. What's currently on the Mac mini (inventory)

From `CLAUDE.md` reference + `docs/reference_broadcasting_stack.md`:

| Service | Port | Purpose | Migration priority |
|---|---|---|---|
| **OpenBroadcaster** | 8080 | Big Muddy Radio broadcast software — playlist management + scheduled programming | HIGH — radio is part of the touring flywheel |
| **Icecast** | 8010 | Streaming server — delivers Big Muddy Radio stream to listeners | HIGH — same, depends on OpenBroadcaster |
| **Postiz** | 4007 | Social post scheduling across all brand channels | MEDIUM — team uses it but fallback is hosted Buffer/Later |
| **Open Notebook** | 5055 | Team AI notebook (Inn / Touring / Everything notebooks per `docs/open-notebook-setup-2026-04-20.md`) | MEDIUM — setup targeted Hetzner directly (skip Mac mini step) |
| **Plex** | 32400 | Media server (personal + maybe in-Inn media for guest rooms) | LOW — personal use; can stay on mini or move to NAS if Inn needs it |
| **Broadcast Agent (launchd)** | — | Mac mini agent that handles podcast episode sync, Cron jobs, automated content tasks | HIGH — referenced in platform code (`scripts/broadcast-agent/`) |
| **Immich** | (TBD port) | Self-hosted photo library — canonical photo archive for CPP + ecosystem | HIGH — Chase's photo workflow depends on it |
| **SSH (ClawdBOT@192.168.4.37)** | 22 | Admin access | Move admin access to Hetzner box; retire ClawdBOT as server identity |

**Not on the mini, noted here for completeness:**
- Vercel hosts the Next.js platform (already cloud)
- Neon hosts the Postgres DB (already cloud)
- Sanity hosts the CMS (already cloud)
- GCS hosts the photo bucket (already cloud)
- These don't migrate — they're already off-mini.

---

## 2. Hetzner server — target specs

What we need:

- **CPU:** 4+ cores (handles streaming + Open Notebook embeddings + Postiz workers concurrently)
- **RAM:** 16+ GB (Open Notebook + Immich both need room for embeddings + image processing)
- **Storage:** 1+ TB SSD (Immich photo archive alone is tens of GB growing; OpenBroadcaster media library adds more)
- **Network:** unlimited outbound (Icecast streaming), no data cap
- **OS:** Ubuntu LTS (standard for Docker-based deployment)
- **Public IP:** required for services that need external reach (Icecast stream endpoint, eventually Open Notebook via tunnel, Postiz webhooks)

Hetzner dedicated server product fit: likely their **AX** line (AX42 / AX52) for ~€50–100/month. Or an **EX** line for similar pricing with different CPU trade-offs. Or Hetzner Cloud for smaller footprint if we don't need dedicated (CX32 at ~€15/mo if 8 GB RAM and 80 GB disk is enough for Phase 1).

**Recommendation:** start on Hetzner Cloud CX52 (4 vCPU, 16 GB RAM, 240 GB disk) at ~€27/mo (~$30 USD/mo). Upgrade to dedicated AX line if we outgrow it. Cheaper than Mac mini power + insurance + risk-of-failure.

**Classification:** `MBT-PLATFORM` in the expense taxonomy. Add to `docs/ecosystem-subscriptions-2026-04-20.md` §C under infrastructure.

**Verify current state:** per earlier session memory (S95/S96 from April 17), Chase was working on getting SSH access to the Hetzner box. Confirm:
- Is the Hetzner box currently provisioned? What specs?
- SSH access working?
- Docker installed?
- Cloudflare Tunnel daemon installed?

---

## 3. Target architecture on Hetzner

Everything runs in Docker containers. Reverse-proxied through Caddy (or Traefik). Public endpoints reached via Cloudflare Tunnel (no ports exposed directly to the internet).

```
Hetzner Cloud CX52 (Ubuntu 24.04)
├── Docker
│   ├── caddy               # reverse proxy, TLS termination
│   ├── open-notebook       # port 5055 internal
│   ├── postiz              # port 4007 internal
│   ├── immich              # port 2283 internal
│   ├── icecast             # port 8010 exposed via Cloudflare Tunnel
│   ├── openbroadcaster     # port 8080 internal, feeds icecast
│   ├── broadcast-agent     # worker container, no inbound ports
│   └── watchtower          # auto-update for container images
├── cloudflared             # Cloudflare Tunnel daemon
│   ├── notebook.chasepierson.tv → open-notebook:5055
│   ├── postiz.chasepierson.tv → postiz:4007
│   ├── immich.chasepierson.tv → immich:2283
│   ├── radio.chasepierson.tv → caddy → icecast:8010 (public stream)
│   └── broadcaster.chasepierson.tv → openbroadcaster:8080 (admin)
└── Cloudflare Access
    └── Partners (me@chasepierson.tv, tracyaldersonallen@gmail.com, amyaldersonallen@gmail.com, Elijah, Miles)
```

Cloudflare Access gates the admin surfaces (Open Notebook, Postiz, Immich, Broadcaster admin) to the partner emails. The public Icecast stream at `radio.chasepierson.tv/stream` is left open (anyone can tune in).

---

## 4. Migration sequence (staged rollout)

Don't big-bang-cutover. Do it one service at a time, validate, then retire the mini's copy.

### Phase 1 — Foundation (Week 1, this week)

1. **Verify Hetzner access.** SSH works, Docker installed, firewall allows Cloudflare Tunnel outbound.
2. **Install cloudflared + bootstrap Tunnel.** One tunnel per hostname; test with a dummy Hello World container first.
3. **Set up Caddy + Docker compose skeleton.** Base services: Caddy, watchtower. Prove the reverse-proxy + auto-update pattern.
4. **Verify Cloudflare Access policy.** Add partner emails to an Access application. Test with one service — access gate works for authenticated users, blocks everyone else.

### Phase 2 — Open Notebook (Week 1-2)

1. Deploy Open Notebook container on Hetzner
2. Configure with chosen embedding model (GPT-4 embeddings or similar per `docs/open-notebook-setup-2026-04-20.md`)
3. Create the three notebooks per the spec in that doc (Inn Ops, Touring Ops, Everything)
4. Upload sources (batch upload from local clone of `measurably-better-things/docs`)
5. Add partner logins (multi-user mode if supported; else shared-admin + document the tradeoff)
6. Expose at `notebook.chasepierson.tv`
7. Test partner access from remote
8. **Retire** the Mac mini's Open Notebook instance (stop container, remove persistent data after 30 days)

### Phase 3 — Postiz (Week 2)

1. Deploy Postiz container on Hetzner, migrate DB state from mini
2. Reconnect all brand social accounts (IG, TikTok, FB, LinkedIn, X, YouTube)
3. Verify Elijah can log in, schedule a test post
4. Update any cron jobs / integrations that reference `192.168.4.37:4007`
5. Expose at `postiz.chasepierson.tv`
6. **Retire** mini's Postiz

### Phase 4 — Immich (Week 2-3)

**High-stakes migration.** Immich is the canonical photo archive.

1. Deploy Immich container on Hetzner with 500+ GB volume
2. Export Immich data from mini (photo library + metadata + albums)
3. Transfer to Hetzner (rsync over SSH — could take hours; plan for overnight)
4. Verify photo count matches, albums intact, metadata preserved
5. Update API key references in platform code + `lib/ai-models.ts` (CLIP search endpoint)
6. Expose at `immich.chasepierson.tv`
7. Keep mini's Immich running as a read-only mirror for 30 days as fallback
8. **Retire** mini's Immich after validation

### Phase 5 — Radio stack (Week 3)

Trickiest migration because Icecast is live-streaming.

1. Deploy OpenBroadcaster + Icecast on Hetzner, same config as mini
2. Migrate OpenBroadcaster media library (could be large — playlists + programming)
3. Test stream locally first (not public-facing), verify playlist + scheduler work
4. Stand up Cloudflare Tunnel for public stream URL
5. Schedule a 2-hour test broadcast simultaneously on mini + Hetzner to compare
6. Announce stream URL migration to any existing listeners
7. Cut over — update `bigmuddyradio.com` embed / app / listener URLs to point at the Hetzner tunnel
8. **Retire** mini's OpenBroadcaster + Icecast

### Phase 6 — Broadcast Agent + scripts (Week 3-4)

1. Move broadcast-agent container to Hetzner, update launchd → systemd service files
2. Update `scripts/broadcast-agent/` references in the codebase
3. Update any environment variables pointing to old Mac mini IP
4. Verify Cron schedules work under systemd
5. **Retire** mini's broadcast-agent launchd plists

### Phase 7 — Cleanup (Week 4)

1. Full audit of any remaining references to `192.168.4.37` across the codebase
2. Update `CLAUDE.md` machine table: remove "Mac mini | Services" row, add "Hetzner Cloud CX52" row
3. Update `docs/reference_broadcasting_stack.md` with Hetzner URLs
4. Update every agent memory / prompt that references the mini
5. Power down mini's services (leave the OS running for Chase's personal use if needed)
6. Document the decommission in a retro doc

---

## 5. What stays on the Mac mini (if anything)

- **Plex:** personal media, low-priority, can stay
- **Local git clones, editor use, general workstation:** fine, personal use
- **Backup target for Hetzner:** mini can act as an occasional rsync target for Hetzner backups (cheap local backup). Or Backblaze takes this job if we activate it per the deferred subs list.

---

## 6. Cost + risk

### Cost delta

- Mac mini residual cost: electricity + slight overhead ≈ $10/mo amortized
- Hetzner CX52: ~€27/mo ≈ $30 USD/mo
- **Net new spend:** ~$20/mo

This goes into the ecosystem subscription stack under `MBT-PLATFORM`. Update `docs/ecosystem-subscriptions-2026-04-20.md` Section C with a new line. Total stack nudges from ~$690–905 to ~$710–925/mo — still under the $1k cap with $75–290 headroom.

### Risk management

- **Data loss on migration:** don't delete the mini's data for 30 days post-migration per service. Verify parity first.
- **Downtime during cutover:** radio stream migration has real listener impact if Amy's running a show. Schedule radio migration for a no-show window.
- **Credential / secret handling:** all service creds go into Bitwarden. Don't SSH with keys stored in questionable places.
- **Cloudflare Tunnel outage:** rare but real. Plan B: Tailscale VPN fallback for admin access (Icecast stream goes dark during Cloudflare outages, which is a real risk accepted).

---

## 7. Open Notebook integration update (2026-04-20 coupling)

Per `docs/open-notebook-setup-2026-04-20.md`, Chase asked for three notebooks to be created. **Revised plan:** skip the Mac mini Open Notebook setup entirely. Deploy Open Notebook directly on Hetzner (Phase 2 above). The three-notebook spec in that doc stays valid — same sources, same content, different host.

Update `docs/open-notebook-setup-2026-04-20.md` execution section to reference `notebook.chasepierson.tv` (Hetzner tunnel) instead of `192.168.4.37:5055` (Mac mini LAN).

---

## 8. Action items

| Item | Owner | By when |
|---|---|---|
| Verify Hetzner server provisioning status + SSH access | Chase | This week |
| Bootstrap cloudflared + Caddy + Docker Compose skeleton | Chase / Patch | Week 1 |
| Deploy Open Notebook on Hetzner + create the three notebooks per spec | Chase / Cos | Week 1-2 |
| Migrate Postiz | Chase + Elijah (primary user) | Week 2 |
| Migrate Immich (careful — data-heavy) | Chase | Week 2-3 |
| Migrate OpenBroadcaster + Icecast (schedule around no-show window) | Chase + Amy | Week 3 |
| Migrate broadcast-agent | Chase | Week 3-4 |
| Full audit + `CLAUDE.md` update | Cos | Week 4 |
| Decommission mini services | Chase | Week 4 |

---

## 9. Open questions

1. **Current Hetzner specs** — need exact current machine. CLAUDE.md references Hetzner from earlier session memory but not specs.
2. **Immich data size** — how many GB of photos currently? Affects Phase 4 transfer time.
3. **OpenBroadcaster programming calendar** — are any radio shows scheduled during Weeks 2-3 that would block migration? Check with Amy.
4. **Tuthill-side tools on the mini** — is Miles using anything on the mini we haven't catalogued? Check with him.
5. **Backup strategy on Hetzner** — snapshot schedule? Hetzner offers automated snapshots at ~€1.20/mo; worth enabling.
6. **Disaster-recovery test** — after Week 4, run a test restore from Hetzner snapshot to confirm we can recover if the box dies.

---

*End of migration plan.*
