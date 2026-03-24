// apps/web/app/api/ingestion/quickbooks/route.ts
// ─────────────────────────────────────────────────────────────
// QBO Ingestion Endpoint — Sovereign Node Data Pipeline
// ─────────────────────────────────────────────────────────────
// Reads vaulted OAuth tokens from the Account table (PrismaAdapter),
// fetches P&L data from Intuit's QuickBooks API, and returns
// structured margin recovery metrics for the dashboard.
//
// Token lifecycle: access_token → API call → if 401, refresh → retry.
// ─────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@bigmuddy/database';

const QBO_BASE = process.env.QBO_SANDBOX === 'true'
  ? 'https://sandbox-quickbooks.api.intuit.com'
  : 'https://quickbooks.api.intuit.com';

export async function GET() {
  // ── 1. Authenticate via NextAuth session ──
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── 2. Retrieve vaulted QBO tokens from Account table ──
  const qboAccount = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      provider: 'quickbooks',
    },
  });

  if (!qboAccount?.access_token) {
    return NextResponse.json({
      error: 'QuickBooks not connected',
      connected: false,
      action: 'User must complete OAuth flow via /measurably-better dashboard',
    }, { status: 404 });
  }

  const realmId = qboAccount.providerAccountId;
  const accessToken = qboAccount.access_token;

  // ── 3. Fetch P&L from Intuit API ──
  try {
    const pnlUrl = `${QBO_BASE}/v3/company/${realmId}/reports/ProfitAndLoss?minorversion=70`;

    const response = await fetch(pnlUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    // ── 4. Handle token expiry ──
    if (response.status === 401) {
      // TODO: Implement token refresh flow:
      // 1. POST to https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer
      //    with grant_type=refresh_token, refresh_token=qboAccount.refresh_token
      // 2. Update Account record with new access_token + refresh_token
      // 3. Retry the original request
      // For now, signal the frontend to re-auth:
      return NextResponse.json({
        error: 'QBO token expired — re-authentication required',
        connected: false,
        requiresReauth: true,
      }, { status: 401 });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[QBO Ingestion] API error:', response.status, errorText);
      return NextResponse.json({
        error: 'QuickBooks API error',
        status: response.status,
      }, { status: 502 });
    }

    const pnlData = await response.json();

    // ── 5. Extract margin recovery metrics ──
    // Intuit P&L response structure: Header, Rows, Columns
    const rows = pnlData?.Rows?.Row || [];

    // Extract top-level summary (Income, Expenses, Net Income)
    const extractSummary = (label: string) => {
      const row = rows.find((r: any) =>
        r?.Summary?.ColData?.[0]?.value?.toLowerCase().includes(label.toLowerCase())
      );
      return row?.Summary?.ColData?.[1]?.value
        ? parseFloat(row.Summary.ColData[1].value)
        : null;
    };

    const totalIncome = extractSummary('Total Income') ?? extractSummary('Income');
    const totalExpenses = extractSummary('Total Expenses') ?? extractSummary('Expenses');
    const netIncome = extractSummary('Net Income');

    const grossMargin = totalIncome && totalExpenses
      ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)
      : null;

    return NextResponse.json({
      connected: true,
      provider: 'quickbooks',
      realmId,
      metrics: {
        totalIncome,
        totalExpenses,
        netIncome,
        grossMarginPct: grossMargin ? `${grossMargin}%` : null,
        // Margin recovery estimate: 23% admin overhead × total expenses
        estimatedRecovery: totalExpenses
          ? Math.round(totalExpenses * 0.23)
          : null,
        monthlyNodeCost: 99,
        annualNodeCost: 1188,
        roiMultiple: totalExpenses
          ? `${(totalExpenses * 0.23 / 1188).toFixed(1)}x`
          : null,
      },
      raw: pnlData,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[QBO Ingestion] Fetch failed:', err);
    return NextResponse.json({
      error: 'Failed to fetch QuickBooks data',
      connected: true,
      realmId,
    }, { status: 500 });
  }
}
