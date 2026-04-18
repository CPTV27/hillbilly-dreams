# Current Context — Measurably Better Things (MBT)

*Single source of truth for any AI agent helping Chase. Read this first. Updated as reality changes.*

**Last updated:** 2026-04-18 late afternoon (by Cos — MBT restructure absorbed)

---

## ⚠️ ENTITY RESTRUCTURE — 2026-04-18

**HDI is dead language.** Do not reference Hillbilly Dreams Incorporated in any new document or conversation.

**Measurably Better Things LLC** (not yet filed) becomes:
- The holding company
- The platform (software, directory engine, canonical entity store)
- The brand used for broker-tier B2B deals only (not for consumer pages)

**Three-way partnership:** Chase, Tracy, Amy (equal thirds) own MBT.

**Public-facing rule (Chase clarified 2026-04-18 PM):** MBT is NOT being marketed publicly in the near term. Consumer-facing sites stay on their own brands (Big Muddy Inn, Big Muddy Touring, Chase Pierson Photography, Studio C, etc.). MBT branding surfaces only for broker-tier B2B deals — Paul Green Realty, multi-property realtor partnerships, civic/tourism where the client is evaluating a platform, not a consumer brand. For everything else, MBT stays backstage like a holding company.

**Pacing (Chase flagged 2026-04-18 PM):** Do NOT propagate HDI→MBT across every doc right now. The restructure is correct direction but needs to settle. Cos holds the wholesale rename; prior docs stay labeled as-is until Chase says go.

**Vendor layer — NEW:**
- **Studio C** — production vendor only (photo, video, content, shoots, edit). Also a client of MBT for its own marketing.
- **Tuthill Design** — platform operations vendor (SLA, uptime, feature request triage). Separate from Studio C by design.

**Client engagements are with MBT.** MBT subcontracts Studio C + Tuthill for delivery.

**Tier-1 IP:** the directory module + canonical entity store. Board-level decisions only.

**New concept flagged:** Born Free Network = MBT's open-source offering. Governance model TBD.

Full restructure doc: `docs/HANDOFF_MBT_PLATFORM_RESTRUCTURE.md`

---

---

## For agents reading this

This file is the **living context** for the Hillbilly Dreams (HDI) ecosystem. Any agent — Claude mobile, Cursor, Claude Code, a sibling agent in a worktree — should read this first before taking any action on Chase's behalf.

**To update this file:**
- If you're an agent with file-write access: edit directly and commit with message `context: <what you changed>`
- If you're Claude mobile (no git access): produce the updated markdown and tell Chase to paste it into GitHub, OR tell Cos (the Chief of Staff agent) what to change next time Chase is at a laptop
- Always bump the "Last updated" timestamp and note who updated

**URL for sharing with other agents:**
`https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/CURRENT_CONTEXT.md`

Raw (easier for agents to fetch):
`https://raw.githubusercontent.com/CPTV27/hillbilly-dreams/main/docs/CURRENT_CONTEXT.md`

---

## Who we are

Hillbilly Dreams Inc (HDI) — a media-hospitality ecosystem anchored in Natchez, Mississippi. One Next.js codebase, one Vercel deployment, multiple brands across two regions (Deep South + Hudson Valley/Catskills).

The three verticals:
1. **Hospitality** — Big Muddy Inn & Bar + shows (Tracy + Amy operate)
2. **Media** — Big Muddy Touring, Magazine, Radio, Records, Entertainment + Deep South Directory
3. **Chase's services** — Chase Pierson Photography, Studio C video, Tuthill Design partner, Bearsville Creative (summer)

Legal operating entity: FarleyPierson LLC. HDI not yet formally incorporated.

---

## Partners (equal thirds)

| Person | Role | Email |
|---|---|---|
| **Chase Pierson** | CEO. Photography · Video · Code · Strategy · Touring bookings | me@chasepierson.tv |
| **Tracy Alderson-Allen** | Finance · Inn ops · Magazine editor · Holds the rudder when Chase travels | tracyaldersonallen@gmail.com |
| **Amy Allen** | Inn & Bar ops · Her band (in development with Rhea) | amyaldersonallen@gmail.com |

**Tracy and Amy are equity partners, never employees.**

---

## Client roster

### In-family (we operate on behalf of ourselves)
Big Muddy Inn · Big Muddy Touring · Big Muddy Records · Big Muddy Radio · Big Muddy Magazine · Big Muddy Entertainment · Chase Pierson Photography · Studio C · Tuthill Design

### Active external clients
- **Utopia** (recording studio — already onboarded)
- **Arrie Aslin (BN)** (artist)
- **Mechanical Bull** (brand/label adjacent)

### Target pipeline (immediate)
- **Vicki Wolpert** — Upstate NY realtor, starts **May 1**, $500/mo
- **Clubhouse Studio** — recording studio target
- **David Beren Studio** — recording studio target (spelling TBD)
- **The Woods** — different scope than main engagement
- **Paul Green Realty** — bigger broker account (DSD + Natchez tourism magazine partnership)
- **City of Natchez** — municipal tourism partnership
- **Other Upstate realtors** — $500/mo target, $99 intro rate then $300+

### Internal trade
- **Pete** — landlord, $500/mo trade for rent, renegotiate at year-1 mark (~6 months)

Full architecture: `docs/PLATFORM_ARCHITECTURE.md`

---

## Specialists (scoped engagements)

| Person | Role | Status | Notes |
|---|---|---|---|
| **Rhea** | Developing Amy's band — ~30-min live-ready set | Engagement being defined today | Wants to go to Austin next week — order (Austin first or Amy-dev first) TBD |
| **Elijah** (Bearsville) | Photo archive operator on Immich + Topaz | Onboarding this week | $50/hr, 40-hr starter block = $2K |
| **JP Houston** | First Arctic mixes + NOLA intros | **Wrapping — end of engagement after** | No extension being discussed |
| **Patch** | Technical Director — infrastructure, builds, deploys | Always-on | MacBook Pro |

---

## Agents (the automation layer)

| Agent | What | Where |
|---|---|---|
| **Chief of Staff (Cos)** | Routes work to specialists · Maintains 27-project router queue · Catches drift | Chase's MBP, Claude Code |
| **Photo Pipeline** | Runs auto-ingest (iPhone · GCS · T7 · Synology) · AI tagging · Commerce export | Hetzner + automated cron |
| **Voice System** | Per-brand voice docs · Humanizer filter | Machine-local memory |
| **Directory Research** | Perplexity deep-research → YAML → ingested catalogs | Offline via Perplexity + local Python |

---

## Current priorities (this week — April 18 onward)

1. **Partner meeting today** — Chase + Tracy + Amy + maybe Rhea. Pre-NOLA. Prep doc at `docs/meetings/TRACY_AMY_2026-04-18_PREP.md`
2. **Elijah onboarding** — WhatsApp intro sent by Chase, get his email, create Immich account
3. **Rhea engagement defined** — scope, comp, block timing (Austin or Amy-first)
4. **NOLA trip** — Chase driving there today to meet musicians
5. **Van ready for tour prep** — Big Muddy Touring site updated with tour bus hero (queued as P29)

---

## Recent decisions (most recent first)

- **2026-04-18 (partner meeting outcomes):**
  - **Rhea engagement DEFERRED.** No immediate scope. Re-evaluate at Woodstock this summer or back at Big Muddy in the fall. Reason: too much else needs to be done first (platform, Vicki, Paul Green, Studio C operator framework). Rhea wouldn't have the focus time.
  - **Amy's May 8 show — Amy + Big Muddy Blues Band.** Same lineup as last night. If a better bass player appears, swap him in. If Rhea is still around and wants to play drums, optional. Otherwise no special prep.
  - **Elijah onboarding ON HOLD.** Don't send WhatsApp / create Immich account until Chase reviews everything personally first. WhatsApp draft + runbook are staged but not transmitted.
- **2026-04-18 (driving to NOLA):** Platform architecture locked — three layers: **MBT (platform) ↓ Studio C (operator) ↓ Tenants (clients).** Sanity is the CMS across every property. Studio C runs the middleware per tenant. Build-once-reuse-many. Full doc: `docs/PLATFORM_ARCHITECTURE.md`.
- **2026-04-18:** Vicki Wolpert onboarding — Upstate NY realtor, **starts May 1**, $500/mo custom service, can add on. Other realtors target $500/mo with $99 intro rate.
- **2026-04-18:** New product line — **Recording Studios Magazine + Coffee Table Book** — Chase's summer 2026 work at Bearsville. Photography + video of recording studios (Utopia, Clubhouse, David Beren, others). Feeds Utopia/Bearsville channels + Bearsville campus network.
- **2026-04-18:** New product — **Upstate Directory** for Vicki ("Vicki's List") — Athens NY, Catskill, Hudson, Coxsackie. Restaurants, attractions, services, contractors. Research team to dispatch immediately.
- **2026-04-18:** New product — **Natchez Tourism Magazine** ("I ❤️ NY for Mississippi" campaign) — distinct from Big Muddy Magazine. Carved sponsor slots: top realtor, regional bank, regional insurance, hospital. Target Paul Green Realty + City of Natchez partnership.
- **2026-04-18:** Chase Pierson Photography rate is **distinct from Tuthill advertised rates** — bookings through Tuthill still pay Chase at his premium rate.
- **2026-04-18:** Pete (landlord) — current $500/mo trade for rent. Year-1 mark coming up in ~6 months. Will renegotiate as our offering scales.
- **2026-04-18:** **Monday night (April 20)** — Chase + Amy + Tracy plan front-end story for every property. Output = PRD per tenant. Elijah + Miles work from those PRDs.
- **2026-04-18 (today):** B locked on photo architecture — Immich on Hetzner + Elijah's commerce-export layer on top (NOT parallel/alternative). $45/mo ongoing.
- **2026-04-18:** Sony a7 V (not a7R V). Profoto D2 (likely). Cash position not needed for meeting.
- **2026-04-18:** JP engagement scoped to First Arctic mixes + NOLA intros, then done.
- **2026-04-18:** Elijah confirmed as photo archive operator. $50/hr starter block.
- **2026-04-18:** Rhea engagement for Amy's band — to be defined today in partner meeting.
- **2026-04-17 overnight:** Immich went live on Hetzner with 52,892 photos from GCS ingested. T7 sync (590 GB) in progress, ETA 2 days.
- **2026-04-17:** Musicians YAML seed is LIVING-only going forward; 52 deceased records will migrate to legacy-artists category when that seed drops.
- **2026-04-17:** MBT is Chase's separate open-source project, pulled out of HDI business plan.
- **2026-04-15 (architecture):** 19 decisions from voice memo — Magazine→Inn, Tracy editor, artist packages, minimize custom software.
- **2026-04-05:** DSD pricing locked — Free / $25 Essentials / $50 Pro / $99 Marketing / $250 Engine.

---

## Tech backbone (what runs everything)

### Live and operational
- **Hetzner CCX23** at `5.161.61.151` (Tailscale: `100.89.173.28`, hostname: `bigmuddy-services`)
- **Immich** at `https://immich.hillbillydreamsinc.com` — 52,892 photos ingested, face recognition + CLIP search active
- **Caddy** reverse proxy with Let's Encrypt TLS
- **1 TB block storage volume** (`/mnt/storage`) — will outgrow in ~6 months, plan to upgrade to 10 TB Storage Box ($25/mo extra)
- **Vercel deploy** — 14 domains share one Next.js codebase (multi-tenant by hostname)
- **Cloudflare DNS** — all domains routed, gray cloud
- **Mac mini at 192.168.4.37** — OpenBroadcaster (radio), Icecast, Plex, Postiz (migrating to Hetzner)

### Operational data
- **Internal Directory** — 459 records across 10 categories. Browse UI at `/admin/directory`
- **GCS bucket** `bmt-media-bigmuddy` — source archive, Immich external library, commerce export target
- **Postgres** (Vercel Marketplace) — customer accounts, DSD subscriptions, CMS
- **Agent Router Queue** — 29 projects, dispatchable via `bash scripts/router/next.sh`

### Credentials
- **All credentials in Bitwarden.** No exceptions.
- Hetzner server SSH key: `~/.ssh/id_hetzner` (on Chase's MBP + Mac mini)
- Immich admin: Bitwarden "Immich — bigmuddy-services"

---

## Budget snapshot

| Bucket | One-time | Monthly | Notes |
|---|---|---|---|
| Hetzner photo stack | — | $45 | CCX23 + 1 TB volume + GCS |
| Elijah starter block | $2,000 | — | 40 hrs × $50/hr — ON HOLD pending Chase review |
| ~~Rhea block~~ | — | — | Deferred |
| Camera Wave 1 | $8,750 | — | Sony a7 V + 70-200 GM II + cards + wireless TX. B&H 12-mo 0% available → $730/mo alt |
| Camera Phase 1 (next 60d) | $9,650–10,200 | — | Gimbal, 2nd TX, Ronin 4D expansion |
| **Currently in motion** | ~$8,750 | $45 | Camera Wave 1 + infra |
| **Pending Chase review** | $2,000 | — | Elijah block |
| **Full Studio C buildout** | ~$20K | $45 | Over 60 days |

---

## Travel schedule — next 3 weeks

| Window | Chase | Rhea | Amy |
|---|---|---|---|
| Today (Sat 4/18) | Meeting → drive to NOLA | In meeting OR traveling | Inn |
| This week | NOLA | Austin OR Natchez (TBD) | Inn + band prep with Rhea |
| Next week | NY (few days to a week) | Working with Amy in Natchez (if Amy-first) | Band development |
| Following | Maybe Arkansas → back to Natchez | Wrapping | Show prep |
| Then | Amy's show (date TBD) | At show | Performing |
| After | Drive van Natchez → Woodstock for supper | TBD | TBD |

**Implication:** Chase is mostly mobile for 2–3 weeks. Tracy/Amy hold day-to-day. Anything needing Chase sign-off goes via the driving log or queues for post-return.

---

## Active open threads (what needs attention)

1. **Vicki Wolpert onboarding (May 1 deadline)** — set up Upstate NY realtor as first external multi-tenant client at $500/mo — router P30
2. **Upstate Directory research dispatch** — research team for Athens NY / Catskill / Hudson / Coxsackie — restaurants, attractions, services, contractors. Vicki's tenant content — router P31
3. **Paul Green Realty + City of Natchez meeting** — must happen BEFORE Chase leaves for summer — router P32
4. **Monday night (April 20) planning session** — Chase + Amy + Tracy work through front-end story per property → produces PRDs — router P35
5. **Studio C PRD framework** — one-page-per-client template for what's supported now / feature add-on path — router P36
6. **Recording Studios Magazine + Coffee Table Book** — Chase's summer Bearsville work — router P33
7. **Natchez Tourism Magazine** — depends on Paul Green + City alignment first — router P34
8. **Elijah onboarding ON HOLD** — Chase reviewing the runbook + WhatsApp draft + architecture personally before sending anything
9. ~~Rhea engagement~~ — **deferred** to summer (Woodstock) or fall (Big Muddy). Not active.
10. **Tailscale free tier expires ~May 1** — upgrade before Chase leaves on NY trip, or pre-authorize Tracy via Bitwarden
11. **Amy voice-onboarding Asana task** — router P24, needs creating
12. **Big Muddy Touring site refresh** — tour-bus hero, artist-recruit-ready — router P29
13. **Bearsville activation planning** — starts after Chase's Bearsville visit next week — router P28
14. **Storage Box upgrade path** — currently 1 TB volume will fill in ~6 months → 10 TB BX31 at $25/mo

---

## Three lanes of front-end work (post-meeting)

| Lane | Owner | What |
|---|---|---|
| **Pictures** | Elijah | Photo archive, Topaz enlargements, commerce export to gallery |
| **Stories** | Tracy | Magazine editorial, long-form, artist features |
| **Words** | Humanizer + per-brand voice docs | Site copy consistency across 14 sites |

Directory shipped this week is the structural backbone underneath all three.

---

## How to update this file

**From Claude Code / Cursor / any agent with git access:**
```
1. Edit docs/CURRENT_CONTEXT.md
2. Bump the "Last updated" timestamp at the top
3. git commit -m "context: <one line summary of what changed>"
4. git push
```

**From Claude mobile / any agent without git access:**
1. Read this file (URL above)
2. Produce the full updated markdown
3. Either paste into GitHub web editor (https://github.com/CPTV27/hillbilly-dreams/edit/main/docs/CURRENT_CONTEXT.md) OR hand the updated markdown to Chase / Cos to commit
4. Bump the "Last updated" line

**Rules:**
- Keep the structure. Don't rearrange sections — agents rely on them being in the same place.
- Add to sections, don't replace wholesale. If something's deprecated, strike it through (~~like this~~) and add the new state below.
- Recent decisions are added at the TOP of the Recent Decisions list, not the bottom.
- Open threads — when resolved, delete or strike through. Don't let it grow infinitely.

---

## Key URLs (bookmarkable on phone)

| What | URL |
|---|---|
| **This context file** | https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/CURRENT_CONTEXT.md |
| Partner meeting prep | https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/meetings/TRACY_AMY_2026-04-18_PREP.md |
| Driving log (Apr 18) | https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/DRIVING_LOG_2026-04-18.md |
| Elijah runbook | https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/STUDIO_C_ELIJAH_RUNBOOK.md |
| Elijah WhatsApp draft | https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/ELIJAH_WHATSAPP_DRAFT.md |
| Agent router queue | https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/router/QUEUE.md |
| Hetzner media handoff | https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/HANDOFF_HETZNER_MEDIA_INFRASTRUCTURE.md |
| Photo archive workflow | https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/STUDIO_C_PHOTO_ARCHIVE_WORKFLOW.md |
| Immich (live app) | https://immich.hillbillydreamsinc.com |

---

## Hard rules (all agents obey)

- **Tracy and Amy are equity partners**, not employees. Ever.
- **All credentials in Bitwarden.** No hardcoded secrets.
- **DSD product name** is "Deep South Directory" on customer-facing copy. Never "MBT" or "Measurably Better Things."
- **Arrie Aslin** — correct spelling. Not "Arri Aslan" etc.
- **Never commit without explicit request** unless it's part of an established workflow (like Cos's daily commits).
- **Photo pipeline is Elijah's domain** once onboarded. Don't touch Immich tags or ingest without asking him.
- **Any new credential created → goes into Bitwarden.**

---

*End of Current Context. If you're an agent who just finished reading this: you now know what we're doing. Proceed.*
