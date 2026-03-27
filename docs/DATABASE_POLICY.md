# Database Policy — Hillbilly Dreams Inc.
> Single source of truth for all database decisions. Updated March 27, 2026.

## Canonical Database

**Neon Postgres** is the ONE database for all HDI production data.

| Field | Value |
|-------|-------|
| Provider | Neon (neon.tech) |
| Host | `ep-little-snow-ailobi9d` |
| Region | AWS us-east-1 |
| Database | `neondb` |
| User | `neondb_owner` |
| ORM | Prisma |
| Account | `me@chasepierson.tv` |
| Console | https://console.neon.tech |
| Plan | Upgrade to Launch ($19/mo) for 10 GB + autoscaling |
| Credentials | Bitwarden: "Neon Postgres — HDI Production Database" |

### Connection Strings
- `DATABASE_URL` — pooled connection (for serverless/API routes)
- `DIRECT_DATABASE_URL` — direct connection (for migrations)
- Both stored in: Vercel env vars + Bitwarden + local `.env.local`

### What Lives Here
- 51 Prisma models (articles, businesses, contacts, events, artists, etc.)
- 827 agent context fragments (AgentContext table)
- Agent action log (AgentAction table)
- Business decisions (Decision table)
- Embeddings with pgvector (768-dim Vertex AI vectors)
- Metrics and time-series snapshots
- All user/auth data (NextAuth)

## Other Databases — Status & Plan

### Cloud SQL `micro-media-db` (GCP)
- **Project:** `micro-media-production`
- **Status:** ORPHANED — running and billing, nothing uses it
- **Action:** DELETE after confirming no dependencies
- **Cost:** ~$8/mo for db-f1-micro

### Cloudflare D1 `openclaw-db`
- **Status:** Used for GChat message queue (`chat_messages` table)
- **Action:** Migrate queue to Neon (add ChatQueueMessage model to Prisma)
- **Then:** Delete D1 database

### SQLite `~/tax-db/chase_finance.db`
- **Status:** Local only — 15+ tables of financial data (pipeline, taxes, entities)
- **Action:** Critical data already ingested into AgentContext (827 fragments)
- **Keep:** As local reference, but production queries go to Neon

### Cloud SQL `s2px-db-east4` (GCP)
- **Project:** `s2px-production`
- **Status:** Active — used by S2PX app (separate product)
- **Action:** Keep separate. S2PX is its own stack.

## Rules for All Agents

1. **All new data goes to Neon** — no new databases, no new providers
2. **Use Prisma** — never raw SQL except for pgvector operations
3. **Schema changes** go through `packages/database/prisma/schema.prisma`
4. **Credentials in Bitwarden** — always, no exceptions
5. **No free tier** — upgrade Neon to Launch plan to avoid limits
6. **Agent context** — query via `GET /api/agent/context`, write via `POST /api/agent/context`
7. **Don't create Cloud SQL instances** — we made the Neon decision, stick with it
