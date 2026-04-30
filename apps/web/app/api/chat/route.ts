// apps/web/app/api/chat/route.ts
//
// Big Muddy assistant — streaming chat endpoint
//
// Iteration 2 (Chase 2026-04-30): added the ROUTER layer.
//
// The chat now has three tools:
//   1. which_specialist(question) -> { id, name, score, source }
//      First-pass keyword scorer over the specialist registry. Cheap.
//      The model is instructed to call this BEFORE routing.
//   2. route_to_specialist({ specialist_id, question }) -> { specialist, answer }
//      Loads the specialist's system prompt, makes a sub-call to Claude,
//      returns the reply inline. UI badges it.
//   3. create_task({ title, assignee, details }) -> { taskGid, taskUrl, ... }
//      Same as MVP — escalate to a human via Asana.
//
// Tool-loop wiring:
//   - We loop the tool/turn cycle up to MAX_TOOL_TURNS (3) so the model
//     can chain `which_specialist` -> `route_to_specialist` -> reply.
//   - Specialist responses are streamed to the client incrementally via
//     `data: { type: 'specialist', ... }` events so the UI can show the
//     "Routing to Patch" callout the moment the sub-call starts.

import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { auth } from '@/lib/auth';
import { loadBigMuddyContext, buildSystemPrompt } from '@/lib/big-muddy-context';
import { createTask, addTaskComment } from '@/lib/asana-client';
import {
  SPECIALISTS,
  getSpecialist,
  pickSpecialist,
  scoreSpecialists,
  specialistMenu,
  resolveAnthropicModelId,
} from '@/lib/specialist-registry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Weekly Partner Commitments → Inbox section. Per CLAUDE.md, every
// inbound work item from Chase lands here first.
const WEEKLY_PARTNER_COMMITMENTS_PROJECT_ID = '1214376792613690';

const MAIN_MODEL = 'claude-sonnet-4-5-20250929';
const MAX_TOOL_TURNS = 3;

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const ASSIGNEE_LABELS: Record<string, string> = {
  Chase: 'Chase Pierson',
  Elijah: 'Elijah (Studio C)',
  Tracy: 'Tracy Alderson-Allen',
  Amy: 'Amy Allen',
};

const TOOLS: Anthropic.Messages.Tool[] = [
  {
    name: 'which_specialist',
    description:
      'Pick the right specialist agent for the user question BEFORE routing. Runs the keyword scorer over the registry and returns the best match. Always call this first if you think a specialist might be needed — it is cheap. If the result.score is 0 or the result is "cos", the question is general; you can either answer directly from context or route to Cos.',
    input_schema: {
      type: 'object' as const,
      properties: {
        question: {
          type: 'string',
          description:
            "The user's question, verbatim. Used for keyword matching against the registry.",
        },
      },
      required: ['question'],
    },
  },
  {
    name: 'route_to_specialist',
    description:
      'Hand the question off to a specialist agent. Loads the specialist system prompt, makes a sub-call, and returns the reply inline. Use this when the question fits a specialist lane (engineering, finance, design, touring, etc.) and would benefit from a focused expert prompt rather than your generalist context. Do NOT use this for actions that need a human (booking, deploys, money moves) — use create_task for those.',
    input_schema: {
      type: 'object' as const,
      properties: {
        specialist_id: {
          type: 'string',
          enum: SPECIALISTS.map((s) => s.id),
          description:
            'Specialist id from the registry. Prefer the result of which_specialist.',
        },
        question: {
          type: 'string',
          description:
            "The question to forward to the specialist. Restate the user's question crisply with any context the specialist needs (the user is talking to YOU, the main chat — the specialist will not see prior turns).",
        },
      },
      required: ['specialist_id', 'question'],
    },
  },
  {
    name: 'create_task',
    description:
      'Escalate a request to a human teammate by creating an Asana task in Weekly Partner Commitments → Inbox. Use this when the request requires physical human action (booking, deploys you cannot do, design work, money moves, Inn operations) — NOT for questions a specialist agent can answer.',
    input_schema: {
      type: 'object' as const,
      properties: {
        title: {
          type: 'string',
          description:
            'Short imperative title for the task (under 80 chars). Example: "Fix bigmuddyradio.com SSL".',
        },
        assignee: {
          type: 'string',
          enum: ['Chase', 'Elijah', 'Tracy', 'Amy'],
          description:
            'Who should handle this. Chase = deploy/code/SSH. Elijah = design/mix/Studio C. Tracy = money/billing/forecast. Amy = Inn/bar/Blues Room.',
        },
        details: {
          type: 'string',
          description:
            "Why this needs to happen and any context the assignee needs. Include the user's original question verbatim.",
        },
      },
      required: ['title', 'assignee', 'details'],
    },
  },
];

// ─── Tool executors ──────────────────────────────────────────────────────

async function executeCreateTask(args: {
  title: string;
  assignee: string;
  details: string;
  userQuestion: string;
}): Promise<{ ok: true; taskGid: string; taskUrl: string; assigneeLabel: string } | { ok: false; error: string }> {
  const assigneeLabel = ASSIGNEE_LABELS[args.assignee] || ASSIGNEE_LABELS.Chase;

  const notes = [
    `Routed to: ${assigneeLabel}`,
    '',
    '── User question ──',
    args.userQuestion,
    '',
    '── Detail / context ──',
    args.details,
    '',
    '── Source ──',
    'Big Muddy assistant chat at /chat',
    `Created: ${new Date().toISOString()}`,
  ].join('\n');

  try {
    const taskGid = await createTask(
      WEEKLY_PARTNER_COMMITMENTS_PROJECT_ID,
      args.title,
      notes,
    );
    try {
      await addTaskComment(taskGid, `Auto-routed by Big Muddy assistant → ${assigneeLabel}`);
    } catch {
      /* non-fatal */
    }
    return {
      ok: true,
      taskGid,
      taskUrl: `https://app.asana.com/0/${WEEKLY_PARTNER_COMMITMENTS_PROJECT_ID}/${taskGid}`,
      assigneeLabel,
    };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Asana request failed' };
  }
}

function executeWhichSpecialist(question: string): {
  id: string;
  name: string;
  score: number;
  source: 'keyword' | 'fallback-cos';
  ranked: { id: string; score: number }[];
} {
  const ranked = scoreSpecialists(question);
  const topId = pickSpecialist(question);
  if (!topId) {
    const cos = getSpecialist('cos');
    return { id: cos.id, name: cos.name, score: 0, source: 'fallback-cos', ranked };
  }
  const top = getSpecialist(topId);
  return { id: top.id, name: top.name, score: ranked[0]?.score || 0, source: 'keyword', ranked };
}

async function executeRouteToSpecialist(args: {
  specialist_id: string;
  question: string;
  client: Anthropic;
  send: (event: Record<string, unknown>) => void;
}): Promise<{ ok: true; specialistId: string; answer: string } | { ok: false; error: string; specialistId: string }> {
  const specialist = getSpecialist(args.specialist_id);
  const modelId = resolveAnthropicModelId(specialist.model);

  // Tell the UI we're routing — render the badge before the sub-call returns.
  args.send({
    type: 'specialist',
    phase: 'start',
    specialist: {
      id: specialist.id,
      name: specialist.name,
      description: specialist.description,
      model: specialist.model,
    },
  });

  let answer = '';
  try {
    const sub = await args.client.messages.stream({
      model: modelId,
      max_tokens: 1200,
      system: specialist.systemPrompt,
      messages: [{ role: 'user', content: args.question }],
    });

    for await (const event of sub) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        const delta = event.delta.text;
        answer += delta;
        args.send({
          type: 'specialist',
          phase: 'delta',
          specialistId: specialist.id,
          delta,
        });
      }
    }

    args.send({
      type: 'specialist',
      phase: 'end',
      specialistId: specialist.id,
    });

    return { ok: true, specialistId: specialist.id, answer };
  } catch (err: any) {
    args.send({
      type: 'specialist',
      phase: 'error',
      specialistId: specialist.id,
      error: err?.message || 'specialist call failed',
    });
    return {
      ok: false,
      error: err?.message || 'specialist call failed',
      specialistId: specialist.id,
    };
  }
}

// ─── Router system prompt addendum ───────────────────────────────────────

function buildRouterAddendum(): string {
  return `
# ROUTER — how to use the tools

You have three tools. The decision tree:

1. Can you answer directly from the context above? → Just answer. Skip the tools.
2. Does the question fit a specialist lane (engineering, finance, design, touring, brand, photo, content, insurance, QA)?
   a. Call which_specialist(question) FIRST. It returns the best match from the registry.
   b. If which_specialist returns a meaningful match (score > 0 and id is not "cos"), call route_to_specialist with that id.
   c. The specialist's reply will stream to the user automatically. After it ends, write a one-sentence wrap if needed (e.g. "That's from Patch — anything else?") OR say nothing if the specialist's answer is complete on its own.
3. Does the request need a HUMAN to physically do something (book, deploy, fix in person, move money, update an Inn room)?
   → Call create_task. After it fires, write one short sentence telling the user it has been escalated.

Specialist registry (id — name — description):
${specialistMenu()}

Hard rules:
- Never call route_to_specialist without first calling which_specialist (you'll waste a turn).
- Never call create_task for something a specialist could answer (the specialist's answer IS the deliverable).
- Never invent a specialist id. Use only the ids in the registry.
- If the user explicitly names a specialist ("ask Patch about X"), you may skip which_specialist and route directly.
`;
}

// ─── Route handler ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: 'auth required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  let body: { messages: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const messages = (body.messages || []).filter(
    (m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string',
  );
  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'no messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || '';

  const contextBody = await loadBigMuddyContext();
  const baseSystem = buildSystemPrompt(contextBody);
  const systemPrompt = `${baseSystem}\n\n${buildRouterAddendum()}`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      const apiMessages: Anthropic.Messages.MessageParam[] = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        let turn = 0;
        // Per-turn loop. The model may chain which_specialist ->
        // route_to_specialist -> final reply, which is 3 model passes.
        // Cap at MAX_TOOL_TURNS to prevent runaway loops.
        while (turn < MAX_TOOL_TURNS) {
          turn += 1;

          const pass = await client.messages.stream({
            model: MAIN_MODEL,
            max_tokens: 1500,
            system: systemPrompt,
            tools: TOOLS,
            messages: apiMessages,
          });

          for await (const event of pass) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              send({ type: 'text', delta: event.delta.text });
            }
          }

          const finalMessage = await pass.finalMessage();
          const assistantContent = finalMessage.content;

          // No tool requested — model is done.
          if (finalMessage.stop_reason !== 'tool_use') {
            break;
          }

          // Run every tool the model requested in this turn, then loop
          // back so the model sees the results.
          const toolUses = assistantContent.filter(
            (block): block is Anthropic.Messages.ToolUseBlock => block.type === 'tool_use',
          );

          if (toolUses.length === 0) break;

          const toolResults: Anthropic.Messages.ToolResultBlockParam[] = [];

          for (const toolUse of toolUses) {
            if (toolUse.name === 'which_specialist') {
              const input = toolUse.input as { question: string };
              const result = executeWhichSpecialist(input.question || lastUserMessage);
              send({ type: 'tool', name: 'which_specialist', payload: result });
              toolResults.push({
                type: 'tool_result',
                tool_use_id: toolUse.id,
                content: JSON.stringify(result),
              });
              continue;
            }

            if (toolUse.name === 'route_to_specialist') {
              const input = toolUse.input as {
                specialist_id: string;
                question: string;
              };
              const result = await executeRouteToSpecialist({
                specialist_id: input.specialist_id,
                question: input.question || lastUserMessage,
                client,
                send,
              });
              send({ type: 'tool', name: 'route_to_specialist', payload: result });
              toolResults.push({
                type: 'tool_result',
                tool_use_id: toolUse.id,
                content: result.ok
                  ? `Specialist ${result.specialistId} answered. The user has already seen the reply (it streamed inline). You may add a short follow-up sentence or stop.`
                  : `Specialist call failed: ${result.error}. Tell the user briefly and offer to escalate via create_task or to try another specialist.`,
              });
              continue;
            }

            if (toolUse.name === 'create_task') {
              const input = toolUse.input as {
                title: string;
                assignee: string;
                details: string;
              };
              const result = await executeCreateTask({
                title: input.title,
                assignee: input.assignee,
                details: input.details,
                userQuestion: lastUserMessage,
              });
              send({ type: 'tool', name: 'create_task', payload: result });
              toolResults.push({
                type: 'tool_result',
                tool_use_id: toolUse.id,
                content: result.ok
                  ? `Task created. URL: ${result.taskUrl}. Routed to: ${result.assigneeLabel}. Tell the user it has been escalated to ${result.assigneeLabel} in one short sentence and include the URL.`
                  : `Task creation failed: ${result.error}. Apologise to the user and tell them to try again or ping Chase directly.`,
              });
              continue;
            }

            // Unknown tool — feed an error back so the model can recover.
            toolResults.push({
              type: 'tool_result',
              tool_use_id: toolUse.id,
              content: `Unknown tool: ${toolUse.name}. Stop calling it.`,
              is_error: true,
            });
          }

          // Append the model's tool-use turn and the tool results, then
          // loop. Next iteration will produce either another tool call or
          // a final natural-language reply.
          apiMessages.push({ role: 'assistant', content: assistantContent });
          apiMessages.push({ role: 'user', content: toolResults });
        }

        send({ type: 'done' });
        controller.close();
      } catch (err: any) {
        send({ type: 'error', message: err?.message || 'unknown error' });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
