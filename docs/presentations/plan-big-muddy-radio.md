# Plan — Big Muddy Radio

Owner: Chase Pierson
Status: Live but broken. Pre-revenue.
Last updated: 2026-04-29

---

## What it is

Big Muddy Radio is a 24/7 internet radio station streaming Mississippi-corridor music, interviews, and ambient programming at stream.bigmuddytouring.com. Currently running AzuraCast on a DigitalOcean droplet (`bigmuddy-radio`, 206.189.200.208) with SSL broken — operational blocker we need to fix this quarter.

---

## What's working today

Some things, mostly the boring parts.

- AzuraCast install is up and serving audio.
- DigitalOcean droplet is paid and stable.
- Stream URL is live but currently HTTP-only because Let's Encrypt cert expired/never renewed.
- Bitwarden has the AzuraCast admin credentials.
- A starter rotation exists from Chase's library.

What's NOT working:
- SSL is broken — browsers throw warnings, embeds fail on HTTPS sites.
- No regular programming schedule.
- No live shows.
- No interview content.
- No listeners (because nobody's been told it exists).
- No revenue. No ad inventory. No sponsor list.

The station exists in the same way a dark restaurant with the lights on exists. Open in theory. Empty in practice.

---

## The economics

Radio is a 12–24 month brand and audience play. Year 1 revenue forecast: **$0**.

Year 1 cost:
- DigitalOcean droplet: ~$24/mo = $288/yr
- AzuraCast: free (open source)
- SoundExchange / SESAC / BMI / ASCAP statutory licensing for non-original music: ~$500–$1,500/yr depending on listener count
- Domain (already owned via stream.bigmuddytouring.com subdomain): $0
- Talent: in-house only — Arrie hosts, Chase produces

Total Year 1 spend: ~$800–$1,800. Manageable.

Year 2+ revenue model (when it starts):
- Local sponsor reads (Inn, Touring, Magazine, Records — internal first, then external)
- Pre-roll ads via programmatic audio network (only at scale — minimum 1,000 monthly listeners)
- Sponsored programming blocks (e.g. "Adams County Tourism Hour")
- Listener support / membership (slow build)

Don't model ad revenue until we hit ~1,000 unique monthly listeners. Probably late 2027.

---

## The customer

Three audience layers:

1. **The Big Muddy ecosystem audience first.** Inn guests, show attendees, Magazine readers, Touring fans. Captive and warm.
2. **Mississippi-corridor music listeners.** Blues, Americana, gospel, country fans within driving distance of the corridor. Geographic + genre overlap.
3. **Out-of-region music nerds.** People who care about regional scenes. NPR-adjacent. Slow but loyal.

Not competing with terrestrial radio. Not competing with Spotify. Competing with silence in coffee shops, hotel lobbies, and people's home offices who want a real human-curated stream.

---

## The 12-month plan

**Q2 2026 (May–Jun) — Stop being broken**
- Fix SSL: install certbot, renew cert, set up auto-renewal on the droplet
- Verify HTTPS embeds work on bigmuddytouring.com and bigmuddymagazine.com
- Document the fix in CANONICAL_INFRASTRUCTURE so it doesn't happen again
- Build a real rotation: 100+ tracks across blues, Americana, corridor artists

**Q3 2026 (Jul–Sep) — Add programming**
- Arrie hosts a weekly 1-hour show (pre-recorded, dropped in rotation)
- First 5 artist interviews recorded at the Inn
- Add to Big Muddy Radio app on TuneIn / Radio Garden / Streema directories
- Embed the player on every Big Muddy property footer

**Q4 2026 (Oct–Dec) — Build audience**
- Promote via Magazine: weekly "now playing" column
- Promote at shows: QR code on every Touring tour banner
- First sponsor read trial: Inn promotes itself on Radio (free, internal proof)
- Hit 100 monthly unique listeners

**Q1 2027 (Jan–Mar) — Decide on monetization path**
- Target: 250+ monthly uniques
- If yes, pitch first external local sponsor at $50/month read
- If no, hold — keep running, costs are low

---

## What we need to make it happen

**People**
- Chase: technical operator, programming director (until we hand it off)
- Arrie: show host, interview talent (per arri-content-planner skill)
- Tracy: nothing in Q2; sponsor contract drafting in Q4 if we get there

**Money**
- ~$1,500 for the year. Comes out of MBT operating budget.

**Tools**
- AzuraCast (already running)
- Audio interface + 2 mics for interviews at the Inn (already owned)
- Embed player code (one-time dev task, Patch handles)

**Infrastructure**
- Fix: SSL cert (this week)
- Add: TuneIn / Radio Garden directory listings (Q3)
- Add: Embed player on all Big Muddy properties (Q3)

---

## The risk

1. **SSL stays broken.** As long as it does, we look incompetent and embeds don't work. This is the #1 blocker. Fix it.
2. **Nobody listens.** Radio without listeners is a hobby. We mitigate by being honest — it IS a hobby in 2026 and that's fine, because the brand value of "Big Muddy has its own radio station" exceeds the cost.
3. **Statutory licensing surprises.** If we grow too fast without proper SoundExchange registration, we get a back-bill. Register now, before we have listeners, when fees are minimum.
4. **Talent dependency on Arrie.** If Arrie burns out or moves, programming dies. Mitigate by building rotation that runs 24/7 without live shows.

---

## Why it matters to the ecosystem

Radio is the connective tissue. It plays the records, promotes the shows, interviews the artists, and runs in the background of every Big Muddy property.

- **Records uses it.** Every Big Muddy Records release goes into rotation immediately. Free promotion to a captive audience.
- **Touring uses it.** Pre-show interviews with bands. "Here's the opening act tonight, on at 9." Cross-promo without ad spend.
- **Magazine uses it.** Editorial pairs with audio: "Read the interview, hear the song." Drives time-on-page.
- **Inn uses it.** Lobby and bar default to Big Muddy Radio. Guests hear the brand 24/7.
- **MBT uses it.** Demonstrable proof that "Powered by MBT" runs an actual media stack. When pitching B2B clients, "we run our own radio station" is a credibility line that competitors can't match.

The station is also a recruiting tool. Artists who get interviewed on Big Muddy Radio remember it. Artists who hear themselves in Inn lobby playback remember it. That's roster pipeline for Touring and Records.

Cost is rounding error. Brand value compounds.

---

## Decision needed

Approval to spend ~4 hours of Patch time fixing SSL this week. Everything else is on the existing plan.
