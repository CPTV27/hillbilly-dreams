# Siri Shortcut — Talk to Delta Dawn

*April 5, 2026. Voice-powered Delta Dawn via Siri.*

---

## What It Does

Say "Hey Siri, Delta Dawn" → speak your question → hear the answer. Delta Dawn has full read access to the database: constellation graph, touring venues, directory businesses, articles, shows, reviews.

## Setup (5 minutes)

### 1. Create the Shortcut

Open **Shortcuts** app on your iPhone → tap **+** → name it "Delta Dawn"

### 2. Add Actions (in this order)

**Action 1:** Dictate Text
- Set to "Stop Listening: After Pause"

**Action 2:** Get Contents of URL
- URL: `https://deepsouthdirectory.com/api/voice/stream`
- Method: **POST**
- Headers:
  - `Authorization`: `Bearer 49f479a1eeef43e175b05e979b9ff6b2538a860a7f7edeccddd0b6a3567cb674`
  - `Content-Type`: `application/json`
- Request Body: JSON
  - `prompt`: *Dictated Text* (tap the variable from step 1)

**Action 3:** Get Dictionary Value
- Key: `text`
- From: *Contents of URL* (variable from step 2)

**Action 4:** Speak Text
- Input: *Dictionary Value* (from step 3)
- Voice: Samantha (or your preferred Siri voice)
- Rate: default

### 3. Test It

Tap the play button in Shortcuts. Say "What venues are in Natchez?" You should hear Delta Dawn respond with real venue data.

### 4. Optional: Add to Home Screen

In the shortcut settings → "Add to Home Screen" → use a gold circle icon.

### 5. Optional: Siri Trigger

The shortcut is automatically callable via "Hey Siri, Delta Dawn" once named.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Voice processing failed" | Check SIRI_API_KEY matches in Vercel |
| No response | Check internet connection, try text-only first |
| "Something went wrong" | Gemini API key may be missing in Vercel (GEMINI_API_KEY) |
| Slow response | Normal — Gemini + tool calls take 3-8 seconds |

## Security

- The API key gives read-only access to the database via Delta Dawn's whitelisted tools
- No writes are possible through this endpoint
- Every query is logged as an AgentAction for Chief of Staff review
- Key can be rotated: generate new key → update Vercel env → update Shortcut header

## Save to Bitwarden

When you unlock Bitwarden, save this:
- **Name:** SIRI_API_KEY (Delta Dawn Voice)
- **Value:** `49f479a1eeef43e175b05e979b9ff6b2538a860a7f7edeccddd0b6a3567cb674`
- **Notes:** Used in Siri Shortcuts and voice-only callers. Read-only DB access via /api/voice/stream.
