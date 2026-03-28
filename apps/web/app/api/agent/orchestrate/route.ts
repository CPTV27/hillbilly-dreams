import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
  project: process.env.GCP_PROJECT_ID || 'bigmuddy-ff651',
  location: process.env.VERTEX_LOCATION || 'us-east4',
});
const model = vertexAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * POST /api/agent/orchestrate
 * The Agent Dispatcher — routes tasks to the right agent and tools.
 *
 * Uses a Reasoning-and-Acting (ReAct) loop:
 * 1. Check AgentContext memory for existing knowledge
 * 2. Determine which agent should handle the task
 * 3. Execute via the appropriate marketing/agent API
 * 4. Log the action
 *
 * Body: {
 *   task: string — natural language description of what to do
 *   agent?: string — force a specific agent (rook, chuck, delta-dawn, ledger)
 *   context?: object — additional context to inject
 * }
 */
export async function POST(req: NextRequest) {
  const { task, agent: forcedAgent, context: extraContext } = await req.json();

  if (!task) {
    return NextResponse.json({ error: 'task required' }, { status: 400 });
  }

  try {
    // Step 1: Memory-First — check what we already know
    const relevantMemory = await prisma.agentContext.findMany({
      where: {
        content: { contains: task.split(' ').slice(0, 3).join(' '), mode: 'insensitive' },
      },
      take: 5,
      orderBy: { confidence: 'desc' },
      select: { domain: true, key: true, content: true, topic: true },
    });

    // Step 2: Determine the agent and action
    const routingPrompt = `You are the Dispatcher for the Big Muddy agent system. You route tasks to the right agent.

Available agents and their capabilities:
- ROOK: Research, data gathering, Places API, business audits, competitive analysis. Tools: /api/agent/harvest, /api/marketing/dna, /api/marketing/competitors
- CHUCK: Creative content, social media, radio spots, image generation. Tools: /api/marketing/social, /api/marketing/radio-spot, /api/marketing/reskin, /api/marketing/campaign-calendar
- DELTA_DAWN: Operations, reviews, reputation management, Cloudbeds, scheduling. Tools: /api/marketing/reviews, /api/agent/context
- LEDGER: Finance, pricing, analytics, revenue tracking. Tools: /api/agent/context (domain=finance)

Task: "${task}"

Existing memory fragments that may be relevant:
${relevantMemory.map(m => `[${m.domain}/${m.topic}] ${m.content.substring(0, 150)}`).join('\n')}

${extraContext ? `Additional context: ${JSON.stringify(extraContext)}` : ''}

Return ONLY valid JSON:
{
  "agent": "rook | chuck | delta_dawn | ledger",
  "action": "What specifically to do",
  "tool": "The API endpoint to call (e.g., /api/agent/harvest)",
  "params": { "key": "value pairs to pass to the tool" },
  "reasoning": "Why this agent and tool were chosen",
  "memoryUsed": true/false — did existing memory answer the question?
}`;

    const result = await model.generateContent(routingPrompt);
    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const routing = JSON.parse(cleaned);

    // Step 3: Execute if we have a tool to call
    let toolResult = null;
    if (routing.tool && !routing.memoryUsed) {
      try {
        // Build the internal URL
        const baseUrl = process.env.NEXTAUTH_URL || 'https://measurablybetterthings.com';
        const toolRes = await fetch(`${baseUrl}${routing.tool}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(routing.params || {}),
        });
        toolResult = await toolRes.json();
      } catch (toolErr: any) {
        toolResult = { error: toolErr.message };
      }
    }

    // Step 4: Log the action
    await prisma.agentAction.create({
      data: {
        agent: routing.agent || forcedAgent || 'dispatcher',
        action: 'orchestrate',
        summary: routing.action || task,
        detail: JSON.stringify({
          task,
          routing,
          toolResult: toolResult ? 'executed' : 'skipped',
          memoryHits: relevantMemory.length,
        }),
        domain: routing.agent === 'ledger' ? 'finance'
          : routing.agent === 'rook' ? 'strategy'
          : routing.agent === 'chuck' ? 'brand'
          : 'operations',
        impact: 'medium',
      },
    });

    return NextResponse.json({
      success: true,
      agent: routing.agent,
      action: routing.action,
      reasoning: routing.reasoning,
      memoryUsed: routing.memoryUsed,
      memoryHits: relevantMemory.length,
      toolResult,
    });
  } catch (error: any) {
    console.error('[agent/orchestrate] Error:', error.message);
    return NextResponse.json(
      { error: 'Orchestration failed', detail: error.message },
      { status: 500 }
    );
  }
}
