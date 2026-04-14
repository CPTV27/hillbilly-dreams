// apps/web/app/api/onboarding/amy/complete/route.ts
//
// POST /api/onboarding/amy/complete  { task: string }
//
// Marks a task as complete for the signed-in user. Auto-advances
// currentTaskId to the next uncompleted task. Sets completedAt if
// this was the final task.
//
// Called from the client in several places:
//  - After Delta Dawn's first chat round-trip (task 1)
//  - After dashboard walkthrough completion (task 2)
//  - After OAuth callbacks set the onboarding_source cookie (tasks 3-4)
//  - After event form save redirects back (task 5)
//  - After Sanity polling detects new photo/article (tasks 6-7)
//  - After notification prefs save (task 8 — via saveNotificationPrefs)
//  - After "Got it" button click on daily-loop (task 9)

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { apiLog } from '@/lib/api-logger';
import { markTaskComplete } from '@/lib/onboarding-progress';
import { TASK_IDS } from '@/app/admin/onboarding/amy/tasks';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  if (!isAllowedUser(session.user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: { task?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const task = typeof body.task === 'string' ? body.task : null;
  if (!task || !(TASK_IDS as readonly string[]).includes(task)) {
    return NextResponse.json(
      { error: `Unknown or missing task id: ${task}` },
      { status: 400 }
    );
  }

  try {
    const progress = await markTaskComplete(session.user.email, task);
    apiLog.info('onboarding/amy/complete', 'task marked complete', {
      email: session.user.email,
      task,
      totalComplete: progress.completedTasks.length,
    });
    return NextResponse.json({
      progress: {
        completedTasks: progress.completedTasks,
        currentTaskId: progress.currentTaskId,
        currentTaskState: progress.currentTaskState ?? {},
        completedAt: progress.completedAt,
      },
    });
  } catch (e) {
    apiLog.error('onboarding/amy/complete', 'failed to mark complete', e);
    return NextResponse.json(
      { error: 'Internal error marking task complete' },
      { status: 500 }
    );
  }
}
