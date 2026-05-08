# Big Muddy Touring — One-Sheet PDF Spec

**Created:** 2026-04-24
**Goal:** Deal flow generation. Read in 90 seconds → trigger reply.
**Format:** 8.5×11, front + back. Canva-ready.
**Source copy doc:** `docs/marketing-copy/big-muddy-touring-collateral-2026-04-24.md`
**Target send window:** today (6 humans).

---

## FRONT SIDE — Sell the system

### 1. Header (top 20%)

**Left:** BIG MUDDY TOURING
**Right (small caps):** Touring · Route Control · Content Engine

**Background:** obsidian black · subtle paper grain · thin gold divider line.

### 2. Hero (centerpiece)

**Headline (large serif, 90–110pt):** **THE RIVER IS THE ROUTE**
**Subhead (1–2 lines):** Booking, rooms, and media — controlled end to end.
**Proof line (small, letter-spaced):** 5 stops · 6–8 days · zero dead legs

### 3. Route Map (visual anchor)

Use the gold river map asset. Overlay minimal labels: Memphis · Clarksdale · Natchez · Baton Rouge · New Orleans. No paragraphs. Let it breathe.

### 4. The Hook (bottom front)

Left-aligned block:

> Most tours are stitched city by city.
> Different rooms. Different problems.
>
> Big Muddy runs like a spine.

**Bold closer:** Fewer miles. Better rooms. Built-in media.

---

## BACK SIDE — Convert the buyer

### 5. The Promise (top half)

**Headline:** Route control + room access + content capture.

**3-column layout (clean grid):**

| Artists | Managers | Partners |
|---|---|---|
| Right room, right size | Predictable routing | Fill under-booked rooms |
| Production handled | Fewer vendors | Recurring programming |
| Content leaves with you | One operator | Year-round inventory |

### 6. The Close (center emphasis, full-width)

> **We keep the media.
> You leave with assets.
> The next tour sells itself.**

### 7. The Funnel

**Headline:** Submit the artist. Receive a route.

**5 steps (horizontal icons or minimal text):**
1. Submit artist + window
2. We score route fit
3. Match room tier
4. Assign content pack
5. Send routed offer

### 8. CTA Block (bottom 25%)

**Primary:** APPLY TO TOUR → bigmuddytouring.com/apply
**Secondary:** View the route · Partner with us
**Contact (small):** booking@bigmuddytouring.com

### 9. Footer (brand lock)

Centered:
> **BIG MUDDY TOURING**
> *Launch small. Route clean. Film everything.*

---

## Design rules (do not freestyle)

- **Max 2 fonts:** serif (headline) + sans (everything else)
- **Negative space > content density**
- **Gold used sparingly** — lines, accents, map only
- **No gradients, no gloss, no startup energy**
- Feels like a record label or a private members' club. Not a SaaS company.

## Export settings

- PDF Print (300 DPI) — for handoff and print
- PDF Web (<2MB) — for email send today

---

## Asset mapping (use what we already have)

Files live in `~/Downloads/big_muddy_touring_collateral_package.zip`. Move into `apps/web/public/touring/` once selected.

| Spec section | Asset to use | Notes |
|---|---|---|
| §3 Route Map | `map.png` | Gold river map — the hero visual |
| Optional accent on §1 or §4 | `venue.png` | Use only if back side feels light |
| Optional inside back | `roadie.png` | Use only if §7 funnel needs warmth |
| `bus.png` | Reserve | Stronger fit for deck Slide 4 (funnel) than the one-sheet |

If a section feels crowded, drop the optional asset. Whitespace wins.

---

## Send list (today)

Identify and send to **3 artists · 2 managers · 1 venue.**

Locked subject line:
> **Memphis to New Orleans. Five rooms. Six to eight days.**

### Cover email draft (verbatim, edit only the salutation)

```
Subject: Memphis to New Orleans. Five rooms. Six to eight days.

[First name] —

We're routing artists down the Mississippi this summer. Five stops,
six to eight days, zero dead legs. We book the rooms, run the
production, and send you home with a content package that pays for
the next tour.

Attached is the one-sheet. The short version: submit the artist,
receive a route. We come back inside five business days with a
routed offer — corridor, room tier, content pack.

If a window in May, June, or July is interesting, reply with the
act and a target draw and I'll send a routed offer this week.

— Chase
booking@bigmuddytouring.com
bigmuddytouring.com
```

---

## Read the result

If **≥2 reply within 24 hours** → execution works. Move to:
1. `deploy-touring` (live page at /touring)
2. `intake-funnel` (real submit-receive engine)

If **0 reply within 48 hours** → positioning problem, not execution. Adjust the subject line and the hero headline. Re-send to a fresh 6.

The send list is the experiment. The spec is the instrument.

---

## What this is not

Not design work. Not a brand exercise.

This is **deal flow generation.** Build → send → observe → iterate.
