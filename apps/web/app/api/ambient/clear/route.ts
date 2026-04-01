export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';

export async function POST() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Find all NotebookDrops for this user that are tagged as "ambient"
    // Since Prisma scalar lists aren't indexed for direct deletion easily, 
    // we use a transaction or find elements containing the 'ephemeral' tag.
    
    // To ensure full obliteration, we search context or tags.
    // In PostgreSQL, querying string arrays requires raw or specific 'has' syntax.
    await prisma.notebookDrop.deleteMany({
      where: {
        AND: [
          { author: session.user.email || 'AmbientNode' },
          { sourceSystem: 'iOS_PWA_Microphone' }
        ]
      }
    });

    return NextResponse.json({ success: true, obliterated: true });
  } catch (err: any) {
    console.error('[Ambient Purge] Failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
