// apps/web/app/api/wizard/generate/route.ts
// POST — generate a draft via the wizard. Uses resolved context (entities +
// photos + template) and the existing ai-models router for failover.
// For v1 we return a single-shot draft; AI SDK v6 ToolLoopAgent streaming
// comes in a follow-up.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { callAI } from '@/lib/ai-models';
import type {
  ContentType,
  Brand,
  EntityCandidate,
  PhotoCandidate,
  GeneratedDraft,
} from '@bigmuddy/content-creation';
import { templates } from '@bigmuddy/content-creation';

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  let body: {
    topic: string;
    contentType: ContentType;
    brand: Brand;
    entities: EntityCandidate[];
    photos: PhotoCandidate[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body.topic || !body.contentType || !body.brand) {
    return NextResponse.json(
      { error: 'topic, contentType, brand required' },
      { status: 400 }
    );
  }

  const template = await templates.loadTemplate(body.contentType, body.brand);

  // Pack entity + photo context into a user message. Hard ground.
  const entityBlock =
    body.entities.length > 0
      ? `\n\nENTITIES AVAILABLE (only reference these):\n${body.entities
          .map(
            (e) =>
              `- ${e.name} [${e.category}${e.city ? ` · ${e.city}` : ''}]${e.description ? ` — ${e.description.slice(0, 120)}` : ''}`
          )
          .join('\n')}`
      : '\n\nNo entity candidates available for this topic.';

  const photoBlock =
    body.photos.length > 0
      ? `\n\nPHOTO ASSETS AVAILABLE (reference by assetId if used):\n${body.photos
          .map(
            (p) =>
              `- ${p.assetId}${p.takenAt ? ` (${p.takenAt.slice(0, 10)})` : ''}${p.caption ? ` — ${p.caption}` : ''}`
          )
          .join('\n')}`
      : '';

  const prompt = `TOPIC: ${body.topic}${entityBlock}${photoBlock}

Write the ${body.contentType} now. Target length: ${template.lengthTarget.min}–${template.lengthTarget.max} words. Output ONLY the draft (no preamble, no surrounding commentary). Start with a title on the first line, then a blank line, then the body.`;

  try {
    const result = await callAI({
      role: 'editorial',
      system: template.systemPrompt,
      messages: [{ role: 'user', content: prompt }],
      maxTokens: Math.min(template.lengthTarget.max * 3, 6000),
      temperature: 0.7,
    });

    // Split first line as title, rest as body
    const lines = result.text.trim().split('\n');
    const title = lines[0] ?? body.topic;
    const bodyText = lines.slice(1).join('\n').trim();

    const draft: GeneratedDraft = {
      title,
      body: bodyText,
      wizardMeta: {
        topic: body.topic,
        contentType: body.contentType,
        brand: body.brand,
        entityIds: body.entities.map((e) => e.id),
        photoAssetIds: body.photos.map((p) => p.assetId),
        aiModel: result.label,
        generatedAt: new Date().toISOString(),
      },
    };

    return NextResponse.json({ data: draft });
  } catch (err) {
    console.error('[POST /api/wizard/generate]', err);
    const message = err instanceof Error ? err.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
