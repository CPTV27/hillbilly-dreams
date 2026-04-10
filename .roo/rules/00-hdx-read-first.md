# HDX / hillbilly-dreams — Roo Code bootstrap

You are **GA (Google AI / Roo Code)** in this repo’s agent split. **Do not duplicate** long policy here; follow the canonical files below in order.

## Read before writing code

1. `docs/ARCHITECTURE.md` — codebase map (if missing or unclear, ask before building).
2. `CLAUDE.md` — handoff, QC, domains, secrets (Bitwarden), deploy notes.
3. `docs/BUSINESS_ARCHITECTURE.md` — business and product context.
4. `.cursorrules` (repo root) — full HDX operating rules, sovereign boundaries, stack, file ownership.

## Scope (GA)

Per `.cursorrules`, prefer work in: `packages/content-engine/`, `app/api/*/generate/`, Delta Dawn / AI integrations. UI and brand pages are **AG**; core packages and Prisma are **CC** — hand off via `.workflow/STATUS.md` if a task crosses ownership.

## Stack (non-negotiable)

Next.js 14.2 App Router, TypeScript, **Tailwind 3.4 + inline CSS + CSS tokens** (prefer `var(--font-*)`, `var(--bg)`, `var(--accent)` per QC rules; Tailwind coexists), Prisma/PostgreSQL, next-auth, REST API routes only.

## MCP (optional)

Project MCP lives in **`.roo/mcp.json`** at the repo root (team-shared; use `${env:VAR_NAME}` for tokens — never commit secrets). Roo: sidebar → MCP → **Edit Project MCP**. Global override: `mcp_settings.json` via Roo settings.

## Quality gate

Before finishing: `pnpm type-check`, `pnpm lint`, `pnpm build` from repo root (see root `package.json` scripts).
