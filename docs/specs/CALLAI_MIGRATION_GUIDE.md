# callAI migration guide

Step-by-step reference for moving API routes off direct Vertex (`getGeminiModel`, `new GoogleGenAI`, or raw REST) onto the shared `callAI` entry point in `apps/web/lib/ai-models.ts`.

## Why migrate

- **Failover:** Standard requests try Gemini → Claude → Perplexity per role (see `ROUTING` in `ai-models.ts`).
- **One place for credentials:** Vertex project/location and provider keys stay in the library, not scattered across routes.
- **Observability:** Centralized logging hooks can be added once in `callAI`.

## Before: direct Vertex (Vertex AI client)

```typescript
import { getGeminiModel } from '@/lib/vertex-client';

const model = getGeminiModel();
const result = await model.generateContent('Write a tagline for a blues venue.');
const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '';
```

## After: standard text generation

```typescript
import { callAI } from '@/lib/ai-models';

const result = await callAI({
  role: 'generation',
  system: 'You write concise marketing copy for Deep South businesses.',
  messages: [{ role: 'user', content: 'Write a tagline for a blues venue.' }],
  maxTokens: 1024,
  temperature: 0.5,
});

const text = result.text;
```

## After: JSON-heavy prompts (marketing, DNA, scouts)

Keep the user payload in `messages[0].content`. Use a strict `system` line so models do not wrap JSON in fences:

```typescript
const result = await callAI({
  role: 'generation',
  system: 'You return only valid JSON as specified. No markdown code fences.',
  messages: [{ role: 'user', content: prompt }],
  maxTokens: 8192,
  temperature: 0.3,
});
```

## After: vision (inline image)

The REST failover path in `callAI` does not support multimodal parts. Use **`vertexNative`** so the request goes through `@google/genai` on Vertex with the same model you used before:

```typescript
const result = await callAI({
  vertexNative: {
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
          { text: prompt },
        ],
      },
    ],
    config: { temperature: 0.3, maxOutputTokens: 8192 },
  },
});

const text = result.text;
```

**Note:** `vertexNative` does **not** run the Anthropic/Perplexity failover chain. It is Gemini-only by design.

## After: function calling / multi-turn `contents`

Tool calling and arbitrary `contents[]` shapes are supported only via **`vertexNative`**. Pass the same `model`, `contents`, and `config` you previously passed to `GoogleGenAI`:

```typescript
const response = await callAI({
  vertexNative: {
    model: 'gemini-3.1-pro',
    contents,
    config: {
      systemInstruction: '...',
      temperature: 0.1,
      maxOutputTokens: 8192,
      tools: [{ functionDeclarations: [...] }],
    },
  },
});

if (response.functionCalls?.length) {
  // handle tool calls
}

const text = response.text;
const nextTurnContent = response.vertexContent; // append for follow-up turns
```

## Role selection

| Role | Typical use |
|------|-------------|
| `generation` | Drafts, captions, JSON marketing payloads, bulk copy. |
| `reasoning` | RAG / notebook answers, analysis where accuracy over speed. |
| `editorial` | Long-form polish, tone enforcement, red-pen style (Claude-first chain). |
| `search` | Live web / research (Perplexity-first). |
| `chat` | Interactive assistants. |
| `voice` | Low-latency conversational paths (reserved for voice-specific tuning). |

When in doubt: **JSON extraction and field marketing → `generation`**; **grounded Q&A over internal docs → `reasoning`**.

## Auth

High-cost routes should call `requireAdmin()` from `@/lib/admin-auth` at the start of `POST` (see `apps/web/app/api/ops/reviews/draft/route.ts`). Exceptions (e.g. Siri bearer token) should be documented in the route comment.

## Testing checklist

- [ ] `pnpm exec tsc --noEmit -p apps/web`
- [ ] Happy path: 200 + expected JSON/text shape
- [ ] Invalid body: 400 with clear error
- [ ] Missing env (e.g. no `ANTHROPIC_API_KEY`): failover still returns 200 if Gemini succeeds
- [ ] Vision route: send a real base64 JPEG and confirm parsed JSON
- [ ] Tool route: trigger a function call and confirm second turn returns natural language
- [ ] Admin-only routes: unauthenticated request returns 401/403

## Reference implementation

- Text + `requireAdmin`: `apps/web/app/api/ops/reviews/draft/route.ts`
- `vertexNative` tools: `apps/web/app/api/ai/analyze/route.ts`, `apps/web/app/api/voice/stream/route.ts`
