# Perplexity Prompt — LABEL / PUBLISHER / MANAGEMENT / BOOKING AGENCY

Copy everything between the `=====` markers into a Perplexity deep research agent.

=====

You are researching a single MUSIC BUSINESS ENTITY — a record label, music
publisher, management company, booking agency, or sync/licensing house — with
a connection to the Mississippi music corridor. "Connection" means: based
there, releases artists from there, or actively signs / represents / books
artists from the region.

Your output is a YAML record matching the structure below. Every field:
verified data OR the literal string UNKNOWN. Cite every non-trivial claim.

===== RESEARCH RULES =====

1. Minimum 3 independent sources when possible.
2. Primary sources: entity's own website, SEC filings if public, Discogs,
   Songkick (for booking agencies), MusicBrainz.
3. Do NOT guess submission policies, A&R contacts, or deal structures.
4. Add any UNKNOWN fields to `research.gaps_to_resolve`.
5. Confidence: High | Medium | Low with reasoning.

===== OUTPUT FORMAT =====

Output ONLY the YAML. No markdown fences. No commentary. Start with `entity:`
and end with the final `sources:` block.

===== TEMPLATE (fill this exactly) =====

entity:
  name: ""
  aka: []
  type: ""
  parent_company: ""
  status: ""
  year_founded: ""
  year_closed: ""
  founder: ""
  current_owner_or_principal: ""
  headquarters_city: ""
  headquarters_state: ""
  regional_focus: ""
  website: ""
  phone: ""
  email: ""

roster:
  approximate_size: null
  roster_highlights: []
  signature_artists_from_corridor: []
  recent_signings: []
  notable_releases_recent: []
  notable_releases_historic: []

programming_focus:
  primary_genres: []
  secondary_genres: []
  sub_label_imprints: []
  distribution_partners: []

contacts:
  a_and_r_contacts:
    - name: ""
      role: ""
      email: ""
      focus: ""
    - name: ""
      role: ""
      email: ""
      focus: ""
  booking_contacts:
    - name: ""
      role: ""
      email: ""
  management_contacts:
    - name: ""
      role: ""
      email: ""
  sync_licensing_contacts:
    - name: ""
      role: ""
      email: ""
  submissions_portal_url: ""

business_terms:
  accepts_submissions: ""
  submission_policy: ""
  typical_deal_type: ""
  term_length: ""
  advance_range: ""
  rights_structure: ""
  masters_ownership: ""
  publishing_included: ""

socials:
  instagram: ""
  facebook: ""
  twitter_x: ""
  tiktok: ""
  youtube: ""
  linkedin: ""

our_relationship:
  status: ""
  artists_we_share: []
  past_collaborations: []
  notes: ""

research:
  date_profiled: "YYYY-MM-DD"
  overall_confidence: ""
  gaps_to_resolve: []
  next_call_or_email: ""

sources: []

===== FIELD NOTES =====

- `type`: record_label | music_publisher | management_company | booking_agency |
  sync_licensing | distribution_company | pr_firm | entertainment_law_firm
- `status`: active | dormant | acquired | closed
- `state`: two-letter abbreviation
- `regional_focus`: "MS Delta" | "Memphis" | "NOLA" | "National - Southern focused" |
  "National - genre focused" | "Niche - Blues only" etc.
- `primary_genres`: delta_blues, hill_country_blues, soul, country, Americana,
  indie_rock, hip_hop, gospel, jazz, folk, bluegrass, zydeco, all_genres
- `accepts_submissions`: yes | no | by_referral_only | via_portal_only | unknown
- `typical_deal_type`: "50/50 partnership" | "Traditional royalty" |
  "Licensing only" | "Master funded" | "Full ownership" | "unknown"
- `masters_ownership`: "Artist keeps masters" | "Label keeps masters" |
  "Revert after N years" | "Shared" | "unknown"
- `our_relationship.status`: "never_contacted" | "cold_pitch" |
  "artist_is_on_this_label" | "past_collaboration" | "active_partnership"
- `overall_confidence`: High | Medium | Low
- All unknown strings: "UNKNOWN"
- All empty lists: []
- Each source: `- "<URL> — short description"`

===== RESEARCH TARGET =====

[PASTE ENTITY NAME AND TYPE HERE]

For example: "Fat Possum Records, Oxford MS" or "Big Legal Mess Records" or
"The Agency Group (Memphis office)"

===== BEGIN OUTPUT =====
