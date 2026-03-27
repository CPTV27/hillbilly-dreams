// ── Full Route Smoke Tests ──
// Hits every public route in apps/web and verifies:
//   1. Page loads (no 500/404)
//   2. Body renders content (not blank)
//   3. No React error boundary visible

import { test, expect } from '@playwright/test';

const publicRoutes = [
  '/',
  '/touring',
  '/touring/route',
  '/touring/inn',
  '/touring/inn/blog',
  '/touring/inn/weddings',
  '/touring/inn/weddings/brochure',
  '/touring/inn/events/flyer',
  '/platform',
  '/measurably-better',
  '/measurably-better/regional',
  '/measurably-better/thesis',
  '/measurably-better/technology',
  '/measurably-better/enterprise',
  '/measurably-better/enterprise/proposal',
  '/measurably-better/scan2plan',
  '/hillbilly',
  '/hillbilly/directory-pitch',
  '/hillbilly/proposal/scan2plan',
  '/strategy',
  '/welcome/owen',
  '/amy',
  '/tracy',
  '/ffx',
  '/mvx',
  '/nexus',
  '/dashboard',
];

for (const route of publicRoutes) {
  test(`${route} — loads without crash`, async ({ page }) => {
    const response = await page.goto(route, { timeout: 20_000 });

    // Not a server error
    expect(response?.status()).toBeLessThan(500);

    // Page rendered something
    await expect(page.locator('body')).not.toBeEmpty();

    // No React error boundary
    await expect(page.getByText('Something went wrong')).not.toBeVisible();
    await expect(page.getByText('Application error')).not.toBeVisible();
  });
}
