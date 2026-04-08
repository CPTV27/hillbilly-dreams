# Blues Room Studio Build-Out — Production & Podcast Hub

*April 7, 2026. Chase's spec from working session.*

---

## The Vision

The Blues Room at the Big Muddy Inn is simultaneously:
- A 50-seat live music venue
- A podcast studio
- A production hub for Studio C
- A content factory (every show = video + audio + photos + social)

Two production monitors double as set elements. Screens throughout the Inn show Chase's photography as ambient art. The van is both Studio C mobile production and Big Muddy Touring transport.

---

## Display Network

| Screen | Location | Use |
|--------|----------|-----|
| Samsung 65" | Wall (set element) | Photo slideshow + live camera feeds + show graphics |
| LG 43" 4K | Production desk | Monitoring + editing + control surface |
| Inn lobby screens | Throughout Inn | Photo slideshow + event info + Delta Dawn |
| Mac Mini (192.168.4.37) | Rack | Plex server driving all slideshows |
| MacBook Pro | Production desk | Primary editing + deployment |

**All screens show Chase's photography at all times when not in production mode.**
Plex drives the slideshows from the 93 photos on the T7 drive + GCS photo library.

---

## Audio System

### Brain: Midas / Soundcraft Digital Mixer
- **Preferred:** Midas MR18 (18-input, rack-mount, WiFi control) ~$650
  - OR Soundcraft Ui24R (24-channel, rack-mount, browser control) ~$900
  - OR Behringer XR18 (same as Midas MR18, different branding) ~$550
- Amy controls the mix in real-time from an iPad — she CAN do this
- This is the main recorder and the control surface
- Dante/AES67 output option for future expansion

### Stage Box
- 16-channel stage box in a rack case
- XLR snake from stage to rack (50-75ft)
- Rack case with:
  - Digital mixer (brain)
  - 6 channels wireless (Sennheiser)
  - Power distribution
  - Patch bay

### Wireless Microphones
- **Sennheiser EW-D series** (digital, reliable) — 6 channels
  - 2x handheld for vocals
  - 2x bodypack for instruments/lavalier
  - 2x bodypack for podcast guests
- ~$600-800 per channel = $3,600-4,800 for 6 channels

### Podcast Setup
- Existing Zoom P8 feeds INTO the Midas/Soundcraft as a submix
- P8 handles podcast-specific routing (headphone mixes, USB recording)
- The brain records the master; P8 is a feed source, not the recorder

### Cable Infrastructure
- 16-channel XLR snake (50ft) — stage to rack
- 8-channel XLR snake (25ft) — podcast desk to rack
- Cat6 runs for network (mixer control, Plex, streaming)
- HDMI runs to both monitors from Mac Mini + MacBook Pro

---

## Video System

### Camera Package
- **DJI RS gimbal x2** with Sony cameras mounted
- **DJI video transmitter** → wireless feed to control module
- **DJI "Big Daddy" control module** — master switching/monitoring
- **DJI Osmo** — handheld/run-and-gun
- **Sony kit** — Chase's existing camera bodies + lenses

### Lighting
- **Aputure lights** (from equipment spec: 2x 300d or equivalent)
- **C-stands** — minimum 4, preferably 6
- LED panels for podcast desk fill light
- Practical/ambient lighting for the Blues Room set look

### Production Workflow
1. 2 gimbals + Osmo = 3 camera angles minimum
2. DJI wireless transmitter sends feeds to control module
3. Control module does live switching or records ISOs
4. Audio from Midas/Soundcraft syncs to video in post (or live)
5. Mac Mini ingests, processes, distributes

---

## The Van — Studio C Mobile + Big Muddy Touring

The Sprinter van serves dual purpose:
- **Studio C Mobile:** Carries the full production kit to remote locations
- **Big Muddy Touring:** Transports bands on the corridor circuit

### What Lives in the Van
- Camera cases (DJI gimbals, Sony kit, Osmo)
- Lighting cases (Aputure + C-stands)
- Audio rack case (mixer + wireless + snake)
- Laptop bags (MacBook Pro + iPad)
- Merch/records for shows

### Van Wrap
- See `docs/VAN_WRAP_SPEC.md` for design spec
- Half Studio C branding, half Big Muddy Touring
- Professional enough for corporate shoots, cool enough for shows

---

## Voice-Activated System

### What Chase Wants
- Voice commands to control the studio environment
- "Hey Siri, show my photos on all screens"
- "Hey Siri, switch to camera 1"
- "Hey Siri, start recording"
- "Hey Siri, Delta Dawn — how many shows this month?"

### Implementation
- Siri Shortcuts already working (Delta Dawn voice integration)
- HomeKit for smart lighting control
- Shortcuts can trigger:
  - Plex slideshow start/stop
  - Screen input switching (CEC over HDMI)
  - OBS scene changes (via API)
  - Recording start/stop
- Delta Dawn handles business queries via voice

---

## Shopping List (Estimated)

### Audio
| Item | Est. Cost |
|------|-----------|
| Midas MR18 or Soundcraft Ui24R | $550-900 |
| Sennheiser EW-D x6 channels | $3,600-4,800 |
| 16-ch XLR snake (50ft) | $200 |
| 8-ch XLR snake (25ft) | $120 |
| Rack case (4U) | $150 |
| Cables, adapters, misc | $200 |
| **Audio subtotal** | **$4,800-6,400** |

### Video
| Item | Est. Cost |
|------|-----------|
| DJI RS gimbal (if not owned) | $500-800 |
| DJI video transmitter | $200-400 |
| DJI controller/monitor | $400-800 |
| Aputure lights x2 | $1,200-2,000 |
| C-stands x6 | $300-600 |
| LED panels x2 | $200-400 |
| **Video subtotal** | **$2,800-5,000** |

### Total Estimate: $7,600-11,400

*Cross-reference with existing specs:*
- `docs/specs/STUDIO_C_GEAR_UPGRADE_APRIL_2026.md` ($11,754 Natchez upgrade)
- `docs/specs/IN_A_HOUSE_PRODUCTIONS_INVENTORY.md` (full 7-dept inventory)

---

## Priority Order

1. **Midas/Soundcraft mixer** — Amy needs this to run sound at shows NOW
2. **Wireless mics (at least 4 channels)** — can't do shows without them
3. **XLR snake** — connects stage to rack
4. **Aputure lights + C-stands** — makes everything look professional
5. **DJI video transmitter setup** — wireless camera feeds
6. **Voice automation** — Siri + HomeKit integration
7. **Van fit-out** — organize gear storage

---

## The Van — Triple Revenue Model

The Sprinter van isn't just transport. It's three businesses:

### 1. Big Muddy Touring — Band Transport
- Seats in for band + gear
- Corridor circuit runs (Memphis → Natchez → New Orleans)
- Revenue: built into show booking fees

### 2. Studio C — Mobile Production Unit  
- Camera cases, lighting, audio rack, grip gear
- Roll up to any location and shoot
- Revenue: production day rates ($1,500-3,000/day)

### 3. Studio C — Grip Van Rental
- Seats OUT, grip gear IN
- Rent to film productions as a self-contained grip truck
- C-stands, lights, apple boxes, sandbags, flags, frames
- Revenue: $500-1,000/day rental (industry standard for grip vans)

### Modular Interior
- Quick-release seat mounts — seats bolt in/out in 30 minutes
- Standardized rack cases that stack and lock
- Pegboard/slotted walls for grip gear organization
- Drawer system under the floor for cable/hardware storage

### Van Wrap — Dual Brand
- One side: Big Muddy Touring (dark, music, the corridor)
- Other side: Studio C (production, professional, clean)
- Or: unified design that reads as both — "Big Muddy Touring × Studio C"
- Professional enough for corporate film sets, cool enough for shows

### The Garage
- Dedicated parking/storage at the Inn
- Gear staging area
- Van prep and load-out space
- Doubles as a workshop for gear maintenance

### Why This Works in Natchez
- Film productions come to Natchez regularly (historic locations, tax incentives)
- No local grip van rental — nearest is Jackson or New Orleans
- We're already the only production company in town (Studio C)
- The van pays for itself on 2-3 film rental days per month
- Between shows, the van earns money sitting in the driveway

### The Indie Grip Van Concept

NOT a Sprinter with seats and some gear in the back. A proper hybrid indie grip van.

**What it is:** A self-contained production package on wheels. Cameras, lights, grip, audio — everything a small crew needs to walk onto a location and shoot. One truck, one crew, amazing results.

**The pitch to productions:** "You don't need three trucks and a 20-person crew. You need our van and two people. We show up with cameras, lights, grip, wireless audio, and a monitor wall. You get broadcast-quality content for indie prices."

**Configuration modes:**
- **Full production:** Cameras on gimbals, Aputure lights, C-stands, wireless audio, DJI control module, monitor — walk onto any location
- **Touring:** Swap in seats, band rides with backline, gear stays organized in cases
- **Grip rental:** Strip to grip essentials, rent to productions who have their own cameras

**What makes it "indie grip" not "cargo van with stuff":**
- Purpose-built shelving and case mounts
- Power distribution (inverter + shore power)
- Liftgate or ramp for heavy cases
- Cable management built into the walls
- Lighting pre-rigged on quick-deploy stands
- Monitor/DIT station that deploys from the tailgate

**Why "go light but do amazing stuff" works:**
- Sony A7 series + DJI gimbals = cinema-quality on a DSLR budget
- Aputure LEDs replace HMIs at 1/10th the weight
- Wireless everything (video, audio, control) eliminates cable runs
- One operator can run 2 cameras on gimbals via DJI controller
- The quality gap between a $50K RED package and a $15K Sony/DJI package is invisible to 95% of audiences
