// apps/web/lib/touring-to-directory.ts
// Bridge between Touring data and the Deep South Directory.
// Creates DirectoryBusiness records from TouringVenue, TouringHotel, and TouringRestaurant,
// then links them via directoryBusinessId.

import { prisma } from '@bigmuddy/database';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const CATEGORY_MAP = {
  venue: 'Entertainment / Live Music',
  hotel: 'Lodging',
  restaurant: 'Food & Drink',
} as const;

interface SyncResult {
  created: number;
  linked: number;
  skipped: number;
  errors: string[];
}

/**
 * Sync touring venues to DirectoryBusiness records.
 * Creates new directory entries for venues that don't already have one.
 */
async function syncVenues(): Promise<SyncResult> {
  const result: SyncResult = { created: 0, linked: 0, skipped: 0, errors: [] };

  const venues = await prisma.touringVenue.findMany({
    where: { directoryBusinessId: null, isPublic: true },
  });

  for (const venue of venues) {
    try {
      const slug = `${slugify(venue.name)}-${slugify(venue.city)}`;

      // Check if a directory entry already exists for this slug
      const existing = await prisma.directoryBusiness.findUnique({ where: { slug } });

      if (existing) {
        // Link the existing entry
        await prisma.touringVenue.update({
          where: { id: venue.id },
          data: { directoryBusinessId: existing.id },
        });
        result.linked++;
        continue;
      }

      // Create new directory entry
      const biz = await prisma.directoryBusiness.create({
        data: {
          name: venue.name,
          slug,
          category: CATEGORY_MAP.venue,
          subcategory: venue.venueType === 'juke_joint' ? 'Juke Joint' : 'Live Music Venue',
          city: venue.city,
          state: venue.state,
          address: venue.address,
          lat: venue.lat,
          lng: venue.lng,
          description: venue.notes || `Live music venue in ${venue.city}, ${venue.state}. Capacity: ${venue.capacity || 'varies'}.`,
          contactName: venue.bookingContactName || 'Booking',
          contactEmail: venue.bookingContactEmail || 'info@bigmuddytouring.com',
          tier: 'free',
          active: true,
          visibility: 'approved',
          corridorCityId: null, // Will be linked in a separate pass if needed
        },
      });

      await prisma.touringVenue.update({
        where: { id: venue.id },
        data: { directoryBusinessId: biz.id },
      });

      result.created++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      result.errors.push(`Venue ${venue.name}: ${msg}`);
    }
  }

  return result;
}

/**
 * Sync touring hotels to DirectoryBusiness records.
 */
async function syncHotels(): Promise<SyncResult> {
  const result: SyncResult = { created: 0, linked: 0, skipped: 0, errors: [] };

  const hotels = await prisma.touringHotel.findMany({
    where: { directoryBusinessId: null, isPublic: true },
  });

  for (const hotel of hotels) {
    try {
      const slug = `${slugify(hotel.name)}-${slugify(hotel.city)}`;

      const existing = await prisma.directoryBusiness.findUnique({ where: { slug } });

      if (existing) {
        await prisma.touringHotel.update({
          where: { id: hotel.id },
          data: { directoryBusinessId: existing.id },
        });
        result.linked++;
        continue;
      }

      const biz = await prisma.directoryBusiness.create({
        data: {
          name: hotel.name,
          slug,
          category: CATEGORY_MAP.hotel,
          city: hotel.city,
          state: hotel.state,
          address: hotel.address,
          lat: hotel.lat,
          lng: hotel.lng,
          phone: hotel.phone,
          website: hotel.website,
          description: hotel.notes || `Accommodations in ${hotel.city}, ${hotel.state}.`,
          contactName: 'Front Desk',
          contactEmail: 'info@bigmuddytouring.com',
          tier: 'free',
          active: true,
          visibility: 'approved',
        },
      });

      await prisma.touringHotel.update({
        where: { id: hotel.id },
        data: { directoryBusinessId: biz.id },
      });

      result.created++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      result.errors.push(`Hotel ${hotel.name}: ${msg}`);
    }
  }

  return result;
}

/**
 * Sync touring restaurants to DirectoryBusiness records.
 */
async function syncRestaurants(): Promise<SyncResult> {
  const result: SyncResult = { created: 0, linked: 0, skipped: 0, errors: [] };

  const restaurants = await prisma.touringRestaurant.findMany({
    where: { directoryBusinessId: null, isPublic: true },
  });

  for (const rest of restaurants) {
    try {
      const slug = `${slugify(rest.name)}-${slugify(rest.city)}`;

      const existing = await prisma.directoryBusiness.findUnique({ where: { slug } });

      if (existing) {
        await prisma.touringRestaurant.update({
          where: { id: rest.id },
          data: { directoryBusinessId: existing.id },
        });
        result.linked++;
        continue;
      }

      const biz = await prisma.directoryBusiness.create({
        data: {
          name: rest.name,
          slug,
          category: CATEGORY_MAP.restaurant,
          subcategory: rest.cuisine,
          city: rest.city,
          state: rest.state,
          address: rest.address,
          phone: rest.phone,
          website: rest.website,
          description: rest.musicianNotes || `${rest.cuisine || 'Restaurant'} in ${rest.city}, ${rest.state}. ${rest.lateNight ? 'Open late.' : ''}`,
          contactName: 'Manager',
          contactEmail: 'info@bigmuddytouring.com',
          tier: 'free',
          active: true,
          visibility: 'approved',
          corridorCityId: rest.corridorCityId,
        },
      });

      await prisma.touringRestaurant.update({
        where: { id: rest.id },
        data: { directoryBusinessId: biz.id },
      });

      result.created++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      result.errors.push(`Restaurant ${rest.name}: ${msg}`);
    }
  }

  return result;
}

/**
 * Link DirectoryBusiness records to their CorridorCity based on city/state match.
 */
async function linkCorridorCities(): Promise<{ linked: number }> {
  const cities = await prisma.corridorCity.findMany();
  let linked = 0;

  for (const city of cities) {
    const count = await prisma.directoryBusiness.updateMany({
      where: {
        city: city.name,
        state: city.state,
        corridorCityId: null,
      },
      data: { corridorCityId: city.id },
    });
    linked += count.count;
  }

  return { linked };
}

/**
 * Main sync function — runs all three entity types + corridor city linking.
 */
export async function syncTouringToDirectory(): Promise<{
  venues: SyncResult;
  hotels: SyncResult;
  restaurants: SyncResult;
  corridorCities: { linked: number };
}> {
  const venues = await syncVenues();
  const hotels = await syncHotels();
  const restaurants = await syncRestaurants();
  const corridorCities = await linkCorridorCities();

  console.log('[Touring→Directory] Sync complete:', {
    venues: `${venues.created} created, ${venues.linked} linked`,
    hotels: `${hotels.created} created, ${hotels.linked} linked`,
    restaurants: `${restaurants.created} created, ${restaurants.linked} linked`,
    corridorCities: `${corridorCities.linked} linked`,
    errors: [...venues.errors, ...hotels.errors, ...restaurants.errors],
  });

  return { venues, hotels, restaurants, corridorCities };
}
