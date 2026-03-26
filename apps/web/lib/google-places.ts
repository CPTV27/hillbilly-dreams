// lib/google-places.ts
// Google Places API enrichment service for the Deep South Directory.
// Uses the Places API (New) via REST for business discovery and enrichment.
//
// Cost: ~$0 with Google's $200/mo free Maps Platform credit (~10,000 lookups)

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

export interface PlacesEnrichmentResult {
  googlePlaceId: string;
  name: string;
  address: string;
  phone: string | null;
  lat: number;
  lng: number;
  rating: number | null;
  reviewCount: number | null;
  hours: Record<string, { open: string; close: string }> | null;
  photoReferences: string[];
  website: string | null;
  businessStatus: string;
  types: string[];
}

/**
 * Search Google Places for a business by name and city.
 * Uses Text Search (New) for the best match accuracy.
 */
export async function enrichBusinessFromPlaces(
  name: string,
  city: string,
  state: string
): Promise<PlacesEnrichmentResult | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn('[google-places] GOOGLE_MAPS_API_KEY not set, skipping enrichment');
    return null;
  }

  const query = `${name} in ${city}, ${state}`;

  const response = await fetch(
    'https://places.googleapis.com/v1/places:searchText',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask':
          'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,' +
          'places.location,places.rating,places.userRatingCount,places.regularOpeningHours,' +
          'places.photos,places.websiteUri,places.businessStatus,places.types',
      },
      body: JSON.stringify({ textQuery: query, maxResultCount: 1 }),
    }
  );

  if (!response.ok) {
    console.error(`[google-places] Text Search failed (${response.status}):`, await response.text());
    return null;
  }

  const data = await response.json();
  const place = data.places?.[0];
  if (!place) return null;

  return mapPlaceToResult(place);
}

/**
 * Discover businesses near a geographic point.
 * Uses Nearby Search (New) with category filtering.
 */
export async function discoverBusinessesNearby(
  lat: number,
  lng: number,
  radiusMeters: number,
  includedTypes?: string[]
): Promise<PlacesEnrichmentResult[]> {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn('[google-places] GOOGLE_MAPS_API_KEY not set, skipping discovery');
    return [];
  }

  const body: Record<string, unknown> = {
    locationRestriction: {
      circle: {
        center: { latitude: lat, longitude: lng },
        radius: radiusMeters,
      },
    },
    maxResultCount: 20,
  };

  if (includedTypes?.length) {
    body.includedTypes = includedTypes;
  }

  const response = await fetch(
    'https://places.googleapis.com/v1/places:searchNearby',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask':
          'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,' +
          'places.location,places.rating,places.userRatingCount,places.regularOpeningHours,' +
          'places.photos,places.websiteUri,places.businessStatus,places.types',
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    console.error(`[google-places] Nearby Search failed (${response.status}):`, await response.text());
    return [];
  }

  const data = await response.json();
  return (data.places || [])
    .filter((p: Record<string, unknown>) => p.businessStatus === 'OPERATIONAL')
    .map(mapPlaceToResult);
}

/**
 * Map a Google Places API response to our standard result type.
 */
function mapPlaceToResult(place: Record<string, unknown>): PlacesEnrichmentResult {
  const location = place.location as { latitude: number; longitude: number } | undefined;
  const displayName = place.displayName as { text: string } | undefined;
  const hours = place.regularOpeningHours as { periods?: Array<{ open: { day: number; hour: number; minute: number }; close?: { day: number; hour: number; minute: number } }> } | undefined;

  // Parse hours into our simple format
  let parsedHours: Record<string, { open: string; close: string }> | null = null;
  if (hours?.periods) {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    parsedHours = {};
    for (const period of hours.periods) {
      const dayName = dayNames[period.open.day];
      if (dayName && period.close) {
        parsedHours[dayName] = {
          open: `${String(period.open.hour).padStart(2, '0')}:${String(period.open.minute).padStart(2, '0')}`,
          close: `${String(period.close.hour).padStart(2, '0')}:${String(period.close.minute).padStart(2, '0')}`,
        };
      }
    }
  }

  // Extract photo references (first 3)
  const photos = (place.photos as Array<{ name: string }> | undefined) || [];
  const photoReferences = photos.slice(0, 3).map((p) => p.name);

  return {
    googlePlaceId: place.id as string,
    name: displayName?.text || '',
    address: (place.formattedAddress as string) || '',
    phone: (place.nationalPhoneNumber as string) || null,
    lat: location?.latitude || 0,
    lng: location?.longitude || 0,
    rating: (place.rating as number) || null,
    reviewCount: (place.userRatingCount as number) || null,
    hours: parsedHours,
    photoReferences,
    website: (place.websiteUri as string) || null,
    businessStatus: (place.businessStatus as string) || 'OPERATIONAL',
    types: (place.types as string[]) || [],
  };
}

/**
 * Map Google Places types to our DirectoryBusiness categories.
 */
export function mapPlacesTypeToCategory(types: string[]): { category: string; subcategory: string | null } {
  const typeSet = new Set(types);

  if (typeSet.has('restaurant') || typeSet.has('cafe') || typeSet.has('bakery') || typeSet.has('bar')) {
    const sub = typeSet.has('bar') ? 'Bar' : typeSet.has('cafe') ? 'Cafe' : typeSet.has('bakery') ? 'Bakery' : 'Restaurant';
    return { category: 'Food & Drink', subcategory: sub };
  }
  if (typeSet.has('lodging') || typeSet.has('hotel')) {
    return { category: 'Lodging', subcategory: typeSet.has('hotel') ? 'Hotel' : 'Inn/B&B' };
  }
  if (typeSet.has('art_gallery') || typeSet.has('museum') || typeSet.has('performing_arts_theater')) {
    return { category: 'Arts & Culture', subcategory: typeSet.has('museum') ? 'Museum' : typeSet.has('art_gallery') ? 'Gallery' : 'Venue' };
  }
  if (typeSet.has('book_store') || typeSet.has('clothing_store') || typeSet.has('shopping_mall') || typeSet.has('store')) {
    return { category: 'Retail', subcategory: typeSet.has('book_store') ? 'Bookshop' : typeSet.has('clothing_store') ? 'Clothing' : 'General' };
  }

  return { category: 'Services', subcategory: null };
}

/**
 * Generate a URL-safe slug from a business name and city.
 */
export function generateSlug(name: string, city: string): string {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

  return `${slugify(name)}-${slugify(city)}`;
}
