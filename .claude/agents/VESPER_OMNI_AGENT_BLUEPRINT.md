---
name: Vesper Omni-Agent Blueprint — Future Architecture
description: The MBT Ambient Intelligence Layer. Google/Apple as Trust, MBT as Intelligence, ElevenLabs as Voice, Gemini/Veo as Face. Saved as north star for platform evolution. NOT current sprint work.
type: vision
status: backlog
---

# MBT Omni-Agent Architecture (Vesper Blueprint, 2026-03-31)

## The Concept
An Ambient Intelligence Layer (AIL) that sits on top of Google and Apple ecosystems.
Google/Apple = Trust Layer (auth, security). MBT = Intelligence Layer (processing, data).
Solves Privacy vs. Utility by processing in-memory, never storing outside client's own workspace.

## Components
| Component | Provider | Role |
|---|---|---|
| Identity & Trust | Google / Apple ID | OAuth, security, client-level permissions |
| The Intelligence | MBT Agent | Processing logic, data retrieval (Mail, SMS, Docs) |
| The Voice | ElevenLabs | High-fidelity, emotional, low-latency audio |
| The Face | Gemini / Veo / Live | Video avatars, real-time visual interaction |

## Interface: Zero-UI
- Mobile: Gold hexagon widget in Dynamic Island / Google Overlay
- Workspace: Glass Engine sidebar in Google Docs/Sheets
- Voice: "Hey Siri, ask Big Muddy about my bookings" → MBT Agent handles, Apple ID secures

## Tiered Visual Feedback
- Tier 1 (Text): Minimal monospace data feeds
- Tier 2 (Voice): Real-time waveform in Big Muddy Gold
- Tier 3 (Video): Full-bleed cinematic — agent sits "inside" Chase's photography

## Integration Requirements (Future)
1. OAuth 2.0 for Google Workspace (Gmail/Drive/Calendar)
2. Data Vault schema — process in-memory, never store outside client workspace
3. Agent Registry — ElevenLabs API keys swappable per client personality
4. UI: Pure inline CSS, Glass Engine aesthetic for all status/technical displays

## Status
This is VISION, not current sprint. Saved for when the platform has paying customers
and the infrastructure justifies the investment. Build order:
1. First: DSD customers paying $20-99/mo ← WE ARE HERE
2. Then: Prove the ecosystem works (Magazine + Radio + Shows)
3. Then: Clone for second client (Bearsville or Scan2Plan)
4. Then: Build the Omni-Agent layer on top of proven infrastructure
