# Full System Audit — 2026-04-29

*Auditor: general-purpose Claude agent. Scope: end-to-end level-set across code, docs, AEO, partner systems. No code changes made; recommendations only.*
*Voice: per `docs/voice/admin-documentation-voice.md` — lead with action, no corporate language, truth over polish.*

---

## Executive summary

The platform is in a coherent state for shipping the first 7 Big Muddy answer pages this week. The blockers are concrete and small:

1. The `answerPage` Sanity schema is **drafted but not implemented** — content cannot be pasted yet.
2. The `/answers/{slug}` route does not exist — there is no surface for the pages to live on.
3. Several canonical docs still call Studio C "the production arm of Tuthill Design LLC" — directly contradicts the 2026-04-29 locked truth ("Studio C is the administrative / implementation vendor supporting MBT").
4. Onboarding docs (`docs/onboarding-2026-04-20/`) still teach Tracy + Amy the deprecated DSD walk-in subscription motion. Partner trust break.
5. HDI is referenced in 67+ doc files and 20+ code files. Cleanup pass is overdue.

The repo, code, and routing are sound. The drift is in docs, brand positioning, and a couple of partner-facing surfaces.

---

## What is true now (2026-04-29)

- **Legal entity:** Measurably Better Things LLC (Mississippi, in formation). FarleyPierson LLC is closing. HDI is dead language.
- **MBT:** the civic-commerce platform.
- **Studio C:** administrative / implementation vendor supporting MBT.
- **Tuthill Design:** real estate photography only — NOT positioned as part of the civic platform.
- **Big Muddy:** the Natchez flagship ecosystem.
- **AEO lanes (priority order):** Big Muddy → Studio C → MBT → (later) Bearsville/Utopia → Tuthill.
- **Big Muddy 20:** drafted (`docs/aeo/big-muddy-pages-1-7-ready.md` and `big-muddy-pages-8-20-ready.md`). Pages 1–7 ship first.
- **Operating layer:** Asana project "Weekly Partner Commitments" GID `1214376792613690`. Cos auto-creates tasks from Chase messages per `docs/voice/cos-ingestion-rule.md`.
- **Voice:** `docs/voice/admin-documentation-voice.md` is canonical for all internal communication.
- **Repo:** clean on `main`. Last commit `546779df` (WPC handbook).

---

## What is stale or contradictory

### Canonical drift (high impact)

| File | Issue |
|---|---|
| `docs/voice/studio-c.md` line 10 | "Studio C is the production arm of Tuthill Design LLC" — contradicts current Studio C role (admin/implementation for MBT). |
| `apps/web/config/tenants.ts` line 63 | `entity: 'Tuthill Design LLC d/b/a Studio C Video'` — same drift baked into tenant registry. |
| `docs/BUSINESS_ARCHITECTURE.md` (whole file) | Still describes MBT as "licensed civic-commerce OS" sold to towns/CVBs/brokers as institutional buyer. THE_THESIS retracted that on 2026-04-19 (MBT = ecosystem operating layer for our own businesses, not B2B SaaS). The two docs disagree. THE_THESIS wins per CLAUDE.md, but BUSINESS_ARCHITECTURE has not been re-cut. |
| `docs/BUSINESS_ARCHITECTURE.md` (DSD self-serve tier table $0/$25/$50/$99/$250) | Deprecated 2026-04-19 per THE_THESIS + CLAUDE.md. Still in BUSINESS_ARCHITECTURE.md as live pricing. |
| `docs/onboarding-2026-04-20/01-business-case-and-pro-forma.md` lines 95, 101 | Tells partners to acquire DSD subscribers, "5 walk-ins per day", "first 50 paid DSD subscribers". Deprecated motion. |
| `docs/onboarding-2026-04-20/05-demo-day-url-checklist.md` line 31 | "DSD product, pricing locked, walk-in sales path live" — false. |
| `apps/web/lib/structured-data.tsx` | `getOrganizationSchema()` lists `buycurious.art` in `sameAs[]`. Sitemap removes it ("now an alias for measurablybetter.life"). Inconsistency. |
| `apps/web/app/sitemap.ts` lines 14–15 | Comments out `buycurious.art`, redirects gallery to `measurablybetter.life`. But `domain-routes.ts` still maps `buycurious` and `buycuriousart` to `routeGroup: 'gallery'`. Confirm intent. |
| `apps/web/middleware.ts` (header comment lines 12, 19) | Cites Firebase App Hosting. Deployment is Vercel-only. Stale comment. |
| `apps/web/public/llms.txt` line 84 | "Infrastructure: Google Cloud (Firebase App Hosting on Cloud Run)" — wrong. We are on Vercel. |
| HDI naming in 67 doc files + 20 code files | "HDI = dead language" per CLAUDE.md, cleanup pass not done. |

### Documentation lifecycle drift

- `docs/90_DAY_PLAN.md` — date pinned, content presumed stale (not opened in this audit; flag for review).
- `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` — likely current; verify against current Hetzner + DigitalOcean state.
- `docs/STORY_KIT.md`, `docs/THE_THESIS.md`, `docs/BUSINESS_ARCHITECTURE.md` all in repo root with `.docx` siblings. Two formats per doc adds drift surface — `.docx` is not an obvious source of truth, so when the `.md` and `.docx` disagree, agents won't know which to trust.
- `outsider-economics-v2/` — referenced in CLAUDE.md as load-bearing ("never delete"). Confirm it's actually wired into `apps/web/lib/posts.ts` (not verified in this audit pass).

### Boot-sequence linkrot

CLAUDE.md tells agents to read `.claude/agents/HANDOFF_COS_TO_PATCH.md` (step 6). File exists. Step 7 + 8 (voice docs) verified present.

THE_THESIS.md does NOT yet exist as `.docx` — that's fine. Just noting for completeness.

---

## System map

### Repo structure (high level)

```
hillbilly-dreams/
├── apps/web/                   ← Next.js 14 App Router (the deployment)
│   ├── app/                    ← 50+ route groups, multi-tenant
│   ├── config/
│   │   ├── domain-routes.ts    ← hostname → route group (BMT-specific tenant data)
│   │   └── tenants.ts          ← TENANTS array (5 tenants)
│   ├── middleware.ts           ← Routing engine (reads domain-routes.ts)
│   ├── sanity/
│   │   ├── schemas/            ← 14 schemas registered (no answerPage)
│   │   ├── lib/
│   │   └── plugins/
│   ├── lib/structured-data.tsx ← schema.org JSON-LD helpers
│   ├── public/llms.txt         ← LLM crawler hint (slightly stale)
│   └── .env.example            ← Sparse — only 5 vars, real list is ~115
├── docs/
│   ├── THE_THESIS.md           ← Canonical (per CLAUDE.md)
│   ├── BUSINESS_ARCHITECTURE.md ← Drifted from THE_THESIS in places
│   ├── voice/                  ← admin-documentation-voice + cos-ingestion-rule + brand voices
│   ├── operations/wpc-handbook.md
│   ├── aeo/                    ← All drafted 2026-04-29
│   ├── onboarding/             ← Per-role onboarding (canonical)
│   ├── onboarding-2026-04-20/  ← Pre-existing big bundle (carries deprecated DSD walk-in)
│   ├── decision-briefs/        ← MBT formation plan, etc.
│   ├── partners/               ← Tuthill scope, S2PX-Tuthill, Lyra business case
│   └── audits/                 ← This file
├── packages/database/          ← Prisma + database client
├── outsider-economics-v2/      ← Live field manual content (read at build time)
└── .claude/agents/             ← Agent identity files
```

### Multi-tenant routing

Hostname → `routeGroup` via `apps/web/config/domain-routes.ts` (~16 mappings). `middleware.ts` rewrites the URL to `/{routeGroup}/...`. Mappings consolidated April 2026 — Magazine and Radio domains now redirect to `bigmuddytouring.com/magazine` and `/radio` via Cloudflare Bulk Redirects.

`config/tenants.ts` registers 5 tenants: `big-muddy`, `bearsville`, `studio-c`, `tuthill`, `dctv`. Each has domains, theme, GCS bucket, accent color, features.

### Sanity content model

14 schema types registered in `apps/web/sanity/schemas/index.ts`:
`article, location, event, touringPage, contentTemplate, podcastEpisode, magazineIssue, showEvent, staff, partnerArtist, pressRelease, faq, pageContent`. (Note: `index.ts` listing shows 13 in code — `touringPage` is registered as a singleton.)

`answerPage` is NOT registered. Spec exists at `docs/aeo/sanity-answerpage-schema.md`.

### Crawler / SEO state

- `apps/web/app/robots.ts` — explicitly welcomes GPTBot, ChatGPT-User, Claude-Web, ClaudeBot, PerplexityBot, Applebot-Extended, Google-Extended, Bytespider, CCBot, cohere-ai. Defaults disallow `/admin/`, `/api/`, plus a long list of internal route groups. **OAI-SearchBot and Bingbot are NOT named** — they use default rules (allowed). Sitemap list still includes `buycurious.art` (which sitemap.ts removed).
- `apps/web/app/sitemap.ts` — programmatic sitemap pulling articles from Prisma. Wired across 8 brand origins. Magazine + bearsville mostly static placeholders.
- `apps/web/public/llms.txt` — present, but says "Firebase App Hosting" (we are on Vercel). Brand list omits Bearsville Creative; calls Venture Gallery "Venture Gallery Gallery" (typo).
- `apps/web/lib/structured-data.tsx` — has Organization, WebSite, Article, Event helpers. No FAQPage, no LocalBusiness yet.
- Article route at `app/magazine/articles/[id]/page.tsx` — server component, JSON-LD via `JsonLd` helper. Good baseline for AEO.
- Middleware sets `X-Robots-Tag: noindex, nofollow` on `/press/` and any `.html` file.

### Deployment

- Vercel (per `vercel.json`, `.env.vercel.local`, CLAUDE.md). 14 brand domains share one deployment.
- Database: Neon Postgres via Prisma (`@bigmuddy/database`).
- Sanity project ID `5p7h8glj` (per memory + sanity.config.ts).
- AzuraCast on a DigitalOcean droplet (separate from the web app), Hetzner CCX23 for Immich + planned Postiz/Open Notebook.

### Cos status dashboard

Separate Next.js app at `/Users/chasethis/cos-status-dashboard/`. Uses `@upstash/redis` for `agent-state.ts` (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`). Falls back gracefully if config missing.

---

## Findings by area

### 1. Documentation inventory

**Canonical (read these in order, per CLAUDE.md):**

- `docs/THE_THESIS.md` — the model. Wins all conflicts. Captured 2026-04-19.
- `docs/BUSINESS_ARCHITECTURE.md` — *partial drift from THE_THESIS; needs re-cut.*
- `.claude/agents/HANDOFF_COS_TO_PATCH.md` — capabilities audit.
- `docs/voice/admin-documentation-voice.md` — voice gate.
- `docs/voice/cos-ingestion-rule.md` — Cos intake protocol.
- `docs/operations/wpc-handbook.md` — partner-facing onboarding (one page, exemplary brevity).
- `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` — infra source of truth (not opened deeply this pass; verify currency).

**AEO bundle (drafted 2026-04-29, all current):**

- `docs/aeo/sanity-answerpage-schema.md` — schema spec. **Not yet implemented in Sanity.**
- `docs/aeo/aeo-publish-checklist.md` — 5-point gate per page.
- `docs/aeo/big-muddy-20-2026-04-29.md` — 20 answers drafted, format spec.
- `docs/aeo/big-muddy-pages-1-7-ready.md` — Sanity-ready, has 3 verification flags for Tracy/Amy.
- `docs/aeo/big-muddy-pages-8-20-ready.md` — generated.
- `docs/aeo/big-muddy-image-queue-2026-04-29.md` — 80 image slots tokenized for the Photo Lab agent.

**Stale / contradictory:**

- `docs/BUSINESS_ARCHITECTURE.md` — contradicts THE_THESIS on MBT positioning + DSD pricing.
- `docs/onboarding-2026-04-20/01-business-case-and-pro-forma.md` — references walk-in DSD acquisition, JP Houston (departed 2026-04-15), `$510k base / $760k stretch` (THE_THESIS supersedes with `$203k gross / $185k net / $250k profit / $330k baseline`).
- `docs/onboarding-2026-04-20/05-demo-day-url-checklist.md` — describes deprecated DSD walk-in path.
- `.docx` shadows of major docs (`docs/THE_THESIS.docx`, `docs/STORY_KIT.docx`, `docs/BUSINESS_ARCHITECTURE` — verify) likely outdated.

**Missing / should exist:**

- `docs/DIRECTORY_MODULE_SPEC.md` — referenced in CLAUDE.md as "TBD". Not yet authored.
- `docs/audits/` — created by this pass, was missing.
- A `docs/voice/answer-page-rules.md` could codify the AEO-specific writing rules (under-80-word answer block, no internal links inside answer, etc.) so they live next to the brand voice docs.
- A short `docs/positioning/2026-04-29-locked.md` or equivalent summarizing the four locked truths (MBT = civic platform, Studio C = admin vendor, Tuthill = RE photo only, Big Muddy = Natchez flagship). One page that all other docs can be reconciled against.

### 2. Positioning consistency

**Tuthill Design**

Code (`apps/web/app/tuthill/page.tsx`): "Design, real estate media, and creative production. Hudson Valley and the Deep South." Light, accurate, fine.

Tenant config (`config/tenants.ts` line 63): describes Studio C as `Tuthill Design LLC d/b/a Studio C Video`. **Contradicts the locked truth.** Studio C should not be a DBA of Tuthill.

Tuthill voice doc (`docs/voice/tuthill-design.md`): describes Tuthill as "real estate media, design" — accurate. Calls out LiDAR + AI floor plans as offerings. Good.

`apps/web/app/whiteboard/partner-meeting-2026-04-20/page.tsx`: "MBT markets full-brand for Studio C + Tuthill" — predates the 2026-04-29 narrowing of Tuthill to RE photo only. Fix or note as historical artifact.

`apps/web/app/story/page.tsx`: References Tuthill Design Photography as "MBT markets, Tuthill delivers" — consistent with current truth (Tuthill = RE photography).

**Studio C**

Voice doc (`docs/voice/studio-c.md` line 10): **"Studio C is the production arm of Tuthill Design LLC."** Direct contradiction of locked 2026-04-29 truth ("Studio C is the administrative / implementation vendor supporting MBT").

Tenant config: same drift baked in.

THE_THESIS.md is silent on Studio C being an admin vendor. It frames Studio C as one of three "production studios in the ecosystem (CPP, Studio C, Tuthill)" being amplified by Big Muddy. **THE_THESIS and the 2026-04-29 lock disagree.** Need Chase to resolve which is current.

**MBT**

CLAUDE.md says "MBT is the technology platform (the Glass Engine)." `BUSINESS_ARCHITECTURE.md` says "MBT is a licensed civic-commerce OS for towns and cities." THE_THESIS.md says "MBT is the operating layer of an ecosystem of businesses we run." Three different definitions in three canonical-or-near-canonical docs.

The 2026-04-29 lock says "MBT (Measurably Better Things) is the civic-commerce platform" — closest to BUSINESS_ARCHITECTURE.md framing. Chase needs to resolve this with one sentence: is MBT (a) the operating layer of OUR ecosystem only, (b) a licensed product sold to civic buyers, or (c) both?

**Big Muddy**

Consistent across docs. Anchor: Natchez. Flagship. Two umbrellas (Inn + Touring) with sub-brands. Locked April 18.

**Bearsville / Utopia**

Light footprint. Bearsville Creative LLC in tenant config. THE_THESIS describes it as "second region clone" via JV. Utopia not in tenants.ts; appears in `docs/partners/utopia-studios/` (not opened this pass).

**HDI**

Dead language per CLAUDE.md (2026-04-18). Still in 67 docs and 20+ code files. Notable code locations:
- `apps/web/app/admin/hq/page.tsx` — "HDI HQ — Executive Dashboard" + "Hillbilly Dreams Inc — Executive Dashboard".
- `apps/web/lib/hdi-links.ts` — file name and contents.
- `apps/web/config/tenants.ts` — `entity: 'Hillbilly Dreams Inc'` for `big-muddy` tenant.
- `apps/web/app/hillbilly/org-chart/page.tsx` — likely HDI-framed.

### 3. Code architecture audit

**Strengths:**

- Multi-tenant routing is portable. Engine in `middleware.ts` reads BMT-specific data from `config/domain-routes.ts`. Clean seam (introduced 2026-03-24).
- Tenant registry centralized in one file.
- Sanity schema discipline (everyone uses `defineField` + `defineType`).
- Article rendering is server-side with `JsonLd` helpers — AEO-ready foundation.
- Sitemap is programmatic and pulls from DB (not hand-maintained).
- `outsider-economics-v2/` posts read at build time (per CLAUDE.md, not verified in this audit).

**Risks / fragility:**

- `apps/web/middleware.ts` has 312 lines with growing PUBLIC_BYPASS_PATHS list and per-route exemptions. Each new public surface adds a code path. As the surface grows, an answer-page route at `/answers/[slug]` will need to be added to the bypass list (otherwise it routes to `/(tenant)/answers/[slug]` which doesn't exist).
- `apps/web/config/tenants.ts` couples tenant identity, theme, GCS bucket, and feature list in one file. If a brand needs feature-flag logic, this gets dense fast.
- Many `/admin/*` routes (`/hq`, `/strategic-mural`, `/bridge`, `/marketplace`, `/business`, `/subscriptions`, `/dashboard`, `/links`, `/orders`, `/create`) — significant admin surface. Worth a separate audit for which are alive vs experimental. Likely 20–40% are abandoned.
- `apps/web/app/api/grok/`, `/api/dispatch/`, `/api/cron/sync-github-asana/` — verify cron schedules + which are actually wired. Cron without `CRON_SECRET` envelope is a risk.
- `apps/web/server.ts` — custom Next.js server file present. Rare in App Router projects. Verify why it exists; if unused, delete.
- `apps/web/build_fail_trace.txt` checked into the working tree. Either keep in `.gitignore` or rotate.
- 115 unique env vars referenced. `.env.example` lists ~5. Anyone bootstrapping local dev cannot find what's needed.

**Dead / suspicious:**

- Several admin routes look experimental (`/admin/strategic-mural`, `/admin/marketplace`, `/admin/whiteboard`, `/admin/hq`).
- `/whiteboard/partner-meeting-2026-04-20/` — date-stamped one-time page still in production code. Should be archived.
- `/demo/presentation/` — verify still used.

### 4. Sanity / content audit

**`answerPage` schema status:** **NOT IMPLEMENTED.** Spec at `docs/aeo/sanity-answerpage-schema.md`. The schema must be created at `apps/web/sanity/schemas/answerPage.ts` and registered in `apps/web/sanity/schemas/index.ts` for content to be paste-able.

**Spec verification (what the spec says it should have):** title (string, required), slug (auto from title), answer (text 50–80 words, required), details (string array), editorial (portable text), business (enum: big-muddy / studio-c / mbt / bearsville / tuthill, required), category (string), images (array of {asset, role, alt}, max 4), imageStatus (enum: missing/partial/complete, default missing), updatedAt (datetime, required), citationTarget (boolean, default true), relatedAnswers (reference array, optional).

Spec matches the audit-task description except `updatedAt` is `required` in spec — confirm with Chase.

**Convention match:** Spec mirrors `apps/web/sanity/schemas/faq.ts` and `article.ts` patterns. Brand enum value list is consistent with `faq.ts` brand list — good.

**Schema gaps:**

- No `seo` group (meta description, OG image override). Article has it; answerPage spec does not.
- No `publishedAt` distinct from `updatedAt`. May matter for `Article` JSON-LD.
- No author field. Spec author note says "use string default" or hardcode — fine, but worth confirming.

**Render rule (per spec):** answer block first; under 80 words; no internal links inside answer; image placeholder always renders. Renderer does not exist yet.

### 5. AEO readiness audit

**Crawler access (per `apps/web/app/robots.ts`):**

- Welcomed: GPTBot, ChatGPT-User, Claude-Web, ClaudeBot, PerplexityBot, Applebot-Extended, Google-Extended, Bytespider, CCBot, cohere-ai.
- **Not explicitly named:** OAI-SearchBot, Bingbot. Both fall under default `User-agent: *` (allowed except `/admin/`, `/api/`, etc.). Add explicit entries for clarity.
- Disallow list includes `/jp/`, `/tracy/`, `/amy/`. Good — partner consoles stay out of index.
- Sitemap list (line 71–80) includes `buycurious.art/sitemap.xml` even though `sitemap.ts` removed buycurious. Fix one or the other.

**Sitemap (`apps/web/app/sitemap.ts`):**

- Programmatic, pulls Magazine articles from Prisma.
- Brand list includes `bearsvillemediagroup.com` — good.
- **No `/answers/*` URLs.** Will need to add an `answerEntries` block once schema + route exist.

**SSR / answer-block visibility:**

- `apps/web/app/magazine/articles/[id]/page.tsx` — server component, no `'use client'`. Good.
- The new `/answers/[slug]` route, when built, must also be a server component. Verify with `curl` per the AEO publish checklist.

**Schema.org coverage (`apps/web/lib/structured-data.tsx`):**

- Have: Organization, WebSite (with SearchAction), Article, Event.
- Missing for AEO: **FAQPage**, **LocalBusiness**.
- The AEO publish checklist requires both FAQPage and Article JSON-LD on every answer page. FAQPage helper does not exist yet.
- LocalBusiness helper needed for Big Muddy Inn (referenced from related Inn pages).

**Answer route doesn't exist:**

- `/Users/chasethis/hillbilly-dreams/apps/web/app/answers/` — does not exist.
- Slug pattern per spec: `/answers/{kebab-case-question}` — per `aeo-publish-checklist.md`.
- Will need: `app/answers/[slug]/page.tsx` (server component), `app/answers/[slug]/page.tsx` should fetch from Sanity by slug, render in canonical order (H1 → answer block → image slot → details → editorial → related → JSON-LD blocks).
- Middleware needs `/answers` added to `PUBLIC_BYPASS_PATHS` OR routed correctly per tenant.

**Concrete Patch task list for crawlability/indexing:**

1. Add OAI-SearchBot + Bingbot explicit entries to `robots.ts`.
2. Reconcile `buycurious.art` between `robots.ts` sitemap list and `sitemap.ts` brand list.
3. Add `FAQPage` and `LocalBusiness` helpers to `lib/structured-data.tsx`.
4. Add `answerEntries` to `sitemap.ts` once schema + route exist.
5. Fix `llms.txt` infrastructure line ("Firebase App Hosting" → "Vercel").
6. Add Bearsville Creative + correct "Venture Gallery" name to `llms.txt`.
7. Decide whether `/answers` lives at `bigmuddymagazine.com/answers/...` (per AEO checklist) or `bigmuddytouring.com/answers/...` (per current consolidation). Update domain-routes.ts + middleware accordingly.

### 6. Operating-system docs audit

**`docs/operations/wpc-handbook.md`:** Excellent. One page. Partner-readable. No fluff. Adheres to the voice doc. Keep.

**`docs/voice/admin-documentation-voice.md`:** Strong. Includes formats for tasks, status updates, internal email. The "Could someone act on this in 10 seconds?" test is clear. Keep.

**`docs/voice/cos-ingestion-rule.md`:** Sharp. Defines triggers, format, owner defaults, hard rules. Includes Asana GIDs. Operationally usable.

**Per-brand voice docs (`docs/voice/big-muddy-*.md`, `studio-c.md`, `tuthill-design.md`, `chase-pierson-photography.md`):** Generated 2026-04-19 by Gemini batch script. Coverage looks complete. **`studio-c.md` opens with the wrong positioning** ("production arm of Tuthill Design LLC"). Fix.

**Onboarding (`docs/onboarding/`):** Per-role docs (Tracy, Amy, Vicki, realtor template, civic broker tier, records artist, blues room door staff, bearsville partner). Look usable. **Verify each file does not still teach a deprecated DSD tier or call partners "employees."**

**`docs/onboarding-2026-04-20/`:** This bundle predates the 2026-04-19 retraction. The pro-forma + URL checklist still teach the deprecated walk-in motion. **Deprecate the bundle or re-cut, but do not hand it to partners as-is.**

**Minimum canonical set for partners (recommend):**

- `docs/operations/wpc-handbook.md` — how the week works.
- `docs/voice/admin-documentation-voice.md` — how we communicate.
- `docs/onboarding/` per-role files — what to do.
- A new one-page positioning summary (per "Missing docs" above).

That's it. Everything else lives behind the scenes for agents.

### 7. Environment / deployment audit

**Code references 115 unique env vars.** `.env.example` lists 5. Bootstrap is impossible from `.env.example` alone.

**Notable env vars by category:**

- **Auth:** `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID/SECRET`, `APPLE_CLIENT_ID/SECRET`, `FACEBOOK_APP_ID/SECRET`, `META_APP_ID/SECRET`.
- **DB:** `DATABASE_URL`.
- **Sanity:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `SANITY_API_VERSION`, `SANITY_DATASET`, `SANITY_PROJECT_ID`, `SANITY_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`, `SANITY_WEBHOOK_SECRET`.
- **AI:** `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `OPENAI_API_KEY`, `OPENROUTER_API_KEY`, `PERPLEXITY_API_KEY`, `XAI_API_KEY`.
- **GCS / Vertex:** `GCS_BUCKET`, `GCP_PROJECT_ID`, `GOOGLE_CLOUD_PROJECT`, `GOOGLE_APPLICATION_CREDENTIALS_JSON`, `VERTEX_AI_LOCATION`, `VERTEX_LOCATION`, `VERTEX_PROJECT_ID`.
- **Cloudbeds:** `CLOUDBEDS_API_BASE`, `CLOUDBEDS_API_KEY`, `CLOUDBEDS_PROPERTY_ID`, `CLOUDBEDS_WEBHOOK_SECRET`.
- **Stripe:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` + 4 deprecated `STRIPE_PAYMENT_LINK_*` (per CLAUDE.md, leave for now, no new flow).
- **Asana:** `ASANA_ACCESS_TOKEN`, `ASANA_PAT`, `ASANA_CEO_PROJECT_GID`.
- **Cloudflare:** `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`.
- **Cron:** `CRON_SECRET`, `NEXT_PUBLIC_CRON_DEBUG_TOKEN`.
- **Postiz, Spotify, MeiliSearch, Plex, OpenBroadcaster, GHU, NTFY, QBO, BLS** all present.

**Missing `.env.example` entries:** essentially everything except the 5 listed. This is a partner trust break too — anyone (Elijah, Miles, future Studio C team) trying to run locally cannot.

**Secrets / token assumptions:**

- `OPENAI_API_KEY` referenced in code; CLAUDE.md flags as `[verify]`. Confirm presence in Vercel.
- `XAI_API_KEY` — appears in code. Not previously listed in CLAUDE.md routing table.
- `GH_TOKEN` AND `GITHUB_TOKEN` AND `GITHUB_WEBHOOK_SECRET` — verify naming consistency.
- `BMT_BRIDGE_SECRET`, `COMMERCE_WEBHOOK_SECRET`, `STRIPE_COMMERCE_WEBHOOK_SECRET`, `STRIPE_CONNECT_WEBHOOK_SECRET`, `STRIPE_WEBHOOK_SECRET_COMMERCE` — multiple webhook secrets. Confirm none are duplicates.

**Deprecated storage assumptions:**

- No Vercel KV references found in apps/web (good).
- `Firebase App Hosting` mentioned in middleware comments and llms.txt — purely historical now. Cleanup pass.

**Upstash Redis (cos-status-dashboard):**

- Confirmed: `cos-status-dashboard/lib/agent-state.ts` imports `@upstash/redis`. Reads `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Falls back gracefully when not configured. This is the agent state store for Cos.

### 8. Risk register

| Rank | Risk | Evidence | Why it matters | Recommended fix | Owner |
|---|---|---|---|---|---|
| **CRITICAL** | `answerPage` schema not implemented | `apps/web/sanity/schemas/index.ts` does not list it; no file at `schemas/answerPage.ts` | First 7 Big Muddy answer pages cannot be paste-published. AEO lane stalled. | Implement per `docs/aeo/sanity-answerpage-schema.md`, register in index. | Patch |
| **CRITICAL** | `/answers/[slug]` route does not exist | `apps/web/app/answers/` does not exist | Pages have no surface to live on. AEO checklist gate cannot fire. | Build server-component route per spec. Add to `PUBLIC_BYPASS_PATHS` in middleware. | Patch |
| **CRITICAL** | Studio C positioned as "production arm of Tuthill Design LLC" in 2 canonical locations | `docs/voice/studio-c.md` line 10; `apps/web/config/tenants.ts` line 63 | Contradicts 2026-04-29 locked truth. If Studio C is admin/implementation vendor for MBT, this is brand-level misalignment that surfaces to partners and code. | Chase decides current truth (admin vendor vs production arm). Then update both files. | Chase |
| **CRITICAL** | `docs/onboarding-2026-04-20/` teaches deprecated DSD walk-in subscription motion | `01-business-case-and-pro-forma.md` lines 95, 101; `05-demo-day-url-checklist.md` line 31 | Partners (Tracy, Amy) reading these are pointed at a sales motion we no longer run. Trust break. | Mark the 2026-04-20 bundle DEPRECATED in its README. Re-cut pro-forma against THE_THESIS Y1 numbers ($185k net floor / $250k first profit / $330k baseline). | Chase + Cos |
| **HIGH** | `BUSINESS_ARCHITECTURE.md` and `THE_THESIS.md` disagree on what MBT is | Two definitions: licensed civic OS vs operating layer of our ecosystem | Agents reading the wrong file produce wrong copy. Public-facing pages drift. | One-line resolution from Chase, then re-cut BUSINESS_ARCHITECTURE.md or remove it in favor of THE_THESIS + a thin glossary. | Chase |
| **HIGH** | HDI cleanup pass overdue | 67 doc files + 20+ code files | "HDI = dead language" per CLAUDE.md (2026-04-18). Live UI surfaces (admin/hq) still use HDI branding. Confuses partners + agents. | Sed sweep across docs (preserve in archive). Code: rename `hdi-links.ts`, `/hillbilly/org-chart`, admin/hq title strings. | Patch |
| **HIGH** | `.env.example` is sparse; 115 vars used | `apps/web/.env.example` (5 vars) vs grep count | Cannot bootstrap local dev without Bitwarden + Chase. Slows Elijah/Miles onboarding. | Generate canonical `.env.example` with all keys + comments + Bitwarden item names. | Patch |
| **HIGH** | `llms.txt` says "Firebase App Hosting" | `apps/web/public/llms.txt` line 84 | LLMs scraping this page will misrepresent our infrastructure publicly. | One-line edit: "Vercel". | Patch |
| **HIGH** | "Venture Gallery Gallery" typo in llms.txt | `apps/web/public/llms.txt` Brands list | Public-facing wrong brand name. | Fix to "Venture Gallery". | Patch |
| **MEDIUM** | `buycurious.art` referenced in `robots.ts` sitemap list but not in `sitemap.ts` brands | `apps/web/app/robots.ts` line 76 vs `apps/web/app/sitemap.ts` lines 14–15 | 404 for the sitemap URL = soft-error in Search Console. | Pick one. Per CLAUDE.md, gallery is now `venturegallery.art` / `measurablybetter.life` storefront. | Patch |
| **MEDIUM** | Missing FAQPage + LocalBusiness JSON-LD helpers | `apps/web/lib/structured-data.tsx` | AEO publish checklist requires FAQPage on every answer page. Ship-blocker for the AEO gate. | Add helpers before publishing first 7. | Patch |
| **MEDIUM** | OAI-SearchBot + Bingbot not explicitly named in robots.ts | `apps/web/app/robots.ts` | They fall under default rules (allowed). Low risk in practice; high clarity if explicit. | Add 2 entries. | Patch |
| **MEDIUM** | Onboarding bundle 2026-04-20 carries JP Houston as live partner | `docs/onboarding-2026-04-20/01-business-case-and-pro-forma.md` Q2 row | JP departed 2026-04-15 per BUSINESS_ARCHITECTURE.md. Partners reading it will be confused. | Tag bundle DEPRECATED + re-cut. | Chase + Cos |
| **MEDIUM** | Many `/admin/*` routes — unclear which are alive | `apps/web/app/admin/` (40+ routes) | Code rot. Partners click into half-built dashboards and lose trust. | Inventory + audit. Mark experimental routes with banner or behind feature flag. | Patch |
| **MEDIUM** | `apps/web/app/whiteboard/partner-meeting-2026-04-20/` — date-stamped page in production | filesystem | Stale time-bound surface. | Move to `_archive/` or delete. | Patch |
| **LOW** | `apps/web/server.ts` — custom server in App Router project | `apps/web/server.ts` | Unusual; may conflict with Vercel build. | Confirm purpose; remove if unused. | Patch |
| **LOW** | `.docx` shadows of major docs in `docs/` root | `THE_THESIS.docx`, `STORY_KIT.docx`, etc. | Partner sharing convenience but drift surface. | Decide on master format. If `.md` wins, regenerate `.docx` only on demand. | Chase |
| **LOW** | `apps/web/build_fail_trace.txt` checked in | working tree | Noise. | `.gitignore` it. | Patch |

### 9. 7-day action plan

**Friday (today, 2026-04-29) — UNBLOCK AEO**

1. Patch implements `apps/web/sanity/schemas/answerPage.ts` per spec. Registers in `index.ts`.
2. Patch builds `apps/web/app/answers/[slug]/page.tsx` (server component, canonical render order).
3. Patch adds `FAQPage` + `LocalBusiness` JSON-LD helpers to `lib/structured-data.tsx`.
4. Patch adds `/answers` to `middleware.ts` `PUBLIC_BYPASS_PATHS`.

**Saturday — VERIFY + PASTE**

5. Tracy verifies the 3 flagged claims in `big-muddy-pages-1-7-ready.md` ("attached" vs "inside" Blues Room; Inn-as-musician-lodging accurate?; "listening room" framing).
6. Chase pastes pages 1–7 into Sanity (after schema lands).
7. Patch runs `curl https://bigmuddymagazine.com/answers/best-place-to-stay-natchez-live-music` to confirm SSR HTML contains the answer paragraph.

**Sunday — INTERNAL LINKS + SITEMAP**

8. Patch adds 5 internal links from homepage / `/shows` / `/inn` / 2–3 existing magazine articles, pointing into the 7 new answer pages.
9. Patch updates `app/sitemap.ts` to include `/answers/*` URLs.
10. Submit URLs to Google Search Console for indexing.

**Monday — CRAWLER HARDENING + DOCS CLEANUP (PARTNER TRUST)**

11. Patch fixes `llms.txt` ("Firebase App Hosting" → "Vercel"; "Venture Gallery Gallery" → "Venture Gallery"; add Bearsville).
12. Patch fixes `buycurious.art` inconsistency between `robots.ts` and `sitemap.ts`.
13. Patch adds OAI-SearchBot + Bingbot explicit entries to `robots.ts`.
14. Cos marks `docs/onboarding-2026-04-20/` README as DEPRECATED with a one-line note pointing to current onboarding.

**Tuesday — POSITIONING RESOLUTION**

15. Chase decides Studio C positioning: admin/implementation vendor for MBT, OR production arm of Tuthill Design, OR both.
16. Chase decides MBT positioning: ecosystem operating layer (THE_THESIS) vs licensed civic OS (BUSINESS_ARCHITECTURE) vs both.
17. Cos updates `docs/voice/studio-c.md` line 10 to match.
18. Cos updates `apps/web/config/tenants.ts` Studio C entity field.
19. Cos drafts `docs/positioning/2026-04-29-locked.md` — one page, four locked truths, links from CLAUDE.md.

**Wednesday — MEASURE + LOCK**

20. Chase runs the 10 baseline AEO queries (per `aeo-publish-checklist.md`) across ChatGPT, Perplexity, Gemini.
21. Capture starting state. Adjust 2–3 answer paragraphs for sharper phrasing.
22. Lock the format.

**Thursday — DEFER**

- Pages 8–20 wait until format is locked and 1 week of measurement is in.
- Studio C / MBT AEO lanes wait until Big Muddy gate passes.
- HDI cleanup pass starts with a single sed-and-review session, not a sweep.
- `.env.example` cleanup — needed but not blocking AEO.

---

## Recommended file edits (DO NOT make them — list only)

### Urgent (partner trust + AEO blockers)

1. **CREATE** `apps/web/sanity/schemas/answerPage.ts` — copy from `docs/aeo/sanity-answerpage-schema.md` spec.
2. **EDIT** `apps/web/sanity/schemas/index.ts` — import + add `answerPage` to `schemaTypes`.
3. **CREATE** `apps/web/app/answers/[slug]/page.tsx` — server component, canonical render order per spec.
4. **EDIT** `apps/web/middleware.ts` line ~110 — add `/answers/` to `PUBLIC_BYPASS_PATHS`.
5. **EDIT** `apps/web/lib/structured-data.tsx` — add `getFAQPageSchema()` + `getLocalBusinessSchema()`.
6. **EDIT** `apps/web/app/sitemap.ts` — append `answerEntries` block.
7. **EDIT** `docs/voice/studio-c.md` line 10 — fix Studio C positioning per Chase decision.
8. **EDIT** `apps/web/config/tenants.ts` line 63 — fix Studio C entity per Chase decision.
9. **EDIT** `docs/onboarding-2026-04-20/00-README.md` — add DEPRECATED banner with redirect.

### High (correctness, public-facing)

10. **EDIT** `apps/web/public/llms.txt` line 84 — "Firebase App Hosting" → "Vercel".
11. **EDIT** `apps/web/public/llms.txt` Brands list — fix "Venture Gallery Gallery" typo, add Bearsville Creative.
12. **EDIT** `apps/web/app/robots.ts` — add OAI-SearchBot + Bingbot blocks; remove `buycurious.art` from sitemap list (or restore in `sitemap.ts`).
13. **EDIT** `apps/web/lib/structured-data.tsx` — remove `buycurious.art` from `getOrganizationSchema().sameAs`.
14. **EDIT** `apps/web/middleware.ts` lines 12, 19 — remove "Firebase App Hosting" comments.

### Medium (drift, cleanup)

15. **EDIT** `docs/BUSINESS_ARCHITECTURE.md` — re-cut to align with THE_THESIS, OR add a top banner "SUPERSEDED BY docs/THE_THESIS.md, see specific sections still current".
16. **CREATE** `docs/positioning/2026-04-29-locked.md` — one-page summary of 4 locked truths.
17. **CREATE** `docs/voice/answer-page-rules.md` — codify under-80-word rule, no internal links inside answer, etc.
18. **EDIT** CLAUDE.md — link to the new positioning doc; clarify Studio C role.
19. **EDIT** `apps/web/app/admin/hq/page.tsx` line 254 — replace "Hillbilly Dreams Inc — Executive Dashboard" with current entity name.
20. **REVIEW** `apps/web/app/whiteboard/partner-meeting-2026-04-20/page.tsx` — archive or refresh.
21. **EDIT** `apps/web/.env.example` — populate with all 115 keys (categorized + commented).

### Low (housekeeping)

22. **EDIT** `apps/web/.gitignore` — add `build_fail_trace.txt`.
23. **REVIEW** `apps/web/server.ts` — confirm purpose; remove if unused.
24. **REVIEW** `outsider-economics-v2/` wiring — confirm `lib/posts.ts` reads from it (per CLAUDE.md).

---

## Open questions for Chase

1. **Studio C role:** admin/implementation vendor for MBT (per 2026-04-29 lock) OR production arm of Tuthill Design (per voice doc + tenants.ts) OR both? Once you pick, two files update and the brand confusion ends.
2. **MBT definition:** ecosystem operating layer (THE_THESIS) OR licensed civic OS (BUSINESS_ARCHITECTURE) OR both? If "both," which framing leads on `measurablybetter.life`?
3. **Tuthill scope:** RE photo only (2026-04-29 lock) — does this retire the broader "Tuthill Design" branding for the design studio, or only narrow the new Tuthill Design Photography service line? Tuthill voice doc still describes a full design studio (LiDAR, AI floor plans, branded media).
4. **Answer pages domain:** publish at `bigmuddymagazine.com/answers/...` or `bigmuddytouring.com/answers/...`? AEO checklist says magazine; recent Cloudflare consolidation moved magazine content to touring. Need to pick one.
5. **`docs/onboarding-2026-04-20/`:** deprecate the bundle outright, or surgical re-cut of just `01` and `05`?
6. **HDI cleanup scope:** full sweep this week, or "do it as we touch each file"? Full sweep is one-day project; ad-hoc is forever.
7. **`docs/BUSINESS_ARCHITECTURE.md`:** keep as separate doc updated to match THE_THESIS, or merge into THE_THESIS and delete?

---

## Notes on what was NOT verified in this pass

- `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` content — currency not checked.
- `docs/90_DAY_PLAN.md` — not opened.
- `outsider-economics-v2/` actual wiring — assumed per CLAUDE.md.
- Bitwarden item presence for each service mentioned in env vars.
- Cloudbeds API actually working.
- Each `/admin/*` route's liveness.
- Sanity Studio plugin `bmm-library` — not opened.
- Whether Asana cron jobs (`api/cron/sync-github-asana`) are actually running and not failing silently.
- All 67 HDI references in docs (sampled, not enumerated).
- All 20+ HDI references in code (sampled, not enumerated).
- `packages/database/` schema currency.

---

*End of audit. Generated 2026-04-29.*
