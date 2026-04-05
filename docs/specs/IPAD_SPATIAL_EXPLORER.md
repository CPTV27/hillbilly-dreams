# iPad Spatial Explorer — Immersive Business Canvas

*April 6, 2026. Product spec for the Tracy & Amy onboarding experience.*

---

## The Concept

A zoomable canvas that represents the entire HDI ecosystem. At the highest level, you see a constellation of connected nodes. Pinch to zoom into any node and it expands into detail. Keep zooming and you're reading real data, articles, pricing, revenue. Zoom out and everything collapses back into the map.

Think: Google Maps for your business. Street view is the article. City view is the brand. Country view is the ecosystem.

---

## Zoom Levels

### Level 1: The Constellation (fully zoomed out)
The entire ecosystem as a visual map. Nodes connected by lines showing relationships.

```
                    ┌─── HDI ───┐
                    │           │
              ┌─── MBT ───┐   │
              │    │   │   │   │
           Touring Mag Radio Records
              │    │   │   │
              └──── DSD ────┘
                    │
              ┌─────┼─────┐
           Bearsville  OE  Gallery
```

Each node: brand name, logo/icon, status badge (ACTIVE / SUMMER 2026), one-line description.
Lines show data flow (flywheel direction, revenue paths).
Gently animated — nodes breathe, lines pulse with data flow.

### Level 2: The Brand (zoom into any node)
Expanding a brand shows its components:
- Big Muddy Touring → venues, artists, routes, upcoming shows
- DSD → pricing tiers, customer count, revenue, features
- Magazine → articles, photo library, editorial calendar
- Radio → stream status, playlist, listener count
- Records → artists, releases, splits

Each component is a card with a hero image, key metric, and one-line summary.

### Level 3: The Detail (zoom into any component)
Full content view:
- An article reads in full
- A pricing tier shows all features
- A venue shows its booking calendar
- An artist shows their tracks, splits, tour dates
- Revenue shows real charts from the database

This level can also surface Delta Dawn — tap any data point and ask "why?"

### Level 4: The Data (deepest zoom)
Raw data view for Tracy:
- Revenue tables
- NPS scores
- Churn metrics
- Grant deadlines
- Equipment inventory

---

## Visual Design

- **Dark background** (#0f0f0d) with warm accents
- **Photography-first** — every node has a real photo, not an icon
- **Minimal text at high zoom levels** — photos and shapes tell the story
- **Rich text at low zoom levels** — articles, data, detail
- **AI illustrations** used sparingly — for relationship diagrams and flow visualizations only
- **No clutter** — white space is a feature. If it feels crowded, remove something.
- **Haptic feedback** — subtle vibration on zoom thresholds (iPad supports this)

---

## Interaction Model

- **Pinch to zoom** — smooth, continuous, like Maps
- **Tap a node** — centers and zooms to Level 2
- **Double-tap** — zooms one level deeper
- **Swipe** — pan across the canvas
- **Long press** — opens Delta Dawn context ("Tell me about this")
- **Two-finger rotate** — rotates the constellation (optional, for exploration)
- **Shake** — resets to Level 1 (the big picture)

---

## Technical Approach

### Option A: Web Canvas (ship faster)
- Next.js page at `/explorer` or `/canvas`
- HTML Canvas or WebGL (Three.js / Pixi.js) for the zoomable surface
- Touch events for pinch/zoom/pan
- Data from existing API routes
- Works on iPad Safari as a PWA (Add to Home Screen)
- **Pros:** ships from existing codebase, no App Store
- **Cons:** less native feel, no haptics

### Option B: Native iPad App (SwiftUI)
- SwiftUI + RealityKit for spatial interactions
- Native pinch/zoom/pan with haptic feedback
- Connects to Vercel API routes for live data
- Delta Dawn voice integration via Gemini Live API
- **Pros:** best UX, haptics, App Store presence
- **Cons:** separate codebase, Apple Developer account, review process

### DECIDED: D3-zoom + HTML Canvas (Grok-validated)

**Stack:** D3-zoom for pinch/pan/momentum/elastic bounds + HTML Canvas for rendering. No WebGL. No Pixi. No Three.js (yet).

**Why:** Native Safari pinch/momentum on iPad, 60fps with 50 nodes + photos, lightest bundle, zero WebGL tax on Sovereign Pi.

**Component architecture (Grok):**
- `app/explorer/page.tsx` — server wrapper
- `components/explorer/SpatialCanvas.tsx` — 'use client' main component
- `hooks/useD3Zoom.ts` — D3 zoom hook
- `components/explorer/CanvasRenderer.tsx` — Canvas drawing logic
- `components/explorer/NodeRenderer.ts` — photo + label + edge drawing
- Zustand store for nodes/edges/zoomState

**Zoom rendering (LOD via requestAnimationFrame):**
- 0.3–0.6: 60px photo circles + thin edges
- 0.6–1.5: 200px cards (fade in title/metrics via opacity)
- 1.5–3.0: sub-nodes + detail panels
- 3.0+: full articles/tables (conditional render)
- Opacity transitions only — no CSS transforms on canvas

**Data:** React Query + Zustand. Fetch once on mount, cache forever (stale-while-revalidate). No re-fetch on zoom.

**Sovereign Pi:** Detect via userAgent/deviceMemory. Cap 30 nodes + 30fps. Fallback: static PNG + hotspots if <30fps.

**Future WebXR:** Abstract data model (plain JS nodes/edges array) + pluggable renderer. Keep 2D CanvasRenderer; later add ThreeRenderer without touching business logic.

---

## Data Sources (all existing)

| Canvas Element | API Source |
|---|---|
| Brand nodes | `config/tenants.ts` |
| Revenue metrics | `/api/admin/revenue-metrics` |
| System health | `/api/admin/system-health` |
| NPS scores | `/api/admin/nps-summary` |
| Articles | `outsider-economics-v2/*.md` (build-time) |
| Events | `/api/events` |
| Directory listings | `/api/directory` |
| Photos | `/images/*` (static) + GCS bucket |
| Flywheel connections | Hardcoded relationship map |

---

## Content at Each Node

### HDI (top level)
- Photo: Natchez bluff sunset
- Metric: $160K annualized revenue
- Status: "3 partners. 14 domains. $167/month."

### MBT (platform)
- Photo: Radio studio / code on screen
- Metric: 9 modules, 122 models
- Status: "The Glass Engine"

### Big Muddy Touring
- Photo: Live show at the Blues Room
- Metric: Shows booked, 2:1 multiplier
- Zoom in: venue map, artist roster, upcoming dates

### Big Muddy Magazine
- Photo: Best magazine article hero
- Metric: Article count, monthly readers
- Zoom in: article grid, read any article

### Big Muddy Radio
- Photo: Mac Mini + Icecast setup
- Metric: Stream status (live/offline), listener count
- Zoom in: current playlist, show schedule

### Big Muddy Records
- Photo: Vinyl / turntable
- Metric: Artist count, releases
- Zoom in: artist profiles, track listings

### Deep South Directory
- Photo: Main Street Natchez
- Metric: Business count, subscriber count, MRR
- Zoom in: pricing tiers, customer list, revenue chart

### Bearsville Creative
- Photo: Utopia Studios / Hudson Valley
- Metric: Status "Summer 2026"
- Zoom in: team (Elijah, Miles), facility, plans

### The Inn
- Photo: Bar interior
- Metric: Occupancy, revenue, tonight's show
- Zoom in: room status, bar menu, in-room TV demo

---

## Delta Dawn Integration

Long-press any node → Delta Dawn appears as a chat overlay:
- "Tell me about Big Muddy Touring"
- "What's our revenue this month?"
- "Who's playing tonight?"
- "How does the flywheel work?"

She answers with real data from the node you're viewing. Context-aware.

---

## Phase 1 MVP (Web Canvas)

Build a single-page web canvas at `/explorer`:
1. D3.js or Pixi.js for the zoomable node graph
2. 10 nodes (HDI, MBT, 8 brands) with photos and metrics
3. Pinch/zoom on iPad Safari
4. Tap to expand, double-tap to go deeper
5. Article reading at deepest zoom
6. Static data for MVP, live API for v2

**Estimated effort:** 2-3 weeks for the web canvas
**Target:** Tracy and Amy use it daily as their "dashboard"

---

*The best interface for understanding a complex system is a map you can explore at your own pace. Not a dashboard with 47 charts. Not a slide deck. A space you can wander through.*
