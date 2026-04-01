export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { runSessionSummary } from './run';

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return runSessionSummary();
}
