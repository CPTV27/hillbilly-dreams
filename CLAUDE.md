# Master Agent Handoff — Read This First

## BOOT SEQUENCE — Do This Before Anything Else

```
1. git pull origin main          ← You may be in a stale worktree
2. git branch                    ← Confirm you're on main or know which branch
3. Read docs/THE_THESIS.md       ← THE canonical mental model — wins over every other doc
4. ls docs/BUSINESS_ARCHITECTURE.md   ← If this file doesn't exist, you're not current
5. Read docs/BUSINESS_ARCHITECTURE.md ← Detailed business architecture
6. Read .claude/agents/HANDOFF_COS_TO_PATCH.md ← Capabilities audit, gaps, priorities
```

**If step 3 fails or step 4 fails, STOP.** Run `git pull origin main` again. Do not proceed with stale files.

**Critical rule:** If anything in this CLAUDE.md, the BUSINESS_ARCHITECTURE doc, the memory files, or any AI-generated report contradicts `docs/THE_THESIS.md` — THE_THESIS wins. Captured 2026-04-19 in Chase's voice. The canonical mental model.

---

## Who We Are

Hillbilly Dreams Inc — an entertainment, hospitality, and media ecosystem anchored in Natchez, Mississippi. One Next.js codebase, one Vercel deployment, multiple brands across two regions (Deep South + Hudson Valley/Catskills).

**Legal operating entity (locked 2026-04-24):** Measurably Better Things LLC (Mississippi, formation in progress, Tracy filing fresh). Replaces FarleyPierson LLC (EIN 81-4280721, NY) which closes once MBT is formed and contracts/Stripe/vendors migrate. Founder contribution structure (33/33/33 Chase/Tracy/Amy at MBT): Chase contributes S2PX IP + personal Lyra (LYRAI) co-founder equity; Tracy contributes capital + finance ops; Amy contributes hospitality ops. a2natchez LLC (the Inn) = Tracy + Amy only — Chase economics flow via MBT-as-agency-fee, not the a2natchez cap table. Big Muddy Touring + Big Muddy Records + other operating brands = DBAs under MBT until $150K revenue or outside-equity trigger fires.

**HDI = dead language as of 2026-04-18 — do not use in new docs or new code.** Existing references on cleanup pass after Asana Zero Day 1 backup (Phase 5 of `~/.claude/plans/cozy-beaming-minsky.md`). Formation plan: `docs/decision-briefs/measurably-better-things-llc-formation-plan-2026-04-21.md`. FarleyPierson closure plan: `docs/partners/tuthill-photography-scope-2026-04-20.md` §10. Lyra business case: `docs/partners/lyra-business-case-2026-04-24.md`.

---

## Business Architecture (Read `docs/BUSINESS_ARCHITECTURE.md` for full detail)

**Three layers:**
- **HDI** = holding company (backstage, minimal)
- **MBT** = technology platform (the Glass Engine — modules, infrastructure, AI)
- **Implementations** = Big Muddy (flagship), Bearsville (summer 2026), future clients

**MBT has two products — same engine, different skins:**
- `measurablybetter.life` = Consumer AI agent (personal Southern Concierge, slider $0–$99/mo)
- `deepsouthdirectory.com` = Business marketing (directory, social, reviews, $20/$49/$99)

**"Powered by Measurably Better Things"** in footers across all properties is correct and intentional.

## Current Focus (Q2 2026)

**Phase: Dogfood** — Running the system on ourselves before external sales.
Four internal clients: Big Muddy Touring, Big Muddy Magazine, Biscuits & Blues (Regina Charboneau), The Big Muddy Inn.

**Priority 1 — Big Muddy Touring**
The entertainment engine. Book bands, provide transport (Sprinter van this week), promote shows through the media company. Shows feed every other module (2:1 multiplier).

**Priority 2 — Directory module (B2B engagements only)**
The Directory is an entity-based module built on the shared MBT platform. It ships as part of B2B client engagements — Big Muddy Magazine uses it for hospitality listings, Bearsville Creative uses it for studios/production resources, Vicki Wolpert gets her own real-estate-focused directory, etc. NOT a standalone $25/mo SaaS to Main Street SMBs. NOT walk-in sales. B2B only, per-engagement deal sizing. The "DSD walk-in / tiered subscription" framing is DEPRECATED 2026-04-20.

**Priority 3 — Bearsville Creative**
Northeast node (Woodstock, NY). Summer 2026 activation.

**Archived**
- S2PX / Scan2Plan — archived to `~/S2PX-archive/`. Partnership with Owen Bush dissolved 03/25/2026.

---

## Active Domains (14)

| Domain | Brand | Status |
|--------|-------|--------|
| bigmuddytouring.com | Big Muddy Touring | Active |
| bigmuddymagazine.com | Big Muddy Magazine | Active |
| bigmuddyradio.com | Big Muddy Radio | Active |
| bigmuddyentertainment.com | Big Muddy Entertainment | Active |
| bigmuddyrecordlabel.com | Big Muddy Records | Active — we own this one |
| deepsouthdirectory.com | Deep South Directory | Active — demo of the Directory module; NOT sold as a standalone $/mo product |
| outsidereconomics.com | Outsider Economics | Active — editorial |
| hillbillydreamsinc.com | HDI Corporate | Active — sparse |
| tuthilldesign.com | Tuthill Design | Active — partner |
| studiocvideo.com | Studio C Video | Active — partner |
| bearsvillemediagroup.com | Bearsville Creative | Live, summer activation |
| bearsvillemedia.com | Bearsville (alias) | Redirects to above |
| measurablybetter.life | MBT | Active — consumer AI + platform overview |
| buycurious.art | Gallery/Storefront | Active — routes to gallery |

---

## Credentials & Secrets

**Bitwarden is the source of truth for ALL credentials.** No exceptions.

- CLI: `bw` — if not found: `brew install bitwarden-cli`
- Before creating any credential: CHECK BITWARDEN FIRST
- After creating any credential: PUT IT IN BITWARDEN
- Never hardcode secrets. Use environment variables.
- Vercel env vars = deployment source. Bitwarden = master store.

---

## Machines + Production Services

**Canonical reference:** `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md`. Nothing ships without an entry there + a Bitwarden item.

### Personal workstations

| Machine | IP | User | Role |
|---|---|---|---|
| MacBook Pro | local | chasethis | Chase's dev + code + deployment machine |
| Mac mini | 192.168.4.37 | ClawdBOT | Personal workstation only — **not a services host** (2026-04-20). Powering off during Chase's NY drive. Zero business workloads depend on it. |

### Production services hosts

| Host | Plan | Public endpoint | Purpose | Credentials |
|---|---|---|---|---|
| **Hetzner CCX23 `bigmuddy-services`** | 4 vCPU / 16 GB / 160 GB NVMe, Ashburn VA, $39.99/mo | 5.161.61.151 · Tailscale `bigmuddy-services` (100.89.173.28) | Immich + Caddy (running); Postiz + Open Notebook (planned) | BW: `Hetzner - bigmuddy-services` (ID `48bb42a1-3c26-4778-8f5e-b42f015697ec`) |
| **DigitalOcean droplet `bigmuddy-radio`** | — | 206.189.200.208 · stream.bigmuddytouring.com | AzuraCast — Big Muddy Radio streaming (SSL currently broken, needs Let's Encrypt) | BW: `AzuraCast — Big Muddy Radio Admin` + `DigitalOcean — bigmuddy-radio droplet` |

### Cloud services (managed — no server to maintain)

| Service | Usage | Credentials |
|---|---|---|
| Vercel (chasepierson.tv org, Pro) | Next.js app + 14 brand domains | BW: `Vercel Pro Token - Chase Piersons Projects` |
| Neon Postgres (HDI Production) | Primary app DB | BW: `Neon Postgres — HDI Production Database` |
| Sanity (project 5p7h8glj) | CMS for Magazine + brand sites | BW: `Sanity` |
| Cloudflare (DNS + Email Routing + 2 API tokens) | All domain DNS, email forwarding for deprecated workspaces | BW: `Cloudflare API Token (...)` entries |
| GCP `bigmuddy-ff651` (HDI Sovereign) | Vertex AI (Gemini + Imagen), GCS `bmt-media-bigmuddy`, Cloud SQL `sovereign-db-primary` (pgvector 0.8.1) | BW: `Google OAuth — HDI` + `Gemini API Key (...)` |
| Resend | Transactional email | BW: (via subs doc) |
| Buzzsprout | Podcast hosting | BW: (via subs doc) |
| GitHub (CPTV27) | `hillbilly-dreams` + `measurably-better-things` repos | BW: `GitHub PAT — Antigravity MCP` |

### Shared agent integrations

Delta Dawn is not just a name — four GChat webhooks (Agent Desk/Huck, Chuck, Delta Dawn, Ledger) live in Bitwarden alongside Delta Dawn's read-only Cloudbeds API key + Siri voice key. Full inventory in `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` §4.

---

## Team

| Person | Role | Email |
|--------|------|-------|
| Chase Pierson | CEO, CTO, Showrunner | me@chasepierson.tv |
| Tracy Alderson-Allen | Finance & Inn ops (equity partner) | tracyaldersonallen@gmail.com |
| Amy Allen | Inn & Bar Ops (equity partner) | amyaldersonallen@gmail.com |
| JP Houston | Shows & Programming | jphoustonlives@gmail.com |

**Tracy and Amy are equity partners — never refer to them as employees.**
**JP's deal is not finalized — do not name him on public-facing pages.**

---

## Directory Module — B2B Engagements Only (updated 2026-04-20)

The Directory is an entity-based module in the MBT platform. It ships as part of B2B client engagements — NOT as a standalone consumer/SMB subscription product.

- **NOT sold as $25/$50/$99/$250 tiered monthly SaaS.** The previous tier table (locked Apr 5, now deprecated) described a walk-in SMB sales motion we are not running.
- **NOT walk-in sales to Main Street.** Do not pitch "Deep South Directory" as a product to individual businesses.
- **IS shipped inside B2B engagements.** Big Muddy Magazine gets a hospitality directory. Bearsville Creative gets a studios+production-resources directory. Vicki Wolpert gets a Woodstock broker directory. Etc.
- **Revenue model:** Per-engagement project + hosting/licensing fees, not per-subscriber.
- **Stripe payment links** named `STRIPE_PAYMENT_LINK_ESSENTIALS` etc. are deprecated; leave them in Vercel env for now but no new customers flow through them.

Canonical spec file: TBD — will live at `docs/DIRECTORY_MODULE_SPEC.md` once the entity-based model is fully documented.

---

## AI Model Routing

| Role | Primary | Fallback |
|------|---------|----------|
| Reasoning | Gemini 2.5 Pro | Claude Sonnet |
| Generation | Gemini 2.5 Flash | Claude Haiku |
| Search | Perplexity | Gemini Flash |
| Images | Vertex AI Imagen 3 | — |
| Video | Veo 3 | — |
| Audio | ElevenLabs | Google Cloud TTS Journey |

API keys in Vercel: `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `PERPLEXITY_API_KEY`, `ELEVENLABS_API_KEY`, `GOOGLE_APPLICATION_CREDENTIALS_JSON`. `OPENAI_API_KEY` [verify] — SDK installed but not present in last env snapshot.

> **Note (2026-04-10):** `ELEVENLABS_API_KEY` is provisioned in Vercel Production but has **no SDK integration in the codebase yet** (no imports in `apps/web`). When you wire it, extend `apps/web/lib/ai-models.ts` with an `audio` role so it follows the same primary/fallback routing pattern as reasoning and generation.

---

## QC Rules (Hard Requirements)

- **No hardcoded fonts** — use `var(--font-body)` or `var(--font-display)`
- **No hardcoded colors** — use CSS custom properties
- **No hardcoded model names** — import from `lib/ai-models.ts`
- **No tech jargon** on customer-facing pages
- **Illustrations must be diverse** — mix of races, ages, genders
- **No high-tech imagery** — Main Street, not Silicon Valley
- **AI generates art, Canva handles typography** — never let AI put text in images
- **DSD product name is "Deep South Directory"** — not "MBT" or "Measurably Better Things" in customer-facing copy
- **Arrie Aslin** — correct spelling. NOT "Arri Aslan," "Ari Aslan," "Ari B. Aslan." It's **Arrie Aslin.**
- **Tracy and Amy are equity partners** — never employees
- **Bitwarden for all secrets** — no exceptions
- **Verify deploys** — CI passing ≠ deployed. Check live URLs.

---

## Key Files (all in repo — `git pull` to get them)

### Start Here
| File | What |
|------|------|
| `docs/BUSINESS_ARCHITECTURE.md` | **Source of truth.** Three layers, two products, nine modules, the flywheel. Read this first. |
| `docs/COPY_RESET_PLAN.md` | Page-by-page audit + rewrite priorities |
| `.claude/agents/HANDOFF_COS_TO_PATCH.md` | Full capabilities audit — what works, what's broken, priority tasks |

### Strategy & Brand
| File | What |
|------|------|
| `docs/HDI_BRAND_HIERARCHY_ANALYSIS.md` | Org chart, legal entities, cap table, revenue model |
| `docs/BIG_MUDDY_MEDIA_PLAYBOOK.md` | Radio/Magazine/Directory/Touring cadences and promises |
| `.claude/agents/ORIGIN_STORY.md` | The narrative — DeFacto Codec to Big Muddy |
| `.claude/agents/BRAND_NARRATIVE_OVERHAUL.md` | Value props, voice, copy rules |
| `.claude/agents/NORTH_STAR_MANIFESTO.md` | Visual direction — photography first, Glass Engine aesthetic |

### QA & Standards
| File | What |
|------|------|
| `.claude/agents/QA_CHASE.md` | Full QC checklist — brand voice, code, honesty gate, the works |
| `.claude/agents/CHIEF_OF_STAFF.md` | Big picture context, priority stack, decision memory |
| `.claude/agents/COS_EXAM.md` | 25-scenario certification test for QA |

### Technical
| File | What |
|------|------|
| `apps/web/config/domain-routes.ts` | Hostname → route group mapping |
| `apps/web/config/tenants.ts` | Multi-tenant registry (big-muddy, bearsville, studio-c, tuthill, dctv) |
| `apps/web/middleware.ts` | Routing engine — reads domain-routes.ts |
| `apps/web/lib/ai-models.ts` | Multi-provider AI routing code |
| `outsider-economics-v2/` | Live field manual content — DO NOT DELETE |

### Agents
| File | What |
|------|------|
| `.claude/agents/PATCH.md` | Technical Director — build, deploy, infrastructure |
| `.claude/agents/VESPER_OMNI_AGENT_BLUEPRINT.md` | Future vision — Omni-Agent architecture (backlog) |

### Operations
| File | What |
|------|------|
| `docs/ADMIN_ONBOARDING_GUIDE.md` | Tracy & Amy admin tools walkthrough |
| `docs/VAN_WRAP_SPEC.md` | Sprinter van wrap design for the shop |

**Note:** Memory files (`memory/*.md`) are machine-local project memory, not in the repo. The critical info from memory is duplicated in `docs/BUSINESS_ARCHITECTURE.md` and the agent files above. If you need memory context, ask the Chief of Staff or read the docs.

---

## Architecture Notes

- **Stack:** Next.js 14.2.35 App Router · TypeScript 5.5 · Tailwind 3.4 + inline CSS + CSS custom properties (token rules enforce `var(--font-*)`, `var(--bg)`, `var(--accent)` as the primary discipline — Tailwind coexists but is not the primary layer) · Prisma/PostgreSQL · next-auth v5 · Sanity CMS (civic-commerce pivot, Apr 2026)
- **Deploy:** Vercel (sole platform — not Firebase)
- **Storage:** GCS bucket `bmt-media-bigmuddy` · Cloudflare R2
- **DNS:** All domains in Cloudflare (ChasePierson.TV account) · Gray cloud · A → 76.76.21.21 · www CNAME → cname.vercel-dns.com
- **Multi-tenant:** 5 tenants share one deployment — `big-muddy`, `bearsville`, `studio-c`, `tuthill`, `dctv`. Never cross entity data boundaries.
- **`outsider-economics-v2/`** is read by `apps/web/lib/posts.ts` at build time — never delete this directory.

---

## The Origin Story (One Paragraph)

Chase designed a complete media production-to-distribution pipeline in 2022 (the DeFacto Codec Market). It was global media infrastructure — broadcast, production, analytics, distribution — built on open source tools. He realized the same architecture that runs a Viacom can run a small-town media economy. Big Muddy is that architecture, applied to Main Street, powered by AI, anchored in the Mississippi corridor. The gap isn't technology — it's organization. That's what we sell.

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
