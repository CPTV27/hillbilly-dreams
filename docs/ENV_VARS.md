# Environment Variables
## Last Updated: March 25, 2026

## RULE: When adding a new env var, document it here IMMEDIATELY.

## Database
| Variable | Purpose | Where Set | Required |
|----------|---------|-----------|----------|
| DATABASE_URL | Neon Postgres connection (pooled) | GCP Secret Manager + Vercel | Yes |
| DIRECT_DATABASE_URL | Neon Postgres connection (direct, for migrations) | GCP Secret Manager + Vercel | Yes |

## Authentication
| Variable | Purpose | Where Set | Required |
|----------|---------|-----------|----------|
| NEXTAUTH_SECRET | JWT signing secret for NextAuth | GCP Secret Manager + Vercel | Yes |
| NEXTAUTH_URL | Canonical URL for auth callbacks | GCP Secret Manager + Vercel | Yes |
| GOOGLE_CLIENT_ID | Google OAuth client ID | GCP Secret Manager + Vercel | Yes |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret | GCP Secret Manager + Vercel | Yes |
| ADMIN_SESSION_TOKEN | Token for admin API routes | GCP Secret Manager + Vercel | Yes |

## AI / APIs
| Variable | Purpose | Where Set | Required |
|----------|---------|-----------|----------|
| ANTHROPIC_API_KEY | Claude API access | GCP Secret Manager + Vercel | Yes |
| PERPLEXITY_API_KEY | Perplexity search API | GCP Secret Manager + Vercel | Optional |
| GOOGLE_CLOUD_PROJECT | GCP project for Vertex AI | Implicit from GCP | Yes (Firebase only) |

## Stripe
| Variable | Purpose | Where Set | Required |
|----------|---------|-----------|----------|
| STRIPE_SECRET_KEY | Stripe server-side key | Vercel env vars | Yes |
| STRIPE_WEBHOOK_SECRET | Stripe webhook verification | Vercel env vars | Yes |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe client-side key | Vercel env vars | Yes |

## Brand / Routing
| Variable | Purpose | Where Set | Required |
|----------|---------|-----------|----------|
| NEXT_PUBLIC_BRAND | Override brand for dev (touring, hillbilly, etc.) | .env.local / launch.json | Dev only |
| NODE_ENV | production / development | Auto-set | Auto |

## Analytics
| Variable | Purpose | Where Set | Required |
|----------|---------|-----------|----------|
| NEXT_PUBLIC_GA_MEASUREMENT_ID | Google Analytics 4 property | Vercel env vars | Optional |
| SENTRY_DSN | Sentry error tracking | Vercel env vars | Optional |

## REMOVED (Do Not Re-Add)
| Variable | Why Removed | Date |
|----------|-------------|------|
| TEAM_PASSWORD | AG added to apphosting.yaml but never created the secret. Broke deploy. | 2026-03-25 |
