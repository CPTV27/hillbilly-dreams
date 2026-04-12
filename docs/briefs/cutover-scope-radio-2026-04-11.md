# Cutover Scope — Radio Durability Migration

**Date:** 2026-04-11
**Author:** CoS (MacBook Pro session)
**Status:** Pre-compiled companion to the pending `HANDOFF_RADIO_DURABILITY_2026-04-11.md` from the Mac mini agent. Written while the mini works, so the moment its draft lands we can merge the two without duplicating research.

---

## What's already decided (reference docs, not new thinking)

The cloud migration is NOT a new plan. It was specified on April 9 and parts of it are already in motion.

| Doc | What it establishes |
|---|---|
| `docs/HANDOFF_MAC_MINI_RADIO.md` | **Canonical plan.** AzuraCast on a $6/mo DigitalOcean droplet. Mac mini stays as the automation source and pushes OUT to the droplet via Icecast source protocol. Cloudflare Tunnel explicitly rejected as a ToS violation for sustained media streams. |
| `docs/DEMO_RADIO_TV_PREP.md` | **Execution checklist.** Droplet provisioned at `206.189.200.208`. `stream.bigmuddytouring.com` DNS already points at the droplet (gray cloud). Fallback MP3 path is `bmt-media-bigmuddy/radio/fallback-loop.mp3 (R2 bucket — note: same name as the GCS photo bucket, different service)`. |
| `docs/BROADCASTING_CAPABILITIES.md` | **Current on-mini state.** OpenBroadcaster + OB DB + Icecast containers via Docker on Colima (now Docker Desktop). 18 scheduled shows, 7 DJ characters. |
| `docs/specs/SHOW_CREATION_PIPELINE.md` | Show-creation wizard targets OpenBroadcaster API/DB directly. **This stays valid** because OB stays on the mini post-cutover. |
| `docs/EXTERNAL_ARCHITECTURE_REVIEW.md` | Earlier review that mentioned Cloudflare Tunnel as an option (L379). That option was later rejected in `HANDOFF_MAC_MINI_RADIO.md`. Older, superseded. |

**The mini agent's current handoff doc should report execution state against this plan, not re-plan from scratch.**

---

## Current architecture (reality, before cutover)

```
┌─────────────────────────────────────────────────────────────┐
│  Mac mini (ClawdBOT @ 192.168.4.37)  ─────────────── LAN    │
│                                                              │
│  [OpenBroadcaster Server]  ── writes playlist ─▶ [Icecast]  │
│       port 8080                                  port 8010  │
│                                                      │       │
│  [ezstream + flat M3U]  ── also writes to ──────────┘       │
│       ~/broadcasting/                                        │
│                                                              │
│  [Plex] 32400   [Postiz] 4007   [Open Notebook] 5055         │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ only LAN listeners (Inn kiosk, Chase)
                          ▼
                 [ffplay, VLC, browsers]
```

Two source chains racing for the same `/stream` mount (ezstream flat playlist **and** OpenBroadcaster scheduled automation). Tonight's "multiple ezstream zombies competing for the mount" incident is the direct symptom of this duality. **The cutover should resolve the duality** — pick one source chain, retire the other.

---

## Target architecture (post-cutover, per April 9 plan)

```
┌──────────────────────────────────────────────┐
│  Mac mini (ClawdBOT @ 192.168.4.37)          │
│                                              │
│  [OpenBroadcaster Server]                    │
│        │                                     │
│        ▼                                     │
│  Icecast Source Client                       │
│        │                                     │
└────────│─────────────────────────────────────┘
         │ push (encrypted if possible)
         ▼
┌──────────────────────────────────────────────┐
│  DigitalOcean Droplet ($6/mo)                │
│  206.189.200.208                             │
│                                              │
│  [AzuraCast]                                 │
│   ├── Icecast (public, SSL)                  │
│   ├── Fallback mount ──▶ R2: fallback-loop.mp3 │
│   ├── Now Playing API                        │
│   └── Listener stats                         │
└──────────────────────────────────────────────┘
         │                              ▲
         │                              │
         ▼                              │ read-only
 stream.bigmuddytouring.com              │
         │                              │
         ▼                              │
 Listeners worldwide                 [Mac mini's own]
 (Inn kiosk, web player,             [FM transmitter]
  bigmuddyradio.com, FM)             [pulls the public stream]
```

**The mini stays local and private.** The only public surface is the droplet. When the mini crashes, the droplet's fallback mount takes over and listeners never hear silence.

The mini's FM transmitter at 99.7 MHz (Part 15, unlicensed) continues to pull the public stream from the droplet and relay it to the transmitter. If the mini loses internet, the FM chain goes silent — but that's a smaller failure domain than the current everything-fails-together setup.

---

## Hardcoded LAN URLs in the repo (full inventory from grep pass)

### 🟢 Already env-var-overridable — nothing to change if env vars are set in Vercel

| File | How | Action |
|---|---|---|
| `apps/web/lib/icecast-url.ts` | `NEXT_PUBLIC_ICECAST_URL` or `NEXT_PUBLIC_STREAM_URL` (default `http://192.168.4.37:8010/stream`) | **Set env var in Vercel to `https://stream.bigmuddytouring.com/stream`. Done.** |
| `apps/web/lib/obs-client.ts` | `OPENBROADCASTER_URL` (default `http://192.168.4.37:8080`) | Leave as-is. OB stays on mini post-cutover. |
| `apps/web/lib/plex-client.ts` | `PLEX_HOST` (default `http://192.168.4.37:32400`) | Leave as-is. Plex stays on mini. |

**The single action to cut over the public listener experience is one Vercel env var.** Everything that imports `getIcecastStreamUrl()`, `getIcecastBaseUrl()`, or `getIcecastStatusJsonUrl()` — including `/api/radio/now-playing` — reads through this helper.

### 🟡 Hardcoded — needs code change (all runtime, all `192.168.4.37:8010`)

| File | Line | Context | Fix |
|---|---|---|---|
| `apps/web/app/admin/radio/page.tsx` | 7–8 | `OB_HOST` + `ICECAST_HOST` constants at top of file. Admin radio dashboard. | Refactor to `getIcecastBaseUrl()` + env-driven OB URL. |
| `apps/web/app/kiosk/page.tsx` | 114 | Inn kiosk link tile for Big Muddy Radio | Change to `https://stream.bigmuddytouring.com` |
| `apps/web/lib/hdi-links.ts` | 279 | Admin link catalog — Icecast entry | Change or mark as LAN-only |
| `apps/web/app/admin/links/page.tsx` | 121 | Admin links page | Change or mark as LAN-only |
| `apps/web/app/demo/presentation/page.tsx` | 26 | Demo presentation slide | Change (low priority, demo-only) |

### 🟢 Hardcoded LAN URLs that SHOULD stay LAN (leave alone)

These are deliberately LAN-only and should NOT be changed:

- `apps/web/lib/hdi-links.ts:267,273` — Big Muddy TV (`:8888/tv`, `:8888/kiosk`). The TV stream doesn't leave the mini.
- `apps/web/lib/hdi-links.ts:285,291,297` — OpenBroadcaster admin (`:8080`), Postiz (`:4007`), Open Notebook (`:5055`). All LAN-only admin surfaces.
- `apps/web/app/kiosk/page.tsx:134,144,154` — Plex, Postiz, Open Notebook link tiles. LAN kiosk, LAN services.
- `apps/web/app/admin/links/page.tsx:120,122,123,124` — admin catalog entries for OB, Plex, Postiz, Open Notebook. Admin-LAN only.
- `apps/web/public/amy-orientation.html:222` — **intentional educational copy** explaining to Amy what LAN-only means. Don't touch.
- `apps/web/app/api/studio-c/plex/route.ts:6` — comment documenting that Plex is LAN-only. Don't touch.

### 🟡 Documentation with hardcoded LAN URLs (update for accuracy post-cutover, not blocking)

These are informational. They'll need a sweep after the cutover lands, but they don't block runtime.

- `CLAUDE.md` (master instructions — services table)
- `docs/runbooks/broadcasting.md` (9+ references — the ops runbook)
- `docs/OPERATIONS_MANUAL.md` (4 references)
- `docs/BROADCASTING_CAPABILITIES.md` (2 references to `localhost:8010` inside container — still valid)
- `docs/onboarding/TECHNICAL_ARCHITECTURE_ONBOARDING.md` (5 references)
- `apps/manual/docs/reference/fleet-registry.md` (2 references)
- `apps/manual/docs/setup/ipad.md` (2 references)
- `docs/ops/APPLE_ECOSYSTEM_ONBOARDING.md` (6 references)
- `.claude/agents/IMAC_TRACY_SETUP_PROMPT.md` (6 references)
- `.claude/agents/AMY_COMPUTER_SETUP_PROMPT.md` (1 reference)
- Many session handoffs and reports in `docs/briefs/` and `docs/reports/` — historical, don't touch

---

## The phased cutover (what actually happens)

### Phase 0 — Verification (the Mac mini agent's current handoff answers these)

Before any code changes, the mini agent's durability handoff should confirm:

1. **Is the droplet alive?** `curl http://206.189.200.208` should return an AzuraCast landing page. If 404 or timeout, droplet is gone and Chase needs to re-provision.
2. **Is AzuraCast set up?** Station "Big Muddy Radio" created, Icecast source password set, mount `/stream` configured.
3. **Is DNS live?** `dig stream.bigmuddytouring.com` should return the droplet IP (or a Cloudflare edge IP if the orange cloud is back on).
4. **Does `stream.bigmuddytouring.com` return audio from an external network?** (Test from cellular, not LAN.)
5. **Is the R2 fallback MP3 uploaded?** `gsutil ls bmt-media-bigmuddy/radio/fallback-loop.mp3 (R2 bucket — note: same name as the GCS photo bucket, different service)`
6. **Is AzuraCast's fallback mount pointed at the R2 URL?** Check the AzuraCast station config.
7. **Is OpenBroadcaster on the mini already pushing to the droplet, or is it still only feeding local Icecast?**

The mini's handoff should answer all 7 with evidence (command + output).

### Phase 1 — The mini actually pushes (if Phase 0 shows it's not yet)

Per the April 9 plan (`HANDOFF_MAC_MINI_RADIO.md` step 2):

1. OB Server admin → Output settings → add Icecast source client target
2. Host `206.189.200.208`, Port `8000`, Password from AzuraCast wizard, Mount `/stream`, Format MP3 128 kbps
3. Start playback
4. Verify AzuraCast dashboard shows the source connected

**Only the mini agent can do this step** — it requires access to the OB admin UI on the mini.

### Phase 2 — The site reads from the cloud (single env var change)

Once Phase 1 is confirmed (audio flowing to the droplet and reachable externally):

1. Vercel env var: `NEXT_PUBLIC_ICECAST_URL=https://stream.bigmuddytouring.com/stream` on production
2. Also Preview and Development if we want consistent behavior across envs
3. Redeploy production
4. Verify the `/radio` page on `bigmuddytouring.com` plays audio
5. Verify the `/api/radio/now-playing` endpoint returns metadata from AzuraCast's `/api/nowplaying/1`

**This is a ~30 second Vercel change from the MacBook.** Zero code commits required for this phase.

### Phase 3 — Fix the 5 hardcoded runtime offenders

Single PR, five small diffs:

1. `apps/web/app/admin/radio/page.tsx` — replace `ICECAST_HOST` constant with `getIcecastBaseUrl()`, replace `OB_HOST` with env-driven value or leave if OB stays local
2. `apps/web/app/kiosk/page.tsx:114` — change link to `https://stream.bigmuddytouring.com`
3. `apps/web/lib/hdi-links.ts:279` — change Icecast entry URL to public
4. `apps/web/app/admin/links/page.tsx:121` — change Icecast entry URL to public
5. `apps/web/app/demo/presentation/page.tsx:26` — change or delete (low priority)

Commit message: `fix(radio): route public Icecast references through stream.bigmuddytouring.com`

### Phase 4 — Failure mode verification

1. On the mini: stop OpenBroadcaster container for 60 seconds
2. On external listener: verify fallback MP3 starts playing within ~15 seconds (AzuraCast detects source drop and switches)
3. On the mini: restart OpenBroadcaster
4. On external listener: verify source reconnects and live audio resumes

### Phase 5 — Documentation sweep (non-blocking, can run asynchronously)

Update the ~20 informational docs listed above to reference `stream.bigmuddytouring.com` as the public URL, while keeping the LAN-only URLs for services that stay on the mini (OB admin, Plex, Postiz, Open Notebook). This sweep is cosmetic and can happen a day later.

---

## Open questions the mini's handoff must resolve

These are things I can't verify from the MacBook and the mini's draft should answer:

1. **Is droplet `206.189.200.208` still alive and running AzuraCast?** If the droplet is gone, the $6/mo bill was cancelled, or it was never fully set up, this is the actual blocker and Chase needs to re-provision.
2. **What is the Icecast source password on the AzuraCast station?** The mini needs this to configure OB's push. The password lives either in Chase's head, in Bitwarden, or in the AzuraCast UI. If none of the above, re-run the wizard.
3. **Does the R2 fallback MP3 exist at `bmt-media-bigmuddy/radio/fallback-loop.mp3 (R2 bucket — note: same name as the GCS photo bucket, different service)`?** If not, the mini should create it from the Plex library or the `~/broadcasting/` music.
4. **Is AzuraCast's fallback mount actually configured to pull from the R2 URL?** This is done in the AzuraCast station settings, not on the mini.
5. **Is OpenBroadcaster currently configured to push to the droplet?** If yes, the cutover is already half done. If no, the mini does Phase 1 now.
6. **What's the current state of ezstream?** Is it also pushing to the droplet (bad — conflicts with OB as a source), still running locally, or disabled? **The duality needs to die.** My recommendation (for the mini's handoff to endorse or reject): **OpenBroadcaster is the canonical source post-cutover; ezstream gets retired.** But the mini has more context on why ezstream was set up in the first place and should flag if retiring it breaks anything.
7. **What's the fallback for when the droplet itself goes down?** DigitalOcean SLA is ~99.9%. For higher availability we'd need multi-region. At $6/mo that's not the right budget. But we should explicitly acknowledge the single-point-of-failure on the droplet and decide the tolerance.
8. **FM transmitter chain post-cutover.** The Part 15 FM transmitter at 99.7 MHz reads audio from... where? Before the cutover it reads from local Icecast on the mini. After the cutover, does it still read local Icecast (which means the mini needs to also play the stream locally for the FM chain to work), or does it read from `stream.bigmuddytouring.com`? The mini's handoff should spell this out.

---

## What I'm holding until the mini's draft lands

- Phase 2 (Vercel env var change) — won't execute without Chase's go and without Phase 0 verification
- Phase 3 (the 5-file commit) — pre-staged in my head, ready to write when Chase says go
- Documentation sweep — non-blocking

**I am NOT going to touch the mini's turf.** No SSH to verify the droplet, no curl of AzuraCast, no modifications to OB config. The mini owns that.

---

## Ready-to-merge outline

When the mini's `HANDOFF_RADIO_DURABILITY_2026-04-11.md` lands, the merged doc will have:

1. TL;DR (from the mini — "what's the plan in plain English")
2. Reference docs (from this brief — "the April 9 plan is canonical")
3. Current architecture diagram (from this brief)
4. Target architecture diagram (from this brief)
5. **Phase 0 verification results** (the mini — the 7 questions answered)
6. **Proposed source-of-truth resolution** (the mini — OB vs ezstream duality)
7. **Budget + durability target** (the mini)
8. Cutover phases 1–5 (from this brief, refined by the mini's state)
9. Cutover scope: hardcoded URL inventory (from this brief)
10. Open questions for Chase (from the mini + this brief merged)

**The mini's draft fills in the gaps I can't verify. This brief fills in the repo-side facts the mini can't grep.** Together they're complete.

---

**File:** `docs/briefs/cutover-scope-radio-2026-04-11.md`
**Status:** Standing companion. Await mini draft to merge.
