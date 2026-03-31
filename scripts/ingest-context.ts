#!/usr/bin/env npx tsx
/**
 * ingest-context.ts — Migrate all markdown knowledge into AgentContext database
 *
 * Reads every relevant .md file, tags it with domain/topic, chunks it,
 * and writes to the AgentContext table. Run once, then agents use the API.
 *
 * Usage: DATABASE_URL="..." npx tsx scripts/ingest-context.ts
 */

import { PrismaClient } from '../packages/database/node_modules/@prisma/client';
import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, basename, relative } from 'path';

const prisma = new PrismaClient();

// ── Source mapping: file patterns → domain + topic ──

interface SourceMapping {
  glob: string; // directory to scan
  domain: string;
  topicFromFile: (filename: string) => string;
  keyPrefix: string;
}

const SOURCES: SourceMapping[] = [
  // Tax database — finance, entities, pipeline
  {
    glob: process.env.HOME + '/tax-db',
    domain: 'finance',
    topicFromFile: (f) => f.replace(/\.md$/, '').toLowerCase().replace(/_/g, '-'),
    keyPrefix: 'tax-db',
  },
  // NOTE: docs/strategy, docs/google-ecosystem, docs/research archived to Google Drive 2026-03-30
  // Core docs
  {
    glob: 'docs',
    domain: 'product',
    topicFromFile: (f) => {
      const name = f.replace(/\.md$/, '').toLowerCase();
      if (name.includes('brand') || name.includes('design')) return 'brand';
      if (name.includes('narrative') || name.includes('copy')) return 'narrative';
      if (name.includes('directory') || name.includes('dsd')) return 'directory';
      if (name.includes('wedding')) return 'weddings';
      if (name.includes('seo')) return 'seo';
      if (name.includes('feature') || name.includes('product') || name.includes('capability')) return 'product';
      if (name.includes('route') || name.includes('monorepo') || name.includes('env')) return 'tech';
      if (name.includes('jp') || name.includes('entertainment')) return 'entertainment';
      if (name.includes('economics') || name.includes('outsider')) return 'economics';
      if (name.includes('photo') || name.includes('shot') || name.includes('media')) return 'media';
      if (name.includes('social')) return 'social';
      if (name.includes('handoff')) return 'handoff';
      return 'general';
    },
    keyPrefix: 'docs',
  },
  // Agent files
  {
    glob: '.claude/agents',
    domain: 'operations',
    topicFromFile: (f) => {
      const name = f.replace(/\.md$/, '').toLowerCase();
      if (name.includes('handoff')) return 'handoff';
      if (name.includes('comms') || name.includes('gchat')) return 'communications';
      if (name.includes('brand') || name.includes('design')) return 'brand';
      if (name.includes('data') || name.includes('ledger')) return 'data';
      if (name.includes('context') || name.includes('infra')) return 'infrastructure';
      if (name.includes('photo')) return 'media';
      if (name.includes('test') || name.includes('huck')) return 'tech';
      return 'agent-ops';
    },
    keyPrefix: 'agents',
  },
  // Memory files
  {
    glob: '.claude/projects/-Users-chasethis-hillbilly-dreams/memory',
    domain: 'memory',
    topicFromFile: (f) => {
      const name = f.replace(/\.md$/, '').toLowerCase();
      if (name.startsWith('feedback_')) return 'feedback';
      if (name.startsWith('project_')) return 'project';
      if (name.startsWith('user_')) return 'user';
      if (name.startsWith('agent_')) return 'agent-handoff';
      return 'reference';
    },
    keyPrefix: 'memory',
  },
  // Content docs
  {
    glob: 'docs/content',
    domain: 'brand',
    topicFromFile: (f) => 'content',
    keyPrefix: 'content',
  },
  // NOTE: docs/handoffs archived to Google Drive 2026-03-30
];

// ── Chunk a document into segments ──

function chunkDocument(content: string, maxChunkSize: number = 2000): string[] {
  // Split by headers first
  const sections = content.split(/\n(?=#{1,3}\s)/);

  const chunks: string[] = [];
  let currentChunk = '';

  for (const section of sections) {
    if (currentChunk.length + section.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = section;
    } else {
      currentChunk += (currentChunk ? '\n' : '') + section;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.length > 0 ? chunks : [content];
}

// ── Main ingestion ──

async function ingest() {
  let totalIngested = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  const repoRoot = process.cwd();

  for (const source of SOURCES) {
    const dir = source.glob.startsWith('/') ? source.glob : join(repoRoot, source.glob);

    if (!existsSync(dir)) {
      console.log(`  Skipping ${source.glob} — directory not found`);
      continue;
    }

    // Only read .md files in the immediate directory (not recursive for most)
    const files = readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('.'));

    console.log(`\n── ${source.glob} (${files.length} files) ──`);

    for (const file of files) {
      const filePath = join(dir, file);

      // Skip directories
      if (statSync(filePath).isDirectory()) continue;

      try {
        const content = readFileSync(filePath, 'utf-8');

        // Skip empty files or very short files
        if (content.trim().length < 50) {
          totalSkipped++;
          continue;
        }

        const topic = source.topicFromFile(file);
        const key = `${source.keyPrefix}.${file.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9-]/g, '-')}`;
        const relativePath = source.glob.startsWith('/') ? filePath : relative(repoRoot, filePath);

        // Chunk the document
        const chunks = chunkDocument(content);

        for (let i = 0; i < chunks.length; i++) {
          const chunkKey = chunks.length === 1 ? key : `${key}.chunk-${i}`;

          await prisma.agentContext.upsert({
            where: { domain_key: { domain: source.domain, key: chunkKey } },
            create: {
              domain: source.domain,
              topic,
              key: chunkKey,
              content: chunks[i],
              source: relativePath,
              confidence: 1.0,
              agentAuthor: 'ingest-script',
            },
            update: {
              topic,
              content: chunks[i],
              source: relativePath,
              confidence: 1.0,
            },
          });

          totalIngested++;
        }

        console.log(`  ✓ ${file} (${chunks.length} chunk${chunks.length > 1 ? 's' : ''})`);
      } catch (err: any) {
        console.error(`  ✗ ${file}: ${err.message}`);
        totalErrors++;
      }
    }
  }

  console.log(`\n════════════════════════════════════════`);
  console.log(`Ingestion complete:`);
  console.log(`  Ingested: ${totalIngested} context fragments`);
  console.log(`  Skipped:  ${totalSkipped} (empty/short)`);
  console.log(`  Errors:   ${totalErrors}`);
  console.log(`════════════════════════════════════════\n`);

  // Summary by domain
  const domains = await prisma.agentContext.groupBy({
    by: ['domain'],
    _count: { id: true },
  });

  console.log('Context by domain:');
  for (const d of domains) {
    console.log(`  ${d.domain.padEnd(15)} ${d._count.id} fragments`);
  }

  await prisma.$disconnect();
}

ingest().catch((err) => {
  console.error('Ingestion failed:', err);
  process.exit(1);
});
