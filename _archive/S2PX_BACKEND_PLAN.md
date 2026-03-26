# S2PX Ingestion Pipeline — AG Handoff Plan

> Phase 03 / Build — Backend data rails for spatial scan → financial leverage
> Target repo: `/Users/chasethis/S2PX` (NOT the BMT monorepo)
> Agent: AG (Anti-Gravity)

---

## Architecture

```
GCS Bucket (scan upload) → Webhook (HMAC-secured) → Vertex AI (Gemini 1.5 Pro) → db-s2px (Drizzle)
```

BMT triggers the webhook via the existing HMAC bridge. S2PX processes everything in its own sovereign database. No cross-sovereign pollution.

---

## 1. Schema Updates (db-s2px)

Add to the S2PX Drizzle schema (NOT BMT Prisma):

### HDXNode
Represents a sovereign business within the S2PX ecosystem.

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | varchar(255) | Business name |
| tier | varchar(50) | 'baseline' / 'operator' / 'node' / 'sponsor' |
| operatingMargin | float | Current operating margin % |
| createdAt | timestamp | |
| updatedAt | timestamp | |

### SpatialScan
Relates to HDXNode. Represents a single scan job.

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| nodeId | uuid | FK → HDXNode.id |
| bucketUri | text | GCS URI (gs://...) |
| status | enum | PENDING / ANALYZING / MAPPED |
| extractedData | jsonb | Structured extraction output |
| createdAt | timestamp | |

---

## 2. Vertex AI Wrapper (`server/lib/gcp/vertex-ingest.ts`)

Deterministic server-side function using the Google Cloud Vertex AI SDK.

- **Model:** Gemini 1.5 Pro
- **Input:** GCS URI (the spatial scan / iPhone LiDAR video)
- **Output:** Strict JSON schema (forced via `responseMimeType: 'application/json'`)

### Required Extraction Fields

```typescript
interface SpatialExtraction {
  totalSquareFootage: number;
  primaryMaterials: string[];       // e.g., ["hardwood", "drywall", "concrete"]
  estimatedCapacity: number;        // persons or units
  detectedHazards: string[];        // e.g., ["asbestos_suspected", "water_damage"]
  roomCount: number;
  floorCount: number;
  confidence: number;               // 0-1
}
```

### Implementation Notes
- Use `@google-cloud/vertexai` SDK (already in S2PX deps)
- Pass the GCS URI directly — Gemini 1.5 Pro accepts `gs://` URIs for multimodal input
- Force JSON output schema to prevent hallucinated prose
- Standard try/catch — log errors to Cloud Logging, don't swallow

---

## 3. HMAC-Secured Webhook (`server/routes/webhooks/scan.ts`)

Express POST handler (S2PX uses Express, not Next.js App Router).

### Flow

1. Receive POST with `{ bucketUri, nodeId, hmacSignature }`
2. Validate HMAC signature using shared secret (same pattern as existing bridge)
3. Create `SpatialScan` record with status `PENDING`
4. Update status to `ANALYZING`
5. Call `vertexIngest(bucketUri)` → get `SpatialExtraction` JSON
6. Update `SpatialScan.extractedData` with result, status → `MAPPED`
7. Return 200 with scan ID

### Error Handling
- Invalid HMAC → 401
- Missing fields → 400
- Vertex AI failure → update status to `FAILED`, return 500
- DB failure → return 500

---

## 4. Environment Variables

| Var | Purpose |
|---|---|
| `VERTEX_PROJECT_ID` | GCP project for Vertex AI calls |
| `VERTEX_LOCATION` | Region (us-east4) |
| `HMAC_BRIDGE_SECRET` | Shared secret with BMT |
| `GCS_SCAN_BUCKET` | Default bucket for scan uploads |

---

## Verification

- [ ] Drizzle migration runs clean
- [ ] `vertexIngest()` returns valid JSON for a test GCS URI
- [ ] Webhook rejects invalid HMAC with 401
- [ ] Webhook accepts valid HMAC and creates scan record
- [ ] Full flow: upload → webhook → Vertex AI → MAPPED status

---

## Dependencies

- `@google-cloud/vertexai` (already installed)
- Existing HMAC utility in `server/lib/hmac.ts`
- Existing Drizzle config in `server/db/`
