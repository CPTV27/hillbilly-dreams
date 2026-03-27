# Google Chat Bot Setup — HDI Agent Desk

## What This Does
Turns the one-way webhooks into a real bidirectional bot. When you message the bot in Google Chat, it:
1. Receives your message at `/api/gchat/bot`
2. Routes it to the right agent (Huck, Delta Dawn, Ledger, Chuck, or Rook) based on keywords
3. Stores it in Cloudflare D1 (message queue)
4. Agents poll `/api/gchat/pending?agent=huck` to pick up messages
5. Agents reply via `/api/gchat/reply` and the response appears in your thread

## Prerequisites
- GCP project: `bigmuddy-ff651`
- The app deployed to a public URL (needed for the webhook endpoint)
- Admin access to Google Workspace (hillbillydreamsinc.com)

## Step 1: Enable the Google Chat API

1. Go to: https://console.cloud.google.com/apis/library/chat.googleapis.com?project=bigmuddy-ff651
2. Click **Enable**

## Step 2: Configure the Chat Bot

1. Go to: https://console.cloud.google.com/apis/api/chat.googleapis.com/hangouts-chat?project=bigmuddy-ff651
2. Click **Configuration** tab
3. Fill in:
   - **Bot name:** HDI Agent Desk
   - **Avatar URL:** (leave blank or use a hosted image)
   - **Description:** Hillbilly Dreams agent communication hub
   - **Functionality:** Check both "Receive 1:1 messages" and "Join spaces and group conversations"
   - **Connection settings:** Select **HTTP endpoint URL**
   - **HTTP endpoint URL:** `https://YOUR_DEPLOYED_DOMAIN/api/gchat/bot`
   - **Authentication Audience:** Select "HTTP endpoint URL"
   - **Visibility:** Select "Make this Chat app available to specific people and groups in hillbillydreamsinc.com"
   - Add yourself (chase@hillbillydreamsinc.com)
4. Click **Save**

## Step 3: Add the Bot to the Agent Desk Space

1. Open the HDI Agent Desk space in Google Chat
2. Click the space name → **Apps & integrations** → **Add apps**
3. Search for "HDI Agent Desk" (the bot you just created)
4. Add it to the space

## Step 4: Set Environment Variables

Add to your production `.env`:

```
CLOUDFLARE_ACCOUNT_ID=your_cf_account_id
CLOUDFLARE_API_TOKEN=your_cf_api_token
```

These are needed for the D1 message queue. The webhook URLs are already in `.env.local`.

## Step 5: Test It

1. In the Agent Desk space, type: `@HDI Agent Desk Hey Huck, what's the deploy status?`
2. The bot should respond: "Routed to **Huck (Build)**. They'll respond here shortly."
3. Check D1 for the queued message: the agent can now pick it up

## How Agents Poll for Messages

Any agent (CC, AG, etc.) can check for pending messages:

```bash
curl https://YOUR_DOMAIN/api/gchat/pending?agent=huck
```

Returns:
```json
{
  "agent": "huck",
  "count": 1,
  "messages": [{
    "id": 1,
    "sender_name": "Chase Pierson",
    "message": "what's the deploy status?",
    "created_at": "2026-03-26T19:30:00"
  }]
}
```

## How Agents Reply

```bash
curl -X POST https://YOUR_DOMAIN/api/gchat/reply \
  -H 'Content-Type: application/json' \
  -d '{"messageId": 1, "agent": "huck", "text": "All clear. Last deploy was 20 min ago, zero errors."}'
```

This posts a card back into the Google Chat thread so Chase sees the response on his phone.

## Agent Routing Keywords

Messages are routed by keyword detection:

| Agent | Keywords |
|---|---|
| Huck | huck, build, code, deploy, fix, bug, api, route |
| Delta Dawn | delta, dawn, inn, magazine, radio, records, big muddy, event, booking |
| Ledger | ledger, data, metric, number, database, census, directory |
| Chuck | chuck, tour, route, venue, bus, prevost, schedule, logistics |
| Rook | rook, strategy, valuation, investor, holding, hdi |

Default: routes to Huck if no keywords match.

## Current Limitation

Until the bot is registered in GCP (Step 2), the system works in **webhook mode only**:
- Agents → Chase: Works (via webhooks, already live)
- Chase → Agents: Requires the bot registration above

Once the bot is registered and deployed, the full bidirectional loop closes.
