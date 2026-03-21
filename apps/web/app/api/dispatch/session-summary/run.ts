import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { dispatchForUser } from '@bigmuddy/shared';

export async function runSessionSummary() {
  const [tasks, recentActivity] = await Promise.all([
    prisma.launchTask.findMany(),
    prisma.opsActivity.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'done').length;
  const skipped = tasks.filter(t => t.status === 'skipped').length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Group pending by session
  const pendingBySession: Record<string, number> = {};
  for (const t of tasks.filter(t => t.status === 'pending')) {
    const key = t.sessionName || `Session ${t.session}`;
    pendingBySession[key] = (pendingBySession[key] || 0) + 1;
  }

  const sessionBreakdown = Object.entries(pendingBySession)
    .map(([name, count]) => `${name}: ${count} remaining`)
    .join('\n');

  const recentLines = recentActivity
    .map(a => `${a.type}: ${a.message}`)
    .join('\n');

  const body = [
    `Launch Progress: ${completed}/${total} tasks complete (${progressPct}%)`,
    `Pending: ${pending} | Skipped: ${skipped}`,
    '',
    'Remaining by session:',
    sessionBreakdown || '(none)',
    '',
    'Recent activity:',
    recentLines || '(none)',
  ].join('\n');

  // Find all admin/owner users
  const admins = await prisma.user.findMany({
    where: { role: { in: ['admin', 'owner'] } },
    select: { id: true },
  });

  const results = await Promise.allSettled(
    admins.map(admin =>
      dispatchForUser(admin.id, {
        triggerId: 'session-summary',
        subject: `Big Muddy Launch: ${progressPct}% Complete`,
        body,
        priority: 'normal',
      })
    )
  );

  const succeeded = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  return NextResponse.json({
    ok: true,
    dispatched: { total: admins.length, succeeded, failed },
    summary: { total, completed, pending, skipped, progressPct },
  });
}
