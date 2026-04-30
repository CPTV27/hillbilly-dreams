# Big Muddy assistant — chat + router

MVP shipped 2026-04-29. Router layer shipped 2026-04-30. The minimum-viable front door for the Big Muddy ecosystem. Streams Claude responses, routes to specialist agents when the question fits a lane, escalates to Asana when a human has to do something physical.

## What ships today

| File | Purpose |
|---|---|
| `apps/web/app/chat/page.tsx` | Single-page chat UI. Renders main reply, specialist cards (badge + accent border), and Asana escalation callout. |
| `apps/web/app/api/chat/route.ts` | POST endpoint. Streams Anthropic responses as SSE. Wires `which_specialist`, `route_to_specialist`, and `create_task` tools. |
| `apps/web/lib/specialist-registry.ts` | The 10-specialist registry — Patch, Finance Director, Gallery Director, Bearsville Studio, R&D Touring, Mac Mini Photo Lab, North Star, QA Agent, Insurance & Risk, Cos. Plus the keyword-scorer that picks one. |
| `apps/web/lib/big-muddy-context.ts` | Loads canonical docs into the system prompt. 5-minute in-memory cache. (Unchanged from MVP.) |
| `apps/web/middleware.ts` | One-line edit (MVP): `/chat` and `/chat/` added to `PUBLIC_BYPASS_PATHS` so the tenant rewriter leaves it alone. (Unchanged from MVP.) |

## What the router does

The chat learned to make three moves on any user turn:

1. **Answer directly** when the question is in-context and a focused expert is overkill.
2. **Route to a specialist** when the question fits a lane — engineering, finance, design, touring, brand, photo, content, insurance, QA. The specialist is a system-prompt + model preference, fired as a one-shot sub-call to the same Claude API. The reply streams inline under a badge: `✦ Patch · Engineering`.
3. **Escalate to Asana** when the work needs a human to physically do something (book a band, deploy something Chase has to authorise, fix a wall socket at the Inn, cut an invoice).

Specialists are NOT spawned Claude Code sub-agents. Each is an in-process API call with a focused system prompt — cheap, fast, no extra infra.

### Decision tree

```
user question
  │
  ├─ Can I answer from the loaded context?              → just answer
  │
  ├─ Does it fit a specialist lane?                     → which_specialist → route_to_specialist
  │     • Engineering / SSH / build / deploy            → Patch
  │     • Money / forecast / pricing / billing          → Finance Director
  │     • Photo curation / image / gallery              → Gallery Director
  │     • Write / draft / article / page copy           → Bearsville Studio
  │     • Tour / artist / venue / routing               → R&D Touring
  │     • Lightroom / batch image processing            → Mac Mini Photo Lab
  │     • Brand / voice / design tokens                 → North Star
  │     • Review / verify / QA against rules            → QA Agent
  │     • Insurance / liability / risk                  → Insurance & Risk
  │     • Cross-functional / catch-all                  → Cos
  │
  └─ Does this need a human to physically do it?        → create_task → Asana Inbox
        • Chase: deploy, code, SSH, fix on the box
        • Elijah: design, mix, Studio C work
        • Tracy: money moves, billing, invoices
        • Amy: Inn, bar, Blues Room operations
```

### Specialist registry

Defined in `apps/web/lib/specialist-registry.ts`. Each entry:

```ts
{
  id: 'patch',
  name: 'Patch',
  description: 'Engineering: builds, deploys, infrastructure, SSH, code, broken sites, server outages.',
  domains: ['deploy', 'build', 'fix', 'ssh', 'code', /* ... */],
  systemPrompt: `${VOICE_PREAMBLE}\n\nYou are Patch — Big Muddy's Technical Director...`,
  model: 'claude-sonnet',  // or 'claude-opus', 'gemini-pro' (gemini falls through to sonnet for now)
}
```

The keyword scorer (`scoreSpecialists`) gives `+3` for whole-token matches and `+1` for substring matches across the `domains` array. Cos is excluded from scoring — it's the explicit fallback when nothing matches.

### How to add a specialist

1. Append a new entry to `SPECIALISTS` in `apps/web/lib/specialist-registry.ts`.
2. Pick a unique `id` (kebab-case).
3. List 5–15 high-signal `domains` keywords. Lowercase. Single words preferred; multi-word phrases are matched as substrings.
4. Write a `systemPrompt` that opens with the shared `VOICE_PREAMBLE` (already exported as a constant — interpolate it).
5. Pick a `model` (`claude-sonnet` for most, `claude-opus` for hard reasoning, `gemini-pro` will currently fall through to sonnet).

No code changes required outside the registry file. The `which_specialist` tool's `enum` is built from `SPECIALISTS.map(s => s.id)` so adding an entry is enough.

## SSE event shape

The API streams these event types (each as `data: <json>\n\n`):

| Event | Meaning |
|---|---|
| `{ type: 'text', delta }` | Main chat text token |
| `{ type: 'specialist', phase: 'start', specialist: { id, name, description, model } }` | About to start a sub-call |
| `{ type: 'specialist', phase: 'delta', specialistId, delta }` | Specialist text token |
| `{ type: 'specialist', phase: 'end', specialistId }` | Specialist done |
| `{ type: 'specialist', phase: 'error', specialistId, error }` | Specialist sub-call failed |
| `{ type: 'tool', name: 'which_specialist', payload: { id, name, score, source, ranked } }` | Router scorer ran |
| `{ type: 'tool', name: 'route_to_specialist', payload: { ok, specialistId, ... } }` | Sub-call wrapper completed |
| `{ type: 'tool', name: 'create_task', payload: { ok, taskGid, taskUrl, assigneeLabel } }` | Asana task created (or failed) |
| `{ type: 'error', message }` | Stream-level error |
| `{ type: 'done' }` | Stream complete |

The UI renders the main text in the standard assistant bubble, each specialist response in its own card with `border-left: 3px solid var(--accent)` and a badge, and the Asana callout in a sand-coloured card with a clickable URL.

## Run locally

```bash
cd /Users/chasethis/hillbilly-dreams/apps/web
pnpm dev
```

Open http://localhost:3000/chat — sign in with the existing next-auth flow first if you bounce.

## Required env vars

- `ANTHROPIC_API_KEY` — already set in `apps/web/.env.local`
- `ASANA_PAT` — pull from Bitwarden (item: `Asana — Personal Access Token`) and add to `.env.local` before testing escalation. The chat will load and respond without it; only `create_task` will fail.
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — already set

## Smoke test

1. Visit `/chat` while signed in.
2. **Direct answer** — `What's the room rate at the Inn?` → should answer from the AEO doc context, no specialist card, no escalation.
3. **Routes to Patch** — `The build is failing in CI — what would you check first?` → expect a `✦ Patch · Engineering` card with debugging steps. The console logs will show the `which_specialist` payload picked Patch.
4. **Routes to Finance Director** — `What's the target $/mo for the Service tier and why?` → expect a `✦ Finance Director · Money` card citing the locked tier table.
5. **Escalates to Asana** — `Book Sprinter van service for next Tuesday` → expect the Asana callout (no specialist can do this; needs a human).

## Tool-loop limits

The route handler caps tool turns at `MAX_TOOL_TURNS = 3`. A typical specialist routing flow burns 2 turns: `which_specialist` → `route_to_specialist` (which streams inline) → final wrap. Three is enough headroom for the model to chain `which_specialist` + a route + a fallback escalation in the same user turn.

## What's stubbed / deferred

- **Open Notebook backend.** Context still comes from disk (5 docs in `docs/`). When the Notebook deploys, swap `loadBigMuddyContext()` to fetch from the Notebook API. The function signature does not need to change.
- **Asana assignee field.** Only routes by label in the task body. Need actual Asana user GIDs for Tracy / Amy / Elijah / Chase to populate the `assignee` field.
- **Gemini specialists.** The `model: 'gemini-pro'` option exists in the type but currently falls through to `claude-sonnet` because the route uses the raw Anthropic SDK only. When the AI Gateway / multi-provider wire-up lands, `resolveAnthropicModelId` becomes `resolveModelId` with a real switch.
- **Per-user dashboards / workspace / template gallery.** Separate task. Captured for week of May 5.
- **Native task storage.** Asana is still the source of truth for escalations. Native task system is a separate task.
- **Rate limiting.** None. Single-user MVP scope.
- **Specialist memory.** Each sub-call is one-shot — the specialist does not see prior turns. If a specialist needs a follow-up the user re-asks through the main chat.

## Why no AI SDK?

Same reason as the MVP. Chase's constraint is "no heavy dependencies — use what's already in `package.json`." The Anthropic SDK was already installed and the existing `app/api/grok/chat/route.ts` and the MVP chat route both use the raw-SDK + SSE pattern. The router iteration follows that same convention so the file shape and mental model stay consistent.

The Vercel post-write validator flags the direct SDK import as a recommendation; the override is intentional and documented here. Migration to `@ai-sdk/anthropic` (and concurrent migration of the existing routes) is a clean follow-up the day the AI Gateway / multi-provider story becomes the standard across the codebase.

## Versioning

- 2026-04-29 — MVP: streaming chat, `create_task` escalation only.
- 2026-04-30 — Router: `which_specialist` + `route_to_specialist` tools, 10-specialist registry, UI badges and accent border for specialist replies.
