# DCTV Implementation Plan — MBT Platform for Downtown Community Television Center

*Draft: April 5, 2026. Internal. Chase Pierson for Jon Alpert.*

---

## The Client

**Downtown Community Television Center (DCTV)**
87 Lafayette Street, Manhattan, NYC
Founded 1972 by **Jon Alpert** and **Keiko Tsuno**
501(c)(3) nonprofit — EIN 13-2742777
Domains: dctvny.org, dctv.org

**50+ years of independent media.** 70,000+ people trained. 18 National Emmys. 3 Oscar nominations. Films on HBO, Netflix, PBS. A 67-seat cinema. Equipment rentals. Edit suites. Youth programs. All running out of a landmark 1895 firehouse in Chinatown.

**Jon Alpert is Chase's mentor and friend.** This isn't a cold pitch — it's building something for someone who matters.

---

## What They Have

### The Building
- Engine Company 31 firehouse — NYC Landmark (1966), National Register of Historic Places (1972)
- Multiple edit suites (B, C, D), color correction suite, community media lab
- 67-seat Firehouse Cinema (4K projection, 7.1 surround, opened Sept 2022)
- Classrooms/workshop spaces
- Equipment storage and checkout area
- Event space (listed on Peerspace, Tagvenue)

### The Services
| Service | Current Pricing | Current Booking Method |
|---|---|---|
| Equipment rental | $25/yr membership + per-item rates | Email/phone + KitSplit |
| Edit Suite B (flagship) | $50/hr | Email/phone |
| Edit Suite C (mastering) | $50/hr | Email/phone |
| Edit Suite D (long-term) | $50/hr | Email/phone |
| Community Media Lab | $25/hr | Email/phone |
| Color Correction Suite | $50/hr+ | Email/phone |
| Workshops (150+/yr) | Varies | dctvny.org + CourseHorse |
| Firehouse Cinema | Ticket sales | dctvny.org |
| Event Space | Custom quotes | Peerspace/Tagvenue |
| Youth (PRO-TV) | Free | Application |

### The Catalog
- 50+ years of documentary films
- HBO: *Life of Crime 1984-2020*, *Finding the Way Home*, *Alternate Endings*, *15: A Quinceanera Story*, *Axios*
- Netflix: *Cuba and the Cameraman* (IMDb 8.2)
- PBS: *Cuba: The People* (1974, first American crew in Cuba)
- Available on OVID.tv (documentary streaming platform)
- Student films broadcast on HBO and WNET

### The Tech Stack (Current)
- Avid Media Composer, Adobe Creative Suite, Final Cut Pro, DaVinci Resolve
- ProTools 10 (audio)
- Avid NEXIS shared storage
- Sony BVM-X310 4K monitoring
- HP workstations, Blackmagic/AJA I/O
- Canon, Sony, Panasonic cameras
- Sennheiser, Aputure production gear

### The People
| Person | Role |
|---|---|
| Jon Alpert | Co-Founder & Co-Executive Director |
| Keiko Tsuno | Co-Founder & Co-Executive Director |
| Dara Messinger | Director of Programming (Firehouse Cinema) |
| 200+ youth/year | PRO-TV participants |

---

## What They Need (Pain Points)

### 1. Fragmented Booking
Equipment, edit suites, cinema, workshops, and event space all booked through different channels (email, phone, KitSplit, Peerspace, CourseHorse). No unified system. No real-time availability. Manual coordination.

### 2. No Content Archive Platform
50+ years of documentary films, student work, and institutional history — scattered across distribution platforms (HBO, Netflix, OVID) with no unified catalog or discovery layer they control.

### 3. Youth Program Management
200+ students/year across 5+ sub-programs. Free programs require grant reporting, attendance tracking, outcome measurement. Currently manual.

### 4. Membership is Underused
$25/year gets you equipment rental access. That's it. No member portal, no community features, no tiered benefits, no alumni network.

### 5. Two Disconnected Websites
dctvny.org and dctv.org serve different purposes with different designs. No unified content strategy across cinema, workshops, rentals, and youth programs.

### 6. Marketing Runs on Manual Labor
150+ workshops, weekly cinema screenings, equipment inventory updates, youth program announcements — all promoted individually. No content automation.

---

## The MBT Solution: Module Mapping

Here's how the existing MBT platform maps to DCTV's needs. **Green = ready to deploy. Yellow = needs customization. Red = new build.**

| DCTV Need | MBT Module | Status | Notes |
|---|---|---|---|
| Unified website | Multi-tenant config | Ready | Add DCTV tenant to `tenants.ts`, wire domains |
| Film catalog/archive | Gallery + Records | Ready | Gallery for visual catalog, Records models for film metadata, rights, distribution |
| Equipment rental booking | Commerce + **new: Booking** | Needs build | Prisma models: EquipmentItem, EquipmentBooking, EquipmentConditionLog |
| Edit suite scheduling | **new: Booking** | Needs build | Calendar-based reservation system with suite configs |
| Cinema programming | Touring/Events | Ready | ShowcaseSlot model handles screenings, Event model handles programming |
| Workshop registration | Commerce + **new: Education** | Needs build | Course, Lesson, StudentProgress models. Or integrate CourseHorse API. |
| Membership tiers | Commerce (Stripe) | Ready | Sovereign tier system maps perfectly to DCTV membership levels |
| Youth program tracking | **new: Education** | Needs build | Attendance, outcomes, grant reporting |
| Content automation | AI Content Pipeline | Ready | Social posts, newsletter, screening announcements auto-generated |
| Analytics/reporting | Analytics | Ready | Monthly reports, engagement metrics, grant compliance data |
| Community radio/streaming | Radio + Broadcasting | Ready | Live stream screenings, filmmaker talks, youth program showcases |
| WiFi captive portal | WiFi Portal | Ready | Firehouse visitor engagement — show tonight's screening, upcoming workshops |
| Screening room control | Sovereign Pi | Ready | $165 device runs local programming, kiosk mode, digital signage |
| Newsletter/communications | Magazine + AI Pipeline | Ready | Auto-generated from events, screenings, workshops |
| Event space management | Touring/Events | Ready | Replaces Peerspace/Tagvenue for direct booking |

---

## Proposed DCTV Tiers (Membership Model)

| Tier | Price | What You Get |
|---|---|---|
| **Community** | Free | Film catalog access, screening calendar, newsletter, DCTV Radio stream |
| **Member** | $25/mo | Equipment rental access, workshop discounts, Firehouse Cinema member pricing, media lab access ($25/hr) |
| **Producer** | $75/mo | All Member benefits + edit suite access ($50/hr → $35/hr member rate), priority booking, 2 free workshops/quarter |
| **Studio** | $200/mo | All Producer benefits + dedicated edit suite block (20 hrs/mo included), color correction access, priority equipment, portfolio page on DCTV site |
| **Institutional** | Custom | Group training, bulk equipment access, branded screening events, grant-funded program access |

Compare to current: $25/year gets rental access only. This model creates recurring revenue and community engagement.

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│            HILLBILLY DREAMS INC                   │
│            (MBT Platform)                         │
└────────┬──────────────┬──────────────┬───────────┘
         │              │              │
    ┌────┴───┐    ┌────┴────┐   ┌────┴───┐
    │  Big   │    │ DCTV    │   │Bearsville│
    │ Muddy  │    │ NYC     │   │Creative │
    └────────┘    └────┬────┘   └─────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
    ┌────┴───┐   ┌────┴────┐  ┌────┴────┐
    │Firehouse│  │Equipment │  │Workshop │
    │ Cinema  │  │ Rentals  │  │  & PRO  │
    └─────────┘  └──────────┘  └─────────┘
```

**New tenant entry in `tenants.ts`:**
```typescript
{
  id: 'dctv',
  name: 'DCTV',
  entity: 'Downtown Community Television Center',
  domains: ['dctvny.org', 'dctv.org'],
  primaryDomain: 'dctvny.org',
  routeGroup: 'dctv',
  themeClass: 'theme-dctv',
  accentColor: '#e63946', // DCTV red
  tagline: 'Community Media Since 1972',
  location: { city: 'New York', state: 'NY' },
  features: ['directory', 'gallery', 'radio', 'studio', 'cinema', 'education', 'booking']
}
```

---

## What Needs to Be Built (New Modules)

### Module: Booking (Equipment + Suites + Cinema)

**Prisma models:**
```
EquipmentItem (name, category, replacement_value, status, condition, image)
EquipmentBooking (itemId, userId, start, end, status, holdAmount, notes)
SuiteReservation (suiteId, userId, start, end, status, hourlyRate)
ScreeningSlot (cinemaId, filmId, date, time, ticketPrice, capacity, sold)
```

**API routes:**
- `/api/booking/equipment` — CRUD + availability check
- `/api/booking/suites` — Calendar view + reservation
- `/api/booking/cinema` — Screening schedule + ticketing

**Estimated effort:** 3-4 weeks

### Module: Education (Workshops + PRO-TV)

**Prisma models:**
```
Course (name, description, instructor, category, price, maxStudents, dates)
Enrollment (courseId, userId, status, completedAt, certificate)
YouthProgram (name, cohort, year, grantId)
YouthParticipant (programId, userId, attendanceLog, outcomes)
```

**API routes:**
- `/api/education/courses` — Workshop catalog + registration
- `/api/education/enrollment` — Student tracking
- `/api/education/youth` — PRO-TV program management + grant reporting

**Estimated effort:** 4-6 weeks

---

## Phase 1: Quick Wins (Weeks 1-4)

Things we can deploy immediately using existing modules:

1. **Add DCTV tenant** — `tenants.ts` config, domain routing, theme
2. **Film catalog** — Gallery module loaded with DCTV documentary archive (titles, posters, streaming links, awards)
3. **Cinema programming** — Events module for Firehouse Cinema screenings
4. **WiFi captive portal** — Firehouse visitor engagement (tonight's screening, upcoming workshops, membership signup)
5. **Newsletter** — AI-generated weekly email from cinema + workshop + rental activity
6. **Content automation** — Social posts for screenings, workshops, equipment availability
7. **Sovereign Pi in cinema lobby** — Kiosk showing tonight's program, upcoming events, membership CTA
8. **Analytics dashboard** — Monthly report on membership, rentals, attendance, revenue

## Phase 2: Core Build (Weeks 5-12)

New modules that make the real difference:

1. **Equipment booking system** — Replace email/KitSplit with unified calendar
2. **Edit suite scheduling** — Real-time availability, hourly billing, Stripe integration
3. **Membership portal** — Tiered access, member dashboard, renewal management
4. **Workshop registration** — Replace CourseHorse dependency with native enrollment

## Phase 3: Advanced (Weeks 13-20)

1. **PRO-TV youth program tracking** — Attendance, outcomes, grant compliance
2. **Film rights management** — Distribution tracking, licensing, royalty flow
3. **DCTV Radio** — Streaming channel for filmmaker talks, student showcases, cinema audio
4. **Archive digitization pipeline** — AI-assisted cataloging of 50 years of content
5. **Community directory** — Alumni network, filmmaker profiles, portfolio pages

---

## The Pitch to Jon

"Jon, you've been doing this for 50 years with phone calls, emails, and three different booking platforms. I built a system that runs a media company — radio, magazine, events, equipment, everything — from one codebase. Same tools that book bands in Natchez can book your edit suites in Chinatown.

Your film catalog should be as easy to browse as Netflix. Your equipment should be as easy to rent as an Airbnb. Your workshops should have a waitlist that fills itself. Your PRO-TV kids should have a portfolio page the day they finish the program.

I'm not selling you software. I'm giving you the same infrastructure I built for myself — because you taught me how to think about media this way in the first place."

---

## Revenue Model for DCTV Implementation

| Revenue Path | For DCTV | For HDI |
|---|---|---|
| Membership tiers | New recurring revenue stream | Platform licensing fee or rev share |
| Equipment booking | Replaces manual tracking, reduces losses | Module licensing |
| Cinema ticketing | Direct sales, no third-party fees | Transaction fee (2-3%) |
| Workshop registration | Replaces CourseHorse (saves their commission) | Transaction fee |
| Film catalog | New discovery channel for back catalog | Streaming referral commission |
| Grant reporting | Automated compliance data | Included in platform fee |

**Pricing to DCTV:**
- Option A: $500/mo platform fee (covers all modules, hosting, support)
- Option B: $250/mo base + 3% transaction fee on bookings/tickets
- Option C: Pro bono first year (this is Jon) + case study rights + $500/mo Year 2

**Recommendation:** Option C. Jon is a mentor. The case study of "MBT powers a 50-year-old NYC media institution" is worth more than $6,000 in Year 1 revenue. It's the proof that MBT works beyond the Deep South.

---

## Why This Matters for HDI

1. **Proves the platform works in a completely different context** — NYC nonprofit vs. Mississippi hospitality
2. **Jon Alpert is a name** — 18 Emmys, 3 Oscar noms, HBO/Netflix filmmaker. His endorsement opens doors.
3. **DCTV trains 200+ youth/year** — those kids become the next generation of community media producers. They learn on our platform.
4. **It's the Andrew Freedman Home model, realized** — same vision Chase had in 2023 for the Bronx, now in Chinatown with a 50-year institution behind it.
5. **Community media centers exist in every major city** — if this works at DCTV, it's a vertical. Manhattan Neighborhood Network, BRIC, PhillyCAM, Chicago Access, etc.

---

*This document is a first draft. Schedule a call with Jon to walk through the concept. Bring the Big Muddy demo — show him what it looks like when it's running.*
