import fs from 'fs';
import path from 'path';

const REGISTRY_URL = 'http://localhost:3000/api/admin/registry';
const DOCS_DIR = path.join(process.cwd(), 'docs', 'tools');

async function syncDocs() {
  console.log(`Fetching tool registry manifest from ${REGISTRY_URL}...`);
  try {
    const res = await fetch(REGISTRY_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch registry metadata: ${res.status} ${res.statusText}`);
    }

    const { tools } = await res.json();
    if (!tools || !Array.isArray(tools)) {
      throw new Error('Invalid registry response format');
    }

    // Ensure docs directory exists
    if (!fs.existsSync(DOCS_DIR)) {
      fs.mkdirSync(DOCS_DIR, { recursive: true });
      console.log(`Created directory: ${DOCS_DIR}`);
    }

    // Delete existing markdown files in the folder (Ghost Hunt for stale tools)
    const existingFiles = fs.readdirSync(DOCS_DIR).filter(file => file.endsWith('.md'));
    for (const file of existingFiles) {
      fs.unlinkSync(path.join(DOCS_DIR, file));
    }
    console.log(`Cleared ${existingFiles.length} legacy tool documentation files.`);

    // Generate markdown files (shape matches GET /api/admin/registry)
    tools.forEach((tool: {
      id: string;
      name?: string;
      description?: string;
      authClass?: string;
      modelTier?: string;
      inputJsonSchema?: unknown;
    }) => {
      const markdownContent = `---
id: ${tool.id}
title: ${tool.id}
sidebar_label: ${tool.id}
---

# ${tool.id}

**Name:** ${tool.name ?? tool.id}  
**Model tier:** \`${tool.modelTier ?? '—'}\`  
**Auth class:** \`${tool.authClass ?? '—'}\`

## Overview

${tool.description ?? '_(no description in registry)_'}

Executed only through the universal bouncer: \`POST /api/agent\` with \`toolId\` and \`params\`.

## Input JSON Schema

\`\`\`json
${JSON.stringify(tool.inputJsonSchema ?? {}, null, 2)}
\`\`\`
`;

      const safeFilename = tool.id.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.md';
      const destPath = path.join(DOCS_DIR, safeFilename);

      fs.writeFileSync(destPath, markdownContent, 'utf-8');
      console.log(`Generated: docs/tools/${safeFilename}`);
    });

    console.log(`Successfully synced ${tools.length} tool(s) to Docusaurus markdown.`);
  } catch (error) {
    console.error('Error syncing docs:', error);
    process.exit(1);
  }
}

syncDocs();
