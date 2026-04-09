# Sovereign Pi — Product Specification

*A computer for your business that works without the internet.*

## Product Line

### Base Unit: Sovereign Pi Core
- **Free** with any DSD paid tier ($25+/mo)
- **$299** standalone purchase
- Pi 5 8GB + 256GB NVMe + aluminum case + pre-loaded software
- COGS: $165 | Margin: 45% standalone, breakeven 2mo on subscription

### Add-Ons
| Add-On | Retail | COGS | Margin |
|--------|--------|------|--------|
| Battery Pack (20000mAh, 65W PD) | $59 | $35 | 41% |
| Solar Kit (20W foldable panel) | $49 | $30 | 39% |
| Faraday Shield (RF enclosure) | $39 | $15 | 62% |
| Display Cable (6ft HDMI) | $9 | $5 | 44% |
| **Full Sovereign Bundle** | **$129** | **$85** | **34%** |

### Display Module (additional screens)
- **$99** one-time per screen
- Same Pi hardware, configured as display-only
- Managed via /admin/kiosk

### Signage Network (managed service)
- **$199/mo** for up to 5 screens
- Content management, scheduling, dayparting
- We manage the content for them

## Connectivity Modes

### Mode 1: Online (WiFi/Ethernet)
Standard mode. Pi connects to business WiFi. Syncs with DSD cloud.
Full features: social posting, review monitoring, live data.

### Mode 2: Offline
No internet at all. RAG search works locally. Dashboard shows cached data.
Social posting queues until online. Everything stored locally on NVMe.

### Mode 3: Phone Tethering
Pi connects to phone hotspot via USB tethering or WiFi.
Use case: Arkansas property, food trucks, pop-up markets, anywhere with cell signal but no WiFi.
Syncs over cellular, then runs offline when tethering disconnects.

### Mode 4: Solar + Battery (Off-Grid)
Battery provides 4-6 hours. Solar extends indefinitely in daylight.
Combined with phone tethering: fully portable, fully autonomous.
Use case: outdoor markets, festivals, field demos, off-grid properties.

## Software Stack

### Pre-installed
- Node.js RAG service (business AI, codebase search)
- Express API server (local dashboard, captive portal)
- Plex client (media playback to HDMI)
- Auto-sync daemon (pulls latest when online)

### Cloud sync (when online)
- DSD directory data for the region
- Social media queue (posts when connected)
- Review alerts and AI-drafted responses
- Content calendar updates
- Business profile changes

### Lobby TV Mode (HDMI output)
- Menu boards (JSON-driven, updated via admin)
- Instagram feed (cached, refreshes when online)
- Big Muddy Radio stream (when online) or local playlist (offline)
- Specials rotation (dayparted — breakfast/lunch/dinner)
- Event schedule / tonight's lineup

### WiFi Captive Portal Mode
- Pi creates its own WiFi network ("YourBusiness-Guest")
- Guests connect and see a branded splash page
- Email capture, tonight's events, local directory
- Works without upstream internet (portal is self-contained)

## Configuration Builder (website)

Page: /store/sovereign-pi

1. Choose base: Free with DSD ($25+/mo) or Standalone ($299)
2. Add-ons: Battery ($59), Solar ($49), Faraday ($39), HDMI ($9)
3. Bundle discount: All 4 for $129 (save $27)
4. Checkout: Stripe (standalone) or add to DSD onboarding flow

## Fulfillment

### Phase 1: Hand-built (Apr-May 2026)
- Chase assembles each unit
- Pre-loads with business data during DSD onboarding
- Hand-delivers during walk-in sales visits
- Capacity: 5-10 units per week

### Phase 2: Batch assembly (Jun-Aug 2026)
- Order 25-50 units of parts
- Assembly line at the Inn (Tracy/Amy help)
- Ship via USPS Priority or hand-deliver locally
- Capacity: 20-30 units per week

### Phase 3: Amazon FBA (Sep 2026)
- Ship pre-assembled units to FBA warehouse
- Amazon handles fulfillment, returns, customer service
- List at $499 (custom) and $299 (bare)
- DSD members get a coupon code for $0

## Marketing

### Channels
- Walk-in demo (Chase carries one in his bag)
- DSD website (/store/sovereign-pi)
- Amazon listing
- Big Muddy Magazine feature article
- Big Muddy Radio mention
- Outsider Economics case study (technology sovereignty chapter)
- Social media: Instagram reels of the unboxing + setup
- Flyer: update walk-in flyer to include Pi

### Copy Direction
- "Your business brain in a box"
- "Works without the internet"
- "Free with your membership"
- "Your data on your desk, not in someone's cloud"
- Sovereignty angle for the prepper/independence market
- Practical angle for rural businesses with bad internet
- Demo angle: "Watch me plug this in and your menu appears on the TV"

### Photography (Chase shoots these)
- Product on white background (Amazon listing)
- On a restaurant counter next to the register
- Plugged into a TV showing a menu board
- On an outdoor table with solar panel (food truck)
- In a Faraday bag (security angle)
- In Chase's backpack (walk-in sales)
- Next to a phone with the admin dashboard open

## Revenue Projections

### Conservative (Year 1)
- 50 DSD subscribers with Pi → $0 hardware revenue, $60K subscription revenue
- 20 standalone purchases at $299 → $5,980
- 30 Display Modules at $99 → $2,970
- 5 Signage Network at $199/mo → $11,940
- Add-on attach rate 40% at avg $60 → $1,680
- **Total: ~$82,570**

### With phone tethering + Arkansas demo
- Rural market: 20 off-grid businesses at $99/mo → $23,760
- Festival/pop-up market: 10 seasonal at $50/mo x 6mo → $3,000
- **Additional: ~$26,760**

## Timeline

| Date | Milestone |
|------|-----------|
| Apr 7 | Tracy orders parts |
| Apr 10 | Parts arrive |
| Apr 12 | First prototype (demo at art show?) |
| Apr 17 | Soft launch — Chase walks in with Pi |
| Apr 27 | Full launch — Pi on the store page |
| May | First 10 units shipped to DSD clients |
| Jun | Batch assembly begins |
| Sep | Amazon FBA listing |
