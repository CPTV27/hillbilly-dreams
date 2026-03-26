# Frontend Design Agent — Data Platform Integration Guide

**From:** Data Scientist Agent
**Purpose:** Everything you need to build UI against the Deep South Data Platform.

---

## What's Available Now

The database has **19 businesses in Natchez** with rich fields, **vector search**, **time-series metrics**, and **economic data infrastructure** ready to be wired to UI.

### DirectoryBusiness Fields (for listing cards, detail pages, maps)

```typescript
interface DirectoryBusiness {
  id: number;
  name: string;
  slug: string;           // URL-safe: "magnolia-grill-natchez"
  category: string;       // "Food & Drink" | "Lodging" | "Arts & Culture" | "Retail" | "Services"
  subcategory: string | null;
  city: string;
  state: string;          // "MS"
  address: string | null;
  phone: string | null;
  zip: string | null;
  lat: number | null;     // For map pins
  lng: number | null;
  website: string | null;
  description: string;
  spotlight: string | null;  // AI-generated editorial copy
  tier: string;           // "free" | "main_street" | "the_route" | "hdx_ops"
  active: boolean;

  // Ratings (populated after Google Places enrichment)
  googleRating: number | null;      // 1-5
  googleReviewCount: number | null;
  yelpRating: number | null;        // 1-5
  yelpReviewCount: number | null;

  // Hours (JSON)
  hoursJson: Record<string, { open: string; close: string }> | null;
  // Example: { "monday": { "open": "09:00", "close": "17:00" }, ... }

  // Photos
  photoUrls: string[];    // Up to 3 cached photo URLs

  createdAt: string;
  updatedAt: string;
}
```

### API Endpoints for Frontend

| Endpoint | Method | Purpose | Public? |
|---|---|---|---|
| `/api/search?q=live+blues&type=directory_business&limit=10` | GET | Semantic vector search | Yes |
| `/api/directory` | GET | List all active businesses (from Client table currently) | Yes |
| `/api/directory/[slug]` | GET | Single business detail page | Yes |
| `/api/directory/submit` | POST | Submit new listing (form) | Yes |
| `/api/metrics` | GET | All current metrics (keyed object) | Yes |
| `/api/data/health` | GET | Platform health stats | Admin |

### Search Response Shape

```typescript
// GET /api/search?q=barbecue+natchez&type=directory_business
{
  query: "barbecue natchez",
  type: "directory_business",
  results: [
    {
      business: {
        id: 3,
        name: "Pig Out Inn",
        slug: "pig-out-inn-natchez",
        category: "Food & Drink",
        city: "Natchez",
        state: "MS",
        description: "...",
        googleRating: 4.5
      },
      score: 0.87,        // 0-1 similarity (higher = better match)
      snippet: "Sitting just off Silver Street..."
    }
  ],
  count: 1,
  model: "text-embedding-005"
}
```

---

## UI Components to Build

### 1. Smart Search Bar
- Wires to `GET /api/search?q=...`
- Debounced input (300ms)
- Shows ranked results with score, business name, category, rating
- "No results" state should suggest browsing by category
- This is semantic search — "place with live music near the river" should work, not just keyword match

### 2. Business Listing Card
Design for these fields:
- Name + category badge
- City, State
- Star rating (Google or Yelp, whichever exists)
- Review count
- Phone (click-to-call on mobile)
- Hours: "Open now" / "Closed" badge based on `hoursJson` and current time
- Photo (first of `photoUrls`, or a category-based placeholder)
- Tier badge (free = no badge, main_street = subtle, the_route/hdx_ops = prominent)

### 3. Business Detail Page (`/directory/[slug]`)
- Hero section: photo, name, category, rating stars
- Description + spotlight (editorial)
- Map embed (lat/lng → static map or embedded Google Map)
- Hours table
- Contact: phone, website, address
- "Similar businesses" section using vector search

### 4. Directory Map View
- All businesses with lat/lng plotted on a map
- Color-coded pins by category
- Click pin → popup card → link to detail page
- Filter by category, city

### 5. Economic Dashboard (`/economics/[county]`)
- Census data: population, median income, poverty rate
- BLS data: unemployment rate, labor force
- Trend charts using MetricSnapshot time-series
- Business count by category for this county
- Links to businesses in this area

### 6. Data Health Dashboard (Admin)
- Wires to `GET /api/data/health`
- Enrichment rate bar (% of businesses with lat/lng, phone, rating)
- Embedding coverage
- Census/BLS freshness
- Enrichment queue depth

---

## Design Tokens / Aesthetic Notes

The brand is **Iron & Earth** — analog-warm, Delta blues, not tech-corporate. For the data platform UI:

- **Ratings:** Use filled/hollow star icons, not numeric badges
- **Maps:** Earth tones, not Google's default blue. Sepia-ish.
- **Hours:** Simple open/closed badge, not a full grid. Green dot = open, gray = closed.
- **Categories:** Each gets an icon (fork for Food, bed for Lodging, palette for Arts, bag for Retail, wrench for Services)
- **Search:** Full-width, prominent. This is the primary interaction. Think Google circa 2004 — one big input.
- **Empty states:** "The directory is growing. Know a business that should be here?" → link to submit form.

---

## What's Coming (don't build yet, but plan for)

- **6,000 businesses** across 15 corridor cities (Phase 4 expansion)
- **Yelp ratings** as a second data source alongside Google
- **Economic dashboard pages** per county with Census/BLS charts
- **Photo galleries** from Google Places (3 photos per business)
- **"Claim this listing"** flow for business owners → conversion to paid client

---

## How to Stage Data You Find

If you encounter business data, venue info, or metrics while doing frontend work:

Write it as JSON to `/packages/database/staging/` using the format in `DATA_HANDOFF_PROMPT.md`. The Data Scientist Agent will ingest it.
