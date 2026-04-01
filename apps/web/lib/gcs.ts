// lib/gcs.ts
// ─────────────────────────────────────────────────────────────
// Google Cloud Storage helper for image uploads
// ─────────────────────────────────────────────────────────────
// SEAM: Bucket name is injected via GCS_BUCKET env var.
//       Platform pattern (upload/list/delete) is tenant-agnostic.
//       Each HDX sovereign sets its own GCS_BUCKET in .env.
//       BMT default: bmt-media-bigmuddy (public read via IAM, us-east4)
//
// Seam introduced: 2026-03-24 — Phase 2 Config Seams (AG)
// ─────────────────────────────────────────────────────────────

import { Storage } from '@google-cloud/storage';

/**
 * SEAM: Bucket name sourced from env. Each HDX sovereign sets its own.
 * BMT fallback kept for backward compatibility.
 */
const BUCKET_NAME = process.env.GCS_BUCKET ?? 'bmt-media-bigmuddy';

// On Vercel, credentials come from GOOGLE_APPLICATION_CREDENTIALS_JSON env var.
// Locally, ADC or GOOGLE_APPLICATION_CREDENTIALS file works.
// Lazy-init: don't parse credentials at module load (breaks Next.js build).
let _storage: InstanceType<typeof Storage> | null = null;
function getStorage() {
  if (!_storage) {
    const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    _storage = credsJson
      ? new Storage({ credentials: JSON.parse(credsJson), projectId: JSON.parse(credsJson).project_id })
      : new Storage();
  }
  return _storage;
}
function getBucket() { return getStorage().bucket(BUCKET_NAME); }

export const GCS_BASE_URL = `https://storage.googleapis.com/${BUCKET_NAME}`;

/**
 * Upload a buffer to GCS, returning the public URL.
 * @param buffer  - file contents
 * @param path    - destination path inside the bucket (e.g. "heroes/my-image.webp")
 * @param contentType - MIME type
 */
export async function uploadToGCS(
  buffer: Buffer,
  path: string,
  contentType: string
): Promise<string> {
  const file = getBucket().file(path);

  await file.save(buffer, {
    metadata: {
      contentType,
      cacheControl: 'public, max-age=31536000',
    },
    resumable: false,
  });

  // Bucket has public read via IAM — no per-object makePublic() needed
  return `${GCS_BASE_URL}/${path}`;
}

/**
 * List all images in the bucket, grouped by album (top-level folder).
 */
export async function listImages(): Promise<
  Record<string, Array<{ name: string; url: string; size: number; updated: string }>>
> {
  const [files] = await getBucket().getFiles();

  const grouped: Record<
    string,
    Array<{ name: string; url: string; size: number; updated: string }>
  > = {};

  for (const file of files) {
    // Skip folders / zero-byte markers
    if (file.name.endsWith('/')) continue;

    const parts = file.name.split('/');
    const album = parts.length > 1 ? parts[0] : 'uncategorized';
    const name = parts[parts.length - 1];

    if (!grouped[album]) grouped[album] = [];

    grouped[album].push({
      name,
      url: `${GCS_BASE_URL}/${file.name}`,
      size: Number(file.metadata.size ?? 0),
      updated: file.metadata.updated as string ?? '',
    });
  }

  // Sort each album by name
  for (const album of Object.keys(grouped)) {
    grouped[album].sort((a, b) => a.name.localeCompare(b.name));
  }

  return grouped;
}

/**
 * Delete an image from GCS by its path.
 * @param path - full path inside the bucket (e.g. "heroes/my-image.webp")
 */
export async function deleteFromGCS(path: string): Promise<void> {
  const file = getBucket().file(path);
  await file.delete();
}
