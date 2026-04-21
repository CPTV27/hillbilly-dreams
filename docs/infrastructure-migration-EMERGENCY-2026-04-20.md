# EMERGENCY MIGRATION — Mac Mini Offline in <24 hrs

**Situation:** Chase is taking the Mac mini offline tomorrow for the drive to NY. Everything data-dependent on the mini must transfer before shutdown, or be backed up to cloud, or be formally abandoned + flagged for rebuild.

**Time budget:** ~20 hours, of which realistically 4-6 can be spent on this tonight/tomorrow AM.

**Philosophy:** MOVE DATA FIRST, RESTORE SERVICES LATER. Services can be rebuilt on Hetzner from git + config. Data that's only on the mini is gone if the mini dies.

---

## Triage — what to save vs. let go

### 🔴 MUST save tonight (data only on the mini, irreplaceable)

1. **Immich photo library** — canonical photo archive with metadata, albums, face recognition, CLIP embeddings. Tens of GB probably. 🚨 Highest priority.
2. **OpenBroadcaster media library** — MP3s + scheduled program playlists. Some is replaceable (music from streaming sources), some isn't (custom IDs, interviews, live recordings).
3. **Postiz database** — scheduled posts + social account credentials + post history.
4. **Open Notebook data** — if any notebooks were created, export them. (If empty per earlier convo, skip.)
5. **Broadcast-agent state** — any SQLite DB + config files for scheduled jobs.
6. **SSH keys + configs** — any keys generated on the mini that unlock things (GitHub, servers, etc.).
7. **Random local data** — anything in `~/Documents`, `~/Desktop`, `~/Downloads` that isn't in Google Drive or cloud already.

### 🟡 Nice to save (replaceable but convenient)

- Plex media library (movies / shows) — replaceable but takes time to re-rip
- Local config files for any custom setups (zshrc, .gitconfig, VS Code settings)
- Browser bookmarks / session state

### ⚪ Skip (can rebuild)

- Service configs that live in git already (Caddy configs, docker-compose files if versioned)
- OS-level packages (brew, etc.)
- Anything that has a canonical cloud source of truth

---

## Step-by-step runbook — execute tonight

### Step 0 — Verify Hetzner access (10 min)

From the MacBook while on local network:

```
ssh <hetzner-user>@<hetzner-ip>
# If that works, great.
# If not — check docs/reference_broadcasting_stack.md or Bitwarden for the right key.
```

Per session memory S95/S96 (April 17), there was an SSH key mismatch on the Hetzner box. If it's still broken, use the Hetzner web console (VNC) to get in, fix the authorized_keys file, confirm SSH from laptop.

**Before proceeding:** confirm `df -h` on the Hetzner box shows enough free space for the biggest thing you're moving (Immich photo archive). If not enough, expand disk via Hetzner Cloud console (takes 30 seconds).

### Step 1 — Backup SSH keys + admin state FROM the mini (5 min)

```
ssh ClawdBOT@192.168.4.37
# On the mini:
tar czf ~/mini-admin-backup-$(date +%Y%m%d).tar.gz \
  ~/.ssh \
  ~/.gitconfig \
  ~/.zshrc \
  ~/.claude \
  /etc/cron.d \
  /Library/LaunchDaemons \
  /Library/LaunchAgents

# scp it to the Hetzner box:
scp ~/mini-admin-backup-*.tar.gz <hetzner>:/root/backups/
```

### Step 2 — Immich photo archive (the big one, ~1-4 hours depending on size)

**Check size first:**
```
# On the mini:
du -sh /path/to/immich/data   # adjust based on actual install location
```

Typical Immich installs put data in `/var/lib/immich` or a Docker volume. If it's a Docker volume:
```
docker volume inspect immich_data   # find mountpoint
```

**Transfer via rsync (can resume if interrupted):**
```
# On the mini:
rsync -avz --progress --partial /path/to/immich/data/ \
  <hetzner-user>@<hetzner-ip>:/srv/immich/data/
```

**Export Immich DB separately:**
```
# On the mini (if Immich uses Postgres in a container):
docker exec immich-postgres pg_dump -U postgres immich > ~/immich-db-$(date +%Y%m%d).sql

# scp to Hetzner:
scp ~/immich-db-*.sql <hetzner>:/srv/immich/db-backup/
```

**On Hetzner later:** spin up Immich container, restore DB, point at the transferred photo volume. Don't rush this tonight — the data is preserved, restoring the service can be Wednesday.

**Parallel backup to GCS (belt + suspenders):**
```
# On the mini:
gsutil -m rsync -r /path/to/immich/data gs://bmt-media-bigmuddy/immich-mini-backup-$(date +%Y%m%d)/
```

This takes hours but runs in the background. Do this AS WELL AS the rsync to Hetzner so we have a GCS backup if Hetzner fails somehow.

### Step 3 — Postiz database + config (15-30 min)

```
# On the mini:
# Stop Postiz to avoid in-flight state corruption
docker stop postiz
# Export Postiz DB (assumes Postgres)
docker exec postiz-postgres pg_dump -U postgres postiz > ~/postiz-db-$(date +%Y%m%d).sql
# Export config files / env vars
cp /path/to/postiz/.env ~/postiz-env-backup.txt
cp -r /path/to/postiz/config ~/postiz-config-backup/
# Tar everything up
tar czf ~/postiz-backup-$(date +%Y%m%d).tar.gz ~/postiz-db-*.sql ~/postiz-env-backup.txt ~/postiz-config-backup
# Transfer to Hetzner
scp ~/postiz-backup-*.tar.gz <hetzner>:/srv/postiz/backup/
# Also push to GCS as insurance
gsutil cp ~/postiz-backup-*.tar.gz gs://bmt-media-bigmuddy/postiz-backup-$(date +%Y%m%d).tar.gz
```

Restart Postiz container after export so it keeps running until mini shutdown tomorrow.

### Step 4 — OpenBroadcaster + Icecast (30-60 min)

```
# On the mini:
# Find OpenBroadcaster data dir — typically /Library/OpenBroadcaster/data or similar
# Stop the service
# tar the whole data directory
tar czf ~/ob-backup-$(date +%Y%m%d).tar.gz /path/to/openbroadcaster/
# Same for Icecast config
cp -r /etc/icecast ~/icecast-config-backup
tar czf ~/icecast-backup-$(date +%Y%m%d).tar.gz ~/icecast-config-backup
# Push both to Hetzner
scp ~/ob-backup-*.tar.gz ~/icecast-backup-*.tar.gz <hetzner>:/srv/radio/backup/
# GCS backup
gsutil cp ~/ob-backup-*.tar.gz gs://bmt-media-bigmuddy/
gsutil cp ~/icecast-backup-*.tar.gz gs://bmt-media-bigmuddy/
# Restart services so mini stays live until shutdown
```

**Accept:** Big Muddy Radio goes dark for a few days between mini shutdown and Hetzner setup. Not catastrophic; announce if needed.

### Step 5 — Broadcast-agent state (5 min)

```
# On the mini:
# Find any SQLite DBs in the broadcast-agent dir
find /path/to/broadcast-agent -name "*.db" -o -name "*.sqlite"
tar czf ~/ba-backup-$(date +%Y%m%d).tar.gz /path/to/broadcast-agent/
scp ~/ba-backup-*.tar.gz <hetzner>:/srv/broadcast-agent/backup/
gsutil cp ~/ba-backup-*.tar.gz gs://bmt-media-bigmuddy/
```

### Step 6 — Open Notebook (skip if nothing in it)

If the three notebooks we spec'd weren't created yet, there's nothing to export. Skip this step — notebooks will be created fresh on Hetzner per `docs/open-notebook-setup-2026-04-20.md`.

If notebooks WERE created, check Open Notebook's data dir and backup per the same pattern.

### Step 7 — Random personal data

```
# On the mini:
# Audit what's personal and not-yet-in-cloud
ls ~/Documents  # anything here not on Drive?
ls ~/Desktop    # random saved files?
ls ~/Downloads  # probably delete; don't migrate

# For anything worth keeping, upload to Drive or scp to Hetzner /srv/chase-personal/
```

### Step 8 — Final GCS mirror (overnight, set it and forget it)

Run an overnight job that mirrors everything important from mini to GCS as a final safety net:

```
# On the mini:
nohup gsutil -m rsync -r /path/to/immich/data gs://bmt-media-bigmuddy/immich-mini-final/ &
nohup gsutil -m rsync -r /path/to/openbroadcaster gs://bmt-media-bigmuddy/ob-mini-final/ &
```

Leaves processes running in background; mini stays on overnight for these to finish before shutdown.

---

## What we accept losing (or doing later)

| Service | Status post-shutdown | When to restore |
|---|---|---|
| Immich | Hetzner + GCS backup. Restore Immich on Hetzner this week. | Wednesday |
| Postiz | DB + config on Hetzner + GCS. Restore next week. | Early next week |
| OpenBroadcaster + Icecast | Data on Hetzner + GCS. Rebuild service next week. Big Muddy Radio goes dark for ~1 week. | Next week |
| Broadcast-agent | Data preserved. Rebuild service schedule at same time as radio stack. | Next week |
| Open Notebook (three new notebooks) | Nothing to lose; spin up fresh on Hetzner per existing spec. | Next week |
| Plex | Mini stays as personal device; if Chase wants Plex on Hetzner, defer. | Optional later |

Anything on the mini NOT listed above, we accept losing unless it's on Drive/GCS/git already.

---

## What happens while the mini is offline

- Big Muddy Radio: off. If there's a scheduled show this week, announce the pause.
- Podcast scheduling via broadcast-agent: paused. If any podcast episode is scheduled to publish before Hetzner is live, publish manually via Buzzsprout.
- Social posting via Postiz: paused. If anything's scheduled in the next ~5 days, push to social platforms natively (IG, FB, X) directly until Postiz is back.
- Photo access via Immich: paused for Chase's remote workflow. Lightroom catalog on the MacBook is unaffected.

Tracy + Amy should be notified that:
- Nothing they use day-to-day breaks (Cloudbeds, email, Drive, Sanity, Asana, etc. all cloud)
- If they expected to query a notebook, it doesn't exist yet — defer questions until ~next week
- If Amy has a scheduled podcast episode to push, she does it manually via Buzzsprout

---

## Post-migration — rebuilding on Hetzner (next week, not tomorrow)

Follow `docs/infrastructure-migration-mac-mini-to-hetzner-2026-04-20.md` §3 for the target architecture. The phases there become next-week work:

1. Set up Docker + Caddy + Cloudflare Tunnel on Hetzner
2. Restore Immich from the transferred volume
3. Restore Postiz from the DB dump
4. Rebuild OpenBroadcaster + Icecast containers, mount the transferred media library
5. Spin up Open Notebook and create the three notebooks per `docs/open-notebook-setup-2026-04-20.md`
6. Test each service behind Cloudflare Access for partner auth
7. Update `CLAUDE.md` + reference docs with new URLs

---

## Action items — tonight / tomorrow AM

| Priority | Task | Owner | Est. time |
|---|---|---|---|
| 🔴 P0 | Verify Hetzner SSH access; expand disk if needed | Chase | 10 min |
| 🔴 P0 | SSH-key + admin backup from mini to Hetzner | Chase | 5 min |
| 🔴 P0 | Immich photo archive — rsync to Hetzner + GCS | Chase | Background overnight |
| 🔴 P0 | Postiz DB + config backup to Hetzner + GCS | Chase | 20 min |
| 🔴 P0 | OpenBroadcaster + Icecast backup to Hetzner + GCS | Chase | 40 min |
| 🟡 P1 | Broadcast-agent state backup | Chase | 5 min |
| 🟡 P1 | Random personal data audit + upload to Drive | Chase | 15 min |
| 🟢 Notify | Tell Tracy + Amy what's going offline + for how long | Chase | 5 min |

**Total active time:** ~1.5 hours + overnight background transfers.

If Chase gets 2 hours tonight, P0s are done. Rest is overnight + next week.

---

## Chase: what I need from you RIGHT NOW

Tell me which of these you want me to run via Bash (I can execute on your MacBook if you're sitting at it with local network access + SSH keys to both mini and Hetzner):

1. Verify Hetzner access + check disk space
2. Kick off Immich rsync to Hetzner (big, overnight)
3. Postiz backup to Hetzner + GCS
4. OpenBroadcaster backup to Hetzner + GCS
5. Broadcast-agent backup
6. All of the above in sequence

Or: if you'd rather execute yourself with these commands as the reference, say so and I'll turn the "back-of-envelope" commands in the runbook into an actual checklist.txt you can copy one line at a time.

---

*End of emergency runbook.*
