// ── BMT Synthetic Smoke Test ──
// Verifies Next.js + static assets. Uses dedicated port from playwright.config (default 3334).
//
// Run: pnpm test:smoke

import { test, expect } from '@playwright/test';

test('Touring — page loads and brand is visible', async ({ page }) => {
  await page.goto('/touring');

  await expect(page).toHaveTitle(/Big Muddy/i);

  await expect(page.getByText(/Mississippi|soul music|Gateway/i).first()).toBeVisible({
    timeout: 20_000,
  });
});

test('Root — homepage loads without crash', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('body')).not.toBeEmpty();

  await expect(page.getByText('Something went wrong')).not.toBeVisible();
  await expect(page.getByText('Application error')).not.toBeVisible();
});

test('Static roadmap — sandbox HTML serves', async ({ page }) => {
  const res = await page.goto('/sandbox/roadmap.html');
  expect(res?.ok()).toBeTruthy();

  await expect(page.getByText(/Product roadmap|Internal only/i).first()).toBeVisible({
    timeout: 10_000,
  });
});

test('Hillbilly roadmap route — redirects to static file', async ({ page }) => {
  const res = await page.goto('/hillbilly/roadmap', { waitUntil: 'commit' });
  expect(res?.status(), '308/307 to static').toBeLessThan(400);

  await page.waitForURL(/\/sandbox\/roadmap\.html/, { timeout: 15_000 });
  await expect(page.getByText(/Product roadmap|Internal only/i).first()).toBeVisible();
});

test('Deep South Directory — splash loads', async ({ page }) => {
  await page.goto('/directory');

  await expect(page.getByText(/Deep South Directory|corridor/i).first()).toBeVisible({
    timeout: 20_000,
  });
});

test('Admin deploys API — unauthenticated returns 401', async ({ request }) => {
  const res = await request.get('/api/admin/deploys');
  expect(res.status(), 'requireAdmin() should reject callers without a session').toBe(401);
  const body = await res.json().catch(() => ({}));
  expect(body).toMatchObject({ error: 'Not authenticated' });
});
