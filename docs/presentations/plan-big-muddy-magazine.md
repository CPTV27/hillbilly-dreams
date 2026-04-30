# Big Muddy Magazine — Business Plan

*Drafted 2026-04-29 for the Tracy + Amy partner walkthrough.*
*Voice per `docs/voice/admin-documentation-voice.md`. Lead with action. Truth over polish.*

---

## 1. What it is

Run the editorial property that sells rooms at Big Muddy Inn and the corridor that surrounds it. Magazine first, monetization second — every piece earns its place by either making someone want to come to Natchez or making the people already coming book a longer stay.

## 2. What's working today

Volume 1 is in the can. The Spring 2026 issue ships with five published pieces under the Harper Lane house byline:

- The Inn piece — Tracy real, Inn real, prose restrained. This is the touchstone "documentably true" anchor of the issue.
- Persimmon Hollow — composite-character feature, recruiting tool by design.
- The Ritz — air cover for civic outreach. Aspirational-as-current per the editorial frame.
- The Snowbird Circuit — corridor scaffolding for the touring route.
- Studio C in Natchez — production partner narrative.

The voice is locked. Tracy signs off on everything. The Editor's Note carries the honest-disclosure load: "Some of what you just read is already real. Some of it is close enough that writing it down is how we make sure it stays on course." That sentence is the whole editorial contract.

Voice precedent we lean on: the "Amy Goes Country... Again" piece — Amy in her own voice, no marketing gloss, the kind of writing that makes a reader want to drive to Natchez before they finish the article. That's the bar.

## 3. The economics

**Revenue today:** $0 directly. The magazine is a marketing instrument for the Inn (target: $185k–$330k Inn revenue per `docs/THE_THESIS.md`). Every booking that mentions the magazine = magazine revenue, even though it shows up on the Inn P&L.

**Costs today:** ~$0 cash. Editorial labor is Tracy's hours + Chase's hours + Cos for layout. Hosting is inside the existing Vercel deployment.

**12-month targets:**

- Issue cadence: quarterly print + continuous web. 4 print issues in the year.
- Print run: start at 500 copies per issue, distributed inside the Inn + partner properties. Cost: ~$1,200 per issue at 500 copies, 32 pages, saddle-stitched.
- Sponsored content: 2 pieces per issue at $500 each = $4,000/year. Honest unknown — we have not sold one yet.
- Subscriber list: 1,000 emails by Q4 2026. Path: in-room QR card + Inn confirmation email + magazine site signup.
- Direct subscription revenue: defer. Free read, paid print. Print subscription at $48/year tested in Q4. If 100 sign up = $4,800.

**Honest 12-month range:** $0–$8,800 direct revenue. The real number is the lift on Inn bookings, which we can't isolate cleanly until we have a referral code on the QR card.

## 4. The customer

The reader is planning a trip. Not a music critic, not an industry person, not a travel pro. They want to know what it feels like to be on the Mississippi at 4pm in October, what's in the Blues Room after the show, where to eat that isn't the obvious place.

The Inn guest who already booked is the second customer — they read it in the room, they tell five friends about it, two of those friends book the next trip.

## 5. The 12-month plan

| Quarter | Ship |
|---|---|
| Q2 2026 | Print Volume 1. Distribute in Inn rooms + at Studio C events. Build subscriber list to 250. |
| Q3 2026 | Volume 2. First sponsored piece (Visit Natchez or a single regional brand). Test the QR-to-booking funnel. |
| Q4 2026 | Volume 3. Open print subscriptions at $48/year. First city-guide vertical (Natchez Plates) launches. |
| Q1 2027 | Volume 4. Annual review. Decide: lean harder on subscriptions, or stay free + sponsored. |

Standing editorial budget: 1 long feature, 2 service pieces (food, lodging, what-to-do), 1 photo essay, 1 partner-amplification piece (Studio C, Tuthill, Big Muddy Touring) per issue.

## 6. What we need to make it happen

- Tracy as editor, signing off on every piece. Her word is final. (Already in place.)
- Amy as contributor — voice pieces in her own voice on the bar, the kitchen, the Inn floor. Target: one Amy piece per issue.
- Print quote from a regional printer (Quad/Graphics, Walsworth, or one of the Jackson MS shops). Need a real number, not a guess.
- Sponsored-content rate card: 1-page draft, Tracy + Chase agree on price floor.
- Referral code on the in-room QR card so we can measure magazine-to-booking conversion.
- Sanity CMS already wired (project `5p7h8glj`). Article rendering is already SSR with JSON-LD. No new code required for Volume 2.

## 7. The risk

The magazine is aspirational-as-current by design. The Editor's Note carries that disclosure. If a piece names a real person or business who hasn't been told their name is in the magazine, that's a trust break. **Rule: every named real person or business gets a courtesy heads-up before print.** Composites are fine; surprises are not.

Second risk: editorial cadence collapse. Quarterly is the floor; if Q3 slips into Q4, the property looks dead. Tracy holds the calendar.

Third risk: monetization pressure distorts the voice. The reason the magazine works is it doesn't read like a travel ad. If sponsored content takes over the issue, the rooms stop selling. Hard cap: 2 sponsored pieces per issue. Never on the cover.

## 8. Why it matters to the ecosystem

The magazine is the corridor's voice. It is how Big Muddy Touring announces a new venue without buying ads, how the Inn fills shoulder-season weekends, how Studio C and Tuthill get their work seen by the audience that matters. It is the marketing engine for everything else.

It is also Chase's voice engine — every plan he has gets written up as a Harper Lane piece, present tense, as-if-it-already-exists. The aspirational-as-current frame is not an editorial trick; it is how this ecosystem builds. The magazine names the next thing into existence, then the partners build it. Persimmon Hollow recruits its own people. The Ritz attracts its own developer. The Snowbird Circuit announces its own route.

One Inn booking that mentions the magazine pays for the print run of the next issue. That is the entire business model, and it is enough.

---

*Owner: Tracy Alderson-Allen (editor). Contributor: Amy Allen. Technical + layout: Chase + Cos. Sponsored sales: TBD — likely Tracy in Q3 2026.*
