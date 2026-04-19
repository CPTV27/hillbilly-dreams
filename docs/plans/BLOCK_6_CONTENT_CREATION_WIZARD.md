# Phase C Block 6 — Content Creation Wizard

*Plan generated 2026-04-18 by Vercel AI Architect agent. To execute after Block 1 (Commerce) ships.*

## 1. Wizard UI Component Tree

Location: `apps/web/app/admin/create/`

```
admin/create/
├── layout.tsx                          # Sidebar nav: Drafts | Templates | History
├── page.tsx                            # Landing: "What are you making today?" grid
├── [contentType]/
│   ├── page.tsx                        # Wizard shell, owns wizardState reducer
│   └── _components/
│       ├── WizardShell.tsx             # 4-step progress rail + slot
│       ├── Step1_Topic.tsx             # Textarea + content-type badge
│       ├── Step2_Context.tsx           # Entity + photo picker (auto-populated, editable)
│       ├── Step3_Generate.tsx          # Streaming draft preview (UIMessage stream)
│       ├── Step4_Review.tsx            # Final preview + "Save to Sanity" CTA
│       ├── EntityChip.tsx              # DirectoryBusiness card
│       ├── PhotoTile.tsx               # Immich asset thumbnail w/ select toggle
│       ├── BrandVoiceBadge.tsx         # Reads template, shows brand voice
│       └── DraftStream.tsx             # AI SDK `useChat` consumer with streaming markdown
└── _state/
    ├── wizardReducer.ts
    └── useWizardStore.ts
```

**Content types:** `'magazine-article' | 'social-post' | 'listing-description' | 'episode-description' | 'pitch-deck-section'`

## 2. Server-Side Orchestration

| Endpoint | Purpose | Pattern |
|---|---|---|
| `POST /api/wizard/context` | Resolve entities + photos from topic | Synchronous JSON, ~5s |
| `POST /api/wizard/generate` | Stream draft via agent | `toUIMessageStreamResponse()` |
| `POST /api/wizard/refine` | Iterative edit (existing endpoint, kept) | Streaming |
| `POST /api/wizard/save` | Write to Sanity as draft | Synchronous JSON |
| `GET /api/wizard/templates/[type]` | Fetch template (cached) | JSON |

**`/api/wizard/generate` uses AI SDK v6 `ToolLoopAgent`:**

```ts
const agent = new ToolLoopAgent({
  model: 'gemini-pro',  // routed via custom provider wrapping callAI
  instructions: getTemplate(contentType).systemPrompt,
  tools: { lookupEntity, fetchPhotoMetadata, getBrandVoice },
  stopWhen: stepCountIs(6),
});
return createAgentUIStreamResponse({ agent, uiMessages: messages });
```

**Why streaming + tool use, not one-shot structured output:**
- Tracy sees the draft form as it generates
- Agent can re-query entities mid-draft if it needs more context
- Tool calls become auditable in the UI

## 3. Per-Content-Type Prompt Templates

Stored in **Sanity** (singletons under `contentTemplate` schema), cached in Vercel Runtime Cache with 5-min TTL.

**Why Sanity, not code:** Tracy needs to tune voice without a deploy.

```ts
{
  name: 'contentTemplate',
  fields: [
    { name: 'contentType', type: 'string', options: { list: [...5 types] } },
    { name: 'audienceProfile', type: 'text' },
    { name: 'voiceRules', type: 'array', of: [{ type: 'string' }] },
    { name: 'systemPrompt', type: 'text' },
    { name: 'lengthTarget', type: 'object', fields: [min, max] },
    { name: 'requiredSections', type: 'array' },
    { name: 'forbiddenPhrases', type: 'array' },
    { name: 'exampleDrafts', type: 'array', of: [{ type: 'reference', to: [{ type: 'article' }] }] },
  ]
}
```

**Brand-voice integration:** systemPrompt assembly merges three layers — base voice, brand-specific rules (Magazine = hospitality vs Radio = music-first), content-type rules.

Magazine ≠ Radio enforced at template level. Wizard refuses to render a `magazine-article` with the radio voice template — runtime check in `getTemplate()`.

## 4. Entity-Pull Integration

New module: `packages/content-creation/src/entity-resolver.ts`

**Two-stage resolution:**

```ts
// Stage 1: structured extraction from topic (small Gemini Flash call)
const { keywords, dateRange, categories, locations } = await extractSearchTerms(topic);

// Stage 2: Prisma queries (parallel)
const [venues, musicians, events] = await Promise.all([
  prisma.directoryBusiness.findMany({
    where: { active: true, visibility: { in: ['approved', 'featured'] }, ... },
    take: 10,
  }),
  prisma.musician.findMany({ where: { performing: { some: { date: { gte, lte } } } }, take: 10 }),
  prisma.showEvent.findMany({ where: { dateTime: { gte, lte } }, take: 20 }),
]);
```

**Visibility gate is critical** — only `visibility: approved | featured` businesses can be cited in published content.

**Future:** swap Stage 2 for pgvector semantic search once business descriptions are embedded.

## 5. Media-Pull Integration (Immich CLIP)

New module: `packages/content-creation/src/immich-client.ts`

**Immich CLIP search endpoint:** `POST https://immich.hillbillydreamsinc.com/api/search/smart`

```ts
async function searchImmich(query: string, opts: { limit: number; takenAfter?: Date }) {
  const res = await fetch(`${IMMICH_BASE}/api/search/smart`, {
    method: 'POST',
    headers: { 'x-api-key': process.env.IMMICH_API_KEY!, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      type: 'IMAGE',
      size: opts.limit,
      takenAfter: opts.takenAfter?.toISOString(),
      withExif: true,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Immich ${res.status}`);
  return (await res.json()).assets.items;
}
```

**Asset URL strategy for Sanity:**
1. Wizard stores Immich `assetId` + display URL on the draft
2. On "Save to Sanity," background worker mirrors selected assets to Sanity's asset CDN (idempotent by Immich asset ID)
3. Avoids hot-linking Immich from public reads

**Cache key:** `immich:search:${sha1(query)}` in Runtime Cache, 1-hour TTL.

## 6. Sanity Write — Schema + Draft Handling

Common fields added to all five content types:
```ts
{
  name: 'wizardMeta', type: 'object', fields: [
    { name: 'topic', type: 'string' },
    { name: 'contentType', type: 'string' },
    { name: 'entityRefs', type: 'array', of: [{ type: 'reference', to: [{ type: 'directoryBusiness' }] }] },
    { name: 'mediaRefs', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'aiModel', type: 'string' },
    { name: 'tokenUsage', type: 'number' },
    { name: 'generatedAt', type: 'datetime' },
  ]
}
```

**Draft-vs-published:** Wizard always writes to Sanity's **drafts dataset prefix** (`drafts.{id}`). Tracy promotes to published in Studio. Wizard never publishes directly.

## 7. New Module: `packages/content-creation/`

```
packages/content-creation/
├── package.json                   # @bigmuddy/content-creation
├── src/
│   ├── index.ts                   # Public API barrel
│   ├── agents/
│   │   ├── wizard-agent.ts        # ToolLoopAgent definition + InferAgentUIMessage export
│   │   └── tools/
│   │       ├── lookup-entity.ts
│   │       ├── search-photos.ts
│   │       └── get-template.ts
│   ├── templates/
│   │   ├── loader.ts              # Sanity fetch + cache
│   │   └── assembler.ts           # Merges voice + brand + content rules
│   ├── entity-resolver.ts
│   ├── immich-client.ts
│   ├── sanity-writer.ts
│   └── types.ts
└── tsconfig.json
```

## 8. AI SDK v6 Chat UI vs Custom Streaming

**Use AI SDK v6 `useChat` + `ToolLoopAgent` + `createAgentUIStreamResponse`.**

- Free tool-call rendering in UI
- `InferAgentUIMessage<typeof wizardAgent>` gives end-to-end typed tool parts
- Built-in retry, abort, message persistence

**Provider integration:** wrap the existing `callAI()` failover into an AI SDK `LanguageModelV2` custom provider so `ToolLoopAgent({ model: 'gemini-pro' })` routes through the existing health-checked failover chain.

## 9. Token Budget Estimate

Per article generation (worst case = magazine article):

| Stage | Input tokens | Output tokens | Model |
|---|---|---|---|
| Topic → search-term extraction | 200 | 150 | Gemini Flash |
| Agent system prompt | 1,500 | 0 | Gemini Pro |
| Entity context (10 businesses × 80 tok) | 800 | 0 | Gemini Pro |
| Photo metadata (12 × 30 tok) | 360 | 0 | Gemini Pro |
| Few-shot examples (2 × 600) | 1,200 | 0 | Gemini Pro |
| Topic + user message | 100 | 0 | Gemini Pro |
| Tool calls (3 × 200 in / 100 out) | 600 | 300 | Gemini Pro |
| **Final draft** | 0 | **1,400** | Gemini Pro |
| **Total** | **~4,760 in** | **~1,850 out** | |

At Gemini 3.1 Pro pricing (~$1.25/M in, $5/M out): **~$0.015 per draft.** Social post ~$0.004. Cap budget at 8K input / 3K output per generation.

## 10. Failure Modes + Retry Strategy

| Failure | Detection | Recovery |
|---|---|---|
| Immich API down | 5xx or timeout | Wizard proceeds without photos, banner: "Photo library offline" |
| Prisma entity query slow (>3s) | timeout wrapper | Skip entity context, agent generates with topic only |
| Gemini fails | existing failover in `callAI` | Already handled — Claude Sonnet picks up |
| All AI providers fail | `callAI` throws | Wizard surfaces error, saves topic + context as "stuck draft" |
| Sanity write fails | 4xx/5xx | Stash draft body in Postgres `pendingDraft` table, retry button in UI |
| Stream disconnect mid-generation | client `useChat` `onError` | `useChat` resumability via `sendMessage` retry |
| Hallucinated entity reference | post-generation regex scan | Strip from output, log to QA queue |
| Forbidden phrase slipped through | template's `forbiddenPhrases` regex check | Auto-refine call: "Rewrite removing X" |
| Token budget exceeded | pre-flight count via `tiktoken` | Trim few-shot examples first, then entity context, hard-fail at 8K |

**Idempotency:** every wizard session gets a ULID `sessionId`. All API calls carry it. Saves keyed on `sessionId + step` so a refresh-during-save doesn't create duplicate Sanity drafts.

---

## Critical Files Referenced

- `/Users/chasethis/hillbilly-dreams/apps/web/app/api/drafts/generate/route.ts` (existing starter)
- `/Users/chasethis/hillbilly-dreams/apps/web/app/api/drafts/refine/route.ts` (existing, keep)
- `/Users/chasethis/hillbilly-dreams/apps/web/lib/ai-models.ts` (failover routing — wrap, do not bypass)
- `/Users/chasethis/hillbilly-dreams/packages/database/prisma/schema.prisma` (DirectoryBusiness with `visibility` gate)

## New Files to Create

- `/Users/chasethis/hillbilly-dreams/packages/content-creation/` (entire new package)
- `/Users/chasethis/hillbilly-dreams/apps/web/app/admin/create/` (entire wizard UI)
- `/Users/chasethis/hillbilly-dreams/apps/web/app/api/wizard/{context,generate,save,templates}/route.ts`
- `/Users/chasethis/hillbilly-dreams/packages/sanity/schemas/contentTemplate.ts`
