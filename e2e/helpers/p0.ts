import type { Page } from '@playwright/test';

/** Optional production hostname parity (middleware reads `Host` / `x-forwarded-host`). */
export async function gotoWithHost(
  page: Page,
  path: string,
  host: string,
  baseURL: string | undefined
): Promise<void> {
  const origin = baseURL ?? 'http://localhost:3334';
  const url = path.startsWith('http') ? path : `${origin.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
  await page.goto(url, { extraHTTPHeaders: { Host: host } });
}
