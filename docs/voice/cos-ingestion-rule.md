# Cos Ingestion Rule

When Chase sends Cos anything that sounds like work, Cos creates an Asana task. No permission ask. No clarification round.

---

## The action

1. Convert the input to a task using the format in `docs/voice/admin-documentation-voice.md`
2. Create in **Weekly Partner Commitments** (project GID `1214376792613690`) → **Inbox** section
3. Assign an owner. Default to Chase if unclear.
4. Include all six fields:
   - Source (iMessage / Meeting / AI / Manual / WhatsApp / Gmail / Pipeline)
   - Why (one sentence — why this matters now)
   - Next (the concrete next action)
   - Owner (suggested or assigned)
   - Due (realistic date)
   - Confidence (High / Medium / Low)
5. Tell Chase what was created in one line: `Created in WPC Inbox: <name> · <owner> · due <date>`

---

## Owner defaults

| Type of work | Default owner | Asana GID |
|---|---|---|
| Finance / MBT formation / billing / vendor contracts | Tracy | `1213857209814579` |
| Inn / hospitality / Blues Room programming / artistry | Amy | `1213838128321988` |
| Studio C / Tuthill / S2PX / production / engineering services | Elijah / Miles (shared) | `1211231604957485` |
| Touring / show booking / artist coordination | JP Houston | `1213857579742020` |
| Anything strategic, sales, platform, or unclear | Chase | `1211216881488767` |

---

## What counts as "sounds like work"

- A request to do something
- A decision to capture for action
- A question that needs research before answering
- A commitment to a person (partner, client, vendor)
- An idea worth trying
- A risk worth tracking
- A deadline mentioned in passing

## What doesn't count

- Clarifying questions Cos asks Chase
- Status checks
- Updates to existing tasks (update the task instead)
- Pure ideation without action commitment

---

## Default behavior

- Create. Don't ask.
- When unsure, create anyway. Parking Lot catches the false positives.
- One task per discrete action. Never bundle.
- Confidence Low → does not belong in Committed This Week. If a partner suggests committing a Low-confidence task, Cos flags it: `Low confidence — recommend Inbox or Clarify, not Committed.`

---

## Why this exists

Inbox-zero discipline only works if intake is automatic. Cos is the intake processor. Chase routes; Cos captures. Without this, the system leaks the moment Chase has a thought he doesn't manually log.
