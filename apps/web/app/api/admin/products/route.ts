export const dynamic = 'force-dynamic';

// GET /api/admin/products — List bundles with their features
// PATCH /api/admin/products — Toggle feature in bundle, update pricing

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(_request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const [bundles, features] = await Promise.all([
      prisma.productBundle.findMany({
        orderBy: { sortOrder: 'asc' },
        include: {
          features: {
            include: { feature: true },
            orderBy: { feature: { sortOrder: 'asc' } },
          },
        },
      }),
      prisma.productFeature.findMany({
        orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
      }),
    ]);

    return NextResponse.json({ bundles, features });
  } catch (err) {
    console.error('[GET /api/admin/products]', err);
    return NextResponse.json({ bundles: [], features: [] });
  }
}

export async function PATCH(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'toggle-feature') {
      // Toggle a feature in a bundle
      const { bundleId, featureId, enabled, limit } = body;
      if (!bundleId || !featureId) {
        return NextResponse.json({ error: 'bundleId and featureId required' }, { status: 400 });
      }

      if (enabled) {
        await prisma.bundleFeature.upsert({
          where: { bundleId_featureId: { bundleId, featureId } },
          create: { bundleId, featureId, limit: limit || null },
          update: { limit: limit || null },
        });
      } else {
        await prisma.bundleFeature.deleteMany({
          where: { bundleId, featureId },
        });
      }

      return NextResponse.json({ success: true });
    }

    if (action === 'update-bundle') {
      const { bundleId, priceMonthly, isActive } = body;
      if (!bundleId) return NextResponse.json({ error: 'bundleId required' }, { status: 400 });

      const data: Record<string, unknown> = {};
      if (priceMonthly !== undefined) data.priceMonthly = priceMonthly === null ? null : parseInt(priceMonthly, 10);
      if (isActive !== undefined) data.isActive = Boolean(isActive);

      await prisma.productBundle.update({ where: { id: bundleId }, data });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    console.error('[PATCH /api/admin/products]', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
