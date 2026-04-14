// apps/web/app/api/onboarding/peer-progress/route.ts
//
// GET /api/onboarding/peer-progress?peer=amy
//
// Returns a read-only snapshot of another team member's onboarding
// progress. Used by Tracy's "review Amy's progress" task so she can see
// live where Amy is in her setup. Returns non-sensitive fields only —
// no partial task state, no notification prefs, no session email.
//
// Auth: requires an active admin session (any whitelisted user). The
// viewer does NOT have to be Tracy specifically — anyone on the team
// can peek at anyone else's public progress. That's by design —
// transparency across the three co-founders.

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { apiLog } from '@/lib/api-logger';
import { getPeerProgress, type OnboardingRole } from '@/lib/onboarding-progress';

export const dynamic = 'force-dynamic';

const VALID_PEERS: OnboardingRole[] = ['amy', 'tracy', 'future-hire'];

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  if (!isAllowedUser(session.user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const url = new URL(req.url);
  const peer = url.searchParams.get('peer');
  if (!peer || !VALID_PEERS.includes(peer as OnboardingRole)) {
    return NextResponse.json(
      { error: `Invalid peer; must be one of: ${VALID_PEERS.join(', ')}` },
      { status: 400 }
    );
  }

  try {
    const progress = await getPeerProgress(peer as OnboardingRole);
    if (!progress) {
      // No progress row yet — peer hasn't started onboarding
      return NextResponse.json({
        peer,
        progress: null,
      });
    }
    apiLog.info('onboarding/peer-progress', 'served peer progress', {
      viewerEmail: session.user.email,
      peer,
      completedCount: progress.completedTasks.length,
    });
    return NextResponse.json(
      { peer, progress },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  } catch (e) {
    apiLog.error('onboarding/peer-progress', 'failed to fetch peer progress', e);
    return NextResponse.json(
      { error: 'Internal error fetching peer progress' },
      { status: 500 }
    );
  }
}
