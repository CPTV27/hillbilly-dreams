// lib/gcs.ts
// Google Cloud Storage helper for image uploads
// Bucket: gs://bmt-media-bigmuddy (public read, us-east4)

import { Storage } from '@google-cloud/storage';

const BUCKET_NAME = process.env.GCS_BUCKET ?? 'bmt-media-bigmuddy';

// On Firebase App Hosting, ADC is available automatically.
// Locally, set GOOGLE_APPLICATION_CREDENTIALS or run `gcloud auth application-default login`.
const storage = new Storage();
const bucket = storage.bucket(BUCKET_NAME);

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
  const file = bucket.file(path);

  await file.save(buffer, {
    metadata: {
      contentType,
      cacheControl: 'public, max-age=31536000',
    },
    resumable: false,
  });

  // Make publicly readable
  await file.makePublic();

  return `${GCS_BASE_URL}/${path}`;
}

/**
 * List all images in the bucket, grouped by album (top-level folder).
 */
export async function listImages(): Promise<
  Record<string, Array<{ name: string; url: string; size: number; updated: string }>>
> {
  const [files] = await bucket.getFiles();

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
  const file = bucket.file(path);
  await file.delete();
}
