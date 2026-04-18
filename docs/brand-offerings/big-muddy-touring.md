# Brand Offering — Big Muddy Touring

*Pre-populated draft for Monday April 20 partner session.*

---

## 1 · The brand in one sentence

We bring artists to the Mississippi corridor and put them in front of audiences who came for the music — venues, festivals, the Inn, and our own tour stops.

---

## 2 · Tier in the platform

| | |
|---|---|
| **Tier** | Consumer |
| **Parent entity** | Big Muddy Touring LLC (wholly-owned subsidiary of MBT — separate for vehicle + road liability) |
| **Sibling brands under same entity** | Big Muddy Records · Big Muddy Radio · the band |
| **Customer of MBT?** | Yes — Tier 1 internal tooling, plus Tier 3 for any external syndication |
| **Vendor to MBT?** | No |

---

## 3 · What we sell

### Offering 1 — Artist booking on our route
- **What it is:** We book artists into shows at the Inn (Blues Room), partner venues, and tour-stop dates we organize
- **What's included:** Show date, venue, basic promotion via Big Muddy media (Magazine, Radio, Touring site, social)
- **Price:** Negotiated per artist + venue capacity. Most likely deal structures: door split, guarantee, hybrid
- **Packaging:** Per-show, or multi-show route bookings (e.g., 3 corridor cities)
- **Sold via:** Touring site · agent outreach · word of mouth · artists pitch us

### Offering 2 — Tour dates to audiences (ticket sales)
- **What it is:** Audience-facing show announcements + ticket sales
- **What's included:** Show entry; sometimes meet & greet upgrades
- **Price:** $___ per ticket depending on artist + venue
- **Packaging:** Single-show; potential season membership in future
- **Sold via:** Touring site · Inn site cross-listing · social · partner venues' channels

### Offering 3 — Gig brokerage to venues
- **What it is:** We bring acts to venues that don't have their own booking pipeline
- **What's included:** Artist booking, contract handling, basic promotion; venue handles room
- **Price:** Booking fee or percentage of door
- **Packaging:** One-off or recurring booking relationship with a venue
- **Sold via:** Direct outreach to venues; corridor relationships

### Offering 4 — Tour sponsorships (future)
- **What it is:** Brand sponsors a tour, season, or named act
- **What's included:** Logo placement, mentions in media coverage, hospitality at shows, social integration
- **Price:** $___ per tour package, scaled by tour size + brand exposure
- **Packaging:** Title sponsor · presenting sponsor · supporting sponsor (TBD)
- **Sold via:** Direct outreach to regional brands — banks, beverage, hospitality, automotive — Tracy / Chase

### Offering 5 — Van + driver as a service (future)
- **What it is:** 12-passenger van (eventually Prevost bus) for hire to artists
- **What's included:** Vehicle + driver + tour logistics
- **Price:** $___ per day or per tour; insurance covered through BMT LLC policy
- **Packaging:** Per-tour rental
- **Sold via:** Direct to artists we already book + agents

---

## 4 · Pricing structure

| Item | Price |
|---|---|
| Show ticket | $___ (varies by act) |
| Booking fee (gig brokerage) | ___% of door OR $___ flat |
| Sponsorship | $___ tier 1 / $___ tier 2 / $___ tier 3 |
| Van rental | $___/day |

*Chase to populate from current/projected economics.*

---

## 5 · Modules required to deliver

| Offering | Modules used | Module-specific requirement |
|---|---|---|
| Artist booking | Tour/Calendar, Entity Store, Coordination | Artist contracts, hold/confirm flow, route planning |
| Ticket sales | Commerce, Booking, Tour/Calendar | Stripe + ticket inventory; overlaps with Inn Blues Room ticketing |
| Gig brokerage | Tour/Calendar, Entity Store, Finance | Venue+artist matching; contract storage; commission tracking |
| Sponsorships | Commerce, Entity Store, Affiliate | Sponsor inventory by tour/season; reporting to sponsors |
| Van rental | Booking, Finance | Vehicle availability calendar; insurance scope (P38) |

---

## 6 · Revenue tier classification

| Offering | MBT tier | MBT take |
|---|---|---|
| All BMT offerings | Tier 1 (internal) — value consolidates up to MBT via Big Muddy Touring LLC | None |
| Future: BMT licenses booking platform to other tour operators | Tier 3 | 15-30% |

---

## 7 · Sales channels

- **Direct:** bigmuddytouring.com (artist recruitment + audience-facing)
- **Cross-sell:** Inn → Touring · Magazine articles → tour stops · Radio airplay → ticket sales
- **Partner / referral:** Booking agents · venue relationships · artist managers
- **Earned media:** Press coverage, festival circuit visibility

---

## 8 · Key metrics

| Metric | Current | 12-month target |
|---|---|---|
| Acts booked per month | ___ | ___ |
| Tour days per month | ___ | ___ |
| Average ticket revenue per show | $___ | $___ |
| Sponsor packages sold | ___ | ___ |
| Van utilization | ___% | ___% |

---

## 9 · Operational ownership

| | |
|---|---|
| **Day-to-day operator** | Chase (booking + relationships) |
| **Support** | Tracy (contracts, billing, sponsor outreach) · Studio C (show production) · Tuthill (van logistics if needed) |
| **Escalation path** | Operator → Chase |

---

## 10 · Open questions and decisions needed

- Tour bus (Prevost) timing — when does it become a real budget line?
- Sponsorship tiers + pricing — needs market research before pitching first sponsor
- Insurance flash radius (P38) — affects when van-as-service offering opens
- Booking fee model (percentage vs flat) for gig brokerage
- Ticketing platform — same answer as Inn Blues Room? (DIY Stripe vs Eventbrite/DICE)
