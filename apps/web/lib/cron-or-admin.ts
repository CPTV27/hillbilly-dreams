// Shared guard: Vercel Cron / schedulers use Authorization: Bearer ${CRON_SECRET};
// interactive callers use an admin session (see config/auth-rules).

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * Returns null if authorized (cron bearer in prod, or admin session).
 * In development, CRON_SECRET is often unset — only admin session is accepted unless you export CRON_SECRET locally.
 */
export async function requireCronOrAdmin(request: NextRequest): Promise<NextResponse | null> {
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.CRON_SECRET &&
    authHeader === `Bearer ${process.env.CRON_SECRET}`
  ) {
    return null;
  }
  return requireAdmin();
}
