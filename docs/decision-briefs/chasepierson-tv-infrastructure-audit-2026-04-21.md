# chasepierson.tv Infrastructure Audit — What's There + What We Actually Need

**Date:** 2026-04-21
**Author:** Cos (for Chase)
**Purpose:** Itemize every piece of infrastructure sitting under `me@chasepierson.tv` Google identity, tag each one with current status, forward-going need, and level of effort to migrate if we choose to. Lets Chase selectively pick what moves vs what stays vs what gets cut.

**Cloudflare domain management stays on chasepierson.tv** — Chase's decision, no impact, not in scope for migration.

---

## Level-of-effort legend

| Tag | Meaning | Time estimate |
|---|---|---|
| 🟢 **TRIVIAL** | Email-change + re-auth | 5–15 min |
| 🟡 **SIMPLE** | Email-change + re-auth + update dependent systems | 30–60 min |
| 🟠 **MODERATE** | Multi-step migration with some verification | 1–3 hours |
| 🔴 **COMPLEX** | Requires data migration, backup + restore, or external support | Half day to full day |
| 💤 **AUDIT FIRST** | Can't estimate until we know what it does |
| ✂️ **CUT** | Retire entirely, no migration needed |

---

## 1. Core Google infrastructure on chasepierson.tv

### 1.1 Google Workspace (Gmail + Drive + Calendar + Docs + Meet)

**Current state:** Chase's personal Google Workspace at `chasepierson.tv`. 2 TB Drive Ultra. One seat (`me@chasepierson.tv`) plus email aliases (`bigmuddy@chasepierson.tv`, `team@chasepierson.tv`, etc. — per Bitwarden inventory).

**Need going forward?**
- **Gmail** — YES (primary email)
- **Drive** — YES (shared files, partner access, collaboration)
- **Calendar** — YES (shared calendars for ritual cadence)
- **Docs/Sheets** — YES (operational docs)

**Bloat audit:** The 2 TB Drive almost certainly has significant personal + archival content that's NOT MBT business. An audit would likely find that ~80% is personal/archival and ~20% is active business. The "slimmed-down stack" question on Workspace is: how much of the Drive do we actually need to move, vs what stays with Chase personal, vs what gets archived?

**Level of effort if migrate to MBT Workspace:**
- Register new domain: 🟢 TRIVIAL (~15 min Cloudflare Registrar + verify)
- Buy Workspace + add 5 seats: 🟢 TRIVIAL (~15 min)
- Gmail data migration (Google's Data Migration Service): 🟡 SIMPLE (~30 min to configure + overnight sync; wait time not work time)
- Drive migration (Google's transfer tool): 🟠 MODERATE (~1–2 hours, depends on Drive size)
- Calendar migration: 🟢 TRIVIAL (~15 min)
- Email forwarding overlap config: 🟢 TRIVIAL (~15 min)
- Update "from" addresses in all clients + notify key contacts: 🟡 SIMPLE (~45 min)

**Total if fully migrate: ~3–4 hours of active work + overnight sync wait**

**Decision needed:** Migrate fully? Keep chasepierson.tv Workspace as CPP-only + alias? Just move the business files and keep personal on chasepierson.tv?

---

### 1.2 Google Cloud Project `bigmuddy-ff651`

**Current state:** GCP project owned by `chasepierson.tv` Google Cloud organization. Hosts:

| Resource | What it does | Status | Monthly cost |
|---|---|---|---|
| **GCS bucket `bmt-media-bigmuddy`** | Canonical photo library. 229+ approved Chase photos + growing. Every brand page loads from here via `/approved/` URLs. | 🔥 **CRITICAL** | ~$5–10 |
| **Vertex AI — Gemini 2.5 Pro/Flash** | Primary reasoning + generation model. Powers content wizard, Magazine drafts, SEO metadata, social captions. Runs via `apps/web/lib/ai-models.ts`. | ✅ ACTIVE | ~$30–60 |
| **Vertex AI — Imagen 3** | Image generation. Hero images, placeholder art, wizard-generated visuals. | ✅ ACTIVE (occasional) | ~$10–20 |
| **Cloud SQL `sovereign-db-primary`** | Postgres 16 + pgvector 0.8.1. IP 34.31.180.74. Database `hillbilly_sovereign`. **Purpose is unclear.** | 💤 AUDIT FIRST | Unknown (possibly $25–50) |
| **OAuth client** | For Next.js Google sign-in. Bitwarden `Google OAuth — HDI`. | ✅ ACTIVE | $0 |
| **Cloud Logging** | Light observability on Vertex runs | ✅ LIGHT | ~$5 |
| **Cloud TTS Journey** | Fallback TTS if ElevenLabs unavailable | ⚠️ FALLBACK | ~$0–5 |
| Cloud DNS, Cloud Run, Cloud Build, Artifact Registry, Maps API, BigQuery, Firebase | **Not used** — placeholder only | ✂️ NONE | $0 |

**Level of effort to migrate:**

- **GCS bucket `bmt-media-bigmuddy`:**
  - Option A: Transfer project ownership to new MBT GCP organization (Resource Manager `projects.transfer`) — 🟠 MODERATE (1–2 hours, zero-copy)
  - Option B: New project + `gsutil rsync` the bucket — 🔴 COMPLEX (half day, risk of URL breakage)
  - **Recommended: Option A** — bucket name stays identical, URLs don't change.
- **Vertex AI usage:**
  - Follows the project. If project transfers (Option A above), Vertex comes with it for free. 🟢 TRIVIAL (0 minutes).
- **Cloud SQL `sovereign-db-primary`:**
  - First: 💤 AUDIT FIRST. Is anything using this? If no — ✂️ CUT.
  - If yes: dump + restore to new Cloud SQL or consolidate into Neon Postgres. 🔴 COMPLEX (half day + downtime).
- **OAuth client:**
  - Follows the project. 🟢 TRIVIAL. (Users may need to re-consent if we change the OAuth consent-screen configuration.)
- **Cloud TTS Journey + Cloud Logging:**
  - Follow the project. 🟢 TRIVIAL.

**Total if migrate the whole GCP project via Option A: ~2–3 hours + Cloud SQL audit**

**Decision needed:** (a) Transfer project to MBT? (b) What is Cloud SQL `sovereign-db-primary` actually doing? (c) Is it worth keeping Imagen + TTS + Maps API slots in the project if we're not using them?

---

## 2. Third-party SaaS authenticated under chasepierson.tv

### 2.1 Active / keep going forward (must decide: migrate or stay)

| # | Service | Purpose | Auth method | Migrate effort | If stay: risk |
|---|---|---|---|---|---|
| 1 | **Vercel (Pro)** | Hosts all 14 domain Next.js app | Team on chasepierson.tv | 🟠 MODERATE — create new MBT team, transfer all domain projects (preserve Vercel project IDs), re-link Cloudflare + env vars (~1–2 hours) | Low — tied to Chase personal |
| 2 | **GitHub org `CPTV27`** | `hillbilly-dreams` + `measurably-better-things` repos | Chase personal GitHub account | 🟡 SIMPLE — transfer org ownership to MBT-admin account OR rename org OR create new MBT org + transfer repos (~30–45 min) | Medium — if Chase leaves, repos in limbo |
| 3 | **Neon Postgres (HDI Production)** | Primary app DB | Team with Chase as admin | 🟢 TRIVIAL — invite MBT admin + transfer project ownership (~15 min) | Low |
| 4 | **Sanity CMS** | 13 schemas for Magazine + brands | Chase project owner | 🟢 TRIVIAL — invite MBT admin + transfer project (~15 min) | Low |
| 5 | **Resend** | Transactional email across all brand domains | Account on chasepierson.tv | 🟡 SIMPLE — new MBT account, re-verify all 8–10 sending domains, update `RESEND_API_KEY` in Vercel env (~45 min) | Low |
| 6 | **Stripe** | Payment processing | Account under Chase personal | 🟠 MODERATE — ownership transfer via Stripe support OR create new MBT account + migrate webhook endpoints (~1 hour + support-ticket wait) | Medium — payment processing critical |
| 7 | **Hetzner (CCX23 bigmuddy-services)** | Immich + Caddy | Chase account | 🟢 TRIVIAL — change account email on Hetzner Cloud console (~10 min) | Low |
| 8 | **DigitalOcean (bigmuddy-radio droplet)** | AzuraCast radio stream | Chase account | 🟢 TRIVIAL — change account email (~10 min) | Low |
| 9 | **Buzzsprout** | Podcast hosting | Chase account | 🟢 TRIVIAL — change account email (~5 min) | None |
| 10 | **Attio CRM** | Tracy's CRM (free tier) | Chase-created workspace | 🟢 TRIVIAL — invite Tracy as admin + change workspace owner (~15 min) | None |
| 11 | **Cloudflare DNS** | 14 domains + email routing | Chase account | **N/A — STAYS on chasepierson.tv per Chase's decision** | N/A |
| 12 | **Bitwarden** | 36-item credential vault | Chase personal | 🟡 SIMPLE — change account email + add Tracy as admin seat (~30 min) | High — single admin risk |
| 13 | **Canva Team** | 5-seat brand asset workspace | Under chasepierson.tv billing | 🟡 SIMPLE — new MBT workspace, re-upload brand kits, re-invite users (~45 min) | Low |
| 14 | **Sentry** | Error tracking, chasepiersontv org | Chase account | 🟢 TRIVIAL — transfer org (~15 min) | Low |
| 15 | **Anthropic API key** | Claude usage for Cos + platform | API key | 🟢 TRIVIAL — rotate key under MBT billing (~10 min) | Low |
| 16 | **Perplexity API key** | Research agent | API key | 🟢 TRIVIAL — rotate key under MBT billing (~10 min) | Low |
| 17 | **Meta App (Deep South Directory FB OAuth)** | FB publishing for DSD | Chase developer account | 🟡 SIMPLE — transfer developer app ownership (~30 min) | Low |
| 18 | **Apple Developer / Apple Business Manager** | If active | Chase personal Apple ID | 💤 AUDIT FIRST — may not even be active | Unknown |

**Subtotal if migrate all:** ~7–9 hours of active work + some propagation + support-ticket waits.

### 2.2 Ambiguous / audit first

| # | Service | What Bitwarden says | Likely action |
|---|---|---|---|
| 1 | **`Loopback (chase@farleypierson.com)`** | Unknown — flagged in canonical infra doc | 💤 AUDIT → probably ✂️ CUT |
| 2 | **`Developer Knowledge API`** | Unknown | 💤 AUDIT → probably ✂️ CUT |
| 3 | **`gmail (bigmuddy@chasepierson.tv)`** | Automated email account — purpose unclear | 💤 AUDIT → may consolidate into new MBT alias |
| 4 | **`mbt-seed-writer`** | Unknown writer service | 💤 AUDIT → likely keep if it seeds Sanity data |
| 5 | **`Open router API`** | Multi-provider AI gateway | 💤 AUDIT → may be redundant with direct Anthropic + Gemini keys |
| 6 | **`Tinyfish.ai`** | Web automation | 💤 AUDIT → keep only if we have an active automation workflow |
| 7 | **`OBS-WebSocket`** | OBS Studio remote control | 💤 AUDIT → may be Patch-Broadcast agent related |
| 8 | **`SIRI_API_KEY (Delta Dawn Voice)`** | Siri voice endpoint for Delta Dawn | Keep if Delta Dawn Siri is in active use |
| 9 | **`Gemini API Key (ChasePierson.tv)`** + **`Gemini API Key (Hillbilly Dreams)`** | Two keys — one is legacy | 💤 AUDIT → keep 1, retire 1 |
| 10 | **`Cloudflare API Token (D1 Agent Desk)`** + **`Cloudflare API Token (Huck)`** | Two tokens — purposes overlapping? | 💤 AUDIT → consolidate if possible |
| 11 | **GChat webhooks: Chuck, Huck, Ledger** | Purpose undocumented per canonical doc | 💤 AUDIT → probably keep Huck + Ledger, audit Chuck |

**Audit effort:** ~1 hour to open each in Bitwarden + run `curl` / UI test to see what's live.

### 2.3 Services NOT on chasepierson.tv identity (no migration needed)

For reference — these are already elsewhere:

| Service | Where |
|---|---|
| Stripe for specific testing accounts | Possibly separate — verify |
| ElevenLabs | API key-based, not Google-auth |
| Cloudbeds | Delta Dawn API key, separate |
| Claude Pro (Tracy + Amy) | Their personal Gmails, already separate |

---

## 3. The "slimmed-down stack" — what do we ACTUALLY need?

Based on the canonical subscriptions doc + actual usage patterns, here's the minimum stack going forward. Everything NOT on this list is bloat we should consider cutting.

### Must-haves (non-negotiable, keep + migrate or cut-and-replace)

1. **Google Workspace** — for the team (5 seats × $14 = $70/mo)
2. **Vercel Pro** — hosts all brand sites ($20/mo)
3. **GitHub** — code source of truth (~$4–20/mo)
4. **Neon Postgres** — app DB (~$19/mo)
5. **Sanity CMS** — content (~$15–99/mo)
6. **GCP project (Vertex AI + GCS bucket)** — photo library + AI (~$50–100/mo)
7. **Cloudflare** — DNS (free tier works; Pro $20/mo)
8. **Resend** — transactional email ($20/mo)
9. **Stripe** — payments (transaction fees only, no subscription)
10. **Hetzner CCX23** — Immich photo archive ($40/mo)
11. **DigitalOcean droplet** — AzuraCast radio stream
12. **Bitwarden** — credential vault
13. **Claude Pro × 2** (Tracy + Amy already have these)
14. **Anthropic API** — Claude usage for platform
15. **Vertex AI (Gemini) budget** — already in GCP

### Nice-to-haves (keep if active, cut if not)

- **Canva Team** — if Chase + team still produce in Canva
- **Attio CRM** — free tier, Tracy's tool (effectively free)
- **Buzzsprout** — if Amy launches podcast soon
- **Sentry** — error tracking (can use Vercel's built-in if budget tight)
- **ElevenLabs** — if voice synthesis ships in the near term; per CLAUDE.md it's paid but not yet SDK-wired
- **Perplexity API** — research agent usage
- **Meta developer app (DSD FB OAuth)** — only if we're actually publishing to Facebook

### Probable bloat (candidates for ✂️ CUT)

- **Cloud SQL `sovereign-db-primary`** — unknown usage; if not used, delete and save ~$25–50/mo
- **OpenRouter API** — redundant if we have Anthropic + Gemini keys direct
- **Tinyfish.ai** — unless there's an active web-automation workflow
- **Second Gemini API key** — one of the two is legacy
- **Second Cloudflare token** — same audit
- **Loopback (chase@farleypierson.com)** — likely legacy
- **Developer Knowledge API** — unknown
- **bigmuddy@chasepierson.tv automated email account** — may not be needed post-migration
- **Cloud TTS Journey** — if ElevenLabs is the future, this is unused fallback
- **Cloud DNS + Cloud Run + Cloud Build + Artifact Registry + Maps API + BigQuery + Firebase** — all at $0 currently but take mental space in the project; clean them up as part of GCP audit
- **`Apple Developer` account** — if we don't ship apps, cut

### Potential cost savings if we cut bloat

Rough estimate: **$50–150/mo could come off the subscription spend** just from the bloat audit alone — regardless of whether we do the Google Workspace migration.

---

## 4. The selective migration menu

Given Cloudflare stays on chasepierson.tv (no impact), here are the discrete moves Chase can pick from. Each one can be done independently of the others.

### Option Menu (pick any combination)

| # | Move | LoE | Why do it | Why skip |
|---|---|---|---|---|
| **A** | **Cut the ambiguous / bloat items** (Cloud SQL audit, duplicate API keys, Loopback, Developer Knowledge API, OpenRouter if redundant, Tinyfish if unused) | 🟡 SIMPLE (~1–2 hours audit + cuts) | Save $50–150/mo. Clean inventory. Reduce attack surface. | Zero reason to skip. Do this regardless. |
| **B** | **Centralize all business billing on one Tracy-held MBT card** (no Workspace change) | 🟡 SIMPLE (~2 hours if Tracy sits with Chase + card in hand) | Tracy gets full budget visibility. Chase's personal card stops mixing with business. | Requires the card to physically exist first. |
| **C** | **Transfer GCP project `bigmuddy-ff651` to a new MBT Google Cloud organization** (without migrating Workspace yet) | 🟠 MODERATE (~2–3 hours + Cloud SQL decision) | Legal-entity-owns-the-data alignment. Safer if Chase is unavailable. | GCP project transfer is the riskiest single step; if you're doing nothing else, the risk isn't worth the isolated benefit. |
| **D** | **Stand up MBT Google Workspace + migrate Chase's email + Drive** | 🟠 MODERATE (~3–4 hours active + overnight sync) | Clean institutional identity. Business email ≠ Chase's personal email. | Chase has to mentally switch primary inbox. 60-day overlap needed for forwarding. |
| **E** | **Invite Tracy + Amy to be admins on every existing business SaaS** (without moving ownership) | 🟡 SIMPLE (~1 hour) | Immediate bus-factor improvement. Partners can recover accounts if Chase unavailable. | Partial fix only; doesn't solve the "Chase's name on the account" problem. |
| **F** | **Retire the HDI brand (doc cleanup only, no infrastructure change)** | 🟡 SIMPLE (~2 hours automated find+replace + review) | Eliminates a source of drift. Makes all docs clearer. | Purely cosmetic if we're not doing any of the above. |
| **G** | **Do everything at once — full migration** | 🔴 COMPLEX (1–2 focused days if batched) | Clean break, one decision window, one change-notice to contacts. | Higher risk of something breaking; harder to isolate failures. |

### My recommendation (revised from the earlier over-conservative plan)

**Do A, B, E, F as immediate wins.** Each is independent, each is low-risk, each captures real value:
- **A** saves money + cleans inventory ($50–150/mo)
- **B** gets Chase's personal card out of business billing + Tracy in control
- **E** reduces bus-factor immediately without any ownership transfer
- **F** kills HDI drift

Total time: **~5–6 hours of work, spread across 2–3 days of Chase's attention.**

**Then decide on C + D later, separately.** C (GCP transfer) and D (Workspace migration) are the higher-risk, higher-investment moves. Doing them later gives us time to:
- Let Tracy run on the centralized card for 30 days and confirm the billing flow works
- Finish the Cloud SQL audit + decide if we need that project at all
- Sleep on whether "chase@measurablybetterthings.com" matters enough to justify the email switchover

**Skip G.** The "do everything at once" version is the one that over-conservative planning produced. It bundles too many risks for a team that moves fast and can't afford a day of ecosystem downtime.

---

## 5. What I (Cos) need from Chase to execute any of A–F

| Move | Prerequisite |
|---|---|
| A | Nothing — I can start the Cloud SQL audit + bloat cut today |
| B | Tracy's MBT business card in hand |
| C | Decision on whether to migrate project or stand up new one; Cloud SQL audit complete |
| D | Domain decision (`measurablybetterthings.com` or alternative); decision on chasepierson.tv post-state |
| E | Tracy + Amy Gmail addresses + their agreement to accept admin invites |
| F | Decision on `hillbillydreamsinc.com` domain fate (sunset, redirect, or keep) |

---

## 6. Revised honest timeline

Dropping the earlier over-conservative estimate.

| Move | Realistic hours | Realistic calendar days |
|---|---|---|
| A (bloat cut) | 1–2 hrs | Same day |
| B (billing centralization) | 2 hrs | Same day Tracy is available |
| C (GCP transfer) | 2–3 hrs | Half day + 24 hr verification window |
| D (Workspace migration) | 3–4 hrs active | 2 days (overnight sync + DNS propagation) |
| E (partner admin invites) | 1 hr | Same day |
| F (HDI doc cleanup) | 2 hrs | Same day |
| **All of A–F sequentially** | **~12 hours** | **~3 days including wait times** |

Not 7–8 weeks. Not even 1–2 weeks. **3 days if we commit.**

---

## 7. Questions still open

1. What does Cloud SQL `sovereign-db-primary` do? (blocks C)
2. Which of the 4 GChat webhooks is still live + needed? (affects A)
3. Does Tracy have an MBT business card right now, or does it need to be issued first? (blocks B)
4. What's the fate of `hillbillydreamsinc.com`? (affects F)
5. Does Chase actually want to change his primary email, or does `me@chasepierson.tv` stay his personal-professional identity forever? (affects D + the whole Workspace migration question)

---

*End of audit. Ready for Chase to pick from the A–F menu.*
