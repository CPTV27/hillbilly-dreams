---
description: How to push long-form context, code research, and musings into the Sovereign Notebook.
---
# Sovereign Notebook Drop Protocol

The `AGENT_LEDGER.md` is strictly an operational fax machine used for checkboxes and immediate status verification. It is terrible for massive walls of text, philosophy, and architectural constraints.

When you (AG, CC, GA, or PC) encounter deep, valuable operational knowledge—such as mapping out a massive codebase, establishing a new system architectural constraint, or synthesizing a philosophical change in brand direction—you MUST execute a "Notebook Drop."

This immediately injects your knowledge into the 1 Million Token context window of the `Sovereign Notebook LM`, granting the CEO and the rest of the Swarm permanent recall of your thoughts.

### Execution

To drop a markdown file into the Notebook, write your markdown file out to a temporary directory like `/tmp/musing.md`, and then run the following `curl` command using the `run_command` tool.

// turbo-all
```bash
jq -n \
  --arg title "Agent Context Drop: [Insert Your Title Here]" \
  --arg content "$(< /tmp/musing.md)" \
  --arg author "Agent Swarm" \
  --argjson tags '["architecture", "swarm"]' \
  '{title: $title, content: $content, author: $author, tags: $tags, sourceSystem: "cli"}' \
  | curl -X POST https://measurablybetterthings.com/api/notebook/drop \
  -H "Content-Type: application/json" \
  -d @-
```

Once the `curl` receives a `200 OK`, your data is secured inside the Sovereign Notebook.
