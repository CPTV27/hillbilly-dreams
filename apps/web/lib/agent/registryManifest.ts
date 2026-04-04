import { zodToJsonSchema } from 'zod-to-json-schema';
import type { z } from 'zod';
import { TOOL_REGISTRY, type ToolDefinition } from '@/lib/agent/toolRegistry';

/** Client-safe tool row for Admin Command Plane — no handlers, env, or server-only paths. */
export type RegistryToolManifest = {
  id: string;
  name: string;
  description: string;
  authClass: string;
  modelTier?: string;
  /** JSON Schema draft-07 shape derived from Zod `inputSchema`. */
  inputJsonSchema: Record<string, unknown>;
};

function schemaToJson(def: ToolDefinition): Record<string, unknown> {
  const raw = zodToJsonSchema(def.inputSchema as z.ZodTypeAny, {
    target: 'jsonSchema7',
    $refStrategy: 'none',
  }) as Record<string, unknown>;
  return raw;
}

/**
 * Build manifest for admin UI + governance audits.
 * Only metadata and JSON Schema — never executable code.
 */
export function getClientSafeRegistryManifest(): RegistryToolManifest[] {
  const defs = Object.values(TOOL_REGISTRY) as unknown as ToolDefinition[];
  return defs
    .map((def) => ({
      id: def.id,
      name: def.name,
      description: def.description ?? def.name,
      authClass: def.authClass,
      modelTier: def.modelTier,
      inputJsonSchema: schemaToJson(def),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}
