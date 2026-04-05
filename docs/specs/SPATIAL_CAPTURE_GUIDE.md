# Spatial capture — field guide (photographers)

Operators: Chase / Elijah / Studio C (Bearsville, NY). This doc answers *what to roll for which job* so post-production does not beg for a re-shoot.

## Job types → minimum capture

| Job type | Photos | Video | 360 | LiDAR | Drone |
|----------|--------|-------|-----|-------|-------|
| **Listing** | Yes | Walkthrough (1-axis) | Optional | Optional | No (unless exterior hero requested) |
| **Design** | Yes | Yes | Yes (1–2 nodes min) | Yes | If exterior matters |
| **Full renovation** | Yes | Yes | Full path | Yes | Yes — roofline, context, approach |

## Equipment checklist

**Listing:** full-frame + 24–70, DJI Mic II or equivalent, tripod, **Polycam** phone (charged), gray card, lens cloth, SD ×2.

**Design:** above + 360 rig or phone 360 mode, **LiDAR-capable iPhone / iPad**, drone + Part 107 card if exterior.

**Full renovation:** above + **extra batteries**, **RTK puck** if geo-alignment to civil, **A7 body** for photogrammetry set, survey tape for scale refs.

## Polycam (LiDAR / room mode)

- **Room mode** for interiors — walk slow, shoulder-height, overlap doorways twice.
- **Scan resolution:** high for design jobs; medium acceptable for quick listings if timeboxed.
- **Lighting:** turn on *all* practicals; if mixed 2700/5000K, note in slate for colorist.
- **Fail conditions:** mirrors without walking past both angles, glass storefronts without cross-polar shots — flag on set.

## A7 photogrammetry (when mesh quality matters)

- **Overlap:** 70–80% forward, 60–70% side between rows.
- **Shutter:** 1/125+ for handheld; tripod rows for texture-heavy walls.
- **Lighting:** diffuse daylight preferred; if strobing, lock WB and exposure manually.
- **Shot count:** small room 40–60; full floorplate 150+; exterior facade 30–80 depending on relief.

## File naming

`JOBID_ROOM_SEQ_####.ext` — example: `TUTHILL_184_MAIN_0042.jpg`

## GCS upload path (canonical)

`gs://bmt-media-bigmuddy/spatial/{jobId}/capture/{date}/raw/{camera|lidar|drone|polycam}/`

Keep **checksum manifest** (`sha256sum.txt`) beside each upload batch.

---

*Internal — Tuthill Spatial + Studio C pipeline.*
