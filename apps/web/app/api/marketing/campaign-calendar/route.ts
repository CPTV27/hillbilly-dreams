import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
  project: process.env.GCP_PROJECT_ID || 'bigmuddy-ff651',
  location: process.env.VERTEX_LOCATION || 'us-east4',
});
const model = vertexAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * POST /api/marketing/campaign-calendar
 * Generates a 30-day marketing roadmap across Magazine, Radio, and Social.
 * The "Monthly Roadmap" — shows business owners what $99/mo buys.
 *
 * Body: { contextKey: string } or { businessId: number }
 */
export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { contextKey, businessId } = await req.json();

  const dnaKey = contextKey || (businessId ? `dna.business.${businessId}` : null);

  if (!dnaKey) {
    return NextResponse.json(
      { error: 'Provide contextKey or businessId' },
      { status: 400 }
    );
  }

  try {
    // 1. Fetch DNA
    const context = await prisma.agentContext.findUnique({
      where: { domain_key: { domain: 'marketing', key: dnaKey } },
    });

    if (!context) {
      return NextResponse.json(
        { error: 'Marketing DNA not found.' },
        { status: 404 }
      );
    }

    const dna = JSON.parse(context.content);

    // 2. Generate the 30-day calendar
    const prompt = `You are the marketing strategist for the Big Muddy ecosystem — a media-hospitality company in Natchez, Mississippi that runs a Magazine, Radio station, Art Gallery, and the Deep South Directory.

Using this Marketing DNA:
${JSON.stringify(dna, null, 2)}

Create a 30-day marketing calendar for this business. This is what the "$99/mo Engine" delivers every month.

Return ONLY valid JSON (no markdown):
{
  "businessName": "${dna.businessName || 'Business'}",
  "month": "April 2026",
  "weeklyThemes": [
    { "week": 1, "theme": "Grand Opening / Introduction", "focus": "Establish presence" },
    { "week": 2, "theme": "...", "focus": "..." },
    { "week": 3, "theme": "...", "focus": "..." },
    { "week": 4, "theme": "...", "focus": "..." }
  ],
  "magazineFeatures": [
    { "week": 1, "title": "Hidden Gem: ...", "angle": "..." },
    { "week": 3, "title": "...", "angle": "..." }
  ],
  "radioSpots": [
    { "week": 1, "concept": "15s intro spot", "script": "..." },
    { "week": 2, "concept": "...", "script": "..." },
    { "week": 3, "concept": "...", "script": "..." },
    { "week": 4, "concept": "...", "script": "..." }
  ],
  "socialPosts": [
    { "week": 1, "day": "Mon", "platform": "instagram", "concept": "...", "caption": "..." },
    { "week": 1, "day": "Thu", "platform": "facebook", "concept": "...", "caption": "..." },
    { "week": 1, "day": "Sat", "platform": "instagram", "concept": "...", "caption": "..." }
  ],
  "reviewResponses": "All Google/Yelp reviews monitored and responded to within 24 hours",
  "totalAssets": "2 magazine features + 4 radio spots + 12 social posts + continuous review management"
}

Make the content specific to this business — reference their actual value props, location, and audience.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const calendar = JSON.parse(cleaned);

    // 3. Store in AgentContext
    const calendarKey = dnaKey.replace('dna.', 'calendar.');
    await prisma.agentContext.upsert({
      where: { domain_key: { domain: 'marketing', key: calendarKey } },
      create: {
        domain: 'marketing',
        key: calendarKey,
        topic: 'campaign-calendar',
        content: JSON.stringify(calendar),
        source: 'api/marketing/campaign-calendar',
        agentAuthor: 'campaign-planner',
        confidence: 0.9,
      },
      update: {
        content: JSON.stringify(calendar),
        confidence: 0.9,
      },
    });

    return NextResponse.json({ success: true, calendar, calendarKey });
  } catch (error: any) {
    console.error('[marketing/campaign-calendar] Error:', error.message);
    return NextResponse.json(
      { error: 'Campaign calendar generation failed', detail: error.message },
      { status: 500 }
    );
  }
}
