/**
 * scripts/upload-touring-photos-to-sanity.ts
 *
 * Bulk-upload the approved Big Muddy Touring photo library to Sanity as
 * image assets, tagged `touring-approved`. Idempotent: skips files whose
 * `originalFilename` already exists.
 *
 * Run from repo root:
 *   set -a && source apps/web/.env.local && set +a && \
 *     npx tsx scripts/upload-touring-photos-to-sanity.ts
 */

import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = '/Users/chasethis/Documents/big muddy touring approved images';
const TAG = 'touring-approved';
const MAX_EDGE = 2000;

const projectId =
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('✗ Missing SANITY_PROJECT_ID or SANITY_API_TOKEN.');
  console.error('  Run: set -a && source apps/web/.env.local && set +a && <this command>');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

type ExistingAsset = { _id: string; originalFilename?: string };

async function loadExistingFilenames(): Promise<Set<string>> {
  const results: ExistingAsset[] = await client.fetch(
    `*[_type == "sanity.imageAsset"]{ _id, originalFilename }`,
  );
  const set = new Set<string>();
  for (const r of results) if (r.originalFilename) set.add(r.originalFilename);
  return set;
}

async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`✗ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(SOURCE_DIR)
    .filter((f) => /\.(jpe?g|png|webp|tiff?|heic)$/i.test(f))
    .sort();

  console.log(`→ Found ${files.length} candidate images in ${SOURCE_DIR}`);
  console.log(`→ Project ${projectId} / dataset ${dataset}`);
  console.log('→ Loading existing asset filenames for dedup check…');
  const existing = await loadExistingFilenames();
  console.log(`  ${existing.size} assets already in dataset`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;
  const failures: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const fullPath = path.join(SOURCE_DIR, filename);
    const label = `[${i + 1}/${files.length}] ${filename}`;

    if (existing.has(filename)) {
      skipped++;
      console.log(`  skip   ${label}  (already uploaded)`);
      continue;
    }

    try {
      // Resize to max 2000px on longest edge, strip metadata, output JPEG q85.
      const resized = await sharp(fullPath)
        .rotate() // respect EXIF orientation
        .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer();

      const asset = await client.assets.upload('image', resized, {
        filename,
        contentType: 'image/jpeg',
        label: filename,
      });

      // Tag the asset so Chase can filter in the Studio.
      await client
        .patch(asset._id)
        .setIfMissing({ opt: { media: { tags: [] } } })
        .set({
          // Some Sanity installs use `opt.media.tags`, others use a freeform
          // `tags` array. We set both for compatibility with the media plugin
          // and plain GROQ filtering.
          'opt.media.tags': [{ _type: 'tag', name: TAG }],
          tags: [TAG],
        })
        .commit({ autoGenerateArrayKeys: true });

      uploaded++;
      console.log(`  up     ${label}  (${(resized.length / 1024).toFixed(0)} KB → ${asset._id})`);
    } catch (err: any) {
      failed++;
      failures.push(`${filename}: ${err?.message ?? err}`);
      console.error(`  FAIL   ${label}  ${err?.message ?? err}`);
    }
  }

  console.log('\n── Summary ──');
  console.log(`  uploaded: ${uploaded}`);
  console.log(`  skipped (duplicates): ${skipped}`);
  console.log(`  failed: ${failed}`);
  if (failures.length) {
    console.log('\nFailures:');
    failures.forEach((f) => console.log('  - ' + f));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
