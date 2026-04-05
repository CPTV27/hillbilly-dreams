export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { callAI } from '@/lib/ai-models';

/**
 * POST /api/marketing/reviews
 * Fetches recent reviews and drafts AI responses based on brand DNA.
 * The Reputation Guardian — core $99/mo differentiator.
 *
 * Body: { contextKey: string, reviews?: array }
 * If reviews not provided, uses sample data for demo.
 *
 * Backlog: Google My Business API for live reviews — GitHub#205
 * when the business has connected their Google Business Profile.
 */
export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { contextKey, businessId, reviews } = await req.json();

  const dnaKey = contextKey || (businessId ? `dna.business.${businessId}` : null);

  try {
    // 1. Fetch DNA for voice matching
    let dna: any = {};
    if (dnaKey) {
      const context = await prisma.agentContext.findUnique({
        where: { domain_key: { domain: 'marketing', key: dnaKey } },
      });
      if (context) dna = JSON.parse(context.content);
    }

    // 2. Use provided reviews or sample data for demo
    const reviewsToProcess = reviews || [
      { author: 'Local Guest', rating: 5, comment: 'Best tamales in the Delta! We drive an hour just for these.' },
      { author: 'Passing Through', rating: 2, comment: 'Wait was too long and nobody greeted us.' },
      { author: 'Weekend Visitor', rating: 4, comment: 'Great food, charming atmosphere. Parking could be better.' },
    ];

    // 3. Generate responses via Vertex AI
    const prompt = `You are the review response writer for the Deep South Directory. You help local businesses respond to their Google reviews in a way that sounds authentic, warm, and professional — never corporate or robotic.

Business DNA: ${JSON.stringify(dna)}
Brand voice: ${dna.brandVoice || 'Warm Southern, conversational'}

Draft responses to these reviews. Each response should:
- Be 2-3 sentences max
- Sound like it was written by a real person who cares
- For positive reviews: be genuinely grateful, mention something specific
- For negative reviews: be empathetic, offer a solution, invite them back
- Match the brand's voice and personality

Reviews:
${JSON.stringify(reviewsToProcess, null, 2)}

Return ONLY valid JSON (no markdown):
[
  {
    "reviewAuthor": "name",
    "reviewRating": number,
    "reviewComment": "original review",
    "draftResponse": "your drafted response",
    "sentiment": "positive | neutral | negative",
    "urgency": "low | medium | high"
  }
]`;

    const result = await callAI({
      role: 'generation',
      system: 'You return only valid JSON as specified. No markdown code fences.',
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 8192,
      temperature: 0.35,
    });
    const responseText = result.text || '[]';
    const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const drafts = JSON.parse(cleaned);

    return NextResponse.json({ success: true, drafts, reviewCount: drafts.length });
  } catch (error: any) {
    console.error('[marketing/reviews] Error:', error.message);
    return NextResponse.json(
      { error: 'Review response generation failed', detail: error.message },
      { status: 500 }
    );
  }
}
