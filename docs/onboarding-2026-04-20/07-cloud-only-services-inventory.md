# Cloud-Only Services Inventory

**Question Tracy or Amy might ask:** "If the Mac mini at the Inn dies, can we still do our jobs?"
**Answer:** **Yes.** Everything Tracy and Amy touch on a daily basis runs in the cloud. The Mac mini handles back-of-house broadcasting only.

This document inventories what runs where and confirms day-to-day independence from local hardware.

---

## What Tracy + Amy use daily — 100% cloud

| Service | Vendor | URL | What it does |
|---------|--------|-----|--------------|
| **Sanity CMS** | sanity.io | bigmuddytouring.com/studio + manage.sanity.io | Edit articles, photos, page content |
| **Vercel** | vercel.com | vercel.com (deploy dashboard) | Hosts every website, every API, every cron |
| **Google Cloud Storage** | cloud.google.com | console.cloud.google.com | The 229-photo library + media bucket |
| **Cloudflare DNS** | cloudflare.com | dash.cloudflare.com | All 14 brand domains |
| **Stripe** | stripe.com | dashboard.stripe.com | Subscriptions, payments, customer portal |
| **Resend** (when wired) | resend.com | resend.com/dashboard | Transactional email (welcome, receipts) |
| **Neon Postgres** | neon.tech | console.neon.tech | The application database |
| **GitHub** | github.com | github.com/CPTV27/hillbilly-dreams | Code repo (mostly Chase + Cos) |

If the Mac mini dies tonight, **every single one of these stays up** and Tracy/Amy can keep editing, publishing, taking bookings, and getting paid. None of them depend on the mini.

---

## What runs on the Mac mini — back-of-house only

| Service | Port | URL | What it does | Tracy/Amy impact if down |
|---------|------|-----|--------------|---------------------------|
| OpenBroadcaster | 8080 | http://192.168.4.37:8080 | Internet-radio scheduler/playout | **None** — Big Muddy Radio is pre-launch; no daily user impact |
| Icecast | 8010 | http://192.168.4.37:8010 | Audio stream broadcasting | None until Radio launches |
| Plex | 32400 | http://192.168.4.37:32400 | Media library for the Inn TVs | TVs default to local media; not customer-facing |
| Postiz | 4007 | http://192.168.4.37:4007 | Social-media post scheduler | None; voice-gate exists but no auto-send wired yet |
| Open Notebook | 5055 | http://192.168.4.37:5055 | Internal AI notebook (research) | None; Chase-only tool |
| Future: Broadcast Agent | n/a | n/a | Mac-mini broadcast agent for OBS/ffmpeg jobs | Pre-broadcast only |

**Bottom line on the mini:** It's our back-of-house media server. It does not touch the websites, the CMS, the booking flow, the payments, or the email system. If it goes offline, Tracy + Amy might notice that Big Muddy Radio is silent (which it already is, pre-launch), or that a future scheduled social post didn't fire. Nothing customer-blocking.

If it dies hard, contact **Elijah** first (he set it up), then **Chase**.

---

## What Chase + Cos use (technical, ignore unless asked)

- **Vertex AI** (cloud.google.com) — Gemini 2.5 Pro/Flash, Imagen 3 — for AI generation
- **Bitwarden** (bitwarden.com) — credential vault — Chase-only
- **Asana** (asana.com) — task management
- **Hetzner** + **Immich** (planned) — long-term photo backup, not yet active
- **MacBook Pro** (Chase's laptop) — code, deploy, daily ops

---

## Single points of failure — the honest list

| Component | Failure mode | Recovery time | Mitigation |
|-----------|--------------|---------------|------------|
| **Vercel** | Outage on their end | ~hours; rare | None practical; Vercel is the entire industry |
| **Sanity** | Outage on their end | ~hours; rare | None practical; published-content fallbacks render from Next.js cache for ~60s |
| **Neon Postgres** | DB outage | ~minutes; reads via cache | Vercel cache buys time; user-impacting after a few minutes |
| **Cloudflare DNS** | DNS outage | ~minutes; very rare | None practical |
| **Stripe** | Outage | ~minutes; very rare | Bookings fall back to email-Tracy mode |
| **GCS bucket** | Outage | ~minutes; very rare | Photos cached at CDN edges; new uploads blocked |
| **Mac mini** | Hardware death | Days | Replaceable; nothing customer-facing depends on it |
| **Chase's MacBook** | Hardware death | Days | Cos can deploy from any laptop with `git push` access |

**No single piece of physical hardware is required for the websites to stay up.**

---

## Confirmation Tracy + Amy can verify themselves

Open https://bigmuddytouring.com on a phone over LTE (not Wi-Fi). It loads → confirmed cloud. Edit an article in Studio → publish → see it live. That's the proof: there is no machine in the Inn's office that needs to be on for any of this to work.

---

## Action items

- [ ] Tracy: confirm you can log into Sanity from your laptop on a different network (cellular hotspot test) — proves no local-network dependency.
- [ ] Amy: bookmark all 5 daily URLs in your browser for fast access.
- [ ] Chase: send Tracy + Amy the Bitwarden vault URL with their personal logins (no shared passwords).
- [ ] Cos: monitor uptime of the 7 Tier-1 vendor services — recommend setting up Better Uptime or UptimeRobot ($0–$29/mo) for proactive alerting.
