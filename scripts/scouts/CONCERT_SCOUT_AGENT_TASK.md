# Agent task: Concert Scout (Natchez music calendars × Power Map)

**Owner:** Growth / Media agents (read-only public calendars; no scraping behind logins without approval).

## Objective

Monitor **local Natchez and Adams County public music listings**, extract **performer names + date + venue**, and **cross-reference** against:

- `DirectoryBusiness` (Natchez / 391xx)
- `Lead` / chamber-adjacent orgs
- Talent pipeline `Artist` (slug, city, status)

## Cadence

- **Weekly** minimum; **48h** before known corridor festivals increase to daily.

## Outputs

1. JSON or CSV append: `{ performer, venueText, dateISO, sourceUrl, matchedArtistId?, matchedDirectoryId?, powerScoreNote }`
2. For net-new high-signal acts, open a **human-reviewed** row: suggest `Performance` + optional `Artist` discovery (`source: scouted`).
3. **Never** auto-contact performers; enqueue for ops.

## Sources (examples — verify ToS)

- Venue sites, tourism board event pages, public Facebook events (manual or approved API), chamber calendars.

## Done when

Top-of-funnel list is reconciled with `Performance` schedule gaps and **Intel-tier** “who’s in town” brief is reproducible from queries.
