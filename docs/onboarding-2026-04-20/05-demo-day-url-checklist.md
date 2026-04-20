# Demo-Day URL Checklist

**For:** Tomorrow morning, Chase walks Tracy + Amy through the live ecosystem.
**Status legend:** ✅ ready · ⚠️ works but light content · 🚧 placeholder · 🔒 private/gated

---

## Tier 1 — Walk these LIVE during the demo

| URL | Status | What to show | Notes |
|-----|--------|--------------|-------|
| `https://bigmuddytouring.com` | ✅ | Touring page hero (Sanity-driven), photo strip, capability cards, the loop, three doors out | Hero text now right-aligned per CSS fix today |
| `https://bigmuddytouring.com/studio` | ✅ | Sanity Studio entry — log in, sidebar tour | Tracy + Amy need invites first (see Action #1 below) |
| `https://bigmuddymagazine.com` | ✅ | Magazine homepage — show new Tracy-voice articles, real-photo strip | 10 new articles visible; 14 old ones archived |
| `https://bigmuddymagazine.com/articles/[any-of-the-new-slugs]` | ✅ | Open an article, then show the corresponding edit view in Studio | Use `the-quiet-hum-of-morning-breakfast-at-big-muddy-inn` for a Tracy-voice one |
| `https://bigmuddytouring.com/pricing` | ✅ | Public pricing page (Sanity-driven hero) | Demo: edit hero in Studio, refresh, see change |
| `https://bigmuddytouring.com/shows` | ✅ | Blues Room / shows listing | Sanity-driven hero |
| `https://bigmuddytouring.com/private-events` | ✅ | Inquiry form | Sanity-driven hero; form posts to Sanity QuoteRequest |
| `https://bigmuddytouring.com/account/subscriptions` | ✅ | Customer self-serve subscription portal | Email-lookup mode (magic link is roadmap) |
| `https://bigmuddytouring.com/admin` | 🔒 | Admin landing → redirects to Treasury | Tracy + Amy need admin email allowlist (Action #2) |
| `https://bigmuddytouring.com/admin/treasury` | 🔒 | MRR dashboard | Empty until first real subscription |
| `https://bigmuddytouring.com/admin/subscriptions` | 🔒 | Subscription list | |
| `https://bigmuddytouring.com/admin/create` | 🔒 | AI Wizard for article drafts | Show the form, generate one piece live, send to Sanity |

## Tier 2 — Mention but don't deep-dive

| URL | Status | One-sentence framing |
|-----|--------|----------------------|
| `https://bigmuddyinn.com` | ⚠️ | Inn site exists, lighter content; will get full CMS treatment in next sprint |
| `https://bigmuddyradio.com` | 🚧 | Hardcoded structure; AI imagery cleaned; Sanity wiring is next sprint |
| `https://deepsouthdirectory.com` | ✅ | DSD product, pricing locked, walk-in sales path live |
| `https://measurablybetter.life` | ✅ | B2B platform brand for operators/licensees; not for walk-in customers |
| `https://bearsvillemediagroup.com` | ⚠️ | Northeast node, summer 2026 activation |
| `https://outsidereconomics.com` | ✅ | Editorial side-project; field manual lives here |

## Tier 3 — Skip unless asked

| URL | Status |
|-----|--------|
| `https://hillbillydreamsinc.com` | 🚧 sparse holding page |
| `https://chasepierson.tv` | ⚠️ Chase's personal photography site |
| `https://tuthilldesign.com` | ⚠️ Partner studio site |
| `https://studiocvideo.com` | ⚠️ Partner studio site |

---

## Pre-demo actions (you, before tomorrow morning)

1. **Invite Tracy + Amy to Sanity** — manage.sanity.io → project 5p7h8glj → Members → Invite by email (Editor role for both):
   - tracyaldersonallen@gmail.com
   - amyaldersonallen@gmail.com

2. **Add Tracy + Amy to admin email allowlist** — `apps/web/config/auth-rules.ts` — confirm both emails are in the `isAllowedUser` list. If not, add and redeploy. (5 min change.)

3. **Hard-refresh every Tier 1 URL once** the night before so your browser caches them. Faster demo = better demo.

4. **Print the Sanity Studio cheat sheet** (`04-sanity-studio-cheat-sheet.md`) — one for each desk.

5. **Log in to Sanity Studio yourself first** to confirm the new editorial state looks right.

## Demo flow (suggested 30-min walk)

1. **5 min — what we built** (open business architecture doc, show the org chart)
2. **5 min — public sites tour** (Touring → Magazine → Pricing → Shows → Private Events)
3. **10 min — Sanity Studio walkthrough**:
   - Log in
   - Edit the magazine homepage hero text live
   - Edit one article, swap the hero photo using the Photo Library, publish
   - Refresh the live site, see the change
4. **5 min — Admin tools** (Treasury, Subscriptions, AI Wizard)
5. **5 min — Pro forma + milestones + action items** (open the business case doc)

End with: "Here's the manual. Print it. Delta Dawn answers most questions. Call me for anything urgent."
