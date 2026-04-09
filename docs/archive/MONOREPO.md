# Monorepo Structure
## Last Updated: March 25, 2026

## Package Manager
- **pnpm** (v9.0.0) — DO NOT use npm or yarn
- Workspaces defined in root package.json
- `workspace:*` protocol used for internal deps — npm cannot resolve this

## Directory Structure
```
bmt/
├── apps/
│   └── web/              # Next.js 14.2.0 app (the main product)
├── packages/
│   ├── database/         # Prisma schema + client
│   ├── shared/           # Shared utilities
│   └── apple-kit/        # macOS automation scripts
├── _disabled/            # Routes removed from build (restorable)
├── research/             # Perplexity/market research docs
├── docs/                 # This documentation
├── scripts/              # Deploy scripts (AG-created, unverified)
├── AGENT_LEDGER.md       # Multi-agent coordination log
├── DEPLOY.md             # Deploy configuration guide
└── apphosting.yaml       # Firebase App Hosting config (broken)
```

## Build Commands
```bash
# Local dev
cd apps/web && pnpm dev --port 3030

# Production build (test locally)
cd apps/web && npx next build

# Full turbo build
pnpm turbo build --filter=@bigmuddy/web

# Deploy to Vercel
cd ~/bmt && vercel deploy --prod
```

## Multi-Tenant Routing
- Middleware at apps/web/middleware.ts handles hostname-based routing
- Route groups: (touring), (hillbilly), (economics), (media), (platform)
- Brand set by hostname match or NEXT_PUBLIC_BRAND env var
- Passthrough routes (no brand rewrite): /welcome, /mvx, /ffx, /strategy, /measurably-better

## Database
- Neon Postgres (serverless)
- Prisma ORM (46 models as of March 25, 2026)
- Generate client: `pnpm --filter @bigmuddy/database exec prisma generate`
- Push schema: `pnpm --filter @bigmuddy/database exec prisma db push`

## Common Gotchas
1. **pnpm only** — npm breaks on workspace:* protocol
2. **Prisma generate** runs in postinstall — if it fails, nothing else works
3. **Middleware complexity** — adding new routes may require passthrough entries in domain-routes.ts
4. **_disabled routes** — moved out of build, not deleted. Restore with `mv _disabled/app/[route] apps/web/app/[route]`
5. **Firebase heap cap** — heapsize.sh hardcodes 4096MB regardless of memoryMiB setting
6. **Vercel Root Directory** — must be set in dashboard, not vercel.json
