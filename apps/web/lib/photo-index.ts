// apps/web/lib/photo-index.ts
// Types + helpers for GCS approved/index.json (same shape as BmmLibrarySource).
//
// Public bucket URL only — do not import `@/lib/gcs` here (that module loads
// @google-cloud/storage and must not be bundled into client components).

const GCS_PUBLIC_BASE = `https://storage.googleapis.com/${process.env.GCS_BUCKET ?? 'bmt-media-bigmuddy'}`;

export interface PhotoIndexEntry {
  hash: string;
  region: string;
  city: string;
  shoot: string;
  category: string | null;
  subjects: string[];
  caption: string | null;
  credit: string | null;
  capturedAt: string | null;
  gps: { lat: number; lng: number } | null;
  camera: string | null;
  lens: string | null;
  originalFilename: string;
  urls: { orig: string; grid: string; thumb: string };
  widths: { orig: number; grid: number; thumb: number };
  ingestedAt?: string;
}

export interface PhotoIndexJson {
  version: 1;
  generated: string;
  photos: PhotoIndexEntry[];
}

/** Latest first — uses ingestedAt when present, otherwise preserves index order from API. */
export function sortPhotosLatestFirst(photos: PhotoIndexEntry[]): PhotoIndexEntry[] {
  return [...photos].sort((a, b) => {
    const ta = a.ingestedAt ? Date.parse(a.ingestedAt) : 0;
    const tb = b.ingestedAt ? Date.parse(b.ingestedAt) : 0;
    return tb - ta;
  });
}

/** Display label for index city slug (e.g. liberty-ms → Liberty MS). */
export function formatPhotoCityLabel(citySlug: string): string {
  return citySlug
    .split('-')
    .map((w) => (w.length <= 2 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

/**
 * Server components: read the same index as GET /api/photo-library, directly from public GCS.
 * (Avoids localhost round-trip during `next build` static generation.)
 */
export async function fetchPhotoIndex(options?: { region?: string }): Promise<PhotoIndexEntry[]> {
  const url = `${GCS_PUBLIC_BASE}/approved/index.json`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = (await res.json()) as PhotoIndexJson;
    let list = Array.isArray(json.photos) ? json.photos : [];
    if (options?.region) {
      list = list.filter((p) => p.region === options.region);
    }
    return sortPhotosLatestFirst(list);
  } catch {
    return [];
  }
}
