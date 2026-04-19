# Phase C Block 4 — Broadcast + Social Module Expansion

*Plan generated 2026-04-18 by background Plan agent. To execute after Block 1 (Commerce) ships.*

## 1. Podcast Platform Recommendation: **Buzzsprout**

- **Right tool for the job.** DistroKid is a music-distribution shop bolted on a podcast feature; Spotify-for-Podcasters locks you into one platform's analytics. Buzzsprout submits once to Apple/Spotify/YouTube Music/Amazon/iHeart/Pandora, returns canonical RSS+episode IDs we control, and exposes a clean REST API at `https://www.buzzsprout.com/api/{podcast_id}/...` that our backend can drive (publish, fetch episode IDs, attach chapters).
- **We already own the RSS.** Big Muddy Radio is a media operation, not a single-host show. We need *programmatic* episode publishing from CMS/clip pipeline — Buzzsprout's API enables that; Spotify-for-Podcasters does not.
- **Cheap, no contract.** $12/mo per show, episodes hosted forever. Trivial to add a second show (Arrie's residency, Amy's catalog show) without re-architecting.

The wrinkle: we still self-generate the RSS at `/api/podcast/rss/[show]` for our `radio.bigmuddy` listening pages and as a *backup* feed of record. Buzzsprout becomes the upload-and-distribute target; our Postgres is source of truth.

---

## 2. RSS Feed Generation — File Layout & Data Model

### Prisma additions (`packages/database/prisma/schema.prisma`)

```prisma
model PodcastShow {
  id           String   @id @default(cuid())
  slug         String   @unique          // "delta-dawn", "blues-room-live"
  title        String
  description  String   @db.Text
  brand        String                    // "radio" | "magazine" | "inn" — drives voice routing
  authorName   String
  authorEmail  String
  artworkUrl   String                    // 3000x3000 required by Apple
  category     String                    // Apple iTunes category
  language     String   @default("en-us")
  explicit     Boolean  @default(false)
  buzzsproutId String?                   // null until first publish
  episodes     PodcastEpisode[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model PodcastEpisode {
  id              String   @id @default(cuid())
  showId          String
  show            PodcastShow @relation(fields: [showId], references: [id])
  episodeNumber   Int
  seasonNumber    Int?
  title           String
  description     String   @db.Text
  audioUrl        String                 // GCS canonical URL
  audioDurationSec Int
  audioSizeBytes  Int
  audioMimeType   String   @default("audio/mpeg")
  publishedAt     DateTime?
  buzzsproutEpisodeId String?
  sourceClipIds   String[]               // optional: clips this episode was assembled from
  transcript      String?  @db.Text      // for show notes + content reuse
  createdAt       DateTime @default(now())
  @@unique([showId, episodeNumber, seasonNumber])
}
```

### Files to create
- `apps/web/app/api/podcast/rss/[show]/route.ts` — GET-only, `force-dynamic`, returns `application/rss+xml`. Uses the `feed` npm package with iTunes namespace extensions.
- `apps/web/lib/podcast/rss-builder.ts` — pure function `buildRssXml(show, episodes): string`.
- `apps/web/lib/podcast/buzzsprout-client.ts` — wrapper around Buzzsprout REST.
- `apps/web/app/api/cron/podcast-sync/route.ts` — Vercel cron (hourly): finds episodes `publishedAt <= now()` with null `buzzsproutEpisodeId`, uploads to Buzzsprout, persists ID. Idempotent.
- `apps/web/sanity/schemas/podcastEpisode.ts` — *editorial* face: title/description/show notes lives in Sanity; audio + duration + size lives in Postgres (heavy fields).

---

## 3. TikTok Live Orchestration — Data Model & Mac Mini Bridge

### Prisma additions

```prisma
model LiveBroadcast {
  id              String   @id @default(cuid())
  brand           String                  // "radio" | "magazine"
  title           String
  description     String   @db.Text
  scheduledStart  DateTime
  scheduledEnd    DateTime
  actualStart     DateTime?
  actualEnd       DateTime?
  platform        String   @default("tiktok_live")
  obsScene        String?                 // OBS scene name to auto-load
  cameras         Json                    // [{name, rtmpKey, position}]
  thumbnailUrl    String?
  status          String   @default("scheduled") // scheduled|live|ended|aborted
  hostUserIds     String[]                // Arrie, Amy, etc.
  associatedShowId String?                // links to PodcastShow when clips republish
  clips           BroadcastClip[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### Mac mini bridge approach

Mini at `192.168.4.37` is **not on the public internet**. Recommended: **polling agent on Mac mini** — a tiny Node service (`mbt-broadcast-agent`) runs on the mini and polls `https://bigmuddy.app/api/broadcast/agent/poll` every 30s with a shared HMAC secret. Server returns the next pending instruction (`start_scene`, `stop_scene`, `extract_clip`, `push_thumbnail`). Agent executes via `obs-websocket` + ffmpeg, posts back to `/api/broadcast/agent/ack`. No inbound firewall holes; survives ISP NAT.

Files:
- `apps/web/app/api/broadcast/schedule/route.ts` — POST creates `LiveBroadcast`
- `apps/web/app/api/broadcast/agent/poll/route.ts` — agent endpoint, HMAC-protected
- `apps/web/app/api/broadcast/agent/ack/route.ts` — agent posts events back
- `apps/web/lib/broadcast/agent-protocol.ts` — shared types
- Extend existing `apps/web/lib/obs-client.ts` into the actual `obs-websocket-js` wrapper

---

## 4. Clip Extraction Pipeline

```
TikTok Live (origin)
  → OBS records full broadcast to Mac mini local disk (FullHD, 30min rolling segments)
  → broadcast-agent ffmpeg slices on segment markers (chapter cues from OBS hotkey, OR auto every 60s)
  → agent uploads each clip to GCS bucket `mbt-broadcast-clips/{broadcastId}/{seq}.mp4`
  → agent POSTs clip metadata to /api/broadcast/clips with HMAC
  → server creates BroadcastClip rows (status=raw)
  → AI pass generates caption + selects best vertical crop region (uses AI Gateway)
  → /api/social/clips/republish picks Reels-eligible clips (≤90s, ≥720p) → Postiz → IG Reels
  → Same clip, if marked podcast-bound, gets stripped to audio (ffmpeg) and appended as a PodcastEpisode draft on the "Big Muddy Highlights" show
```

```prisma
model BroadcastClip {
  id             String   @id @default(cuid())
  broadcastId    String
  broadcast      LiveBroadcast @relation(fields: [broadcastId], references: [id])
  sequence       Int
  startSec       Int
  endSec         Int
  videoUrl       String                  // GCS
  thumbnailUrl   String?
  caption        String?
  voiceProfile   String?                 // "radio-music" | "magazine-hospitality"
  status         String   @default("raw") // raw|enriched|published|rejected
  publishedTo    Json     @default("[]") // [{platform, postId, url, at}]
  createdAt      DateTime @default(now())
}
```

---

## 5. Per-Brand Voice Routing through the Voice System

Routing rule:
- Each `LiveBroadcast.brand`, `PodcastShow.brand`, and `BroadcastClip.voiceProfile` is one of the brand keys (`radio`, `magazine`, `inn`).
- New `apps/web/lib/voice/profiles.ts` exports `resolveVoiceProfile(brand: string): VoiceProfile`. Radio profile = "scene-first, artist-first, BMI-clean, no hospitality framing." Magazine profile = "Inn-guest, travel/hospitality, warm, no industry-insider jargon."
- The clip caption-generation step and the podcast description-generation step both call `humanize(text, resolveVoiceProfile(brand))` from `apps/web/lib/voice/humanizer.ts` (new).
- The `social-publisher.ts` and `social-publish-run.ts` get a `brand` param threaded through; the dispatcher refuses to send if voice profile doesn't match the destination integration. Hard-fail prevents cross-brand contamination.

---

## 6. New Package Shape: `packages/modules/broadcast/` and `packages/modules/social/`

```
packages/modules/broadcast/
  package.json                 (private, workspace dep)
  src/
    index.ts                   (public API barrel)
    schedule.ts                (scheduleBroadcast, listUpcoming)
    podcast.ts                 (publishEpisode, syncRss)
    clips.ts                   (ingestClip, enrichClip, listForRepublish)
    agent-protocol.ts          (shared types with mac mini agent)
    types.ts
  README.md                    (license profile + scope per Tier 3)

packages/modules/social/
  package.json
  src/
    index.ts
    publishers/
      postiz.ts                (wraps existing apps/web/lib/postiz-client.ts)
      tiktok-native.ts         (placeholder for future direct API)
    voice-router.ts            (resolveVoiceProfile + guardrails)
    scheduler.ts
    types.ts
  README.md
```

Migration: `apps/web/lib/social-publisher.ts`, `apps/web/lib/postiz-client.ts`, `apps/web/lib/icecast-url.ts` get re-exported from the new packages with thin shims so existing routes keep compiling.

---

## 7. Critical Files Modified

- `packages/database/prisma/schema.prisma` — add 4 models above; new migration
- `apps/web/lib/social-publisher.ts` — gain `brand` param + voice profile gate
- `apps/web/app/api/social/schedule/route.ts` — accept brand, route through voice-router
- `apps/web/lib/obs-client.ts` — fully implement `obs-websocket-js` wrapper
- `apps/web/app/radio/podcast/page.tsx` — surface real PodcastShow rows
- `apps/web/sanity/schemas/index.ts` — register `podcastEpisode.ts`

---

## 8. Verification — Round-Trip Confirmation

1. **Schedule a test live.** POST `/api/broadcast/schedule` → row appears with status `scheduled`.
2. **Agent picks up.** Mac mini agent log shows `start_scene` instruction polled and ack'd. OBS scene flips. TikTok Live goes live, status flips to `live` server-side.
3. **End broadcast.** Agent uploads N clips to GCS; `BroadcastClip` rows appear with status `raw`.
4. **AI enrichment cron.** Captions populated; `voiceProfile = "radio-music"`; status = `enriched`.
5. **Republish to Reels.** `/api/social/clips/republish` runs; Postiz returns post ID; clip's `publishedTo` records `{platform: "instagram_reels", postId, url}`. Open the IG account in browser and confirm the Reel is live with radio-voice caption.
6. **Podcast highlight append.** Same clip's audio appears as a draft `PodcastEpisode` on the "Big Muddy Highlights" show. `/api/podcast/rss/big-muddy-highlights` validates against `https://podba.se/validate/`. Buzzsprout dashboard shows the episode published; appears in Spotify within 1-6 hours.
7. **Cross-brand guard.** Try POSTing the same clip to the `magazine` voice profile and a `radio` IG account — the publisher hard-fails with a 422.

A passing run = TikTok → IG Reels → Spotify in under 30 minutes from broadcast end.

---

## 9. Timeline (5-7 days, parallelizable)

**Day 1 (sequential prereqs):** Prisma migration for all 4 models + Buzzsprout account creation + Mac mini agent skeleton scaffolded.

**Days 2-5 (parallel tracks):**
- Track A — Podcast (1.5 days): RSS route + Buzzsprout client + cron sync.
- Track B — TikTok Live orchestration (2 days): `LiveBroadcast` API + agent poll/ack protocol + OBS scene control.
- Track C — Voice routing (1 day): voice profiles + humanizer + publisher guardrails.
- Track D — Module package extraction (1 day, alongside any track): scaffold `packages/modules/broadcast/` and `packages/modules/social/` with re-export shims.

**Days 6-7 (sequential finale):** Clip pipeline (Track E, 1.5 days) — depends on B for clip source, A for podcast destination, C for voice routing. Then end-to-end verification per section 8.

---

### Critical Files for Implementation
- /Users/chasethis/hillbilly-dreams/packages/database/prisma/schema.prisma
- /Users/chasethis/hillbilly-dreams/apps/web/lib/postiz-client.ts
- /Users/chasethis/hillbilly-dreams/apps/web/lib/social-publisher.ts
- /Users/chasethis/hillbilly-dreams/apps/web/lib/obs-client.ts
- /Users/chasethis/hillbilly-dreams/apps/web/app/api/social/schedule/route.ts
