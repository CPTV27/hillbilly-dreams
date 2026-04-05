export const dynamic = 'force-dynamic';

// POST /api/studio-c/request — Submit a video production request
// Any HDI brand can submit. Requires admin auth.

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { apiLog } from '@/lib/api-logger';

const VALID_BRANDS = ['big-muddy', 'bearsville', 'dsd', 'tuthill', 'magazine'];
const VALID_TYPES = [
  'session-recording',
  'promo-video',
  'property-tour',
  'social-clips',
  'bts',
  'documentary',
  'copy-edit', // Visual review mode → StudioCRequest (not ProductionJob)
];

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { clientBrand, clientId, requestType, brief, location, preferredDate, budget } = body;

    if (!clientBrand || !VALID_BRANDS.includes(clientBrand)) {
      return NextResponse.json({ error: `clientBrand must be one of: ${VALID_BRANDS.join(', ')}` }, { status: 400 });
    }
    if (!requestType || !VALID_TYPES.includes(requestType)) {
      return NextResponse.json({ error: `requestType must be one of: ${VALID_TYPES.join(', ')}` }, { status: 400 });
    }
    if (!brief || brief.trim().length < 10) {
      return NextResponse.json({ error: 'brief must be at least 10 characters' }, { status: 400 });
    }

    const isCopyEdit = requestType === 'copy-edit';
    const req = await prisma.studioCRequest.create({
      data: {
        clientBrand,
        clientId: clientId ? parseInt(clientId, 10) : null,
        requestType,
        brief: brief.trim(),
        location: isCopyEdit ? location || 'Not applicable' : location || 'Utopia Studios, Bearsville NY',
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        budget: budget || (isCopyEdit ? 'n/a' : 'quote-requested'),
        status: 'submitted',
      },
    });

    return NextResponse.json({ data: req }, { status: 201 });
  } catch (err) {
    apiLog.error('POST /api/studio-c/request', 'failed', err);
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
  }
}
