// GET /api/directory/artists — public, no auth
// Same payload shape as getCorridorArtistsPublic() for clients that prefer HTTP.

import { NextResponse } from 'next/server';
import { getCorridorArtistsPublic } from '@/lib/corridor-artists-public';
import { apiLog } from '@/lib/api-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getCorridorArtistsPublic(48);
    return NextResponse.json({ data });
  } catch (e) {
    const msg = String(e);
    if (
      msg.includes('DATABASE_URL') ||
      msg.includes('P1001') ||
      msg.includes('does not exist')
    ) {
      return NextResponse.json({ data: [], _source: 'no-db' });
    }
    apiLog.error('GET /api/directory/artists', 'query failed', e);
    return NextResponse.json({ error: 'Failed to load artists.' }, { status: 500 });
  }
}
