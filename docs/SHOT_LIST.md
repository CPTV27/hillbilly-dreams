# Shot List — Photos Needed

**Purpose:** Each brand section declares what photos it needs. When a slot has an AI image or a repeat, it generates a shooting prompt for Chase. GPS from the resulting photo auto-places it back into the right slot.

**Updated:** 2026-03-27

---

## How This Works

1. Each section on each site has **image slots** with a description of what's needed
2. Slots filled with AI images or repeats get flagged as **NEEDS REAL**
3. This document generates a **shooting prompt** — what to shoot, where, when, what angle
4. Chase goes out and shoots it
5. GPS + the pipeline auto-matches the photo back to the slot that requested it

---

## PRIORITY 1 — Kill & Replace (AI images live on site now)

### Big Muddy Touring — Lodging Section

**Slot:** `touring/page.tsx:142` — right image in "Lodging Across the Corridor"
**Currently:** `historic-home-natchez.webp` (AI, teal/pink sky)
**Shooting prompt:**
> Drive to a real B&B or historic home in Natchez — Dunleith, Monmouth, or any white-column property on a residential street. Shoot from across the street, straight-on or slight angle. Late afternoon, real sky with clouds. Include the sidewalk and any landscaping. The goal is "this is where you'd stay" — inviting, real, Southern.

---

**Slot:** `touring/page.tsx:197` — route photo grid
**Currently:** `craftsman-porch-columns.webp` (AI, same teal sky preset)
**Shooting prompt:**
> Find a real Craftsman-style house with a deep front porch and columns. Natchez or Ocean Springs. Morning light preferred — soft shadows on the porch, azaleas or crepe myrtles if in bloom. Shoot from the sidewalk, slightly below eye level to emphasize the porch height.

---

**Slot:** `touring/page.tsx:200` — route photo grid
**Currently:** `natchez-bluff-river-view.webp` (AI, teal/orange split-tone)
**Shooting prompt:**
> Shoot the real bluff view in Natchez. The gazebo on Broadway, or the view from Roth Hill. Late afternoon, sun behind you, river lit up golden. Include the bridge if possible. Wide angle, sky should be 40-50% of frame. This is THE money shot of Natchez — take your time.

---

### Big Muddy Touring — Inn Page Photo Strips

**Slots:** `inn/page.tsx:605-607` and `inn/page.tsx:725-727` — three-image strips
**Currently:** Repeats of the same AI images used on the main touring page
**Shooting prompts:**

> **Strip 1 (Inn context — "the neighborhood"):**
> 1. The Inn's actual exterior — front porch, signage, from across the street
> 2. A neighboring property or garden — something that says "this is a beautiful street"
> 3. The view from the Inn's porch — what guests see when they sit down with coffee

> **Strip 2 (Inn context — "things to do"):**
> 1. A real restaurant exterior in Natchez — not The Camp (we have that), try Magnolia Grill or The Castle
> 2. A shop or gallery on Main Street — antiques, art, books
> 3. A street scene — oak trees, brick sidewalk, afternoon shadows

---

## PRIORITY 2 — Fill Empty Slots (sections that need photos but don't have any yet)

### Big Muddy Touring — Route Stops

Each city on the route needs at least 3 photos. Currently only Natchez and Memphis have real coverage.

**Clarksdale:**
> Ground Zero Blues Club exterior at night. Neon signs, gravel parking lot, the whole juke joint feel. Also shoot: the crossroads sign (Hwy 61/49), and one restaurant or bar with character.

**Vicksburg:**
> The battlefield (we have an AI Prevost there — need a real landscape). The Old Courthouse Museum exterior. One downtown restaurant at golden hour.

**Greenville:**
> Doe's Eat Place exterior. The levee at sunset. One street scene showing the downtown.

**Baton Rouge:**
> The Old State Capitol at blue hour. A live music venue exterior. The levee or river view.

**New Orleans:**
> We probably have plenty of photos. Check the camera roll for French Quarter, Magazine Street, Frenchmen Street. Prioritize: a music venue exterior, a restaurant patio, a street scene with character.

---

## PRIORITY 3 — Brand-Specific Needs

### Big Muddy Radio
> **Need:** Interior shots of a recording setup / broadcast booth. Even if it's staged — a mic, headphones, a mixing board, warm tungsten light. Can be at the Inn's Blues Room.
> **Need:** A "listening" shot — someone on a porch with a speaker or radio, not looking at camera.

### Big Muddy Records
> **Need:** Vinyl close-ups — records on a turntable, album spines on a shelf, a needle in a groove.
> **Need:** A recording session — artist in front of a mic, studio monitors, cables on the floor.

### Big Muddy Magazine
> **Need:** Food photography — real plates at real Natchez restaurants. Shallow DOF, table-level, warm ambient light. 3-5 different dishes at different restaurants.
> **Need:** A "writer at work" shot — someone with a notebook on a porch or in a cafe. Not posed.

### The Inn
> **Need:** Real room interiors — each of the 6 rooms. Natural light from windows, beds made, details visible (turntable, art, linens).
> **Need:** The Blues Room stage — empty and during a show. Two very different moods.
> **Need:** Breakfast spread — real food, real table, real light.

### Measurably Better
> **Need:** Real small business owners using their phones or laptops. In their actual businesses — behind a counter, at a restaurant table, in a shop. NOT stock photo vibes. Real people, real places, candid.
> **Need:** Natchez Main Street — storefronts with open signs, awnings, brick sidewalks. The kind of Main Street that MB is built for.

### Deep South Directory
> **Need:** One hero photo per listed city. The single "this is what this town looks like" image. Golden hour, the most iconic view. Every city on the route.

---

## Shooting Notes

### General Rules (from Chase's style guide):
- Golden hour or blue hour preferred (60-70% of the collection should be warm light)
- Shoot on iPhone 16 Pro or Sony a7 — GPS must be enabled
- Environmental storytelling — include context, not just the subject
- People can be present but shouldn't be the focus or looking at camera
- Shoot more than you need — 10 shots per location, pick the best 2-3
- Wide establishing shots + detail close-ups for each location

### GPS Requirements:
- iPhone: GPS is automatic, just shoot
- Sony a7: Enable GPS in camera settings, or shoot a reference photo on the iPhone at the same location first
- If GPS is missing, note the location in the filename or Lightroom keywords

### Lightroom Workflow:
1. Import → GPS preserved
2. Rate: 1 star = meh, 3 stars = good, 5 stars = hero
3. Keyword with city + business name + category
4. Edit your standard grade
5. Export 5-star images via "Big Muddy Web" preset (1600px, webp, q85)
6. Drop into upload folder → pipeline handles the rest

---

## How the Pipeline Uses This Document

When Huck builds the auto-prompt system:
1. Scan `current_usage` in the image registry for slots with `status: 'killed'` or `type: 'ai'`
2. Look up the slot's section in this document
3. Generate a Google Chat message to Chase: "Hey, we need a real photo for [section]. Here's what to shoot: [prompt]"
4. When Chase uploads a photo with GPS near the target location, auto-match it to the slot
5. Post preview for approval → swap the old image → update registry
