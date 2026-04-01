# Master Agent Handoff — Read This First

**Every agent on every machine reads this before doing anything.**

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

**Priority 3 — Bearsville Media Group**
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
| bigmuddyrecord.com | Big Muddy Records | Active |
| deepsouthdirectory.com | Deep South Directory | Active — primary revenue |
| outsidereconomics.com | Outsider Economics | Active — editorial |
| hillbillydreamsinc.com | HDI Corporate | Active — sparse |
| tuthilldesign.com | Tuthill Design | Active — partner |
| studiocvideo.com | Studio C Video | Active — partner |
| bearsvillemediagroup.com | Bearsville Media Group | Live, summer activation |
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

## DSD Pricing (Canonical — Do Not Change)

| Tier | Price | Opens |
|------|-------|-------|
| Entry | Free | Live |
| The Listing | $20/mo | Apr 1 |
| The Works | $49/mo | Apr 21 |
| The Engine | $99/mo | Apr 14 |

Walk-in pitch: lead with $20. Never claim features not yet shipped.
Env vars for payment: `STRIPE_PAYMENT_LINK_LISTING`, `STRIPE_PAYMENT_LINK_ENGINE`

---

## AI Model Routing

| Role | Primary | Fallback |
|------|---------|----------|
| Reasoning | Gemini 2.5 Pro | Claude Sonnet |
| Generation | Gemini 2.5 Flash | Claude Haiku |
| Search | Perplexity | Gemini Flash |
| Images | Vertex AI Imagen 3 | — |
| Video | Veo 3 | — |
| Audio | Cloud TTS Journey | — |

API keys in Vercel: `ANTHROPIC_API_KEY`, `PERPLEXITY_API_KEY`, `GOOGLE_APPLICATION_CREDENTIALS_JSON`

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
- **Tracy and Amy are equity partners** — never employees
- **Bitwarden for all secrets** — no exceptions
- **Verify deploys** — CI passing ≠ deployed. Check live URLs.

---

## Key Files

| File | What |
|------|------|
| `docs/HDI_BRAND_HIERARCHY_ANALYSIS.md` | Full org chart, legal entities, cap table, revenue model |
| `docs/BIG_MUDDY_MEDIA_PLAYBOOK.md` | Radio/Magazine/Directory/Touring cadences and promises |
| `apps/web/config/domain-routes.ts` | Hostname → route group mapping |
| `apps/web/config/tenants.ts` | Multi-tenant registry (big-muddy, bearsville, studio-c, tuthill) |
| `apps/web/middleware.ts` | Routing engine — reads domain-routes.ts |
| `.claude/agents/ORIGIN_STORY.md` | The narrative — DeFacto Codec to Big Muddy |
| `.claude/agents/BRAND_NARRATIVE_OVERHAUL.md` | Value props, voice, copy rules |
| `.claude/agents/BROADCASTING_CAPABILITIES.md` | Radio/broadcasting stack |
| `memory/feedback_chase_voice.md` | Chase's writing voice (living doc) |
| `memory/feedback_qc_policy.md` | Full QC rules |
| `memory/feedback_ai_model_routing.md` | AI model routing with failover |
| `memory/project_mbt_pricing_tiers.md` | DSD tier pricing ($20/$49/$99) |
| `memory/project_operator_split.md` | Chase/Tracy/Amy/JP day-night operator split |
| `lib/ai-models.ts` | Multi-provider AI routing code |
| `outsider-economics-v2/` | Live field manual content — DO NOT DELETE |

---

## Architecture Notes

- **Stack:** Next.js 15 App Router · TypeScript · Inline CSS (no Tailwind) · Prisma/PostgreSQL · next-auth v5
- **Deploy:** Vercel (sole platform — not Firebase)
- **Storage:** GCS bucket `bmt-media-bigmuddy` · Cloudflare R2
- **DNS:** All domains in Cloudflare (ChasePierson.TV account) · Gray cloud · A → 76.76.21.21 · www CNAME → cname.vercel-dns.com
- **Multi-tenant:** 4 tenants share one deployment. Never cross entity data boundaries.
- **`outsider-economics-v2/`** is read by `apps/web/lib/posts.ts` at build time — never delete this directory.

---

## The Origin Story (One Paragraph)

Chase designed a complete media production-to-distribution pipeline in 2022 (the DeFacto Codec Market). It was global media infrastructure — broadcast, production, analytics, distribution — built on open source tools. He realized the same architecture that runs a Viacom can run a small-town media economy. Big Muddy is that architecture, applied to Main Street, powered by AI, anchored in the Mississippi corridor. The gap isn't technology — it's organization. That's what we sell.
