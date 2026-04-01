export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

// ─────────────────────────────────────────────────────────────
// Google Workspace Async Worker — Eventarc Target
// ─────────────────────────────────────────────────────────────
// Designed to be triggered by Cloud Scheduler at 3:00 AM daily.
// Bypasses NextAuth cookies and iterates across all active
// Google accounts to sink fresh capacity metrics into the Notebook.
// ─────────────────────────────────────────────────────────────

export const maxDuration = 300; // Allow 5 minutes for massive batch jobs

export async function GET(request: Request) {
  // ── 1. Authenticate the Cron Trigger ──
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV !== 'development' && 
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized Cron Request' }, { status: 401 });
  }

  try {
    // ── 2. Locate all Users with Google Workspace connected ──
    const accounts = await prisma.account.findMany({
      where: { provider: 'google' },
      include: { user: true },
    });

    const report = [];

    for (const account of accounts) {
      if (!account.access_token || !account.user) continue;
      
      let accessToken = account.access_token;
      let refreshed = false;

      // ── 3. Check for Expiry & Refresh if needed ──
      // If expires_at is in the past, refresh it now.
      if (account.expires_at && Date.now() / 1000 > account.expires_at) {
         if (account.refresh_token) {
            const refreshBody = new URLSearchParams({
              grant_type: 'refresh_token',
              refresh_token: account.refresh_token,
              client_id: process.env.GOOGLE_CLIENT_ID || '',
              client_secret: process.env.GOOGLE_CLIENT_SECRET || ''
            });

            const refreshRes = await fetch('https://oauth2.googleapis.com/token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: refreshBody.toString()
            });

            if (refreshRes.ok) {
              const refreshedTokens = await refreshRes.json();
              accessToken = refreshedTokens.access_token;
              refreshed = true;
              
              await prisma.account.update({
                where: { id: account.id },
                data: {
                  access_token: refreshedTokens.access_token,
                  expires_at: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
                }
              });
            } else {
               report.push({ userId: account.user.id, status: 'Token Refresh Failed' });
               continue;
            }
         } else {
           report.push({ userId: account.user.id, status: 'Expired - No Refresh Token' });
           continue;
         }
      }

      // ── 4. Retrieve Telemetry (Calendar Load) ──
      const now = new Date();
      const thirtyDaysOut = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      const eventsResponse = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
        `timeMin=${now.toISOString()}&timeMax=${thirtyDaysOut.toISOString()}&singleEvents=true&orderBy=startTime&maxResults=5`,
        { headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' } }
      );

      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        const eventSummary = (eventsData.items || []).map((e: any) => e.summary).join(', ');

        // ── 5. Inject straight into Sovereign Notebook ──
        // This makes the Swarm autonomously aware of tomorrow's schedule.
        const dropContent = `[OVERNIGHT SYNC - GOOGLE CALENDAR]
User: ${account.user.email}
Time: ${new Date().toISOString()}
Next 5 Events Detected: ${eventSummary || 'Clear Schedule'}
`;

        await prisma.notebookDrop.create({
          data: {
            title: `[Google Workspace Sync] ${account.user.email}`,
            author: account.user.email || 'System',
            content: dropContent,
            tags: ['GoogleWorkspace', 'API_SYNC', 'TELEMETRY'],
            sourceSystem: 'cron-worker',
          }
        });

        report.push({ userId: account.user.id, status: 'Synced', refreshed });
      } else {
        report.push({ userId: account.user.id, status: 'Calendar API Error' });
      }
    }

    return NextResponse.json({ success: true, processed: accounts.length, report });

  } catch (err: any) {
    console.error('[CRON Worker] Google Sync Failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
