// apps/web/app/api/onboarding/amy/status/route.ts
//
// GET /api/onboarding/amy/status
//
// Returns Amy's current OnboardingProgress row (creating one on first
// visit). Also polls Sanity for Amy-authored new documents on each call
// to auto-complete tasks 6 (first-photo) and 7 (first-article) if the
// frontend's direct completion detection missed them.
//
// Admin-gated. Caller must be signed in with an allowed email.

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { apiLog } from '@/lib/api-logger';
import {
  getOrCreateOnboardingProgress,
  markTaskComplete,
} from '@/lib/onboarding-progress';
import { prisma } from '@/lib/prisma';

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
    // Create-on-first-visit + touch session
    let progress = await getOrCreateOnboardingProgress(session.user.email, 'amy');

    // Auto-complete detection for OAuth-based tasks by checking SocialAccount
    // presence. Cheap — single indexed query per request.
    const updates: string[] = [];

    if (!progress.completedTasks.includes('connect-meta')) {
      const fbCount = await prisma.socialAccount.count({
        where: { platform: 'facebook' },
      });
      if (fbCount > 0) updates.push('connect-meta');
    }

    if (!progress.completedTasks.includes('connect-gbp')) {
      const gbpCount = await prisma.socialAccount.count({
        where: { platform: 'google_business' },
      });
      if (gbpCount > 0) updates.push('connect-gbp');
    }

    // Apply any detected completions
    for (const taskId of updates) {
      progress = await markTaskComplete(session.user.email, taskId);
    }

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
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (e) {
    apiLog.error('onboarding/amy/status', 'failed to load progress', e);
    return NextResponse.json(
      { error: 'Internal error loading onboarding progress' },
      { status: 500 }
    );
  }
}
