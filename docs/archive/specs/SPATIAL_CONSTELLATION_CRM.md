# Spatial Constellation CRM — Product Spec

*April 5, 2026. Architecture decision: start 2D, extend to MR/XR.*

---

## What It Is

A relationship-aware CRM that visualizes the corridor ecosystem as a navigable spatial graph. Venues, hotels, artists, routes, and businesses appear as connected nodes — not rows in a table.

Powered by the `queryConstellation(entityId, depth)` API over PostgreSQL. No graph database required at current scale.

## Three Layers

| Layer | Mode | Use Case | Status |
|-------|------|----------|--------|
| 1. 2D Canvas | Browser/iPad | Search, browse, depth traversal, quick reference | **Built** (`/constellation`) |
| 2. Mixed Reality | Quest 3 / Vision Pro | Nodes anchored to Main Street map, world-locked panels | Specced |
| 3. Full Immersion | Quest 3 | Step into the flywheel for investor pitches, training | Backlog |

## Layer 1: 2D Canvas (Current)

**URL:** `/constellation`
**Components:** `ConstellationGraph.tsx`, `NodeDetail.tsx`, `useConstellation.ts`
**Pattern:** Container/Presentational + Registry (see `node-registry.ts`)

Features:
- Quick picks: MBT, Touring, DSD, Inn, HDI
- Depth 1 and 2 traversal
- Click any node → detail panel with connections
- Navigate between nodes by clicking connections
- Pan/zoom on Canvas
- Legend showing all entity types

## Layer 2: Mixed Reality (Next)

**Target:** Meta Quest 3 passthrough, Apple Vision Pro
**Framework:** WebXR (already have `/vr/[slug]` infrastructure)

Design rules (from spatial computing research):
- Primary content at ~1m distance, slightly below eye level
- World-locked, not head-locked
- Constellation nodes anchored to physical surfaces (table, wall, floor)
- Real-world affordances: grab nodes, pinch to zoom, look to focus
- Smooth transitions between nodes — no teleporting
- Reveal detail on gaze/proximity, not by default

Demo scenario: "Show me everything around the Inn"
1. Open Quest 3 in passthrough mode
2. Constellation appears on the table in front of you
3. The Inn is center node, surrounded by nearby venues, hotels, restaurants
4. Gaze at a venue → it expands to show capacity, booking contact, next show
5. Pinch the flywheel edge → see the revenue path animate
6. Wave to switch depth (1 → 2 hops)

## Layer 3: Full Immersion (Future)

**Target:** Investor pitches, team training, show planning
**Trigger:** Only when immersion clearly improves the task

Concept: "The Flywheel Room"
- Step into a dark room with the 6-node flywheel orbiting you
- Each node is a portal — walk toward Touring and you see the show calendar
- Walk toward DSD and you see the directory with real-time listings
- Revenue flows as animated gold particles along the flywheel edges
- Voice commands via Delta Dawn: "Show me downstream from the last show"

## Data Architecture

```
queryConstellation(entityId, depth) → {
  center: ConstellationNode,
  nodes: ConstellationNode[],     // with depth annotation
  edges: ConstellationEdge[],     // typed relationships
  stats: { nodeCount, edgeCount, entityTypes, edgeTypes }
}
```

Node types: artist, venue, hotel, restaurant, route, city, directory_business, brand
Edge types: plays_at, stays_near, eats_near, on_route, in_city, listed_as, promoted_by, related_to, hierarchy, flywheel

All derived from real Prisma models. No synthetic data.

## Comfort Rules (Hard Requirements)

- Content at 1m distance, slightly below line of sight
- Support sitting AND standing
- No forced head rotation > 30 degrees
- No teleporting in passthrough mode
- Fade transitions, never jump cuts
- Min tap target: 44px (2D) / 60mm (XR)
- Audio + visual feedback on every interaction

## Build Path

1. **Done:** Prisma models, seed script, API endpoint, 2D canvas page
2. **Next:** Run seed against live DB, verify on localhost, push to Vercel
3. **Then:** Connect to existing Spatial Explorer (`/explorer`) as alternate view
4. **Phase 2:** WebXR constellation view at `/vr/constellation`
5. **Phase 3:** Full immersion flywheel room

## Cost

Zero additional infrastructure. Uses existing PostgreSQL, existing Vercel, existing WebXR infrastructure from `/vr/[slug]`.
