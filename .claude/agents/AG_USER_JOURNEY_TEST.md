# User Journey Testing — For Antigravity (AG) Agent

## Mission

You are testing the Big Muddy platform as a real user would experience it. Click through every page, every link, every interaction. Report what's broken, what's confusing, and what's delightful.

## Live Sites to Test

All sites run from one Next.js app with hostname-based routing. Test each domain:

| Domain | What It Is | Key Pages |
|--------|-----------|-----------|
| bigmuddytouring.com | Main hub | /, /inn, /route, /touring |
| bigmuddymagazine.com | Magazine | /, articles, features |
| bigmuddyradio.com | Radio | /, shows, schedule |
| bigmuddyentertainment.com | Entertainment hub | /, events |
| deepsouthdirectory.com | Business directory | /, /directory, /directory/[slug] |
| outsidereconomics.com | Economics toolkit (Docusaurus) | /, /philosophy/*, /toolkit/*, /resources/* |
| measurablybetter.life | MBT marketing | / |
| buycurious.art | Art gallery | /, /gallery, /gallery/artists |

## Test Personas

### Persona 1: Tourist Planning a Trip
**Goal:** Find out about the Big Muddy Inn and book a room
- Start at bigmuddytouring.com
- Can you figure out what this place is within 5 seconds?
- Can you find room info? Pricing? Photos?
- Can you find upcoming shows?
- Is there a clear path to book?
- Try the route page — does the corridor make sense?

### Persona 2: Local Business Owner
**Goal:** See if the Deep South Directory is worth $20/month
- Start at deepsouthdirectory.com
- Is it clear what you're getting?
- Can you see example listings?
- Is there a sign-up path?
- Does the pricing make sense?
- Try measurablybetter.life — does the MBT pitch land?

### Persona 3: Music Fan
**Goal:** Find out about shows and listen to the radio
- Start at bigmuddyentertainment.com
- Can you find upcoming shows?
- Navigate to bigmuddyradio.com — is there a stream to listen to?
- Check bigmuddymagazine.com — is there content to read?
- Try buycurious.art — can you browse art?

### Persona 4: Admin / Team Member
**Goal:** Use the admin tools
- Go to bigmuddytouring.com/admin/login
- Sign in with Google (me@chasepierson.tv)
- Check /admin/dashboard — does Mission Control load? Is it clear what to do?
- Check /admin/lookbook — do all 36 illustrations load?
- Check /admin/media — does the Media Vault work?
- Check /admin/studio — does Content Studio load?
- Try /snap — does the GPS shot list work?
- Try /admin/clients — does the client list load?
- Try /admin/calendar — does it load?

### Persona 5: Outsider Economics Reader
**Goal:** Learn about community economics
- Start at outsidereconomics.com
- Can you navigate Philosophy → Toolkit → Case Studies → Resources?
- Do the illustrations load on each page?
- Do the "See it in action" links to case studies work?
- Does the Deep South Resources section have real, useful content?

## What to Check on Every Page

### Visual
- [ ] Page loads without errors
- [ ] No blank/white screens
- [ ] Images load (check for broken images)
- [ ] Text is readable (contrast, size)
- [ ] Mobile responsive (test at 375px width)
- [ ] Dark theme consistent (no random white backgrounds)
- [ ] Illustrations render if present

### Functional
- [ ] All navigation links work
- [ ] No 404s from internal links
- [ ] Forms submit (if any)
- [ ] Buttons do what they say
- [ ] Back button works correctly
- [ ] Page title and meta description are set

### Performance
- [ ] Page loads in under 3 seconds
- [ ] No layout shift after load
- [ ] Images are lazy-loaded below fold
- [ ] No console errors (check browser dev tools)

### Content
- [ ] No placeholder text ("Lorem ipsum", "TODO", "Coming soon" that shouldn't be there)
- [ ] No broken markdown rendering
- [ ] No references to old brand names or URLs
- [ ] Contact info is accurate if shown

## Report Format

For each page tested, report:

```
## [URL]
**Status:** PASS / FAIL / PARTIAL
**Load time:** Xs
**Issues:**
- [severity: critical/medium/low] Description
**Notes:** Anything notable — good or bad
```

At the end, provide:
1. **Critical issues** — Things that would embarrass us in a demo tomorrow
2. **Quick wins** — Things fixable in under 30 minutes
3. **Backlog** — Things to fix later
4. **Highlights** — Things that actually look great

## Priority Order

Test in this order (most important for tomorrow's demo first):
1. bigmuddytouring.com (main site)
2. deepsouthdirectory.com (DSD — the product we're selling)
3. bigmuddytouring.com/admin/* (admin tools)
4. outsidereconomics.com (Docusaurus toolkit)
5. Everything else
