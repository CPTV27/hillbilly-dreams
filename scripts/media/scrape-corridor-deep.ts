/**
 * Deep South Data Sprint — Expanded Corridor Scraper
 *
 * Round 2: Region-specific queries that Google Places generic search missed.
 * Juke joints, blues clubs, soul food, antebellum homes, civil rights sites,
 * B&Bs, catfish houses, po'boy shops, art galleries, Natchez Trace stops.
 *
 * Run: npx tsx scripts/media/scrape-corridor-deep.ts
 */

import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

function getAccessToken(): string {
  return execSync('/opt/homebrew/bin/gcloud auth print-access-token', { encoding: 'utf8' }).trim();
}

const CORRIDOR_CITIES = [
  { name: 'New Orleans', state: 'LA', id: 1 },
  { name: 'Baton Rouge', state: 'LA', id: 2 },
  { name: 'Natchez', state: 'MS', id: 3 },
  { name: 'Vicksburg', state: 'MS', id: 4 },
  { name: 'Jackson', state: 'MS', id: 5 },
  { name: 'Greenville', state: 'MS', id: 6 },
  { name: 'Greenwood', state: 'MS', id: 7 },
  { name: 'Indianola', state: 'MS', id: 8 },
  { name: 'Clarksdale', state: 'MS', id: 9 },
  { name: 'Holly Springs', state: 'MS', id: 10 },
  { name: 'Tupelo', state: 'MS', id: 11 },
  { name: 'Oxford', state: 'MS', id: 12 },
  { name: 'Memphis', state: 'TN', id: 13 },
];

// Deep South-specific searches
const DEEP_SOUTH_QUERIES = [
  // Venues
  { queries: ['juke joint', 'blues club', 'honky tonk', 'jazz club', 'live music bar', 'outdoor amphitheater', 'community theater'], category: 'Entertainment & Venues', subcategory: 'music' },
  // Food — regional specialties
  { queries: ['soul food', 'catfish restaurant', 'bbq smokehouse', 'po boy shop', 'tamale shop', 'Southern cooking', 'fried chicken', 'crawfish', 'diner', 'bakery', 'ice cream', 'coffee shop'], category: 'Food & Drink', subcategory: 'regional' },
  // Lodging — regional types
  { queries: ['bed and breakfast', 'plantation inn', 'boutique hotel', 'historic hotel', 'RV park', 'campground', 'cabin rental'], category: 'Lodging', subcategory: 'regional' },
  // History & Culture
  { queries: ['civil rights museum', 'civil rights landmark', 'antebellum home tour', 'historic plantation', 'history museum', 'heritage site', 'African American heritage'], category: 'Arts & Culture', subcategory: 'history' },
  // Arts
  { queries: ['art gallery', 'artist studio', 'pottery studio', 'folk art', 'craft gallery', 'photography gallery'], category: 'Arts & Culture', subcategory: 'arts' },
  // Nature & Outdoors
  { queries: ['state park', 'nature trail', 'river overlook', 'Natchez Trace', 'wildlife refuge', 'botanical garden', 'fishing pier'], category: 'Outdoors & Nature', subcategory: 'nature' },
  // Shopping & Specialty
  { queries: ['antique shop', 'bookstore', 'gift shop', 'specialty store', 'farmers market'], category: 'Retail & Shopping', subcategory: 'specialty' },
  // Services / Professional
  { queries: ['recording studio', 'photography studio', 'event planner', 'wedding venue', 'coworking space'], category: 'Services', subcategory: 'creative' },
];

async function searchPlaces(query: string, city: string, state: string, token: string) {
  const url = 'https://places.googleapis.com/v1/places:searchText';
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Goog-User-Project': 'bigmuddy-ff651',
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.websiteUri,places.nationalPhoneNumber,places.regularOpeningHours',
      },
      body: JSON.stringify({
        textQuery: `${query} in ${city}, ${state}`,
        maxResultCount: 20,
        languageCode: 'en',
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.places || [];
  } catch { return []; }
}

async function upsertPlace(place: any, category: string, subcategory: string, cityName: string, state: string, corridorCityId: number): Promise<boolean> {
  const googlePlaceId = place.id;
  if (!googlePlaceId) return false;

  const existing = await prisma.directoryBusiness.findFirst({ where: { googlePlaceId } });
  if (existing) return false;

  const name = place.displayName?.text || 'Unknown';
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Check slug uniqueness
  const slugExists = await prisma.directoryBusiness.findFirst({ where: { slug } });
  const finalSlug = slugExists ? slug + '-' + Math.random().toString(36).slice(2, 6) : slug;

  await prisma.directoryBusiness.create({
    data: {
      name,
      slug: finalSlug,
      category,
      subcategory,
      city: cityName,
      state,
      address: place.formattedAddress || '',
      lat: place.location?.latitude || null,
      lng: place.location?.longitude || null,
      phone: place.nationalPhoneNumber || null,
      website: place.websiteUri || null,
      googlePlaceId,
      googleRating: place.rating || null,
      googleReviewCount: place.userRatingCount || null,
      hoursJson: place.regularOpeningHours?.weekdayDescriptions ? JSON.stringify(place.regularOpeningHours.weekdayDescriptions) : null,
      description: `${name} in ${cityName}, ${state}`,
      contactName: 'Owner',
      contactEmail: `info@${name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15)}.com`,
      active: true,
      visibility: 'public',
      tier: 'free',
      corridorCityId,
    },
  });
  return true;
}

async function main() {
  console.log('🎸 Deep South Data Sprint — Expanded Scraper');
  console.log('='.repeat(60));

  const token = getAccessToken();
  let totalNew = 0;
  let totalSkipped = 0;

  for (const city of CORRIDOR_CITIES) {
    console.log(`\n📍 ${city.name}, ${city.state}`);

    for (const group of DEEP_SOUTH_QUERIES) {
      let groupNew = 0;
      for (const query of group.queries) {
        const places = await searchPlaces(query, city.name, city.state, token);
        for (const place of places) {
          try {
            const isNew = await upsertPlace(place, group.category, group.subcategory, city.name, city.state, city.id);
            if (isNew) { groupNew++; totalNew++; }
            else { totalSkipped++; }
          } catch { /* skip */ }
        }
        await new Promise(r => setTimeout(r, 80));
      }
      if (groupNew > 0) console.log(`  ${group.category} (${group.subcategory}): +${groupNew}`);
    }
  }

  // Sync new venues, hotels, restaurants to touring tables
  console.log('\n📊 Syncing to touring tables...');

  const newVenues = await prisma.directoryBusiness.findMany({
    where: { category: 'Entertainment & Venues', corridorCityId: { not: null } },
  });
  let vSync = 0;
  for (const biz of newVenues) {
    const exists = await prisma.touringVenue.findFirst({
      where: { OR: [{ directoryBusinessId: biz.id }, { name: { equals: biz.name, mode: 'insensitive' }, city: { equals: biz.city, mode: 'insensitive' } }] },
    });
    if (exists) continue;
    await prisma.touringVenue.create({
      data: { name: biz.name, slug: biz.slug, city: biz.city, state: biz.state, address: biz.address, lat: biz.lat, lng: biz.lng, venueType: biz.subcategory || 'bar', isPublic: true, directoryBusinessId: biz.id },
    });
    vSync++;
  }

  const newLodging = await prisma.directoryBusiness.findMany({
    where: { category: 'Lodging', corridorCityId: { not: null } },
  });
  let hSync = 0;
  for (const biz of newLodging) {
    const exists = await prisma.touringHotel.findFirst({
      where: { OR: [{ directoryBusinessId: biz.id }, { name: { equals: biz.name, mode: 'insensitive' }, city: { equals: biz.city, mode: 'insensitive' } }] },
    });
    if (exists) continue;
    await prisma.touringHotel.create({
      data: { name: biz.name, city: biz.city, state: biz.state, address: biz.address, lat: biz.lat, lng: biz.lng, isPublic: true, directoryBusinessId: biz.id },
    });
    hSync++;
  }

  const newFood = await prisma.directoryBusiness.findMany({
    where: { category: 'Food & Drink', corridorCityId: { not: null } },
  });
  let rSync = 0;
  for (const biz of newFood) {
    const exists = await prisma.touringRestaurant.findFirst({
      where: { OR: [{ directoryBusinessId: biz.id }, { name: { equals: biz.name, mode: 'insensitive' }, city: { equals: biz.city, mode: 'insensitive' } }] },
    });
    if (exists) continue;
    await prisma.touringRestaurant.create({
      data: { name: biz.name, city: biz.city, state: biz.state, address: biz.address, cuisine: biz.subcategory || 'Southern', isPublic: true, directoryBusinessId: biz.id, corridorCityId: biz.corridorCityId },
    });
    rSync++;
  }

  console.log(`  Venues: +${vSync} | Hotels: +${hSync} | Restaurants: +${rSync}`);

  const totalBiz = await prisma.directoryBusiness.count();
  const totalV = await prisma.touringVenue.count();
  const totalH = await prisma.touringHotel.count();
  const totalR = await prisma.touringRestaurant.count();

  console.log('\n' + '='.repeat(60));
  console.log(`✅ New: ${totalNew} | Skipped: ${totalSkipped}`);
  console.log(`📊 DB totals: ${totalBiz} businesses | ${totalV} venues | ${totalH} hotels | ${totalR} restaurants`);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
