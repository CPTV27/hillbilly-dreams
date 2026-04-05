/**
 * Seed DSD tiers v2 — based on Chase's direct input (2026-04-04).
 * Replaces the old Free/Starter/Pro/Media general bundles with the real product tiers.
 *
 * Run: pnpm --filter @bigmuddy/database exec tsx scripts/seed-dsd-tiers-v2.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding DSD tiers v2...');

  // Deactivate old general bundles
  await prisma.productBundle.updateMany({
    where: { market: 'general' },
    data: { isActive: false },
  });
  console.log('  Deactivated old general bundles.');

  const tiers = [
    {
      slug: 'dsd-free',
      name: 'Deep South Directory — Free',
      description: 'AI access (limited questions/day). Set up your business profile and voice. Plug in Gmail and Google Workspace. Basic directory listing. Off-grid sovereign tools.',
      market: 'dsd',
      priceMonthly: 0,
      isActive: true,
      sortOrder: 1,
      metadata: {
        pitch: 'Get listed. Get access to AI. Start building your profile.',
        aiAccess: 'limited — X questions per day',
        credits: 'earn by contributing photos and content',
        integrations: ['gmail', 'google-workspace'],
      },
    },
    {
      slug: 'dsd-essentials',
      name: 'Deep South Directory — Essentials',
      description: 'Replaces your ChatGPT account. Full AI access trained on your business and your town. Earn credits by contributing content — credits offset your bill.',
      market: 'dsd',
      priceMonthly: 2500, // $25/mo
      isActive: true,
      sortOrder: 2,
      metadata: {
        pitch: 'Cancel ChatGPT. This one already knows your business.',
        aiAccess: 'full — unlimited questions, trained on your business context',
        credits: 'earn by contributing photos, content, reviews — offset your bill',
        replaces: ['ChatGPT ($20/mo)'],
      },
    },
    {
      slug: 'dsd-pro',
      name: 'Deep South Directory — Pro',
      description: 'The network. Like LinkedIn + ChatGPT for the Deep South. Professional visibility, directory prominence, network connections. Full AI access.',
      market: 'dsd',
      priceMonthly: 5000, // $50/mo
      isActive: true,
      sortOrder: 3,
      metadata: {
        pitch: 'Your professional network for the corridor. Be found by the people who matter.',
        aiAccess: 'full + network features',
        networkFeatures: ['profile visibility', 'directory prominence', 'peer connections', 'referral tracking'],
        replaces: ['ChatGPT ($20/mo)', 'LinkedIn Premium ($60/mo)'],
      },
    },
    {
      slug: 'dsd-marketing',
      name: 'Deep South Directory — Marketing',
      description: 'Digital hygiene pack. Google Business Profile corrected. Reviews monitored and answered. Social posts every week on autopilot. The foundation every business needs.',
      market: 'dsd',
      priceMonthly: 9900, // $99/mo
      isActive: true,
      sortOrder: 4,
      metadata: {
        pitch: 'Set it up. It runs. You approve what goes out. $99/mo.',
        aiAccess: 'full + marketing automation',
        marketingFeatures: ['google-business-sync', 'review-monitoring', 'review-responses', 'social-posting', 'monthly-report'],
        postsPerWeek: 'a few',
        replaces: ['ChatGPT ($20/mo)', 'Yext ($199/mo)', 'Hootsuite ($99/mo)', 'Birdeye ($299/mo)'],
      },
    },
    {
      slug: 'dsd-engine',
      name: 'Deep South Directory — Engine',
      description: 'Full marketing engine. More posts, more volume, more of the media machine working for you. Magazine features, radio mentions, professional photography as the production calendar allows.',
      market: 'dsd',
      priceMonthly: 25000, // $250/mo
      isActive: true,
      sortOrder: 5,
      metadata: {
        pitch: 'The full media company in your corner.',
        aiAccess: 'full + priority',
        marketingFeatures: ['everything in Marketing', 'increased-post-volume', 'magazine-features', 'radio-mentions', 'professional-photography', 'competitor-watch'],
        postsPerWeek: 'daily+',
        mediaAccess: true,
        replaces: ['The entire $1,000/mo marketing stack'],
      },
    },
  ];

  for (const tier of tiers) {
    await prisma.productBundle.upsert({
      where: { slug: tier.slug },
      update: { ...tier },
      create: { ...tier },
    });
  }

  console.log(`  ${tiers.length} DSD tiers seeded.`);

  // Log the final state
  const allBundles = await prisma.productBundle.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });
  console.log('\nActive bundles:');
  for (const b of allBundles) {
    console.log(`  ${b.name} — ${b.priceMonthly ? `$${b.priceMonthly / 100}/mo` : 'Free'} [${b.market}]`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
