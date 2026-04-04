# Hillbilly Dreams — Sovereign Studio (2026)

Monorepo for the **Big Muddy “Micro-Viacom”** stack: one Next.js deployment, multiple brands, shared media and operator tooling.

## No-IDE operator surface

Admin **Studio OS** (`/admin/studio`) and related HQ pages run registry tools from the UI—no local IDE required for day-to-day execution.

- **`POST /api/agent`** — Single bouncer for allowlisted tools (`toolId` + `params`, optional `isSandbox`).
- **`apps/web/lib/agent/toolRegistry.ts`** — Contract-coded registry (Zod schemas, auth class, model tier).
- **`GET /api/admin/registry`** — Same metadata the UI uses; powers generated docs.
- **Sandbox** — `isSandbox: true` routes supported handlers to **Draft\*** tables so production directory data stays clean.

## Docs

| Doc | Purpose |
|-----|---------|
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | Technical map: registry, routes, sandbox, Token Guard. |
| [`docs/BUSINESS_ARCHITECTURE.md`](./docs/BUSINESS_ARCHITECTURE.md) | Business / product source of truth. |

### Operator manual (Docusaurus)

`apps/manual` — role guides and how-tos. **Tool reference** is generated from code:

```bash
pnpm sync-docs
```

Then build the manual from `apps/manual` as usual. Regenerate after registry changes so the Reference sidebar stays accurate.

## Development

```bash
pnpm install
pnpm dev
```

Database client: `pnpm db:generate` (via Prisma in `@bigmuddy/database`).

---

*We build local. The value stays local. We grow from within.*
