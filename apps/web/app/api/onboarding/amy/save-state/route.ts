// apps/web/app/api/onboarding/amy/save-state/route.ts
//
// POST /api/onboarding/amy/save-state  { task: string, state: object }
//
// Saves partial state for a task in progress (e.g. half-filled form
// fields). Called by the client on debounced input change — typically
// every 1.5 seconds while Amy is typing. Overwrites the state for this
// task id within the currentTaskState JSON blob. Other tasks' state is
// preserved (keyed by task id).
//
// This is what makes the onboarding resumable across sessions: if Amy
// closes her browser mid-task, her form draft persists in the database
// and hydrates on her next visit.

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { apiLog } from '@/lib/api-logger';
import { saveTaskState } from '@/lib/onboarding-progress';
import { TASK_IDS } from '@/app/admin/onboarding/amy/tasks';

export const dynamic = 'force-dynamic';

const MAX_STATE_BYTES = 32 * 1024; // 32 KB per task — generous, prevents abuse

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  if (!isAllowedUser(session.user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: { task?: unknown; state?: unknown };
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
  if (typeof body.state !== 'object' || body.state === null || Array.isArray(body.state)) {
    return NextResponse.json(
      { error: 'state must be a plain object' },
      { status: 400 }
    );
  }

  const stateBytes = JSON.stringify(body.state).length;
  if (stateBytes > MAX_STATE_BYTES) {
    return NextResponse.json(
      { error: `State too large: ${stateBytes} bytes (max ${MAX_STATE_BYTES})` },
      { status: 413 }
    );
  }

  try {
    await saveTaskState(
      session.user.email,
      task,
      body.state as Record<string, unknown>
    );
    apiLog.info('onboarding/amy/save-state', 'state saved', {
      email: session.user.email,
      task,
      bytes: stateBytes,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    apiLog.error('onboarding/amy/save-state', 'failed to save state', e);
    return NextResponse.json(
      { error: 'Internal error saving state' },
      { status: 500 }
    );
  }
}
