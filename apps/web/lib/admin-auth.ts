// apps/web/lib/admin-auth.ts
// Shared auth guard for /api/admin/* route handlers.
// Middleware skips /api routes, so API-level auth must be checked here.

import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const ALLOWED_EMAILS = [
  'me@chasepierson.tv',
  'chase@scan2plan.io',
  'chase@scantoplan.io',
  'tracy@thebigmuddyinn.com',
  'amy@thebigmuddyinn.com',
];

/**
 * Verify the caller has an active admin session.
 * Returns null if authorized, or a NextResponse (401/403) to return immediately.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!ALLOWED_EMAILS.includes(session.user.email.toLowerCase())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null; // authorized
}
