// lib/sidecar-writer.ts
// GCS sidecar pattern adapted from S2PX server/lib/sidecarWriter.ts
// Each artist folder in GCS carries its own artist.json with brand context
// Delta Dawn reads the sidecar to pull brand kit, colors, fonts, photos

import { Storage } from '@google-cloud/storage';

const BUCKET_NAME = process.env.GCS_BUCKET ?? 'bmt-media-bigmuddy';

let storage: Storage | null = null;
try {
  storage = new Storage();
} catch {
  console.warn('[sidecar] GCS not configured — sidecar writes disabled');
}

// ── Types ──

export interface BrandKit {
  primaryFont: string;
  fontWeights?: string[];
  hexCodes: string[];
  colorNames?: Record<string, string>;
  logoSvgPath?: string;
  logoPngPath?: string;
  styleGuideDocId?: string;
  templateSource?: string; // e.g. "Amy Allen Brand Package"
}

export interface ArtistSidecar {
  _schema: 'BMT-ArtistSidecar-v1';
  _generatedAt: string;
  artistName: string;
  slug: string;
  genre: string;
  city: string;
  state: string;
  photoCount: number;
  assets: Array<{
    name: string;
    path: string;
    size: number;
    type: 'photo' | 'logo' | 'font' | 'document' | 'audio' | 'video' | 'other';
  }>;
  brandKit: BrandKit;
  albums?: Array<{
    title: string;
    trackCount: number;
    releaseDate?: string;
  }>;
  driveRefs?: Record<string, string>; // key: description, value: Drive ID
  bio?: string;
  notes?: string;
}

// ── File Type Classifier ──

function classifyFile(name: string): ArtistSidecar['assets'][0]['type'] {
  const ext = name.split('.').pop()?.toLowerCase() || '';
  const photo = ['jpg', 'jpeg', 'png', 'webp', 'tif', 'tiff', 'heic', 'raw', 'cr2', 'nef'];
  const logo = ['svg', 'eps', 'ai'];
  const font = ['ttf', 'otf', 'woff', 'woff2'];
  const doc = ['pdf', 'doc', 'docx', 'txt', 'md'];
  const audio = ['mp3', 'wav', 'aiff', 'flac', 'aac', 'm4a'];
  const video = ['mp4', 'mov', 'avi', 'mkv', 'webm'];

  if (photo.includes(ext)) return 'photo';
  if (logo.includes(ext)) return 'logo';
  if (font.includes(ext)) return 'font';
  if (doc.includes(ext)) return 'document';
  if (audio.includes(ext)) return 'audio';
  if (video.includes(ext)) return 'video';
  return 'other';
}

// ── Core: Write Artist Sidecar ──

/**
 * Generate and upload artist.json sidecar to the artist's GCS folder.
 * The sidecar lives alongside the files so Delta Dawn can grab context
 * directly from the folder without a DB roundtrip.
 */
export async function writeArtistSidecar(
  folderPrefix: string,
  sidecar: Omit<ArtistSidecar, '_schema' | '_generatedAt'>
): Promise<{ success: boolean; path?: string; error?: string }> {
  if (!storage) {
    return { success: false, error: 'GCS not configured' };
  }

  try {
    const bucket = storage.bucket(BUCKET_NAME);
    const sidecarPath = `${folderPrefix}/artist.json`;
    const file = bucket.file(sidecarPath);

    const payload: ArtistSidecar = {
      _schema: 'BMT-ArtistSidecar-v1',
      _generatedAt: new Date().toISOString(),
      ...sidecar,
    };

    await file.save(JSON.stringify(payload, null, 2), {
      contentType: 'application/json',
      metadata: {
        cacheControl: 'no-cache',
        metadata: { 'x-bmt-sidecar': 'true' },
      },
    });

    console.log(`[sidecar] Wrote ${sidecarPath} (${sidecar.assets.length} assets)`);
    return { success: true, path: sidecarPath };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[sidecar] Write error:`, msg);
    return { success: false, error: msg };
  }
}

/**
 * Read an artist sidecar from GCS.
 * Returns null if not found.
 */
export async function readArtistSidecar(
  folderPrefix: string
): Promise<ArtistSidecar | null> {
  if (!storage) return null;

  try {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(`${folderPrefix}/artist.json`);
    const [exists] = await file.exists();
    if (!exists) return null;

    const [contents] = await file.download();
    return JSON.parse(contents.toString()) as ArtistSidecar;
  } catch {
    return null;
  }
}

/**
 * Scan a GCS folder and build the asset inventory for a sidecar.
 * Used when initially creating or refreshing an artist's sidecar.
 */
export async function scanFolderAssets(
  folderPrefix: string
): Promise<ArtistSidecar['assets']> {
  if (!storage) return [];

  const bucket = storage.bucket(BUCKET_NAME);
  const [files] = await bucket.getFiles({ prefix: folderPrefix });

  return files
    .filter((f) => !f.name.endsWith('/') && !f.name.endsWith('artist.json'))
    .map((f) => ({
      name: f.name.split('/').pop() || f.name,
      path: f.name,
      size: Number(f.metadata.size ?? 0),
      type: classifyFile(f.name),
    }));
}

// ── Big Muddy Default Brand Kit ──

export const BIG_MUDDY_BRAND_KIT: BrandKit = {
  primaryFont: 'SF Movie Poster',
  fontWeights: ['Regular', 'Bold', 'Oblique', 'Condensed', 'Condensed Bold', 'Condensed Oblique'],
  hexCodes: ['#ff4a1c', '#0a0a0a', '#faf6f0', '#1a3a1a', '#ffb700', '#2a2a2a', '#1a1a1a'],
  colorNames: {
    '#ff4a1c': 'blood-orange',
    '#0a0a0a': 'midnight',
    '#faf6f0': 'cream',
    '#1a3a1a': 'forest',
    '#ffb700': 'gold',
    '#2a2a2a': 'smoke',
    '#1a1a1a': 'dark-smoke',
  },
  templateSource: 'Amy Allen Brand Package',
};
