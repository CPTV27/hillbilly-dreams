# Perplexity Prompt — RECORDING STUDIO

Copy everything between the `=====` markers into a Perplexity deep research agent.

=====

You are researching a single RECORDING STUDIO on or near the Mississippi music
corridor (Memphis to New Orleans). Can be currently active, a historic studio
preserved as a museum, or a legendary studio that's closed but culturally
important. Include studios just outside the corridor if they're significant
to Delta / Memphis / NOLA / Muscle Shoals music history (FAME, Muscle Shoals
Sound, Stax, Sun, Ardent, Royal, etc.).

Your output is a YAML record matching the structure below. Every field:
verified data OR the literal string UNKNOWN. Cite every non-trivial claim.

===== RESEARCH RULES =====

1. Minimum 3 independent sources when possible.
2. Primary sources: studio's own website, published rate cards, liner notes,
   discography databases (Discogs, AllMusic).
3. Do NOT guess gear specifics, rates, or availability. Use UNKNOWN.
4. Add any UNKNOWN fields to `research.gaps_to_resolve`.
5. Confidence: High | Medium | Low with reasoning.
6. For historic / closed studios, focus on significance and any preserved
   operation (museum tours, heritage site status).

===== OUTPUT FORMAT =====

Output ONLY the YAML. No markdown fences. No commentary. Start with `studio:`
and end with the final `sources:` block.

===== TEMPLATE (fill this exactly) =====

studio:
  name: ""
  aka: []
  city: ""
  state: ""
  address: ""
  lat_lon: ""
  website: ""
  phone: ""
  email: ""
  status: ""
  year_founded: ""
  year_closed: ""
  founder: ""
  current_owner: ""

rooms:
  count: null
  room_details:
    - name: ""
      type: ""
      dimensions: ""
      notable_features: ""
    - name: ""
      type: ""
      dimensions: ""
      notable_features: ""

gear:
  consoles: []
  tape_machines: []
  notable_outboard: []
  notable_microphones: []
  monitoring: ""
  live_room_instruments: []
  signature_gear: ""

specialties:
  genres: []
  production_styles: []
  notable_engineers_staff: []
  tracking_capabilities: ""
  mixing_capabilities: ""
  mastering_capabilities: ""

business:
  accepts_outside_bookings: ""
  booking_contact_name: ""
  booking_contact_email: ""
  booking_contact_phone: ""
  booking_lead_time: ""
  day_rate: ""
  block_rate: ""
  hourly_rate: ""
  includes_engineer: ""
  includes_tape: ""
  live_streaming_available: ""
  video_production_available: ""

history:
  era_of_prominence: ""
  notable_albums_recorded: []
  notable_artists_recorded: []
  cultural_significance: ""
  grammy_recordings: []
  landmark_recordings: []

tours_and_heritage:
  offers_public_tours: ""
  tour_info: ""
  museum_operation: ""
  on_heritage_trail: []
  nat_historic_register: ""

socials:
  instagram: ""
  facebook: ""
  twitter_x: ""
  youtube: ""

our_relationship:
  status: ""
  artists_we_share: []
  notes: ""

research:
  date_profiled: "YYYY-MM-DD"
  overall_confidence: ""
  gaps_to_resolve: []
  next_call_or_email: ""

sources: []

===== FIELD NOTES =====

- `status`: active | dormant | historic_only | closed | museum_operation
- `state`: two-letter (MS, TN, LA, AR, AL)
- `room.type`: tracking_room | control_room | live_room | iso_booth |
  mix_room | mastering_suite | writing_room
- `genres`: blues, soul, R&B, country, Americana, rock, indie_rock, hip_hop,
  jazz, gospel, folk, classical, all_genres
- `accepts_outside_bookings`: yes | no | by_referral | unknown
- `offers_public_tours`: yes | no | by_appointment | occasional | unknown
- `our_relationship.status`: "never_worked_with" | "tracked_a_record" |
  "mixed_a_record" | "ongoing_partner" | "our_house_studio"
- `overall_confidence`: High | Medium | Low
- All unknown strings: "UNKNOWN"
- All empty lists: []
- Each source: `- "<URL> — short description"`

===== RESEARCH TARGET =====

[PASTE STUDIO NAME AND CITY HERE]

For example: "Sun Studio, Memphis, TN" or "Dial Back Sound, Water Valley, MS"

===== BEGIN OUTPUT =====
