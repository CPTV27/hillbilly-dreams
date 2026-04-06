import { getGrok } from '../../../../lib/xai';
import { NextRequest, NextResponse } from 'next/server';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { GROK_TOOLS } from '../tools';
import { executeVoiceTool } from '@/app/api/voice/tools';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_TOOL_ROUNDS = 6;

// Map Grok tool names to voice tool names (they overlap significantly)
const GROK_TO_VOICE_TOOL: Record<string, string> = {
  query_database: 'search_directory_listings', // NL2SQL → safe search
  get_schema: 'get_constellation_stats',       // schema overview → constellation stats
  get_revenue: 'get_constellation_stats',      // revenue → stats (placeholder)
  get_system_health: 'get_constellation_stats',
  get_nps: 'get_constellation_stats',
  get_churn: 'get_constellation_stats',
  // Direct mappings
  search_directory: 'search_directory',
  get_shows: 'get_shows',
  get_articles: 'get_articles',
  get_business_reviews: 'get_business_reviews',
  search_touring_venues: 'search_touring_venues',
  list_corridor_cities: 'list_corridor_cities',
  list_tour_routes: 'list_tour_routes',
  search_directory_listings: 'search_directory_listings',
  get_constellation_stats: 'get_constellation_stats',
  get_constellation_subgraph: 'get_constellation_subgraph',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, tenantId, systemPrompt, skipTools } = body as {
      messages: unknown;
      tenantId?: string;
      systemPrompt?: string;
      skipTools?: boolean;
    };

    if (!process.env.XAI_API_KEY) {
      return NextResponse.json({ error: 'XAI_API_KEY not configured' }, { status: 500 });
    }

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'messages must be an array' }, { status: 400 });
    }

    const defaultSystem = `You are Grok, the strategic advisor for Hillbilly Dreams Inc. You work alongside Delta Dawn (Gemini) as the architecture and research layer. You have access to tools that query real data from our database. ALWAYS use tools when asked about venues, businesses, cities, routes, hotels, restaurants, or anything factual about the business. NEVER make up business names, addresses, or details.

Context: HDI runs one Next.js codebase on Vercel powering 14 domains, 122 Prisma models in Neon Postgres. MBT is the Glass Engine flywheel: shows → content → directory → revenue at $167/mo total infra. DSD pricing: Free/$25/$50/$99/$250. Team: Chase (CEO/CTO), Tracy (Finance), Amy (Operations). Equal equity partners.

Tenant context: ${tenantId || 'hdi-owner'}`;

    const systemMessage: ChatCompletionMessageParam = {
      role: 'system',
      content:
        typeof systemPrompt === 'string' && systemPrompt.trim().length > 0
          ? systemPrompt
          : defaultSystem,
    };

    if (skipTools) {
      // No tools — simple streaming pass-through
      const grok = getGrok();
      const stream = await grok.chat.completions.create({
        model: 'grok-3',
        messages: [systemMessage, ...(messages as ChatCompletionMessageParam[])],
        stream: true,
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
          Connection: 'keep-alive',
        },
      });
    }

    // With tools — non-streaming loop that executes tool calls
    const grok = getGrok();
    const conversationMessages: ChatCompletionMessageParam[] = [
      systemMessage,
      ...(messages as ChatCompletionMessageParam[]),
    ];

    let finalText = '';

    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const response = await grok.chat.completions.create({
        model: 'grok-3',
        messages: conversationMessages,
        tools: GROK_TOOLS,
        tool_choice: 'auto',
      });

      const choice = response.choices[0];
      const message = choice.message;

      // Add assistant message to conversation
      conversationMessages.push(message);

      // Check for tool calls
      if (message.tool_calls && message.tool_calls.length > 0) {
        for (const toolCall of message.tool_calls) {
          const fnName = toolCall.function.name;
          const fnArgs = JSON.parse(toolCall.function.arguments || '{}');

          // Map to voice tool and execute
          const voiceToolName = GROK_TO_VOICE_TOOL[fnName] || fnName;
          const result = await executeVoiceTool(voiceToolName, fnArgs);

          conversationMessages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(result),
          });
        }
        // Continue loop — Grok will process tool results
        continue;
      }

      // No tool calls — we have the final response
      finalText = message.content || '';
      break;
    }

    // Stream the final text as SSE (matches expected format)
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      start(controller) {
        if (finalText) {
          const chunk = {
            choices: [{ delta: { content: finalText }, index: 0 }],
          };
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
        Connection: 'keep-alive',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
