import { createClient, type SanityClient } from '@sanity/client';

// Lazy initialization — missing env vars during Next.js build's
// "collect page data" phase must not crash module load. Callers
// should use getSanityClient() and handle a null return.

let _readClient: SanityClient | null = null;
let _writeClient: SanityClient | null = null;

function getProjectId(): string {
  return (
    process.env.SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    ''
  );
}

function getDataset(): string {
  return (
    process.env.SANITY_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    'production'
  );
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
// `sanityClient.fetch(...)` will get a no-op (undefined) if env is missing
// rather than crashing at import time.
export const sanityClient = new Proxy({} as SanityClient, {
  get(_t, prop) {
    const c = getSanityClient();
    return c ? (c as any)[prop] : undefined;
  },
});

export const sanityWriteClient = new Proxy({} as SanityClient, {
  get(_t, prop) {
    const c = getSanityWriteClient();
    return c ? (c as any)[prop] : undefined;
  },
});
