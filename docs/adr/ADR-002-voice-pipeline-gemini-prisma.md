# ADR-002: Voice Pipeline — Gemini + Whitelisted Prisma Tools

**Status:** Accepted
**Date:** 2026-04-05
**Decision maker:** Chase Pierson

---

## Context

Delta Dawn needs voice input/output to serve as an always-on Chief of Staff relay. Three approaches considered: Dialogflow CX (managed), Google ADK (SDK), or raw Gemini with browser/Whisper STT.

## Decision

Use the existing Gemini 2.5 Flash pipeline with whitelisted Prisma read-only tools. No Dialogflow CX. No GenAI Toolbox. No arbitrary SQL.

## Architecture

```
Audio in → Whisper STT (or JSON text) → POST /api/voice/stream
  → Gemini 2.5 Flash + function calling (up to 8 tool rounds)
  → Whitelisted Prisma tools (read-only)
  → Text response → TTS (browser SpeechSynthesis or Cloud TTS Journey)
  → AgentAction log for Chief of Staff relay
```

## Key Files

| File | Purpose |
|------|---------|
| `apps/web/app/api/voice/stream/route.ts` | Voice endpoint — Whisper STT or JSON text input |
| `apps/web/app/api/voice/tools.ts` | Whitelisted read-only Prisma tools |
| `apps/web/lib/voice/dawn-voice-system-prompt.ts` | Centralized system prompt — read-only, CoS relay, voice-friendly |
| `apps/web/lib/constellation/querySubgraph.ts` | Shared BFS logic for constellation API + voice tools |

## Tools Available

| Tool | Source Model |
|------|-------------|
| `get_constellation_stats` | ConstellationNode/Edge counts |
| `get_constellation_subgraph` | BFS from constellation (capped for voice) |
| `search_touring_venues` | TouringVenue |
| `list_corridor_cities` | CorridorCity |
| `list_tour_routes` | TourRoute |
| `search_directory_listings` | DirectoryBusiness |
| `search_directory` | CRM Client (existing) |
| `get_shows` | Shows (existing) |
| `get_articles` | Articles (existing) |
| `get_business_reviews` | Reviews (existing) |

## What Was Rejected

| Option | Why Not |
|--------|---------|
| Dialogflow CX | Adds managed service dependency. Existing endpoint serves as fulfillment — Dialogflow can call it later if needed. |
| GenAI Toolbox | Risks arbitrary SQL. Whitelisted Prisma tools are safer and auditable. |
| Direct SQL tools | OWASP risk. All queries go through Prisma with typed parameters. |
| Vertex Live audio-in/audio-out | Future upgrade path. Current Whisper + Cloud TTS works. |

## Chief of Staff Relay

After each voice interaction, an `AgentAction` record is inserted:
- `agent: 'delta-dawn-voice'`
- `action: 'chief-of-staff-relay'`
- `summary: truncated user text`
- `detail: truncated model reply`

This means the Chief of Staff (or any agent scanning AgentAction) can see what voice users asked without needing a separate product surface.

## Security

- `requireAdmin` gate on the endpoint today
- Follow-up: dedicated `SIRI_API_KEY` for voice-only callers without full admin session
- All tools are read-only — no writes through voice

## Future Upgrades

1. **Vertex Live API** — audio-in/audio-out, drops Whisper dependency
2. **Dedicated voice API key** — `SIRI_API_KEY` for Siri Shortcuts and other voice-only callers
3. **Dialogflow CX wrapper** — if structured dialogue flows (menus, confirmations) prove necessary
