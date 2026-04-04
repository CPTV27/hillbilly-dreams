/**
 * Phase 1.9 — Generate Docusaurus markdown from the same manifest as GET /api/admin/registry.
 * Uses jiti to load `apps/web` TypeScript with path aliases (no running server required).
 *
 * Run from repo root: `node scripts/sync-docs.mjs`
 */
import { createJiti } from 'jiti';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const jiti = createJiti(import.meta.url, {
  interopDefault: true,
  alias: {
    '@': join(root, 'apps/web'),
  },
});

const { getClientSafeRegistryManifest } = jiti(join(root, 'apps/web/lib/agent/registryManifest.ts'));

const outDir = join(root, 'apps/manual/docs/reference');
mkdirSync(outDir, { recursive: true });

const tools = getClientSafeRegistryManifest();
const generatedAt = new Date().toISOString();

let md = `---
title: Tool registry reference
sidebar_position: 1
description: Auto-generated from TOOL_REGISTRY (same contract as GET /api/admin/registry).
---

# Tool registry reference

> **Generated:** ${generatedAt}  
> **Do not edit by hand.** Regenerate with \`node scripts/sync-docs.mjs\` from the repo root.

This page mirrors the admin metadata API: tool id, name, description, auth class, model tier, and input JSON Schema. Executable code and handlers are never exported to the client.

## Tools (${tools.length})

`;

for (const t of tools) {
  md += `### \`${t.id}\`\n\n`;
  md += `- **Name:** ${t.name}\n`;
  md += `- **Description:** ${t.description}\n`;
  md += `- **Auth class:** \`${t.authClass}\`\n`;
  if (t.modelTier) md += `- **Model tier:** \`${t.modelTier}\`\n`;
  md += '\n<details>\n<summary>Input JSON Schema</summary>\n\n```json\n';
  md += `${JSON.stringify(t.inputJsonSchema, null, 2)}\n`;
  md += '```\n\n</details>\n\n';
}

writeFileSync(join(outDir, 'tool-registry.md'), md, 'utf8');
console.log(`Wrote ${tools.length} tools → apps/manual/docs/reference/tool-registry.md`);
