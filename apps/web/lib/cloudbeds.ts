// lib/cloudbeds.ts
// Cloudbeds PMS API client for The Big Muddy Inn (6 rooms, Natchez MS)
// Uses property-level API key (cbat_*) — no OAuth needed for single property
// Docs: https://hotels.cloudbeds.com/api/v1.2/docs/

// ── Configuration ──

const API_BASE = process.env.CLOUDBEDS_API_BASE || 'https://hotels.cloudbeds.com/api/v1.2';
const API_KEY = process.env.CLOUDBEDS_API_KEY || '';
const PROPERTY_ID = process.env.CLOUDBEDS_PROPERTY_ID || '';

const TOTAL_ROOMS = 6; // The Big Muddy Inn room count

// ── Types ──

export interface CloudbedsRoom {
  roomTypeID: number;
  roomTypeName: string;
  roomTypeNameShort: string;
  maxGuests: number;
  adultsIncluded: number;
  childrenIncluded: number;
  roomsAvailable: number;
  roomTypeDescription: string;
  roomTypePhotos: string[];
}

export interface CloudbedsRatePlan {
  ratePlanID: number;
  ratePlanName: string;
  roomTypeID: number;
  rates: Record<string, {
    rate: number;
    roomsAvailable: number;
    minLOS: number;
    maxLOS: number;
    closedToArrival: boolean;
    closedToDeparture: boolean;
    stopSell: boolean;
  }>;
}

export interface CloudbedsReservation {
  reservationID: string;
  propertyID: string;
  status: 'confirmed' | 'not_confirmed' | 'canceled' | 'checked_in' | 'checked_out' | 'no_show';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  startDate: string;
  endDate: string;
  roomTypeName: string;
  roomTypeID: number;
  totalAmount: number;
  balanceDue: number;
  source: string;
  dateCreated: string;
}

export interface CloudbedsHotelDetails {
  propertyID: string;
  propertyName: string;
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  propertyCountry: string;
  propertyTimezone: string;
  propertyCurrency: string;
  propertyEmail: string;
  propertyPhone: string;
}

export interface RateUpdate {
  roomTypeID: string;
  ratePlanID: string;
  startDate: string;
  endDate: string;
  rate?: number;
  minLOS?: number;
  maxLOS?: number;
  closedToArrival?: boolean;
  closedToDeparture?: boolean;
  stopSell?: boolean;
}

export interface OccupancyMetrics {
  occupancyRate: number;      // 0-100
  revenueMTD: number;         // dollars
  revenueYTD: number;         // dollars
  adr: number;                // average daily rate
  revpar: number;             // revenue per available room
  bookedRoomNights: number;
  availableRoomNights: number;
  totalReservations: number;
}

// ── Core API Client ──

class CloudbedsError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'CloudbedsError';
    this.status = status;
  }
}

async function api<T = unknown>(
  endpoint: string,
  options?: RequestInit & { params?: Record<string, string> }
): Promise<T> {
  if (!API_KEY) {
    throw new CloudbedsError('CLOUDBEDS_API_KEY not configured', 503);
  }

  // Build URL with query params
  const url = new URL(`${API_BASE}/${endpoint}`);
  if (options?.params) {
    for (const [key, val] of Object.entries(options.params)) {
      if (val) url.searchParams.set(key, val);
    }
  }
  // Always include propertyID for reads
  if (!url.searchParams.has('propertyID') && PROPERTY_ID) {
    url.searchParams.set('propertyID', PROPERTY_ID);
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  // Rate limit handling
  const remaining = res.headers.get('X-RateLimit-Remaining');
  if (remaining && parseInt(remaining) < 10) {
    console.warn(`[cloudbeds] Rate limit warning: ${remaining} requests remaining`);
  }

  if (res.status === 429) {
    const reset = res.headers.get('X-RateLimit-Reset');
    throw new CloudbedsError(
      `Rate limited. Resets at ${reset || 'unknown'}`,
      429
    );
  }

  if (!res.ok) {
    const text = await res.text();
    throw new CloudbedsError(`${res.status}: ${text}`, res.status);
  }

  const json = await res.json();
  return json.data ?? json;
}

// ── Hotel Details ──

export async function getHotelDetails(): Promise<CloudbedsHotelDetails> {
  return api<CloudbedsHotelDetails>('getHotelDetails');
}

// ── Rooms & Room Types ──

export async function getRoomTypes(): Promise<CloudbedsRoom[]> {
  return api<CloudbedsRoom[]>('getRoomTypes');
}

// ── Rates & Availability ──

export async function getRatePlans(
  startDate: string,
  endDate: string
): Promise<CloudbedsRatePlan[]> {
  return api<CloudbedsRatePlan[]>('getRatePlans', {
    params: { detailedRates: 'true', startDate, endDate },
  });
}

export async function getAvailability(
  startDate: string,
  endDate: string
): Promise<Record<string, { roomsAvailable: number; roomTypeID: number }>> {
  const plans = await getRatePlans(startDate, endDate);
  const availability: Record<string, { roomsAvailable: number; roomTypeID: number }> = {};

  for (const plan of plans) {
    for (const [date, info] of Object.entries(plan.rates)) {
      if (!availability[date] || info.roomsAvailable < availability[date].roomsAvailable) {
        availability[date] = {
          roomsAvailable: info.roomsAvailable,
          roomTypeID: plan.roomTypeID,
        };
      }
    }
  }

  return availability;
}

/**
 * Update rates for specific dates/rooms.
 * Max 30 date intervals per call. Returns a jobReferenceID (async processing).
 */
export async function updateRates(updates: RateUpdate[]): Promise<{ jobReferenceID: string }> {
  if (updates.length > 30) {
    throw new CloudbedsError('Max 30 rate updates per call', 400);
  }

  return api<{ jobReferenceID: string }>('patchRate', {
    method: 'PATCH',
    body: JSON.stringify({
      propertyID: PROPERTY_ID,
      updates,
    }),
  });
}

// ── Reservations ──

export async function getReservations(params?: {
  status?: string;
  checkInFrom?: string;
  checkInTo?: string;
  checkOutFrom?: string;
  checkOutTo?: string;
  pageSize?: string;
  pageNumber?: string;
}): Promise<CloudbedsReservation[]> {
  return api<CloudbedsReservation[]>('getReservations', {
    params: params as Record<string, string>,
  });
}

export async function getReservation(
  reservationID: string
): Promise<CloudbedsReservation> {
  return api<CloudbedsReservation>('getReservation', {
    params: { reservationID },
  });
}

// ── Guest Operations ──

export async function getGuest(guestID: string) {
  return api('getGuest', { params: { guestID } });
}

// ── Webhook Registration ──

export async function registerWebhook(
  endpointUrl: string,
  event: string
): Promise<{ success: boolean }> {
  return api<{ success: boolean }>('postWebhook', {
    method: 'POST',
    body: JSON.stringify({
      propertyID: PROPERTY_ID,
      endpointUrl,
      event,
    }),
  });
}

// ── Metrics Calculation ──

/**
 * Calculate occupancy and revenue metrics from reservation data.
 * This is the core function that feeds the $760k dashboard.
 */
export async function calculateOccupancyMetrics(): Promise<OccupancyMetrics> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  // Fetch reservations for trailing 30 days (for occupancy)
  const recentReservations = await getReservations({
    checkInFrom: thirtyDaysAgo.toISOString().split('T')[0],
    checkInTo: now.toISOString().split('T')[0],
    status: 'confirmed',
  });

  // Fetch reservations for current month (for MTD revenue)
  const mtdReservations = await getReservations({
    checkInFrom: startOfMonth.toISOString().split('T')[0],
    checkInTo: now.toISOString().split('T')[0],
  });

  // Fetch reservations for year (for YTD revenue)
  const ytdReservations = await getReservations({
    checkInFrom: startOfYear.toISOString().split('T')[0],
    checkInTo: now.toISOString().split('T')[0],
  });

  // Calculate booked room-nights (trailing 30 days)
  let bookedRoomNights = 0;
  for (const res of recentReservations) {
    if (res.status === 'canceled' || res.status === 'no_show') continue;
    const checkIn = new Date(res.startDate);
    const checkOut = new Date(res.endDate);
    const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    bookedRoomNights += nights;
  }

  const availableRoomNights = TOTAL_ROOMS * 30;
  const occupancyRate = (bookedRoomNights / availableRoomNights) * 100;

  // Revenue calculations
  const revenueMTD = mtdReservations
    .filter((r) => r.status !== 'canceled')
    .reduce((sum, r) => sum + (r.totalAmount || 0), 0);

  const revenueYTD = ytdReservations
    .filter((r) => r.status !== 'canceled')
    .reduce((sum, r) => sum + (r.totalAmount || 0), 0);

  // ADR = Revenue / Sold room-nights
  const adr = bookedRoomNights > 0 ? revenueMTD / bookedRoomNights : 0;

  // RevPAR = ADR * Occupancy Rate
  const revpar = adr * (occupancyRate / 100);

  return {
    occupancyRate: Math.round(occupancyRate * 100) / 100,
    revenueMTD: Math.round(revenueMTD * 100) / 100,
    revenueYTD: Math.round(revenueYTD * 100) / 100,
    adr: Math.round(adr * 100) / 100,
    revpar: Math.round(revpar * 100) / 100,
    bookedRoomNights,
    availableRoomNights,
    totalReservations: recentReservations.length,
  };
}

// ── Dynamic Pricing Rules ──

export interface PricingRules {
  weekendMultiplier: number;        // Fri-Sat
  highOccupancyThreshold: number;   // e.g. 0.67 = 4/6 rooms
  highOccupancyMultiplier: number;  // +15% when hot
  lastMinuteWindow: number;         // hours before check-in
  lastMinuteDiscount: number;       // e.g. 0.85 = -15%
  minRate: number;                  // floor (breakeven)
  maxRate: number;                  // ceiling
  events: Record<string, {
    dates: string[];                // YYYY-MM-DD
    multiplier: number;
    minLOS?: number;
  }>;
}

export const DEFAULT_PRICING_RULES: PricingRules = {
  weekendMultiplier: 1.25,
  highOccupancyThreshold: 0.67,     // 4 of 6 rooms
  highOccupancyMultiplier: 1.15,
  lastMinuteWindow: 48,
  lastMinuteDiscount: 0.85,
  minRate: 96,                      // breakeven ADR
  maxRate: 350,                     // ceiling
  events: {
    'natchez-spring-pilgrimage': {
      dates: [],                    // Fill from event calendar
      multiplier: 1.50,
      minLOS: 2,
    },
    'natchez-fall-pilgrimage': {
      dates: [],
      multiplier: 1.50,
      minLOS: 2,
    },
    'natchez-balloon-festival': {
      dates: [],
      multiplier: 1.35,
    },
  },
};

/**
 * Health check — call daily to keep the API key alive (expires after 30 days unused).
 */
export async function healthCheck(): Promise<boolean> {
  try {
    await getHotelDetails();
    console.log('[cloudbeds] Health check passed');
    return true;
  } catch (err) {
    console.error('[cloudbeds] Health check failed:', err);
    return false;
  }
}

export { CloudbedsError };
