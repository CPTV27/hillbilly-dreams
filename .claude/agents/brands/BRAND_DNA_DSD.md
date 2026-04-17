# Deep South Directory — Brand DNA

*Canonical source: `docs/POSITIONING_UPDATE_2026-04-17.md` + `docs/BUSINESS_ARCHITECTURE.md` (April 17 amendment).*

*Last updated 2026-04-17 to reflect the soft-decouple from Big Muddy.*

---

## What DSD is

An independent corridor directory and local-guide brand at https://deepsouthdirectory.com. General-purpose — restaurants, shops, services, any vertical. Sibling to Big Muddy, not nested under it. Runs at its own pace, with its own voice.

**Distinct from:** the Big Muddy Touring circuit directory at bigmuddytouring.com/circuit, which covers music venues, musicians, and music-adjacent hospitality. Same infrastructure underneath, different brands on top.

---

## The voice

**"Three locals who eat out a lot and have opinions."**

First-person. Casual. Specific. No throat-clearing, no hype language, no ecosystem talk. A DSD post reads like a text you'd send a friend who's visiting.

### Show, don't abstract

| Big Muddy Magazine (editorial) | Deep South Directory (locals) |
|---|---|
| *"King's Tavern occupies a cedar-beamed room on Jefferson Street that has poured drinks since 1789. The kitchen leans Creole with a New Orleans accent, and the patio hums on summer nights when the Bluff breezes roll up from the river."* | *"Went to King's Tavern last night. The flatbread is weirdly great and the bartender made us a riff on a sazerac that I'm still thinking about. Get a table on the patio if you can. 751 Jefferson St., Natchez."* |

Both work. They're not the same brand.

### Words to use
- Specific names (places, dishes, street addresses, hours)
- First-person ("we went," "I tried," "Tracy said")
- Concrete sensory detail ("flatbread," "sazerac," "the patio at dusk")
- Short sentences

### Words to NEVER use on DSD
- `ecosystem`
- `platform`
- `Powered by Measurably Better Things`
- `part of the Big Muddy family` / `Big Muddy network`
- `civic-commerce`, `sovereign stack`, `vertically integrated`
- `corridor` as a branded term (say "the river" or "between Memphis and New Orleans")
- Corporate clichés ("curated experiences," "elevated dining," etc.)

---

## Content model — three layers

1. **AI bulk (SEO floor):** city guides, "best of" lists, business profile starters. Generated weekly via cron, hands-off. Bar: "does it rank."
2. **Field reports (personality):** Chase, Tracy, Amy post quick spots via `/admin/dsd/spot`. 3 photos, one sentence, tag a business, done.
3. **Business-submitted (revenue):** self-serve listings at tiers $0 / $25 / $50 / $99 / $250.

---

## Who writes for DSD

- Chase, Tracy, Amy — personal field reports
- AI (Gemini Flash) — bulk SEO pages, unreviewed unless flagged
- Business owners — their own listings
- Never: a magazine-style editor. DSD isn't edited line-by-line. It's edited by vibes.

---

## Visual identity

Simpler and more casual than Big Muddy. Big Muddy Magazine is Garden & Gun meets Kinfolk. DSD is a well-designed newsletter from a friend who moved to Natchez and won't shut up about the food.

- Logo/wordmark: standalone, no Big Muddy lockup
- Typography: lighter, more utilitarian than Big Muddy's Playfair Display
- Color: own palette — don't inherit the Big Muddy gold/terra. Still warm, its own thing.

## Photography — the biggest differentiator

**Use Chase's original photos wherever possible. Never stock photography. Never generic AI imagery.**

The corridor photo library at `gs://bmt-media-bigmuddy/touring/approved/` (the OceanSprings-Natchez and Save-the-Whole-Ball shoots) and every new field-report photo captured via `/admin/dsd/spot` is first-priority for DSD visual content.

Why this matters:
- Real photos of real corridor businesses tell Google's image search and local SEO crawlers "this site actually knows these places."
- Every original photo carries EXIF data that reinforces local authenticity.
- Field reports with phone-shot photos read as personal, which is exactly the voice.
- Stock photography of "small Southern town" is a tell — visitors can spot it instantly and trust collapses.

Hierarchy of acceptable image sources on DSD (top = most preferred):
1. Chase's original camera shots (approved folder, new shoots)
2. Field-report phone photos from Chase / Tracy / Amy
3. Business-submitted photos (verified, with permission)
4. AI-generated imagery of the Delta (only if tasteful and never of specific businesses)
5. Stock — **never on DSD**

If a page doesn't have a real photo available, ship it without an image before shipping it with stock.

---

## Target audience

- **Tourists** searching commercial terms: "best coffee in natchez," "things to do in vicksburg," "restaurants near ground zero blues club"
- **Locals** looking for "where to take my mother-in-law to dinner" moments
- **Business owners** who want to be listed where travelers look first

---

## The test

If a DSD page can be mistaken for a Big Muddy Magazine article, the voice is wrong. If it reads like a text from a friend with good taste, the voice is right.
