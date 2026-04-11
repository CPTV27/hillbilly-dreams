# Mac Mini — Archive & Bootstrap (do this first, once)

**This is a one-time setup prompt.** Paste it into the current Claude Code session on the Mac mini. After it finishes, spin down that session and never paste into it again. From then on, you'll only work through the three named workers defined in files `01`, `02`, and `03` in this same folder.

## What you're doing

1. Archiving every existing loose Claude Code conversation on this machine into one folder
2. Archiving the `.openclaw/workspace*` scratchpads the same way
3. Setting up the three permanent worker profiles
4. Writing a short status file that the MacBook Pro session can read

After this, the mini has exactly three "roles" that Chase can address directly: **Broadcast**, **Photo Lab**, and **Ops Sync**. Nothing else.

---

## Step 1 — Archive loose conversations

Create the archive directory:
```bash
mkdir -p ~/Archive/claude-sessions-pre-2026-04-10
mkdir -p ~/Archive/openclaw-pre-2026-04-10
```

Move the old Claude Code project state out of the way. **Do NOT delete anything.** The goal is to make the mini look clean, not to lose history.

```bash
# Claude Code project histories (check what's there first)
ls -la ~/.claude/projects/ 2>/dev/null

# If the directory exists and has subdirectories, move (don't copy) them:
if [ -d ~/.claude/projects ]; then
  mv ~/.claude/projects ~/Archive/claude-sessions-pre-2026-04-10/projects
fi

# Old agent workspaces
if [ -d ~/.openclaw/workspace ]; then
  mv ~/.openclaw/workspace ~/Archive/openclaw-pre-2026-04-10/workspace
fi
if [ -d ~/.openclaw/workspace-claude-code ]; then
  mv ~/.openclaw/workspace-claude-code ~/Archive/openclaw-pre-2026-04-10/workspace-claude-code
fi

# Stray session files at home level
for f in ~/DISPATCH_APRIL7.md ~/CLAUDE.md; do
  if [ -f "$f" ]; then
    mv "$f" ~/Archive/claude-sessions-pre-2026-04-10/ 2>/dev/null || true
  fi
done
```

**Report:** how much total disk space was moved. `du -sh ~/Archive/*`

---

## Step 2 — Create the workers directory

```bash
mkdir -p ~/mini-workers/{broadcast,photo-lab,ops-sync,shared}
```

The three workers will each live in their own subdirectory. Each subdirectory is where Chase `cd`s into before starting a Claude Code session for that worker.

```
~/mini-workers/
├── broadcast/      ← Worker 1: radio, stingers, Icecast, FM, Plex
├── photo-lab/      ← Worker 2: Lightroom, GCS uploads, gallery curation
├── ops-sync/       ← Worker 3: git repos, disk, service health, security
└── shared/         ← Common files all workers can read
```

---

## Step 3 — Install the three worker prompts

The MacBook Pro session has written these three files. They should be AirDropped or scp'd to the mini into the right subdirectories:

| File | Destination on mini | Worker name |
|------|---------------------|-------------|
| `handoffs/MAC_MINI_WORKERS/01_BROADCAST_WORKER.md` | `~/mini-workers/broadcast/CLAUDE.md` | **Broadcast** |
| `handoffs/MAC_MINI_WORKERS/02_PHOTO_LAB_WORKER.md` | `~/mini-workers/photo-lab/CLAUDE.md` | **Photo Lab** |
| `handoffs/MAC_MINI_WORKERS/03_OPS_SYNC_WORKER.md` | `~/mini-workers/ops-sync/CLAUDE.md` | **Ops Sync** |

The file naming convention `CLAUDE.md` means when Chase runs `claude` in that directory, it will auto-load the worker's prompt as project memory. That's the whole trick.

After copying, verify:
```bash
ls -la ~/mini-workers/*/CLAUDE.md
```

Each worker's CLAUDE.md should be 3-6 KB of markdown.

---

## Step 4 — Shared reference files

Drop these small reference files into `~/mini-workers/shared/`:

```bash
cat > ~/mini-workers/shared/MACHINE_FACTS.md <<'EOF'
# Mac Mini — Machine Facts

- **Hostname:** ClawdBOT
- **IP:** 192.168.4.37
- **User:** ClawdBOT
- **Role:** Broadcasting + media services + photo pipeline + git mirror
- **External drive:** /Volumes/T7/BigMuddy — holds the hillbilly-dreams clone, the Lightroom catalog, and raw media

## Services running (do not restart without permission)

| Port | Service | URL |
|------|---------|-----|
| 8080 | OpenBroadcaster | http://192.168.4.37:8080 |
| 8010 | Icecast | http://192.168.4.37:8010 |
| 8888 | Big Muddy TV HLS | http://192.168.4.37:8888 |
| 32400 | Plex | http://192.168.4.37:32400 |
| 4007 | Postiz | http://192.168.4.37:4007 |
| 5055 | Open Notebook | http://192.168.4.37:5055 |

## The MacBook Pro session

Chase's MacBook Pro is on the same LAN. It owns the main hillbilly-dreams monorepo dev loop. Any code changes you commit on the mini need to flow through origin and back — never push to a branch the MacBook Pro is actively working on without coordinating.
EOF
```

---

## Step 5 — Write the status file

When everything above is done, write a short status file at `~/mini-workers/SETUP_STATUS.md` with:
- Timestamp
- What was archived (paths + sizes)
- Which of the three CLAUDE.md files are installed (ls output)
- Any errors encountered
- Disk space freed or moved

Then rsync or scp that status file back to Chase's MacBook Pro at:
```
/Users/chasethis/hillbilly-dreams/docs/briefs/mini-worker-setup-2026-04-10.md
```

---

## Hard rules

- **Do not delete anything.** This is an archive operation, not a cleanup operation.
- **Do not touch any running service.** Amy or Tracy might be listening to the radio right now — Icecast stays up.
- **Do not modify `~/.ssh/`, `~/.netrc`, `~/.git-credentials`, or any `.env*` file.**
- **Do not push or force-push any git branch.** Repo work is the Ops Sync worker's job, not yours.
- **Do not run any of the three worker prompts in this session.** This session is bootstrap-only. After it finishes, the session ends.

---

## When you're done

Reply with:
```
Archive complete.
Archived: <paths and sizes>
Workers installed: broadcast, photo-lab, ops-sync
Status file: ~/mini-workers/SETUP_STATUS.md
Next: Chase cd's into one of the worker folders and runs `claude`.
```

Then stop. Do not start any of the workers yourself.
