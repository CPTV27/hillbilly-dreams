// apps/web/lib/admin-auth.ts
// Shared auth guard for /api/admin/* route handlers.
// Middleware skips /api routes, so API-level auth must be checked here.

import { auth } from '@/auth';
import { NextResponse } from 'next/server';

// Domains that get full access (any user @ these domains)
const ALLOWED_DOMAINS = [
  'chasepierson.tv',
];

// Individual emails that get full access
const ALLOWED_EMAILS = [
  'chase@scan2plan.io',
  'chase@scantoplan.io',
  'tracy@thebigmuddyinn.com',
  'amy@thebigmuddyinn.com',
  'info@studio.c.video',
  'miles@studio.c.video',
  'elijah@studio.c.video',
];

function isAllowedUser(email: string | null | undefined): boolean {
  if (!email) return false;
  const lower = email.toLowerCase();
  const domain = lower.split('@')[1];
  return ALLOWED_DOMAINS.includes(domain) || ALLOWED_EMAILS.includes(lower);
}

/**
 * Verify the caller has an active admin session.
 * Returns null if authorized, or a NextResponse (401/403) to return immediately.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAllowedUser(session.user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null; // authorized
}
