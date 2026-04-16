/**
 * Article migration v2: imports lib/articles.ts content into Sanity properly.
 *
 * Improvements over v1:
 * - Uses createOrReplace with deterministic IDs (safe to re-run, no duplicates)
 * - Migrates FULL body (no 500 char truncation)
 * - Splits body into paragraph blocks (preserves structure)
 * - Detects markdown headings (# ## ###) and converts to h1/h2/h3 blocks
 * - Skips if Sanity already has an article with the same slug from a different source
 *
 * Usage (from repo root with apps/web/.env.local loaded):
 *   cd apps/web && && set -a && source .env.local && set +a && npx tsx ../../scripts/migrate-articles-v2.ts
 */

import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load env from apps/web/.env.local
config({ path: resolve(process.cwd(), '.env.local') });

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;

if (!SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_API_TOKEN');
  console.error(`Got PROJECT_ID: ${SANITY_PROJECT_ID ? '***set***' : 'MISSING'}`);
  console.error(`Got API_TOKEN: ${SANITY_API_TOKEN ? '***set***' : 'MISSING'}`);
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: SANITY_API_TOKEN,
});

// Import articles from the static file (use require for CJS compat)
import { CITY_GUIDE_ARTICLES } from '../apps/web/lib/articles';
const articles = CITY_GUIDE_ARTICLES;

function bodyToBlocks(body: string, articleId: number) {
  if (!body) return [];
  // Split on double-newline (paragraphs)
  const paragraphs = body.split(/\n\n+/).filter((p) => p.trim().length > 0);

  return paragraphs.map((para, i) => {
    const trimmed = para.trim();
    let style = 'normal';
    let text = trimmed;

    // Markdown heading detection
    if (trimmed.startsWith('### ')) {
      style = 'h3';
      text = trimmed.slice(4);
    } else if (trimmed.startsWith('## ')) {
      style = 'h2';
      text = trimmed.slice(3);
    } else if (trimmed.startsWith('# ')) {
      style = 'h2'; // Title is already h1, demote # to h2
      text = trimmed.slice(2);
    }

    return {
      _type: 'block',
      _key: `article-${articleId}-block-${i}`,
      style,
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: `article-${articleId}-span-${i}`,
          text,
          marks: [],
        },
      ],
    };
  });
}

async function migrate() {
  console.log(`Source: ${articles.length} articles in lib/articles.ts`);
  console.log(`Target: ${SANITY_PROJECT_ID}/${SANITY_DATASET}`);
  console.log('');

  // Check what's already in Sanity
  const existing = await client.fetch<Array<{ _id: string; slug: { current: string } }>>(
    '*[_type == "article"]{ _id, slug }'
  );
  const existingSlugs = new Set(existing.map((a) => a.slug?.current).filter(Boolean));
  console.log(`Existing in Sanity: ${existing.length} articles (${existingSlugs.size} with slugs)`);
  console.log('');

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const article of articles) {
    // Use deterministic ID so re-runs replace cleanly
    const docId = `imported-${article.slug}`;

    if (existingSlugs.has(article.slug)) {
      // Already in Sanity from a different source — don't overwrite manual edits
      console.log(`  - SKIP (exists by slug): ${article.title.slice(0, 60)}`);
      skipped++;
      continue;
    }

    const doc = {
      _id: docId,
      _type: 'article',
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      author: article.author || 'Big Muddy Magazine',
      category: article.category || 'city-guide',
      city: article.city,
      publishedAt: article.publishedAt,
      excerpt: article.excerpt,
      readTime: article.readTime,
      heroImageUrl: article.heroImage, // GCS URL
      body: bodyToBlocks(article.body || '', article.id),
    };

    try {
      const result = await client.createOrReplace(doc);
      const isNew = !existing.find((e) => e._id === docId);
      if (isNew) {
        console.log(`  + CREATE: ${article.title.slice(0, 60)}`);
        created++;
      } else {
        console.log(`  ~ UPDATE: ${article.title.slice(0, 60)}`);
        updated++;
      }
    } catch (err: any) {
      console.error(`  x FAIL: ${article.title}`);
      console.error(`    ${err.message || err}`);
    }
  }

  console.log('');
  console.log('=== Summary ===');
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Total in source: ${articles.length}`);

  // Final count
  const final = await client.fetch<number>('count(*[_type == "article"])');
  console.log(`  Total in Sanity now: ${final}`);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
