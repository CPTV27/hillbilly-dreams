# Admin Panel Audit — For Antigravity (AG) Agent

## Mission

Click through every page in the admin panel at bigmuddytouring.com/admin/*. Test every link, every button, every form. Report what's broken, what's confusing, and what's missing.

## Setup

1. Go to bigmuddytouring.com/admin/login
2. Sign in with Google (me@chasepierson.tv)
3. You should see the admin sidebar with these sections: Main, Create, Broadcast, Content, Operations, CRM, Platform, Sites

## Test Every Sidebar Link

Click each link in order. For each page, report:
- Does it load? (200 or 404?)
- Does it have content or is it empty/placeholder?
- Does the page title match what the sidebar says?
- Are there broken images?
- Do buttons/forms work?
- Does it match the dark theme (no random white pages)?

### Main
- [ ] /admin/dashboard — Mission Control. Does the greeting show? Stats load? Tools grid clickable?
- [ ] /admin/calendar — Does it load? Any events?
- [ ] /admin/upload — Drag-drop zone visible? Can you upload a file?

### Create
- [ ] /admin/studio — Content Studio. Do the input types work (business, show, text, photo)?
- [ ] /admin/lookbook — Do all 36 illustrations load? Voting work?
- [ ] /admin/media — Media Vault. Do images load? Search work?

### Broadcast
- [ ] /admin/radio — Broadcast Control. 4 tabs (Schedule, Now Playing, Media, TV). Do all render?
- [ ] Shows (external) — Does /radio/shows load with poster art?
- [ ] Web Player (external) — Does /radio/player load?

### Content
- [ ] /admin/articles — Article list. Any articles?
- [ ] /admin/playlists — Playlist management. Does it load?
- [ ] /admin/events — Event list. Does it load?
- [ ] /admin/newsletter — Newsletter management. Does it load?
- [ ] /admin/social — Social post management. Does it load?
- [ ] /admin/publications — Publication management. Does it load?

### Operations
- [ ] Delta Dawn (external) — /ops/chat. Does Delta Dawn respond? (Needs funded API)
- [ ] Ops Dashboard — /ops. Does it load?
- [ ] Reviews (external) — /ops/reviews. Does it load?

### CRM
- [ ] /admin/contacts — Contact list. Does it load?
- [ ] /admin/clients — Client list. Does it load? (Now requires auth)

### Platform
- [ ] /admin/bridge — Bridge clients. Does it load?
- [ ] /admin/finance — Finance dashboard. Does it load?

### Other Pages (not in sidebar but should work)
- [ ] /admin/scout — Scout tool. Does it load?
- [ ] /admin/review — Review management. Does it load?
- [ ] /snap — GPS Shot List. Does it load? (May 404 — known issue)
- [ ] /gallery/chase-pierson — Photography storefront. Does it load with images?
- [ ] /inn/tv — In-room TV. Does it load with 4 channels?

## What to Check on Every Page

### Consistency
- [ ] Dark theme everywhere (no white backgrounds in admin)
- [ ] Sidebar visible on every admin page
- [ ] Gold accent color (#c8943e) consistent
- [ ] No unstyled/raw HTML elements

### Functionality
- [ ] All sidebar links resolve (no 404s)
- [ ] Forms have submit buttons that do something
- [ ] API calls don't throw visible errors
- [ ] Back button works correctly

### UX Issues
- [ ] Is it clear what each page does?
- [ ] Are there empty states that explain what to do?
- [ ] Do error messages make sense?
- [ ] Is navigation intuitive?

## Report Format

```
## /admin/[page]
**Status:** PASS / FAIL / PARTIAL
**Issues:**
- [severity: critical/medium/low] Description
**UX Notes:** Any confusion points
```

## Priority

1. Fix 404s first (sidebar links that go nowhere)
2. Fix auth issues (pages that should load but error)
3. Fix empty pages (pages that load but have no content/guidance)
4. Fix UX (pages that work but are confusing)
