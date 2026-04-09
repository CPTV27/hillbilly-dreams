# Monitoring plan — HDX / Vercel / GCP

Operational monitoring targets for the Hillbilly Dreams monorepo (`apps/web` on Vercel, data on Neon + Cloud SQL, media on GCS, AI on Vertex + Anthropic + OpenAI where configured).

## What we need

### Cloud Logging (GCP)

- **Vertex AI:** `aiplatform.googleapis.com` request logs — latency, model id, error codes.
- **Cloud Run / future workers:** structured JSON logs with `route`, `durationMs`, `tenant`, `userId` (hashed), `outcome`.
- **Export or sink:** BigQuery dataset `hdx_ops_logs` for ad-hoc queries (optional phase 2).

### Error alerts

- **Vercel:** enable email/Slack on **failed deployments** and **elevated error rate** on production.
- **GCP Error Reporting:** enable for any Cloud Functions / Run services that touch billing or webhooks.

### Latency tracking

- **Vercel Analytics / Speed Insights:** Core Web Vitals on customer domains.
- **API p95:** log `processingTimeMs` from AI routes (already present on `/api/ai/analyze`) and chart in Cloud Monitoring or Axiom/Datadog if adopted later.

## Cost estimate — Google Cloud Monitoring

| Item | Rough monthly (USD) | Notes |
|------|---------------------|--------|
| Metrics & dashboards (standard) | $0–15 | First time series free tier covers small fleets |
| Log ingestion (50 GB/mo) | ~$25–50 | Depends on verbosity; sample 10% in prod |
| Alerting policies | Included | Notification channels may add PagerDuty cost |
| Uptime checks (5 hosts) | ~$5 | Synthetic checks from 3 regions |

**Total ballpark:** **$30–80/mo** until traffic scales; revisit when MRR justifies full SRE stack.

## What to alert on

| Signal | Severity | Action |
|--------|----------|--------|
| API route **5xx rate** > 2% over 15m | P1 | Check Vercel + recent deploy |
| **Vertex / OpenAI** quota or 429 spikes | P1 | Rate limit clients; rotate keys |
| **Stripe** webhook failures or dispute events | P0 | Finance + Patch |
| **Auth failures** spike on `/api/admin/*` | P2 | Possible credential stuffing |
| **Billing** unexpected usage (GCS egress, Vertex $) | P1 | Budget alert in GCP Billing |
| **Cron** jobs not completing | P2 | `CRON_SECRET`, schedule drift |

## Integration with dispatch

- **DISPATCH.md / QC_GATE:** any new externally reachable AI or billing route must list **monitoring owner** and **alert threshold** before merge.
- **`.workflow/STATUS.md`:** after incidents, one-line postmortem link or summary.
- **Runbooks:** link this doc from `docs/ARCHITECTURE.md` when that file’s ops section is next updated.

## Near-term implementation (no new dependencies)

1. Turn on **Vercel** production alerts for errors and failed builds.
2. In GCP **Billing**, set budget alert at 120% of current monthly spend.
3. Add **structured `console.error`** only where missing in new API routes (no PII); prefer a single prefix like `[api/billing]`.

Longer term: centralize logs in one vendor (Axiom, Grafana Cloud, or GCP-only) — record decision in `.workflow/DECISIONS.md` before adding SDKs.
