export const dynamic = 'force-dynamic';
// apps/web/app/api/social/generate/route.ts
// POST /api/social/generate — AI-powered social post content generation
// Takes a prompt or source content and generates platform-appropriate copy
//
// Body: { platform, brand?, prompt?, sourceContent?, tone? }
// Returns: { posts: string[] } — array of generated post options

import { NextResponse } from 'next/server';
import { ModelTier } from '@/lib/ai/modelTier';
import { generateTextWithTierOrVertex } from '@/lib/ai/openRouter';

const PLATFORM_GUIDES: Record<string, string> = {
  twitter: 'Twitter/X: Max 280 characters. Punchy, conversational. Use 1-2 hashtags max. No emoji overload.',
  tiktok: 'TikTok caption: 2-3 short sentences. Hook first, value second. Use 3-5 trending hashtags. Casual, energetic.',
  instagram: 'Instagram caption: Can be longer (up to 2200 chars). Storytelling format. Line breaks for readability. 5-10 hashtags at end.',
  threads: 'Threads: Similar to Twitter but can go longer. Conversational, thread-friendly. Minimal hashtags.',
  bluesky: 'Bluesky: Max 300 characters. Similar to early Twitter energy. Authentic, community-focused.',
  linkedin: 'LinkedIn: Professional but human. 1-2 short paragraphs. Insight-driven. No hashtags in body, 3 at end.',
};

const BRAND_VOICES: Record<string, string> = {
  bigmuddy: 'Big Muddy Entertainment: Southern, warm, authentic. Blues-soaked hospitality. "Where the music lives." Think front-porch storytelling meets editorial polish.',
  radio: 'Big Muddy Radio: Music-forward, curator energy. Deep cuts and live sessions. "Your soundtrack to the Deep South."',
  magazine: 'Big Muddy Magazine: Editorial, visual, story-driven. City guides and culture pieces. Rich descriptions, travel-magazine tone.',
  touring: 'Big Muddy Touring: Adventure, discovery, road-trip energy. The Deep South as America\'s most underrated route.',
  economics: 'Outsider Economics: Intellectual rebel energy. Counter-narrative economics. Sharp, contrarian, backed by real theory. Think "economics for people who question everything."',
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const platform = (body.platform as string) ?? 'twitter';
  const brand = (body.brand as string) ?? 'bigmuddy';
  const prompt = (body.prompt as string) ?? '';
  const sourceContent = (body.sourceContent as string) ?? '';
  const tone = (body.tone as string) ?? '';
  const count = Math.min((body.count as number) ?? 3, 5);

  if (!prompt && !sourceContent) {
    return NextResponse.json({ error: 'Either prompt or sourceContent is required.' }, { status: 400 });
  }

  const platformGuide = PLATFORM_GUIDES[platform] ?? PLATFORM_GUIDES.twitter;
  const brandVoice = BRAND_VOICES[brand] ?? BRAND_VOICES.bigmuddy;

  const systemPrompt = `You are a social media content creator for Big Muddy Entertainment, a multi-brand media company based along the Deep South.

Brand voice: ${brandVoice}

Platform constraints: ${platformGuide}

${tone ? `Additional tone direction: ${tone}` : ''}

Generate exactly ${count} distinct post options. Each should take a different angle or hook. Return ONLY the posts, numbered 1-${count}, with no other commentary. Do not include quotation marks around the posts.`;

  const userMessage = sourceContent
    ? `Create ${count} social media posts for ${platform} based on this content:\n\n${sourceContent}\n\n${prompt ? `Additional direction: ${prompt}` : ''}`
    : `Create ${count} social media posts for ${platform}. Direction: ${prompt}`;

  try {
    const result = await generateTextWithTierOrVertex(ModelTier.ARCHITECT, `${systemPrompt}\n\n${userMessage}`, { 
      maxOutputTokens: 1024,
      telemetry: {
         toolId: 'marketing.social',
         modelTier: ModelTier.ARCHITECT
       }
    });

    const text = result.text;

    // Parse numbered posts
    const posts = text
      .split(/\n?\d+[\.\)]\s+/)
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0);

    return NextResponse.json({ posts, platform, brand });
  } catch (err) {
    console.error('[POST /api/social/generate]', err);
    return NextResponse.json({ error: 'Content generation failed' }, { status: 500 });
  }
}
