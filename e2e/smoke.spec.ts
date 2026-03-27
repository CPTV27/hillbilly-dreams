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

test('Touring — page loads and brand is visible', async ({ page }) => {
    await page.goto('/touring');

    // Title confirms correct deploy
    await expect(page).toHaveTitle(/Big Muddy|Touring/i);

    // Brand content rendered
    await expect(page.getByText(/Mississippi/i).first()).toBeVisible({ timeout: 15_000 });
});

test('Root — homepage loads without crash', async ({ page }) => {
    await page.goto('/');

    // App shell rendered — not a blank page or error screen
    await expect(page.locator('body')).not.toBeEmpty();

    // No React error boundary fallback visible
    await expect(page.getByText('Something went wrong')).not.toBeVisible();
    await expect(page.getByText('Application error')).not.toBeVisible();
});
