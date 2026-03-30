# The Sovereign Box — Off-Grid Community Computing

## One Sentence

A $250 Raspberry Pi appliance that gives 20 people the communication infrastructure of a Fortune 500 company, running on solar power, with AI that works for them instead of spying on them.

## The Problem

Small communities — homesteads, co-ops, rural towns, disaster zones, indigenous communities, off-grid intentional communities — have two choices:

1. **Depend on Silicon Valley.** Pay monthly for every service. Hand over all your data. Need broadband that doesn't exist. Hope the algorithm doesn't bury you.
2. **Go without.** No AI, no media tools, no coordination infrastructure. Just paper and word of mouth.

There is no third option. Until now.

## The Product

A pre-configured Raspberry Pi 5 with everything a small community needs:

### Communication
- **Mesh messaging** — Encrypted chat between all community members over local WiFi. No carrier. No internet. No metadata harvested.
- **Community radio** — FM transmitter broadcasts to a ~1 mile radius. Icecast streams over local network. Schedule shows, play music, make announcements.
- **Bulletin board** — Digital community calendar, announcements, task board. Accessible from any device on the mesh.

### Intelligence
- **Local AI assistant** — Quantized LLM (Gemma 2B or Llama 3 8B) running on-device. Ask it anything. It knows your community, your inventory, your plans. Zero data leaves the box.
- **Local text-to-speech** — Piper TTS. Generate radio announcements, audiobook narration, accessibility features.
- **Local search** — SQLite + vector embeddings. Search your community's knowledge base without Google.

### Media
- **Media library** — Jellyfin serves movies, music, audiobooks, podcasts to any screen on the network. Your own Netflix.
- **Publishing** — Magazine templates, photo galleries, community newsletter. Generate and distribute content locally.
- **Photography** — Process, organize, and display photos without Adobe or iCloud.

### Economy
- **Local directory** — Who grows tomatoes. Who fixes engines. Who teaches music. A Yellow Pages for your community that doesn't require AT&T.
- **Barter/exchange ledger** — Track exchanges, credits, and contributions without banks or apps.
- **Inventory management** — What the community has, what it needs, seasonal planning.

## Hardware

| Component | Purpose | Cost |
|---|---|---|
| Raspberry Pi 5 (8GB) | Compute | $80 |
| NVMe SSD (256GB) | Storage | $30 |
| Solar panel (100W) | Power | $60 |
| Battery (12V 20Ah) | Power storage | $40 |
| FM transmitter module | Radio broadcast | $15 |
| Mesh WiFi antenna | Extended range | $25 |
| Weatherproof enclosure | Protection | $20 |
| **TOTAL** | | **$270** |

Optional:
- LoRa module ($20) — long-range low-power messaging up to 10 miles
- External HDD (2TB, $60) — expanded media library
- USB microphone ($30) — radio production

## Software Stack

### Runs Locally (No Internet)
- **Next.js** — The same codebase that powers 15 Big Muddy domains
- **SQLite** — Replaces Postgres for zero-config database
- **Gemma 2B / Llama 3 8B** (quantized GGUF) — Local LLM via llama.cpp or Ollama
- **Piper TTS** — Local voice generation
- **Icecast + Liquidsoap** — Radio automation
- **Jellyfin** — Media streaming
- **Matrix/Synapse** — Encrypted messaging
- **Mosquitto MQTT** — IoT/sensor data (weather, soil, power monitoring)

### Optional Cloud Sync (When Connectivity Available)
- **Sync engine** — Queue AI requests, content updates, and directory data
- **Gemini API** — Premium AI when online (cached results available offline)
- **Vertex AI Imagen** — Image generation queued and synced
- **Google Drive** — Backup and cross-community sharing

## The Open Source / Paid Split

| Layer | License | Why |
|---|---|---|
| Core platform (Next.js framework, routing, multi-tenant) | MIT | Anyone can deploy and modify |
| Broadcasting stack (Icecast, automation, scheduling) | MIT | Community radio is a right, not a product |
| Directory + publishing templates | MIT | Small-town infrastructure should be free |
| Edge deployment kit (Pi image, SQLite adapter, sync) | MIT | The box should work without us |
| AI orchestration (model routing, prompt engineering) | Proprietary | This is the intelligence layer we sell |
| Ecosystem analytics (flywheel, attribution, insights) | Proprietary | This is the business intelligence |
| Managed cloud hosting | Service | We run it for people who don't want to |
| Premium AI (Gemini, Imagen, Veo) | Service | Google Cloud costs money |

## Pricing

| Tier | What You Get | Price |
|---|---|---|
| **The Box** | Pi image, everything local, community of 20 | Free (BYO hardware ~$270) |
| **The Kit** | Pre-built box, shipped, tested | $500 one-time |
| **Cloud Sync** | Backup, premium AI, cross-community | $20/mo |
| **Full Platform** | Managed hosting, all AI tools, support | $99/mo |

## Who This Is For

1. **Off-grid homesteads** — 5-50 people living intentionally without Big Tech
2. **Rural communities** — Towns where broadband doesn't exist or costs too much
3. **Disaster response** — Drop a box, instant communication infrastructure
4. **Indigenous communities** — Sovereign data, sovereign infrastructure
5. **International development** — A village in Sub-Saharan Africa gets the same tools as Manhattan
6. **Privacy advocates** — People who refuse to feed the surveillance economy
7. **Educational communities** — Homeschool co-ops, alternative schools, learning communities

## The Story

> "The same architecture that runs a Viacom can run a small-town media economy. The gap isn't technology — it's organization."

The Sovereign Box is the physical proof. You don't need Silicon Valley's permission to have AI, media tools, and communication infrastructure. You don't need their broadband. You don't need their monthly fees. You don't need to hand over your data.

A group of 20 people on a homestead in Mississippi can have the same tools that Fortune 500 companies use. Running on solar. On a $50 computer. With AI that answers to them, not to shareholders.

That's Outsider Economics. That's the product.

## Technical Implementation Path

### Phase 1: Pi Image (MVP)
- Strip the Next.js app to essentials (directory, publishing, radio)
- SQLite adapter for all database operations
- Jellyfin pre-configured with empty library
- Icecast + basic automation
- Local network dashboard (no internet required)
- Ollama with Gemma 2B for local AI

### Phase 2: Mesh + Messaging
- Matrix/Synapse for encrypted local chat
- Mesh WiFi configuration (multiple Pis as repeaters)
- LoRa integration for long-range messaging
- Push notifications over local network

### Phase 3: Cloud Bridge
- Sync engine for optional connectivity
- Queue/batch AI requests for cloud processing
- Cross-community federation (multiple boxes talk to each other)
- Backup and restore over any connection

### Phase 4: The Kit
- Custom PCB or pre-assembled hardware package
- One-command setup script
- Print documentation (for communities without screens)
- Training materials (video, audio, text)

## For the Google Pitch

"We built a platform on Google Cloud that runs 15 domains for a media-hospitality company in Mississippi. Then we made it run on a Raspberry Pi. The cloud version uses Gemini, Imagen, Veo, Cloud TTS, and Google Workspace. The edge version runs on solar power with no internet. Same codebase. The open source core brings users into the Google ecosystem when they're ready to scale."

Google's incentive: every Sovereign Box is a funnel to Google Cloud services. The local AI works, but Gemini is better. The local storage works, but Google Drive syncs across communities. The local radio works, but YouTube reaches the world.

Free infrastructure → paid intelligence. Open source core → Google Cloud upgrade path.
