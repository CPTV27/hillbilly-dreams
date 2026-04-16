# HDI Tech Stack — Full Picture for Cross-Agent Handoff

*April 16, 2026. Source of truth for any agent needing to understand the current infrastructure.*

---

## Architecture Overview

One Next.js monorepo → one Vercel deployment → 14 domains via hostname-based middleware routing. Mac mini for broadcasting/AI processing. DigitalOcean droplet for public radio relay. Neon PostgreSQL. GCS for media storage.

## Stack

| Layer | Technology | Status |
|-------|-----------|--------|
| **Framework** | Next.js 14.2.35, App Router, TypeScript 5.5 | Production |
| **Hosting** | Vercel (Fluid Compute, not Edge) | Production |
| **Database** | PostgreSQL on Neon (managed, auto-backup) | Production |
| **ORM** | Prisma | Production |
| **CSS** | Tailwind 3.4 + CSS custom properties (var(--bg), var(--accent), etc.) | Production |
| **Auth** | next-auth v5 | Production |
| **CMS** | Sanity CMS (April 2026 civic-commerce pivot) | Production |
| **Payments** | Stripe (Checkout, Connect for multi-party splits) | Production |
| **DNS** | Cloudflare (all 14 domains, gray cloud) | Production |
| **Storage** | GCS bucket `bmt-media-bigmuddy` + Cloudflare R2 | Production |
| **AI — Reasoning** | Gemini 2.5 Pro (primary), Claude Sonnet (fallback) | Production |
| **AI — Generation** | Gemini 2.5 Flash (primary), Claude Haiku (fallback) | Production |
| **AI — Search** | Perplexity (primary), Gemini Flash (fallback) | Production |
| **AI — Images** | Vertex AI Imagen 3 | Available |
| **AI — Video** | Veo 3 | Available |
| **AI — Audio** | ElevenLabs (provisioned, no SDK integration yet) | Provisioned |
| **AI — Transcription** | Gemini Flash (primary, $0 cost), faster-whisper (local fallback) | Production |
| **Radio Relay** | AzuraCast on DigitalOcean droplet 206.189.200.208 | Production |
| **Radio SSL** | Let's Encrypt via AzuraCast (stream.bigmuddytouring.com) | Production (fixed Apr 15) |
| **Broadcasting** | OpenBroadcaster on Mac mini :8080 (local production) | Production |
| **Streaming** | Icecast on Mac mini :8010 (local) → AzuraCast (public relay) | Production |
| **Social** | Postiz on Mac mini :4007 | Running |
| **Media Server** | Plex on Mac mini :32400 | Running |
| **Research** | Open Notebook on Mac mini :5055 | Running |
| **Task Management** | Asana (20 projects, PAT configured) | Production |

## Mac Mini (192.168.4.37)

| Service | Port | Status |
|---------|------|--------|
| OpenBroadcaster | :8080 | Running — local production |
| Icecast | :8010 | Running — local stream |
| Postiz | :4007 | Running — social scheduling |
| Plex | :32400 | Running — media server |
| Open Notebook | :5055 | Running — AI research |

**NOT YET INSTALLED (planned Week 1):**
- n8n (:5678) — workflow automation / event bus
- Cloudflare Tunnel — Vercel → Mini secure bridge

**Hardware:** Mac mini M1/M2, connected to T7 external SSD for media storage.

## DigitalOcean Droplet (206.189.200.208)

- AzuraCast (Docker) — public radio relay
- Icecast via AzuraCast — public stream endpoint
- SSL: Let's Encrypt (stream.bigmuddytouring.com)
- Root access: SSH with password (in Bitwarden)

## Domain Routing

```
bigmuddytouring.com      → /touring (default fallback)
bigmuddymagazine.com     → Cloudflare 301 → bigmuddytouring.com/magazine
bigmuddyradio.com        → Cloudflare 301 → bigmuddytouring.com/radio
bigmuddyentertainment.com → Cloudflare 301 → bigmuddytouring.com/entertainment
bigmuddyrecordlabel.com  → Cloudflare 301 → bigmuddytouring.com/records
deepsouthdirectory.com    → /directory
outsidereconomics.com     → /economics
hillbillydreamsinc.com    → /hillbilly
measurablybetter.life     → /measurably-better
bearsvillemediagroup.com  → /bearsville
buycurious.art            → /gallery
studiocvideo.com          → /studioc
tuthilldesign.com         → /tuthill
dctvny.org                → /dctv
```

All DNS: Cloudflare, gray cloud, A → 76.76.21.21, www CNAME → cname.vercel-dns.com

## Database Schema (Key Models)

2,270+ lines in schema.prisma. Key models:

- **User** — auth, sovereign tier, credits
- **DirectoryBusiness** — 5,605 businesses across 13 corridor cities
- **Article** — magazine content
- **Event** — shows, concerts
- **Track** — 55 tracks ingested, 3 artists
- **Artist** — 36 artists in DB
- **Split** — 165 revenue splits (80% artist, 15% BMR, 5% platform)
- **ShowEvent** — cross-domain cascade (radio episode, magazine blurb, DSD partner, social campaign)
- **MediaAsset** — audio/video/image/transcript with performance links
- **Venue** — 26 venues seeded
- **ContentCalendar** — planned content per client
- **Performance** — live performances with media assets

**NEW TABLES DESIGNED (not yet migrated):**
See `docs/SCHEMA_BLUEPRINTS.md`:
- PipelineContent — Content UUID state machine for n8n
- RadioPlayLog — AzuraCast play history
- SponsorPackage — $99-$599 bundle tracking
- MembershipSubscription — Big Muddy Club
- ArtistPackage — $99/$250/$500 Studio C packages

## Storage (GCS)

Bucket: `bmt-media-bigmuddy`

```
/real/          — Real Natchez/corridor photography
/brand/         — Logos, brand assets
/photos/auto/   — Camera roll imports (23 WebP)
/music/         — 46 track files uploaded today
/pipeline/      — (planned) n8n processed content
/processed/     — (planned) audiograms, thumbnails, waveforms
```

16,936 tagged photos total. Service account: `bigmuddy@bigmuddy-ff651.iam.gserviceaccount.com`

## What We Built Today (April 15-16)

- 37 room recordings transcribed via Gemini Flash ($0 cost)
- 55 tracks ingested to Prisma DB (Amy Allen, Chase Pierson, Mechanical Bull)
- 116 tracks cataloged in MelodyVault SQLite (radio rotation library)
- ID3 tags normalized (artist name variants fixed)
- Radio SSL fixed (Let's Encrypt on AzuraCast)
- Cursor Batch 3 deployed (pricing reset, copy rewrites, new pages)
- Review board HTML (1,064 lines, internal strategy doc)
- Miro board populated (12 frames, 60+ items)
- 3-year pro forma ($321K → $871K → $1.53M)
- Narrative Bible written (docs/NARRATIVE_BIBLE.md)
- Schema blueprints designed (5 new tables)

## What's NOT Built Yet

- n8n event bus (Week 1 priority)
- Cloudflare Tunnel (Week 3)
- Content API on mini (:3100)
- Social publishing APIs (Facebook/Instagram/Google not connected)
- Membership platform
- Radio rate card / sponsor packages in Stripe
- Artist subscription packages in Stripe
- AzuraCast → PostgreSQL play history polling
- Audiogram generation (Remotion)
- Grafana dashboards

## Key Corrections for Other Agents

1. **We use Sanity CMS, not Payload CMS.** Already decided April 2026.
2. **Pricing is Free/$25/$50/$99/$250.** Not $20/$49/$99 (old). Not $0/$99/$250 (also old).
3. **OBS and AzuraCast COEXIST.** OBS = local production on mini. AzuraCast = public relay on droplet. Not replacements.
4. **Gemini Flash for transcription ($0 cost).** faster-whisper is a good local fallback, not the primary.
5. **Domain routing is solved in code** (domain-routes.ts + tenants.ts + middleware.ts). No need for a Postgres config table.
6. **Vercel uses Fluid Compute, not Edge Functions.** Cold starts are not the problem — NAT traversal is. Cloudflare Tunnel fixes it.
7. **We have 14 active domains, not 15.** The count varies by source doc but the canonical list is in CLAUDE.md.

## API Keys (in Vercel env vars)

ANTHROPIC_API_KEY, GEMINI_API_KEY, PERPLEXITY_API_KEY, ELEVENLABS_API_KEY, GOOGLE_APPLICATION_CREDENTIALS_JSON, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, STRIPE_SECRET_KEY, STRIPE_PAYMENT_LINK_*, NEON DATABASE_URL + DIRECT_DATABASE_URL, MIRO_API_TOKEN, MIRO_BOARD_ID

All secrets in Bitwarden. Never hardcoded.
