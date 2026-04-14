// apps/web/app/api/onboarding/amy/prefs/route.ts
//
// POST /api/onboarding/amy/prefs  { email, asana, sms, googleChat }
//
// Saves notification preferences (task 8) and auto-marks the
// notification-prefs task complete. Stores the prefs on the
// OnboardingProgress.notifPrefs JSON column so they're discoverable
// by other tools that want to know how to ping Amy.

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { apiLog } from '@/lib/api-logger';
import { saveNotificationPrefs } from '@/lib/onboarding-progress';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  if (!isAllowedUser(session.user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const prefs = {
    email: Boolean(body.email),
    asana: Boolean(body.asana),
    sms: Boolean(body.sms),
    googleChat: Boolean(body.googleChat),
  };

  try {
    const progress = await saveNotificationPrefs(session.user.email, prefs);
    apiLog.info('onboarding/amy/prefs', 'prefs saved', {
      email: session.user.email,
      prefs,
    });
    return NextResponse.json({
      prefs,
      progress: {
        completedTasks: progress.completedTasks,
        currentTaskId: progress.currentTaskId,
      },
    });
  } catch (e) {
    apiLog.error('onboarding/amy/prefs', 'failed to save prefs', e);
    return NextResponse.json(
      { error: 'Internal error saving preferences' },
      { status: 500 }
    );
  }
}
