// apps/web/app/api/clients/[id]/reviews/respond/route.ts
// POST /api/clients/:id/reviews/respond — AI-generate responses for pending reviews

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '@/lib/db';

type Params = { params: { id: string } };

export async function POST(request: NextRequest, { params }: Params) {
  const clientId = parseInt(params.id, 10);
  if (isNaN(clientId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const reviewIds = body.reviewIds as number[] | undefined;

  try {

    const client = await (prisma as any).client.findUnique({ where: { id: clientId } });
    if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

    const where: Record<string, unknown> = { clientId, responseStatus: 'pending' };
    if (reviewIds) where.id = { in: reviewIds };

    const reviews = await (prisma as any).review.findMany({
      where,
      orderBy: { postedAt: 'desc' as const },
      take: 10,
    });

    if (reviews.length === 0) {
      return NextResponse.json({ data: [], message: 'No pending reviews to respond to.' });
    }

    const voiceProfile = client.voiceProfile ? JSON.stringify(client.voiceProfile) : 'Warm, professional, appreciative';

    const claude = new Anthropic({ apiKey });

    const results = [];

    for (const review of reviews) {
      const response = await claude.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 512,
        system: `You are responding to a customer review on behalf of ${client.name}, a ${client.businessType} in ${client.city}, ${client.state}.

Brand voice: ${voiceProfile}

Rules:
- Thank the reviewer by name (first name only)
- For positive reviews (4-5 stars): express genuine gratitude, mention a specific detail from their review, invite them back
- For negative reviews (1-3 stars): acknowledge their experience, apologize sincerely, offer to make it right (without being defensive), provide a way to follow up
- Keep responses under 150 words
- Sound human, not corporate
- Never use "we appreciate your feedback" or other generic phrases
- Sign off with just the business name or owner's first name

Return ONLY the response text, no quotes or additional commentary.`,
        messages: [{
          role: 'user',
          content: `Review from ${review.author} (${review.rating}/5 stars on ${review.platform}):
"${review.text || '(no text, just a rating)'}"`,
        }],
      });

      const aiDraft = response.content
        .filter((block): block is Anthropic.TextBlock => block.type === 'text')
        .map((block) => block.text)
        .join('');

      const updated = await (prisma as any).review.update({
        where: { id: review.id },
        data: { aiDraft, responseStatus: 'drafted' },
      });

      results.push(updated);
    }

    return NextResponse.json({ data: results });
  } catch (err) {
    console.error('[POST /api/clients/:id/reviews/respond]', err);
    return NextResponse.json({ error: 'Failed to generate review responses' }, { status: 500 });
  }
}
