#!/usr/bin/env node
/**
 * sync_gem.js — Hillbilly Dreams Command Context Exporter
 *
 * Pulls the canonical state files from this repo and bundles them
 * into a single timestamped text file ready for Gem Knowledge Base upload.
 *
 * Usage:  node scripts/sync_gem.js
 * Output: exports/gem_context_<timestamp>.txt
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'exports');

// ─── Files to include (paths relative to repo root) ─────────────────
const FILES_TO_SYNC = [
  // Swarm coordination
  { path: 'AGENT_LEDGER.md',                      label: 'Agent Swarm Ledger' },
  { path: 'HANDOFF.md',                           label: 'Cross-Agent Handoff' },
  { path: '.agents/context.md',                    label: 'Repo Identity (BMT)' },

  // Schema & config
  { path: 'packages/database/prisma/schema.prisma', label: 'Prisma Schema' },
  { path: 'packages/config/brands.ts',             label: 'Brand Registry' },
  { path: 'packages/config/tokens.css',            label: 'Design Tokens' },

  // Strategy & docs
  { path: 'docs/strategy/PLATFORM_ROADMAP.md',    label: 'Platform Roadmap' },
  { path: 'docs/strategy/BigMuddy_Ecosystem_MasterPlan.docx.md', label: 'Ecosystem Master Plan' },

  // Ops
  { path: 'firebase.json',                        label: 'Firebase Config' },
  { path: '.firebaserc',                           label: 'Firebase RC (project aliases)' },

  // Workflow protocol
  { path: '.agents/workflows/recursive-qc-sweep.md', label: 'QC Sweep Protocol' },
];

function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outFile = path.join(OUT_DIR, `gem_context_${stamp}.txt`);

  let out = '';
  out += '═══════════════════════════════════════════════════════\n';
  out += '  HILLBILLY DREAMS — COMMAND CONTEXT EXPORT\n';
  out += `  Timestamp : ${new Date().toISOString()}\n`;
  out += `  Repo Root : ${ROOT}\n`;
  out += '═══════════════════════════════════════════════════════\n\n';

  let included = 0;
  let skipped  = 0;

  for (const entry of FILES_TO_SYNC) {
    const abs = path.join(ROOT, entry.path);
    if (!fs.existsSync(abs)) {
      console.warn(`⚠️  SKIP: ${entry.path} (not found)`);
      skipped++;
      continue;
    }

    const content = fs.readFileSync(abs, 'utf-8');
    const stats   = fs.statSync(abs);
    const kb      = (stats.size / 1024).toFixed(1);

    out += `\n\n${'─'.repeat(60)}\n`;
    out += `FILE: ${entry.path}\n`;
    out += `LABEL: ${entry.label}\n`;
    out += `SIZE: ${kb} KB  |  MODIFIED: ${stats.mtime.toISOString()}\n`;
    out += `${'─'.repeat(60)}\n\n`;
    out += content;

    console.log(`✅  ${entry.label} — ${entry.path} (${kb} KB)`);
    included++;
  }

  out += `\n\n${'═'.repeat(60)}\n`;
  out += `  END OF EXPORT — ${included} files included, ${skipped} skipped\n`;
  out += `${'═'.repeat(60)}\n`;

  fs.writeFileSync(outFile, out);
  const totalKb = (Buffer.byteLength(out) / 1024).toFixed(1);
  console.log(`\n🚀  Export complete: ${outFile}`);
  console.log(`    Total size: ${totalKb} KB — ${included} files bundled`);

  // Cleanup: keep only last 5 exports
  const existing = fs.readdirSync(OUT_DIR)
    .filter(f => f.startsWith('gem_context_'))
    .sort()
    .reverse();
  if (existing.length > 5) {
    for (const old of existing.slice(5)) {
      fs.unlinkSync(path.join(OUT_DIR, old));
      console.log(`🧹  Cleaned old export: ${old}`);
    }
  }
}

run();
