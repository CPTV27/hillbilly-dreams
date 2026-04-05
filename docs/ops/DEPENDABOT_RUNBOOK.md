# Dependabot & dependency hygiene (#64)

## Weekly habit

1. `gh pr list --author app/dependabot --limit 30`
2. Triage by **ecosystem**: `pnpm` / GitHub Actions / Docker.

## Merge rules (safe)

- **Patch** semver bumps on libraries already on main — merge if CI green.
- **Lockfile-only** changes — merge after `pnpm install` parity locally if needed.

## Hold / manual review

- **Major** React, Next, Prisma, Stripe SDK — schedule dedicated upgrade branch; run full `pnpm exec tsc --noEmit -p apps/web`, `pnpm lint`, `pnpm build`.
- **Transitive** security alerts that force major bumps — open a ticket; do not merge blind.

## CI expectation

- Default branch protection should require **CI pass** before Dependabot auto-merge (if enabled).

## Security tab

- GitHub reports **Dependabot alerts** separately from PRs — cross-check Critical/High for exploitability in this monorepo context.
