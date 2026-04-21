# State of Everything — TEMPLATE

**Cadence:** Twice-weekly default — Monday (kickoff) + Thursday (midweek pulse). Ad-hoc daily during high-velocity weeks or when a major change lands. Every snapshot lands in `docs/state-of-everything/YYYY-MM-DD.md` and gets committed to the canonical repo.

**Purpose:** One document that anyone (Chase, Tracy, Amy, Elijah, Miles, accountant, counsel) can open to know the current state of the ecosystem in ~3 minutes. Rolls up infrastructure + content + agents + people + Asana + decisions + risks. Living record — every snapshot is a fresh file so we can diff across time.

**How to use this template:**
1. Copy this file to `docs/state-of-everything/YYYY-MM-DD.md` (today's date)
2. Fill in every section. If a section is unchanged from the last snapshot, write "unchanged from YYYY-MM-DD" + link to prior. Don't skip.
3. Keep it scannable. Bullet points over prose. Link out to canonical docs for detail, don't re-explain.
4. Commit to both `hillbilly-dreams` and `measurably-better-things` repos.
5. Regenerate `.docx` for Drive archive: `pandoc YYYY-MM-DD.md -o YYYY-MM-DD.docx`
6. Drop into Google Drive `State of Everything` shared folder so Tracy + Amy see it.

---

## Snapshot metadata

- **Date:** YYYY-MM-DD
- **Snapshot #:** N
- **Author:** Cos (with Chase input)
- **Time since last snapshot:** Xd Yh
- **Trigger:** scheduled / ad-hoc / major change
- **Previous snapshot:** [YYYY-MM-DD](./YYYY-MM-DD.md)

---

## 1. Executive summary (3 bullets)

- **What's working:** one-line
- **What's changing this week:** one-line
- **What needs attention:** one-line flag on biggest open risk / blocker

---

## 2. Infrastructure state

### Production hosts

| Host | Status | Key services | Notes / incidents |
|---|---|---|---|
| Vercel (chasepierson.tv) | ✅ / ⚠️ / 🔴 | Next.js app + 14 domains | |
| Hetzner CCX23 `bigmuddy-services` | ✅ / ⚠️ / 🔴 | Immich + Caddy | Disk used X/160 GB |
| DigitalOcean `bigmuddy-radio` | ✅ / ⚠️ / 🔴 | AzuraCast stream | Stream up? |
| GCP `bigmuddy-ff651` | ✅ / ⚠️ / 🔴 | Vertex AI + GCS + Cloud SQL | |
| Neon Postgres HDI | ✅ / ⚠️ / 🔴 | App DB | |
| Sanity | ✅ / ⚠️ / 🔴 | CMS | |
| Mac mini | personal / dormant / other | Workstation (not services) | |

### Key live URLs

- Site: https://bigmuddytouring.com
- Radio stream: https://stream.bigmuddytouring.com/listen/bigmuddyradio/radio.mp3
- Immich: https://immich.hillbillydreamsinc.com
- Photo slideshow (latest): https://storage.googleapis.com/bmt-media-bigmuddy/review/2026-04-18-slideshow/index.html
- Sanity Studio: bigmuddytouring.com/studio (or direct manage.sanity.io)
- GitHub: https://github.com/CPTV27/measurably-better-things

### Subscription pulse

- Total MBT-paid spend (current month): $X / $1,000 cap
- New subscriptions added since last snapshot:
- Cancellations since last snapshot:
- Canonical reference: [`docs/ecosystem-subscriptions-2026-04-20.md`](../ecosystem-subscriptions-2026-04-20.md)

---

## 3. Content + assets

### Photography

- GCS `bmt-media-bigmuddy/approved/`: N photos curated
- GCS `bmt-media-bigmuddy/review/`: latest session date + count
- T7 workspace: N RAWs + N XMP sidecars + N sessions clustered
- Hetzner Immich: N assets seeded
- Synology: status
- Most recent gallery/slideshow URL:

### Music

- Neon DB tracks: N
- Neon DB splits: N
- Big Muddy Radio Library tracks: N (% with full ID3)
- Recent ingests:

### Video

- SnapCam clips processed: N
- Show/event recordings:

---

## 4. Agents state

| Agent | Host | Status | Last active | Handoff notes location |
|---|---|---|---|---|
| Cos (Chief of Staff) | MacBook | ✅ live | ongoing | Apple Notes + this repo |
| Patch (Technical Director) | Mac mini | ✅/dormant | | Apple Notes |
| Delta Dawn (Big Muddy Inn assistant) | Cloudbeds API + Siri + GChat | ✅/? | | |
| Chuck | GChat | ?/audit needed | | |
| Huck (Agent Desk) | GChat + Cloudflare API | ?/audit needed | | |
| Ledger | GChat | ?/audit needed | | |
| Tracy's agent (Claude Pro) | Tracy's account | not yet activated | | |
| Amy's agent (Claude Pro) | Amy's account | not yet activated | | |

---

## 5. Partners + people (this week)

### Chase Pierson
- Location:
- Focus:
- Open P0:

### Tracy Alderson-Allen
- Focus:
- Open P0:

### Amy Allen
- Focus:
- Open P0:

### Miles Dubois (Studio C)
- Focus (within $500/mo INN/MAG + $500/mo TOUR accounts):
- Open P0:

### Elijah Davis (Tuthill Design)
- Focus:
- Open P0:

---

## 6. Asana summary

- Project: `Big Muddy — Partner Onboarding (April 2026)` — https://app.asana.com/1/1211216881488780/project/1214143246291054
- Total open tasks: N
- Due this week: N
- Blocked / on hold: N
- Completed since last snapshot: N

### P0 this week

1.
2.
3.

---

## 7. Recent decisions (since last snapshot)

- YYYY-MM-DD — decision → doc ref
-

---

## 8. Risks / open questions

| Risk | Severity | Owner | Status |
|---|---|---|---|
| | | | |

---

## 9. Financial pulse

- **Y1 progress:** $X revenue toward $250k first-profit milestone, $330k baseline
- **May 1 FY start distance:** N days
- **Current-month subscription spend:** $X / $1,000 cap
- **Big purchases / commits this snapshot:**
- **Accountant engagement status:** engaged / pending / not yet

---

## 10. Next checkpoint

- **Next snapshot due:** YYYY-MM-DD (Mon/Thu cadence)
- **Unscheduled trigger would be:** describe what event would force an ad-hoc snapshot before then (e.g. "major partner sign-up, infrastructure change, >$100 unplanned spend")

---

*End of snapshot.*
