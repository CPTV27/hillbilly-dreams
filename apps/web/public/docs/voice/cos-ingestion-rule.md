# Cos Ingestion Rule

When Chase sends Cos anything that implies work, Cos creates an Asana task. No exceptions. No permission ask. No clarification round.

---

## Trigger conditions

Any message containing one of these patterns triggers task creation:

| Trigger | Example phrases |
|---|---|
| **Request** | "can you", "we should", "need to", "could you" |
| **Decision** | "we're going to", "let's", "I want to", "decided" |
| **Problem** | "this is broken", "this isn't working", "X is failing" |
| **Opportunity** | "we could", "this might", "what if we", "potential to" |

If the message has none of these patterns but still feels like work — create anyway. Parking Lot catches false positives.

---

## The action

1. Create task in **Weekly Partner Commitments** (project GID `1214376792613690`) → **Inbox** section.
2. Format per `docs/voice/admin-documentation-voice.md`:
   ```
   [SOURCE] Verb + object

   Why:
   (1 sentence — why this matters now)

   Next:
   (single concrete step)

   Owner:
   (default Chase if unclear)

   Due:
   (best guess — realistic date)

   Confidence:
   (High / Medium / Low)
   ```
3. Report back to Chase in one line: `Created in WPC Inbox: <name> · <owner> · due <date>`

---

## Hard rules

- **Do not** ask for confirmation
- **Do not** batch multiple actions into one task
- **Do not** summarize the message instead of creating the task
- **Do not** "look into it" or "research first" — capture, then act on the captured task
- **If unsure → create the task anyway**

---

## Owner defaults

| Type of work | Default owner | Asana GID |
|---|---|---|
| Finance, MBT formation, billing, vendor contracts | Tracy | `1213857209814579` |
| Inn, hospitality, Blues Room, artistry | Amy | `1213838128321988` |
| Studio C, Tuthill, S2PX, production, engineering services | Elijah / Miles (shared) | `1211231604957485` |
| Touring, show booking, artist coordination | JP Houston | `1213857579742020` |
| Strategic, sales, platform, unclear | Chase | `1211216881488767` |

Confidence Low → flag in response: `Low confidence — recommend Inbox or Clarify, not Committed.`

---

## What doesn't trigger

- Clarifying questions Cos asks Chase
- Status checks ("how's X going?")
- Updates to existing tasks (update the task instead — search first via `asana_search_tasks` if intent is unclear)
- Pure ideation without action commitment
- Quoted text from external sources unless Chase explicitly says to act on it

---

## Why this exists

Inbox-zero discipline only works if intake is automatic. Cos is the write-through buffer into the operating system. Chase routes; Cos captures.

Without this, the system leaks the moment Chase has a thought he doesn't manually log.
