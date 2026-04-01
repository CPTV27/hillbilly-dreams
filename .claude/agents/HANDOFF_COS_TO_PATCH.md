---
name: Chief of Staff → Patch Handoff
description: Capabilities audit, integration status, and priority tasks for the Technical Director
---

# Handoff: Chief of Staff → Patch (Technical Director)

**Date:** 2026-04-01
**From:** Chief of Staff (this session)
**To:** Patch (Claude Code remote agent, MacBook Pro)

---

## Current Capabilities — What's Working

### Infrastructure
| System | Status | Notes |
|---|---|---|
| Next.js monorepo | ✅ Green | Build passes, deploys to Vercel |
| 14 domains | ✅ All routing | Middleware hostname-based routing working |
| Multi-tenant (4 tenants) | ✅ Working | big-muddy, bearsville, studio-c, tuthill |
| Prisma + Cloud SQL | ✅ Connected | PostgreSQL, all models active |
| GCS (bmt-media-bigmuddy) | ✅ Working | Auth needs re-login for CLI, web uploads work |
| Cloudflare DNS | ✅ All domains | Gray cloud, A → 76.76.21.21 |
| Stripe | ⚠️ Partial | Checkout route exists but DSD Payment Links not created yet (Thursday) |
| Google Workspace APIs | ⚠️ Not wired | Auth exists but no active integrations |
| Asana | ✅ Connected | PAT configured, task sync working |

### AI / Content Pipeline
| System | Status | Notes |
|---|---|---|
| Gemini (Vertex AI) | ✅ Working | Reasoning, generation, chat, voice |
| Claude (Anthropic) | ✅ Working | Editorial, brand voice generation |
| Perplexity | ✅ Working | Search fallback |
| Whisper STT | ✅ Working | Voice transcription |
| Google Cloud TTS | ✅ Working | 7 character voices (Delta Dawn, Chase, etc.) |
| Imagen 3 | ✅ Available | Image generation via Vertex |
| Voice AI (Southern Concierge) | ✅ Phase 1 Live | Tap-to-talk on measurablybetter.life/life |
| Content enrichment queue | ✅ Working | Google Places data for directory listings |

### Admin Tools
| Tool | Route | Status |
|---|---|---|
| Dashboard | /admin | ✅ Working |
| Events (CRUD) | /admin/events | ✅ Working |
| Articles (CRUD) | /admin/articles | ✅ Working |
| Creative Studio | /admin/creative | ✅ Working (audio tab) |
| Newsletter | /admin/newsletter | ✅ Working |
| Clients | /admin/clients | ✅ Working |
| Media Upload | /admin/upload | ✅ Working |
| Playlists | /admin/playlists | ✅ Working |
| Delta Dawn Chat | Floating on all admin | ✅ Working |
| Productions | /admin/productions | ✅ Working |
| Social | /admin/social | ⚠️ UI exists, APIs not connected |
| Contacts | /admin/contacts | ✅ Working |

### Mac Mini Services
| Service | Port | Status |
|---|---|---|
| OpenBroadcaster | 8080 | ✅ Running |
| Icecast | 8010 | ✅ Running |
| Plex | 32400 | ✅ Running |
| Postiz | 4007 | ✅ Running |
| Open Notebook | 5055 | ✅ Running |

### New Tools (Tonight)
| Tool | Status | Notes |
|---|---|---|
| Obsidian Vault | ✅ Set up | 84 notes, ~/Documents/Obsidian Vault/ |
| Google Drive Archive | ✅ Set up | 10 folders via rclone hdi_drive: |
| QA Agent System | ✅ Created | QA_CHASE.md + CHIEF_OF_STAFF.md + COS_EXAM.md |
| Photo Library | ✅ 62 processed | /images/processed/ organized by brand |

---

## What's NOT Working — Gaps

### Critical (Blocks dogfood)
1. **Stripe Payment Links** — Not created yet. Chase doing Thursday. Blocks actual payment collection.
2. **Social publishing APIs** — UI exists at /admin/social but no Facebook/Instagram/Google APIs connected. Blocks $49 tier (Apr 21).
3. **Review monitoring** — Google review alerts not shipping real-time alerts yet. Blocks $99 tier value prop (Apr 14).

### High (Blocks sharing)
4. **Directory page copy** — Still has old SaaS language. Needs rewrite per copy reset plan.
5. **Media/DSD landing page** — Identity crisis (directory + media hub). Needs rewrite or split.
6. **Hillbilly Inc page** — Google case study, not HDI. Needs full rewrite.
7. **Technology page** — Google sales page. Needs corridor connection.

### Medium (Quality)
8. **GCS auth expired** — CLI can't upload photos. Need `gcloud auth login`.
9. **Hardcoded colors** — Still present in gallery, some admin pages. Phase 1 cleanup covered consumer pages.
10. **Tier naming chaos** — DSD uses Listing/Works/Engine. Other pages still reference Front Porch/Route/River Room/Blues Room. Need ONE system.
11. **Tracy & Amy voice profiles** — Not captured yet. Need voice interviews.

### Low (Backlog)
12. **ElevenLabs integration** — Phase 2 voice. Custom Southern Concierge voice.
13. **iOS App Clip** — Phase 3 voice. "Hey Siri, ask Big Muddy."
14. **Miro integration** — One command away: `claude mcp add --transport http miro https://mcp.miro.com`
15. **Service worker** — PWA has manifest but no offline support.

---

## Priority Tasks for Patch

### This Week
1. **Help Chase create Stripe Payment Links** (Thursday) — $20 and $99 recurring products
2. **Rewrite Directory page** — Photo hero, plain language, correct tier names
3. **Rewrite Hillbilly Inc page** — Strip Google branding, add photography, find HDI voice
4. **Fix tier naming** — Standardize across all pages to Listing/Works/Engine

### This Month
5. **Ship competitor snapshot** (Apr 7) — Claim ladder dependency
6. **Ship review response flow** (Apr 14) — Claim ladder dependency
7. **Connect social publishing APIs** (Apr 21) — Opens $49 tier
8. **Ship monthly report PDF** (Apr 21) — Claim ladder dependency

### Ongoing
9. **Build passes on every push** — You own the build. If it breaks, you fix it.
10. **Photo pipeline** — Process remaining 850+ desktop photos into GCS
11. **Mac Mini maintenance** — Keep broadcasting, Plex, Icecast running

---

## How We Work Together

- **COS (me)** = big picture, priorities, agent coordination, QA enforcement
- **Patch (you)** = build, deploy, fix, ship. Technical execution.
- **Vesper** = design, visual direction, layouts. She sends components, you implement them.
- **Chase** = final call on everything. Voice, positioning, priorities.

Read `docs/BUSINESS_ARCHITECTURE.md` before doing anything. That's the source of truth.

Send work. I'll send priorities.
