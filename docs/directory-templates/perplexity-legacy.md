# Perplexity Prompt — LEGACY ARTIST (DECEASED)

Copy everything between the `=====` markers into a Perplexity deep research agent.

=====

You are researching a single DECEASED blues, soul, country, or Americana
figure with a connection to the Mississippi music corridor (Memphis to
New Orleans, including side spurs to Little Rock, Jackson, Clarksdale,
Oxford, Helena, Greenville, Natchez, Baton Rouge, New Orleans). The goal
is to surface estate contacts, rights holders, catalog owners, and
sync-licensing reps so we can clear music, license likeness, or coordinate
heritage programming.

CRITICAL RULE: Only include DECEASED artists. Living/active artists belong
in musicians-seed, not here. If you cannot confirm a death year, STOP and
flag the record — do not file a living artist into legacy_artists.

Your output is a YAML record matching the structure below. Every field:
verified data OR the literal string UNKNOWN. Cite every non-trivial claim.
Do not invent estate contacts, foundation names, or rights structures.

===== RESEARCH RULES =====

1. Minimum 3 independent sources when possible.
2. Primary sources beat aggregators. Estate / foundation websites > rights
   organizations (BMI, ASCAP, SESAC) > Discogs / MusicBrainz > Wikipedia >
   news obituaries.
3. CRITICAL: Confirm death year from at least one primary obituary or
   estate-affiliated source. If unconfirmed, set `death_year: UNKNOWN`
   and add to `research.gaps_to_resolve`.
4. Do NOT guess sync rates, catalog ownership splits, or estate executor
   contact details. Mark UNKNOWN.
5. Add any UNKNOWN fields to `research.gaps_to_resolve`.
6. Confidence: High | Medium | Low with reasoning.
7. For artists whose catalog is split between multiple owners (e.g., early
   sides to one label, later masters to another), note the split in
   `rights.catalog_ownership_notes`.

===== OUTPUT FORMAT =====

Output ONLY the YAML. Do not wrap it in markdown code fences. Do not add
commentary before or after. Start with `legacy_artists:` and end with the
final `sources:` block.

===== TEMPLATE (fill this exactly) =====

legacy_artists:
  artist:
    name: ""
    aka: []
    real_name: ""
    birth_year: ""
    death_year: ""
    primary_location: ""
    birthplace_city: ""
    birthplace_state: ""
    death_city: ""
    death_state: ""
    burial_site: ""
    primary_genre: ""
    secondary_genres: []
    era: ""
    corridor_connection: ""
    bio_short: ""
    bio_long: ""

work:
  significant_recordings:
    - title: ""
      year: ""
      label: ""
      type: ""
      notes: ""
    - title: ""
      year: ""
      label: ""
      type: ""
      notes: ""
  recording_career_span: ""
  notable_collaborators: []
  notable_compositions: []
  signature_song: ""
  cultural_significance: ""

estate:
  estate_contact_name: ""
  estate_contact_email: ""
  estate_contact_phone: ""
  estate_executor: ""
  estate_attorney: ""
  estate_address: ""
  estate_website: ""
  estate_status: ""

rights:
  rights_holder_org: ""
  performing_rights_org: ""
  publisher: ""
  catalog_owner: ""
  catalog_ownership_notes: ""
  masters_owner: ""
  trademark_holder: ""
  likeness_rights_holder: ""

sync_licensing:
  sync_licensing_contact_name: ""
  sync_licensing_contact_email: ""
  sync_licensing_company: ""
  sync_typical_turnaround: ""
  sync_typical_fee_range: ""
  notable_sync_placements: []

heritage_programming:
  foundation_or_museum: ""
  foundation_website: ""
  foundation_contact: ""
  annual_celebrations: []
  scholarship_or_award: ""
  historical_marker: ""
  on_heritage_trail: []
  documentary_films: []

scholarship:
  biographer_or_scholar: ""
  biographer_contact: ""
  notable_books: []
  notable_documentaries: []
  archival_holdings: []

successors_and_influence:
  notable_successors: []
  artists_who_cite_as_influence: []
  living_collaborators: []
  cover_versions_notable: []

press:
  obituaries:
    - outlet: ""
      url: ""
      date: ""
  retrospective_coverage: []
  archival_photo_sources: []

research:
  date_profiled: "YYYY-MM-DD"
  death_confirmed: ""
  overall_confidence: ""
  gaps_to_resolve: []
  next_call_or_email: ""

sources: []

===== FIELD NOTES =====

- `era`: "Originator (pre-1960s)" | "Classic (1960s-1980s)" |
  "Veteran (1980s-2000s)" | "Modern (2000s-2020s)" | unknown
- `primary_genre`: delta_blues, hill_country_blues, electric_blues, soul,
  R&B, country, Americana, rock, hip-hop, jazz, gospel, folk, zydeco,
  cajun, brass_band, bluegrass
- `state`: two-letter abbreviation
- `type` (for significant_recordings): single | EP | album | live |
  compilation | session
- `estate_status`: "Active estate" | "Family-managed" | "Foundation-managed" |
  "Label-managed" | "In probate" | "No known estate" | "Public domain era" |
  unknown
- `performing_rights_org`: BMI | ASCAP | SESAC | GMR | unknown | none
- `historical_marker`: yes | no | pending | unknown
- `death_confirmed`: yes (cite obituary) | no — DO NOT FILE if "no"
- `overall_confidence`: High | Medium | Low
- All unknown strings: "UNKNOWN"
- All unknown booleans: "UNKNOWN"
- All empty lists: []
- Each source: `- "<URL> — short description"`

===== RESEARCH TARGET =====

[PASTE ARTIST NAME, BIRTH-DEATH YEARS, AND PRIMARY LOCATION HERE]

For example: "Robert Johnson (1911-1938), Hazlehurst MS" or
"Howlin' Wolf (1910-1976), West Point MS"

===== BEGIN OUTPUT =====
