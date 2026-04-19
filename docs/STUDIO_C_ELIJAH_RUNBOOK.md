# Studio C Photo-Archive Runbook (Elijah leads)

*Practical "what to do" guide for the Studio C team member running the photo archive. Read `docs/STUDIO_C_PHOTO_ARCHIVE_WORKFLOW.md` first for the architecture; this is the day-by-day execution doc.*

*Engagement model: MBT buys buckets of Studio C hours from the Tuthill Design LLC. Elijah is the primary staff on this lane — but the bucket itself is fungible across platform work, and the relationship is MBT ↔ Tuthill Design LLC, not MBT ↔ Elijah personally.*

*Last updated: 2026-04-18*

---

## Before Day 1 — Setup Chase needs to do

Chase: complete these before Elijah starts. ~30 min total.

- [ ] **WhatsApp Elijah the intro message** (see `docs/ELIJAH_WHATSAPP_DRAFT.md`). Ask for his email + Topaz install confirmation.
- [ ] **Once he sends email back: create his Immich account.** Log in to https://immich.hillbillydreamsinc.com as admin. Administration → Users → Create. Generate strong password. Save to Bitwarden as "Immich — Elijah."
- [ ] **Send him the credentials via WhatsApp** (not email — Chase's preferred channel with Elijah). Include: Immich URL, account, password, App Store link for Immich iOS, runbook URL on GitHub, architecture doc URL.
- [ ] **Topaz Photo AI** — he installs on his Mac; we cover the license under FarleyPierson (send receipt once purchased).
- [ ] **Set up payment.** First $2K block (40 hrs × $50/hr) — confirm payment method with Elijah (Venmo, ACH, check). Schedule first payment for net-15 from start.
- [ ] **One 30-min kickoff call** via whatever Elijah prefers. Walk through Immich together, share screen, answer questions. Otherwise he'll be guessing.
- [ ] **Create an internal Asana task** to track Elijah's weekly status (subscribe Chase + Tracy). He doesn't need to be in Asana — the task is for Chase/Tracy to watch.

---

## Day 1 — Orientation (4 hours, paid time)

### Hour 1 — Get oriented

1. Log into https://immich.hillbillydreamsinc.com with the credentials Chase sent
2. Install Immich iOS app on your phone, sign in, **leave auto-backup OFF for now** (you don't need your personal photos in here)
3. Read `docs/STUDIO_C_PHOTO_ARCHIVE_WORKFLOW.md` end to end (15 min)
4. Read this runbook end to end (10 min)

### Hour 2 — Survey the library

You're walking into ~52,000 photos already ingested + a 590 GB rsync from the Mac mini's T7 SSD finishing in the next ~2 days. Total ~1.3 TB.

1. Open the Photos timeline. Scroll. Get a feel for what's there.
2. Click into "Explore → People." Faces are clustering automatically. Some clusters will be wrong. Note which faces appear most (likely Chase, Tracy, Amy, JP, band members).
3. Click into "Explore → Things." This is what CLIP found visually (guitars, faces, landscapes, etc.). Useful to understand what tags the AI sees vs what we want.
4. Do a search for "stage" or "live music" or "tour bus." See what comes back. This is the search you'll be tuning all month.

### Hour 3 — First curation pass

Pick **one specific event or shoot** (e.g. a single show, a single road trip). Find all photos from it. Then:

1. Use **Stacks** to group multiple versions of the same shot. Pick the best as the primary.
2. Apply Immich tags:
   - `event-<name>` (e.g., `event-houston-2025-09`)
   - `location-<city>` (e.g., `location-houston`)
   - `subject-<who>` (e.g., `subject-amy-allen`)
3. If a photo is sellable as a print: tag `ready-for-sale` + a price tier (`price-tier-1` for $50, `price-tier-2` for $150, `price-tier-3` for $500 — see Workflow doc decision B5).
4. If a photo is great but low-res: tag `needs-enlargement`.

### Hour 4 — Slack / status update to Chase

Send Chase one note:
- Which event you picked
- Roughly how many photos curated
- What you tagged `ready-for-sale` and why
- Any AI tag categories that were surprisingly good or surprisingly bad
- Any questions

That's Day 1.

---

## Week 1 — Build the rhythm (~36 hours of the 40-hr starter block)

### Daily routine (4–6 hrs)

1. **Morning: review imports.** Anything new from Chase's iPhone or new ingests? Check Photos timeline by date.
2. **Curate one event.** Same flow as Day 1, hour 3. Aim for ~200 photos / day curated through to tags.
3. **Run Topaz pass on `needs-enlargement` tagged photos.** Pull to your Mac, run through Topaz Photo AI / Gigapixel, re-upload, stack with original, promote enlarged as primary, remove `needs-enlargement` tag, add `enlarged-v1` tag.
4. **Wrap with status note** (3 lines, doesn't need to be polished — Asana task comment is fine).

### End of Week 1

- Goal: **first 500 photos tagged + priced** (per the original spec)
- Send Chase + Tracy a Friday wrap: total tagged, total `ready-for-sale`, by-event breakdown, any blockers
- Note any patterns: what types of photos sell-tier-1 vs tier-3? What's clearly worth enlarging?

---

## Ongoing — after the starter block

Once the archive is triaged, the work shifts to:

1. **New shoots ingest automatically.** Chase shoots → iPhone backup or Lightroom export → it shows up in Immich. You curate on the same daily rhythm.
2. **Upcoming shows / road trips** generate batches you'll want to push through quickly so prints are ready for sale around the show.
3. **Print-on-demand orders.** Once Bay Photo + Printful are wired (depends on Tracy meeting decision B3), you'll get notifications when someone orders. Verify the high-res TIFF was generated correctly, approve, ship.

---

## What's automatic — you don't touch this

- **Commerce export.** When you tag a photo `ready-for-sale`, a cron job exports a web JPEG + high-res TIFF to GCS, which the gallery site picks up. You never log into GCS. You never edit code. (Built in P19 of the agent router.)
- **Ingest.** iPhone backups, GCS sync, T7 sync — all automatic.
- **AI tagging.** Faces cluster, CLIP runs on every photo automatically. You correct, not initiate.
- **Backups.** Nightly rclone of the Immich library to GCS (queued as P20 — should be live before you start).

---

## When to escalate to Chase

- A photo that's identifiably someone (Tracy, Amy, band member) and you're not sure if it's OK to mark `ready-for-sale` → ask
- A whole event that should NOT be in the archive (private family stuff, etc.) → flag it, don't tag it sale-ready, and ask
- Any image where you can't tell if it's Chase's photography or someone else's (provenance doubt) → ask
- Storage running tight (Immich shows storage usage in admin) → flag at 80% so we upgrade to the 10 TB Storage Box ($25/mo extra)

## When to escalate to Tracy

- Anything related to pricing tiers, partnerships, or the gallery site sales surface
- Monthly revenue summary (you'll send this; she tracks)
- Print-on-demand fulfillment issues (lost shipments, refunds, etc.)

## Don't ever

- **Delete photos.** Tag them or move them to a `flagged-for-deletion` Immich album for Chase review. Never delete.
- **Disable backup jobs.** If a job seems stuck, ask before killing it.
- **Commit code or touch the gallery site directly.** That's Patch's domain. You stay in Immich + Topaz.
- **Share the Immich URL or your account with anyone.** It contains private + commercial photos.

---

## Monthly report (5 min, end of month)

Send Chase + Tracy a one-pager:
- Total photos in archive at month-end
- New photos curated this month
- Photos tagged `ready-for-sale` this month
- Sales (units + revenue) — pull from gallery site / POD partner reports
- Any infrastructure complaints (slow Immich, broken backup, etc.)
- One sentence: what's the most valuable bottleneck Chase could clear for next month?

---

## Reference

- Architecture: `docs/STUDIO_C_PHOTO_ARCHIVE_WORKFLOW.md`
- Hetzner infrastructure handoff: `docs/HANDOFF_HETZNER_MEDIA_INFRASTRUCTURE.md`
- Immich docs: https://immich.app/docs
- Topaz Photo AI: https://www.topazlabs.com/topaz-photo-ai

---

*If anything in this doc contradicts reality once you start, ping Chase and we'll update it. The point is for you to never have to ask the same question twice.*
