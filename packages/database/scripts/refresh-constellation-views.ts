/**
 * Refreshes constellation materialized views after seed or bulk edge updates.
 * Run: pnpm --filter @bigmuddy/database exec tsx scripts/refresh-constellation-views.ts
 */
import { prisma } from '../index';

async function main() {
  const views = [
    'constellation_mv_node_degree',
    'constellation_mv_city_digest',
    'constellation_mv_route_stats',
    'constellation_mv_directory_fanout',
  ] as const;

  for (const v of views) {
    await prisma.$executeRawUnsafe(`REFRESH MATERIALIZED VIEW "${v}"`);
    console.log(`Refreshed ${v}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
