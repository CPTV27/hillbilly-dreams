import { createClient, type SanityClient } from '@sanity/client';

// Lazy initialization — missing env vars during Next.js build's
// "collect page data" phase must not crash module load. Callers
// should use getSanityClient() and handle a null return.

let _readClient: SanityClient | null = null;
let _writeClient: SanityClient | null = null;

// Trim and validate against Sanity's projectId regex (^[a-z0-9-]+$).
// Env vars from Vercel/CI sometimes carry trailing whitespace or newlines —
// '5p7h8glj\n' is truthy but fails Sanity validation, which crashes builds.
const SANITY_PROJECT_ID_RE = /^[a-z0-9-]+$/;

function getProjectId(): string {
  const raw =
    process.env.SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    '';
  const trimmed = raw.trim();
  // Only return the value if it passes Sanity's own regex; otherwise treat as missing.
  return SANITY_PROJECT_ID_RE.test(trimmed) ? trimmed : '';
}

function getDataset(): string {
  const raw =
    process.env.SANITY_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    'production';
  return raw.trim() || 'production';
}

/**
 * Read-only Sanity client. Returns null if SANITY_PROJECT_ID isn't set.
 * Callers must handle null and fall back to static data.
 */
export function getSanityClient(): SanityClient | null {
  if (_readClient) return _readClient;
  const projectId = getProjectId();
  if (!projectId) return null;
  _readClient = createClient({
    projectId,
    dataset: getDataset(),
    apiVersion: '2024-01-01',
    useCdn: true,
    token: process.env.SANITY_API_TOKEN,
  });
  return _readClient;
}

/** Writable Sanity client (server-side only). Returns null if env is missing. */
export function getSanityWriteClient(): SanityClient | null {
  if (_writeClient) return _writeClient;
  const projectId = getProjectId();
  if (!projectId) return null;
  _writeClient = createClient({
    projectId,
    dataset: getDataset(),
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });
  return _writeClient;
}

// Backwards-compatible exports via Proxy. Existing code that does
// `sanityClient.fetch(...)` will get a safe no-op if env is missing —
// returning a function that resolves to null/empty array rather than
// throwing — so that build-time `generateStaticParams` and similar
// callers can fall back to static data without exploding the build.
function makeSafeNoop(): unknown {
  return async () => null;
}

export const sanityClient = new Proxy({} as SanityClient, {
  get(_t, prop) {
    const c = getSanityClient();
    if (!c) return makeSafeNoop();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (c as any)[prop];
    return typeof value === 'function' ? value.bind(c) : value;
  },
});

export const sanityWriteClient = new Proxy({} as SanityClient, {
  get(_t, prop) {
    const c = getSanityWriteClient();
    if (!c) return makeSafeNoop();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (c as any)[prop];
    return typeof value === 'function' ? value.bind(c) : value;
  },
});
