# Platform Handoff — Elijah Davis

**To:** Elijah Davis (Tuthill Design, 50/50 partner with Chase Pierson)
**From:** Chase Pierson (via Chief of Staff capture)
**Date:** April 23, 2026
**Scope (strict):** The MBT platform + the Big Muddy / Big Muddy Touring engagement with Studio C Video and Tuthill Design. **NOT** land development, real estate, the Hollow / "The" tiny-house community, Chase's personal finances, or anything else outside the platform engagement.
**Status:** Canonical handoff. If something here disagrees with an older partner doc, this wins for Elijah's purposes.

---

## 0. The one-paragraph version

Chase has spent the last 18 months building a single multi-tenant platform — one Next.js codebase, one Vercel deployment, 14 brand domains — that powers an entire media-hospitality ecosystem in Natchez (Big Muddy Touring, Big Muddy Magazine, Big Muddy Radio, Big Muddy Records, the Big Muddy Inn) plus a sister activation in Woodstock (Bearsville Creative). The platform is owned by **Measurably Better Things LLC (MBT)**, which is a three-way equal partnership of Chase, Tracy Alderson-Allen, and Amy Alderson-Allen. MBT contracts with **Tuthill Design** (Chase + Elijah, 50/50) and **Studio C Video** (operated by Miles Dubois, structured as a DBA under Tuthill) for production, marketing, and operations support. The four of you — Chase, Elijah, Miles, and the MBT cap table — are the people who make all of this real. **What we need from you, Elijah, is to understand the platform deeply enough that Tuthill Design can fulfill its $1,000/month engagement (TOUR + INN/MAG accounts) and contribute to the gaps that have to close before we go live.**

---

## 1. Who's who — the entities + people

### 1.1 The entities

| Entity | What it is | Who owns it | Role in this engagement |
|---|---|---|---|
| **Measurably Better Things LLC (MBT)** | The technology platform + holding company. Owns the codebase, the brand domains, the Big Muddy family, the Inn. | Chase Pierson, Tracy Alderson-Allen, Amy Alderson-Allen — three equal partners. *(LLC formation in progress — currently aspirational. Tracy is filing.)* | The customer. MBT pays Tuthill + Studio C the $2K/mo retainer. |
| **Tuthill Design LLC** | NY-based design + photography studio. Existing book of business: Scan2Plan account, Utopia Studios, real estate photography service line launching. | Chase Pierson + Elijah Davis — 50/50 partners. Profit-share with Miles Dubois on collective work: 40 Chase / 30 Elijah / 30 Miles. | One of two partner studios fulfilling the $1,000/mo per studio engagement. Holds the production insurance policy. |
| **Studio C Video** | Bearsville-anchored video production. | Miles Dubois operates. **DBA under Tuthill Design** as of 2026-04-20. | The other partner studio. Same $1,000/mo per studio engagement structure. |
| **Hillbilly Dreams Inc (HDI)** | Originally framed as the holding parent. Being de-emphasized — MBT is taking over the holding-company role. | Not yet incorporated. Likely sunset as a brand. | Background. You can mostly ignore HDI in your day-to-day. |
| **FarleyPierson LLC** | Old NY operating LLC (EIN 81-4280721). | Chase. | Being closed or renamed. Not relevant to your work. |
| **Chase Pierson Photography (CPP)** | Chase's personal photography brand. | Chase, becoming a DBA under MBT. | Lives at chasepierson.tv. Out of scope for Tuthill engagement except for the "Chase Pierson premium tier" inside Tuthill RE bookings. |

### 1.2 The people

| Person | Role | Email | Contact note |
|---|---|---|---|
| **Chase Pierson** | CEO/CTO/Showrunner of MBT. Your 50/50 partner at Tuthill. | me@chasepierson.tv | Primary contact for everything platform. Also happy to nerd out on stack questions. |
| **Tracy Alderson-Allen** | MBT equity partner. Finance, magazine voice, Inn ops. | tracyaldersonallen@gmail.com | Equity partner, never call her an employee. The magazine voice is hers (not Chase's) — that was clarified 2026-04-22. |
| **Amy Alderson-Allen** | MBT equity partner. Inn + bar + shows + radio/podcast ops. | amyaldersonallen@gmail.com | Same — equity partner, not employee. Anchors the on-the-ground Natchez operation. |
| **Miles Dubois** | Studio C Video operator. | (in Tuthill records) | Your peer studio. Same retainer structure, same engagement, different production capability. |
| **JP Houston** | Shows + programming for Big Muddy Touring. | jphoustonlives@gmail.com | His deal isn't finalized yet — don't name him on public pages. |
| **Regina Charboneau** | Biscuits & Blues partner / Natchez restaurant operator. | (in Tuthill records) | Internal client — one of the four we're dogfooding the platform for. |

---

## 2. What Tuthill is being paid to do — the $1,000/mo engagement

### 2.1 The two-account structure (locked 2026-04-20 PM with Elijah + Miles)

Tuthill Design's MBT engagement runs as **two separate $500/month accounts**, each classified at billing time so there's no post-hoc allocation mess:

| Account | Monthly | Hours | Classification | Work scope |
|---|---|---|---|---|
| **Big Muddy Touring** | $500 | 10 hrs | `TOUR` | Sprinter van ops + wrap, artist EPKs, touring content, road-side ops, Blues Room promo when it's a touring show |
| **Big Muddy Inn + Magazine** | $500 | 10 hrs | `INN` + `MAG` | Inn marketing + content + listing work, Magazine editorial/design/publishing support, in-house event documentation, Inn-side Blues Room ops |

Same structure runs for Studio C Video. Total ecosystem retainer to partner studios: **$2,000/mo = $24K/yr.**

**Start date:** April 1, 2026 (backdated — the setup work happening in April legitimately draws against April allocations). May 1 forward, the cadence runs clean.

### 2.2 Why $50/hr / 10 hrs per account

- $50/hr is the floor rate for partner-studio work to MBT.
- 10 hrs at $50 = $500/mo per account.
- Two accounts = $1,000/mo per studio = full Tuthill engagement.
- If Tuthill does *more* than 20 hrs in a month, that's a conversation, not a silent overage. If you do *less*, there's no clawback — the retainer is the floor, not a metered cap.
- Same model as the existing Utopia account (which is one $500/mo account at the same rate).

### 2.3 What's covered vs not

**Covered by the $1K/mo:** photography, design (print + web), basic content production, Inn marketing assets, Magazine layout/editorial assists, EPK builds, Sprinter wrap work, on-the-ground show coverage.

**Not covered (separately scoped):** custom platform engineering (that's Chase + the platform team), large video productions (those run through Studio C with separate scoping), real-estate photography bookings (separate Tuthill RE service line — see `docs/partners/tuthill-photography-scope-2026-04-20.md`), Scan2Plan work (separate Tuthill account — see `docs/partners/scan2plan-tuthill-account-2026-04-20.md`).

### 2.4 The Sprinter van wrap — near-term concrete deliverable

The Big Muddy Touring Sprinter is being wrapped. Spec lives at `docs/VAN_WRAP_SPEC.md`. **Studio C's logo goes on the wrap** (per 2026-04-20 confirmation). Tuthill is on the design + production-coordination side. This is one of the first visible pieces of the Touring engagement.

---

## 3. The MBT product — what we're actually selling

This is the part you need to internalize because you'll talk to clients about it, design assets for it, and contribute to gaps in it.

### 3.1 The two-product framing

MBT has **two products, same engine, different skins:**

1. **`measurablybetter.life`** — Consumer AI agent. Personal Southern Concierge. Slider pricing $0–$99/mo. Aimed at individuals.
2. **`deepsouthdirectory.com`** — Business marketing surface. Directory + social + reviews. **B2B engagement only** — not a self-serve $25/mo SaaS. (The walk-in / tiered subscription framing was retired 2026-04-20.)

**Both run on the same multi-tenant Next.js platform.** The work you do on Big Muddy automatically benefits MBT, because MBT *is* the engine that powers Big Muddy.

### 3.2 The 9 modules

The platform delivers nine modules. Each one shows up as a feature on whichever brand site is using it.

| Module | What it does | Where you see it today |
|---|---|---|
| **Directory** | AI-powered business listings, review monitoring, competitor watch, report cards | deepsouthdirectory.com (demo), inside Big Muddy Magazine for hospitality listings |
| **Magazine** | Editorial pipeline — articles, city guides, photo essays, AI-assisted drafts | bigmuddymagazine.com (now consolidated under bigmuddytouring.com/magazine) |
| **Radio** | Podcast + curated playlists (Phase 1). 24/7 streaming infrastructure (Phase 2 with sponsor) | bigmuddyradio.com / stream.bigmuddytouring.com |
| **Records** | Artist services — catalog, sessions, distribution. Artists keep masters. Non-exclusive. | bigmuddyrecordlabel.com |
| **Touring / Events** | Booking, ticketing, event management, show-to-content pipeline | bigmuddytouring.com |
| **Commerce** | Storefront, payments, subscriptions, Stripe Connect for multi-party splits | Across brands; gallery storefront at buycurious.art |
| **Broadcasting** | Live production — OBS, Icecast, multi-stream to radio/web/social | Backend; surfaces in radio module |
| **AI Content Pipeline** | Social posts, spotlights, voice profiles, search optimization | Background service; surfaces in Magazine + Directory |
| **Hospitality** | Inn ops, listings, booking integration with Cloudbeds, guest comms | Big Muddy Inn-facing; not yet fully wired |

### 3.3 The flywheel (why this is more than the sum of parts)

Touring books the bands → Magazine writes about them → Radio plays them → Records signs them → Inn houses them → Directory lists the venues + restaurants that hosted them → Commerce processes the tickets + merch. **Each module makes the others better.** Shows have a 2:1 multiplier across the ecosystem (one show generates ~2 units of value across magazine/radio/inn/social).

This is what the platform sells to a B2B client (a town, a chamber, a broker, a venue group): not a tool, but a **program** that lights up an entire local media-hospitality economy.

---

## 4. The tech stack — where it lives, how it works

### 4.1 Frontend + backend (one app)

| Layer | What | Where |
|---|---|---|
| **App framework** | Next.js 14.2.35 (App Router) + TypeScript 5.5 | `apps/web/` in the `hillbilly-dreams` monorepo |
| **Styling** | Tailwind 3.4 + inline CSS + CSS custom properties (design tokens). **No hardcoded fonts or colors** — use `var(--font-body)`, `var(--font-display)`, `var(--bg)`, `var(--accent)` etc. | `apps/web/styles/` + tenant theme classes |
| **Auth** | NextAuth v5 with Google OAuth (the OAuth client lives in GCP project `bigmuddy-ff651`) | `apps/web/lib/auth.ts`, allowlist in `config/auth-rules.ts` |
| **Database** | Prisma + Postgres (Neon) | Primary app DB on Neon. Schema in `prisma/schema.prisma`. |
| **CMS** | Sanity Studio (project ID `5p7h8glj`) — civic-commerce pivot, April 2026 | Sanity Studio. Magazine + brand site content. |
| **Multi-tenant routing** | Hostname → route group rewrite | `apps/web/middleware.ts` reads `apps/web/config/domain-routes.ts` and `apps/web/config/tenants.ts` |
| **AI routing** | Multi-provider with failover: Gemini (Vertex AI) primary, Claude fallback, Perplexity for search | `apps/web/lib/ai-models.ts` — **never hardcode model names anywhere else, import from here** |

### 4.2 Hosting + infrastructure

| Service | What | Account / location | Credentials |
|---|---|---|---|
| **Vercel** | Hosts the Next.js app + all 14 brand domains. Pro plan. | `chasepierson.tv` org → "Chase Piersons Projects" team | Bitwarden: `Vercel Pro Token - Chase Piersons Projects` |
| **Cloudflare** | DNS for all 14 domains. Email Routing for deprecated workspaces. | ChasePierson.TV account. Gray cloud. A → 76.76.21.21. www CNAME → cname.vercel-dns.com. | Bitwarden: `Cloudflare API Token (...)` |
| **Neon Postgres** | Primary app DB. | HDI Production project. | Bitwarden: `Neon Postgres — HDI Production Database` |
| **Sanity** | CMS. Project `5p7h8glj`. | sanity.io account | Bitwarden: `Sanity` |
| **GCP `bigmuddy-ff651`** (HDI Sovereign) | Vertex AI (Gemini + Imagen), GCS bucket `bmt-media-bigmuddy` (photo archive), Cloud SQL `sovereign-db-primary` (pgvector 0.8.1), Google OAuth client | Google Cloud project | Bitwarden: `Google OAuth — HDI` + `Gemini API Key (...)` |
| **GitHub** | Source control. Repos `hillbilly-dreams` + `measurably-better-things`. | `CPTV27` org | Bitwarden: `GitHub PAT — Antigravity MCP` |
| **Hetzner CCX23** (`bigmuddy-services`) | Production host for Immich (photo backup) + Caddy (reverse proxy) + planned Postiz + Open Notebook | Ashburn, VA. 4 vCPU / 16 GB / 160 GB. $40/mo. IP 5.161.61.151. | Bitwarden: `Hetzner - bigmuddy-services` |
| **DigitalOcean droplet** (`bigmuddy-radio`) | AzuraCast → Big Muddy Radio streaming. **SSL currently broken** — needs Let's Encrypt fix. | IP 206.189.200.208, stream domain `stream.bigmuddytouring.com` | Bitwarden: `AzuraCast — Big Muddy Radio Admin` + `DigitalOcean — bigmuddy-radio droplet` |
| **Cloudflare R2** | Object storage (alternative to GCS for some workloads) | Same Cloudflare account | (in CF dashboard) |
| **Resend** | Transactional email | resend.com account | Bitwarden |
| **Buzzsprout** | Podcast hosting | buzzsprout.com account | Bitwarden |
| **Stripe** | Payments. Connect for multi-party splits. | Stripe account | Bitwarden + Vercel env |
| **Attio** | CRM | attio.com account | Bitwarden |
| **Bitwarden** | **Source of truth for ALL credentials. No exceptions.** | Personal vault, shared collections | Install: `brew install bitwarden-cli`; CLI is `bw` |

### 4.3 The 14 brand domains and how they route

The domains all point to the same Vercel deployment. The `middleware.ts` engine reads the hostname, looks it up in `domain-routes.ts`, and rewrites to the appropriate route group inside the Next.js app.

| Domain | Brand | Route group / status |
|---|---|---|
| bigmuddytouring.com | Big Muddy Touring | `touring` (primary) — magazine + radio paths consolidated here via Cloudflare Bulk Redirects |
| bigmuddymagazine.com | Big Muddy Magazine | redirects to `bigmuddytouring.com/magazine` |
| bigmuddyradio.com | Big Muddy Radio | redirects to `bigmuddytouring.com/radio` |
| bigmuddyentertainment.com | Big Muddy Entertainment | active |
| bigmuddyrecordlabel.com | Big Muddy Records | active — we own this name |
| deepsouthdirectory.com | Deep South Directory | active — demo of the Directory module |
| outsidereconomics.com | Outsider Economics | active editorial site |
| hillbillydreamsinc.com | HDI Corporate | active but sparse |
| measurablybetter.life | MBT consumer | active — consumer AI + platform overview |
| measurablybetterthings.com | MBT corporate | active (recently registered for the new MBT Workspace) |
| tuthilldesign.com | Tuthill Design | active — your studio site |
| studiocvideo.com | Studio C Video | active — Miles's studio site |
| bearsvillemediagroup.com | Bearsville Creative | active — summer 2026 activation |
| bearsvillemedia.com | Bearsville (alias) | redirects to bearsvillemediagroup.com |
| buycurious.art | Gallery / Storefront | active — routes to gallery |

**Everything is one codebase. One push to main rebuilds all 14 sites.** This is the magic — and the responsibility.

### 4.4 Tenant config + theming

`apps/web/config/tenants.ts` holds the registry. Each tenant has:
- `id`, `name`, `entity`
- list of `domains` it owns
- `primaryDomain`, `routeGroup`, `themeClass`
- `gcsBucket` (for photo serving)
- `accentColor`, `tagline`, `location`
- `features` array (which of the 9 modules are enabled)

Adding a new tenant = add an entry here + a route entry in `domain-routes.ts`. No middleware change needed.

### 4.5 AI model routing — the canonical pattern

`apps/web/lib/ai-models.ts` is the single source of truth for model selection. Roles → model chains:

| Role | Primary | Fallback chain |
|---|---|---|
| Reasoning | Gemini 3.1 Pro | Claude Sonnet → Gemini Flash |
| Generation | Gemini 2.5 Flash | Claude Haiku → Perplexity |
| Search | Perplexity Sonar | Gemini Flash |
| Editorial | (mapped per file) | (mapped per file) |
| Voice (planned) | ElevenLabs | Google Cloud TTS Journey |
| Images | Vertex AI Imagen 3 | — |
| Video | Veo 3 | — |

**Rule:** never write a model name as a string in any route file. Always import from `lib/ai-models.ts`.

### 4.6 Photo handling — the `/approved/` rule

All real Chase photos live in GCS bucket `bmt-media-bigmuddy` and are served from URLs that contain `/approved/`. **If a photo URL doesn't contain `/approved/`, it's either AI-generated or unverified.** The rule is platform-wide: **never use a non-`/approved/` URL on a customer-facing page.** Brand pages all pull from approved URLs only.

Photo ingest pipeline: shoot → review/select → tag → push to `bmt-media-bigmuddy/approved/{brand}/{filename}`. Immich on Hetzner is the personal/backup mirror.

---

## 5. What you'll be working on (the workstreams)

Ordered by priority, not size.

### 5.1 Sprinter van wrap design + production coordination

- Spec at `docs/VAN_WRAP_SPEC.md`. Studio C logo confirmed on the wrap.
- Tuthill role: design coordination + final art prep + vendor management.
- Timing: this week / next week. Sprinter is here.
- Counts against `TOUR` account hours.

### 5.2 Artist EPK template + production for Big Muddy Touring roster

- EPKs (electronic press kits) for booked + courted artists.
- Reusable template that pulls from the AI Content Pipeline + photo library.
- Tuthill role: design + photo direction.
- Studio C role: video reels.
- Counts against `TOUR` account.

### 5.3 Big Muddy Inn marketing assets + listing work

- Inn needs a refresh: photo library, listing copy, OTA presence (Airbnb/VRBO/Booking — see `docs/partners/vrbo-position-2026-04-20.md`), in-house collateral.
- Cloudbeds integration is in motion (see `docs/partners/cloudbeds-consultant-sourcing-2026-04-20.md`).
- Tuthill role: photography + listing design + print collateral.
- Counts against `INN/MAG` account.

### 5.4 Big Muddy Magazine layout + editorial production assists

- Magazine voice is **Tracy Alderson's**, not Chase's (clarified 2026-04-22). Editorial direction comes from her.
- Tuthill role: layout, photo editing, design polish, occasional photo essays.
- Counts against `INN/MAG` account.

### 5.5 Real-estate photography service line (parallel — Tuthill direct revenue)

- Two-tier booking model: Tuthill standard (any photographer) vs. Chase Pierson premium (Chase personally).
- Full scope at `docs/partners/tuthill-photography-scope-2026-04-20.md`.
- This is *Tuthill direct revenue*, not MBT retainer.

### 5.6 Bearsville Creative summer 2026 activation

- Northeast node — Woodstock-area client base.
- Studio C is the lead production capability there; Tuthill supports design.
- Lower priority than Natchez Q2 work, but on the radar.

---

## 6. Gaps that have to close before we go live

This is the punch list. Pick what's in your wheelhouse; flag what isn't.

### 6.1 Infrastructure / DevOps gaps

| Gap | Owner | Notes |
|---|---|---|
| **AzuraCast SSL on `stream.bigmuddytouring.com`** is broken (self-signed). Needs Let's Encrypt via AzuraCast's built-in Certbot. | Chase / Patch (technical director agent) | Blocks public promotion of the radio stream. |
| **Cloud SQL `sovereign-db-primary`** purpose unclear from current docs. Need to document what uses this DB before next billing cycle. | Chase | Not blocking but needs cleanup. |
| **Hillbilly Dreams Workspace cancellation** in flight; new MBT Workspace at `measurablybetterthings.com` being stood up. Migration plan at `~/.claude/plans/cozy-beaming-minsky.md`. | Chase | Affects who pays for what. Doesn't affect Tuthill. |
| **Mac mini retired as services host** (2026-04-20). Zero business-critical services remain there. | Done. | Reference only. |

### 6.2 Platform / code gaps

| Gap | Notes |
|---|---|
| **ElevenLabs SDK integration in `apps/web/lib/ai-models.ts`** — env var `ELEVENLABS_API_KEY` is provisioned in Vercel Production but no SDK imports exist. Need an `audio` role added with primary/fallback routing. | Touch needed in `apps/web/lib/ai-models.ts` + new wrapper in `apps/web/lib/audio.ts` (TBC). |
| **Stripe payment links** named `STRIPE_PAYMENT_LINK_ESSENTIALS` etc. are deprecated (DSD walk-in tier names). Leave them in Vercel env for now but no new customers flow through them. New Directory pricing is per-engagement, not per-tier. | Cleanup task — not urgent. |
| **Directory module spec** lives in TBD form — the entity-based B2B model isn't fully written down yet. Will land at `docs/DIRECTORY_MODULE_SPEC.md`. | Chase + you, possibly. |
| **Cloudbeds integration for Inn** — sourcing a consultant; spec at `docs/partners/cloudbeds-consultant-sourcing-2026-04-20.md`. | External consultant + Chase. |
| **Photo workflow** — getting more `/approved/` photos onto brand pages. 604 photos in GCS, ~545 unreviewed as of last count. | Tuthill (you) — natural fit. |
| **Dependabot failure** — `fast-xml-parser` in `/apps/web` has a `security_update_not_possible` flag. Tracked. | Patch. |
| **Magazine refresh** — assets and design refresh in flight at `docs/magazine-refresh-2026-04-19/`. | You + Tracy. |

### 6.3 Brand / copy gaps

| Gap | Notes |
|---|---|
| **DSD walk-in pricing tier names** still appear in some agent files and old memory. The walk-in $25/$50/$99/$250 SaaS sales motion was retracted 2026-04-19. Directory is now **B2B engagements only.** | If you see "Deep South Directory tier" copy in any draft, it's stale. |
| **HDI references** in older docs — being de-emphasized as MBT takes the holding-company role. | Plan to scrub during the MBT Workspace migration. |
| **Tracy + Amy must always be referred to as equity partners**, never employees. | Hard rule. |
| **JP Houston** — his deal isn't finalized. **Don't name him on public-facing pages.** | Hard rule. |
| **"Arrie Aslin"** — correct spelling. NOT "Arri" / "Ari Aslan" / "Ari B. Aslan." | Hard rule. |
| **Customer-facing copy on DSD must say "Deep South Directory"**, not "MBT" or "Measurably Better Things." | Hard rule. |

---

## 7. How to get help

### 7.1 People

- **Chase** — me@chasepierson.tv. Default for anything ambiguous. Driving to NY this week, but reachable.
- **Miles** — your Studio C peer. Same retainer structure, same engagement.
- **Tracy** — finance, magazine, Inn ops. Equity partner.
- **Amy** — Inn, bar, shows, radio. Equity partner.

### 7.2 Agents (Claude Code subagents — Chase calls them when working in the repo)

These are persistent agent personas that live in `.claude/agents/`. You'll see them referenced in commits and PRs:

- **Chief of Staff** — Chase's proxy; coordinates everything, catches drift.
- **Patch** — Technical Director. Build, deploy, infrastructure, DNS, integrations.
- **QA Agent** — Final-pass quality gate. Nothing ships without this.
- **Bearsville Studio Agent** — Owns the Bearsville/Studio C frontend.
- **Gallery Director** — Owns the photography gallery + print pricing.
- **Vesper Magazine Design Spec** — Magazine homepage redesign spec.
- **Insurance & Risk Management** — All insurance exposure across the ecosystem (Tuthill is part of this).

You don't have to invoke these — they get invoked by Chase when doing platform work. But knowing they exist explains a lot of commit messages and PR descriptions.

### 7.3 Canonical reference docs

If you're going to read three things first:

1. **`docs/THE_THESIS.md`** — the canonical mental model. Wins over every other doc.
2. **`docs/BUSINESS_ARCHITECTURE.md`** — three layers, two products, nine modules, the flywheel. Detailed.
3. **`docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md`** — every piece of production infrastructure, with credentials in Bitwarden.

If you want to go deeper:

- `docs/90_DAY_PLAN.md` — Q2 2026 priorities.
- `docs/STORY_KIT.md` — origin story + voice.
- `docs/ecosystem-subscriptions-2026-04-20.md` — every subscription we pay for, with the ~$1K/mo cap.
- `docs/partners/tuthill-photography-scope-2026-04-20.md` — Tuthill RE service line.
- `docs/partners/scan2plan-tuthill-account-2026-04-20.md` — Scan2Plan as a Tuthill account.
- `.claude/agents/HANDOFF_FROM_CHASE_2026-04-22.md` — most recent handoff doc, very current.
- `CLAUDE.md` (repo root) — boot sequence + master rules.

---

## 8. Working rules — the non-negotiables

These aren't preferences, they're the discipline that keeps a 14-domain platform from drifting into chaos.

### 8.1 Code + design

- **No hardcoded fonts.** Use `var(--font-body)` or `var(--font-display)`.
- **No hardcoded colors.** Use CSS custom properties.
- **No hardcoded model names.** Import from `lib/ai-models.ts`.
- **No tech jargon** on customer-facing pages.
- **Illustrations must be diverse** — mix of races, ages, genders.
- **No high-tech imagery.** Main Street, not Silicon Valley.
- **AI generates art, Canva handles typography.** Never let AI put text in images.
- **Photo URLs must contain `/approved/`** — otherwise they're not real Chase photos.

### 8.2 Secrets + credentials

- **Bitwarden is the source of truth for ALL credentials. No exceptions.**
- Before creating any credential: check Bitwarden first.
- After creating any credential: put it in Bitwarden.
- Never hardcode secrets. Always env vars.
- When `bw` is locked: ask Chase for a fresh session key. Don't negotiate, don't work around.

### 8.3 Git + deployment

- **Never push to `main` with `--force`.**
- **Never `git reset --hard` or `git clean -f` without explicit permission** on the same line.
- **Never commit `.env*` files** (except `.env.example` with no real values).
- **CI passing ≠ deployed.** Always check live URLs after a push.
- Create new commits, don't amend.

### 8.4 Brand discipline

- **Tracy + Amy = equity partners.** Never employees.
- **"Powered by Measurably Better Things"** in footers across all properties — correct and intentional.
- **DSD product name = "Deep South Directory"** in customer-facing copy.
- **MBT abbreviates to "MBT"** — never "MB."
- **Magazine voice = Tracy Alderson** — clarified 2026-04-22.

### 8.5 Honesty gate

We only claim what we can demo. **MBT saves $500–800/mo (not $2,839)** until Product ships the gaps. Don't pitch unshipped features.

---

## 9. Quick orientation — your first week of platform context

If Chase says "go look at X," here's where to look.

| If Chase says... | Look at... |
|---|---|
| "Pull the repo" | `git clone git@github.com:CPTV27/hillbilly-dreams.git` then `git pull origin main` |
| "Read the boot sequence" | `CLAUDE.md` at repo root |
| "Check the canonical infra" | `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` |
| "What's on a particular brand domain" | `apps/web/config/tenants.ts` + `apps/web/config/domain-routes.ts` |
| "How does AI routing work" | `apps/web/lib/ai-models.ts` |
| "How does the middleware route domains" | `apps/web/middleware.ts` |
| "Where are the photos" | GCS bucket `bmt-media-bigmuddy/approved/` |
| "What's the Sprinter wrap spec" | `docs/VAN_WRAP_SPEC.md` |
| "What's our Q2 plan" | `docs/90_DAY_PLAN.md` |
| "What's the Big Muddy media playbook" | `docs/BIG_MUDDY_MEDIA_PLAYBOOK.md` |
| "What's in the partner studios pitch" | `docs/partner-studios-pitch-2026-04-20.md` (referenced from Tuthill scope doc) |

---

## 10. Glossary

- **MBT** — Measurably Better Things LLC. The platform + holding company. Three-way equal partnership: Chase, Tracy, Amy.
- **HDI** — Hillbilly Dreams Inc. Originally the holding parent, being de-emphasized.
- **Big Muddy** — Flagship consumer brand family (Touring, Magazine, Radio, Records, Inn, Entertainment).
- **DSD** — Deep South Directory. Public participation surface of the Directory module. **B2B engagements only.**
- **Studio C** — Studio C Video. Miles's studio. DBA under Tuthill as of 2026-04-20.
- **Tuthill** — Tuthill Design LLC. You + Chase, 50/50.
- **CPP** — Chase Pierson Photography. Chase's personal photography brand. Becoming a DBA under MBT. Lives at chasepierson.tv.
- **The Inn** — Big Muddy Inn (Natchez). Owned by MBT. Amy + Tracy run ops.
- **Blues Room** — venue space inside the Inn.
- **Sovereign-db** — Cloud SQL Postgres on GCP with pgvector. Specific HDI workload (purpose being documented).
- **The flywheel** — the show-to-content multiplier across the Big Muddy modules. 2:1.
- **The Glass Engine** — the platform aesthetic. "Photography first, technology invisible."
- **TOUR / INN / MAG** — billing classifications used at the account level, not post-hoc allocation.
- **`/approved/`** — the URL marker that confirms a photo is a real Chase photo, not AI-generated.
- **Cos / Patch / Chief of Staff** — Claude Code agent personas you'll see referenced.

---

## 11. The one thing to remember

**Everything is connected.** When you design an EPK for Big Muddy Touring, you're also designing an asset that the Magazine pulls from, that the Radio show notes pull from, that the Inn's marketing pulls from when they advertise show-night packages. **One change ripples across 14 domains.** That's the platform's superpower and also its discipline. The reason we have so many rules (token vars, no hardcoded models, the `/approved/` rule, etc.) is because at our scale, drift in one place corrupts a dozen pages.

You're walking into a system that's been intentionally engineered to be coherent. Your job — alongside Miles and Chase — is to keep it that way while we ship the gaps.

---

*Compiled by Chief of Staff for Chase Pierson, 2026-04-23. Cross-references: `CLAUDE.md`, `docs/THE_THESIS.md`, `docs/BUSINESS_ARCHITECTURE.md`, `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md`, `docs/partners/tuthill-photography-scope-2026-04-20.md`, `docs/partners/scan2plan-tuthill-account-2026-04-20.md`, `.claude/agents/HANDOFF_FROM_CHASE_2026-04-22.md`. If anything here is wrong, Chase wins; flag and ask.*
