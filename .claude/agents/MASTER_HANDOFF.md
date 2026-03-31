# Master Agent Handoff — Read This First

**Every agent on every machine reads this before doing anything.**

## Who We Are

Hillbilly Dreams Inc — a media-hospitality ecosystem in Natchez, Mississippi. 15 live domains from one codebase. Hotel, music venue, magazine, radio station, directory, art gallery, photography studio, economic philosophy platform.

## Credentials & Secrets

**Bitwarden is the source of truth for ALL credentials.** No exceptions.

- Bitwarden is installed on both machines (MacBook Pro + Mac mini)
- CLI: `bw` command — if not found, install with `brew install bitwarden-cli`
- Before creating any new API key, credential, or secret: CHECK BITWARDEN FIRST
- After creating any new credential: PUT IT IN BITWARDEN
- Never hardcode secrets in code. Use environment variables.
- Vercel env vars are the deployment source. Bitwarden is the master store.

## Machines

| Machine | IP | User | SSH | Role |
|---|---|---|---|---|
| MacBook Pro | local | chasethis | — | Development, code, deployment |
| Mac mini | 192.168.4.37 | ClawdBOT | `ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37` | Broadcasting, Plex, services |

## Key Services (Mac Mini)

| Service | Port | URL |
|---|---|---|
| OpenBroadcaster | 8080 | http://192.168.4.37:8080 (admin/bigmuddy2026) |
| Icecast | 8010 | http://192.168.4.37:8010 |
| Plex | 32400 | http://192.168.4.37:32400 |
| Postiz | 4007 | http://192.168.4.37:4007 |
| Open Notebook | 5055 | http://192.168.4.37:5055 |

## Live Domains

bigmuddytouring.com, bigmuddymagazine.com, bigmuddyradio.com, bigmuddyentertainment.com, deepsouthdirectory.com, measurablybetter.life, outsidereconomics.com, buycurious.art, hillbillydreamsinc.com, bigmuddyrecord.com, tuthilldesign.com, studiocvideo.com

## Team

| Person | Role | Email |
|---|---|---|
| Chase Pierson | CEO, CTO, Showrunner | me@chasepierson.tv |
| Tracy | Business & Finance (equity partner) | tracyaldersonallen@gmail.com |
| Amy | Inn & Bar Ops (equity partner) | amyaldersonallen@gmail.com |
| JP Houston | Shows & Programming | jphoustonlives@gmail.com |

## AI Model Routing

| Role | Primary | Fallback |
|---|---|---|
| Reasoning | Gemini 3.1 Pro | Claude Sonnet |
| Generation | Gemini 2.5 Flash | Claude Haiku |
| Search | Perplexity | Gemini Flash |
| Images | Vertex AI Imagen 3 | — |
| Video | Veo 3.1 (Fast/Premium) | — |
| Audio | Cloud TTS Journey | — |

API keys in Vercel: ANTHROPIC_API_KEY, PERPLEXITY_API_KEY, GOOGLE_APPLICATION_CREDENTIALS_JSON

## QC Rules (Hard Requirements)

- **No hardcoded fonts** — use `var(--font-body)` or `var(--font-display)`
- **No hardcoded colors** — use CSS custom properties
- **No hardcoded model names** — import from `lib/ai-models.ts`
- **No tech jargon** on customer-facing pages
- **Illustrations must be diverse** — mix of races, ages, genders
- **No high-tech imagery** — Main Street, not Silicon Valley
- **No wide AI maps** — zoom tight or use real maps
- **AI generates art, Canva handles typography** — never let AI put text in images
- **MBT = Measurably Better Things** — never "MB"
- **Tracy and Amy are equity partners** — never employees
- **Bitwarden for all secrets** — no exceptions
- **Verify deploys** — CI passing ≠ deployed. Check live URLs.

## Key Files

| File | What |
|---|---|
| `.claude/agents/ORIGIN_STORY.md` | The narrative — DeFacto Codec Market to Big Muddy |
| `.claude/agents/BRAND_NARRATIVE_OVERHAUL.md` | Value props, voice, copy rules |
| `.claude/agents/BROADCASTING_CAPABILITIES.md` | Full radio/broadcasting stack |
| `memory/feedback_chase_voice.md` | Chase's writing voice (living doc) |
| `memory/feedback_qc_policy.md` | Full QC rules |
| `memory/feedback_ai_model_routing.md` | AI model routing with failover |
| `memory/project_mbt_pricing_tiers.md` | Pricing: Free / $20 / $49 / $99 |
| `lib/ai-models.ts` | Multi-provider routing code |
| `lib/imagen.ts` | Vertex AI image generation |
| `config/domain-routes.ts` | Hostname → route mapping |

## The Origin Story (One Paragraph)

Chase designed a complete media production-to-distribution pipeline in 2022 (the DeFacto Codec Market). It was global media infrastructure — broadcast, production, analytics, distribution — built on open source tools. He realized the same architecture that runs a Viacom can run a small-town media economy. Big Muddy is that architecture, applied to Main Street, powered by AI, anchored in the Mississippi corridor. The gap isn't technology — it's organization. That's what we sell.
