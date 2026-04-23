#!/usr/bin/env node
// scripts/seed/magazine-refresh-archive.mjs
//
// Soft-archives the 13 off-mission articles by clearing their publishedAt
// (so they no longer appear on the magazine front-page feed) and prefixing
// the excerpt with a [Archived 2026-04-19] marker so Tracy can see them in
// Studio. Does NOT delete — articles can be restored by re-setting
// publishedAt.
//
// Usage:
//   node scripts/seed/magazine-refresh-archive.mjs --dry-run
//   node scripts/seed/magazine-refresh-archive.mjs

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

if (!PROJECT_ID || (!DRY_RUN && !TOKEN)) {
  console.error('ERROR: env not set');
  process.exit(1);
}

const ARCHIVE_IDS = [
  'imported-alexandria-the-crossroads-nobody-expected',
  'imported-baton-rouge-capital-city-blues-and-bayou-smoke',
  'imported-bentonville-crystal-trails-and-the-ozark-whisper-beneath-the-wealth',
  'imported-branson-sequins-fog-and-the-old-religion-of-the-ozarks',
  'imported-el-dorado-oil-boom-echoes-and-arkansas-soul',
  'imported-fayetteville-the-ozark-hills-and-the-oldest-bar-in-arkansas',
  'imported-lafayette-the-heartbeat-of-cajun-country',
  'imported-little-rock-the-capital-city-that-kept-its-wound-open',
  'imported-monroe-ouachita-gothic-and-the-forgotten-river-sound',
  'imported-natchitoches-the-oldest-town-and-the-longest-memory',
  'imported-ruston-pine-hills-college-town-and-the-sound-of-something-almost-lost',
  'imported-shreveport-neon-hayrides-and-the-ghost-of-elvis',
  'ea32a8ef-8858-4367-86ab-ea2c75882e72', // Save the Hall Ball Band — duplicate of the photo-essay
];

async function sanityMutate(mutations) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`Sanity ${res.status}: ${await res.text()}`);
  return res.json();
}

async function fetchExisting(ids) {
  const filter = ids.map((id) => `"${id}"`).join(',');
  const query = encodeURIComponent(`*[_id in [${filter}]]{_id, title, excerpt, publishedAt}`);
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    signal: AbortSignal.timeout(15_000),
  });
  const json = await res.json();
  return json.result ?? [];
}

async function main() {
  console.log(`\n=== Magazine Refresh — Archive Off-Mission ===`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'WRITING'}\n`);

  const existing = await fetchExisting(ARCHIVE_IDS);
  console.log(`Found ${existing.length} of ${ARCHIVE_IDS.length} requested archive targets:`);
  for (const doc of existing) {
    console.log(`  • ${doc._id}  —  ${doc.title}`);
  }
  const missing = ARCHIVE_IDS.filter((id) => !existing.some((e) => e._id === id));
  if (missing.length > 0) {
    console.log(`\n  (${missing.length} not found — already deleted or never existed)`);
  }
  console.log();

  if (DRY_RUN) {
    console.log('Dry-run — no mutations sent.');
    return;
  }

  const mutations = existing.map((doc) => ({
    patch: {
      id: doc._id,
      set: {
        publishedAt: null,
        excerpt: `[Archived 2026-04-19 — off-mission for current editorial direction] ${
          doc.excerpt ? doc.excerpt.replace(/^\[Archived[^\]]*\]\s*/, '') : ''
        }`.trim(),
      },
    },
  }));

  const txn = await sanityMutate(mutations);
  console.log(`✓ Archived ${existing.length} docs (txn ${txn.transactionId.slice(0, 8)})`);
  console.log(`  These docs are still in Sanity and visible in Studio, but no longer`);
  console.log(`  appear in published feeds. Restore by setting publishedAt back.`);
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
