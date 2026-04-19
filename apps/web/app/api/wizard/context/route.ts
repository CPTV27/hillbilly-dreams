// apps/web/app/api/wizard/context/route.ts
// POST — resolve a wizard context: extract entities + photos from a topic.
// Admin-gated (Tracy + team use the wizard internally).

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { entityResolver, immichClient, templates } from '@bigmuddy/content-creation';
import type { ContentType, Brand, WizardContext } from '@bigmuddy/content-creation';
import { callAI } from '@/lib/ai-models';

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  let body: { topic: string; contentType: ContentType; brand: Brand };
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

  // Stage 1: extractor — use Gemini Flash via existing ai-models router
  const extractor = async (topic: string) => {
    const result = await callAI({
      role: 'generation',
      system:
        'Extract search terms from the user topic. Respond ONLY with JSON of shape { "keywords": string[], "categories": string[], "locations": string[] }. Categories should be broad (e.g. "venue", "musician", "restaurant"). Locations are cities or states.',
      messages: [{ role: 'user', content: topic }],
      maxTokens: 400,
      temperature: 0.2,
    });
    try {
      const cleaned = result.text.replace(/```json\n?|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return {
        keywords: parsed.keywords ?? [],
        categories: parsed.categories ?? [],
        locations: parsed.locations ?? [],
      };
    } catch {
      return { keywords: topic.split(/\s+/).slice(0, 5) };
    }
  };

  try {
    const [entities, photos] = await Promise.all([
      entityResolver.resolveEntities(body.topic, extractor),
      immichClient.searchPhotos(body.topic, { limit: 12 }).catch((e) => {
        // Non-fatal — wizard works without photos
        console.warn('[wizard/context] Immich search failed:', e.message);
        return [];
      }),
    ]);

    const template = templates.getTemplate(body.contentType, body.brand);

    const context: WizardContext = {
      topic: body.topic,
      contentType: body.contentType,
      brand: body.brand,
      entities,
      photos,
      template,
    };
    return NextResponse.json({ data: context });
  } catch (err) {
    console.error('[POST /api/wizard/context]', err);
    const message = err instanceof Error ? err.message : 'Context failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
