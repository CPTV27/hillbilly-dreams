// apps/web/app/api/admin/bridge-clients/route.ts
// GET  — list all bridge clients with article counts
// POST — create a new bridge client (generates apiKey + apiSecret)

import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  try {
    const { default: prisma } = await import('@bigmuddy/database');

    const clients = await (prisma as any).bridgeClient.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Get article counts per client (by sourceSystem matching client name slug)
    const articleCounts = await (prisma as any).article.groupBy({
      by: ['sourceSystem'],
      _count: { id: true },
      where: { sourceSystem: { not: null } },
    });

    const countMap: Record<string, number> = {};
    for (const row of articleCounts) {
      countMap[row.sourceSystem] = row._count.id;
    }

    // Mask secrets in list view
    const masked = clients.map((c: any) => ({
      ...c,
      apiSecret: c.apiSecret.slice(0, 8) + '••••••••',
      articleCount: countMap[c.name.toLowerCase().replace(/\s+/g, '-')] ?? 0,
    }));

    return NextResponse.json(masked);
  } catch (error) {
    console.error('[API /admin/bridge-clients GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, allowedCategories } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Client name is required' },
        { status: 400 }
      );
    }

    const { default: prisma } = await import('@bigmuddy/database');

    // Check for duplicate name
    const existing = await (prisma as any).bridgeClient.findFirst({
      where: { name: name.trim() },
    });
    if (existing) {
      return NextResponse.json(
        { error: `Client "${name}" already exists` },
        { status: 409 }
      );
    }

    // Generate credentials
    const apiKey = crypto.randomUUID();
    const apiSecret = crypto.randomBytes(32).toString('hex'); // 64-char hex

    const client = await (prisma as any).bridgeClient.create({
      data: {
        name: name.trim(),
        apiKey,
        apiSecret, // Stored as-is (in production, hash this)
        allowedCategories: allowedCategories ?? ['case-study'],
        status: 'active',
      },
    });

    // Return the full secret ONCE — client must save it
    return NextResponse.json(
      {
        message: 'Client created — save the apiSecret now, it will not be shown again',
        data: {
          id: client.id,
          name: client.name,
          apiKey: client.apiKey,
          apiSecret, // Full secret — only on creation
          status: client.status,
          allowedCategories: client.allowedCategories,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API /admin/bridge-clients POST]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
