// apps/web/app/snap/[code]/page.tsx
// Server component wrapper — handles metadata + data fetching.
// Passes session data down to the client gallery.
//
// Usage: /snap/blues-room-mar-15
//
// To connect to the DB: replace DEMO_SESSION with a real Prisma query.
// The client gallery (SnapGallery) is typed to SessionData — no changes needed there.

import type { Metadata } from 'next';
import { SnapGallery } from './SnapGallery';

// ─── Types (shared with SnapGallery) ─────────────────────────
export interface PhotoData {
  id: string;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  sortOrder: number;
  shareCount: number;
}

export interface SessionData {
  id: string;
  code: string;
  name: string;
  location: string;
  date: string; // ISO string
  description?: string;
  coverImage?: string;
  status: string;
  photos: PhotoData[];
  totalShares: number;
}

// ─── Demo Data (swap for Prisma query when migration runs) ───
// Replace with:
//   const session = await prisma.photoSession.findUnique({
//     where: { code: params.code },
//     include: {
//       photos: { where: { status: 'visible' }, orderBy: { sortOrder: 'asc' } },
//     },
//   });
//   if (!session) notFound();
const DEMO_SESSION: SessionData = {
  id: 'demo-session-001',
  code: 'blues-room-mar-15',
  name: 'Blues Room — March 15, 2026',
  location: 'The Big Muddy Inn · Natchez, Mississippi',
  date: '2026-03-15T20:00:00',
  description:
    'A Friday night in the Blues Room. Arri B. Aslin, 50 seats, zero pretense. These are the real moments.',
  status: 'active',
  totalShares: 47,
  photos: [
    { id: 'p1', url: '/images/inn/blues-room-stage.webp',   thumbnailUrl: '/images/inn/blues-room-stage.webp',   caption: 'Arri B. Aslin takes the stage',            sortOrder: 0, shareCount: 12 },
    { id: 'p2', url: '/images/inn/blues-room-crowd.webp',   thumbnailUrl: '/images/inn/blues-room-crowd.webp',   caption: 'Friday night crowd',                       sortOrder: 1, shareCount: 8  },
    { id: 'p3', url: '/images/inn/arri-performance.webp',   thumbnailUrl: '/images/inn/arri-performance.webp',   caption: 'Deep in the second set',                   sortOrder: 2, shareCount: 15 },
    { id: 'p4', url: '/images/inn/natchez-river.webp',      thumbnailUrl: '/images/inn/natchez-river.webp',      caption: 'The Mississippi at dusk',                  sortOrder: 3, shareCount: 6  },
    { id: 'p5', url: '/images/inn/suite-muddy-waters.webp', thumbnailUrl: '/images/inn/suite-muddy-waters.webp', caption: 'The Muddy Waters Suite',                   sortOrder: 4, shareCount: 3  },
    { id: 'p6', url: '/images/inn/natchez-food.webp',       thumbnailUrl: '/images/inn/natchez-food.webp',       caption: 'Late-night spread',                        sortOrder: 5, shareCount: 4  },
    { id: 'p7', url: '/images/inn/natchez-downtown.webp',   thumbnailUrl: '/images/inn/natchez-downtown.webp',   caption: 'Commerce Street after midnight',            sortOrder: 6, shareCount: 2  },
    { id: 'p8', url: '/images/inn/big-muddy-exterior.webp', thumbnailUrl: '/images/inn/big-muddy-exterior.webp', caption: '411 North Commerce — the whole operation',  sortOrder: 7, shareCount: 7  },
  ],
};

// ─── Metadata ────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  // Swap for real Prisma query when ready
  const session: SessionData = DEMO_SESSION;
  void params; // params.code would be used in real query

  const title = `${session.name} — Big Muddy Entertainment Photos`;
  const description = session.description
    ?? `Photos from ${session.name} at ${session.location}. Tap your photo to share or request a high-res copy.`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: 'Big Muddy Entertainment',
      images: session.coverImage
        ? [{ url: session.coverImage, width: 1200, height: 630, alt: session.name }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────
export default function SnapGalleryPage({ params }: { params: { code: string } }) {
  // Swap for real Prisma query when ready
  const session: SessionData = DEMO_SESSION;
  void params;

  return <SnapGallery session={session} />;
}
