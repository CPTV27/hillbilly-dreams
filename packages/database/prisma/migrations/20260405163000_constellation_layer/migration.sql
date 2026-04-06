-- Constellation layer: derived graph tables + rollup materialized views

CREATE TABLE "ConstellationNode" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "subtitle" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConstellationNode_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ConstellationNode_entityType_entityId_key" ON "ConstellationNode"("entityType", "entityId");
CREATE INDEX "ConstellationNode_entityType_idx" ON "ConstellationNode"("entityType");

CREATE TABLE "ConstellationEdge" (
    "id" TEXT NOT NULL,
    "fromType" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toType" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConstellationEdge_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ConstellationEdge_fromType_fromId_idx" ON "ConstellationEdge"("fromType", "fromId");
CREATE INDEX "ConstellationEdge_toType_toId_idx" ON "ConstellationEdge"("toType", "toId");
CREATE INDEX "ConstellationEdge_relation_idx" ON "ConstellationEdge"("relation");

CREATE MATERIALIZED VIEW constellation_mv_node_degree AS
SELECT
  n.id AS node_id,
  n."entityType",
  n."entityId",
  n.label,
  COALESCE(outdeg.c, 0) AS out_degree,
  COALESCE(indeg.c, 0) AS in_degree,
  COALESCE(outdeg.c, 0) + COALESCE(indeg.c, 0) AS total_degree
FROM "ConstellationNode" n
LEFT JOIN (
  SELECT "fromType" AS ft, "fromId" AS fid, COUNT(*)::int AS c
  FROM "ConstellationEdge"
  GROUP BY "fromType", "fromId"
) outdeg ON outdeg.ft = n."entityType" AND outdeg.fid = n."entityId"
LEFT JOIN (
  SELECT "toType" AS tt, "toId" AS tid, COUNT(*)::int AS c
  FROM "ConstellationEdge"
  GROUP BY "toType", "toId"
) indeg ON indeg.tt = n."entityType" AND indeg.tid = n."entityId";

CREATE UNIQUE INDEX constellation_mv_node_degree_pk ON constellation_mv_node_degree (node_id);

CREATE MATERIALIZED VIEW constellation_mv_city_digest AS
SELECT
  COALESCE(n.metadata->>'city', 'unknown') AS city_bucket,
  n."entityType",
  COUNT(*)::int AS node_count
FROM "ConstellationNode" n
GROUP BY 1, 2;

CREATE UNIQUE INDEX constellation_mv_city_digest_pk ON constellation_mv_city_digest (city_bucket, "entityType");

CREATE MATERIALIZED VIEW constellation_mv_route_stats AS
SELECT
  n."entityId" AS route_id,
  n.label AS route_name,
  COUNT(DISTINCT e."toId") FILTER (
    WHERE e.relation IN ('route_stop_venue', 'route_stop_hotel')
  )::int AS linked_stop_entities
FROM "ConstellationNode" n
LEFT JOIN "ConstellationEdge" e
  ON e."fromType" = 'route' AND e."fromId" = n."entityId"
WHERE n."entityType" = 'route'
GROUP BY n."entityId", n.label;

CREATE UNIQUE INDEX constellation_mv_route_stats_pk ON constellation_mv_route_stats (route_id);

CREATE MATERIALIZED VIEW constellation_mv_directory_fanout AS
SELECT
  n."entityId" AS directory_business_id,
  n.label AS business_name,
  COUNT(e.id)::int AS inbound_touring_links
FROM "ConstellationNode" n
LEFT JOIN "ConstellationEdge" e
  ON e."toType" = n."entityType" AND e."toId" = n."entityId"
WHERE n."entityType" = 'directory_business'
GROUP BY n."entityId", n.label;

CREATE UNIQUE INDEX constellation_mv_directory_fanout_pk ON constellation_mv_directory_fanout (directory_business_id);
