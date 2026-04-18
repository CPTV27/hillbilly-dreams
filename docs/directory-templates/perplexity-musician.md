# Perplexity Prompt — MUSICIAN / BAND

Copy everything between the `=====` markers into a Perplexity deep research agent.

=====

You are researching a single MUSICIAN or BAND with a connection to the
Mississippi music corridor (Memphis to New Orleans, including side spurs to
Little Rock, Jackson, Clarksdale, Oxford, Helena, Greenville, Natchez,
Baton Rouge, New Orleans). "Connection" means: based there, regularly plays
there, or is part of the regional music heritage.

Your output is a YAML record that EXACTLY matches the structure below. Every
field must be populated with either verified data or the literal string
UNKNOWN (so gaps are grep-able). Cite every non-trivial claim. Do not invent
plausible-sounding details.

===== RESEARCH RULES =====

1. Use at least 3 independent sources where possible.
2. Primary sources beat aggregators. Artist's own website/socials > Spotify/
   Bandcamp > Wikipedia > news coverage.
3. If you can't verify a field, set it to UNKNOWN. Do NOT guess fee ranges,
   agent contacts, lineup, or discography.
4. Add any UNKNOWN fields to the `research.gaps_to_resolve` list.
5. Rate overall confidence: High | Medium | Low with one-sentence reasoning.
6. For heritage/deceased artists, focus on estate/foundation contacts, living
   collaborators, and legacy venues — mark `legacy.is_heritage: "yes"`.

===== OUTPUT FORMAT =====

Output ONLY the YAML. Do not wrap in markdown code fences. Do not add
commentary. Start with `artist:` and end with the final `sources:` block.

===== TEMPLATE (fill this exactly) =====

artist:
  name: ""
  aka: []
  real_name: ""
  members: []
  status: ""
  corridor_connection: ""

origin:
  home_city: ""
  home_state: ""
  era: ""
  birth_year: ""
  death_year: ""
  touring_radius: ""
  bio_short: ""
  bio_long: ""

work:
  primary_genres: []
  secondary_genres: []
  influences: []
  sounds_like: []
  key_recordings:
    - title: ""
      type: ""
      year: ""
      listen_url: ""
    - title: ""
      type: ""
      year: ""
      listen_url: ""
  discography_highlights: ""
  notable_collaborations: []

links:
  spotify: ""
  bandcamp: ""
  soundcloud: ""
  youtube: ""
  apple_music: ""
  website: ""

socials:
  instagram: ""
  facebook: ""
  twitter_x: ""
  tiktok: ""

booking:
  self_booked: ""
  agent_name: ""
  agent_agency: ""
  manager_name: ""
  management_company: ""
  label: ""
  booking_email: ""
  booking_phone: ""
  preferred_contact_method: ""
  currently_touring: ""

fees:
  typical_show: ""
  festival_fee: ""
  solo_fee: ""
  duo_fee: ""
  full_band_fee: ""
  availability_notes: ""

press:
  press_photo_url: ""
  epk_url: ""
  recent_press: []

legacy:
  is_heritage: ""
  peak_era: ""
  home_venue: ""
  estate_contact: ""
  foundation: ""
  notable_successors: []

research:
  date_profiled: "YYYY-MM-DD"
  overall_confidence: ""
  gaps_to_resolve: []
  next_call_or_email: ""

sources: []

===== FIELD NOTES =====

- `status`: active | on_hiatus | retired | deceased | unknown
- `era`: "Emerging (2020s)" | "Established (2000s-2020s)" | "Veteran (1980s-2000s)" |
  "Classic (1960s-1980s)" | "Originator (pre-1960s)" | unknown
- `primary_genres`: delta_blues, hill_country_blues, electric_blues, soul, R&B,
  country, Americana, rock, indie_rock, hip-hop, jazz, gospel, folk, zydeco,
  cajun, brass_band, bluegrass, classical, singer_songwriter
- `touring_radius`: local | corridor | regional_south | national | international | retired
- `type` (for key_recordings): single | EP | album | live | compilation
- `self_booked`: yes | no | mixed | unknown
- `is_heritage`: yes | no — set "yes" for historic figures (pre-1990s peak)
- `overall_confidence`: High | Medium | Low
- All unknown strings: "UNKNOWN"
- All unknown booleans: "UNKNOWN"
- All empty lists: []
- Each source: `- "<URL> — short description"`

===== RESEARCH TARGET =====

[PASTE ARTIST NAME AND HOME CITY/STATE HERE]

For example: "Cedric Burnside, Holly Springs, MS" or "Robert Johnson, Hazlehurst, MS"

===== BEGIN OUTPUT =====
