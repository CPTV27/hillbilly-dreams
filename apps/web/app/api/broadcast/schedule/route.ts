// apps/web/app/api/broadcast/schedule/route.ts
// POST — schedule a new LiveBroadcast. Admin-gated.
// GET — list upcoming broadcasts (public — brand-facing calendar).

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { broadcasts } from '@bigmuddy/broadcast';
import type { Brand, BroadcastStatus } from '@bigmuddy/broadcast';

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  let body: {
    brand: Brand;
    title: string;
    description: string;
    scheduledStart: string;
    scheduledEnd: string;
    platform?: string;
    obsScene?: string;
    cameras?: Array<{ name: string; rtmpKey?: string; position?: string }>;
    hostUserIds?: string[];
    associatedShowId?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.brand || !body.title || !body.scheduledStart || !body.scheduledEnd) {
    return NextResponse.json(
      { error: 'brand, title, scheduledStart, scheduledEnd required' },
      { status: 400 }
    );
  }

  try {
    const broadcast = await broadcasts.schedule({
      ...body,
      scheduledStart: new Date(body.scheduledStart),
      scheduledEnd: new Date(body.scheduledEnd),
    });
    return NextResponse.json({ data: broadcast });
  } catch (err) {
    console.error('[POST /api/broadcast/schedule]', err);
    const message = err instanceof Error ? err.message : 'Schedule failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const brand = (searchParams.get('brand') ?? undefined) as Brand | undefined;
  const status = (searchParams.get('status') ?? undefined) as BroadcastStatus | undefined;
  const upcomingOnly = searchParams.get('upcomingOnly') === 'true';

  try {
    const list = await broadcasts.list({ brand, status, upcomingOnly });
    return NextResponse.json({ data: list });
  } catch (err) {
    console.error('[GET /api/broadcast/schedule]', err);
    const message = err instanceof Error ? err.message : 'List failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
