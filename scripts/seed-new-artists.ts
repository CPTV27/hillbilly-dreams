// scripts/seed-new-artists.ts
// Seed Mechanical Bull, Kate Squire, and Arri Aslin into the Artist table
// Run with: npx tsx scripts/seed-new-artists.ts

import prisma from '../packages/database/index';

const artists = [
  {
    name: 'Mechanical Bull',
    slug: 'mechanical-bull',
    genre: 'rock',
    city: 'Woodstock',
    state: 'NY',
    bio: 'Born in Woodstock, New York — Chase Pierson, Avalon Peacock, Adam Widoff, Dave Malachowski, Chris Zaloom, George Quinn, J-Bird Bowman, Josh Pierson, and John Medeski holed themselves up in a house and emerged with A Million Yesterdays fully formed. Not country, not Americana, not any single genre — all of them at once, and the result makes it none of them. Avalon Peacock rips the heart out of a song and snaps your soul with its beauty. Chase Pierson grabs country rock by the scruff of the neck. When Mechanical Bull goes a little bit country, it\'s the mean, dark, deep kind — the kind that comes with an inbuilt threat.',
    photoUrl: null, // Pending — needs photo from Drive archive
    socialLinks: {},
    source: 'submitted',
    status: 'showcasing',
    notes: 'Chase Pierson\'s band. Album: A Million Yesterdays. Master AIFF files in Drive. AmericanaUK review: "undeniably powerful album." Drive: 1P8meAqqKsHe57drFfLJ9b2Iv58KRsVg2',
  },
  {
    name: 'Kate Skwire',
    slug: 'kate-skwire',
    genre: 'folk',
    city: 'Hudson Valley',
    state: 'NY',
    bio: 'Americana and folk from the Hudson Valley. Kate Skwire\'s debut album "Burned and Blessed" is a collection of warm, golden-hour songs about resilience, healing, and the stubborn joy of showing up anyway. Tracks like "Ain\'t What You Call Me" and "Where The Light Gets In" pull from kintsugi imagery and wildflower meadows — broken things made beautiful again. The sound is earthy, intimate, and unapologetically hopeful.',
    photoUrl: null, // Pending — needs photo session or Drive images
    socialLinks: {},
    source: 'submitted',
    status: 'showcasing',
    notes: 'Album: Burned and Blessed (9 tracks). Image generation prompts for all tracks in Drive doc 1SmxhFPgTLUFQvBh6rqg-fYg07Nh14pysxm76E-_uL-Y. Drive folder: 1zJ7-blPSQotsQwT6eSIAIuj1qtuQSMel',
  },
  {
    name: 'Arri Aslin',
    slug: 'arri-aslin',
    genre: 'folk',
    city: 'Natchez',
    state: 'MS',
    bio: 'Co-owner of The Big Muddy Inn and one of the first artists on Big Muddy Records. Arri is the resident producer and musician at Studio C — writing, recording, and performing from the same room where the Blues Room sessions happen every week. His work bridges the production studio and the performance stage — the same Steinway, the same mics, the same room. Studio C exists because Arri needed a place to make records without leaving home.',
    photoUrl: '/images/arri-aslin/ta-c2-384-of-934.webp',
    socialLinks: {},
    source: 'submitted',
    status: 'showcasing',
    notes: 'Artist-in-Residence at The Big Muddy Inn. Co-owner. Brand kit using Amy Allen brand template variation.',
  },
];

async function main() {
  for (const artist of artists) {
    const existing = await prisma.artist.findUnique({ where: { slug: artist.slug } });
    if (existing) {
      console.log(`✓ ${artist.name} already exists (id: ${existing.id})`);
      continue;
    }
    const created = await prisma.artist.create({ data: artist });
    console.log(`+ Created ${created.name} (id: ${created.id}, slug: ${created.slug})`);
  }
  console.log('Done.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
