import { NextResponse } from 'next/server';
import { VertexAI, HarmCategory, HarmBlockThreshold, FunctionDeclaration } from '@google-cloud/vertexai';

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

    const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
    
    const generativeModel = vertexAI.getGenerativeModel({
      model: MODEL,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.1,
      },
      tools: [{
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
      }]
    });

    let systemInstruction = "You are the Sovereign Orchestration Engine. Output professional, terse, highly analytical responses reflecting extreme computational authority. Keep answers concise unless asked to expand. When explicitly asked to sync systems or check data, invoke your available tools immediately.";
    if (context) {
      systemInstruction += `\n\n=== SECURE NAMESPACE CONTEXT ===\n${JSON.stringify(context)}`;
    }

    const request = {
      contents,
      systemInstruction: { role: 'system', parts: [{ text: systemInstruction }] },
    };

    const responseStream = await generativeModel.generateContentStream(request as any);
    const aggregatedResponse = await responseStream.response;
    
    const endTimeMs = performance.now();
    const processingTimeMs = Math.round(endTimeMs - requestTimeMs);
    
    // Check for a function call
    const candidate = aggregatedResponse.candidates?.[0];
    const functionCalls = candidate?.content?.parts?.filter(p => !!p.functionCall).map(p => p.functionCall);

    if (functionCalls && functionCalls.length > 0) {
      // Return the function calls so the client can execute them
      return NextResponse.json({
        type: 'function_call',
        functionCalls,
        processingTimeMs,
        modelId: `${MODEL} · ${LOCATION} · Vertex AI`,
      });
    }

    const text = candidate?.content?.parts?.[0]?.text || '';
    const usageMetadata = aggregatedResponse.usageMetadata;
    
    const contextWindowUsed = usageMetadata?.promptTokenCount || Math.round(JSON.stringify(request).length / 4);
    const outputTokens = usageMetadata?.candidatesTokenCount || Math.round(text.length / 4);
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
      vertexContent: candidate?.content // Pass content back to client for history appending
    });

  } catch (error: any) {
    console.error('[API/VertexAI] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
