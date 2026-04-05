# Studio C — Multi-gimbal capture, auto-cut, Restream

*Architecture and research checklist for GitHub #79. **Studio C — Utopia Studios, Bearsville, NY.*** Feeds the same live pipeline as the pro cine kit (**`STUDIO_C_CINE_KIT.md`** / #80).

---

## 1. Purpose

Pair **DJI Osmo** rigs (Osmo 3 on hand; Osmo 7 planned) with phones for **multi-camera capture** with **minimal crew**: placement guidance, **auto-cutting** between feeds, **live RTMP** to **Restream.io**, **GCS** raw archive, and **clip** output for the **native social publisher** (not third-party schedulers).

The **auto-cut engine** is source-agnostic: it should accept **RTMP** from phones, **SDI/HDMI** (via capture card) from **RS4 + Sony** and **Ronin 4D** (#80), and normalize to one **program** stream.

---

## 2. Target operator flow

1. Operator sets **Camera 1** (Osmo + phone) as primary.
2. System (future): vision-based **placement hints** for cameras 2–3 (angles, height, distance).
3. Operator confirms; gimbal **tracking** targets locked where SDK allows.
4. All cameras **ingest** concurrently.

### During capture

- **Auto-cut** rules (weighted): audio peaks (performer), motion / activity score, min/max shot length, timed ambient cuts.
- **Manual override:** phone Mimo app and/or future `/admin/studio-c/live`.
- **Record:** per-camera ISO to **GCS**; program out to **Restream**.
- **Post:** auto-cut master + **30s / 60s** highlights → social pipeline.

---

## 3. Research checklist (Phase 1 — before writing ingest code)

### DJI Osmo 7

- [ ] Mimo app: **RTMP / RTSP** out available and stable for long runs?
- [ ] **Mobile SDK** (MSDK 5.x): gimbal control, multi-device, **ActiveTrack** programmatic API vs app-only?
- [ ] Multi-Osmo control from one hub device?
- [ ] Battery life under continuous stream + tracking.
- [ ] Supported phones — spec **dedicated camera phones** (used iPhone 13/14 class per issue).

### DJI Osmo 3 (owned)

- [ ] Same API/stream questions; **interop** with Osmo 7 in one show.
- [ ] Tracking gap vs Osmo 7 — use for lock-off / wide only if needed.

### DJI RS / cinema side (#80)

- [ ] **RS SDK** for multi-rig programmatic control (ties to auto-cut director).
- [ ] **DJI Transmission** → capture card → same ingest bus as phone RTMP.

### Restream

- [ ] Account + **RTMP ingest URL** + **REST API** key for go-live / channel management.
- [ ] Env (Vercel / runtime): `RESTREAM_API_KEY`, `RESTREAM_RTMP_URL` (and any channel id) — store in Bitwarden + Vercel; **never commit**.

---

## 4. Auto-cut engine (design)

**Inputs:** N streams (RTMP preferred internally; transcode SDI/HDMI upstream).

**Signals:**

- Audio: peak / applause / silence gates.
- Video: frame-diff motion, optional **Vertex AI Vision** or **MediaPipe** for subject salience.
- Rules: min shot ~2s, max ~8–12s, weights per show preset (performance vs interview vs property tour).

**Outputs:**

- Program **RTMP** → Restream.
- ISO files → GCS paths keyed by `StudioCRequest` / `ProductionJob` id when integrated (#77).

**Implementation options (pick one spine):**

| Approach | Pros | Cons |
|----------|------|------|
| **FFmpeg** `filter_complex` | Scriptable, ubiquitous | Operability at scale |
| **GStreamer** | Flexible pipelines | Heavier ops |
| **OBS** + WebSocket | Fast prototype | Headless/cloud friction |

**Recommendation:** prototype **single-camera RTMP → Restream** on **Mac mini** (192.168.4.37) before cloud-bursting; align with existing broadcast stack docs.

---

## 5. Architecture (ASCII)

```
[Osmo7 + Phone A] --RTMP-->
[Osmo7 + Phone B] --RTMP-->   [Auto-cut engine] --RTMP--> [Restream] --> YT / FB / Twitch / custom
[Osmo3 + Phone C] --RTMP-->        |
[RS4+Sony / 4D via capture] ------>|
                                   v
                              [GCS archive]
                                   v
                            [Clip generator]
                                   v
                         [Native social publisher]
```

---

## 6. Phased delivery (from issue #79)

| Phase | Scope |
|-------|--------|
| **1** | This doc + SDK/RTMP/Restream **spikes** (manual tests) |
| **2** | Multi-RTMP ingest, GCS ISO recording, `/admin/studio-c/live` shell |
| **3** | Auto-cut rule engine + manual override |
| **4** | Placement guidance (vision → operator hints) |
| **5** | Gimbal presets / remote PTZ where SDK allows |

---

## 7. Use cases (matrix)

| Scenario | Cameras | Output |
|----------|---------|--------|
| Blues Room performance | 3 (front, side, behind) | Live + clips |
| Property tour (Tuthill) | 2 (walker + exterior) | Tour for Realtor Pulse |
| Inn event | 2–3 | Live + highlight reel |
| Utopia session | 2 (control room + room) | BTS + session |
| Magazine interview | 2 | Feature video |

---

## 8. Hardware add (lightweight kit)

- DJI Osmo 7 (~$160–$200).
- 2–3 **dedicated** camera phones (~$300 each used).
- Tripods / clamps / mounts.

---

## 9. Brand separation (COS)

- Tooling is **Studio C** ops — not **Deep South Directory** consumer UX.
- **Big Muddy Entertainment** consumes outputs under its own brand; do not mix label voice into DSD surfaces.

---

*Last updated: 2026-04-05 — design artifact for #79 Phase 1.*
