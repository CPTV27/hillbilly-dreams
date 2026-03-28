#!/usr/bin/env npx tsx
/**
 * sync-notebooks.ts — Export Neon AgentContext fragments into Open Notebook lenses
 *
 * Usage:
 *   npx tsx scripts/sync-notebooks.ts --lens strategy
 *   npx tsx scripts/sync-notebooks.ts --lens creative
 *   npx tsx scripts/sync-notebooks.ts --lens all
 *   npx tsx scripts/sync-notebooks.ts --lens all --fresh  (delete existing sources first)
 */

import { PrismaClient } from '../packages/database/node_modules/@prisma/client';

const prisma = new PrismaClient();
const NOTEBOOK_URL = process.env.OPEN_NOTEBOOK_URL || 'http://localhost:5055';

// Lens → Domain mapping (strict, prevents context pollution)
const LENS_CONFIG: Record<string, { notebookId: string; domains: string[] }> = {
  strategy: {
    notebookId: 'notebook:6fpk46gujsh1olpkfky8',
    domains: ['strategy', 'finance'],
  },
  creative: {
    notebookId: 'notebook:96z2ptpwla448vrsvzlc',
    domains: ['brand', 'media', 'touring'],
  },
  operations: {
    notebookId: 'notebook:3yloextgo6t7nyn7xs0x',
    domains: ['operations', 'product'],
  },
  research: {
    notebookId: 'notebook:5305twhf40apwn24r99i',
    domains: ['reference', 'marketing'],
  },
};

async function syncLens(lensName: string) {
  const config = LENS_CONFIG[lensName];
  if (!config) {
    console.error(`Unknown lens: ${lensName}. Options: ${Object.keys(LENS_CONFIG).join(', ')}`);
    return;
  }

  console.log(`\n━━━ Syncing ${lensName.toUpperCase()} lens ━━━`);
  console.log(`  Domains: ${config.domains.join(', ')}`);
  console.log(`  Notebook: ${config.notebookId}`);

  // Query fragments for this lens's domains
  const fragments = await prisma.agentContext.findMany({
    where: { domain: { in: config.domains } },
    orderBy: { confidence: 'desc' },
    select: { id: true, domain: true, topic: true, key: true, content: true },
  });

  console.log(`  Found: ${fragments.length} fragments`);

  // Batch into chunks of 50 fragments, concatenated as markdown
  const BATCH_SIZE = 50;
  let batches = 0;

  for (let i = 0; i < fragments.length; i += BATCH_SIZE) {
    const batch = fragments.slice(i, i + BATCH_SIZE);
    const markdown = batch.map(f =>
      `## [${f.domain}/${f.topic}] ${f.key}\n\n${f.content.substring(0, 2000)}`
    ).join('\n\n---\n\n');

    const title = `${lensName}-batch-${Math.floor(i / BATCH_SIZE + 1)} (${batch.length} fragments)`;

    try {
      const res = await fetch(`${NOTEBOOK_URL}/api/sources/json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'text',
          title,
          content: markdown,
          notebooks: [config.notebookId],
          embed: true,
        }),
      });
      const data = await res.json();
      if (data.id) batches++;
    } catch (err: any) {
      console.error(`  Error on batch ${Math.floor(i / BATCH_SIZE + 1)}: ${err.message}`);
    }
  }

  console.log(`  Synced: ${batches} batches → ${config.notebookId}`);
}

async function main() {
  const args = process.argv.slice(2);
  const lensArg = args.indexOf('--lens');
  const lens = lensArg >= 0 ? args[lensArg + 1] : 'all';

  if (lens === 'all') {
    for (const name of Object.keys(LENS_CONFIG)) {
      await syncLens(name);
    }
  } else {
    await syncLens(lens);
  }

  console.log('\n✓ Sync complete');
  await prisma.$disconnect();
}

main().catch(e => { console.error(e.message); process.exit(1); });
