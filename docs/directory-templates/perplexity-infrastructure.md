# Perplexity Prompt — TOURING INFRASTRUCTURE / VENDOR

Copy everything between the `=====` markers into a Perplexity deep research agent.

=====

You are researching a single TOURING INFRASTRUCTURE VENDOR on or near the
Mississippi music corridor (Memphis to New Orleans, including side spurs).
Vendors include: rehearsal spaces, PA rental, backline rental, van/sprinter
rental, merch fulfillment, lighting, staging, instrument repair, and tour
vehicle service shops. The goal is to know who an artist or tour manager
can call when something breaks or needs to be sourced fast.

Your output is a YAML record matching the structure below. Every field:
verified data OR the literal string UNKNOWN. Cite every non-trivial claim.
Do not invent rates, inventory, or after-hours availability.

===== RESEARCH RULES =====

1. Minimum 3 independent sources when possible.
2. Primary sources beat aggregators. The vendor's own website / published
   rate card > Yelp / Google reviews > music industry forums > news coverage.
3. Do NOT guess day rates, weekly rates, deposit terms, or delivery radius.
   Mark UNKNOWN.
4. Add any UNKNOWN fields to `research.gaps_to_resolve`.
5. Confidence: High | Medium | Low with reasoning.
6. For shops with both retail and rental sides (e.g., a music store that
   also rents PA), focus on the rental / service operation but note retail
   in `business.also_offers`.

===== OUTPUT FORMAT =====

Output ONLY the YAML. Do not wrap it in markdown code fences. Do not add
commentary before or after. Start with `infrastructure:` and end with the
final `sources:` block.

===== TEMPLATE (fill this exactly) =====

infrastructure:
  vendor:
    name: ""
    aka: []
    vendor_type: ""
    city: ""
    state: ""
    address: ""
    lat_lon: ""
    corridor_segment: ""
    phone: ""
    after_hours_phone: ""
    website: ""
    email: ""
    status: ""
    year_founded: ""
    owner_or_principal: ""

inventory:
  inventory_summary: ""
  signature_gear: []
  brands_carried: []
  fleet_size: null
  largest_system: ""
  smallest_system: ""
  recent_additions: []
  rental_catalog_url: ""

rates:
  day_rates: ""
  weekly_rates: ""
  monthly_rates: ""
  hourly_rates: ""
  package_pricing: ""
  rate_card_url: ""
  deposit_required: ""
  deposit_amount: ""
  insurance_required: ""
  damage_waiver_offered: ""

logistics:
  delivery_offered: ""
  delivery_radius: ""
  delivery_fee: ""
  setup_included: ""
  operator_included: ""
  operator_day_rate: ""
  pickup_only: ""
  loading_dock: ""

availability:
  hours: ""
  closed_days: []
  after_hours_support: ""
  emergency_response_time: ""
  typical_lead_time: ""
  walk_in_friendly: ""

services:
  rentals: ""
  repair: ""
  service_shop: ""
  fulfillment: ""
  storage: ""
  also_offers: []
  specialties: []

clients:
  serves_touring_acts: ""
  serves_local_venues: ""
  serves_festivals: ""
  notable_clients_recent: []
  notable_tours_supported: []
  client_testimonials_url: ""

contacts:
  primary_contact_name: ""
  primary_contact_role: ""
  primary_contact_email: ""
  primary_contact_phone: ""
  rental_desk_email: ""
  service_desk_email: ""
  accounts_email: ""

business:
  payment_methods: []
  net_terms_available: ""
  credit_card_required: ""
  pricing_tier: ""

socials:
  instagram: ""
  facebook: ""
  twitter_x: ""
  youtube: ""
  linkedin: ""

our_relationship:
  status: ""
  past_rentals: []
  open_account: ""
  notes: ""

research:
  date_profiled: "YYYY-MM-DD"
  overall_confidence: ""
  gaps_to_resolve: []
  next_call_or_email: ""

sources: []

===== FIELD NOTES =====

- `vendor_type`: rehearsal | pa_rental | backline | van_rental | merch |
  lighting | staging | repair | tour_service | instrument_repair |
  truck_rental | trailer_rental
- `state`: two-letter (MS, TN, LA, AR, AL)
- `corridor_segment`: "Memphis" | "Delta (MS)" | "Natchez" | "NOLA" |
  "Arkansas" | "Side spur"
- `status`: active | dormant | closed | unknown
- `delivery_offered`: yes | no | within_radius | by_arrangement | unknown
- `after_hours_support`: yes | no | premium | emergency_only | unknown
- `walk_in_friendly`: yes | no | by_appointment | unknown
- `serves_touring_acts`: yes | no | sometimes | unknown
- `pricing_tier`: budget | mid | premium | boutique | unknown
- `our_relationship.status`: "never_contacted" | "cold_pitch" | "rented_once" |
  "occasional" | "open_account" | "preferred_vendor"
- `overall_confidence`: High | Medium | Low
- All unknown strings: "UNKNOWN"
- All unknown booleans: "UNKNOWN"
- All unknown numbers: null
- All empty lists: []
- Each source: `- "<URL> — short description"`

===== RESEARCH TARGET =====

[PASTE VENDOR NAME AND CITY HERE]

For example: "Memphis Backline Co., Memphis, TN" or
"Crescent City Sound Rentals, New Orleans, LA"

===== BEGIN OUTPUT =====
