# Big Muddy Operations Manual

*Daily operations for the Big Muddy ecosystem. For Chase, Tracy, Amy, and JP.*

---

## Daily Rhythm

### Morning (Chase — 8am-12pm)

| Task | Tool | Time |
|---|---|---|
| Check overnight directory submissions | Neon dashboard or admin tool | 10 min |
| Review/approve new listings | Admin tool → DirectoryBusiness | 15 min |
| Check radio stream health | bigmuddytouring.com/radio | 2 min |
| Prep for walk-in pitches | DSD one-pager, sample report | 10 min |

### Daytime (Chase — 12pm-5pm)

| Task | Priority | Revenue Impact |
|---|---|---|
| Walk-in pitches — 5 businesses/day | P0 | $99/mo recurring per close |
| Tourism meeting (Visit Natchez, DNA) | P0 | Institutional pipeline |
| Magazine content (write, photograph) | P1 | SEO + directory value |
| Platform work (bugs, features) | P2 | Supports everything else |

### Show Nights (Tracy, Amy, JP — 6pm-12am)

| Task | Who | Notes |
|---|---|---|
| Open bar, prep inventory | Amy | Liquor license compliance |
| Sound check, stage setup | JP | 1 hour before doors |
| Guest check-in (if Inn guests) | Tracy | Room keys, parking, welcome |
| Bar operations during show | Tracy + Amy | $300-500 bar revenue per night |
| Door / tickets | JP or volunteer | Track attendance |
| Photography | Chase (if available) | Content for magazine + social |
| Close out, reconcile cash | Tracy | Same night, no exceptions |

### Post-Show (Next Day)

| Task | Who | Tool |
|---|---|---|
| Upload show photos to GCS | Chase | Mac mini photo pipeline |
| Post show recap to social | Chase | Postiz (192.168.4.37:4007) or manual |
| Add show recording to Plex/radio | Mac mini agent | Plex + OpenBroadcaster |
| Update artist's directory listing with show photos | Admin tool | DirectoryBusiness |
| Send thank-you to artist | JP | Email |

---

## Weekly Tasks

### Monday
- Review last week's metrics (directory views, radio listeners, show attendance)
- Plan this week's magazine content
- Update event calendar in Sanity Studio (bigmuddytouring.com/studio)

### Wednesday
- Social media batch — schedule the week's posts
- Radio programming review — any schedule changes for the week
- Directory listing maintenance — approve pending, update featured

### Friday
- Show prep for the weekend
- Confirm artist, sound, bar inventory
- Update event status in Sanity if anything changed (sold out, cancelled)

---

## Monthly Tasks

| Task | Who | When |
|---|---|---|
| Monthly client reports (DSD subscribers) | Chase (auto-generated) | 1st of month |
| Review financials — Inn occupancy, bar revenue, DSD subscriptions | Tracy | 5th of month |
| Magazine editorial calendar — plan next month's articles | Chase | 15th of month |
| Radio schedule review — any new shows, retired shows | JP + Chase | 15th of month |
| Directory enrichment check — any stale listings, missing data | Chase | 20th of month |

---

## How to Edit Content

### Magazine Articles, Events, Inn Info
**Tool:** Sanity Studio at bigmuddytouring.com/studio
**Who:** Tracy, Amy, Chase
**Guide:** See `docs/TRACY_AMY_CMS_WALKTHROUGH.md`

### Directory Listings (Business Data)
**Tool:** Admin panel (Neon dashboard now, next-admin this weekend, AdminJS week 2-3)
**Who:** Chase (now), Tracy (after next-admin is set up)
**What:** Approve new submissions, update tiers, manage enrichment

### Social Media
**Tool:** Postiz at http://192.168.4.37:4007 or manual posting
**Who:** Chase
**What:** Schedule posts across platforms, track engagement

### Radio Programming
**Tool:** OpenBroadcaster at http://192.168.4.37:8080 (admin/bigmuddy2026)
**Who:** Chase, JP
**What:** Schedule shows, manage playlists, configure automation

---

## Key Accounts & Logins

All credentials are in **Bitwarden** (admin@hillbillydreamsinc.com). Never store passwords anywhere else.

| Service | URL | Notes |
|---|---|---|
| Sanity Studio | bigmuddytouring.com/studio | Google login |
| Vercel | vercel.com | Chase's account |
| Cloudflare | dash.cloudflare.com | All DNS |
| Neon (database) | console.neon.tech | Chase only |
| Stripe | dashboard.stripe.com | Payments |
| AzuraCast (radio relay) | http://206.189.200.208 | Radio streaming |
| OpenBroadcaster | http://192.168.4.37:8080 | Radio automation |
| Plex | http://192.168.4.37:32400 | TV/video library |
| Postiz | http://192.168.4.37:4007 | Social scheduling |
| Cal.com | app.cal.com | Meeting scheduling |
| GCS (photos) | console.cloud.google.com | Photo storage |
| GitHub | github.com/CPTV27/hillbilly-dreams | Code repository |
| Bitwarden | bitwarden.com | All credentials |

---

## Emergency Procedures

### Radio goes silent
1. Check bigmuddytouring.com/radio — is the player showing "offline"?
2. Check AzuraCast at http://206.189.200.208 — is the source connected?
3. If source disconnected: SSH to Mac mini, check Docker containers: `docker ps`
4. If AzuraCast is down: the fallback MP3 should be playing. If not, restart: `cd /var/azuracast && docker compose restart`
5. If Mac mini is unreachable: wait for internet to come back. AzuraCast fallback covers it.

### Website is down
1. Check vercel.com dashboard — any failed deploys?
2. Check bigmuddytouring.com — is it a 500 error or DNS issue?
3. If deploy error: roll back to previous deploy in Vercel dashboard (one click)
4. If DNS issue: check Cloudflare dashboard for the domain

### Database issue
1. Check console.neon.tech — is the database responding?
2. Chase is the only person who touches the database directly
3. If data looks wrong: Neon has automatic backups — Chase can restore

### Someone can't log into Sanity
1. Go to sanity.io/manage → Big Muddy project → Members
2. Add their Google email as an Editor
3. They can then sign in at bigmuddytouring.com/studio

---

## The Golden Rule

**If you're not sure, ask Chase before changing anything in the database or Vercel. Sanity Studio is safe — you can't break the website by editing articles, events, or location info. Everything else, check first.**

---

*This manual is a living document. Update it when processes change. The goal: anyone on the team can handle daily operations without Chase being in the room.*
