export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { newsletterProvider } from '@/lib/newsletter-provider';

// Simple email regex — catches most obvious typos without being overly strict
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/newsletter/subscribe
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, brand } = body as { email?: string; brand?: string };

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 },
      );
    }

    const trimmed = email.trim().toLowerCase();

    if (!EMAIL_RE.test(trimmed)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 },
      );
    }

    const result = await newsletterProvider.subscribe(trimmed, brand);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Subscription failed' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API Error] POST /api/newsletter/subscribe', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
