/**
 * One-off migration script: moves 18 articles from lib/articles.ts to Sanity.
 *
 * Usage:
 *   SANITY_PROJECT_ID=xxx SANITY_API_TOKEN=xxx npx tsx scripts/migrate-articles.ts
 *
 * Prerequisites:
 *   - Sanity project created at sanity.io
 *   - SANITY_API_TOKEN with write access
 *   - npm install @sanity/client (already in deps)
 *
 * This script keeps GCS hero image URLs in a `heroImageUrl` string field.
 * For new articles, use the Sanity `heroImage` (image type) field instead.
 */

import { createClient } from '@sanity/client';

// Import the hardcoded articles
// Note: Run from repo root so this path resolves
const articlesModule = await import('../apps/web/lib/articles.js');
const articles = articlesModule.CITY_GUIDE_ARTICLES;

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

async function migrate() {
  console.log(`Migrating ${articles.length} articles to Sanity...`);

  for (const article of articles) {
    const doc = {
      _type: 'article',
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      author: article.author || 'Big Muddy Magazine',
      category: article.category || 'city-guide',
      city: article.city,
      publishedAt: article.publishedAt,
      excerpt: article.excerpt,
      readTime: article.readTime,
      heroImageUrl: article.heroImage, // Keep GCS URL in string field
      // Body as a simple portable text block (plain paragraph)
      // For rich content, re-edit in Sanity Studio after migration
      body: article.body
        ? [
            {
              _type: 'block',
              _key: `body-${article.id}`,
              style: 'normal',
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  _key: `span-${article.id}`,
                  text: article.body.slice(0, 500) + (article.body.length > 500 ? '...' : ''),
                  marks: [],
                },
              ],
            },
          ]
        : [],
    };

    try {
      const result = await client.create(doc);
      console.log(`  ✓ Created: ${article.title} (${result._id})`);
    } catch (err) {
      console.error(`  ✗ Failed: ${article.title}`, err);
    }
  }

  console.log('Migration complete.');
}

migrate().catch(console.error);
