export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { getGeminiModel } from '@/lib/vertex-client';

let _model: ReturnType<typeof getGeminiModel> | null = null;
function model() { if (!_model) _model = getGeminiModel(); return _model; }

/**
 * POST /api/marketing/social
 * Generates a 3-post social campaign from the business's Marketing DNA.
 * Uses Vertex AI to create on-brand captions and image prompts.
 *
 * Body: { contextKey: string } — the AgentContext key from the DNA scan
 *   OR  { businessId: number } — looks up dna.business.{id}
 */
export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { contextKey, businessId } = await req.json();

  // Resolve the DNA context key
  const dnaKey = contextKey
    || (businessId ? `dna.business.${businessId}` : null);

  if (!dnaKey) {
    return NextResponse.json(
      { error: 'Provide contextKey or businessId' },
      { status: 400 }
    );
  }

  try {
    // 1. Fetch the DNA from AgentContext
    const context = await prisma.agentContext.findUnique({
      where: { domain_key: { domain: 'marketing', key: dnaKey } },
    });

    if (!context) {
      return NextResponse.json(
        { error: 'Marketing DNA not found. Run /api/marketing/dna first.' },
        { status: 404 }
      );
    }

    const dna = JSON.parse(context.content);

    // 2. Generate the campaign via Vertex AI
    const prompt = `You are a social media strategist for the Deep South Directory, a regional business network along the Mississippi corridor.

Using this Marketing DNA profile:
${JSON.stringify(dna, null, 2)}

Generate a 3-post Instagram campaign for this business. Each post should feel like it was produced by a professional media company, not a software tool.

Return ONLY a valid JSON array (no markdown, no backticks):
[
  {
    "caption": "Engaging, on-brand caption with hashtags. Voice should match their brandVoice.",
    "imagePrompt": "Detailed prompt for Vertex AI Imagen to generate a professional photo. Include: the business type, their colors, Natchez/Deep South setting, golden hour lighting, editorial photography style. NO text in the image.",
    "platform": "instagram",
    "strategy": "One sentence explaining why this post works for their target audience."
  }
]`;

    const result = await model().generateContent(prompt);
    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
    const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const campaign = JSON.parse(cleaned);

    // 3. Store the campaign in AgentContext
    const campaignKey = dnaKey.replace('dna.', 'campaign.');
    await prisma.agentContext.upsert({
      where: { domain_key: { domain: 'marketing', key: campaignKey } },
      create: {
        domain: 'marketing',
        key: campaignKey,
        topic: 'social-campaign',
        content: JSON.stringify(campaign),
        source: 'api/marketing/social',
        agentAuthor: 'social-multiplier',
        confidence: 0.9,
      },
      update: {
        content: JSON.stringify(campaign),
        confidence: 0.9,
      },
    });

    return NextResponse.json({ success: true, campaign, campaignKey });
  } catch (error: any) {
    console.error('[marketing/social] Error:', error.message);
    return NextResponse.json(
      { error: 'Social campaign generation failed', detail: error.message },
      { status: 500 }
    );
  }
}
