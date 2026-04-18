# Directory Templates

These YAML templates define the shape of every record in Big Muddy's internal directory (the Catalog).
Every venue looks the same. Every musician looks the same. That consistency is what makes the directory useful — we can sort, filter, compare, and ingest without ad-hoc field mapping.

## Templates

| Category | Template | Purpose |
|---|---|---|
| Venues | `venue.template.yaml` | Clubs, bars, theaters, listening rooms, festival grounds |
| Musicians | `musician.template.yaml` | Working bands, solo artists, heritage figures |
| Press | `press.template.yaml` | Outlets and individual journalists, podcasters, influencers |
| Studios | `studio.template.yaml` | Recording studios, historic and active |
| Labels | `label.template.yaml` | Record labels, publishers, management, booking agencies |
| Festivals | `festival.template.yaml` | Annual festivals, recurring event series |

## Field Conventions

- `[required]` — must be filled before the record is considered complete
- `[verify]` — needs phone call / in-person confirmation
- `UNKNOWN` — use as the value when research couldn't find it, so gaps are grep-able
- `null` — use for unknown boolean/number fields, not empty string
- `[]` — empty array for unknown list fields

## Research Metadata

Every record has a `research:` block at the bottom:
- `researcher` — agent name or human who populated it
- `researched_at` — ISO date
- `sources` — list of URLs with descriptions (cite everything)
- `confidence` — High / Medium / Low with reasoning
- `gaps_to_resolve` — list of fields that need follow-up

## Workflow

1. **Research phase** → A dedicated Claude agent populates a YAML file from public sources. Flags gaps.
2. **Staging** → Records land in `data/directory/staging/{category}/{slug}.yaml`.
3. **Review** → Human reviews, confirms, fills gaps by phone if needed.
4. **Ingestion** → `scripts/directory-ingest.ts` reads approved YAML and writes to Prisma.
5. **Maintenance** → Every record has a review date. We re-verify at least once a year.

## Filesystem Layout

```
docs/directory-templates/           ← the templates themselves (this directory)
  venue.template.yaml
  musician.template.yaml
  ...

data/directory/
  staging/                          ← freshly researched records, not yet reviewed
    venue/
      ground-zero-clarksdale.yaml
      club-ebony-indianola.yaml
    musician/
      ...
    press/
      ...
  approved/                         ← reviewed, ready to ingest
    venue/
      ...
  rejected/                         ← dupes, out-of-scope, or bad data
    ...
```

## Ingestion

Run:
```
pnpm tsx scripts/directory-ingest.ts --category=venue --source=approved
```

The script:
- Reads every YAML in `data/directory/approved/{category}/`
- Validates against the template schema
- Upserts to the Prisma database (`DirectoryBusiness` with category-specific metadata JSON)
- Logs any validation errors to `data/directory/ingest-errors.log`
- Moves successfully ingested records to `data/directory/ingested/`
