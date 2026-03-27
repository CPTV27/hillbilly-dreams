// apps/web/app/api/clients/[id]/calendar/route.ts
// GET /api/clients/:id/calendar — list calendars
// POST /api/clients/:id/calendar — generate a content calendar for a month

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '@/lib/db';

type Params = { params: { id: string } };

const MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export async function GET(_request: NextRequest, { params }: Params) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const calendars = await (prisma as any).contentCalendar.findMany({
      where: { clientId: id },
      orderBy: [{ year: 'desc' as const }, { month: 'desc' as const }],
    });
    return NextResponse.json({ data: calendars });
  } catch (err) {
    console.error('[GET /api/clients/:id/calendar]', err);
    return NextResponse.json({ error: 'Failed to fetch calendars' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  const clientId = parseInt(params.id, 10);
  if (isNaN(clientId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const now = new Date();
  const month = (body.month as number) ?? now.getMonth() + 2; // Default to next month
  const year = (body.year as number) ?? (month <= 0 ? now.getFullYear() + 1 : now.getFullYear());
  const adjustedMonth = ((month - 1) % 12) + 1;
  const context = (body.context as string) ?? ''; // Additional context (events, specials, etc.)

  try {
    const client = await (prisma as any).client.findUnique({ where: { id: clientId } });
    if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

    // Determine post count based on tier
    const tierPostCounts: Record<string, number> = {
      'front-porch': 12,
      'route': 30,
      'river-room': 60,
      'blues-room': 100,
    };
    const postCount = tierPostCounts[client.tier] ?? 12;
    const voiceProfile = client.voiceProfile ? JSON.stringify(client.voiceProfile) : 'No voice profile yet — use a warm, authentic Southern tone.';

    const claude = new Anthropic({ apiKey });

    const response = await claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: `You are a social media content planner for Big Muddy Entertainment. Generate a monthly content calendar for a local business.

Brand voice: ${voiceProfile}

Rules:
- Generate exactly ${postCount} posts spread across the month
- Vary the content: promotions, behind-the-scenes, community, seasonal, user engagement
- Include platform-specific formatting (character limits, hashtag count)
- Mix post types: text-only, image-suggested, video-suggested
- Include 2-3 "engagement" posts (questions, polls, calls to action)
- Reference local events, weather, seasons appropriate for ${client.city}, ${client.state}
- Never be generic — every post should feel like it was written by someone who knows this business

Return a JSON array of objects with these fields:
- day: number (1-28/30/31)
- platform: string (one of the client's platforms)
- content: string (the actual post text)
- type: "text" | "image" | "video" | "story"
- imagePrompt: string or null (if type is image/video, describe what image to generate)
- hashtags: string[] (relevant hashtags)
- category: "promotion" | "behind-scenes" | "community" | "seasonal" | "engagement" | "educational" | "testimonial"

Return ONLY a valid JSON array, no markdown or commentary.`,
      messages: [{
        role: 'user',
        content: `Generate a content calendar for ${MONTH_NAMES[adjustedMonth]} ${year}.

Business: ${client.name}
Type: ${client.businessType}
City: ${client.city}, ${client.state}
Platforms: ${(client.platforms as string[]).join(', ') || 'instagram, facebook'}
Description: ${client.description || 'Local business'}
${context ? `Additional context/events: ${context}` : ''}`,
      }],
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('');

    let posts: unknown[];
    try {
      posts = JSON.parse(text);
      if (!Array.isArray(posts)) posts = [];
    } catch {
      posts = [];
    }

    // Save calendar
    const calendar = await (prisma as any).contentCalendar.upsert({
      where: {
        clientId_month_year: { clientId, month: adjustedMonth, year },
      },
      create: {
        clientId,
        month: adjustedMonth,
        year,
        posts,
        status: 'draft',
      },
      update: {
        posts,
        status: 'draft',
        generatedAt: new Date(),
      },
    });

    return NextResponse.json({ data: calendar });
  } catch (err) {
    console.error('[POST /api/clients/:id/calendar]', err);
    return NextResponse.json({ error: 'Failed to generate calendar' }, { status: 500 });
  }
}
