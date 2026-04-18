# Perplexity Prompts — Directory Research

Six self-contained research prompts. Each is a full, copy-pasteable instruction set for a Perplexity deep research agent. One agent per record. One prompt per category.

## Files

| Category | Prompt File | Target |
|---|---|---|
| Venues | [`perplexity-venue.md`](./perplexity-venue.md) | Clubs, bars with stages, listening rooms, theaters, juke joints, festival grounds |
| Musicians | [`perplexity-musician.md`](./perplexity-musician.md) | Working bands and solo artists; heritage figures |
| Press | [`perplexity-press.md`](./perplexity-press.md) | Publications, writers, podcasters, influencers covering the region |
| Studios | [`perplexity-studio.md`](./perplexity-studio.md) | Recording studios, active and historic |
| Labels / Business | [`perplexity-label.md`](./perplexity-label.md) | Labels, publishers, management, booking agencies |
| Festivals | [`perplexity-festival.md`](./perplexity-festival.md) | Annual festivals and recurring event series |

## How to Use

1. Open the prompt file for the category you're researching.
2. Copy everything between the `=====` markers into a new Perplexity deep research task.
3. Replace the `[RESEARCH TARGET]` line at the bottom with the specific entity name and location.
4. Run the agent.
5. Save the YAML output to `Perplexity-research/{category}/{slug}.yaml` (or wherever your workflow puts it).

## Shared Conventions

Every prompt enforces the same rules:

- **Use multiple sources.** Three independent sources when possible.
- **Don't invent data.** If you can't verify it, write `UNKNOWN`.
- **Flag gaps.** Everything `UNKNOWN` gets added to `research.gaps_to_resolve` for human follow-up.
- **Cite everything.** Each `sources:` entry is `<URL> — short description`.
- **Rate confidence.** `High | Medium | Low` with one-sentence reasoning.
- **Pure YAML output.** No markdown fences, no commentary, just the record.

## Ingestion

Once Perplexity research is saved as YAML files, use `scripts/directory/ingest-venues.py` (and forthcoming siblings for other categories) to convert them into:

- A clean JSON catalog
- A per-record phone call list with gaps
- Per-city briefs
- Prisma upserts (when the DB side is wired)

See [`INGESTION-PLAN.md`](./INGESTION-PLAN.md) for the full pipeline.

## Next Up

When Chase drops Perplexity output files into `Perplexity-research/`, we parallel-build ingesters for:

- `scripts/directory/ingest-musicians.py`
- `scripts/directory/ingest-press.py`
- `scripts/directory/ingest-studios.py`
- `scripts/directory/ingest-labels.py`
- `scripts/directory/ingest-festivals.py`

Each one follows the pattern proven on venues: read YAML → emit JSON catalog + phone call list + per-city briefs + markdown summary.
