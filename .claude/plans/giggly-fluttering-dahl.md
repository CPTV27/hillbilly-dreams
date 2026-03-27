# Agent Context Database Layer

## Context

No single agent can hold the full business context in its context window. Currently agents read 30+ markdown files and hope it fits. The solution: use the existing Neon Postgres + pgvector infrastructure (already built by Ledger) as a shared brain. Agents query for what they need instead of reading everything.

## What Already Exists (don't rebuild)
- pgvector enabled with IVFFlat cosine index
- `Embedding` table (768-dim Vertex AI vectors, polymorphic entityType)
- `vector-search.ts` with `searchSimilar()` function
- `/api/search` endpoint for semantic queries
- `/api/embeddings/index` for ingesting content
- `embedding-pipeline.ts` for chunking and embedding
- `EnrichmentJob` queue for async processing
- `MetricSnapshot` for time-series data

## What To Build

### 1. New Prisma Models

**AgentContext** — structured knowledge fragments
```prisma
model AgentContext {
  id          Int      @id @default(autoincrement())
  domain      String   // "finance", "operations", "strategy", "touring", "tech"
  topic       String   // "cap-table", "inn-occupancy", "pipeline-revenue"
  key         String   // unique identifier like "entity.hdi.ownership"
  content     String   // the actual knowledge (markdown)
  source      String   // where it came from: "tax-db/ENTITY_REGISTRY.md", "agent:ledger"
  confidence  Float    @default(1.0) // 0-1, decays over time
  agentAuthor String?  // which agent wrote this
  validUntil  DateTime? // TTL for time-sensitive facts
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@unique([domain, key])
  @@index([domain, topic])
}
```

**AgentAction** — replaces AGENT_LEDGER.md
```prisma
model AgentAction {
  id          Int      @id @default(autoincrement())
  agent       String   // "huck", "delta-dawn", "ledger", "chuck", "rook"
  action      String   // "deployed", "fixed-bug", "created-report", "decision"
  summary     String   // one-line description
  detail      String?  // full detail (markdown)
  domain      String   // which area of the business
  impact      String?  // "high", "medium", "low"
  createdAt   DateTime @default(now())
  @@index([agent, createdAt])
  @@index([domain, createdAt])
}
```

**Decision** — business decisions with rationale
```prisma
model Decision {
  id          Int      @id @default(autoincrement())
  title       String   // "MBT pricing set to $99/mo"
  rationale   String   // why this was decided
  decidedBy   String   // "chase", "chase+tracy"
  domain      String   // "pricing", "operations", "strategy"
  status      String   @default("active") // "active", "superseded", "reversed"
  supersededBy Int?    // FK to newer decision
  createdAt   DateTime @default(now())
  @@index([domain, status])
}
```

### 2. Ingest Pipeline — Markdown to Database

Script: `scripts/ingest-context.ts`

Reads all existing markdown docs, chunks them, and writes to AgentContext + Embedding tables:

**Sources to ingest:**
- `~/tax-db/*.md` (16 files) — finance, entities, pipeline
- `docs/strategy/*.md` (4 files) — strategy, roadmap
- `docs/google-ecosystem/*.md` (8 files) — operational blueprints
- `docs/research/*.md` (5 files) — market research
- `docs/*.md` (30+ files) — product, brand, design, narrative
- `.claude/agents/*.md` (15+ files) — agent handoffs, protocols
- Memory files from `.claude/projects/*/memory/*.md` — feedback, project context

Each file gets:
1. Tagged with `domain` and `topic`
2. Chunked into semantic segments (reuse `semantic-chunker.ts`)
3. Embedded via Vertex AI (reuse `embedding-pipeline.ts`)
4. Written to `AgentContext` (structured) + `Embedding` (vector search)

### 3. Agent Context API

**GET /api/agent/context**

```
?agent=delta-dawn           — filter by agent relevance
&topic=inn-occupancy         — filter by topic
&q=what is our pricing       — semantic search (uses pgvector)
&domain=finance,operations   — filter by business domain
&limit=20                    — max results
&fresh=true                  — exclude stale content (validUntil < now)
```

Returns ranked, deduplicated context fragments. Each agent calls this at the start of a session instead of reading 30 files.

**POST /api/agent/action**

Agents write what they did. Replaces appending to AGENT_LEDGER.md.

```json
{
  "agent": "huck",
  "action": "deployed",
  "summary": "Consolidated all hosting on Vercel Pro",
  "domain": "infrastructure",
  "impact": "high"
}
```

**POST /api/agent/context**

Agents write new knowledge back.

```json
{
  "domain": "finance",
  "topic": "pipeline-revenue",
  "key": "pipeline.total.2026-q1",
  "content": "$1.4M across 49 opportunities",
  "source": "agent:ledger",
  "agentAuthor": "ledger"
}
```

### 4. Context Staleness Management

Cron job: `/api/cron/decay-context` (daily)
- Reduce `confidence` by 0.05/day for time-sensitive facts
- Mark expired entries (validUntil < now)
- Flag contradictions (same key, different content from different agents)

## Files To Create/Modify

| File | Action |
|------|--------|
| `packages/database/prisma/schema.prisma` | Add AgentContext, AgentAction, Decision models |
| `apps/web/app/api/agent/context/route.ts` | GET (query) + POST (write) |
| `apps/web/app/api/agent/action/route.ts` | POST (log actions) |
| `apps/web/app/api/cron/decay-context/route.ts` | Daily staleness decay |
| `scripts/ingest-context.ts` | One-time markdown → database migration |
| `apps/web/lib/agent-context.ts` | Shared functions for context queries |

## Execution Order

1. Add Prisma models, run migration
2. Build `/api/agent/context` and `/api/agent/action` endpoints
3. Build `scripts/ingest-context.ts` to migrate existing markdown
4. Run ingestion against all source docs
5. Build `/api/cron/decay-context`
6. Test: query context as each agent and verify relevance

## Verification

- Query `/api/agent/context?agent=delta-dawn&topic=inn` returns Inn operational data
- Query `/api/agent/context?q=cap+table` returns ownership structure via semantic search
- POST action from huck, verify it appears in GET queries for other agents
- Verify ingestion covered all 70+ source documents
- Verify no duplicate embeddings from re-ingestion
