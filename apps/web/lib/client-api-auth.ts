// B2B client API access: admin allowlist OR authenticated user whose email matches
// the Client record's contactEmail / email (User has no clientId FK in schema today).

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * For mutating routes under /api/clients/[id]/...
 * - null = authorized
 * - NextResponse = return this immediately
 */
export async function requireAdminOrClientContact(clientId: number): Promise<NextResponse | null> {
  // requireAdmin: null = caller is admin
  const notAdmin = await requireAdmin();
  if (notAdmin === null) {
    return null;
  }

  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const row = await (prisma as any).client.findUnique({
    where: { id: clientId },
    select: { id: true, contactEmail: true, email: true },
  });

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const sessionEmail = session.user.email.trim().toLowerCase();
  const allowed = [row.contactEmail, row.email]
    .filter(Boolean)
    .map((e: string) => String(e).trim().toLowerCase());

  if (allowed.some((e) => e === sessionEmail)) {
    return null;
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
