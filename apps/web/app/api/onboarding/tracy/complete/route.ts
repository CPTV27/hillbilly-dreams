// apps/web/app/api/onboarding/tracy/complete/route.ts
//
// POST /api/onboarding/tracy/complete  { task: string }
// Marks a Tracy task complete.

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { apiLog } from '@/lib/api-logger';
import { markTaskComplete } from '@/lib/onboarding-progress';
import { TRACY_TASK_IDS } from '@/app/admin/onboarding/tracy/tasks';

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
  if (!task || !(TRACY_TASK_IDS as readonly string[]).includes(task)) {
    return NextResponse.json(
      { error: `Unknown or missing task id: ${task}` },
      { status: 400 }
    );
  }

  try {
    const progress = await markTaskComplete(session.user.email, task, 'tracy');
    apiLog.info('onboarding/tracy/complete', 'task marked complete', {
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
    apiLog.error('onboarding/tracy/complete', 'failed to mark complete', e);
    return NextResponse.json(
      { error: 'Internal error marking task complete' },
      { status: 500 }
    );
  }
}
