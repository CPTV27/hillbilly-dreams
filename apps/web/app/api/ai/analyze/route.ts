import { NextResponse } from 'next/server';
import { VertexAI, HarmCategory, HarmBlockThreshold } from '@google-cloud/vertexai';

const PROJECT_ID = process.env.VERTEX_PROJECT_ID || 'bigmuddy-ff651';
const LOCATION = process.env.VERTEX_LOCATION || 'us-east4';
const MODEL = 'gemini-1.5-pro-002'; // Using latest Pro model

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
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
    });

    let systemInstruction = "You are the Sovereign Orchestration Engine. Output professional, terse, highly analytical responses reflecting extreme computational authority. Keep answers concise unless asked to expand.";
    if (context) {
      systemInstruction += `\n\n=== SECURE NAMESPACE CONTEXT ===\n${JSON.stringify(context)}`;
    }

    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      systemInstruction: { role: 'system', parts: [{ text: systemInstruction }] },
    };

    // Note: To capture exact processing times from Google, we fetch the response in one block. 
    // Streaming partial tokens via Next.js is possible, but resolving the full response 
    // allows us to measure exact tokens/sec throughput and return the required payload.
    const responseStream = await generativeModel.generateContentStream(request);
    const aggregatedResponse = await responseStream.response;
    
    const endTimeMs = performance.now();
    const processingTimeMs = Math.round(endTimeMs - requestTimeMs);
    
    const text = aggregatedResponse.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const usageMetadata = aggregatedResponse.usageMetadata;
    
    // Fallback estimates if Vertex AI omits metadata on short responses
    const contextWindowUsed = usageMetadata?.promptTokenCount || Math.round(JSON.stringify(request).length / 4);
    const outputTokens = usageMetadata?.candidatesTokenCount || Math.round(text.length / 4);
    const totalTokens = usageMetadata?.totalTokenCount || (contextWindowUsed + outputTokens);
    
    const tokensPerSecond = processingTimeMs > 0 ? Math.round((totalTokens / processingTimeMs) * 1000) : 0;
    
    // Vertex AI Pricing (approximate for 1.5 Pro: $1.25/1M input, $3.75/1M output for < 128k context)
    const costPerQuery = ((contextWindowUsed / 1000000) * 1.25) + ((outputTokens / 1000000) * 3.75);

    return NextResponse.json({
      processingTimeMs,
      tokensPerSecond,
      contextWindowUsed,
      totalTokens,
      costPerQuery: costPerQuery,
      modelId: `${MODEL} · ${LOCATION} · Vertex AI`,
      response: text,
    });

  } catch (error: any) {
    console.error('[API/VertexAI] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
