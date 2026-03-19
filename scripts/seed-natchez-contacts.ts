#!/usr/bin/env npx tsx
// scripts/seed-natchez-contacts.ts
// Seeds the Contact table with key people in the Big Muddy network.
// Usage: npx tsx scripts/seed-natchez-contacts.ts
// Requires DATABASE_URL in environment (or .env in packages/database/)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
// Contact seed data
// ─────────────────────────────────────────────────────────────

interface ContactSeed {
  name: string;
  role: string;
  organization: string;
  email?: string;
  phone?: string;
  category: string;
  notes: string;
}

const contacts: ContactSeed[] = [
  {
    name: 'Regina Charboneau',
    role: 'Chef / Owner',
    organization: 'Biscuits & Blues',
    category: 'partner',
    notes:
      'The Biscuit Queen of Natchez. Trained in Paris, returned to the river. Runs Biscuits & Blues and teaches cooking classes. Celebrity chef with national press — Food Network, NYT, etc. Key Natchez culinary ambassador.',
  },
  {
    name: 'Morgan Freeman',
    role: 'Co-Owner',
    organization: 'Ground Zero Blues Club',
    category: 'partner',
    notes:
      'Co-owner of Ground Zero Blues Club in Clarksdale with Bill Luckett. Oscar-winning actor and Clarksdale resident. His investment in the Delta blues scene is the real deal — not a vanity project.',
  },
  {
    name: 'Bill Luckett',
    role: 'Co-Owner / Attorney',
    organization: 'Ground Zero Blues Club',
    category: 'partner',
    notes:
      'Clarksdale attorney and co-owner of Ground Zero Blues Club with Morgan Freeman. Former mayoral candidate. A driving force behind Clarksdale\'s blues tourism economy and downtown revitalization.',
  },
  {
    name: 'Tracy Allen',
    role: 'Operations Manager',
    organization: 'The Big Muddy Inn',
    category: 'team',
    notes:
      'Day-to-day operations at The Big Muddy Inn. Handles guest relations, housekeeping coordination, and keeps the trains running while Chase is on the road or in the studio.',
  },
  {
    name: 'Amy Allen',
    role: 'Artist / Performer',
    organization: 'The Big Muddy Inn',
    category: 'artist',
    notes:
      'Artist and performer affiliated with The Big Muddy Inn. Part of the creative core that makes the inn more than just a place to sleep.',
  },
  {
    name: 'Arri B. Aslin',
    role: 'Artist / Performer',
    organization: 'The Big Muddy Inn',
    category: 'artist',
    notes:
      'Artist and performer in the Big Muddy creative orbit. Contributes to the inn\'s live programming and artistic identity.',
  },
  {
    name: 'Chase Pierson',
    role: 'Showrunner / Founder',
    organization: 'Big Muddy Media',
    category: 'team',
    notes:
      'Founder and showrunner of Big Muddy Media. Runs the inn, the magazine, the radio, the touring operation, and the content engine. Outsider economist. The one who started all this.',
  },
];

// ─────────────────────────────────────────────────────────────
// Main seed function
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log('🌱 Seeding key contacts into Contact table...\n');

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const contact of contacts) {
    try {
      // Use name + organization as a composite key for idempotency
      // Since Contact doesn't have a unique slug, we find by name
      const existing = await prisma.contact.findFirst({
        where: {
          name: contact.name,
          organization: contact.organization,
        },
      });

      if (existing) {
        await prisma.contact.update({
          where: { id: existing.id },
          data: {
            role: contact.role,
            organization: contact.organization,
            email: contact.email ?? null,
            phone: contact.phone ?? null,
            category: contact.category,
            notes: contact.notes,
          },
        });
        console.log(`  UPDATE  ${contact.name} (${contact.organization})`);
        updated++;
      } else {
        await prisma.contact.create({
          data: {
            name: contact.name,
            role: contact.role,
            organization: contact.organization,
            email: contact.email ?? null,
            phone: contact.phone ?? null,
            category: contact.category,
            notes: contact.notes,
          },
        });
        console.log(`  CREATE  ${contact.name} (${contact.organization})`);
        created++;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  FAIL    ${contact.name}: ${message}`);
      failed++;
    }
  }

  // ── Summary ──────────────────────────────────────────────
  console.log('\n────────────────────────────────────────────');
  console.log(`  Total:   ${contacts.length}`);
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  if (failed > 0) console.log(`  Failed:  ${failed}`);
  console.log('────────────────────────────────────────────');

  // Print breakdown by category
  const byCat = contacts.reduce(
    (acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  console.log('\n  By category:');
  for (const [cat, count] of Object.entries(byCat).sort()) {
    console.log(`    ${cat.padEnd(12)} ${count}`);
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
