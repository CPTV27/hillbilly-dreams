export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';
import { requireCronOrAdmin } from '@/lib/cron-or-admin';
import { apiLog } from '@/lib/api-logger';

// GET /api/metrics
// Returns all metrics as a keyed object — admin session only (HQ dashboard).
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const metrics = await prisma.metric.findMany({
      orderBy: { key: 'asc' },
    });

    const keyed: Record<string, (typeof metrics)[number]> = {};
    for (const metric of metrics) {
      keyed[metric.key] = metric;
    }

    return NextResponse.json(keyed, {
      headers: { 'Cache-Control': 'private, s-maxage=10, stale-while-revalidate=30' },
    });
  } catch (error) {
    apiLog.error('GET /api/metrics', 'handler failed', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/metrics (also aliased as PUT for compatibility)
// Bulk upsert — schedulers may use Bearer CRON_SECRET; otherwise admin session.
export async function POST(request: NextRequest) {
  const denied = await requireCronOrAdmin(request);
  if (denied) return denied;
  return upsertMetrics(request);
}

export async function PUT(request: NextRequest) {
  const denied = await requireCronOrAdmin(request);
  if (denied) return denied;
  return upsertMetrics(request);
}

async function upsertMetrics(request: NextRequest) {
  try {
    const body = await request.json();

    const metricsArray: Array<{
      key: string;
      value: number;
      target?: number;
      label?: string;
      unit?: string;
      source?: string;
    }> = Array.isArray(body) ? body : Object.values(body);

    if (!metricsArray.length) {
      return NextResponse.json(
        { error: 'Request body must be a non-empty array or object of metrics' },
        { status: 400 }
      );
    }

    for (const m of metricsArray) {
      if (!m.key || m.value === undefined || m.value === null) {
        return NextResponse.json(
          { error: `Each metric must have a 'key' and 'value'. Invalid entry: ${JSON.stringify(m)}` },
          { status: 400 }
        );
      }
    }

    const results = await prisma.$transaction(async (tx) => {
      const out: Awaited<ReturnType<typeof prisma.metric.upsert>>[] = [];
      for (const m of metricsArray) {
        const metric = await tx.metric.upsert({
          where: { key: m.key },
          update: {
            value: m.value,
            ...(m.target !== undefined && { target: m.target }),
            ...(m.label !== undefined && { label: m.label }),
            ...(m.unit !== undefined && { unit: m.unit }),
            ...(m.source !== undefined && { source: m.source }),
          },
          create: {
            key: m.key,
            value: m.value,
            target: m.target ?? null,
            label: m.label ?? null,
            unit: m.unit ?? null,
            source: m.source ?? null,
          },
        });
        await tx.metricSnapshot.create({
          data: {
            metricKey: m.key,
            value: m.value,
            source: m.source ?? null,
          },
        });
        out.push(metric);
      }
      return out;
    });

    return NextResponse.json({
      success: true,
      updated: results.length,
      metrics: results,
    });
  } catch (error) {
    apiLog.error('POST/PUT /api/metrics', 'upsert failed', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
