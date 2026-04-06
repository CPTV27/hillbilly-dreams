/**
 * Constellation Seed Script
 *
 * Reads real data from TouringVenue, TouringHotel, TouringRestaurant,
 * CorridorCity, DirectoryBusiness, and TourRoute — then creates
 * ConstellationNode + ConstellationEdge records.
 *
 * Matches Cursor's schema:
 *   ConstellationNode: entityType, entityId, label, subtitle, metadata
 *   ConstellationEdge: fromType, fromId, toType, toId, relation, weight, metadata
 *
 * Run: pnpm --filter @bigmuddy/database run seed:constellation
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NEAR_THRESHOLD_MILES = 5;

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function clearConstellation() {
  console.log('Clearing existing constellation data...');
  await prisma.constellationEdge.deleteMany();
  await prisma.constellationNode.deleteMany();
}

async function seedNodes() {
  console.log('\n--- Seeding nodes ---');

  // 1. Corridor Cities
  const cities = await prisma.corridorCity.findMany();
  console.log(`  CorridorCity: ${cities.length}`);
  for (const c of cities) {
    await prisma.constellationNode.create({
      data: {
        entityType: 'city',
        entityId: String(c.id),
        label: `${c.name}, ${c.state}`,
        subtitle: c.role || undefined,
        metadata: {
          city: c.name,
          state: c.state,
          population: c.population,
          corridorOrder: c.corridorOrder,
          musicScene: c.musicScene,
        },
      },
    });
  }

  // 2. Touring Venues
  const venues = await prisma.touringVenue.findMany();
  console.log(`  TouringVenue: ${venues.length}`);
  for (const v of venues) {
    await prisma.constellationNode.create({
      data: {
        entityType: 'venue',
        entityId: String(v.id),
        label: v.name,
        subtitle: `${v.city}, ${v.state}`,
        metadata: {
          city: v.city,
          state: v.state,
          lat: v.lat,
          lng: v.lng,
          capacity: v.capacity,
          venueType: v.venueType,
          sprinterAccess: v.sprinterAccess,
          guaranteeLow: v.typicalGuaranteeLow,
          guaranteeHigh: v.typicalGuaranteeHigh,
        },
      },
    });
  }

  // 3. Touring Hotels
  const hotels = await prisma.touringHotel.findMany();
  console.log(`  TouringHotel: ${hotels.length}`);
  for (const h of hotels) {
    await prisma.constellationNode.create({
      data: {
        entityType: 'hotel',
        entityId: String(h.id),
        label: h.name,
        subtitle: `${h.city}, ${h.state}`,
        metadata: {
          city: h.city,
          state: h.state,
          lat: h.lat,
          lng: h.lng,
          rateLow: h.rateLow,
          rateHigh: h.rateHigh,
          bandFriendly: h.bandFriendly,
          sprinterParking: h.sprinterParking,
        },
      },
    });
  }

  // 4. Touring Restaurants
  const restaurants = await prisma.touringRestaurant.findMany();
  console.log(`  TouringRestaurant: ${restaurants.length}`);
  for (const r of restaurants) {
    await prisma.constellationNode.create({
      data: {
        entityType: 'restaurant',
        entityId: String(r.id),
        label: r.name,
        subtitle: `${r.city}, ${r.state}`,
        metadata: {
          city: r.city,
          state: r.state,
          cuisine: r.cuisine,
          priceRange: r.priceRange,
          lateNight: r.lateNight,
          musicianFriendly: r.musicianFriendly,
        },
      },
    });
  }

  // 5. Tour Routes
  const routes = await prisma.tourRoute.findMany();
  console.log(`  TourRoute: ${routes.length}`);
  for (const r of routes) {
    await prisma.constellationNode.create({
      data: {
        entityType: 'route',
        entityId: String(r.id),
        label: r.name,
        subtitle: r.seasonRecommendation || undefined,
        metadata: {
          totalMiles: r.totalMiles,
          estimatedDriveHours: r.estimatedDriveHours,
          bandSize: r.bandSize,
        },
      },
    });
  }

  // 6. Directory Businesses (active only)
  const businesses = await prisma.directoryBusiness.findMany({
    where: { active: true },
  });
  console.log(`  DirectoryBusiness (active): ${businesses.length}`);
  for (const b of businesses) {
    await prisma.constellationNode.create({
      data: {
        entityType: 'directory_business',
        entityId: String(b.id),
        label: b.name,
        subtitle: b.category || undefined,
        metadata: {
          city: b.city,
          state: b.state,
          lat: b.lat,
          lng: b.lng,
          category: b.category,
          tier: b.tier,
          googleRating: b.googleRating,
          yelpRating: b.yelpRating,
        },
      },
    });
  }

  // 7. Brand nodes (the 10 from Spatial Explorer)
  const brands = [
    { id: 'hdi', label: 'Hillbilly Dreams Inc', subtitle: '$160K revenue', meta: { revenue: 160000 } },
    { id: 'mbt', label: 'Measurably Better Things', subtitle: '9 modules · 122 models', meta: { modules: 9, models: 122 } },
    { id: 'touring', label: 'Big Muddy Touring', subtitle: '2:1 show multiplier', meta: { multiplier: 2.0 } },
    { id: 'magazine', label: 'Big Muddy Magazine', subtitle: '27 articles', meta: { articles: 27 } },
    { id: 'radio', label: 'Big Muddy Radio', subtitle: 'Streaming live', meta: { streaming: true } },
    { id: 'records', label: 'Big Muddy Records', subtitle: '$3K per release', meta: { perRelease: 3000 } },
    { id: 'dsd', label: 'Deep South Directory', subtitle: 'Free – $250/mo', meta: { tiers: ['Free', 'Core', 'Growth', 'Partner'] } },
    { id: 'inn', label: 'The Big Muddy Inn', subtitle: '6 rooms · Blues Room', meta: { rooms: 6, city: 'Natchez', state: 'MS' } },
    { id: 'bearsville', label: 'Bearsville Creative', subtitle: 'Woodstock, NY', meta: { status: 'summer_2026', city: 'Woodstock', state: 'NY' } },
    { id: 'gallery', label: 'Chase Pierson Photography', subtitle: '17,956 photos', meta: { photos: 17956 } },
  ];
  console.log(`  Brand nodes: ${brands.length}`);
  for (const b of brands) {
    await prisma.constellationNode.create({
      data: {
        entityType: 'brand',
        entityId: b.id,
        label: b.label,
        subtitle: b.subtitle,
        metadata: b.meta,
      },
    });
  }
}

async function seedEdges() {
  console.log('\n--- Seeding edges ---');
  let edgeCount = 0;

  async function addEdge(
    fromType: string,
    fromId: string | number,
    toType: string,
    toId: string | number,
    relation: string,
    weight = 1.0,
    metadata?: Record<string, unknown>,
  ) {
    try {
      await prisma.constellationEdge.create({
        data: {
          fromType,
          fromId: String(fromId),
          toType,
          toId: String(toId),
          relation,
          weight,
          metadata: metadata ?? undefined,
        },
      });
      edgeCount++;
    } catch {
      // duplicate — skip
    }
  }

  // 1. Brand hierarchy (HDI → MBT → brands)
  await addEdge('brand', 'hdi', 'brand', 'mbt', 'hierarchy');
  for (const id of ['touring', 'magazine', 'radio', 'records', 'dsd', 'inn', 'bearsville', 'gallery']) {
    await addEdge('brand', 'mbt', 'brand', id, 'hierarchy');
  }

  // 2. Flywheel
  const flywheel: [string, string][] = [
    ['touring', 'records'],
    ['records', 'radio'],
    ['radio', 'magazine'],
    ['magazine', 'dsd'],
    ['dsd', 'inn'],
    ['inn', 'touring'],
  ];
  for (const [s, t] of flywheel) {
    await addEdge('brand', s, 'brand', t, 'flywheel');
  }
  console.log(`  Brand hierarchy + flywheel: ${edgeCount}`);

  // 3. Venues → Cities (corridor_city)
  const venues = await prisma.touringVenue.findMany();
  const cities = await prisma.corridorCity.findMany();
  for (const v of venues) {
    const city = cities.find((c) => c.name === v.city && c.state === v.state);
    if (city) {
      await addEdge('venue', v.id, 'city', city.id, 'corridor_city');
    }
  }

  // 4. Hotels → Cities
  const hotels = await prisma.touringHotel.findMany();
  for (const h of hotels) {
    const city = cities.find((c) => c.name === h.city && c.state === h.state);
    if (city) {
      await addEdge('hotel', h.id, 'city', city.id, 'corridor_city');
    }
  }

  // 5. Restaurants → Cities
  const restaurants = await prisma.touringRestaurant.findMany();
  for (const r of restaurants) {
    const city = cities.find((c) => c.name === r.city && c.state === r.state);
    if (city) {
      await addEdge('restaurant', r.id, 'city', city.id, 'corridor_city');
    }
  }

  // 6. Proximity edges (venues near hotels/restaurants)
  const allNodes = await prisma.constellationNode.findMany();
  const geoNodes = allNodes.filter((n) => {
    const m = n.metadata as Record<string, unknown> | null;
    return m && typeof m.lat === 'number' && typeof m.lng === 'number';
  });
  for (let i = 0; i < geoNodes.length; i++) {
    for (let j = i + 1; j < geoNodes.length; j++) {
      const a = geoNodes[i];
      const b = geoNodes[j];
      if (a.entityType === b.entityType) continue;
      const am = a.metadata as Record<string, number>;
      const bm = b.metadata as Record<string, number>;
      const dist = haversine(am.lat, am.lng, bm.lat, bm.lng);
      if (dist <= NEAR_THRESHOLD_MILES) {
        let rel = 'proximity';
        if (
          (a.entityType === 'venue' && b.entityType === 'hotel') ||
          (a.entityType === 'hotel' && b.entityType === 'venue')
        ) rel = 'stays_near';
        if (
          (a.entityType === 'venue' && b.entityType === 'restaurant') ||
          (a.entityType === 'restaurant' && b.entityType === 'venue')
        ) rel = 'eats_near';

        await addEdge(a.entityType, a.entityId, b.entityType, b.entityId, rel, 1 - dist / NEAR_THRESHOLD_MILES, {
          distance_miles: Math.round(dist * 100) / 100,
        });
      }
    }
  }

  // 7. Tour route stops
  const routeStops = await prisma.tourRouteStop.findMany();
  for (const stop of routeStops) {
    if (stop.venueId) {
      await addEdge('route', stop.routeId, 'venue', stop.venueId, 'route_stop_venue', 1.0, {
        stopOrder: stop.stopOrder,
      });
    }
    if (stop.hotelId) {
      await addEdge('route', stop.routeId, 'hotel', stop.hotelId, 'route_stop_hotel', 1.0, {
        stopOrder: stop.stopOrder,
      });
    }
  }

  // 8. Route sequences (consecutive stops)
  const routeIds = [...new Set(routeStops.map((s) => s.routeId))];
  for (const rid of routeIds) {
    const stops = routeStops.filter((s) => s.routeId === rid).sort((a, b) => a.stopOrder - b.stopOrder);
    for (let i = 0; i < stops.length - 1; i++) {
      const curr = stops[i];
      const next = stops[i + 1];
      if (curr.venueId && next.venueId) {
        await addEdge('venue', curr.venueId, 'venue', next.venueId, 'route_sequence', 1.0, {
          routeId: rid,
          fromStop: curr.stopOrder,
          toStop: next.stopOrder,
        });
      }
    }
  }

  // 9. DirectoryBusiness links
  for (const v of venues) {
    if (v.directoryBusinessId) {
      await addEdge('venue', v.id, 'directory_business', v.directoryBusinessId, 'directory_link');
    }
  }
  for (const h of hotels) {
    if (h.directoryBusinessId) {
      await addEdge('hotel', h.id, 'directory_business', h.directoryBusinessId, 'directory_link');
    }
  }
  for (const r of restaurants) {
    if (r.directoryBusinessId) {
      await addEdge('restaurant', r.id, 'directory_business', r.directoryBusinessId, 'directory_link');
    }
  }

  console.log(`  Total edges created: ${edgeCount}`);
}

async function printStats() {
  const nodeCount = await prisma.constellationNode.count();
  const edgeCount = await prisma.constellationEdge.count();

  const nodesByType = await prisma.constellationNode.groupBy({
    by: ['entityType'],
    _count: true,
  });

  const edgesByType = await prisma.constellationEdge.groupBy({
    by: ['relation'],
    _count: true,
  });

  console.log('\n' + '='.repeat(60));
  console.log('  CONSTELLATION STATS');
  console.log('='.repeat(60));
  console.log(`\n  Total nodes: ${nodeCount}`);
  console.log(`  Total edges: ${edgeCount}`);
  console.log('\n  Nodes by type:');
  for (const g of nodesByType.sort((a, b) => b._count - a._count)) {
    console.log(`    ${g.entityType}: ${g._count}`);
  }
  console.log('\n  Edges by type:');
  for (const g of edgesByType.sort((a, b) => b._count - a._count)) {
    console.log(`    ${g.relation}: ${g._count}`);
  }
}

async function main() {
  console.log('🌟 HDI Constellation Seeder\n');
  try {
    await clearConstellation();
    await seedNodes();
    await seedEdges();
    await printStats();
    console.log('\n✅ Constellation seeded successfully.\n');
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
