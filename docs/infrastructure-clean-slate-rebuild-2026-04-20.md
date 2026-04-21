# Infrastructure Clean-Slate Rebuild

**Date:** April 20, 2026 (evening — decided during the mini-shutdown emergency when discovery revealed nothing was actually running)
**Decision by:** Chase
**Rule:** Tear down everything tied to local/undocumented infrastructure. Rebuild on fully managed cloud services. No legacy corruption — nothing from the old state carries forward unless it's verified correct.

---

## 1. Why this pivot

The 4-week and emergency migration plans were both premised on there being live services + data on the Mac mini. Discovery tonight revealed:

- **Zero Docker containers running** on the mini
- **Immich data dir is 8KB** — just a `docker-compose.yml`, no actual photo archive (photos already live in GCS `bmt-media-bigmuddy`)
- **Postiz** is scaffolded on the T7 external drive (100% inode usage) — not a healthy host
- **OpenBroadcaster** source code is cloned but no active radio deployment
- **Hetzner box** exists at `5.161.61.151` per the mini's `known_hosts` but:
  - MacBook SSH key is rejected (known issue since Apr 17)
  - Mini can't TCP-connect to port 22 (firewalled or rebuilt since)
  - Zero documentation in the canonical repo about specs, access, or purpose
- **Mac mini data volume is 96% full** — not a viable backup target for anything new anyway

Translation: we have been planning migrations for services that weren't actually running. The correct move is to tear down both the mini's broken scaffolding AND the black-box Hetzner box, and rebuild on cloud infrastructure with documented setup.

---

## 2. Clean-slate principles

1. **Nothing lives on a local computer.** No Mac mini, no MacBook-dependent services. If the laptop dies or gets stolen during the NY drive, zero business infrastructure is lost.
2. **Nothing lives on an undocumented black-box VM.** If we end up needing Hetzner again, it gets provisioned fresh with a runbook committed to the repo before any production workload lands on it.
3. **Managed services first.** Every capability we need should go on a hosted SaaS or serverless platform unless there's a specific operational reason to self-host.
4. **Domain ownership audited.** Every domain gets confirmed against the 14-domain canonical list. Anything not needed gets parked or cancelled.
5. **Legacy accounts retired cleanly.** Scan2Plan, FarleyPierson, Ardent, and other deprecated-brand accounts get officially closed so they can't silently drift or leak.
6. **No corruption carryover.** No half-migrated DBs. No Docker volumes full of stale state. No "I think this container was running something." Fresh installations with declarative configuration from day one.

---

## 3. Target architecture — what runs where

### Already correct (keep as-is)

| Capability | Platform | Status |
|---|---|---|
| Next.js application (bigmuddytouring.com + 13 other domains) | **Vercel** | Live, working, documented |
| Postgres DB | **Neon** | Live, working |
| CMS | **Sanity** | Live, working |
| Photo library canonical storage | **GCS `bmt-media-bigmuddy`** | Live, working, holds 229+ curated photos |
| DNS | **Cloudflare** | Live, working |
| Email routing | **Cloudflare Email Routing** (for deprecated Workspace domains) + Google Workspace chasepierson.tv (primary) | Live |
| Code repo | **GitHub** (both hillbilly-dreams + measurably-better-things) | Live |
| Transactional email | **Resend** | Live |
| Podcast hosting | **Buzzsprout** | In the subs plan |
| AI stack (Claude, Gemini, OpenAI, ElevenLabs) | API-based, cloud | Live |
| CRM | **Attio** (free tier for now) | Live |
| Tasks | **Asana** | Live |
| Password management | **Bitwarden** | Live (when unlocked) |
| Classifier + expense taxonomy | Docs in the repo | Documented |
| Partner agent assistants | **Claude Pro × 2** (Tracy, Amy) | Planned — activate Week 1 |

### To replace (was planned on mini/Hetzner; now hosted)

| Need | Replacement | Monthly | Notes |
|---|---|---|---|
| Social post scheduling | **Buffer Business** or **Later Starter** | $15–25 | Cancel Postiz. Fresh account on the MBT card with Elijah as admin. |
| Radio broadcasting (Big Muddy Radio) | **Radio.co** (Standard) or **Live365** (Broadcaster) | $21–39 | Fresh playlist setup by Amy when she has capacity. Big Muddy Radio goes dark ~2 weeks until then. Not a Y1 revenue line anyway. |
| Photo archive UI (if desired — optional for Y1) | **Immich Cloud** (managed hosted Immich) OR defer | $0–30 | Not critical. GCS bucket + Lightroom workflow already covers Chase's photo ops. Revisit Q3 if a partner actually needs a gallery UI. |
| Shared knowledge notebook | **Claude Projects** (inside each partner's Claude Pro) | $0 incremental | Replaces self-hosted Open Notebook. Projects on Claude Pro allow shared context + custom instructions + source documents. The 3-notebook spec (Inn Ops, Touring Ops, Everything) moves to Claude Projects on Chase's Max + each partner's Pro. |
| Cron / scheduled jobs | **Vercel Cron** (already in the stack) | $0 included | Any scheduled tasks get declared in `vercel.json` / `vercel.ts`. No launchd / systemd to maintain. |
| Photo backup redundancy | **Cloudflare R2** secondary mirror of GCS | ~$5–10 | Belt + suspenders. Cron job pushes mirror weekly. |

### To retire (nothing replaces — just decommission)

| Service | Disposition |
|---|---|
| Mac mini (`192.168.4.37`) as a services host | Shut down tomorrow. Keep as personal device if Chase wants; no business workload on it. |
| Hetzner box (`5.161.61.151`) | **Cancel the instance.** We don't have access, don't know what's on it, and have no workload that needs it right now. Save ~$30/mo. If we need a VM later, provision fresh with documented setup. |
| Self-hosted Postiz | Canceled implicitly when mini shuts down |
| Self-hosted OpenBroadcaster + Icecast | Canceled; radio moves to Radio.co |
| Self-hosted Open Notebook | Canceled; knowledge layer moves to Claude Projects |
| Self-hosted broadcast-agent launchd jobs | Canceled; any real scheduled work moves to Vercel Cron |

### Open question

**Hetzner: keep or cancel?** Default-recommend cancel. If Chase has a reason to keep it that we haven't documented, he can flag it — but if the reason isn't written down in the canonical repo within 72 hours, it gets canceled. That's the new rule: **undocumented infrastructure doesn't survive.**

---

## 4. Cleanup actions on the way out

### Domain audit

Canonical list of 14 domains per `CLAUDE.md`:

```
bigmuddytouring.com · bigmuddymagazine.com · bigmuddyradio.com ·
bigmuddyentertainment.com · bigmuddyrecordlabel.com · deepsouthdirectory.com ·
outsidereconomics.com · hillbillydreamsinc.com · tuthilldesign.com ·
studiocvideo.com · bearsvillemediagroup.com · bearsvillemedia.com ·
measurablybetter.life · buycurious.art
```

For each one, verify:

- [ ] Registered under the right account (Cloudflare Registrar preferred; GoDaddy or Squarespace Domains get migrated)
- [ ] DNS points at Vercel (`A → 76.76.21.21` + `www CNAME → cname.vercel-dns.com`)
- [ ] Cloudflare gray cloud (DNS only, not proxy — per `CLAUDE.md` rule)
- [ ] If email is handled: Cloudflare Email Routing set up to forward to chasepierson.tv inbox, not paid Workspace subscription
- [ ] SSL certificate valid on Vercel

Any domain NOT on the canonical list: park or cancel. No stray domains.

### Account audit (retire legacy)

| Account | Action |
|---|---|
| Google Workspace — hillbillydreamsinc.com (trial Mar 23) | **Cancel trial** immediately |
| Google Workspace — daytimetv.us (via tranquility.net, under FarleyPierson) | **Cancel** — FarleyPierson retiring |
| FarleyPierson LLC | Closure per counsel (already planned in THE_THESIS) |
| chase@scan2plan.io email | Keep for Scan2Plan account billing continuity (royalty); don't use for ecosystem work |
| chase@farleypierson.com email | Forward to me@chasepierson.tv, close inbox |
| Any services still paying through FarleyPierson billing (xAI API invoice shows FarleyPierson as biller) | Update billing entity to MBT / chasepierson.tv |
| Legacy GCP projects | Audit `gcloud projects list`, shut down non-chasepierson.tv projects (e.g., `scan2plan-*`, `daytimetv-*`) |

### Code + documentation audit

- [ ] Grep repo for `192.168.4.37` — remove or annotate every occurrence
- [ ] Grep for `Mac mini` + `ClawdBOT` — update or remove
- [ ] Grep for `hetzner` — any reference that isn't the cancellation note gets removed
- [ ] Grep for `farleypierson` / `scan2plan` outside the canonical retirement docs — remove
- [ ] Update `CLAUDE.md` machine table to list only the MacBook + "No production servers — fully managed cloud"
- [ ] Update `docs/reference_broadcasting_stack.md` to mark it historical and point at Radio.co
- [ ] Mark this doc as the new canonical infrastructure reference

---

## 5. Rebuild sequence — what happens when

### This week (Chase drives to NY + sets minimal house)

- **Tonight:** shut nothing down. Tomorrow mini goes offline naturally when Chase powers it off. No rescue needed.
- **Tomorrow:** update `CLAUDE.md` machine table + remove mini references
- **During drive (asynchronous):** partner-agent signups (Tracy + Amy Claude Pro), consumer-subscription migrations (CapCut Team, Spotify Family, DistroKid Label, SoundCloud Pro)

### Next week (Chase in NY)

- **Monday:** Cancel Hetzner instance + document the cancellation
- **Tuesday–Wednesday:** Domain audit pass. Fix any DNS drift. Cancel legacy Workspaces.
- **Thursday:** Buffer or Later account created for social scheduling. Connect brand channels.
- **Friday:** Radio.co / Live365 trial to evaluate. Amy gives input on feature fit.

### Week after (active rebuild)

- Radio platform chosen + set up
- Vercel Cron jobs for any scheduled work
- Claude Projects created for Inn / Touring / Everything knowledge bases (uploaded from the measurably-better-things repo)
- Final audit: grep repo for any remaining local-infrastructure references

---

## 6. Subscription doc updates

Update `docs/ecosystem-subscriptions-2026-04-20.md`:

- Remove all "self-hosted on Mac mini" lines from Section C.2 (Immich, Postiz, OpenBroadcaster, Icecast, Plex, Open Notebook)
- Add replacement line items (Buffer / Later, Radio.co, Cloudflare R2) to MBT platform infrastructure
- Net cost delta: +$40–75/mo for managed services, −$30/mo Hetzner cancellation = +$10–45/mo
- Updated total stack estimate: ~$700–950/mo (was ~$690–905). Still under the $1k hard cap.

---

## 7. What this avoids

By NOT running the 4-week migration OR the emergency-migration-tonight path:

- Zero hours spent SSHing into boxes we don't have reliable access to
- Zero risk of corrupting an already-dormant service layer during a panicked cutover
- Zero need for Chase to unlock Bitwarden tonight or answer credential questions
- Zero chance of a half-migrated state contaminating the clean rebuild
- Zero ongoing operational debt from a Hetzner box we don't understand

---

## 8. Governance rule going forward

**New policy (effective 2026-04-20):** no infrastructure decision ships without a runbook committed to the canonical repo before the workload lands. "I SSH'd in and set it up" is not a runbook. A runbook is:

- Where it runs (provider + region + instance size)
- How to access it (credentials in Bitwarden under a specific item ID)
- What it does (service definition, domain, dependencies)
- How to rebuild it from scratch if it dies
- Who pays for it (classification code + billing account)

No runbook, no infrastructure. This prevents the Hetzner-style black-box from happening again.

---

*End of clean-slate rebuild plan.*
