export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { callAI } from '@/lib/ai-models';

export async function POST(req: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { messages, contextDropIds = [] } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 });
    }

    const drops = await prisma.notebookDrop.findMany({
      where: {
        id: { in: contextDropIds },
      },
    });

    let systemInstruction = `You are the "Sovereign Notebook AI", an ultra-intelligent, native search core for the Measurably Better Swarm.
Your primary directive is to answer user queries with absolute factual grounding based ONLY on the "Context Drops" provided below.
The Measurably Better Swarm Agents (AG, GA, CC, PC) and Humans (CEO) write these drops as architectural source truth.
If the answer is not in the Context Drops, you must explicitly state that you do not know. 
Do not hallucinate. Present information with a highly confident, architectural, and elite enterprise tone.

=== START SOVEREIGN DATABASE FRAGMENTS ===
`;

    drops.forEach((drop) => {
      systemInstruction += `
---
[Document: ${drop.title}]
[Author: ${drop.author}]
[Date: ${drop.createdAt.toISOString()}]

${drop.content}
---
`;
    });

    systemInstruction += `\n=== END SOVEREIGN DATABASE FRAGMENTS ===\n`;

    const chatMessages = messages.map((m: { role: string; content: string }) => ({
      role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
      content: m.content,
    }));

    const result = await callAI({
      role: 'reasoning',
      system: systemInstruction,
      messages: chatMessages,
      maxTokens: 2048,
      temperature: 0.1,
    });

    return NextResponse.json({
      success: true,
      text: result.text,
    });
  } catch (error: any) {
    console.error('[API/Notebook/Chat] Fatal Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
