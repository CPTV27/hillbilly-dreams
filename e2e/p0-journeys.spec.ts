// P0 launch journeys — automated QA suite
//
// Always-on (no secrets): DSD home → plans → onboard; Sovereign Pi configure → CTA.
// Gated (set env to run): admin HQ → links; vendor portal reply; scout audit pitch.
//
// E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD — whitelisted credentials user (see Bitwarden).
// E2E_VENDOR_PROJECT_ID — Asana project GID for /portal/vendor/:projectId (same as “token” in the link).
// E2E_SCOUT_AUDIT_SLUG — existing DirectoryBusiness.slug for /admin/scout/audit/:slug.

import { test, expect } from '@playwright/test';
import { gotoWithHost } from './helpers/p0';

const hasAdminCreds =
  !!process.env.E2E_ADMIN_EMAIL?.trim() && !!process.env.E2E_ADMIN_PASSWORD?.trim();
const vendorProjectId = process.env.E2E_VENDOR_PROJECT_ID?.trim();
const scoutSlug = process.env.E2E_SCOUT_AUDIT_SLUG?.trim();

test.describe('P0 — Deep South Directory (deepsouthdirectory.com)', () => {
  test('homepage → membership plans → onboard form', async ({ page }) => {
    // Canonical URL on prod is apex host → `/` (rewritten to /directory). Locally use /directory
    // so NEXT_PUBLIC_BRAND dev overrides cannot rewrite `/` to another group.
    await page.goto('/directory');

    await expect(page.getByText(/Main Street marketing|Deep South Directory/i).first()).toBeVisible({
      timeout: 20_000,
    });

    await expect(page.getByRole('heading', { name: /Directory Membership/i })).toBeVisible();
    await page.getByRole('link', { name: 'Get Started' }).first().click();

    await page.waitForURL(/\/directory\/onboard/, { timeout: 15_000 });
    await expect(page.getByRole('heading', { name: /List Your Business/i })).toBeVisible();
    await expect(page.getByLabel('Business Name')).toBeVisible();
  });
});

test.describe('P0 — Admin (bigmuddytouring.com/admin)', () => {
  test('login page loads (BMT host)', async ({ page, baseURL }) => {
    await gotoWithHost(page, '/admin/login', 'bigmuddytouring.com', baseURL);
    await expect(page.getByRole('heading', { name: /Big Muddy Command/i })).toBeVisible();
    await expect(page.getByPlaceholder('Email address')).toBeVisible();
  });

  test('credentials → HQ dashboard → Links hub', async ({ page, baseURL }) => {
    test.skip(!hasAdminCreds, 'Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD');

    const email = process.env.E2E_ADMIN_EMAIL!;
    const password = process.env.E2E_ADMIN_PASSWORD!;

    const callback = encodeURIComponent('/admin/hq');
    await gotoWithHost(
      page,
      `/admin/login?callbackUrl=${callback}`,
      'bigmuddytouring.com',
      baseURL
    );

    await page.getByPlaceholder('Email address').fill(email);
    await page.getByPlaceholder('Password').fill(password);
    await page.locator('form').first().getByRole('button', { name: 'Sign In' }).click();

    await page.waitForURL(/\/admin\/hq/, { timeout: 45_000 });
    await expect(page.getByRole('heading', { name: /^HQ$/ })).toBeVisible();

    await gotoWithHost(page, '/admin/links', 'bigmuddytouring.com', baseURL);
    await expect(page.getByRole('link', { name: 'HQ Dashboard' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Command/i }).first()).toBeVisible();
  });
});

test.describe('P0 — Sovereign Pi store (/store/sovereign-pi)', () => {
  test('configure section via anchor → bottom CTA', async ({ page }) => {
    await page.goto('/store/sovereign-pi');
    await expect(
      page.getByRole('heading', { name: /Your business brain|in a box/i })
    ).toBeVisible({
      timeout: 20_000,
    });

    await page.getByRole('link', { name: /Configure \+ buy standalone/i }).click();
    await page.waitForURL(/\/store\/sovereign-pi\/configure/, { timeout: 15_000 });
    await expect(page.getByRole('heading', { name: /Configure your Pi/i })).toBeVisible();

    const cta = page.getByRole('link', { name: /Get yours free with DSD/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /\/directory\/onboard\?addon=sovereign-pi/);
  });
});

test.describe('P0 — Vendor portal (/portal/vendor/[projectId])', () => {
  test('view tasks and send reply', async ({ page }) => {
    test.skip(!vendorProjectId, 'Set E2E_VENDOR_PROJECT_ID (Asana project GID from the vendor link)');

    await page.goto(`/portal/vendor/${vendorProjectId}`);

    await expect(page.getByText('Send a Message')).toBeVisible({ timeout: 45_000 });

    const box = page.getByPlaceholder(/Type a message/i);
    await box.fill(`E2E ping ${Date.now()}`);
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('Message sent')).toBeVisible({ timeout: 15_000 });
  });
});

test.describe('P0 — Scout audit (/admin/scout/audit/[slug])', () => {
  test('score + walk-in pitch after admin session', async ({ page, baseURL }) => {
    test.skip(!hasAdminCreds, 'Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD');
    test.skip(!scoutSlug, 'Set E2E_SCOUT_AUDIT_SLUG to a real DirectoryBusiness slug');

    const email = process.env.E2E_ADMIN_EMAIL!;
    const password = process.env.E2E_ADMIN_PASSWORD!;

    const afterLogin = encodeURIComponent(`/admin/scout/audit/${scoutSlug}`);
    await gotoWithHost(
      page,
      `/admin/login?callbackUrl=${afterLogin}`,
      'bigmuddytouring.com',
      baseURL
    );

    await page.getByPlaceholder('Email address').fill(email);
    await page.getByPlaceholder('Password').fill(password);
    await page.locator('form').first().getByRole('button', { name: 'Sign In' }).click();

    const slugRe = scoutSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await page.waitForURL(new RegExp(`/admin/scout/audit/${slugRe}`), { timeout: 45_000 });

    await expect(page.getByText('Score').first()).toBeVisible({ timeout: 120_000 });
    await expect(page.getByRole('heading', { name: /Walk-In Pitch/i })).toBeVisible();
  });
});
