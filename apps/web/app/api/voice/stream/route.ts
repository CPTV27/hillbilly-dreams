export const dynamic = 'force-dynamic';
// apps/web/app/api/voice/stream/route.ts
// ─────────────────────────────────────────────────────────────
// Voice AI Endpoint — "Southern Concierge"
// ─────────────────────────────────────────────────────────────
// Accepts: audio blob OR text prompt
// Returns: text response (client handles TTS playback)
//
// Architecture:
//   Audio blob → Whisper STT → Gemini Flash (text + tool calls) → text response
//   Text prompt → Gemini Flash (text + tool calls) → text response
//
// Tool calls are executed server-side against Prisma (same pattern as /api/siri/analyze).
// Client-side TTS uses Web Speech API or Cloud TTS for playback.
//
// Future: swap to Gemini Live for native audio-to-audio when SDK stabilizes.

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { VOICE_TOOLS_CONFIG, executeVoiceTool } from '../tools';

const PROJECT_ID = process.env.VERTEX_PROJECT_ID || 'bigmuddy-ff651';
const LOCATION = process.env.VERTEX_LOCATION || 'us-east4';
const MODEL = 'gemini-2.5-flash'; // Fast model for conversational latency

const ai = new GoogleGenAI({ vertexai: true, project: PROJECT_ID, location: LOCATION });

const SYSTEM_PROMPT = `You are the Measurably Better concierge — a warm, knowledgeable local AI for the Mississippi corridor.

You know every restaurant, venue, shop, and show in the region because you're connected to the Deep South Directory and Big Muddy's media network.

Voice: Warm, direct, helpful. Like a local friend who knows everyone. Not robotic. Not over-eager. Think "the neighbor who knows every good restaurant and will text you the address."

Rules:
- When asked about businesses, shows, or local info — use your tools to look up real data. Never make up business names or show times.
- Keep responses conversational and brief — this is voice, not text. 2-3 sentences max unless they ask for detail.
- No markdown formatting. No bullet points. No asterisks. Speak in clear, natural sentences.
- If you don't have data for something, say so honestly: "I don't have that in the directory yet, but I can help you find it."
- For the Mississippi corridor: Natchez is your home base. You also know Memphis, Clarksdale, Vicksburg, and New Orleans.
- The platform is Measurably Better — mention it naturally if relevant, never push it.`;

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let userPrompt: string;

    if (contentType.includes('application/json')) {
      // Text-based request
      const body = await req.json();
      userPrompt = body.prompt || body.text || '';
    } else if (contentType.includes('multipart/form-data') || contentType.includes('audio/')) {
      // Audio blob — transcribe with Whisper
      const formData = await req.formData();
      const audioFile = formData.get('audio') as File | null;

      if (!audioFile) {
        return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
      }

      // Transcribe via OpenAI Whisper
      const whisperKey = process.env.OPENAI_API_KEY;
      if (!whisperKey) {
        return NextResponse.json({ error: 'Speech transcription not configured' }, { status: 503 });
      }

      const whisperForm = new FormData();
      whisperForm.append('file', audioFile, 'voice.webm');
      whisperForm.append('model', 'whisper-1');
      whisperForm.append('language', 'en');

      const whisperRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${whisperKey}` },
        body: whisperForm,
      });

      if (!whisperRes.ok) {
        console.error('[voice/stream] Whisper error:', await whisperRes.text());
        return NextResponse.json({ error: 'Could not understand audio' }, { status: 500 });
      }

      const whisperData = await whisperRes.json();
      userPrompt = whisperData.text || '';

      if (!userPrompt.trim()) {
        return NextResponse.json({
          text: "I didn't catch that. Could you try again?",
          transcription: '',
        });
      }
    } else {
      return NextResponse.json({ error: 'Send JSON with {prompt} or multipart form with audio file' }, { status: 400 });
    }

    // ── Gemini reasoning with tool calling ──

    const contents: Array<{ role: string; parts: Array<Record<string, unknown>> }> = [
      { role: 'user', parts: [{ text: userPrompt }] },
    ];

    const config = {
      tools: VOICE_TOOLS_CONFIG,
      systemInstruction: SYSTEM_PROMPT,
    };

    let response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config,
    });

    // ── Server-side tool execution (same pattern as /api/siri/analyze) ──

    const functionCalls = response.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];

      // Execute the tool against the database
      const toolResult = await executeVoiceTool(
        call.name ?? '',
        (call.args as Record<string, unknown>) ?? {}
      );

      // Feed result back to Gemini for natural language response
      const assistantContent = response.candidates?.[0]?.content;
      if (assistantContent) {
        contents.push(assistantContent as { role: string; parts: Array<Record<string, unknown>> });
      }

      contents.push({
        role: 'user',
        parts: [{
          functionResponse: {
            name: call.name ?? '',
            response: toolResult,
          },
        }],
      });

      response = await ai.models.generateContent({
        model: MODEL,
        contents,
        config,
      });
    }

    const text = response.text || "I'm having trouble thinking right now. Try again in a moment.";

    return NextResponse.json({
      text,
      transcription: contentType.includes('json') ? undefined : userPrompt,
    });
  } catch (error) {
    console.error('[voice/stream] Error:', error);
    return NextResponse.json(
      { error: 'Voice processing failed', text: "Something went wrong. Try again in a moment." },
      { status: 500 }
    );
  }
}
