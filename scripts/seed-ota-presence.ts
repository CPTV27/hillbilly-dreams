#!/usr/bin/env npx tsx
// scripts/seed-ota-presence.ts
// Seeds SocialAccount records for The Big Muddy Inn's OTA & directory presence.
// Usage: npx tsx scripts/seed-ota-presence.ts
// Requires DATABASE_URL in environment (or .env in packages/database/)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
// OTA & directory presence data
// ─────────────────────────────────────────────────────────────

interface OTAEntry {
  platform: string;
  handle: string;
  brand: string;
  status: string;
  notes: string;
}

const OTA_PRESENCE: OTAEntry[] = [
  // Social Media
  { platform: 'facebook', handle: 'thebigmuddyinnandbluesroom', brand: 'bigmuddy', status: 'active', notes: 'Facebook page — active' },
  { platform: 'instagram', handle: '@thebigmuddyinnandbluesroom', brand: 'bigmuddy', status: 'active', notes: 'Instagram — active' },

  // OTAs — Confirmed Live
  { platform: 'tripadvisor', handle: 'Hotel_Review-g60910-d33023418', brand: 'bigmuddy', status: 'active', notes: 'TripAdvisor listing — live, needs reviews. URL: tripadvisor.com/Hotel_Review-g60910-d33023418' },
  { platform: 'airbnb', handle: 'big-muddy-inn-natchez', brand: 'bigmuddy', status: 'active', notes: 'Airbnb — 3 of 6 suites listed (JLH, RJ, MW). MISSING: British Invasion I, II, BB King. Room IDs: 1217401032143320599, 1217402284158626264, 1217403357655189259' },
  { platform: 'yelp', handle: 'the-big-muddy-inn-and-blues-room-natchez', brand: 'bigmuddy', status: 'active', notes: 'Yelp listing — updated Feb 2026. URL: yelp.com/biz/the-big-muddy-inn-and-blues-room-natchez' },

  // OTAs — Not Found / Pending
  { platform: 'booking', handle: 'pending', brand: 'bigmuddy', status: 'disconnected', notes: 'Booking.com — NOT FOUND in search. Chase says signed up — may be pending approval or not indexed yet.' },
  { platform: 'expedia', handle: 'pending', brand: 'bigmuddy', status: 'disconnected', notes: 'Expedia — NOT FOUND in search. May be pending approval or not indexed yet.' },
  { platform: 'vrbo', handle: 'pending', brand: 'bigmuddy', status: 'disconnected', notes: 'VRBO — NOT FOUND in search. May be pending approval or not indexed yet.' },

  // Directories
  { platform: 'google', handle: 'tracy@thebigmuddyinn.com', brand: 'bigmuddy', status: 'active', notes: 'Google Business Profile — claimed. Place ID needs verification. Needs: business hours, more photos, posts.' },
  { platform: 'visitnatchez', handle: 'big-muddy-inn-blues-room', brand: 'bigmuddy', status: 'active', notes: 'Visit Natchez directory — listed. URL: visitnatchez.org/listing/big-muddy-inn-blues-room/' },
  { platform: 'natchezpilgrimage', handle: 'bubbles-bites-and-blues', brand: 'bigmuddy', status: 'active', notes: 'Natchez Pilgrimage Tours — listed for Bubbles Bites & Blues excursion' },
  { platform: 'hotelsabovepar', handle: 'big-muddy-inn-blues-room-natchez-review', brand: 'bigmuddy', status: 'active', notes: 'Hotels Above Par — positive review published' },
  { platform: 'wanderlog', handle: 'the-big-muddy-inn', brand: 'bigmuddy', status: 'active', notes: 'Wanderlog listing — auto-generated from other sources' },
];

const INN_CLIENT_SLUG = 'the-big-muddy-inn';

// ─────────────────────────────────────────────────────────────
// Main seed function
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log('🌐 Seeding OTA & directory presence for The Big Muddy Inn...\n');

  // Ensure the Client record exists (matches seed-natchez-businesses.ts slug)
  const client = await prisma.client.upsert({
    where: { slug: INN_CLIENT_SLUG },
    update: {},
    create: {
      name: 'The Big Muddy Inn',
      slug: INN_CLIENT_SLUG,
      tier: 'blues-room',
      businessType: 'hotel',
      city: 'Natchez',
      state: 'MS',
      website: 'https://www.thebigmuddyinn.com',
      description:
        'Our boutique inn and creative headquarters in Natchez. Part guesthouse, part blues room, part media studio — where the river meets the road and the music never really stops.',
      contactName: 'Tracy Allen',
      status: 'active',
      platforms: [],
      notes: 'Created by seed-ota-presence.ts',
    },
  });

  console.log(`  Client: ${client.name} (id: ${client.id})\n`);

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const entry of OTA_PRESENCE) {
    try {
      const result = await prisma.socialAccount.upsert({
        where: {
          platform_handle: {
            platform: entry.platform,
            handle: entry.handle,
          },
        },
        update: {
          brand: entry.brand,
          status: entry.status,
          notes: entry.notes,
          clientId: client.id,
        },
        create: {
          platform: entry.platform,
          handle: entry.handle,
          brand: entry.brand,
          status: entry.status,
          notes: entry.notes,
          clientId: client.id,
        },
      });

      const isNew =
        result.createdAt.getTime() === result.updatedAt.getTime() ||
        Date.now() - result.createdAt.getTime() < 5000;

      if (isNew) {
        console.log(`  CREATE  [${entry.platform}] ${entry.handle}`);
        created++;
      } else {
        console.log(`  UPDATE  [${entry.platform}] ${entry.handle}`);
        updated++;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  FAIL    [${entry.platform}] ${entry.handle}: ${message}`);
      failed++;
    }
  }

  // ── Summary ──────────────────────────────────────────────
  console.log('\n────────────────────────────────────────────');
  console.log(`  Total:   ${OTA_PRESENCE.length}`);
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  if (failed > 0) console.log(`  Failed:  ${failed}`);
  console.log('────────────────────────────────────────────');

  // Print breakdown by status
  const byStatus = OTA_PRESENCE.reduce(
    (acc, e) => {
      acc[e.status] = (acc[e.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  console.log('\n  By status:');
  for (const [status, count] of Object.entries(byStatus).sort()) {
    console.log(`    ${status.padEnd(16)} ${count}`);
  }

  // Print breakdown by category
  const categories: Record<string, string[]> = {
    'Social Media': ['facebook', 'instagram'],
    'OTAs (Live)': ['tripadvisor', 'airbnb', 'yelp'],
    'OTAs (Pending)': ['booking', 'expedia', 'vrbo'],
    'Directories': ['google', 'visitnatchez', 'natchezpilgrimage', 'hotelsabovepar', 'wanderlog'],
  };
  console.log('\n  By category:');
  for (const [category, platforms] of Object.entries(categories)) {
    const count = OTA_PRESENCE.filter((e) => platforms.includes(e.platform)).length;
    console.log(`    ${category.padEnd(20)} ${count}`);
  }

  console.log('\nDone.\n');
}

main()
  .catch((err) => {
    if (
      err &&
      typeof err === 'object' &&
      'code' in err &&
      (err as { code: string }).code === 'P1001'
    ) {
      console.error(
        '\n❌ Could not connect to the database. Check that DATABASE_URL is set and the server is running.\n',
      );
    } else {
      console.error('\n❌ Seed failed:', err);
    }
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
