# Batch Next: Add Auth Gates to Priority Mutators (Gallery Reject, Clients, Cron)

This plan outlines the specific files to be gated with authentication helpers (`requireAdmin` and `requireCronOrAdmin`) to reduce the attack surface of our API.

## Proposed Changes

We will systematically lock down the following exposed endpoints:

### Gallery Reject

We will mirror the `requireAdmin` pattern that was applied to the `approve` endpoint.

#### [MODIFY] apps/web/app/api/gallery/applications/[id]/reject/route.ts
- Import `requireAdmin` from `@/lib/admin-auth`
- Wrap `POST` with `const denied = await requireAdmin(); if (denied) return denied;`

---

### Internal Operations: `/api/clients/**`

As previously identified, B2B `/api/clients/` operations represent high sovereignty / B2B risk ("capital flight"). We will treat all mutating actions on clients as purely Admin/Ops capabilities, overriding the public default.

#### [MODIFY] apps/web/app/api/clients/route.ts
- Import `requireAdmin` from `@/lib/admin-auth`
- Wrap `POST` (Create Client) with `requireAdmin`

#### [MODIFY] apps/web/app/api/clients/[id]/route.ts
- Import `requireAdmin`
- Wrap `PATCH` (Update Client) and `DELETE` (Delete Client) with `requireAdmin`

#### [MODIFY] apps/web/app/api/clients/[id]/voice/route.ts
- Wrap `POST` with `requireAdmin`

#### [MODIFY] apps/web/app/api/clients/[id]/calendar/route.ts
- Wrap `POST` with `requireAdmin`

#### [MODIFY] apps/web/app/api/clients/[id]/report/route.ts
- Wrap `POST` with `requireAdmin`

#### [MODIFY] apps/web/app/api/clients/[id]/reviews/route.ts
- Wrap `POST` with `requireAdmin`

#### [MODIFY] apps/web/app/api/clients/[id]/reviews/respond/route.ts
- Wrap `POST` with `requireAdmin`

---

### Cron Jobs

After an internal code audit, the following three cron endpoints have been verified as truly unprotected (no `CRON_SECRET` validation mechanism is currently present in the file). We will secure them by adding the platform's standard `requireCronOrAdmin` utility.

#### [MODIFY] apps/web/app/api/cron/process-enrichment-queue/route.ts
- Import `requireCronOrAdmin` from `@/lib/admin-auth`
- Add gate to `POST`

#### [MODIFY] apps/web/app/api/cron/sync-census/route.ts
- Import `requireCronOrAdmin` from `@/lib/admin-auth`
- Add gate to `POST`

#### [MODIFY] apps/web/app/api/cron/sync-touring/route.ts
- Import `requireCronOrAdmin` from `@/lib/admin-auth`
- Add gate to `POST` and `GET`

## Open Questions

> [!WARNING]  
> Are there *any* `/api/clients` paths where actual unauthenticated users or signed-in (but non-admin) tenant clients are actively submitting data from a public-facing page? Using `requireAdmin()` on all of them will strictly lock mutation down to Admins only. If this is exactly the goal for the B2B endpoints, please approve and we will execute!

## Verification Plan

- Run `pnpm exec tsc --noEmit -p apps/web` to guarantee that all types and imports are syntactically sound.
- Re-run our Deep Scanner and confirm that all remaining `/api/clients/` mutators, cron, and gallery reject drop from the "TRUE NAKED MUTATOR" bucket cleanly.
