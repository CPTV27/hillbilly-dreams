# BMT — Agent Context
> Read this FIRST before doing any work in this repo.

## Identity
| Key | Value |
|-----|-------|
| **Google Account** | `me@chasepierson.tv` |
| **Firebase Project** | `bigmuddy` (bigmuddy-ff651) |
| **GCP Project** | `bigmuddy-ff651` |
| **App Hosting URL** | `bmt--bigmuddy-ff651.us-east4.hosted.app` |

## Status: ✅ ACTIVE
This is the active, deployed ecosystem. Push to `main` triggers Firebase App Hosting auto-deploy.

## Stack
- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL via Prisma
- **Hosting:** Firebase App Hosting (auto-deploy from GitHub)
- **Styling:** Tailwind CSS 3 + CSS custom properties (tokens.css)
- **Animations:** framer-motion
- **Icons:** lucide-react
- **Auth:** NextAuth 5 (beta)
- **Monorepo:** pnpm workspaces + Turborepo

## Repo Structure
- `apps/web/` — Next.js app (all routes)
- `packages/config/` — brands.ts, tokens.css, shared config
- `packages/database/` — Prisma schema + client
- `packages/ui/` — Shared React components
- `packages/shared/` — Shared utilities

## Brands in This Ecosystem
- Big Muddy Touring (`bigmuddytouring.com`)
- Big Muddy Magazine (`bigmuddymagazine.com`)
- Big Muddy Radio (`bigmuddyradio.com`)
- Big Muddy Records (`bigmuddyrecords.net`)
- BuyCurious Art (`buycuriousart.com`)
- Outsider Economics (`outsidereconomics.com`)
- Deep South Directory (`deepsouthdirectory.com`)
- Hillbilly Dreams Inc. (`hillbillydreamsinc.com`) — parent company

## What This Repo Is NOT
This repo does NOT contain S2PX/Scan2Plan/Twinner code.
Those live in `/Users/chasethis/S2PX`.
If a task involves S2PX platform features, **stop and switch repos**.

## Agent Coordination
The `AGENT_LEDGER.md` at repo root is the source of truth for multi-agent handoffs.
Read it before starting work. Write to it after completing work.
