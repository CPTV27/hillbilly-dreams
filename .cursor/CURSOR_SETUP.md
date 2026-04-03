# Cursor setup — Hillbilly Dreams monorepo

If you’re used to **Claude Code** (terminal `claude`, project memory, slash commands), here’s the Cursor equivalent.

## 1. Open the right folder

- **File → Open Folder** → select the repo root: `hillbilly-dreams` (where `package.json` and `pnpm-workspace.yaml` live).
- One window = one **workspace**. The AI sees files under that root.

## 2. Rules the AI follows (like Claude’s CLAUDE.md + project rules)

| What | Where |
|------|--------|
| **Project rules (always applied)** | [`.cursorrules`](../.cursorrules) at repo root — read this; it’s the HDX/BMT contract (sovereignty, stack, who owns what). |
| **Business / handoff** | [`CLAUDE.md`](../CLAUDE.md), [`docs/BUSINESS_ARCHITECTURE.md`](../docs/BUSINESS_ARCHITECTURE.md), [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) |
| **Roo Code (optional)** | [`.roo/rules/`](../.roo/rules/) — if you use the Roo extension |
| **Agent status / queue** | [`.workflow/STATUS.md`](../.workflow/STATUS.md), [`.workflow/OVERNIGHT_TASKS.md`](../.workflow/OVERNIGHT_TASKS.md) |

Cursor loads **`.cursorrules`** automatically for Agent/Chat in this repo.

## 3. Modes (rough map from Claude Code)

| Goal | In Cursor |
|------|-----------|
| Ask a question, small edit | **Chat** (Cmd+L / Ctrl+L) |
| Multi-file change, implement a feature | **Composer** or **Agent** (Cmd+I / Ctrl+I varies by keybinding) |
| Terminal commands | **Terminal** panel; the agent can run commands when you approve |

**Composer vs Agent:** Composer is great for scoped refactors; Agent can run tools and iterate longer. Use what your Cursor version labels in the sidebar.

## 4. Todos in Cursor

- Open the **Todo** (or task) panel if your build shows it, or ask the agent: *“Show me the todo list and mark X in progress.”*
- Todos here are **team-facing**; **`AGENT_LEDGER.md`** / **`DISPATCH.md`** stay **CC-owned** per [`.cursorrules`](../.cursorrules) unless Chase says otherwise.

## 5. Git & branches

- **Source Control** sidebar: branch, commit, push.
- Repo rule: **don’t push straight to `main`** — use a feature branch + PR (Chase merges to production).

## 6. MCP (optional)

- **Cursor Settings → MCP** to add servers (GitHub, Cloudflare, etc.).  
- Project-level MCP for **Roo**: [`.roo/mcp.json`](../.roo/mcp.json) (create via Roo UI; don’t commit secrets).

## 7. Quality gate before you trust a change

From repo root:

```bash
pnpm type-check && pnpm lint && pnpm build
pnpm test:smoke
```

## 8. Extensions you might add

- **Roo Code** — optional second AI panel ([`RooVeterinaryInc.roo-cline`](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline)).
- **GitLens** — blame/history (optional).

---

**Bottom line:** Open repo root → trust **`.cursorrules` + `CLAUDE.md`** → use **Chat/Composer/Agent** for work → **branch + PR** → run **`pnpm type-check` / `lint` / `build` / `test:smoke`** before merge.
