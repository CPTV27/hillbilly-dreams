# ADR-001: Neo4j Hybrid Graph — Deferred to Phase 2

**Status:** Deferred
**Date:** 2026-04-05
**Decision maker:** Chase Pierson

---

## Context

The corridor data flywheel and multi-brand ecosystem are conceptually graph-shaped — venues near venues, bands playing shows that generate articles that drive directory listings that book rooms. A graph database (Neo4j) would model these relationships natively.

## Decision

Keep everything in PostgreSQL (with JSONB + PostGIS + good indexes) for now. Neo4j comes in Phase 2 as a **read-optimized projection** from Postgres, not a new source of truth.

## Rationale

1. **No live relationship density yet.** DSD doesn't have paying customers generating reviews, referrals, co-attendance, or route data. Graph queries need graph data.
2. **1-2 hop queries work fine in Postgres.** "Who's near what" and "which venues cluster" are solved by PostGIS + JOINs until fan-out proves otherwise.
3. **April window is too tight.** Dogfooding, DSD packaging, Delta Dawn plumbing, and the April 10 code freeze have higher leverage than adding a second data store.

## Revisit Triggers (all three must be true)

- DSD has **paying customers** regularly generating relationship data (reviews, referrals, co-attendance, routes)
- At least one **concrete, painful** 2+ hop question that's slow or awkward in Postgres but clearly valuable for sales, targeting, or civic work
- Safely past the April push with slack to add infrastructure without jeopardizing live revenue

## Scope Impact

- **No code changes now.** Prisma schemas, Delta Dawn tools, and all queries stay PostgreSQL-only.
- **When reopened:** Neo4j as read-optimized projection synced from Postgres via CDC or batch ETL. Postgres remains source of truth.
- **Affected systems:** Delta Dawn NL2SQL (would need graph query layer), Spatial Explorer (could render graph natively), DSD analytics (relationship-based insights)

## Alternatives Considered

| Option | Rejected Because |
|--------|-----------------|
| Neo4j now | No data to query, adds ops burden during freeze |
| Apache AGE (Postgres extension) | Interesting but immature, adds complexity for same "no data" problem |
| Pure JSONB adjacency | Already doing this implicitly — works until it doesn't |
