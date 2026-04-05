import { getGrok } from '../../../../lib/xai';
import { NextRequest, NextResponse } from 'next/server';
import { GROK_TOOLS } from '../tools';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { messages, tenantId } = await req.json();

    if (!process.env.XAI_API_KEY) {
      return NextResponse.json({ error: 'XAI_API_KEY not configured' }, { status: 500 });
    }

    const systemMessage = {
      role: 'system' as const,
      content: `You are Grok, the strategic advisor for Hillbilly Dreams Inc. You work alongside Delta Dawn (Gemini) as the architecture and research layer. You have access to the same 10 tools as Delta Dawn. You reason about the business at a strategic level — competitive analysis, architecture decisions, R&D experiments, and long-term planning. You are direct, honest, and occasionally sharp. If something is a bad idea, say so.

Context: HDI runs one Next.js codebase on Vercel powering 14 domains, 122 Prisma models in Neon Postgres. MBT is the Glass Engine flywheel: shows → content → directory → revenue at $167/mo total infra. DSD pricing: Free/$25/$50/$99/$250. Team: Chase (CEO/CTO), Tracy (Finance), Amy (Operations). Equal equity partners.

Tenant context: ${tenantId || 'hdi-owner'}`,
    };

    const grok = getGrok();
    const stream = await grok.chat.completions.create({
      model: 'grok-3',
      messages: [systemMessage, ...messages],
      stream: true,
      tools: GROK_TOOLS,
      tool_choice: 'auto',
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
