# AGENT_LEDGER.md
> Coordination log for the Hillbilly Dreams agent swarm.
> Read before acting. Write after completing.
> Agents: CC (Claude Code) | AG (Antigravity) | GA (Google AI) | PC (Perplexity Computer)

> **Full history archived to Google Drive on 2026-03-30.**
> Location: `hdi_drive:Hillbilly Dreams Archive/02-Agent-History/Agent-Ledger-Snapshots/`
> Rotation policy: entries older than 7 days get archived weekly.

---

## [2026-04-15 23:00] — CC (MBP) — TINYFISH MCP SERVER SETUP

**Task:** Register and authenticate TinyFish web agent MCP server for all agents on this machine.

**What was done:**
- Registered `tinyfish` MCP server at `https://agent.tinyfish.ai/mcp` (user scope — available in all projects)
- OAuth 2.1 auth completed via Chase's GitHub account
- Smoke test passed: fetched bigmuddytouring.com successfully
- API key stored in Bitwarden (for REST API only — MCP uses OAuth, not the key)
- Agent reference doc created: `.claude/agents/TINYFISH_MCP.md`

**For all agents:** Read `.claude/agents/TINYFISH_MCP.md` before using TinyFish tools. Key rules: use `fetch_content` for reading pages (not `run_web_automation`), never retry on error (runs keep executing), only use async when Chase explicitly asks.

**Status:** COMPLETE. Connected and operational.

---

## [2026-04-15 21:00–23:00] — CC (Primetime / MBP) — BUSINESS ARCHITECTURE REVIEW SESSION

**Task:** Decompose Chase's voice memo into business architecture analysis, build presentation package for internal review with Rhea, prepare COS handoff.

**Voice Memo Analysis (19 decisions):**
1. Magazine = Inn marketing channel, Tracy is editor-in-chief
2. AI article builder trained on Tracy's voice
3. Personalized onboarding questionnaire for Tracy/Amy
4. Asana as primary task management (minimize custom software)
5. Gallery as content picker for Magazine
6. Touring focused on 3 audiences: bands, venues, fans
7. Kate Squire Band = canonical case study model
8. Artist subscription packages: $99/$250/$500 (sold by Studio C)
9. Studio C = billing entity for all music production
10. Venue directory with deep data (floor plans, calendars, capacity)
11. Records + Radio = unified public page
12. RSS feed aggregation for script generation
13. JP Houston OUT — Entertainment Director role OPEN (revenue partner)
14. Land & Expand cooperative concept (30-100 acres, Phase 2+)
15. Born Free product (Raspberry Pi, Internet in a Box)
16. Marika partnership for Catskills site
17. Minimize custom software — lean on services

**Deliverables:**
- `docs/VOICE_MEMO_ANALYSIS_2026-04-15.md` — Full 19-decision analysis + gap analysis
- `docs/LAND_AND_EXPAND_CONCEPT.md` — Real estate cooperative breakdown
- `docs/HDI_Business_Review_April_2026.pptx` — 17-slide deck (terracotta/gold palette)
- `docs/hdi-review-board.html` — Interactive HTML dashboard with sanity scorecard (pw: 1966)
- Memory updated: `project_april15_architecture_decisions.md`, `project_land_and_expand.md`, `project_people_marika.md`, `project_people_rhea.md`
- Operator split memory updated: JP removed, open role added

**Mac Mini Agent Research (received via Apple Notes):**
- 150+ tools cataloged for micromedia stack
- 23 case studies documented (Lot Radio, Bitter Southerner, Marfa TX)
- Revenue projections: Radio $4,400/mo + Magazine $3,250/mo
- Bundle packages defined: $99/$199/$399/$599
- Dream pipeline: show → transcribe → article → social → track
- MelodyVault Phase 1 complete (116 tracks, SQLite catalog)
- OBS 7-scene collection, VJ effects library, VDMX media folder
- Full session log at /Users/clawdbot/broadcasting/SESSION-LOG-2026-04-15.md

**Gap Analysis Summary:**
- GREEN (13 items): Core infrastructure solid — routing, DB, admin, Asana, photos, radio
- YELLOW (7 items): Exist but need repositioning — magazine copy, touring page, venue details
- RED (11 items): Need building — voice profiles, artist Stripe products, calendar import, RSS ingestion

**Status:** DELIVERABLES COMPLETE. Awaiting Chase's detailed notes before publishing. COS handoff in progress. Nothing gets built until plan is approved by Chief of Staff.

**Personnel Change:** JP Houston no longer involved. Entertainment Director role is OPEN — revenue partner (commission/rev-share), not salary.

---

## [2026-04-15 17:00–21:00] — Radio Agent (Mac Mini) — BROADCAST INFRASTRUCTURE + RESEARCH

**Task:** Radio infrastructure buildout, music library management, micromedia research.
**Deliverables:** See RADIO → COS note p506 and Micromedia Research notes p499-p501.
**Status:** COMPLETE. Standing by for integration decisions.

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
