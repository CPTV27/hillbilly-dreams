import { prisma } from '@bigmuddy/database';
import { ModelTier } from '@/lib/ai/modelTier';
import { generateTextWithTierOrVertex } from '@/lib/ai/openRouter';
import type { LlmTelemetrySummary } from '@/lib/ai/tokenTelemetry';
import { normalizeAgentToolPath, type ToolRunContext } from '@/lib/agent/agentDispatch';
import { toolRegistry } from '@/lib/agent/toolRegistry';
import type { OrchestrateInput } from '@/lib/agent/schemas/orchestrate';

function domainForAgent(agent: string | undefined): string {
  if (agent === 'ledger') return 'finance';
  if (agent === 'rook') return 'strategy';
  if (agent === 'chuck') return 'brand';
  return 'operations';
}

async function logOrchestrateProgress(data: {
  agent: string;
  action: string;
  summary: string;
  detail: Record<string, unknown>;
  domain: string;
  impact: string;
}): Promise<void> {
  try {
    await prisma.agentAction.create({
      data: {
        agent: data.agent,
        action: data.action,
        summary: data.summary,
        detail: JSON.stringify(data.detail),
        domain: data.domain,
        impact: data.impact,
      },
    });
  } catch {
    // live feed is best-effort
  }
}

/**
 * ReAct dispatcher: memory → route (ARCHITECT tier / OpenRouter when configured) → in-process registry tools for /api/agent/*, fetch for /api/marketing/*.
 */
export async function executeOrchestrate(
  input: OrchestrateInput,
  ctx?: ToolRunContext
): Promise<
  | {
      success: true;
      agent: string;
      action: string;
      reasoning: string;
      memoryUsed: boolean;
      memoryHits: number;
      toolResult: unknown;
      _telemetry?: LlmTelemetrySummary;
    }
  | { success: false; error: string; detail?: string }
> {
  const { task, agent: forcedAgent, context: extraContext } = input;
  const tier = ctx?.modelTier ?? ModelTier.ARCHITECT;
  let routeLlm: Awaited<ReturnType<typeof generateTextWithTierOrVertex>> | undefined;

  const relevantMemory = await prisma.agentContext.findMany({
    where: {
      content: { contains: task.split(' ').slice(0, 3).join(' '), mode: 'insensitive' },
    },
    take: 5,
    orderBy: { confidence: 'desc' },
    select: { domain: true, key: true, content: true, topic: true },
  });

  await logOrchestrateProgress({
    agent: forcedAgent || 'dispatcher',
    action: 'orchestrate_memory',
    summary: `Memory scan: ${relevantMemory.length} hit(s)`,
    detail: { taskPreview: task.slice(0, 120), keys: relevantMemory.map((m) => m.key) },
    domain: 'operations',
    impact: 'low',
  });

  const routingPrompt = `You are the Dispatcher for the Big Muddy agent system. You route tasks to the right agent.

Available agents and their capabilities:
- ROOK: Research, data gathering, Places API, business audits, competitive analysis. Tools: /api/agent/harvest, /api/marketing/dna, /api/marketing/competitors
- CHUCK: Creative content, social media, radio spots, image generation. Tools: /api/marketing/social, /api/marketing/radio-spot, /api/marketing/reskin, /api/marketing/campaign-calendar
- DELTA_DAWN: Operations, reviews, reputation management, Cloudbeds, scheduling. Tools: /api/marketing/reviews, /api/agent/context
- LEDGER: Finance, pricing, analytics, revenue tracking. Tools: /api/agent/context (domain=finance)

Task: "${task}"

Existing memory fragments that may be relevant:
${relevantMemory.map((m) => `[${m.domain}/${m.topic}] ${m.content.substring(0, 150)}`).join('\n')}

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

  let routing: {
    agent?: string;
    action?: string;
    tool?: string;
    params?: Record<string, unknown>;
    reasoning?: string;
    memoryUsed?: boolean;
  };

  try {
    routeLlm = await generateTextWithTierOrVertex(tier, routingPrompt, {
      maxOutputTokens: 2048,
      budget: ctx?.budget,
      telemetry: {
        toolId: ctx?.toolId ?? 'rook.orchestrate',
        traceId: ctx?.traceId,
        modelTier: tier,
      },
    });
    const responseText = routeLlm.text;
    const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    routing = JSON.parse(cleaned || '{}') as typeof routing;
  } catch (e) {
    if (e instanceof Error && e.message === 'Budget Exceeded') {
      await logOrchestrateProgress({
        agent: forcedAgent || 'dispatcher',
        action: 'orchestrate_failed',
        summary: 'Budget Exceeded',
        detail: { code: (e as Error & { code?: string }).code },
        domain: 'operations',
        impact: 'high',
      });
      return { success: false, error: 'Budget Exceeded', detail: (e as Error & { code?: string }).code };
    }
    const message = e instanceof Error ? e.message : String(e);
    await logOrchestrateProgress({
      agent: forcedAgent || 'dispatcher',
      action: 'orchestrate_failed',
      summary: 'Routing parse/model failed',
      detail: { error: message },
      domain: 'operations',
      impact: 'high',
    });
    return { success: false, error: 'Orchestration failed', detail: message };
  }

  const routedAgent = routing.agent || forcedAgent || 'dispatcher';
  await logOrchestrateProgress({
    agent: routedAgent,
    action: 'orchestrate_route',
    summary: routing.action || task.slice(0, 200),
    detail: {
      tool: routing.tool ?? null,
      memoryUsed: Boolean(routing.memoryUsed),
      reasoning: (routing.reasoning || '').slice(0, 500),
    },
    domain: domainForAgent(routing.agent),
    impact: 'medium',
  });

  let toolResult: unknown = null;
  if (routing.tool && !routing.memoryUsed) {
    const toolPath = String(routing.tool);
    const toolId = normalizeAgentToolPath(toolPath);

    if (toolId) {
      const reg = toolRegistry.get(toolId);
      toolResult = reg
        ? await reg.execute(routing.params || {})
        : { error: 'tool_not_registered', toolId };
    } else if (toolPath.startsWith('/api/marketing/')) {
      try {
        const baseUrl = process.env.NEXTAUTH_URL || 'https://measurablybetterthings.com';
        const toolRes = await fetch(`${baseUrl}${toolPath}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(routing.params || {}),
        });
        toolResult = await toolRes.json();
      } catch (toolErr: unknown) {
        toolResult = { error: toolErr instanceof Error ? toolErr.message : String(toolErr) };
      }
    } else {
      toolResult = { error: 'unsupported_tool', tool: toolPath };
    }

    await logOrchestrateProgress({
      agent: routedAgent,
      action: 'orchestrate_tool',
      summary: `Tool ${toolPath}`,
      detail: {
        path: toolPath,
        registryId: toolId,
        executed: toolResult !== null,
        hasError:
          toolResult !== null &&
          typeof toolResult === 'object' &&
          toolResult !== null &&
          'error' in toolResult,
      },
      domain: domainForAgent(routing.agent),
      impact: 'medium',
    });
  }

  try {
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
        domain: domainForAgent(routing.agent),
        impact: 'medium',
      },
    });
  } catch {
    // non-fatal
  }

  const successBody = {
    success: true as const,
    agent: routing.agent || forcedAgent || 'dispatcher',
    action: routing.action || task,
    reasoning: routing.reasoning || '',
    memoryUsed: Boolean(routing.memoryUsed),
    memoryHits: relevantMemory.length,
    toolResult,
  };

  if (ctx?.includeTelemetry === true && routeLlm) {
    const summary: LlmTelemetrySummary = {
      toolId: ctx?.toolId ?? 'rook.orchestrate',
      traceId: ctx?.traceId,
      modelTier: tier,
      provider: routeLlm.model.startsWith('vertex:') ? 'vertex' : 'openrouter',
      model: routeLlm.model,
      usage: {
        prompt_tokens: routeLlm.usage.prompt_tokens,
        completion_tokens: routeLlm.usage.completion_tokens,
        total_tokens: routeLlm.usage.total_tokens,
        cost: routeLlm.usage.cost,
      },
      estimatedCostUsd: routeLlm.estimatedCostUsd,
    };
    return { ...successBody, _telemetry: summary };
  }

  return successBody;
}
