#!/usr/bin/env npx tsx
// scripts/seed-natchez-businesses.ts
// Seeds the Client table with real Natchez-area businesses for the Deep South Directory.
// Usage: npx tsx scripts/seed-natchez-businesses.ts
// Requires DATABASE_URL in environment (or .env in packages/database/)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
// Helper: generate a URL-safe slug from a business name
// ─────────────────────────────────────────────────────────────
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ─────────────────────────────────────────────────────────────
// Business seed data
// ─────────────────────────────────────────────────────────────

interface BusinessSeed {
  name: string;
  businessType: string;
  city: string;
  state: string;
  address?: string;
  phone?: string;
  website?: string;
  description: string;
  contactName?: string;
  gbpUrl?: string;
}

const businesses: BusinessSeed[] = [
  // ── RESTAURANTS ──────────────────────────────────────────────
  {
    name: 'Biscuits & Blues',
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '315 Main St, Natchez, MS 39120',
    website: 'https://www.reginacharboneau.com',
    description:
      'Regina Charboneau\'s legendary biscuit parlor and cooking school. The Biscuit Queen serves Southern classics with a trained-in-Paris twist, plus hands-on classes that pull visitors from across the country.',
    contactName: 'Regina Charboneau',
  },
  {
    name: 'The Camp Restaurant',
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '58 S Canal St, Natchez, MS 39120',
    phone: '(601) 442-2267',
    website: 'https://www.thecampnatchez.com',
    description:
      'Fine dining on the bluffs overlooking the Mississippi River. The Camp pairs elevated Southern cuisine with one of the best sunset views in the state.',
  },
  {
    name: 'Cotton Alley Cafe',
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '208 Main St, Natchez, MS 39120',
    phone: '(601) 442-7452',
    description:
      'Downtown Southern comfort food in a converted cotton warehouse. A Natchez staple for brunch, po-boys, and plate lunches since the 1990s.',
  },
  {
    name: "Fat Mama's Tamales",
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '303 S Canal St, Natchez, MS 39120',
    phone: '(601) 442-4548',
    website: 'https://www.fatmamastamales.com',
    description:
      'Legendary tamale shop and Natchez institution. Known for delta-style tamales, Knock-You-Naked Margaritas, and a vibe that keeps locals and tourists coming back for decades.',
  },
  {
    name: "Mammy's Cupboard",
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '555 US-61, Natchez, MS 39120',
    phone: '(601) 445-8957',
    description:
      'Historic roadside restaurant housed inside a 28-foot structure shaped like a woman in a hoop skirt. A complicated piece of Southern history that serves excellent homestyle lunches.',
  },
  {
    name: "King's Tavern",
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '619 Jefferson St, Natchez, MS 39120',
    phone: '(601) 446-8845',
    website: 'https://www.kingstavernnatchez.com',
    description:
      'The oldest standing building in the Natchez territory, dating to 1789. Allegedly haunted, definitely excellent — wood-fired pizzas, craft cocktails, and ghost stories on the house.',
  },
  {
    name: 'Steampunk Coffee Roasters',
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '107 S Commerce St, Natchez, MS 39120',
    description:
      'Small-batch coffee roaster and cafe on Commerce Street. The kind of third-place that downtown Natchez needed — good beans, local art on the walls, and a reason to slow down.',
  },
  {
    name: 'The Pig Out Inn',
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '116 Lower Woodville Rd, Natchez, MS 39120',
    phone: '(601) 442-8050',
    description:
      'No-frills BBQ joint serving smoked meats, ribs, and pulled pork to a devoted local following. The kind of place where the sauce recipe is a state secret.',
  },
  {
    name: "Dodge's Store",
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '601 N Martin Luther King Jr St, Natchez, MS 39120',
    description:
      'A gas station that happens to serve the best fried chicken in the Mississippi River corridor. Chase\'s midnight discovery — the kind of place that doesn\'t need a sign because the line tells you everything.',
  },
  {
    name: 'Pearl Street Pasta',
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '105 S Pearl St, Natchez, MS 39120',
    phone: '(601) 442-9284',
    description:
      'Italian-Southern fusion in the heart of downtown Natchez. Handmade pastas, local seafood, and a wine list that punches above its weight for a small river town.',
  },
  {
    name: 'Magnolia Grill',
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '49 Silver St, Natchez, MS 39120',
    phone: '(601) 446-7670',
    description:
      'Casual riverfront dining Under-the-Hill on Silver Street. Burgers, catfish, and cold beer with a view of the Mississippi — the kind of place where the river does the talking.',
  },
  {
    name: 'Cock of the Walk',
    businessType: 'restaurant',
    city: 'Natchez',
    state: 'MS',
    address: '200 N Broadway, Natchez, MS 39120',
    phone: '(601) 446-8920',
    description:
      'All-you-can-eat catfish and cornbread skillet institution. They throw the cornbread at you, the catfish is fried right, and that\'s really all you need to know.',
  },

  // ── VENUES / ENTERTAINMENT ──────────────────────────────────
  {
    name: 'Ground Zero Blues Club',
    businessType: 'venue',
    city: 'Clarksdale',
    state: 'MS',
    address: '0 Blues Alley, Clarksdale, MS 38614',
    phone: '(662) 621-9009',
    website: 'https://www.groundzerobluesclub.com',
    description:
      'Morgan Freeman and Bill Luckett\'s juke joint in the heart of the Delta. Live blues seven nights a week in a corrugated-tin room that feels exactly like the music sounds.',
    contactName: 'Morgan Freeman / Bill Luckett',
  },
  {
    name: "B.B. King's Blues Club",
    businessType: 'venue',
    city: 'Memphis',
    state: 'TN',
    address: '143 Beale St, Memphis, TN 38103',
    phone: '(901) 524-5464',
    website: 'https://www.bbkings.com',
    description:
      'Beale Street showcase venue honoring the King of the Blues. Live music every night, Southern food, and the spirit of B.B. himself — a flagship partner for Big Muddy touring acts.',
  },
  {
    name: 'The Big Muddy Blues Room',
    businessType: 'venue',
    city: 'Natchez',
    state: 'MS',
    description:
      'Our 50-seat intimate listening room inside The Big Muddy Inn. Blues, roots, and singer-songwriter showcases in a space built for the music, not the noise.',
    contactName: 'Chase Pierson',
  },
  {
    name: 'Under-the-Hill Saloon',
    businessType: 'venue',
    city: 'Natchez',
    state: 'MS',
    address: '25 Silver St, Natchez, MS 39120',
    phone: '(601) 446-8023',
    description:
      'Historic bar on Silver Street at the bottom of the bluff, right on the Mississippi. One of the oldest bars in the state — live music, cold drinks, and river rats since the steamboat era.',
  },
  {
    name: "Smoot's Grocery",
    businessType: 'venue',
    city: 'Natchez',
    state: 'MS',
    address: '1 Smoot Alley, Natchez, MS 39120',
    description:
      'Authentic juke joint tucked behind downtown Natchez. No sign, no website, no pretense — just blues, beer, and the real thing. If you know, you know.',
  },
  {
    name: 'The Dart',
    businessType: 'venue',
    city: 'Natchez',
    state: 'MS',
    address: '406 Main St, Natchez, MS 39120',
    description:
      'Downtown bar and live music venue on Main Street. The Dart is where locals land when the sun goes down — pool tables, cold beer, and the occasional band that shakes the walls.',
  },

  // ── HOTELS / LODGING ────────────────────────────────────────
  {
    name: 'The Big Muddy Inn',
    businessType: 'hotel',
    city: 'Natchez',
    state: 'MS',
    website: 'https://www.thebigmuddyinn.com',
    description:
      'Our boutique inn and creative headquarters in Natchez. Part guesthouse, part blues room, part media studio — where the river meets the road and the music never really stops.',
    contactName: 'Tracy Allen',
  },
  {
    name: 'Monmouth Historic Inn',
    businessType: 'hotel',
    city: 'Natchez',
    state: 'MS',
    address: '36 Melrose Ave, Natchez, MS 39120',
    phone: '(601) 442-5852',
    website: 'https://www.monmouthhistoricinn.com',
    description:
      'Luxury antebellum estate turned boutique hotel. 30 acres of manicured grounds, period furnishings, and the kind of old-money Southern hospitality that makes you forget what century it is.',
  },
  {
    name: 'Dunleith Historic Inn',
    businessType: 'hotel',
    city: 'Natchez',
    state: 'MS',
    address: '84 Homochitto St, Natchez, MS 39120',
    phone: '(601) 446-8500',
    website: 'https://www.dunleith.com',
    description:
      'National Historic Landmark wrapped in 26 Tuscan columns. Upscale dining at the Castle Restaurant, sprawling grounds, and rooms that make you feel like a plantation-era senator — minus the moral compromise.',
  },
  {
    name: 'The Guest House Hotel',
    businessType: 'hotel',
    city: 'Natchez',
    state: 'MS',
    address: '201 N Pearl St, Natchez, MS 39120',
    phone: '(601) 442-1054',
    website: 'https://www.theguesthousenatchez.com',
    description:
      'Downtown boutique hotel in a beautifully restored historic building. Walking distance to everything on Main Street — the closest thing Natchez has to a proper city hotel.',
  },
  {
    name: 'Natchez Grand Hotel',
    businessType: 'hotel',
    city: 'Natchez',
    state: 'MS',
    address: '111 N Broadway, Natchez, MS 39120',
    phone: '(601) 446-9994',
    description:
      'Full-service hotel overlooking the Mississippi River. Convention-friendly with a pool, restaurant, and the best hotel-room river views in town.',
  },
  {
    name: 'Mark Twain Guesthouse',
    businessType: 'hotel',
    city: 'Natchez',
    state: 'MS',
    address: '33 Silver St, Natchez, MS 39120',
    description:
      'Budget-friendly guesthouse Under-the-Hill on Silver Street, named for the man who made the river famous. Simple rooms, river proximity, and the kind of charm that doesn\'t cost extra.',
  },
  {
    name: 'Devereaux Shields House B&B',
    businessType: 'hotel',
    city: 'Natchez',
    state: 'MS',
    address: '709 N Union St, Natchez, MS 39120',
    phone: '(601) 304-5378',
    description:
      'Intimate bed-and-breakfast in a circa-1893 Queen Anne Victorian. Four rooms, full breakfast, and a front porch that was purpose-built for doing absolutely nothing.',
  },

  // ── TOURS / ATTRACTIONS ─────────────────────────────────────
  {
    name: 'Natchez Pilgrimage Tours',
    businessType: 'tour',
    city: 'Natchez',
    state: 'MS',
    address: '640 S Canal St, Natchez, MS 39120',
    phone: '(601) 446-6631',
    website: 'https://www.natchezpilgrimage.com',
    description:
      'The original antebellum home tour company, running since 1932. Spring and fall pilgrimages open private mansions to the public — the event that put Natchez on the tourism map.',
  },
  {
    name: 'Longwood',
    businessType: 'tour',
    city: 'Natchez',
    state: 'MS',
    address: '140 Lower Woodville Rd, Natchez, MS 39120',
    phone: '(601) 442-5193',
    description:
      'The largest octagonal house in America, and it was never finished. Construction stopped when the Civil War broke out — the tools are still where the workers left them. Haunting and unforgettable.',
  },
  {
    name: 'Stanton Hall',
    businessType: 'tour',
    city: 'Natchez',
    state: 'MS',
    address: '401 High St, Natchez, MS 39120',
    phone: '(601) 446-6631',
    description:
      'Grand antebellum mansion occupying an entire city block. Built in 1857 with materials shipped from Europe — chandeliers, marble mantels, and the kind of excess that only cotton money could buy.',
  },
  {
    name: 'Rosalie Mansion',
    businessType: 'tour',
    city: 'Natchez',
    state: 'MS',
    address: '100 Orleans St, Natchez, MS 39120',
    phone: '(601) 445-4555',
    description:
      'Federal-style mansion perched on the bluffs above the Mississippi. Served as Union headquarters during the Civil War — the house that watched the river change hands.',
  },
  {
    name: 'The William Johnson House',
    businessType: 'tour',
    city: 'Natchez',
    state: 'MS',
    address: '210 State St, Natchez, MS 39120',
    phone: '(601) 445-5345',
    description:
      'Preserved home and barbershop of William Johnson, a free man of color in antebellum Natchez. His diary is one of the most important primary documents of pre-war Southern life — a story most people never learned in school.',
  },
  {
    name: 'Natchez Trace Parkway',
    businessType: 'tour',
    city: 'Natchez',
    state: 'MS',
    website: 'https://www.nps.gov/natr',
    description:
      'The 444-mile National Park Service scenic drive from Natchez to Nashville, tracing the ancient path of the Choctaw, Chickasaw, and Natchez peoples. Starts (or ends) right here at the southern terminus.',
  },

  // ── SHOPS ───────────────────────────────────────────────────
  {
    name: 'Rolling River Bistro & Market',
    businessType: 'shop',
    city: 'Natchez',
    state: 'MS',
    description:
      'Combination cafe and curated market in downtown Natchez. Local goods, prepared foods, and the kind of small-town retail that makes you want to buy something you didn\'t know you needed.',
  },
  {
    name: 'Natchez Market',
    businessType: 'shop',
    city: 'Natchez',
    state: 'MS',
    address: '213 Main St, Natchez, MS 39120',
    description:
      'Downtown marketplace offering local art, gifts, and specialty goods. A Main Street anchor that gives visitors something to take home besides photographs and mosquito bites.',
  },
  {
    name: 'Delta Music Experience',
    businessType: 'shop',
    city: 'Clarksdale',
    state: 'MS',
    address: '252 Delta Ave, Clarksdale, MS 38614',
    description:
      'Blues museum and record shop in downtown Clarksdale. Vinyl, memorabilia, and the kind of deep-cut knowledge that turns a casual listener into a lifelong blues fan.',
  },
];

// ─────────────────────────────────────────────────────────────
// Main seed function
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log('🌱 Seeding Natchez-area businesses into Client table...\n');

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const biz of businesses) {
    const slug = slugify(biz.name);

    try {
      const result = await prisma.client.upsert({
        where: { slug },
        update: {
          name: biz.name,
          businessType: biz.businessType,
          city: biz.city,
          state: biz.state,
          address: biz.address ?? null,
          phone: biz.phone ?? null,
          website: biz.website ?? null,
          description: biz.description,
          contactName: biz.contactName ?? null,
          gbpUrl: biz.gbpUrl ?? null,
          platforms: [],
          notes: 'Seed data — needs verification and outreach',
        },
        create: {
          name: biz.name,
          slug,
          tier: 'front-porch',
          businessType: biz.businessType,
          city: biz.city,
          state: biz.state,
          address: biz.address ?? null,
          phone: biz.phone ?? null,
          website: biz.website ?? null,
          description: biz.description,
          contactName: biz.contactName ?? null,
          gbpUrl: biz.gbpUrl ?? null,
          platforms: [],
          status: 'prospect',
          notes: 'Seed data — needs verification and outreach',
        },
      });

      // Prisma upsert doesn't tell us which path it took, so check createdAt vs updatedAt
      const isNew =
        result.createdAt.getTime() === result.updatedAt.getTime() ||
        Date.now() - result.createdAt.getTime() < 5000;

      if (isNew) {
        console.log(`  CREATE  ${biz.name} (${slug})`);
        created++;
      } else {
        console.log(`  UPDATE  ${biz.name} (${slug})`);
        updated++;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  FAIL    ${biz.name}: ${message}`);
      failed++;
    }
  }

  // ── Summary ──────────────────────────────────────────────
  console.log('\n────────────────────────────────────────────');
  console.log(`  Total:   ${businesses.length}`);
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  if (failed > 0) console.log(`  Failed:  ${failed}`);
  console.log('────────────────────────────────────────────');

  // Print breakdown by type
  const byType = businesses.reduce(
    (acc, b) => {
      acc[b.businessType] = (acc[b.businessType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  console.log('\n  By type:');
  for (const [type, count] of Object.entries(byType).sort()) {
    console.log(`    ${type.padEnd(12)} ${count}`);
  }

  // Print breakdown by city
  const byCity = businesses.reduce(
    (acc, b) => {
      const key = `${b.city}, ${b.state}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  console.log('\n  By city:');
  for (const [city, count] of Object.entries(byCity).sort(
    (a, b) => b[1] - a[1],
  )) {
    console.log(`    ${city.padEnd(20)} ${count}`);
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
