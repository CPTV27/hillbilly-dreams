export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { getGeminiModel } from '@/lib/vertex-client';

let _model: ReturnType<typeof getGeminiModel> | null = null;
function model() { if (!_model) _model = getGeminiModel(); return _model; }

/**
 * POST /api/marketing/scout-photo
 * Photo-first Scout: takes a photo of a business sign/card/storefront,
 * uses Gemini Vision to extract the business name, then runs the full
 * Scout & Sell analysis.
 *
 * Body: { imageBase64: string, city?: string, lat?: number, lng?: number }
 *
 * No auth required — demo tool for field use.
 */
export async function POST(req: NextRequest) {
  const { imageBase64, city, lat, lng } = await req.json();

  if (!imageBase64) {
    return NextResponse.json({ error: 'imageBase64 required' }, { status: 400 });
  }

  const location = city || 'Natchez, Mississippi';

  try {
    // 1. Use Gemini Vision to read the photo AND generate the full scout in one call
    const prompt = `Look at this photo of a business (sign, storefront, or business card).

Extract all information you can see: business name, phone number, address, website, type of business.

Then research this business and return ONLY valid JSON (no markdown):
{
  "businessName": "extracted from photo",
  "phone": "if visible",
  "address": "if visible, otherwise guess from context",
  "websiteUrl": "if visible or if you can find it",
  "location": "${location}",
  "category": "Food & Drink | Lodging | Arts & Culture | Retail | Services | Entertainment",
  "description": "One compelling sentence about this business",
  "primaryColors": ["#hex1", "#hex2", "#hex3"],
  "brandVoice": "Southern Gothic | Modern | Traditional | Rustic | Artisan",
  "keyValueProps": ["prop1", "prop2", "prop3"],
  "targetAudience": "Tourists | Locals | Foodies | Families | Couples",
  "aestheticFlavor": "The Delta Dark | The Modern MainStreet | The Broadside | The White Walls | The Paper Trail",
  "socialPosts": [
    {"caption": "Instagram caption with hashtags specific to this business", "strategy": "Why this works"},
    {"caption": "Second post", "strategy": "Why"},
    {"caption": "Third post", "strategy": "Why"}
  ],
  "radioSpot": {
    "title": "Spot title",
    "script": "Full 30-second voiceover script mentioning the business by name",
    "tagline": "Memorable closing line"
  },
  "reviewResponses": [
    {"rating": 5, "review": "Plausible positive review for this type of business", "response": "Warm drafted response"},
    {"rating": 2, "review": "Plausible complaint for this type of business", "response": "Empathetic drafted response"}
  ]
}

Be specific — use the actual business name from the photo, their real location, and make the content feel custom-built for them.`;

    const result = await model().generateContent({
      contents: [{
        role: 'user',
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
          { text: prompt },
        ],
      }],
    });

    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const scoutData = JSON.parse(cleaned);

    // 2. Save to AgentContext
    const key = `scout.${(scoutData.businessName || 'unknown').toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    await prisma.agentContext.upsert({
      where: { domain_key: { domain: 'marketing', key } },
      create: {
        domain: 'marketing',
        key,
        topic: 'scout-result',
        content: JSON.stringify(scoutData),
        source: 'api/marketing/scout-photo',
        agentAuthor: 'scout-vision',
        confidence: 0.85,
      },
      update: { content: JSON.stringify(scoutData), confidence: 0.85 },
    });

    return NextResponse.json({ success: true, data: scoutData });
  } catch (error: any) {
    console.error('[marketing/scout-photo] Error:', error.message);
    return NextResponse.json(
      { error: 'Photo scout failed', detail: error.message },
      { status: 500 }
    );
  }
}
