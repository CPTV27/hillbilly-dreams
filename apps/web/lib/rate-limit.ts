/**
 * Simple in-memory IP rate limiter for serverless (best-effort per instance).
 * Not durable across cold starts — sufficient to blunt casual abuse.
 */

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

const DEFAULT_LIMIT = 100;
const DEFAULT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_KEYS = 50_000;

function pruneStale(now: number) {
  if (store.size < MAX_KEYS) return;
  for (const [k, b] of Array.from(store.entries())) {
    if (b.resetAt <= now) store.delete(k);
  }
}

export function getClientIp(headers: Headers): string {
  const xf = headers.get('x-forwarded-for');
  if (xf) {
    const first = xf.split(',')[0]?.trim();
    if (first) return first;
  }
  const real = headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

/**
 * @returns null if allowed, or Retry-After seconds if blocked
 */
export function rateLimitIp(
  ip: string,
  options?: { limit?: number; windowMs?: number }
): number | null {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  const windowMs = options?.windowMs ?? DEFAULT_WINDOW_MS;
  const now = Date.now();
  pruneStale(now);

  const key = ip;
  let b = store.get(key);
  if (!b || now >= b.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }
  if (b.count >= limit) {
    return Math.max(1, Math.ceil((b.resetAt - now) / 1000));
  }
  b.count += 1;
  return null;
}

export function rateLimitHeaders(retryAfterSec: number): Record<string, string> {
  return {
    'Retry-After': String(retryAfterSec),
    'X-RateLimit-Limit': String(DEFAULT_LIMIT),
    'X-RateLimit-Window': '900',
  };
}
