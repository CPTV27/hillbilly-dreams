// apps/web/app/api/booking/tickets/scan/route.ts
// POST — validate a ticket QR code at the door. Marks the ticket as used.
// Returns 422 if ticket already used / refunded / void.
// Caller should be authenticated (door staff) — admin-gated for now.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { tickets } from '@bigmuddy/booking';

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  let body: { ticketCode: string; scannedBy?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.ticketCode) {
    return NextResponse.json({ error: 'ticketCode is required' }, { status: 400 });
  }

  try {
    const ticket = await tickets.scan(body.ticketCode, body.scannedBy);
    return NextResponse.json({ data: ticket });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Scan failed';
    // 422 for application-level rejections (used / refunded / void / not found)
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
