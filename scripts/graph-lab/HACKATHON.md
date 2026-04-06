# HDI Graph Lab Hackathon

*April 5, 2026. Infrastructure costs: $167/month. Experimentation budget: unlimited time, zero dollars.*

---

## The Question

Does the HDI corridor ecosystem need a graph database, or is PostgreSQL enough?

## The Entries

### Entry 1: NetworkX Analysis (DONE)
**File:** `constellation_live.py`
**Status:** Complete
**Result:** Flywheel confirmed as single fragile 6-node cycle. Postgres fine at current scale. Graph DB justified at 50K+ businesses.

### Entry 2: PostgreSQL Benchmark
**File:** `postgres_benchmark.sql`
**Task:** Run the same corridor queries (downstream impact, venue clustering, full attribution) against our live Neon database using recursive CTEs. Measure actual query times.
**Agent:** Patch / any agent with DB access
**Win condition:** Query times under 100ms for 2-hop, under 500ms for 5-hop

### Entry 3: Neo4j Aura Free Tier
**File:** `neo4j_sync.py`
**Task:** Sign up for Neo4j Aura free (200K nodes). Sync constellation data + simulated corridor data. Run same queries in Cypher. Compare readability and speed.
**Agent:** Any agent, needs Chase to create Aura account
**Win condition:** Same queries run faster AND more readable than Postgres CTEs

### Entry 4: Apache AGE (Postgres Extension)
**File:** `age_test.sql`
**Task:** Test if Neon supports AGE extension. If not, spin up a $5/month Supabase or Railway Postgres with AGE enabled. Run Cypher queries inside Postgres.
**Agent:** Patch
**Win condition:** Graph queries without leaving Postgres ecosystem

### Entry 5: JSONB Adjacency List
**File:** `jsonb_graph.sql`
**Task:** Model the constellation as JSONB documents with embedded edge arrays. Test traversal with Postgres JSONB operators. No new infrastructure.
**Agent:** Any agent
**Win condition:** Zero-infrastructure graph queries using what we already have

### Entry 6: D3-force Live Visualization
**File:** Already built — `components/explorer/SpatialCanvas.tsx`
**Task:** Feed the `constellation.json` export from Entry 1 into the live Spatial Explorer. Add real-time analytics overlay (centrality, PageRank) as a toggle.
**Agent:** Frontend / AG
**Win condition:** Graph analysis visible in the iPad constellation explorer

---

## Judging Criteria

| Criterion | Weight |
|-----------|--------|
| Answers real business questions | 30% |
| Zero or minimal infrastructure cost | 25% |
| Works with existing Postgres/Prisma | 20% |
| Developer experience / readability | 15% |
| Future scalability to 50K nodes | 10% |

## Current Standings

| Entry | Status | Score |
|-------|--------|-------|
| 1. NetworkX | COMPLETE | Baseline established |
| 2. Postgres benchmark | NOT STARTED | — |
| 3. Neo4j Aura | NOT STARTED (needs account) | — |
| 4. Apache AGE | NOT STARTED | — |
| 5. JSONB adjacency | NOT STARTED | — |
| 6. D3 overlay | PARTIAL (explorer exists) | — |

## Rules

- No production changes. Everything in `scripts/graph-lab/` or throwaway databases.
- No new monthly costs unless Chase approves.
- Each entry must answer the same 4 queries:
  1. "What downstream events did show X generate?"
  2. "Which venues cluster through shared performers?"
  3. "Full attribution: band → show → article → booking → $$$"
  4. "What's the shortest flywheel path between any two nodes?"
- Document results in this file.

## How to Run Entry 1

```bash
python3 scripts/graph-lab/constellation_live.py    # Analysis + visualization
python3 scripts/graph-lab/flywheel_analysis.py     # Full comparison with SQL examples
python3 scripts/graph-lab/flywheel_analysis.py --neo4j  # Generate Cypher import
```
