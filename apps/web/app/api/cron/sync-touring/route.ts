export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { syncTouringToDirectory } from '@/lib/touring-to-directory';

// POST /api/cron/sync-touring
// Syncs touring venues, hotels, and restaurants into DirectoryBusiness records.
// Run manually or via Vercel cron.
export async function POST() {
  try {
    const result = await syncTouringToDirectory();
    return NextResponse.json(result);
  } catch (error) {
    console.error('[Cron] sync-touring error:', error);
    return NextResponse.json(
      { error: 'Sync failed', detail: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// GET also supported for manual trigger
export async function GET() {
  return POST();
}
