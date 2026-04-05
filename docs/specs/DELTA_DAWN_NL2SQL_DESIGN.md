# Delta Dawn — NL2SQL Design (Grok-Validated)

*April 6, 2026. Defines what Delta Dawn can and cannot query, per domain.*

---

## Core Rules (ALL Domains)

- Max JOIN depth: **2**
- Always enforce `WHERE tenantId = $1` (HDI owners see all, clients see own)
- Global tables (CensusData, CorridorCity, EconomicIndicator) — no tenant filter
- **Read-only role only** — no INSERT/UPDATE/DELETE via NL2SQL
- Query timeout: **15 seconds**
- Max rows: **300**
- Never allow DDL (DROP, ALTER, CREATE, GRANT, TRUNCATE)
- All writes go through Action Proxy tools only
- Log every query + generated SQL to OpsActivity for audit

---

## Domain Access Map

### DIRECTORY
| Table | Access | Notes |
|---|---|---|
| DirectoryBusiness | READ | Core listing data |
| BusinessProfile | READ | Extended profile |
| Review | READ | Google reviews |
| Lead | READ | Sales leads |
| ContributedListing | READ | Community contributions |
| DraftBusiness | BLOCKED | Internal staging |
| ContributionLog | BLOCKED | Internal ops |
| EnrichmentJob | BLOCKED | Internal pipeline |
| HDXNode | BLOCKED | Infrastructure |
| SpatialScan | BLOCKED | Internal |

**Joins:** DirectoryBusiness ↔ BusinessProfile ↔ Review (depth 2 max)

**Templates:**
```sql
-- Find businesses by name
SELECT * FROM "DirectoryBusiness" WHERE "tenantId" = $1 AND name ILIKE $2 LIMIT 10

-- Business with review count
SELECT b.*, COUNT(r.id) as review_count
FROM "DirectoryBusiness" b
LEFT JOIN "Review" r ON r."businessId" = b.id
WHERE b."tenantId" = $1
GROUP BY b.id

-- Businesses by category
SELECT * FROM "DirectoryBusiness" WHERE "tenantId" = $1 AND category = $2

-- Recent reviews
SELECT r.*, b.name as business_name
FROM "Review" r
JOIN "DirectoryBusiness" b ON r."businessId" = b.id
WHERE b."tenantId" = $1
ORDER BY r."createdAt" DESC LIMIT 20

-- Low-rated businesses
SELECT b.name, AVG(r.rating) as avg_rating
FROM "DirectoryBusiness" b
JOIN "Review" r ON r."businessId" = b.id
WHERE b."tenantId" = $1
GROUP BY b.id HAVING AVG(r.rating) < 3.5
```

### REVENUE
| Table | Access | Notes |
|---|---|---|
| Invoice | READ | Payment records |
| CreditLedger | READ | Credit transactions |
| ProductBundle | READ | Tier definitions |
| ProductFeature | READ | Feature catalog |
| BundleFeature | READ | Tier-feature mapping |
| AffiliateProgram | BLOCKED | Sensitive commission data |
| AdCampaign | BLOCKED | Sensitive spend data |
| ImpressionLog | BLOCKED | High-volume, expensive queries |
| MarketplaceStore | BLOCKED | Internal |
| ApprovedSupply | BLOCKED | Internal |

**Joins:** Invoice ↔ CreditLedger only

**Templates:**
```sql
-- Total revenue
SELECT SUM(amount) as total FROM "Invoice" WHERE "tenantId" = $1 AND status = 'paid'

-- Revenue by month
SELECT DATE_TRUNC('month', "createdAt") as month, SUM(amount) as total
FROM "Invoice" WHERE "tenantId" = $1 AND status = 'paid'
GROUP BY month ORDER BY month DESC

-- Active subscribers by tier
SELECT pb.name as tier, COUNT(i.id) as subscribers
FROM "Invoice" i
JOIN "ProductBundle" pb ON i."bundleId" = pb.id
WHERE i.status = 'paid' GROUP BY pb.name
```

### CONTENT
| Table | Access | Notes |
|---|---|---|
| Article | READ | Published articles |
| SocialPost | READ | Social content |
| NewsletterIssue | READ | Newsletter archive |
| ContentCalendar | READ | Scheduled content |
| Publication | READ | Publication catalog |
| MediaAsset | READ | Media files |
| PublishJob | BLOCKED | Write pipeline |
| SocialCampaign | BLOCKED | Write pipeline |
| CampaignPost | BLOCKED | Write pipeline |
| StyleGuide | BLOCKED | Internal |

**Joins:** Article only (no deep cross-domain joins)

### EVENTS
| Table | Access | Notes |
|---|---|---|
| Event | READ | Event listings |
| ShowEvent | READ | Show details |
| Showcase | READ | Showcase programs |
| ShowcaseSlot | READ | Time slots |
| TourStop | READ | Tour dates |
| TouringVenue | READ | Venue database |
| TouringHotel | READ | Hotel database |
| TouringRestaurant | READ | Restaurant database |
| Venue | READ | Venue records |
| CorridorCity | READ (global) | City data, no tenant filter |

**Joins:** Event ↔ ShowcaseSlot (depth 2 max)

### ARTISTS
| Table | Access | Notes |
|---|---|---|
| Artist | READ | Artist profiles |
| Track | READ | Music catalog |
| Split | READ | Revenue splits |
| Playlist | READ | Playlist data |
| ArtistProfile | READ | Extended profile |
| RoyaltyPayment | BLOCKED | Financial sensitive |
| SyncSubmission | BLOCKED | Deal sensitive |
| SyncOpportunity | BLOCKED | Deal sensitive |
| PRORegistration | BLOCKED | Legal sensitive |

**Joins:** Artist ↔ Track ↔ Split (depth 2)

### ANALYTICS
| Table | Access | Notes |
|---|---|---|
| Report | READ | Monthly reports |
| NpsResponse | READ | NPS survey data |
| MetricSnapshot | READ | Metric history |
| Metric | READ | Current metrics |
| OpsActivity | READ | Activity log |
| Embedding | BLOCKED | Vector data (internal) |
| Lore | BLOCKED | Internal knowledge |

**Joins:** Report only (no cross-domain)

### BLOCKED DOMAINS (Delta Dawn cannot query these via NL2SQL)

| Domain | Tables | Reason |
|---|---|---|
| Agent | AgentAction, AgentContext, AgentTask, DraftAction, DraftContext, PendingDraft, ReasoningTrace | Internal AI infrastructure |
| Community Auth | User, Account, Session, VerificationToken | Security — credentials, tokens |
| Client Secrets | ApiKey, WebhookSubscription | Security — keys and webhooks |

---

## Injection Prevention

1. NL → validated SQL generator (Gemini produces SQL, validator checks it before execution)
2. **Parameter binding only** ($1, $2, $3) — never string interpolation
3. **Keyword blocklist:** DROP, ALTER, UPDATE, DELETE, INSERT, GRANT, TRUNCATE, CREATE, EXECUTE, COPY
4. **Regex validation:** reject any query containing semicolons, comments (--), or UNION
5. Log every NL input + generated SQL + execution result to OpsActivity
6. Rate limit: max 10 queries per minute per user

---

## Failure Modes

| Failure | Response |
|---|---|
| SQL generation fails | `{ "error": true, "message": "Couldn't understand that question. Try asking more specifically.", "retryPossible": true }` |
| Query times out (>15s) | `{ "error": true, "message": "Query took too long. Try narrowing the time range or being more specific.", "retryPossible": true }` |
| Too many rows (>300) | `{ "error": true, "message": "Too many results. Add a filter like a date range or category.", "retryPossible": true }` |
| Blocked keyword detected | `{ "error": true, "message": "Query rejected for safety. Try a simpler question or use a specific tool.", "retryPossible": false }` |
| Blocked table accessed | `{ "error": true, "message": "That data isn't available through this tool. Ask Chase for access.", "retryPossible": false }` |
| Tenant filter missing | `{ "error": true, "message": "Internal error: tenant context missing. Please try again.", "retryPossible": true }` |

---

## Write Path (Action Proxy Only)

These models support writes, but ONLY through dedicated tools — never through NL2SQL:

| Model | Write Tool | Action |
|---|---|---|
| Asana tasks | `create_task` | Create/update tasks |
| SocialPost | `publish_social` | Publish to connected accounts |
| Review responses | `draft_review_response` | Draft (human approves before post) |
| DirectoryBusiness | `update_listing` (future) | Update business info |
| OpsActivity | Automatic | Every action auto-logged |

---

*Total: 123 models. 12 domains. ~45 tables readable. ~30 blocked. All writes through Action Proxy. Grok-validated.*
