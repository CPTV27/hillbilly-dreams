export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { RADIO_SHOWS } from '@/config/radio-schedule';

/**
 * GET /api/radio/schedule — show grid from config (not DB yet).
 */
export async function GET() {
  return NextResponse.json({ shows: RADIO_SHOWS });
}
