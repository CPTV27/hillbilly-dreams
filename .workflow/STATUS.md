## Cursor delegation batch — 2026-04-15

### Done
- **Radio (`RadioStreamPlayer.tsx`)**: Polls `https://stream.bigmuddytouring.com/api/nowplaying/bigmuddyradio` every 30s. Shows title, artist, album, AzuraCast art URL, listener count in existing card styling. On fetch/SSL failure: “Stream loading…” and listeners “—”. Audio element unchanged.
- **Photo library API**: `GET /api/photo-library?region=…` filters by `region` (e.g. `bearsville`).
- **`lib/photo-index.ts`**: Shared types, `formatPhotoCityLabel`, `sortPhotosLatestFirst`, `fetchPhotoIndex` for server pages.
- **Homepage (canonical `touring/page.tsx`)**: Middleware serves `/` from touring; added “From the library” 12-photo grid (`urls.grid`) with caption / city / credit; hero background prefers latest library grid image.
- **Gallery**: `page.tsx` is async; `GalleryPageClient.tsx` holds prior UI with 12-photo hero grid from API; Featured + All Work unchanged.
- **Bearsville**: New `app/bearsville/page.tsx` — hero + strip from `?region=bearsville`, filtered to Woodstock/Catskills city slugs when present; fallback copy if empty.
- **Onboarding complete**: Hero image from `/api/photo-library` (latest by `ingestedAt`); “Share this with Chase” → `mailto:me@chasepierson.tv` with prefilled subject/body; `variant="tracy"` on Tracy flow.
- **Story Engine scaffolds**: `components/story-engine/PromptInput.tsx`, `OutlineCard.tsx`, `ClipPicker.tsx` (mock data, tokens only).
- **Magazine test article**: `lib/articles.ts` id 23, slug `test-library-picker-works`, hero + 3 body images (grid URLs). `renderBody` supports `![alt](url)` and `---`. Short URL: `app/magazine/test-library-picker-works/page.tsx` redirects to `/magazine/articles/test-library-picker-works`.

### Notes
- `docs/ARCHITECTURE.md` was missing in tree; work followed existing patterns and `lib/photo-index` alignment with `BmmLibrarySource`.
- Full-workspace `tsc` may still report unrelated `apps/web/server.ts` errors (pre-existing).

### Blockers
- None.

---

## Cursor batch 2 — 2026-04-15

### Done (#7–#16)
- **Honest claims (DSD)**: `directory/page.tsx` quote + “How it works” + “One subscription” copy; PDF template `river-room` tier line (review assistance wording).
- **QuickBooks**: `demo/scan2plan/page.tsx`, `briefings/scan2plan-bob/page.tsx` roadmap/dev wording.
- **Radio player polish**: `RadioStreamPlayer.tsx` — 200ms art fade on URL change, singular/plural listeners, ON AIR pulsing dot (token accent), vinyl-style placeholder behind art, token-only colors.
- **Touring hero**: `TouringHeroSlideshow.tsx` — 6 library slides, 8s / 1s crossfade, pause on hover; wired from `touring/page.tsx`.
- **Gallery chips**: `GalleryPageClient.tsx` — unique city chips, client filter, latest-12 from filtered set.
- **Story Engine admin**: `app/admin/story-engine/page.tsx` + `StoryEngineDemo.tsx` (allow-list gate like other `/admin` pages); `PromptInput` supports controlled mode.
- **Magazine home**: `magazine/page.tsx` — `fetchPhotoIndex` + deterministic `heroImage` fallback via `article.id % library.length` when hero missing.
- **Radio home**: `radio/page.tsx` — full-bleed library hero, `RadioStreamPlayer`, mock “Recently played” card (bigmuddyradio / touring `/radio` route).
- **404 / error**: `app/not-found.tsx` (server, library bg), `app/error.tsx` (client boundary — Next requirement) with brand copy + CTAs.
- **Sanity picker**: `BmmLibrarySource.tsx` — arrows navigate grid, Enter selects, Escape closes, `var(--accent)` focus outline.

### Notes
- `bigmuddyradio.com` is consolidated to `bigmuddytouring.com` paths in `domain-routes` comments; refreshed `/radio` page is the live radio landing when hostname rewrites to `/radio`.
