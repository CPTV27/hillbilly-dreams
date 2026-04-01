export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { prisma } from '@bigmuddy/database';

// Initialize the 2026-proof unified Google Gen AI SDK
const ai = new GoogleGenAI({
  project: process.env.VERTEX_PROJECT_ID || 'bigmuddy-ff651',
  location: process.env.VERTEX_LOCATION || 'us-east4',
  vertexai: true
});

export async function POST(req: Request) {
  try {
    const { messages, contextDropIds = [] } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 });
    }

    // Phase 1: Retrieve the 1M Token Context Drops
    // Fetch all requested drops from the Sovereign Notebook database
    const drops = await prisma.notebookDrop.findMany({
      where: {
        id: { in: contextDropIds }
      }
    });

    // Phase 2: Construct the System Instruction
    // We concatenate every drop directly into the system instruction
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

    // Phase 3: Format Chat History for GenAI
    const aiContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    // Generate the Response using the 1M Token Context model + Google Search Grounding
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: aiContents,
      config: {
        systemInstruction,
        temperature: 0.1, // Strict factual RAG temperature
        maxOutputTokens: 2048,
      }
    });

    return NextResponse.json({
      success: true,
      text: response.text
    });

  } catch (error: any) {
    console.error('[API/Notebook/Chat] Fatal Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
