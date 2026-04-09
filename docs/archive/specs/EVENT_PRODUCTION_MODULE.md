# Event Production Module — MBT Platform Spec

*April 5, 2026. Chase Pierson. Derived from the Director's Challenge / Future of Filmmaking prototypes.*

---

## The Idea

Any MBT tenant can produce a **live production event** — film festival, music showcase, director's challenge, live broadcast, screening series, or any format where content is created, captured, and distributed in real time.

The module handles: event creation, participant applications, schedule management, equipment assignment, live broadcast, audience engagement (WiFi portal + email capture), content pipeline (event → clips → social → archive), and press/marketing automation.

**The Director's Challenge at Woodstock Film Festival is the first implementation.** But the module is generic enough for:
- A film festival in any town
- A live music showcase at any venue
- A 48-hour filmmaking challenge
- A podcast recording marathon
- A live art installation with streaming
- A community screening series (like DCTV's Firehouse Cinema)

---

## What Already Exists (Reuse)

| Need | Existing Module | Status |
|---|---|---|
| Event scheduling | **Touring/Events** (Event, ShowcaseSlot models) | Ready — extend, don't rebuild |
| Ticketing/registration | **Commerce** (Stripe checkout) | Ready |
| Live streaming | **Broadcasting** (Icecast, OBS, Plex) | Ready — add multi-platform |
| Audience WiFi engagement | **WiFi Captive Portal** (`/welcome/wifi`) | Ready — parameterize per event |
| Email capture/notifications | **Newsletter** (`/api/newsletter/subscribe`) | Ready |
| Content distribution | **AI Content Pipeline** (social posts, clips) | Ready |
| Photo/video archive | **Gallery** (Photo, PhotoSession models) | Ready |
| Analytics | **Analytics** (Report model) | Ready |
| Venue management | **Directory** (DirectoryBusiness) | Ready — extend for zones |

---

## What Needs to Be Built (New)

### 1. Event Production Model (Prisma)

```prisma
model ProductionEvent {
  id            String   @id @default(cuid())
  tenantId      String
  name          String   // "The Director's Challenge"
  slug          String   @unique
  type          EventType // FILM_FESTIVAL, MUSIC_SHOWCASE, SCREENING_SERIES, BROADCAST_SPRINT, CUSTOM
  description   String?
  heroImage     String?

  // Timing
  startDate     DateTime
  endDate       DateTime
  doorsOpen     DateTime?

  // Location
  venueId       String?
  venue         DirectoryBusiness? @relation(fields: [venueId])
  zones         EventZone[]

  // Config
  maxParticipants  Int?
  applicationOpen  Boolean @default(true)
  isPublic         Boolean @default(true)
  broadcastEnabled Boolean @default(false)
  wifiPortalEnabled Boolean @default(false)

  // Content
  pressKit      Json?    // Generated press sheet
  schedule      EventBlock[]
  applications  EventApplication[]
  equipment     EventEquipment[]
  broadcasts    EventBroadcast[]

  // Relations
  tenant        Tenant   @relation(fields: [tenantId])
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum EventType {
  FILM_FESTIVAL
  MUSIC_SHOWCASE
  SCREENING_SERIES
  BROADCAST_SPRINT
  WORKSHOP
  CUSTOM
}
```

### 2. Event Zones (Shooting Locations / Stages)

```prisma
model EventZone {
  id          String   @id @default(cuid())
  eventId     String
  name        String   // "Utopia Interior — Main Room"
  description String?
  type        ZoneType // STAGE, STUDIO, OUTDOOR, SCREENING, BACKSTAGE
  capacity    Int?
  isWireless  Boolean  @default(true)
  isPreLit    Boolean  @default(false)
  equipment   String[] // Pre-assigned gear

  event       ProductionEvent @relation(fields: [eventId])
}

enum ZoneType {
  STAGE
  STUDIO
  OUTDOOR
  SCREENING
  BACKSTAGE
  CAMPUS
}
```

### 3. Event Blocks (Schedule Slots)

```prisma
model EventBlock {
  id          String   @id @default(cuid())
  eventId     String
  title       String   // "Director's Challenge #1"
  startTime   DateTime
  endTime     DateTime
  type        BlockType // SPRINT, SCREENING, PERFORMANCE, WORKSHOP, BREAK, SETUP

  // For director's challenge style
  directorId  String?  // Assigned participant
  director    EventApplication? @relation(fields: [directorId])

  // Content output
  premiereTime DateTime? // When the finished piece airs
  maxRuntime   Int?      // Seconds (180 = 3 minutes)

  // Broadcast
  isLive       Boolean  @default(false)
  streamUrl    String?

  event        ProductionEvent @relation(fields: [eventId])
}

enum BlockType {
  SPRINT
  SCREENING
  PERFORMANCE
  WORKSHOP
  BREAK
  SETUP
  PREMIERE
}
```

### 4. Participant Applications

```prisma
model EventApplication {
  id          String   @id @default(cuid())
  eventId     String
  userId      String?

  // Applicant
  name        String
  email       String
  role        ParticipantRole // DIRECTOR, PERFORMER, CREW, TALENT, JUDGE, PRESS
  pitch       String?  // "My one-hour sprint concept..."
  portfolio   String?  // Link to previous work

  // Status
  status      ApplicationStatus @default(PENDING)
  assignedBlock String? // Which EventBlock they're assigned to

  // For directors
  logline     String?
  shotList    Json?
  locationPrefs String[]
  actorCount  Int?

  event       ProductionEvent @relation(fields: [eventId])
  blocks      EventBlock[]
  createdAt   DateTime @default(now())
}

enum ParticipantRole {
  DIRECTOR
  PERFORMER
  CREW
  TALENT
  JUDGE
  PRESS
  AUDIENCE
}

enum ApplicationStatus {
  PENDING
  ACCEPTED
  REJECTED
  WAITLISTED
}
```

### 5. Equipment Assignment

```prisma
model EventEquipment {
  id          String   @id @default(cuid())
  eventId     String
  category    String   // "Cameras", "Audio", "Lighting", "Monitoring", "Post"
  name        String   // "DJI Ronin 4D"
  quantity    Int      @default(1)
  notes       String?  // "Wireless video. Crew ops."
  assignedTo  String?  // Block or zone ID

  event       ProductionEvent @relation(fields: [eventId])
}
```

### 6. Broadcast Configuration

```prisma
model EventBroadcast {
  id          String   @id @default(cuid())
  eventId     String
  platform    String   // "tiktok", "youtube", "instagram", "icecast"
  streamKey   String?  // Encrypted
  streamUrl   String?
  isActive    Boolean  @default(false)
  viewerCount Int      @default(0)

  event       ProductionEvent @relation(fields: [eventId])
}
```

---

## API Routes

```
/api/events/production/              — CRUD for ProductionEvent
/api/events/production/[id]/schedule — Manage EventBlocks
/api/events/production/[id]/zones    — Manage EventZones
/api/events/production/[id]/apply    — Submit application (public)
/api/events/production/[id]/applications — Review applications (admin)
/api/events/production/[id]/equipment — Equipment inventory
/api/events/production/[id]/broadcast — Stream configuration
/api/events/production/[id]/press-kit — Auto-generated press sheet
/api/events/production/[id]/wifi     — WiFi portal config for this event
```

---

## Pages

### Public (per-event)
```
/events/[slug]                    — Event landing page (converts from CodePen prototypes)
/events/[slug]/schedule           — Full schedule with live status
/events/[slug]/apply              — Application form
/events/[slug]/live               — Livestream embed + chat
/events/[slug]/archive            — Post-event content archive
```

### Admin
```
/admin/events/production/new      — Create new production event
/admin/events/production/[id]     — Manage event (schedule, applications, equipment, broadcast)
/admin/events/production/[id]/live — Live control room (switch streams, update status)
```

---

## The Content Pipeline

Every production event automatically generates content through the existing AI Content Pipeline:

```
Event Created
  → Landing page auto-generated from event config
  → Press kit generated (AI + event data)
  → Email campaign scheduled (signup confirmation, reminders, day-of)

Event Day
  → WiFi captive portal captures attendee emails
  → Live broadcast to configured platforms
  → AI generates social clips from stream (highlight detection)
  → Radio mentions on tenant's radio channel

Post-Event
  → AI generates social posts from event content
  → Photos/video archived in Gallery
  → Magazine article auto-drafted from event data + photos
  → Monthly analytics report includes event metrics
  → Content feeds back into Directory (venue gets "Hosted: Director's Challenge" badge)
```

---

## Template Events (Pre-Built Configurations)

When creating a new event, users pick a template:

| Template | Based On | Pre-Configured |
|---|---|---|
| **Director's Challenge** | Woodstock Film Fest prototype | 60-min sprints, 3-min max runtime, campus zones, multi-cam rig, premiere schedule |
| **Music Showcase** | Big Muddy Touring shows | Performance blocks, sound check slots, recording session, live broadcast |
| **Film Festival** | DCTV Firehouse Cinema | Screening blocks, Q&A slots, jury deliberation, awards ceremony |
| **Screening Series** | Weekly/monthly format | Recurring screenings, curator notes, audience voting |
| **Broadcast Sprint** | Podcast/radio marathon | Recording blocks, live stream, clip generation, playlist creation |
| **Custom** | Blank canvas | Configure everything from scratch |

---

## How This Maps to Existing Clients

| Client | Event Type | Example |
|---|---|---|
| **Big Muddy** (Natchez) | Music Showcase | Weekly shows at the Inn |
| **Bearsville Creative** (Woodstock) | Director's Challenge | Woodstock Film Fest counter-programming |
| **Bearsville Creative** | Screening Series | Utopia documentary screenings |
| **DCTV** (NYC) | Film Festival | Firehouse Cinema programming |
| **DCTV** | Workshop | PRO-TV youth filmmaking events |
| **Feed Farm** (Katie Halper) | Broadcast Sprint | Multi-creator recording day |
| **Any DSD business** | Custom | Local restaurant's live cooking event |

---

## Build Priority

### Phase 1 (2 weeks): Core Models + Admin
- Prisma models: ProductionEvent, EventBlock, EventZone, EventApplication
- Admin CRUD at `/admin/events/production/`
- Public event page template (converts Director's Challenge CodePen to Next.js)

### Phase 2 (2 weeks): Applications + Schedule
- Public application form
- Application review admin
- Schedule display with live status indicators
- Email notifications (accepted, reminder, day-of)

### Phase 3 (2 weeks): Broadcast + WiFi
- EventBroadcast model + multi-platform stream config
- WiFi captive portal parameterized per event
- Live control room admin page
- Livestream embed on public event page

### Phase 4 (2 weeks): Content Pipeline
- Post-event content generation (social clips, magazine draft, archive)
- Press kit auto-generation
- Equipment assignment and tracking
- Analytics integration

### Phase 5 (ongoing): Templates
- Pre-built event templates (Director's Challenge, Music Showcase, etc.)
- Template marketplace for other tenants
- Event duplication ("clone this event for next month")

---

## The Line

"Every town has a story. Every venue has a stage. Every creator has a camera. We give them the infrastructure to produce, broadcast, and archive their event — from a 60-minute filmmaking sprint to a weekend film festival — with the same tools that run a touring circuit and a media company."

---

*This module turns the Director's Challenge from a one-off event into a repeatable, scalable, tenant-agnostic production system. Any MBT client can host any production event. The platform handles the rest.*
