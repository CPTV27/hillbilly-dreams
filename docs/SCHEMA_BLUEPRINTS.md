# Schema Blueprints — Content Pipeline Tables

*Designed April 16, 2026. For n8n event bus + Content UUID pattern.*
*These models get added to `packages/database/prisma/schema.prisma` when ready.*

---

## 1. PipelineContent — The Content UUID Table

This is the central state machine. Every piece of content that enters the system — a recording, a show, a photo shoot, an article draft — gets a UUID and a status blob. n8n updates the status at each pipeline step. The admin dashboard reads it.

```prisma
model PipelineContent {
  id            String   @id @default(cuid())
  uuid          String   @unique // "bm-2026-04-15-blues-hour" — human-readable
  type          String   // "show" | "recording" | "track" | "article" | "photo" | "social"
  title         String
  sourceFile    String?  // Original file path on Mac mini or T7
  cloudUrl      String?  // GCS URL after offload (gs://bmt-media-bigmuddy/...)
  driveUrl      String?  // Google Drive URL if applicable

  // Pipeline status — updated by n8n at each step
  status        Json     @default("{}")
  // Shape: {
  //   ingested: true,
  //   normalized: false,
  //   transcribed: false,
  //   articleDrafted: false,
  //   socialScheduled: false,
  //   audiogramRendered: false,
  //   offloadedToCloud: false,
  //   published: false
  // }

  // Pipeline metadata
  pipelineStage String   @default("ingested") // ingested | processing | review | ready | live | archived
  errorMessage  String?  @db.Text
  retryCount    Int      @default(0)

  // Content metadata (varies by type)
  metadata      Json?    // duration, speakers, transcript_path, format, dimensions, etc.
  transcript    String?  @db.Text // Full transcript text (for shows/recordings)
  tags          String[] // ["blues", "live-session", "arrie-aslin"]

  // Relations to existing models
  showEventId   Int?     // Links to ShowEvent if this came from a show
  showEvent     ShowEvent? @relation(fields: [showEventId], references: [id])
  trackId       Int?     // Links to Track if this is a music recording
  track         Track?   @relation(fields: [trackId], references: [id])
  articleId     Int?     // Links to Article if an article was generated
  article       Article? @relation(fields: [articleId], references: [id])

  // Timestamps
  recordedAt    DateTime? // When the content was originally created
  processedAt   DateTime? // When pipeline processing completed
  publishedAt   DateTime? // When it went live
  offloadedAt   DateTime? // When raw file was pushed to GCS/Drive
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([pipelineStage])
  @@index([type])
  @@index([createdAt])
  @@index([showEventId])
}
```

### How n8n Uses This Table

1. **File lands in `/media/ingest/`** → n8n creates a PipelineContent record with `pipelineStage: "ingested"`
2. **ffprobe fingerprints the file** → n8n updates `metadata` with format, duration, codec
3. **Transcription completes** → n8n sets `status.transcribed = true`, writes `transcript`
4. **AI generates article draft** → n8n sets `status.articleDrafted = true`, creates Article record, links `articleId`
5. **Audiogram rendered** → n8n sets `status.audiogramRendered = true`
6. **Social scheduled via Postiz** → n8n sets `status.socialScheduled = true`
7. **Offloaded to GCS** → n8n sets `cloudUrl`, `offloadedAt`, `status.offloadedToCloud = true`, deletes local raw file
8. **Published** → n8n sets `pipelineStage: "live"`, `publishedAt`

### Admin Dashboard View

The `/admin/pipeline` page shows a kanban:

| Ingested | Processing | Needs Review | Ready | Live |
|----------|-----------|-------------|-------|------|
| [card]   | [card]    | [card]      | [card]| [card]|

Each card shows: title, type icon, timestamp, status checkmarks, and a "Publish" button.

---

## 2. RadioPlayLog — AzuraCast History

n8n polls AzuraCast's `/api/station/{id}/history` every 15 minutes and writes here. This feeds social posts, SoundExchange tracking, and analytics.

```prisma
model RadioPlayLog {
  id            Int      @id @default(autoincrement())
  stationId     String   @default("bigmuddyradio") // For multi-station future
  trackTitle    String
  artistName    String
  albumTitle    String?
  isrc          String?  // For SoundExchange reporting
  duration      Int?     // seconds
  listenersAtPlay Int?   // Concurrent listeners when track played
  playedAt      DateTime
  source        String   @default("azuracast") // azuracast | manual | live-dj

  // Link to our Track model if it's a Big Muddy Records track
  trackId       Int?
  track         Track?   @relation(fields: [trackId], references: [id])

  // SoundExchange reporting
  isOwnedContent Boolean @default(false) // true = BMR catalog, zero royalty
  reportedToSX   Boolean @default(false) // Has this been included in SX report?
  reportedAt     DateTime?

  createdAt     DateTime @default(now())

  @@index([playedAt])
  @@index([stationId, playedAt])
  @@index([artistName])
  @@index([isOwnedContent])
  @@index([reportedToSX])
}
```

### What This Enables

- **Auto social posts**: n8n queries last hour's plays → generates "On Big Muddy Radio this hour: [track list]" → Postiz
- **SoundExchange reporting**: Monthly query of non-owned tracks + listener counts → export CSV
- **Analytics**: Grafana dashboard showing plays by artist, peak listening hours, owned vs. licensed ratio
- **Royalty mitigation tracking**: What % of airtime is BMR-owned content? Target: 60%+ during peak

---

## 3. SponsorPackage — Bundle Revenue Tracking

For the $99-$599 bundle packages that combine directory + radio + magazine.

```prisma
model SponsorPackage {
  id                  Int      @id @default(autoincrement())
  businessId          Int
  business            DirectoryBusiness @relation(fields: [businessId], references: [id])
  
  tier                String   // "starter" | "growth" | "partner" | "anchor"
  monthlyPrice        Int      // cents: 9900 | 19900 | 39900 | 59900
  
  // Entitlements (what they get per month)
  radioMentionsPerWeek  Int    @default(0)  // 5 | 10 | daily | daily
  magazineSlots         String @default("none") // "sidebar" | "in-article" | "homepage" | "sponsored-article"
  newsletterFeatures    Int    @default(0)  // 0 | 1 | 2 | 4 per month
  socialPostsPerWeek    Int    @default(0)  // 0 | 0 | 2 | 5
  showSponsorships      Int    @default(0)  // 0 | 0 | 0 | 1 per quarter
  quarterlyProfile      Boolean @default(false) // anchor tier only
  
  // Tracking
  radioMentionsUsed     Int    @default(0)  // This billing period
  magazineSlotsUsed     Int    @default(0)
  newsletterFeaturesUsed Int   @default(0)
  
  // Stripe
  stripeSubscriptionId  String? @unique
  stripePriceId         String?
  
  // Lifecycle
  status              String   @default("active") // active | paused | cancelled | expired
  startsAt            DateTime @default(now())
  renewsAt            DateTime?
  cancelledAt         DateTime?
  
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@index([businessId])
  @@index([tier])
  @@index([status])
  @@index([renewsAt])
}
```

### Tier Mapping

| Tier | Price | Radio | Magazine | Newsletter | Social | Shows |
|------|-------|-------|----------|-----------|--------|-------|
| Starter | $99/mo | 5/wk | sidebar | 0 | 0 | 0 |
| Growth | $199/mo | 10/wk | in-article | 1/mo | 0 | 0 |
| Partner | $399/mo | daily | homepage | 2/mo | 2/wk | 0 |
| Anchor | $599/mo | daily | sponsored article | 4/mo | 5/wk | 1/qtr + profile |

---

## 4. MembershipSubscription — Big Muddy Club

```prisma
model MembershipSubscription {
  id                  Int      @id @default(autoincrement())
  userId              Int?
  user                User?    @relation(fields: [userId], references: [id])
  email               String
  name                String?
  
  tier                String   // "listener" | "member" | "patron" | "partner"
  monthlyPrice        Int      @default(0) // cents: 0 | 1000 | 2500 | 10000
  
  // Benefits tracking
  innDiscountPercent  Int      @default(0)  // 0 | 10 | 15 | 0
  freeNightsPerQuarter Int     @default(0)  // 0 | 0 | 0 | 1
  merchIncluded       Boolean  @default(false) // patron + partner
  vipEvents           Boolean  @default(false) // patron + partner
  reservedSeating     Boolean  @default(false) // partner only
  
  // Stripe
  stripeSubscriptionId String? @unique
  stripeCustomerId     String?
  
  // Lifecycle
  status              String   @default("active")
  joinedAt            DateTime @default(now())
  cancelledAt         DateTime?
  
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@index([tier])
  @@index([status])
  @@index([email])
}
```

### Tier Mapping

| Tier | Price | Ad-Free | Magazine | Inn Discount | Merch | VIP | Free Night | Reserved |
|------|-------|---------|----------|-------------|-------|-----|-----------|----------|
| Listener | Free | No | Limited | 0% | No | No | No | No |
| Member | $10/mo | Yes | Full | 10% | No | No | No | No |
| Patron | $25/mo | Yes | Full | 15% | Quarterly | Yes | No | No |
| Partner | $100/mo | Yes | Full | 0% | Quarterly | Yes | 1/quarter | Yes |

---

## 5. ArtistPackage — Studio C Revenue

```prisma
model ArtistPackage {
  id                  Int      @id @default(autoincrement())
  artistId            Int
  artist              Artist   @relation(fields: [artistId], references: [id])
  
  tier                String   // "radio" | "media" | "production"
  monthlyPrice        Int      // cents: 9900 | 25000 | 50000
  
  // Entitlements
  radioRotation       Boolean  @default(false) // radio + media + production
  socialPromotion     Boolean  @default(false) // radio + media + production
  magazineFeatures    Int      @default(0)     // 0 | 1/quarter | 1/month
  photographySessions Int      @default(0)     // 0 | 1/quarter | 1/month
  recordingSessions   Int      @default(0)     // 0 | 0 | included
  videoProduction     Boolean  @default(false) // production only
  
  // Stripe
  stripeSubscriptionId String? @unique
  
  // Lifecycle
  status              String   @default("active")
  startsAt            DateTime @default(now())
  
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@index([artistId])
  @@index([tier])
  @@index([status])
}
```

### Tier Mapping (Sold by Studio C)

| Tier | Price | Radio | Social | Magazine | Photo | Recording | Video |
|------|-------|-------|--------|----------|-------|-----------|-------|
| Radio | $99/mo | Rotation | Yes | 0 | 0 | 0 | No |
| Media | $250/mo | Rotation | Yes | 1/qtr | 1/qtr | 0 | No |
| Production | $500/mo | Rotation | Yes | 1/mo | 1/mo | Included | Yes |

---

## Relations to Add to Existing Models

These fields need to be added to existing models in schema.prisma:

```prisma
// Add to ShowEvent model:
pipelineContent PipelineContent[]

// Add to Track model:
pipelineContent PipelineContent[]
radioPlays      RadioPlayLog[]

// Add to Article model:
pipelineContent PipelineContent[]

// Add to DirectoryBusiness model:
sponsorPackages SponsorPackage[]

// Add to Artist model:
artistPackages  ArtistPackage[]

// Add to User model:
membership      MembershipSubscription[]
```

---

## Offload Strategy (GCS + Google Drive)

When `pipelineStage` reaches "live":
1. n8n uploads raw file to `gs://bmt-media-bigmuddy/pipeline/{type}/{uuid}/`
2. Updates `cloudUrl` in PipelineContent
3. Optionally syncs to Google Drive for Tracy/Amy access
4. Deletes local raw file from Mac mini
5. Sets `offloadedAt` timestamp
6. Processed derivatives (audiograms, thumbnails) stay in GCS permanently

**Bucket structure:**
```
gs://bmt-media-bigmuddy/
  pipeline/
    shows/       # Raw show recordings
    recordings/  # Room recordings, field audio
    tracks/      # Music files (master)
    photos/      # Original resolution photos
    articles/    # Generated article assets
  processed/
    audiograms/  # Remotion output
    thumbnails/  # Social card images
    waveforms/   # Audio waveform data
```

---

## Migration Plan

1. **Add models to schema.prisma** — the 5 new models above
2. **Add relation fields** to existing models (ShowEvent, Track, Article, DirectoryBusiness, Artist, User)
3. **Run `prisma migrate dev`** — generates migration
4. **Test on staging** (Neon branch)
5. **Deploy** — `prisma migrate deploy` on production

**DO NOT** modify existing model structures. Only ADD new models and new fields on existing models.

---

*These blueprints are ready for implementation. Chase approved "tables first, then wire n8n."*
