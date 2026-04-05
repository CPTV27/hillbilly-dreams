export const dynamic = 'force-dynamic';

// GET /api/studio-c/jobs — List all Studio C requests (admin job queue)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { apiLog } from '@/lib/api-logger';

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const brand = searchParams.get('brand');

  try {
    const where: Record<string, unknown> = {};
    if (status && status !== 'all') where.status = status;
    if (brand && brand !== 'all') where.clientBrand = brand;

    const jobs = await prisma.studioCRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    const serialized = jobs.map(j => ({
      ...j,
      preferredDate: j.preferredDate?.toISOString() || null,
      createdAt: j.createdAt.toISOString(),
      updatedAt: j.updatedAt.toISOString(),
    }));

    return NextResponse.json({ data: serialized });
  } catch (err) {
    apiLog.error('GET /api/studio-c/jobs', 'list_failed', err);
    return NextResponse.json({ data: [] });
  }
}
