export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { callAI } from '@/lib/ai-models';

/**
 * POST /api/marketing/radio-spot
 * Generates a radio spot SCRIPT from the business's Marketing DNA.
 *
 * NOTE: Full audio generation (Lyria 3 Pro) is not yet available via
 * Vertex AI API. This generates the script and voiceover text.
 * Audio rendering will use Cloud Text-to-Speech when ready.
 *
 * Body: { contextKey: string } or { businessId: number }
 */
export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { contextKey, businessId } = await req.json();

  const dnaKey = contextKey
    || (businessId ? `dna.business.${businessId}` : null);

  if (!dnaKey) {
    return NextResponse.json(
      { error: 'Provide contextKey or businessId' },
      { status: 400 }
    );
  }

  try {
    // 1. Fetch the DNA
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

    // 2. Generate the radio spot script
    const prompt = `You are a radio copywriter for Big Muddy Radio, the voice of the Mississippi music corridor.

Using this Marketing DNA:
${JSON.stringify(dna, null, 2)}

Write a 30-second radio spot script for this business. The style should be warm, Southern, inviting — like a friend telling you about their favorite place.

Return ONLY valid JSON (no markdown):
{
  "title": "Spot title",
  "duration": "30 seconds",
  "script": "The full voiceover script, with [MUSIC: description] cues",
  "voiceDirection": "Warm Southern male/female, conversational pace",
  "musicBed": "Description of the background music mood",
  "tagline": "A memorable closing line",
  "callToAction": "Visit us at... / Find us on the Deep South Directory"
}`;

    const result = await callAI({
      role: 'generation',
      system: 'You return only valid JSON as specified. No markdown code fences.',
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 4096,
      temperature: 0.4,
    });
    const responseText = result.text || '{}';
    const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const spot = JSON.parse(cleaned);

    // 3. Store in AgentContext
    const spotKey = dnaKey.replace('dna.', 'radio-spot.');
    await prisma.agentContext.upsert({
      where: { domain_key: { domain: 'entertainment', key: spotKey } },
      create: {
        domain: 'entertainment',
        key: spotKey,
        topic: 'radio-spot',
        content: JSON.stringify(spot),
        source: 'api/marketing/radio-spot',
        agentAuthor: 'radio-spot-generator',
        confidence: 0.9,
      },
      update: {
        content: JSON.stringify(spot),
        confidence: 0.9,
      },
    });

    // TODO: When Cloud Text-to-Speech integration is ready,
    // render the script to audio and upload to GCS:
    // gs://bmt-media-bigmuddy/radio/spots/{businessId}.mp3

    return NextResponse.json({ success: true, spot, spotKey });
  } catch (error: any) {
    console.error('[marketing/radio-spot] Error:', error.message);
    return NextResponse.json(
      { error: 'Radio spot generation failed', detail: error.message },
      { status: 500 }
    );
  }
}
