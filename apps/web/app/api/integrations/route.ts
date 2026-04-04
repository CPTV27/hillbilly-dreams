export const dynamic = 'force-dynamic';
// apps/web/app/api/integrations/route.ts
// GET /api/integrations?clientId=X — List all integrations for a client
// POST /api/integrations — Create a new integration

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientIdParam = searchParams.get('clientId');
  const clientId = clientIdParam ? parseInt(clientIdParam, 10) : NaN;

  if (isNaN(clientId)) {
    return NextResponse.json({ error: 'clientId query param is required.' }, { status: 400 });
  }

  try {

    const integrations = await (prisma as any).clientIntegration.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' as const },
    });

    return NextResponse.json({ data: integrations });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot find module') || message.includes('Cannot read properties of undefined') ||
      message.includes('does not exist') || message.includes('P1001')
    ) {
      return NextResponse.json({ data: [], _source: 'no-db', _note: 'Database not connected or migration pending.' });
    }
    console.error('[GET /api/integrations]', dbError);
    return NextResponse.json({ error: 'Failed to list integrations.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const clientId = typeof body.clientId === 'number' ? body.clientId : parseInt(String(body.clientId), 10);
  if (isNaN(clientId)) {
    return NextResponse.json({ error: 'clientId is required.' }, { status: 400 });
  }
  if (!body.provider || typeof body.provider !== 'string') {
    return NextResponse.json({ error: 'provider is required.' }, { status: 400 });
  }

  try {

    // Verify client exists
    const client = await (prisma as any).client.findUnique({ where: { id: clientId } });
    if (!client) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    const integration = await (prisma as any).clientIntegration.create({
      data: {
        clientId,
        provider: body.provider as string,
        status: 'pending',
        accountId: (body.accountId as string) ?? null,
        config: (body.config as object) ?? null,
        displayName: (body.displayName as string) ?? null,
        scopes: (body.scopes as string[]) ?? [],
      },
    });

    return NextResponse.json({ data: integration }, { status: 201 });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (message.includes('Unique constraint')) {
      return NextResponse.json({ error: 'Integration for this provider already exists for this client.' }, { status: 409 });
    }
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot read properties of undefined') || message.includes('does not exist')
    ) {
      return NextResponse.json({ error: 'Database not available or migration pending.' }, { status: 503 });
    }
    console.error('[POST /api/integrations]', dbError);
    return NextResponse.json({ error: 'Failed to create integration.' }, { status: 500 });
  }
}
