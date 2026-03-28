import { NextRequest, NextResponse } from 'next/server';
import { listIntegrations } from '@/lib/postiz-client';

/**
 * GET /api/social/accounts
 * List connected social media accounts from Postiz.
 */
export async function GET(req: NextRequest) {
  try {
    const integrations = await listIntegrations();
    return NextResponse.json({ success: true, integrations });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch accounts', detail: error.message },
      { status: 500 }
    );
  }
}
