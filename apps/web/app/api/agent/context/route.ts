import { prisma } from '@bigmuddy/database';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/agent/context — query context fragments
// ?agent=delta-dawn  — filter by agent relevance (returns all if omitted)
// &topic=inn         — filter by topic (partial match)
// &domain=finance    — filter by domain (comma-separated for multiple)
// &q=pricing         — semantic keyword search (simple ILIKE, not vector)
// &key=entity.hdi    — exact key lookup
// &limit=20          — max results
// &fresh=true        — exclude expired content
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const topic = searchParams.get('topic');
  const domain = searchParams.get('domain');
  const q = searchParams.get('q');
  const key = searchParams.get('key');
  const fresh = searchParams.get('fresh') === 'true';
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

  const where: any = {};

  if (key) {
    where.key = key;
  }

  if (domain) {
    const domains = domain.split(',').map(d => d.trim());
    where.domain = domains.length === 1 ? domains[0] : { in: domains };
  }

  if (topic) {
    where.topic = { contains: topic, mode: 'insensitive' };
  }

  if (q) {
    where.content = { contains: q, mode: 'insensitive' };
  }

  if (fresh) {
    where.OR = [
      { validUntil: null },
      { validUntil: { gt: new Date() } },
    ];
    where.confidence = { gt: 0.3 };
  }

  const results = await prisma.agentContext.findMany({
    where,
    orderBy: [{ confidence: 'desc' }, { updatedAt: 'desc' }],
    take: limit,
  });

  return NextResponse.json({
    count: results.length,
    results,
  });
}

// POST /api/agent/context — write a context fragment
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { domain, topic, key, content, source, agentAuthor, validUntil, confidence } = body;

  if (!domain || !topic || !key || !content) {
    return NextResponse.json(
      { error: 'Missing required fields: domain, topic, key, content' },
      { status: 400 }
    );
  }

  // Upsert — same domain+key overwrites (knowledge gets updated, not duplicated)
  const result = await prisma.agentContext.upsert({
    where: { domain_key: { domain, key } },
    create: {
      domain,
      topic,
      key,
      content,
      source: source || 'unknown',
      agentAuthor: agentAuthor || null,
      confidence: confidence ?? 1.0,
      validUntil: validUntil ? new Date(validUntil) : null,
    },
    update: {
      topic,
      content,
      source: source || undefined,
      agentAuthor: agentAuthor || undefined,
      confidence: confidence ?? 1.0,
      validUntil: validUntil ? new Date(validUntil) : null,
    },
  });

  return NextResponse.json({ success: true, id: result.id, key: result.key });
}
