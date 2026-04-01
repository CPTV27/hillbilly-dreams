export const dynamic = 'force-dynamic';
// apps/web/app/api/snap/[code]/route.ts
// GET /api/snap/:code — returns session data with photos.
//
// To connect to real DB, replace the DEMO_SESSIONS block with:
//
//   import { prisma } from '@/lib/prisma';
//
//   const session = await prisma.photoSession.findUnique({
//     where: { code: params.code },
//     include: {
//       photos: {
//         where: { status: 'visible' },
//         orderBy: { sortOrder: 'asc' },
//       },
//     },
//   });
//   if (!session) return NextResponse.json({ error: 'Not found' }, { status: 404 });
//   const totalShares = session.photos.reduce((acc, p) => acc + p.shareCount, 0);
//   return NextResponse.json({ data: { ...session, totalShares } });

import { NextResponse } from 'next/server';

// ─── Demo data store ──────────────────────────────────────────
const DEMO_SESSIONS: Record<string, object> = {
  'blues-room-mar-15': {
    id: 'demo-session-001',
    code: 'blues-room-mar-15',
    name: 'Blues Room — March 15, 2026',
    location: 'The Big Muddy Inn · Natchez, Mississippi',
    date: '2026-03-15T20:00:00',
    description: 'A Friday night in the Blues Room. Arrie B. Aslin, 50 seats, zero pretense.',
    status: 'active',
    totalShares: 47,
    photos: [
      { id: 'p1', url: '/images/inn/blues-room-stage.webp',   thumbnailUrl: '/images/inn/blues-room-stage.webp',   caption: 'Arrie B. Aslin takes the stage',            sortOrder: 0, shareCount: 12, status: 'visible' },
      { id: 'p2', url: '/images/inn/blues-room-crowd.webp',   thumbnailUrl: '/images/inn/blues-room-crowd.webp',   caption: 'Friday night crowd',                       sortOrder: 1, shareCount: 8,  status: 'visible' },
      { id: 'p3', url: '/images/inn/arri-performance.webp',   thumbnailUrl: '/images/inn/arri-performance.webp',   caption: 'Deep in the second set',                   sortOrder: 2, shareCount: 15, status: 'visible' },
      { id: 'p4', url: '/images/inn/natchez-river.webp',      thumbnailUrl: '/images/inn/natchez-river.webp',      caption: 'The Mississippi at dusk',                  sortOrder: 3, shareCount: 6,  status: 'visible' },
      { id: 'p5', url: '/images/inn/suite-muddy-waters.webp', thumbnailUrl: '/images/inn/suite-muddy-waters.webp', caption: 'The Muddy Waters Suite',                   sortOrder: 4, shareCount: 3,  status: 'visible' },
      { id: 'p6', url: '/images/inn/natchez-food.webp',       thumbnailUrl: '/images/inn/natchez-food.webp',       caption: 'Late-night spread',                        sortOrder: 5, shareCount: 4,  status: 'visible' },
      { id: 'p7', url: '/images/inn/natchez-downtown.webp',   thumbnailUrl: '/images/inn/natchez-downtown.webp',   caption: 'Commerce Street after midnight',            sortOrder: 6, shareCount: 2,  status: 'visible' },
      { id: 'p8', url: '/images/inn/big-muddy-exterior.webp', thumbnailUrl: '/images/inn/big-muddy-exterior.webp', caption: '411 North Commerce — the whole operation',  sortOrder: 7, shareCount: 7,  status: 'visible' },
    ],
  },
};

// ─── GET handler ──────────────────────────────────────────────
export async function GET(
  _request: Request,
  { params }: { params: { code: string } },
) {
  const { code } = params;

  // ── Swap for real Prisma query here ──
  const session = DEMO_SESSIONS[code];

  if (!session) {
    return NextResponse.json(
      { error: 'Session not found', code },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: session });
}
