# Studio C — Photo Archive Workflow

*Studio C photo-archive workflow for the Chase Pierson Photography archive. Runs on top of the Immich + Hetzner stack locked in `~/.claude/plans/cozy-beaming-minsky.md`. Studio C team owns end-to-end (Elijah leads, Miles as needed); Chase shoots and approves finals.*

*Engagement model: MBT buys buckets of Studio C hours from the Tuthill Design LLC. Hours are fungible across platform work — photo archive is one lane. NOT an individual contractor arrangement.*

*Last updated: 2026-04-18*

---

## The two-layer model

**Layer 1 — Immich (the DAM).** All photos live here. Dedup, AI tagging, face recognition, CLIP search, curation. Off-the-shelf, already planned.

**Layer 2 — Commerce export.** A thin pipeline that takes curated photos from Immich and publishes them to the sales catalog (GCS `bmt-media-bigmuddy/archive/` → gallery site → print-on-demand). Custom, ~3–4 dev days.

Elijah lives in Immich. The commerce layer is automatic once he tags a photo `ready-for-sale`.

---

## Ingest — three sources, one destination

```
[Lightroom CC]     [Synology NAS]     [4TB local drive]     [iPhone shoots]
      │                   │                    │                    │
      │ share links       │ Tailscale mount    │ rsync to           │ Immich iOS app
      │ (one-time scrape) │ (external library, │ /mnt/storage-box/  │ (auto backup,
      │                   │  read-only)        │  photos/4tb/       │  Phase 4)
      ▼                   ▼                    ▼                    ▼
                       [Immich on Hetzner CCX23 + Storage Box BX31]
                                            │
                                            ▼
                               [AI indexing pass — automatic]
                               (CLIP embeddings, faces, objects)
```

**Synology** is Phase 6 of the Hetzner plan — Elijah adds `immich-readonly` user and connects Tailscale from the Bearsville side.

**4TB local drive** is the piece the Immich plan didn't cover. Needs a one-time rsync into `/mnt/storage-box/photos/4tb/` added as an Immich external library.

**Lightroom CC shared albums** get scraped once (see `gallery-dl` approach from earlier thread) and dropped into `/mnt/storage-box/photos/lightroom-cc/`.

**iPhone** handles itself via the Immich iOS app.

---

## Elijah's workflow in Immich

### Daily / weekly
1. **Review new imports.** Immich flags untagged photos.
2. **Approve or correct AI tags.** CLIP will nail ~80%; Elijah fixes the rest.
3. **Stack versions.** Multiple versions of the same shot → Immich Stacks feature picks the best.
4. **Tag ready-for-sale.** When a photo is sellable, apply the tag `ready-for-sale` + price tier (e.g. `price-tier-1`, `price-tier-2`).
5. **Flag low-res needing enlargement.** Tag `needs-enlargement` for Topaz pass.

### The enlargement sub-workflow
- Elijah pulls tagged `needs-enlargement` photos to his Mac
- Runs through **Topaz Photo AI** or **Topaz Gigapixel**
- Re-uploads the enlarged version to Immich → stacks with original → promotes enlarged as primary
- Removes `needs-enlargement` tag, adds `enlarged-v1` tag for provenance

### Commerce publish (automatic)
Photos tagged `ready-for-sale` flow into the commerce layer:

```
[Immich tag: ready-for-sale] → [cron job, hourly]
                                    │
                                    ▼
                       [Export web-optimized JPEG +
                        high-res TIFF for print]
                                    │
                                    ▼
                       [GCS bmt-media-bigmuddy/archive/]
                                    │
                                    ▼
                       [Gallery site + print-on-demand]
```

---

## What needs building (dev scope)

| Piece | Effort | Owner |
|---|---|---|
| 4TB drive rsync → Storage Box (one-time) | 2 hrs | Patch |
| Lightroom CC scraper → Storage Box (one-time) | 3 hrs | Patch |
| Immich webhook → GCS export cron | 1 day | Patch |
| Web-optimized JPEG + TIFF generator | 0.5 day | Patch |
| Gallery site pickup of `archive/` | 0.5 day | Patch |
| Print-on-demand integration (partner TBD) | 2–3 days | Patch |
| **Total** | **~3–4 dev days** | |

This is half what I originally scoped because Immich covers the hardest pieces (dedup, AI tagging, face recognition, curation UI, semantic search).

---

## The engagement (Studio C bucket, not an individual hire)

- **MBT buys a bucket of Studio C hours from the Tuthill Design LLC.**
  - Starter bucket: **$50/hr × 40 hours = $2,000** (bucket pricing, not Elijah's personal rate)
  - Hours are fungible across platform work — photo archive is one lane; platform maintenance and other work pull from the same bucket
  - Studio C internally staffs the bucket — **Elijah leads photo archive**, Miles pulled in as needed, others if scope grows
- **Month 1 deliverable:** archive fully ingested, first 500 photos tagged and priced
- **Month 2+:** ongoing curation; new shoots from Chase flow in via Lightroom/iPhone; sales start

The Studio C team touches only Immich + Topaz for the photo lane. They do not touch GCS, the gallery site, or the print-on-demand API directly — those are automatic downstream of their tags.

---

## Decisions for Tracy review

1. **Total volume estimate** — Lightroom CC + Synology + 4TB combined, rough GB? Drives Storage Box sizing (BX31 = 10TB, can upgrade).
2. **Print-on-demand partner** — Printful (retail, cheap), WHCC (pro lab, slower), Bay Photo (pro lab, fine-art prints)?
3. **Gallery strategy** — does Chase Pierson Photography get its own sales surface at `chasepierson.tv`, or does it flow through `gallery/` on the Big Muddy site, or both?
4. **Elijah block size** — 40 hrs ($2,000) as proposed, or start smaller?
5. **Pricing tiers** — do we define 3 price tiers (e.g. $50/$150/$500) up front, or Elijah + Chase set per-photo?

---

## Monthly run cost

| Line | Cost |
|---|---|
| Hetzner CCX23 (already paid) | $40/mo |
| Hetzner Storage Box BX31 (Phase 3) | $25/mo |
| GCS storage (commerce archive — small subset) | ~$5/mo |
| Domain/Cloudflare | existing |
| **Total infra** | **~$70/mo** |

Plus Elijah's ongoing hourly block (size TBD once the archive is triaged).

---

## References

- Hetzner/Immich plan: `~/.claude/plans/cozy-beaming-minsky.md`
- Video kit budget (same review wave): `docs/finance/VIDEO_KIT_BUDGET_APR2026.md`
- Existing Lightroom → finals workflow: `docs/CHASE_PHOTO_WORKFLOW.md` (this is for finals only, separate from archive)

---

*For review with Tracy · April 18 2026 · Elijah is the operator owner.*
