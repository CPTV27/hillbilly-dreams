export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

// PUT /api/metrics/[key]
// Update or create a single metric by its key string (e.g., "newsletter_subscribers").
// This is the primary endpoint for manual updates from the HQ dashboard.
// Body: { value, target?, label?, unit?, source? }
export async function PUT(
  request: Request,
  { params }: { params: { key: string } }
) {
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
    console.error('[API Error] PUT /api/metrics/[key]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/metrics/[key]
// Fetch a single metric by key.
export async function GET(
  _request: Request,
  { params }: { params: { key: string } }
) {
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
    console.error('[API Error] GET /api/metrics/[key]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
