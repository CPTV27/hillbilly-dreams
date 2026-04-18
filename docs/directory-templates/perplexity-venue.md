# Perplexity Prompt — VENUE

Copy everything between the `=====` markers into a Perplexity deep research agent.

=====

You are researching a single music VENUE on the Mississippi music corridor
(Memphis to New Orleans, including side spurs to Little Rock, Jackson,
Clarksdale, Oxford, Helena, Greenville, Natchez, Baton Rouge, New Orleans).

Your output is a YAML record that EXACTLY matches the structure below. Every
field must be populated with either verified data or the literal string
UNKNOWN (so gaps are grep-able). Cite every non-trivial claim. Do not invent
plausible-sounding details.

===== RESEARCH RULES =====

1. Use at least 3 independent sources where possible.
2. Primary sources beat aggregators. The venue's own website/socials >
   Yelp/Google > Wikipedia > news articles.
3. If you can't verify a field, set it to UNKNOWN. Do NOT guess capacity,
   gear models, fee ranges, or booking contacts.
4. Add any UNKNOWN fields to the `research.gaps_to_resolve` list so a human
   knows to call the venue.
5. Rate your overall confidence: High (verified by phone or primary source),
   Medium (multiple consistent online sources), Low (single source or
   conflicting info).

===== OUTPUT FORMAT =====

Output ONLY the YAML. Do not wrap it in markdown code fences. Do not add
commentary before or after. Start with `venue:` and end with the final
`sources:` block.

===== TEMPLATE (fill this exactly) =====

venue:
  name: ""
  aka: []
  city: ""
  state: ""
  neighborhood: ""
  address: ""
  lat_lon: ""
  phone: ""
  website: ""
  email: ""
  socials:
    instagram: ""
    facebook: ""
    twitter_x: ""
    tiktok: ""
    youtube: ""
    bandsintown: ""
  status: ""
  year_opened: ""
  year_closed: ""
  ownership:
    owner_or_operator: ""
    parent_entity: ""
    nonprofit_501c3: ""
  venue_type: []
  primary_genres: []
  secondary_genres: []
  typical_audience: ""
  age_policy: ""

room:
  capacity_tier: ""
  capacity_standing: null
  capacity_seated: null
  capacity_official: ""
  stage:
    width_ft: null
    depth_ft: null
    height_in: null
    ground_or_riser: ""
  green_room: ""
  load_in: ""
  parking: ""
  floor: ""
  sightlines: ""

production:
  house_pa:
    brand_and_model: ""
    subs: ""
    monitors: ""
  mixer:
    front_of_house: ""
    monitor_console: ""
    channels: null
  microphones:
    vocal_mic_models: []
    instrument_mics: []
    wireless_available: ""
  di_boxes: ""
  cables_and_stands: ""
  backline:
    drum_kit_details: ""
    bass_amp: ""
    guitar_amps: ""
    keyboard: ""
    piano: ""
  lighting: ""
  video_projection: ""
  live_stream_capability: ""
  recording_capability: ""
  tie_lines_to_recording_room: ""
  power: ""
  house_engineer_onsite: ""

staffing:
  sound_engineer: ""
  door_staff: ""
  security: ""
  runners_hospitality: ""

bar_and_food:
  full_bar: ""
  beer_wine_only: ""
  kitchen: ""
  food_menu_notes: ""
  signature_items: []

booking:
  booker_name: ""
  booker_email: ""
  booker_phone: ""
  submission_portal: ""
  lead_time_weeks: null
  deal_structure: ""
  typical_fee_range: ""
  ticketing_platform: ""
  standard_set_length_min: null
  typical_night_format: ""
  in_house_promo_support: ""

calendar:
  nights_per_week_active: null
  anchor_nights: []
  recurring_residencies: []
  notable_past_bookings_2024_2026: []

business_context:
  notable_regional_significance: ""
  press_mentions_recent: []
  awards_recognition: []
  tourism_trail_affiliations: []

research:
  date_profiled: "YYYY-MM-DD"
  overall_confidence: ""
  gaps_to_resolve: []
  next_call_or_email: ""

sources: []

===== FIELD NOTES =====

- `status`: active | dormant | closed | unknown
- `state`: two-letter (MS, TN, LA, AR)
- `capacity_tier`: XS (<100) | S (100-300) | M (300-1000) | L (1000-3000) | XL (3000+)
- `venue_type` (list, multiple OK): juke_joint, club, bar_with_music,
  listening_room, theater, festival_grounds, restaurant_with_music,
  church, house_concert, outdoor_pavilion, stadium_arena
- `primary_genres`: blues, soul, R&B, country, Americana, rock, indie,
  hip-hop, jazz, gospel, folk, zydeco, cajun, brass_band, classical, all_genres
- `age_policy`: all_ages | 18+ | 21+ | varies_by_show
- `ground_or_riser`: ground | riser | platform | no_stage
- `deal_structure`: guarantee | door_split | flat_rental | plus_bar_minimum |
   ticket_deal | mixed
- `typical_fee_range`: "$0 (door split)" | "$200-500" | "$500-1,500" |
  "$1,500-5,000" | "$5,000+"
- `overall_confidence`: High | Medium | Low
- All unknown strings: "UNKNOWN"
- All unknown booleans: "UNKNOWN"
- All unknown numbers: null
- All empty lists: []
- Each source: `- "<URL> — short description"`

===== RESEARCH TARGET =====

[PASTE VENUE NAME AND CITY HERE]

For example: "Ground Zero Blues Club, Clarksdale, MS"

===== BEGIN OUTPUT =====
