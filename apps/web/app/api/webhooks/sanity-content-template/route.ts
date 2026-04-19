// apps/web/app/api/webhooks/sanity-content-template/route.ts
// POST — Sanity webhook fires when a contentTemplate document is created,
// updated, or deleted. We invalidate the in-process template cache so
// Tracy's edits take effect on the next wizard call.
//
// Configure in Sanity manage.sanity.io:
//   - URL: https://[your-domain]/api/webhooks/sanity-content-template
//   - Trigger: on create/update/delete of _type == "contentTemplate"
//   - Filter: _type == "contentTemplate" (optional — we handle the type check here)
//   - Secret: set SANITY_REVALIDATE_SECRET env var, include it as a header

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { templates } from '@bigmuddy/content-creation';
import { apiLog } from '@/lib/api-logger';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.SANITY_REVALIDATE_SECRET;
  if (webhookSecret) {
    const signature = request.headers.get('sanity-webhook-signature');
    if (signature !== webhookSecret) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  let body: {
    _type?: string;
    _id?: string;
    contentType?: string;
    brand?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Only handle contentTemplate docs
  if (body._type !== 'contentTemplate') {
    return NextResponse.json({
      received: true,
      action: 'ignored',
      reason: `Not a contentTemplate (type=${body._type})`,
    });
  }

  // Invalidate the specific combo if we can parse it — fall back to full flush
  if (body.contentType && body.brand) {
    templates.invalidateCache(
      body.contentType as never,
      body.brand as never
    );
    apiLog.info('webhooks/sanity-content-template', 'cache invalidated for combo', {
      contentType: body.contentType,
      brand: body.brand,
    });
  } else {
    templates.invalidateCache();
    apiLog.info('webhooks/sanity-content-template', 'full cache flush', {
      id: body._id,
    });
  }

  return NextResponse.json({ received: true, action: 'invalidated' });
}
