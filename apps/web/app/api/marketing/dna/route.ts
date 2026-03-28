import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { VertexAI } from '@google-cloud/vertexai';

// Initialize Vertex AI — uses Application Default Credentials
const vertexAI = new VertexAI({
  project: process.env.GCP_PROJECT_ID || 'bigmuddy-ff651',
  location: process.env.VERTEX_LOCATION || 'us-east4',
});
const model = vertexAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * POST /api/marketing/dna
 * Ingests a business URL to generate a "Marketing DNA" profile.
 * Used for the "Scout & Sell" Natchez playbook.
 *
 * Body: { businessId?: number, websiteUrl: string, businessName: string }
 */
export async function POST(req: NextRequest) {
  // Auth gate — requireAdmin returns null if authorized, or a 401/403 response
  const authError = await requireAdmin();
  if (authError) return authError;

  const { businessId, websiteUrl, businessName } = await req.json();

  if (!websiteUrl || !businessName) {
    return NextResponse.json(
      { error: 'Missing required fields: websiteUrl, businessName' },
      { status: 400 }
    );
  }

  try {
    // 1. Prompt Vertex AI to analyze the business and generate a brand profile
    const prompt = `Analyze the brand identity of "${businessName}" at ${websiteUrl}.

Return ONLY a valid JSON object (no markdown, no backticks) with these fields:
{
  "primaryColors": ["#hex1", "#hex2", "#hex3"],
  "brandVoice": "Southern Gothic | Modern | Traditional | Rustic | Artisan",
  "keyValueProps": ["prop1", "prop2", "prop3"],
  "targetAudience": "Tourists | Locals | Foodies | Families | Couples",
  "aestheticFlavor": "The Delta Dark | The Modern MainStreet | The Broadside | The White Walls | The Paper Trail",
  "oneLiner": "A compelling one-sentence description of this business for the Deep South Directory",
  "suggestedCategory": "Food & Drink | Lodging | Arts & Culture | Retail | Services | Entertainment"
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

    // Parse — handle markdown code blocks if Gemini wraps it
    const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const dna = JSON.parse(cleaned);

    // 2. Save DNA to AgentContext for shared knowledge across all agents
    const contextKey = businessId ? `dna.business.${businessId}` : `dna.url.${websiteUrl.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;

    await prisma.agentContext.upsert({
      where: { domain_key: { domain: 'marketing', key: contextKey } },
      create: {
        domain: 'marketing',
        key: contextKey,
        topic: 'business-dna',
        content: JSON.stringify({ businessName, websiteUrl, ...dna }),
        source: `api/marketing/dna`,
        agentAuthor: 'gemini-dna-ingestor',
        confidence: 0.95,
      },
      update: {
        content: JSON.stringify({ businessName, websiteUrl, ...dna }),
        confidence: 0.95,
      },
    });

    // 3. If businessId provided, update the DirectoryBusiness record
    if (businessId) {
      try {
        await prisma.directoryBusiness.update({
          where: { id: businessId },
          data: {
            category: dna.suggestedCategory || undefined,
            description: dna.oneLiner || undefined,
          },
        });
      } catch {
        // Business might not exist yet — that's OK
      }
    }

    return NextResponse.json({ success: true, dna, contextKey });
  } catch (error: any) {
    console.error('[marketing/dna] Error:', error.message);
    return NextResponse.json(
      { error: 'DNA ingestion failed', detail: error.message },
      { status: 500 }
    );
  }
}
