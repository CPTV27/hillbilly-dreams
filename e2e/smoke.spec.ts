// ── BMT Synthetic Smoke Test ──
// Targets the public Deep South Directory splash page (/media).
// No auth required. Verifies the Next.js SSR pipeline is alive
// and the brand is rendering correctly.
//
// Selected for Checkly because:
//   1. Public route — no Firebase auth
//   2. Server-rendered — tests the full Cloud Run → Next.js chain
//   3. Contains identifiable brand text — confirms correct deploy is live

import { test, expect } from '@playwright/test';

test('Deep South Directory — page loads and brand is visible', async ({ page }) => {
    await page.goto('/media');

    // Title confirms correct deploy (not a stale CDN cache)
    await expect(page).toHaveTitle(/Deep South Directory|Big Muddy/i);

    // Delta Dawn AI section confirms the AI feature rendered
    await expect(page.getByText(/Delta Dawn/i).first()).toBeVisible({ timeout: 15_000 });

    // Directory value prop confirms content section rendered
    await expect(page.getByText(/Mississippi/i).first()).toBeVisible();
});

test('Root — homepage loads without crash', async ({ page }) => {
    await page.goto('/');

    // App shell rendered — not a blank page or error screen
    await expect(page.locator('body')).not.toBeEmpty();

    // No React error boundary fallback visible
    await expect(page.getByText('Something went wrong')).not.toBeVisible();
    await expect(page.getByText('Application error')).not.toBeVisible();
});
