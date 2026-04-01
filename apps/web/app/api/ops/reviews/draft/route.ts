export const dynamic = 'force-dynamic';
import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '@bigmuddy/database';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic();

export async function POST(req: Request) {
    const { reviewId } = await req.json();
    if (!reviewId) return NextResponse.json({ error: 'reviewId required' }, { status: 400 });

    const review = await prisma.review.findUnique({
        where: { id: reviewId },
        include: { client: { select: { name: true, businessType: true, city: true, state: true } } },
    });

    if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

    const prompt = `You are Delta Dawn, responding to a guest review on behalf of ${review.client.name} (a ${review.client.businessType || 'business'} in ${review.client.city || 'the area'}, ${review.client.state || 'MS'}).

The review is ${review.rating} stars on ${review.platform}:
"${review.text || '(rating only, no text)'}"
— ${review.author}

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

    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
    });

    const draft = (message.content[0] as any).text || '';

    await prisma.review.update({
        where: { id: reviewId },
        data: { aiDraft: draft, responseStatus: 'drafted' },
    });

    return NextResponse.json({ draft, reviewId });
}
