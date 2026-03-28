import { NextRequest, NextResponse } from 'next/server';
import { createPost, uploadFromUrl } from '@/lib/postiz-client';

/**
 * POST /api/social/schedule
 * Schedule a social media post via Postiz.
 *
 * Body: {
 *   content: string,
 *   integrationIds: string[],
 *   scheduleDate?: string,
 *   imageUrl?: string
 * }
 */
export async function POST(req: NextRequest) {
  const { content, integrationIds, scheduleDate, imageUrl } = await req.json();

  if (!content || !integrationIds?.length) {
    return NextResponse.json(
      { error: 'content and integrationIds required' },
      { status: 400 }
    );
  }

  try {
    // Upload image if provided
    let mediaUrls: string[] = [];
    if (imageUrl) {
      const upload = await uploadFromUrl(imageUrl);
      if (upload?.url) mediaUrls.push(upload.url);
    }

    // Create the post
    const result = await createPost({
      content,
      integrationIds,
      scheduleDate,
      mediaUrls,
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Scheduling failed', detail: error.message },
      { status: 500 }
    );
  }
}
