export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getClientSafeRegistryManifest } from '@/lib/agent/registryManifest';

/**
 * GET /api/admin/registry
 * Serialized manifest over TOOL_REGISTRY (via getClientSafeRegistryManifest):
 * id, name, description, authClass, modelTier, inputJsonSchema from Zod → JSON Schema (zod-to-json-schema).
 * Never returns handlers, env, or internal paths.
 */
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const tools = getClientSafeRegistryManifest();
  return NextResponse.json({
    version: 1,
    tools,
    generatedAt: new Date().toISOString(),
  });
}
