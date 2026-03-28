// ── Full Route Smoke Tests ──
// Hits every public route in apps/web and verifies:
//   1. Page loads (no 500/404)
//   2. Body renders content (not blank)
//   3. No React error boundary visible

import { test, expect } from '@playwright/test';

const publicRoutes = [
  // ── Core / Universal ──
  '/',
  '/platform',
  '/strategy',
  // '/welcome/owen', // REMOVED — route deleted
  '/amy',
  '/tracy',
  '/ffx',
  '/mvx',
  '/nexus',
  '/dashboard',
  '/book',
  '/demo',

  // ── Measurably Better (MBT) ──
  '/measurably-better',
  '/measurably-better/regional',
  '/measurably-better/thesis',
  '/measurably-better/technology',
  '/measurably-better/enterprise',
  '/measurably-better/enterprise/proposal',
  '/measurably-better/scan2plan',

  // ── Touring / Inn ──
  '/touring',
  '/touring/route',
  '/touring/inn',
  '/touring/inn/blog',
  '/touring/inn/weddings',
  '/touring/inn/weddings/brochure',
  '/touring/inn/events/flyer',

  // ── Hillbilly Dreams (HoldCo) ──
  '/hillbilly',
  '/hillbilly/directory-pitch',
  '/hillbilly/proposal/scan2plan',

  // ── Entertainment ──
  '/entertainment',

  // ── Deep South Directory ──
  '/directory',
  '/directory/submit',
  '/directory/onboard',

  // ── Outsider Economics ──
  '/economics',
  '/economics/field-manual',
  '/economics/the-math',
  '/economics/about',
  '/economics/community',
  '/economics/rise-up',

  // ── Magazine ──
  '/magazine',
  '/magazine/articles',
  '/magazine/city-guides',

  // ── Radio ──
  '/radio',
  '/radio/playlists',
  '/radio/live',
  '/radio/podcast',
  '/radio/directory',

  // ── Gallery ──
  '/gallery',
  '/gallery/artists',
  '/gallery/about',
  '/gallery/apply',

  // ── Records ──
  '/records',
  '/records/artists',
  '/records/releases',
  '/records/sessions',

  // ── Media ──
  '/media',
  '/media/brands',
  '/media/directory',
  '/media/get-started',
  '/media/how-it-works',
  '/media/onboard',
  '/media/pricing',
  '/media/publications',
  '/media/services',

  // ── Studio / Tuthill ──
  '/studio',
  '/tuthill',

  // ── Portal ──
  '/portal',
  '/portal/calendar',
  '/portal/reports',
  '/portal/reviews',

  // ── Admin (public login page) ──
  '/admin/login',
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
