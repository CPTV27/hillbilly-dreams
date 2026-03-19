# Copilot Instructions — Big Muddy Media

## Project Overview
Multi-tenant media platform (Next.js 14 App Router + Prisma + TypeScript) serving 5 brands from a single codebase:
- **Big Muddy Touring** — flagship, Mississippi corridor travel
- **Big Muddy Magazine** — editorial content, city guides
- **Big Muddy Radio** — playlists, live sessions, podcast
- **Outsider Economics** — Chase Pierson's book/newsletter
- **Downtown South Directory** — Natchez local business directory

## Architecture
- **Monorepo**: Turborepo with `apps/web`, `apps/video`, `packages/ui`, `packages/database`, `packages/config`
- **Routing**: Middleware hostname routing — each brand maps to a subdomain
- **Database**: PostgreSQL via Prisma (`packages/database/prisma/schema.prisma`)
- **Storage**: Google Cloud Storage bucket `bmt-media-bigmuddy` for CDN media
- **Auth**: NextAuth.js with Google OAuth (admin only)
- **Styling**: Tailwind CSS + Framer Motion

## Conventions
- Use `apps/web/lib/db.ts` singleton for all Prisma imports — never import PrismaClient directly
- API routes at `apps/web/app/api/` — always use proper error handling with try/catch
- Brand config in `packages/config/brands.ts` — never hardcode brand-specific values
- Images: prefer WebP, serve from GCS for hero/editorial, `/public/images/` for static assets
- All components in `packages/ui/` should be brand-agnostic

## Code Style
- TypeScript strict mode — no `any` types unless absolutely necessary
- Prefer `interface` over `type` for object shapes
- Use `async/await` over `.then()` chains
- Server Components by default, `'use client'` only when needed
- Tailwind classes — use design tokens from brand config, not raw hex values

## Key Files
- `apps/web/middleware.ts` — hostname routing logic
- `apps/web/lib/db.ts` — Prisma singleton
- `apps/web/lib/gcs.ts` — GCS upload/list/delete helpers
- `packages/database/prisma/schema.prisma` — full data model
- `packages/config/brands.ts` — brand definitions and theming

## Do NOT
- Commit `.env` files or API keys
- Use `force-dynamic` unless the page genuinely needs it
- Add new dependencies without checking if an existing one covers the use case
- Write inline styles — use Tailwind
- Skip error boundaries on pages that fetch data
