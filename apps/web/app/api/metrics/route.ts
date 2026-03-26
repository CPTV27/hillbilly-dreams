import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/metrics
// Returns all metrics as a keyed object: { newsletter_subscribers: { value, target, label, ... }, ... }
export async function GET() {
  try {
    const metrics = await prisma.metric.findMany({
      orderBy: { key: 'asc' },
    });

    // Transform array to a keyed object for easy dashboard consumption
    const keyed: Record<string, (typeof metrics)[number]> = {};
    for (const metric of metrics) {
      keyed[metric.key] = metric;
    }

    return NextResponse.json(keyed, {
      headers: { 'Cache-Control': 'private, s-maxage=10, stale-while-revalidate=30' },
    });
  } catch (error) {
    console.error('[API Error] GET /api/metrics', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/metrics (also aliased as PUT for compatibility)
// Bulk upsert metrics — used by integration sync jobs (Beehiiv, CloudBeds, Spotify).
// Body: Array of metric objects or keyed object.
// Example: [{ key: "newsletter_subscribers", value: 1234, source: "beehiiv" }, ...]
export async function POST(request: Request) {
  return upsertMetrics(request);
}

export async function PUT(request: Request) {
  return upsertMetrics(request);
}

async function upsertMetrics(request: Request) {
  try {
    const body = await request.json();

    // Accept either an array or a keyed object
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

    // Validate all entries have key and value
    for (const m of metricsArray) {
      if (!m.key || m.value === undefined || m.value === null) {
        return NextResponse.json(
          { error: `Each metric must have a 'key' and 'value'. Invalid entry: ${JSON.stringify(m)}` },
          { status: 400 }
        );
      }
    }

    // Upsert each metric — create if missing, update if exists
    // Also insert a MetricSnapshot row for time-series history
    const results = await Promise.all(
      metricsArray.map(async (m) => {
        const metric = await prisma.metric.upsert({
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

        // Append to time-series ledger (never overwritten)
        await prisma.metricSnapshot.create({
          data: {
            metricKey: m.key,
            value: m.value,
            source: m.source ?? null,
          },
        });

        return metric;
      })
    );

    return NextResponse.json({
      success: true,
      updated: results.length,
      metrics: results,
    });
  } catch (error) {
    console.error('[API Error] PUT /api/metrics', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
