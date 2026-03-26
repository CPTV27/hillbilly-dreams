# Account Map
## Last Updated: March 25, 2026

## Google Cloud
| Account | Project | Purpose |
|---------|---------|---------|
| admin@hillbillydreamsinc.com | hillbillydreams | Firebase App Hosting, Cloud Build, Secret Manager |
| me@chasepierson.tv | bigmuddy-ff651 | Legacy GCP project (database, some APIs) |
| chase@scan2plan.io | s2px-production | S2PX sandbox |

### gcloud CLI
- Default config: `bmt`
- Switch accounts: `gcloud config set account <email>`
- Switch projects: `gcloud config set project <project-id>`
- BOTH expire frequently — always check `gcloud auth list` before running commands

### Firebase CLI
- Active account: `firebase login:list`
- Reauth: `firebase login --reauth` (requires browser, can't run headless)
- The Firebase CLI and gcloud CLI have SEPARATE auth tokens — reauthing one doesn't fix the other

## Vercel
| Account | Username | Purpose |
|---------|----------|---------|
| me@chasepierson.tv | cptv27 | All Vercel deployments |

- Team: chase-piersons-projects
- CLI: `vercel whoami` to check
- Auth: `vercel login` if expired

## GitHub
| Account | Repo | Purpose |
|---------|------|---------|
| CPTV27 | CPTV27/bmt | Main monorepo |

- Remote: `origin https://github.com/CPTV27/bmt.git`
- Default branch: `main`
- Firebase App Hosting watches: `main` branch
- Dependabot: active (creates PRs, sometimes orphans commits)

## Stripe
- Connected via apps/web/config/stripe-config.ts
- Stripe Connect for artist/vendor payouts

## Cloudflare
- Account: me@chasepierson.tv
- ALL domains are on this Cloudflare account
- API Token: in apps/web/.env.local as CLOUDFLARE_API_TOKEN
- Domains managed:
  - measurablybetter.life → Vercel bmt-demo (A: 76.76.21.21, CNAME www: cname.vercel-dns.com)
  - [Add other domains here as connected]

## Neon (Postgres)
- DATABASE_URL and DIRECT_DATABASE_URL in Secret Manager
- Prisma schema: packages/database/prisma/schema.prisma
