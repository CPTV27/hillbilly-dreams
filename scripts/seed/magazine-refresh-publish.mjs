#!/usr/bin/env node
// scripts/seed/magazine-refresh-publish.mjs
//
// Reads every JSON output from docs/magazine-refresh-2026-04-19/, parses
// the article payload, picks a hero photo from the GCS library that matches
// the article's photoPool, and upserts the article into Sanity as a
// published doc.
//
// Usage:
//   node scripts/seed/magazine-refresh-publish.mjs --dry-run
//   node scripts/seed/magazine-refresh-publish.mjs

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
const OUTPUT_DIR = path.join(REPO_ROOT, 'docs/magazine-refresh-2026-04-19');

if (!PROJECT_ID) {
  console.error('ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID not set');
  process.exit(1);
}
if (!DRY_RUN && !TOKEN) {
  console.error('ERROR: SANITY_WRITE_TOKEN not set');
  process.exit(1);
}

const PHOTO_LIBRARY_URL = 'https://bigmuddytouring.com/api/photo-library';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Strip markdown fences + the gemini-batch HTML comment header, parse JSON.
 */
function parseArticleFile(content) {
  // Strip <!-- ... --> comment block
  let s = content.replace(/<!--[\s\S]*?-->/g, '').trim();
  // Strip ```json ... ``` fences (or just ```)
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
  return JSON.parse(s);
}

/**
 * Convert a Gemini-output article payload into Sanity's Portable Text body.
 * Returns an array of block/object entries for the article's `body` field.
 */
function toPortableText(article) {
  const out = [];

  // Lede as a normal paragraph (or first H2 if missing)
  if (article.lede) {
    out.push(makeBlock('normal', article.lede));
  }

  // Sections — heading + paragraphs
  for (const section of article.sections ?? []) {
    if (section.heading && section.heading.trim()) {
      out.push(makeBlock('h2', section.heading));
    }
    for (const para of section.paragraphs ?? []) {
      if (para && para.trim()) {
        out.push(makeBlock('normal', para));
      }
    }
  }

  // Pull quote (interleaved roughly mid-piece)
  if (article.pullQuote?.text) {
    const pq = {
      _type: 'pullQuote',
      _key: randKey(),
      text: article.pullQuote.text,
      attribution: article.pullQuote.attribution ?? '',
    };
    // Insert after ~1/3 of the body
    const insertAt = Math.max(1, Math.floor(out.length / 3));
    out.splice(insertAt, 0, pq);
  }

  return out;
}

function makeBlock(style, text) {
  return {
    _type: 'block',
    _key: randKey(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: randKey(), text, marks: [] }],
  };
}

function randKey() {
  return Math.random().toString(36).slice(2, 14);
}

/**
 * Pick a hero photo from the GCS library. Strategy:
 *  - If photoPool matches a real shoot, pick a random photo from it
 *  - Else null (Tracy will swap one in via Studio)
 */
function pickHeroPhoto(article, photoLibrary) {
  if (!article.photoPool) return null;
  const candidates = photoLibrary.photos.filter(
    (p) => p.shoot === article.photoPool
  );
  if (candidates.length === 0) {
    console.warn(`  [warn] no photos in shoot "${article.photoPool}"`);
    return null;
  }
  // Deterministic pick by slug hash so re-runs are stable
  const idx =
    Math.abs(
      Array.from(article.slug).reduce((a, c) => a + c.charCodeAt(0), 0)
    ) % candidates.length;
  return candidates[idx];
}

// ─── Sanity helpers ──────────────────────────────────────────────────────────

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
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity ${res.status}: ${text}`);
  }
  return res.json();
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n=== Magazine Refresh — Publish to Sanity ===`);
  console.log(`Project: ${PROJECT_ID}`);
  console.log(`Dataset: ${DATASET}`);
  console.log(`Mode:    ${DRY_RUN ? 'DRY RUN' : 'WRITING'}\n`);

  // Pull the photo library once
  console.log('Fetching photo library...');
  const photoLibRes = await fetch(PHOTO_LIBRARY_URL, {
    signal: AbortSignal.timeout(15_000),
  });
  const photoLibrary = await photoLibRes.json();
  console.log(`  → ${photoLibrary.photos.length} photos available\n`);

  // Read every JSON output
  const files = (await fs.readdir(OUTPUT_DIR))
    .filter((f) => f.endsWith('.json'))
    .sort();
  console.log(`Found ${files.length} article outputs:\n`);

  let ok = 0;
  let fail = 0;
  for (const file of files) {
    const slug = file.replace(/\.json$/, '');
    process.stdout.write(`  ${slug} ... `);
    try {
      const raw = await fs.readFile(path.join(OUTPUT_DIR, file), 'utf-8');
      const article = parseArticleFile(raw);
      const hero = pickHeroPhoto(article, photoLibrary);
      const docId = `magazine-refresh-2026-04-${article.slug}`;
      const doc = {
        _id: docId,
        _type: 'article',
        title: article.title,
        slug: { _type: 'slug', current: article.slug },
        author: article.author ?? 'Tracy Alderson-Allen',
        category: article.category,
        city: article.city,
        publishedAt: new Date().toISOString(),
        excerpt: article.excerpt,
        readTime: article.readTime,
        heroImageUrl: hero ? hero.urls.orig : undefined,
        body: toPortableText(article),
      };
      // Strip undefined fields so Sanity doesn't choke
      Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k]);

      if (DRY_RUN) {
        console.log(
          `would upsert (${doc.body.length} blocks${hero ? `, hero=${hero.hash}` : ', no hero'})`
        );
        ok++;
        continue;
      }
      const txn = await sanityMutate([{ createOrReplace: doc }]);
      console.log(
        `✓ (${txn.transactionId.slice(0, 8)}${hero ? `, hero=${hero.hash.slice(0, 8)}` : ', no hero'})`
      );
      ok++;
    } catch (err) {
      console.log(`✗ ${err.message}`);
      fail++;
    }
  }

  console.log(`\nDone — ${ok} succeeded, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
