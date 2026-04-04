/**
 * Seed Bearsville Creative: Group, Brands, Realtor bundles, Studio Book campaign.
 *
 * Run: pnpm --filter @bigmuddy/database exec tsx scripts/seed-bearsville-creative.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Bearsville Creative...');

  // ── GROUP ──────────────────────────────────────────────────────

  const group = await prisma.group.upsert({
    where: { name: 'BEARSVILLE_CREATIVE_CORRIDOR' },
    update: {},
    create: {
      name: 'BEARSVILLE_CREATIVE_CORRIDOR',
      description: 'Bearsville Creative corridor namespace. Utopia Studio, Studio C, Tuthill Design, Creative Guild.',
    },
  });
  console.log(`  Group: ${group.name} (${group.id})`);

  // ── BRAND (rename from Media Group) ────────────────────────────

  await prisma.brand.upsert({
    where: { slug: 'bearsville-media-group' },
    update: { slug: 'bearsville-creative', name: 'Bearsville Creative' },
    create: { slug: 'bearsville-creative', name: 'Bearsville Creative' },
  });

  // Add sub-brands
  const subBrands = [
    { slug: 'utopia-studio', name: 'Utopia Studio' },
    { slug: 'studio-c-video', name: 'Studio C Video' },
    { slug: 'tuthill-design', name: 'Tuthill Design' },
  ];
  for (const b of subBrands) {
    await prisma.brand.upsert({
      where: { slug: b.slug },
      update: { name: b.name },
      create: b,
    });
  }
  console.log('  Brands: bearsville-creative, utopia-studio, studio-c-video, tuthill-design');

  // ── STYLE GUIDE (Bearsville) ───────────────────────────────────

  const existing = await prisma.styleGuide.findFirst({ where: { name: 'Bearsville Creative Voice' } });
  if (!existing) {
    await prisma.styleGuide.create({
      data: {
        name: 'Bearsville Creative Voice',
        persona: 'Studio Owner',
        toneWeight: 0.8,
        forbiddenPhrases: [
          'content creator', 'influencer', 'brand awareness', 'engagement metrics',
          'disruption', 'innovation hub', 'coworking', 'Silicon Valley',
        ],
        samples: [
          'The room remembers every take.',
          'Analog warmth. Digital precision. Hudson Valley soul.',
          'Where the Sound Lives.',
          'The craft is the product. The studio is the cathedral.',
        ],
      },
    });
  }
  console.log('  Style Guide: Bearsville Creative Voice');

  // ── REALTOR PRODUCT BUNDLES (Tuthill) ──────────────────────────

  const realtorFree = await prisma.productBundle.upsert({
    where: { slug: 'realtor-free' },
    update: {},
    create: {
      slug: 'realtor-free',
      name: 'Realtor — Free Pin',
      description: 'Basic map pin and listing in the Bearsville Creative directory. No cost.',
      market: 'realtor',
      priceMonthly: 0,
      isActive: true,
      sortOrder: 20,
      metadata: { region: 'hudson-valley', entity: 'tuthill-design' },
    },
  });

  const realtorSovereign = await prisma.productBundle.upsert({
    where: { slug: 'realtor-sovereign' },
    update: {},
    create: {
      slug: 'realtor-sovereign',
      name: 'Realtor — Sovereign',
      description: 'Full Narrative Real Estate package. AI-generated property stories using local historical lore. Priority placement on signage network. Video tours via Studio C.',
      market: 'realtor',
      priceMonthly: 50000, // $500/mo
      isActive: false, // not active until built
      sortOrder: 21,
      metadata: {
        region: 'hudson-valley',
        entity: 'tuthill-design',
        features: [
          'AI narrative property listings using regional historical lore',
          'Priority rotation on Smart TV signage network',
          'Video tours produced by Studio C',
          'Professional photography by Chase Pierson',
          'Featured in Bearsville Creative directory',
        ],
      },
    },
  });
  console.log(`  Realtor bundles: Free (${realtorFree.id}), Sovereign $500/mo (${realtorSovereign.id})`);

  // Wire features to realtor bundles
  const listingFeature = await prisma.productFeature.findUnique({ where: { slug: 'business-listing' } });
  const photoFeature = await prisma.productFeature.findUnique({ where: { slug: 'professional-photography' } });
  const analyticsFeature = await prisma.productFeature.findUnique({ where: { slug: 'analytics' } });
  const videoFeature = await prisma.productFeature.findUnique({ where: { slug: 'video-production' } });
  const magazineFeature = await prisma.productFeature.findUnique({ where: { slug: 'magazine-feature' } });

  if (listingFeature) {
    await prisma.bundleFeature.upsert({
      where: { bundleId_featureId: { bundleId: realtorFree.id, featureId: listingFeature.id } },
      update: {},
      create: { bundleId: realtorFree.id, featureId: listingFeature.id, limit: 'basic', notes: 'Map pin only' },
    });

    const sovereignFeatures = [
      { feature: listingFeature, notes: 'Full narrative listing with historical lore' },
      { feature: photoFeature, limit: '2/year', notes: 'Seasonal property shoots' },
      { feature: analyticsFeature, notes: 'Monthly property performance report' },
      { feature: videoFeature, limit: '1/quarter', notes: 'Studio C video tour per quarter' },
      { feature: magazineFeature, limit: '1/year', notes: 'Annual feature in Bearsville Creative magazine' },
    ];
    for (const sf of sovereignFeatures) {
      if (sf.feature) {
        await prisma.bundleFeature.upsert({
          where: { bundleId_featureId: { bundleId: realtorSovereign.id, featureId: sf.feature.id } },
          update: {},
          create: {
            bundleId: realtorSovereign.id,
            featureId: sf.feature.id,
            limit: sf.limit || null,
            notes: sf.notes,
          },
        });
      }
    }
  }
  console.log('  Realtor bundle features mapped.');

  // ── STUDIO BOOK CAMPAIGN ───────────────────────────────────────

  const bearsvilleBrand = await prisma.brand.findUnique({ where: { slug: 'bearsville-creative' } });
  const bearsvilleVoice = await prisma.styleGuide.findFirst({ where: { name: 'Bearsville Creative Voice' } });

  if (bearsvilleBrand && bearsvilleVoice) {
    const existingJob = await prisma.job.findFirst({
      where: { toolId: 'production.studio-almanac' },
    });

    if (!existingJob) {
      await prisma.job.create({
        data: {
          toolId: 'production.studio-almanac',
          params: {
            campaign: 'Great American Studios — Sovereign Almanac',
            description: 'Monthly limited-edition studio book. 20 copies. $20 each at Bearsville market.',
            studioTypes: ['recording', 'fine-art', 'film-video', 'makerspace', 'design-lab'],
            photographerPrimary: 'Chase Pierson',
            existingPhotography: ['Utopia Studio', 'Arden Studio'],
            summerTour: 'Photograph additional studios summer 2026',
            printRun: { copies: 20, price: 2000, frequency: 'monthly' },
            qrCodes: true,
            contributors: 'open — invite-only first 90 days',
          },
          editorialStatus: 'DRAFT',
          brandId: bearsvilleBrand.id,
          styleGuideId: bearsvilleVoice.id,
          draftContent: 'Campaign initialized. Awaiting photo ingestion from Utopia and Arden shoots. Summer 2026 studio tour will expand the archive.',
        },
      });
      console.log('  Editorial Job created: Studio Almanac campaign');
    }
  }

  // ── DISPLAY CHANNEL (Bearsville signage) ───────────────────────

  await prisma.displayChannel.upsert({
    where: { slug: 'bearsville-lobby' },
    update: {},
    create: {
      slug: 'bearsville-lobby',
      youtubeVideoId: '', // TBD — ambient Bearsville video
      tickerItems: [
        'Welcome to Bearsville Creative',
        'Studio bookings: utopia@bearsvillecreative.com',
        'Now accepting submissions for the monthly Almanac',
      ],
      metadata: { region: 'hudson-valley', type: 'lobby' },
    },
  });
  console.log('  Display Channel: bearsville-lobby');

  console.log('\nBearsville Creative seeding complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
