#!/usr/bin/env node
// scripts/magazine-refresh/archive-off-mission.mjs
//
// Soft-archives the 14 city-guide articles that don't fit the new editorial
// mission ("Tracy's Dominion" — Inn-traveler-facing). Patches each doc to:
//   - clear publishedAt (hides from published feeds)
//   - prepend "[ARCHIVED 2026-04-19 — off-mission] " to the title so it's
//     visually flagged in Sanity Studio
//
// Reversible: if any of these turn out useful later, we can patch them back
// without losing content. Nothing is destroyed.
//
// Usage:
//   node scripts/magazine-refresh/archive-off-mission.mjs --dry-run
//   node scripts/magazine-refresh/archive-off-mission.mjs

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

// 14 articles flagged off-mission (Inn-travel-irrelevant or far outside corridor)
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
  // Save-the-Hall-Ball events entry — duplicate of the photo-essay version
  'imported-save-the-hall-ball-pilgrimage-garden-clubs-fight-for-stanton-hall',
  // Big drought-era piece — keeping the photo-essay variant by the same name
  'ea32a8ef-8858-4367-86ab-ea2c75882e72',
];

async function fetchExisting(id) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=*%5B_id%3D%3D%22${id}%22%5D%7B_id%2Ctitle%2CpublishedAt%7D`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Query failed: ${res.status}`);
  const json = await res.json();
  return json.result?.[0] ?? null;
}

async function patchDoc(id, currentTitle) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;
  const newTitle = currentTitle.startsWith('[ARCHIVED')
    ? currentTitle
    : `[ARCHIVED 2026-04-19 — off-mission] ${currentTitle}`;
  const mutations = [
    {
      patch: {
        id,
        set: { title: newTitle, publishedAt: null },
      },
    },
  ];
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Patch ${id}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  console.log(`\n=== Archive off-mission articles ===`);
  console.log(`Project: ${PROJECT_ID}  Mode: ${DRY_RUN ? 'DRY RUN' : 'WRITING'}\n`);

  let archived = 0;
  let skipped = 0;
  let missing = 0;

  for (const id of ARCHIVE_IDS) {
    process.stdout.write(`  ${id} ... `);
    const existing = await fetchExisting(id);
    if (!existing) {
      console.log('not found');
      missing++;
      continue;
    }
    if (existing.title?.startsWith('[ARCHIVED')) {
      console.log('already archived');
      skipped++;
      continue;
    }
    if (DRY_RUN) {
      console.log(`would archive ("${existing.title.slice(0, 50)}...")`);
      archived++;
      continue;
    }
    try {
      await patchDoc(id, existing.title);
      console.log('✓');
      archived++;
    } catch (e) {
      console.log(`✗ ${e.message}`);
    }
  }

  console.log(`\nDone — ${archived} ${DRY_RUN ? 'would be' : ''} archived, ${skipped} already done, ${missing} not found.`);
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
