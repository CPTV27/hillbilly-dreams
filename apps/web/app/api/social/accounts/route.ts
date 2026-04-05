export const dynamic = 'force-dynamic';

/**
 * GET /api/social/accounts
 * Lists SocialAccount rows from the database (native publisher).
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const rows = await prisma.socialAccount.findMany({
      where: { status: 'active' },
      orderBy: [{ platform: 'asc' }, { handle: 'asc' }],
      select: {
        id: true,
        platform: true,
        handle: true,
        brand: true,
        platformId: true,
        tokenExpiry: true,
      },
    });

    const integrations = rows.map((a) => ({
      id: a.id,
      name: `${a.platform} · ${a.handle}`,
      provider: a.platform,
      handle: a.handle,
      hasPageId: Boolean(a.platformId),
    }));

    return NextResponse.json({ success: true, integrations });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to list accounts' }, { status: 500 });
  }
}
