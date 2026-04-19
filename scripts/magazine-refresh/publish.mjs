#!/usr/bin/env node
// scripts/magazine-refresh/publish.mjs
//
// Reads docs/magazine-refresh-2026-04-19/*.json (Gemini outputs wrapped in
// ```json fences), converts each to a Sanity `article` document, picks a
// hero image from the GCS photo library based on the article's photoPool,
// and upserts to Sanity.
//
// Usage:
//   node scripts/magazine-refresh/publish.mjs --dry-run
//   node scripts/magazine-refresh/publish.mjs

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

if (!PROJECT_ID) {
  console.error('ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID not set');
  process.exit(1);
}
if (!DRY_RUN && !TOKEN) {
  console.error('ERROR: SANITY_WRITE_TOKEN not set (required unless --dry-run)');
  process.exit(1);
}

const INPUT_DIR = path.join(REPO_ROOT, 'docs/magazine-refresh-2026-04-19');

// ─── Strip markdown wrapper from Gemini output ──────────────────────────────
// Gemini sometimes wraps in ```json fences, sometimes returns bare JSON.
// Either way the file has an HTML comment header from gemini-batch.mjs that
// must be stripped before JSON.parse.
function extractJson(rawFileContent) {
  const fenceMatch = rawFileContent.match(/```json\s*([\s\S]*?)```/);
  if (fenceMatch) return JSON.parse(fenceMatch[1].trim());
  // Strip the leading <!-- ... --> comment block if present, then parse rest.
  const stripped = rawFileContent.replace(/^<!--[\s\S]*?-->\s*/, '').trim();
  return JSON.parse(stripped);
}

// ─── Hero image picker ───────────────────────────────────────────────────────
async function loadPhotoIndex() {
  const url = 'https://bigmuddytouring.com/api/photo-library';
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`Photo library fetch failed: ${res.status}`);
  const json = await res.json();
  return json.photos ?? [];
}

function pickHeroPhoto(photos, photoPool, slug) {
  if (!photoPool) return null;
  const candidates = photos.filter((p) => p.shoot === photoPool);
  if (candidates.length === 0) return null;
  // Stable pick: hash slug to index so the same article always gets the same hero
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return candidates[h % candidates.length];
}

// ─── Convert article JSON → Sanity Portable Text body ───────────────────────
function makeKey(seed) {
  return `k${Math.random().toString(36).slice(2, 10)}${seed}`;
}

function paragraphBlock(text) {
  return {
    _type: 'block',
    _key: makeKey(0),
    style: 'normal',
    children: [{ _type: 'span', _key: makeKey(1), text, marks: [] }],
    markDefs: [],
  };
}

function headingBlock(text, level = 'h2') {
  return {
    _type: 'block',
    _key: makeKey(2),
    style: level,
    children: [{ _type: 'span', _key: makeKey(3), text, marks: [] }],
    markDefs: [],
  };
}

function pullQuoteBlock(text, attribution) {
  return {
    _type: 'pullQuote',
    _key: makeKey(4),
    text,
    attribution: attribution ?? '',
  };
}

function articleToBody(article) {
  const blocks = [];
  if (article.lede) blocks.push(paragraphBlock(article.lede));

  for (const section of article.sections ?? []) {
    if (section.heading) blocks.push(headingBlock(section.heading, 'h2'));
    for (const para of section.paragraphs ?? []) {
      if (para && para.trim()) blocks.push(paragraphBlock(para));
    }
  }

  // Pull quote roughly two-thirds of the way through, if there is one
  if (article.pullQuote?.text) {
    const insertAt = Math.max(2, Math.floor(blocks.length * 0.66));
    blocks.splice(insertAt, 0, pullQuoteBlock(article.pullQuote.text, article.pullQuote.attribution));
  }

  return blocks;
}

// ─── Build Sanity doc ────────────────────────────────────────────────────────
function buildArticleDoc(article, hero, sourceFile) {
  const _id = `article.refresh-2026-04-19.${article.slug}`;
  const doc = {
    _id,
    _type: 'article',
    title: article.title,
    slug: { _type: 'slug', current: article.slug },
    author: article.author ?? 'Tracy Alderson-Allen',
    category: article.category ?? 'feature',
    city: article.city ?? 'natchez',
    publishedAt: new Date().toISOString(),
    excerpt: article.excerpt ?? '',
    readTime: article.readTime ?? '',
    body: articleToBody(article),
  };

  if (hero?.urls?.orig) {
    // Use the legacy heroImageUrl field for GCS-hosted photos so we don't
    // have to round-trip the asset through cdn.sanity.io. The article page
    // checks heroImageUrl as a fallback when the heroImage asset is null.
    doc.heroImageUrl = hero.urls.orig;
  }

  return doc;
}

// ─── Sanity mutate ───────────────────────────────────────────────────────────
async function mutate(docs) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;
  const mutations = docs.map((doc) => ({ createOrReplace: doc }));
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations }),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`Sanity mutate ${res.status}: ${await res.text()}`);
  return res.json();
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n=== Magazine refresh publish ===`);
  console.log(`Project: ${PROJECT_ID}  Dataset: ${DATASET}  Mode: ${DRY_RUN ? 'DRY RUN' : 'WRITING'}\n`);

  const files = (await fs.readdir(INPUT_DIR))
    .filter((f) => f.endsWith('.json'))
    .sort();

  console.log(`Loading photo library...`);
  const photos = await loadPhotoIndex();
  console.log(`  ${photos.length} photos available\n`);

  const docs = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(INPUT_DIR, file), 'utf8');
    let article;
    try {
      article = extractJson(raw);
    } catch (e) {
      console.log(`  ${file} ✗ JSON parse: ${e.message}`);
      continue;
    }
    const hero = pickHeroPhoto(photos, article.photoPool, article.slug);
    const doc = buildArticleDoc(article, hero, file);
    const heroNote = hero ? `→ ${hero.urls.orig.split('/').pop()}` : '(no photo — awaiting shoot)';
    console.log(`  ${file}  →  "${article.title}"  ${heroNote}`);
    docs.push(doc);
  }

  if (DRY_RUN) {
    console.log(`\nDry run — ${docs.length} docs would be upserted.`);
    return;
  }

  console.log(`\nUpserting ${docs.length} articles...`);
  const result = await mutate(docs);
  console.log(`✓ Transaction ${result.transactionId} — ${result.results.length} ops`);
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
