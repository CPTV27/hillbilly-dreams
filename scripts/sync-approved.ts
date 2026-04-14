#!/usr/bin/env npx tsx
/**
 * sync-approved.ts — Lightroom → GCS → Sanity Photo Pipeline
 *
 * Takes a folder of Lightroom exports organized as:
 *   {input}/{region}/{city}/{shoot-slug}/*.jpg
 *
 * And for each photo:
 *   1. Extracts IPTC/XMP/EXIF metadata via exifr (caption, credit, keywords, GPS, camera)
 *   2. Maps Lightroom keywords to taxonomy (region, city, category, subjects)
 *   3. Converts to WebP at 3 sizes (orig 2400 / grid 1600 / thumb 480) via sharp
 *   4. Uploads all three sizes + JSON sidecar to gs://bmt-media-bigmuddy/approved/
 *   5. Updates gs://bmt-media-bigmuddy/approved/index.json (the master catalog
 *      that the Sanity picker reads)
 *
 * Usage:
 *   pnpm tsx scripts/sync-approved.ts ~/Pictures/BMM-Sync/
 *   pnpm tsx scripts/sync-approved.ts ~/Pictures/BMM-Sync/ --dry-run
 *   pnpm tsx scripts/sync-approved.ts --help
 *
 * Environment:
 *   GOOGLE_APPLICATION_CREDENTIALS_JSON — service account JSON (Vercel)
 *   OR ADC (local dev — run `gcloud auth application-default login`)
 *   GCS_BUCKET — defaults to bmt-media-bigmuddy
 *
 * The input folder structure is the SOURCE OF TRUTH for region/city/shoot.
 * Keywords layered on top provide category + subjects + caption + credit.
 */

// @ts-nocheck
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { Storage } from '@google-cloud/storage';
import sharp from 'sharp';
// @ts-ignore — exifr has its own types but we want the default export
import exifr from 'exifr';

// ─── Config ──────────────────────────────────────────────────────────────────

const BUCKET_NAME = process.env.GCS_BUCKET ?? 'bmt-media-bigmuddy';
const APPROVED_PREFIX = 'approved';
const INDEX_KEY = `${APPROVED_PREFIX}/index.json`;
const GCS_BASE_URL = `https://storage.googleapis.com/${BUCKET_NAME}`;

const SIZES = {
  orig: { width: 2400, quality: 85 },
  grid: { width: 1600, quality: 80 },
  thumb: { width: 480, quality: 75 },
} as const;

const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.heic']);

const KNOWN_REGIONS = new Set(['big-muddy', 'bearsville']);

const KNOWN_CITIES = new Set([
  // Big Muddy corridor
  'natchez', 'memphis', 'clarksdale', 'new-orleans', 'vicksburg',
  'greenville', 'indianola', 'oxford', 'tupelo', 'helena', 'tunica',
  'jackson', 'yazoo-city',
  // Bearsville / Catskills
  'woodstock', 'catskills', 'studio-c',
]);

const KNOWN_CATEGORIES = new Set([
  'city-guide', 'feature', 'photo-essay', 'interview',
  'food-drink', 'music', 'venue', 'portrait', 'landscape',
]);

// ─── Types ───────────────────────────────────────────────────────────────────

interface PhotoEntry {
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
  urls: {
    orig: string;
    grid: string;
    thumb: string;
  };
  widths: {
    orig: number;
    grid: number;
    thumb: number;
  };
  ingestedAt: string;
}

interface PhotoIndex {
  version: 1;
  generated: string;
  photos: PhotoEntry[];
}

// ─── GCS Client (lazy init) ──────────────────────────────────────────────────

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

async function uploadBuffer(buffer: Buffer, key: string, contentType: string): Promise<string> {
  const file = getBucket().file(key);
  await file.save(buffer, {
    metadata: { contentType, cacheControl: 'public, max-age=31536000' },
    resumable: false,
  });
  return `${GCS_BASE_URL}/${key}`;
}

async function downloadIndex(): Promise<PhotoIndex> {
  try {
    const [buf] = await getBucket().file(INDEX_KEY).download();
    return JSON.parse(buf.toString('utf-8'));
  } catch {
    return { version: 1, generated: new Date().toISOString(), photos: [] };
  }
}

async function uploadIndex(index: PhotoIndex, dryRun: boolean): Promise<void> {
  index.generated = new Date().toISOString();
  // Sort for stable output
  index.photos.sort((a, b) => {
    if (a.region !== b.region) return a.region.localeCompare(b.region);
    if (a.city !== b.city) return a.city.localeCompare(b.city);
    if (a.shoot !== b.shoot) return a.shoot.localeCompare(b.shoot);
    return a.hash.localeCompare(b.hash);
  });
  const buf = Buffer.from(JSON.stringify(index, null, 2), 'utf-8');
  if (dryRun) {
    console.log(`  [dry-run] Would upload ${INDEX_KEY} (${buf.length} bytes, ${index.photos.length} photos)`);
    return;
  }
  await uploadBuffer(buf, INDEX_KEY, 'application/json');
}

// ─── File walking ────────────────────────────────────────────────────────────

function walkDir(dir: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walkDir(full, files);
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase();
      if (SUPPORTED_EXTS.has(ext)) files.push(full);
    }
  }
  return files;
}

// ─── Taxonomy parsing ────────────────────────────────────────────────────────

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Parse region/city/shoot from folder path relative to input root.
 * Expected: {region}/{city}/{shoot}/file.jpg
 * Fallback: 'uncategorized' for any missing layer.
 */
function parsePathParts(absPath: string, inputRoot: string): {
  region: string;
  city: string;
  shoot: string;
} {
  const rel = path.relative(inputRoot, absPath);
  const parts = rel.split(path.sep);
  // parts = [region, city, shoot, file] — drop file
  const [region, city, shoot] = parts;
  return {
    region: region && KNOWN_REGIONS.has(region) ? region : 'uncategorized',
    city: city && KNOWN_CITIES.has(city) ? city : (city ? slugify(city) : 'uncategorized'),
    shoot: shoot ? slugify(shoot) : 'misc',
  };
}

/**
 * Parse Lightroom keywords into category + subjects.
 * Also override region/city if a keyword matches.
 */
function parseKeywords(
  keywords: string[],
  defaults: { region: string; city: string }
): {
  region: string;
  city: string;
  category: string | null;
  subjects: string[];
} {
  let region = defaults.region;
  let city = defaults.city;
  let category: string | null = null;
  const subjects: string[] = [];

  for (const rawKw of keywords) {
    const kw = slugify(rawKw);
    if (!kw) continue;
    if (KNOWN_REGIONS.has(kw)) region = kw;
    else if (KNOWN_CITIES.has(kw)) city = kw;
    else if (KNOWN_CATEGORIES.has(kw)) category = kw;
    else if (kw !== 'approved') subjects.push(kw);
  }

  return { region, city, category, subjects };
}

// ─── Metadata extraction ─────────────────────────────────────────────────────

interface RawMeta {
  caption: string | null;
  credit: string | null;
  keywords: string[];
  capturedAt: string | null;
  gps: { lat: number; lng: number } | null;
  camera: string | null;
  lens: string | null;
}

async function extractMeta(buffer: Buffer): Promise<RawMeta> {
  const out: RawMeta = {
    caption: null, credit: null, keywords: [],
    capturedAt: null, gps: null, camera: null, lens: null,
  };
  try {
    const parsed: any = await exifr.parse(buffer, {
      iptc: true, xmp: true, exif: true, gps: true, tiff: true,
      mergeOutput: true,
    });
    if (!parsed) return out;

    // Caption: IPTC Caption-Abstract, or XMP dc:description
    out.caption =
      parsed['Caption-Abstract'] ||
      parsed.Caption ||
      parsed.description ||
      parsed.ImageDescription ||
      null;
    if (typeof out.caption === 'object' && out.caption !== null) {
      // XMP dc:description may be {lang: value} or array
      const captionAny: any = out.caption;
      out.caption = captionAny.value || Object.values(captionAny)[0] || null;
    }

    // Credit / by-line
    out.credit =
      parsed['By-line'] ||
      parsed.Byline ||
      parsed.Artist ||
      parsed.Creator ||
      parsed.Credit ||
      null;
    if (Array.isArray(out.credit)) out.credit = out.credit.join(', ');

    // Keywords
    let kw: any = parsed.Keywords || parsed.subject || parsed.Subject || [];
    if (typeof kw === 'string') kw = kw.split(/[,;]/).map((s: string) => s.trim());
    if (Array.isArray(kw)) out.keywords = kw.filter(Boolean);

    // Capture date
    const d = parsed.DateTimeOriginal || parsed.CreateDate || parsed.DateCreated;
    if (d) out.capturedAt = (d instanceof Date ? d : new Date(d)).toISOString();

    // GPS
    if (parsed.latitude != null && parsed.longitude != null) {
      out.gps = { lat: parsed.latitude, lng: parsed.longitude };
    }

    // Camera
    const make = parsed.Make?.trim();
    const model = parsed.Model?.trim();
    if (make || model) out.camera = [make, model].filter(Boolean).join(' ');
    out.lens = parsed.LensModel || parsed.Lens || null;
  } catch (e) {
    console.warn(`  ⚠ Metadata parse failed: ${(e as Error).message}`);
  }
  return out;
}

// ─── Per-photo processing ────────────────────────────────────────────────────

interface ProcessResult {
  status: 'uploaded' | 'skipped' | 'error';
  hash?: string;
  entry?: PhotoEntry;
  error?: string;
}

async function processPhoto(
  filePath: string,
  inputRoot: string,
  existingHashes: Set<string>,
  dryRun: boolean
): Promise<ProcessResult> {
  try {
    const buffer = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha1').update(buffer).digest('hex').slice(0, 12);

    if (existingHashes.has(hash)) {
      return { status: 'skipped', hash };
    }

    const pathParts = parsePathParts(filePath, inputRoot);
    const raw = await extractMeta(buffer);
    const tax = parseKeywords(raw.keywords, { region: pathParts.region, city: pathParts.city });

    // Convert to three webp sizes
    const sizes: Record<string, { buffer: Buffer; width: number }> = {};
    for (const [name, cfg] of Object.entries(SIZES)) {
      const out = await sharp(buffer)
        .rotate() // respect EXIF orientation
        .resize({ width: cfg.width, height: cfg.width, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: cfg.quality })
        .toBuffer({ resolveWithObject: true });
      sizes[name] = { buffer: out.data, width: out.info.width };
    }

    const keyBase = `${APPROVED_PREFIX}/${tax.region}/${tax.city}/${pathParts.shoot}`;
    const urls = {
      orig: `${GCS_BASE_URL}/${keyBase}/${hash}.webp`,
      grid: `${GCS_BASE_URL}/${keyBase}/${hash}-grid.webp`,
      thumb: `${GCS_BASE_URL}/${keyBase}/${hash}-thumb.webp`,
    };

    const entry: PhotoEntry = {
      hash,
      region: tax.region,
      city: tax.city,
      shoot: pathParts.shoot,
      category: tax.category,
      subjects: tax.subjects,
      caption: raw.caption,
      credit: raw.credit,
      capturedAt: raw.capturedAt,
      gps: raw.gps,
      camera: raw.camera,
      lens: raw.lens,
      originalFilename: path.basename(filePath),
      urls,
      widths: {
        orig: sizes.orig.width,
        grid: sizes.grid.width,
        thumb: sizes.thumb.width,
      },
      ingestedAt: new Date().toISOString(),
    };

    if (dryRun) {
      console.log(`  [dry-run] Would upload ${hash} → ${keyBase}/ (${tax.region}/${tax.city} · ${raw.keywords.length} kw · cap=${raw.caption ? '✓' : '✗'})`);
      return { status: 'uploaded', hash, entry };
    }

    await Promise.all([
      uploadBuffer(sizes.orig.buffer, `${keyBase}/${hash}.webp`, 'image/webp'),
      uploadBuffer(sizes.grid.buffer, `${keyBase}/${hash}-grid.webp`, 'image/webp'),
      uploadBuffer(sizes.thumb.buffer, `${keyBase}/${hash}-thumb.webp`, 'image/webp'),
      uploadBuffer(
        Buffer.from(JSON.stringify(entry, null, 2), 'utf-8'),
        `${keyBase}/${hash}.json`,
        'application/json'
      ),
    ]);

    return { status: 'uploaded', hash, entry };
  } catch (e) {
    return { status: 'error', error: (e as Error).message };
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

function printHelp(): void {
  console.log(`
sync-approved.ts — Lightroom → GCS → Sanity sync

USAGE
  pnpm tsx scripts/sync-approved.ts <input-folder> [options]

ARGUMENTS
  <input-folder>    Folder containing {region}/{city}/{shoot}/*.jpg

OPTIONS
  --dry-run         Show what would be uploaded without writing to GCS
  --help            Print this help

EXAMPLE
  pnpm tsx scripts/sync-approved.ts ~/Pictures/BMM-Sync/

TAXONOMY
  regions:    ${[...KNOWN_REGIONS].join(', ')}
  cities:     ${[...KNOWN_CITIES].join(', ')}
  categories: ${[...KNOWN_CATEGORIES].join(', ')}

  Tag photos in Lightroom with keywords matching the slugs above.
  Folder structure is the fallback source for region/city.
`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.length === 0) {
    printHelp();
    process.exit(0);
  }

  const dryRun = args.includes('--dry-run');
  const inputRoot = path.resolve(args.find((a) => !a.startsWith('--')) || '');

  if (!fs.existsSync(inputRoot) || !fs.statSync(inputRoot).isDirectory()) {
    console.error(`❌ Input folder does not exist: ${inputRoot}`);
    process.exit(1);
  }

  console.log(`\n📸 BMM Photo Sync`);
  console.log(`   Input:  ${inputRoot}`);
  console.log(`   Bucket: gs://${BUCKET_NAME}/${APPROVED_PREFIX}/`);
  console.log(`   Mode:   ${dryRun ? 'DRY RUN (no writes)' : 'LIVE'}\n`);

  // Walk input
  const files = walkDir(inputRoot);
  if (files.length === 0) {
    console.log(`   No supported images found.`);
    process.exit(0);
  }
  console.log(`   Found ${files.length} image(s) to process\n`);

  // Load existing index
  console.log(`🔽 Fetching existing index from GCS...`);
  const index = await downloadIndex();
  const existingHashes = new Set(index.photos.map((p) => p.hash));
  console.log(`   Current index: ${index.photos.length} photos\n`);

  // Process each file
  let uploaded = 0, skipped = 0, errored = 0;
  const newEntries: PhotoEntry[] = [];

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const rel = path.relative(inputRoot, f);
    process.stdout.write(`  [${i + 1}/${files.length}] ${rel} ... `);
    const result = await processPhoto(f, inputRoot, existingHashes, dryRun);
    if (result.status === 'uploaded') {
      uploaded++;
      if (result.entry) newEntries.push(result.entry);
      console.log(`✓ ${result.hash}`);
    } else if (result.status === 'skipped') {
      skipped++;
      console.log(`— skipped (${result.hash} already in index)`);
    } else {
      errored++;
      console.log(`✗ error: ${result.error}`);
    }
  }

  // Merge and upload index
  if (newEntries.length > 0) {
    // Replace by hash (in case re-upload)
    const byHash = new Map(index.photos.map((p) => [p.hash, p]));
    for (const e of newEntries) byHash.set(e.hash, e);
    index.photos = [...byHash.values()];
    console.log(`\n📤 Updating index: ${index.photos.length} total photos`);
    await uploadIndex(index, dryRun);
  }

  console.log(`\n✅ Done.`);
  console.log(`   Uploaded: ${uploaded}`);
  console.log(`   Skipped:  ${skipped}`);
  console.log(`   Errors:   ${errored}`);
  console.log(`   Index:    ${index.photos.length} photos in gs://${BUCKET_NAME}/${INDEX_KEY}\n`);

  if (errored > 0) process.exit(1);
}

main().catch((e) => {
  console.error('\n❌ Fatal:', e);
  process.exit(1);
});
