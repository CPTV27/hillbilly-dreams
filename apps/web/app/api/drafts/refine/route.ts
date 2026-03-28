import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { getGeminiModel } from '@/lib/vertex-client';

const model = getGeminiModel();

export async function POST(req: NextRequest) {
  const { draftId, instruction } = await req.json();
  if (!draftId || !instruction) return NextResponse.json({ error: 'draftId and instruction required' }, { status: 400 });

  try {
    const draft = await (prisma as any).pendingDraft.findUnique({ where: { id: draftId } });
    if (!draft) return NextResponse.json({ error: 'Draft not found' }, { status: 404 });

    const result = await model.generateContent(
      `Rewrite this ${draft.channel} content with this direction: "${instruction}"\n\nOriginal:\n${draft.content}`
    );
    const refined = result.response.candidates?.[0]?.content?.parts?.[0]?.text || draft.content;

    const refinements = JSON.parse(draft.refinements || '[]');
    refinements.push({ instruction, timestamp: new Date().toISOString() });

    await (prisma as any).pendingDraft.update({
      where: { id: draftId },
      data: { content: refined, refinements: JSON.stringify(refinements) },
    });

    return NextResponse.json({ success: true, content: refined });
  } catch (error: any) {
    return NextResponse.json({ error: 'Refine failed', detail: error.message }, { status: 500 });
  }
}
