export const dynamic = 'force-dynamic';
// GET /api/cron/scan-asana — Scan all Asana projects for new comments
// Runs hourly via Vercel Cron. Creates follow-up tasks from team feedback.

import { NextResponse } from 'next/server';

export const maxDuration = 300;

const ASANA_TOKEN = process.env.ASANA_ACCESS_TOKEN;
const ASANA_BASE = 'https://app.asana.com/api/1.0';

// All projects to scan
const PROJECTS = [
  { gid: '1213753731475702', name: 'Hillbilly Dreams Inc' },
  { gid: '1213859652065310', name: 'Amy — Inn & Bar Ops' },
  { gid: '1213853652406670', name: 'Tracy — Business & Finance' },
  { gid: '1213857209781632', name: 'JP — Shows & Programming' },
  { gid: '1213828983804994', name: 'Marketing Department' },
  { gid: '1213828982457283', name: 'Music & Entertainment' },
];

// Chase's GID — we skip his comments (he already knows what he wrote)
const CHASE_GID = '1211216881488767';

interface AsanaStory {
  gid: string;
  text: string;
  type: string;
  created_at: string;
  created_by: { gid: string; name: string };
}

interface AsanaTask {
  gid: string;
  name: string;
}

async function asanaGet(path: string): Promise<any> {
  const res = await fetch(`${ASANA_BASE}${path}`, {
    headers: { Authorization: `Bearer ${ASANA_TOKEN}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Asana API error ${res.status}: ${err}`);
  }
  return res.json();
}

async function asanaPost(path: string, body: Record<string, unknown>): Promise<any> {
  const res = await fetch(`${ASANA_BASE}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ASANA_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: body }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Asana POST error ${res.status}: ${err}`);
  }
  return res.json();
}

export async function GET(request: Request) {
  // Auth
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV !== 'development' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!ASANA_TOKEN) {
    return NextResponse.json({ error: 'ASANA_ACCESS_TOKEN not set' }, { status: 500 });
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const results: Array<{
    project: string;
    task: string;
    taskGid: string;
    commenter: string;
    comment: string;
    createdAt: string;
    actionCreated: boolean;
  }> = [];

  try {
    for (const project of PROJECTS) {
      // Get all tasks in this project
      const tasksRes = await asanaGet(
        `/tasks?project=${project.gid}&opt_fields=name,gid,modified_at&limit=100`
      );
      const tasks: (AsanaTask & { modified_at: string })[] = tasksRes.data || [];

      // Filter to tasks modified in the last hour
      const recentTasks = tasks.filter(
        (t) => t.modified_at && t.modified_at >= oneHourAgo
      );

      for (const task of recentTasks) {
        // Get stories (comments) for this task
        const storiesRes = await asanaGet(
          `/tasks/${task.gid}/stories?opt_fields=text,type,created_by.gid,created_by.name,created_at`
        );
        const stories: AsanaStory[] = storiesRes.data || [];

        // Filter to comments from non-Chase team members in the last hour
        const newComments = stories.filter(
          (s) =>
            s.type === 'comment' &&
            s.created_at >= oneHourAgo &&
            s.created_by?.gid !== CHASE_GID
        );

        for (const comment of newComments) {
          let actionCreated = false;

          // Check if the comment looks like it has actionable content
          // (contains questions, numbered lists, or keywords)
          const hasAction =
            comment.text.includes('?') ||
            comment.text.includes('need') ||
            comment.text.includes('Need') ||
            /\d+\./.test(comment.text) ||
            comment.text.includes('should') ||
            comment.text.includes('plan') ||
            comment.text.length > 100;

          if (hasAction) {
            // Create a follow-up task in the same project
            try {
              await asanaPost('/tasks', {
                name: `Follow up: ${comment.created_by.name}'s feedback on "${task.name}"`,
                notes: `${comment.created_by.name} commented:\n\n"${comment.text}"\n\n---\nAuto-created by scan-asana cron from comment on ${task.name}.`,
                projects: [project.gid],
                assignee: CHASE_GID,
                due_on: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split('T')[0], // 3 days from now
              });
              actionCreated = true;
            } catch (err) {
              console.error(`[scan-asana] Failed to create follow-up task:`, err);
            }
          }

          results.push({
            project: project.name,
            task: task.name,
            taskGid: task.gid,
            commenter: comment.created_by.name,
            comment: comment.text.slice(0, 200),
            createdAt: comment.created_at,
            actionCreated,
          });
        }
      }
    }

    const summary = {
      scannedAt: new Date().toISOString(),
      projectsScanned: PROJECTS.length,
      newComments: results.length,
      actionsCreated: results.filter((r) => r.actionCreated).length,
      comments: results,
    };

    console.log(`[scan-asana] Found ${results.length} new comments, created ${summary.actionsCreated} follow-up tasks`);

    return NextResponse.json(summary);
  } catch (err: any) {
    console.error('[scan-asana] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
