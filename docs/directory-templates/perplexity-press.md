# Perplexity Prompt — PRESS / MEDIA CONTACT

Copy everything between the `=====` markers into a Perplexity deep research agent.

=====

You are researching a single PRESS OUTLET or INDIVIDUAL JOURNALIST / PODCASTER
/ INFLUENCER who covers music, culture, food, or tourism in the Mississippi
music corridor (Memphis to New Orleans, including side spurs). Can be a
publication, an alt-weekly, a podcast, a YouTube channel, a TikTok creator,
a Substack writer, a radio host, or a blogger. Either national outlets that
cover the South, or regional outlets based in the corridor.

Your output is a YAML record matching the structure below. Every field: verified
data OR the literal string UNKNOWN. Cite every non-trivial claim.

===== RESEARCH RULES =====

1. Minimum 3 independent sources when possible.
2. Primary sources: outlet masthead, writer's own bylines and bios, LinkedIn,
   verified social profiles.
3. If you can't verify a field, set it to UNKNOWN.
4. Add any UNKNOWN fields to `research.gaps_to_resolve`.
5. Confidence: High | Medium | Low with reasoning.
6. If you're researching an outlet and it has multiple music writers, profile
   the most relevant one (music editor, senior music writer, or most frequent
   byline on corridor topics) — and note other writers in `other_writers`.

===== OUTPUT FORMAT =====

Output ONLY the YAML. No markdown code fences. No commentary. Start with
`outlet:` and end with the final `sources:` block.

===== TEMPLATE (fill this exactly) =====

outlet:
  name: ""
  type: ""
  tier: ""
  headquartered_city: ""
  headquartered_state: ""
  geographic_coverage: ""
  focus_areas: []
  year_founded: ""
  parent_company: ""
  website: ""
  masthead_url: ""

writer:
  name: ""
  role: ""
  email: ""
  phone: ""
  bio_url: ""
  other_writers: []

reach:
  audience_size_estimate: ""
  audience_size_tier: ""
  print_circulation: null
  web_monthly_uniques: null
  podcast_downloads_per_episode: null
  newsletter_subscribers: null
  youtube_subscribers: null
  tiktok_followers: null
  instagram_followers: null
  substack_subscribers: null
  demographic_notes: ""

contact:
  pitch_email: ""
  tip_email: ""
  press_release_email: ""
  pitch_form_url: ""
  preferred_method: ""
  response_time: ""
  embargo_policy: ""

socials:
  instagram: ""
  twitter_x: ""
  tiktok: ""
  linkedin: ""
  bluesky: ""
  threads: ""

pitch_style:
  what_they_like: ""
  what_they_avoid: ""
  typical_lead_time: ""
  common_story_formats: []
  recent_topics_covered: []

track_record:
  has_covered_corridor_music: ""
  recent_corridor_coverage: []
  notable_past_coverage: []

our_relationship:
  status: ""
  last_pitched: ""
  last_response: ""
  notes: ""

research:
  date_profiled: "YYYY-MM-DD"
  overall_confidence: ""
  gaps_to_resolve: []
  next_call_or_email: ""

sources: []

===== FIELD NOTES =====

- `type`: magazine | newspaper | alt_weekly | podcast | youtube | tiktok |
  substack | blog | radio_show | radio_station | video_publication | wire_service
- `tier`: national | regional | local | niche_enthusiast
- `focus_areas`: blues, americana, country, hip_hop, jazz, gospel, indie_rock,
  soul, southern_food, music_tourism, cultural_criticism, travel, lifestyle
- `geographic_coverage`: "National - covers South" | "Regional - Deep South" |
  "MS only" | "Delta region" | "Memphis metro" | "NOLA metro" etc.
- `audience_size_tier`: "<1k" | "1k-10k" | "10k-50k" | "50k-250k" | "250k-1M" | "1M+"
- `has_covered_corridor_music`: yes | no | sometimes | unknown
- `response_time`: "24hr" | "1 week" | "2-4 weeks" | "slow" | "never" | "unknown"
- `preferred_method`: "Email with EPK" | "DM on Instagram" | "Pitch form" |
  "Phone (rare)" | "Through agency" | "unknown"
- `our_relationship.status`: "never_pitched" | "cold_outreach" | "one_piece" |
  "occasional" | "regular" | "warm_contact"
- `overall_confidence`: High | Medium | Low
- All unknown strings: "UNKNOWN"
- All empty lists: []
- Each source: `- "<URL> — short description"`

===== RESEARCH TARGET =====

[PASTE OUTLET NAME, OR WRITER + OUTLET HERE]

For example: "Offbeat Magazine - music editor" or "Andrew McCarron, The Bitter Southerner"

===== BEGIN OUTPUT =====
