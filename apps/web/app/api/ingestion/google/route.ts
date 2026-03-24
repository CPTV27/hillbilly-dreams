// apps/web/app/api/ingestion/google/route.ts
// ─────────────────────────────────────────────────────────────
// Google Workspace Ingestion Endpoint — Sovereign Node Data Pipeline
// ─────────────────────────────────────────────────────────────
// Reads vaulted OAuth tokens from the Account table (PrismaAdapter),
// fetches calendar and drive data from Google APIs, and returns
// structured capacity metrics for the dashboard.
//
// Scopes used: calendar.readonly, drive.readonly, gmail.readonly
// ─────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@bigmuddy/database';

export async function GET() {
  // ── 1. Authenticate via NextAuth session ──
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── 2. Retrieve vaulted Google tokens from Account table ──
  const googleAccount = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      provider: 'google',
    },
  });

  if (!googleAccount?.access_token) {
    return NextResponse.json({
      error: 'Google Workspace not connected',
      connected: false,
      action: 'User must complete OAuth flow via /measurably-better dashboard',
    }, { status: 404 });
  }

  const accessToken = googleAccount.access_token;

  try {
    // ── 3. Fetch calendar list (capacity data) ──
    const calendarResponse = await fetch(
      'https://www.googleapis.com/calendar/v3/users/me/calendarList',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (calendarResponse.status === 401) {
      // TODO: Implement Google token refresh flow:
      // 1. POST to https://oauth2.googleapis.com/token
      //    with grant_type=refresh_token, refresh_token=googleAccount.refresh_token,
      //    client_id, client_secret
      // 2. Update Account record with new access_token
      // 3. Retry the original request
      return NextResponse.json({
        error: 'Google token expired — re-authentication required',
        connected: false,
        requiresReauth: true,
      }, { status: 401 });
    }

    if (!calendarResponse.ok) {
      const errorText = await calendarResponse.text();
      console.error('[Google Ingestion] Calendar API error:', calendarResponse.status, errorText);
      return NextResponse.json({
        error: 'Google Calendar API error',
        status: calendarResponse.status,
      }, { status: 502 });
    }

    const calendarData = await calendarResponse.json();
    const calendars = calendarData.items || [];

    // ── 4. Fetch upcoming events from primary calendar (next 30 days) ──
    const now = new Date();
    const thirtyDaysOut = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const eventsResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
      `timeMin=${now.toISOString()}&timeMax=${thirtyDaysOut.toISOString()}&singleEvents=true&orderBy=startTime&maxResults=100`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    let events: any[] = [];
    let capacityMetrics = {
      totalEventsNext30Days: 0,
      avgEventsPerWeek: 0,
      busiestDay: null as string | null,
      estimatedCapacityUtilization: null as string | null,
    };

    if (eventsResponse.ok) {
      const eventsData = await eventsResponse.json();
      events = eventsData.items || [];

      // Calculate capacity metrics
      const totalEvents = events.length;
      const avgPerWeek = Math.round(totalEvents / 4.3 * 10) / 10;

      // Find busiest day of week
      const dayCounts: Record<string, number> = {};
      for (const event of events) {
        const start = event.start?.dateTime || event.start?.date;
        if (start) {
          const dayName = new Date(start).toLocaleDateString('en-US', { weekday: 'long' });
          dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
        }
      }
      const busiestDay = Object.entries(dayCounts)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || null;

      // Capacity utilization: events / (8 hrs × 22 working days) × 100
      const workingHoursPerMonth = 8 * 22;
      const avgEventDurationHrs = 1; // assume 1hr average
      const utilization = Math.min(
        100,
        Math.round((totalEvents * avgEventDurationHrs) / workingHoursPerMonth * 100)
      );

      capacityMetrics = {
        totalEventsNext30Days: totalEvents,
        avgEventsPerWeek: avgPerWeek,
        busiestDay,
        estimatedCapacityUtilization: `${utilization}%`,
      };
    }

    // ── 5. Return structured response ──
    return NextResponse.json({
      connected: true,
      provider: 'google',
      metrics: {
        calendarsConnected: calendars.length,
        ...capacityMetrics,
      },
      calendars: calendars.map((c: any) => ({
        id: c.id,
        summary: c.summary,
        primary: c.primary || false,
      })),
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Google Ingestion] Fetch failed:', err);
    return NextResponse.json({
      error: 'Failed to fetch Google Workspace data',
      connected: true,
    }, { status: 500 });
  }
}
