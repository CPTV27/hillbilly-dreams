export const dynamic = 'force-dynamic';
import { prisma } from '@bigmuddy/database';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { callAI } from '@/lib/ai-models';
import { cloudLog } from '@/lib/cloud-logger';

export async function POST(req: Request) {
    const start = Date.now();
    const denied = await requireAdmin();
    if (denied) return denied;

    const { reviewId } = await req.json();
    if (!reviewId) return NextResponse.json({ error: 'reviewId required' }, { status: 400 });

    const review = await prisma.review.findUnique({
        where: { id: reviewId },
        include: { client: { select: { name: true, businessType: true, city: true, state: true } } },
    });

    if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

    const systemPrompt = `You are Delta Dawn, responding to a guest review on behalf of ${review.client.name} (a ${review.client.businessType || 'business'} in ${review.client.city || 'the area'}, ${review.client.state || 'MS'}).

Write a warm, professional response. Guidelines:
- Thank them by first name
- If positive (4-5 stars): express genuine gratitude, reference something specific from the review, invite them back
- If neutral (3 stars): acknowledge feedback, mention improvements, offer to make it right
- If negative (1-2 stars): apologize sincerely, take responsibility, offer to follow up offline
- Keep it under 100 words
- Be warm and Southern — this is Big Muddy
- Do NOT use the word "feedback" — it sounds corporate
- End with warmth, not a sales pitch

Write ONLY the response text, no quotes, no "Dear", no explanation.`;

    const userMessage = `The review is ${review.rating} stars on ${review.platform}:
"${review.text || '(rating only, no text)'}"
— ${review.author}`;

    const result = await callAI({
        role: 'generation',
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
        maxTokens: 300,
    });

    const draft = result.text;

    await prisma.review.update({
        where: { id: reviewId },
        data: { aiDraft: draft, responseStatus: 'drafted' },
    });

    // Log the draft generation
    try {
        await prisma.opsActivity.create({
            data: {
                type: 'review_draft',
                message: `AI draft generated for ${review.author}'s ${review.rating}-star ${review.platform} review (${review.client.name})`,
            },
        });
    } catch {
        // opsActivity may not exist — non-fatal
    }

    cloudLog.info('/api/ops/reviews/draft', 'ok', {
      method: 'POST',
      reviewId,
      durationMs: Date.now() - start,
      success: true,
    });
    return NextResponse.json({ draft, reviewId });
}
