export const dynamic = 'force-dynamic';

// POST /api/social/publish
// Publish a single SocialPost by ID. Requires admin auth.

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';
import { publishPost } from '@/lib/social-publisher';

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { postId } = await request.json();

  if (!postId || typeof postId !== 'number') {
    return NextResponse.json({ error: 'postId (number) is required' }, { status: 400 });
  }

  try {
    const post = await prisma.socialPost.findUnique({
      where: { id: postId },
      include: { account: true },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (post.status === 'published') {
      return NextResponse.json({ error: 'Post already published', postUrl: post.postUrl }, { status: 409 });
    }

    const account = post.account as {
      id: number;
      platform: string;
      handle: string;
      platformId: string | null;
      accessToken: string | null;
      refreshToken: string | null;
      tokenExpiry: Date | null;
    };

    if (!account.accessToken) {
      return NextResponse.json(
        { error: `No access token on account ${account.handle} (${account.platform}). Connect the account first.` },
        { status: 422 }
      );
    }

    const result = await publishPost(account, post.content, post.mediaUrls);

    if (result.success) {
      await prisma.socialPost.update({
        where: { id: postId },
        data: {
          status: 'published',
          publishedAt: new Date(),
          postUrl: result.postUrl || null,
        },
      });
    } else {
      await prisma.socialPost.update({
        where: { id: postId },
        data: { status: 'failed' },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('[POST /api/social/publish]', error);
    return NextResponse.json({ error: 'Publish failed' }, { status: 500 });
  }
}
