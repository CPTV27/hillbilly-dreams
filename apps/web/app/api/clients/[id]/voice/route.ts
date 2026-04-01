export const dynamic = 'force-dynamic';
// apps/web/app/api/clients/[id]/voice/route.ts
// POST /api/clients/:id/voice — Generate AI brand voice profile for a client

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '@/lib/db';

type Params = { params: { id: string } };

export async function POST(_request: NextRequest, { params }: Params) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
  }

  try {
    const client = await (prisma as any).client.findUnique({ where: { id } });
    if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

    const claude = new Anthropic({ apiKey });

    const response = await claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `You are a brand strategist for Big Muddy Entertainment, a media company serving local businesses along the Mississippi corridor. Your job is to create a concise brand voice profile that our AI content engine will use to generate social media posts, review responses, and marketing copy for this business.

Return a JSON object with these fields:
- tone: 2-3 word description (e.g., "warm and welcoming", "bold and soulful")
- personality: 1-2 sentences describing the brand personality
- vocabulary: array of 10-15 words/phrases that fit the brand
- avoidWords: array of 5-10 words/phrases to never use
- samplePost: a sample social media post in their voice
- reviewResponseStyle: how to respond to reviews (warm, professional, casual, etc.)
- hashtagStyle: preferred hashtag approach

Return ONLY valid JSON, no markdown or commentary.`,
      messages: [{
        role: 'user',
        content: `Create a brand voice profile for this business:

Name: ${client.name}
Type: ${client.businessType}
City: ${client.city}, ${client.state}
Description: ${client.description || 'No description provided'}
Website: ${client.website || 'None'}
Notes: ${client.notes || 'None'}`,
      }],
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('');

    let voiceProfile: Record<string, unknown>;
    try {
      voiceProfile = JSON.parse(text);
    } catch {
      voiceProfile = { raw: text, parseError: true };
    }

    // Save to client
    const updated = await (prisma as any).client.update({
      where: { id },
      data: { voiceProfile },
    });

    return NextResponse.json({ data: { voiceProfile: updated.voiceProfile } });
  } catch (err) {
    console.error('[POST /api/clients/:id/voice]', err);
    return NextResponse.json({ error: 'Failed to generate voice profile' }, { status: 500 });
  }
}
