# Handoff: ElevenLabs Integration — Mac Mini (ClawdBOT)

**From:** Chase's session (2026-03-30)
**To:** Mac mini agent (ClawdBOT@192.168.4.37)

---

## API Key

- **Stored in Bitwarden:** "ElevenLabs API Key — Hillbilly Dreams INC"
- **Env var name:** `ELEVENLABS_API_KEY`
- **Account:** admin@hillbillydreamsinc.com (ElevenCreative workspace)
- **Key name in dashboard:** "Hillbilly Dreams, INC." (created 2026-03-30)
- **Access level:** Full API — all features enabled

Retrieve from Bitwarden:
```bash
bw unlock  # then export BW_SESSION
bw get password "ElevenLabs API Key — Hillbilly Dreams INC"
```

---

## What's Available

ElevenLabs API capabilities enabled on this key:

| Feature | Use Case for Mac Mini |
|---|---|
| **Text to Speech** | Radio show intros, DJ drops, automated announcements, promo voiceovers |
| **Voice Cloning** | Clone Chase's voice for narration across all 18 radio shows |
| **Sound Effects** | Bumpers, transitions, ambient beds for radio automation |
| **Music** | Intro/outro music generation for shows |
| **Speech to Text** | Transcribe live recordings from the venue |
| **Voice Isolator** | Clean up live audio recordings (separate voice from room noise) |
| **Voice Changer** | Character voices for radio shows |

### What NOT to use ElevenLabs for:
- **Image & Video** — it's Veo 3.1 under the hood, same as our direct Vertex AI access. Use Vertex AI directly (no middleman markup).

---

## Integration Points on Mac Mini

| Service | Port | How ElevenLabs fits |
|---|---|---|
| **OpenBroadcaster** | 8080 | TTS-generated DJ drops and show intros fed into broadcast queue |
| **Icecast** | 8010 | Stream output — ElevenLabs voices go through OB → Icecast |
| **Plex** | 32400 | Generated audio content stored and served via Plex library |

---

## Existing TTS (Google Cloud)

The web app already has Google Cloud TTS at `apps/web/app/api/media/audio/route.ts` with 7 voice presets:
- `chase`, `delta-dawn`, `catfish-carl`, `deacon-slim`, `miss-pearline`, `neutral-male`, `neutral-female`

ElevenLabs is a **second provider**, not a replacement. Google is cheaper and fine for routine TTS. ElevenLabs is better for:
- Voice cloning (Google can't do this)
- Emotional/dramatic narration
- Character voice consistency across scripts

**Goal:** Test both providers on the same script, compare quality, then decide what stays.

---

## ElevenLabs API Quick Reference

**Base URL:** `https://api.elevenlabs.io/v1`
**Auth:** `xi-api-key: {ELEVENLABS_API_KEY}` header

### Text to Speech
```
POST /v1/text-to-speech/{voice_id}
Headers: xi-api-key, Content-Type: application/json
Body: { "text": "...", "model_id": "eleven_multilingual_v2" }
Returns: audio/mpeg stream
```

### List Voices
```
GET /v1/voices
Headers: xi-api-key
```

### Voice Cloning (Instant)
```
POST /v1/voices/add
Headers: xi-api-key
Body: FormData with name, files (audio samples), description
```

### Sound Effects
```
POST /v1/sound-generation
Body: { "text": "description of sound", "duration_seconds": 5 }
```

**Docs:** https://elevenlabs.io/docs/api-reference

---

## Data Policy

ElevenLabs is fine for:
- Voice generation (scripts, narration, radio content)
- Sound effects, music, audio processing

Do NOT send to ElevenLabs:
- Business financials, customer data, architecture docs
- (Same isolation policy as OpenAI — see `memory/feedback_openai_data_policy.md`)
- Though ElevenLabs is lower risk since it only processes audio, not text reasoning

---

## Also Happening (Context)

- **Production pipeline built** on the web app — 27 promo video scripts ready for voiceover generation (see `HANDOFF_HUCK_BEAUTIFUL_BLACKWELL.md`)
- **Chase has ElevenLabs credits to burn** — test now, decide later whether to keep the subscription
- **Monday 3/31:** Google account consolidation + user onboarding testing
- **OpenAI key coming too** — but with strict data isolation (generic tasks only)
