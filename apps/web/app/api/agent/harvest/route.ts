import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
  project: process.env.GCP_PROJECT_ID || 'bigmuddy-ff651',
  location: process.env.VERTEX_LOCATION || 'us-east4',
});
const model = vertexAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * POST /api/agent/harvest
 * Regional business harvester — finds, audits, and scores businesses
 * for the Deep South Directory.
 *
 * Body: {
 *   city: string (default: "Natchez, MS"),
 *   category?: string (e.g., "restaurants", "lodging", "retail"),
 *   radius?: number (miles, default: 25),
 *   limit?: number (max businesses to process, default: 20)
 * }
 *
 * This is a research job — kicks off async processing.
 */
export async function POST(req: NextRequest) {
  const { city, category, radius, limit } = await req.json();

  const location = city || 'Natchez, Mississippi';
  const searchCategory = category || 'restaurants, lodging, retail, arts, entertainment';
  const maxResults = Math.min(limit || 20, 50);

  try {
    // Stage 1: Use Gemini to research businesses in the area
    // (In production, this would use the Places API for real data)
    const researchPrompt = `You are a business researcher for the Deep South Directory, a regional business network in ${location}.

Research and identify ${maxResults} real businesses in ${location} in these categories: ${searchCategory}.

For EACH business, provide:
- name: The actual business name
- category: Food & Drink | Lodging | Arts & Culture | Retail | Services | Entertainment
- address: Street address if known
- phone: Phone number if known
- website: Website URL if known
- description: One sentence about what makes them special
- googleRating: Estimated Google rating (realistic, 3.0-5.0)
- reviewCount: Estimated review count (realistic)
- digitalGapScore: 1-100 (100 = completely invisible online, needs help most)
- tierRecommendation: "free" | "starter_20" | "growth_50" | "engine_99" | "operator_499"
- aestheticFlavor: "The Delta Dark" | "The Modern MainStreet" | "The Broadside" | "The White Walls" | "The Paper Trail"
- urgency: "high" | "medium" | "low" — how urgently they need the DSD Engine
- whyUrgent: One sentence explaining the marketing gap

Focus on REAL businesses that actually exist in ${location}. Use your knowledge of the area.
Prioritize: high-rated businesses with low online presence (the "Invisible Gems").

Return ONLY valid JSON array (no markdown):
[{ "name": "...", ... }]`;

    const result = await model.generateContent(researchPrompt);
    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
    const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const businesses = JSON.parse(cleaned);

    // Stage 2: Save each business to DirectoryBusiness + AgentContext
    let saved = 0;
    let errors = 0;

    for (const biz of businesses) {
      try {
        // Save to DirectoryBusiness table
        const slug = biz.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

        await prisma.directoryBusiness.upsert({
          where: { slug },
          create: {
            name: biz.name,
            slug,
            category: biz.category || 'Services',
            city: location.split(',')[0].trim(),
            state: location.split(',')[1]?.trim() || 'MS',
            description: biz.description,
            tier: biz.tierRecommendation === 'operator_499' ? 'the_route'
              : biz.tierRecommendation === 'engine_99' ? 'main_street'
              : 'free',
            googleRating: biz.googleRating || null,
            googleReviewCount: biz.reviewCount || null,
            website: biz.website || null,
            phone: biz.phone || null,
            address: biz.address || null,
            active: false, // Starts inactive until verified
          },
          update: {
            description: biz.description,
            googleRating: biz.googleRating || undefined,
            googleReviewCount: biz.reviewCount || undefined,
          },
        });

        // Save audit data to AgentContext
        const contextKey = `harvest.${slug}`;
        await prisma.agentContext.upsert({
          where: { domain_key: { domain: 'marketing', key: contextKey } },
          create: {
            domain: 'marketing',
            key: contextKey,
            topic: 'harvest-audit',
            content: JSON.stringify(biz),
            source: `api/agent/harvest/${location}`,
            agentAuthor: 'rook-harvester',
            confidence: 0.8,
          },
          update: {
            content: JSON.stringify(biz),
            confidence: 0.8,
          },
        });

        saved++;
      } catch (err) {
        errors++;
      }
    }

    // Log the action
    await prisma.agentAction.create({
      data: {
        agent: 'rook',
        action: 'harvest',
        summary: `Harvested ${saved} businesses in ${location} (${searchCategory})`,
        detail: `Found ${businesses.length}, saved ${saved}, errors ${errors}. Categories: ${searchCategory}`,
        domain: 'marketing',
        impact: 'high',
      },
    });

    return NextResponse.json({
      success: true,
      location,
      found: businesses.length,
      saved,
      errors,
      businesses: businesses.map((b: any) => ({
        name: b.name,
        category: b.category,
        tier: b.tierRecommendation,
        urgency: b.urgency,
        digitalGapScore: b.digitalGapScore,
      })),
    });
  } catch (error: any) {
    console.error('[agent/harvest] Error:', error.message);
    return NextResponse.json(
      { error: 'Harvest failed', detail: error.message },
      { status: 500 }
    );
  }
}
