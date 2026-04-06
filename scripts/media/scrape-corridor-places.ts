/**
 * Corridor Places Scraper
 *
 * Queries Google Places API (New) for every corridor city across 4 categories:
 *   - Venues (live music, bars, event spaces)
 *   - Food (restaurants, cafes, BBQ)
 *   - Lodging (hotels, B&Bs, inns)
 *   - Interests (museums, parks, landmarks, galleries)
 *
 * Loads results into DirectoryBusiness with GPS, Google ratings, and category tags.
 * Skips duplicates (by googlePlaceId).
 *
 * Run: npx tsx scripts/media/scrape-corridor-places.ts
 * Requires: gcloud auth (uses access token, not API key)
 */

import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

// Get access token from gcloud CLI
function getAccessToken(): string {
  return execSync('/opt/homebrew/bin/gcloud auth print-access-token', { encoding: 'utf8' }).trim();
}

interface PlaceResult {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  location?: { latitude: number; longitude: number };
  rating?: number;
  userRatingCount?: number;
  types?: string[];
  primaryType?: string;
  websiteUri?: string;
  nationalPhoneNumber?: string;
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  googleMapsUri?: string;
}

interface SearchResponse {
  places?: PlaceResult[];
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

const SEARCH_CATEGORIES = [
  {
    name: 'Venues',
    category: 'Entertainment & Venues',
    queries: ['live music venue', 'bar with live music', 'event venue', 'concert hall', 'nightclub'],
    includedTypes: ['night_club', 'bar', 'event_venue'],
  },
  {
    name: 'Food',
    category: 'Food & Drink',
    queries: ['restaurant', 'bbq restaurant', 'cafe', 'fine dining', 'soul food'],
    includedTypes: ['restaurant', 'cafe', 'bakery', 'bar'],
  },
  {
    name: 'Lodging',
    category: 'Lodging',
    queries: ['hotel', 'bed and breakfast', 'inn', 'boutique hotel'],
    includedTypes: ['hotel', 'lodging', 'bed_and_breakfast'],
  },
  {
    name: 'Interests',
    category: 'Arts & Culture',
    queries: ['museum', 'art gallery', 'historic site', 'park', 'landmark', 'cultural center'],
    includedTypes: ['museum', 'art_gallery', 'park', 'tourist_attraction'],
  },
];

async function searchPlaces(
  query: string,
  city: string,
  state: string,
  token: string,
): Promise<PlaceResult[]> {
  const url = 'https://places.googleapis.com/v1/places:searchText';

  const body = {
    textQuery: `${query} in ${city}, ${state}`,
    maxResultCount: 20,
    languageCode: 'en',
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Goog-User-Project': 'bigmuddy-ff651',
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.primaryType,places.websiteUri,places.nationalPhoneNumber,places.regularOpeningHours,places.googleMapsUri',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`  API error for "${query}" in ${city}: ${res.status} ${err.slice(0, 200)}`);
      return [];
    }

    const data: SearchResponse = await res.json();
    return data.places || [];
  } catch (e) {
    console.error(`  Fetch error for "${query}" in ${city}:`, e);
    return [];
  }
}

async function upsertPlace(
  place: PlaceResult,
  category: string,
  subcategory: string,
  cityName: string,
  state: string,
  corridorCityId: number,
): Promise<boolean> {
  const googlePlaceId = place.id;
  if (!googlePlaceId) return false;

  // Check if already exists
  const existing = await prisma.directoryBusiness.findFirst({
    where: { googlePlaceId },
  });
  if (existing) return false;

  const name = place.displayName?.text || 'Unknown';
  const address = place.formattedAddress || '';
  const lat = place.location?.latitude || null;
  const lng = place.location?.longitude || null;
  const phone = place.nationalPhoneNumber || null;
  const website = place.websiteUri || null;
  const googleRating = place.rating || null;
  const googleReviewCount = place.userRatingCount || null;
  const hours = place.regularOpeningHours?.weekdayDescriptions || null;

  // Generate slug
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    + '-' + cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  await prisma.directoryBusiness.create({
    data: {
      name,
      slug,
      category,
      subcategory,
      city: cityName,
      state,
      address,
      lat,
      lng,
      phone,
      website,
      googlePlaceId,
      googleRating,
      googleReviewCount,
      hoursJson: hours ? JSON.stringify(hours) : null,
      description: `${name} in ${cityName}, ${state}`,
      contactName: 'Owner',
      contactEmail: `info@${slug.split('-').slice(0, 2).join('')}.com`,
      active: true,
      visibility: 'public',
      tier: 'free',
      corridorCityId,
    },
  });

  return true;
}

async function main() {
  console.log('🗺️  Corridor Places Scraper');
  console.log('='.repeat(60));

  const token = getAccessToken();
  let totalNew = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const city of CORRIDOR_CITIES) {
    console.log(`\n📍 ${city.name}, ${city.state}`);
    console.log('-'.repeat(40));

    for (const cat of SEARCH_CATEGORIES) {
      let catNew = 0;
      let catSkipped = 0;

      for (const query of cat.queries) {
        const places = await searchPlaces(query, city.name, city.state, token);

        for (const place of places) {
          try {
            const isNew = await upsertPlace(
              place,
              cat.category,
              query,
              city.name,
              city.state,
              city.id,
            );
            if (isNew) {
              catNew++;
              totalNew++;
            } else {
              catSkipped++;
              totalSkipped++;
            }
          } catch (e: any) {
            totalErrors++;
            if (totalErrors <= 5) {
              console.error(`  ERROR upserting ${place.displayName?.text}: ${e.message?.slice(0, 200)}`);
            }
          }
        }

        // Rate limiting — 100ms between queries
        await new Promise((r) => setTimeout(r, 100));
      }

      if (catNew > 0) {
        console.log(`  ${cat.name}: +${catNew} new (${catSkipped} existing)`);
      }
    }
  }

  // Also load into TouringVenue for venue-category results
  console.log('\n📊 Syncing venues to TouringVenue table...');
  const venueBusinesses = await prisma.directoryBusiness.findMany({
    where: {
      category: 'Entertainment & Venues',
      corridorCityId: { not: null },
    },
  });

  let venuesSynced = 0;
  for (const biz of venueBusinesses) {
    const existing = await prisma.touringVenue.findFirst({
      where: { directoryBusinessId: biz.id },
    });
    if (existing) continue;

    // Check by name + city too
    const byName = await prisma.touringVenue.findFirst({
      where: {
        name: { equals: biz.name, mode: 'insensitive' },
        city: { equals: biz.city, mode: 'insensitive' },
      },
    });
    if (byName) {
      // Link existing venue to directory business
      await prisma.touringVenue.update({
        where: { id: byName.id },
        data: { directoryBusinessId: biz.id },
      });
      continue;
    }

    await prisma.touringVenue.create({
      data: {
        name: biz.name,
        slug: biz.slug,
        city: biz.city,
        state: biz.state,
        address: biz.address,
        lat: biz.lat,
        lng: biz.lng,
        venueType: biz.subcategory || 'bar',
        isPublic: true,
        directoryBusinessId: biz.id,
      },
    });
    venuesSynced++;
  }
  console.log(`  Synced ${venuesSynced} new venues to TouringVenue`);

  // Sync lodging to TouringHotel
  console.log('\n🏨 Syncing lodging to TouringHotel table...');
  const lodgingBusinesses = await prisma.directoryBusiness.findMany({
    where: {
      category: 'Lodging',
      corridorCityId: { not: null },
    },
  });

  let hotelsSynced = 0;
  for (const biz of lodgingBusinesses) {
    const existing = await prisma.touringHotel.findFirst({
      where: {
        OR: [
          { directoryBusinessId: biz.id },
          {
            name: { equals: biz.name, mode: 'insensitive' },
            city: { equals: biz.city, mode: 'insensitive' },
          },
        ],
      },
    });
    if (existing) continue;

    await prisma.touringHotel.create({
      data: {
        name: biz.name,
        city: biz.city,
        state: biz.state,
        address: biz.address,
        lat: biz.lat,
        lng: biz.lng,
        isPublic: true,
        directoryBusinessId: biz.id,
      },
    });
    hotelsSynced++;
  }
  console.log(`  Synced ${hotelsSynced} new hotels to TouringHotel`);

  // Sync food to TouringRestaurant
  console.log('\n🍽️  Syncing food to TouringRestaurant table...');
  const foodBusinesses = await prisma.directoryBusiness.findMany({
    where: {
      category: 'Food & Drink',
      corridorCityId: { not: null },
    },
  });

  let restaurantsSynced = 0;
  for (const biz of foodBusinesses) {
    const existing = await prisma.touringRestaurant.findFirst({
      where: {
        OR: [
          { directoryBusinessId: biz.id },
          {
            name: { equals: biz.name, mode: 'insensitive' },
            city: { equals: biz.city, mode: 'insensitive' },
          },
        ],
      },
    });
    if (existing) continue;

    await prisma.touringRestaurant.create({
      data: {
        name: biz.name,
        city: biz.city,
        state: biz.state,
        address: biz.address,
        cuisine: biz.subcategory || 'American',
        isPublic: true,
        directoryBusinessId: biz.id,
        corridorCityId: biz.corridorCityId,
      },
    });
    restaurantsSynced++;
  }
  console.log(`  Synced ${restaurantsSynced} new restaurants to TouringRestaurant`);

  console.log('\n' + '='.repeat(60));
  console.log(`✅ DONE`);
  console.log(`   New businesses: ${totalNew}`);
  console.log(`   Skipped (existing): ${totalSkipped}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Venues synced: ${venuesSynced}`);
  console.log(`   Hotels synced: ${hotelsSynced}`);
  console.log(`   Restaurants synced: ${restaurantsSynced}`);

  const totalBiz = await prisma.directoryBusiness.count();
  const totalVenues = await prisma.touringVenue.count();
  const totalHotels = await prisma.touringHotel.count();
  const totalRestaurants = await prisma.touringRestaurant.count();
  console.log(`\n   DB totals: ${totalBiz} businesses, ${totalVenues} venues, ${totalHotels} hotels, ${totalRestaurants} restaurants`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
