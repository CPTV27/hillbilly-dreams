// apps/web/app/api/onboarding/tracy/status/route.ts
//
// GET /api/onboarding/tracy/status
//
// Returns Tracy's current OnboardingProgress row (creating one on first
// visit). Same shape as the Amy status endpoint — the frontend client
// component reads from both via the same response schema.

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { apiLog } from '@/lib/api-logger';
import { getOrCreateOnboardingProgress } from '@/lib/onboarding-progress';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  if (!isAllowedUser(session.user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const progress = await getOrCreateOnboardingProgress(session.user.email, 'tracy');
    return NextResponse.json(
      {
        progress: {
          completedTasks: progress.completedTasks,
          currentTaskId: progress.currentTaskId,
          currentTaskState: progress.currentTaskState ?? {},
          notifPrefs: progress.notifPrefs ?? null,
          lastSeenAt: progress.lastSeenAt,
          sessionCount: progress.sessionCount,
          startedAt: progress.startedAt,
          completedAt: progress.completedAt,
        },
      },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  } catch (e) {
    apiLog.error('onboarding/tracy/status', 'failed to load progress', e);
    return NextResponse.json(
      { error: 'Internal error loading onboarding progress' },
      { status: 500 }
    );
  }
}
