import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/lib/auth';
import { syncTaskToEcosystem } from '@/lib/task-sync';

const ASSIGNEE_EMAILS: Record<string, string> = {
  tracy: 'tracyaldersonallen@gmail.com',
  amy: 'amyaldersonallen@gmail.com',
  chase: 'chase@chasepierson.tv',
};

const DEFAULT_EMAIL = 'tracyaldersonallen@gmail.com';

function resolveEmail(assignedTo: string | null | undefined): string {
  if (!assignedTo) return DEFAULT_EMAIL;
  return ASSIGNEE_EMAILS[assignedTo.toLowerCase()] ?? DEFAULT_EMAIL;
}

function dueDate(session: number | null | undefined): Date {
  const now = new Date();
  const days = session === 0 ? 1 : 7;
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const projectGid: string | undefined = body.projectGid;

  const tasks = await prisma.launchTask.findMany({
    where: { status: 'pending' },
  });

  const results: Array<{ taskId: string; ok: boolean; error?: string }> = [];
  const errors: string[] = [];
  let synced = 0;

  for (const task of tasks) {
    try {
      await syncTaskToEcosystem({
        title: task.title,
        description: task.guide ? task.guide.replace(/<[^>]*>/g, '') : `Session ${task.session}: ${task.sessionName}`,
        assigneeEmail: resolveEmail(task.assignedTo),
        dueDate: dueDate(task.session),
        projectGid,
      });
      synced++;
      results.push({ taskId: String(task.id), ok: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`Task ${task.id}: ${msg}`);
      results.push({ taskId: String(task.id), ok: false, error: msg });
    }
  }

  return NextResponse.json({ synced, errors, results });
}
