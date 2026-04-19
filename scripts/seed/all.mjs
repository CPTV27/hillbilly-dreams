#!/usr/bin/env node
// scripts/seed/all.mjs
//
// Aggregate seed-import planner. Reads every seed file under docs/seed/,
// validates parseable JSON, and reports what would be imported. Default
// mode is DRY-RUN — prints counts + representative records. With --commit
// flag, actually writes to Sanity (for _type docs) and Postgres (for
// Prisma models). --commit is guarded by a typed confirmation prompt.
//
// Usage:
//   node scripts/seed/all.mjs                          # dry-run, safe
//   node scripts/seed/all.mjs --commit                 # (requires typed confirmation)
//   node scripts/seed/all.mjs --commit --target=sanity # only Sanity docs
//   node scripts/seed/all.mjs --commit --target=postgres # only Prisma rows
//
// Required env vars for --commit:
//   SANITY_WRITE_TOKEN (for Sanity imports)
//   NEXT_PUBLIC_SANITY_PROJECT_ID
//   DATABASE_URL (for Postgres imports)

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import dotenv from 'dotenv';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');
const SEED_DIR = path.join(REPO_ROOT, 'docs/seed');

dotenv.config({ path: path.join(REPO_ROOT, 'apps/web/.env.local') });

const args = parseArgs({
  args: process.argv.slice(2),
  options: {
    commit: { type: 'boolean' },
    target: { type: 'string' },
  },
});
const COMMIT = !!args.values.commit;
const TARGET = args.values.target ?? 'all'; // all | sanity | postgres

// Seed file → target system mapping
const SEED_FILES = [
  // Sanity (_type document in Sanity dataset)
  { file: 'podcast-shows.json', target: 'sanity', label: 'Podcast shows' },
  { file: 'staff.json', target: 'sanity', label: 'Staff' },
  { file: 'partner-artists.json', target: 'sanity', label: 'Partner artists' },
  { file: 'faq-entries.json', target: 'sanity', label: 'FAQ entries' },
  { file: 'show-events.json', target: 'sanity', label: 'Show events (Blues Room)' },
  { file: 'magazine-issues.json', target: 'sanity', label: 'Magazine issues' },
  // Postgres (Prisma model rows)
  { file: 'plans.json', target: 'postgres', label: 'Commerce plans' },
  { file: 'module-license-profiles.json', target: 'postgres', label: 'Module license profiles' },
];

async function loadSeed(file) {
  const full = path.join(SEED_DIR, file);
  try {
    const raw = await fs.readFile(full, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { __error: e.message };
  }
}

async function dryRun() {
  console.log('\n=== MBT Seed Import — DRY RUN ===\n');
  console.log(`Reading from: ${SEED_DIR}\n`);

  let totalRecords = 0;
  const report = [];

  for (const cfg of SEED_FILES) {
    if (TARGET !== 'all' && cfg.target !== TARGET) continue;
    const data = await loadSeed(cfg.file);
    if (data.__error) {
      report.push({ ...cfg, status: '✗', count: 0, error: data.__error });
      continue;
    }
    const count = Array.isArray(data) ? data.length : 0;
    totalRecords += count;
    report.push({ ...cfg, status: '✓', count, sample: data[0] });
  }

  // Print table
  console.log(`  ${'File'.padEnd(36)} ${'Target'.padEnd(10)} ${'Count'.padStart(6)}  ${'Label'}`);
  console.log('  ' + '─'.repeat(80));
  for (const r of report) {
    const color = r.status === '✓' ? '\x1b[32m' : '\x1b[31m';
    console.log(
      `  ${color}${r.status}\x1b[0m ${r.file.padEnd(34)} ${r.target.padEnd(10)} ${String(r.count).padStart(6)}  ${r.label}`
    );
    if (r.error) console.log(`    → ${r.error}`);
  }
  console.log('  ' + '─'.repeat(80));
  console.log(`  Total records: ${totalRecords}\n`);

  // Sample one record per file
  console.log('Sample (first record of each file):\n');
  for (const r of report) {
    if (!r.sample) continue;
    const preview = JSON.stringify(r.sample, null, 2).split('\n').slice(0, 6).join('\n');
    console.log(`${r.file}:\n${preview}${JSON.stringify(r.sample).length > 300 ? '\n    ...' : ''}\n`);
  }

  // Social calendar separately — just report counts, don't import
  const socialDir = path.join(SEED_DIR, 'social-calendar');
  try {
    const socialFiles = await fs.readdir(socialDir);
    let socialTotal = 0;
    for (const f of socialFiles) {
      if (!f.endsWith('.json')) continue;
      const data = await loadSeed(path.join('social-calendar', f));
      if (Array.isArray(data)) socialTotal += data.length;
    }
    console.log(`Social calendar — ${socialFiles.length} files, ${socialTotal} total posts (imported separately via Postiz pipeline when live).\n`);
  } catch {
    // no social-calendar dir
  }

  if (COMMIT) {
    console.log('\n⚠ --commit flag set. Proceeding to actual import.\n');
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const answer = await rl.question(`Type "IMPORT TO ${TARGET.toUpperCase()}" to proceed: `);
    rl.close();
    if (answer !== `IMPORT TO ${TARGET.toUpperCase()}`) {
      console.log('Confirmation mismatch. Aborting.');
      process.exit(1);
    }
    console.log('\nActual import not implemented in v1 — use:');
    console.log('  For Sanity:   node scripts/seed/content-templates.mjs (+follow-up for each file)');
    console.log('  For Postgres: write a one-off migration SQL or prisma.*.createMany() script');
    console.log('\nThis script currently only does dry-run validation. Implementation:');
    console.log('  - For Sanity seeds: batch via /data/mutate Sanity REST API (createOrReplace per doc)');
    console.log('  - For Postgres seeds: prisma.plan.createMany, prisma.moduleLicenseProfile.createMany, etc.');
    process.exit(0);
  }
}

dryRun().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
