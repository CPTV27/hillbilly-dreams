export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// apps/web/app/api/cron/monthly-reports/route.ts
// GET /api/cron/monthly-reports
// Triggered on the 1st of each month. Generates reports + PDFs for all active clients.
// Auth: CRON_SECRET bearer token (same as all other cron routes)

import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { cloudLog } from '@/lib/cloud-logger';

export async function GET(request: Request) {
  const start = Date.now();
  // Authenticate
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV !== 'development' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  // Generate report for the previous month
  const reportMonth = now.getMonth() === 0 ? 12 : now.getMonth(); // getMonth() is 0-indexed, so Jan = 0 means we want Dec
  const reportYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

  try {
    // Get all active clients
    const clients = await prisma.client.findMany({
      where: { status: 'active' },
      select: { id: true, name: true },
    });

    const results = [];
    const baseUrl = process.env.NEXTAUTH_URL?.replace(/\/$/, '')
      ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    for (const client of clients) {
      try {
        // Step 1: Generate report data + AI summary
        const reportRes = await fetch(`${baseUrl}/api/clients/${client.id}/report`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CRON_SECRET}`,
          },
          body: JSON.stringify({ month: reportMonth, year: reportYear }),
        });

        if (!reportRes.ok) {
          results.push({ clientId: client.id, name: client.name, status: 'report_failed' });
          continue;
        }

        // Step 2: Generate and save PDF
        const pdfRes = await fetch(
          `${baseUrl}/api/clients/${client.id}/report/pdf?month=${reportMonth}&year=${reportYear}&save=true`,
          {
            headers: { 'Authorization': `Bearer ${process.env.CRON_SECRET}` },
          }
        );

        if (pdfRes.ok) {
          results.push({ clientId: client.id, name: client.name, status: 'complete' });
        } else {
          results.push({ clientId: client.id, name: client.name, status: 'pdf_failed' });
        }
      } catch (err) {
        console.error(`[cron/monthly-reports] Failed for client ${client.id}:`, err);
        results.push({ clientId: client.id, name: client.name, status: 'error' });
      }
    }

    // Log to OpsActivity
    try {
      await prisma.opsActivity.create({
        data: {
          type: 'monthly_reports',
          message: `Monthly reports generated: ${results.filter(r => r.status === 'complete').length}/${clients.length} clients`,
        },
      });
    } catch { /* non-fatal */ }

    cloudLog.info('/api/cron/monthly-reports', 'ok', {
      method: 'GET',
      period: `${reportMonth}/${reportYear}`,
      totalClients: clients.length,
      completed: results.filter((r) => r.status === 'complete').length,
      durationMs: Date.now() - start,
      success: true,
    });
    return NextResponse.json({
      success: true,
      period: `${reportMonth}/${reportYear}`,
      total: clients.length,
      completed: results.filter(r => r.status === 'complete').length,
      results,
    });
  } catch (err) {
    console.error('[cron/monthly-reports]', err);
    cloudLog.error('/api/cron/monthly-reports', 'failed', err, { durationMs: Date.now() - start, success: false });
    return NextResponse.json({ error: 'Monthly report generation failed' }, { status: 500 });
  }
}
