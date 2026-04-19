// apps/web/app/api/finance/buckets/log/route.ts
// POST — log Studio C bucket-hour consumption against an entity.
// Admin-gated. Used by Tracy / Chase for monthly bookkeeping.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { buckets } from '@bigmuddy/finance';
import type { EntityId } from '@bigmuddy/finance';

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  let body: {
    bucketMonth?: string;
    consumingEntityId: EntityId | string;
    hoursWorked: number;
    hourlyRateCents?: number;
    workedBy?: string;
    workType?: string;
    workedDate: string;
    projectRef?: string;
    notes?: string;
    invoiceRef?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.consumingEntityId || body.hoursWorked == null || !body.workedDate) {
    return NextResponse.json(
      { error: 'consumingEntityId, hoursWorked, workedDate required' },
      { status: 400 }
    );
  }

  const workedDate = new Date(body.workedDate);
  const bucketMonth = body.bucketMonth ?? buckets.bucketMonthFor(workedDate);

  try {
    const row = await buckets.logHours({
      bucketMonth,
      consumingEntityId: body.consumingEntityId,
      hoursWorked: body.hoursWorked,
      hourlyRateCents: body.hourlyRateCents,
      workedBy: body.workedBy,
      workType: body.workType,
      workedDate,
      projectRef: body.projectRef,
      notes: body.notes,
      invoiceRef: body.invoiceRef,
    });
    return NextResponse.json({ data: row });
  } catch (err) {
    console.error('[POST /api/finance/buckets/log]', err);
    const message = err instanceof Error ? err.message : 'Log failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
