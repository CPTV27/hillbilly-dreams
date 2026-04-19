// apps/web/app/api/webhooks/sanity-page-content/route.ts
// POST — Sanity webhook fires on pageContent create/update/delete.
// Invalidates the in-process cache so Tracy's edits propagate instantly.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { invalidatePageContentCache } from '@/lib/page-content';
import { apiLog } from '@/lib/api-logger';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.SANITY_REVALIDATE_SECRET;
  if (webhookSecret) {
    const signature = request.headers.get('sanity-webhook-signature');
    if (signature !== webhookSecret) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  let body: { _type?: string; _id?: string; slug?: string; brand?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (body._type !== 'pageContent') {
    return NextResponse.json({
      received: true,
      action: 'ignored',
      reason: `Not a pageContent doc (type=${body._type})`,
    });
  }

  if (body.slug) {
    invalidatePageContentCache(body.slug, body.brand);
    apiLog.info('webhooks/sanity-page-content', 'cache invalidated', {
      slug: body.slug,
      brand: body.brand,
    });
  } else {
    invalidatePageContentCache();
    apiLog.info('webhooks/sanity-page-content', 'full cache flush', { id: body._id });
  }

  return NextResponse.json({ received: true, action: 'invalidated' });
}
