#!/usr/bin/env node

// Big Muddy MCP Server
// Read-only database access for external AI agents (Perplexity, Claude, etc.)
// Uses @bigmuddy/database Prisma client — no mutations, 50-row cap on all queries.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { registerArticleTools } from './tools/articles.js';
import { registerEventTools } from './tools/events.js';
import { registerOpsTools } from './tools/ops.js';
import { registerGalleryTools } from './tools/gallery.js';
import { registerContentTools } from './tools/content.js';
import { registerClientTools } from './tools/clients.js';
import { registerTalentTools } from './tools/talent.js';
import { registerStatsTools } from './tools/stats.js';

const server = new McpServer({
  name: 'bmt-database',
  version: '0.1.0',
});

// Register all tool domains
registerArticleTools(server);
registerEventTools(server);
registerOpsTools(server);
registerGalleryTools(server);
registerContentTools(server);
registerClientTools(server);
registerTalentTools(server);
registerStatsTools(server);

// Start server on stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('MCP server failed to start:', err);
  process.exit(1);
});
