# VR experience pipeline — photogrammetry to headset

How we move from **A7 / LiDAR capture** to something a customer can **stand inside** on Quest or click around on desktop.

## Capture → mesh

1. **Align** — RealityCapture or Meshroom (open baseline) from ordered stills + optional GCP.
2. **Clean** — decimate to target poly budget (web vs. sideload).
3. **Texture bake** — 8k atlas max for web; 4k for Quest WebXR if bandwidth-sensitive.

## Mesh → splat / real-time

- **Gaussian splat** path for marketing “wow” — export viewer bundle; host on Vercel + CDN.
- **glTF / glb** path for interactive hotspots (pricing cards, audio zones).
- **USDZ** for Apple Quick Look shares (realtor texts).

## WebXR delivery (Quest browser)

- **Preferred:** `/vr/{slug}` Three.js + `VRButton` — no store submission, instant link in SMS.
- **Sideload:** only when a venue needs offline APK — separate signing + update burden.

## Export format matrix

| Format | Best for | Notes |
|--------|----------|-------|
| Gaussian splat | Social clip, landing hero | Large files — CDN cache |
| glTF | WebXR + annotations | Draco mesh compression |
| USDZ | iMessage / iOS | Strip unused materials |
| WebXR page | Quest + desktop fallback | Orbit + enter-VR |

## Use cases

- Real estate pre-demo before staging truck arrives.
- Hotel room category proof without opening every door.
- Virtual art staging (see `VIRTUAL_ART_STAGING.md`).
- Venue walkthrough night-before load-in.
- Artist exhibitions — timed releases per room.

---

*HDI internal — aligns with `apps/web` `/vr/[slug]` viewer.*
