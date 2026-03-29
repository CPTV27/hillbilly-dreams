# Measurably Better Life -- Implementation Plan

## Architecture Overview

The MBT Life consumer app lives within the existing Next.js 14 monorepo. The `measurablybetter.life` domain already routes to the `apps/web/app/measurably-better/` route group via middleware hostname matching (`config/domain-routes.ts` line 68: `{ pattern: 'measurablybetter', routeGroup: 'measurably-better' }`).

The existing route group currently contains the enterprise console and notebook. MBT Life will be a new sub-route: `apps/web/app/measurably-better/life/`. This keeps the enterprise product separate while sharing the same domain routing and layout ancestry.

---

## Sandbox Strategy

**Approach: Feature flag + dedicated sandbox route**

The sandbox uses a URL-based flag system rather than a separate deployment. This avoids infrastructure overhead while giving Chase a clean test environment before demo.

1. **Sandbox route**: `apps/web/app/measurably-better/life/sandbox/` mirrors the main life app but uses seed data
2. **Environment variable**: `NEXT_PUBLIC_MBT_SANDBOX=true` activates sandbox mode globally when set
3. **Sandbox middleware**: A small utility function `isSandbox(request)` checks either the route path or cookie `mbt-sandbox=1`
4. **Seed data script**: `packages/database/scripts/seed-mbt-life.ts` creates fake community profiles, skills, tasks, and time exchanges for demo
5. **Data isolation**: Sandbox data uses a `sandbox` boolean column on new models. Queries in sandbox mode filter `WHERE sandbox = true`; production mode filters `WHERE sandbox = false`

This means Chase can test at `measurablybetter.life/life/sandbox` with realistic demo data, while the production path at `measurablybetter.life/life` stays clean.

---

## Database Schema -- New Prisma Models

All new models go in `packages/database/prisma/schema.prisma` under a new section header. They use the existing `User` model (cuid PK) for identity and the existing `DirectoryBusiness` model (int PK) for directory integration.

### New Models

```prisma
// -----------------------------------------------------------------
// MEASURABLY BETTER LIFE -- Community Coordination Platform
// -----------------------------------------------------------------

// A user's public community profile. One per user per community.
// Separated from User (which is internal ops) to maintain sovereignty.
model CommunityProfile {
  id            String    @id @default(cuid())
  userId        String    // Soft FK to User.id
  displayName   String
  bio           String?   @db.Text
  city          String
  state         String    @default("MS")
  zip           String?
  avatarUrl     String?
  tier          String    @default("free")  // free | life | business | ops
  stripeCustomerId String?
  stripeSubscriptionId String?
  sandbox       Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  skills        SkillListing[]
  tasksPosted   TaskPost[]      @relation("TaskAuthor")
  tasksClaimed  TaskPost[]      @relation("TaskClaimant")
  timeGiven     TimeExchange[]  @relation("TimeGiver")
  timeReceived  TimeExchange[]  @relation("TimeReceiver")
  contributions ContributedListing[]
  credits       ContributorCredit[]

  @@unique([userId, sandbox])
  @@index([city, state])
  @@index([tier])
  @@index([sandbox])
}

// A skill someone offers to their community
model SkillListing {
  id            String    @id @default(cuid())
  profileId     String
  profile       CommunityProfile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  name          String           // "Electrical wiring", "Bookkeeping", "Deck building"
  category      String           // trades | professional | creative | tech | domestic | transport
  description   String?  @db.Text
  availability  String?          // "weekends" | "evenings" | "flexible" | "by appointment"
  hourlyRate    String?          // Optional -- some will do time exchange only
  exchangeOnly  Boolean  @default(false)
  active        Boolean  @default(true)
  sandbox       Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([category])
  @@index([profileId])
  @@index([sandbox, active])
}

// Task board post -- someone needs something done
model TaskPost {
  id            String    @id @default(cuid())
  authorId      String
  author        CommunityProfile @relation("TaskAuthor", fields: [authorId], references: [id], onDelete: Cascade)
  title         String
  description   String    @db.Text
  category      String           // trades | professional | creative | tech | domestic | transport | other
  urgency       String    @default("normal") // urgent | normal | whenever
  exchangeType  String    @default("time")   // time | paid | either | volunteer
  estimatedHours Float?
  budget        String?          // "$200" or "negotiable" -- string for flexibility
  status        String    @default("open")   // open | claimed | in_progress | completed | cancelled
  claimantId    String?
  claimant      CommunityProfile? @relation("TaskClaimant", fields: [claimantId], references: [id])
  completedAt   DateTime?
  sandbox       Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  timeExchanges TimeExchange[]

  @@index([status, category])
  @@index([authorId])
  @@index([claimantId])
  @@index([sandbox, status])
}

// Time exchange ledger -- hour-for-hour tracking
model TimeExchange {
  id            String    @id @default(cuid())
  giverId       String
  giver         CommunityProfile @relation("TimeGiver", fields: [giverId], references: [id])
  receiverId    String
  receiver      CommunityProfile @relation("TimeReceiver", fields: [receiverId], references: [id])
  taskPostId    String?
  taskPost      TaskPost? @relation(fields: [taskPostId], references: [id])
  hours         Float            // Number of hours exchanged
  description   String           // What was done
  status        String    @default("pending") // pending | confirmed | disputed
  confirmedAt   DateTime?
  sandbox       Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([giverId])
  @@index([receiverId])
  @@index([sandbox, status])
}

// Tool library -- shared equipment
model ToolLibraryItem {
  id            String    @id @default(cuid())
  ownerId       String          // Soft FK to CommunityProfile.id
  name          String
  description   String?
  category      String          // power_tools | hand_tools | garden | kitchen | auto | other
  condition     String          // excellent | good | fair
  available     Boolean  @default(true)
  photoUrl      String?
  sandbox       Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([category, available])
  @@index([ownerId])
  @@index([sandbox])
}

// User-submitted business for directory review
model ContributedListing {
  id            String    @id @default(cuid())
  contributorId String
  contributor   CommunityProfile @relation(fields: [contributorId], references: [id])
  businessName  String
  category      String
  city          String
  state         String    @default("MS")
  address       String?
  phone         String?
  website       String?
  description   String    @db.Text
  whyInclude    String?   @db.Text
  status        String    @default("submitted") // submitted | ai_reviewed | approved | rejected | published
  aiReviewNotes String?   @db.Text
  reviewedBy    String?
  directoryBusinessId Int? @unique  // FK to DirectoryBusiness when published
  sandbox       Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([status])
  @@index([contributorId])
  @@index([sandbox, status])
}

// Credit earned for approved contributions
model ContributorCredit {
  id            String    @id @default(cuid())
  profileId     String
  profile       CommunityProfile @relation(fields: [profileId], references: [id])
  type          String           // listing_approved | article_published | data_correction
  amount        Int       @default(1)
  description   String
  sourceType    String?          // "contributed_listing" | "article"
  sourceId      String?
  sandbox       Boolean   @default(false)
  createdAt     DateTime  @default(now())

  @@index([profileId])
  @@index([sandbox])
}
```

### Modifications to Existing Models

**User model** -- add one field:
```
communityTier  String?  // "free" | "life" | "business" | "ops" -- MBT Life tier
```

**DirectoryBusiness model** -- add one field:
```
contributedBy  String?  // Soft FK to ContributedListing.id for attribution
```

---

## Stripe Billing -- New MBT Life Tier

The existing billing system maps Client tiers to Stripe prices. MBT Life needs its own subscription flow for individual users (not businesses).

New file: `apps/web/app/api/life/billing/subscribe/route.ts`

```
LIFE_TIER_PRICES = {
  'life':     { amount: 2500, name: 'MBT Life -- $25/month' },
  'business': { amount: 9900, name: 'MBT Business -- $99/month' },
}
```

This is separate from the existing Client billing. Life billing attaches to User via CommunityProfile.stripeCustomerId, not Client.stripeCustomerId. The webhook at `apps/web/app/api/life/billing/webhook/route.ts` updates CommunityProfile.tier on payment events.

---

## Phase 1: Working Demo (Priority -- Build This First)

### Goal
A functional sandbox that Chase can demo: sign in, see the community board, browse skills, see the time ledger, and chat with the AI coordinator that knows the local directory.

### 1A. Data Layer (Day 1)

Files to create/modify:

1. **MODIFY** `packages/database/prisma/schema.prisma` -- add all 7 new models plus 2 field additions
2. **CREATE** `packages/database/scripts/seed-mbt-life.ts` -- seed 8-10 CommunityProfiles, 15-20 SkillListings, 10-12 TaskPosts, 6-8 TimeExchanges, 3-4 ContributedListings, all with `sandbox: true`
3. Run `prisma db push` to sync schema

### 1B. API Routes (Day 2-3)

All routes under `apps/web/app/api/life/`. Every write route checks auth + tier.

```
apps/web/app/api/life/
  profile/
    route.ts          -- GET (my profile), POST (create)
    [id]/route.ts     -- GET (any profile), PATCH (update)
  skills/
    route.ts          -- GET (search/list), POST (create)
    [id]/route.ts     -- GET, PATCH, DELETE
  board/
    route.ts          -- GET (list tasks), POST (create)
    [id]/route.ts     -- GET, PATCH (update status, claim)
    [id]/claim/route.ts -- POST (claim a task)
  time/
    route.ts          -- GET (my exchanges), POST (log)
    [id]/route.ts     -- PATCH (confirm/dispute)
  directory/
    route.ts          -- GET (browse -- wraps existing DirectoryBusiness)
  chat/
    route.ts          -- POST (AI coordinator)
```

Shared utility: `apps/web/lib/life-utils.ts`
- `isSandbox(req)` -- checks path, cookie, or env var
- `canWrite(tier)` -- returns true for life/business/ops
- `getProfile(userId, sandbox)` -- fetches CommunityProfile
- `requireLifeTier(session)` -- auth guard for write endpoints

### 1C. Life App UI (Day 3-5)

Route structure:
```
apps/web/app/measurably-better/life/
  layout.tsx            -- Shell: bottom nav, auth gate, sandbox banner
  page.tsx              -- Dashboard / home feed
  life.css              -- Theme variables + page styles
  board/
    page.tsx            -- Community Board
    [id]/page.tsx       -- Task detail
    new/page.tsx        -- Create task (gated)
  skills/
    page.tsx            -- Skill Map
    new/page.tsx        -- Add skill
  time/
    page.tsx            -- Time Ledger
    log/page.tsx        -- Log exchange
  directory/
    page.tsx            -- Enhanced directory browse
  chat/
    page.tsx            -- AI Coordinator
  profile/
    page.tsx            -- Community profile
    edit/page.tsx       -- Edit profile
  sandbox/
    layout.tsx          -- Sets sandbox cookie, shows banner
    page.tsx            -- Re-exports ../page.tsx
```

Layout decisions:
- Mobile-first bottom navigation (5 tabs: Home, Board, Skills, Time, Chat)
- ThemeProvider with defaultTheme="life" (new theme)
- Auth gate: unauthenticated users see read-only with sign-in prompt
- Sandbox banner: yellow stripe at top when in sandbox mode
- No sidebar -- consumer app, not a dashboard

New shared components under `apps/web/components/life/`:
- `BottomNav.tsx` -- Mobile bottom tab bar
- `TaskCard.tsx` -- Task board card
- `SkillCard.tsx` -- Skill listing card
- `TimeEntry.tsx` -- Time exchange row
- `ProfileBadge.tsx` -- Avatar + name + tier
- `TierGate.tsx` -- Upgrade prompt wrapper for free users
- `SandboxBanner.tsx` -- Yellow sandbox mode banner
- `CategoryFilter.tsx` -- Reusable filter chips

Theme CSS (add to existing system):
```css
.theme-life {
  --color-primary: #2d5a27;     /* Deep green */
  --color-secondary: #c17817;   /* Warm amber */
  --color-bg: #faf8f5;          /* Warm off-white */
  --color-surface: #ffffff;
  --color-text: #1a1a1a;
  --color-muted: #6b7280;
}
```

### 1D. AI Coordinator (Day 5-6)

File: `apps/web/app/api/life/chat/route.ts`

Extends existing Sovereign Notebook pattern with community context. Same Gemini 2.5 Flash + 1M context.

Context packing (well within 1M tokens):
1. OE Philosophy docs (~20K tokens) -- from apps/books/docs/
2. OE Voice Spec (~1K tokens) -- from .claude/agents/OE_WRITING_VOICE.md
3. User's community profile + skills (~500 tokens)
4. Task board state for user's community (~5K tokens)
5. Time exchange history (~2K tokens)
6. DirectoryBusiness listings for user's city (~30K tokens)
7. Local events (~2K tokens)
8. Chat history (variable)

System instruction: local coordinator voice, not enterprise architect voice. Searches skills for "who can help" questions, searches directory for "best electrician" questions, draws on OE frameworks for "how do I" questions.

---

## Phase 2: Full Community Features (Week 2)

- Full task board CRUD with claim/complete flow
- Skill map with search, category filter, geographic proximity
- Time ledger with balance view, confirmation flow, CSV export
- Stripe Life subscription: pricing page, checkout, webhook for tier updates

## Phase 3: AI Writing + Editorial Filter (Week 3)

- Writing studio at /life/write
- AI drafts article from user research + local context
- Editorial filter: second Gemini call with OE Voice Spec as system instruction
- Returns structured evaluation (fits/score/feedback/suggestions)
- Uses existing PendingDraft model for publish pipeline

## Phase 4: Community Contributions (Week 4)

- Submission flow for new directory listings
- AI first-pass review (Anthropic Claude, same pattern as directory/submit)
- Admin review queue
- ContributorCredit system with profile badges

## Phase 5: Extraction Calculator (Week 5)

- Client-side spending tracker (no server storage -- privacy)
- Categories: local/chain/online/subscription
- Extraction percentage with CensusData comparison by zip

## Phase 6: Apple Notes + iPhone Integrations (Week 6+)

- PWA service worker
- Apple Notes sync via existing packages/apple-kit or MCP tools
- Notes stored as NotebookDrop with sourceSystem="apple_notes"
- Push notifications, Share sheet integration

---

## Key Architectural Decisions

1. **Separate CommunityProfile from User**: User is internal ops (admin/ops/artist/viewer roles, Asana IDs). Consumer app needs its own clean public profile model.

2. **Sandbox via boolean column**: Simpler than separate DB. Seed script populates with sandbox=true. Production queries filter sandbox=false.

3. **Life routes nested under measurably-better**: URL is measurablybetter.life/life/board. Enterprise at /measurably-better/enterprise/ stays separate.

4. **Gemini for coordinator, Anthropic for editorial**: Coordinator needs 1M context (Gemini). Editorial filter is evaluative (Claude excels here, matches existing directory/submit pattern).

5. **No extraction on transactions**: No transaction fee fields in schema. Only revenue is $25/mo subscription. Architectural enforcement of philosophical constraint.

6. **Soft FKs for cross-model references**: CommunityProfile.userId is a soft FK to User.id (no @relation). Follows the existing sovereignty pattern (see Client/Article soft FKs).

---

## Implementation Sequence for Phase 1 Demo

1. Schema -- Add 7 models to Prisma, run prisma db push
2. Seed -- Write and run seed script for sandbox data
3. API: board -- GET/POST /api/life/board
4. API: skills -- GET/POST /api/life/skills
5. API: time -- GET/POST /api/life/time
6. API: profile -- GET/POST /api/life/profile
7. API: chat -- POST /api/life/chat with directory context
8. UI: layout -- Life app shell with bottom nav
9. UI: board -- Community board with TaskCard
10. UI: skills -- Skill map with search
11. UI: time -- Time ledger with TimeEntry
12. UI: chat -- AI coordinator (adapt NotebookClient pattern)
13. UI: sandbox -- Sandbox layout with banner
14. Test -- Full demo flow in sandbox mode
