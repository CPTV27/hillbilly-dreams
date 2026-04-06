#!/usr/bin/env python3
"""
HDI Constellation — Live Graph with REAL data from nodes.ts
Hackathon Entry #1: NetworkX + matplotlib

Run: python3 scripts/graph-lab/constellation_live.py
"""

import networkx as nx
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend for server/CI
import matplotlib.pyplot as plt
import json

# ============================================================
# REAL DATA from apps/web/components/explorer/nodes.ts
# ============================================================

NODES = {
    "hdi":       {"label": "Hillbilly Dreams Inc",     "metric": "$160K revenue",     "type": "holding",  "x": 0,    "y": 0},
    "mbt":       {"label": "Measurably Better Things", "metric": "9 modules · 122 models", "type": "platform", "x": 0,    "y": -150},
    "touring":   {"label": "Big Muddy Touring",        "metric": "2:1 show multiplier", "type": "brand",    "x": -250, "y": -320},
    "magazine":  {"label": "Big Muddy Magazine",       "metric": "27 articles",        "type": "brand",    "x": -90,  "y": -350},
    "radio":     {"label": "Big Muddy Radio",          "metric": "Streaming live",     "type": "brand",    "x": 90,   "y": -350},
    "records":   {"label": "Big Muddy Records",        "metric": "$3K per release",    "type": "brand",    "x": 250,  "y": -320},
    "dsd":       {"label": "Deep South Directory",     "metric": "Free – $250/mo",     "type": "product",  "x": -180, "y": 120},
    "inn":       {"label": "The Big Muddy Inn",        "metric": "6 rooms · Blues Room","type": "venue",    "x": 180,  "y": 120},
    "bearsville":{"label": "Bearsville Creative",      "metric": "Woodstock, NY",      "type": "region",   "x": -300, "y": 60},
    "gallery":   {"label": "Chase Pierson Photography","metric": "17,956 photos",      "type": "brand",    "x": 300,  "y": 60},
}

HIERARCHY_EDGES = [
    ("hdi", "mbt"),
    ("mbt", "touring"), ("mbt", "magazine"), ("mbt", "radio"), ("mbt", "records"),
    ("mbt", "dsd"), ("mbt", "inn"), ("mbt", "bearsville"), ("mbt", "gallery"),
]

FLYWHEEL_EDGES = [
    ("touring", "records"),   # Shows produce recordings
    ("records", "radio"),     # Records get airplay
    ("radio", "magazine"),    # Radio drives stories
    ("magazine", "dsd"),      # Stories drive directory listings
    ("dsd", "inn"),           # Directory drives bookings
    ("inn", "touring"),       # Inn hosts the next show
]

# ============================================================
# BUILD GRAPH
# ============================================================

G = nx.DiGraph()

for nid, data in NODES.items():
    G.add_node(nid, **data)

for src, tgt in HIERARCHY_EDGES:
    G.add_edge(src, tgt, type="hierarchy", color="#4a4440", style="solid")

for src, tgt in FLYWHEEL_EDGES:
    G.add_edge(src, tgt, type="flywheel", color="#c8943e", style="dashed")

# ============================================================
# ANALYSIS
# ============================================================

print("=" * 70)
print("  HDI CONSTELLATION — LIVE GRAPH ANALYSIS")
print("=" * 70)
print(f"\n  Nodes: {G.number_of_nodes()}")
print(f"  Edges: {G.number_of_edges()} ({len(HIERARCHY_EDGES)} hierarchy + {len(FLYWHEEL_EDGES)} flywheel)")

# Flywheel cycle
print("\n--- FLYWHEEL CYCLE ---")
cycles = list(nx.simple_cycles(G))
for c in cycles:
    if len(c) >= 4:
        labels = [NODES[n]["label"] for n in c]
        print(f"  {'→ '.join(labels)} → {labels[0]}")
        print(f"  Length: {len(c)} nodes")

# Degree analysis
print("\n--- DEGREE CENTRALITY (who's most connected?) ---")
dc = nx.degree_centrality(G)
for nid, score in sorted(dc.items(), key=lambda x: -x[1]):
    label = NODES[nid]["label"]
    in_d = G.in_degree(nid)
    out_d = G.out_degree(nid)
    print(f"  {label:35s}  centrality={score:.3f}  in={in_d}  out={out_d}")

# Betweenness
print("\n--- BETWEENNESS CENTRALITY (bottleneck analysis) ---")
bc = nx.betweenness_centrality(G)
for nid, score in sorted(bc.items(), key=lambda x: -x[1])[:5]:
    label = NODES[nid]["label"]
    print(f"  {label:35s}  {score:.3f}")

# PageRank
print("\n--- PAGERANK (influence ranking) ---")
pr = nx.pagerank(G)
for nid, score in sorted(pr.items(), key=lambda x: -x[1]):
    label = NODES[nid]["label"]
    print(f"  {label:35s}  {score:.3f}")

# Shortest paths
print("\n--- KEY PATHS ---")
paths_to_check = [
    ("touring", "inn", "Show → Inn booking"),
    ("touring", "dsd", "Show → Directory listing"),
    ("hdi", "dsd", "Corporate → Product"),
    ("inn", "records", "Inn → Records (flywheel)"),
]
for src, tgt, desc in paths_to_check:
    try:
        path = nx.shortest_path(G, src, tgt)
        labels = [NODES[n]["label"] for n in path]
        print(f"  {desc}: {' → '.join(labels)} ({len(path)-1} hops)")
    except nx.NetworkXNoPath:
        print(f"  {desc}: NO PATH (directed graph)")

# 2-hop reach from each brand
print("\n--- 2-HOP REACH (what can each node touch in 2 steps?) ---")
for nid in ["touring", "dsd", "inn", "records"]:
    reachable = set()
    for target in G.nodes():
        if target != nid:
            try:
                if nx.shortest_path_length(G, nid, target) <= 2:
                    reachable.add(NODES[target]["label"])
            except nx.NetworkXNoPath:
                pass
    label = NODES[nid]["label"]
    print(f"  {label}: {len(reachable)} nodes → {', '.join(sorted(reachable))}")

# Flywheel strength analysis
print("\n--- FLYWHEEL STRENGTH ---")
print("  The flywheel is a 6-node cycle. If any edge breaks, the cycle breaks.")
print("  Testing resilience by removing each flywheel edge:")
for src, tgt in FLYWHEEL_EDGES:
    test_G = G.copy()
    test_G.remove_edge(src, tgt)
    remaining_cycles = [c for c in nx.simple_cycles(test_G) if len(c) >= 4]
    src_label = NODES[src]["label"]
    tgt_label = NODES[tgt]["label"]
    status = "BROKEN" if len(remaining_cycles) == 0 else f"{len(remaining_cycles)} cycles remain"
    print(f"  Remove {src_label} → {tgt_label}: {status}")

# ============================================================
# VISUALIZATION
# ============================================================

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(20, 10))
fig.patch.set_facecolor('#0f0f0d')

# Use the actual x,y coordinates from nodes.ts (flip y because screen coords)
pos = {nid: (data["x"], -data["y"]) for nid, data in NODES.items()}

# Color by type
type_colors = {
    "holding": "#ffffff",
    "platform": "#c8943e",
    "brand": "#4a7c59",
    "product": "#c8943e",
    "venue": "#b85c5c",
    "region": "#6b8fc4",
}
node_colors = [type_colors.get(NODES[n]["type"], "#888") for n in G.nodes()]

# Left plot: Full constellation
ax1.set_facecolor('#0f0f0d')
ax1.set_title("HDI Constellation — All Edges", color='#c8943e', fontsize=14, fontweight='bold')

hierarchy_edges = [(u, v) for u, v, d in G.edges(data=True) if d.get("type") == "hierarchy"]
flywheel_edges = [(u, v) for u, v, d in G.edges(data=True) if d.get("type") == "flywheel"]

nx.draw_networkx_edges(G, pos, edgelist=hierarchy_edges, edge_color='#4a4440',
                       style='solid', alpha=0.5, ax=ax1, arrows=True, arrowsize=15)
nx.draw_networkx_edges(G, pos, edgelist=flywheel_edges, edge_color='#c8943e',
                       style='dashed', alpha=0.8, ax=ax1, arrows=True, arrowsize=20, width=2)
nx.draw_networkx_nodes(G, pos, node_color=node_colors, node_size=1200, ax=ax1, edgecolors='#c8943e', linewidths=1.5)

labels = {nid: data["label"].replace(" ", "\n") for nid, data in NODES.items()}
nx.draw_networkx_labels(G, pos, labels, font_size=6, font_color='#e8e0d4', ax=ax1)

# Right plot: Flywheel only
ax2.set_facecolor('#0f0f0d')
ax2.set_title("The Flywheel — Revenue Cycle", color='#c8943e', fontsize=14, fontweight='bold')

flywheel_nodes = set()
for s, t in FLYWHEEL_EDGES:
    flywheel_nodes.add(s)
    flywheel_nodes.add(t)

F = nx.DiGraph()
for n in flywheel_nodes:
    F.add_node(n, **NODES[n])
for s, t in FLYWHEEL_EDGES:
    F.add_edge(s, t)

f_pos = {n: pos[n] for n in flywheel_nodes}
f_colors = [type_colors.get(NODES[n]["type"], "#888") for n in F.nodes()]

nx.draw_networkx_edges(F, f_pos, edge_color='#c8943e', style='dashed',
                       alpha=0.9, ax=ax2, arrows=True, arrowsize=25, width=3,
                       connectionstyle="arc3,rad=0.1")
nx.draw_networkx_nodes(F, f_pos, node_color=f_colors, node_size=1800, ax=ax2,
                       edgecolors='#c8943e', linewidths=2)

f_labels = {nid: NODES[nid]["label"].replace(" ", "\n") for nid in flywheel_nodes}
nx.draw_networkx_labels(F, f_pos, f_labels, font_size=7, font_color='#e8e0d4', ax=ax2)

# Add metrics as annotations
for nid in flywheel_nodes:
    x, y = f_pos[nid]
    ax2.annotate(NODES[nid]["metric"], (x, y - 35), fontsize=5, color='#6b635a',
                ha='center', va='top')

plt.tight_layout()
output_path = "scripts/graph-lab/constellation.png"
plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='#0f0f0d')
print(f"\n📊 Visualization saved to {output_path}")

# Also export as JSON for other tools
graph_data = {
    "nodes": [{"id": nid, **data} for nid, data in NODES.items()],
    "hierarchy": [{"source": s, "target": t} for s, t in HIERARCHY_EDGES],
    "flywheel": [{"source": s, "target": t} for s, t in FLYWHEEL_EDGES],
    "analysis": {
        "degree_centrality": {nid: round(v, 3) for nid, v in dc.items()},
        "betweenness": {nid: round(v, 3) for nid, v in bc.items()},
        "pagerank": {nid: round(v, 3) for nid, v in pr.items()},
    }
}
json_path = "scripts/graph-lab/constellation.json"
with open(json_path, "w") as f:
    json.dump(graph_data, f, indent=2)
print(f"📦 Graph data exported to {json_path}")
print("\n✅ Done. Open constellation.png to see the visualization.")
