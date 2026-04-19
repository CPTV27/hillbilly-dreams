# SOP — Parallel Build Pattern

*Captured 2026-04-19 after the Phase C kickoff demonstrated the pattern works at scale. Use this as the default working method for any non-trivial build.*

---

## The pattern

For any feature that has **code + content + design** components — which is most of them — split the work three ways and run all three in parallel:

| Track | Who runs it | What it produces | Example |
|---|---|---|---|
| **Code** | Claude (this agent) with Edit/Write/Bash | Schema, API routes, components, modules, migrations | Prisma models, Next.js routes, React components |
| **Content** | Gemini batch via `scripts/ai/gemini-batch.mjs` | Marketing copy, voice docs, READMEs, templates, emails, magazine articles | Subscription tier copy, brand voice docs, email sequences |
| **Design** | Parallel sub-agents (Plan / vercel-plugin:ai-architect) | Architecture plans, trade-off analysis, file/data-model sketches | "How should the event bus work?", "What's the wizard component tree?" |

The orchestration agent (Claude) coordinates all three. While Code is being implemented, Gemini drafts the marketing copy and READMEs that will live alongside it, and Design plans run for the next block in line.

---

## How to launch a Gemini batch

1. Define a batch JSON at `scripts/ai/batches/{name}-{date}.json`:

```json
{
  "model": "gemini-2.5-flash",
  "concurrency": 6,
  "tasks": [
    {
      "id": "voice-inn",
      "outputPath": "docs/voice/big-muddy-inn.md",
      "system": "You are writing... [enforce voice + format]",
      "prompt": "Write the voice doc for Big Muddy Inn. Cover: ...",
      "maxTokens": 3000
    }
  ]
}
```

2. Run it:

```
node scripts/ai/gemini-batch.mjs scripts/ai/batches/{name}-{date}.json
```

3. The dispatcher writes outputs in parallel (concurrency=6 default), logs token usage, fails loudly. Outputs include a header noting model + token count.

4. Models available: `gemini-2.5-flash` (fast, cheap, good for content), `gemini-3.1-pro` (slow, smart, good for reasoning + structured output).

5. Cost: ~$0.20 for 25 tasks / 110K tokens with Flash. Negligible.

---

## How to launch parallel sub-agents

In one message, launch multiple Agent tool calls with `run_in_background: true`:

```
- Plan agent for "design Block 5 event bus"
- vercel-plugin:ai-architect for "design Block 6 wizard"
- Plan agent for "design Block 4 broadcast pipeline"
```

The orchestration agent continues working while sub-agents run. They report back via task notifications.

**Heuristic:** if a question requires deep analysis but no codebase mutations, send it to a sub-agent.

---

## When to NOT use this pattern

- **Tiny tasks** (one-line edit, one-file change). Overhead > benefit.
- **High-judgment human-in-the-loop work** (entity-structure decisions, brand-voice corrections, pricing finalization). Chase's input loop is the bottleneck.
- **Anything that mutates external systems irreversibly** (deploys, sends, deletes). Run sequential with confirmation.

---

## Standing rules for every batch

1. **Voice + format enforcement** in the system prompt. Without it, Gemini produces generic AI-blog copy. Force: no preamble, no "Here is...", direct H1 start, Chase-voice declarative writing, no marketing vocabulary (`leverage`, `synergy`, `unlock`, `elevate`, `transform`, `journey`, `cutting-edge`, `seamless`).
2. **Concrete brief, not vague topic.** "Write voice doc for Big Muddy Inn covering attributes, do/don't lists, 5 examples, 5 anti-examples, ~700 words" beats "write a voice doc for the Inn."
3. **Forbidden phrases inline in the prompt.** Especially for marketing copy — pre-empt the tropes.
4. **Output paths in the batch config.** Dispatcher writes directly to disk; no copy-paste.
5. **Token limits per task.** `maxTokens` capped (3000-6000 typical) to prevent runaway generation.
6. **Idempotent.** Re-running a batch overwrites outputs. Safe.

---

## Phase C demonstrated cost

For the full Phase C build kickoff (all 6 blocks designed + 25 content artifacts):

- **3 sub-agents** (Plan + AI-architect, ~3-5 min each, ran in parallel) — Claude credit cost ~ marginal vs serial work
- **1 Gemini batch** (25 tasks, 110K tokens, 102 seconds) — ~$0.20 in Gemini API costs
- **Schema migration** (21 new models in one append) — single Edit, validated clean
- **Total wall-clock for the kickoff:** under 15 minutes

Compare to sequential single-agent grinding: this would have taken 4-6 hours of single-threaded work and burned 5-10× the Claude tokens.

---

## When this is the default

**Always**, except for the cases listed in "When to NOT use this pattern." If a build has more than one independent track of work, parallelize.

Captured by Chase + Cos, 2026-04-19.
