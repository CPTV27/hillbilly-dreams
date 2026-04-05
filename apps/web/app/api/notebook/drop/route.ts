export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    // We expect a JSON payload from the Swarm Agents or CLI tools
    const payload = await req.json();
    const { title, content, author = 'Agent Swarm', tags = [], sourceSystem = 'api' } = payload;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    // A rough estimation for the Gemini 1M token RAG packing algorithm
    // (Roughly 4 characters per token)
    const tokenCount = Math.ceil(content.length / 4);

    const drop = await prisma.notebookDrop.create({
      data: {
        title,
        content,
        author,
        tags,
        sourceSystem,
        tokenCount
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Notebook Drop ingested successfully.',
      dropId: drop.id,
      tokenCount
    });

  } catch (error: any) {
    console.error('[API/Notebook/Drop] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
