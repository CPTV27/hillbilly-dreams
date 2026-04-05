export const dynamic = 'force-dynamic';

/**
 * GET /api/directory/map-points — public pins for Deep South Directory map (active + geocoded).
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { apiLog } from '@/lib/api-logger';

export type MapPoint = {
  id: number;
  name: string;
  slug: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
};

export async function GET() {
  try {
    const rows = await prisma.directoryBusiness.findMany({
      where: {
        active: true,
        lat: { not: null },
        lng: { not: null },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        lat: true,
        lng: true,
        city: true,
        state: true,
      },
      take: 2000,
    });

    const businesses: MapPoint[] = rows
      .filter((r): r is typeof r & { lat: number; lng: number } => r.lat != null && r.lng != null)
      .map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        lat: r.lat,
        lng: r.lng,
        city: r.city,
        state: r.state,
      }));

    return NextResponse.json({ businesses });
  } catch (e) {
    apiLog.error('GET /api/directory/map-points', 'failed', e);
    return NextResponse.json({ businesses: [] as MapPoint[], error: 'map_data_unavailable' }, { status: 500 });
  }
}
