import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { MODELS } from '@/lib/ai-models';
import { getDeltaDawnSystemPromptV2 } from '@/lib/delta-dawn-system-prompt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export type DawnChatMessage = {
  role: 'user' | 'dawn';
  content: string;
  page?: string;
};

function trimHistoryForApi(messages: DawnChatMessage[]): DawnChatMessage[] {
  const idx = messages.findIndex((m) => m.role === 'user');
  return idx === -1 ? [] : messages.slice(idx);
}

function toGeminiContents(messages: DawnChatMessage[]) {
  return messages.map((m) => ({
    role: m.role === 'user' ? ('user' as const) : ('model' as const),
    parts: [{ text: m.content }],
  }));
}

function toOpenAiMessages(messages: DawnChatMessage[]) {
  return messages.map((m) => ({
    role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
    content: m.content,
  }));
}

function withPageContext(messages: DawnChatMessage[]): DawnChatMessage[] {
  return messages.map((m) => {
    if (m.role !== 'user' || !m.page) return m;
    return {
      ...m,
      content: `[Page: ${m.page}]\n\n${m.content}`,
    };
  });
}

function sse(data: Record<string, unknown>) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function POST(req: NextRequest) {
  let body: { messages?: DawnChatMessage[]; tenantId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const trimmed = trimHistoryForApi(rawMessages);
  if (trimmed.length === 0) {
    return NextResponse.json({ error: 'messages must include at least one user turn' }, { status: 400 });
  }

  let baseSystem: string;
  try {
    baseSystem = getDeltaDawnSystemPromptV2();
  } catch (e) {
    console.error('[dawn/chat] system prompt load failed', e);
    return NextResponse.json({ error: 'System prompt unavailable' }, { status: 500 });
  }

  const tenantId = body.tenantId || 'hdi-owner';
  const systemInstruction = `${baseSystem}\n\n## Runtime context\nTenant: ${tenantId}`;
  const messages = withPageContext(trimmed);

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      let usedGemini = false;

      const tryGemini = async (): Promise<boolean> => {
        const key = process.env.GEMINI_API_KEY;
        if (!key) return false;
        try {
          const ai = new GoogleGenAI({ apiKey: key });
          const stream = await ai.models.generateContentStream({
            model: MODELS['gemini-flash'].model,
            contents: toGeminiContents(messages),
            config: {
              systemInstruction,
              maxOutputTokens: 4096,
            },
          });
          let any = false;
          for await (const chunk of stream) {
            const t = chunk.text;
            if (t) {
              any = true;
              controller.enqueue(encoder.encode(sse({ text: t, source: 'gemini' })));
            }
          }
          return any;
        } catch (e) {
          console.error('[dawn/chat] Gemini stream failed', e);
          return false;
        }
      };

      /** Same provider stack as POST /api/grok/chat (Delta Dawn system + no tools). */
      const tryGrokViaApi = async (): Promise<boolean> => {
        if (!process.env.XAI_API_KEY) return false;
        try {
          const openAi = toOpenAiMessages(messages);
          const url = new URL('/api/grok/chat', req.nextUrl.origin);
          const grokRes = await fetch(url.toString(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: openAi,
              tenantId,
              systemPrompt: systemInstruction,
              skipTools: true,
            }),
          });
          if (!grokRes.ok || !grokRes.body) return false;
          const reader = grokRes.body.getReader();
          const dec = new TextDecoder();
          let buf = '';
          let any = false;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += dec.decode(value, { stream: true });
            const parts = buf.split('\n\n');
            buf = parts.pop() ?? '';
            for (const block of parts) {
              const line = block.trim();
              if (!line.startsWith('data:')) continue;
              const payload = line.slice(5).trim();
              if (payload === '[DONE]') continue;
              try {
                const chunk = JSON.parse(payload) as {
                  choices?: Array<{ delta?: { content?: string } }>;
                };
                const delta = chunk.choices?.[0]?.delta?.content;
                if (delta) {
                  any = true;
                  controller.enqueue(encoder.encode(sse({ text: delta, source: 'grok' })));
                }
              } catch {
                /* ignore */
              }
            }
          }
          return any;
        } catch (e) {
          console.error('[dawn/chat] Grok /api/grok/chat fallback failed', e);
          return false;
        }
      };

      try {
        usedGemini = await tryGemini();
        if (!usedGemini) {
          const grokOk = await tryGrokViaApi();
          if (!grokOk) {
            controller.enqueue(
              encoder.encode(
                sse({
                  error:
                    'No response from AI. Set GEMINI_API_KEY or XAI_API_KEY, or try again.',
                }),
              ),
            );
          }
        }
      } catch (e) {
        console.error('[dawn/chat] stream error', e);
        controller.enqueue(encoder.encode(sse({ error: 'Stream failed' })));
      } finally {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
