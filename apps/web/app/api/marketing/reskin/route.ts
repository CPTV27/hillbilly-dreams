export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * POST /api/marketing/reskin
 * Re-generates an image in a specific brand aesthetic using Vertex AI Imagen 3.
 *
 * Takes the DNA's aesthetic flavor and generates a new image that matches
 * the business's brand identity. Uses Imagen 3 (not "Whisk" — that's not
 * a public API).
 *
 * Body: { businessName: string, aestheticFlavor: string, subject: string }
 */
export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { businessName, aestheticFlavor, subject } = await req.json();

  if (!aestheticFlavor || !subject) {
    return NextResponse.json(
      { error: 'Provide aestheticFlavor and subject' },
      { status: 400 }
    );
  }

  // Map aesthetic flavors to Imagen prompt styles
  const styleMap: Record<string, string> = {
    'The Delta Dark': 'Southern Gothic noir, deep charcoal and amber gold tones, moody warm lighting, cinematic editorial photography',
    'The Modern MainStreet': 'Clean minimal white background, bright natural light, modern professional photography, Google product aesthetic',
    'The Broadside': 'Classic editorial, warm eggshell paper tones, high contrast, traditional magazine photography',
    'The White Walls': 'Minimal gallery aesthetic, soft neutral tones, clean lines, fine art photography',
    'The Paper Trail': 'Academic muted tones, warm sepia undertones, thoughtful documentary photography',
  };

  const style = styleMap[aestheticFlavor] || styleMap['The Delta Dark'];

  try {
    // Generate with Vertex AI Imagen 3
    const accessToken = await getAccessToken();

    const response = await fetch(
      `https://us-east4-aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID || 'bigmuddy-ff651'}/locations/us-east4/publishers/google/models/imagen-3.0-generate-001:predict`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [{
            prompt: `${subject} for ${businessName}. Style: ${style}. Professional quality, no text in the image.`,
          }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '16:9',
            safetyFilterLevel: 'block_few',
          },
        }),
      }
    );

    const data = await response.json();

    if (!data.predictions?.[0]?.bytesBase64Encoded) {
      return NextResponse.json(
        { error: 'Image generation failed', detail: data },
        { status: 500 }
      );
    }

    // Upload to GCS
    const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
    const filename = `reskin/${businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}.png`;

    // GitHub#209 — Upload to GCS via @google-cloud/storage
    // For now, return base64 for immediate preview
    const base64Url = `data:image/png;base64,${data.predictions[0].bytesBase64Encoded.substring(0, 100)}...`;

    return NextResponse.json({
      success: true,
      aestheticFlavor,
      // In production: return GCS URL after upload
      // For demo: return the image data
      imageBase64: data.predictions[0].bytesBase64Encoded,
      message: `Generated ${aestheticFlavor} image for ${businessName}`,
    });
  } catch (error: any) {
    console.error('[marketing/reskin] Error:', error.message);
    return NextResponse.json(
      { error: 'Image re-skin failed', detail: error.message },
      { status: 500 }
    );
  }
}

// Get access token from Application Default Credentials
async function getAccessToken(): Promise<string> {
  const { GoogleAuth } = await import('google-auth-library');
  const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token || '';
}
