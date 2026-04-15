export const dynamic = 'force-dynamic';
// GET /api/directory/search?q= — alias for business search (same behavior as GET /api/directory/claim)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { apiLog } from '@/lib/api-logger';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ data: [] });
  }

  try {
    const clients = await (prisma as any).client.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { city: { contains: q, mode: 'insensitive' } },
        ],
      },
      take: 10,
      orderBy: { name: 'asc' as const },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        state: true,
        businessType: true,
        tier: true,
        status: true,
      },
    });

    return NextResponse.json({ data: clients });
  } catch (e) {
    const msg = String(e);
    if (
      msg.includes('Cannot read properties of undefined') ||
      msg.includes('datasource') ||
      msg.includes('DATABASE_URL') ||
      msg.includes('Cannot find module') ||
      msg.includes('P1001') ||
      msg.includes('does not exist')
    ) {
      return NextResponse.json({ data: [], _source: 'no-db' });
    }
    apiLog.error('GET /api/directory/search', 'search failed', e);
    return NextResponse.json({ error: 'Search failed.' }, { status: 500 });
  }
}
