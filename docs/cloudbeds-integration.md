# Cloudbeds API Integration -- Big Muddy Inn

**Property:** The Big Muddy Inn, Natchez MS (6 rooms)
**Date:** March 2026
**Purpose:** Hook up Cloudbeds API for dynamic pricing, occupancy sync, and booking automation

---

## Meeting Prep (Tomorrow Morning)

### Key Questions to Ask Cloudbeds

1. **Which plan are we on, and does it include API access?**
   - API is listed as available on all plans, but confirm our plan (Flex, One, Experience) includes self-service API key generation
   - Plans start around $100-108/mo for small properties; confirm our 6-room pricing

2. **Do we need PIE (Pricing Intelligence Engine) for dynamic pricing, or can we push our own rates via the API?**
   - PIE is their built-in revenue management AI -- forecasts demand 90 days out with ~95% accuracy
   - We can also build our own rate logic and push via `patchRate` -- ask if both can coexist
   - PIE may be an add-on cost; get the number

3. **Can we get a self-service API key today?**
   - Property-level API keys are long-lived (no expiration unless unused 30 days)
   - Keys start with `cbat_` -- we can generate one from the dashboard under Apps & Integrations
   - Ask them to walk through scope selection

4. **Webhook setup -- is it available on our plan?**
   - We need `reservation/created` and `reservation/status_changed` events
   - Need `read:reservation` scope at minimum

5. **Stripe integration status**
   - Cloudbeds has native Stripe integration -- confirm it's connected for our property
   - Can we pass Stripe tokens to Cloudbeds for booking engine payments?
   - Do we need Cloudbeds Payments or can we keep our existing Stripe account?

6. **Rate limits**
   - What are the API rate limits for our plan?
   - `patchRate` queues updates asynchronously and returns a jobReferenceID -- what's the throughput?

7. **Channel manager sync**
   - When we update rates via API, do they automatically push to Airbnb/Booking.com/VRBO?
   - Or do we need to configure distribution separately?

### What We Can Do Via API vs Dashboard

| Capability | API | Dashboard Only |
|---|---|---|
| Get room types & inventory | Yes (`getRoomTypes`) | -- |
| Get/update rates by date | Yes (`getRate`, `patchRate`) | -- |
| Set min/max length of stay | Yes (`patchRate` restrictions) | -- |
| Close to arrival/departure | Yes (`patchRate` restrictions) | -- |
| Get reservations | Yes (`getReservations`) | -- |
| Check availability | Yes (`getRatePlans` with `detailedRates: true`) | -- |
| Receive booking notifications | Yes (webhooks) | -- |
| PIE auto-pricing rules | No | Dashboard |
| Initial room type setup | No | Dashboard |
| Payment gateway setup | No | Dashboard |
| Channel manager connections | No | Dashboard |
| Guest messaging templates | No | Dashboard |

---

## Dynamic Pricing Capabilities

### What the API Supports

**Rate Updates via `patchRate`:**
- Update rates by date range and room type (up to 30 date intervals per call)
- Updates are async -- returns a `jobReferenceID` for tracking
- Rate parameter is optional; you can update restrictions only
- Only non-derived rates can be price-updated; restrictions work on both derived and standalone rate plans

**Restrictions you can set per date:**
- Minimum Length of Stay (MinLOS)
- Maximum Length of Stay (MaxLOS)
- Close to Arrival (CTA) -- block check-ins on specific dates
- Close to Departure (CTD) -- block checkouts on specific dates
- Stop sell -- close availability entirely

**What we can build:**
- Weekday/weekend rate differentials
- Seasonal pricing (Pilgrimage festival, holidays, summer)
- Occupancy-based rate bumps (when 4 of 6 rooms booked, raise remaining rates)
- Event-based surge pricing (Natchez Pilgrimage, Christmas tours, Balloon Festival)
- Last-minute discounts (unsold rooms 48hrs out)
- Minimum stay requirements for peak dates

### Cloudbeds PIE (Their Built-in Alternative)

PIE is Cloudbeds' own revenue management tool:
- Causal AI forecasts demand 90 days out
- Auto-adjusts rates every ~30 minutes after booking/availability changes
- Pulls competitor rates and local event data
- You set min/max price guardrails, it handles the rest

**Recommendation:** Start with PIE if it's included or cheap. Layer our own API-driven logic on top for Big Muddy-specific events and the Porch Network pricing model. Ask about cost.

---

## Integration Architecture

### How It Fits Into the Existing System

```
                                    Cloudbeds PMS
                                   /      |       \
                              API Key   Webhooks   Stripe
                                |         |          |
                        +-------+---------+----------+-------+
                        |                                     |
                  /api/integrations/cloudbeds/         Webhook receiver
                  (rate sync, availability,            /api/webhooks/cloudbeds
                   reservations)                       (booking notifications)
                        |                                     |
                        v                                     v
                  ClientIntegration model              Metric upserts
                  (provider: 'cloudbeds')              (occupancy, revenue)
                  Stores: API key, config,                    |
                  property ID, scopes                         v
                        |                              Dashboard metrics
                        v                              inn_occupancy_rate
                  /ops/ dashboard                      inn_revenue_mtd
                  LaunchTask tracking                  inn_adr (avg daily rate)
```

**Existing infrastructure we'll use:**

- **`ClientIntegration` model** -- already has `provider: 'cloudbeds'` as a listed option. Stores `accessToken` (the `cbat_` API key), `config` (property ID, webhook URLs), and `scopes`.
- **`/api/integrations/` routes** -- CRUD for managing the Cloudbeds connection. Already built.
- **`/api/metrics/` route** -- Bulk upsert endpoint already designed for Cloudbeds data. Source field supports `"cloudbeds"`.
- **`Metric` model** -- Keys like `inn_occupancy_rate`, `inn_revenue_mtd` with source: `"cloudbeds"`.
- **`LaunchTask` system** -- Track setup tasks (connect API, configure webhooks, set room types).

---

## API Endpoints We Need

### 1. Get Property Details & Room Types

```
GET https://hotels.cloudbeds.com/api/v1.2/getHotelDetails
GET https://hotels.cloudbeds.com/api/v1.2/getRoomTypes
```
- Scope: `read:hotel`
- Returns: Room type IDs, names, max occupancy, total units
- **Our 6 rooms:** Map each room type to a `roomTypeID` for rate management

### 2. Get Current Rates & Availability

```
GET https://hotels.cloudbeds.com/api/v1.2/getRatePlans?detailedRates=true&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
GET https://hotels.cloudbeds.com/api/v1.2/getRate?roomTypeID=XXX&detailedRates=true
```
- Scope: `read:rate`
- Returns: Daily rates, `roomsAvailable`, restrictions (CTA, CTD, MinLOS, MaxLOS) per room type per date
- Availability is at room level -- all rate plans for a `roomTypeID` share the same availability count

### 3. Update Rates Dynamically

```
PATCH https://hotels.cloudbeds.com/api/v1.2/patchRate
```
- Scope: `write:rate`
- Body: Up to 30 date intervals per call
- Returns: `jobReferenceID` (async processing)
- **Key params:** `roomTypeID`, `ratePlanID`, `startDate`, `endDate`, `rate`, `minLOS`, `maxLOS`, `closedToArrival`, `closedToDeparture`, `stopSell`
- Rate param is optional -- can update restrictions only

### 4. Get Reservations/Bookings

```
GET https://hotels.cloudbeds.com/api/v1.2/getReservations?status=confirmed&propertyID=XXX
GET https://hotels.cloudbeds.com/api/v1.2/getReservation?reservationID=XXX
GET https://hotels.cloudbeds.com/api/v1.2/getReservationsWithRateDetails
```
- Scope: `read:reservation`
- Returns: Guest name, dates, room type, rate, status, source channel
- Use for: Occupancy calculations, revenue tracking, guest welcome automation

### 5. Webhooks for Booking Notifications

```
POST https://hotels.cloudbeds.com/api/v1.2/postWebhook
```
- Scope: `read:reservation` (for reservation events)
- Register our endpoint URL for these events:

| Event | Trigger |
|---|---|
| `reservation/created` | New booking comes in |
| `reservation/status_changed` | Cancellation, no-show, checked-in, checked-out |
| `reservation/dates_changed` | Guest modifies dates |
| `reservation/accommodation_changed` | Room reassignment |
| `reservation/deleted` | Reservation removed |

- Payload: JSON POST to our webhook URL with reservation ID, dates, status
- **Our webhook handler:** `/api/webhooks/cloudbeds` -- on new booking, trigger welcome email, update occupancy metric, log to ops activity feed

### 6. Occupancy & Revenue Data for the $760k Model

We need these metrics synced daily (cron) or on webhook events:

| Metric Key | Calculation | Target |
|---|---|---|
| `inn_occupancy_rate` | Booked room-nights / Available room-nights (trailing 30d) | 65% |
| `inn_occupancy_breakeven` | Fixed threshold | 45% |
| `inn_revenue_mtd` | Sum of reservation revenue, current month | $11,667/mo ($140k/yr) |
| `inn_revenue_ytd` | Sum of reservation revenue, year to date | Track to $140k |
| `inn_adr` | Average daily rate (revenue / sold room-nights) | ~$96 at breakeven, ~$130 at target |
| `inn_revpar` | Revenue per available room (ADR * occupancy) | Key performance indicator |

These feed directly into `/api/metrics` with `source: "cloudbeds"`.

---

## Authentication Setup

### API Key Method (Recommended)

1. Log into Cloudbeds dashboard (myfrontdesk.cloudbeds.com)
2. Go to **Apps & Integrations** > **Self-service API**
3. Create a new API key
4. Select scopes:
   - `read:hotel` -- property details, room types
   - `read:rate` -- get rates and availability
   - `write:rate` -- update rates (dynamic pricing)
   - `read:reservation` -- get bookings, webhook subscriptions
   - `read:guest` -- guest details for welcome emails
5. Save the key (starts with `cbat_`)
6. Key does not expire unless unused for 30 days -- set up a daily health check ping

### OAuth 2.0 (Alternative -- Not Needed for Us)

Only needed if building a multi-property SaaS app. We're a single property, so API key is the way.

---

## Environment Variables Needed

Add these to `.env.local` and Vercel/deployment environment after the meeting:

```bash
# Cloudbeds API
CLOUDBEDS_API_KEY=cbat_xxxxxxxxxxxxxxxxxxxxx    # From dashboard after meeting
CLOUDBEDS_PROPERTY_ID=XXXXX                      # Property ID from getHotelDetails
CLOUDBEDS_API_BASE=https://hotels.cloudbeds.com/api/v1.2

# Webhook secret (if Cloudbeds provides one for signature verification)
CLOUDBEDS_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Optional: PIE configuration
# CLOUDBEDS_PIE_ENABLED=true
```

---

## Code Skeleton

### Cloudbeds API Client

```typescript
// lib/cloudbeds.ts

const CLOUDBEDS_API_BASE = process.env.CLOUDBEDS_API_BASE
  || 'https://hotels.cloudbeds.com/api/v1.2';
const CLOUDBEDS_API_KEY = process.env.CLOUDBEDS_API_KEY!;
const CLOUDBEDS_PROPERTY_ID = process.env.CLOUDBEDS_PROPERTY_ID!;

async function cloudbedsRequest(endpoint: string, options?: RequestInit) {
  const url = `${CLOUDBEDS_API_BASE}/${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${CLOUDBEDS_API_KEY}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Cloudbeds API error ${res.status}: ${error}`);
  }

  return res.json();
}

// --- Read Operations ---

export async function getRoomTypes() {
  return cloudbedsRequest(`getRoomTypes?propertyID=${CLOUDBEDS_PROPERTY_ID}`);
}

export async function getRatesDetailed(startDate: string, endDate: string) {
  return cloudbedsRequest(
    `getRatePlans?propertyID=${CLOUDBEDS_PROPERTY_ID}&detailedRates=true&startDate=${startDate}&endDate=${endDate}`
  );
}

export async function getReservations(params: {
  status?: string;
  checkInFrom?: string;
  checkInTo?: string;
}) {
  const query = new URLSearchParams({
    propertyID: CLOUDBEDS_PROPERTY_ID,
    ...params,
  });
  return cloudbedsRequest(`getReservations?${query}`);
}

// --- Write Operations ---

export async function updateRate(updates: {
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
}[]) {
  // Max 30 intervals per call
  return cloudbedsRequest('patchRate', {
    method: 'PATCH',
    body: JSON.stringify({
      propertyID: CLOUDBEDS_PROPERTY_ID,
      updates,
    }),
  });
}

// --- Metrics Sync ---

export async function syncOccupancyMetrics() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const reservations = await getReservations({
    checkInFrom: thirtyDaysAgo.toISOString().split('T')[0],
    checkInTo: today.toISOString().split('T')[0],
  });

  const totalRoomNights = 6 * 30; // 6 rooms * 30 days
  // Calculate booked room-nights from reservation data
  // ... reservation processing logic ...

  const metrics = [
    { key: 'inn_occupancy_rate', value: occupancyRate, target: 65, unit: '%', source: 'cloudbeds' },
    { key: 'inn_revenue_mtd', value: revenueMTD, target: 11667, unit: 'usd', source: 'cloudbeds' },
    { key: 'inn_adr', value: adr, unit: 'usd', source: 'cloudbeds' },
    { key: 'inn_revpar', value: revpar, unit: 'usd', source: 'cloudbeds' },
  ];

  // POST to our own /api/metrics endpoint
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/metrics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metrics),
  });
}
```

### Webhook Handler

```typescript
// app/api/webhooks/cloudbeds/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const { event, data } = payload;

  console.log(`[Cloudbeds Webhook] ${event}`, data);

  switch (event) {
    case 'reservation/created':
      // 1. Log to ops activity feed
      // 2. Trigger welcome email sequence
      // 3. Update occupancy metrics
      // 4. If occupancy crosses threshold, trigger rate adjustment
      break;

    case 'reservation/status_changed':
      // Handle cancellations, check-ins, check-outs
      // Recalculate occupancy, potentially adjust rates
      break;

    case 'reservation/dates_changed':
      // Recalculate availability for affected dates
      break;
  }

  return NextResponse.json({ received: true });
}
```

### Dynamic Pricing Cron Job (Sketch)

```typescript
// app/api/cron/dynamic-pricing/route.ts
// Runs daily via Vercel Cron or similar

import { getRatesDetailed, updateRate, getReservations } from '@/lib/cloudbeds';

export async function GET() {
  // 1. Get current occupancy for next 90 days
  // 2. Apply pricing rules:

  const rules = {
    // Base rates by room type (set in Cloudbeds dashboard)
    weekendMultiplier: 1.25,           // Fri-Sat bump
    highOccupancyThreshold: 0.67,      // 4 of 6 rooms = raise rates
    highOccupancyMultiplier: 1.15,     // +15% when running hot
    lastMinuteDiscount: 0.85,          // -15% for unsold rooms within 48hrs
    pilgrimage: {                      // Natchez Spring & Fall Pilgrimage
      multiplier: 1.50,
      minLOS: 2,
    },
    // ... seasonal rules
  };

  // 3. Calculate new rates per room type per date
  // 4. Push via patchRate
  // 5. Log changes to ops activity

  return NextResponse.json({ success: true });
}
```

---

## Implementation Roadmap

### Phase 1: Connect (This Week)
- [ ] Get API key from Cloudbeds dashboard during meeting
- [ ] Set environment variables
- [ ] Test `getHotelDetails` and `getRoomTypes` to confirm connectivity
- [ ] Map our 6 rooms to `roomTypeID` values
- [ ] Create `ClientIntegration` record: `provider: 'cloudbeds'`, status: `'active'`

### Phase 2: Read (Week 2)
- [ ] Build `lib/cloudbeds.ts` client module
- [ ] Create `/api/integrations/cloudbeds/sync` endpoint for occupancy metrics
- [ ] Wire occupancy and revenue metrics to the dashboard
- [ ] Set up daily cron to sync metrics

### Phase 3: Webhooks (Week 2-3)
- [ ] Deploy `/api/webhooks/cloudbeds` handler
- [ ] Register webhook URLs with Cloudbeds for reservation events
- [ ] Build welcome email trigger on `reservation/created`
- [ ] Wire booking notifications to ops activity feed

### Phase 4: Dynamic Pricing (Week 3-4)
- [ ] Define pricing rules (base rates, weekend, seasonal, event-based)
- [ ] Build dynamic pricing engine
- [ ] Create `/api/cron/dynamic-pricing` job
- [ ] Test with manual overrides before enabling auto-push
- [ ] Set guardrails: min/max rate per room type, never below breakeven rate

### Phase 5: Revenue Intelligence (Ongoing)
- [ ] Evaluate PIE vs custom pricing -- compare results over 30 days
- [ ] Build Porch Network pricing model (multi-property rate coordination)
- [ ] Feed Cloudbeds data into the $760k revenue model dashboard

---

## Reference Links

- [Cloudbeds Developer Portal](https://developers.cloudbeds.com/)
- [API Reference (v1.2)](https://hotels.cloudbeds.com/api/v1.2/docs/)
- [About Cloudbeds APIs](https://developers.cloudbeds.com/docs/about-cloudbeds-api)
- [RMS Integration Guide](https://developers.cloudbeds.com/docs/revenue-management-system-rms)
- [Webhook Documentation](https://developers.cloudbeds.com/docs/webhooks-1)
- [API Key Authentication (Property-Level)](https://developers.cloudbeds.com/docs/quickstart-guide-api-authentication-for-property-level-users)
- [Stripe Connection Guide](https://myfrontdesk.cloudbeds.com/hc/en-us/articles/226494028-Stripe-Connection-Guide)
- [PIE (Pricing Intelligence Engine)](https://myfrontdesk.cloudbeds.com/hc/en-us/articles/360002860393-PIE-Price-Intelligence-Engine-Everything-you-need-to-know)
- [Payment Processing](https://developers.cloudbeds.com/docs/payment-processing)
- [Cloudbeds Pricing Plans](https://www.cloudbeds.com/pricing/)
