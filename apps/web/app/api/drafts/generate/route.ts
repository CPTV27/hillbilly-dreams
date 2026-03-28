import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { getGeminiModel } from '@/lib/vertex-client';

const model = getGeminiModel();

export async function POST(req: NextRequest) {
  const { sourceType, sourceId } = await req.json();
  if (!sourceType || !sourceId) return NextResponse.json({ error: 'sourceType and sourceId required' }, { status: 400 });

  try {
    let context = '';
    if (sourceType === 'show_event') {
      const show = await (prisma as any).showEvent.findUnique({ where: { id: parseInt(sourceId) } });
      if (!show) return NextResponse.json({ error: 'Show not found' }, { status: 404 });
      context = `Show: ${show.artist} at ${show.venue} on ${show.dateTime}. ${show.description || ''}`;
    } else if (sourceType === 'business') {
      const biz = await prisma.directoryBusiness.findFirst({ where: { slug: sourceId } });
      if (!biz) return NextResponse.json({ error: 'Business not found' }, { status: 404 });
      context = `Business: ${biz.name} in ${biz.city}, ${biz.state}. ${biz.category}. ${biz.description || ''}`;
    }

    const channels = ['social', 'magazine', 'radio', 'reviews'];
    const prompts: Record<string, string> = {
      social: `Write 3 engaging Instagram posts for: ${context}. Return just the captions with hashtags, separated by ---`,
      magazine: `Write a 200-word magazine feature blurb in Southern editorial style for: ${context}`,
      radio: `Write a 30-second radio spot script for: ${context}. Include voiceover direction.`,
      reviews: `Write 2 sample review responses (one 5-star, one 3-star) for: ${context}`,
    };

    const draftIds: number[] = [];
    for (const channel of channels) {
      const result = await model.generateContent(prompts[channel]);
      const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '';

      const draft = await (prisma as any).pendingDraft.create({
        data: {
          channel,
          title: `${channel.charAt(0).toUpperCase() + channel.slice(1)} — ${sourceType === 'show_event' ? 'Show' : 'Business'}`,
          content: text,
          status: 'pending',
          sourceType,
          sourceId: String(sourceId),
          agentAuthor: 'showrunner',
        },
      });
      draftIds.push(draft.id);
    }

    return NextResponse.json({ success: true, draftIds, count: draftIds.length });
  } catch (error: any) {
    return NextResponse.json({ error: 'Generation failed', detail: error.message }, { status: 500 });
  }
}
