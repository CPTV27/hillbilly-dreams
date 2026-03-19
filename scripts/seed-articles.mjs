#!/usr/bin/env node
// scripts/seed-articles.mjs
// Seeds the Article table with the 18 hardcoded city guide articles from lib/articles.ts
// Usage: node scripts/seed-articles.mjs
// Requires DATABASE_URL in environment (or .env.local in apps/web/)

import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const prisma = new PrismaClient();

// Manually define the articles to avoid TypeScript import issues
// This extracts from the TS source at build time
async function main() {
  console.log('Seeding articles...\n');

  // Read the raw TS file and extract article data
  const articlesPath = join(__dirname, '../apps/web/lib/articles.ts');
  const source = readFileSync(articlesPath, 'utf-8');

  // Extract each article object from the array
  // We'll use a different approach: import the data via a dynamic strategy
  // Since the file is TS, we parse the key fields we need

  // Actually, let's just define the 18 articles inline from the known data
  // This avoids TS parsing complexity and is a one-time seed

  const articles = [
    { slug: 'memphis-after-midnight-the-river-city-that-invented-the-sound', city: 'memphis', title: 'Memphis After Midnight: The River City That Invented the Sound' },
    { slug: 'clarksdale-at-midnight-where-the-blues-were-born', city: 'clarksdale', title: 'Clarksdale at Midnight: Where the Blues Were Born' },
    { slug: 'vicksburg-the-bluff-city-that-held-the-river', city: 'vicksburg', title: 'Vicksburg: The Bluff City That Held the River' },
    { slug: 'natchez-the-town-that-time-kept', city: 'natchez', title: 'Natchez: The Town That Time Kept' },
    { slug: 'new-orleans-the-city-that-plays-for-keeps', city: 'new-orleans', title: 'New Orleans: The City That Plays for Keeps' },
    { slug: 'st-francisville-the-town-beneath-the-oaks', city: 'st-francisville', title: 'St. Francisville: The Town Beneath the Oaks' },
    { slug: 'baton-rouge-capital-city-with-a-backbeat', city: 'baton-rouge', title: 'Baton Rouge: Capital City with a Backbeat' },
    { slug: 'lafayette-the-heart-of-cajun-country', city: 'lafayette', title: 'Lafayette: The Heart of Cajun Country' },
    { slug: 'alexandria-the-crossroads-of-louisiana', city: 'alexandria', title: 'Alexandria: The Crossroads of Louisiana' },
    { slug: 'monroe-the-twin-cities-on-the-ouachita', city: 'monroe', title: 'Monroe: The Twin Cities on the Ouachita' },
    { slug: 'ruston-the-college-town-that-punches-up', city: 'ruston', title: 'Ruston: The College Town That Punches Up' },
    { slug: 'natchitoches-the-oldest-settlement-in-louisiana', city: 'natchitoches', title: 'Natchitoches: The Oldest Settlement in Louisiana' },
    { slug: 'shreveport-the-city-that-refuses-to-quit', city: 'shreveport', title: 'Shreveport: The City That Refuses to Quit' },
    { slug: 'el-dorado-the-boom-town-that-stayed', city: 'el-dorado', title: 'El Dorado: The Boom Town That Stayed' },
    { slug: 'little-rock-the-capital-with-grit', city: 'little-rock', title: 'Little Rock: The Capital with Grit' },
    { slug: 'fayetteville-the-ozark-incubator', city: 'fayetteville', title: 'Fayetteville: The Ozark Incubator' },
    { slug: 'bentonville-the-town-walmart-built-and-art-reclaimed', city: 'bentonville', title: 'Bentonville: The Town Walmart Built and Art Reclaimed' },
    { slug: 'branson-the-show-town-in-the-hills', city: 'branson', title: 'Branson: The Show Town in the Hills' },
  ];

  // Now read each article's full data from the TS source
  // We'll use the API approach instead — seed via the REST API
  // This way we get proper validation and don't need to parse TS

  // Actually, let's use Prisma directly with the data we know
  let created = 0;
  let skipped = 0;

  for (const article of articles) {
    // Check if already exists
    const existing = await prisma.article.findFirst({
      where: { slug: article.slug },
    });

    if (existing) {
      console.log(`  SKIP  ${article.title} (already exists)`);
      skipped++;
      continue;
    }

    // We need the full body content — read it from the source
    // Extract the body for this article from the TS source
    const slugIndex = source.indexOf(`slug: '${article.slug}'`);

    if (slugIndex === -1) {
      console.log(`  WARN  Could not find ${article.slug} in source`);
      continue;
    }

    // Find the excerpt
    const excerptMatch = source.substring(slugIndex).match(/excerpt:\s*\n?\s*'([^']+)'/s);
    const excerpt = excerptMatch
      ? excerptMatch[1].replace(/\\'/g, "'")
      : '';

    // Find heroImage
    const heroMatch = source.substring(slugIndex).match(/heroImage:\s*'([^']+)'/);
    const heroImage = heroMatch ? heroMatch[1] : null;

    // Find body — it's in a template literal
    const bodyStart = source.indexOf('body: `', slugIndex);
    if (bodyStart === -1) {
      console.log(`  WARN  No body found for ${article.slug}`);
      continue;
    }
    const bodyContentStart = bodyStart + 7; // after 'body: `'
    const bodyEnd = source.indexOf('`,\n', bodyContentStart);
    const body = bodyEnd !== -1
      ? source.substring(bodyContentStart, bodyEnd)
      : '';

    // Find readTime
    const readTimeMatch = source.substring(slugIndex).match(/readTime:\s*'([^']+)'/);
    const readTime = readTimeMatch ? readTimeMatch[1] : '5 min read';

    // Find publishedAt
    const pubMatch = source.substring(slugIndex).match(/publishedAt:\s*new Date\('([^']+)'\)/);
    const publishedAt = pubMatch ? new Date(pubMatch[1]) : new Date('2026-02-01');

    await prisma.article.create({
      data: {
        title: article.title,
        slug: article.slug,
        category: 'city-guide',
        city: article.city,
        author: 'Big Muddy Magazine',
        status: 'published',
        excerpt,
        body,
        heroImage,
        readTime,
        publishedAt,
      },
    });

    console.log(`  OK    ${article.title}`);
    created++;
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
