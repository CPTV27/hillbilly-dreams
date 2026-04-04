import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

async function main() {
  const brands = await p.brand.findMany();
  const guides = await p.styleGuide.findMany();
  const contests = await p.contest.findMany();
  const features = await p.productFeature.count();
  const bundles = await p.productBundle.count();
  const mappings = await p.bundleFeature.count();

  console.log('\n=== SOVEREIGN STATE ===');
  console.log(`Brands: ${brands.length}`, brands.map(b => b.slug));
  console.log(`Style Guides: ${guides.length}`, guides.map(g => g.name));
  console.log(`Contests: ${contests.length}`, contests.map(c => `${c.title} [${c.status}]`));
  console.log(`Product Features: ${features}`);
  console.log(`Product Bundles: ${bundles}`);
  console.log(`Bundle-Feature Mappings: ${mappings}`);

  // Show features by category
  const featuresByCategory = await p.productFeature.groupBy({
    by: ['category'],
    _count: true,
  });
  console.log('\nFeatures by category:', featuresByCategory.map(f => `${f.category}: ${f._count}`));

  // Show bundles
  const allBundles = await p.productBundle.findMany({
    include: { features: { include: { feature: true } } },
    orderBy: { sortOrder: 'asc' },
  });
  for (const b of allBundles) {
    console.log(`\nBundle: ${b.name} [${b.market}] — ${b.features.length} features — price: ${b.priceMonthly ? `$${b.priceMonthly / 100}/mo` : 'TBD'}`);
  }
}

main().catch(console.error).finally(() => p.$disconnect());
