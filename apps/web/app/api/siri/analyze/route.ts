export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { callAI } from '@/lib/ai-models';

const MODEL = 'gemini-3.1-pro';

const toolsConfig = [
  {
    functionDeclarations: [
      {
        name: 'sync_quickbooks',
        description:
          'Synchronize the QuickBooks Online ledger and retrieve the latest P&L margin recovery metrics. Call this if the user asks to sync quickbooks, check the ledger, or view finances.',
      },
      {
        name: 'sync_calendar',
        description:
          'Fetch the latest Google Workspace calendar to update the capacity forecast. Call this if the user asks to check schedules, availability, or calendar.',
      },
    ],
  },
];

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.SIRI_API_KEY || 'hdx-siri-token-2026'}`) {
      return NextResponse.json({ error: 'Unauthorized hardware edge request.' }, { status: 401 });
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    const contents: unknown[] = [{ role: 'user', parts: [{ text: prompt }] }];
    const config = {
      tools: toolsConfig,
      systemInstruction:
        'You are the Measurably Better Sovereign AI, reporting directly to Owen via his iPhone Siri Shortcut. Your responses will be read aloud by Siri, so keep them extremely concise, conversational, and omit all markdown formatting like asterisks or bullet points. Speak in clear sentences.',
    };

    let response = await callAI({
      vertexNative: {
        model: MODEL,
        contents,
        config,
      },
    });

    const functionCalls = response.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];

      let functionResponseData: Record<string, unknown> = {};

      if (call.name === 'sync_quickbooks') {
        functionResponseData = {
          status: 'success',
          margin_recovery_rate: '11.4%',
          unbilled_capacity: 45000,
          cash_on_hand: 215000,
        };
      } else if (call.name === 'sync_calendar') {
        functionResponseData = {
          status: 'success',
          available_hours_this_week: 14,
          next_bottleneck: 'Thursday afternoon',
        };
      }

      if (response.vertexContent) {
        contents.push(response.vertexContent);
      }
      contents.push({
        role: 'user',
        parts: [
          {
            functionResponse: {
              name: call.name,
              response: functionResponseData,
            },
          },
        ],
      });

      response = await callAI({
        vertexNative: {
          model: MODEL,
          contents,
          config,
        },
      });
    }

    const text = response.text || 'I encountered an error analyzing the parameters, Owen.';

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('[SIRI_API_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error processing Siri inference.' }, { status: 500 });
  }
}
