export const dynamic = 'force-dynamic';
import { prisma } from '@bigmuddy/database';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/agent/action — query action log
// ?agent=huck         — filter by agent
// &domain=tech        — filter by domain
// &since=2026-03-27   — only actions after this date
// &limit=20           — max results
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const agent = searchParams.get('agent');
  const domain = searchParams.get('domain');
  const since = searchParams.get('since');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

  const where: any = {};

  if (agent) where.agent = agent;
  if (domain) where.domain = domain;
  if (since) where.createdAt = { gte: new Date(since) };

  const results = await prisma.agentAction.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return NextResponse.json({ count: results.length, results });
}

// POST /api/agent/action — log an agent action
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { agent, action, summary, detail, domain, impact } = body;

  if (!agent || !action || !summary || !domain) {
    return NextResponse.json(
      { error: 'Missing required fields: agent, action, summary, domain' },
      { status: 400 }
    );
  }

  const result = await prisma.agentAction.create({
    data: {
      agent,
      action,
      summary,
      detail: detail || null,
      domain,
      impact: impact || null,
    },
  });

  return NextResponse.json({ success: true, id: result.id });
}
