export const dynamic = 'force-dynamic';
// apps/web/app/api/snap/claim/route.ts
// POST /api/snap/claim — records a photo claim from a gallery visitor.
//
// Accepts:
//   { photoId: string, name?: string, email?: string, instagram?: string, shared?: boolean }
//
// To connect to real DB, replace the stub with:
//
//   import { prisma } from '@/lib/prisma';
//
//   const claim = await prisma.photoClaim.create({
//     data: {
//       photoId: body.photoId,
//       name:      body.name      ?? null,
//       email:     body.email     ?? null,
//       instagram: body.instagram ?? null,
//       shared:    body.shared    ?? false,
//       printOrder: body.printOrder ?? false,
//     },
//   });
//
//   // Optionally increment shareCount on the photo
//   if (body.shared) {
//     await prisma.photo.update({
//       where: { id: body.photoId },
//       data: { shareCount: { increment: 1 } },
//     });
//   }
//
//   return NextResponse.json({ success: true, claimId: claim.id });

import { NextResponse } from 'next/server';

// ─── Request body type ────────────────────────────────────────
interface ClaimBody {
  photoId: string;
  name?: string;
  email?: string;
  instagram?: string;
  shared?: boolean;
  printOrder?: boolean;
}

// ─── POST handler ─────────────────────────────────────────────
export async function POST(request: Request) {
  let body: ClaimBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.photoId) {
    return NextResponse.json({ error: 'photoId is required' }, { status: 422 });
  }

  // ── Stub: log and return success ──
  // Remove this block and replace with Prisma query above when DB is ready
  console.info('[snap/claim] Received claim:', {
    photoId:    body.photoId,
    name:       body.name       ?? null,
    email:      body.email      ?? null,
    instagram:  body.instagram  ?? null,
    shared:     body.shared     ?? false,
    printOrder: body.printOrder ?? false,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    message: 'Claim recorded. Check your inbox for your high-res download.',
    // claimId: claim.id  // uncomment when real DB is wired
  });
}
