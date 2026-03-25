import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const PROJECT_ID = process.env.VERTEX_PROJECT_ID || 'bigmuddy-ff651';
const LOCATION = process.env.VERTEX_LOCATION || 'us-east4';
const MODEL = 'gemini-1.5-pro-002'; // Using latest Pro model

export async function POST(req: Request) {
  try {
    // We now accept 'contents' (Full conversation history for function calling) 
    // instead of a single 'prompt' string.
    const { contents, context } = await req.json();

    if (!contents || !Array.isArray(contents)) {
      return NextResponse.json({ error: 'Conversation contents array is required' }, { status: 400 });
    }

    const requestTimeMs = performance.now();

    const ai = new GoogleGenAI({ vertexai: true, project: PROJECT_ID, location: LOCATION });
    
    let systemInstruction = "You are the Sovereign Orchestration Engine. Output professional, terse, highly analytical responses reflecting extreme computational authority. Keep answers concise unless asked to expand. When explicitly asked to sync systems or check data, invoke your available tools immediately.";
    if (context) {
      systemInstruction += `\n\n=== SECURE NAMESPACE CONTEXT ===\n${JSON.stringify(context)}`;
    }

    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction,
        temperature: 0.1,
        maxOutputTokens: 8192,
        tools: [
          {
            functionDeclarations: [
              {
                name: 'sync_quickbooks',
                description: 'Synchronize the QuickBooks Online ledger and retrieve the latest P&L margin recovery metrics. Call this if the user asks to sync quickbooks, check the ledger, or view finances.',
              },
              {
                name: 'sync_calendar',
                description: 'Fetch the latest Google Workspace calendar to update the capacity forecast. Call this if the user asks to check schedules, availability, or calendar.',
              }
            ]
          },
        ]
      }
    });
    
    const endTimeMs = performance.now();
    const processingTimeMs = Math.round(endTimeMs - requestTimeMs);
    
    // The new @google/genai SDK automatically exposes functionCalls directly on the response
    const functionCalls = response.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      // Convert from SDK schema to serializable JSON for the client
      const serializedCalls = functionCalls.map(call => ({
        name: call.name,
        args: call.args
      }));

      return NextResponse.json({
        type: 'function_call',
        functionCalls: serializedCalls,
        processingTimeMs,
        modelId: `${MODEL} · ${LOCATION} · Vertex AI`,
      });
    }

    const text = response.text || '';
    const usageMetadata = response.usageMetadata;
    
    const contextWindowUsed = usageMetadata?.promptTokenCount || 0;
    const outputTokens = usageMetadata?.candidatesTokenCount || 0;
    const totalTokens = usageMetadata?.totalTokenCount || (contextWindowUsed + outputTokens);
    
    const tokensPerSecond = processingTimeMs > 0 ? Math.round((totalTokens / processingTimeMs) * 1000) : 0;
    const costPerQuery = ((contextWindowUsed / 1000000) * 1.25) + ((outputTokens / 1000000) * 3.75);

    return NextResponse.json({
      type: 'text',
      processingTimeMs,
      tokensPerSecond,
      contextWindowUsed,
      totalTokens,
      costPerQuery: costPerQuery,
      modelId: `${MODEL} · ${LOCATION} · Vertex AI`,
      response: text,
      vertexContent: response.candidates?.[0]?.content // Pass content back to client for history appending
    });

  } catch (error: any) {
    console.error('[API/VertexAI] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
