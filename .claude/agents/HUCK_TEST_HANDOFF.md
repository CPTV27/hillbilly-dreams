# Huck — Test Suite Completion Handoff

You're picking up a partially-complete E2E test run. Here's the state and what needs to happen.

## What's Already Done
- Playwright configured with `local` project + auto-starting dev server (`playwright.config.ts`)
- `pnpm test` and `pnpm test:smoke` scripts added to root `package.json`
- Comprehensive route smoke test written at `e2e/routes.spec.ts` covering 27 public routes
- `e2e/smoke.spec.ts` updated (stale `/media` route → `/touring`)
- Bug fix applied: `apps/web/app/touring/inn/weddings/page.tsx` had `onMouseEnter`/`onMouseLeave` on a Server Component `<a>` tag causing a 500. Replaced with CSS `.cta-hover:hover` class.

## Last Run Results
28/29 passed. The one failure (`/touring/inn/weddings`) was the Server Component bug above — already fixed in the file, but the dev server was serving cached 500.

## What You Need To Do

### 1. Restart the dev server and re-run E2E tests
```bash
# Kill any running dev server on port 3000 first
lsof -ti:3000 | xargs kill -9 2>/dev/null
# Run the full suite (Playwright auto-starts the dev server)
cd /Users/chasethis/hillbilly-dreams
npx playwright test --project=local
```
**Expected:** 29/29 green. If `/touring/inn/weddings` still 500s, the `<style>` tag in a Server Component might be the issue — try moving the CSS to `app/globals.css` or wrapping just the CTA in a Client Component.

### 2. Run the build
```bash
pnpm build
```
This catches SSR/SSG errors that dev mode ignores. Fix any that surface.

### 3. Run lint + type-check
```bash
pnpm lint && pnpm type-check
```
Fix any issues. These are the CI gates.

### 4. Run the kiosk mode tests (apps/web)
```bash
cd apps/web
npx playwright test tests/kioskmode.spec.ts
```
These test `/demo`, `/touring/inn/weddings/brochure`, and `/touring/inn/events/flyer`. They need the web app dev server running on port 3000.

### 5. If all green, report results
Format: total tests, pass count, fail count, and any issues found + fixed.

## Key Files
- `playwright.config.ts` — test config with `local` + `checkly` projects
- `e2e/smoke.spec.ts` — brand visibility smoke tests
- `e2e/routes.spec.ts` — full route coverage (27 routes)
- `apps/web/tests/kioskmode.spec.ts` — kiosk mode + printable tests
- `apps/web/app/touring/inn/weddings/page.tsx` — the fixed file (line 249: `className="cta-hover"`, line 1161: `<style>` tag)
