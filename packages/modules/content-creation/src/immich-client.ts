// packages/modules/content-creation/src/immich-client.ts
// Immich CLIP search API wrapper. Searches the Hetzner Immich instance
// by natural-language query — returns photos ranked by CLIP similarity.

import type { PhotoCandidate } from './types';

const IMMICH_BASE =
  process.env.IMMICH_BASE_URL ?? 'https://immich.hillbillydreamsinc.com';

interface ImmichAsset {
  id: string;
  originalFileName: string;
  exifInfo?: {
    dateTimeOriginal?: string;
    description?: string;
  };
  /** CLIP similarity score populated by /search/smart response. */
  score?: number;
}

function getApiKey(): string {
  const key = process.env.IMMICH_API_KEY;
  if (!key) throw new Error('IMMICH_API_KEY not configured');
  return key;
}

export async function searchPhotos(
  query: string,
  opts?: { limit?: number; takenAfter?: Date; takenBefore?: Date }
): Promise<PhotoCandidate[]> {
  const res = await fetch(`${IMMICH_BASE}/api/search/smart`, {
    method: 'POST',
    headers: {
      'x-api-key': getApiKey(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      type: 'IMAGE',
      size: opts?.limit ?? 12,
      takenAfter: opts?.takenAfter?.toISOString(),
      takenBefore: opts?.takenBefore?.toISOString(),
      withExif: true,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    throw new Error(`Immich ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as { assets?: { items?: ImmichAsset[] } };
  const assets = data.assets?.items ?? [];

  return assets.map((a) => ({
    assetId: a.id,
    thumbnailUrl: `${IMMICH_BASE}/api/assets/${a.id}/thumbnail?size=preview`,
    takenAt: a.exifInfo?.dateTimeOriginal ?? null,
    caption: a.exifInfo?.description,
    score: a.score ?? 0,
  }));
}

/**
 * Fetch metadata for a specific asset (used by sanity-writer when mirroring).
 */
export async function getAsset(assetId: string): Promise<ImmichAsset | null> {
  const res = await fetch(`${IMMICH_BASE}/api/assets/${assetId}`, {
    headers: { 'x-api-key': getApiKey() },
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) return null;
  return res.json();
}
