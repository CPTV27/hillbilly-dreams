export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/marketplace/seed-topology
 * Idempotent seed: BusinessProfile → Vendor → MarketplaceStore → AffiliateProgram
 * per BC-10 / #54. Admin-only. Safe to run multiple times (find-or-create).
 */

import { NextResponse } from 'next/server';
import type { Prisma } from '@bigmuddy/database';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { apiLog } from '@/lib/api-logger';

type TopologyRow = {
  namespace: string;
  profileName: string;
  city: string;
  state: string;
  address?: string;
  lat?: number;
  lng?: number;
  vendorName: string;
  storeName: string;
  storeDescription: string;
  commissionRate: number;
  hoursJson?: Prisma.InputJsonValue;
  mapData?: Prisma.InputJsonValue;
};

/** Aligns with `/admin/business/[slug]` SLUG_MAP name filters + DSD hub. */
const TOPOLOGY: TopologyRow[] = [
  {
    namespace: 'DEEP_SOUTH_DIRECTORY',
    profileName: 'Deep South Directory — Natchez hub',
    city: 'Natchez',
    state: 'MS',
    address: 'Main Street',
    lat: 31.5604,
    lng: -91.4032,
    vendorName: 'Deep South Directory Platform',
    storeName: 'DSD Local Picks',
    storeDescription:
      'Sovereign marketplace topology for Deep South Directory merchants — local ownership, no absentee checkout rail.',
    commissionRate: 0.12,
    hoursJson: { note: 'Tiered merchant hours — replace per listing' } as Prisma.InputJsonValue,
    mapData: { region: 'Deep South', hub: 'Natchez' } as Prisma.InputJsonValue,
  },
  {
    namespace: 'BEARSVILLE_CREATIVE',
    profileName: 'Tuthill Design',
    city: 'Woodstock',
    state: 'NY',
    address: 'Bearsville, NY',
    vendorName: 'Bearsville Creative Platform',
    storeName: 'Tuthill Design shop',
    storeDescription: 'Industrial design + build — Bearsville node.',
    commissionRate: 0.15,
  },
  {
    namespace: 'BEARSVILLE_CREATIVE',
    profileName: 'Studio C Video — Utopia Studios',
    city: 'Bearsville',
    state: 'NY',
    address: 'Utopia Studios, Bearsville, NY',
    vendorName: 'Bearsville Creative Platform',
    storeName: 'Studio C production store',
    storeDescription: 'Video production and session rail at Utopia Studios (Bearsville, NY).',
    commissionRate: 0.15,
  },
  {
    namespace: 'BEARSVILLE_CREATIVE',
    profileName: 'Bearsville Media Group',
    city: 'Woodstock',
    state: 'NY',
    vendorName: 'Bearsville Creative Platform',
    storeName: 'Bearsville Media shop',
    storeDescription: 'Creative + media bundles for the Bearsville ecosystem.',
    commissionRate: 0.15,
  },
  {
    namespace: 'BEARSVILLE_CREATIVE',
    profileName: 'Utopia Studios',
    city: 'Bearsville',
    state: 'NY',
    address: 'Utopia Studios, Bearsville, NY',
    vendorName: 'Bearsville Creative Platform',
    storeName: 'Utopia session rail',
    storeDescription: 'Session and rehearsal commerce tied to the Utopia room.',
    commissionRate: 0.12,
  },
];

export async function POST() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const created = { profiles: 0, vendors: 0, stores: 0, affiliates: 0 };
  const existing = { profiles: 0, vendors: 0, stores: 0, affiliates: 0 };

  try {
    const vendorByNs = new Map<string, { id: string }>();

    for (const row of TOPOLOGY) {
      let vendor = vendorByNs.get(row.namespace);
      if (!vendor) {
        const foundV = await prisma.vendor.findFirst({
          where: { namespace: row.namespace, name: row.vendorName },
        });
        if (foundV) {
          vendor = { id: foundV.id };
          existing.vendors++;
        } else {
          const v = await prisma.vendor.create({
            data: {
              namespace: row.namespace,
              name: row.vendorName,
              bio: `Platform vendor for ${row.namespace}`,
              payoutInfo: { type: 'platform', namespace: row.namespace },
            },
          });
          vendor = { id: v.id };
          created.vendors++;
        }
        vendorByNs.set(row.namespace, vendor);
      }

      let profile = await prisma.businessProfile.findFirst({
        where: { namespace: row.namespace, name: row.profileName },
      });
      if (!profile) {
        profile = await prisma.businessProfile.create({
          data: {
            namespace: row.namespace,
            name: row.profileName,
            address: row.address ?? null,
            city: row.city,
            state: row.state,
            lat: row.lat ?? null,
            lng: row.lng ?? null,
            hoursJson: row.hoursJson ?? undefined,
            mapData:
              row.mapData ??
              ({ seeded: true, namespace: row.namespace } as Prisma.InputJsonValue),
          },
        });
        created.profiles++;
      } else {
        existing.profiles++;
      }

      let store = await prisma.marketplaceStore.findFirst({
        where: { vendorId: vendor.id, businessProfileId: profile.id },
      });
      if (!store) {
        store = await prisma.marketplaceStore.create({
          data: {
            namespace: row.namespace,
            name: row.storeName,
            vendorId: vendor.id,
            businessProfileId: profile.id,
            description: row.storeDescription,
          },
        });
        created.stores++;
      } else {
        existing.stores++;
      }

      const aff = await prisma.affiliateProgram.findUnique({
        where: { storeId: store.id },
      });
      if (!aff) {
        await prisma.affiliateProgram.create({
          data: {
            storeId: store.id,
            commissionRate: row.commissionRate,
            terms: 'Seeded default commission — replace with executed partner agreement.',
          },
        });
        created.affiliates++;
      } else {
        existing.affiliates++;
      }
    }

    return NextResponse.json({
      ok: true,
      created,
      existing,
      rows: TOPOLOGY.length,
    });
  } catch (e) {
    apiLog.error('POST /api/admin/marketplace/seed-topology', 'failed', e);
    return NextResponse.json({ ok: false, error: 'seed_failed' }, { status: 500 });
  }
}
