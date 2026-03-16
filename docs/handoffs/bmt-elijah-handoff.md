# Big Muddy Platform — Technical Handoff
**To:** Elijah Tuttle, Tuthill Design
**From:** Chase Pierson (Showrunner), Big Muddy Touring
**Date:** March 2, 2026
**Project:** Big Muddy Touring — Unified Multi-Tenant Platform
**Codebase Target:** `velvet-grit` (Next.js, Firebase App Hosting)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Recommendation](#2-architecture-recommendation)
3. [Database Schema (Prisma)](#3-database-schema-prisma)
4. [API Routes](#4-api-routes)
5. [Page Routes by Domain](#5-page-routes-by-domain)
6. [Design Tokens & Brand System](#6-design-tokens--brand-system)
7. [Integration Roadmap](#7-integration-roadmap)
8. [Firebase Migration Plan](#8-firebase-migration-plan)
9. [Known Issues to Fix First](#9-known-issues-to-fix-first)
10. [Domain & DNS Configuration](#10-domain--dns-configuration)
11. [Cost Estimate](#11-cost-estimate)
12. [What the Prototype Proves](#12-what-the-prototype-proves)

---

## 1. Executive Summary

### What Was Built

Big Muddy Touring is a media-hospitality ecosystem anchored in Natchez, Mississippi. The platform covers four distinct brand experiences under one roof:

| Brand | Domain | Purpose |
|---|---|---|
| **Big Muddy Touring** | bigmuddytouring.com | Primary editorial hub — inn, route, travel |
| **Big Muddy Magazine** | bigmuddymagazine.com | Long-form editorial, city guides, features |
| **Big Muddy Radio** | bigmuddyradio.com | Music streaming, curated playlists, live sessions |
| **HQ (Admin)** | admin domain or /admin | Internal ops — content management, contacts, metrics |

A working prototype has validated the entire concept: unified multi-tenant navigation, a shared SQLite-backed content model, and live data flowing from admin to public-facing views — all in a single deployment. The prototype was built to de-risk the product, not to ship. It is the source of truth for UX decisions and data models.

### Why It Matters

One codebase. One database. One deploy. Four domains.

This architecture eliminates the split-brain problem that broke `big-muddy-network`: instead of four repositories that drift apart, you have a single Turborepo monorepo where every brand shares UI primitives, database types, and config. When the design system changes, it changes everywhere. When the schema migrates, it migrates once.

### What Elijah Needs to Do

Port the validated prototype into a production-grade Next.js application using the `velvet-grit` repo as the base. The data schema, middleware pattern, design tokens, and page routes are all finalized — they don't need to be re-invented. Sprint 1 should be standing up the monorepo structure and getting hostname-based routing working locally. Everything else flows from there.

---

## 2. Architecture Recommendation

### Monorepo Structure

Use Turborepo inside `velvet-grit`. The existing repo already lives on Firebase App Hosting (Next.js 14.2) — extend it rather than starting fresh.

```
velvet-grit/
├── apps/
│   └── web/                          # Single Next.js app — all 4 brand experiences
│       ├── app/
│       │   ├── (touring)/            # Route group → bigmuddytouring.com
│       │   │   ├── page.tsx
│       │   │   ├── inn/
│       │   │   │   └── page.tsx
│       │   │   └── route/
│       │   │       └── page.tsx
│       │   ├── (magazine)/           # Route group → bigmuddymagazine.com
│       │   │   ├── page.tsx
│       │   │   ├── articles/
│       │   │   │   └── [slug]/
│       │   │   │       └── page.tsx
│       │   │   └── city-guides/
│       │   │       └── page.tsx
│       │   ├── (radio)/              # Route group → bigmuddyradio.com
│       │   │   ├── page.tsx
│       │   │   ├── playlists/
│       │   │   │   └── page.tsx
│       │   │   └── live/
│       │   │       └── page.tsx
│       │   ├── (admin)/              # Route group → admin panel
│       │   │   ├── dashboard/
│       │   │   │   └── page.tsx
│       │   │   ├── articles/
│       │   │   │   ├── page.tsx
│       │   │   │   ├── new/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── [id]/
│       │   │   │       └── edit/
│       │   │   │           └── page.tsx
│       │   │   └── ...               # (all other admin sections)
│       │   ├── api/                  # Next.js API routes
│       │   │   ├── articles/
│       │   │   │   ├── route.ts
│       │   │   │   └── [id]/
│       │   │   │       └── route.ts
│       │   │   └── ...               # (all other API resources)
│       │   └── layout.tsx            # Root layout — hostname detection
│       ├── middleware.ts             # Multi-tenant hostname routing
│       ├── next.config.ts
│       └── package.json
├── packages/
│   ├── database/                     # Prisma schema + generated client
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── index.ts                  # Exports PrismaClient singleton
│   │   └── package.json
│   ├── ui/                           # Shared React components
│   │   ├── components/
│   │   │   ├── Navigation.tsx
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── PlaylistCard.tsx
│   │   │   └── ...
│   │   └── package.json
│   └── config/                       # Brand tokens, constants, types
│       ├── brands.ts
│       ├── tokens.css
│       └── package.json
├── turbo.json
├── package.json                      # Root — workspace config
└── .env                              # Never commit this
```

### Multi-Tenant Routing via `middleware.ts`

The core pattern: middleware intercepts every request, reads the `Host` header, and rewrites the URL to the correct route group. The browser URL stays clean; Next.js serves from the appropriate subtree.

```typescript
// apps/web/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Skip rewrites for API routes and static assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  if (hostname.includes('bigmuddytouring')) {
    return NextResponse.rewrite(
      new URL('/touring' + pathname, request.url)
    );
  }

  if (hostname.includes('bigmuddymagazine')) {
    return NextResponse.rewrite(
      new URL('/magazine' + pathname, request.url)
    );
  }

  if (hostname.includes('bigmuddyradio')) {
    return NextResponse.rewrite(
      new URL('/radio' + pathname, request.url)
    );
  }

  // Admin domain or localhost — route to admin panel
  // Also handles: admin.bigmuddy.com, localhost:3000
  return NextResponse.rewrite(
    new URL('/admin' + pathname, request.url)
  );
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### Local Development Setup

To develop all four brands locally without real DNS, use `/etc/hosts` overrides:

```bash
# /etc/hosts (add these lines)
127.0.0.1  bigmuddytouring.local
127.0.0.1  bigmuddymagazine.local
127.0.0.1  bigmuddyradio.local
127.0.0.1  admin.bigmuddy.local
```

Then run the dev server and hit each hostname on port 3000:
- `http://bigmuddytouring.local:3000`
- `http://bigmuddymagazine.local:3000`
- `http://bigmuddyradio.local:3000`
- `http://admin.bigmuddy.local:3000`

Update `middleware.ts` to match `.local` during development, or use a `NEXT_PUBLIC_BRAND` env variable as a dev override to bypass hostname detection entirely.

### Root Layout with Hostname Detection

```typescript
// apps/web/app/layout.tsx
import { headers } from 'next/headers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const hostname = headersList.get('host') || '';

  // Brand is determined at the middleware level via URL rewrite.
  // Root layout handles global concerns only: fonts, base CSS, analytics.
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
```

Each route group has its own `layout.tsx` that applies brand-specific fonts, nav, and theme class:

```typescript
// apps/web/app/(magazine)/layout.tsx
import { Playfair_Display, DM_Sans } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' });

export default function MagazineLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${dmSans.variable} theme-magazine`}>
      <MagazineNav />
      <main>{children}</main>
      <MagazineFooter />
    </div>
  );
}
```

### Turborepo Config

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {}
  }
}
```

---

## 3. Database Schema (Prisma)

### Technology Decision: PostgreSQL via Supabase

Move from SQLite (prototype) to PostgreSQL. SQLite was fine for the prototype but won't survive concurrent writes or multi-region deployments. Supabase gives you managed Postgres, a connection pooler (Supavisor), real-time subscriptions if needed later, and a decent dashboard. Free tier handles early traffic; $25/month Pro tier when ready.

### Package Structure

```typescript
// packages/database/index.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export * from '@prisma/client';
```

### Complete Prisma Schema

```prisma
// packages/database/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Use connection pooling URL for serverless (Next.js API routes, Vercel, Firebase Functions)
  directUrl = env("DIRECT_DATABASE_URL")
}

// ─────────────────────────────────────────────────────────────
// MAGAZINE
// ─────────────────────────────────────────────────────────────

model Article {
  id          Int       @id @default(autoincrement())
  title       String
  slug        String    @unique
  category    String    // city-guide | feature | photo-essay | interview | food-drink | music
  city        String?   // memphis | clarksdale | natchez | new-orleans | vicksburg | etc.
  author      String    @default("Big Muddy Magazine")
  status      String    @default("draft")     // draft | review | published
  excerpt     String?
  body        String?   @db.Text
  heroImage   String?   // Cloudflare R2 URL
  readTime    String?   // e.g. "6 min read"
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([status, publishedAt])
  @@index([category])
  @@index([city])
}

// ─────────────────────────────────────────────────────────────
// RADIO
// ─────────────────────────────────────────────────────────────

model Playlist {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  trackCount  Int      @default(0)
  spotifyUrl  String?  // spotify:playlist:xxx or https://open.spotify.com/playlist/xxx
  coverImage  String?  // Cloudflare R2 URL
  status      String   @default("active")  // active | archived
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([status])
}

model Event {
  id          Int      @id @default(autoincrement())
  name        String
  date        DateTime
  time        String?              // e.g. "7:00 PM CT" — store separately for display flexibility
  artist      String?
  description String?
  price       String?              // e.g. "$25" or "Free" — string to allow flexibility
  capacity    Int      @default(50)
  status      String   @default("upcoming")  // upcoming | sold-out | cancelled | completed
  stream      Boolean  @default(false)       // whether this event will be livestreamed
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([date, status])
}

// ─────────────────────────────────────────────────────────────
// NEWSLETTER
// ─────────────────────────────────────────────────────────────

model NewsletterIssue {
  id          Int      @id @default(autoincrement())
  issueNumber Int      @unique
  subject     String
  storyTitle  String?
  storyBody   String?  @db.Text
  playlist    String?  // Playlist name or Spotify URL
  reason      String?  // "Why You Should Go" section
  quickHits   String?  @db.Text  // Comma-separated or JSON array of bullets
  status      String   @default("draft")  // draft | scheduled | sent
  sendDate    DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([status, sendDate])
}

// ─────────────────────────────────────────────────────────────
// CRM / CONTACTS
// ─────────────────────────────────────────────────────────────

model Contact {
  id           Int       @id @default(autoincrement())
  name         String
  role         String?
  organization String?
  email        String?
  phone        String?
  category     String?   // artist | vendor | media | partner | guest | team
  notes        String?   @db.Text
  lastContact  DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  @@index([category])
  @@index([email])
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD METRICS
// ─────────────────────────────────────────────────────────────

model Metric {
  id        Int      @id @default(autoincrement())
  key       String   @unique  // e.g. "newsletter_subscribers", "inn_occupancy_rate", "spotify_followers"
  value     Float
  target    Float?
  label     String?           // Display label: "Newsletter Subscribers"
  unit      String?           // "subscribers", "%", "followers", etc.
  source    String?           // "beehiiv" | "cloudbeds" | "spotify" | "manual"
  updatedAt DateTime @updatedAt

  @@index([key])
}

// ─────────────────────────────────────────────────────────────
// AUTH (NextAuth.js)
// ─────────────────────────────────────────────────────────────
// Add these when setting up NextAuth.js with Prisma adapter.
// Run: npx prisma db push after adding.

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  role          String    @default("viewer")  // admin | editor | viewer
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

### Schema Notes

- **`body` fields use `@db.Text`** — Postgres `TEXT` type, no length limit. Required for article body and newsletter story content.
- **`quickHits` on NewsletterIssue** — Store as a JSON string (`JSON.stringify(["item1", "item2"])`) for now. Migrate to a `Json` column type when you're ready.
- **The `Metric.key` field is the canonical identifier** — use snake_case strings like `newsletter_subscribers`. The HQ dashboard reads from this table; external integrations (Beehiiv, CloudBeds, Spotify) upsert into it on a schedule.
- **The Auth models are additive** — skip them in Phase 1, add in Phase 2 (Week 4) per the roadmap.

### Migration from Prototype SQLite

The prototype SQLite schema maps 1:1 to the Prisma schema above. When seeding the Postgres database, export SQLite data as JSON and write a one-time migration script with Prisma's `createMany`. Don't port the SQLite file itself.

---

## 4. API Routes

All API routes live under `apps/web/app/api/`. These are standard Next.js App Router route handlers — no separate Express/Fastify server needed. Implement with `prisma` imported from `@bigmuddy/database`.

### Route Handler Pattern

```typescript
// apps/web/app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

// GET /api/articles
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '20');

  const articles = await prisma.article.findMany({
    where: {
      ...(status && { status }),
      ...(category && { category }),
    },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });

  return NextResponse.json(articles);
}

// POST /api/articles
export async function POST(request: Request) {
  const body = await request.json();
  
  const article = await prisma.article.create({
    data: body,
  });

  return NextResponse.json(article, { status: 201 });
}
```

### Complete Route List

#### Articles — Magazine

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/articles` | List articles. Query params: `?status=published&category=feature&limit=20` |
| `POST` | `/api/articles` | Create article |
| `GET` | `/api/articles/[id]` | Get article by ID |
| `PUT` | `/api/articles/[id]` | Update article (full or partial) |
| `DELETE` | `/api/articles/[id]` | Delete article |
| `GET` | `/api/articles/slug/[slug]` | Get article by slug (for public article pages) |

#### Playlists — Radio

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/playlists` | List playlists. Query params: `?status=active` |
| `POST` | `/api/playlists` | Create playlist |
| `GET` | `/api/playlists/[id]` | Get playlist by ID |
| `PUT` | `/api/playlists/[id]` | Update playlist |
| `DELETE` | `/api/playlists/[id]` | Delete playlist |

#### Events — Radio / Touring

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/events` | List events. Query params: `?status=upcoming` |
| `POST` | `/api/events` | Create event |
| `GET` | `/api/events/[id]` | Get event by ID |
| `PUT` | `/api/events/[id]` | Update event |
| `DELETE` | `/api/events/[id]` | Delete event |

#### Newsletter

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/newsletter` | List issues. Query params: `?status=draft` |
| `POST` | `/api/newsletter` | Create issue |
| `GET` | `/api/newsletter/[id]` | Get issue by ID |
| `PUT` | `/api/newsletter/[id]` | Update issue |
| `DELETE` | `/api/newsletter/[id]` | Delete issue |
| `POST` | `/api/newsletter/[id]/publish` | Publish to Beehiiv (Phase 3) |

#### Contacts — CRM

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/contacts` | List contacts. Query params: `?category=artist` |
| `POST` | `/api/contacts` | Create contact |
| `GET` | `/api/contacts/[id]` | Get contact by ID |
| `PUT` | `/api/contacts/[id]` | Update contact |
| `DELETE` | `/api/contacts/[id]` | Delete contact |

#### Dashboard Metrics

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/metrics` | Get all metrics (keyed object) |
| `PUT` | `/api/metrics` | Bulk upsert metrics (for integration sync jobs) |
| `PUT` | `/api/metrics/[key]` | Update single metric by key |

#### Auth (Phase 2)

| Method | Route | Description |
|--------|-------|-------------|
| `*` | `/api/auth/[...nextauth]` | NextAuth.js catch-all handler |

### Error Handling Pattern

Wrap all route handlers in a consistent error handler:

```typescript
// packages/config/src/api.ts
import { NextResponse } from 'next/server';

export function withErrorHandler(
  handler: (req: Request, ctx?: unknown) => Promise<NextResponse>
) {
  return async (req: Request, ctx?: unknown) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      console.error('[API Error]', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}
```

---

## 5. Page Routes by Domain

### bigmuddytouring.com — `(touring)` Route Group

The touring site is the front door of the entire ecosystem. It surfaces content from all other brands — article teasers from Magazine, playlist teasers from Radio, the inn, and the driving route.

```
app/(touring)/
├── page.tsx                    # / — Homepage
├── inn/
│   └── page.tsx                # /inn — Inn detail
└── route/
    └── page.tsx                # /route — Full route with map
```

#### Homepage (`/`)

Components and data needs:
- **Hero** — Static. Full-viewport image/video, tagline, CTA to the route.
- **Inn section** — Static content with booking link (CloudBeds integration in Phase 3).
- **Route section** — Static map teaser, link to `/route`.
- **From the Magazine** — `GET /api/articles?status=published&limit=3`
- **On the Radio** — `GET /api/playlists?status=active&limit=3`
- **Newsletter signup** — Embedded Beehiiv form (no API needed at this stage).

```typescript
// app/(touring)/page.tsx — server component
import { prisma } from '@bigmuddy/database';

export default async function TouringHomepage() {
  const [articles, playlists] = await Promise.all([
    prisma.article.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
    prisma.playlist.findMany({
      where: { status: 'active' },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
  ]);

  return (
    <>
      <Hero />
      <InnSection />
      <RouteSection />
      <MagazineTeasers articles={articles} />
      <RadioTeasers playlists={playlists} />
      <NewsletterSignup />
    </>
  );
}
```

#### Inn (`/inn`)
Static content page. In Phase 3, pull occupancy/availability from CloudBeds API and surface a live availability widget.

#### Route (`/route`)
Static content with embedded Mapbox or Google Maps embed showing the driving route from Memphis to New Orleans. No dynamic data needed at launch.

---

### bigmuddymagazine.com — `(magazine)` Route Group

```
app/(magazine)/
├── page.tsx                    # / — Homepage (featured + grid)
├── articles/
│   └── [slug]/
│       └── page.tsx            # /articles/[slug] — Article detail
├── city-guides/
│   ├── page.tsx                # /city-guides — City guide index
│   └── [city]/
│       └── page.tsx            # /city-guides/[city] — City guide detail (Phase 2+)
├── about/
│   └── page.tsx                # /about — About page
└── layout.tsx                  # Magazine layout — Playfair Display, wide article formatting
```

#### Homepage (`/`)

- **Featured article** — Most recently published article, full-width hero treatment.
- **Article grid** — Next 8 articles, card layout.
- **Category filter** — Client-side filter by `category` (city-guide, feature, interview, etc.).

```typescript
// app/(magazine)/page.tsx
export default async function MagazineHomepage() {
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    take: 9,
  });

  const [featured, ...grid] = articles;

  return (
    <>
      <FeaturedArticle article={featured} />
      <ArticleGrid articles={grid} />
    </>
  );
}
```

#### Article Detail (`/articles/[slug]`)

Use `generateStaticParams` for published articles at build time + ISR for updates:

```typescript
// app/(magazine)/articles/[slug]/page.tsx
export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    select: { slug: true },
  });
  return articles.map((a) => ({ slug: a.slug }));
}

export const revalidate = 3600; // Revalidate every hour

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article || article.status !== 'published') {
    notFound();
  }

  return <ArticleDetail article={article} />;
}
```

**SEO metadata per article:**

```typescript
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  return {
    title: `${article?.title} — Big Muddy Magazine`,
    description: article?.excerpt,
    openGraph: {
      title: article?.title,
      description: article?.excerpt,
      images: [{ url: article?.heroImage || '/og-default.jpg' }],
    },
  };
}
```

#### City Guides (`/city-guides`)

Index page listing all cities that have published articles. Group articles by `city` field:

```typescript
const cityArticles = await prisma.article.groupBy({
  by: ['city'],
  where: { status: 'published', category: 'city-guide', city: { not: null } },
  _count: { city: true },
});
```

---

### bigmuddyradio.com — `(radio)` Route Group

```
app/(radio)/
├── page.tsx                    # / — Now playing + featured playlists
├── playlists/
│   ├── page.tsx                # /playlists — All playlists
│   └── [id]/
│       └── page.tsx            # /playlists/[id] — Playlist detail (Phase 2+)
├── live/
│   └── page.tsx                # /live — Upcoming live sessions
├── podcast/
│   └── page.tsx                # /podcast — Coming soon page
└── layout.tsx                  # Radio layout — darker, music-forward
```

#### Homepage (`/`)

- **Now Playing / Hero** — Static or Spotify embed for the flagship playlist.
- **Featured Playlists** — `GET /api/playlists?status=active&limit=6`
- **Upcoming Live Sessions** — `GET /api/events?status=upcoming&limit=3`

#### Live (`/live`)

Full list of upcoming events with stream flag. When `stream: true`, show the stream CTA (Restream link in Phase 3).

---

### Admin (HQ) — `(admin)` Route Group

All admin routes are protected by NextAuth middleware (Phase 2). In Phase 1, protect with a simple `ADMIN_PASSWORD` environment variable check until proper auth is wired up.

```
app/(admin)/
├── layout.tsx                  # Admin layout — DM Sans only, sidebar nav, dark ops theme
├── dashboard/
│   └── page.tsx                # /dashboard — KPI tiles, recent activity
├── articles/
│   ├── page.tsx                # /articles — Table with status filters
│   ├── new/
│   │   └── page.tsx            # /articles/new — Create form
│   └── [id]/
│       └── edit/
│           └── page.tsx        # /articles/[id]/edit — Edit form
├── playlists/
│   ├── page.tsx
│   ├── new/
│   │   └── page.tsx
│   └── [id]/
│       └── edit/
│           └── page.tsx
├── events/
│   ├── page.tsx
│   ├── new/
│   │   └── page.tsx
│   └── [id]/
│       └── edit/
│           └── page.tsx
├── newsletter/
│   ├── page.tsx
│   ├── new/
│   │   └── page.tsx
│   └── [id]/
│       └── edit/
│           └── page.tsx
├── contacts/
│   ├── page.tsx
│   ├── new/
│   │   └── page.tsx
│   └── [id]/
│       └── edit/
│           └── page.tsx
├── calendar/
│   └── page.tsx                # /calendar — Upcoming events + deadlines view
├── tools/
│   └── page.tsx                # /tools — Quick links, integrations status
├── inn/
│   └── page.tsx                # /inn — CloudBeds occupancy data (Phase 3)
└── blues-room/
    └── page.tsx                # /blues-room — Restream/live session controls (Phase 3)
```

#### Dashboard (`/dashboard`)

Reads from the `Metric` table. Each KPI tile maps to a metric key:

| Metric Key | Label | Source |
|---|---|---|
| `newsletter_subscribers` | Newsletter Subscribers | Beehiiv (sync weekly) |
| `inn_occupancy_rate` | Inn Occupancy Rate | CloudBeds (sync daily) |
| `spotify_followers` | Spotify Followers | Spotify API (sync daily) |
| `articles_published` | Articles Published (MTD) | Prisma count query |
| `upcoming_events` | Upcoming Events | Prisma count query |
| `google_review_rating` | Google Rating | Google Business API (sync weekly) |

Phase 1: Manually enter metrics from the HQ admin. Phase 3: automated sync via cron-like API routes.

---

## 6. Design Tokens & Brand System

### CSS Custom Properties

These live in `packages/config/tokens.css` and are imported in the root layout. They apply globally across all brand experiences. Brand-specific overrides (if needed) are applied via a theme class on the route group's layout.

```css
/* packages/config/tokens.css */

:root {
  /* ── Color: Backgrounds ── */
  --bg:              #1a1816;   /* Deepest background */
  --surface:         #231f1c;   /* Cards, panels */
  --surface-2:       #2d2824;   /* Elevated surfaces, modals */
  --surface-3:       #38322c;   /* Hover states on surfaces */

  /* ── Color: Text ── */
  --text:            #f0ebe0;   /* Primary body text */
  --text-muted:      #8a8074;   /* Secondary/meta text */
  --text-disabled:   #5a524a;   /* Disabled states */

  /* ── Color: Accent (Amber/Gold) ── */
  --accent:          #c8943e;   /* Primary interactive color */
  --accent-hover:    #d4a44e;   /* Hover state */
  --accent-muted:    rgba(200, 148, 62, 0.15); /* Tinted backgrounds */

  /* ── Color: Semantic ── */
  --slate:           #4a6274;   /* Secondary accent — links, tags */
  --success:         #4a7c59;   /* Positive states */
  --warning:         #c89e3e;   /* Warning states */
  --error:           #b54c4c;   /* Error states */

  /* ── Color: Borders ── */
  --border:          rgba(200, 148, 62, 0.12);  /* Default border */
  --border-strong:   rgba(200, 148, 62, 0.25);  /* Emphasis border */
  --border-subtle:   rgba(240, 235, 224, 0.06); /* Subtle dividers */

  /* ── Typography: Fonts ── */
  --font-display:    'Playfair Display', Georgia, serif;
  --font-body:       'DM Sans', system-ui, -apple-system, sans-serif;

  /* ── Typography: Scale ── */
  --text-xs:   0.75rem;   /* 12px — labels, tags */
  --text-sm:   0.8125rem; /* 13px — secondary labels */
  --text-base: 0.875rem;  /* 14px — UI base */
  --text-md:   1rem;      /* 16px — article body */
  --text-lg:   1.125rem;  /* 18px — article lead */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  clamp(2rem, 4vw, 2.5rem);     /* Responsive heading */
  --text-5xl:  clamp(2.5rem, 5vw, 3.5rem);   /* Large heading */
  --text-hero: clamp(3rem, 7vw, 5rem);        /* Hero display */

  /* ── Typography: Line Height ── */
  --leading-tight:  1.2;
  --leading-snug:   1.35;
  --leading-normal: 1.6;
  --leading-loose:  1.8;  /* Article body text */

  /* ── Spacing ── */
  --space-1:  0.25rem;  /* 4px */
  --space-2:  0.5rem;   /* 8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-5:  1.25rem;  /* 20px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* ── Border Radius ── */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  /* ── Transitions ── */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;

  /* ── Z-Index ── */
  --z-base:    0;
  --z-raised:  10;
  --z-overlay: 100;
  --z-modal:   200;
  --z-nav:     300;
  --z-toast:   400;
}
```

### Brand-Specific Typography Rules

| Brand | Display Font | Body Font | Notes |
|---|---|---|---|
| **Touring** | Playfair Display | DM Sans | Playfair for headings only; generous whitespace |
| **Magazine** | Playfair Display | DM Sans | Playfair for headings + article display; article body at 17-18px, `--leading-loose` |
| **Radio** | Playfair Display | DM Sans | Playfair used sparingly; music-forward, grid-dense layout |
| **HQ Admin** | DM Sans only | DM Sans | No Playfair in admin; monospace for code/data cells |

Load both fonts in the root Next.js layout via `next/font/google`. Use CSS variables (`--font-display`, `--font-body`) rather than hardcoded font families in components — this makes it easy to swap fonts per brand via theme classes.

### Tailwind Integration

If using Tailwind (recommended), map tokens to `tailwind.config.ts`:

```typescript
// apps/web/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:        'var(--bg)',
        surface:   'var(--surface)',
        surface2:  'var(--surface-2)',
        text:      'var(--text)',
        muted:     'var(--text-muted)',
        accent:    'var(--accent)',
        slate:     'var(--slate)',
        border:    'var(--border)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body:    'var(--font-body)',
      },
    },
  },
};

export default config;
```

---

## 7. Integration Roadmap

### Phase 1: Core Platform (Weeks 1–3)

**Goal:** All four public-facing sites and HQ admin live on Firebase, routing correctly by hostname, with full CRUD from admin to public.

| Task | Owner | Notes |
|---|---|---|
| Initialize Turborepo structure | Elijah | Extend existing `velvet-grit` repo |
| Add `packages/database` with Prisma + Supabase | Elijah | Use `DATABASE_URL` env var |
| Wire up `middleware.ts` hostname routing | Elijah | Test locally with `/etc/hosts` |
| Port Touring homepage | Elijah | Static + dynamic article/playlist teasers |
| Port Magazine with article rendering | Elijah | ISR on article pages |
| Port Radio with playlist rendering | Elijah | Static + Spotify embeds |
| Build HQ admin — full CRUD for all models | Elijah | All forms, tables, status toggles |
| Deploy to Firebase App Hosting | Elijah | All 4 domains pointing to same deployment |

**Firebase App Hosting `apphosting.yaml`** (safe version — secrets as env vars, not hardcoded):

```yaml
# apphosting.yaml
runConfig:
  runtime: nodejs20
  maxInstances: 10

env:
  - variable: NODE_ENV
    value: production
  # All secrets via Firebase Secret Manager — never inline here
  - variable: DATABASE_URL
    secret: DATABASE_URL
  - variable: DIRECT_DATABASE_URL
    secret: DIRECT_DATABASE_URL
  - variable: NEXTAUTH_SECRET
    secret: NEXTAUTH_SECRET
  - variable: GOOGLE_CLIENT_ID
    secret: GOOGLE_CLIENT_ID
  - variable: GOOGLE_CLIENT_SECRET
    secret: GOOGLE_CLIENT_SECRET
```

Store secrets in Firebase Secret Manager, not in this file. This file is safe to commit.

---

### Phase 2: Authentication & Roles (Week 4)

**Goal:** Admin panel is properly gated. Chase, Elijah, and Miles have write access. Amy and Tracy have read-only.

**Stack:** NextAuth.js v5 (Auth.js) with Google OAuth and Prisma adapter.

```bash
pnpm add next-auth@beta @auth/prisma-adapter
```

```typescript
// apps/web/auth.ts
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@bigmuddy/database';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
    async signIn({ user }) {
      // Whitelist: only allow Google Workspace emails
      const allowedDomains = ['bigmuddytouring.com', 'tuthill.design'];
      const email = user.email || '';
      const isAllowed = allowedDomains.some(domain => email.endsWith(`@${domain}`));
      return isAllowed;
    },
  },
});
```

**Role-based access in admin layout:**

```typescript
// app/(admin)/layout.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <AdminShell role={session.user.role}>
      {children}
    </AdminShell>
  );
}
```

**Role matrix:**

| User | Role | Can Do |
|---|---|---|
| Chase | `admin` | Full CRUD, publish articles, send newsletters, manage contacts |
| Elijah | `admin` | Full CRUD, all technical access |
| Miles | `admin` | Full CRUD |
| Amy | `editor` | Create/edit articles and playlists, no publish |
| Tracy | `viewer` | Read-only dashboard access |

---

### Phase 3: Integrations (Weeks 5–8)

All integrations write into the `Metric` table for dashboard visibility. API calls are made from Next.js API routes (server-side only — secrets never touch the client).

#### Beehiiv (Newsletter)

Publish newsletter issues directly from HQ.

```typescript
// apps/web/app/api/newsletter/[id]/publish/route.ts
const BEEHIIV_API = 'https://api.beehiiv.com/v2';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const issue = await prisma.newsletterIssue.findUnique({
    where: { id: parseInt(params.id) },
  });

  const res = await fetch(`${BEEHIIV_API}/publications/${process.env.BEEHIIV_PUBLICATION_ID}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject: issue?.subject,
      content_text: issue?.storyBody,
      // ... map other fields
    }),
  });

  // Update issue status to 'sent'
  await prisma.newsletterIssue.update({
    where: { id: parseInt(params.id) },
    data: { status: 'sent' },
  });

  return NextResponse.json({ success: true });
}
```

**Env vars needed:** `BEEHIIV_API_KEY`, `BEEHIIV_PUBLICATION_ID`

#### Spotify API

Create and manage playlists from HQ. Use the Spotify Web API with Client Credentials flow for reading playlist metadata; Authorization Code flow if writing (creating playlists).

**Env vars needed:** `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`

#### CloudBeds API

Pull occupancy rate and upcoming reservations into the dashboard.

**Env vars needed:** `CLOUDBEDS_API_KEY`, `CLOUDBEDS_PROPERTY_ID`

#### Restream API

Show stream status, schedule upcoming streams from the Blues Room admin page.

**Env vars needed:** `RESTREAM_API_KEY`

#### Google Business Profile API

Pull review count and average rating for the inn dashboard tile.

**Env vars needed:** `GOOGLE_BUSINESS_ACCOUNT_ID`

---

### Phase 4: Content Pipeline (Weeks 9–12)

| Feature | Notes |
|---|---|
| Image upload → Cloudflare R2 | Pre-signed URL upload from HQ admin; store R2 URLs in `heroImage` fields |
| Rich text editor | [Tiptap](https://tiptap.dev) is the recommendation — good React integration, extensible, MIT license |
| SEO: OG images | Use `@vercel/og` (works on Firebase) for dynamic OG image generation per article |
| SEO: Structured data | JSON-LD `Article` schema on magazine article pages; `Event` schema on event pages |
| RSS feed | `/magazine/rss.xml` — `GET /api/magazine/rss` route returning XML |
| Sitemaps | `sitemap.ts` files per route group, Next.js metadata API |

---

## 8. Firebase Migration Plan

### Current State

| Repo | Platform | Status |
|---|---|---|
| `velvet-grit` | Firebase App Hosting (Next.js 14.2) | Active, continue here |
| `big-muddy-network` | Cloud Run (Next.js 14.1) | Broken — archive it |

### Migration Steps

#### Step 1: Archive `big-muddy-network`

It's dead code. Archive the GitHub repo (Settings → Archive repository). Don't delete it — preserve history. No migration needed; nothing to salvage.

#### Step 2: Rotate All Secrets (CRITICAL — Do This First)

The `apphosting.yaml` file was committed to git with secrets inline. Every secret in that file is compromised. Rotation procedure:

```bash
# 1. Identify all exposed secrets
git log --all -p -- apphosting.yaml | grep -E "(API_KEY|SECRET|PASSWORD|TOKEN|URL)" | grep "+" | grep -v "+++ "

# 2. For each service, revoke the old key and issue a new one:
#    - Firebase: Firebase Console → Project Settings → Service Accounts → Generate new key
#    - Any third-party API keys: regenerate in each service's dashboard
#    - Database credentials: rotate in Supabase dashboard
#    - NextAuth secret: openssl rand -base64 32

# 3. Add secrets to Firebase Secret Manager (not apphosting.yaml)
firebase apphosting:secrets:set DATABASE_URL
firebase apphosting:secrets:set NEXTAUTH_SECRET
# ... etc for each secret

# 4. Remove the old apphosting.yaml secrets, use secretmanager references instead
```

> **Note for Elijah:** This rotation has to happen before Phase 1 goes live. If Chase has already rotated them manually, verify each one is working in Secret Manager before deploying.

#### Step 3: Continue Firebase App Hosting

Firebase App Hosting is a solid choice for Next.js. It handles:
- Server-side rendering and API routes natively
- Built-in CDN
- Preview channels for PRs
- Integration with Firebase Secret Manager

No need to migrate away. The broken experience with `big-muddy-network` was a Cloud Run configuration issue, not a Firebase problem.

#### Step 4: Move to PostgreSQL (Supabase)

The prototype used SQLite. Production needs PostgreSQL. Supabase is the recommendation:

1. Create Supabase project at supabase.com
2. Copy the connection string and pooled connection string to Firebase Secret Manager
3. Run `npx prisma migrate deploy` to apply the schema
4. Seed with data exported from the prototype SQLite

Supabase connection string format:
```
# Transaction pooler (for serverless — Next.js API routes)
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection (for migrations)
DIRECT_DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

#### Step 5: Cloudflare R2 for Media

R2 is already in use — keep it. Images uploaded from HQ admin go directly to R2 via pre-signed URLs. The stored URLs in the database point to the R2 CDN domain (e.g., `cdn.bigmuddytouring.com`). Set up a custom domain in the R2 dashboard.

---

## 9. Known Issues to Fix First

These are ordered by risk/impact. Do not skip to new features until Issue 1 is resolved.

### Issue 1: CRITICAL — Rotate All Exposed Secrets

**Severity:** Critical  
**Risk:** Any secret committed to git history is effectively public — git history is permanent and discoverable.  
**Action:** See Section 8, Step 2 above. Rotate everything before writing a line of new code. GitHub has a "Secret Scanning" feature that may have already flagged these.

### Issue 2: Fix API Routes

**Root Cause:** The `big-muddy-network` repo had `output: 'export'` set in `next.config.js` (static HTML export mode). Static export doesn't support API routes or server-side rendering. This broke all API functionality.

**Fix:** The new monorepo architecture uses Next.js App Router without static export. Remove any `output: 'export'` configuration. Firebase App Hosting supports full Next.js SSR natively.

```typescript
// next.config.ts — correct configuration
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // DO NOT set output: 'export' — this disables API routes and SSR
  images: {
    remotePatterns: [
      { hostname: '*.r2.cloudflarestorage.com' },
      { hostname: 'cdn.bigmuddytouring.com' },
    ],
  },
};

export default nextConfig;
```

### Issue 3: Eliminate Code Duplication

**Root Cause:** Four separate Next.js apps meant copy-pasting components, types, and config between repos. Estimated 85-90% duplication across the old repos.

**Fix:** The `packages/ui` and `packages/config` shared packages eliminate this entirely. Write a component once in `packages/ui/src/components/`, use it everywhere. Write brand tokens once in `packages/config/tokens.css`, import everywhere.

### Issue 4: Fix Auth Bypass

**Root Cause:** The prototype used a simple password check or no auth at all on admin routes.

**Fix:** Phase 2 (Week 4) wires up NextAuth.js with Google OAuth. In Phase 1, use a temporary environment variable gate:

```typescript
// Temporary Phase 1 auth gate — replace in Phase 2
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function checkTempAuth() {
  const adminCookie = cookies().get('admin_session');
  if (adminCookie?.value !== process.env.ADMIN_SESSION_TOKEN) {
    redirect('/admin/login');
  }
}
```

---

## 10. Domain & DNS Configuration

### Architecture

All four domains point to the same Firebase App Hosting deployment. Hostname-based routing in `middleware.ts` handles the differentiation — no separate deployments, no load balancers, no routing rules in Firebase.

```
bigmuddytouring.com  ─┐
bigmuddymagazine.com  ├── Firebase App Hosting (velvet-grit) ── middleware.ts ── route groups
bigmuddyradio.com    ─┘
```

### DNS Records

For each domain, add a CNAME record pointing to the Firebase App Hosting URL. Firebase provides the hosting URL after initial deployment.

| Domain | Record Type | Name | Value |
|---|---|---|---|
| bigmuddytouring.com | CNAME | @ (apex) | `velvet-grit--[hash].web.app` |
| bigmuddymagazine.com | CNAME | @ (apex) | `velvet-grit--[hash].web.app` |
| bigmuddyradio.com | CNAME | @ (apex) | `velvet-grit--[hash].web.app` |

> **Note:** Apex CNAME records (on `@`) aren't supported by all DNS providers. If using a provider that doesn't support CNAME flattening (like standard BIND), use `A` records with Firebase's IP addresses, or use Cloudflare DNS which flattens CNAMEs automatically.

### Custom Domain Setup in Firebase

```bash
# Add each domain in Firebase Console → Hosting → Add custom domain
# Or via CLI:
firebase hosting:channel:deploy --expires 7d  # preview
firebase hosting:sites:create bigmuddytouring
```

In `firebase.json`, configure multi-site hosting:

```json
// firebase.json
{
  "apphosting": {
    "backendId": "velvet-grit"
  },
  "hosting": [
    {
      "site": "bigmuddytouring",
      "public": "apps/web/.next",
      "rewrites": [{ "source": "**", "destination": "/index.html" }]
    }
  ]
}
```

### Admin Domain

Two options — choose one:

**Option A: Subdomain** (`admin.bigmuddytouring.com`)
Add a CNAME for `admin.bigmuddytouring.com` → Firebase. Add middleware case for `admin.bigmuddytouring`.

**Option B: Path-based** (`bigmuddytouring.com/admin`)
No additional DNS. Middleware routes `/admin/*` paths to the admin route group when host is `bigmuddytouring.com`. Simpler but slightly less clean URL-wise.

Recommendation: Option A (subdomain) — cleaner separation, easier to add IP allowlisting later if needed.

### SSL

Firebase App Hosting provisions SSL certificates automatically via Let's Encrypt for all custom domains. No manual certificate management required.

---

## 11. Cost Estimate

All costs in USD/month. Assumes modest initial traffic (< 10k monthly visitors across all four sites).

| Service | Purpose | Launch | At Scale |
|---|---|---|---|
| Firebase App Hosting | Next.js hosting, CDN | ~$25 (Blaze pay-as-you-go) | ~$50–100 |
| Supabase | PostgreSQL database | $0 (Free tier: 500MB, 2 projects) | $25 (Pro: 8GB storage) |
| Cloudflare R2 | Image/media CDN | $0 (10GB free storage, 1M ops free) | $15 (per TB stored) |
| Domains (4) | Already owned | $0 | $0 |
| Beehiiv | Newsletter platform | $0 (up to 2,500 subscribers) | $39 (Scale: up to 100k) |
| Google Workspace | Auth identity provider | Already active | Already active |
| **Total** | | **~$25/month** | **~$75–160/month** |

### Scaling Notes

- Firebase App Hosting scales automatically; the Blaze plan bills per request/compute after the free tier. For a content site of this size, costs stay low.
- Supabase free tier is sufficient until production traffic. Upgrade to Pro ($25/month) when approaching 500MB storage or needing daily backups.
- Cloudflare R2 is extremely cost-effective for media storage vs. Firebase Storage or AWS S3.
- No additional cost for CloudBeds, Spotify, or Restream API integrations — all have free API access tiers.

---

## 12. What the Prototype Proves

The prototype was built with one goal: validate before investing engineering time in Next.js. Here's what it proved, and what Elijah should trust as finalized decisions.

### Proven: The Four-Mode Navigation UX Works

Users can intuitively move between Touring, Magazine, Radio, and the back-of-house admin panel. The navigation structure — with persistent cross-brand discovery and mode indicators — was tested in the prototype and is ready to implement as-is.

### Proven: The Data Model is Complete

Every content type the operation needs — articles, playlists, events, newsletter issues, contacts, metrics — is represented in the schema. No major additions are expected for the v1 launch. The Prisma schema in Section 3 is a direct formalization of what the prototype validated.

### Proven: Real-Time Admin-to-Public Flow

Create an article in HQ → it appears on bigmuddymagazine.com. Create a playlist → it appears on bigmuddyradio.com. Add an event → it shows on the live schedule. The data pipeline is simple and direct because there's one database shared by all four experiences.

### Proven: Design Cohesion Across All Four Brands

The velvet-grit aesthetic — warm darks, amber accents, Playfair Display + DM Sans — reads as a coherent system while leaving room for each brand to have a distinct personality. Touring feels expansive. Magazine feels editorial. Radio feels sonic. HQ feels operational. The design tokens in Section 6 encode all of this.

### Proven: The Weekly Operations Cadence

The prototype surfaced the operational rhythm: weekly newsletter prep in the newsletter builder, ongoing article drafting in the magazine CMS, playlist curation in the radio admin, event scheduling for Blues Room sessions. All of this is directly supported by the admin architecture in Section 5.

---

### What Elijah Should Trust (Do Not Re-Litigate)

The following decisions were made through prototype validation and are final:

| Decision | Status |
|---|---|
| Prisma schema (all 6 models) | Final — implement as-is |
| Hostname middleware routing pattern | Final — extend for local dev |
| CSS design tokens | Final — encode in `packages/config` |
| Page routes per domain | Final — implement in route groups |
| Firebase App Hosting as deployment target | Final — continue, don't migrate |
| PostgreSQL via Supabase | Final — replace prototype SQLite |
| NextAuth.js with Google OAuth | Final — implement in Phase 2 |

---

### Sprint 1 Checklist

Elijah should be able to start Sprint 1 immediately with this document. Suggested first sprint tasks:

- [ ] Run `git log --all -p -- apphosting.yaml` and identify all exposed secrets
- [ ] Rotate all exposed secrets (blockers for everything else)
- [ ] Initialize Turborepo in `velvet-grit` root
- [ ] Create `packages/database` with Prisma schema
- [ ] Create Supabase project, add `DATABASE_URL` to Firebase Secret Manager
- [ ] Run `npx prisma migrate deploy` against Supabase
- [ ] Wire up `middleware.ts` for hostname routing
- [ ] Test all 4 hostnames locally via `/etc/hosts`
- [ ] Port Touring homepage (first public-facing page)
- [ ] Port HQ dashboard + articles CRUD (first admin functionality)
- [ ] Deploy to Firebase, confirm all 4 domains routing correctly

---

*Document prepared by Chase Pierson for Elijah Tuttle — Tuthill Design*
*Big Muddy Touring — Natchez, Mississippi*
*March 2, 2026*
