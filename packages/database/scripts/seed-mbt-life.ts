// packages/database/scripts/seed-mbt-life.ts
// Seed sandbox data for MBT Life demo — 10 Natchez community members
// Run: pnpm exec tsx packages/database/scripts/seed-mbt-life.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PROFILES = [
  { displayName: 'Earl Fontaine', bio: 'Retired electrician. 40 years wiring houses in Adams County. Still does it on weekends because sitting still makes him nervous.', city: 'Natchez', state: 'MS', skills: ['electrical', 'wiring', 'panel upgrades'] },
  { displayName: 'Darlene Washington', bio: 'CPA by day, gardener by dawn. Grows enough tomatoes to feed the block and does taxes for half of Main Street.', city: 'Natchez', state: 'MS', skills: ['bookkeeping', 'taxes', 'gardening'] },
  { displayName: 'Marcus Cole', bio: 'Welder and fabricator. Built half the gates on the Bluff. Can fix anything made of metal and most things that aren\'t.', city: 'Natchez', state: 'MS', skills: ['welding', 'fabrication', 'metalwork'] },
  { displayName: 'June Thibodeaux', bio: 'Quilter, seamstress, and the reason the Pilgrimage costumes still fit. Also makes curtains and slipcovers.', city: 'Natchez', state: 'MS', skills: ['sewing', 'quilting', 'upholstery'] },
  { displayName: 'Ray Delacroix', bio: 'Plumber. Third generation. Knows where every pipe in Natchez runs because his grandfather laid half of them.', city: 'Natchez', state: 'MS', skills: ['plumbing', 'pipe fitting', 'water heaters'] },
  { displayName: 'Odessa Banks', bio: 'Former teacher, now tutors kids and manages the community garden on MLK. Can organize anything — people, plants, or paperwork.', city: 'Natchez', state: 'MS', skills: ['tutoring', 'project management', 'gardening'] },
  { displayName: 'Tommy Guidry', bio: 'Carpenter. Builds decks, porches, and anything with wood. Has every tool and will lend you most of them if you bring them back.', city: 'Natchez', state: 'MS', skills: ['carpentry', 'decks', 'framing'] },
  { displayName: 'Anita Reyes', bio: 'Runs a tamale operation out of her kitchen that should be a restaurant. Also does catering for every church event in town.', city: 'Natchez', state: 'MS', skills: ['cooking', 'catering', 'meal prep'] },
  { displayName: 'Curtis Bell', bio: 'Mechanic. Specializes in older trucks because that\'s what everybody drives. Also fixes lawnmowers and chainsaws.', city: 'Natchez', state: 'MS', skills: ['auto repair', 'small engine', 'diagnostics'] },
  { displayName: 'Shonda Price', bio: 'Web designer and social media manager. One of three people in Natchez who can build a website. Teaches the others.', city: 'Natchez', state: 'MS', skills: ['web design', 'social media', 'graphic design'] },
];

const SKILL_CATEGORIES: Record<string, string> = {
  electrical: 'trades', wiring: 'trades', 'panel upgrades': 'trades',
  bookkeeping: 'professional', taxes: 'professional',
  gardening: 'domestic',
  welding: 'trades', fabrication: 'trades', metalwork: 'trades',
  sewing: 'creative', quilting: 'creative', upholstery: 'creative',
  plumbing: 'trades', 'pipe fitting': 'trades', 'water heaters': 'trades',
  tutoring: 'professional', 'project management': 'professional',
  carpentry: 'trades', decks: 'trades', framing: 'trades',
  cooking: 'domestic', catering: 'domestic', 'meal prep': 'domestic',
  'auto repair': 'trades', 'small engine': 'trades', diagnostics: 'trades',
  'web design': 'tech', 'social media': 'tech', 'graphic design': 'creative',
};

async function seed() {
  console.log('Seeding MBT Life sandbox data...');

  // Clean existing sandbox data
  await prisma.contributorCredit.deleteMany({ where: { sandbox: true } });
  await prisma.contributedListing.deleteMany({ where: { sandbox: true } });
  await prisma.toolLibraryItem.deleteMany({ where: { sandbox: true } });
  await prisma.timeExchange.deleteMany({ where: { sandbox: true } });
  await prisma.taskPost.deleteMany({ where: { sandbox: true } });
  await prisma.skillListing.deleteMany({ where: { sandbox: true } });
  await prisma.communityProfile.deleteMany({ where: { sandbox: true } });

  // Create profiles
  const profiles = [];
  for (const p of PROFILES) {
    const profile = await prisma.communityProfile.create({
      data: { ...p, tier: 'life', sandbox: true },
    });
    profiles.push(profile);
    console.log(`  Created profile: ${profile.displayName}`);
  }

  // Create skill listings from each profile
  for (const profile of profiles) {
    for (const skill of profile.skills) {
      await prisma.skillListing.create({
        data: {
          profileId: profile.id,
          skill,
          category: SKILL_CATEGORIES[skill] || 'other',
          availability: ['weekends', 'evenings', 'flexible'][Math.floor(Math.random() * 3)],
          rateNote: 'trade preferred',
          sandbox: true,
        },
      });
    }
  }
  console.log('  Created skill listings');

  // Create task posts
  const tasks = [
    { authorIdx: 1, title: 'Need kitchen faucet replaced', description: 'Leaking faucet in the kitchen. Have the replacement part already. Need someone who knows plumbing.', skillsNeeded: ['plumbing'], valueType: 'trade', valueNote: 'Will do your taxes in exchange' },
    { authorIdx: 6, title: 'Deck needs rebuilding — 12x16', description: 'Back deck boards are rotting. Need to tear out and replace. I have the lumber. Need help with labor.', skillsNeeded: ['carpentry', 'framing'], valueType: 'trade', valueNote: 'Will build you a website in exchange' },
    { authorIdx: 5, title: 'Community garden fence repair', description: 'Section of the MLK garden fence blew down in the storm. Need welding and new posts.', skillsNeeded: ['welding', 'fabrication'], valueType: 'volunteer', valueNote: 'Community project — tomatoes for everyone who helps' },
    { authorIdx: 9, title: 'Website for the tamale business', description: 'Anita needs a simple website so people can order tamales online. Nothing fancy — menu, phone number, hours.', skillsNeeded: ['web design'], valueType: 'trade', valueNote: 'Payment in tamales. Serious offer.' },
    { authorIdx: 0, title: 'Outlet installation in garage workshop', description: 'Need 4 new 220V outlets in Tommy\'s workshop so he can run the table saw and planer at the same time.', skillsNeeded: ['electrical', 'wiring'], valueType: 'trade', valueNote: 'Tommy will build you shelves' },
  ];

  const taskRecords = [];
  for (const t of tasks) {
    const task = await prisma.taskPost.create({
      data: {
        authorId: profiles[t.authorIdx].id,
        title: t.title,
        description: t.description,
        skillsNeeded: t.skillsNeeded,
        status: 'open',
        valueType: t.valueType,
        valueNote: t.valueNote,
        city: 'Natchez',
        state: 'MS',
        sandbox: true,
      },
    });
    taskRecords.push(task);
  }
  console.log(`  Created ${tasks.length} task posts`);

  // Create time exchanges (past completed trades)
  const exchanges = [
    { providerIdx: 0, receiverIdx: 6, hours: 4, skill: 'electrical', description: 'Wired Tommy\'s new workshop — 4 outlets, subpanel' },
    { providerIdx: 6, receiverIdx: 0, hours: 6, skill: 'carpentry', description: 'Built bookshelves for Earl\'s living room' },
    { providerIdx: 4, receiverIdx: 1, hours: 2, skill: 'plumbing', description: 'Fixed Darlene\'s bathroom sink and replaced the garbage disposal' },
    { providerIdx: 1, receiverIdx: 4, hours: 3, skill: 'taxes', description: 'Filed Ray\'s taxes and found him a $1,200 deduction he\'d been missing' },
    { providerIdx: 2, receiverIdx: 5, hours: 5, skill: 'welding', description: 'Repaired the community garden gate and added a new archway' },
    { providerIdx: 7, receiverIdx: 2, hours: 3, skill: 'catering', description: 'Catered Marcus\'s daughter\'s graduation party — 40 people' },
    { providerIdx: 9, receiverIdx: 7, hours: 8, skill: 'web design', description: 'Built Anita\'s tamale ordering website with Square integration' },
    { providerIdx: 8, receiverIdx: 9, hours: 3, skill: 'auto repair', description: 'Fixed Shonda\'s alternator and replaced the serpentine belt' },
  ];

  for (const e of exchanges) {
    await prisma.timeExchange.create({
      data: {
        providerId: profiles[e.providerIdx].id,
        receiverId: profiles[e.receiverIdx].id,
        hours: e.hours,
        skill: e.skill,
        description: e.description,
        status: 'confirmed',
        sandbox: true,
      },
    });
  }
  console.log(`  Created ${exchanges.length} time exchanges`);

  // Create tool library items
  const tools = [
    { ownerIdx: 6, name: 'DeWalt Table Saw', category: 'power-tools', description: '10-inch portable. Has the stand.' },
    { ownerIdx: 6, name: 'Framing Nailer', category: 'power-tools', description: 'Bostitch pneumatic. Bring your own compressor or borrow mine.' },
    { ownerIdx: 0, name: 'Wire Fish Tape', category: 'hand-tools', description: '100ft steel fish tape for pulling wire through walls' },
    { ownerIdx: 2, name: 'MIG Welder', category: 'power-tools', description: 'Lincoln 180. Uses .030 wire. I\'ll teach you if you don\'t know how.' },
    { ownerIdx: 8, name: 'Floor Jack + Stands', category: 'hand-tools', description: '3-ton jack and 4 jack stands. Don\'t use the jack alone.' },
    { ownerIdx: 5, name: 'Tiller', category: 'garden', description: 'Rear-tine Husqvarna. Good for breaking new ground.' },
  ];

  for (const t of tools) {
    await prisma.toolLibraryItem.create({
      data: {
        ownerId: profiles[t.ownerIdx].id,
        name: t.name,
        description: t.description,
        category: t.category,
        city: 'Natchez',
        state: 'MS',
        sandbox: true,
      },
    });
  }
  console.log(`  Created ${tools.length} tool library items`);

  // Summary stats
  const totalHours = exchanges.reduce((sum, e) => sum + e.hours, 0);
  const avgRate = 75;
  console.log('\n  ── Sandbox Summary ──');
  console.log(`  Profiles: ${profiles.length}`);
  console.log(`  Skills listed: ${profiles.reduce((s, p) => s + p.skills.length, 0)}`);
  console.log(`  Open tasks: ${tasks.length}`);
  console.log(`  Completed exchanges: ${exchanges.length} (${totalHours} hours)`);
  console.log(`  Estimated value at $${avgRate}/hr: $${(totalHours * avgRate).toLocaleString()}`);
  console.log(`  Tools shared: ${tools.length}`);
  console.log('\n  Done. Sandbox ready at /life/sandbox');
}

seed()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
