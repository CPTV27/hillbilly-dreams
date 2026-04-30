# MBT/Studio C Product Feature Backlog — Captured 2026-04-30 evening

*Captured live during Chase's "Holy shit, I think we just struck gold" sprint. Each entry tagged with the verbatim Chase quote that locks it. Cos owns the queue; Patch builds.*

---

## 1. Lyra Walkthrough — video → 3D mesh + spatial audio (P0, ship for tomorrow's EMPAC meeting)

**Chase 2026-04-30 evening:**
> "And we should see if we can use the video. If the video works well, we should just have customers do a video walkthrough, and we'll turn it into a model. And if that works, let's wire it into the S2PX. Put Lyra's name on it, and we'll demo it tomorrow."

**The product:**
- Customer shoots a 1-3 minute phone-camera walkthrough of their space
- Uploads to S2PX (under Lyra branding for the acoustic vertical)
- Cloud pipeline extracts video frames (every 0.5s), uploads to Polycam Web API → mesh
- Video's APAC 4-channel spatial audio extracted in parallel → Lyra LMIR fingerprint
- Customer portal shows: "Your scan is processing. ETA 2-4 hours" → email when done

**Why it matters:** Eliminates the LiDAR phone requirement. Any iPhone Pro user can capture acoustic + geometry in one pass. 10x larger TAM.

**Tonight's test:** RedTheater.MOV (181 MB, 1m56s, contains 4-channel APAC) running through Polycam Web + Luma AI. A/B against the LiDAR mesh from same room.

**Tomorrow's ship target:** UI stub on S2PX + worked example to demo. Full API integration follows in week 1 of the Lyra build.

**Naming candidates:** Lyra Walkthrough, Lyra Capture, Lyra Phone, Lyra Snap.

---

## 2. White-label customer portal scraper (P1)

**Chase 2026-04-30 evening:**
> "We should have a tool that automatically thematically scrapes the customer's website and makes a custom portal pic using their logo and colors."

**The product:**
- Customer signs up. We point a scraper at their website domain.
- Scraper extracts: logo (favicon + og:image), brand colors (CSS analysis), hero photo, typography stack, voice/tone samples (top-of-page copy)
- Auto-generates a tenant-branded MBT/Lyra/S2PX portal in their colors
- Customer logs in to a portal that already feels like their brand
- Their employees experience continuity — same colors, same logo, no jarring "MBT-branded SaaS" feeling

**Tech:** Headless Chromium (Playwright) for visual scraping, color-thief for palette extraction, AI for tone/voice sampling, dynamic CSS variable injection.

**Why it matters:** Removes one of the biggest friction points in B2B SaaS — customers feeling like they signed up for "yet another tool." Their tools, their colors, their logo.

---

## 3. Instant visual response in chat (P1)

**Chase 2026-04-30 evening:**
> "Is there a way we can have it so they can describe things, and the visual response can be almost instantaneous?"

**The product:**
- Customer types in chat: "Show me this kitchen with white cabinets instead"
- Within ~3 seconds, an Imagen 3 (or successor) render appears in the chat
- Multiple variants generated simultaneously, customer picks
- All renders saved to the customer's project gallery

**Tech:** Vertex AI Imagen 3 (3-5s latency), or Imagen 4 for fastest path. Streamed via the existing chat MVP.

**Why it matters:** Visual feedback at conversational speed. The customer doesn't have to imagine — they see it.

---

## 4. Sync everything to cloud at onboarding, never delete (P0 for Studio C)

**Chase 2026-04-30 evening:**
> "Every client's part of the onboarding process should get everything into the cloud. Everything's synced, so nothing can ever be deleted."

**The product:**
- Customer onboarding wizard auto-installs sync agents on their devices
- Photos, documents, voice memos, screen recordings — all stream to MBT cloud as captured
- Append-only data model: nothing is ever truly deleted, only marked-deleted with retention period
- Full audit trail: every file, every version, every device that touched it
- Restore from any point in time

**Why it matters:** Data loss is the #1 customer panic moment. We make it physically impossible. Plus: every customer's data becomes training material for their own tenant-specific AI agent (with consent).

**Caveat:** Privacy and security are massive — needs end-to-end encryption with customer-held keys, granular share permissions, and clear retention/disclosure policies.

---

## 5. AI-inaccessible mirror — clone of everything outside AI reach (P1)

**Chase 2026-04-30 evening:**
> "We need to keep a clone of everything that AI doesn't have access to."

**The product:**
- Parallel to the synced cloud (#4 above), keep a cold mirror that NO AI agent can read
- Air-gapped from the LLM/agent layer — only accessible by humans with explicit auth
- Backup of the whole synced corpus minus the model-readable surface
- Insurance against: model leaks, model misuse, future regulatory changes, customer paranoia

**Tech:** Separate Hetzner Storage Box or B2 bucket, no IAM for service accounts, only human-readable access. Snapshot from the main GCS bucket weekly.

**Why it matters:** "Your data is also in a place no AI can ever touch" is a real differentiator. Important for legal + financial + medical clients especially.

---

## 6. Onboarding self-service (P0)

**Chase 2026-04-30 evening (earlier):**
> "Self-service onboarding instructions so they click something and it installs the app. And then it takes them through an onboarding."

**The product:**
- Single signup link → automatic app install → walks customer through 7 setup steps
- Each step skippable
- At end: customer has a configured workspace, sample data loaded, an onboarding call optionally scheduled
- Total time from signup → operational: 10 minutes

**Why it matters:** The current MBT/Studio C signup is too high-touch. Self-serve cuts the activation cost from 1 hour of human time per customer to ~2 minutes (the support fallback).

---

## 7. Auto-clone customer voice from voice memos (P2)

**Chase 2026-04-30 evening (earlier):**
> "We should automatically use the voice memo output from clients to clone them. We'll record the onboarding calls and use that as tracking data too."

**The product:**
- Customer's voice memos and onboarding-call recordings → automatic ElevenLabs voice clone
- Customer can then have any AI-generated content (audio briefings, podcast intros, video voiceovers, etc.) in their own voice
- Becomes part of the Studio C "white-label tools" surface

**Privacy:** Customer-owned. Customer can revoke / delete the clone any time. Customer must explicitly opt-in.

**Why it matters:** Zero-friction voice cloning for every customer is a unique-to-MBT differentiator. Other vendors require explicit recording sessions; we use what customers are already producing.

---

## 8. Apple-native productivity stack (Notes + Voice Memos + iMessage + iCal) (P0 for Tracy/Amy)

**Chase 2026-04-30 evening (earlier):**
> "I think we should just use Apple Notes and Apple Voice Memos for Tracy and Amy. They can text with the Agent, or do notes, or do voice, or do camera over the text. iCal integration for them. Personal calendars are on Apple, business calendars are on Google. We'll do a clean split for them to detangle their shit."

**The product:**
- Tracy + Amy don't need to learn any new SaaS surface
- They use Apple's native apps: Notes for tasks, Voice Memos for thinking-out-loud, iMessage for chatting with the agent, Calendar for scheduling
- The MBT agent reads/writes via Apple's APIs and MCP connectors
- Personal calendar (Apple iCloud) stays personal; business calendar (Google) syncs with the agent
- Outcome: zero-app-fatigue ops

**Tech:** MCP connectors for Apple Notes, Voice Memos, iMessage, iCal already exist (we use them). Add agent-side write access + a routing layer.

---

## 9. Local-first chat (offline LLM) (P2)

**Chase 2026-04-30 evening (earlier):**
> "And it should be able to run locally too, so it doesn't turn off if there's no Wi-Fi. And it should have a minimum data set to run it with no internet connectivity."

**The product:**
- Chat MVP gets a WebLLM (or similar) local-LLM fallback
- Smaller model on-device (e.g. Qwen 2.5 7B or Llama 3.2 3B), runs entirely in browser via WebGPU
- Cached customer-specific dataset (top 1000 docs, recent conversations)
- When connection drops, chat continues working — customer barely notices
- Reconnect → conversation context syncs back to cloud

**Why it matters:** Resilience. Big differentiator for rural / low-connectivity customers (which is the entire Mississippi corridor target).

---

## 10. iPhone video capture spec for customers — best-practice doc

**Required for #1 to ship.** Need a one-page customer-facing guide:
- Use latest iPhone Pro (15 Pro+ ideal — 4-channel APAC requires Pro models)
- Walk slowly, ~1 step per 2 seconds
- Cover all walls + ceiling + floor
- Avoid moving subjects (people walking through scene)
- Capture 1-3 minutes total
- Export at full resolution (don't compress before sending)
- Send via S2PX upload widget OR via dedicated iOS app

---

## Sequence

| # | Feature | Priority | Build owner | Target |
|---|---|---|---|---|
| 1 | Lyra Walkthrough (video → mesh + audio) | P0 | Patch | Tomorrow AM stub, week 1 full |
| 4 | Sync-to-cloud-on-onboarding | P0 | Patch | This sprint |
| 6 | Self-service onboarding | P0 | Patch | This sprint |
| 8 | Apple-native productivity stack | P0 | Patch + Cos | This sprint |
| 2 | White-label portal scraper | P1 | Patch | Sprint 2 |
| 3 | Instant visual response in chat | P1 | Patch | Sprint 2 |
| 5 | AI-inaccessible mirror | P1 | Patch | Sprint 2 |
| 7 | Auto voice-clone from customer media | P2 | Patch + Cos | Sprint 3 |
| 9 | Local-first chat (offline LLM) | P2 | Patch | Sprint 3-4 |
| 10 | iPhone video capture spec | Required for #1 | Cos | Tomorrow AM |

---

*Cos owns this list. New features land here as they come in conversation. Status updates land in the table at bottom.*
