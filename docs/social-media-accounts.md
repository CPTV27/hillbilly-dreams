# Social Media Accounts — Big Muddy Ecosystem

## Account Setup Checklist

### Outsider Economics (Primary — Content Engine)

| Platform | Handle | Status | Purpose |
|----------|--------|--------|---------|
| Twitter/X | @OutsiderEcon | NEEDS SETUP | Repurpose Chase's personal → OE brand. 200+ posts pre-written in social-content-bank.md |
| TikTok | @OutsiderEconomics | NEEDS SETUP | 15 video concepts ready (social-content-tiktok.md). Vertical format, 30-90s |
| Bluesky | @outsidereconomics.bsky.social | NEEDS SETUP | AT Protocol, mirrors X content |
| Instagram | @outsidereconomics | NEEDS SETUP | Carousel posts of key stats, Remotion video clips |
| Substack | outsidereconomics.substack.com | ACTIVE | Newsletter — already linked on site |
| YouTube | Outsider Economics | NEEDS SETUP | Long-form explainers + Shorts from Remotion pipeline |

### Big Muddy Touring (Flagship Brand)

| Platform | Handle | Status | Purpose |
|----------|--------|--------|---------|
| Instagram | @bigmuddytouring | NEEDS VERIFY | Chase's photography, Inn shots, corridor content |
| Facebook | /bigmuddytouring | NEEDS VERIFY | Event promotion, local reach (Natchez audience skews older) |
| Twitter/X | @bigmuddytouring | NEEDS SETUP | Cross-brand news, event announcements |
| TikTok | @bigmuddytouring | NEEDS SETUP | Inn tours, corridor highlights, behind-the-scenes |
| YouTube | Big Muddy Touring | NEEDS SETUP | Route videos, Inn walkthroughs, session recordings |

### Big Muddy Radio

| Platform | Handle | Status | Purpose |
|----------|--------|--------|---------|
| Spotify | Big Muddy Radio | IN PROGRESS | 5+ playlists defined, full strategy in docs/strategy/bmt-spotify-strategy.md |
| Instagram | @bigmuddyradio | NEEDS SETUP | Playlist promo, artist features, session clips |
| TikTok | @bigmuddyradio | NEEDS SETUP | 15-second playlist teasers, live session clips |
| SoundCloud | bigmuddyradio | NEEDS SETUP | Full session recordings, podcast episodes |

### Big Muddy Records

| Platform | Handle | Status | Purpose |
|----------|--------|--------|---------|
| Instagram | @bigmuddyrecords | NEEDS SETUP | Artist content, studio shots, release announcements |
| Spotify | Big Muddy Records | NEEDS SETUP | Artist profiles, release distribution |
| Bandcamp | bigmuddyrecords | NEEDS SETUP | Direct-to-fan sales, vinyl pre-orders |
| YouTube | Big Muddy Records | NEEDS SETUP | Music videos, session recordings, artist interviews |
| SoundCloud | bigmuddyrecords | NEEDS SETUP | Preview tracks, session cuts |

### Big Muddy Magazine

| Platform | Handle | Status | Purpose |
|----------|--------|--------|---------|
| Instagram | @bigmuddymagazine | NEEDS SETUP | City guide photos, article previews, editorial content |
| Twitter/X | @bigmuddymag | NEEDS SETUP | Article links, culture commentary |
| Pinterest | Big Muddy Magazine | NEEDS SETUP | City guide boards (high SEO value for travel content) |

### Deep South Directory

| Platform | Handle | Status | Purpose |
|----------|--------|--------|---------|
| Instagram | @deepsouthdirectory | NEEDS SETUP | Client spotlights, service demos, before/after content |
| LinkedIn | Deep South Directory | NEEDS SETUP | B2B service marketing, case studies |
| Facebook | /deepsouthdirectory | NEEDS SETUP | Local business networking, directory listings |

### BuyCurious Art

| Platform | Handle | Status | Purpose |
|----------|--------|--------|---------|
| Instagram | @buycuriousart | NEEDS SETUP | Artist features, new work posts, gallery shots |
| TikTok | @buycuriousart | NEEDS SETUP | Artist process videos, studio tours |

---

## Priority Order

### Phase 1: This Week (Content Ready to Publish)
1. **Twitter/X — @OutsiderEcon** — 200+ posts ready, just need account setup
2. **TikTok — @OutsiderEconomics** — 15 video scripts ready, Remotion pipeline renders shorts
3. **Spotify — Big Muddy Radio** — Playlists defined, strategy doc complete

### Phase 2: Next Week
4. **Instagram — @bigmuddytouring** — Chase's photography is the content
5. **YouTube — Outsider Economics** — Remotion shorts + long-form from Field Manual chapters
6. **Bluesky — @outsidereconomics** — Mirror X content via AT Protocol

### Phase 3: Month 1
7. **Instagram — @bigmuddyrecords** — artist content pipeline
8. **Bandcamp — bigmuddyrecords** — release infrastructure
9. **Instagram — @deepsouthdirectory** — client acquisition content
10. **LinkedIn — Deep South Directory** — B2B positioning

### Phase 4: Month 2
11. Remaining brand accounts
12. Pinterest for Magazine (long-tail SEO play)
13. SoundCloud for Radio/Records

---

## Environment Variables Needed

Already configured in `apps/web/lib/social-publishers.ts`:

```env
# Twitter/X (OAuth 1.0a)
TWITTER_API_KEY=
TWITTER_API_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_SECRET=

# Bluesky (AT Protocol)
BLUESKY_HANDLE=
BLUESKY_APP_PASSWORD=

# Instagram (Meta Graph API — requires Business Account)
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_BUSINESS_ACCOUNT_ID=

# TikTok (Content Posting API v2)
TIKTOK_ACCESS_TOKEN=
```

## Content Already Written

| Source | Count | Format | Ready? |
|--------|-------|--------|--------|
| social-content-bank.md | 200+ posts | Sub-280 char, X-ready | YES |
| social-content-tiktok.md | 15 concepts | 30-90s video scripts | YES |
| twitter-hooks.md | 10 threads | 2-3 options each | YES |
| Remotion videos | 6 stories + 4 stats + 5 quotes | MP4 (Shorts + YouTube) | 3 RENDERED |
| Field Manual chapters | 19 chapters | Long-form → can excerpt | YES |

## Publishing Infrastructure

- **Admin UI**: `/admin/social` — manage accounts and posts
- **API**: `/api/social/accounts`, `/api/social/posts`, `/api/social/generate`
- **AI Generation**: Claude Sonnet 4 with per-brand voice profiles
- **Platform Publishers**: Twitter, Bluesky, Instagram, TikTok — all implemented in `lib/social-publishers.ts`

The pipeline is: write content (or generate via AI) → preview in admin → publish via API → track performance.
