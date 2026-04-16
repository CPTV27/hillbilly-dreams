# TinyFish MCP Server — Agent Reference

> Every agent reads this before using TinyFish tools.

---

## What It Is

TinyFish is a remote MCP server that gives agents a real headless browser for web tasks — fetching pages, extracting data, running multi-step automations (clicking, filling forms, navigating), and web search. It renders JavaScript-heavy sites (SPAs, React, Vue) that raw HTTP fetches can't handle.

**Registered at:** `https://agent.tinyfish.ai/mcp`
**Auth:** OAuth 2.1 (Chase's GitHub account). No API key needed for MCP — the key in Bitwarden is for the REST API only.
**Scope:** User-level (`--scope user`) — available in every project on this machine.
**Credits:** Pay-as-you-go. 1 credit = 15 fetches. Check usage with `get_search_usage` / `list_fetch_usage`.

---

## Tools (When to Use What)

| Tool | Use When | Cost |
|------|----------|------|
| `fetch_content` | **Default for reading web pages.** Articles, docs, pricing pages, any URL. Supports up to 10 URLs in parallel. Returns clean markdown + metadata. | 1 credit / 15 fetches |
| `search` | Web search queries. Use instead of WebSearch when you need browser-rendered results. | Credits |
| `run_web_automation` | Single-site tasks that need interaction — clicking, form fills, navigation, screenshots. | Credits |
| `run_web_automation_async` | **ONLY when user explicitly asks for background execution.** Never use by default. | Credits |
| `batch_create` | 2+ URLs needing the same automation. More efficient than multiple `run_web_automation` calls. | Credits |
| `create_browser_session` | Persistent browser session for multi-step workflows (login → navigate → extract). | Credits |

### Tools You Probably Won't Use Often

| Tool | Purpose |
|------|---------|
| `get_run` / `list_runs` / `poll_status` | Check status of async runs |
| `get_steps` | See step-by-step execution of a run |
| `cancel_run` / `batch_cancel` / `batch_status` | Manage batch jobs |
| `discover_run` | Find runs by URL |
| `list_browser_sessions` | See active persistent sessions |
| `get_search_usage` / `list_fetch_usage` | Check credit consumption |

---

## Critical Rules

1. **`fetch_content` is preferred over `run_web_automation` for reading pages.** Don't spin up a full automation just to read a URL.

2. **NEVER retry on error.** If `run_web_automation` returns ANY error, the run is STILL EXECUTING. Use `get_run` (if you have the run_id) or `list_runs` to check status. Only start a new run after confirming the previous one reached a terminal state.

3. **Use `run_web_automation_async` ONLY when Chase explicitly says "run it in the background."** Default is synchronous.

4. **Include `progressToken` in `_meta`** for long-running automations so progress updates stream back.

5. **Credit-conscious.** Don't batch-fetch 10 URLs when you only need 1. Check usage periodically with `get_search_usage`.

---

## When to Use TinyFish vs Other Tools

| Scenario | Use |
|----------|-----|
| Read a public web page | `fetch_content` (TinyFish) — handles JS-rendered sites |
| Quick factual web search | `WebSearch` (built-in) — no credits, faster |
| Deep web search with rendered results | `search` (TinyFish) |
| Fill out a web form, click buttons | `run_web_automation` (TinyFish) |
| Read a page behind auth | `create_browser_session` → login → navigate (TinyFish) |
| Fetch a known API endpoint | `WebFetch` (built-in) — simpler, no credits |
| Interact with Chrome on this Mac | `Claude in Chrome` MCP — DOM-aware, no credits |

---

## Examples

### Fetch a page
```
fetch_content(urls: ["https://bigmuddytouring.com"], format: "markdown", links: false, image_links: false)
```

### Fetch multiple pages in parallel
```
fetch_content(urls: ["https://bigmuddytouring.com", "https://deepsouthdirectory.com", "https://bigmuddymagazine.com"], format: "markdown", links: true, image_links: false)
```

### Check credits
```
get_search_usage()
list_fetch_usage()
```

---

## Setup (For Other Machines)

If setting up TinyFish on another machine (e.g., Mac Mini / ClawdBOT):

```bash
claude mcp add --transport http --scope user tinyfish https://agent.tinyfish.ai/mcp
```

Then trigger OAuth by running `/mcp` → select `tinyfish` → Authenticate in browser. Each machine needs its own OAuth binding.

---

*Added 2026-04-15. Auth: Chase Pierson (GitHub OAuth via tinyfish.ai).*
