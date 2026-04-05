# Press article photo assignments — canonical spec

Internal mock articles live under `apps/web/public/press/*.html`. They pull from the **~480-image** library (`processed/slideshow`, `arrie-aslin`, `studio-c`, `processed/bearsville`, `processed/big-muddy`, `processed/artists`, `dsd`, `gallery/prints`, `platform`, `records`, `ai-corridor`, etc.).

---

## Non-negotiable rules (for Cursor and humans)

1. **No duplicate `src` across press articles**  
   The same `/images/...` path MUST NOT appear in more than one file under `apps/web/public/press/`. (Within a single article, each slot is also unique.)

2. **`victorian-mansion-natchez.webp` — banned in press**  
   Do **not** reference `/images/corridor/victorian-mansion-natchez.webp` (or any path ending in `victorian-mansion-natchez.webp`) in any HTML under `apps/web/public/press/`. It was overused; Natchez architecture is available across **77+ slideshow** and **big-muddy** assets instead.

3. **Match subject matter**  
   NYT → town + media ecosystem; Rolling Stone → performance + touring + records; Bon Appétit → inn, bar, food, grounds; Vanity Fair → portrait, fine art, studio, Inn life; WSJ → SMB / directory / services; Wired → studio, night city, AI, control room; Podcast → street + touring neon.

4. **Prefer non-`corridor` folders when possible**  
   `images/corridor/` is a grab bag; prefer `processed/slideshow`, `dsd`, `processed/big-muddy`, and named collections so assignments stay traceable.

5. **After edits, verify**  
   ```bash
   # All image src lines (press only)
   grep -h 'src="/images/' apps/web/public/press/*.html | sort

   # Duplicates across press (should print nothing)
   grep -ho 'src="/images/[^"]*"' apps/web/public/press/*.html | sort | uniq -d

   # Victorian ban (should print nothing)
   grep -r 'victorian-mansion-natchez' apps/web/public/press/
   ```

---

## Current assignments (source of truth — keep in sync with HTML)

### 1. NYT — `nyt-natchez-media-revolution.html`  
*Natchez, Main Street, radio, river, directory*

| Slot | Path |
|------|------|
| Hero | `/images/processed/slideshow/natchez-1065.webp` |
| Body | `/images/processed/slideshow/natchez-1103.webp` |
| Body | `/images/dsd/brand-radio.webp` |
| Body | `/images/processed/artists/arri-aslan-03.webp` |
| Body | `/images/dsd/mississippi-sunset.webp` |
| Body | `/images/processed/big-muddy/natchez-brick-street-live-oaks.webp` |

### 2. Rolling Stone — `rolling-stone-big-muddy-touring.html`  
*Artists, Bearsville theater, Natchez night, vinyl retail*

| Slot | Path |
|------|------|
| Hero | `/images/processed/artists/arri-aslan-04.webp` |
| Body | `/images/processed/bearsville/balk-session-03.webp` |
| Body | `/images/processed/bearsville/theater-show-02.webp` |
| Body | `/images/processed/bearsville/theater-show-03.webp` |
| Body | `/images/processed/big-muddy/natchez-night-1034.webp` |
| Body | `/images/records/anthologist-vinyl-bokeh.webp` |
| Body | `/images/records/natchez-main-street.webp` |

### 3. Bon Appétit — `bon-appetit-big-muddy-inn.html`  
*Inn interior, bar, grounds, Southern food, Regina’s*

| Slot | Path |
|------|------|
| Hero | `/images/processed/big-muddy/for03361.webp` |
| Body | `/images/processed/big-muddy/natchez-night-1039.webp` |
| Body | `/images/platform/live-oak-canopy.webp` |
| Body | `/images/platform/bluff-azaleas-river.webp` |
| Body | `/images/dsd/southern-food.webp` |
| Body | `/images/processed/big-muddy/reginas-kitchen-exterior.webp` |

### 4. Vanity Fair — `vanity-fair-chase-pierson-profile.html`  
*Arrie portrait, Catskills print, Studio C, Inn, Natchez street life*

| Slot | Path |
|------|------|
| Hero | `/images/arrie-aslin/ta-c2-148-of-959.webp` |
| Body | `/images/gallery/prints/valley-fog-morning.webp` |
| Body | `/images/studio-c/utopiademo-day-14.webp` |
| Body | `/images/processed/big-muddy/for03362.webp` |
| Body | `/images/processed/slideshow/natchez-363.webp` |
| Body | `/images/studio-c/utopiademo-day-16.webp` |
| Body | `/images/studio-c/utopiademo-day-17.webp` |
| Body | `/images/processed/slideshow/natchez-368.webp` |

### 5. WSJ — `wsj-small-town-ai-platform.html`  
*Directory, categories, Main Street, content product*

| Slot | Path |
|------|------|
| Hero | `/images/dsd/bg-natchez-street.webp` |
| Body | `/images/dsd/cat-restaurant.webp` |
| Body | `/images/dsd/cat-service.webp` |
| Body | `/images/processed/slideshow/natchez-372.webp` |
| Body | `/images/dsd/service-content.webp` |

### 6. Wired — `wired-glass-engine-ai.html`  
*Studio C, Natchez night, AI module, fine-art control room*

| Slot | Path |
|------|------|
| Hero | `/images/studio-c/utopiademo-day-11.webp` |
| Body | `/images/processed/big-muddy/natchez-night-1040.webp` |
| Body | `/images/dsd/service-ai.webp` |
| Body | `/images/studio-c/utopiademo-day-12.webp` |
| Body | `/images/gallery/prints/the-control-room.webp` |

### 7. Podcast — `podcast-morning-briefing.html`  
*Episode art + transcript illustration*

| Slot | Path |
|------|------|
| Cover | `/images/processed/slideshow/natchez-1032.webp` |
| Transcript | `/images/ai-corridor/beale-street-neon.webp` |

---

## Reserved / unused pools (for future press or other pages)

Do **not** reassign the paths listed above to a second article. For new mock pieces, draw next free files from:

- `images/processed/slideshow/` (dozens unused)
- `images/arrie-aslin/` (portraits, non-thumb)
- `images/gallery/prints/` (fine art)
- `images/studio-c/utopiademo-day-*.webp` (many days still unused in press)
- `images/dsd/*` (only use each file once across press)

---

## Changelog

- **2026-04** — Removed `victorian-mansion-natchez.webp` and all cross-article repeats; doc aligned to live HTML under `apps/web/public/press/`.
