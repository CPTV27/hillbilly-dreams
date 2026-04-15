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
