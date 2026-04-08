# Primetime Handoff — April 8, 2026

**Agent:** Primetime (Claude Opus 4.6, 1M context)
**Session:** ~3 hours, April 8 2026
**Pick up here. Don't re-read the whole codebase — this doc has everything.**

---

## The Big Picture (Chase's Words, April 8)

Focus on the entertainment business. Put the band together, get the studio running, make awesome content, stay busy, be profitable. License the technology to other people — Studio C + Tuthill Design manage all fulfillment. Chase never touches tech implementation for clients.

**Chase makes cool stuff. The platform scales without him.**

---

## What Got Built This Session

### Rea Mochiach Pitch Page
- **File:** `apps/web/app/entertainment/raya/page.tsx`
- **Also copied to main repo:** `apps/web/app/entertainment/raya/page.tsx` (both locations)
- **Route:** `/entertainment/raya` (under bigmuddyentertainment.com)
- Server component, inline CSS, dark theme (#0f0f0d bg, #c8943e amber accent)
- Follows house-band page pattern exactly
- **Narrative: "It's All Connecting"** — NOT a pitch, NOT a sales page. Just shows the ecosystem.
- Sections: Hero → Studio (gear, no bio) → Dual Studio (Utopia + Studio C) → The Route (13 cities) → The Van → Micro-Media Company → Record Label → House Band → The Space (Ritz Theatre + 521 Franklin) → Closing
- **No business terms, no percentages, no deals, no CTA, no "get in touch" button**
- Chase's directive: "Drop anything that sounds like we're selling something"

### Name Correction
- **Rea Mochiach** — correct spelling (not Raya Mochiak)
- Bass player, Gogol Bordello (quit when they got famous). Israeli. Delta Blues expert.
- Fixed in: page.tsx, docs/artists/ welcome doc, memory files
- **Never tell Rea who he is on the page** — he knows his own resume

### Van Wrap Spec v2
- **File:** `docs/VAN_WRAP_SPEC.md` — completely rewritten
- Driver side: BIG MUDDY TOURING (gold on matte black)
- Passenger side: STUDIO C — Video · Audio · Production
- **Rear (the showcase):** "BIG MUDDY" + stylized corridor map (13 cities, Natchez starred) + partner logo strip (Studio C, Utopia Studios, Bearsville Creative, Big Muddy Magazine, Big Muddy Records, Big Muddy Radio)
- **QR code on rear door** — links to a living page with latest show footage, magazine, radio stream
- The QR landing page needs to be built: `/van` or `/touring/van`

### Beauty Shot List
- **File:** `docs/creative/BIG_MUDDY_BEAUTY_SHOT_LIST.md`
- Full cinematic B-roll shot list: river/bluff, downtown Natchez, the Inn, corridor road footage, music/performance, the van, nature, candid people
- Drone + Sony on tripod + DJI Osmo — full kit coverage
- Includes "Two of the Most Scenic Towns in America" pitch (Woodstock + Natchez = Studio C's competitive moat)

### Owen Bush / Scan2Plan Email
- Full email drafted with S2PX data analysis backing it
- **Key numbers from the data:**
  - $1.06M lost to scoping errors (36% variance between estimates and invoices)
  - 58% of projects had no square footage data
  - 79% of estimates ($20.9M) never converted
  - Zero projects tracked properly across all systems
  - 262 projects with no financial records
- **The offer:** Owen sets benchmarks, Chase hits them. No cost until it performs. Owen names the price (% of revenue). Studio C + Tuthill manage implementation.
- **Key claims:** Cost estimating tool fixes scoping, customers get point cloud viewer for the first time, makes market ready for Twinner
- Email is in conversation context — not saved to a file yet. Chase said "done" — may need final review before sending.
- **Conference display / product deck also requested** — full stack presentation (Google AI, cost estimating tool, point cloud viewer, Twinner pipeline). Not built yet.

---

## Key Decisions Made This Session

### Business Model (Locked)
1. **Chase's focus:** Entertainment, studio, band, content, shows, photography, magazine
2. **Licensing revenue:** MBT platform licensed to operators (brokers, towns, verticals)
3. **Fulfillment:** Studio C + Tuthill Design manage ALL implementation — MBT, DSD, Scan2Plan
4. **Chase never does fulfillment for licensees**

### Rea Mochiach Partnership
- Creative-side partner — records, studio, entertainment. NOT hospitality.
- Chase offers rent-free studio space in Natchez
- Rev share on studio revenue (recording sessions, etc.)
- Deal structure TBD — needs to happen in person
- Was going to set up in Brooklyn (art factory concept) but Natchez makes more sense

### DSD Go-To-Market
- **Town + broker co-sign model** — not cold-call SaaS
- Town endorses it (city, tourism board) → founding broker leads it → businesses join because community asked
- $500/mo network management SLA (whole infrastructure, not per subscriber)
- Individual business subscriptions separate
- Press through Big Muddy Magazine + radio = free marketing
- Katie Halper Show as first national press hit

### Studio C Presentation (Tomorrow)
- Needs to reflect the narrative direction from tonight
- Not "here's what our platform does" but "here's what's happening and here's where you fit"
- Rhea (from Studio C) said Utopia content feels "too thirsty" — keep it confident, not salesy
- Woodstock + Natchez sister cities angle for Studio C pitch

---

## Pending / Not Built

| Item | Priority | Notes |
|------|----------|-------|
| QR code landing page (`/van`) | High | Living page with latest content — show footage, magazine, radio stream |
| Studio C presentation update | High | Tomorrow — narrative direction, not feature list |
| Miro board templates for Tracy/Amy | Medium | Interactive boards with AI chat per frame |
| Owen email — final review + send | High | Chase said "done" but may want final pass |
| S2PX conference display / product deck | Medium | Full stack presentation for trade shows |
| Scan2Plan interface for Owen to play with | Medium | Chase mentioned but said "not in this letter" |
| iPhone video transfer to T7 | Low | Use iCloud Photos + AirDrop, not USB CLI |

---

## Files Changed / Created

| File | Action |
|------|--------|
| `apps/web/app/entertainment/raya/page.tsx` | CREATED — Rea's vision page |
| `docs/VAN_WRAP_SPEC.md` | REWRITTEN — v2 with dual branding, map, QR, partners |
| `docs/creative/BIG_MUDDY_BEAUTY_SHOT_LIST.md` | CREATED — full cinematic shot list |
| `docs/artists/RAYA_MOCHIAK_WELCOME.md` | UPDATED — name corrected to Rea Mochiach |
| `memory/project_studioc_utopia_feedback.md` | UPDATED — Rea partnership notes, name fix |
| `memory/feedback_agent_name_primetime.md` | CREATED — this agent is Primetime |
| `memory/feedback_chase_focus.md` | CREATED — Chase makes cool stuff, others fulfill |
| `memory/project_dsd_town_broker_model.md` | CREATED — town + broker co-sign model |
| `memory/project_big_picture_apr8.md` | CREATED — clearest business model articulation |

---

## Overnight Dispatch (Completed by Cursor)

PR ready to merge: `cursor/dispatch-overnight-apr6`
- DSD image audit
- Constellation seed (8,548 nodes, 11,552 edges)
- DSD onboard page
- Admin mobile layout
- Press QA (14 HTML files, pricing corrected)
- Typecheck + build passing

---

## Key Corrections / QC Notes

- **Rea Mochiach** — correct spelling. Not Raya, not Mochiak.
- **Never explain to Rea who he is** — the page shows the ecosystem, not his resume
- **No sales language on any page shown to partners** — state facts, don't pitch
- **"Primetime"** — that's this agent's name
- **iCloud Photos** is the right iPhone sync solution, not USB CLI tools
- **T7 is SMB-mounted from Mac mini** — may disconnect, check mount before writing

---

## The Origin Story (Still True)

Chase designed a complete media production-to-distribution pipeline in 2022. He realized the same architecture that runs a Viacom can run a small-town media economy. Big Muddy is that architecture, applied to Main Street, powered by AI, anchored in the Mississippi corridor. The gap isn't technology — it's organization. That's what we sell.
