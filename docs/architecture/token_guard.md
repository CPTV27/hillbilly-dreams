# Architecture: Token Guard (Phase 1.6 - 1.8)

## Philosophy
The "Token Guard" architecture transitions the Big Muddy core from scattered, hardcoded LLM SDK calls (OpenAI, Anthropic) into a sovereign, single-entry architecture. It strictly controls budget, telemetry, and rate limits through the `apps/web/lib/agent/toolRegistry.ts` contract system.

## Phase 1.6: Single-Entry Migration
All textual AI generation across handlers is routed natively via `generateTextWithTierOrVertex` (found in `apps/web/lib/ai/openRouter.ts`). 

### Edge APIs Cleared of Shadow SDKs:
- `apps/web/app/api/social/generate/route.ts`
- `apps/web/app/api/directory/submit/route.ts`
- `apps/web/app/api/clients/[id]/voice/route.ts`
- `apps/web/app/api/clients/[id]/calendar/route.ts`

These handlers pass their requests securely through the `ModelTier.ARCHITECT` or `ModelTier.SMART` router, yielding telemetry directly to the universal tracker.

### Known Edge Exceptions:
- `/api/voice/stream` and `lib/whisper.ts` remain native to `@google/genai` and `openai` (Whisper) respectively. OpenRouter does not natively process raw `.webm` audio STT uploads simultaneously alongside Gemini structured-tool JSON loops yet. This pathway is ring-fenced. Do **not** 'finish the job' on these two paths without full integration confirmation.

## Phase 1.7: Admin Command Plane
`GET /api/admin/registry` is a leak-proof metadata edge: it serializes `TOOL_REGISTRY` fields and `zodToJsonSchema` output only. No handlers or secrets leave the server.

The Studio OS and Agents UI render forms from those JSON Schemas and execute tools through **`POST /api/agent`**.

## Phase 1.8: Sandbox
When `ToolRunContext.isSandbox` is true (set from the admin JSON body and session at the bouncer), mutating tools must write **Draft\*** tables only (`DraftBusiness`, `DraftAction`, `DraftContext`) — not production directory or agent tables. Vanguard: `rook.harvest`.
