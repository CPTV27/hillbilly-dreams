# Agent status

## 2026-04-05 — Backlog slice: DCTV, WiFi config, press verify, Studio C + Feed Farm, TS fixes

- **DCTV tenant:** [`config/tenants.ts`](../apps/web/config/tenants.ts) — `dctv` + domains `dctvny.org`, `dctv.org`. [`domain-routes.ts`](../apps/web/config/domain-routes.ts) — patterns `dctvny`, `dctv.org`; `/dctv` + `/feed-farm` in brand prefixes + dev brands. New routes: [`app/dctv/`](../apps/web/app/dctv/).
- **WiFi captive:** [`config/wifi-portal-locations.ts`](../apps/web/config/wifi-portal-locations.ts) — shared location table + `NEXT_PUBLIC_WIFI_PORTAL_BASE_URL` for QR / splash origin. Wired [`welcome/wifi/page.tsx`](../apps/web/app/welcome/wifi/page.tsx) + [`welcome/wifi/qr/page.tsx`](../apps/web/app/welcome/wifi/qr/page.tsx).
- **Press QC:** duplicate `src=` across all `public/press/*.html` → **0** duplicate URLs; per-file dupes → **0**. Victorian/mansion strings remain editorial copy only (not a stock-photo ban violation).
- **Studio C / Feed Farm:** [`/studioc/catalog`](../apps/web/app/studioc/catalog/page.tsx), [`/studioc/about`](../apps/web/app/studioc/about/page.tsx), [`/feed-farm`](../apps/web/app/feed-farm/page.tsx). [`studioc/layout.tsx`](../apps/web/app/studioc/layout.tsx) nav links fixed `/studio` → `/studioc` + Catalog/About.
- **TS:** [`dawn/chat`](../apps/web/app/api/dawn/chat/route.ts) + [`grok/chat`](../apps/web/app/api/grok/chat/route.ts) tool-loop typing fixes (restore clean `tsc`).
- **Not done (CC / schema):** DCTV equipment + Event Production Prisma models — hand off to CC per file ownership.
- **QC:** `pnpm --filter @bigmuddy/web exec tsc --noEmit` — pass.

---

## 2026-04-05 — Voice/stream E2E + CoS AgentAction filter + prod deploy

- **Tests:** [`e2e/voice-stream.spec.ts`](../e2e/voice-stream.spec.ts) — anonymous `POST /api/voice/stream` expects **401**; optional authed tests when `E2E_SESSION_COOKIE` set; live Gemini when `RUN_VOICE_STREAM_E2E=1`. Run: `pnpm exec playwright test e2e/voice-stream.spec.ts --project=local`.
- **Chief of Staff:** [`.claude/agents/CHIEF_OF_STAFF.md`](../.claude/agents/CHIEF_OF_STAFF.md) — Delta Dawn voice relay monitoring via `GET /api/admin/agent-actions?agent=delta-dawn-voice&action=chief-of-staff-relay&minutes=30&limit=50`.
- **API:** [`GET /api/admin/agent-actions`](../apps/web/app/api/admin/agent-actions/route.ts) — optional `agent` and `action` query params filter `AgentAction` rows; response includes `filters`.
- **Deploy:** Vercel production completed (inspect URL in deploy output / Vercel dashboard).

---

## 2026-04-05 — Delta Dawn voice agent + DB read tools (constellation / touring)

- **Voice:** [`POST /api/voice/stream`](../apps/web/app/api/voice/stream/route.ts) — Delta Dawn system prompt ([`lib/voice/dawn-voice-system-prompt.ts`](../apps/web/lib/voice/dawn-voice-system-prompt.ts)), `MODELS['gemini-flash']`, multi-turn Gemini tool loop (max 8 rounds). Still admin-gated (`requireAdmin`).
- **Tools:** [`app/api/voice/tools.ts`](../apps/web/app/api/voice/tools.ts) — added read-only Prisma tools: `get_constellation_stats`, `get_constellation_subgraph`, `search_touring_venues`, `list_corridor_cities`, `list_tour_routes`, `search_directory_listings` (plus existing directory/shows/articles/reviews).
- **Shared graph:** [`lib/constellation/querySubgraph.ts`](../apps/web/lib/constellation/querySubgraph.ts) — used by [`GET /api/constellation`](../apps/web/app/api/constellation/route.ts) and voice tools.
- **Chief of Staff relay:** each successful turn appends `AgentAction` (`agent: delta-dawn-voice`, `action: chief-of-staff-relay`). No GenAI Toolbox / arbitrary SQL — whitelisted tools only.
- **QC:** `pnpm --filter @bigmuddy/web exec tsc --noEmit` — pass.

---

## 2026-04-05 — Postgres constellation layer (implemented)

- **Prisma:** `ConstellationNode`, `ConstellationEdge` in [`packages/database/prisma/schema.prisma`](../packages/database/prisma/schema.prisma). Migration: [`packages/database/prisma/migrations/20260405163000_constellation_layer/migration.sql`](../packages/database/prisma/migrations/20260405163000_constellation_layer/migration.sql) (tables + 4 materialized views + unique indexes for refresh).
- **Seed:** [`scripts/graph-lab/seed-constellation.ts`](../scripts/graph-lab/seed-constellation.ts) — derives nodes/edges from `CorridorCity`, `DirectoryBusiness`, `TouringVenue`, `TouringHotel`, `TouringRestaurant`, `TourRoute`, `TourRouteStop`. **Views:** `pnpm --filter @bigmuddy/database run refresh:constellation-views` after seed.
- **API:** [`GET /api/constellation`](../apps/web/app/api/constellation/route.ts) — `entityType`, `entityId`, `depth` (0–4); no params returns `{ meta: { nodeCount, edgeCount } }`.
- **UI:** [`/constellation`](../apps/web/app/constellation/page.tsx) — registry + container/presentational split + HTML Canvas renderer ([`components/constellation/`](../apps/web/components/constellation/)).
- **Make live:** `pnpm --filter @bigmuddy/database exec prisma migrate deploy` (or `db push` if you do not use migrations — **do not** apply both paths to the same objects). Then `pnpm --filter @bigmuddy/database run seed:constellation` and `pnpm --filter @bigmuddy/database run refresh:constellation-views`.
- **QC:** `pnpm --filter web exec tsc --noEmit` — pass.

---

## 2026-04-03 — Delta Dawn widget → Gemini + Grok fallback

- **`POST /api/dawn/chat`:** Streams SSE `data: {"text":"…"}` then `data: [DONE]`. Loads full system text from [`docs/ops/DELTA_DAWN_ONBOARDING_PROMPT_V2.md`](../docs/ops/DELTA_DAWN_ONBOARDING_PROMPT_V2.md) via [`lib/delta-dawn-system-prompt.ts`](../apps/web/lib/delta-dawn-system-prompt.ts). Primary: **Gemini 2.5 Flash** with `GEMINI_API_KEY` and `@google/genai` (model id from [`lib/ai-models.ts`](../apps/web/lib/ai-models.ts) `gemini-flash`). User turns prefixed with `[Page: …]` server-side when `page` is sent. Fallback: **same-origin `POST /api/grok/chat`** with `systemPrompt` + `skipTools: true`.
- **Grok route:** Optional `systemPrompt` and `skipTools`; validates `messages` is an array.
- **Widget:** [`DeltaDawnWidget.tsx`](../apps/web/components/DeltaDawnWidget.tsx) — `fetch` stream parse, **localStorage** key `delta-dawn-chat-v1`, **usePathname** for header + per-message `page`, send disabled while streaming.
- **QC:** `pnpm exec tsc --noEmit -p apps/web` pass; `pnpm --filter @bigmuddy/web lint` exit 0.

---

## 2026-04-05 — Sunday Morning Batch 2 (Tracy testing live)

- **Branch:** `sunday-batch-2-tracy` — 6 commits: tour Records URL → **bigmuddyrecordlabel.com**; **system-health** `build` + **asanaPat**; **HQ** card shows Asana/Cron/build; **admin** Store links absolute + external, HQ **◈**; **PATCH /api/page-edits**; **docs/QC_DOMAIN_CHECK.md** + **RAG_AUDIT_SUNDAY_AM.md**.
- **Prod DSD:** `curl` grep — no `corridor` / `musician` / `artist profile` in homepage HTML.
- **ProductionJob:** 14 rows, all **voiceover**; 14 **ProductionArtifact**; none stuck at `script`.
- **QC:** `pnpm exec tsc --noEmit -p apps/web` pass; `pnpm test:p0` 4 passed, 3 skipped.

---

## 2026-04-05 — Sunday Morning Dispatch (Tracy QA slice)

- **DSD / routing:** [`domain-routes.ts`](../apps/web/config/domain-routes.ts) — `/platform` in `BMT_BRAND_PREFIXES` so hostname rewrites do not break `/platform/*` on tenant hosts. [`directory/layout.tsx`](../apps/web/app/directory/layout.tsx) header subtitle → **Deep South**. No `CORRIDOR MUSICIANS` UI in repo; `directory/page.tsx` not modified. If prod still shows it, redeploy or clear edge cache.
- **Admin @ ~375px:** [`admin/layout.tsx`](../apps/web/app/admin/layout.tsx) — tighter padding + `overflow-x: hidden` on `.admin-content` ≤480px. [`report-card`](../apps/web/app/admin/report-card/page.tsx) feedback stats grid → `auto-fit` + single column ≤480px. [`revenue`](../apps/web/app/admin/revenue/page.tsx), [`churn-alerts`](../apps/web/app/admin/churn-alerts/page.tsx) — `minWidth: 0` / scroll table `minWidth: 520`. [`links`](../apps/web/app/admin/links/page.tsx) — single column ≤600px; Records → **bigmuddyrecord.com**. [`launch`](../apps/web/app/admin/launch/page.tsx) pilot tier copy **$25/mo**.
- **Store:** [`store/sovereign-pi/page.tsx`](../apps/web/app/store/sovereign-pi/page.tsx) — hero + use-case images from **GCS** (`bmt-media-bigmuddy`) so images load without local `/images` bundle.
- **Press:** [`public/press/index.html`](../apps/web/public/press/index.html) — **Updated April 5, 2026**, one-line external disclaimer, section labels for 7 + 5 + podcast.
- **RAG baseline:** [`docs/audit/RAG_AUDIT_SUNDAY_AM.md`](../docs/audit/RAG_AUDIT_SUNDAY_AM.md) + [`scripts/rag-audit-loop.sh`](../scripts/rag-audit-loop.sh) grep fallback when `rg` missing. Infra notes: [`docs/audit/SUNDAY_DISPATCH_INFRA.md`](../docs/audit/SUNDAY_DISPATCH_INFRA.md).
- **DB:** `pnpm --filter @bigmuddy/database exec prisma db push` — **pass** (Neon in sync, `NpsResponse`).
- **QC:** `pnpm exec tsc --noEmit -p apps/web` — pass. `pnpm test:p0` — 4 passed, 3 skipped (unchanged).

---

## 2026-04-06 — OVERNIGHT_TASKS P0/P1 slice (press gate, pricing, roadmap brands, domain check)

- **Press:** [`middleware.ts`](../apps/web/middleware.ts) — `/press` and `/press/*` require `isAllowedUser` JWT; response sets **`X-Robots-Tag: noindex, nofollow`**. [`/admin/press`](../apps/web/app/admin/press/page.tsx) hub + sidebar **Press mocks** link (resolves to `/admin/press`).
- **Pricing / copy:** Musician onboard [`musician/page.tsx`](../apps/web/app/directory/onboard/musician/page.tsx) — five tiers (Free / Essentials $25 / Pro $50 / Marketing $99 / Engine $250); legacy `?tier=listing|works|engine` mapped. [`FlywheelLens.tsx`](../apps/web/app/admin/ecosystem/FlywheelLens.tsx) directory metric updated.
- **Corridor purge (code):** [`articles.ts`](../apps/web/lib/articles.ts) `DEEP_SOUTH_GUIDE_CITIES` + deprecated `CORRIDOR_CITIES` alias; magazine pages import new name; [`measurably-better/page.tsx`](../apps/web/app/measurably-better/page.tsx) `PLATFORM_REGIONS`.
- **Roadmap sandbox:** [`public/sandbox/roadmap.html`](../apps/web/public/sandbox/roadmap.html) — section 03 brand cards → spaced alternating image/text cards (`2rem` gap); “corridor” → Deep South / regional in copy; brands wrapped in single `.container`.
- **Domains:** [`.workflow/DOMAIN_HEALTH_CHECK.md`](./DOMAIN_HEALTH_CHECK.md) — curl table (two hosts returned empty first line from this environment; noted in table).
- **QC:** `pnpm exec tsc --noEmit -p apps/web` — pass.

**Not done this pass (still on OVERNIGHT_TASKS):** Dependabot triage, stale branch deletes, `gh issue list`, press HTML 375px pass, NpsResponse migration push, remaining `apiLog` / `console.log` in API routes, `obs-client` path alignment, P3 backlog items.

---

## 2026-04-06 — Autonomous batch (#91, #88, #92, #68, toolRegistry)

- **#91:** [`/hillbilly/org-chart`](../apps/web/app/hillbilly/org-chart/page.tsx) — back link, `TENANTS` live section, correct **bigmuddyrecordlabel.com** + **buycurious.art** URLs, MBT → measurablybetter.life, `<style>` instead of `dangerouslySetInnerHTML`, mobile padding. Footer link already on [`hillbilly/page.tsx`](../apps/web/app/hillbilly/page.tsx).
- **#88:** [`admin/command/page.tsx`](../apps/web/app/admin/command/page.tsx) — horizontal scroll tab strip, 44px+ touch targets, task filters + status `select` at 16px, stacked task cards on narrow view.
- **#92:** [`GET /api/cron/sync-github-asana`](../apps/web/app/api/cron/sync-github-asana/route.ts) — label **`sync-asana`** → Asana project `1213753731475702`; map in `AgentContext` domain `asana_sync`. Needs `GITHUB_TOKEN` or `GH_TOKEN` + `ASANA_ACCESS_TOKEN` + Vercel Cron.
- **#68:** [`POST /api/webhooks/stripe`](../apps/web/app/api/webhooks/stripe/route.ts) — `commerce=marketplace` checkout: decrement `ApprovedSupply`, optional `CreditLedger` affiliate commission. Env: **`STRIPE_COMMERCE_WEBHOOK_SECRET`** (separate Stripe webhook endpoint).
- **Build:** `toolRegistry` uses single `z` for `queryLoreSchema` (no duplicate import).

`pnpm --filter @bigmuddy/web typecheck` — pass.

---

## 2026-04-05 — Swarm pass (GitHub issues)

- **#57 closed:** `GET /api/admin/agent-audit` + Command Center **Audit** tab (merged AgentAction + ReasoningTrace). Commit `17619b7`.
- **#54 closed:** `POST /api/admin/marketplace/seed-topology` (idempotent DSD + Bearsville marketplace graph); admin business empty state points to it. Commit `18ff2ae`.
- **#77 (open):** Phase 2 slice — accepting a Studio C request creates `ProductionJob` + `jobId`; admin queue links to `/admin/productions/[id]`. Commit `94546f4`.
- **#78:** Blocker comment posted (Meta app + env). Skipped execution.
- **`memory/feedback_brand_family.md`:** not in repo; skipped read.

---

## 2026-04-03 — Natchez Protocol “Master Key” wiring (schema + hub pulse + routes)

- **Prisma:** Restored `User.creditLedgers`; added `Contest`, `Submission`, `DisplayChannel`. Run `pnpm db:generate` (done) and `pnpm db:push` (or migrate) with `DATABASE_URL=postgresql://chasethis@localhost:5432/hillbilly_sovereign` before using new tables.
- **Pulse:** `EventProducer.broadcastPulse` → `io.emit('sovereign_pulse', …)`; `applyCreditDelta` in [`apps/web/lib/sovereign/wallet.ts`](../apps/web/lib/sovereign/wallet.ts) writes `CreditLedger` + emits credit pulse. Contest enter API emits submission pulse.
- **Hub:** [`apps/web/server.ts`](../apps/web/server.ts) — `join_display` / `leave_display` rooms `display-{slug}`.
- **Routes:** [`/admin/kiosk`](../apps/web/app/admin/kiosk/page.tsx) + [`KioskLiveClient`](../apps/web/app/admin/kiosk/KioskLiveClient.tsx); [`/display/[slug]`](../apps/web/app/display/[slug]/page.tsx) (YouTube embed + ticker + top `AdCampaign` via [`pickTopCampaign`](../apps/web/lib/ads/pickTopCampaign.ts)); [`/admin/contests`](../apps/web/app/admin/contests/page.tsx); [`POST /api/sovereign/contests/[id]/enter`](../apps/web/app/api/sovereign/contests/[id]/enter/route.ts). Resources hub shows live credits + OE field manual CTA + `LoreEntry` namespaces on tasks.
- **Script:** [`scripts/economy/ad-auctioneer.ts`](../scripts/economy/ad-auctioneer.ts) reuses `pickTopAdCampaign`.
- **Env:** Optional `NEXT_PUBLIC_SOVEREIGN_HUB_URL` when the browser does not share origin with the Socket.io hub.

### Quality gate

`pnpm exec tsc --noEmit` in `apps/web` (pass)

---

## 2026-04-04 — Phase 2.5 Synology indexer skeleton

- **Script:** [`scripts/media/synology-indexer.ts`](../scripts/media/synology-indexer.ts) — XMP/RDF parse (`xmp:Rating`, `xmp:Label`, `dc:subject` / `rdf:Bag`), `chokidar` watch, `--file=` one-shot, `SYNOLOGY_MEDIA_PATH`, `SYNOLOGY_INDEXER_WRITE` (Prisma stub until `VisualAsset` gains metadata).
- **Fixture:** [`scripts/media/fixtures/bridge-sample.xmp`](../scripts/media/fixtures/bridge-sample.xmp)
- **Root:** `pnpm media:synology-indexer` — deps: `chokidar`, `fast-xml-parser`, `tsx` (workspace root `-w`).

---

## 2026-04-04 — Phase 2.4 Glass UI (`/admin/kiosk`)

- **Route:** [`/admin/kiosk`](../apps/web/app/(admin)/admin/kiosk/page.tsx) — optional `?session=`; staff gate via [`layout.tsx`](../apps/web/app/(admin)/admin/kiosk/layout.tsx).
- **Client:** [`KioskGlassClient.tsx`](../apps/web/app/(admin)/admin/kiosk/KioskGlassClient.tsx) — Idle / Thinking (65vw hero overlay + dimmed answer) / Resolved (25% **left** Provenance rail + Framer Motion). Socket.io → **`NEXT_PUBLIC_SOVEREIGN_HUB_URL`** or same-origin.
- **Reducer:** [`glassReducer.ts`](../apps/web/lib/sovereign/glassReducer.ts) — `sovereign_event` → `GlassState`.
- **Spec:** [`docs/SOVEREIGN_GLASS_KIOSK_SPEC.md`](../docs/SOVEREIGN_GLASS_KIOSK_SPEC.md) updated with implementation pointers.

### Quality gate

`pnpm exec tsc --noEmit` in `apps/web` (pass)

---

## 2026-04-03 — Phase 2.3 Event Producer (Socket.io + Glass contract)

- **Hub server:** [`apps/web/server.ts`](../apps/web/server.ts) — Next + Socket.io on **`0.0.0.0`**; rooms **`kiosk-room-{sessionId}`** (`join_session`), legacy **`next-kiosk`** (`join_kiosk`). **`pnpm dev:hub`** (`tsx server.ts`). Not for Vercel.
- **Emitter:** [`apps/web/lib/agent/eventProducer.ts`](../apps/web/lib/agent/eventProducer.ts) — wire events: **`session.init`**, **`reasoning.delta`**, **`tool.call.start` / `tool.call.end`**, **`lore.citation`**, **`message.delta` / `message.final`** (payload shape). **`global.sovereignIo`** + **`ioTemplate`**.
- **Lore tool:** [`tool.lore.query.ts`](../apps/web/lib/agent/tools/tool.lore.query.ts) — Chroma **`DefaultEmbeddingFunction`** + **`IncludeEnum`**; emits tool + citation events with distance→confidence heuristic.
- **Reasoning tap:** [`reasoningStreamTap.ts`](../apps/web/lib/sovereign/reasoningStreamTap.ts) — `<|think|>` / `</redacted_thinking>` / `[/think]` heuristic; bridge [`llmStreamBridge.ts`](../apps/web/lib/sovereign/llmStreamBridge.ts).
- **Smoke API:** `POST /api/sovereign/events/emit-test` (admin) — emits sample stream when Hub is up.
- **Deps:** **`chromadb-default-embed`**, **`tsx`**; **`tsconfig`** **`baseUrl`** for Node module resolution.

### Quality gate

`pnpm exec tsc --noEmit` in `apps/web` (pass)

---

## 2026-04-03 — Phase 2.1 Editorial Bureau (schema + registry + desk)

- **Prisma:** `Job` gains `draftContent`, `humanEditedContent`, `redPenNotes` (Text); `assignedHuman` → `onDelete: SetNull`. Editorial block (`Brand`, `StyleGuide`, `Job`, `VisualAsset`) unchanged structurally — run **`pnpm db:migrate`** / **`db push`** locally so columns exist.
- **OpenRouter:** [`apps/web/lib/ai/openRouter.ts`](../apps/web/lib/ai/openRouter.ts) — shared completion helper; **`generateTextRedPen`** (Gemma 31B + `<|think|>` prefix → JSON, Claude fallback); **`generateStyleMatchScore`** (Gemma 26B-class); **`OPENROUTER_MODEL_IDS`** re-export. Slugs in [`apps/web/lib/ai-models.ts`](../apps/web/lib/ai-models.ts) **`OPENROUTER_SLUGS`**.
- **Handlers:** [`apps/web/lib/agent/handlers/editorialBureau.ts`](../apps/web/lib/agent/handlers/editorialBureau.ts) — **`tool.visual.placeholder`** (Imagen → WebP → GCS → `VisualAsset`), **`system.content-review`**, **`system.editorial.style_match`**.
- **Registry:** [`toolRegistry.ts`](../apps/web/lib/agent/toolRegistry.ts) — three tools registered with **`execute`**.
- **Orchestrate:** [`orchestrate.ts`](../apps/web/lib/agent/handlers/orchestrate.ts) — when **`context.styleGuideId`** is set, injects few-shot **`StyleGuide`** block into routing prompt.
- **APIs:** `GET/PATCH /api/admin/editorial/jobs`, `GET/PATCH /api/admin/editorial/jobs/[id]`, `POST /api/admin/editorial/style-match` — all **`requireAdmin()`**; publish requires **`assignedHumanId === session.user.id`**.
- **UI:** [`/admin/editorial`](../apps/web/app/(admin)/admin/editorial/page.tsx) — inbox, side-by-side draft vs editor, Voice Guard, Red Pen notes panel, link back to Studio.

### Quality gate

`pnpm exec tsc --noEmit` in `apps/web` (pass)

---

## 2026-04-06 — Phase 1: `rook.harvest` contract-coded (registry vanguard)

- **Handler:** [`apps/web/lib/agent/handlers/harvest.ts`](../apps/web/lib/agent/handlers/harvest.ts) — `HarvestInputSchema` (strict Zod: `city`, `category`, `radius`, `limit`; no `url`/`depth`/`maxPages`/`proxyRegion` until the pipeline uses them), `executeHarvest()` → `HarvestResult`.
- **Registry:** [`apps/web/lib/agent/toolRegistry.ts`](../apps/web/lib/agent/toolRegistry.ts) — `TOOL_REGISTRY` allowlist; first tool **`rook.harvest`**, **`authClass: ToolAuthClass.ADMIN`**, **`name: 'Directory Harvest'`**.
- **Route:** [`apps/web/app/api/agent/harvest/route.ts`](../apps/web/app/api/agent/harvest/route.ts) — thin wrapper: **`requireAdmin()`** → **`toolRegistry.get('rook.harvest').execute(body)`** (in-process; no self-`fetch`).
- **`radius`** is in the contract for forward compatibility; Places/geo wiring is still future work.

### Quality gate

`pnpm exec tsc --noEmit -p apps/web` (pass)

---

## 2026-04-06 — Phase 1.1: `rook.orchestrate` + registry dispatch

- **Handler:** [`apps/web/lib/agent/handlers/orchestrate.ts`](../apps/web/lib/agent/handlers/orchestrate.ts) — `executeOrchestrate()`; **`/api/agent/*` tools resolved via `normalizeAgentToolPath` → `toolRegistry.get(id).execute(params)`** (no internal HTTP for harvest/context/action). **`/api/marketing/*`** still uses server `fetch` until those tools are promoted.
- **Registry:** [`rook.orchestrate`](../apps/web/lib/agent/toolRegistry.ts) with **`OrchestrateInputSchema`**; **`agent.context` / `agent.action`** wired to **`ContextPostInputSchema` / `ActionPostInputSchema`** + **`executePostContext` / `executePostAction`**. **`system.context.*` / `system.action.*`** keep explicit **`execute`** fns for the universal **`POST /api/agent`** contract.
- **Routes:** [`api/agent/orchestrate/route.ts`](../apps/web/app/api/agent/orchestrate/route.ts) thin wrapper; [`api/agent/route.ts`](../apps/web/app/api/agent/route.ts) uses **`toolRegistry.get(toolId)`** (fixes tools without inline `execute`, e.g. **`rook.orchestrate`**). **`api/agent/harvest/route.ts`** restored for admin UI compatibility.
- **Live feed:** orchestration writes **`orchestrate_memory`**, **`orchestrate_route`**, **`orchestrate_tool`**, **`orchestrate`** (and **`orchestrate_failed`**) rows to **`agentAction`**.
- **Removed:** duplicate **`contextWrite` / `actionLog`** handlers (consolidated on **`handlers/context.ts`** + **`handlers/action.ts`**).

### Quality gate

`pnpm exec tsc --noEmit -p apps/web` (pass)

---

## 2026-04-06 — Phase 0.7 Stealth ops lockdown (mutators)

- **`/api/ops/tasks/[id]`:** `PATCH` → **`requireAdmin()`** (replaces non-enforced `auth()` stub).
- **`/api/ops/tasks/sync-asana`:** `POST` → **`requireAdmin()`** (replaces session-only check).
- **`/api/integrations`:** `POST` → **`requireAdmin()`**.
- **`/api/integrations/[id]`:** `PATCH`, `DELETE` → **`requireAdmin()`**.
- **`/api/integrations/cloudbeds`:** `POST` → **`requireAdmin()`** (GET unchanged this pass).
- **`/api/admin/*`:** Already gated; no change.
- **Excluded by design:** `POST /api/ops/chat` stays **session-optional** per existing product/DECISIONS (not bulk-wrapped).

### Quality gate

`pnpm exec tsc --noEmit -p apps/web` (pass)

---

## 2026-04-06 — Phase 0.6 B2B perimeter + rejection gate + cron

- **`/api/gallery/applications/[id]/reject`:** **`requireAdmin()`** on POST (mirror approve).
- **`/api/clients/[id]/*` mutators:** shared **`requireAdminOrClientContact(clientId)`** in [`lib/client-api-auth.ts`](../apps/web/lib/client-api-auth.ts) — admin **or** session email matches `Client.contactEmail` / `Client.email` (PATCH/DELETE on `route.ts`; POST on calendar, report, reviews, reviews/respond, voice).
- **Cron:** **`requireCronOrAdmin(request)`** on **`process-enrichment-queue`**, **`sync-census`**, **`sync-touring`** (POST + GET delegates to POST).

### Quality gate

`pnpm exec tsc --noEmit -p apps/web` (pass)

---

## 2026-04-06 — PII mutator auth batch

- **`/api/gallery/applications/[id]/approve`:** **`requireAdmin()`** on POST (Stripe Connect + user PII).
- **`/api/productions/[id]/voiceover`:** **`requireAdmin()`** on POST (TTS/GCS + `ProductionArtifact`).
- **`/api/gallery/applications`:** **`auth()`** on POST; user resolved from **session email** only; optional `body.email` must match session (spoofing closed).
- **Docs:** [`docs/audit/security_pulse_audit_deeper.md`](../docs/audit/security_pulse_audit_deeper.md) (Antigravity export + snapshot note).

### Quality gate

`pnpm exec tsc --noEmit -p apps/web` (pass)

---

## 2026-04-06 — Phase 0 Iron Gates (API auth)

- **`/api/productions/[id]/approve`:** **`requireAdmin()`** on POST (production job / artifact approval).
- **`/api/agent/orchestrate`:** **`requireAdmin()`** on POST (internal dispatcher; blocks unauthenticated `fetch` to arbitrary paths).
- **`/api/content/approve`:** **`requireAdmin()`** on POST (calendar / post / review pipeline approvals).

### Quality gate

`pnpm exec tsc --noEmit -p apps/web` (pass)

---

## 2026-04-05 — Overnight queue sweep (security, logging, CI, docs)

- **`lib/cron-or-admin.ts`:** shared with **`publish/batch`** and **`/api/metrics`** mutating methods.
- **`/api/metrics`:** GET = **admin**; POST/PUT = **cron bearer or admin**; bulk upsert wrapped in **`$transaction`**.
- **`/api/metrics/[key]`:** GET = **admin**; PUT = **cron or admin**.
- **`lib/api-logger.ts`:** JSON-line logs; **`billing/webhook`**, **`webhooks/cloudbeds`**, **`directory`** error path migrated.
- **CI:** **`SENTRY_AUTH_TOKEN`** available in **build** job (set repo secret for uploads).
- **Docs:** [`.workflow/DECISIONS.md`](DECISIONS.md), refreshed [`.workflow/OVERNIGHT_TASKS.md`](OVERNIGHT_TASKS.md).
- **E2E:** optional authenticated deploys test via **`E2E_SESSION_COOKIE`** ([`e2e/smoke.spec.ts`](../e2e/smoke.spec.ts)).

### Quality gate

`pnpm turbo typecheck lint --filter=@bigmuddy/web` · `pnpm test:smoke` (6 passed, 1 skipped)

---

## 2026-04-04 — Cursor onboarding + queue

- **New to Cursor?** Read [`.cursor/CURSOR_SETUP.md`](../.cursor/CURSOR_SETUP.md) (vs Claude Code, rules, git, quality gate).
- **Master backlog:** [`.workflow/OVERNIGHT_TASKS.md`](OVERNIGHT_TASKS.md) (sections A–H).

---

## 2026-04-04 — Auth audit batch 2

### What changed

- **`/api/ops/chat`:** `GET ?view=admin` requires **`requireAdmin()`** (cross-user chat/activity no longer public).
- **`/api/agent/context`**, **`/api/agent/action`:** **`requireAdmin()`** on GET and POST.
- **`/api/ops/content`:** **`requireAdmin()`** on GET.
- **`/api/publish`** (GET/POST), **`/api/publish/execute`:** **`requireAdmin()`**.
- **`/api/publish/batch`:** **`CRON_SECRET`** bearer (prod) **or** **`requireAdmin()`** (matches other cron routes).
- **`/api/media/generate`:** **`requireAdmin()`**; **`/api/marketing/poster`** uses in-process **`generateImage`** + GCS upload (no self-HTTP to media/generate).

### Quality gate

`pnpm type-check` · `pnpm lint` · `pnpm build` · `pnpm test:smoke`

---

## 2026-04-04 — Docs alignment + ops/admin API guards

### What changed

- **`CLAUDE.md`**, **`.cursorrules`**, **`docs/ARCHITECTURE.md`:** Next.js version pinned to **14.2.x** (`apps/web/package.json`); deploy = **Vercel** (removed stale Firebase App Hosting / Firebase secrets references); domain counts clarified (**18** hostname patterns vs `CLAUDE.md` **14** marketing domains); middleware `getToken` note updated (no Cloud Run).
- **`/api/ops/reviews/draft`**, **`/api/ops/reviews/approve`**, **`/api/ops/onboarding-checklist`**, **`/api/ops/amy`**, **`/api/admin/deploys`:** **`requireAdmin()`** on every request so unauthenticated callers get **401/403** (aligns with `docs/ARCHITECTURE.md` admin access).

### CI / Sentry (follow-up for Chase)

- **`.github/workflows/ci.yml`** does **not** pass `SENTRY_AUTH_TOKEN` or run Sentry source-map upload. To get readable stack traces in production: add org/project/auth token to **GitHub Actions secrets** and wire the **Sentry Next.js** upload step (or Vercel’s Sentry integration) — see Sentry docs for Next 14.

### Quality gate (run locally)

`pnpm type-check` · `pnpm lint` · `pnpm build`

---

## 2026-04-03 — QA complete, branch pushed, PR open

### CI / deploy

- **Branch:** `release/internal-ready-2026-04-04` (pushed to `origin`)
- **PR:** https://github.com/CPTV27/hillbilly-dreams/pull/25 → merge to `main` for **Vercel production deploy** (per your workflow)
- **GitHub** reported Dependabot vulnerabilities on the repo — separate from this release; triage in Security tab when you can.

### Automated QA (this branch)

| Step | Result |
|------|--------|
| `pnpm type-check` | Pass |
| `pnpm lint` | Pass (warnings only: img hooks) |
| `pnpm build` | Pass |
| `pnpm test:smoke` | **5/5** — Touring, `/`, static roadmap, `/hillbilly/roadmap` redirect, `/directory` |

Playwright now uses **port 3334** by default so smoke tests do not attach to another app on **:3000**.

### Post-merge smoke (production)

1. `https://<prod>/sandbox/roadmap.html`
2. `https://hillbillydreamsinc.com/roadmap` (308 → static)
3. `https://deepsouthdirectory.com/directory` (or your DSD host)
4. `/admin/roadmap` after Google sign-in

---

## 2026-04-03 — Pre–internal-users pass (roadmap asset + canonical copy + QA)

### What changed

- **`public/sandbox/roadmap.html`:** New static internal roadmap (dark/gold, `noindex`). Tier summary **Free / Core / Growth / Partner**, parity reminder, links to `/competitive-analysis.html` and `/admin/roadmap`. **`/hillbilly/roadmap` → 308 → this file** — no longer 404 after deploy.
- **`CLAUDE.md`:** DSD section updated — retail **pricing TBD**, tier names, Stripe env note when checkout goes live (removed fixed $20/$49/$99 table as canonical).
- **`public/competitive-analysis.html`:** One table row updated so “homepage pricing” language matches **TBD** stance.

### QA (this branch)

- `pnpm type-check` — **pass** (tsc --noEmit for `@bigmuddy/web`)
- `pnpm lint` — **pass** (existing warnings only: `<img>`, hook deps — no new errors)
- `pnpm build` — **pass** (run earlier in session; re-run before deploy if large changes since)

### Files touched (this pass)

- `apps/web/public/sandbox/roadmap.html` (new)
- `CLAUDE.md`
- `apps/web/public/competitive-analysis.html`

### Earlier same-day (still relevant)

- Admin `/admin/roadmap`, directory DSD tiers + onboard tier params, `hillbilly/roadmap` redirect route — see git history.

### Deploy checklist

1. Commit all intended files (including untracked API/media routes if in scope).
2. **Smoke:** `GET /sandbox/roadmap.html`, `GET /hillbilly/roadmap` (redirect), `GET /competitive-analysis.html`, sign-in **`/admin/roadmap`**.
3. Internal users: confirm **admin allowlist** emails in Vercel / NextAuth.

### Blockers

- None for static roadmap path. Product catalog DB / seed script — **not** in this repo snapshot; merge separately if on another branch.

---

## 2026-04-04 — Roo Code (VS Code / Cursor-compatible)

### Added

- **`.roo/rules/00-hdx-read-first.md`** — workspace rules for Roo: points at `docs/ARCHITECTURE.md`, `CLAUDE.md`, `docs/BUSINESS_ARCHITECTURE.md`, `.cursorrules`; GA scope; MCP note (`${env:...}` in `.roo/mcp.json`).
- **`.vscode/extensions.json`** — recommends Marketplace extension **`RooVeterinaryInc.roo-cline`**.

### Your steps (local)

1. Install **Roo Code** from the Marketplace (or accept the workspace recommendation when the editor prompts).
2. Open Roo’s settings → add your **API provider / API key** (OpenRouter, Anthropic, etc., per [Roo docs](https://docs.roocode.com/getting-started/installing)).
3. Optional: Roo pane → **MCP** → **Edit Project MCP** to create `.roo/mcp.json` (commit only non-secret config; use env vars for tokens).
4. Work in this repo: Roo loads **`.roo/rules/`** alphabetically plus root **`AGENTS.md`** / **`AGENT.md`** if present (this repo uses **`CLAUDE.md`** + **`.cursorrules`** as the long-form source of truth).

---

## 2026-04-04 — Worktrees: elegant merged to integrate branch; heuristic backlog

- **PR (open):** `integrate/elegant-volhard-2026-04-04` → `main` — admin reviews + monthly PDF + cron; includes PDF `NextResponse` typing fix. Create PR: https://github.com/CPTV27/hillbilly-dreams/pull/new/integrate/elegant-volhard-2026-04-04
- **Handoff doc (on that branch):** `.workflow/AGENT_HANDOFF_TASKS.md` — heuristic worktree product-catalog Prisma WIP, cron checklist, worktree cleanup commands.
- **`main`:** unchanged until PR merges; local `.gitignore` update for `.playwright-mcp/` ships with the PR.

---

## 2026-04-03 — Phase 1.7 Studio OS Command Plane

- **Registry API:** [`apps/web/app/api/admin/registry/route.ts`](../apps/web/app/api/admin/registry/route.ts) — `requireAdmin()` + `getClientSafeRegistryManifest()` (Zod → JSON Schema via `zod-to-json-schema`); metadata only.
- **Pulse API:** [`apps/web/app/api/admin/agent-actions/route.ts`](../apps/web/app/api/admin/agent-actions/route.ts) — optional `minutes=1..60` filters `AgentAction.createdAt` and `AgentContext.updatedAt`; merged feed includes context `detailPreview`.
- **UI:** [`apps/web/app/(admin)/admin/studio/page.tsx`](../apps/web/app/(admin)/admin/studio/page.tsx) — tool picker, JSON-Schema-driven command form, `POST /api/agent` with `{ toolId, params }`, `StudioPulseFeed` polls last 5 minutes.
- **Omnipush:** former Content Studio moved to [`/admin/studio-omnipush`](../apps/web/app/admin/studio-omnipush/page.tsx); admin nav **Studio OS** + **Omnipush**.

### Quality gate

`pnpm exec tsc --noEmit -p apps/web` (pass)

---

## 2026-04-03 — Phase 1.8 Sandbox mirroring

- **Prisma:** `DraftBusiness`, `DraftAction`, `DraftContext` (with `User` / optional `Client`); duplicate Draft block near `CorridorCity` removed.
- **Harvest:** `rook.harvest` writes Draft* only when `ToolRunContext.isSandbox === true`; prod writes unchanged.
- **POST /api/agent:** Injects `isSandbox` from JSON body and `createdByUserId` from session into `ToolExecuteOptions` / `ToolRunContext`.
- **Studio OS:** Sandbox checkbox + pulse merges `draft_action` / `draft_context`.
- **DB:** Run `pnpm exec prisma db push` from `packages/database` (or your migration process) before using Draft* in production.

### Quality gate

`prisma validate` + `prisma generate` + `pnpm exec tsc --noEmit -p apps/web` (pass)
