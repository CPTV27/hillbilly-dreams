export const dynamic = 'force-dynamic';

// GET /api/vendor/portal/:projectId — Public vendor portal data
// Reads from Asana API. No auth (link-based access).

import { NextRequest, NextResponse } from 'next/server';
import { getProject, getProjectTasks } from '@/lib/asana-client';

type Params = { params: Promise<{ projectId: string }> };

export async function GET(_request: NextRequest, ctx: Params) {
  const { projectId } = await ctx.params;

  try {
    const [project, tasks] = await Promise.all([
      getProject(projectId),
      getProjectTasks(projectId),
    ]);

    // Filter out sensitive tasks (payment log stays internal)
    const visibleTasks = tasks.filter(t =>
      !t.name.startsWith('PAYMENT LOG')
    );

    return NextResponse.json({
      project: { name: project.name, notes: project.notes },
      tasks: visibleTasks.map(t => ({
        gid: t.gid,
        name: t.name,
        notes: t.notes || '',
        completed: t.completed,
        due_on: t.due_on,
      })),
    });
  } catch (err) {
    console.error('[GET /api/vendor/portal/:projectId]', err);
    return NextResponse.json({ error: 'Failed to load vendor data' }, { status: 500 });
  }
}
