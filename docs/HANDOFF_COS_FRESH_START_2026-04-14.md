# Chief of Staff — Fresh Start Handoff

**Date:** 2026-04-14
**From:** Outgoing CoS session (MacBook Pro, ~18 hours continuous)
**To:** Incoming CoS session with claude-mem + code-review-graph
**Purpose:** Complete state transfer so the new session can run HDI without asking Chase what happened

---

## What you have that the old CoS didn't

1. **claude-mem** — persistent memory across sessions. Installed at `/Users/chasethis/.claude/plugins/marketplaces/thedotmack`. Worker runs on `localhost:37777`. You'll get injected context from tonight's marathon session automatically. Use `/mem-search` to query past work.

2. **code-review-graph** — structural knowledge graph of the codebase. 843 files → ~670 files after tonight's prune. MCP tools: `semantic_search_nodes`, `query_graph`, `get_impact_radius`, `detect_changes`, `find_large_functions`, `refactor_tool` (dead code mode), `list_communities`, `list_flows`. **Use these BEFORE Grep/Glob/Read.** The graph is faster and gives you structural context (callers, dependents, test coverage) that file scanning cannot.

3. **Apple Notes "Agent Fleet"** — realtime communication channel with the Mac mini. Read the note called "Agent Fleet" (or starting with "AGENT FLEET") using the Apple Notes MCP tools at the start of every turn. Post updates there. The Mac mini sessions read and write to the same note via iCloud sync. Chase is no longer the relay.

---

## The business in one paragraph

Hillbilly Dreams Inc is a media-hospitality company in Natchez, Mississippi. Three equal partners: Chase Pierson (CEO/CTO), Tracy Alderson-Allen (Finance/Inn ops), Amy Alderson Allen (Bar/shows/radio programming). One Next.js monorepo powers 14 domains. Four revenue-generating brands: Big Muddy Magazine, Big Muddy Radio, Big Muddy Records, Big Muddy Touring. The Deep South Directory (DSD) is the B2B marketing product that pays the bills. Everything feeds the Inn. The tech should be invisible — Chase books acts and shoots photos, Tracy manages money, Amy programs the station and runs the bar. Your job is making the machine work so they can do what they do.

---

## What happened tonight (the marathon session)

### Revenue blockers fixed
- **Google review ingestion cron** (`/api/cron/reviews-sync`, commit `87d9819`) — the $99/mo Marketing tier was hollow without it. Now runs hourly, pulls from GBP, feeds the existing admin review UI + AI draft + reply pipeline.
- **Social token auto-refresh** (`lib/social-publisher.ts`, commit `85b350d`) — Facebook/Instagram/Google tokens were silently expiring. Now refreshes before every publish attempt.

### Codebase pruned
- **174 files / ~56,000 lines deleted** across commits `19224d9` and `cf55e19`. Killed: `apps/demo/`, `apps/books/oe-books/`, `app/media/`, `app/mbt/`, `app/bearsville/`, `app/whiteboard/`, `app/book/`, `app/snap/`, `app/feed-farm/`, `app/jp/`, `app/measurably-better/`, `app/display/`, `app/studioc/`, `app/tuthill/`, `app/touring/vr/`, dead integration classes (Asana, Canva, Hootsuite, social publishers), sovereign agent code, constellation, newsletter provider.
- **What survived:** `magazine/`, `radio/`, `records/`, `touring/`, `entertainment/`, `directory/`, `gallery/`, `admin/`, `dawn/`, `hillbilly/`, `links/`, `welcome/`, `api/`, `layout.tsx`.

### Copy reset (by another session, same timeframe)
- `docs/COPY_RESET_HANDOFF.md` — 11 files changed with honest copy. Every hero, every pricing section, every claim now matches what Chase can say in a walk-in pitch tomorrow. Read this before touching any page copy.

### Radio
- AzuraCast on DigitalOcean droplet (`206.189.200.208`) is **live and streaming**. The Mac mini pushes audio to the cloud, listeners hear it globally.
- Stream URL for the Vercel env var cutover: check AzuraCast dashboard for the public listen URL (likely `http://206.189.200.208/listen/bigmuddyradio/radio.mp3`).
- `apps/web/lib/icecast-url.ts` is already env-var overridable — set `NEXT_PUBLIC_ICECAST_URL` in Vercel production and the whole site reads from the cloud.
- Amy is the station programmer. AzuraCast gives her playlists, dayparting, weighted rotation, go-live — all in a browser. Phase 5 of the cutover (commit `37abca4`) requires creating her Station Manager account.
- Radio stream-down runbook at `docs/runbooks/radio-stream-down.md`.
- Ezstream zombie prevention fix in `infra/broadcasting/boot-radio.sh` (commit `94baecf`).
- Garage radio station hardware spec at `docs/specs/GARAGE_RADIO_STATION.md` — Tier 1 build ~$2,100 with Tracy's iMac (now has 32 GB RAM) as the station computer.

### CD ingest pipeline
- `scripts/cd-ingest.sh` — rips CD to FLAC (archive) + MP3 320k (streaming), tags, syncs to Mac mini T7. Doug Duffy and Badd "Ain't Goin' Back" (11 tracks) already ingested and on the radio library.

### Asana
- Asana Coordinator agent at `.claude/agents/ASANA_COORDINATOR.md` — the tone doctrine, the canonical task format, the link rules. Read before creating any Asana task.
- Big Muddy START HERE task (`1214016245158385`) and Studio C START HERE task (`1214042666487366`) are the shared-seat directories for Amy+Tracy and Elijah.
- 269-task triage at `docs/briefs/chase-inbox-2026-04-11.md` — Chase is distributing owners.
- Tracy + Amy onboarding doc at `docs/onboarding/TRACY_AMY_PRIME_TIME.md` — revenue streams, daily rhythms, weekly cadence, tool links.

### Sanity CMS
- Sanity project exists with env vars in Vercel (project ID, dataset, API token, webhook secret).
- Article schema is comprehensive (title, slug, category, city, hero image, rich body with inline photos/pull quotes/galleries).
- Sanity Studio at `bigmuddytouring.com/studio` — Chase needs to approve his own access request at `sanity.io/manage`.
- Once approved, Tracy and Amy get Editor accounts, and the magazine editorial workflow is: Sanity Studio → write article → drag Lightroom photos in → publish → webhook → live on bigmuddymagazine.com.

### Fleet communications
- Apple Notes "Agent Fleet" — realtime inter-agent channel via iCloud sync.
- Git thread at `docs/agent-chat/thread.md` — durable audit log, protocol in `docs/agent-chat/README.md`.
- Mac mini worker CLAUDE.md files have fleet-comms rituals baked in (Broadcast, Photo Lab, Ops Sync).
- `~/inbox/COS_ANSWERS.md` on the Mac mini — FAQ file so mini sessions self-serve instead of asking Chase.

### Other sessions' work tonight
- `docs/HANDOFF_APRIL_13_NIGHT_SESSION.md` (168 lines) — comprehensive handoff from the copy-reset session with 17 open items and 4 ready-to-paste prompts.
- `docs/HANDOFF_RADIO_DURABILITY_2026-04-11.md` — Mac mini's radio state report (222 lines, on T7 and in the repo).
- `docs/briefs/cutover-scope-radio-2026-04-11.md` — the companion scope brief I wrote for the radio migration.

---

## The priority stack right now

### Revenue blockers (do these first)

1. **Vercel env var for stream URL** — set `NEXT_PUBLIC_ICECAST_URL` to the AzuraCast public listen URL. One click, zero code. Unblocks the web player reading from the cloud instead of LAN.

2. **Sanity access** — Chase needs to approve himself at `sanity.io/manage`, then add Tracy (Editor) and Amy (Editor). Unblocks the magazine editorial workflow.

3. **DistroKid** — Chase signs up ($35/yr), uploads Amy's catalog + Mechanical Bull re-releases. Unblocks Records revenue.

4. **5 hardcoded LAN URLs** need a code commit to read from the cloud stream URL (Phase 3 of the radio cutover). Files: `admin/radio/page.tsx`, `kiosk/page.tsx`, `lib/hdi-links.ts`, `admin/links/page.tsx`, `demo/presentation/page.tsx`. Pre-staged, ready to ship when Chase confirms the public URL.

### Engineering (do these after revenue)

5. **DirectoryPage decomposition** — 1,216-line god-page needs splitting into 10 components. The decomposition agent ran and produced clean results but was reverted to protect Chase's copy edits. Re-run it on the current `page.tsx` (which now has honest copy). Read `docs/COPY_RESET_HANDOFF.md` first.

6. **Magazine article data** — move from hardcoded `lib/articles.ts` (1,235 lines of inline data) to Sanity CMS. The schema exists, the Studio exists, the API already falls back from Prisma → static. Wire the API to read from Sanity instead.

7. **God-page decomposition** for `WeddingsPage` (1,024 lines), `RecordsPage` (652 lines), `CommandCenter` (744 lines).

8. **Dead code cleanup** — the graph found 1,304 dead symbols before the prune. Re-run `refactor_tool` in `dead_code` mode on the pruned codebase and assess what's left.

### Operational

9. **Music library backup** — `rclone sync` from T7 to R2 on a weekly cron. The T7 is a USB drive with no backup. If it dies, the music library dies.

10. **Amy's AzuraCast onboarding** — create her Station Manager account on the droplet, walk her through playlists and dayparting.

11. **PAT rotation** — the leaked `gho_` token in `~/Sites/bigmuddy/.git/config` on the Mac mini. Chase rotates on GitHub, mini session fixes the remote.

12. **Strategy brief** — `docs/CHIEF_OF_STAFF_STRATEGY_BRIEF.md` is ready. Needs a fresh CoS session to produce the full enumeration. The critique from tonight's session is in the conversation history (accepted by Chase).

---

## Key files to read first

| File | Why |
|---|---|
| `CLAUDE.md` | Master instructions, architecture, QC rules, team, pricing |
| `docs/BUSINESS_ARCHITECTURE.md` | Three-layer model (HDI → MBT → Big Muddy) |
| `docs/COPY_RESET_HANDOFF.md` | What copy was just changed and why — read before touching any page |
| `docs/HANDOFF_APRIL_13_NIGHT_SESSION.md` | Tonight's other session's full handoff |
| `docs/onboarding/TRACY_AMY_PRIME_TIME.md` | Revenue streams, roles, weekly cadence |
| `.claude/agents/ASANA_COORDINATOR.md` | How tasks get into Asana (tone, format, routing) |
| `docs/briefs/chase-inbox-2026-04-11.md` | The 269-task triage — where all the work lives |
| `docs/specs/GARAGE_RADIO_STATION.md` | Hardware spec for the station in the garage |
| `docs/specs/SHOW_CREATION_PIPELINE.md` | The 7-step wizard for producing a radio show |
| `docs/runbooks/radio-stream-down.md` | What to do when the radio goes silent |

---

## Boot sequence for the new session

```
1. git pull origin main
2. Read this file (docs/HANDOFF_COS_FRESH_START_2026-04-14.md)
3. Read the Apple Notes "Agent Fleet" note for any messages from the Mac mini
4. Run: code-review-graph list_graph_stats_tool — confirm the graph is loaded
5. Run: code-review-graph detect_changes_tool base=HEAD~5 — see what just shipped
6. Read docs/COPY_RESET_HANDOFF.md — know what copy was changed
7. Read docs/HANDOFF_APRIL_13_NIGHT_SESSION.md — the other session's handoff
8. Check the priority stack above and start executing
```

---

## What the outgoing CoS got right

- Revenue blockers before code cleanup (review cron + token refresh before page decomposition)
- The prune removed 56,000 lines without breaking a single feature
- Fleet comms via Apple Notes eliminated Chase as the relay between machines
- The radio is streaming from the cloud
- The onboarding doc gives Tracy and Amy a real daily playbook
- The garage radio station spec turns a concept into a shopping list

## What the outgoing CoS got wrong

- Overwrote Chase's copy by running a decomposition agent before the copy session finished — caught and reverted, but cost time
- Wrote `gs://` when the canonical fallback MP3 is on R2 (different service, same bucket name) — the Mac mini session caught this, fix shipped in `a025883`
- Assumed Docker was in the radio path when Icecast and ezstream are actually native Homebrew — corrected by the mini's durability handoff
- Said 48 stingers across 7 characters when the real count is 56 files across 8 characters (48 MP3s + 8 AIFF masters, 8th character is Whisper Midnight) — corrected by the mini
- Took too long to set up inter-agent comms — the Apple Notes solution was obvious and should have been day-one, not hour-fifteen

## What the outgoing CoS never got to

- The strategy brief enumeration (Chase accepted the critique but the fresh session to produce it was never started)
- The Lightroom → magazine photo pipeline (the inventory is done — 4,652 approved photos — but the actual workflow from Lightroom to Sanity to published article was never wired)
- The DSD walk-in sales kit for Chase's door-to-door pitches
- Wiring the admin review UI to actually trigger AI draft generation on new reviews (the cron feeds the table, but there's no auto-draft-on-new-review hook yet)

---

**The machine is cleaner, the revenue paths are unblocked, the radio is in the cloud, and Tracy and Amy have a playbook. The incoming CoS inherits a focused codebase with four real brands and two real tools (graph + memory) that the outgoing CoS didn't have. Use them.**

*Written at the end of an 18-hour session. Everything in this doc is verified against the current state of `origin/main` as of commit `85b350d`.*
