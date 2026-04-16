# BIG MUDDY MASTER REPORT
## Everything From the Micromedia Deep Dive Session
### April 15, 2026 — Hillbilly Dreams Inc / Natchez, MS

> Currency note (2026-04-16): This is a research archive from the April 15 deep-dive session.
> Canonical operating decisions, pricing, and current build state live in `docs/BUSINESS_ARCHITECTURE.md`
> and `docs/hdi-review-board.html`.

---

# TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Open Source Tools — 150+ Cataloged](#open-source-tools)
3. [AI Content Creation Pipeline — 50+ Tools](#ai-content-pipeline)
4. [Distribution & Syndication — 35 Tools](#distribution)
5. [Social Media & Amplification — 40+ Tools](#social-media)
6. [Business Models & Revenue Projections](#business-models)
7. [Licensing & Legal Requirements](#licensing)
8. [Operations & Best Practices](#operations)
9. [Case Studies — 23 Documented](#case-studies)
10. [Recommended Architecture](#architecture)
11. [Implementation Roadmap](#roadmap)
12. [Chase's Vision Notes](#vision)

---

# 1. EXECUTIVE SUMMARY

Six parallel research agents spent ~30 minutes each analyzing the full landscape of running an internet radio station and digital magazine as a micromedia business. This report covers 150+ open source tools, 23 case studies, detailed business models with dollar amounts, licensing requirements, and a phased implementation plan.

**The bottom line:** Big Muddy has a structural advantage no competitor in Natchez can match — radio + magazine + directory + venue + inn + record label under one roof, powered by AI, running on open source tools. The Marfa TX comparison is the killer proof point: a town of 1,700 people became a nationally recognized cultural destination through the same formula Big Muddy is building in a town of 14,000.

**Revenue targets:** $75K Year 1, $162K Year 2 (net after operating costs: $63K and $143K respectively).

**Biggest cost wildcard:** SoundExchange royalties ($3K-$37K/year depending on listener count). Mitigate by programming local/owned content from Big Muddy Record artists.

**Highest-impact tools to add:** AzuraCast (replace OpenBroadcaster), n8n (workflow automation glue), faster-whisper (transcription), Remotion (programmatic video), Umami (analytics for all 15 domains).

---

# 2. OPEN SOURCE TOOLS — RADIO & MAGAZINE

## Radio Automation

| Tool | GitHub | Stars | Language | Recommendation |
|------|--------|-------|----------|----------------|
| **AzuraCast** | github.com/AzuraCast/AzuraCast | ~3,100 | PHP + Vue.js | **TOP PICK.** All-in-one: Liquidsoap + Icecast + web UI + analytics + podcast. Docker. REST API. Replace OpenBroadcaster. |
| **LibreTime** | github.com/LibreTime/libretime | ~800 | Python + TS | Fork of Airtime. Calendar-based scheduling. Show management. Good traditional radio workflow. |
| **Liquidsoap** | github.com/savonet/liquidsoap | ~1,400 | OCaml | THE engine. Crossfading, jingles, live DJ takeover, DMCA rules, ad insertion. Used inside AzuraCast. |
| Rivendell | github.com/ElvishArtisan/rivendell | ~200 | C++ | Traditional broadcast automation. Cart-based. Overkill for internet radio. |
| OpenBroadcaster | github.com/openbroadcaster/observer | ~200 | PHP/JS | Currently running on Mac mini :8080. Less actively maintained than AzuraCast. Consider migration. |

## Audio Processing

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **ffmpeg-normalize** | github.com/slhck/ffmpeg-normalize | ~1,200 | EBU R128 loudness normalization. Batch process entire music library to -14 LUFS for streaming or -24 LUFS for broadcast. |
| FFmpeg loudnorm filter | (built-in) | ~48,000 | Two-pass EBU R128 normalization. Already installed. |
| pyloudnorm | github.com/csteinmetz1/pyloudnorm | ~600 | Python ITU-R BS.1770-4 loudness measurement. Build QC pipeline to check incoming tracks. |
| Matchering | github.com/sergree/matchering | ~1,200 | Automated audio mastering. Match entire library to a reference "sound" for station consistency. |
| Silero VAD | github.com/snakers4/silero-vad | ~4,000 | Voice activity / silence detection. Trigger alerts when broadcast goes silent. |

## Music Metadata ("MelodyVault")

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **beets** | github.com/beetbox/beets | ~12,500 | **THE MelodyVault engine.** MusicBrainz-powered auto-tagger, library organizer. ReplayGain, duplicate detection, genre tagging, album art. Run on Mac mini. |
| MusicBrainz Picard | github.com/metabrainz/picard | ~3,800 | GUI tagger with AcoustID audio fingerprinting. Good for manual review of tricky metadata. macOS native. |
| Mutagen | github.com/quodlibet/mutagen | ~1,500 | Python audio metadata library. The engine under beets. |
| music-metadata | github.com/Borewit/music-metadata | ~900 | TypeScript. Read track metadata in Next.js for web library browser and now-playing display. |
| Chromaprint/AcoustID | github.com/acoustid/chromaprint | ~1,800 | Audio fingerprinting. Auto-identify tracks and fetch metadata from MusicBrainz. |
| Audfprint | github.com/dpwe/audfprint | ~500 | Audio fingerprinting for dedup detection and now-playing identification. |

## Podcast & Show Management

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **Castopod** | github.com/ad-aures/castopod | ~700 | Open source podcast hosting. RSS feeds, chapters, transcripts, analytics, ActivityPub federation. Docker. |
| Podgrab | github.com/akhilrex/podgrab | ~1,000 | Self-hosted podcast downloader/manager. Go. |
| podcast-dl | github.com/lightpohl/podcast-dl | ~400 | Node.js CLI for downloading podcast episodes. Automate syndicated content acquisition. |
| Funkwhale | (GitLab) | — | Decentralized music + podcast platform. ActivityPub federation. |

## Listener & Web Analytics

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **Grafana + Prometheus** | grafana + prometheus | ~65K + ~56K | Scrape Icecast stats endpoints, build professional listener dashboards. Real-time concurrent listener counts, peak times, geographic heatmaps. |
| **Umami** | github.com/umami-software/umami | ~23,000 | **TOP PICK for web.** Lightweight TypeScript analytics. One instance for all 15 domains. No cookies. Privacy-friendly. |
| Plausible | github.com/plausible/analytics | ~20,000 | Privacy-friendly alternative to Umami. Elixir. Self-hostable. |
| Matomo | github.com/matomo-org/matomo | ~19,500 | Full-featured PHP analytics. Robust API. Heavier than Umami/Plausible. |
| Icecast-KH | github.com/karlheyes/icecast-kh | ~200 | Enhanced Icecast fork with better stats, JSON endpoints, per-source fallback. Direct replacement for standard Icecast. |

## Live Streaming

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **SRS** | github.com/ossrs/srs | ~25,000 | **TOP PICK.** High-performance: RTMP + WebRTC + HLS + SRT + DASH. Ultra-low-latency live streaming. |
| MediaMTX | github.com/bluenviron/mediamtx | ~12,000 | Go. Multi-protocol media server. Single binary deployment. |
| **Owncast** | github.com/owncast/owncast | ~9,500 | Self-hosted Twitch with built-in chat. Go + React. RTMP in, HLS out. Docker. |
| Nginx-RTMP | github.com/arut/nginx-rtmp-module | ~13,500 | RTMP ingest from OBS, HLS output. Stable, proven. |
| Restreamer | datarhei/restreamer | — | Multi-destination streaming. Docker + web UI. Radio to YouTube + Facebook + Twitch simultaneously. |

## Magazine CMS

| Tool | GitHub | Stars | Language | Recommendation |
|------|--------|-------|----------|----------------|
| **Payload CMS** | github.com/payloadcms/payload | ~26,000 | TypeScript | **TOP PICK.** Built for Next.js. Code-first, fully customizable. Multi-tenant — power all 15 domains from one instance. |
| Ghost | github.com/TryGhost/Ghost | ~47,000 | JavaScript | Professional publishing. Built-in memberships, newsletters, SEO. Headless via Content API. |
| Directus | github.com/directus/directus | ~28,000 | TypeScript | Wrap any SQL DB with REST/GraphQL API. Good for directory and structured content. |
| Strapi | github.com/strapi/strapi | ~64,000 | JavaScript | Most popular headless CMS. Large plugin ecosystem. |
| Wagtail | github.com/wagtail/wagtail | ~18,000 | Python/Django | Best CMS for media/magazine. Would need Django backend alongside Next.js. |
| KeystoneJS | github.com/keystonejs/keystone | ~9,200 | TypeScript | Schema-as-code. GraphQL API. Prisma + Next.js native. |

## Music Library Management

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **Navidrome** | github.com/navidrome/navidrome | ~12,000 | Self-hosted music server. Beautiful web UI, Subsonic API, smart playlists, multi-user. Staff browse and preview tracks. |
| Mopidy | github.com/mopidy/mopidy | ~8,000 | Extensible Python music server. Spotify, SoundCloud, local files. MPD-compatible. |

## Misc Essential Tools

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| audiowaveform (BBC) | github.com/bbc/audiowaveform | ~1,900 | SoundCloud-style waveform data and images. |
| nchan | github.com/slact/nchan | ~3,000 | Real-time now-playing updates via WebSocket/SSE from Nginx. |

---

# 3. AI CONTENT CREATION PIPELINE

## Transcription (Foundation of Everything)

| Tool | GitHub | Stars | M1 | What It Does |
|------|--------|-------|-----|-------------|
| **faster-whisper** | github.com/SYSTRAN/faster-whisper | ~13,000 | YES | **USE THIS.** 4x faster than original Whisper on M1. CTranslate2 backend with Apple Silicon optimization. Production-ready. |
| **WhisperX** | github.com/m-bain/whisperX | ~12,000 | YES | Word-level timestamps + speaker diarization. "Chase: [00:05:23] So the thing about Main Street..." |
| pyannote-audio | github.com/pyannote/pyannote-audio | ~6,000 | YES | State-of-the-art speaker diarization. Who spoke when. |

## AI Image Generation

| Tool | GitHub | Stars | M1 | What It Does |
|------|--------|-------|-----|-------------|
| **ComfyUI** | github.com/comfyanonymous/ComfyUI | ~65,000 | YES | **TOP PICK.** Node-based SD workflows. Repeatable editorial illustration. SD 1.5 ~15-30s, SDXL ~60-90s, Flux Schnell ~30-45s on M1. |
| ComfyUI-Manager | github.com/ltdrdata/ComfyUI-Manager | ~8,000 | — | Package manager for ComfyUI. One-click installs. Essential. |
| ComfyUI-IPAdapter | github.com/cubiq/ComfyUI_IPAdapter_plus | ~4,000 | — | Style consistency. Transfer reference style to all generated images. Maintain visual identity across magazine issues. |
| **InvokeAI** | github.com/invoke-ai/InvokeAI | ~24,000 | BEST M1 | Professional SD interface with canvas mode. Dedicated MPS optimization. Most Photoshop-like. |
| Fooocus | github.com/lllyasviel/Fooocus | ~42,000 | Limited | Simplified Midjourney-like interface. Good for non-technical team members. |
| **Real-ESRGAN** | github.com/xinntao/Real-ESRGAN | ~29,000 | YES (CPU) | AI upscaling. Generate at 1024x1024, upscale to 4096x4096 for print. |
| **rembg** | github.com/danielgatis/rembg | ~17,000 | YES | Background removal. CLI + Python library. Batch processing. |
| **IOPaint** | github.com/Sanster/IOPaint | ~19,000 | YES (MPS) | AI inpainting / object removal. Remove distracting elements from editorial photos. Web UI + API mode. |
| SAM (Meta) | github.com/facebookresearch/segment-anything | ~48,000 | YES (CPU) | Click-to-select any object in a photo. Perfect segmentation masks. |

## AI Audio Generation

| Tool | GitHub | Stars | M1 | What It Does |
|------|--------|-------|-----|-------------|
| **AudioCraft/MusicGen** | github.com/facebookresearch/audiocraft | ~21,000 | YES (small) | Text-to-music: "upbeat acoustic guitar, country feel, 120 bpm." Generate royalty-free bumpers, beds, jingles. Small model runs on 8GB. |
| Stable Audio Open | github.com/Stability-AI/stable-audio-tools | ~3,000 | YES (16GB) | Up to 47 seconds stereo at 44.1kHz. Alternative to MusicGen. |
| **Bark** | github.com/suno-ai/bark | ~36,000 | YES (small) | Natural speech with emotion, laughter, sighs, music, sound effects. "[laughs] Hey, you're listening to Big Muddy Radio!" |
| **Coqui XTTS** | github.com/coqui-ai/TTS | ~36,000 | YES (CPU) | Voice cloning from 6-second sample. 17 languages. Clone Chase's voice for automated promos. |
| Tortoise TTS | github.com/neonbjb/tortoise-tts | ~13,000 | Slow | Highest quality TTS. Needs 30+ seconds reference audio. Best for signature station voice. |
| **Piper TTS** | github.com/rhasspy/piper | ~7,000 | YES (fast) | Fast, lightweight local TTS. Multiple voice models. Real-time generation. Good for automated news reads, bulk narration. |
| **Demucs** | github.com/facebookresearch/demucs | ~8,000 | YES (MPS) | Audio source separation. Isolate vocals from noisy interviews. Extract music beds from mixed audio. |
| **DeepFilterNet** | github.com/Rikorose/DeepFilterNet | ~3,000 | YES | Real-time noise suppression for speech. Clean up phone interviews and field recordings. |

## AI Video & Editing

| Tool | GitHub | Stars | M1 | What It Does |
|------|--------|-------|-----|-------------|
| **Remotion** | github.com/remotion-dev/remotion | ~21,000 | YES | **HIGHEST REC.** Write videos in React. Audiograms, show promos, quote cards, episode teasers. Template + data = unlimited variations. Fits Next.js stack perfectly. |
| **Auto-Editor** | github.com/WyattBlue/auto-editor | ~5,000 | YES | Auto-remove silence, cut dead air. CLI tool. Process raw recordings before publishing. |
| Wavesurfer.js | github.com/katspaugh/wavesurfer.js | ~9,000 | YES | Audio waveform visualization. Combine with Remotion for audiogram videos. |

## AI Writing & Editing

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **Novel** | github.com/steven-tey/novel | ~14,000 | Notion-style WYSIWYG editor with AI autocompletion. Drop-in React component. Connect to Gemini Flash. |
| Tiptap | github.com/ueberdosis/tiptap | ~30,000 | Headless rich text editor framework. AI extensions for inline suggestions and rewriting. |
| LanguageTool | github.com/languagetool-org/languagetool | ~12,000 | Self-hosted Grammarly alternative. Java. API mode for editorial pipeline integration. |
| Harper | github.com/elijah-potter/harper | ~4,000 | Fast grammar checker in Rust/WASM. Runs in-browser. Embed directly in CMS. |

## AI Photo Editing

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| GFPGAN | github.com/TencentARC/GFPGAN | ~36,000 | Face restoration and enhancement. Fix blurry/old photos. |
| CodeFormer | github.com/sczhou/CodeFormer | ~16,000 | Advanced face restoration. Better identity preservation. |
| Sharp | github.com/lovell/sharp | ~29,000 | Node.js image processing workhorse. Resize, crop, watermark, format conversion. M1: Excellent. |

## AI Show Prep & Research

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| Jina Reader | github.com/jina-ai/reader | ~7,000 | Convert any URL to clean LLM-friendly text. Feed into Gemini for summarization. |
| **Khoj** | github.com/khoj-ai/khoj | ~16,000 | Self-hosted AI research assistant. Index past episodes, guest bios, show notes. "What did we talk about with [guest] last time?" |
| **Fabric** | github.com/danielmiessler/fabric | ~26,000 | AI prompt patterns: extract_article_wisdom, create_summary, social posts. CLI tool. Article in, social posts out. |

## Workflow Automation

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **n8n** | github.com/n8n-io/n8n | ~50,000 | **THE GLUE.** Visual workflow builder. 400+ integrations. AI nodes. RSS to AI to social to analytics. Connect EVERYTHING. |
| **Flowise** | github.com/FlowiseAI/Flowise | ~32,000 | Drag-and-drop LLM chain builder. Non-technical team builds AI tools: interview prep agent, SEO optimizer, show notes generator. |
| Langflow | github.com/langflow-ai/langflow | ~38,000 | Visual multi-agent AI workflows. Python-based alternative to Flowise. |
| Windmill | github.com/windmill-labs/windmill | ~10,000 | Code-first workflow engine. Rust + TypeScript. Developer-oriented alternative to n8n. |

## M1 Mac Compatibility Summary

**Runs Great:** faster-whisper, WhisperX, rembg, DeepFilterNet, Piper TTS, Bark (small), MusicGen (small), Auto-Editor, Sharp, n8n, Flowise, Harper, LanguageTool

**Runs Well (slower than GPU):** ComfyUI (SD 1.5/Flux Schnell), InvokeAI, AudioCraft (small/medium), Coqui XTTS, Real-ESRGAN, IOPaint, GFPGAN, CodeFormer, pyannote-audio

**Runs But Slow:** ComfyUI (SDXL/Flux Dev), Tortoise TTS, Whisper large-v3, Fooocus

**Not Practical on M1:** CogVideo, Open-Sora, Mochi 1 — use Veo 3.1 via API instead

---

# 4. DISTRIBUTION & SYNDICATION

## Multi-Platform Streaming

| Tool | What It Does |
|------|-------------|
| **Restreamer** | Self-hosted multi-destination streaming. Docker + web UI. Radio to YouTube + Facebook + Twitch simultaneously. |
| **Liquidsoap** | Route Icecast stream to multiple outputs with audio processing built in. |
| **Owncast** | Self-hosted live streaming with chat. RTMP in, HLS out. |
| **SRS** | Full media server: WebRTC + RTMP + HLS. |

## Email Newsletters

| Tool | What It Does |
|------|-------------|
| **Listmonk** | Self-hosted newsletter platform with REST API. Your Next.js sites call it directly. Replaces SaaS newsletter dependency. |
| Mailtrain | Self-hosted Mailchimp alternative. |
| Mautic | Marketing automation platform. |

## Embeddable Radio Players

Custom JavaScript player consuming Icecast stream + Wavesurfer.js for waveform visualization.

## Content Repurposing Pipeline

**The dream automation:**
1. whisper.cpp transcribes the show
2. Auto-Editor finds interesting moments
3. Remotion generates audiogram videos
4. n8n orchestrates the whole pipeline
5. One radio show → podcast + article + clips + audiograms + newsletter

---

# 5. SOCIAL MEDIA & AMPLIFICATION

## Scheduling (Already Have Postiz)

| Tool | Stars | Bluesky | Threads | Status |
|------|-------|---------|---------|--------|
| **Postiz** | ~16,000 | YES | YES | Already running on Mac mini :4007. KEEP. |
| Mixpost | ~5,500 | No | No | PHP alternative. Monitor as backup. |

## Link Management

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **Dub.co** | github.com/dubinc/dub | ~19,000 | Modern link management. Next.js-based. Beautiful dashboard. Track every link you share. |
| Shlink | github.com/shlinkio/shlink | ~3,300 | URL shortener with analytics. Multi-domain support for 15 domains. |
| YOURLS | github.com/YOURLS/YOURLS | ~10,500 | Classic self-hosted URL shortener. Battle-tested. |
| **LinkStack** | github.com/LinkStackOrg/LinkStack | ~4,000 | Self-hosted Linktree alternative. Link-in-bio pages with analytics. |

## RSS-to-Social Automation

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **n8n** | github.com/n8n-io/n8n | ~52,000 | Visual workflow: RSS feed to AI to social posts. THE recommendation. |
| **Huginn** | github.com/huginn/huginn | ~44,000 | Self-hosted IFTTT. RSS monitoring, auto-posting, data scraping, email digests. |
| RSS-Bridge | github.com/RSS-Bridge/rss-bridge | ~7,500 | Generate RSS feeds from websites that don't have them. |
| Automatisch | github.com/automatisch/automatisch | ~6,000 | Fully open-source Zapier alternative. |

## Community & Engagement

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **Discourse** | github.com/discourse/discourse | ~43,000 | Full community forum. Used by major brands. |
| Coral (Vox Media) | — | ~1,900 | Article comments for newsrooms. Moderation tools. |
| Flarum | — | ~15,000 | Lightweight forum alternative to Discourse. |

## VJ / Visual Radio

| Tool | GitHub | Stars | What It Does |
|------|--------|-------|-------------|
| **Hydra** | github.com/hydra-synth/hydra | ~2,500 | Live-coding browser visuals. Audio-reactive. Capture via OBS. Zero cost. |
| **p5.js** | github.com/processing/p5.js | ~22,000 | Web audio visuals with FFT analysis, beat detection. Build custom visualizer at bigmuddyradio.com/visualizer. |
| Processing 4 | github.com/processing/processing4 | ~6,000 | Creative coding for custom audio visualizations. M1 native. |
| OBS Studio | github.com/obsproject/obs-studio | ~62,000 | Essential broadcast tool. Browser sources embed p5.js/Hydra visuals directly. |
| TouchDesigner | (proprietary, free tier) | — | Pro VJ tool. Node-based, GLSL shaders, audio analysis. Free non-commercial tier. |

---

# 6. BUSINESS MODELS & REVENUE PROJECTIONS

## Internet Radio Revenue (50-500 concurrent listeners)

| Revenue Stream | Monthly Low | Monthly Mid | Monthly High |
|---|---|---|---|
| Local Sponsorship | $500 | $2,000 | $5,000 |
| Programmatic Ads | $100 | $300 | $800 |
| Membership/Donations | $200 | $750 | $2,000 |
| Merchandise | $50 | $200 | $500 |
| Live Events (amortized) | $300 | $1,000 | $3,000 |
| Affiliate/Other | $50 | $150 | $400 |
| **TOTAL** | **$1,200** | **$4,400** | **$11,700** |

Revenue per listener benchmarks:
- Low: $0.50-$1.50/listener/month
- Average: $2-$5
- High (strong community): $5-$15
- NPR model: $8-$20

## Digital Magazine Revenue

| Revenue Stream | Monthly Low | Monthly Mid | Monthly High |
|---|---|---|---|
| Direct Display Ads | $200 | $750 | $2,000 |
| Programmatic Ads | $20 | $100 | $400 |
| Sponsored Content | $200 | $800 | $2,500 |
| Newsletter Sponsors | $50 | $300 | $800 |
| Membership/Subs | $100 | $500 | $1,500 |
| Events | $100 | $500 | $2,000 |
| Print/POD | $50 | $200 | $500 |
| Affiliate | $30 | $100 | $300 |
| **TOTAL** | **$750** | **$3,250** | **$10,000** |

## Directory Revenue (Deep South Directory)

| Tier | Monthly | Annual | What They Get |
|------|---------|--------|---------------|
| Free | $0 | $0 | Basic listing (name, address, phone, category) |
| Standard | $20/mo | $199/yr | Enhanced + photos + reviews + analytics |
| Featured | $49/mo | $499/yr | + featured placement + newsletter + social promo |
| Premium Partner | $99/mo | $999/yr | + sponsored content + radio mentions + event promotion |

## Bundle Packages (The Power Play)

*No competitor in Natchez can offer radio + magazine + directory + events + hospitality in one package.*

| Bundle | Monthly | Includes |
|--------|---------|----------|
| **Starter** | $99/mo | Enhanced directory + 5 radio mentions/wk + sidebar magazine ad |
| **Growth** | $199/mo | Featured directory + 10 radio mentions/wk + in-article ad + newsletter mention |
| **Partner** | $399/mo | Premium directory + daily radio + homepage magazine ad + monthly sponsored article + social promotion |
| **Anchor Sponsor** | $599/mo | Everything + show sponsorship + quarterly featured profile + VIP event host |

Annual contract: 15-20% off. Nonprofit: 30-50% off.

## Radio Rate Card

| Opportunity | Rate |
|-------------|------|
| 30-second produced spot | $10-25/play |
| 60-second produced spot | $15-35/play |
| Live read (15-30 sec) | $10-20/read |
| Show title sponsorship | $400-600/month |
| Segment sponsorship | $150-300/month |
| Package (10 spots/week) | $75-150/week |
| Event broadcast sponsorship | $200-500/event |
| Exclusive daypart | $300-500/month |

### Starter Packages
- **"Try Us"**: $50/week — 5 live reads + basic directory listing
- **"Local Favorite"**: $100/week — 10 reads + 5 spots + enhanced directory + newsletter
- **"Big Muddy Partner"**: $200/week — 15 reads + 10 spots + featured directory + magazine sidebar + 2 social posts/wk

## Magazine Ad Rate Card

| Position | Monthly | Annual (20% off) |
|----------|---------|-------------------|
| Homepage banner | $200-400 | $1,920-3,840 |
| Sidebar ad (300x250) | $100-200 | $960-1,920 |
| In-article ad | $75-150 | $720-1,440 |
| Newsletter slot | $50-100/issue | $2,400-4,800/yr (weekly) |
| Sponsored article | $300-750 | one-time |
| Sponsored series (4-6) | $1,000-3,000 | one-time |
| Business profile | $200-500 | one-time |

## Membership Tiers ("Big Muddy Club")

| Tier | Price | Benefits |
|------|-------|----------|
| Listener | Free | Newsletter, basic stream, limited magazine |
| Member | $10/mo | Ad-free radio, full magazine, 10% off inn, early event tickets |
| Patron | $25/mo | + quarterly merch + 15% off inn + VIP events + name on supporter wall |
| Partner | $100/mo | + free night at inn/quarter + reserved seating + annual dinner with team |

Target at scale: 200 Members + 50 Patrons + 10 Partners = $4,250/month

## Consolidated Projections

### Year 1 (Conservative, Achievable)

| Channel | Annual |
|---------|--------|
| Radio sponsorship/ads | $18,000 |
| Radio membership | $6,000 |
| Magazine advertising | $9,000 |
| Magazine sponsored content | $4,800 |
| Directory listings | $7,200 |
| Bundled packages | $12,000 |
| Events | $9,600 |
| Membership program | $6,000 |
| Merch/affiliate/other | $2,400 |
| **TOTAL REVENUE** | **$75,000** |
| Operating costs | ($12,000) |
| **NET** | **$63,000** |

### Year 2 (Growth)

| Channel | Annual |
|---------|--------|
| **TOTAL REVENUE** | **$162,000** |
| Operating costs | ($19,000) |
| **NET** | **$143,000** |

---

# 7. LICENSING & LEGAL REQUIREMENTS

## Music Licensing Costs (Annual)

| License | Low | High | Notes |
|---------|-----|------|-------|
| ASCAP | $500 | $1,500 | ~1.7-2% of revenue or minimum fee |
| BMI | $500 | $1,500 | Similar structure to ASCAP |
| SESAC | $200 | $500 | Negotiated, smaller catalog |
| SoundExchange | $3,000 | $37,000 | Per-performance, scales with listeners |
| GMR | $200 | $500 | If playing mainstream pop/rock |
| **TOTAL** | **$4,400** | **$41,000** | SoundExchange drives the range |

## SoundExchange Math

- Rate: ~$0.0028/performance (2024-2025 CRB rates)
- A "performance" = one song transmitted to one listener
- At 100 avg listeners x 15 songs/hr x 24/7 = ~$36,800/year
- At 50 avg listeners = ~$18,400/year
- At 25 avg listeners = ~$9,200/year
- At 10 avg listeners = ~$3,700/year
- Minimum fee: ~$1,000/year per channel

## Reducing SoundExchange Costs

- Play local artists who grant direct written permission (reduces performance count)
- Play music from Big Muddy Record (own label — zero SoundExchange cost)
- Use Creative Commons music (Free Music Archive, ccMixter, Jamendo)
- Program more talk/interview content (no per-performance cost)
- Key strategy: build a house label and sign local artists not registered with PROs

## DMCA Compliance (Rules of Four)

Within any 3-hour window:
1. Max 3 songs from same album, max 2 consecutively
2. Max 4 songs by same artist, max 3 consecutively
3. No advance playlists published
4. Don't encourage copying/recording

## FCC

- Internet radio does NOT need FCC license
- No obscenity rules, no equal-time, no EAS requirements
- Copyright law (DMCA) is the primary regulatory framework

## Other Legal

- Privacy Policy required (CCPA applies to California visitors)
- Terms of Service for stream and website
- FTC disclosure rules for sponsored content
- COPPA if content could attract children under 13
- Mississippi consumer protection laws for advertising

## Realistic Total Budget

Small station (10-25 concurrent listeners): **$5,000-$12,000/year**

---

# 8. OPERATIONS & BEST PRACTICES

## Sample Hour Clock

```
:00  Station ID / Imaging
:01  Song (Heavy rotation)
:05  Song (Medium rotation)
:09  Song (Light rotation / deep cut)
:13  Local spot / Promo
:14  Song (Heavy rotation)
:18  Song (Medium rotation)
:22  Song (Local artist / indie)
:26  Station ID / Liner
:27  Song (Heavy rotation)
:31  Song (Medium rotation)
:35  Song (Light rotation)
:39  Sponsor message
:40  Song (Heavy rotation)
:44  Song (Medium rotation)
:48  Song (Local artist)
:52  Station ID / Weather/Time
:53  Song (Heavy rotation)
:57  Song (Medium rotation)
```

~14-15 songs/hour with IDs, promos, and ad breaks.

## Rotation Categories

| Category | Size | Plays/Day | Description |
|----------|------|-----------|-------------|
| Heavy (A-list) | 15-25 songs | 4-6x | Defines your sound right now |
| Medium (B-list) | 40-60 songs | 2-3x | Complements core sound |
| Light (C-list) | 100-200+ songs | 1x or less | Depth and variety |
| Power Gold | 20-30 songs | 1-2x | Proven all-time favorites |
| Local Spotlight | Variable | 2-3/hour min | LOCAL ARTISTS — competitive advantage |

## Dayparting

| Daypart | Time | Name | Energy | Strategy |
|---------|------|------|--------|----------|
| Morning | 6-10am | "Delta Morning" | Medium, building | Familiar tracks, weather, community calendar |
| Midday | 10am-2pm | "Main Street Midday" | Steady | Deeper cuts, discovery, magazine cross-promo |
| Afternoon | 2-7pm | "River Road Drive" | Building | Event promos, push tonight's venue shows |
| Evening | 7-11pm | "Big Muddy After Dark" | High to mellow | Specialty shows, blues hour, live potential |
| Overnight | 11pm-6am | "Deep South Dreams" | Low, atmospheric | Fully automated, deep cuts, replays |

## Content Repurposing

### One Interview = Five Outputs
1. Live radio interview (15-30 min)
2. Podcast episode (full audio archive)
3. Magazine article (transcribe + edit)
4. Social media clips (60-90 sec highlights)
5. Directory content (enrich business listing)

### One Live Show = Four Outputs
1. Live broadcast on Big Muddy Radio
2. Recording for future play + potential Big Muddy Record release
3. Magazine coverage (photos + review)
4. Video clips for social media

## Advertiser Approach

1. **Lead with relationship.** Visit in person. Buy their product first.
2. **Frame as sponsorship.** Partnership language, not advertising.
3. **Create free trial spot.** Let them hear themselves on air.
4. **Demonstrate the ecosystem.** Radio + magazine + directory + events + hospitality = unmatched.
5. **Start with 10 founding sponsors.** 30-40% off rate card with 6-12 month lock-in.

## Community Engagement

- Song request form on website
- Guest DJ program (target: 20-30 community hosts)
- Community contributor program for magazine (5-10 regular writers)
- Partnerships: Chamber, tourism board, schools, churches, arts orgs
- Public service: fundraiser drives, PSAs, election coverage, severe weather

---

# 9. CASE STUDIES — 23 DOCUMENTED

## Top 3 Most Relevant

### 1. The Lot Radio (Brooklyn, NY)
Glass-booth radio station + community gathering space. 100+ volunteer DJs provide 24/7 programming. Revenue: listener donations, merch, events. **Lesson:** Physical space + volunteer programmers = sustainability.

### 2. Bitter Southerner (Atlanta, GA)
Small team (~5-8), nationally relevant digital magazine about the progressive South. Membership ($5-10/mo) + e-commerce (Southern-made goods) + sponsored content. **Lesson:** Small team can build national magazine from the South.

### 3. Marfa, Texas (Pop. 1,700 — SMALLER than Natchez)
Art (Chinati Foundation) + boutique hotels + Marfa Public Radio (KRTS) + events = internationally recognized cultural destination. **Lesson:** If a desert town of 1,700 with no river, no antebellum architecture, and no music history can do it, Natchez with ALL those advantages has every reason to succeed.

## Other Key Case Studies

| # | Name | Location | Model | Key Lesson |
|---|------|----------|-------|------------|
| 4 | WFMU | Jersey City, NJ | 200 volunteer DJs, $1M+/yr pledges | Volunteer model at scale |
| 5 | BFF.fm | San Francisco | 501(c)(3), 60-80 volunteers | Nonprofit unlocks grants |
| 6 | Dublab | Los Angeles | Arts-focused, NEA/foundation grants | "Arts org" framing = grant money |
| 7 | NTS Radio | London | 100+ DJs, brand partnerships | One city, global audience |
| 8 | Scalawag | Durham, NC | Nonprofit Southern media | Knight/Ford Foundation funding |
| 9 | Oxford American | Little Rock, AR | Annual Southern Music Issue | Tentpole issue = revenue spike |
| 10 | Mississippi Today | Jackson, MS | Nonprofit, Pulitzer 2023 | MS journalism gets national attention |
| 11 | 64 Parishes | New Orleans | Encyclopedia + magazine | Evergreen SEO, humanities funding |
| 12 | Country Roads | Baton Rouge, LA | 45+ years, tourism ads | Tourism board $ is real |
| 13 | Ace Hotel | Multiple | Hotel + cultural programming | Most direct Big Muddy precedent |
| 14 | 21c Museum Hotels | Louisville + others | Hotel + free art museum | Small-town works (Bentonville) |
| 15 | SXSW | Austin, TX | Festival to year-round media | Events become media company |
| 16 | Hotel Marfa | Marfa, TX | Boutique hotel + radio + art | Ecosystem at tiny scale |
| 17 | Garden & Gun | Charleston, SC | "Made in the South" awards | Annual awards = tentpole model |
| 18 | Preservation Hall | New Orleans | Venue to label to touring to education | Single venue becomes platform |
| 19 | 6AM City | Greenville, SC | Local morning newsletter | "Local email" as business |
| 20 | Craig Mod | Japan | 1,000 True Fans membership | You need thousands, not millions |
| 21 | Hell Gate | NYC | Small team local news membership | 4-6 person team is viable |

## 8 Patterns From All Case Studies

1. **Diversify revenue** across 4-5+ streams. No single source > 40%.
2. **Physical space is the secret weapon.** Lot Radio's glass booth, Ace's lobby, 21c's museum.
3. **Nonprofit unlocks real money.** Grants, CPB, foundation support.
4. **Volunteers are the workforce.** WFMU: 200. BFF.fm: 60-80. Paid team handles ops.
5. **"Cultural institution" beats "media company."** Changes how everyone perceives you.
6. **Annual tentpole events create spikes.** Oxford American music issue. WFMU pledge drive.
7. **Archives compound.** Every show, article, listing gains SEO value permanently.
8. **Marfa proves the math.** Pop. 1,700 became a destination. Pop. 14,000 has every advantage.

---

# 10. RECOMMENDED ARCHITECTURE

## Mac Mini Stack (192.168.4.37)

```
Next.js App (Vercel) ← REST API calls →

Mac mini (192.168.4.37):
├── AzuraCast (Docker) → Liquidsoap → Icecast :8010
├── beets (music library metadata / MelodyVault)
├── ffmpeg-normalize (loudness normalization)
├── n8n (workflow automation — THE GLUE)
├── faster-whisper (transcription engine)
├── Umami (analytics for all 15 domains)
├── Listmonk (newsletters)
├── ComfyUI (editorial image generation)
├── Castopod (podcast hosting)
├── SRS (live event streaming)
├── Postiz :4007 (social scheduling — ALREADY RUNNING)
├── Grafana + Prometheus (unified dashboards)
├── LinkStack (link-in-bio pages)
├── Dub.co (link management + tracking)
├── Navidrome (music library browsing UI)
├── Plex :32400 (ALREADY RUNNING)
└── Open Notebook :5055 (ALREADY RUNNING)
```

## The Dream Pipeline

```
1. Radio show airs (Icecast/AzuraCast)
       ↓
2. n8n detects new recording
       ↓
3. faster-whisper transcribes with timestamps + speaker ID
       ↓
4. Auto-Editor identifies high-energy segments
       ↓
5. Fabric/Gemini generates: article summary, social posts, pull quotes
       ↓
6. Remotion generates: audiogram videos, quote cards
       ↓
7. Postiz receives content for human review + scheduling
       ↓
8. All links through Dub.co for tracking
       ↓
9. Social profiles point to LinkStack pages
       ↓
10. Umami tracks traffic across all 15 domains
       ↓
11. Grafana shows unified dashboard

ONE SHOW → podcast + article + clips + audiograms + social posts + newsletter
```

---

# 11. IMPLEMENTATION ROADMAP

## Phase 1: Foundation (Month 1-2)
- [ ] Secure ASCAP, BMI, SESAC licenses (~$1,500-$3,000)
- [ ] Register with SoundExchange, set up reporting
- [ ] Configure DMCA-compliant rotation rules
- [ ] Install faster-whisper on Mac mini
- [ ] Install n8n on Mac mini (Docker)
- [ ] Install Umami for all 15 domains
- [ ] Build first week of programming clocks
- [ ] Create Terms of Service and Privacy Policy
- [ ] Set up Google Chat communication policy

## Phase 2: Content Pipeline (Month 2-4)
- [ ] Install ComfyUI + IPAdapter for editorial illustrations
- [ ] Install AudioCraft/MusicGen for bumpers and jingles
- [ ] Install Bark for radio promos with natural speech
- [ ] Set up Remotion video templates (audiograms, promos, quote cards)
- [ ] Configure n8n workflows (RSS → AI → social)
- [ ] Install Listmonk for newsletters
- [ ] Launch weekly "Big Muddy Dispatch" newsletter
- [ ] Install LinkStack for social profiles
- [ ] Set up Dub.co for link tracking

## Phase 3: Revenue (Month 3-6)
- [ ] Develop rate card and sponsorship pitch sheet
- [ ] Create bundle package one-pagers
- [ ] Approach 10 local businesses for founding sponsors (30-40% off)
- [ ] Launch Deep South Directory paid tiers
- [ ] Set up programmatic ad integration
- [ ] Launch community contributor program for magazine

## Phase 4: Growth (Month 4-8)
- [ ] Develop daypart-specific programming
- [ ] Launch guest DJ / volunteer program (target: 20-30 hosts)
- [ ] Install Coral for magazine article comments
- [ ] Set up visual radio (p5.js + Hydra + OBS)
- [ ] Establish partnerships (Chamber, tourism board, schools)
- [ ] Pursue grant funding (NEA, Knight Foundation, MS Humanities Council)
- [ ] Evaluate 501(c)(3) for radio station or cultural umbrella
- [ ] Consider LPFM license for FM signal + CPB funding

## Phase 5: Scale (Month 6-12)
- [ ] Build membership program ("Big Muddy Club")
- [ ] Create annual tentpole event (Music Issue, festival, or awards)
- [ ] Install Grafana unified dashboard
- [ ] Launch podcast feed via Castopod
- [ ] Set up SRS for live venue streaming
- [ ] Archive everything aggressively
- [ ] Aim for 10-20 regular paying sponsors
- [ ] Target Year 1 revenue: $75,000

---

# 12. CHASE'S VISION NOTES

*Captured from session on April 15, 2026:*

**"MySpace for Deep South Musicians"**
Chase envisions bands having their own radio stations on Big Muddy pages. Different bands could have their own station — maybe as a Big Muddy Touring or Big Muddy Label product. A platform to discover cool musicians in the Deep South, starting locally in Natchez and the Mississippi corridor.

This maps to:
- Multi-station support in AzuraCast (each artist/band gets a stream)
- Artist profile pages on the Next.js platform
- Per-artist analytics via Umami
- Integration with Big Muddy Record for label artists
- Discovery and curation model like early MySpace but for roots/Americana/blues

**Google Workspace Status:**
Google Workspace active on me@chasepierson.tv. The chase@farleypierson.com alias was down since December 2025 but has been reconnected. Google Chat integration to follow.

**Architecture Changes Coming:**
Chase indicated high-level business architecture tightening is imminent. Expect changes to affect multiple modules. All agents should document current state thoroughly before changes begin.

---

*Hillbilly Dreams Inc / Big Muddy Ecosystem — Natchez, Mississippi — April 2026*
