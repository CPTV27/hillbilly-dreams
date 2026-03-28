# CSS Modularization Migration Plan
> Source: Gemini analysis + Huck architecture review, March 27, 2026

## Phase 1: Foundation (Days 1-2)
- [ ] Create `packages/config/design-tokens.json` as source of truth
- [ ] Create `apps/web/styles/base/` and `apps/web/styles/themes/` directories
- [ ] Extract `:root` variables from `tokens.css` into `base/variables.css`
- [ ] Create `base/reset.css` for global resets and typography base

## Phase 2: Tenant Isolation (Days 3-5)
- [ ] Split `.theme-touring` into `themes/touring.css`
- [ ] Split `.theme-inn` into `themes/inn.css`
- [ ] Split `.theme-radio` into `themes/radio.css`
- [ ] Split `.theme-magazine` into `themes/magazine.css`
- [ ] Split `.theme-records` into `themes/records.css`
- [ ] Split `.theme-gallery` into `themes/gallery.css`
- [ ] Split `.theme-economics` into `themes/economics.css`
- [ ] Split `.theme-bm-entertainment` into `themes/entertainment.css`
- [ ] Split `.theme-mb` into `themes/mb-product.css`
- [ ] Split `.theme-dsd` into `themes/dsd.css`
- [ ] Split `.theme-admin` into `themes/admin.css`
- [ ] Split `.theme-hillbilly` into `themes/hillbilly.css`
- [ ] Split `.theme-studio` into `themes/studio.css`
- [ ] Split `.theme-tuthill` into `themes/tuthill.css`
- [ ] Deploy hardened `theme-provider.tsx`
- [ ] Audit `packages/ui` components — all must use `var()` exclusively

## Phase 3: Hardening (Days 6-7)
- [ ] Enable Vercel Preview Deployments for all PRs
- [ ] Fix Sentry source map upload (add SENTRY_AUTH_TOKEN)
- [ ] Delete legacy `tokens.css` once all tenants verified
- [ ] Update `scripts/ingest-context.ts` to ingest per-theme CSS files
- [ ] Update agent docs to reference per-brand CSS files

## Migration Safety Protocol
1. **Freeze `tokens.css`** — no agent edits during migration
2. **Shadow deploy** — both global and modular files active simultaneously
3. **Tenant-by-tenant** — switch hillbillydreamsinc.com first, then Inn, then MBT
4. **Verification** — click-through each domain after switching
5. **Rollback** — if broken, revert to `tokens.css` import (always available)
