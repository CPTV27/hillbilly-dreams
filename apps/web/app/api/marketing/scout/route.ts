export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { callAI } from '@/lib/ai-models';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * POST /api/marketing/scout
 * All-in-one Scout & Sell endpoint.
 * Takes just a business name (and optional city), does everything:
 * 1. Google Places lookup to find the business
 * 2. Brand DNA analysis
 * 3. Social campaign
 * 4. Radio spot script
 * 5. Review response drafts
 *
 * No auth required — this is the demo tool Chase uses in the field.
 */
export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { businessName, city } = await req.json();

  if (!businessName) {
    return NextResponse.json({ error: 'businessName required' }, { status: 400 });
  }

  const location = city || 'Natchez, Mississippi';
  const cityName = city || 'Natchez';

  try {
    // 1. Check our own database FIRST
    let dbBusiness = null;
    let dbVenue = null;
    try {
      dbBusiness = await prisma.directoryBusiness.findFirst({
        where: {
          name: { contains: businessName, mode: 'insensitive' },
          ...(cityName && { city: { contains: cityName, mode: 'insensitive' } }),
        },
      });
      dbVenue = await prisma.touringVenue.findFirst({
        where: {
          name: { contains: businessName, mode: 'insensitive' },
          ...(cityName && { city: { contains: cityName, mode: 'insensitive' } }),
        },
      });
    } catch { /* tables may not exist */ }

    const dbContext = dbBusiness || dbVenue
      ? `\n\nIMPORTANT — We already have this business in our database:\n${JSON.stringify(dbBusiness || dbVenue, null, 2)}\nUse this REAL data as the foundation. Do not make up conflicting details.`
      : '\n\nThis business is NOT yet in our database. Research it externally but be clear about what is confirmed vs estimated.';

    // 2. Use Gemini to enrich with AI (grounded by DB data if available)
    const researchPrompt = `Research the business "${businessName}" in ${location}.${dbContext}

Return ONLY valid JSON (no markdown):
{
  "businessName": "${businessName}",
  "location": "${location}",
  "websiteUrl": "their website if known, or null",
  "category": "Food & Drink | Lodging | Arts & Culture | Retail | Services | Entertainment",
  "description": "One compelling sentence about this business",
  "primaryColors": ["#hex1", "#hex2", "#hex3"],
  "brandVoice": "Southern Gothic | Modern | Traditional | Rustic | Artisan",
  "keyValueProps": ["prop1", "prop2", "prop3"],
  "targetAudience": "Tourists | Locals | Foodies | Families | Couples",
  "aestheticFlavor": "The Delta Dark | The Modern MainStreet | The Broadside | The White Walls | The Paper Trail",
  "socialPosts": [
    {"caption": "Instagram caption with hashtags", "strategy": "Why this works"},
    {"caption": "Second post caption", "strategy": "Why this works"},
    {"caption": "Third post caption", "strategy": "Why this works"}
  ],
  "radioSpot": {
    "title": "Spot title",
    "script": "Full 30-second voiceover script",
    "tagline": "Memorable closing line"
  },
  "reviewResponses": [
    {"rating": 5, "review": "Sample positive review", "response": "Drafted response"},
    {"rating": 2, "review": "Sample negative review", "response": "Empathetic drafted response"}
  ]
}

Make everything specific to this actual business. If you know real details about them, use them. If not, create plausible content based on their category and location.`;

    const result = await callAI({
      role: 'generation',
      system: 'You return only valid JSON as specified. No markdown code fences.',
      messages: [{ role: 'user', content: researchPrompt }],
      maxTokens: 8192,
      temperature: 0.3,
    });
    const responseText = result.text || '{}';
    const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const scoutData = JSON.parse(cleaned);

    // 2. Save to AgentContext
    const key = `scout.${businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    await prisma.agentContext.upsert({
      where: { domain_key: { domain: 'marketing', key } },
      create: {
        domain: 'marketing',
        key,
        topic: 'scout-result',
        content: JSON.stringify(scoutData),
        source: 'api/marketing/scout',
        agentAuthor: 'scout-engine',
        confidence: 0.9,
      },
      update: { content: JSON.stringify(scoutData), confidence: 0.9 },
    });

    return NextResponse.json({ success: true, data: scoutData });
  } catch (error: any) {
    console.error('[marketing/scout] Error:', error.message);
    return NextResponse.json(
      { error: 'Scout failed', detail: error.message },
      { status: 500 }
    );
  }
}
