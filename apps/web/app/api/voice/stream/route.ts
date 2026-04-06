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
//
// Dialogflow CX / Google ADK: after your flow does STT, POST JSON `{ "prompt": "<transcript>" }`
// to this route (admin session or same auth). Response `{ "text" }` is the model reply for TTS.

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { MODELS, callAI } from '@/lib/ai-models';
import { getDawnVoiceSystemPrompt } from '@/lib/voice/dawn-voice-system-prompt';
import { VOICE_TOOLS_CONFIG, executeVoiceTool } from '../tools';

const MODEL = MODELS['gemini-flash'].model;
const SYSTEM_PROMPT = getDawnVoiceSystemPrompt();
const MAX_TOOL_ROUNDS = 8;

export async function POST(req: NextRequest) {
  try {
    // API key auth for Siri Shortcuts and other voice-only callers
    const authHeader = req.headers.get('authorization') || '';
    const siriKey = process.env.SIRI_API_KEY;
    const isSiriAuth = siriKey && authHeader === `Bearer ${siriKey}`;

    if (!isSiriAuth) {
      const authError = await requireAdmin();
      if (authError) return authError;
    }

    const contentType = req.headers.get('content-type') || '';

    let userPrompt: string;

    if (contentType.includes('application/json')) {
      const body = await req.json();
      userPrompt = body.prompt || body.text || '';
    } else if (contentType.includes('multipart/form-data') || contentType.includes('audio/')) {
      const formData = await req.formData();
      const audioFile = formData.get('audio') as File | null;

      if (!audioFile) {
        return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
      }

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

    const contents: unknown[] = [{ role: 'user', parts: [{ text: userPrompt }] }];

    const config = {
      tools: VOICE_TOOLS_CONFIG,
      systemInstruction: SYSTEM_PROMPT,
    };

    let response = await callAI({
      vertexNative: {
        model: MODEL,
        contents,
        config,
      },
    });

    let text = '';
    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const functionCalls = response.functionCalls;
      if (!functionCalls?.length) {
        text = response.text || '';
        break;
      }

      if (response.vertexContent) {
        contents.push(response.vertexContent);
      }

      const parts: unknown[] = [];
      for (const call of functionCalls) {
        const toolResult = await executeVoiceTool(
          call.name ?? '',
          (call.args as Record<string, unknown>) ?? {}
        );
        parts.push({
          functionResponse: {
            name: call.name ?? '',
            response: toolResult,
          },
        });
      }
      contents.push({ role: 'user', parts });

      response = await callAI({
        vertexNative: {
          model: MODEL,
          contents,
          config,
        },
      });
    }

    if (!text.trim()) {
      text = response.text || "I'm having trouble thinking right now. Try again in a moment.";
    }

    try {
      await prisma.agentAction.create({
        data: {
          agent: 'delta-dawn-voice',
          action: 'chief-of-staff-relay',
          summary: `Voice: ${userPrompt.slice(0, 180)}`,
          detail: text.slice(0, 8000),
          domain: 'operations',
          impact: 'low',
        },
      });
    } catch (logErr) {
      console.error('[voice/stream] chief-of-staff relay log failed', logErr);
    }

    return NextResponse.json({
      text,
      transcription: contentType.includes('json') ? undefined : userPrompt,
    });
  } catch (error) {
    console.error('[voice/stream] Error:', error);
    return NextResponse.json(
      { error: 'Voice processing failed', text: 'Something went wrong. Try again in a moment.' },
      { status: 500 }
    );
  }
}
