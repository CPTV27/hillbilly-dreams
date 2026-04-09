# CMS Walkthrough — For Tracy & Amy

*How to edit magazine articles, events, and Inn information using Sanity Studio.*

---

## Getting Started

Open your browser and go to:

https://bigmuddytouring.com/studio

You'll see a Sanity login screen. Sign in with your Google account (the same one you use for email). If you've never signed in before, ask Chase to add you as a team member in the Sanity dashboard.

---

## What You Can Edit

| Content Type | What It Is | Example |
|---|---|---|
| **Articles** | Magazine pieces — city guides, features, photo essays | "Memphis After Midnight" |
| **Locations** | Inn, Blues Room, venue info — hours, address, description | "The Big Muddy Inn" |
| **Events** | Show calendar — upcoming performances, ticket links | "Rise Up Showcase — April 15" |

---

## Editing an Article

1. In Sanity Studio, click **Article** in the left sidebar
2. You'll see a list of all articles. Click one to edit, or click **+ Create** to make a new one
3. Fill in the fields:
   - **Title** — the headline
   - **Slug** — auto-generated from title. This becomes the URL (e.g., `/magazine/memphis-after-midnight`)
   - **Author** — defaults to "Big Muddy Magazine"
   - **Category** — pick one: City Guide, Feature, Photo Essay, Interview, Food & Drink, Music
   - **City** — which corridor city this article covers
   - **Hero Image** — click to upload a photo. This is the big image at the top of the article. Use real photos, not stock.
   - **Excerpt** — 1-2 sentence teaser that shows in article lists
   - **Body** — the main content. Works like a word processor:
     - Type normally for paragraphs
     - Use the toolbar for **bold**, *italic*, headings (H2, H3), block quotes
     - Click the **+** button to add images, pull quotes, or photo galleries
   - **Published At** — set the date. Articles with no date won't appear publicly.
4. Click **Publish** (green button, top right)
5. The website updates automatically within a few seconds (no need to call Chase)

### Tips for Articles
- **Hero images should be landscape** (wider than tall), at least 1600px wide
- **Pull quotes** break up long articles nicely — use them for the best sentences
- **Photo galleries** are great for city guides — show the restaurants, venues, hotels
- Saving a draft (without publishing) is fine — only published content appears on the website

---

## Editing a Location (Inn, Blues Room, etc.)

1. Click **Location** in the left sidebar
2. Click the location to edit, or **+ Create** for a new one
3. Fields:
   - **Name** — "The Big Muddy Inn" or "The Blues Room"
   - **Type** — Inn, Bar, Venue, or Restaurant
   - **Hours** — type each day on its own line (e.g., "Monday: 4pm-11pm")
   - **Address** — street address
   - **Contact Email** — for guest inquiries
   - **Phone** — front desk or booking number
   - **Hero Image** — the main photo of the location
   - **Description** — rich text, same editor as articles
4. Click **Publish**

### When to Update Locations
- Hours change seasonally — update when they do
- Special holiday hours — add a note in the description
- New menu items, room rates, or event space changes — update the description

---

## Adding an Event

1. Click **Event** in the left sidebar
2. Click **+ Create**
3. Fields:
   - **Title** — "Rise Up Showcase" or "Blues Room Saturday Night"
   - **Date** — pick the date and time
   - **Venue** — select from your locations (e.g., "The Blues Room")
   - **Artist** — type the band/performer name
   - **Ticket Link** — paste the URL where people buy tickets (Eventbrite, etc.)
   - **Price** — "$25" or "Free"
   - **Cover Image** — poster or promo photo for the event
   - **Description** — details about the show
   - **Status** — Upcoming, Sold Out, Cancelled, or Completed
4. Click **Publish**

### After the Show
- Change status to **Completed** after the event
- Don't delete old events — they become part of the archive

---

## Things You Should NOT Edit

- **Directory listings** — those are managed through a separate admin tool, not Sanity
- **Touring data** (venues, hotels, routes) — managed in the database
- **Artist profiles** — managed in the database
- **Anything in the code** — if you see code or developer settings, leave them alone

If you're unsure whether something should be edited in Sanity, ask Chase.

---

## Common Tasks

| Task | How |
|---|---|
| Fix a typo in an article | Article → click it → edit → Publish |
| Update Inn hours | Location → The Big Muddy Inn → edit Hours → Publish |
| Add tonight's show | Event → + Create → fill in → Publish |
| Add a new magazine article | Article → + Create → fill in all fields → Publish |
| Mark a show as sold out | Event → click the show → change Status to "Sold Out" → Publish |
| Replace a bad photo | Click the image field → remove → upload new → Publish |

---

## If Something Goes Wrong

- **Can't log in** — ask Chase to add your Google account to the Sanity project
- **Changes not appearing on the website** — wait 60 seconds, then hard refresh (Cmd+Shift+R). If still not showing after 5 minutes, tell Chase — the webhook might need attention.
- **Accidentally deleted something** — Sanity keeps version history. Click the clock icon (top right when editing a document) to see past versions and restore.
- **The Studio page is blank or broken** — try a different browser or clear your cache. If still broken, tell Chase.

---

*This walkthrough covers the basics. Chase will do a live demo when you're ready to start editing. The key thing: you can edit articles, events, and location info without touching code or calling a developer. Just log in, edit, publish.*
