# Born Free — Product Spec

*Internet in a box. Media infrastructure without Silicon Valley.*

**Status:** Prototype spec, pre-build (v0.1)
**Owner:** HDI — ships under The Movement
**Last updated:** 2026-04-16

---

## What Born Free Is

A Raspberry Pi that, when plugged into power and a network, becomes:

- A working internet radio station
- A community chat/voice server
- A personal music streaming library
- A web presence (landing page, about, contact)
- A remote-accessible admin dashboard

All open source. All in one SD card image. Runs on ~$140 of core hardware (Pi + peripherals).

## What Born Free Is NOT

- A hardware business (we don't stock inventory)
- A SaaS (no monthly fees, no phone-home, no cloud lock-in)
- A commercial MBT replacement (MBT Civic is the commercial product line — separate)
- A Chase-operated thing (fulfillment is Sean or a partner)

---

## Two Audiences, One Product

| Audience | Pitch | Primary Channel |
|---|---|---|
| Regional creative economy / civic tech | "Your town's own media infrastructure" | Twitter / LinkedIn |
| Preppers / homesteaders / ham radio / off-grid | "Sovereign comms, SHTF-ready, off-grid station" | YouTube / TikTok / Reddit |

Same Chase. Same hardware. Different framing per platform.

---

## Hardware Tiers

All prices reflect April 2026 US retail. Update before ordering.

### Tier 0: DIY (Free)

Flash the SD image to your own Pi. GitHub repo, installation guide, full source. The philosophy play.

### Tier 1: Proof Kit — **$450 retail** (hardware cost ~$290)

For someone who wants the easy button but doesn't need studio-quality audio.

| Item | Cost |
|---|---|
| Raspberry Pi 5 (8GB) | $80 |
| Official 27W USB-C PSU | $12 |
| Official active cooler | $5 |
| SanDisk Extreme 128GB microSD (A2) — pre-flashed | $17 |
| FLIRC aluminum case | $25 |
| Ethernet cable (2m) | $5 |
| Behringer UMC22 USB audio interface | $55 |
| Samson Q2U USB/XLR dynamic mic | $70 |
| Audio-Technica ATH-M20x headphones | $50 |
| **Hardware subtotal** | **$319** |
| Packaging + printed setup guide | $15 |
| Assembly + test time (1hr) | $50 |
| **Cost basis** | **~$384** |
| **Retail price** | **$450** |
| **Margin per unit** | **~$66** |

### Tier 2: Show Kit — **$899 retail** (hardware cost ~$620)

The road demo kit. What Chase brings to meetings. Good enough audio to actually broadcast a podcast.

| Item | Cost |
|---|---|
| Raspberry Pi 5 (8GB) | $80 |
| 27W PSU + active cooler | $17 |
| SanDisk Extreme 128GB microSD — pre-flashed | $17 |
| Argon ONE V3 case (HAT with audio/video) | $35 |
| Ethernet cable | $5 |
| **Focusrite Scarlett Solo (4th gen)** | $119 |
| **Shure MV7 USB/XLR mic** | $249 |
| Audio-Technica ATH-M40x | $99 |
| **Hardware subtotal** | **$621** |
| Packaging + printed setup guide | $20 |
| Assembly + test time (1.5hr) | $75 |
| **Cost basis** | **~$716** |
| **Retail price** | **$899** |
| **Margin per unit** | **~$183** |

### Tier 3: Station Rack — **Custom quote, $2,500-$4,500**

A "full studio in a box" build. For small-town operators, churches, community radio applicants, serious podcasters.

Add to Tier 2:
- Rodecaster Pro II OR Behringer Xenyx Q1202 USB mixer
- Second mic + boom arm
- 7" HDMI touchscreen (for visible dashboard)
- Portable speaker (JBL Flip or Bose SoundLink)
- Small rack case or Pelican-style transport box

Quoted individually. Probably 3-4hr assembly each.

---

## Software Stack

Everything runs in Docker Compose. Single-command startup.

| Component | Role |
|---|---|
| Raspberry Pi OS Lite (64-bit) | Base OS |
| Docker + Docker Compose | Container runtime |
| **AzuraCast** | Full web radio station — DJ UI, playlists, streaming, automation. The star. |
| Icecast 2 | Stream server (AzuraCast bundles this) |
| Liquidsoap | Source client / audio automation |
| Navidrome | Personal music library streaming (secondary catalog, Subsonic-compatible) |
| Nginx | Web server for the landing page |
| Mumble server | Voice comms (community demo) |
| Tailscale | Remote access without port forwarding |
| Uptime Kuma | Service monitoring dashboard |
| Custom MBT-lite landing page | Branded front door — "This is {station-name}" |

Optional add-ons (later):
- Jitsi Meet (video comms)
- Matrix/Synapse (federated chat)
- Nextcloud (files/calendar)
- Pi-hole (network-wide ad blocking — a favorite prepper feature)

---

## Build Process

### Phase 1: First Prototype (Weekend 1)

1. Order Tier 2 parts. 2-5 day delivery.
2. Flash Raspberry Pi OS Lite to SD card
3. `ssh` in, run bootstrap script:
   - Install Docker
   - Pull Docker Compose file from the repo
   - `docker compose up -d`
4. Seed AzuraCast with a Big Muddy Radio playlist (50+ tracks)
5. Customize Nginx landing page with Big Muddy branding
6. Configure Tailscale for remote access
7. Test broadcasting from the Shure MV7
8. Record a demo video

**Estimated dev time:** 15 hours.

### Phase 2: Bake the Image

1. Snapshot the working SD card to a `.img` file
2. Compress with `xz`
3. Upload to GitHub Releases
4. Write `flash-me.sh` helper script
5. Document the flash process

**Estimated dev time:** 4 hours.

### Phase 3: Variant Images

- `born-free-blank.img` — unbranded, user configures their own station name
- `born-free-bigmuddy.img` — Big Muddy branded (for our own demos)
- `born-free-prepper.img` — extra tools: Pi-hole, Syncthing, offline map server, ham radio bridges

**Estimated dev time:** 8 hours.

---

## GitHub Repo Structure

```
born-free/
├── README.md                       # paradigm pitch + 30-second quickstart
├── LICENSE                         # MIT or GPL — decide at launch
├── docker-compose.yml              # everything in one file
├── install.sh                      # bootstrap script (curl | sudo bash)
├── flash-me.sh                     # helper for writing the .img
├── images/
│   ├── born-free-v1-blank.img.xz
│   ├── born-free-v1-bigmuddy.img.xz
│   └── born-free-v1-prepper.img.xz
├── config/
│   ├── azuracast/
│   ├── nginx/
│   ├── mumble/
│   └── landing-page-template/
├── docs/
│   ├── hardware-tiers.md
│   ├── setup-guide.md
│   ├── station-in-a-day.md         # launch your own radio
│   ├── prepper-loadout.md          # Pi-hole, offline maps, ham bridges
│   └── civic-deployment.md         # "your town's station" guide
└── branding/
    └── landing-page-template/
```

---

## Fulfillment Model — Build-to-Order

No inventory. No warehouse. No commitments.

1. Order comes in via bornfree.io (or bigmuddyradio.com/shop)
2. Stripe charges the customer
3. Sean (or fulfillment partner) receives the order notification
4. Parts ordered from Amazon/B&H (~2-5 day arrival)
5. Assembly + test (1-1.5 hr per kit)
6. Flash SD with latest image
7. Pack + ship USPS Priority or UPS Ground
8. Tracking emailed to buyer

**Stated lead time:** 10-14 business days.

**Customer touch:**
- Order confirmation email (automated)
- "Your kit is being built" email when parts arrive at Sean's
- "Your kit shipped — here's tracking" email
- Setup email the day it arrives: "Plug it in, open this URL, you're broadcasting"
- 30-day check-in email: "How's it going? Need anything?"

---

## Pricing Summary

| Product | Price | Margin |
|---|---|---|
| DIY SD image | Free | $0 |
| Pre-flashed SD card (mailed) | $50 | $30 |
| Tier 1 Proof Kit | $450 | $66 |
| Tier 2 Show Kit | $899 | $183 |
| Tier 3 Station Rack | Quote ($2,500-$4,500) | 20-30% |
| "We build your station" consulting | Hourly or project-based | N/A |

**Realistic volume assumption:** 20-30 kits/year mixed across tiers. Margin contribution: **$10-15K/yr.** Not a business — supplemental revenue that funds more Born Free development.

---

## Sales Channels

**Organic (free):**
- Chase on Twitter/X — paradigm-shift + build-in-public content
- Chase on TikTok — "off-grid tech" niche
- YouTube demo videos (the highest-conversion channel for this audience)
- Reddit: r/preppers, r/HamRadio, r/homestead, r/selfhosted, r/podcasting
- Born Free GitHub repo itself (star count = discovery)

**Paid (later, if warranted):**
- Ham radio podcast sponsorships
- Prepper newsletter ads (e.g., The Prepared)
- YouTube creator partnerships

**Events:**
- Prepper conventions (PrepperCon, SurvivalCon)
- Ham radio events (Hamvention, Dayton)
- Maker faires
- Local Natchez / Deep South events — where we also pitch MBT Civic

---

## Risk / Open Questions

1. **Music licensing:** if Born Free ships preloaded with music, we need clean rights. Ship empty or with only explicitly licensed material. Buyers bring their own catalog.
2. **Support burden:** preppers + ham folks are technically capable but will still ask questions. Discord/Matrix community is essential — let users support each other.
3. **SKU sprawl:** resist the urge to add more tiers. Three hardware tiers + SD card + DIY is enough.
4. **Competitive landscape:** MiSTer FPGA community, various retro-radio Pi projects, Hak5 products. Born Free is differentiated by: the media-station focus, the open-source MBT backbone, and the Deep South / regional-economy narrative.
5. **Natchez + Paul Green civic deal overlap:** if MBT Civic lands in Natchez, is Born Free a threat to the licensed MBT Civic product? No — Born Free is the "anyone can run this" version, MBT Civic is the managed/serviced version with commercial support. Different buyers.

---

## Next Actions

- [ ] Register bornfree.io (and/or use `bigmuddyradio.com/shop`)
- [ ] Order Tier 2 parts for the first prototype build (~$620)
- [ ] Chase or Sean: weekend build session to bake v0.1 image
- [ ] Record demo video — unboxing through broadcasting, 8-10 minutes
- [ ] Publish repo at github.com/hillbilly-dreams/born-free
- [ ] Soft-launch on Twitter to gauge interest before opening orders
- [ ] If interest > 5 serious inquiries → open build-to-order on Shopify

---

*Nobody else can tell this story from Natchez. That's the moat.*
