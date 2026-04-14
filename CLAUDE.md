# Master Agent Handoff — Read This First

## BOOT SEQUENCE — Do This Before Anything Else

```
1. git pull origin main          ← You may be in a stale worktree
2. git branch                    ← Confirm you're on main or know which branch
3. ls docs/BUSINESS_ARCHITECTURE.md   ← If this file doesn't exist, you're not current
4. Read docs/BUSINESS_ARCHITECTURE.md ← Source of truth for the entire business
5. Read .claude/agents/HANDOFF_COS_TO_PATCH.md ← Capabilities audit, gaps, priorities
```

**If step 3 fails, STOP.** Run `git pull origin main` again. Do not proceed with stale files.

---

## Who We Are

Hillbilly Dreams Inc — a media-hospitality ecosystem anchored in Natchez, Mississippi. One Next.js codebase, one Vercel deployment, multiple brands across two regions (Deep South + Hudson Valley/Catskills).

**Legal operating entity:** FarleyPierson LLC (EIN 81-4280721). HDI not yet formally incorporated.

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

**Priority 2 — Deep South Directory (DSD)**
Business marketing product. Dogfooding on our own properties + Regina, then external sales later this month.

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
| deepsouthdirectory.com | Deep South Directory | Active — primary revenue |
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

## Machines

| Machine | IP | User | SSH | Role |
|---------|----|----|-----|------|
| MacBook Pro | local | chasethis | — | Dev, code, deployment |
| Mac mini | 192.168.4.37 | ClawdBOT | `ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37` | Broadcasting, Plex, services |

## Key Services (Mac Mini)

| Service | Port | URL |
|---------|------|-----|
| OpenBroadcaster | 8080 | http://192.168.4.37:8080 (admin/bigmuddy2026) |
| Icecast | 8010 | http://192.168.4.37:8010 |
| Plex | 32400 | http://192.168.4.37:32400 |
| Postiz | 4007 | http://192.168.4.37:4007 |
| Open Notebook | 5055 | http://192.168.4.37:5055 |

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

## DSD Pricing (LOCKED — April 5, 2026)

| Tier | Price | Name |
|------|-------|------|
| Free | $0 | Free |
| Essentials | $25/mo | Essentials |
| Pro | $50/mo | Pro |
| Marketing | $99/mo | Marketing |
| Engine | $250/mo | Engine |

Walk-in pitch: lead with value and the region. Never claim features not yet shipped.

Stripe payment links in Vercel — `STRIPE_PAYMENT_LINK_ESSENTIALS`, `STRIPE_PAYMENT_LINK_PRO`, `STRIPE_PAYMENT_LINK_MARKETING`, `STRIPE_PAYMENT_LINK_ENGINE`.

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
