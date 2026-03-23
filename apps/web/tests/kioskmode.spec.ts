import { test, expect } from '@playwright/test';

test.describe('BMT Demo Parity & Critical Printables Verification', () => {

  test('should load the KioskMode landing wrapper and inject Big Muddy context', async ({ page }) => {
    // Navigating against the demo endpoint (live KioskMode preview)
    const response = await page.goto('/demo');
    expect(response?.ok()).toBeTruthy();
    
    // Check for core visual assertions
    await expect(page.locator('text=KioskMode Pro').first()).toBeVisible();
    await expect(page.locator('text=Big Muddy Inn & Blues Room').first()).toBeVisible();
  });

  test('should successfully render the Inn Wedding Brochure printable UI without 500ing', async ({ page }) => {
    // Verify the Wedding Brochure routes exist and return a clean status
    const response = await page.goto('/touring/inn/weddings/brochure');
    expect(response?.ok()).toBeTruthy();

    await expect(page.locator('text=THE BIG MUDDY INN').first()).toBeVisible();
    await expect(page.locator('text=Your Weekend on the River').first()).toBeVisible();
  });

  test('should successfully render the Blues Room Event Flyer printable UI without 500ing', async ({ page }) => {
    // Verify the Event Flyer routes exist and return a clean status
    const response = await page.goto('/touring/inn/events/flyer');
    expect(response?.ok()).toBeTruthy();

    await expect(page.locator('text=Live in the Blues Room').first()).toBeVisible();
    await expect(page.locator('text=Arri Aslin').first()).toBeVisible();
  });

});
