export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { requireCronOrAdmin } from '@/lib/cron-or-admin';
import { apiLog } from '@/lib/api-logger';

// PUT /api/metrics/[key] — admin or cron bearer (same policy as bulk POST).
export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  const denied = await requireCronOrAdmin(request);
  if (denied) return denied;

  try {
    const { key } = params;
    if (!key) {
      return NextResponse.json({ error: 'key is required' }, { status: 400 });
    }

    const body = await request.json();

    if (body.value === undefined || body.value === null) {
      return NextResponse.json({ error: 'value is required' }, { status: 400 });
    }

    const value = parseFloat(body.value);
    if (isNaN(value)) {
      return NextResponse.json({ error: 'value must be a number' }, { status: 400 });
    }

    const metric = await prisma.metric.upsert({
      where: { key },
      update: {
        value,
        ...(body.target !== undefined && { target: body.target !== null ? parseFloat(body.target) : null }),
        ...(body.label !== undefined && { label: body.label }),
        ...(body.unit !== undefined && { unit: body.unit }),
        ...(body.source !== undefined && { source: body.source }),
      },
      create: {
        key,
        value,
        target: body.target !== undefined ? parseFloat(body.target) : null,
        label: body.label ?? null,
        unit: body.unit ?? null,
        source: body.source ?? 'manual',
      },
    });

    return NextResponse.json(metric);
  } catch (error) {
    apiLog.error('PUT /api/metrics/[key]', 'handler failed', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/metrics/[key] — admin only
export async function GET(
  _request: NextRequest,
  { params }: { params: { key: string } }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { key } = params;
    if (!key) {
      return NextResponse.json({ error: 'key is required' }, { status: 400 });
    }

    const metric = await prisma.metric.findUnique({
      where: { key },
    });

    if (!metric) {
      return NextResponse.json({ error: 'Metric not found' }, { status: 404 });
    }

    return NextResponse.json(metric);
  } catch (error) {
    apiLog.error('GET /api/metrics/[key]', 'handler failed', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
