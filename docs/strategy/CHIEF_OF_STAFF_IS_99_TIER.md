# Product Decision: The Chief of Staff is the $99 Marketing Tier

**Date:** 2026-04-10
**Decided by:** Chase, mid-presentation, while designing The Foreman
**Status:** Locked — this is the pricing moat

---

## The Decision

The Chief of Staff feature — the AI orchestrator that routes handoffs between spawned agents, auto-spawns follow-up tasks from handoff documents, and keeps The Foreman's node statuses updated without human triage — **is the paywall at the $99 Marketing tier** on the DSD / MBT pricing ladder.

## Why This Is The Moat

Every competitor can build:
- A kanban board ✗ flat
- A dashboard ✗ flat
- A chatbot ✗ one agent, no orchestration
- A dropdown menu of agents ✗ user does the routing

Nobody else is building:
- A zoomable canvas (The Foreman)
- Tap-to-spawn short-term specialist agents that die on handoff
- A Chief of Staff that **reads every handoff** and decides what to spawn next
- Automatic follow-up chains triggered by handoff recommendations

The Chief of Staff loop is what turns a collection of agents into a company. That's the product.

## Tier Experience — The Team Size Axis

Chase: *"The tiering should be based on how big the team is."*

The tier gate is **concurrent agents + team seats + whether the Chief of Staff is watching.** Every tier has to feel like a real upgrade from the one below — a cliff, not a gentle ramp.

| Tier | Price | Team Size | Concurrent Agents | Chief of Staff | What It Feels Like |
|---|---|---|---|---|---|
| **Free** | $0 | 1 person | 1 at a time | No | Taste the product. See the Foreman. Spawn one short-term specialist per day on a demo node. Enough to understand the pattern. |
| **Essentials** | **$25 or $30?** — see below | 1 person | 3 concurrent | No | The full single-operator experience. Tap any node you own. Spawn as many agents as you need through the day. Name pool, handoff docs, the drawer. **You manage the queue.** |
| **Marketing** | $99 | Up to 5 seats | Unlimited concurrent | **YES — this is the moat** | Same product, but the Chief of Staff reads every handoff, auto-spawns follow-ups, and only surfaces what needs you. You stop managing. You become the creative director. Shared drawer across the team. |
| **Engine** | $250 | Unlimited seats | Unlimited concurrent + priority queue | Multiple CoS (per brand/division) | Cross-department orchestration. Custom brand specialists. Writeback integrations. Human success manager who tunes your Chief of Staff. For operators running more than one brand or location. |

### The four cliffs (each upgrade is a real jump)

**Free → Essentials:**
One agent at a time → three concurrent + the drawer + unlimited taps on your own nodes. Suddenly you can actually get work done in parallel.

**Essentials → Marketing:**
You manage the queue → the Chief of Staff manages the queue. Team seats open up. *This is where a serious business person has the "holy shit" moment* — they stop reading handoffs and start getting the summary.

**Marketing → Engine:**
One Chief of Staff → multiple Chiefs of Staff per brand/division. Writeback to your real tools (CRM, accounting, CMS). Human success manager tunes it for your voice. For operators who run more than one thing.

### Pitch lines per tier

- **Free:** "See what your business could look like if you had a Foreman."
- **$25–30:** "Tap the thing you want done. Walk away. It gets done."
- **$99:** "You don't manage anymore. The Chief of Staff does. You only see what matters."
- **$250:** "Run every brand from one canvas. Every Chief of Staff reports to you."

## PRICING QUESTION FOR CHASE

CLAUDE.md says Essentials is **$25/mo**, locked April 5, 2026. Chase just said **$30** on April 10. Two options:

- **Keep $25** — honor the lock, $25 is a psychologically cleaner "get in the door" number
- **Move to $30** — $30 reads as "serious small business tool," leaves more room for a free tier to be genuinely great

Recommend moving to **$30** if the free tier is getting upgraded to be genuinely awesome. A great free tier with a $25 upgrade feels close; a great free tier with a $30 upgrade feels like a real commitment. But this is Chase's call — the pricing was locked 5 days ago and changing it has implications for existing pilot conversations with Regina, Vicki, and anyone else who heard $25.

**Default:** keep $25 in code and on live pages until Chase explicitly says to flip it. Do not silently change the pricing.

## What This Means For Current Pages

- `/mbt/civic` and `/mbt/real-estate` pricing pages already exist with the $99 Marketing tier. They currently describe it as "monthly video, magazine feature, photography, radio mention" — which are the **fulfillment outputs**, not the **platform feature** that makes them autopilot.
- The Chief of Staff reframe is the **why** beneath those fulfillment outputs. Not "we do the video" — "the Chief of Staff makes sure the video gets made without you thinking about it."
- Copy pass on the $99 tier description is a **P1 task** for Tracy's tap-to-agent pattern once The Foreman is live. Until then, the current pricing copy is acceptable because the outputs are still accurate — just the framing is incomplete.

## Honest Claims Gate

Right now:
- The Foreman does not exist
- The Chief of Staff loop does not exist
- Tap-to-agent spawning does not exist
- Automatic follow-up chains do not exist

**Do not sell the $99 tier as "Chief of Staff" yet.** The feature has to ship before the copy claims it. Honest claims rule overrides marketing enthusiasm every time.

Current $99 tier still sells on video + magazine + photography + radio (which are real). The Chief of Staff becomes the headline when the loop is live.

## What Ships First

Pilot implementation path:
1. **The Foreman as a native canvas** in the repo (React + pan/zoom, no Miro yet) — spike
2. **A single tap-to-agent spawn** wired through the Claude Agent SDK — one node, one agent type
3. **Handoff document writer** — agent writes the file, human reads it
4. **Chief of Staff stub** — reads handoffs, suggests next-spawns (manual approval)
5. **Chief of Staff automation** — auto-spawns approved categories
6. **Port to Miro** — if Chase still wants Miro, or keep as native canvas

Gate: do not advertise Chief of Staff as a feature until steps 3 and 4 are working end-to-end on at least one real task.

## Changelog

- **2026-04-10** — Decision made by Chase during presentation to Tracy and Carrie. Product lead: Chase. Captured by Claude (vigilant-dubinsky worktree).
