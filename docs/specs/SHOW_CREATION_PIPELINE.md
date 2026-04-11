# Show Creation Pipeline — AI-Assisted Radio Production
## April 9, 2026

*A guided wizard that walks you through creating a new radio show. AI generates drafts for every asset. You approve, tweak, or re-roll. Nothing goes live without your sign-off.*

---

## The Problem

Creating a radio show currently requires: a graphic designer (poster art), a voice talent (bumpers/promos), a copywriter (descriptions/taglines), a programmer (scheduling), and a social media person (announcements). That's 5 roles for one show. We did it manually for the first 18 shows. The pipeline makes it repeatable for any new show with one person and AI.

## The Sequence

### Step 1: Show Identity
**User inputs:**
- Show name
- Time slot (day/time, recurring pattern)
- Genre/vibe (blues, soul, country, talk, field recordings, etc.)
- Host character (pick from existing DJs or create new one)
- One-sentence description ("Raw juke joint recordings from the Delta")

**AI generates (Gemini Flash):**
- 3 tagline options
- Show description (long form for the schedule page)
- Tone/mood keywords for generating all downstream assets

**User action:** Pick tagline, edit description if needed, approve.

---

### Step 2: Visual Package
**AI generates (Vertex AI Imagen 3):**
- **Show poster** (square, 1:1) — 3 variations to choose from
- **Wide banner** (16:9) — for the website hero/schedule
- **Social card** (4:5 for Instagram, 16:9 for Twitter/FB)
- Color palette extracted from the chosen poster

**User action:** Pick favorite, request tweaks ("more blue," "darker," "add vinyl texture"), or re-roll.

**QC rule:** AI generates art, Canva handles typography. The poster images have NO text baked in. Text overlays (show name, time, host) are rendered by the web app or added in Canva post-production.

---

### Step 3: Audio Package
**System prompts the user to record:**
- "Record a 15-second intro for this show" → mic button, records to WAV
- "Record a 30-second promo describing the show" → mic button
- "Record a 5-second station ID with the show name" → mic button

Each prompt explains what to say and gives an example script the AI drafted.

**AI generates (Cloud TTS Journey / ElevenLabs):**
- **Bumper variants** — "You're listening to [show name] on Big Muddy Radio" (3 voice options matched to the DJ character)
- **Promo spot** — 30-second generated promo using the show description + music bed pulled from the library
- **Transition sweepers** — 3-5 short audio stingers for between segments

**User action:** Listen to each generated asset, approve or re-generate. Can mix their own recorded clips with AI-generated ones. Final audio package = user recordings + AI assets combined.

---

### Step 4: Video Package (Optional)
**System prompts the user to record:**
- "Record a 30-second video intro for this show" → camera, portrait or landscape
- "Record a 60-second 'about this show' clip" → for social/website

**AI generates (Veo 3 / ffmpeg compositing):**
- **Animated show card** — poster image with subtle motion (parallax, light flicker, waveform overlay) for social/YouTube
- **Video bumper** — 5-second animated logo reveal with the show's audio bumper
- **Social teaser** — 15-second clip combining the poster, audio promo, and waveform visualization

**User action:** Review, approve or skip. Video is optional — audio shows don't need video packages.

---

### Step 5: Schedule & Playlist
**User inputs:**
- Recurring schedule (e.g., "Mon/Wed/Fri 1:00 PM - 2:00 PM")
- Playlist rules:
  - Genre mix (e.g., "70% blues, 20% soul, 10% gospel")
  - Artist separation (don't play same artist within 30 min)
  - Tempo arc (start slow, build, cool down)
  - Required tracks (always include these)
  - Excluded tracks (never play these)
- Show type: automated / live-assist / fully live

**AI generates (Gemini Flash + music library query):**
- Initial playlist from the music library matching the genre/vibe/rules
- Bumper/sweeper insertion points (every 3-4 songs)
- OpenBroadcaster playlist entry
- OpenBroadcaster schedule entry (recurring)

**System creates automatically:**
- Playlist in OpenBroadcaster (via OB API or direct DB insert)
- Schedule entry in OB (recurring, with correct start/end times)

---

### Step 6: Web & Social
**AI generates:**
- Show page content for bigmuddytouring.com/radio (pulled from Sanity or rendered from data)
- Social announcement post draft for each platform (Postiz):
  - Instagram (poster image + description)
  - Facebook (banner + longer description)
  - Twitter/X (poster + tagline)

**System creates:**
- Show entry in the database (Show model with all metadata)
- Show page on the website
- Poster uploaded to GCS (`radio/show-posters/[slug].webp`)
- Audio assets uploaded to OB media library
- Social posts queued in Postiz

---

### Step 7: Review & Go Live
**Dashboard shows everything in one view:**
- ✅ Show identity (name, tagline, description, host)
- ✅ Poster (chosen variant, all sizes)
- ✅ Audio package (bumpers, promos, sweepers — play buttons for each)
- ✅ Video package (if recorded — preview player)
- ✅ Playlist preview (first 20 tracks with genre breakdown)
- ✅ Schedule confirmation (day/time, recurring pattern)
- ✅ Social announcement drafts (preview for each platform)

**User hits "Go Live"** → everything deploys simultaneously:
- OB playlist + schedule activated
- Show page published
- Poster + audio + video assets deployed
- Social announcements queued for next posting window

---

## The AI Stack

| Step | AI Service | What It Does | Fallback |
|------|-----------|-------------|----------|
| Identity | Gemini 2.5 Flash | Taglines, descriptions, mood keywords | Claude Haiku |
| Visuals | Vertex AI Imagen 3 | Poster art, banners, social cards | — |
| Audio (TTS) | Cloud TTS Journey | DJ voice bumpers, promos | ElevenLabs |
| Audio (music bed) | Library query | Pulls instrumental beds matching genre | — |
| Video | Veo 3 | Animated show cards, video bumpers | ffmpeg compositing |
| Playlist | Gemini Flash + OB API | Curates playlist from library | Manual selection |
| Social | Gemini Flash | Drafts announcement posts | Manual writing |

API keys: all in Vercel env vars. Model routing: `lib/ai-models.ts`.

---

## Data Model

```prisma
model RadioShow {
  id              String   @id @default(cuid())
  name            String
  slug            String   @unique
  tagline         String?
  description     String?
  genre           String[]
  hostCharacter   String?  // DJ character name
  schedule        Json     // { days: ['Mon','Wed','Fri'], startTime: '13:00', endTime: '14:00' }
  showType        ShowType @default(AUTOMATED)

  // Assets
  posterUrl       String?  // GCS path
  bannerUrl       String?
  socialCardUrl   String?
  audioBumpers    String[] // GCS paths to audio files
  audioPromos     String[]
  audioSweepers   String[]
  videoIntroUrl   String?
  videoTeaserUrl  String?

  // OpenBroadcaster integration
  obPlaylistId    Int?     // OB playlist ID
  obScheduleId    Int?     // OB schedule entry ID

  // Playlist rules
  playlistRules   Json?    // { genreMix, artistSeparation, tempoArc, required, excluded }

  // Status
  status          ShowStatus @default(DRAFT)
  publishedAt     DateTime?
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
}

enum ShowType {
  AUTOMATED
  LIVE_ASSIST
  LIVE
}

enum ShowStatus {
  DRAFT
  REVIEW
  SCHEDULED
  LIVE
  ARCHIVED
}
```

---

## Where This Lives

| Item | Location |
|------|----------|
| Admin wizard | `/admin/radio/shows/new` — multi-step form |
| Show management | `/admin/radio/shows` — list, edit, archive |
| API: CRUD | `/api/radio/shows` |
| API: Generate assets | `/api/radio/generate-assets` |
| API: Generate playlist | `/api/radio/generate-playlist` |
| Storage: Posters | GCS `radio/show-posters/[slug].webp` |
| Storage: Audio | GCS `radio/audio/[slug]/` |
| Storage: Video | GCS `radio/video/[slug]/` |
| OB integration | Direct API to localhost:8080 or DB insert via Docker exec |

---

## What Already Exists

| Asset | Count | Location |
|-------|-------|----------|
| Show definitions | 18 | OpenBroadcaster DB + admin page |
| Show posters | 24 | `/public/images/radio/show-posters/` |
| Audio bumpers | 5 | `/Volumes/T7/Music/BigMuddy-Radio-Promos/bumpers/` |
| Show promos | 18 | `/Volumes/T7/Music/BigMuddy-Radio-Promos/show-promos/` |
| Station IDs | 5 | `/Volumes/T7/Music/BigMuddy-Radio-Promos/station-ids/` |
| Sweepers | 5 | `/Volumes/T7/Music/BigMuddy-Radio-Promos/sweepers/` |
| Voice casting | 12 | `/Volumes/T7/Music/BigMuddy-Radio-Promos/voice-casting/` |
| DJ characters | 7 | Defined in BROADCASTING_CAPABILITIES.md |
| Music tracks | 168 | `/Volumes/T7/Music/` (mixed across folders) |

The pipeline formalizes what was done manually for the first 18 shows and makes it repeatable, AI-assisted, and auditable for any new show.

---

## Why This Matters for MBT

This pipeline IS the product. When MBT licenses to another town, they get:
- The same guided wizard
- The same AI generation stack
- Their own show library built through the same process

A town with zero radio experience can produce a professional 18-show schedule in a weekend using this pipeline. That's the value prop of the civic-commerce OS.

---

*This spec goes to the Technical Architect and the Frontend Engineer. The architect designs the API routes and data model. The frontend engineer builds the wizard UI. Chase approves all generated assets before they go live.*
