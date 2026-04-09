# DSD — Google Business Profile management (phased)

**Shipped (v1):**  
- `GET /api/clients/[id]/gbp-audit` — health score (existing).  
- `POST /api/clients/[id]/gbp` — `action: postReviewReply` — posts approved reply via My Business API v4 when a `SocialAccount` exists with `platform` `google_business` or `google`, `platformId` = `accounts/{id}/locations/{id}`, and valid `accessToken`.  
- Admin **Reviews** queue — **Post reply to Google Business** after **Approve**.

**Prerequisites:** OAuth for Google Business scopes on the **client’s** GBP (store tokens on `SocialAccount` with `clientId` set). Places API alone cannot write replies.

## Phase 2 (backlog)

| Capability | API direction |
|------------|----------------|
| Regular hours | Business Information API — `regularHours` patch |
| Photos | Media upload + `create` local post or direct photo API |
| Categories | `primaryCategory` / `additionalCategories` update |
| Q&A | Q&A API (verify current Google surface) |

## Phase 3

- Bulk sync audit scores nightly; webhook on Google notifications if enabled.

## Ops

- Never promise full GMB parity on sales calls until Phase 2 items are checked off per tier (Free / $25 / $50 / $99 / $250).
