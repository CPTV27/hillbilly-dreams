# Canonical Infrastructure — The Real State of Things

**Date:** April 20, 2026 (late evening — after scanning Bitwarden and discovering most of what we thought was missing was actually documented in the vault all along).
**Status:** ✅ Authoritative. Supersedes the earlier migration docs that were based on faulty discovery.

**Governing rule** (set by Chase, 2026-04-20): "We're not rebuilding the software. We're rebuilding the foundation that the software gets plugged into." That foundation = this doc + Bitwarden + the canonical repos + a governance rule that every piece of infrastructure must appear here.

---

## 1. What this replaces

| Earlier doc | Status |
|---|---|
| `docs/infrastructure-migration-mac-mini-to-hetzner-2026-04-20.md` | **Superseded.** Hetzner isn't a future target — it's already the live host. |
| `docs/infrastructure-migration-EMERGENCY-2026-04-20.md` | **Superseded.** Nothing on the mini to rescue. |
| `docs/infrastructure-clean-slate-rebuild-2026-04-20.md` | **Superseded.** Recommended canceling Hetzner; that was wrong — Hetzner is the active Immich + Caddy host. |
| `docs/open-notebook-setup-2026-04-20.md` | **Partial.** The three-notebook spec still stands, but deploys to Hetzner (not the mini) and will share the box with Immich + Postiz. |

Each of those earlier docs remains in the repo as a historical record of the panic + re-planning. This is the canonical reference from now on.

---

## 2. The Mac mini — clarified

**The mini was never the production services host.** It's a workstation that had some scaffold directories for services that got built elsewhere. Chase can shut it down tomorrow for the drive to NY with **zero business impact**. Post-discovery it has:

- 0 Docker containers running
- An 8KB `docker-compose.yml` for Immich in a directory with no photos
- A Postiz scaffold on a 100%-inode-full external drive
- OpenBroadcaster source code (not a live deploy)
- 96% full system volume
- Admin identity `ClawdBOT@192.168.4.37`

**Directive:** when the mini powers off tomorrow, nothing business-critical breaks. The mini stays available as a personal device when it's back online. No services should ever be deployed there again.

---

## 3. Real production infrastructure

### 3.1 Hetzner CCX23 — `bigmuddy-services`

- **Plan:** CCX23 — 4 vCPU dedicated, 16 GB RAM, 160 GB NVMe
- **Region:** Ashburn, VA
- **Cost:** $39.99/mo
- **Hostname (internal):** `bm2-ubuntu-16gb-ash-1`
- **Public IPv4:** 5.161.61.151
- **IPv6:** `2a01:4ff:f0:5e18::/64`
- **Tailscale IP:** 100.89.173.28
- **Tailnet hostname:** `bigmuddy-services`
- **OS:** Ubuntu 24.04 LTS
- **Installed as of Apr 17 Phase 1:** UFW (22/80/443 allow, default deny), fail2ban (SSH jail), Docker CE 29.4.0 + compose plugin 5.1.3, Tailscale 1.96.4 (SSH mode + accept-routes)
- **SSH user:** `chase` (passwordless sudo). Root login disabled. Password auth disabled. Key-only.
- **MacBook SSH path:** `ssh -i ~/.ssh/id_hetzner chase@5.161.61.151` or over Tailscale `ssh chase@bigmuddy-services`
- **Hetzner Cloud console:** https://console.hetzner.cloud/projects/14242498/servers/127285318/overview
- **Credentials:** Bitwarden item `Hetzner - bigmuddy-services` (ID `48bb42a1-3c26-4778-8f5e-b42f015697ec`). API token in separate item `Hetzner` (ID `be07340a-e71b-4c3e-ba19-b42f0136bbaa`).

**Running containers (verified 2026-04-20 evening):**

| Container | Status | Role |
|---|---|---|
| `immich_server` | Up 3 days (healthy) | Immich app backend |
| `immich_postgres` | Up 3 days (healthy) | Immich DB |
| `immich_machine_learning` | Up 3 days (healthy) | CLIP / face detection |
| `immich_redis` | Up 3 days (healthy) | Immich queue |
| `caddy` | Up 3 days | Reverse proxy / TLS |

**Disk:** 150 GB root, 11 GB used, 133 GB free. Plenty of headroom for current workload. If photo library push fills it, we mount a Hetzner Storage Box as Immich volume (Phase 3 per Bitwarden notes).

**Classification:** `MBT-PLATFORM`.

### 3.2 DigitalOcean droplet — `bigmuddy-radio`

- **Purpose:** AzuraCast — the streaming server for Big Muddy Radio
- **IP:** 206.189.200.208
- **Stream domain:** `stream.bigmuddytouring.com`
- **Station shortcode:** `bigmuddyradio`
- **Mount path:** `/listen/bigmuddyradio/radio.mp3`
- **Port:** Icecast on 8000 (not 8010 as some older notes said)
- **SSL status:** ⚠️ BROKEN — self-signed cert, needs Let's Encrypt fix
- **Admin URL:** https://206.189.200.208/login
- **Credentials:** Bitwarden `AzuraCast — Big Muddy Radio Admin` + `DigitalOcean — bigmuddy-radio droplet` (root access)

**Classification:** `TOUR` (Big Muddy Radio supports Amy + the touring flywheel).

**Action items for this host:**

- Fix SSL (Let's Encrypt via AzuraCast's built-in Certbot integration) — do this before publicly promoting the stream
- Verify station config matches `docs/voice/big-muddy-radio.md`
- Document who pays for the droplet (confirm on MBT card vs. legacy)

### 3.3 GCP project — `bigmuddy-ff651` (HDI / Hillbilly Dreams Sovereign)

Cloud workload across Vertex AI, GCS, Cloud SQL, OAuth.

| Service | Details |
|---|---|
| **Vertex AI — Gemini + Imagen** | Per `docs/ecosystem-subscriptions-2026-04-20.md` §C.1. Runs content wizard + image gen. |
| **Cloud Storage `bmt-media-bigmuddy`** | Canonical photo archive (229+ Chase photos + growing). Unchanged. |
| **Cloud SQL — `sovereign-db-primary`** | Postgres 16 instance. IP 34.31.180.74. Database `hillbilly_sovereign`. pgvector 0.8.1 enabled. Region us-central1. **Purpose:** unclear from available docs — likely for a specific HDI / sovereign-layer workload. Action: document what uses this DB before next billing cycle. |
| **Google OAuth client** | Bitwarden `Google OAuth — HDI`. Client ID `458151450558-...`. Used by the Next.js app for Google sign-in. |

**Classification:** `MBT-PLATFORM` across the board.

### 3.4 Neon Postgres — HDI Production

- **Entry:** Bitwarden `Neon Postgres — HDI Production Database`
- **Owner:** `neondb_owner`
- **Database:** HDI Production (specific name in Bitwarden)
- **Used by:** Vercel (Next.js app) for primary Postgres workload

**Classification:** `MBT-PLATFORM`.

### 3.5 Vercel — chasepierson.tv org

- Pro plan per Bitwarden `Vercel Pro Token - Chase Piersons Projects`
- Hosts the Next.js app + 14 brand domains

### 3.6 Sanity, Cloudflare, GitHub, Resend, Buzzsprout, Stripe, Attio

All per the canonical subscription doc. Credentials in Bitwarden.

---

## 4. Delta Dawn + agent integrations (new discovery)

Four GChat webhooks suggest there's real agent-to-team comms plumbing that wasn't in the canonical docs:

| Agent | Bitwarden entry | Integration |
|---|---|---|
| **Agent Desk / Huck** | `GChat Webhook — Agent Desk (Huck)` + `Cloudflare API Token (Huck)` | Google Chat bot + Cloudflare API |
| **Chuck** | `GChat Webhook — Chuck` | Google Chat bot (role TBD — document) |
| **Delta Dawn** | `GChat Webhook — Delta Dawn` + `Cloudbeds API - Delta Dawn (Big Muddy Inn)` + `SIRI_API_KEY (Delta Dawn Voice)` | Google Chat + Cloudbeds (read-only, writes need Chase approval) + Siri voice |
| **Ledger** | `GChat Webhook — Ledger` | Google Chat bot for financial ledger (inferred; document) |

**Delta Dawn is real infrastructure, not just a name.** It has:
- A Siri voice endpoint
- Google Chat routing (webhook registered)
- Cloudbeds read-only API access (can see Inn bookings, not modify)

This should be reflected in `docs/HDI_DEPARTMENT_STRUCTURE.md` and in `docs/agent-briefs/per-partner-agent-setup-2026-04-20.md` §1 where shared ecosystem agents are described. Delta Dawn's API surface is the bridge between partner agents and the Inn operational layer.

**Action:** retro-audit — document each of Chuck / Huck / Ledger / Delta Dawn's purpose + current live behavior so they're not silent legacies.

---

## 5. API keys + integrations inventory

Pulled from Bitwarden — every credential that's actively used:

| Category | Bitwarden entries | Used by |
|---|---|---|
| AI — Anthropic | `Anthropic API Key — HDI` | Cos + agent runs + platform wizard |
| AI — Gemini | `Gemini API Key (ChasePierson.tv)`, `Gemini API Key (Hillbilly Dreams)` | Vertex AI usage — two separate keys, possibly legacy. **Audit** which is current; retire the other. |
| AI — Perplexity | `Perplexity API Key — HDI Deep Research` | Research agent |
| AI — OpenRouter | `Open router API` | Multi-provider AI gateway |
| AI — ElevenLabs | `ElevenLabs API Key — Hillbilly Dreams INC` | Voice synthesis (Delta Dawn + Radio) |
| AI — Tinyfish | `Tinyfish.ai` | Web automation |
| Cloud — Cloudflare | `Cloudflare API Token (D1 Agent Desk)`, `Cloudflare API Token (Huck)` | DNS + D1 + Workers — two tokens, document which does what |
| DNS/Hosting | `Vercel Pro Token` | Next.js deployments |
| Payments | `Cloudbeds API - Delta Dawn (Big Muddy Inn)` | Inn PMS read-only |
| Auth | `Google OAuth — HDI`, `NextAuth Secret — HDI`, `Developer Knowledge API` | Next.js app auth |
| Observability | `Sentry DSN — HDI (chasepiersontv org)` | Error tracking |
| Social | `Meta App — Deep South Directory (Facebook OAuth)` | FB publishing for DSD |
| Cron / platform | `CRON_SECRET — Vercel Production` | Vercel cron auth |
| Writer | `mbt-seed-writer` | Whatever writes seed data — document exactly |
| Voice | `SIRI_API_KEY (Delta Dawn Voice)` | Delta Dawn Siri integration |
| Streaming | `OBS-WebSocket` | OBS Studio remote control |
| Ambiguous / needs audit | `Loopback (chase@farleypierson.com)` | **Unknown — document or archive** |
| Email | `gmail (bigmuddy@chasepierson.tv)` | Some kind of automated email account — document |
| Git | `GitHub PAT — Antigravity MCP` | Antigravity MCP server |

---

## 6. What's NOT a server anymore

- The Mac mini is a personal workstation only. No business workload ever deploys here again.
- Any reference in the codebase or agent configs to `192.168.4.37` or `ClawdBOT` should be updated or removed.

## 7. Governance rule (permanent)

**No infrastructure survives without a canonical inventory entry.** Every server, every API key, every integration lives in this doc + Bitwarden + the canonical repo. If a new service gets spun up:

1. It gets a Bitwarden item the day it's provisioned
2. This doc gets an entry the day the item is created
3. CLAUDE.md machine/service table gets updated the same day
4. If it isn't documented within 72 hours, it gets decommissioned

This prevents another "we have a Hetzner box but nobody knows what's on it" situation.

---

## 8. Open audits / actions

| Item | Owner | By when |
|---|---|---|
| Fix AzuraCast SSL (Let's Encrypt via droplet console) | Chase (when in NY) or Elijah if delegated | Week 1 in NY |
| Audit `sovereign-db-primary` Cloud SQL — what uses it, is it current, what does it cost monthly? | Chase + accountant | Next accountant engagement |
| Audit the two Gemini API keys — which is current, retire the legacy one | Chase | This week |
| Audit the two Cloudflare API tokens — document scopes, retire unused | Chase | This week |
| Audit `Loopback`, `Developer Knowledge API`, `gmail (bigmuddy@chasepierson.tv)`, `mbt-seed-writer` — what are these, are they current | Chase | This week |
| Document `Chuck` + `Huck` + `Ledger` agent purposes fully (similar to Delta Dawn) | Cos + Chase | Next week |
| Update `CLAUDE.md` machine table to reflect this doc | Cos | Tonight |
| Photo library migration to Immich (Elijah task on Asana, on hold until Chase in NY ~Apr 26) | Elijah + Chase | Week of Apr 26 |
| Three Open Notebook notebooks — deploy on Hetzner alongside Immich | Cos / Chase | Next week after Photo push |

---

## 9. The one-line summary

Hetzner is the production services host (Immich + Caddy live, Postiz + Open Notebook next), DigitalOcean runs the radio stream, GCP + Neon + Vercel + Sanity + Cloudflare + GitHub are the cloud cornerstones, the Mac mini is just a workstation. Everything is documented here + in Bitwarden. Nothing ships without both.

---

*End of canonical infrastructure reference.*
