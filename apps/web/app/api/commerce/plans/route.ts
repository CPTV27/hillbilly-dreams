// apps/web/app/api/commerce/plans/route.ts
// GET — list active plans, optionally filtered by tenantId/brand. Public.
// POST — create a new plan. Admin-gated.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { plans } from '@bigmuddy/commerce';
import type { TenantId, BrandId, PlanInterval } from '@bigmuddy/commerce';

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

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  let body: {
    tenantId: TenantId;
    brand: BrandId;
    slug: string;
    name: string;
    description: string;
    priceCents: number;
    currency?: string;
    interval: PlanInterval;
    intervalCount?: number;
    trialDays?: number;
    features: string[];
    metadata?: Record<string, unknown>;
    platformFeePercent?: number;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (
    !body.tenantId ||
    !body.brand ||
    !body.slug ||
    !body.name ||
    !body.description ||
    body.priceCents == null ||
    !body.interval
  ) {
    return NextResponse.json(
      {
        error:
          'tenantId, brand, slug, name, description, priceCents, interval required',
      },
      { status: 400 }
    );
  }

  if (body.priceCents < 0) {
    return NextResponse.json(
      { error: 'priceCents must be >= 0' },
      { status: 400 }
    );
  }

  try {
    const plan = await plans.create({
      tenantId: body.tenantId,
      brand: body.brand,
      slug: body.slug,
      name: body.name,
      description: body.description,
      priceCents: body.priceCents,
      currency: body.currency,
      interval: body.interval,
      intervalCount: body.intervalCount,
      trialDays: body.trialDays,
      features: body.features ?? [],
      metadata: body.metadata,
      platformFeePercent: body.platformFeePercent,
    });
    return NextResponse.json({ data: plan });
  } catch (err) {
    console.error('[POST /api/commerce/plans]', err);
    const message = err instanceof Error ? err.message : 'Plan creation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
