# Perplexity Prompt — TOURISM SITE / OPERATOR

Copy everything between the `=====` markers into a Perplexity deep research agent.

=====

You are researching a single TOURISM ASSET on the Mississippi music corridor
(Memphis to New Orleans, including side spurs to Little Rock, Jackson,
Clarksdale, Oxford, Helena, Greenville, Natchez, Baton Rouge, New Orleans).
Tourism assets include: museums, heritage trails, blues markers, civil
rights sites, plantation tours, juke joint experiences, tour operators,
visitor centers, walking tours, and interpretive centers tied to the
region's music, civil rights, or cultural history.

Your output is a YAML record matching the structure below. Every field:
verified data OR the literal string UNKNOWN. Cite every non-trivial claim.
Do not invent admission prices, hours, or curator contacts.

===== RESEARCH RULES =====

1. Minimum 3 independent sources when possible.
2. Primary sources beat aggregators. The site's own website > state tourism
   board / National Park Service > TripAdvisor / Yelp > news coverage.
3. If you can't verify a field, set it to UNKNOWN. Do NOT guess hours,
   admission, accessibility, or partnership status.
4. Add any UNKNOWN fields to `research.gaps_to_resolve` so a human knows
   to call the site.
5. Confidence: High (verified by phone or primary source) | Medium (multiple
   consistent online sources) | Low (single source or conflicting info).
6. For Mississippi Blues Trail markers and similar designated-historical
   sites, capture the official designation number / inscription date.

===== OUTPUT FORMAT =====

Output ONLY the YAML. Do not wrap it in markdown code fences. Do not add
commentary before or after. Start with `tourism:` and end with the final
`sources:` block.

===== TEMPLATE (fill this exactly) =====

tourism:
  site:
    name: ""
    aka: []
    site_type: ""
    city: ""
    state: ""
    address: ""
    lat_lon: ""
    corridor_segment: ""
    phone: ""
    website: ""
    email: ""
    status: ""
    year_established: ""
    operating_entity: ""
    nonprofit_501c3: ""

designation:
  official_designation: ""
  designation_number: ""
  designation_date: ""
  national_register: ""
  on_heritage_trail: []
  state_landmark: ""

visiting:
  hours: ""
  hours_seasonal_notes: ""
  closed_days: []
  admission: ""
  admission_adult: ""
  admission_child: ""
  admission_senior: ""
  admission_group: ""
  reservations_required: ""
  typical_visit_duration: ""
  best_time_to_visit: ""

accessibility:
  wheelchair_accessible: ""
  ada_parking: ""
  hearing_assistance: ""
  visual_assistance: ""
  service_animal_policy: ""
  accessibility_notes: ""

programming:
  guided_tours_offered: ""
  tour_languages: []
  audio_tour_available: ""
  exhibits_summary: ""
  permanent_exhibits: []
  rotating_exhibits: []
  educational_programs: ""
  events_calendar_url: ""

partnerships:
  partner_organizations: []
  affiliated_universities: []
  funded_by: []
  corporate_sponsors: []
  partnership_opportunities: ""

contacts:
  group_booking_contact_name: ""
  group_booking_contact_email: ""
  group_booking_contact_phone: ""
  scholar_or_curator_contact_name: ""
  scholar_or_curator_contact_email: ""
  press_contact_name: ""
  press_contact_email: ""
  director_name: ""
  director_email: ""

facilities:
  parking: ""
  restrooms: ""
  gift_shop: ""
  cafe_food: ""
  wifi: ""
  photography_policy: ""

cultural_context:
  significance: ""
  related_artists: []
  related_events: []
  related_recordings: []
  notable_press_coverage: []
  awards_recognition: []

socials:
  instagram: ""
  facebook: ""
  twitter_x: ""
  tiktok: ""
  youtube: ""

our_relationship:
  status: ""
  past_collaborations: []
  notes: ""

research:
  date_profiled: "YYYY-MM-DD"
  overall_confidence: ""
  gaps_to_resolve: []
  next_call_or_email: ""

sources: []

===== FIELD NOTES =====

- `site_type`: museum | trail | marker | tour_operator | heritage_site |
  visitor_center | walking_tour | interpretive_center | plantation_tour |
  juke_joint_experience | civil_rights_site
- `state`: two-letter (MS, TN, LA, AR, AL)
- `corridor_segment`: "Memphis" | "Delta (MS)" | "Natchez" | "NOLA" |
  "Arkansas" | "Side spur"
- `status`: active | seasonal | dormant | closed | under_renovation | unknown
- `national_register`: yes | no | nominated | unknown
- `wheelchair_accessible`: full | partial | no | unknown
- `reservations_required`: yes | no | groups_only | recommended | unknown
- `guided_tours_offered`: yes | no | self_guided_only | by_appointment | unknown
- `gift_shop`: yes | no | seasonal | unknown
- `cafe_food`: yes | no | nearby_only | unknown
- `our_relationship.status`: "never_contacted" | "cold_pitch" | "we_visited" |
  "occasional_partner" | "ongoing_partner" | "media_partner"
- `overall_confidence`: High | Medium | Low
- All unknown strings: "UNKNOWN"
- All unknown booleans: "UNKNOWN"
- All empty lists: []
- Each source: `- "<URL> — short description"`

===== RESEARCH TARGET =====

[PASTE TOURISM SITE NAME AND CITY HERE]

For example: "B.B. King Museum and Delta Interpretive Center, Indianola, MS"
or "Mississippi Blues Trail Marker — Robert Johnson grave, Greenwood, MS"

===== BEGIN OUTPUT =====
