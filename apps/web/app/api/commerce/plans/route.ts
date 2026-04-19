// apps/web/app/api/commerce/plans/route.ts
// GET — list active plans, optionally filtered by tenantId/brand.
// Public endpoint — used by pricing pages on every brand surface.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { plans } from '@bigmuddy/commerce';
import type { TenantId, BrandId } from '@bigmuddy/commerce';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tenantId = (searchParams.get('tenantId') ?? undefined) as
    | TenantId
    | undefined;
  const brand = (searchParams.get('brand') ?? undefined) as BrandId | undefined;

  try {
    const list = await plans.list({ tenantId, brand });
    return NextResponse.json({ data: list });
  } catch (err) {
    console.error('[GET /api/commerce/plans]', err);
    const message = err instanceof Error ? err.message : 'Failed to list plans';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
