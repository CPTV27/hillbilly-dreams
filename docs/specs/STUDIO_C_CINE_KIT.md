# Studio C — Cine kit & multi-camera hardware spec

*Canonical hardware spec for issue #80. Studio C is the video department at **Utopia Studios, Bearsville, NY** — it serves the full HDI portfolio, not a single brand.*

**Related:** GitHub #79 (multi-gimbal / auto-cut / Restream), #77 (Studio C request → production pipeline), `docs/CREATIVE_PRODUCTION_PIPELINE.md`.

---

## 1. Inventory (owned — operator context)

Per operator handoff (Chase ecosystem notes, Oct 2025): **Chase / Studio C owns equipment outright** — not a facility split. **Pete partnership:** facility access and revenue share on **Utopia venue work only**.

| Category | Item | Notes |
|----------|------|--------|
| Camera / cinema | DJI Ronin 4D | Primary cinema rig; internal record + RF path to switcher stack |
| Lighting | Aputure 600d Pro | |
| Lighting | Aputure 300d Mark II | |
| Switching | Blackmagic ATEM Extreme ISO (×2) | One dedicated podcasting; one for remote/fly packs |
| Switching | ATEM TV Studio | Incoming for Utopia control room (as of Oct 2025 planning) |
| Sync | Tentacle Sync (2-pack) | Multi-camera timecode |
| Audio | DJI 2-channel wireless | |
| Audio | Rode wireless | |
| Audio | TASCAM 6-channel field recorder | |
| Audio | Apollo 10-channel interface | |
| DAW | Mac + Logic Pro | |
| Video | Blackmagic cameras | Referenced in legacy workflows — reconcile with Sony kit below |
| Field | DJI Osmo 3 | Pocket / BTS |
| Monitor / record | Atomos Ninja (×1) | ProRes/RAW on primary rig today |

**Total book value (historical note):** ~$70k–$80k class (verify against insurance schedule).

---

## 2. Sony + gimbal layer (issue #80 proposed kit)

### Confirmed / TBD

- **Sony A-series bodies:** models TBD — Chase to confirm which bodies are assigned to video vs stills.
- **Ronin 4D:** treat as **owned** in planning docs; confirm against current insurance/asset list.

### Gimbals

| Role | Recommendation | Rationale |
|------|----------------|-----------|
| Heavy body (e.g. A7R + large glass) | DJI RS 4 Pro | Payload headroom |
| Lighter A7 body | DJI RS 4 | Matched to weight class |
| Both | Bluetooth/USB to Sony | Record trigger, AF, gimbal control; RS SDK for multi-rig automation (#79) |

### Wireless video (feeds auto-cut / Restream path)

| Qty | Item | Role |
|-----|------|------|
| 3 | DJI video transmitter | One per main camera: RS+Sony A, RS+Sony B, Ronin 4D |
| 1 | DJI Transmission High-Bright Monitor Combo | Director monitor + RX; SDI/HDMI to capture card |
| 0–1 | Extra DJI RX | Dedicated ingest / ISO recording |

### Recording strategy

- **Primary RS+Sony:** existing Atomos Ninja where mounted.
- **Second RS+Sony:** internal recording first; add Ninja when budget allows.
- **Ronin 4D:** internal + RF to monitor path.

### Stills-dedicated body (optional purchase)

- One **Sony A7 IV / A7CR / A7RV** class body for stills — shares glass; doubles as video backup.
- Prioritize vs gimbals per Chase call.

---

## 3. Signal-flow pattern (target)

```
[RS4 + Sony A] ──TX──┐
                     ├──[High-Bright Monitor / RX]──SDI/HDMI──[Capture card]──[Ingest / auto-cut]──[Restream]
[RS4 + Sony B] ──TX──┤
                     │
[Ronin 4D]     ──TX──┘
```

Osmo / pocket units can side-car into ATEM or post-only, depending on show format (#79).

---

## 4. Budget bands (research — Apr 2026)

| Line | Est. USD |
|------|----------|
| 2× DJI RS 4 / RS 4 Pro mix | ~$1,400 |
| 3× DJI video transmitter | ~$2,100 |
| 1× DJI Transmission High-Bright Combo | ~$2,500 |
| 1× Sony A-series stills / backup body | ~$1,500–$2,500 |
| 1× DJI Osmo 7 (see #79) | ~$200 |
| Capture card (Elgato / Blackmagic) | ~$150–$300 |
| Mounts, cables, batteries | ~$500 |
| **Rough total** | **~$8,500–$9,500** |

Add Ninja / media / SSD line items when expanding dual ProRes chains.

---

## 5. Commercial model (reference — do not edit in sales decks without Chase)

- **Markup:** cost × **1.495** (15% overhead + 30% profit target) → **~35–45% margins** on packages vs naive cost sums.
- **Founding rate:** 25% discount period (historical — confirm if still active).
- **Tech labor:** staged **$30/hr → $50/hr** narrative in legacy notes — confirm current sheet.
- **Packages (illustrative):** Essential ~$3k/day; competitive value ~$1.8k half / $3.6k full; premium cinema ~$4.5k/day; live switching ~$600 half / $1,050 full (verify before quoting).

**Ops:** Miles — day-to-day production; Chase — business development / pricing authority.

---

## 6. Decisions log (Chase / Studio C lead)

1. [ ] Exact Sony models on hand + role map (stills vs A-cam vs B-cam).
2. [ ] Ronin 4D: confirm serial / condition / lens map.
3. [ ] Kit budget ceiling for FY segment.
4. [ ] Priority: **stills body** vs **dual RS rigs** vs **wireless video** first.
5. [ ] RS 4 vs RS 4 Pro pairing (mixed vs matched).
6. [ ] Capture card standard (Blackmagic vs Elgato) for Mac ingest.

---

## 7. Brand separation (COS)

- **Studio C** = production vendor at Utopia — **not** Deep South Directory marketing content, not the record label.
- **Big Muddy Entertainment** = label + promoter — separate brand; Studio C may deliver assets under contract.
- **Deep South Directory** = local business marketing product — no touring/label voice on DSD customer surfaces.

---

*Last updated: 2026-04-05 — swarm commit for GitHub #80.*
