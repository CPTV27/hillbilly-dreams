// Delta Dawn tool schemas — Grok-validated, identical to Gemini function declarations
// Source: docs/specs/DELTA_DAWN_TOOL_SCHEMAS.md

export const GROK_TOOLS = [
  {
    type: 'function' as const,
    function: {
      name: 'query_database',
      description: 'Query the HDI PostgreSQL database using natural language. Converts to parameterized SQL, executes read-only, returns JSON results. Always filtered by tenant. Max 500 rows. 30-second timeout.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Natural language query about business data' },
          tenantId: { type: 'string', description: 'Tenant filter. Auto-filled from user context.' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_schema',
      description: 'Returns the Prisma schema models for a specific business domain. Use before query_database to understand available tables and fields.',
      parameters: {
        type: 'object',
        properties: {
          domain: { type: 'string', enum: ['directory', 'revenue', 'content', 'events', 'artists', 'analytics', 'all'], description: 'Business domain to inspect' },
        },
        required: ['domain'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_revenue',
      description: 'Returns current revenue metrics: MRR, subscriber count, tier breakdown, Stripe transaction totals.',
      parameters: {
        type: 'object',
        properties: {
          period: { type: 'string', enum: ['day', 'week', 'month', 'all'], description: 'Time period for revenue data' },
        },
        required: ['period'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_system_health',
      description: 'Returns platform status: deployment state, domain health (14 domains), database connection, recent errors.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_nps',
      description: 'Returns NPS survey results: score distribution, response count, trend over specified days.',
      parameters: {
        type: 'object',
        properties: {
          days: { type: 'integer', description: 'Number of days to look back. Default 30.' },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_churn',
      description: 'Returns churn metrics: at-risk accounts, engagement drops, last-activity dates.',
      parameters: {
        type: 'object',
        properties: {
          days: { type: 'integer', description: 'Number of days of inactivity to flag. Default 30.' },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'create_task',
      description: 'Creates an Asana task in a specified project. Use when Tracy or Amy say "add this to Asana" or "create a task for X."',
      parameters: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Task title' },
          notes: { type: 'string', description: 'Task description/notes' },
          assignee: { type: 'string', description: 'Email of assignee' },
          due: { type: 'string', description: 'Due date in ISO format (YYYY-MM-DD)' },
          project: { type: 'string', description: 'Asana project name or GID' },
        },
        required: ['title'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'publish_social',
      description: 'Publishes a social media post to connected accounts. Goes through the social publisher proxy — validates content before posting.',
      parameters: {
        type: 'object',
        properties: {
          content: { type: 'string', description: 'Post text content' },
          platform: { type: 'string', enum: ['facebook', 'gbp'], description: 'Target platform' },
        },
        required: ['content', 'platform'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'draft_review_response',
      description: 'Drafts a response to a Google review in Delta Dawn voice. Returns the draft for human approval — does NOT auto-post.',
      parameters: {
        type: 'object',
        properties: {
          reviewText: { type: 'string', description: 'The review text to respond to' },
          rating: { type: 'number', description: 'Star rating (1-5)' },
        },
        required: ['reviewText', 'rating'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'search_codebase',
      description: 'Searches the HDI codebase index (4,392 files) using TF-IDF + pgvector. Returns relevant code snippets and file paths.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search query about the codebase' },
          limit: { type: 'integer', description: 'Max results to return. Default 5.' },
        },
        required: ['query'],
      },
    },
  },
];
