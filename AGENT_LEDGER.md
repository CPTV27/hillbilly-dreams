# AGENT_LEDGER.md
> Coordination log for the Hillbilly Dreams agent swarm.
> Read before acting. Write after completing.
> Agents: CC (Claude Code) | AG (Antigravity) | GA (Google AI) | PC (Perplexity Computer)

> **Full history archived to Google Drive on 2026-03-30.**
> Location: `hdi_drive:Hillbilly Dreams Archive/02-Agent-History/Agent-Ledger-Snapshots/`
> Rotation policy: entries older than 7 days get archived weekly.

---

## [2026-03-30] — CC — MONOREPO CLEANUP

**Task:** Archive stale docs, agent files, and media to Google Drive. Reduce context pollution.
**Changes:**
- `.claude/agents/` triaged: 71 → 25 files (removed old handoffs, prompts, agent defs)
- `docs/` triaged: 122 → 25 files (removed strategy, pitches, research, handoffs, google-ecosystem)
- `_archive/`, `outsider-economics-v2/`, `outsider-economics-v3/` removed from repo
- AGENT_LEDGER.md slimmed from 2,015 → ~80 lines
- All archived content synced to `hdi_drive:Hillbilly Dreams Archive/`
- Untracked clutter (postiz-app, open-notebook, media dirs) cleaned from working directory
**Status:** COMPLETE

---

## [2026-03-27 16:00] — CC (Huck / Build Agent) — INFRASTRUCTURE CONSOLIDATION COMPLETE

### STATUS: All hosting consolidated on Vercel Pro. All 11 domains live. All routes restored. Auth re-enabled. Sentry configured.

### DEPLOYMENT PLATFORM (CORRECTED — March 27)
- **Vercel Pro** under `chase-piersons-projects` (me@chasepierson.tv)
- Project: `hillbilly-dreams` (ID: `prj_Lv9eXtk1M2R3QCQrwNmI33eigHSf`)
- Git repo: `CPTV27/hillbilly-dreams` branch `main`
- Root directory: `apps/web`
- Deploy: `git push origin main` → auto-build → auto-deploy
- **All agents: reference Vercel, NOT Firebase. Firebase configs have been removed.**

### ALL LIVE DOMAINS (11 total, all on Vercel)
| Domain | Route Group | Content |
|---|---|---|
| measurablybetterthings.com | measurably-better | SaaS product (MBT) |
| bigmuddytouring.com | touring | Inn, hospitality, events |
| deepsouthdirectory.com | directory | Deep South Directory |
| hillbillydreamsinc.com | hillbilly | Holding company |
| bigmuddyentertainment.com | entertainment | Entertainment hub |
| outsidereconomics.com | economics | Economic content |
| bigmuddymagazine.com | magazine | Magazine/articles |
| bigmuddyradio.com | radio | Radio/playlists |
| buycurious.art | gallery | Art gallery |
| measurablybetter.life | measurably-better | Alias for MBT |

### DNS CONFIGURATION
- All domains managed in Cloudflare (under ChasePierson.TV account)
- All set to DNS-only (gray cloud, no proxy)
- Apex domains: A record → 76.76.21.21 (Vercel)
- www domains: CNAME → cname.vercel-dns.com
- Vercel handles SSL auto-provisioning

### INFRASTRUCTURE RULES (ALL AGENTS)
- **Vercel Pro** — canonical deployment platform. Auto-deploys from `main`.
- **No Firebase App Hosting** — configs deleted, backend decommissioned.
- **Cloudflare DNS-only** — no proxy, Vercel handles CDN and SSL.
- **GCP still used for:** Neon/Prisma DB, Secret Manager, Cloud Storage (photos), Cloud Scheduler (crons).

---
