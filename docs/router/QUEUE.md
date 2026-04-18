# Hillbilly Dreams Agent Queue

*Last sync: 2026-04-18T18:05:04*

Status counts: 6 done · 0 running · 26 ready · 15 blocked · **47 total**

## How to use this

```bash
bash scripts/router/status.sh                   # snapshot of state
bash scripts/router/next.sh                     # next ready (copies prompt to clipboard)
bash scripts/router/next.sh --id P04-press-seed # specific project
bash scripts/router/ship.sh <id>                # mark done; auto-unblocks dependents
bash scripts/router/block.sh <id> '<reason>'    # mark blocked
bash scripts/router/unblock.sh <id>             # mark ready
```

Each project below is **paste-ready** — copy the prompt into a fresh Claude or Cursor session and the agent has everything it needs.

---

## ○ Ready (26)

### `P04-press-seed` — Press seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-press.md. Copy the prompt block (between ===== markers). Paste into Perplexity Deep Research with target: 'Press, podcasts, and music writers covering the Mississippi music corridor (Memphis to New Orleans), 2024-2026, with named contacts and beats'. Save the YAML output to /Users/chasethis/hillbilly-dreams/Perplexity-research/press-seed.yaml.

STEP 2 (agent): cd /Users/chasethis/hillbilly-dreams && python3 scripts/directory/ingest-seed.py press. Verify count + confidence breakdown. Edit apps/web/lib/directory/catalogs.ts: change press entry from source: 'md' to source: 'yaml'. Commit: 'feat(directory): canonical press catalog from YAML seed (N records)'. Push.
```
</details>

### `P05-studios-seed` — Studios seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-studio.md. Copy prompt. Paste into Perplexity Deep Research with target: 'Recording studios — active and historic — on the Mississippi music corridor (Memphis to New Orleans), 2024-2026'. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/studios-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py studios. Edit apps/web/lib/directory/catalogs.ts: studios source 'md' → 'yaml'. Commit + push.
```
</details>

### `P06-labels-seed` — Labels seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-label.md. Copy prompt. Perplexity target: 'Record labels, music publishers, management companies, booking agencies, entertainment lawyers — Mississippi music corridor 2024-2026'. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/labels-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py labels. Edit catalogs.ts: labels source 'md' → 'yaml'. Commit + push.
```
</details>

### `P07-legacy-seed` — Legacy-artists seed (deceased migration)

**Owner:** chase+agent · **Est:** ~15 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-legacy.md (created by background agent A). Copy prompt. Perplexity target: 'Deceased blues, soul, country, gospel, and Americana musicians from the Mississippi corridor, with estate contacts, rights holders, and catalog owners'. Tell Perplexity to include the 52 deceased records currently in musicians-seed.yaml — research them fresh, do not copy. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/legacy-artists-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py legacy-artists. Edit catalogs.ts: legacy-artists source 'md' → 'yaml'. Commit + push.
```
</details>

### `P08-tourism-seed` — Tourism seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-tourism.md (created by background agent A). Copy prompt. Perplexity target: 'Music heritage tourism on the Mississippi corridor — Blues Trail markers, museums (B.B. King, Stax, Sun, Delta Blues, Muddy Waters), juke joint experiences, plantation tours with music context, civil rights sites tied to music history'. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/tourism-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py tourism. Edit catalogs.ts: tourism source 'md' → 'yaml'. Commit + push.
```
</details>

### `P09-infra-seed` — Infrastructure seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-infrastructure.md (created by background agent A). Copy prompt. Perplexity target: 'Touring infrastructure for music acts on the Mississippi corridor — rehearsal spaces, PA rental, backline rental, sprinter van rental, merch fulfillment, instrument repair, tour vehicle service'. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/infrastructure-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py infrastructure. Edit catalogs.ts: infrastructure source 'md' → 'yaml'. Commit + push.
```
</details>

### `P10-editorial-seed` — Editorial seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-editorial.md (created by background agent A). Copy prompt. Perplexity target: 'Story angles, pitches, and undercovered narratives in Mississippi corridor music — for Big Muddy Magazine and freelance placement at Garden & Gun, Oxford American, NPR Music, Rolling Stone, etc.'. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/editorial-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py editorial-pitches. Edit catalogs.ts: editorial-pitches source 'md' → 'yaml'. Commit + push.
```
</details>

### `P15-synology-external` — Synology External Library (Elijah + agent)

**Owner:** elijah+agent · **Est:** ~30 min · **Depends on:** P13-hetzner-phase4-immich

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Send Elijah the doc at /Users/chasethis/hillbilly-dreams/docs/ELIJAH_SYNOLOGY_TAILSCALE.md (create from cozy-beaming-minsky.md Phase 6 if not existing). Send Tailscale invite for the chasepierson.tv account.

STEP 2 (Elijah): Follow the doc. Reply via Signal with Tailscale IP, share name, immich-readonly user + password.

STEP 3 (agent): SSH to bigmuddy-services. Mount per Phase 6: cifs at 100.x/Photos, ro flag, /mnt/synology-bearsville. Add as External Library in Immich Admin → Read-Only ON. Trigger initial scan.
```
</details>

### `P16-public-musicians` — Public musician catalog MVP

**Owner:** agent · **Est:** ~120 min

<details><summary>Show prompt</summary>

```
Build public musician catalog at /Users/chasethis/hillbilly-dreams/apps/web/app/musicians/.

Pages needed:
- /musicians — index. Photo card grid. Filterable by state (drop-down), genre (chips), confidence. Default sort: alphabetical.
- /musicians/[slug] — single artist page. Bio, genres, location, links (website/socials), 'Request press kit' button (mailto: for now). Use Big Muddy Magazine aesthetic.
- /musicians/join — onboarding form. Fields: name, primary genre, location (state+city), website, instagram, contact email, 'I'm an active artist (not a heritage figure)' checkbox. POST to /api/musicians/join → write to data/directory/musicians/staging/<slug>.yaml. QR-friendly layout (large fields, no horizontal scroll).

Use the existing data loader at apps/web/lib/directory/catalogs.ts.
Server Components only where possible. 'use client' only on the join form.
Match fonts/colors used by Big Muddy Magazine (Playfair Display + Inter, full-bleed photos, var(--*) tokens — no hardcoded values).

When done: typecheck, commit, push.
```
</details>

### `P19-elijah-commerce-pipeline` — Studio C commerce-export pipeline (Immich → GCS → Gallery)

**Owner:** agent · **Est:** ~240 min · **Depends on:** P13-hetzner-phase4-immich

<details><summary>Show prompt</summary>

```
Per docs/STUDIO_C_PHOTO_ARCHIVE_WORKFLOW.md, build the commerce export layer that runs on top of Immich:

1. 4TB drive rsync → /mnt/storage-box/photos/4tb/ (one-time, 2 hrs)
2. Lightroom CC scraper using gallery-dl → /mnt/storage-box/photos/lightroom-cc/ (3 hrs)
3. Immich webhook → cron job that reads photos tagged 'ready-for-sale', generates web JPEG + high-res TIFF, uploads to GCS gs://bmt-media-bigmuddy/archive/<slug>/ (1 day)
4. Gallery site picks up from archive/ bucket — already exists, just point it at the new path (0.5 day)
5. Print-on-demand integration with Bay Photo (fine-art) + Printful (merch) — partner choice from Tracy meeting (2-3 days)

Elijah only touches Immich tags. Everything else is automatic.
Reference: docs/STUDIO_C_PHOTO_ARCHIVE_WORKFLOW.md
```
</details>

### `P20-storage-box-offsite-backup` — Hetzner volume → GCS nightly offsite backup

**Owner:** agent · **Est:** ~60 min

<details><summary>Show prompt</summary>

```
On Hetzner server (5.161.61.151), set up nightly rclone job that backs up /mnt/storage/photos/library/ → gs://bmt-media-bigmuddy/backups/immich/. Use Bitwarden 'GCS service account' creds. Add weekly Postgres dump (immich DB) to same bucket. Cron at 04:00 UTC. Verify first run. Commit cron file + rclone config to /opt/services/backup/.
```
</details>

### `P22-monitoring` — Uptime monitoring (Healthchecks.io or Uptime Kuma)

**Owner:** agent · **Est:** ~60 min

<details><summary>Show prompt</summary>

```
On Hetzner server, install Uptime Kuma container at /opt/services/uptime-kuma/. Wire to Caddy with subdomain status.hillbillydreamsinc.com (gray cloud Cloudflare A record). Add monitors for: Immich (https://immich.hillbillydreamsinc.com), Postiz (when migrated), Open Notebook (when migrated). Notification channel: iMessage to Chase or Slack/email. Save admin to Bitwarden.
```
</details>

### `P23-container-updates-and-log-rotation` — Watchtower + log rotation + monthly prune cron

**Owner:** agent · **Est:** ~45 min

<details><summary>Show prompt</summary>

```
On Hetzner server: 1) Install Watchtower container, schedule weekly 03:00 UTC Sunday, exclude DBs (Postgres + redis). 2) Add Docker log rotation: edit /etc/docker/daemon.json with {"log-driver": "json-file", "log-opts": {"max-size": "50m", "max-file": "3"}}, restart docker. 3) Cron at 04:00 UTC first-of-month: docker system prune -af --volumes. Verify NVMe usage drops or stays flat. Commit watchtower compose + cron file to /opt/services/maintenance/.
```
</details>

### `P24-amy-voice-onboarding` — Create Amy voice-onboarding Asana task

**Owner:** agent · **Est:** ~15 min

<details><summary>Show prompt</summary>

```
Per .claude/agents/HANDOFF_TO_COS_VOICE_SYSTEM.md, mirror Tracy's task (Asana ID 1214126060819601 in Big Muddy Magazine GID 1213945999434115).

For Amy:
- Assignee: Amy Allen, amyaldersonallen@gmail.com
- Project: Big Muddy Radio if it exists, else 'Amy — Inn & Bar Ops' workstream, else create one
- Title: 'Voice onboarding — Amy'
- Body: Same five-channel ask as Tracy's (forwarded emails / Drive folder / pasted comments / voice memo / public links) BUT weight toward voice memos. Lead the ask with: 'Talk into your phone for 10 min about last Saturday's show. That's worth more than a polished essay.'
- No deadline

Use the Asana MCP tool. Then update this project: status=done, shipped_at=now.
```
</details>

### `P29-bigmuddytouring-tourbus-hero` — Big Muddy Touring — tour bus hero + artist-recruit-ready

**Owner:** agent · **Est:** ~90 min

<details><summary>Show prompt</summary>

```
Chase wants bigmuddytouring.com 'ready to show to artists we want to recruit.' Execute:

1. Find the best tour bus photo. Search in Immich (https://immich.hillbillydreamsinc.com — search 'sprinter van' or 'tour bus' in CLIP semantic search) OR search existing GCS bucket gs://bmt-media-bigmuddy/real/ for bus/van photos. Pick the most cinematic one.

2. Make it the hero image on the bigmuddytouring.com homepage. Current homepage lives at apps/web/app/(touring)/page.tsx or similar based on domain-routes.ts. Full-bleed, phone-friendly.

3. Review the homepage copy end-to-end with one question: 'Would an artist we want to recruit read this and want to be part of it?' — rewrite any sections that sound like a company pitch instead of an invitation.

4. Make sure these are visible and accurate:
   - What we offer artists (van, booking, media coverage, Inn lodging)
   - Who we've worked with (if listable)
   - How to get in touch (one clear CTA)
   - Proof of execution (photo archive now lives, radio broadcasting, etc.)

5. Verify on mobile first. Deploy. Send Chase the URL when pushed.

Constraint: use var(--*) tokens only, no hardcoded fonts/colors. No tech jargon. Main Street, not Silicon Valley. 'Tracy and Amy are equity partners' rule applies if any About copy mentions them.
```
</details>

### `P30-vicki-wolpert-onboarding` — Vicki Wolpert — first external multi-tenant client (May 1 start)

**Owner:** chase+agent · **Est:** ~240 min

<details><summary>Show prompt</summary>

```
Onboard Vicki Wolpert as Upstate NY realtor client at $500/mo custom service, START DATE MAY 1, 2026.

Per docs/PLATFORM_ARCHITECTURE.md, this is the first external multi-tenant client onboarding using the new MBT platform / Studio C operator pattern.

Steps:
1. Get Vicki's confirmed start date and signed letter of intent (Chase to handle, this agent to draft the LOI)
2. Define Vicki's domain — does she have a working domain? Tenant prefix in apps/web/config/tenants.ts
3. Set up Sanity content scope for Vicki's tenant (her brand, her content, her directory pull)
4. Wire up Cloudflare DNS
5. Connect Upstate Directory data source (P31 must be at least seeded by then)
6. Stand up Vicki's PRD per the framework in P36
7. Send onboarding email + 30-min call to walk her through admin
8. Set up monthly billing — $500/mo, add-on capable

What she gets in scope: directory of Upstate NY local businesses (Vicki's List), curated for her real-estate clients to reference. Plus: social automation, listing-adjacent content, light marketing tools.
```
</details>

### `P31-upstate-directory-research` — Upstate Directory research dispatch (Vicki's List)

**Owner:** agent · **Est:** ~180 min

<details><summary>Show prompt</summary>

```
Dispatch research for the Upstate NY Directory — same pattern as the Mississippi corridor directory in /data/directory/.

Target region: Athens NY, Catskill, Hudson, Coxsackie (and any other towns within 25 mi of Vicki Wolpert's service area).

Categories Vicki's clients ask about (these define the directory schema):
- Restaurants (good for guests, good for date nights, good for kids)
- Attractions (museums, galleries, hikes, farms, breweries, art destinations)
- Services (HVAC, plumbing, electrical, internet/cable installers, pool, lawn)
- Contractors (general, kitchen/bath, structural, septic, well)
- Builders (custom homes, additions)
- Handymen (Vicki's go-to local fix-it people)
- Real estate adjacent (inspectors, surveyors, attorneys, mortgage brokers, insurance, stagers)
- Local recommendations (cleaning services, pet sitters, snow removal)

Use the existing Perplexity prompt pattern from docs/directory-templates/. Adapt the venue.template.yaml structure for general businesses. Output to Perplexity-research/upstate-<category>-seed.yaml. Then run scripts/directory/ingest-seed.py for each category.

First seed needed: restaurants and contractors (Vicki uses those most). Output by May 1 at the latest.
```
</details>

### `P32-paul-green-realty-prep` — Paul Green Realty + City of Natchez partnership prep

**Owner:** chase · **Est:** ~60 min

<details><summary>Show prompt</summary>

```
Prepare a partnership pitch for Paul Green Realty + City of Natchez. This is the bigger-broker tier model.

Deliverable: a 1-page pitch deck or doc Chase can present in a meeting BEFORE he leaves for summer.

The offer:
- Co-branded Deep South Directory presence (Paul Green Realty as the named real estate sponsor)
- Natchez Tourism Magazine — 'I ❤️ NY for Mississippi' campaign
- Top sponsor slots in big categories: real estate (Paul Green), regional bank, regional insurance, hospital
- Physical circulation + social automation + DSD platform activation for local businesses

Financial frame: tier sizing TBD with Chase. Likely $X,XXX/mo per top sponsor + per-business activation fees.

Meeting must happen before Chase departs for summer. Schedule via Tracy. Save deck to docs/pitches/PAUL_GREEN_REALTY_NATCHEZ.md.
```
</details>

### `P35-monday-planning-session` — Monday night planning — front-end story → PRDs

**Owner:** chase+tracy+amy · **Est:** ~180 min

<details><summary>Show prompt</summary>

```
Scheduled session: Monday April 20 evening, Chase + Amy + Tracy.

Goal: walk through the front-end story for every Big Muddy property + Studio C + Tuthill + Chase Pierson Photography. What does each website say? What story do we tell our customers?

Process:
1. For each property, write the value prop in one paragraph
2. List what the website needs to display
3. Infer what tech capabilities are needed to deliver on those claims
4. That becomes the PRD per property

Properties to walk through:
- Big Muddy Inn
- Big Muddy Touring (also feeds P29 tour-bus hero work)
- Big Muddy Magazine
- Big Muddy Radio
- Big Muddy Records
- Big Muddy Entertainment
- Chase Pierson Photography
- Studio C
- Tuthill Design
- Utopia client view
- Vicki's tenant (new)

Output: docs/prds/<property>.md for each — used by Elijah + Miles to know what to build. Pre-meeting: this agent should draft a one-page worksheet template for the session.
```
</details>

### `P36-studio-c-prd-framework` — Studio C — per-client PRD framework

**Owner:** agent · **Est:** ~60 min

<details><summary>Show prompt</summary>

```
Create the canonical PRD template for every Studio C client account. Per docs/PLATFORM_ARCHITECTURE.md, every tenant has a current-state PRD that says:

- What's supported NOW for this tenant (current feature scope)
- What's been requested as add-on professional services
- What's been built for this tenant that's reusable for others (capability library)

Deliverable: docs/prds/_TEMPLATE.md with sections:
- Tenant identity (brand, domain, primary stakeholder, billing)
- Current scope (CMS schema, content types, integrations live)
- Pricing (base monthly + add-ons billed)
- Feature backlog (requested but not yet built)
- Reusable capabilities exposed (built here, available to other tenants)
- Next review date

Then instantiate from the template for: Utopia, Big Muddy Inn, Big Muddy Touring, Vicki Wolpert. Each gets a PRD file at docs/prds/<tenant-slug>.md.
```
</details>

### `P37-bmt-llc-formation` — Big Muddy Touring LLC formation (separate entity for vehicle + road liability)

**Owner:** chase+lawyer · **Est:** ~60 min

<details><summary>Show prompt</summary>

```
Per docs/ENTITY_STRUCTURE.md, BMT LLC needs to be a separate entity from MBT, Tuthill Design, and Studio C — required for vehicle insurance (12-passenger van, eventually Prevost bus) and road-performance / on-tour liability.

Decisions Chase needs to make with lawyer:
- Filing state (likely Mississippi)
- Ownership structure (sole owner Chase? Three-way equal with Tracy + Amy? Other?)
- EIN, bank account, registered agent
- Operating agreement
- Coordinate with insurance agent on policy stack (see P38)

Deliverable: filed LLC, operating agreement, bank account opened, EIN issued. Coordinated with MBT LLC formation timing.
```
</details>

### `P38-insurance-flash-radius` — Insurance umbrella covering production + touring (flash radius mapping)

**Owner:** chase+insurance-agent · **Est:** ~90 min

<details><summary>Show prompt</summary>

```
Find an insurance agent who handles BOTH production (Studio C) and touring (Big Muddy Touring LLC) entities. Get them to map the flash radius between the two policies — where Studio C's production insurance ends and BMT's touring insurance begins.

Edge cases to draw the line on:
- Studio C team member shoots in-Inn event (Studio C policy)
- Studio C team member shoots on-the-road BMT show (which?)
- BMT van transports BMT artists + Studio C crew (vehicle + crew coverage)
- Studio C-rented camera damaged on the road (equipment policy on which?)

Deliverable: written umbrella policy covering both entities with no coverage gaps. Documented flash radius for ops team to reference.
```
</details>

### `P42-big-muddy-natchez-llc-formation` — Big Muddy Natchez LLC formation (Inn + Magazine subsidiary of MBT)

**Owner:** chase+lawyer · **Est:** ~60 min

<details><summary>Show prompt</summary>

```
Per docs/ENTITY_STRUCTURE.md, Big Muddy Natchez LLC is a new wholly-owned subsidiary of MBT. Holds the Inn + Big Muddy Magazine.

Decisions Chase needs to make with lawyer:
- Filing state — Mississippi most likely (Inn is in Natchez)
- Operating agreement: 100% owned by MBT, but how is governance structured at the subsidiary level? Tracy as managing member since she runs Inn ops?
- EIN, bank account, registered agent
- Coordinate with MBT formation timing (likely file MBT first so the parent exists, then file BMNatchez as 100% MBT-owned)

Deliverable: filed LLC, operating agreement, bank account opened, EIN issued.
```
</details>

### `P43-mbt-tuthill-retainer-arithmetic` — MBT ↔ Tuthill retainer arithmetic + monthly burn-rate reporting

**Owner:** chase+tracy · **Est:** ~60 min

<details><summary>Show prompt</summary>

```
Per docs/ENTITY_STRUCTURE.md, MBT holds a retainer with Tuthill Design that funds Elijah's cross-entity work (MBT + Big Muddy Natchez + Big Muddy Touring).

Needs defining:
- Monthly retainer amount
- Hourly rate within the retainer
- Hours volume target per month (40? 60? 80?)
- Allocation conventions — how Elijah logs hours per child entity (MBT vs BMNatchez vs BMTouring)
- Burn-rate reporting cadence — monthly to Tracy minimum, possibly weekly during peak
- Burst-rate when retainer exhausted mid-month — premium or pause?
- Reset cadence — calendar month? Rolling?
- Quarterly true-up — adjust retainer up/down based on actual usage?

Deliverable: retainer agreement template (lives in docs/finance/), burn-rate dashboard plan, monthly review SOP.
```
</details>

### `P45-tenant-provisioning-pipeline` — Tenant provisioning pipeline — Move 2 of product-to-platform plan

**Owner:** patch+agent · **Est:** ~720 min

<details><summary>Show prompt</summary>

```
Per ~/.claude/plans/cozy-beaming-minsky.md (Move 2), build a single-command tenant provisioning pipeline.

Goal: spinning up a new client tenant should be one command, ~10 minutes wall-clock, end-to-end.

What it does:
1. Creates entity record in packages/database (add Tenant model if not present)
2. Provisions Vercel domain (uses Vercel API)
3. Bootstraps Sanity project from a template (or activates tenant in shared dataset)
4. Edits apps/web/config/tenants.ts to add the new tenant
5. Edits apps/web/config/domain-routes.ts to map domain → tenant
6. Activates the right MBT modules for the tenant (per module activation in P44)
7. Adds tenant to the admin dashboard
8. Outputs a summary: tenant URL, admin login, modules enabled, billing setup confirmation

File location: scripts/provision-tenant.sh OR packages/cli/ with subcommands tenant:create, tenant:activate-module, tenant:domain-add

First use case: Vicki Walpurt onboarding for May 1 (P30). Acceptance test: provision-tenant.sh vicki-walpurt --domain vickiwalpurt.com --modules directory,social,content-creation,finance succeeds end-to-end.

This is the highest scale leverage move per the plan. Can run independently of P44 module formalization since current modules can be activated even before they're packaged.
```
</details>

### `P46-content-creation-mvp` — Prompt-driven Content Creation Module MVP — Move 3 of product-to-platform plan

**Owner:** agent · **Est:** ~600 min

<details><summary>Show prompt</summary>

```
Per ~/.claude/plans/cozy-beaming-minsky.md (Move 3), build the wizard interface that makes the platform feel different from generic SaaS.

User flow: Tracy clicks 'Write magazine article' → wizard pulls relevant entities (musicians, venues from corridor directory) and media (Immich CLIP search) → produces a Sanity draft with bylines + photos already attached.

Starter exists:
- apps/web/app/api/drafts/generate/route.ts
- apps/web/app/api/drafts/refine/route.ts
- apps/web/app/magazine/page.tsx (editorial UI)

What to build on top:
- apps/web/app/admin/create/ — wizard component (multi-step UI: pick content type → pick angle → pull entities → pull media → review draft → save to Sanity)
- apps/web/lib/content-templates/ — per-content-type prompt templates (article, social post, listing description, podcast episode, pitch deck section)
- packages/modules/content-creation/ — clean module API (when P44 lands)
- Integration helpers: pull-entities-by-tag, pull-media-by-clip-search, render-template-with-context

Acceptance: Tracy ships at least 2 magazine articles built this way without engineering involvement. End-to-end runs in under 5 minutes for a typical article.

Reference: docs/PRODUCT_TO_PLATFORM_MAPPING.md for the strategic framing.
```
</details>


## ✕ Blocked (15)

### `P14-migrate-postiz-notebook` — Migrate Postiz + Open Notebook off mini

**Owner:** agent · **Est:** ~60 min · **Blocked by:** P11-hetzner-phase2 · **Depends on:** P11-hetzner-phase2

### `P17-prisma-migration` — Prisma migration + DB sync

**Owner:** agent · **Est:** ~90 min · **Blocked by:** P04-P10 (need YAML for all 7 placeholder categories first) · **Depends on:** P04-press-seed, P05-studios-seed, P06-labels-seed, P07-legacy-seed, P08-tourism-seed, P09-infra-seed, P10-editorial-seed

### `P18-hetzner-phase7` — Hetzner Phase 7: bulk photo source ingestion

**Owner:** agent · **Est:** ~180 min · **Blocked by:** P15-synology-external · **Depends on:** P15-synology-external

### `P21-team-immich-invites` — Invite Tracy + Amy + JP to Immich + iOS app setup

**Owner:** chase · **Est:** ~20 min · **Blocked by:** decision-from-tracy-amy-meeting

### `P25-voice-ingestion-pipeline` — Voice-sample ingestion pipeline (Tracy + Amy)

**Owner:** agent · **Est:** ~90 min · **Blocked by:** samples-from-Tracy-or-Amy-arrive

### `P26-records-entertainment-voice-docs` — Voice docs for Records + Entertainment brands

**Owner:** chase+agent · **Est:** ~30 min · **Blocked by:** voice-owner-named-by-chase

### `P27-radio-voice-routing-rule` — Big Muddy Radio voice-routing rule

**Owner:** agent · **Est:** ~30 min · **Blocked by:** amy-and-tracy-voice-docs-locked · **Depends on:** P25-voice-ingestion-pipeline

### `P28-bearsville-activation-planning` — Bearsville activation — start after Chase property walk-through

**Owner:** chase+agent · **Est:** ~240 min · **Blocked by:** chase-bearsville-visit-next-week

### `P33-recording-studios-magazine` — Recording Studios Magazine + Coffee Table Book concept

**Owner:** chase+agent · **Est:** ~360 min · **Blocked by:** summer-bearsville-trip · **Depends on:** P28-bearsville-activation-planning

### `P34-natchez-tourism-magazine` — Natchez Tourism Magazine — 'I ❤️ NY for Mississippi' campaign

**Owner:** agent · **Est:** ~180 min · **Blocked by:** P32-paul-green-realty-prep · **Depends on:** P32-paul-green-realty-prep

### `P39-tuthill-natchez-branch` — Tuthill Design — Natchez branch operations setup

**Owner:** chase+elijah-tuthill · **Est:** ~240 min · **Blocked by:** south-expansion-timing-tbd

### `P40-studio-c-natchez-branch` — Studio C — Natchez branch operations setup

**Owner:** chase+studio-c-co-owner · **Est:** ~240 min · **Blocked by:** south-expansion-timing-tbd

### `P41-tuthill-studio-c-llc-split` — Tuthill Design ↔ Studio C — LLC split decision

**Owner:** chase · **Est:** ~30 min · **Blocked by:** trigger-not-yet-met

### `P44-module-api-formalization` — Module API formalization — Move 1 of product-to-platform plan

**Owner:** patch+agent · **Est:** ~1440 min · **Blocked by:** monday-april-20-brand-offerings-locked

### `P48-module-license-profiles-data-model` — ModuleEngagement + ModuleLicenseProfile data model + Tier 3 billing

**Owner:** patch+agent · **Est:** ~360 min · **Blocked by:** P44-module-api-formalization · **Depends on:** P44-module-api-formalization


## ✓ Done (6)

### `P02-hetzner-ssh` — Unblock Hetzner SSH (Phase 0)

**Owner:** chase · **Est:** ~5 min · **Blocked by:** chase · **Shipped:** 2026-04-18T02:17:28

### `P03-hetzner-phase1` — Hetzner Phase 1: Server Foundation

**Owner:** agent · **Est:** ~30 min · **Blocked by:** P02-hetzner-ssh · **Depends on:** P02-hetzner-ssh · **Shipped:** 2026-04-18T02:17:28

### `P11-hetzner-phase2` — Hetzner Phase 2: Traefik + DNS

**Owner:** agent · **Est:** ~30 min · **Blocked by:** P03-hetzner-phase1 · **Depends on:** P03-hetzner-phase1 · **Shipped:** 2026-04-18T02:17:28

### `P12-hetzner-phase3` — Hetzner Phase 3: Storage Box mount

**Owner:** chase+agent · **Est:** ~25 min · **Blocked by:** P11-hetzner-phase2 · **Depends on:** P11-hetzner-phase2 · **Shipped:** 2026-04-18T02:17:28

### `P13-hetzner-phase4-immich` — Hetzner Phase 4: Immich

**Owner:** agent · **Est:** ~60 min · **Blocked by:** P12-hetzner-phase3 · **Depends on:** P12-hetzner-phase3 · **Shipped:** 2026-04-18T02:17:28

### `P47-brand-offerings-monday-prep` — Brand offerings worksheets ready for Monday April 20 partner session

**Owner:** agent · **Est:** ~90 min · **Shipped:** 2026-04-18T18:30:00


---

*Generated by `scripts/router/sync.sh` from `docs/router/queue.json`. Do not edit this file directly — edit the JSON.*