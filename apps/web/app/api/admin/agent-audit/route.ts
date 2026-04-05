export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { apiLog } from '@/lib/api-logger';

function issueRefs(...texts: (string | null | undefined)[]): string[] {
  const set = new Set<string>();
  for (const t of texts) {
    if (!t) continue;
    const m = t.match(/#\d+/g);
    if (m) for (const x of m) set.add(x);
  }
  return Array.from(set);
}

function preview(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
}

/**
 * GET /api/admin/agent-audit
 * Unified audit trail: AgentAction + ReasoningTrace (with AgentTask), newest first.
 * Query: agent, action, kind=all|action|trace, days=1..365, limit=1..300
 */
export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const sp = req.nextUrl.searchParams;
  const agent = sp.get('agent')?.trim() || '';
  const action = sp.get('action')?.trim() || '';
  const kind = sp.get('kind') || 'all';
  const daysRaw = parseInt(sp.get('days') || '30', 10);
  const days = Number.isFinite(daysRaw) ? Math.min(Math.max(daysRaw, 1), 365) : 30;
  const limitRaw = parseInt(sp.get('limit') || '100', 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 300) : 100;

  const since = new Date();
  since.setDate(since.getDate() - days);

  const wantActions = kind === 'all' || kind === 'action';
  const wantTraces = kind === 'all' || kind === 'trace';
  const perSource = wantActions && wantTraces ? Math.min(limit * 2, 400) : limit;

  try {
    const actionWhere: {
      createdAt: { gte: Date };
      agent?: string;
      action?: string;
    } = { createdAt: { gte: since } };
    if (agent) actionWhere.agent = agent;
    if (action) actionWhere.action = action;

    const actionsP = wantActions
      ? prisma.agentAction.findMany({
          where: actionWhere,
          orderBy: { createdAt: 'desc' },
          take: perSource,
          select: {
            id: true,
            agent: true,
            action: true,
            summary: true,
            detail: true,
            domain: true,
            impact: true,
            createdAt: true,
          },
        })
      : Promise.resolve([]);

    const traceWhere: { createdAt: { gte: Date }; task?: { agent: string } } = {
      createdAt: { gte: since },
    };
    if (agent) traceWhere.task = { agent };

    const tracesP = wantTraces
      ? prisma.reasoningTrace.findMany({
          where: traceWhere,
          include: { task: true },
          orderBy: { createdAt: 'desc' },
          take: perSource,
        })
      : Promise.resolve([]);

    const [actions, traces] = await Promise.all([actionsP, tracesP]);

    type Entry =
      | {
          kind: 'action';
          at: string;
          id: number;
          agent: string;
          action: string;
          summary: string;
          detailPreview: string | null;
          domain: string;
          impact: string | null;
          issueRefs: string[];
        }
      | {
          kind: 'trace';
          at: string;
          id: string;
          taskId: string;
          agent: string;
          missionType: string;
          taskStatus: string;
          promptPreview: string;
          outputPreview: string;
          issueRefs: string[];
        };

    const entries: Entry[] = [];

    for (const a of actions) {
      const d = a.detail ?? '';
      entries.push({
        kind: 'action',
        at: a.createdAt.toISOString(),
        id: a.id,
        agent: a.agent,
        action: a.action,
        summary: a.summary,
        detailPreview: d ? preview(d, 500) : null,
        domain: a.domain,
        impact: a.impact ?? null,
        issueRefs: issueRefs(a.summary, a.detail),
      });
    }

    for (const t of traces) {
      const ag = t.task?.agent ?? 'unknown';
      const mission = t.task?.missionType ?? '?';
      const status = t.task?.status ?? '?';
      entries.push({
        kind: 'trace',
        at: t.createdAt.toISOString(),
        id: t.id,
        taskId: t.taskId,
        agent: ag,
        missionType: mission,
        taskStatus: status,
        promptPreview: preview(t.prompt, 280),
        outputPreview: preview(t.rawOutput, 280),
        issueRefs: issueRefs(t.prompt, t.rawOutput),
      });
    }

    entries.sort((x, y) => (x.at < y.at ? 1 : -1));
    const sliced = entries.slice(0, limit);

    const distinctAgents = new Set<string>();
    const distinctActions = new Set<string>();
    for (const a of actions) {
      distinctAgents.add(a.agent);
      distinctActions.add(a.action);
    }
    for (const t of traces) {
      if (t.task?.agent) distinctAgents.add(t.task.agent);
    }

    return NextResponse.json({
      entries: sliced,
      meta: {
        days,
        kind,
        limit,
        since: since.toISOString(),
        agents: Array.from(distinctAgents).sort(),
        actionTypes: Array.from(distinctActions).sort(),
      },
    });
  } catch (e) {
    apiLog.error('GET /api/admin/agent-audit', 'query_failed', e);
    return NextResponse.json({ error: 'audit_failed' }, { status: 500 });
  }
}
