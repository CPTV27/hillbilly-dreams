# GCS `approved/` Bucket Inventory — 2026-04-30

> **Bucket:** `gs://bmt-media-bigmuddy/approved/`
> **Index file:** `gs://bmt-media-bigmuddy/approved/index.json` (machine-readable manifest, regenerated on each ingest, last generated 2026-04-17T04:00:12Z)
> **Inspection method:** `gcloud storage ls -r` plus full thumbnail review (320–480px proofs) of every shoot in the inventory.
> **Auth context:** active gcloud service account `bigmuddy@bigmuddy-ff651.iam.gserviceaccount.com`, project `bigmuddy-ff651`.

---

## Top line

| Metric | Value |
|---|---|
| Total assets indexed | **229 photos** |
| Real photography (Chase) | **190 photos** (83%) |
| AI/stock holdovers under `/approved/` | **39 photos** (17%) — flagged below as **DO NOT USE** |
| Distinct shoots | 4 (3 real, 1 legacy bucket) |
| Capture window | 2026-03-15 → 2026-03-29 (six-week sprint window) |
| Cameras | Sony A7M2 (170), Apple iPhone 16 Pro (20), no-EXIF (39 — all in legacy-starter) |
| Public-facing CDN | `https://storage.googleapis.com/bmt-media-bigmuddy/approved/...` |
| Asset shape | Each photo = 4 files: `{hash}.webp` (1.5–2.4k wide), `{hash}-grid.webp` (~1k–1.6k), `{hash}-thumb.webp` (320–480), `{hash}.json` (metadata) |
| Metadata coverage | captions: 2/229 (1%), subjects: 0/229, categories: 0/229. **Effectively no human tagging — directory + filename are the only signal.** |

**Verdict on bucket health:** the real photography is excellent and editorial-grade. The catalog is undertagged; that should be fixed in a separate pass. The presence of 39 AI/stock holdovers under `/approved/` is a policy violation per `CLAUDE.md` ("the asset URL must contain `/approved/` to ensure it's a real Chase photo, not AI-generated") and should be moved out before anything reads `index.json` automatically.

---

## Categorization

### 1. Save the Hall Ball (152 photos) — **PRIMARY EDITORIAL ASSET**

Path: `gs://bmt-media-bigmuddy/approved/big-muddy/natchez/save-the-hall-ball/`
Camera: Sony ILCE-7M2 + 24-70mm f/2.8 DG DN Art
Captured: 2026-03-22 (single-night event coverage)
File widths: 1600 / 2400px webp

**What it is:** Full editorial coverage of the *Save the Whole Ball* benefit gala at a Natchez antebellum estate (the original raw set was 1113 frames; 152 made it through to `/approved/`). Black-tie, candlelit, period costume, live music, formal seated dinner, Mississippi-spring florals.

**Subject mix observed across the set:**
- **Live music on stage** (multi-piece soul/blues group, three vocalists in black, drum kit, keys, horns — `fbbf195cbfc2`, `bbcd2e47a6bf`, `1f5eecd643f1`, `8bc188921450`)
- **Veranda/porch scenes at golden hour and after dark** (silhouetted band on candlelit porch — `f3ce526c5d86`)
- **Antebellum interiors** (staircase + portrait + ivy garland — `474f390dcf87`; ballroom with crystal chandelier and sweeping shot from the stage — `bbcd2e47a6bf`; ballroom from elevated staircase — `0d25b10bb9e1`)
- **Editorial florals as still life** (climbing roses on white-iron porch railing — `d7ee9e186d82`; tall florals in brass urns — `1a9379a10314`; selective-color yellow rose — `0fde6a09627a`; moody black-ground rose composition — `53e330db6a0c`)
- **Food as jewel-box** (silver bowl of chocolate truffles ringed by tapers — `632a39c3b76b`; B&W chef carving roast pig — `d91c9b9f160f`; outdoor buffet by torchlight — `e9e0b197ce36`)
- **Whole-roasted pig + Chase Pierson + two attendees, golden hour, oak trees** — `03284582b241` — **the only on-brand founder portrait in the entire approved bucket**
- **Period-costume re-enactor with elderly woman in white period dress on flagstone garden patio at night** — `4e6884427f43`, `10b3a3114aca` (recurring narrative thread)
- **Editorial portraits of attendees** (two women in blue/satin gowns against painted backdrop — `a3b4b00d79e2`; B&W environmental portrait of bearded man + two women in evening dress — `1a86dee989ec`; teal-dress woman with cocktail and pendant necklace lit by string-lights — `02d72e47bc61`)
- **Architectural details** (Corinthian columns + ivy in moonlight, B&W — `0012e54eecc9`; B&W column + cascading vine on checkered floor — `1ac47cdd4256`)
- **Object stills** (B&W antique desk-globe + candle ledger — `01cdce632e02`; antique sideboard + apothecary jars + brass urn — `767965784127`)
- **Reception entry / arrival shots** (doorway with vines + columns + greeting line — `bdd5fdf79ed9`; small intimate group near staircase — `1068b1763c7d`)

**Best-in-set hero candidates** (subjective top 12 from the proof review):

| Hash | Use |
|---|---|
| `fbbf195cbfc2` | The definitive "live music in a Natchez ballroom" wide — three vocalists, mirrored back, gold satin draping |
| `bbcd2e47a6bf` | Crystal chandelier + ballroom + women in evening dress + performer in foreground silhouette |
| `03284582b241` | Chase + roast pig + two attendees, golden hour, oak trees — only real founder portrait |
| `8bc188921450` | Bokeh band-on-stage with mixing-laptop foreground — perfect "studio-meets-stage" frame |
| `f3ce526c5d86` | Trio + candlelit veranda + lamppost glow at twilight — moody, painterly, hero-grade |
| `474f390dcf87` | Antebellum staircase + ivy garland + portrait — interiors hero |
| `d7ee9e186d82` | Climbing roses + white-iron veranda railing + candles — editorial still life |
| `0d25b10bb9e1` | Ballroom B&W from elevated staircase — Annie Leibovitz vibes |
| `632a39c3b76b` | Silver truffle bowl + tapers — food-as-jewel close-up |
| `bdd5fdf79ed9` | Doorway entry, columns, vines, guests being received — establishing |
| `a3b4b00d79e2` | Two women in blue/satin gowns against painted backdrop — environmental portrait |
| `1ac47cdd4256` | Column + vine + checkered floor (B&W) — graphic, hero-margin candidate |

---

### 2. Liberty MS Main Street (18 photos) — **PRIMARY "MAIN STREET" ASSET**

Path: `gs://bmt-media-bigmuddy/approved/big-muddy/liberty-ms/untitled-{70..97}-of-97-dxo_deepprime-3jpg/`
Camera: Sony ILCE-7M2 + 24-70mm f/2.8 DG DN Art
Captured: 2026-03-15
File widths: 1600 / 2400px webp

**What it is:** A walk-through-of-Main-Street series in Liberty, Mississippi (Amite County, ~80 miles south of Natchez). Every frame is a small-town storefront, civic building, or commercial-strip vista shot in good late-afternoon light, then DxO DeepPRIME-denoised. Mix of saturated color, sepia, and B&W treatments.

**Subject inventory (every frame is usable; this is a complete walk):**

| Hash | Subject |
|---|---|
| `a39e08605489` | "The Barber Shop" storefront — selective B&W with red door + red barber pole |
| `b201b53fac5b` | "The Barber Shop" + "Sign Here" sign-making shop, awnings, full color |
| `6175278a71bb` | Liberty Drug Store / Rexall — vertical, looking down the strip |
| `5c40cd3613c2` | Liberty Drug Store hero — wide horizontal, "Serving Amite County Since 1903", blue + red mural — **showstopper** |
| `b99631060954` | Lady V's Fashion Boutique & Things — desaturated metal-clad storefront |
| `18b882935d61` | Liberty Drug Store strip from across the street with telephone wires — sepia-cyan treatment |
| `3375d3d1f777` | Nicole Brent Photography + Anne Mae's Children's Boutique — banner detail in B&W |
| `4bb9dd8fb51d` | Liberty Drug Store side-mural close detail — graphic, type-driven |
| `540bbe41dc38` | Liberty Drug Store front — blue awning + Rexall sign, wide elevation |
| `a8bbfd0fa963` | Liberty Drug Store from across the street, three-quarter angle, telephone-wire halo |
| `81c9950f1c1c` | Liberty Baptist Church (sepia) — domed neo-classical brick civic building |
| `77aa4f9a2efe` | Liberty Baptist Church (true color) — same building, full saturation |
| `b6822f6ab469` | Barber Shop + "Sign Here" + "Auto Parts" + water tower — wide commercial strip in cool desaturation |
| `05a0f56a117f` | "Liberty Cleaners" corrugated-metal facade in afternoon golden light — moody, painterly |
| `d25c12edf4c4` | Sidewalk awning vista with terra-cotta planters + Liberty Drug + traffic — warm sepia |
| `fd05c6b55a3f` | Roadside small workshop / gas station — saturated color with green sky |
| `1d61ee1aa161` | Same workshop in B&W — graphic, contrasty |
| `79e33ab60569` | Same workshop building + iconic water tower in saturated blue/red sky — **hero** |

---

### 3. Silver Street Antiques / Natchez Under-the-Hill (20 photos) — **NATCHEZ RIVERFRONT ID**

Path: `gs://bmt-media-bigmuddy/approved/big-muddy/natchez/silver-street-antiques-business-listing-exterior-only/`
Camera: Apple iPhone 16 Pro
Captured: spring 2026 (no precise date in metadata; directory name implies a business-listing shoot)
File widths: 1800 / 2400px webp (iPhone HEIC-converted)

**What it is:** Storefront + sidewalk + riverfront documentation of "Silver Street Gallery & Gifts" at 27 Silver Street, Natchez Under-the-Hill. **The Natchez-Vidalia bridge is in roughly half of the frames** — this is the strongest pure-Natchez ID material in the bucket.

**Subject inventory:**

| Hash | Subject |
|---|---|
| `943d30e322c4` | Hanging "27 Silver Street Gallery & Gifts" sign + hanging clothes rack + bridge in distance, vertical |
| `0a44e0fe9946` | Same sign + green motorcycle + RV + bridge — wider |
| `e3db6e80673c` | Clothing rack with embroidered florals + sign + bridge — vertical |
| `bb58b4fcc34a` | "Fine Gifts / Jewelry / China / Souvenirs" hand-painted wood sign on brick — **best graphic still in the set** |
| `b14e8da65755` | Mississippi t-shirts on display, brick wall — close-up, saturated color |
| `7dfc612a39dc` | T-shirt display + child mannequin in stars cap + Natchez "since 1716" t-shirt |
| `0dcaa4f63983` | "NATCHEZ" hand-painted folk-art sign on brick + topiary + landscape painting on display |
| `a80b23ac0ede` | Woman with tattoos + motorcycle gear + crowd in background, "OPEN" sign — environmental street portrait |
| `ec978ba64553` | Child mannequin in stars cap + bandana + flag, US flag overhead — patriotic still life |
| `703a04509662` | Tattooed crowd member + motorcycles + flags — bike-rally crowd shot |
| `a6a4d68559c7` | Folk-art birdhouse painted with lipstick poppies — close-up against brick |
| `cf994927008e` | Blue folk-art birdhouse + landscape painting on brick wall, hung outside |
| `fba4491546f5` | **Sidewalk + Silver Street sign + Mississippi state flag + green motorcycle + Natchez bridge in distance + "Chicks Rule" black helmet in foreground** — single best storytelling frame in this shoot |
| `4cd3382ddec8` | "WELCOME TO NATCHEZ" sandwich-board sign + bridge + truck — establishing/wayfinding |
| `02f176a93f99` | Two-story brick gallery building with antique-iron-balcony detail, wide elevation |
| `f3ba70f86414` | Same brick storefront + wrought-iron balcony + hanging clothes + open door, sun-flooded |
| `de95e61c7bd9` | Open shop facade + Mississippi t-shirts on mannequin + chandelier visible inside — sunlit |
| `cc32637baa88` | Mississippi t-shirts + child mannequin + open door + window reflection of chandelier |
| `58162852b866` | Two-story brick building from the parking lot — Mississippi state flag flying, wide |
| `a54c827475e9` | Sailboat-print store window + Mississippi t-shirts on mannequin + Natchez tank + bird-houses, full storefront elevation |

---

### 4. Legacy Starter (39 photos) — **DO NOT USE; AI-GENERATED HOLDOVERS**

Path: `gs://bmt-media-bigmuddy/approved/big-muddy/natchez/legacy-starter/`
Camera: **none (no EXIF data)**
File widths: 1024–1600px (typical AI-render output sizes; not Sony or iPhone native sizes)

**What it is:** 39 AI-generated hero/decorative images carried over from a prior site build, currently sitting inside `/approved/` in violation of the `CLAUDE.md` photo policy ("the asset URL must contain `/approved/` to ensure it's a real Chase photo, not AI-generated"). Filenames give them away — `hero-ozarks-sunrise.webp`, `blues-room-live-show.webp`, `juke-joint-saturday.webp`, `clarksdale-crossroads.webp`, `inn-grey-suite.webp`, `inn-pink-suite.webp`, `inn-magenta-suite.webp`, `inn-british-suite.webp`, `inn-blue-suite.webp`, `inn-green-suite.webp`, `entertainment-hero.webp`, `radio-hero.webp`, `gallery-hero.webp`, `records-hero.webp`, etc.

**Recommendation:** Move the entire `legacy-starter/` subdirectory out of `/approved/` (e.g., to `gs://bmt-media-bigmuddy/legacy-ai-renders/`) and regenerate `index.json`. Until that happens, **anything reading `approved/index.json` will silently include AI-generated content**, which is the exact failure mode the policy was written to prevent. This is a separate cleanup task from the curation work itself, but it must be done before any automated pipeline (gallery, directory module, magazine layout) ingests this index.

---

## Gaps — categories where the bucket is thin or empty

These are categories the curation brief asked for; the bucket does not cover them yet:

| Category | Bucket coverage | Notes |
|---|---|---|
| Big Muddy Inn — exterior | **None** | No approved exterior of the Inn building itself. Save the Hall Ball is shot at a different antebellum estate (the venue, not the Inn). New shoot needed. |
| Big Muddy Inn — guest rooms | **None real** | Only AI renders in `legacy-starter` (`inn-pink-suite`, `inn-blue-suite` etc). New shoot needed before any room-level marketing. |
| Big Muddy Inn — bar / Blues Room | **None real** | Only `blues-room-live-show.webp`, `blues-room-harmonica.webp`, `blues-room-show.webp` AI renders in `legacy-starter`. New shoot needed. |
| Natchez bluff / overlook | **None** | No approved bluff-edge sunset frame. The Natchez-Vidalia bridge appears in ~10 silver-street frames as a distant element, but no proper bluff shot. |
| Natchez antebellum exterior daytime | **Indirect** | Save the Hall Ball is at one estate but mostly shot interior/at-night. No clean daytime portico shot. |
| Forks of the Road historical site | **None** | Mentioned in brand context, no coverage. |
| Mississippi River | **Indirect** | The river appears in silver-street as backdrop behind the bridge but never as the subject. |
| Pine forest / corridor landscape | **None** | The Mississippi-corridor "long road, golden hour, pines" frame the brand often references — not in the bucket. |
| Touring acts / live music outside the Hall Ball | **None** | Save the Hall Ball stage shots are the only live-music coverage. No on-the-road / van / load-in / club gig coverage. |
| Bearsville / Hudson Valley | **None** | Northeast region completely uncovered in `/approved/`. |
| Studio C interior (real) | **None** | Only AI renderings of the Big Muddy Acres Pull Barn exist (`/big-muddy-acres/renderings/`); no real studio interior photo. |
| Chase Pierson founder portrait | **One frame** (`03284582b241`) | The roast-pig group shot is the only real founder portrait. A proper environmental portrait shoot is overdue. |
| Tracy Alderson-Allen / Amy Allen / JP Houston portraits | **None** | No partner portraits in the bucket. |
| Food (Inn / Biscuits & Blues) | **Indirect** | Save the Hall Ball food stills exist but are gala-coded, not Inn-coded. |
| Sprinter van | **None** | The touring vehicle is uncovered (it's also brand new, so this is expected). |

---

## Operational notes

- **Directory naming inconsistency:** the Liberty MS shoot is broken across 18 separate subdirectories named after the original DxO filenames (`untitled-70-of-97-dxo_deepprime-3jpg/` through `untitled-97-of-97-dxo_deepprime-3jpg/`), one photo per directory. This is a bucket-organization bug — those 18 photos belong in a single `liberty-ms-main-street/` shoot directory. Fixing this will make discovery cleaner; the 18 individual subdirectories are not browsable as a coherent set today.
- **No subject tags, no captions, no categories** — discovery currently depends on knowing the directory structure or scraping `originalFilename`. A single one-time pass through Vertex AI vision on the 190 real photos to populate `subjects[]`, `caption`, and `category` would make every downstream task (gallery, directory listings, search) dramatically cheaper.
- **Asset shape is consistent** — every photo has an `orig`, `grid`, and `thumb` webp at predictable URL paths; safe to wire into any HTML/JSX without an indirection layer. Use the `grid` width (~1067–1600px) for in-page editorial, `orig` (1600–2400px) for full-bleed hero, `thumb` (320–480px) for grid catalogues.

---

## What this enables right now

With the 190 real photos, **today**, we can fully replace the Imagen renderings on:
- `/the-case/` (proposal in companion file)
- `/big-muddy-acres/` — partial swap; the Pull Barn renderings stay because the building does not exist yet, but the property-vista shot can be replaced by a Liberty MS "small-town corridor" frame as a stand-in
- Any "Main Street America" or "small-town hospitality" framing in any deck or page (the 18 Liberty frames carry it)
- Any "live music in a Natchez ballroom" or "Save the Hall Ball" editorial moment (the 152 sthb frames carry it)
- Any "Natchez riverfront ID" element (the 20 silver-street frames carry it)

What we **cannot** do today without a new shoot: any Big Muddy Inn imagery (exterior, rooms, bar, Blues Room), any pure-landscape corridor shots, any partner portraits, any van/touring-on-the-road imagery, any Bearsville imagery.

---

*Inventory compiled by Gallery Director agent, 2026-04-30. Source-of-truth re-verification: re-run `gcloud storage ls gs://bmt-media-bigmuddy/approved/` and `gcloud storage cat gs://bmt-media-bigmuddy/approved/index.json` against this document.*
