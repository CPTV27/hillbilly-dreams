# Directory Ingestion Pipeline

How research becomes database rows. End to end.

---

## The Flow

```
┌─────────────────────┐
│  1. RESEARCH        │  Claude research agent (or human) populates a YAML file
│     AGENT           │  using one of the templates. Cites sources. Flags gaps.
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  2. STAGING         │  File lands in data/directory/staging/{category}/{slug}.yaml
│     data/staging/   │  Git-tracked. Human-readable. Reviewable as a diff.
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  3. REVIEW          │  Human (or reviewing agent) opens the YAML:
│     (human/agent)   │    - Sanity-checks required fields
│                     │    - Calls venues with [verify] gaps
│                     │    - Moves to data/directory/approved/{category}/ when ready
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  4. INGESTION       │  pnpm tsx scripts/directory-ingest.ts --category=venue
│     script          │    - Reads approved YAMLs
│                     │    - Validates against Zod schema
│                     │    - Upserts to Prisma (DirectoryBusiness + metadata JSON)
│                     │    - Moves ingested files to data/directory/ingested/
│                     │    - Logs errors to data/directory/ingest-errors.log
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  5. LIVE            │  Row is in Prisma. Visible in /admin/directory.
│     database        │  Public-facing pages query it. The Catalog exposes it.
└─────────────────────┘
```

---

## Directory Layout

```
hillbilly-dreams/
├── docs/directory-templates/              ← the YAML templates (schema spec)
│   ├── venue.template.yaml
│   ├── musician.template.yaml
│   ├── press.template.yaml
│   ├── studio.template.yaml
│   ├── label.template.yaml
│   ├── festival.template.yaml
│   ├── README.md
│   └── INGESTION-PLAN.md                  ← this file
│
├── data/directory/
│   ├── staging/                            ← freshly researched, awaiting review
│   │   ├── venue/
│   │   │   ├── ground-zero-clarksdale.yaml
│   │   │   └── ...
│   │   ├── musician/
│   │   ├── press/
│   │   ├── studio/
│   │   ├── label/
│   │   └── festival/
│   │
│   ├── approved/                           ← reviewed, ready to ingest
│   │   └── {category}/
│   │
│   ├── ingested/                           ← already written to Prisma
│   │   └── {category}/
│   │
│   ├── rejected/                           ← dupes, bad data, out of scope
│   │   └── {category}/
│   │
│   └── ingest-errors.log                   ← any validation failures
│
├── scripts/
│   ├── directory-ingest.ts                 ← the ingestion script (build this)
│   └── directory-research.ts               ← batch research runner (build this)
│
└── apps/web/app/admin/directory/           ← internal review UI (build this)
```

---

## Prisma Schema

We extend the existing `DirectoryBusiness` model with a JSON `metadata` field rather than adding 60 new columns.

```prisma
model DirectoryBusiness {
  id             String   @id @default(cuid())
  slug           String   @unique
  name           String
  category       String   // "venue" | "musician" | "press" | "studio" | "label" | "festival"
  city           String?
  state          String?
  website        String?
  phone          String?
  email          String?

  // The full template data lives here, typed per category in TypeScript
  metadata       Json

  // Operational
  status         String   @default("active")  // "active" | "dormant" | "closed"
  confidence     String?  // "high" | "medium" | "low"
  lastVerifiedAt DateTime?

  // Relationship tracking
  ourRelationship String? // "never" | "cold" | "warm" | "partner" | "booked-us"
  lastContacted   DateTime?

  // Sources
  sources        Json?     // Array of {url, description}

  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  @@index([category, state])
  @@index([slug])
}
```

The `metadata` JSON column holds the full typed structure from each category template. Type safety on the TypeScript side via Zod schemas.

---

## Validation Schemas

We generate Zod schemas from the YAML templates. One per category:

```ts
// apps/web/lib/directory/schemas/venue.ts
import { z } from 'zod';

export const VenueSchema = z.object({
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  address: z.object({
    street: z.string(),
    city: z.string().min(1),
    state: z.string().length(2),
    zip: z.string().optional(),
    lat: z.number().nullable(),
    lng: z.number().nullable(),
  }),
  capacity: z.object({
    standing: z.number().int().positive(),
    tier: z.enum(['<100', '100-300', '300-1000', '1000+']),
  }),
  technical: z.object({
    pa_system: z.object({
      has_pa: z.boolean(),
      brand_and_model: z.string().optional(),
      // ... etc
    }),
    // ... etc
  }),
  // ... etc
});
export type Venue = z.infer<typeof VenueSchema>;
```

---

## The Ingestion Script

```ts
// scripts/directory-ingest.ts
import { readdir, readFile, rename } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { prisma } from '@bigmuddy/database';
import { VenueSchema, MusicianSchema, PressSchema /* ... */ } from '@bigmuddy/web/lib/directory/schemas';

const SCHEMAS = {
  venue: VenueSchema,
  musician: MusicianSchema,
  press: PressSchema,
  studio: StudioSchema,
  label: LabelSchema,
  festival: FestivalSchema,
};

async function main() {
  const category = getArg('--category'); // e.g., "venue"
  const source = getArg('--source') || 'approved';

  const dir = `data/directory/${source}/${category}/`;
  const files = await readdir(dir);

  const schema = SCHEMAS[category];
  if (!schema) throw new Error(`Unknown category: ${category}`);

  for (const file of files.filter(f => f.endsWith('.yaml'))) {
    try {
      const raw = await readFile(join(dir, file), 'utf8');
      const parsed = parse(raw);
      const validated = schema.parse(parsed);

      await prisma.directoryBusiness.upsert({
        where: { slug: validated.slug },
        update: {
          name: validated.name,
          city: validated.address?.city,
          state: validated.address?.state,
          website: validated.general_contact?.website,
          email: validated.booking_contact?.email,
          phone: validated.booking_contact?.phone,
          metadata: validated,
          sources: validated.research?.sources ?? [],
          confidence: validated.research?.confidence,
          category,
        },
        create: {
          slug: validated.slug,
          name: validated.name,
          category,
          city: validated.address?.city,
          state: validated.address?.state,
          website: validated.general_contact?.website,
          email: validated.booking_contact?.email,
          phone: validated.booking_contact?.phone,
          metadata: validated,
          sources: validated.research?.sources ?? [],
          confidence: validated.research?.confidence,
        },
      });

      // Move to ingested/
      await rename(
        join(dir, file),
        join(`data/directory/ingested/${category}/`, file),
      );

      console.log(`✓ Ingested ${category}/${validated.slug}`);
    } catch (err) {
      console.error(`✗ Failed ${file}:`, err.message);
      await appendError(file, err);
    }
  }
}
```

Run it:
```bash
pnpm tsx scripts/directory-ingest.ts --category=venue
pnpm tsx scripts/directory-ingest.ts --category=musician
# etc.
```

---

## Human Review Interface

Build at `apps/web/app/admin/directory/review/page.tsx`. Shows the queue of staging records. For each record:
- Renders the YAML as a nice form
- Shows sources with clickable links
- Shows confidence score + gaps to resolve
- Provides buttons: **Approve** (moves to approved/), **Reject** (moves to rejected/), **Needs More Research** (sends back to agent with notes)

Out of scope for Week 1 — we can review YAMLs directly in VS Code while the UI gets built.

---

## Deduplication

Before ingesting, the script checks:
1. Does `slug` already exist in Prisma? → upsert (don't duplicate)
2. Do we have a venue at this exact address already? → flag for human review
3. Does the business name fuzzy-match an existing record? → flag for human review

Dedup logic lives in `scripts/directory-dedup.ts`.

---

## Re-verification Schedule

Every record has `lastVerifiedAt`. The Catalog's health dashboard highlights records older than:
- 90 days → "aging"
- 180 days → "needs refresh"
- 365 days → "stale — re-verify or archive"

A weekly cron job generates a re-verification queue: "These 12 records need to be re-checked this week."

---

## Starting Volume Targets

| Category | Y1 Target | Y2 Target | Source |
|---|---|---|---|
| Venues | 150 | 400 | Perplexity research + phone verification |
| Musicians | 100 | 500 | QR onboarding + research agent |
| Press | 75 | 150 | Targeted outreach + research |
| Studios | 30 | 50 | Mostly research |
| Labels | 25 | 40 | Mostly research |
| Festivals | 40 | 60 | Mostly research |
| **Total** | **420** | **1,200** | |

---

## Next Steps

1. **Build the Prisma migration** — add `metadata Json`, `confidence`, `sources`, `lastVerifiedAt` fields to `DirectoryBusiness`.
2. **Generate the Zod schemas** — one per template.
3. **Write `scripts/directory-ingest.ts`** — the ingestion script above.
4. **Spin up the dedicated research agent** — see `.claude/agents/directory-researcher.md`.
5. **Seed with 5 test venues** — run the full pipeline end-to-end before scaling.
