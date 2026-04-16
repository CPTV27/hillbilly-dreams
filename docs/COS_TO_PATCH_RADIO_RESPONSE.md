# COS → Patch — Response to Doc Pass Questions

*April 16, 2026*

---

## 1. Target File

The primary target is `docs/BUSINESS_ARCHITECTURE.md`. The touring subsection goes in there as well. Also read `docs/RADIO_STRATEGY_UPDATE.md` (new, created tonight) for the radio decision.

## 2. The Radio Decision — PHASED, NOT KILLED

**The 24/7 stream is NOT being shut down.** It's built, tested, SSL is live, AzuraCast is running. But it's not being promoted publicly yet.

**Phase 1 (now):** Big Muddy Radio = podcast + curated playlists
- Weekly podcast episodes (interviews, live sessions, Blues Room recordings)
- Curated playlists on Spotify/Apple Music/YouTube
- YouTube channel for video sessions and audiograms
- Zero SoundExchange overhead in this phase

**Phase 2 (triggered by sponsor or audience):** Flip to 24/7 streaming
- AzuraCast already configured
- 116 tracks ready in MelodyVault
- RadioPlayLog schema designed

**Language change:** Replace "24/7 radio stream" with "podcast + playlists (radio infrastructure built, activates with first sponsor)." Do NOT say "radio is dead" or "we pivoted away from radio." We didn't. We're phasing the rollout.

**Mac mini stack:** Everything stays running. OpenBroadcaster (:8080), Icecast (:8010) — all operational for content production and testing. Just not promoted publicly.

**Owner:** Chase (content production) + Amy (hosting/talent). Phase 2 sponsor acquisition is Chase's walk-in sales job.

## 3. Team Language

No change from established rules:
- Tracy and Amy = "equity partners" (never employees)
- JP Houston is OUT as of April 15 decisions — Entertainment Director role is OPEN (revenue partner structure)
- Chase = CEO/CTO/Showrunner
- Operator map: Chase sells tech/media daytime, Tracy runs finance/Inn/magazine, Amy runs Inn/bar/shows/radio

## 4. Sean Davis + Corridor Research Sprint

**Sean Davis** — former director of the Delta Blues Museum, current manager of Doug Duffey (Big Muddy Records artist). Chase wants to collaborate with him on Big Muddy Touring.

Sean's value: deep corridor relationships (Clarksdale, museum circuit, Delta blues network), artist management experience, institutional credibility. He knows every venue and promoter on the Delta circuit personally.

**Corridor Research Sprint cadence:**
- TinyFish batch runs across 7 cities (Natchez, Monroe, Jackson, Baton Rouge, St. Francisville, Alexandria, El Dorado)
- Weekly cycle: TinyFish venue research → Chase + Sean review results → outreach to venue contacts → booking pipeline
- Sean's scope: venue relationships, artist routing, Delta Blues Museum network connections
- Sean is a COLLABORATOR, not an employee or equity partner. Do not list him on org charts or public pages. Reference as "corridor partner" in internal docs.

## 5. Revenue Table — Add Owner Column + Podcast Line

Current rows + owners + podcast addition:

| Stream | Owner | Current | Y1 Target |
|--------|-------|---------|-----------|
| Inn (6 rooms) | Amy + Tracy | $3,000/mo | $7,500/mo |
| Bar | Amy | $2,000/mo | $4,000/mo |
| Shows / Events | Chase + Amy | $1,500/mo | $4,000/mo |
| Weddings | Tracy | $0 | $5,000/mo |
| DSD Subscriptions | Chase | $500/mo | $10,000/mo |
| **Podcast** | **Chase + Amy** | **$0** | **$2,000/mo** |
| Bundle Packages | Chase | $0 | $5,000/mo |
| Artist Packages | Chase (via Studio C) | $0 | $3,000/mo |
| Membership (Club) | Chase | $0 | $1,000/mo |

Podcast revenue model: sponsorship reads ($200-500/episode) + YouTube ad revenue + premium episodes behind membership wall.

## 6. Scorecard — Radio Row → Podcast Row

| Metric | Old (Radio) | New (Podcast) |
|--------|------------|---------------|
| Primary KPI | Concurrent listeners | Downloads per episode |
| Secondary | Play count | YouTube views |
| Weekly target | — | 1 episode published |
| Monthly target | — | 500 downloads, 1,000 YouTube views |
| Owner | Amy | Chase (production) + Amy (hosting) |

## QC Rules

Standard CLAUDE.md set applies. Additional for this doc:
- Never expose entity names (FarleyPierson, EINs) — this doc is shared with partners
- Pricing is Free/$25/$50/$99/$250 (locked April 5)
- Bundle pricing is $99/$199/$399/$599 (designed tonight)
- Use "podcast + playlists" not "radio" for Phase 1 public-facing language
- Use "radio infrastructure built, activates with first sponsor" for internal docs

---

*COS — ready for Patch to execute. Chase needs to answer the Sean question.*
