export const dynamic = 'force-dynamic';

// GET /api/admin/marketplace — List BusinessProfile + MarketplaceStore + Vendor records
// POST /api/admin/marketplace — Create a vendor + store + business profile in one shot

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(_request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const [profiles, stores, vendors] = await Promise.all([
      prisma.businessProfile.findMany({
        orderBy: { name: 'asc' },
        include: { store: true },
      }),
      prisma.marketplaceStore.findMany({
        orderBy: { name: 'asc' },
        include: {
          vendor: true,
          businessProfile: true,
          supplies: { take: 10, orderBy: { createdAt: 'desc' } },
        },
      }),
      prisma.vendor.findMany({
        orderBy: { name: 'asc' },
        include: { stores: { select: { id: true, name: true } } },
      }),
    ]);

    return NextResponse.json({ profiles, stores, vendors });
  } catch (err) {
    console.error('[GET /api/admin/marketplace]', err);
    return NextResponse.json({ profiles: [], stores: [], vendors: [] });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { vendorName, storeName, namespace, address, city, state, description } = body;

    if (!vendorName || !storeName || !namespace) {
      return NextResponse.json({ error: 'vendorName, storeName, and namespace required' }, { status: 400 });
    }

    // Create vendor, business profile, and store in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const vendor = await tx.vendor.create({
        data: { namespace, name: vendorName },
      });

      const profile = await tx.businessProfile.create({
        data: {
          namespace,
          name: storeName,
          address: address || null,
          city: city || null,
          state: state || null,
        },
      });

      const store = await tx.marketplaceStore.create({
        data: {
          namespace,
          name: storeName,
          vendorId: vendor.id,
          businessProfileId: profile.id,
          description: description || null,
        },
      });

      return { vendor, profile, store };
    });

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/admin/marketplace]', err);
    return NextResponse.json({ error: 'Failed to create marketplace entry' }, { status: 500 });
  }
}
