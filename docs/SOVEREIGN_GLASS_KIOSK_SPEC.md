# Sovereign Glass Kiosk — Magic Window UX Spec (Master Log)

**Status:** Locked for implementation handoff (Phase 2.3+).  
**Phase 2.4 implementation:** [`apps/web/app/(admin)/admin/kiosk/`](../apps/web/app/(admin)/admin/kiosk/) — `KioskGlassClient.tsx` + [`glassReducer.ts`](../apps/web/lib/sovereign/glassReducer.ts). Resolved state uses a **25% left** Provenance rail (mandate update vs. earlier right-rail sketch). Thinking uses a **65vw** hero overlay (enterprise) on the right over a dimmed answer preview.

**Stack constraint:** This repo uses **inline CSS + CSS custom properties** — **do not use Tailwind** on this surface. Use `var(--font-body)`, `var(--font-display)`, and existing token patterns (see Studio / Editorial Bureau). Optional: **`framer-motion`** (already in `apps/web`) for layout transitions.

**Wire contract:** Socket.io event name **`sovereign_event`**, payload shape `{ type, payload }`. Types are defined in [`apps/web/lib/agent/eventProducer.ts`](../apps/web/lib/agent/eventProducer.ts).

**Naming sync:** The stream emits **`session.init`** (not `session.start`). Treat **`mode: "enterprise"`** as the gate for Thinking-state choreography; **`standard`** may skip foreground trace or use a lighter variant.

---

## 1. React state machine

### 1.1 Top-level UI phase (`GlassPhase`)

Use a discriminated union (or XState-style reducer). Single source of truth drives layout and motion.

```ts
type GlassPhase =
  | { phase: 'idle'; lastAnswer: string; provenanceCollapsed: true }
  | {
      phase: 'thinking';
      sessionId: string;
      mode: 'standard' | 'enterprise';
      reasoningBuffer: string;
      messageBuffer: string;
      traceItems: TraceListItem[];
      pendingCitations: CitationCard[];
    }
  | {
      phase: 'resolved';
      sessionId: string;
      finalAnswer: string;
      traceItems: TraceListItem[];
      citations: CitationCard[];
      provenanceExpanded: boolean; // user toggles "Sovereign Provenance" rail
    };
```

### 1.2 Transitions (event-driven)

| Incoming `sovereign_event` | Condition | Transition |
|----------------------------|-----------|------------|
| `session.init` | `payload.mode === 'enterprise'` | → **`thinking`** (reset buffers, clear trace) |
| `session.init` | `payload.mode === 'standard'` | → **`thinking`** with **reduced** motion (optional: skip 55% trace; keep Glass Strip only) |
| `reasoning.delta` | `phase === 'thinking'` | Append to `reasoningBuffer`; append/merge `traceItems` (type `reasoning`) |
| `tool.call.start` | `phase === 'thinking'` | Push `traceItems` entry type `tool_start` |
| `tool.call.end` | `phase === 'thinking'` | Push `traceItems` entry type `tool_end` |
| `lore.citation` | `phase === 'thinking'` | Push `CitationCard` + `traceItems` type `citation` |
| `message.delta` | `phase === 'thinking'` | Append `messageBuffer` (keep answer pane pre-visible but dimmed) |
| `message.final` | `phase === 'thinking'` | → **`resolved`** (`finalAnswer = payload.text`, freeze trace, build citation list) |
| User: "Expand provenance" | `phase === 'resolved'` | `provenanceExpanded = true` |
| User: "New question" / `session.init` (new id) | `phase === 'resolved'` | → **`thinking`** or **`idle`** per product rule |

**Idle → thinking:** If you want a cold start without `session.init`, kiosk can send a local "start turn" that only affects UI; **authoritative** transition should still follow **`session.init`** from the Hub.

### 1.3 `TraceListItem` (for timeline + provenance compression)

```ts
type TraceListItem =
  | { id: string; kind: 'reasoning'; text: string; at: number }
  | { id: string; kind: 'tool_start'; tool: string; params: Record<string, unknown>; at: number }
  | { id: string; kind: 'tool_end'; tool: string; summary: string; ok: boolean; at: number }
  | { id: string; kind: 'citation'; source: string; snippet: string; confidence: number; loreKind: LoreKind; at: number };

/** Derived from last `tool.call.start` for `lore_query` → `params.namespace`, else 'unknown'. */
type LoreKind = 'manual' | 'sop' | 'journal' | 'unknown';
```

**Reducer rule:** On `tool.call.start` with `payload.tool === 'lore_query'`, store `lastLoreNamespace = params.namespace`. On each `lore.citation`, set `loreKind` from `lastLoreNamespace`: `lore_manuals` → `manual`, `lore_sops` → `sop`, `lore_journals` → `journal`.

> **Future hardening:** Extend `lore.citation` payload with optional `namespace` on the server so citations stay correct if multiple Lore calls overlap.

---

## 2. Layout proportions (CSS Grid)

**Viewport:** 27" landscape primary; safe-area insets respected.

### 2.1 Grid shell (single wrapper)

```text
grid-template-columns: 1fr minmax(280px, 22vw);
grid-template-rows: 1fr;
gap: clamp(12px, 1.2vw, 24px);
min-height: 100vh;
padding: clamp(16px, 2vh, 32px);
```

- **Column 1 — Main stage:** answer + (in Thinking) foreground trace overlay.
- **Column 2 — Rail:** Idle = **Glass Strip**; Resolved = **Sovereign Provenance** sidebar.

### 2.2 Idle state

| Region | Behavior |
|--------|----------|
| Main (`col 1`) | Final answer **100%** width of stage; `font-size: clamp(1.25rem, 2.2vw, 2rem)`; max-width ~72ch centered or left-aligned per room install. |
| Rail (`col 2`) | **Glass Strip** width = full rail; height ~`8vh` fixed at top of rail or vertical tab; shows glyph + "Provenance" + count of sources; **collapsed** trace (no scroll). |

### 2.3 Thinking state (enterprise)

**Foreground trace** consumes **55–65%** of **total viewport width** (not only col 1): implement by **temporarily** changing grid:

```text
/* Thinking — enterprise */
grid-template-columns: minmax(0, 38fr) minmax(0, 62fr);
/* col1 = dimmed answer preview; col2 = trace foreground */
```

Alternative (preferred if answer must stay left): **overlay** inside col 1:

- **Answer pane:** `opacity: 0.22`; `filter: blur(1px)`; `transform: scale(0.98)`; still shows `message.delta` growth so user sees resolution coming.
- **Trace layer:** absolutely positioned inset in col 1 with `width: 62%` of grid total (use nested grid: stage = 1 col, inner split 38% / 62%).

**Concrete split (inner stage):**

```text
display: grid;
grid-template-columns: 1fr minmax(55%, 65%);
/* left: dimmed answer; right: live trace (primary focus) */
```

**Standard mode:** Skip the 62% trace column; keep trace in rail only with stronger pulse on Glass Strip (product choice).

### 2.4 Resolved state

Revert shell to **2.1** proportions. **Main:** final answer full opacity, no blur. **Rail:** expands to full **Provenance** height (`align-self: stretch`), scrollable trace + **Source Cards**.

---

## 3. Animation timings & easing

**Philosophy:** Motion sells **aliveness**, not busyness. Prefer **opacity + blur + slight scale** over large translations.

| Transition | Duration | Easing | Properties |
|------------|----------|--------|------------|
| Idle ↔ Glass Strip hover | `180ms` | `cubic-bezier(0.4, 0, 0.2, 1)` | rail width, background alpha |
| Enter **thinking** (enterprise) | `420–520ms` | `cubic-bezier(0.22, 1, 0.36, 1)` | grid columns, answer `opacity`, `filter`, `transform` |
| **reasoning.delta** append | per chunk `0ms` layout lock; optional `120ms` | ease-out | new line `opacity 0→1` |
| **lore.citation** hit (emphasis) | `280ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | card scale `1 → 1.02 → 1`, border glow |
| **message.final** → **resolved** (“fade-back”) | `480–640ms` | `cubic-bezier(0.25, 0.8, 0.25, 1)` | trace slide to rail, answer `opacity 1`, blur `0` |
| Provenance rail expand/collapse | `320ms` | `cubic-bezier(0.4, 0, 0.2, 1)` | rail `max-height`, `opacity` |

**Framer Motion (suggested):** `AnimatePresence` on phase change; `layout` prop on grid children for column morph. **Reduced motion:** respect `prefers-reduced-motion: reduce` — cut durations ~70%, drop blur and scale.

---

## 4. Event card hierarchy (citation & trace typing)

### 4.1 Visual hierarchy (Thinking stream)

| Stream element | Visual weight | Notes |
|----------------|---------------|--------|
| `reasoning.delta` | Medium opacity `0.85`, monospaced or narrow sans; **no** red “error” color | “Mission telemetry” — cool neutral, e.g. `var(--glass-telemetry)` |
| `tool.call.start` | Small caps row + icon; `opacity 0.7` | Show `tool` + one-line param summary (e.g. namespace) |
| `tool.call.end` | Check / warn glyph; `opacity 0.75` | If `ok: false`, **amber** border only — not full alert |
| `lore.citation` | **Highest** contrast pulse on arrival; then settles into card | Show `confidence` as dot or thin bar, not a percentage headline |

### 4.2 Source Cards (Resolved rail) — **Manual vs SOP vs Journal**

All cards share: `source` (filename), `snippet` (truncate ~240 chars, expand), `confidence`, `loreKind`.

| `loreKind` | Label | Accent | Default icon metaphor | Trust copy |
|------------|-------|--------|------------------------|------------|
| **manual** | **Equipment / Signal** | Cool cyan / steel (`--accent-telemetry`) | Waveform or mic silhouette | “Manufacturer / signal-chain reference” |
| **sop** | **Operating procedure** | Warm amber (`--accent-ops`) | Checklist | “House procedure — verify with duty lead if conflict” |
| **journal** | **Institutional memory** | Soft violet / parchment (`--accent-memory`) | Book / date stamp | “Historical note — confirm currency” |
| **unknown** | **Lore** | Neutral glass border | Generic document | “Sovereign Lore — verify source” |

**Data today:** `loreKind` comes from **last `lore_query` namespace** in the reducer (see §1.3). **Manual** citations should prefer **`studio-*-manual*`** filenames in copy examples only — logic stays namespace-driven.

### 4.3 Avoidance checklist (Anti–Engineering-Console)

- No monospace wall of JSON on the default path.
- No equal three-column IDE layout as the default resolved view.
- Provenance must remain **one gesture away** when collapsed, **always** recoverable after `message.final`.
- Every operational claim should map to **zero or more** visible `lore.citation` cards when Enterprise + Lore path ran.

---

## 5. Tailscale / Hub URL (kiosk bootstrap)

- **Default:** `NEXT_PUBLIC_SOVEREIGN_HUB_URL` = `http://<tailscale-ip>:3000` on each kiosk (build-time or env on the iMac).
- Socket.io client connects to **same origin** as the Hub URL; path default `/socket.io`.
- Kiosk must call **`join_session`** with the same `sessionId` the agent uses when emitting (see `EventProducer.sessionInit`).

---

## 6. Implementation pointer (Claude Code)

- **Page:** e.g. `apps/web/app/(kiosk)/glass/page.tsx` or `public` static host — product decision; prefer App Router page with **no auth** or kiosk PIN later.
- **Component:** `KioskGlassClient.tsx` — `'use client'`, socket.io-client, reducer, Framer Motion layout.
- **Do not** implement LLM streaming inside the kiosk bundle; consume **`sovereign_event`** only. Hub owns **`EventProducer`** + stream tap.

---

**Closing line (brand):** We build local. The value stays local. We grow from within.
