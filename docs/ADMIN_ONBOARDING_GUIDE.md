# Admin Tools — Getting Started Guide

*For Tracy, Amy, and Chase. Updated April 2026.*

---

## Quick Access

The admin panel lives at any of your domains + `/admin`. For example:
- `bigmuddytouring.com/admin`
- `deepsouthdirectory.com/admin`

You need to be logged in. If you see a login page, use your Google account (the one associated with your @gmail.com email).

---

## The Dashboard (`/admin`)

This is home base. It shows:
- Quick stats (clients, events, articles, revenue)
- Recent activity
- Delta Dawn — the floating chat assistant in the bottom-right corner. Ask her anything about the system.

**Tip:** Delta Dawn knows your data. Ask her "What events are coming up?" or "How many DSD subscribers do we have?" and she'll pull real numbers.

---

## Tools You'll Use Most

### 1. Events (`/admin/events`)

**What:** Create, edit, and manage shows at the Inn and other venues.

**How to create a show:**
1. Click "New Event" (or go to `/admin/events/new`)
2. Fill in: Name, Artist, Date, Time, Price, Capacity
3. Check "Stream" if it'll be broadcast on Radio
4. Save → the show appears on the Radio live sessions page and the Events page

**Tracy:** Use this to schedule shows for the Inn. Set the price and capacity.
**Amy:** Use this to manage the bar side — you'll see the event list and can plan staffing.

### 2. Articles (`/admin/articles`)

**What:** Write and publish Magazine articles, city guides, and features.

**How to create an article:**
1. Go to `/admin/articles/new`
2. Enter: Title, Slug (URL-friendly name), Category, Status
3. Write the body in the editor
4. Set status to "published" when ready → it appears on bigmuddymagazine.com

**The future workflow:** We're building an interactive article system where you pick a topic, answer 5 questions about it, and the AI drafts an article in your voice. You review and approve before it publishes. Coming soon.

**Tracy:** You could write about Inn operations, the Natchez business community, Southern hospitality, finance for small businesses.
**Amy:** You could write about the bar scene, cocktail recipes, show recaps, late-night Natchez culture.

### 3. Creative Studio (`/admin/creative`)

**What:** Generate content — radio promos, social media posts, audio.

**The Audio Tab:**
1. Select a voice (Delta Dawn, Chase, Catfish Carl, Miss Pearline, etc.)
2. Write or auto-generate a script
3. Click Generate → AI creates the voiceover
4. Preview, download, or use for Radio

**The Social Tab:** (coming soon)
Generate social media posts for shows, articles, and business promotions.

### 4. Newsletter (`/admin/newsletter`)

**What:** Create and manage email newsletters.

**How:**
1. Go to `/admin/newsletter/new`
2. Write the newsletter content
3. Preview it
4. Send → goes to all subscribers

### 5. Clients (`/admin/clients`)

**What:** View and manage DSD / Directory subscribers.

You'll see: Name, Tier, Status, City, and their voice profile (AI-generated brand voice). This is where you track who's signed up and what tier they're on.

### 6. Media Upload (`/admin/upload`)

**What:** Upload photos and media to the system.

Drag and drop images. They go to Google Cloud Storage and become available for articles, listings, and pages.

### 7. Playlists (`/admin/playlists`)

**What:** Manage Radio playlists.

Create playlists with names, descriptions, and track lists. Set status to "active" and they appear on bigmuddyradio.com.

---

## Things You Don't Need to Touch

- **`/admin/deploys`** — Chase's deployment dashboard
- **`/admin/pricing`** — pricing configuration (locked)
- **`/admin/command`** — developer command console
- **`/admin/bridge`** — API bridge (technical)
- **`/admin/launch`** — launch checklist (Chase only)

---

## Delta Dawn — Your AI Assistant

The gold chat bubble in the bottom-right corner of every admin page is Delta Dawn. She's an AI assistant that:

- Knows your events, clients, articles, and revenue data
- Can draft review responses for you
- Can suggest show topics
- Can help with social media content
- Can walk you through any admin feature

Just type a question and she'll help. She's not a search engine — she knows YOUR data.

---

## The Voice Chat (New!)

On `measurablybetter.life/life`, there's a gold microphone button. Tap it and talk. Ask questions like:
- "What's happening at the Inn this weekend?"
- "Tell me about Biscuits & Blues"
- "What shows are coming up?"

It uses real data from the database. Try it — it's the Southern Concierge.

---

## If Something Breaks

Text Chase. Or ask Delta Dawn — she might know the answer faster.

---

## Quick Reference

| What | Where | Who |
|---|---|---|
| Create a show | `/admin/events/new` | Tracy, Amy |
| Write an article | `/admin/articles/new` | Tracy, Amy, Chase |
| Make a radio promo | `/admin/creative` (Audio tab) | Chase, Amy |
| Send a newsletter | `/admin/newsletter/new` | Chase |
| View subscribers | `/admin/clients` | Tracy, Chase |
| Upload photos | `/admin/upload` | Anyone |
| Manage playlists | `/admin/playlists` | Chase, Amy |
| Ask Delta Dawn | Gold chat bubble (every page) | Everyone |
| Voice assistant | `measurablybetter.life/life` mic button | Everyone |
