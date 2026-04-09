# Credential rotation policy

Canonical policy for service accounts, API keys, and human-operated secrets for HDX / MBT infrastructure.

## Current state (baseline)

- **GCP:** One primary service account JSON used via `GOOGLE_APPLICATION_CREDENTIALS_JSON` on Vercel for Vertex, GCS, and related APIs.
- **Rotation:** No automated rotation; keys are long-lived until manual swap.
- **Human secrets:** Stored in **Bitwarden** (source of truth); Vercel env mirrors production runtime.

## Target state

### Separate dev / prod service accounts

| Environment | GCP project / SA | Purpose |
|-------------|------------------|---------|
| **Production** | Dedicated SA with minimal roles: Vertex User, Storage Object Admin (scoped bucket), optional BigQuery read | Vercel production only |
| **Development** | Second SA or same project with `-dev` suffix and tighter quotas | Local + preview branches |

Never use production SA credentials on a shared demo laptop without OS-level secret protection.

### 90-day key rotation

- **Calendar:** Rotate JSON keys at least every **90 days** (set Bitwarden reminder).
- **Procedure:**
  1. Create new key on SA in GCP Console (IAM → Service Accounts → Keys).
  2. Update `GOOGLE_APPLICATION_CREDENTIALS_JSON` in Vercel (production + preview if applicable).
  3. Deploy; smoke-test Vertex + GCS upload path.
  4. Disable then delete old key after 24h observation.

### Workload Identity Federation (WIF) for Vercel

**Goal:** Eliminate long-lived JSON keys for serverless by exchanging OIDC tokens from Vercel for short-lived GCP access tokens.

- **Status:** Target architecture — implementation requires GCP Workforce/Workload Identity Pool configuration and Vercel OIDC issuer wiring.
- **When live:** Document issuer URL, audience, and attribute mapping in Bitwarden secure note; remove JSON key from Vercel where WIF covers the same scopes.

### Third-party keys

| Provider | Rotation |
|----------|----------|
| Stripe | Rotate restricted keys on compromise; use Stripe Dashboard audit |
| OpenAI / Anthropic | Rotate on schedule or role change; separate keys for preview vs prod if spend warrants |
| Twilio / SendGrid | Rotate subaccount keys annually or on offboarding |

## Bitwarden storage requirements

Every automated credential must have:

- **Name:** e.g. `Vercel — GOOGLE_APPLICATION_CREDENTIALS_JSON (prod)`
- **Folder:** HDI / MBT — Production or Development
- **Notes:** SA email, project id, rotation due date, Vercel project linkage
- **Attachment:** Optional encrypted backup of JSON (only if org policy allows; prefer Vercel + GCP as source)

**Never** commit keys to git, Slack, or email.

## Compliance checklist (quarterly)

- [ ] No SA key older than 90 days in production
- [ ] Vercel env audit: no duplicate deprecated vars
- [ ] Former contractors removed from GCP IAM and Bitwarden collection
- [ ] WIF progress noted (or JSON rotation completed if WIF not yet adopted)
