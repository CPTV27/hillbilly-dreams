-- Constellation Materialized Views
-- Run after seeding ConstellationNode + ConstellationEdge tables.
-- These are read-only rollups for fast queries.

-- 1. Node summary by city — "What's in each corridor city?"
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_constellation_city_summary AS
SELECT
  n.city,
  n.state,
  n."entityType",
  COUNT(*) AS node_count,
  json_agg(json_build_object(
    'id', n.id,
    'label', n.label,
    'entityId', n."entityId"
  ) ORDER BY n.label) AS nodes
FROM "ConstellationNode" n
WHERE n.city IS NOT NULL
GROUP BY n.city, n.state, n."entityType"
ORDER BY n.city, n."entityType";

-- 2. Edge density — "Which cities are most connected?"
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_constellation_edge_density AS
SELECT
  src.city AS source_city,
  src.state AS source_state,
  tgt.city AS target_city,
  tgt.state AS target_state,
  e."edgeType",
  COUNT(*) AS edge_count,
  AVG(e.weight) AS avg_weight
FROM "ConstellationEdge" e
JOIN "ConstellationNode" src ON e."sourceId" = src.id
JOIN "ConstellationNode" tgt ON e."targetId" = tgt.id
WHERE src.city IS NOT NULL AND tgt.city IS NOT NULL
GROUP BY src.city, src.state, tgt.city, tgt.state, e."edgeType"
ORDER BY edge_count DESC;

-- 3. Node degree — "Which nodes have the most connections?"
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_constellation_node_degree AS
SELECT
  n.id,
  n."entityType",
  n."entityId",
  n.label,
  n.city,
  n.state,
  COALESCE(out_deg.cnt, 0) AS out_degree,
  COALESCE(in_deg.cnt, 0) AS in_degree,
  COALESCE(out_deg.cnt, 0) + COALESCE(in_deg.cnt, 0) AS total_degree
FROM "ConstellationNode" n
LEFT JOIN (
  SELECT "sourceId", COUNT(*) AS cnt FROM "ConstellationEdge" GROUP BY "sourceId"
) out_deg ON n.id = out_deg."sourceId"
LEFT JOIN (
  SELECT "targetId", COUNT(*) AS cnt FROM "ConstellationEdge" GROUP BY "targetId"
) in_deg ON n.id = in_deg."targetId"
ORDER BY total_degree DESC;

-- 4. Flywheel path — "Trace the revenue cycle"
-- This is a simple view of flywheel edges with source/target labels
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_constellation_flywheel AS
SELECT
  e.id AS edge_id,
  src.label AS source_label,
  src."entityType" AS source_type,
  tgt.label AS target_label,
  tgt."entityType" AS target_type,
  e."edgeType",
  e.weight,
  e.meta
FROM "ConstellationEdge" e
JOIN "ConstellationNode" src ON e."sourceId" = src.id
JOIN "ConstellationNode" tgt ON e."targetId" = tgt.id
WHERE e."edgeType" IN ('flywheel', 'hierarchy')
ORDER BY
  CASE e."edgeType" WHEN 'hierarchy' THEN 0 ELSE 1 END,
  src.label;

-- Refresh command (run after seed or data changes):
-- REFRESH MATERIALIZED VIEW mv_constellation_city_summary;
-- REFRESH MATERIALIZED VIEW mv_constellation_edge_density;
-- REFRESH MATERIALIZED VIEW mv_constellation_node_degree;
-- REFRESH MATERIALIZED VIEW mv_constellation_flywheel;

-- ============================================================
-- SAMPLE QUERIES (run these to test the constellation)
-- ============================================================

-- Q1: "What's around a venue?" (1-hop neighborhood)
-- SELECT n2.label, n2."entityType", e."edgeType", e.weight
-- FROM "ConstellationEdge" e
-- JOIN "ConstellationNode" n1 ON (e."sourceId" = n1.id OR e."targetId" = n1.id)
-- JOIN "ConstellationNode" n2 ON (n2.id = CASE WHEN e."sourceId" = n1.id THEN e."targetId" ELSE e."sourceId" END)
-- WHERE n1."entityType" = 'venue' AND n1.label = 'Under-the-Hill Saloon';

-- Q2: "Show me the full flywheel"
-- SELECT * FROM mv_constellation_flywheel WHERE "edgeType" = 'flywheel';

-- Q3: "Which nodes are most connected?"
-- SELECT label, "entityType", total_degree FROM mv_constellation_node_degree LIMIT 10;

-- Q4: "What corridor cities have the most diverse entity types?"
-- SELECT city, state, COUNT(DISTINCT "entityType") AS type_diversity, SUM(node_count) AS total_nodes
-- FROM mv_constellation_city_summary
-- GROUP BY city, state
-- ORDER BY type_diversity DESC, total_nodes DESC;

-- Q5: 2-hop from a node (recursive CTE)
-- WITH RECURSIVE neighborhood AS (
--   SELECT e."targetId" AS node_id, 1 AS depth
--   FROM "ConstellationEdge" e
--   WHERE e."sourceId" = (SELECT id FROM "ConstellationNode" WHERE label = 'Big Muddy Touring' AND "entityType" = 'brand')
--   UNION
--   SELECT e."targetId", n.depth + 1
--   FROM "ConstellationEdge" e
--   JOIN neighborhood n ON e."sourceId" = n.node_id
--   WHERE n.depth < 2
-- )
-- SELECT DISTINCT cn.label, cn."entityType", nh.depth
-- FROM neighborhood nh
-- JOIN "ConstellationNode" cn ON cn.id = nh.node_id
-- ORDER BY nh.depth, cn."entityType";
