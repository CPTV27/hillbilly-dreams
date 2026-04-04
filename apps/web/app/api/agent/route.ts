export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { toolRegistry, ToolAuthClass } from '@/lib/agent/toolRegistry';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

/** POST /api/agent — universal entry: `{ toolId, params }` → `toolRegistry.get(toolId).execute(params)`. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toolId, params, maxTokens, maxSpend, traceId, includeTelemetry } = body as {
      toolId?: string;
      params?: unknown;
      maxTokens?: number;
      maxSpend?: number;
      traceId?: string;
      includeTelemetry?: boolean;
    };

    if (!toolId || typeof toolId !== 'string') {
      return NextResponse.json({ error: 'toolId is required' }, { status: 400 });
    }

    const tool = toolRegistry.get(toolId);
    if (!tool) {
      return NextResponse.json({ error: `Tool ${toolId} not found in registry.` }, { status: 404 });
    }

    if (tool.meta.authClass === ToolAuthClass.ADMIN) {
      const denied = await requireAdmin();
      if (denied) return denied;
    } else {
      const denied = await requireAdmin();
      if (denied) return denied;
    }

    const execOpts =
      typeof maxTokens === 'number' ||
      typeof maxSpend === 'number' ||
      (typeof traceId === 'string' && traceId.trim().length > 0) ||
      includeTelemetry === true
        ? {
            maxTokens,
            maxSpend,
            traceId: typeof traceId === 'string' && traceId.trim() ? traceId.trim().slice(0, 128) : undefined,
            includeTelemetry: includeTelemetry === true,
          }
        : undefined;
    const result = await tool.execute(params ?? {}, execOpts);

    const registryHeaders = new Headers();
    if (tool.meta.modelTier) {
      registryHeaders.set('X-Registry-Model-Tier', tool.meta.modelTier);
    }
    registryHeaders.set('X-Registry-Tool-Id', tool.meta.id);

    if (isRecord(result) && result.error === 'validation_failed') {
      return NextResponse.json(result, { status: 400, headers: registryHeaders });
    }
    if (isRecord(result) && result.ok === false) {
      const status = result.error === 'Budget Exceeded' ? 402 : 500;
      return NextResponse.json(result, { status, headers: registryHeaders });
    }
    if (isRecord(result) && 'success' in result && result.success === false) {
      const status = result.error === 'Budget Exceeded' ? 402 : 500;
      return NextResponse.json(result, { status, headers: registryHeaders });
    }

    return NextResponse.json(result, { headers: registryHeaders });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'Tool execution failed', detail: message }, { status: 500 });
  }
}
