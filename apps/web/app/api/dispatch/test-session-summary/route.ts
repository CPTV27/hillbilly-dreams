export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { runSessionSummary } from '../session-summary/run';

export async function GET() {
  const session = await auth();
  const user = session?.user as any;

  if (!user || !['admin', 'owner'].includes(user.role)) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  return runSessionSummary();
}
