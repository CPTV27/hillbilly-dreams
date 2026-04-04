/**
 * Seed Brands, StyleGuides, Contests, and the first Editorial Job.
 *
 * Run: pnpm --filter @bigmuddy/database exec tsx scripts/seed-editorial-bureau.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Editorial Bureau...');

  // ── BRANDS ─────────────────────────────────────────────────────

  const brands = [
    { slug: 'hillbilly-dreams', name: 'Hillbilly Dreams Inc' },
    { slug: 'deep-south-directory', name: 'Deep South Directory' },
    { slug: 'big-muddy-touring', name: 'Big Muddy Touring' },
    { slug: 'big-muddy-magazine', name: 'Big Muddy Magazine' },
    { slug: 'big-muddy-radio', name: 'Big Muddy Radio' },
    { slug: 'big-muddy-entertainment', name: 'Big Muddy Entertainment' },
    { slug: 'big-muddy-records', name: 'Big Muddy Records' },
    { slug: 'outsider-economics', name: 'Outsider Economics' },
    { slug: 'venture-gallery', name: 'Venture Gallery' },
    { slug: 'bearsville-media-group', name: 'Bearsville Media Group' },
    { slug: 'measurably-better', name: 'Measurably Better' },
  ];

  for (const b of brands) {
    await prisma.brand.upsert({
      where: { slug: b.slug },
      update: { name: b.name },
      create: b,
    });
  }
  console.log(`  ${brands.length} brands seeded.`);

  // ── STYLE GUIDES ───────────────────────────────────────────────

  const guides = [
    {
      name: 'Chase Voice — DSD',
      persona: 'CEO',
      toneWeight: 0.9,
      forbiddenPhrases: [
        'vertically integrated', 'leverage', 'utilize', 'robust', 'scalable',
        'synergy', 'holistic', 'disruption', 'Our platform enables',
        'Measurably Better Things', 'MBT', // never on customer-facing DSD copy
        'all-in-one', // every competitor says this, we don't
      ],
      samples: [
        'Main Street marketing for Main Street money.',
        "We're not a software company. We're a media company that sells software at software prices.",
        'We probably ate at your restaurant last week.',
        'Stop paying $300 a month to a company that\'s never been to Mississippi.',
        'Townsquare charges $499 for radio + digital. We do it for less and throw in a magazine feature and a photoshoot.',
        'The gap isn\'t technology — it\'s organization. That\'s what we sell.',
      ],
    },
    {
      name: 'Outsider Economics Voice',
      persona: 'Field Manual Author',
      toneWeight: 0.85,
      forbiddenPhrases: [
        'disruption', 'innovation', 'Silicon Valley', 'move fast',
        'unicorn', 'scale', 'growth hacking',
      ],
      samples: [
        'Capital flows out. That is the default. Every tool in this book exists to reverse that flow.',
        'You don\'t need to be big. You need to be organized.',
        'The same architecture that runs a Viacom can run a small-town media economy.',
      ],
    },
    {
      name: 'Big Muddy Editorial',
      persona: 'Magazine Editor',
      toneWeight: 0.75,
      forbiddenPhrases: [
        'content', // say 'story' or 'piece' or 'feature'
        'engagement', // say 'readership' or 'audience'
        'brand awareness', // say 'recognition' or 'reputation'
      ],
      samples: [
        'Under-the-Hill humidity, neon on brick, live tape hiss.',
        'The corridor runs from Memphis to New Orleans. Every town along it has a story nobody wrote down.',
      ],
    },
  ];

  for (const g of guides) {
    const existing = await prisma.styleGuide.findFirst({ where: { name: g.name } });
    if (!existing) {
      await prisma.styleGuide.create({ data: g });
    } else {
      await prisma.styleGuide.update({ where: { id: existing.id }, data: g });
    }
  }
  console.log(`  ${guides.length} style guides seeded.`);

  // ── CONTESTS (5 Design Verticals) ─────────────────────────────

  const now = new Date();
  const twoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  const contests = [
    {
      title: 'Hillbilly Dreams — Parent Brand Redesign',
      description: 'Redesign the hillbillydreamsinc.com homepage. Sovereign infrastructure, New South, capital stays local. Not Silicon Valley SaaS — Main Street holding company gravity.',
      submissionType: 'image',
      entryFeeCredits: 0,
      status: 'published',
      rules: { vertical: '00_Parent_Hillbilly_Dreams', briefPath: 'experiments/design-contest/00_Parent_Hillbilly_Dreams/PROMPT_BRIEF.md' },
      prizePool: { description: 'Featured on hillbillydreamsinc.com', credits: 5000 },
    },
    {
      title: 'DSD Intelligence — Directory Frontend',
      description: 'Redesign deepsouthdirectory.com. Walk-in $20 ladder, verified Main Street, local multiplier. Always "Deep South Directory" — never platform jargon. The copy must pass the parity audit.',
      submissionType: 'image',
      entryFeeCredits: 0,
      status: 'published',
      rules: { vertical: '01_DSD_Intelligence', briefPath: 'experiments/design-contest/01_DSD_Intelligence/PROMPT_BRIEF.md', parityAudit: true },
      prizePool: { description: 'Featured on deepsouthdirectory.com', credits: 5000 },
    },
    {
      title: 'Big Muddy Signal — Media Brand',
      description: 'Redesign the Big Muddy media properties (Touring, Magazine, Radio, Entertainment, Records). Under-the-Hill humidity, neon on brick, juke-joint premium. Not generic concert poster AI slop.',
      submissionType: 'image',
      entryFeeCredits: 0,
      status: 'published',
      rules: { vertical: '02_Big_Muddy_Signal', briefPath: 'experiments/design-contest/02_Big_Muddy_Signal/PROMPT_BRIEF.md' },
      prizePool: { description: 'Featured across Big Muddy properties', credits: 5000 },
    },
    {
      title: 'Better Things Utility — Operator Console',
      description: 'Design the B2B operator interface for measurablybetter.life. Manuals, SOP clarity, glass telemetry. Practical, unromantic — the ChatGPT killer for the shop floor.',
      submissionType: 'image',
      entryFeeCredits: 0,
      status: 'published',
      rules: { vertical: '03_Better_Things_Utility', briefPath: 'experiments/design-contest/03_Better_Things_Utility/PROMPT_BRIEF.md' },
      prizePool: { description: 'Featured on measurablybetter.life', credits: 5000 },
    },
    {
      title: 'Outsider Economics Manual — Sovereign Scholar',
      description: 'Design the field manual resource pages. Interactive lore quiz, chapter navigation, sovereign voice. Delta-adjacent plain talk — no Silicon Valley hype.',
      submissionType: 'image',
      entryFeeCredits: 0,
      status: 'published',
      rules: { vertical: '04_Outsider_Economics_Manual', briefPath: 'experiments/design-contest/04_Outsider_Economics_Manual/PROMPT_BRIEF.md' },
      prizePool: { description: 'Featured on outsidereconomics.com', credits: 5000 },
    },
  ];

  for (const c of contests) {
    const existing = await prisma.contest.findFirst({ where: { title: c.title } });
    if (!existing) {
      await prisma.contest.create({
        data: {
          ...c,
          startDate: now,
          endDate: twoWeeks,
        },
      });
    }
  }
  console.log(`  ${contests.length} contests seeded.`);

  // ── EDITORIAL JOB: DSD Marketing Copy Rewrite ──────────────────

  const dsdBrand = await prisma.brand.findUnique({ where: { slug: 'deep-south-directory' } });
  const chaseVoice = await prisma.styleGuide.findFirst({ where: { name: 'Chase Voice — DSD' } });

  if (dsdBrand && chaseVoice) {
    const existingJob = await prisma.job.findFirst({
      where: { toolId: 'editorial.dsd-copy-rewrite' },
    });

    if (!existingJob) {
      await prisma.job.create({
        data: {
          toolId: 'editorial.dsd-copy-rewrite',
          params: {
            task: 'Rewrite all DSD marketing copy using parity audit verdicts',
            inputs: [
              'docs/DSD_MARKETING_COPY.md',
              'docs/COMPETITIVE_ANALYSIS_2026.md',
              'apps/web/public/sandbox/page-1-calculator.html',
              'apps/web/public/sandbox/page-2-local.html',
              'apps/web/public/sandbox/page-3-media.html',
              'apps/web/public/sandbox/page-4-painpoint.html',
            ],
            constraints: [
              'Never claim to replace OpenTable or Shopify',
              'SEO is "local basics" not Semrush-level',
              'Drop task management from comparison',
              'Lead with Empty Box insight: we fill the tools with content',
              'Name specific towns: Natchez, Vicksburg, Opelousas',
              'Price is TBD — use "starting at" language only',
            ],
            contest: '01_DSD_Intelligence',
          },
          editorialStatus: 'DRAFT',
          brandId: dsdBrand.id,
          styleGuideId: chaseVoice.id,
          draftContent: 'Pending — current sandbox pages are structural prototypes. Copy needs full Editorial Bureau pass before going customer-facing.',
        },
      });
      console.log('  Editorial Job created: DSD Marketing Copy Rewrite');
    } else {
      console.log('  Editorial Job already exists: DSD Marketing Copy Rewrite');
    }
  }

  console.log('\nEditorial Bureau seeding complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
