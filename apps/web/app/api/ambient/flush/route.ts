import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { text, timestamp } = await request.json();

    if (!text || text.trim().length === 0) {
       return NextResponse.json({ success: true, ignored: true });
    }

    const dropContent = `[AMBIENT OBSERVATORY - OS TRANSCRIBED]
Date: ${timestamp || new Date().toISOString()}
Protocol: Military-Grade Privacy Shield (On-Device Inference Pipeline)
Destruction Directive: Expire Automatically.

Transcript:
${text}
`;

    // Drop into the Swarm with an explicit "ephemeral_ambient" tag
    await prisma.notebookDrop.create({
      data: {
        title: `Ambient Context Block`,
        author: session.user.email || 'AmbientNode',
        content: dropContent,
        tags: ['ambient', 'ephemeral', 'privacy-shield'],
        sourceSystem: 'iOS_PWA_Microphone',
      }
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[Ambient Ingest] Failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
