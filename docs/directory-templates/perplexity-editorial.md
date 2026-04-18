# Perplexity Prompt — EDITORIAL PITCH

Copy everything between the `=====` markers into a Perplexity deep research agent.

=====

You are researching a single STORY ANGLE / EDITORIAL PITCH for Big Muddy
Magazine or for freelance placement in regional and national outlets that
cover the Mississippi music corridor (Memphis to New Orleans, including
side spurs). Pitches can be undercovered narratives, follow-up beats from
existing reporting, profiles of underexamined figures, investigations into
industry shifts, or photo essays on cultural moments.

Your output is a YAML record matching the structure below. Every field:
verified data OR the literal string UNKNOWN. Cite every non-trivial claim.
Do not invent sources, news pegs, or competitive coverage gaps.

===== RESEARCH RULES =====

1. Minimum 3 independent sources when possible.
2. Primary sources beat aggregators. Original reporting > industry trade
   coverage > regional press > Wikipedia.
3. CRITICAL: Survey existing coverage first. If a major outlet has already
   published the angle within the last 24 months, downgrade
   `originality_score` and propose a sharper frame.
4. Do NOT invent quotes, sources, or stats. Mark UNKNOWN.
5. Add any UNKNOWN fields to `research.gaps_to_resolve`.
6. Confidence: High | Medium | Low with reasoning.
7. The pitch should be specific, fact-checkable, and have a clear "why now."

===== OUTPUT FORMAT =====

Output ONLY the YAML. Do not wrap it in markdown code fences. Do not add
commentary before or after. Start with `editorial:` and end with the final
`sources:` block.

===== TEMPLATE (fill this exactly) =====

editorial:
  pitch:
    headline: ""
    aka: []
    pitch_type: ""
    one_line_summary: ""
    full_lede: ""
    nut_graf: ""
    angle: ""
    proposed_outlet: ""
    backup_outlets: []
    word_count_target: null
    proposed_section: ""
    geographic_focus: ""
    corridor_segment: ""

context:
  why_now: ""
  news_peg: ""
  news_peg_date: ""
  evergreen_or_timely: ""
  cultural_moment: ""
  related_anniversaries: []

reporting_plan:
  key_sources_to_interview:
    - name: ""
      role: ""
      why_essential: ""
      contact_status: ""
    - name: ""
      role: ""
      why_essential: ""
      contact_status: ""
  documents_to_obtain: []
  data_to_request: []
  scenes_to_witness: []
  travel_required: ""
  estimated_reporting_time: ""

competitive_landscape:
  competitive_coverage: []
  prior_coverage_gaps: ""
  what_we_do_differently: ""
  originality_score: ""

production:
  needs_photography: ""
  needs_video: ""
  needs_audio: ""
  proposed_photographer: ""
  proposed_designer: ""
  multimedia_notes: ""

distribution:
  pitch_status: ""
  pitched_to: []
  editor_contact_name: ""
  editor_contact_email: ""
  pay_range: ""
  rights_offered: ""
  reprint_strategy: ""

bigmuddy_fit:
  fits_bigmuddy_voice: ""
  fits_freelance_only: ""
  why_us: ""
  bigmuddy_lane: ""
  could_become_series: ""
  related_bigmuddy_pieces: []

risk:
  legal_review_needed: ""
  sensitive_subjects: []
  defamation_exposure: ""
  safety_considerations: ""

research:
  date_profiled: "YYYY-MM-DD"
  overall_confidence: ""
  gaps_to_resolve: []
  next_call_or_email: ""

sources: []

===== FIELD NOTES =====

- `pitch_type`: feature | profile | investigation | listicle | essay |
  photo_essay | obituary | service_journalism | reported_review |
  oral_history
- `corridor_segment`: "Memphis" | "Delta (MS)" | "Natchez" | "NOLA" |
  "Arkansas" | "Side spur" | "Whole corridor"
- `evergreen_or_timely`: evergreen | timely | tied_to_anniversary |
  tied_to_news_event
- `originality_score`: high (no prior coverage) | medium (partial coverage,
  fresh angle) | low (well-covered, marginal angle)
- `contact_status`: not_contacted | reached_out | confirmed |
  declined | unreachable
- `pitch_status`: idea | drafted | pitched | accepted | filed |
  published | killed
- `needs_photography`: yes | no | stock_only | unknown
- `bigmuddy_lane`: "Touring" | "Magazine" | "Records" | "Radio" |
  "Inn" | "Crossover" | "n/a"
- `legal_review_needed`: yes | no | maybe | unknown
- `overall_confidence`: High | Medium | Low
- All unknown strings: "UNKNOWN"
- All unknown booleans: "UNKNOWN"
- All unknown numbers: null
- All empty lists: []
- Each source: `- "<URL> — short description"`

===== RESEARCH TARGET =====

[PASTE PITCH HEADLINE OR ONE-LINE PREMISE HERE]

For example: "The disappearance of the Mississippi juke joint, 2010-2026"
or "How Beale Street stays touristy while Bourbon Street stays scary"

===== BEGIN OUTPUT =====
