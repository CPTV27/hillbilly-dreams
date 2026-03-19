// app/api/integrations/cloudbeds/route.ts
// Cloudbeds integration management — connect, status, availability, reservations
// Wraps the lib/cloudbeds.ts client for Next.js API consumption

import { NextResponse } from 'next/server';
import * as cloudbeds from '@/lib/cloudbeds';
import { prisma } from '@/lib/db';

// ── GET /api/integrations/cloudbeds ──
// Returns connection status, hotel details, and room types

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'status';

  try {
    switch (action) {
      // Connection health check
      case 'status': {
        const healthy = await cloudbeds.healthCheck();
        if (!healthy) {
          return NextResponse.json({
            connected: false,
            error: 'Cloudbeds API health check failed',
          });
        }

        const details = await cloudbeds.getHotelDetails();
        return NextResponse.json({
          connected: true,
          property: {
            id: details.propertyID,
            name: details.propertyName,
            city: details.propertyCity,
            state: details.propertyState,
            timezone: details.propertyTimezone,
            currency: details.propertyCurrency,
          },
        });
      }

      // Room types and inventory
      case 'rooms': {
        const rooms = await cloudbeds.getRoomTypes();
        return NextResponse.json({ data: rooms, count: rooms.length });
      }

      // Availability for date range
      case 'availability': {
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        if (!startDate || !endDate) {
          return NextResponse.json(
            { error: 'startDate and endDate required' },
            { status: 400 }
          );
        }

        const availability = await cloudbeds.getAvailability(startDate, endDate);
        return NextResponse.json({ data: availability });
      }

      // Rate plans with detailed daily rates
      case 'rates': {
        const start = searchParams.get('startDate');
        const end = searchParams.get('endDate');

        if (!start || !end) {
          return NextResponse.json(
            { error: 'startDate and endDate required' },
            { status: 400 }
          );
        }

        const rates = await cloudbeds.getRatePlans(start, end);
        return NextResponse.json({ data: rates });
      }

      // Recent reservations
      case 'reservations': {
        const status = searchParams.get('reservationStatus') || undefined;
        const checkInFrom = searchParams.get('checkInFrom') || undefined;
        const checkInTo = searchParams.get('checkInTo') || undefined;

        const reservations = await cloudbeds.getReservations({
          status,
          checkInFrom,
          checkInTo,
        });

        return NextResponse.json({
          data: reservations,
          count: reservations.length,
        });
      }

      // Occupancy metrics
      case 'metrics': {
        const metrics = await cloudbeds.calculateOccupancyMetrics();
        return NextResponse.json({ data: metrics });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}. Use: status, rooms, availability, rates, reservations, metrics` },
          { status: 400 }
        );
    }
  } catch (error) {
    if (error instanceof cloudbeds.CloudbedsError) {
      return NextResponse.json(
        { error: error.message, status: error.status },
        { status: error.status === 429 ? 429 : 502 }
      );
    }

    console.error('[cloudbeds] API error:', error);
    return NextResponse.json(
      { error: 'Cloudbeds integration error' },
      { status: 500 }
    );
  }
}

// ── POST /api/integrations/cloudbeds ──
// Actions: update_rates, register_webhooks, sync_metrics

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      // Push rate updates to Cloudbeds
      case 'update_rates': {
        const { updates } = body;
        if (!updates || !Array.isArray(updates)) {
          return NextResponse.json(
            { error: 'updates array required' },
            { status: 400 }
          );
        }

        const result = await cloudbeds.updateRates(updates);
        return NextResponse.json({
          message: 'Rate update queued',
          jobReferenceID: result.jobReferenceID,
        });
      }

      // Register webhook endpoints with Cloudbeds
      case 'register_webhooks': {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://admin.bigmuddytouring.com';
        const webhookUrl = `${baseUrl}/api/webhooks/cloudbeds`;

        const events = [
          'reservation/created',
          'reservation/status_changed',
          'reservation/dates_changed',
          'reservation/accommodation_changed',
          'reservation/deleted',
        ];

        const results = await Promise.allSettled(
          events.map((event) => cloudbeds.registerWebhook(webhookUrl, event))
        );

        const registered = results
          .map((r, i) => ({
            event: events[i],
            success: r.status === 'fulfilled',
            error: r.status === 'rejected' ? (r.reason as Error).message : undefined,
          }));

        return NextResponse.json({
          message: 'Webhook registration complete',
          webhookUrl,
          events: registered,
        });
      }

      // Sync occupancy metrics to the dashboard
      case 'sync_metrics': {
        const metrics = await cloudbeds.calculateOccupancyMetrics();

        // Push to our metrics API

        const metricEntries = [
          { key: 'inn_occupancy_rate', value: metrics.occupancyRate, target: 65, unit: '%', label: 'Inn Occupancy Rate' },
          { key: 'inn_occupancy_breakeven', value: 45, target: 45, unit: '%', label: 'Breakeven Occupancy' },
          { key: 'inn_revenue_mtd', value: metrics.revenueMTD, target: 11667, unit: 'usd', label: 'Inn Revenue MTD' },
          { key: 'inn_revenue_ytd', value: metrics.revenueYTD, target: 140000, unit: 'usd', label: 'Inn Revenue YTD' },
          { key: 'inn_adr', value: metrics.adr, target: 130, unit: 'usd', label: 'Average Daily Rate' },
          { key: 'inn_revpar', value: metrics.revpar, unit: 'usd', label: 'RevPAR' },
          { key: 'inn_metrics_stale', value: 0, label: 'Metrics Freshness Flag' },
        ];

        for (const m of metricEntries) {
          await prisma.metric.upsert({
            where: { key: m.key },
            update: { value: m.value, target: m.target, unit: m.unit, source: 'cloudbeds', updatedAt: new Date() },
            create: { ...m, source: 'cloudbeds' },
          });
        }

        return NextResponse.json({
          message: 'Metrics synced',
          metrics,
          metricsUpdated: metricEntries.length,
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}. Use: update_rates, register_webhooks, sync_metrics` },
          { status: 400 }
        );
    }
  } catch (error) {
    if (error instanceof cloudbeds.CloudbedsError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status === 429 ? 429 : 502 }
      );
    }

    console.error('[cloudbeds] POST error:', error);
    return NextResponse.json(
      { error: 'Cloudbeds integration error' },
      { status: 500 }
    );
  }
}
