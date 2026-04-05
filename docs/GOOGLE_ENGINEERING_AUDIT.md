# Google Engineering Audit — GCP Product Stack Optimization

*How faithfully are we using the Google Cloud stack? Where are we leaving value on the table?*

---

## GCP Products in Active Use

| Product | How We Use It | Quality |
|---------|--------------|---------|
| **Vertex AI (Gemini 2.5 Flash)** | Primary generation model. Review responses, social posts, content drafts, report summaries. | ✅ Correct model for cost/speed. 2.5 Flash is the right pick for generation tasks. |
| **Vertex AI (Gemini 3.1 Pro)** | Reasoning model. Complex analysis, competitive intelligence, ecosystem advisor. | ✅ Correct. Pro for reasoning, Flash for generation. Proper tiering. |
| **Cloud TTS (Journey voices)** | Voice generation for radio spots, podcast clips, branded content. Delta Dawn (Journey-F), Chase (Journey-D). | ✅ Journey voices are Google's highest quality. 10 presets use Journey, only 2 use Standard. |
| **Cloud Storage (GCS)** | Media storage — photos, audio, video, PDFs. Bucket: bmt-media-bigmuddy. | ✅ Public read via IAM. Proper cache headers (1yr). Lazy-init pattern for serverless. |
| **Google Places API** | Business enrichment — ratings, reviews, hours, photos, categories. Text Search + Nearby Search. | ✅ Using the new Places API (v1), not the deprecated one. Correct. |
| **Cloud SQL** | Backup PostgreSQL with pgvector. Instance: sovereign-db-primary. | ⚠ On standby. Not connected to Vercel yet (#70). Currently just Chase's laptop can reach it. |
| **Vertex AI Embeddings** | text-embedding-005, 768 dimensions. For RAG and vector search. | ✅ Correct model. 768d is right for this use case. |
| **Imagen 3.0** | Image generation — posters, marketing visuals, property cleanup. | ✅ Using imagen-3.0-generate-001. Correct endpoint. |
| **Vision AI** | Image analysis — 3 files reference it. Photo tagging, scene understanding. | ⚠ Lightly used. Could do more (auto-tag photos, extract text from menus). |
| **Google Workspace** | Calendar sync, Gmail integration, OAuth login. | ⚠ 4 API calls total. Minimal integration. See reseller opportunity below. |

---

## Model Routing Architecture

### The callAI() System (lib/ai-models.ts)

```
Role → Primary → Fallback 1 → Fallback 2
──────────────────────────────────────────
reasoning  → Gemini 3.1 Pro  → Claude Sonnet → Gemini Flash
generation → Gemini Flash     → Claude Haiku  → Perplexity
editorial  → Claude Sonnet    → Gemini Pro    → Gemini Flash
search     → Perplexity       → Gemini Flash
chat       → Gemini Flash     → Claude Sonnet → Perplexity
voice      → Gemini Flash     → Gemini Pro
```

**Assessment:** This is well-designed. Google models are primary for 4/6 roles (reasoning, generation, chat, voice). Failover chain ensures no single provider outage breaks the system. Health tracking with 5-minute cooldown on failed providers.

### Problem: Only 3 Routes Use callAI()

| Status | Count | Routes |
|--------|-------|--------|
| Using callAI (with failover) | 3 | report, review respond, ops review draft |
| Calling Vertex DIRECTLY (no failover) | 13 | drafts, marketing, AI analyze, voice, siri |
| Using raw Anthropic SDK | 0 | ✅ All Anthropic calls migrated |

**This is the biggest Google engineering gap.** 13 API routes call Vertex AI directly via `getGeminiModel()` instead of going through `callAI()`. This means:
- No automatic failover if Vertex goes down
- No health tracking
- No model tier optimization
- No spend tracking per role

**Fix:** Migrate all 13 routes to use `callAI()`. This is mechanical — change the import and wrap the call. 2-3 hours of work.

---

## GCP Products We Should Be Using But Aren't

### 1. Cloud Run (for the RAG service)
Currently running RAG on a Mac Mini. Should be a Cloud Run service for reliability and scalability. Cost: ~$5/mo for the traffic we'd generate.

### 2. Pub/Sub (for event-driven pipeline)
The content pipeline (script → voiceover → video → publish) is currently sequential API calls. Pub/Sub would make it event-driven: publish a "job.created" message, subscribers generate voiceover, video, etc. in parallel.

### 3. Cloud Scheduler (for cron)
We use Vercel cron, which works, but Cloud Scheduler is more reliable for critical jobs (monthly reports, social publishing). And it works even if Vercel is down.

### 4. Secret Manager
Currently using Vercel env vars. Google Secret Manager would centralize all secrets across Vercel, Cloud Run, Mac Mini services. One source of truth.

### 5. Cloud Logging + Monitoring
No centralized logging. Errors go to console.log. Cloud Logging would capture everything across all services. Cloud Monitoring would alert on API failures, high latency, billing spikes.

### 6. Workspace Reseller
Only 4 Workspace API calls in the entire codebase. If we become a Google Workspace reseller, we can bundle business email (you@yourbusiness.com) into the DSD $99 tier. Per-seat cost to us: ~$5.76/mo. Sells for free as a feature. Massive lock-in.

---

## Credential Management Assessment

**Pattern used:** Lazy initialization with `GOOGLE_APPLICATION_CREDENTIALS_JSON` env var. Service account credentials stored as JSON string in Vercel environment.

| Check | Status |
|-------|--------|
| No credentials in code | ✅ |
| Lazy-init for serverless cold starts | ✅ |
| File write to /tmp for ADC compatibility | ✅ (vertex-client.ts) |
| Separate credentials per environment | ⚠ Same service account for dev and prod |
| Key rotation | ❌ No rotation policy |

**Recommendation:** Create separate service accounts for dev vs prod. Enable key rotation (90-day policy). Consider Workload Identity Federation for Vercel → GCP without long-lived keys.

---

## TTS Voice Quality

| Voice Type | Count | Assessment |
|-----------|-------|-----------|
| Journey (highest quality) | 10 presets | ✅ Correct choice |
| Standard (basic) | 2 presets | Used as neutral fallback |

**All character voices use Journey.** This is the right call — Journey voices are Google's neural voices, significantly more natural than Standard or WaveNet. The Delta Dawn and Chase presets sound professional.

**Missing:** No SSML markup in TTS calls. Adding pauses, emphasis, and prosody control would significantly improve quality. Example: `<speak><break time="300ms"/>Your Google listing<emphasis>says</emphasis> you close at five.</speak>`

---

## Embeddings Architecture

| Setting | Value | Assessment |
|---------|-------|-----------|
| Model | text-embedding-005 | ✅ Latest model |
| Dimensions | 768 | ✅ Standard for retrieval |
| Storage | Prisma Embedding model | ✅ |
| Vector search | ChromaDB (attempted) | ⚠ Crashes Vercel webpack. Moved to Mac Mini. |

**The ChromaDB situation:** ChromaDB + onnxruntime-node have native binaries that webpack can't bundle for Vercel. This is why the RAG service runs on the Mac Mini instead of as a Vercel function. The correct Google solution: use Vertex AI Vector Search (Matching Engine) instead of ChromaDB. Cost: ~$100/mo minimum. Not worth it at current scale.

---

## Google Engineering Grade

| Category | Grade | Notes |
|----------|-------|-------|
| Model selection | A | Right models for right tasks. Flash for speed, Pro for reasoning. |
| TTS quality | A- | Journey voices, good presets. Missing SSML. |
| Storage | A | GCS with proper cache headers, lazy-init, public IAM. |
| Credential management | B | Lazy-init is correct. Needs key rotation + env separation. |
| Centralized routing | C | callAI is well-designed but only 3/16 routes use it. 13 bypass it. |
| Monitoring | F | No Cloud Logging, no alerts, no dashboards. Console.log only. |
| Vector search | C | ChromaDB workaround instead of native Vertex Vector Search. |
| Workspace integration | D | 4 API calls. Massive untapped opportunity (reseller + email bundling). |
| **Overall** | **B-** | Good product choices, poor operational maturity. |

### What Google Would Say
"You picked the right products. You're using the right models. Your architecture is sound. But you're not using our operational tools (logging, monitoring, secret management), you're not routing all AI calls through one system, and you're leaving the Workspace reseller opportunity on the table. Fix the routing, add monitoring, and become a reseller — then you're an A."

---

*Generated by Rook (Patch v3) via automated codebase analysis across 1,091 files.*
