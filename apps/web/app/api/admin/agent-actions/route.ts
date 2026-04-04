export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * GET /api/admin/agent-actions?limit=25&minutes=5
 * Live feed for Admin Command Plane — AgentAction + AgentContext.
 * When `minutes` is set, only rows with createdAt/updatedAt within that window (max 60).
 */
export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const limit = Math.min(Math.max(parseInt(req.nextUrl.searchParams.get('limit') || '25', 10), 1), 100);
  const minutesRaw = req.nextUrl.searchParams.get('minutes');
  const minutes =
    minutesRaw !== null && minutesRaw !== ''
      ? Math.min(Math.max(parseInt(minutesRaw, 10) || 5, 1), 60)
      : null;
  const since = minutes !== null ? new Date(Date.now() - minutes * 60_000) : null;

  try {
    const actionsP = prisma.agentAction.findMany({
      where: since ? { createdAt: { gte: since } } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        agent: true,
        action: true,
        summary: true,
        domain: true,
        impact: true,
        createdAt: true,
      },
    });

    const contextP = prisma.agentContext.findMany({
      where: since ? { updatedAt: { gte: since } } : undefined,
      orderBy: { updatedAt: 'desc' },
      take: limit,
      select: {
        domain: true,
        key: true,
        topic: true,
        agentAuthor: true,
        updatedAt: true,
        content: true,
      },
    });

    const draftActionsP = prisma.draftAction.findMany({
      where: since ? { createdAt: { gte: since } } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        agent: true,
        action: true,
        summary: true,
        domain: true,
        impact: true,
        createdAt: true,
        createdByUserId: true,
      },
    });

    const draftContextsP = prisma.draftContext.findMany({
      where: since ? { updatedAt: { gte: since } } : undefined,
      orderBy: { updatedAt: 'desc' },
      take: limit,
      select: {
        domain: true,
        key: true,
        topic: true,
        agentAuthor: true,
        updatedAt: true,
        content: true,
      },
    });

    const [actions, contexts, draftActions, draftContexts] = await Promise.all([
      actionsP,
      contextP,
      draftActionsP,
      draftContextsP,
    ]);

    const mixedFeed = [
      ...actions.map((a) => ({ type: 'action' as const, timestamp: a.createdAt.getTime(), ...a })),
      ...draftActions.map((a) => ({
        type: 'draft_action' as const,
        timestamp: a.createdAt.getTime(),
        id: a.id,
        agent: a.agent,
        action: a.action,
        summary: a.summary,
        domain: a.domain,
        impact: a.impact,
        createdAt: a.createdAt,
        sandboxOwnerId: a.createdByUserId,
      })),
      ...contexts.map((c) => {
        const preview =
          c.content.length > 160 ? `${c.content.slice(0, 160)}…` : c.content;
        return {
          type: 'context' as const,
          timestamp: c.updatedAt.getTime(),
          id: `ctx-${c.key}`,
          agent: c.agentAuthor,
          action: 'context',
          summary: `${c.topic} · ${c.key}`,
          detailPreview: preview,
          domain: c.domain,
          impact: 'low' as const,
          createdAt: c.updatedAt,
        };
      }),
      ...draftContexts.map((c) => {
        const preview =
          c.content.length > 160 ? `${c.content.slice(0, 160)}…` : c.content;
        return {
          type: 'draft_context' as const,
          timestamp: c.updatedAt.getTime(),
          id: `draft-ctx-${c.key}`,
          agent: c.agentAuthor,
          action: 'draft-context',
          summary: `${c.topic} · ${c.key}`,
          detailPreview: preview,
          domain: c.domain,
          impact: 'low' as const,
          createdAt: c.updatedAt,
        };
      }),
    ]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);

    return NextResponse.json({
      count: mixedFeed.length,
      actions: mixedFeed,
      windowMinutes: minutes,
      since: since?.toISOString() ?? null,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: 'Failed to load actions', detail: message }, { status: 500 });
  }
}
