---
title: Tool registry reference
sidebar_position: 1
description: Auto-generated from TOOL_REGISTRY (same contract as GET /api/admin/registry).
---

# Tool registry reference

> **Generated:** 2026-04-04T01:25:25.717Z  
> **Do not edit by hand.** Regenerate with `node scripts/sync-docs.mjs` from the repo root.

This page mirrors the admin metadata API: tool id, name, description, auth class, model tier, and input JSON Schema. Executable code and handlers are never exported to the client.

## Tools (8)

### `agent.action`

- **Name:** Agent Action Log
- **Description:** Append a row to the coordination / audit log.
- **Auth class:** `ADMIN`

<details>
<summary>Input JSON Schema</summary>

```json
{
  "type": "object",
  "properties": {
    "agent": {
      "type": "string",
      "minLength": 1
    },
    "action": {
      "type": "string",
      "minLength": 1
    },
    "summary": {
      "type": "string",
      "minLength": 1
    },
    "detail": {
      "type": "string"
    },
    "domain": {
      "type": "string",
      "minLength": 1
    },
    "impact": {
      "type": "string"
    }
  },
  "required": [
    "agent",
    "action",
    "summary",
    "domain"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

</details>

### `agent.context`

- **Name:** Agent Context Write
- **Description:** Upsert a knowledge fragment (domain + key) for agent memory.
- **Auth class:** `ADMIN`

<details>
<summary>Input JSON Schema</summary>

```json
{
  "type": "object",
  "properties": {
    "domain": {
      "type": "string",
      "minLength": 1
    },
    "topic": {
      "type": "string",
      "minLength": 1
    },
    "key": {
      "type": "string",
      "minLength": 1
    },
    "content": {
      "type": "string",
      "minLength": 1
    },
    "source": {
      "type": "string"
    },
    "agentAuthor": {
      "type": "string"
    },
    "validUntil": {
      "type": "string"
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    }
  },
  "required": [
    "domain",
    "topic",
    "key",
    "content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

</details>

### `rook.harvest`

- **Name:** Directory Harvest
- **Description:** Research and ingest regional businesses for the Deep South Directory (LLM + Prisma).
- **Auth class:** `ADMIN`
- **Model tier:** `CARPENTER`

<details>
<summary>Input JSON Schema</summary>

```json
{
  "type": "object",
  "properties": {
    "city": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "category": {
      "type": "string",
      "maxLength": 500
    },
    "radius": {
      "type": "number",
      "exclusiveMinimum": 0,
      "maximum": 500
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 50
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

</details>

### `rook.orchestrate`

- **Name:** Agent Orchestrator
- **Description:** Natural-language dispatcher: routes to registry tools or marketing APIs (ARCHITECT tier routing).
- **Auth class:** `ADMIN`
- **Model tier:** `ARCHITECT`

<details>
<summary>Input JSON Schema</summary>

```json
{
  "type": "object",
  "properties": {
    "task": {
      "type": "string",
      "minLength": 1,
      "maxLength": 10000
    },
    "agent": {
      "type": "string",
      "maxLength": 100
    },
    "context": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "required": [
    "task"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

</details>

### `system.action.get`

- **Name:** Get Agent Actions
- **Description:** Query recent agent actions (filters: agent, domain, since).
- **Auth class:** `ADMIN`

<details>
<summary>Input JSON Schema</summary>

```json
{
  "type": "object",
  "properties": {
    "agent": {
      "type": "string"
    },
    "domain": {
      "type": "string"
    },
    "since": {
      "type": "string"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

</details>

### `system.action.post`

- **Name:** Log Agent Action
- **Description:** Same as agent.action — explicit system tool id for universal router.
- **Auth class:** `ADMIN`

<details>
<summary>Input JSON Schema</summary>

```json
{
  "type": "object",
  "properties": {
    "agent": {
      "type": "string",
      "minLength": 1
    },
    "action": {
      "type": "string",
      "minLength": 1
    },
    "summary": {
      "type": "string",
      "minLength": 1
    },
    "detail": {
      "type": "string"
    },
    "domain": {
      "type": "string",
      "minLength": 1
    },
    "impact": {
      "type": "string"
    }
  },
  "required": [
    "agent",
    "action",
    "summary",
    "domain"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

</details>

### `system.context.get`

- **Name:** Get Agent Context
- **Description:** Query stored context fragments (filters: domain, topic, q, key, fresh).
- **Auth class:** `ADMIN`

<details>
<summary>Input JSON Schema</summary>

```json
{
  "type": "object",
  "properties": {
    "agent": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "domain": {
      "type": "string"
    },
    "q": {
      "type": "string"
    },
    "key": {
      "type": "string"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    },
    "fresh": {
      "type": "boolean"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

</details>

### `system.context.post`

- **Name:** Save Agent Context
- **Description:** Same contract as agent.context write — explicit system tool id for universal router.
- **Auth class:** `ADMIN`

<details>
<summary>Input JSON Schema</summary>

```json
{
  "type": "object",
  "properties": {
    "domain": {
      "type": "string",
      "minLength": 1
    },
    "topic": {
      "type": "string",
      "minLength": 1
    },
    "key": {
      "type": "string",
      "minLength": 1
    },
    "content": {
      "type": "string",
      "minLength": 1
    },
    "source": {
      "type": "string"
    },
    "agentAuthor": {
      "type": "string"
    },
    "validUntil": {
      "type": "string"
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    }
  },
  "required": [
    "domain",
    "topic",
    "key",
    "content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

</details>

