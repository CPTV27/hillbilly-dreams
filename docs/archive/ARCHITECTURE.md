# System architecture — Sovereign Studio (2026)

Single source of truth for how the **HDX web app** runs agentic work: registry, HTTP edges, admin UI, and sandbox. For business entities and domains, see `docs/BUSINESS_ARCHITECTURE.md`.

## 1. Tool registry (`apps/web/lib/agent/toolRegistry.ts`)

- **Allowlist:** Every in-process tool has an `id`, Zod `inputSchema`, `authClass`, optional `modelTier`, and handler wiring.
- **Execution:** `toolRegistry.get(id).execute(params, options)` validates params and builds `ToolRunContext` (Token Guard budget, trace, telemetry flags, sandbox stamp, session user id from the HTTP edge).
- **Documentation authority:** `getClientSafeRegistryManifest()` (`apps/web/lib/agent/registryManifest.ts`) exports the same metadata the admin UI consumes — ids, names, descriptions, tiers, and **JSON Schema** from `zod-to-json-schema`. No handlers, env, or file paths are exposed.

## 2. Universal bouncer: `POST /api/agent`

**Primary entry for registry tool execution.**

- **Route:** `apps/web/app/api/agent/route.ts`
- **Body:** `{ toolId, params, isSandbox?, maxTokens?, maxSpend?, traceId?, includeTelemetry? }`
- **Auth:** Admin session (`requireAdmin()`); `createdByUserId` is taken from the server session only — never from untrusted `params`.
- **Sandbox:** `isSandbox: true` sets `ToolRunContext.isSandbox`. Mutating handlers must **branch or die** (e.g. `rook.harvest` writes `DraftBusiness` / `DraftContext` / `DraftAction` instead of production directory + agent tables).

## 3. Admin metadata: `GET /api/admin/registry`

- **Route:** `apps/web/app/api/admin/registry/route.ts`
- **Auth:** `requireAdmin()`
- **Response:** `{ version, tools[], generatedAt }` — client-safe manifest for Studio OS / Agents UI and for **generated docs**:
  - Offline: `pnpm sync-docs` → `node scripts/sync-docs.mjs` (imports manifest via jiti; writes `apps/manual/docs/reference/tool-registry.md`).
  - Online: `pnpm exec tsx scripts/sync-docs.ts` with **`pnpm dev`** running (fetches `http://localhost:3000/api/admin/registry`; writes `docs/tools/*.md`).

## 4. Compatibility HTTP surfaces (admin, non-registry shape)

These exist for **Brain search**, **action log HTTP**, and **legacy harvest POST** — all admin-gated. They delegate to Prisma or in-process registry code; they are **not** a second execution engine.

| Path | Role |
|------|------|
| `GET/POST /api/agent/context` | Query / upsert `AgentContext` (keyword search + writes). |
| `GET/POST /api/agent/action` | Query / append `AgentAction`. |
| `POST /api/agent/harvest` | Thin wrapper → `rook.harvest` (same as `POST /api/agent` with `toolId: 'rook.harvest'`). |

**Preferred pattern for new work:** `POST /api/agent` + `toolId` from the registry.

## 5. Studio OS & command plane

- **`/admin/studio`** — Tool picker, schema-driven form, optional **Sandbox mode** toggle, pulse feed (prod + draft rows).
- **`/admin/agents`** — Alternate command plane layout.
- **Pulse API:** `GET /api/admin/agent-actions` — merged recent `AgentAction`, `AgentContext`, `DraftAction`, `DraftContext` (optional time window via `minutes`).

## 6. Token Guard & LLM routing

- **Router:** `apps/web/lib/ai/openRouter.ts` — `generateTextWithTierOrVertex` centralizes tier selection, budget, and telemetry.
- **Tiers:** `apps/web/lib/ai/modelTier.ts` — registry tools declare `modelTier` where relevant (e.g. `rook.orchestrate` → ARCHITECT).
- **Exceptions:** Native audio/STT paths (e.g. voice stream, Whisper) remain ring-fenced; do not fold them into OpenRouter without an explicit integration design.

## 7. Prisma sandbox mirrors (Phase 1.8)

- **Models:** `DraftBusiness`, `DraftAction`, `DraftContext` in `packages/database/prisma/schema.prisma` — optional `createdByUserId` → `User`, optional `clientId` on drafts.
- **Promotion:** Not automated here; Phase 1.9+ can move approved `DraftBusiness` rows into `DirectoryBusiness`.

## 8. Doc sync (Docusaurus)

From repo root:

```bash
node scripts/sync-docs.mjs
```

Writes `apps/manual/docs/reference/tool-registry.md`. Add that page to the manual sidebar (see `apps/manual/sidebars.ts`).

---

*We build local. The value stays local. We grow from within.*
