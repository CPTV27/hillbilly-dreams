export const dynamic = 'force-dynamic';

/**
 * GET /api/studio-c/sessions/:id/portal
 * Link-based client view — no auth. Excludes internal `notes`.
 * Share only with clients who have the session id (opaque cuid).
 */

import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { apiLog } from '@/lib/api-logger';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, ctx: Params) {
  const { id } = await ctx.params;

  try {
    const row = await prisma.studioCRequest.findUnique({ where: { id } });
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        id: row.id,
        clientBrand: row.clientBrand,
        requestType: row.requestType,
        brief: row.brief,
        location: row.location,
        preferredDate: row.preferredDate?.toISOString() ?? null,
        status: row.status,
        assignedTo: row.assignedTo,
        budget: row.budget,
        callSheet: row.callSheet,
        updatedAt: row.updatedAt.toISOString(),
      },
    });
  } catch (err) {
    apiLog.error('GET /api/studio-c/sessions/:id/portal', 'portal_failed', err);
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 });
  }
}
