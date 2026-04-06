#!/usr/bin/env python3
"""
HDI Flywheel Graph Analysis
Tests whether the corridor ecosystem actually needs a graph database
or if PostgreSQL JOINs are fine.

Run: python3 scripts/graph-lab/flywheel_analysis.py
"""

import networkx as nx
import json
import sys

# --- HDI Constellation Data (from components/explorer/nodes.ts) ---

NODES = [
    {"id": "hdi", "label": "Hillbilly Dreams Inc", "type": "holding", "revenue": 160000},
    {"id": "mbt", "label": "Measurably Better Things", "type": "platform", "modules": 9, "models": 122},
    {"id": "touring", "label": "Big Muddy Touring", "type": "brand", "multiplier": 2.0},
    {"id": "magazine", "label": "Big Muddy Magazine", "type": "brand", "articles": 27},
    {"id": "radio", "label": "Big Muddy Radio", "type": "brand", "streams": True},
    {"id": "records", "label": "Big Muddy Records", "type": "brand", "per_release": 3000},
    {"id": "dsd", "label": "Deep South Directory", "type": "product", "pricing": [0, 20, 49, 99, 250]},
    {"id": "inn", "label": "The Big Muddy Inn", "type": "venue", "rooms": 6},
    {"id": "bearsville", "label": "Bearsville Creative", "type": "region", "status": "summer_2026"},
    {"id": "gallery", "label": "Chase Pierson Photography", "type": "brand", "photos": 17956},
]

# Hierarchy edges (parent -> child)
HIERARCHY = [
    ("hdi", "mbt"),
    ("mbt", "touring"), ("mbt", "magazine"), ("mbt", "radio"), ("mbt", "records"),
    ("mbt", "dsd"), ("mbt", "inn"), ("mbt", "bearsville"), ("mbt", "gallery"),
]

# Flywheel edges (the revenue cycle)
FLYWHEEL = [
    ("touring", "records"),   # Shows produce recordings
    ("records", "radio"),     # Records get airplay
    ("radio", "magazine"),    # Radio drives stories
    ("magazine", "dsd"),      # Stories drive directory listings
    ("dsd", "inn"),           # Directory drives bookings
    ("inn", "touring"),       # Inn hosts the next show (cycle completes)
]

# --- Simulated corridor data (what we'd have with real DSD customers) ---

VENUES = [
    {"id": "v_smoot", "name": "Smoot's Grocery", "type": "venue", "capacity": 200},
    {"id": "v_biscuits", "name": "Biscuits & Blues", "type": "restaurant", "tables": 30},
    {"id": "v_bluff", "name": "Under the Hill Saloon", "type": "bar", "capacity": 100},
    {"id": "v_inn", "name": "Big Muddy Inn", "type": "hotel", "rooms": 6},
    {"id": "v_temple", "name": "Temple B'nai Israel", "type": "venue", "capacity": 400},
]

BANDS = [
    {"id": "b_river", "name": "River Rats", "genre": "blues"},
    {"id": "b_delta", "name": "Delta Prophets", "genre": "soul"},
    {"id": "b_muddy", "name": "Muddy Boots", "genre": "country"},
]

SHOWS = [
    {"id": "s1", "band": "b_river", "venue": "v_smoot", "date": "2026-04-15", "tickets": 150},
    {"id": "s2", "band": "b_delta", "venue": "v_bluff", "date": "2026-04-22", "tickets": 80},
    {"id": "s3", "band": "b_muddy", "venue": "v_temple", "date": "2026-04-29", "tickets": 300},
    {"id": "s4", "band": "b_river", "venue": "v_inn", "date": "2026-05-06", "tickets": 50},
]

ARTICLES = [
    {"id": "a1", "about_show": "s1", "about_venue": "v_smoot", "title": "River Rats Pack Smoot's"},
    {"id": "a2", "about_show": "s2", "about_band": "b_delta", "title": "Delta Prophets Under the Hill"},
    {"id": "a3", "about_venue": "v_biscuits", "title": "Regina's Kitchen: Still the Best"},
]

BOOKINGS = [
    {"id": "bk1", "guest": "g1", "room": "v_inn", "reason_show": "s1"},
    {"id": "bk2", "guest": "g2", "room": "v_inn", "reason_show": "s3"},
    {"id": "bk3", "guest": "g3", "room": "v_inn", "reason_article": "a3"},
]

# =========================================================================

def build_ecosystem_graph():
    """Build the full HDI ecosystem as a directed multigraph."""
    G = nx.DiGraph()

    # Add constellation nodes
    for n in NODES:
        G.add_node(n["id"], **n)

    for src, tgt in HIERARCHY:
        G.add_edge(src, tgt, type="hierarchy")

    for src, tgt in FLYWHEEL:
        G.add_edge(src, tgt, type="flywheel")

    return G


def build_corridor_graph():
    """Build the simulated corridor graph (what real DSD data would look like)."""
    G = nx.DiGraph()

    for v in VENUES:
        G.add_node(v["id"], **v)
    for b in BANDS:
        G.add_node(b["id"], **b)
    for s in SHOWS:
        G.add_node(s["id"], kind="show", **s)
        G.add_edge(s["band"], s["id"], type="performs")
        G.add_edge(s["id"], s["venue"], type="at_venue")
    for a in ARTICLES:
        G.add_node(a["id"], kind="article", **a)
        if "about_show" in a:
            G.add_edge(a["id"], a["about_show"], type="covers")
        if "about_venue" in a:
            G.add_edge(a["id"], a["about_venue"], type="covers")
        if "about_band" in a:
            G.add_edge(a["id"], a["about_band"], type="covers")
    for bk in BOOKINGS:
        G.add_node(bk["id"], kind="booking", **bk)
        G.add_edge(bk["id"], bk["room"], type="stays_at")
        if "reason_show" in bk:
            G.add_edge(bk["id"], bk["reason_show"], type="because_of")
        if "reason_article" in bk:
            G.add_edge(bk["id"], bk["reason_article"], type="because_of")

    return G


def analyze_ecosystem(G):
    """Run graph analytics on the ecosystem."""
    print("=" * 60)
    print("HDI ECOSYSTEM GRAPH ANALYSIS")
    print("=" * 60)
    print(f"\nNodes: {G.number_of_nodes()}")
    print(f"Edges: {G.number_of_edges()}")

    # Flywheel cycle detection
    cycles = list(nx.simple_cycles(G))
    flywheel_cycles = [c for c in cycles if len(c) >= 4]
    print(f"\nFlywheel cycles found: {len(flywheel_cycles)}")
    for i, cycle in enumerate(flywheel_cycles):
        labels = [G.nodes[n].get("label", n) for n in cycle]
        print(f"  Cycle {i+1}: {' → '.join(labels)} → {labels[0]}")

    # Centrality — which node is most connected?
    bc = nx.betweenness_centrality(G)
    print("\nBetweenness centrality (who's the bottleneck?):")
    for node, score in sorted(bc.items(), key=lambda x: -x[1])[:5]:
        label = G.nodes[node].get("label", node)
        print(f"  {label}: {score:.3f}")

    # PageRank — which node has the most influence?
    pr = nx.pagerank(G)
    print("\nPageRank (who has the most influence?):")
    for node, score in sorted(pr.items(), key=lambda x: -x[1])[:5]:
        label = G.nodes[node].get("label", node)
        print(f"  {label}: {score:.3f}")

    # In-degree — who receives the most?
    print("\nIn-degree (who receives the most connections?):")
    for node, deg in sorted(G.in_degree(), key=lambda x: -x[1])[:5]:
        label = G.nodes[node].get("label", node)
        print(f"  {label}: {deg}")

    return bc, pr


def analyze_corridor(G):
    """Run the corridor queries that would justify Neo4j."""
    print("\n" + "=" * 60)
    print("CORRIDOR FLYWHEEL QUERIES")
    print("(These are the questions that might need a graph DB)")
    print("=" * 60)

    # Query 1: "What downstream events did booking River Rats at Smoot's generate?"
    print("\n--- Query 1: Downstream impact of show s1 (River Rats @ Smoot's) ---")
    downstream = nx.descendants(G, "s1")
    print(f"  Direct + indirect downstream nodes: {len(downstream)}")
    for d in downstream:
        data = G.nodes[d]
        kind = data.get("kind", data.get("type", "?"))
        name = data.get("name", data.get("title", d))
        print(f"    [{kind}] {name}")

    # Query 2: "What's upstream of a hotel booking? Why did guest g1 come?"
    print("\n--- Query 2: Why did guest g1 book? (upstream trace) ---")
    # BFS upstream from booking bk1
    upstream = nx.ancestors(G, "bk1")
    print(f"  Upstream chain: {len(upstream)} nodes")
    for u in upstream:
        data = G.nodes[u]
        kind = data.get("kind", data.get("type", "?"))
        name = data.get("name", data.get("title", u))
        print(f"    [{kind}] {name}")

    # Query 3: "Which venues are connected through shared bands?"
    print("\n--- Query 3: Venue clustering through shared bands ---")
    venue_links = {}
    for s in SHOWS:
        band = s["band"]
        venue = s["venue"]
        if band not in venue_links:
            venue_links[band] = []
        venue_links[band].append(venue)
    for band, venues in venue_links.items():
        if len(venues) > 1:
            band_name = G.nodes[band].get("name", band)
            venue_names = [G.nodes[v].get("name", v) for v in venues]
            print(f"  {band_name} connects: {', '.join(venue_names)}")

    # Query 4: "Full path: band → show → article → booking → revenue"
    print("\n--- Query 4: Full flywheel path (band → booking) ---")
    try:
        path = nx.shortest_path(G, "b_river", "bk1")
        labels = []
        for p in path:
            data = G.nodes[p]
            name = data.get("name", data.get("title", p))
            labels.append(name)
        print(f"  Path: {' → '.join(labels)}")
        print(f"  Hops: {len(path) - 1}")
    except nx.NetworkXNoPath:
        print("  No path found (expected — booking points TO show, not FROM)")
        # Try reverse
        try:
            path = nx.shortest_path(G, "bk1", "b_river")
            labels = [G.nodes[p].get("name", G.nodes[p].get("title", p)) for p in path]
            print(f"  Reverse path: {' → '.join(labels)}")
        except nx.NetworkXNoPath:
            print("  No reverse path either — need undirected for this query")
            UG = G.to_undirected()
            path = nx.shortest_path(UG, "b_river", "bk1")
            labels = [G.nodes[p].get("name", G.nodes[p].get("title", p)) for p in path]
            print(f"  Undirected path: {' → '.join(labels)}")
            print(f"  Hops: {len(path) - 1}")


def postgres_comparison():
    """Show what these queries look like in SQL vs Cypher."""
    print("\n" + "=" * 60)
    print("POSTGRES vs NEO4J — QUERY COMPARISON")
    print("=" * 60)

    print("""
--- Query: "What downstream events did show X generate?" ---

POSTGRES (recursive CTE):
  WITH RECURSIVE downstream AS (
    SELECT target_id, target_type, 1 AS depth
    FROM events WHERE source_id = $show_id
    UNION ALL
    SELECT e.target_id, e.target_type, d.depth + 1
    FROM events e
    JOIN downstream d ON e.source_id = d.target_id
    WHERE d.depth < 5
  )
  SELECT * FROM downstream;

NEO4J (Cypher):
  MATCH (s:Show {id: $show_id})-[*1..5]->(downstream)
  RETURN downstream

VERDICT: Postgres recursive CTE works fine for 1-5 hops.
         Gets painful at 10+ hops or with many fan-out paths.

--- Query: "Which venues cluster through shared performers?" ---

POSTGRES:
  SELECT v1.name, v2.name, COUNT(DISTINCT b.id) AS shared_bands
  FROM shows s1
  JOIN shows s2 ON s1.band_id = s2.band_id AND s1.venue_id != s2.venue_id
  JOIN venues v1 ON s1.venue_id = v1.id
  JOIN venues v2 ON s2.venue_id = v2.id
  JOIN bands b ON s1.band_id = b.id
  GROUP BY v1.name, v2.name;

NEO4J:
  MATCH (v1:Venue)<-[:AT]-(s1:Show)<-[:PERFORMS]-(b:Band)
        -[:PERFORMS]->(s2:Show)-[:AT]->(v2:Venue)
  WHERE v1 <> v2
  RETURN v1.name, v2.name, COUNT(DISTINCT b) AS shared

VERDICT: Both readable. Postgres is fine here.

--- Query: "Full attribution: band → show → article → booking → $$$" ---

POSTGRES:
  SELECT b.name, s.date, a.title, bk.id, r.amount
  FROM bands b
  JOIN shows s ON s.band_id = b.id
  JOIN articles a ON a.show_id = s.id
  JOIN bookings bk ON bk.reason_article_id = a.id
  JOIN revenue r ON r.booking_id = bk.id
  WHERE b.id = $band_id;

NEO4J:
  MATCH (b:Band {id: $band_id})-[:PERFORMS]->(s:Show)
        <-[:COVERS]-(a:Article)<-[:BECAUSE_OF]-(bk:Booking)
        -[:GENERATES]->(r:Revenue)
  RETURN b.name, s.date, a.title, bk.id, r.amount

VERDICT: Postgres JOIN chain is verbose but works.
         Neo4j is more readable and scales better with variable paths.
""")

    print("=" * 60)
    print("RECOMMENDATION")
    print("=" * 60)
    print("""
At current scale (10 brands, ~50 venues, ~20 shows/month):
  → PostgreSQL is MORE than enough. Don't add Neo4j.

At corridor scale (5,000 businesses, 200 shows/month, 10K bookings):
  → Still Postgres with good indexes. Maybe materialized views.

At multi-region scale (Natchez + Bearsville + 3 more, 50K businesses):
  → NOW you're in graph territory. Fan-out queries across regions
    with shared bands, cross-promotion, and attribution chains
    will start to hurt in Postgres.

TRIGGER: When a JOIN chain exceeds 5 tables for a common query,
         or when recursive CTEs take > 500ms, it's time for Neo4j.
""")


def export_for_neo4j():
    """Generate Cypher import statements for when you're ready."""
    print("\n" + "=" * 60)
    print("NEO4J AURA IMPORT SCRIPT (save for Phase 2)")
    print("=" * 60)
    print()

    for n in NODES:
        props = ", ".join(f'{k}: "{v}"' if isinstance(v, str) else f'{k}: {v}'
                         for k, v in n.items() if k != "id")
        print(f'CREATE (:{n.get("type", "Node").title()} {{id: "{n["id"]}", {props}}})')

    print()
    for src, tgt in HIERARCHY:
        print(f'MATCH (a {{id: "{src}"}}), (b {{id: "{tgt}"}}) CREATE (a)-[:HIERARCHY]->(b)')
    for src, tgt in FLYWHEEL:
        print(f'MATCH (a {{id: "{src}"}}), (b {{id: "{tgt}"}}) CREATE (a)-[:FLYWHEEL]->(b)')


if __name__ == "__main__":
    print("\n🔬 HDI Graph Lab — Testing whether we need Neo4j\n")

    # Build and analyze ecosystem
    eco = build_ecosystem_graph()
    bc, pr = analyze_ecosystem(eco)

    # Build and analyze corridor
    corridor = build_corridor_graph()
    analyze_corridor(corridor)

    # Show SQL vs Cypher comparison
    postgres_comparison()

    # Export Neo4j import script
    if "--neo4j" in sys.argv:
        export_for_neo4j()

    print("\n✅ Analysis complete. See recommendations above.")
    print("   Run with --neo4j flag to generate Cypher import statements.\n")
