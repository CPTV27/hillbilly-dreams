import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

// GET /api/metrics
// Returns all metrics as a keyed object: { newsletter_subscribers: { value, target, label, ... }, ... }
export async function GET() {
  try {
    const metrics = await prisma.metric.findMany({
      orderBy: { key: 'asc' },
    });

    // Transform array to a keyed object for easy dashboard consumption
    const keyed = metrics.reduce<Record<string, typeof metrics[0]>>((acc, metric) => {
      acc[metric.key] = metric;
      return acc;
    }, {});

    return NextResponse.json(keyed);
  } catch (error) {
    console.error('[API Error] GET /api/metrics', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/metrics
// Bulk upsert metrics — used by integration sync jobs (Beehiiv, CloudBeds, Spotify).
// Body: Array of metric objects or keyed object.
// Example: [{ key: "newsletter_subscribers", value: 1234, source: "beehiiv" }, ...]
export async function PUT(request: Request) {
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
    const results = await Promise.all(
      metricsArray.map((m) =>
        prisma.metric.upsert({
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
        })
      )
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
