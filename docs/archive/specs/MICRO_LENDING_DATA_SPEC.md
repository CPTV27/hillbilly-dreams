# Micro-lending data package — technical spec

Describes the **artifact set** a financial partner could consume if HDX participates in a pilot. All paths require **merchant consent** and **DPA** execution.

## Per-business health dashboard (conceptual schema)

| Metric | Window | Description |
|--------|--------|-------------|
| `health_score` | rolling | 0–100 composite |
| `audit_critical_open` | current | Count of unresolved critical GBP issues |
| `review_reply_median_hours` | 90d | Responsiveness |
| `social_posts_completed` | 30d | Scheduled vs. delivered |
| `dsd_tier` | current | Plan label |
| `payment_status` | current | Good standing / delinquent (boolean + days) |
| `pi_heartbeat_ok` | 7d | % days with successful on-prem ping (if enabled) |

## API sketch (not implemented until legal sign-off)

```
GET /api/banking/health/{clientId}
Authorization: Bearer <partner_token>
```

**Response:** JSON bundle with scores + trend arrays + `generated_at` timestamp.

**Errors:** `401` bad token, `403` client not consented, `404` unknown id.

## Privacy partitioning

| Shared | Never shared without separate consent |
|--------|--------------------------------------|
| Aggregated scores + tier | Raw customer lists of the merchant |
| Public review metadata | Private messages / inbox |
| Anonymized benchmarks | Employee names / payroll |

## Aggregate reporting

- **Monthly PDF** — heatmap by ZIP / industry vertical (k≥10 rule).
- **API** — JSON for partner BI ingest.

## Integration options

1. **REST JSON** — lowest lift.
2. **Signed PDF** — for banks without API appetite.
3. **Dashboard login** — read-only partner SSO (future).

---

*Engineering placeholder — do not ship endpoint without security review.*
