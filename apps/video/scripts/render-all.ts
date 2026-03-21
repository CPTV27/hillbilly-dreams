// scripts/render-all.ts
// Batch render all Outsider Economics videos
// Usage: pnpm run render:all [--format=shorts|youtube|both]

import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
import { EQUATIONS, STATS, QUOTES } from '../src/data/equations';

const OUT_DIR = path.join(__dirname, '..', 'out');
const ENTRY = path.join(__dirname, '..', 'src', 'index.ts');

// Parse --format flag
const formatArg = process.argv.find((a) => a.startsWith('--format='));
const format = formatArg ? formatArg.split('=')[1] : 'both';

// Build list of all composition IDs
function getAllIds(): string[] {
  const ids: string[] = [];

  for (const eq of EQUATIONS) {
    if (format === 'both' || format === 'youtube') ids.push(`eq-${eq.id}-yt`);
    if (format === 'both' || format === 'shorts') ids.push(`eq-${eq.id}-shorts`);
  }
  for (const stat of STATS) {
    if (format === 'both' || format === 'youtube') ids.push(`${stat.id}-yt`);
    if (format === 'both' || format === 'shorts') ids.push(`${stat.id}-shorts`);
  }
  for (const q of QUOTES) {
    if (format === 'both' || format === 'youtube') ids.push(`${q.id}-yt`);
    if (format === 'both' || format === 'shorts') ids.push(`${q.id}-shorts`);
  }

  return ids;
}

async function main() {
  const ids = getAllIds();
  console.log(`\nRendering ${ids.length} videos (format: ${format})...\n`);

  // Ensure output directory
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Bundle once
  console.log('Bundling...');
  const bundled = await bundle({ entryPoint: ENTRY });
  console.log('Bundle ready.\n');

  let completed = 0;
  for (const id of ids) {
    const outputPath = path.join(OUT_DIR, `${id}.mp4`);
    console.log(`[${completed + 1}/${ids.length}] Rendering ${id}...`);

    const composition = await selectComposition({
      serveUrl: bundled,
      id,
    });

    await renderMedia({
      composition,
      serveUrl: bundled,
      outputLocation: outputPath,
      codec: 'h264',
    });

    completed++;
    console.log(`  → ${outputPath}`);
  }

  console.log(`\nDone. ${completed} videos rendered to ${OUT_DIR}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
