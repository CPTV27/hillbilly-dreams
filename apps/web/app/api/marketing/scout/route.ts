import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
  project: process.env.GCP_PROJECT_ID || 'bigmuddy-ff651',
  location: process.env.VERTEX_LOCATION || 'us-east4',
});
const model = vertexAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

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
  const { businessName, city } = await req.json();

  if (!businessName) {
    return NextResponse.json({ error: 'businessName required' }, { status: 400 });
  }

  const location = city || 'Natchez, Mississippi';

  try {
    // 1. Use Gemini to research the business (faster than Places API for demo)
    const researchPrompt = `Research the business "${businessName}" in ${location}.

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

    const result = await model.generateContent(researchPrompt);
    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
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
