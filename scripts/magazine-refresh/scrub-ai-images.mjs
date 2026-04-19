#!/usr/bin/env node
// scripts/magazine-refresh/scrub-ai-images.mjs
//
// Scrubs AI-generated imagery from Sanity article docs. The rule:
//   - heroImageUrl values that DO NOT contain "/approved/" are AI-generated
//     (Chase's real photos are all under bmt-media-bigmuddy/approved/...)
//   - inline image blocks in body[] with the same property are stripped
//
// The script PATCHES — never replaces — the docs:
//   - heroImageUrl set to null
//   - body[] filtered to remove offending image blocks
//
// Reversible: the original heroImageUrl/body values are written to a backup
// file at /tmp/sanity-ai-image-scrub-backup-<timestamp>.json before any
// patches go through.
//
// Usage:
//   node scripts/magazine-refresh/scrub-ai-images.mjs --dry-run
//   node scripts/magazine-refresh/scrub-ai-images.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');
dotenv.config({ path: path.join(REPO_ROOT, 'apps/web/.env.local') });

const DRY_RUN = process.argv.includes('--dry-run');
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const PROJECT_ID = (
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? ''
).trim();
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

if (!DRY_RUN && !TOKEN) {
  console.error('ERROR: SANITY_WRITE_TOKEN not set');
  process.exit(1);
}

// A heroImageUrl is "real" iff it contains the approved-photo prefix.
// Everything else (legacy AI gens under bmt-media-bigmuddy/magazine/,
// /images/records/, /images/studio-c/, AI placeholders, etc.) gets stripped.
function isRealPhotoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return url.includes('/approved/');
}

async function fetchAll() {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=*%5B_type%3D%3D%22article%22%5D%7B_id%2Ctitle%2CheroImageUrl%2Cbody%7D`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`Query: ${res.status}`);
  const json = await res.json();
  return json.result ?? [];
}

function inspectDoc(doc) {
  const heroAi = doc.heroImageUrl && !isRealPhotoUrl(doc.heroImageUrl);
  const bodyAiBlocks = (doc.body ?? []).filter(
    (b) => b._type === 'image' && b.asset?.url && !isRealPhotoUrl(b.asset.url)
  );
  return { heroAi, bodyAiBlocks };
}

async function patch(doc, backupBucket) {
  const { heroAi, bodyAiBlocks } = inspectDoc(doc);
  const set = {};
  const unset = [];

  if (heroAi) {
    backupBucket.push({ id: doc._id, field: 'heroImageUrl', original: doc.heroImageUrl });
    unset.push('heroImageUrl');
  }

  if (bodyAiBlocks.length > 0) {
    const cleanBody = (doc.body ?? []).filter(
      (b) => !(b._type === 'image' && bodyAiBlocks.includes(b))
    );
    backupBucket.push({
      id: doc._id,
      field: 'body',
      original: doc.body,
      removedBlockKeys: bodyAiBlocks.map((b) => b._key ?? '(no key)'),
    });
    set.body = cleanBody;
  }

  if (Object.keys(set).length === 0 && unset.length === 0) return null;

  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;
  const mutations = [{ patch: { id: doc._id, ...(Object.keys(set).length > 0 ? { set } : {}), ...(unset.length > 0 ? { unset } : {}) } }];
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Patch ${doc._id}: ${res.status} ${await res.text()}`);
  return { hero: heroAi, bodyImagesRemoved: bodyAiBlocks.length };
}

async function main() {
  console.log(`\n=== Scrub AI imagery from articles ===`);
  console.log(`Project: ${PROJECT_ID}  Mode: ${DRY_RUN ? 'DRY RUN' : 'WRITING'}\n`);

  const docs = await fetchAll();
  console.log(`Found ${docs.length} article docs\n`);

  const backupBucket = [];
  let touched = 0;
  let heroStripped = 0;
  let bodyImagesStripped = 0;

  for (const doc of docs) {
    const { heroAi, bodyAiBlocks } = inspectDoc(doc);
    if (!heroAi && bodyAiBlocks.length === 0) continue;

    const flags = [
      heroAi ? `hero=${(doc.heroImageUrl ?? '').slice(0, 60)}` : null,
      bodyAiBlocks.length > 0 ? `body=${bodyAiBlocks.length}` : null,
    ].filter(Boolean).join(', ');

    process.stdout.write(`  ${doc._id.padEnd(70)}  ${flags} ... `);

    if (DRY_RUN) {
      console.log('would scrub');
      touched++;
      if (heroAi) heroStripped++;
      bodyImagesStripped += bodyAiBlocks.length;
      continue;
    }

    try {
      const result = await patch(doc, backupBucket);
      console.log('✓');
      touched++;
      if (result?.hero) heroStripped++;
      bodyImagesStripped += result?.bodyImagesRemoved ?? 0;
    } catch (e) {
      console.log(`✗ ${e.message}`);
    }
  }

  if (!DRY_RUN && backupBucket.length > 0) {
    const backupPath = `/tmp/sanity-ai-image-scrub-backup-${Date.now()}.json`;
    await fs.writeFile(backupPath, JSON.stringify(backupBucket, null, 2));
    console.log(`\nBackup of original values: ${backupPath}`);
  }

  console.log(`\nDone — ${touched} docs ${DRY_RUN ? 'would be ' : ''}touched`);
  console.log(`       ${heroStripped} hero images stripped`);
  console.log(`       ${bodyImagesStripped} inline body images stripped`);
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
