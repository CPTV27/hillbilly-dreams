// apps/web/app/api/booking/resources/route.ts
// GET — list bookable resources (Blues Room shows, service slots, event windows).
// Public endpoint — used by show calendars and listing pages.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { resources } from '@bigmuddy/booking';
import type { TenantId, ResourceType } from '@bigmuddy/booking';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tenantId = (searchParams.get('tenantId') ?? undefined) as TenantId | undefined;
  const type = (searchParams.get('type') ?? undefined) as ResourceType | undefined;
  const upcomingOnly = searchParams.get('upcomingOnly') === 'true';

  try {
    const list = await resources.list({ tenantId, type, upcomingOnly });
    return NextResponse.json({ data: list });
  } catch (err) {
    console.error('[GET /api/booking/resources]', err);
    const message = err instanceof Error ? err.message : 'List failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
