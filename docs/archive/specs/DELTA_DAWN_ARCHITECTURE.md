# Delta Dawn AI Architecture — The Sovereign AI Endgame

*April 6, 2026. Source: Perplexity deep research + Chase's architectural vision.*
*The body is built (Next.js, 14 domains, 122 models). This is the frontal lobe.*

---

## Goal

Delta Dawn has REAL-TIME access to the entire business. Not a chatbot with canned facts. A reasoning agent that queries databases, reads reviews, checks revenue, creates tasks, and publishes content — all through Gemini with function calling.

Minimize cognitive friction for the model so it doesn't hallucinate business logic.

---

## 1. Data Access: Hybrid Controller Tools

**Do NOT create 122 individual tools** (Gemini gets lost in noise).
**Do NOT give raw NL-to-SQL** (it will hallucinate table names).

**Do this:** 8-10 domain controller tools + 1 introspection tool.

| Controller Tool | What It Accesses |
|---|---|
| `query_directory` | DirectoryBusiness, BusinessProfile, reviews, categories |
| `query_revenue` | Invoices, Stripe data, MRR, subscription counts |
| `query_content` | Articles, SocialPosts, ContentCalendar, Productions |
| `query_events` | Events, ShowcaseSlots, TourStops, bookings |
| `query_artists` | Artists, Tracks, Splits, SyncOpportunities |
| `query_analytics` | Reports, NPS, OpsActivity, engagement metrics |
| `manage_tasks` | Asana integration — read/create/update tasks |
| `publish_content` | Social posts, review responses, newsletter |
| `query_system` | System health, deployment status, domain checks |
| `get_schema_details` | Returns Prisma schema for a specific domain on request |

**Workflow:** Gemini calls `get_schema_details(domain: "listings")` → reads the relevant models → calls `execute_read_only_query(sql: "SELECT...")` with validated, parameterized SQL.

---

## 2. Cross-Source Reasoning

Tool outputs return structured JSON with `context_hint` fields:
```json
{ "amount": 500, "status": "paid", "business_id": "dsd_123" }
```

Gemini sees `business_id` and knows it can cross-reference with the directory tool. No explicit instruction needed — the model connects the dots from structured output.

---

## 3. Vertex AI (Raw API) — Not Agent Builder

Agent Builder is a black box and the managed fees will eat a $167/month budget.

**Raw Gemini API on Vertex AI** with:
- Full control over Context Caching (secret weapon for cost)
- Custom function declarations
- Direct Cloud SQL access via service account
- No middleman fees

---

## 4. Authentication: Agent-Bearer Pattern

Delta Dawn's Cloud Run service gets a dedicated identity:

1. `AGENT_SECRET` env var on Cloud Run
2. Cloud Run signs short-lived JWT for each API call
3. Vercel routes validate `Authorization: Bearer <JWT>`
4. All actions logged as `actor: delta_dawn` in OpsActivity

This keeps Delta Dawn's actions traceable and auditable.

---

## 5. Context Management: Cache + pgvector

### Static Context (load once, use forever)
**Vertex AI Context Caching** — load 1M+ tokens of:
- Full Prisma schema (122 models)
- BUSINESS_ARCHITECTURE.md
- Brand voice rules, pricing, team, QC rules
- All agent files

Cost: ~$0.01/GB/hour. Gemini accesses with near-zero latency.

### Dynamic Context (per-query)
**Existing pgvector** (text-embedding-005, 768-dim) — already built:
- Business listing embeddings
- Article/content embeddings
- Codebase embeddings (RAG service on Mac Mini port 8090)

Do NOT use managed RAG engines — too expensive at our scale.

---

## 6. Persistent State: Conversation History in Neon

Vertex AI does not maintain threads natively. Handle in database:

```prisma
model Conversation {
  id        String    @id @default(cuid())
  userId    String
  createdAt DateTime  @default(now())
  messages  Message[]
}

model Message {
  id             String       @id @default(cuid())
  conversationId String
  role           String       // "user" | "model" | "tool"
  content        String
  toolCalls      Json?
  createdAt      DateTime     @default(now())
  conversation   Conversation @relation(fields: [conversationId])
}
```

When Tracy opens the app: pull last 10 messages, inject into Gemini's `history` parameter. Persistent feel without enterprise pricing.

---

## 7. Migration: AI Studio → Vertex AI

| | AI Studio (Current) | Vertex AI (Target) |
|---|---|---|
| SDK | `@google/genai` | `@google-cloud/vertexai` |
| Auth | API Key | GCP IAM (Service Account) |
| Runtime | Cloud Run (AI Studio managed) | Cloud Run (our service) |
| DB Access | None | Cloud SQL Client role |
| Cost Control | Spend cap | IAM + budget alerts |

**Migration path:**
1. Create Cloud Run service for Delta Dawn
2. Assign Service Account with `Vertex AI User` + `Cloud SQL Client` roles
3. Swap SDK initialization from API key to IAM
4. Deploy — no API keys in code

---

## 8. Safe Write Access: Action Proxy

**NEVER give Gemini raw WRITE access to the database.**

Create proxy classes:
- `SocialPublisher` — validates and publishes social posts
- `TaskManager` — validates and creates Asana tasks
- `ReviewResponder` — validates and posts review responses
- `ListingUpdater` — validates and updates directory listings

Gemini calls tool → tool calls internal API route → route validates against SDK → action executes. Prevents SQL injection or accidental destructive operations.

---

## 9. Multimodal Capabilities

Gemini 2.x handles:
- **Layout QA:** Send screenshot → "Is the Join button below the fold on iPhone 15 Pro?"
- **Photo tagging:** Analyze photos and generate metadata matching our pgvector taxonomy
- **Document analysis:** Read PDFs, invoices, contracts
- **Audio:** Process radio recordings, meeting audio

---

## 10. Limits and Sweet Spots

| Dimension | Sweet Spot | Maximum |
|---|---|---|
| Tools defined | 8-10 controllers | 60-80 before hallucination increases |
| Active conversation | 32K tokens | 1M+ (with quality degradation) |
| Cached context | Unlimited (schema, docs, brand) | Cost scales linearly |
| Response quality | Best under 32K active | Degrades above 100K active |

---

## Architecture Summary

| Layer | Technology | Cost |
|---|---|---|
| **Brain** | Gemini 2.5 Flash (Vertex AI) | Pay-per-token (~$9/mo current) |
| **Memory** | Context Caching (static) + pgvector (dynamic) | ~$0.01/GB/hour |
| **Actions** | Cloud Run (Node.js) + Vercel API Routes | $0 (free tier / existing) |
| **Identity** | GCP IAM + Service Accounts | $0 |
| **State** | Conversation/Message models in Neon | $0 (existing DB) |
| **Safety** | Action Proxy classes + JWT auth | $0 (code) |

**Total additional cost: ~$5-10/month on top of existing $167.**

---

## Multi-Tenant Safety

Delta Dawn must respect tenant boundaries:
- Big Muddy Inn financial data ≠ DSD merchant data
- Each query includes `tenantId` filter
- Tracy sees everything (HDI owner). A future DSD client sees only their own data.
- The system prompt includes: "Always filter queries by the authenticated user's tenant and role."

---

## Implementation Priority

1. **Week 1:** Create 8-10 controller tools as Vercel API routes (`/api/agent/*`)
2. **Week 2:** Set up Cloud Run service with Vertex AI SDK, service account auth
3. **Week 3:** Implement Context Caching with schema + business docs
4. **Week 4:** Add Conversation/Message models, persistent state
5. **Week 5:** Wire Action Proxy for writes (Asana, social, reviews)
6. **Week 6:** Multi-tenant safety, Tracy/Amy role-based access

---

*This is the architecture that turns Delta Dawn from a chatbot into a business intelligence layer. The body is built. This is the brain.*
