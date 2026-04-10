# Media Pipeline Fix — Prompt for Mac Mini Agent

**Priority: CRITICAL. This blocks all page builds, presentations, and content creation.**

## Context

We have 16,936 photos processed through Google Vision API with labels like "Brass instrument", "Musician", "Sunset", "Architecture." The labels are stranded in `docs/PHOTO_MANIFEST.json` — a 1.7M-line JSON file that nothing reads at runtime. The Prisma database has 604 photos with URLs only — no tags, no labels, no searchable metadata.

When Chase says "find me horn players" no agent can do it. This is unacceptable.

Read these docs first:
- `docs/MEDIA_TAGGING_FAILURE_ANALYSIS.md` — what's broken and why
- `docs/MEDIA_METADATA_STANDARD.md` — the rules for how every photo must be tagged

## Tasks (In Order)

### Task 1: Schema Migration

Add a `PhotoIndex` model to `packages/database/prisma/schema.prisma`:

```prisma
model PhotoIndex {
  id               String    @id @default(cuid())
  slug             String    @unique
  gcsUrl           String
  thumbnailUrl     String?
  heroUrl          String?
  sourceFile       String?
  sourceResolution Json?
  printReady       Boolean   @default(false)
  brand            String    @default("unassigned")
  locationCity     String?
  locationState    String?
  locationVenue    String?
  dateTaken        DateTime?
  photographer     String    @default("chase-pierson")
  visionLabels     Json?
  visionObjects    Json?
  subjectTags      String[]
  peopleTags       String[]
  mood             String[]
  caption          String?
  usableAs         String[]
  qualityScore     Float?
  reviewed         Boolean   @default(false)
  createdAt        DateTime  @default(now())

  @@index([brand])
  @@index([locationCity])
  @@index([subjectTags])
  @@index([reviewed])
}
```

Run `pnpm --filter @bigmuddy/database exec prisma migrate dev --name add-photo-index`.

### Task 2: Import Manifest to Database

Write a seed script at `scripts/media/seed-photo-index.ts` that:
1. Reads `docs/PHOTO_MANIFEST.json`
2. For each of 16,936 entries, maps the manifest fields to PhotoIndex fields
3. Maps Vision API labels to our granular subject tag taxonomy (see MEDIA_METADATA_STANDARD.md)
4. Inserts all rows into PhotoIndex
5. Reports: total inserted, tags distribution, brand distribution, location coverage

The Vision-to-taxonomy mapping is the critical part. Examples:
- `vision_api_labels` contains "Brass instrument" + `vision_api_objects` contains "Person" → add `horn-player` to subjectTags
- "Guitar" + "Stage" → `guitarist`, `live-performance`
- "Building" + "Column" + location is Natchez → `antebellum`, `architecture`, `natchez`

Build a comprehensive mapping. Check `docs/MEDIA_METADATA_STANDARD.md` for the full taxonomy.

### Task 3: Build Search API

Create `/apps/web/app/api/photos/search/route.ts`:

```typescript
// GET /api/photos/search?q=horn+players&brand=big-muddy-touring&city=natchez&limit=20
// 
// Searches:
// - subjectTags array contains any matching tag
// - visionLabels descriptions (full text search)
// - caption text (full text search)
//
// Returns: array of {id, gcsUrl, thumbnailUrl, heroUrl, caption, subjectTags, qualityScore}
// Sorted by qualityScore descending
```

### Task 4: Wire Vision API into Ingestion Pipeline

Update `scripts/media/photos-to-gcs.sh` (or create a new TypeScript version) so that every new photo:
1. Gets converted to 3 sizes (hero 2400px, grid 800px, thumb 400px)
2. Gets run through Google Vision API (labels + objects)
3. Gets subject tags mapped from Vision labels
4. Gets a Gemini-generated caption
5. Gets written to the PhotoIndex table

Use the GOOGLE_APPLICATION_CREDENTIALS_JSON env var for Vision API auth.

### Task 5: Verify

After all tasks are complete:
- Query: `SELECT COUNT(*) FROM "PhotoIndex"` → should be 16,936+
- Query: `SELECT COUNT(*) FROM "PhotoIndex" WHERE 'horn-player' = ANY("subjectTags")` → should find the horn player photos
- Hit: `GET /api/photos/search?q=horn+players` → should return results with GCS URLs
- Hit: `GET /api/photos/search?q=natchez+sunset` → should return results
- Hit: `GET /api/photos/search?q=console+studio` → should return studio photos

## Important Notes

- The manifest photos are 256px smart previews. Mark them all `printReady: false`. They're searchable for finding the RIGHT photo, but the full-res versions will need to be relinked later from the drives.
- Don't overwrite the existing Photo model — it's used for event photo sharing (QR code at shows). PhotoIndex is a separate system.
- The pgvector extension is already enabled in the Prisma schema. If you have time, add an `embedding` column and generate text embeddings from the caption + labels for semantic search. But this is a stretch goal — basic text search comes first.
- Cost: Vision API on new photos is ~$0.004/image. The manifest processing is already paid for.
- GCS auth may need reauthentication: `gcloud auth login` on the Mac mini.
