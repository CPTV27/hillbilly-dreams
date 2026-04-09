# Social Media Account Map — HDI Brands

*Last updated: 2026-04-05*
*Owner: Chase Pierson*
*Day-to-day: Amy Allen*

---

## Ownership Structure

| Person | Role | Platforms |
|--------|------|-----------|
| **Chase** | Developer account (Meta App, API keys, platform integrations) | All |
| **Amy** | Master account holder for posting — Big Muddy + DSD pages | Facebook, Instagram |
| **Elijah** | Tuthill Design + Studio C accounts | Facebook, Instagram |
| **Tracy** | No social media responsibilities | None |

---

## Meta App (API Integration)

| Field | Value |
|-------|-------|
| App ID | 26788227394135508 |
| App Secret | In Bitwarden |
| Status | Development mode |
| Admin | Chase |
| Next step | Add Amy as tester in Meta Developer console |

---

## Facebook Pages

| Brand | Page Handle | Page URL | Admin | Status | Notes |
|-------|------------|----------|-------|--------|-------|
| Big Muddy Touring | bigmuddytouring | facebook.com/bigmuddytouring | Amy | **Verified in code** | Referenced in structured-data.tsx |
| Big Muddy Magazine | ? | ? | Amy | NEEDS AUDIT | |
| Big Muddy Radio | ? | ? | Amy | NEEDS AUDIT | |
| Big Muddy Entertainment | ? | ? | Amy | NEEDS AUDIT | |
| Big Muddy Records | ? | ? | Amy | NEEDS AUDIT | |
| Deep South Directory | ? | ? | Amy | NEEDS AUDIT | |
| The Big Muddy Inn | bigmuddyinn | ? | Amy | **Referenced in code** | snap gallery links to instagram |
| Outsider Economics | ? | ? | Chase | NEEDS AUDIT | |
| Bearsville Creative | ? | ? | Chase | NEEDS CREATION | Summer 2026 |
| Studio C Video | ? | ? | Chase/Elijah | NEEDS AUDIT | |
| Tuthill Design | ? | ? | Elijah | NEEDS AUDIT | |
| Chase Pierson Photography | ? | ? | Chase | NEEDS AUDIT | |

---

## Instagram

| Brand | Handle | Admin | Linked to FB? | Status | Notes |
|-------|--------|-------|---------------|--------|-------|
| Big Muddy Touring | @bigmuddytouring | Amy | Yes | **Verified in code** | structured-data.tsx |
| Big Muddy Inn | @bigmuddyinn | Amy | ? | **Referenced in code** | snap gallery links |
| DSD | ? | Amy | ? | NEEDS AUDIT | |
| Chase Pierson | ? | Chase | ? | NEEDS AUDIT | |
| Bearsville Creative | ? | Chase | ? | NEEDS CREATION | |

---

## Twitter/X

| Brand | Handle | Admin | Status | Notes |
|-------|--------|-------|--------|-------|
| Big Muddy Touring | @bigmuddytouring | ? | **Referenced in code** | structured-data.tsx |
| Others | ? | ? | NEEDS AUDIT | |

---

## YouTube

| Brand | Channel | Admin | Status | Notes |
|-------|---------|-------|--------|-------|
| Big Muddy | ? | Chase | NEEDS AUDIT | DisplayChannel model supports YouTube embeds |

---

## TikTok

| Brand | Handle | Admin | Status | Notes |
|-------|--------|-------|--------|-------|
| ? | ? | ? | NEEDS AUDIT | TikTok publisher stubbed in social-publishers.ts |

---

## LinkedIn

| Account | Type | Admin | Status |
|---------|------|-------|--------|
| Chase Pierson | Personal | Chase | Active |
| Hillbilly Dreams Inc | Company | Chase | NEEDS AUDIT |

---

## Platform Integration Status

| Platform | API Integration | Publishing | Status |
|----------|----------------|-----------|--------|
| **Facebook** | Meta Graph API v21.0 (social-publisher.ts) | Native publish to Pages | Working — needs Amy's pages connected |
| **Instagram** | Meta Graph API (social-publishers.ts) | Container → Publish flow | Working — needs IG Business accounts linked to FB Pages |
| **TikTok** | Stubbed in social-publishers.ts | Not implemented | Blocked — needs TikTok Developer app |
| **Google Business** | Google Places API (enrichment) | Review response only | Partial |
| **YouTube** | DisplayChannel embed only | No upload/publish | Display only |
| **Twitter/X** | Not integrated | Not implemented | — |
| **LinkedIn** | Not integrated | Not implemented | — |
| **Threads** | Not integrated | Not implemented | — |

---

## Action Items

### Chase (Developer)
- [ ] Add Amy as tester in Meta Developer console (App ID: 26788227394135508)
- [ ] Verify all Facebook Page IDs for the social publisher integration
- [ ] Create Bearsville Creative pages on FB + IG (before summer activation)

### Amy (Day-to-Day)
- [ ] Accept Meta App tester invitation from Chase
- [ ] Audit: list every FB Page she admins, with exact page IDs
- [ ] Audit: list every IG Business account she manages
- [ ] Verify: each IG account is linked to its FB Page (required for API publishing)
- [ ] Log all credentials in Bitwarden under "Social Media" folder

### Elijah
- [ ] Audit: Tuthill Design + Studio C social accounts
- [ ] Share admin access with Chase if not already done

---

## How the Social Publisher Works

The native publisher (`lib/social-publisher.ts`) supports:
1. **Facebook Pages** — POST to `/{page-id}/feed` with message + optional link/image
2. **Instagram** — Two-step: create media container → publish container
3. **Scheduling** — Cron at `/api/cron/social-publish` processes queued posts

All publishing requires:
- `META_APP_ID` + `META_APP_SECRET` (set in Vercel)
- User connects their FB Pages via Facebook Login (OAuth)
- Page access tokens stored in SocialAccount model

---

*All credentials must be in Bitwarden. No passwords in this doc, in code, or in Asana.*
