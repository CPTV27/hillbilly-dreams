export const dynamic = 'force-dynamic';
// app/api/cron/cloudbeds-sync/route.ts
// Daily cron job — syncs Cloudbeds occupancy & revenue metrics to the dashboard
// Also serves as the API key health check (keeps key alive, expires after 30 days unused)
// Schedule: Run daily via Vercel Cron, Firebase Scheduler, or external cron
//
// Vercel cron config (vercel.json):
//   { "crons": [{ "path": "/api/cron/cloudbeds-sync", "schedule": "0 6 * * *" }] }

import { NextResponse } from 'next/server';
import { apiLog } from '@/lib/api-logger';
import { calculateOccupancyMetrics, healthCheck } from '@/lib/cloudbeds';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  // Optional: Verify cron secret to prevent unauthorized triggers
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    // 1. Health check (keeps API key alive)
    const healthy = await healthCheck();
    if (!healthy) {
      return NextResponse.json({
        success: false,
        error: 'Cloudbeds API health check failed — check CLOUDBEDS_API_KEY',
      }, { status: 502 });
    }

    // 2. Calculate metrics
    const metrics = await calculateOccupancyMetrics();

    // 3. Push to metrics store

    const entries = [
      { key: 'inn_occupancy_rate', value: metrics.occupancyRate, target: 65, unit: '%', label: 'Inn Occupancy Rate' },
      { key: 'inn_revenue_mtd', value: metrics.revenueMTD, target: 11667, unit: 'usd', label: 'Inn Revenue MTD' },
      { key: 'inn_revenue_ytd', value: metrics.revenueYTD, target: 140000, unit: 'usd', label: 'Inn Revenue YTD' },
      { key: 'inn_adr', value: metrics.adr, target: 130, unit: 'usd', label: 'Average Daily Rate' },
      { key: 'inn_revpar', value: metrics.revpar, unit: 'usd', label: 'RevPAR' },
      { key: 'inn_booked_room_nights', value: metrics.bookedRoomNights, label: 'Booked Room Nights (30d)' },
      { key: 'inn_total_reservations', value: metrics.totalReservations, label: 'Reservations (30d)' },
      { key: 'inn_metrics_stale', value: 0, label: 'Metrics Fresh' },
    ];

    for (const m of entries) {
      await prisma.metric.upsert({
        where: { key: m.key },
        update: { value: m.value, target: m.target, unit: m.unit, source: 'cloudbeds', updatedAt: new Date() },
        create: { ...m, source: 'cloudbeds' },
      });
    }

    apiLog.info('cron/cloudbeds-sync', 'metrics synced', {
      occupancyRate: metrics.occupancyRate,
      revenueMTD: metrics.revenueMTD,
      adr: metrics.adr,
      revpar: metrics.revpar,
    });

    return NextResponse.json({
      success: true,
      syncedAt: new Date().toISOString(),
      metrics,
    });
  } catch (error) {
    apiLog.error('cron/cloudbeds-sync', 'sync failed', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Sync failed',
    }, { status: 500 });
  }
}
