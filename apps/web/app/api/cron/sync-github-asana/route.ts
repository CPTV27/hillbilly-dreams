export const dynamic = 'force-dynamic';
// GET /api/cron/sync-github-asana
// Mirrors GitHub issues labeled `sync-asana` into Asana project HDI (#92).
// Mapping stored in AgentContext (domain asana_sync, key issue-{number}).
// Auth: Bearer CRON_SECRET (same as other crons).

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const maxDuration = 300;

const GITHUB_REPO = 'CPTV27/hillbilly-dreams';
const ASANA_PROJECT_GID = '1213753731475702';
const ASANA_BASE = 'https://app.asana.com/api/1.0';
const LABEL = 'sync-asana';

async function ghFetch(path: string, token: string): Promise<unknown> {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`);
  return res.json();
}

async function asanaPost(token: string, path: string, body: Record<string, unknown>): Promise<{ data?: { gid?: string } }> {
  const res = await fetch(`${ASANA_BASE}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: body }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`Asana POST ${res.status}: ${await res.text()}`);
  return res.json();
}

async function asanaPut(token: string, path: string, body: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${ASANA_BASE}${path}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: body }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`Asana PUT ${res.status}: ${await res.text()}`);
}

interface GhIssue {
  number: number;
  title: string;
  state: string;
  html_url: string;
  body: string | null;
  pull_request?: unknown;
  user?: { login?: string };
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV !== 'development' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ghToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const asanaToken = process.env.ASANA_ACCESS_TOKEN;
  if (!ghToken) {
    return NextResponse.json({ error: 'GITHUB_TOKEN or GH_TOKEN not set' }, { status: 500 });
  }
  if (!asanaToken) {
    return NextResponse.json({ error: 'ASANA_ACCESS_TOKEN not set' }, { status: 500 });
  }

  const results: Array<{ issue: number; action: string; asanaGid?: string }> = [];

  try {
    const raw = (await ghFetch(
      `/repos/${GITHUB_REPO}/issues?state=all&labels=${encodeURIComponent(LABEL)}&per_page=50`,
      ghToken,
    )) as GhIssue[];

    for (const issue of raw) {
      if (issue.pull_request) continue;
      if (issue.user?.login?.includes('dependabot')) continue;

      const ctxKey = `issue-${issue.number}`;
      const existing = await prisma.agentContext.findUnique({
        where: { domain_key: { domain: 'asana_sync', key: ctxKey } },
      });

      let asanaGid: string | undefined;
      let storedTitle = '';
      if (existing?.content) {
        try {
          const j = JSON.parse(existing.content) as { asanaGid?: string; title?: string };
          asanaGid = j.asanaGid;
          storedTitle = j.title || '';
        } catch {
          /* ignore */
        }
      }

      const taskName = `[#${issue.number}] ${issue.title}`;
      const notes = `${issue.html_url}\n\n${(issue.body || '').slice(0, 7900)}`;
      const completed = issue.state === 'closed';

      if (!asanaGid) {
        const created = await asanaPost(asanaToken, '/tasks', {
          name: taskName,
          notes,
          projects: [ASANA_PROJECT_GID],
          completed,
        });
        asanaGid = created.data?.gid;
        if (!asanaGid) {
          results.push({ issue: issue.number, action: 'create_failed' });
          continue;
        }
        await prisma.agentContext.upsert({
          where: { domain_key: { domain: 'asana_sync', key: ctxKey } },
          create: {
            domain: 'asana_sync',
            topic: 'github-mirror',
            key: ctxKey,
            content: JSON.stringify({ asanaGid, title: issue.title, state: issue.state }),
            source: 'cron:sync-github-asana',
          },
          update: {
            content: JSON.stringify({ asanaGid, title: issue.title, state: issue.state }),
          },
        });
        results.push({ issue: issue.number, action: 'created', asanaGid });
        continue;
      }

      if (storedTitle !== issue.title) {
        await asanaPut(asanaToken, `/tasks/${asanaGid}`, { name: taskName, notes });
      }
      await asanaPut(asanaToken, `/tasks/${asanaGid}`, { completed });

      await prisma.agentContext.update({
        where: { domain_key: { domain: 'asana_sync', key: ctxKey } },
        data: {
          content: JSON.stringify({ asanaGid, title: issue.title, state: issue.state }),
        },
      });
      results.push({ issue: issue.number, action: 'updated', asanaGid });
    }

    return NextResponse.json({ ok: true, count: results.length, results });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
