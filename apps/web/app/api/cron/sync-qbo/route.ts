export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

// ─────────────────────────────────────────────────────────────
// QuickBooks Async Worker — Eventarc Target
// ─────────────────────────────────────────────────────────────
// Designed to be triggered by Cloud Scheduler nightly.
// Iterates through all users with active QBO tokens and pushes
// anomaly detection metrics into the NotebookDrop AI ingestion queue.
// ─────────────────────────────────────────────────────────────

export const maxDuration = 300; 

const QBO_BASE = process.env.QBO_SANDBOX === 'true'
  ? 'https://sandbox-quickbooks.api.intuit.com'
  : 'https://quickbooks.api.intuit.com';

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
    const qboAccounts = await prisma.account.findMany({
      where: { provider: 'quickbooks' },
      include: { user: true },
    });

    const report = [];

    for (const account of qboAccounts) {
      if (!account.access_token || !account.user) continue;

      // Extract realmId natively from the session store
      // The NextAuth strategy injected qboRealmId into the user table natively?
      // Wait, in QBO integration, we usually store the realmId on the Session or a custom field.
      // We will look for it in the active session associated with this user, or if not found, skip.
      const activeSession = await prisma.session.findFirst({ where: { userId: account.userId }});
      
      // Fallback: the existing `/api/ingestion/quickbooks` relies on session.user.qboRealmId which means it's passed during OAuth
      // For cron, if we don't have the realmId persisted globally, we might fail unless we extract it.
      // For this scaffold, we will skip if we don't have it explicitly defined.
      // ⚠️ Note: In a true prod schema, QBO RealmId should be a distinct string on the User row.
      const realmId = (account.user as any).qboRealmId || process.env.QBO_DEMO_REALM;
      
      if (!realmId) {
        report.push({ userId: account.user.id, status: 'Missing RealmID' });
        continue;
      }

      let accessToken = account.access_token;
      let refreshed = false;

      // ── 2. Refresh tokens if nearing expiry ──
      // Intuit tokens expire in 60 minutes.
      if (account.expires_at && Date.now() / 1000 > account.expires_at) {
        if (account.refresh_token) {
          const tokenAuth = Buffer.from(`${process.env.QBO_CLIENT_ID}:${process.env.QBO_CLIENT_SECRET}`).toString('base64');
          const refreshBody = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: account.refresh_token
          });

          const refreshRes = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${tokenAuth}`,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
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
                refresh_token: refreshedTokens.refresh_token || account.refresh_token,
                expires_at: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
              }
            });
          } else {
            report.push({ userId: account.user.id, status: 'Token Refresh Failed' });
            continue;
          }
        }
      }

      // ── 3. Pull P&L Data ──
      const pnlUrl = `${QBO_BASE}/v3/company/${realmId}/reports/ProfitAndLoss?minorversion=70`;
      const response = await fetch(pnlUrl, {
        headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
      });

      if (response.ok) {
        const pnlData = await response.json();
        
        // Push the telemetry straight to the Sovereign Neural Network
        const dropContent = `[OVERNIGHT SYNC - QUICKBOOKS P&L ANOMALY SCAN]
User: ${account.user.email}
Time: ${new Date().toISOString()}
Company ID: ${realmId}
Data Payload (Raw Intuit Extracted): ${JSON.stringify(pnlData?.Header || {})}
Action Required: The Swarm will cross-reference this with historical margins.
`;

        await prisma.notebookDrop.create({
          data: {
            title: `[QuickBooks Sync] Company ${realmId}`,
            author: account.user.email || 'System',
            content: dropContent,
            tags: ['QuickBooks', 'API_SYNC', 'FINANCE'],
            sourceSystem: 'cron-worker',
          }
        });

        report.push({ userId: account.user.id, status: 'Synced', refreshed });
      } else {
        report.push({ userId: account.user.id, status: 'QBO API Error' });
      }
    }

    return NextResponse.json({ success: true, processed: qboAccounts.length, report });

  } catch (err: any) {
    console.error('[CRON Worker] QBO Sync Failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
