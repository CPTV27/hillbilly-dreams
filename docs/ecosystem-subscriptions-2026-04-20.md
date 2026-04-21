# Ecosystem Subscriptions — Itemized Breakdown + Consolidation Plan

**Date:** April 20, 2026
**Purpose:** Unpack the "$1k/mo MBT software + AI subscription stack" break-even line into specific line items. Consolidate accounts under `chasepierson.tv` as the parent. Route billing through the MBT credit card where appropriate so expense tracking is clean against the classification taxonomy.
**Status:** Internal. Partners + accountant reference. Most prices are confirmed by Chase; a few are `[verify]` — correct them before final sign-off.

## TL;DR — the hard rule

**$1,000/month is the hard cap on total MBT-paid software spend** (Sections A + B + C combined, not counting Inn-specific subs in Section D or Tuthill-side subs in Section E). If cumulative actuals trend toward the cap, we either cancel a tool or upgrade a revenue line to justify the spend. No exceptions without Chase sign-off.

Current estimated spend against the cap: **~$600–740/mo** → roughly $260–400/mo of headroom for new tools, API overages, and planned additions below.

**Companion:**
- `docs/ecosystem-classification-taxonomy-2026-04-20.md` — the 8 codes used for classification
- `docs/partners/inn-mbt-investment-history-2026-04-20.md` — the $1k/mo Inn → MBT subscription
- `docs/THE_THESIS.md` — the break-even math this doc unpacks

---

## 1. The consolidation intent

One parent Google Workspace, one MBT credit card as the billing backbone for shared tools, clear ownership per entity.

**Parent workspace:** `chasepierson.tv` — keeps Google Workspace, becomes the master identity for everything shared across the ecosystem.

**Deprecated Google Workspace accounts:**
- `bigmuddyinn.com` — deprecated as a workspace. Emails migrate to Cloudflare Email Routing (free forwarding).
- `hillbillydreamsinc.com` — deprecated as a workspace. Emails migrate to Cloudflare Email Routing.

**Why this consolidation matters:**
- Google Workspace seats cost money each month; two deprecated workspaces = real savings.
- One shared Google Drive at `chasepierson.tv` = one canonical doc surface.
- Cloudflare Email Routing keeps the branded `@bigmuddyinn.com` and `@hillbillydreamsinc.com` addresses working without paid Google seats.
- Tracy, Amy, Miles, Elijah all get access via shared tools (Canva, Adobe, Claude, etc.) without each needing their own separate account at every vendor.

### Storage consolidation (added 2026-04-20 PM)

**All online storage for all the businesses consolidates under `chasepierson.tv`.**

Concretely this means:
- **Google Drive** — all shared ecosystem folders live in the `chasepierson.tv` Drive (2TB on Google Ultra). No shared folders scattered across personal accounts.
- **GCS (Google Cloud Storage)** — `bmt-media-bigmuddy` bucket stays, but owned by the `chasepierson.tv` Google Cloud project (not a separate project).
- **Immich** — self-hosted photo library on the Mac mini. The canonical personal + ecosystem photo archive outside of Lightroom Creative Cloud. See Section 3.F below.
- **Any rogue Dropbox / iCloud / other storage** — audit and migrate into the Drive + GCS + Immich stack. No silo storage survives.
- **Client deliverables** — stored under a `chasepierson.tv` client folder structure, accessed via shared links rather than invite-to-edit.

One parent identity. One billing relationship for cloud storage. One place to look when something is missing.

---

## 2. Account ownership map

| Account / Domain | Role | Paid by |
|---|---|---|
| `chasepierson.tv` | **Parent Google Workspace + master identity.** Hosts the ecosystem-wide subscription stack (Google Ultra, Claude Max, Perplexity, ChatGPT API, Canva, Adobe Photography, etc.). | MBT credit card |
| `bigmuddyinn.com` | Cloudflare email routing only. No Workspace. Emails forward to chasepierson.tv inboxes. | Cloudflare ($0 for forwarding) |
| `hillbillydreamsinc.com` | Cloudflare email routing only. No Workspace. | Cloudflare ($0) |
| Studio C Video | Owns Studio-C-specific tools (Adobe full Creative Cloud, Restream.io). Paid by MBT card; used across Big Muddy brands + partner clients. | MBT credit card |
| Tuthill Design | Owns Tuthill-specific design + print tools. Tuthill's own billing. | Tuthill Design |
| Big Muddy Natchez LLC | Owns Inn-operational tools (Cloudbeds, payment processor, Twilio if needed). | Big Muddy Natchez LLC |

---

## 3. Itemized subscription table

**Classification codes** (per `ecosystem-classification-taxonomy-2026-04-20.md`): MBT-PLATFORM, INN, CPP, STUDIO-C, TUTHILL-DESIGN, TOUR, PARTNER-MKT.

### A. chasepierson.tv — ecosystem identity + AI stack

| Subscription | Plan / tier | Monthly | Users | Classification | Notes |
|---|---|---|---|---|---|
| **Google Workspace Ultra** | Ultra (per Chase) | ~$35 [verify pricing for 1 seat on Ultra] | Chase primary; team members via shared Drive | MBT-PLATFORM | Master identity, Gemini Advanced included, 2TB Drive |
| **Claude Max $125** | Max tier | $125 | Chase | MBT-PLATFORM | Advanced Claude usage + Claude Code / Agent SDK access |
| **Perplexity Pro** | Pro $20 | $20 | Chase | MBT-PLATFORM | Search + research |
| **Perplexity API** | Pay-as-you-go | ~$20–50 [estimate] | API only | MBT-PLATFORM | For automated research in scripts / agents |
| **ChatGPT API** | Pay-as-you-go, capped | Cap $50 | API only | MBT-PLATFORM | Hard monthly cap. Used for comparisons + specific tasks. |
| **Canva Teams** | Teams | ~$30 [verify] | Chase, Tracy, Amy, Miles, Elijah (5 seats) | MBT-PLATFORM | Brand templates, social graphics, print for all brands |
| **Adobe Photography Plan** | Photography (Lightroom + Photoshop) | $10 | Chase | CPP | Photo-only plan. For CPP non-RE work + Inn photography. Lightroom Creative Cloud gets cleaned up to just the curated library we use (Action Item 7c below). |
| **Bitwarden Family** | Family | ~$3 | Chase + team on shared items | MBT-PLATFORM | Password + credential vault. Canonical per CLAUDE.md. |
| **Spotify Family (6 accounts)** | Family | $17 | Chase, Amy, Tracy + 3 future team seats | MBT-PLATFORM | Personal music + Amy's Arrie Aslin listening research + in-car + home office. Six seats covers the current team with room to grow. |
| **Claude Pro — Tracy** | Pro monthly | $20 | Tracy (authenticated to tracyaldersonallen@gmail.com) | MBT-PLATFORM | Tracy's personal AI assistant. Gmail MCP + Asana MCP + Google Drive MCP connected to HER accounts. Enables her to run the Gmail subscription audit, review her own inbox, process her own tasks, and have a working conversational assistant routed through Asana. MBT pays; account is under her email. |
| **Claude Pro — Amy** | Pro monthly | $20 | Amy (authenticated to amyaldersonallen@gmail.com) | MBT-PLATFORM | Amy's personal AI assistant. Same pattern as Tracy's. Gmail + Asana + Drive MCPs on her accounts. Helps her run Blues Room show comms, Arrie Aslin logistics, podcast production prep. MBT pays; account is under her email. |
| **chasepierson.tv subtotal** | | **~$350–380/mo** | | | |

### B. Studio C Video — video production stack

| Subscription | Plan / tier | Monthly | Users | Classification | Notes |
|---|---|---|---|---|---|
| **Adobe Creative Cloud (full)** | All Apps | ~$60 | Elijah (primary), Chase (secondary) | STUDIO-C | Premiere, After Effects, Audition, Photoshop, Lightroom — full suite for video production |
| **Restream.io** | Standard or higher [verify tier + price] | ~$20–49 | Studio C workspace; used across all brand channels | STUDIO-C | **MIGRATION: currently on Big Muddy account. Cancel there + start a new account on Studio C.** Paid by MBT card; distributed to all brand streaming needs. |
| **CapCut Team (3 seats)** | Team / Business tier | ~$45–60 [verify exact tier + price] | **3 named users: Chase · Amy · Elijah (Studio C)** — each with their own login, one billing account | STUDIO-C | Quick-cut video editing for social + Arrie Aslin content + Inn/Magazine video + Studio C productions. Each user gets an individual seat under one team account so they can collaborate without sharing logins. **MIGRATION: existing CapCut Pro is billed through Chase's personal Apple ID (chasethis@gmail) — cancel that entirely. Create new CapCut Team account under business email (capcut@chasepierson.tv or me@chasepierson.tv), add 3 seats for Chase/Amy/Elijah, pay via MBT card.** |
| **Studio C subtotal** | | **~$125–170/mo** | | | |

### C. MBT Platform Infrastructure — the tech backbone

| Subscription | Plan / tier | Monthly | Users | Classification | Notes |
|---|---|---|---|---|---|
| **Vercel** | Pro | $20/user [verify seat count] | Chase, maybe Elijah as developer | MBT-PLATFORM | Hosting for all 14 domains, serverless, preview deploys |
| **Sanity CMS** | Team or Growth [verify] | ~$15–99 | Tracy, Amy, Chase, potentially Miles | MBT-PLATFORM | CMS for Magazine + brand sites. Cost depends on API requests + users. |
| **Neon Postgres** | Launch or Scale [verify] | ~$19 | DB-layer | MBT-PLATFORM | Primary Postgres. Platform DB for commerce, booking, events, etc. |
| **Cloudflare** | Pro (maybe) [verify] | ~$20 or free | DNS + email routing for all domains | MBT-PLATFORM | Email routing for deprecated Workspace domains; DNS for all 14. Also the fallback Object Storage (R2) if we ever migrate off GCS. |
| **Resend** | Pro | $20 | Platform | MBT-PLATFORM | Transactional email across all brand domains |
| **ElevenLabs** | Pay-per-use | ~$25 [estimate] | Platform | MBT-PLATFORM | Voice synthesis for Radio + audio content |
| **GitHub Team or Pro** | Team | ~$4/user × 5 users = $20 [verify] | Chase, Elijah, Miles, possibly Tracy + Amy as viewers | MBT-PLATFORM | Private repos for hillbilly-dreams + measurably-better-things |
| **Buzzsprout** | Standard | $18 | Amy (producer), Chase (admin) | MBT-PLATFORM | Podcast hosting for Big Muddy Radio + Arrie Aslin show |
| **Attio CRM** | Free tier | $0 | Tracy (primary), Chase | MBT-PLATFORM | Free tier for Y1 per the 90-day plan |
| **Stripe** | Transaction fees only | $0 fixed | Platform | MBT-PLATFORM | 2.9% + $0.30 per transaction, no monthly subscription |
| **MBT Platform (non-GCP) subtotal** | | **~$140–230/mo** | | | |

#### C.1 Google Cloud services (all under `chasepierson.tv` Google Cloud project)

One Google Cloud project owns every GCP resource for the ecosystem — billing rolls up cleanly under the parent identity.

| Service | Current usage | Monthly | Classification | Notes |
|---|---|---|---|---|
| **Vertex AI — Gemini 2.5 Pro/Flash** | Primary reasoning + generation model | ~$30–60 [estimate, varies by volume] | MBT-PLATFORM | Content wizard, first-draft Magazine articles, SEO metadata, social captions. Runs via `lib/ai-models.ts` primary path. |
| **Vertex AI — Imagen 3** | Image generation | ~$10–20 [estimate] | MBT-PLATFORM | Hero images, placeholder art, wizard-generated visuals. |
| **Cloud Storage (GCS bucket `bmt-media-bigmuddy`)** | 229+ curated Chase photos + growing | ~$5–10 | MBT-PLATFORM | Canonical photo library. Storage + egress. |
| **Cloud DNS** | Not currently used (Cloudflare owns DNS) | $0 | — | Skip; Cloudflare is the DNS layer |
| **Cloud Run / Cloud Functions** | None currently; Vercel handles compute | $0 | — | Skip unless we migrate some agent/worker off Vercel |
| **Cloud Build** | None currently | $0 | — | GitHub Actions handles CI |
| **Artifact Registry** | None currently | $0 | — | Skip |
| **Cloud Logging + Monitoring** | Light usage when Vertex AI runs | ~$5 [estimate] | MBT-PLATFORM | Basic observability on GCP-side services |
| **Cloud TTS Journey** | Fallback if ElevenLabs unavailable | ~$0–5 | MBT-PLATFORM | Backup audio synthesis. Minimal usage. |
| **Maps API** | Possible for Directory geo features (not active yet) | $0 unless activated | MBT-PLATFORM | TBD |
| **BigQuery** | Not currently used | $0 | — | Skip until analytics justifies it |
| **Firebase** | Not currently used | $0 | — | Skip; Neon is the DB |
| **GCP services subtotal** | | **~$50–100/mo** | | |

#### C.2 Self-hosted services (Mac mini, $0 marginal cost)

| Service | Use | Monthly | Notes |
|---|---|---|---|
| **Immich** | Photo library canonical self-hosted (beyond Lightroom CC) | $0 | Already running on Mac mini per CLAUDE.md. API key provisioned. The master long-term photo archive. |
| **Postiz** | Social post scheduling | $0 | Self-hosted on Mac mini (:4007). Social scheduling for all brand channels. |
| **OpenBroadcaster + Icecast** | Broadcast stack for Big Muddy Radio | $0 | Mac mini (:8080, :8010). Free because we host it. |
| **Plex** | Media server | $0 | Mac mini (:32400) |
| **Open Notebook** | AI notebook for research + context | $0 | Mac mini (:5055) |
| **Self-hosted subtotal** | | **$0** | Mac mini hosting is CapEx already paid; marginal cost zero. |

**MBT Platform total (C.1 + C.2 + main C table) = ~$190–330/mo**

### C.3 Big Muddy Records label operations (added 2026-04-20)

All under Big Muddy Records brand; paid via MBT credit card; classified `TOUR` in the 8-code taxonomy (Records currently bundled with Touring until Records has its own entity + P&L).

| Subscription | Plan / tier | Monthly | Users | Classification | Notes |
|---|---|---|---|---|---|
| **DistroKid Label tier** | Label ($139/yr) | ~$12 | Big Muddy Records account; handles all signed + distributed artists | TOUR (records sub-line) | Distributes to Spotify, Apple Music, Tidal, Amazon Music, YouTube Music, Deezer, etc. Handles mechanical licensing through Mechanical Licensing Collective (MLC). Unlimited artists under one account. Current roster: **Chase Pierson, Mechanical Bull, Kate Squire, + future signings.** |
| **SoundCloud For Artists Pro Unlimited** | Pro Unlimited ($99/yr or $12/mo) | $12 | Big Muddy Records main profile + individual artist profiles | TOUR (records sub-line) | Big Muddy Records' SoundCloud presence + per-artist profiles. Unlimited uploads, monetization, advanced analytics. SoundCloud matches the blues/indie corridor discovery thesis. |
| **Songtrust** (optional, per-artist decision) | Annual | ~$10/mo ($100/yr one-time per artist) | Each artist who writes original material + wants publishing royalty collection | TOUR (records sub-line) | Publishing royalty collection (mechanical + sync + performance) globally. Only activate for artists writing originals who want global publishing royalty admin. Decide per-artist. |
| **Records subtotal** | | **~$24/mo** (+$10/mo per Songtrust artist if activated) | | | |

---

### D. Big Muddy Inn — Inn-operational tools (NOT MBT stack)

| Subscription | Plan / tier | Monthly | Users | Classification | Notes |
|---|---|---|---|---|---|
| **Cloudbeds** | PMS, current plan [verify] | ~$300–500 | Amy primary, Tracy, Chase (admin) | INN | Property management system. Inn-only. |
| **Twilio (SMS for booking flow)** | Pay-per-use | ~$10 [verify if used] | Platform | INN | SMS notifications to guests |
| **Inn subtotal** | | **~$310–510/mo** | | | Rolled into the $125k Inn cost basis, NOT into MBT platform stack |

### E. Partner studios — their own stacks

| Subscription | Who | Classification | Notes |
|---|---|---|---|
| **Tuthill Design tools** (their Adobe, print vendors, etc.) | Tuthill Design | TUTHILL-DESIGN | Tuthill pays from their own account. Not on MBT card. |

---

## 4. Monthly tally — reconciled against the $1,000/mo hard cap

**"MBT software + AI subscription stack" = Sections A + B + C (including C.1 GCP + C.2 self-hosted) combined.**

| Bucket | Monthly range |
|---|---|
| A. chasepierson.tv identity + AI stack (incl. Spotify Family + Claude Pro × 2 for Tracy & Amy) | ~$350–380 |
| B. Studio C production stack (incl. CapCut Team 3 seats) | ~$125–170 |
| C. MBT platform infrastructure (non-GCP) | ~$140–230 |
| C.1 Google Cloud services | ~$50–100 |
| C.2 Self-hosted services (Mac mini) | $0 |
| C.3 Big Muddy Records label ops (DistroKid Label + SoundCloud Pro) | ~$24 |
| **Total MBT-paid subscription stack** | **~$689–904/mo** |

**The hard cap is $1,000/mo.** Actual estimated at **~$690–905/mo** (after adding CapCut Team 3 seats + Spotify Family + Big Muddy Records label ops + Claude Pro × 2 for Tracy & Amy), which leaves **~$95–310/mo of headroom** for:
- ChatGPT API spikes above the $50 cap (if we lift the cap)
- Perplexity API usage variance
- Vertex AI generation variance (Gemini + Imagen)
- Planned additions in Section 4.5 below (email marketing, social scheduler if Postiz doesn't scale, etc.)
- Unplanned mid-year tools

**If cumulative actuals trend toward the cap**, we either (a) cancel a tool before adding new, or (b) upgrade a revenue line to justify the spend. No exceptions without Chase sign-off.

If actual spend stays at $600–700/mo through Q2, the $1k break-even line stays as a prudent buffer. Revisit downward in Q3 only if actuals run consistently under $750/mo for 90 days.

**Not counted in the MBT stack:**
- Section D (Inn tools like Cloudbeds) — rolled into the $125k Inn cost basis in the break-even math
- Section E (Tuthill own stack) — not on MBT books

---

## 4.5 Services we might need to add (within the $1k cap)

Ranked by priority. "Budget impact" is per-month. Each addition counts against the $1k hard cap; if we add one, total spend goes up.

| Priority | Service | Why | Budget impact | Decision criteria |
|---|---|---|---|---|
| **P1 — High** | **Klaviyo-class email marketing** (e.g., Loops, Klaviyo, Beehiiv, ConvertKit) | Past-guest email + new-booking welcome sequences. Named in the channel-yield strategy as one of the highest-ROI yield investments in hospitality. | ~$50–100/mo at our list size | Ship after the first 50 past-guest contacts are in Attio |
| **P1 — High** | **Meeting recording + transcription** (e.g., Otter.ai, Fireflies, Granola, Zoom's native) | So partner meetings like today's produce a transcript we can fold into the canonical docs immediately. Chase already asked for recording workflow earlier today. | ~$10–30/mo | Before next partner meeting |
| **P2 — Medium** | **Podcasting service upgrade** (if Buzzsprout Standard at $18/mo hits limits) | Buzzsprout Standard covers 3 hours of upload/month. If Arrie Aslin + Big Muddy Radio produce more than that regularly, upgrade to $24/mo (6 hrs) or $34/mo (12 hrs). | +$6–16/mo delta | Q3, after we see actual episode cadence |
| **P2 — Medium** | **Social scheduler upgrade / replacement** (if self-hosted Postiz doesn't scale) | Postiz is free because we self-host. If it breaks or doesn't support a platform we need (TikTok, LinkedIn Company pages), a hosted alternative like Buffer ($15/mo), Later ($25/mo), or Hootsuite ($99/mo) may be needed. | $15–99/mo if we switch | Verify Postiz coverage in Week 1 of 90-day plan |
| **P3 — Low** | **Figma** | Design collaboration with Tuthill. Tuthill may already have a seat. | $15/mo per seat | Only if Tuthill requires it for handoffs |
| **P3 — Low** | **Zoom / Loom paid tier** | If Google Meet (via Workspace Ultra) doesn't cover our meeting recording + sharing needs. Loom is $8/mo for quick async video messages. | $8–16/mo | Defer until actual need |
| **P3 — Low** | **Calendly paid** | If calendar sharing via Google Workspace isn't enough for biz dev scheduling. Free tier may suffice. | $10–15/mo | Start on free tier |
| **P3 — Low** | **Descript** | Video + podcast editing with transcript-based cuts. Nice-to-have, not yet required. | $24/mo | Defer unless podcast cadence justifies |
| **P4 — Skip unless specific need** | Dropbox, iCloud+ for ecosystem use | We're consolidating to Drive + GCS + Immich. These stay personal-only. | $0 from MBT | Skip |
| **P4 — Skip** | Airtable / Notion for ecosystem use | Sanity + Drive cover content; Asana covers tasks. | $0 | Skip unless a specific need emerges |
| **P4 — Skip** | Slack / Discord | iMessage + Asana + email + Drive comments cover internal comms for 3–5 people. | $0 | Add only if team grows past ~8 people |

**Rough estimate if we add the P1s immediately:** $60–130/mo new spend → total goes from $560–760 to $620–890 → still under the $1k cap.

---

## 5. Team access matrix

Who gets access to what (post-consolidation):

| Tool | Chase | Tracy | Amy | Miles | Elijah |
|---|---|---|---|---|---|
| Google Workspace (chasepierson.tv) | Admin | Shared Drive + forwarded email | Shared Drive + forwarded email | Shared Drive + forwarded email | Shared Drive + forwarded email |
| Claude Max | Primary | Ask Chase for shared session | Ask Chase | Ask Chase | Ask Chase |
| Perplexity Pro + API | Primary | Ask Chase | Ask Chase | Ask Chase | Ask Chase |
| ChatGPT API | Platform-only (scripts) | — | — | — | — |
| Canva Teams | ✓ | ✓ | ✓ | ✓ | ✓ |
| Adobe Photography (photo) | ✓ | — | — | — | — |
| Adobe Creative Cloud (full) | ✓ secondary | — | — | — | ✓ primary |
| Restream.io | Admin | — | Stream host | — | Producer |
| Vercel | Admin | Viewer | Viewer | Viewer | Developer |
| Sanity CMS | Admin | Editor | Editor | Maybe Editor | Viewer |
| GitHub (both repos) | Admin | Viewer (optional) | Viewer (optional) | Viewer | Developer |
| Cloudbeds | Admin | Admin | Admin (primary) | — | Tier-1 support |
| Attio CRM | Admin | Primary | Viewer | — | — |
| Buzzsprout | Admin | — | Producer | — | — |
| Immich (self-hosted photo library on Mac mini) | Admin | Viewer | Viewer | Viewer | Admin (Mac mini operator) |
| Google Cloud project (chasepierson.tv) | Admin / billing | — | — | — | Developer (read/deploy) |
| Postiz (self-hosted social scheduler) | Admin | Editor | Editor | Editor (brand kit) | Editor |
| CapCut Team (3 seats) | Admin / seat 1 | Seat 3 | — | — | Seat 2 |
| Spotify Family (6 accounts) | Account owner | Member | Member | (future) | (future) |
| DistroKid Label (Big Muddy Records) | Admin | — | Artist (Arrie Aslin) | — | Producer access |
| SoundCloud For Artists Pro | Admin | — | Artist (Arrie Aslin) | — | Producer access |
| Claude Pro — Tracy's personal agent | — | Sole user (her email) | — | — | — |
| Claude Pro — Amy's personal agent | — | — | Sole user (her email) | — | — |
| Claude Max — Chase | Sole user | — | — | — | — |

---

## 6. Action items

### 6a. Google Workspace consolidation

| Item | Owner | By when |
|---|---|---|
| Cancel Big Muddy Inn Google Workspace subscription (after email export + Cloudflare routing verified) | Chase | Before May 15 |
| Cancel Hillbilly Dreams Google Workspace subscription (same process) | Chase | Before May 15 |
| Set up Cloudflare Email Routing for `@bigmuddyinn.com` → forwards to chasepierson.tv inbox(es) | Chase | Before cancellation above |
| Set up Cloudflare Email Routing for `@hillbillydreamsinc.com` | Chase | Before cancellation above |
| Confirm Google Ultra plan active on chasepierson.tv (it's the parent — must stay up-to-date) | Chase | Now |
| Share the Chasepierson.tv Google Drive "Big Muddy Meeting Packet" folder with Tracy + Amy | Chase | Week 1 (per their Asana tasks) |

### 6b. Billing card routing

| Item | Owner | By when |
|---|---|---|
| Move Claude Max, Perplexity (Pro + API), ChatGPT API, Canva Teams, Adobe Photography, Adobe CC, Restream, Vercel, Sanity, Neon, Cloudflare, Resend, ElevenLabs, Vertex AI, GitHub, Buzzsprout — all onto MBT credit card | Chase | Next billing cycle for each |
| Confirm Cloudbeds stays on the Inn's billing (Big Muddy Natchez LLC card) | Chase + Tracy | Verify next statement |
| Confirm Tuthill keeps paying their own tools | Miles | Conversation |

### 6c. Restream migration

| Item | Owner | By when |
|---|---|---|
| Cancel existing Restream.io account (currently under Big Muddy) | Chase | This week |
| Create new Restream.io account under Studio C Video; MBT card for billing | Chase + Elijah | Same week |
| Re-add brand streaming destinations (YouTube, Facebook, etc. for all Big Muddy brand channels) | Elijah | Week 1 of new account |

### 6c-bis. CapCut Team migration

| Item | Owner | By when |
|---|---|---|
| Cancel existing CapCut Pro subscription on Chase's personal Apple ID (chasethis@gmail) | Chase | This week |
| Verify CapCut Team / Business tier pricing for 3 seats (CapCut Commerce Pro or equivalent) | Chase | Before creating new account |
| Create new CapCut Team account under business email (capcut@chasepierson.tv or me@chasepierson.tv) | Chase | This week |
| Add 3 named seats: Chase, Amy, Elijah (Studio C) | Chase | Same session |
| Pay via MBT credit card | Chase | Same session |
| Each user gets their own login + can collaborate on shared projects | Chase | Sign-up flow |

### 6d. Adobe split

| Item | Owner | By when |
|---|---|---|
| Confirm chasepierson.tv Adobe account is Photography plan only (Lightroom + Photoshop) | Chase | Before shoot-day work resumes |
| Confirm Studio C Adobe account is full Creative Cloud | Elijah | Already active? Verify |
| Lightroom Creative Cloud catalog cleanup — prune to just the photos we want, organized the way we want | Chase | Next shoot-prep window |
| Anything else in Lightroom becomes an "image" (archived / downgraded), not a managed asset | Chase | Same session |

### 6e. Canva team onboarding

| Item | Owner | By when |
|---|---|---|
| Create Canva Teams workspace on chasepierson.tv | Chase | This week |
| Invite Tracy, Amy, Miles, Elijah | Chase | Same |
| Upload Big Muddy + CPP + Tuthill brand kits (colors, fonts, logos) | Chase + Tuthill for Tuthill-side kit | Within 2 weeks |

### 6f. Storage consolidation under chasepierson.tv

| Item | Owner | By when |
|---|---|---|
| Confirm Google Ultra 2TB Drive is provisioned and empty-shared | Chase | This week |
| Audit Tracy's, Amy's, Chase's, Miles's, Elijah's personal Drives for ecosystem files that need to migrate | Chase (ask each) | Before May 31 |
| Migrate all ecosystem-owned files into `chasepierson.tv` shared Drive | Respective owners | Before May 31 |
| Audit for rogue Dropbox, iCloud Drive, OneDrive storage of ecosystem files; migrate to Drive + GCS + Immich | Chase + each owner | Before May 31 |
| Verify GCS bucket `bmt-media-bigmuddy` billing rolls up under chasepierson.tv Google Cloud project | Chase | This week |
| Confirm Immich on Mac mini is the canonical photo archive, Lightroom CC is the curated working set | Chase | Next Lightroom cleanup session |

### 6g. Google Cloud project consolidation

| Item | Owner | By when |
|---|---|---|
| Confirm all ecosystem GCP resources (Vertex AI, GCS, Cloud Logging, etc.) are in ONE Google Cloud project owned by chasepierson.tv | Chase | This week |
| Set up billing alerts on that project at $50, $75, and $100/mo thresholds | Chase | Before first billing cycle rolls |
| Verify no duplicate GCP projects exist under deprecated workspaces (bigmuddyinn.com, hillbillydreamsinc.com) that need consolidation or shutdown | Chase | Before Workspace cancellations above |

### 6h. Planned additions (within the $1k cap)

| Item | Owner | By when |
|---|---|---|
| Sign up for Spotify Family under chasepierson.tv account; invite Amy + Tracy | Chase | This week |
| Add Amy + Tracy to Chase's existing personal YouTube Premium Family (stays on Chase's personal billing for now; migrate to MBT when the "nothing personal" sweep completes) | Chase | This week |
| Create Big Muddy Records DistroKid Label account; add first three artists (Chase Pierson, Mechanical Bull, Kate Squire) | Chase + Amy | Week 1 |
| Create Big Muddy Records SoundCloud For Artists Pro account; add artist profiles | Chase + Amy | Week 1 |
| Decide per-artist whether to activate Songtrust for publishing royalty collection | Chase + each artist | Rolling |
| Pick + activate Klaviyo-class email marketing platform (Loops is probably cheapest for our volume) | Chase + Tracy | Before end of Week 3 of the 90-day plan |
| Pick + activate meeting recording + transcription (Otter or Fireflies) | Chase | Before next partner meeting |
| Verify Postiz coverage of needed social platforms (IG, TikTok, FB, LinkedIn Company, X, YouTube) | Elijah (as social scheduler operator) | Week 1 |
| If Postiz gaps exist, pick a hosted replacement (Buffer / Later) within budget | Chase | Week 2 |

### 6h-def. Deferred (on the backlog, not adding now)

| Item | Reason for deferral |
|---|---|
| OpenPhone per-brand numbers | Revisit when the Hospitality Coordinator comes online (May 31) — real operational need will crystallize then |
| E-signature (Dropbox Sign / DocuSign) | Wait until the first wedding contract, Vicki engagement, or partner agreement genuinely needs e-sign. Until then, email confirmations and PDF attachments cover it. |
| Backblaze computer backup | GCS bucket already serves the backup role for ecosystem photo library. Chase's personal workstation files are separate — revisit if photo catalog risk surfaces |
| Premium credit cards (Amex Plat, Chase Sapphire Reserve) | Only justified if business travel volume grows past ~6 trips/yr |
| Editorial subscriptions (NYT, Atlantic, Oxford American, etc.) | Nice-to-haves. Add individually if a specific research need arises. |
| Commercial music license for Inn public spaces (Soundtrack Your Brand, Cloud Cover) | Risk is real but enforcement unlikely at our scale; revisit if we host a sponsored event where licensing matters |
| Stock music (Epidemic Sound, Artlist) | Activate when Studio C production volume justifies (probably Q3) |
| Photo Mechanic Plus | Nice workflow lift for CPP, not essential; add if Chase's shoot volume makes Lightroom culling a bottleneck |

### 6i. Reconcile the $1k/mo hard cap after 60 days

| Item | Owner | By when |
|---|---|---|
| Pull actual billing totals across MBT card + GCP billing for May + June | Chase / accountant | End of June 2026 |
| Compare actuals to the $1k/mo cap; cancel underutilized tools if spend is creeping up | Chase | Q3 review |
| If actuals run consistently under $750/mo for 90 days, consider revising the break-even floor downward | Chase + accountant | Q3 2026 |

---

## 7. Open questions

1. **Google Workspace Ultra exact price per seat?** $35/mo is an estimate; verify. Affects Section A subtotal.
2. **Sanity CMS current plan?** Free, Team ($15/mo), Growth ($99/mo)? Affects Section C subtotal.
3. **Cloudbeds current plan / monthly cost?** Rolls into the $125k Inn cost basis; confirm.
4. **Vertex AI actual burn rate?** $50–100/mo estimate for Gemini + Imagen + Cloud Logging combined. Pull the first 30 days of GCP billing to calibrate.
5. **Does Tuthill want to come onto the MBT card** for any of their tools? Default: keep own billing to preserve entity separation.
6. **Any Amy-specific subscriptions** (DistroKid, TuneCore, etc. for her music distribution as Arrie Aslin)? If yes, does MBT cover or does Amy?
7. **Postiz coverage** — does it support all the platforms we need (IG + IG Stories + TikTok + FB + LinkedIn Company + X + YouTube)? Elijah verifies Week 1.
8. **Klaviyo-class email pick** — Loops vs. Klaviyo vs. ConvertKit vs. Beehiiv. Simplest + cheapest that handles past-guest flows, welcome series, win-back. Decision before Week 3.
9. **Meeting recording tool pick** — Otter vs. Fireflies vs. Granola vs. Zoom's native. Need this before the next partner meeting so transcripts flow into canonical doc updates automatically.

---

*End of subscriptions doc.*
