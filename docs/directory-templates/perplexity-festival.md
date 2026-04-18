# Perplexity Prompt — FESTIVAL / RECURRING EVENT

Copy everything between the `=====` markers into a Perplexity deep research agent.

=====

You are researching a single FESTIVAL or RECURRING MUSIC EVENT on the
Mississippi music corridor (Memphis to New Orleans, including side spurs).
Can be a major blues or Americana festival, a smaller showcase, a monthly
concert series, or an annual event tied to a town or heritage site.

Your output is a YAML record matching the structure below. Every field:
verified data OR the literal string UNKNOWN. Cite every non-trivial claim.

===== RESEARCH RULES =====

1. Minimum 3 independent sources when possible.
2. Primary sources: festival's own website, recent news coverage, state
   tourism board listings.
3. CRITICAL: Verify "next edition dates" against current / upcoming year.
   Flag the record as stale if you can only find past editions.
4. Do NOT guess talent buyer contacts or fee ranges.
5. Add any UNKNOWN fields to `research.gaps_to_resolve`.
6. Confidence: High | Medium | Low with reasoning.

===== OUTPUT FORMAT =====

Output ONLY the YAML. No markdown fences. No commentary. Start with `festival:`
and end with the final `sources:` block.

===== TEMPLATE (fill this exactly) =====

festival:
  name: ""
  aka: []
  status: ""
  year_founded: ""
  year_last_held: ""
  next_edition_dates: ""
  typical_month: ""
  typical_dates: ""
  duration_days: null
  city: ""
  state: ""
  primary_venue: ""
  multi_venue: ""
  corridor_segment: ""
  website: ""
  phone: ""
  email: ""

scale:
  typical_attendance: null
  peak_attendance: null
  number_of_stages: null
  number_of_acts_annually: null
  ticket_price_range: ""
  day_passes_available: ""
  free_admission: ""

programming:
  primary_genres: []
  secondary_genres: []
  lineup_tier: ""
  curation_style: ""
  recent_headliners: []
  recurring_features: []
  notable_historic_performances: []

booking:
  submissions_open: ""
  submission_window: ""
  submission_url: ""
  talent_buyer_name: ""
  talent_buyer_email: ""
  booking_agency: ""
  accepts_direct_submissions: ""
  typical_fee_range_for_undercards: ""
  typical_fee_range_for_headliners: ""

business:
  organizer: ""
  organizer_type: ""
  annual_budget_estimate: ""
  sponsorship_opportunities: ""
  sponsorship_contact: ""
  sponsorship_levels: []
  media_partnerships: []
  media_credentials_url: ""

logistics:
  artist_hospitality_notes: ""
  lodging_partners: []
  production_notes: ""
  weather_contingency: ""

cultural_context:
  origin_story: ""
  cultural_significance: ""
  tourism_trail_affiliations: []
  awards_recognition: []
  notable_press_coverage: []

socials:
  instagram: ""
  facebook: ""
  twitter_x: ""
  tiktok: ""
  youtube: ""

our_relationship:
  status: ""
  our_acts_who_played: []
  past_involvement: ""
  notes: ""

research:
  date_profiled: "YYYY-MM-DD"
  overall_confidence: ""
  gaps_to_resolve: []
  next_call_or_email: ""

sources: []

===== FIELD NOTES =====

- `status`: active | on_hiatus | cancelled | one_time | dormant | defunct
- `state`: two-letter abbreviation
- `corridor_segment`: "Memphis" | "Delta (MS)" | "Natchez" | "NOLA" |
  "Arkansas" | "Side spur"
- `multi_venue`: yes | no | "mostly one venue"
- `primary_genres`: blues, soul, country, Americana, rock, indie, hip_hop,
  jazz, gospel, folk, zydeco, cajun, heritage_music, all_genres
- `lineup_tier`: "Major headliners (arena-scale)" | "Regional headliners + local" |
  "Local / regional only" | "Showcase / emerging artists"
- `curation_style`: "Booked by festival organizer" | "Open-call showcase" |
  "Agency submissions" | "Mix of curated + submitted"
- `accepts_direct_submissions`: yes | no | via_agency_only | unknown
- `free_admission`: yes | no | mixed (some stages free) | unknown
- `organizer_type`: nonprofit_501c3 | for_profit_llc | municipal |
  chamber_of_commerce | tourism_bureau | volunteer_collective | unknown
- `our_relationship.status`: "never_involved" | "attended" |
  "our_act_played" | "media_partner" | "ongoing_partner"
- `overall_confidence`: High | Medium | Low
- All unknown strings: "UNKNOWN"
- All empty lists: []
- Each source: `- "<URL> — short description"`

===== RESEARCH TARGET =====

[PASTE FESTIVAL NAME AND CITY HERE]

For example: "King Biscuit Blues Festival, Helena, AR" or
"Juke Joint Festival, Clarksdale, MS"

===== BEGIN OUTPUT =====
