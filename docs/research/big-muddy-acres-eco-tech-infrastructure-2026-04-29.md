# big muddy acres — eco-tech infrastructure research

date: 2026-04-29
location: mississippi (climate: hot humid summers, mild winters, no hard freeze)
context: studio-anchored creative community. RV sites @ $500/mo phase 1 cash flow. tiny homes + cooperative housing phase 2. music + creative residencies as cultural anchor.
owner: hillbilly dreams / measurably better things ecosystem

---

## executive summary

mississippi's no-freeze climate is a real engineering edge — kills the need for frost-line trenching, freeze-proof spigots, heat-tape line wraps, and protected pump houses. pour utilities at 12-18" instead of 30-36", use direct-burial pedestals, run greywater systems year-round without winterization shutdown. that alone saves ~15-20% on civils vs a temperate-zone build. counter-pressure: hurricane wind zones (gulf-six counties = wind zone II for factory-built homes), high humidity = corrosion + mold, clay soils = drainage challenges. natchez sits in adams county which historically declines IRC enforcement — fewer plan-review hurdles, but you're on your own for engineering rigor. realistic phase 1 cap-ex per RV site: **$18-32k all-in** depending on shared infra amortization. tiny home pad phase 2: **$45-85k per pad** including utilities, anchoring, and code-permitted structure.

---

## 1. POWER

### a. solar microgrids (RV pedestals + shared loads)

most operators do NOT do per-pedestal solar. economics are awful — RV uses 30-50 kWh/day, solar to cover that costs $4-8k/site of panels alone. **better pattern: shared central array + battery + smart distribution.**

| approach | $ range | notes |
|---|---|---|
| **central PV + battery + grid-tie** (50-100 kW) | $90-180k installed | offsets common loads (bath house, office, EV chargers, ~30% of RV load). 5-7 yr payback w/ MS net metering through Entergy/Magnolia Electric. |
| **per-site small solar + grid-tie** | $4-8k/site | only worth it for premium "off-grid" branded sites you charge 2x for. |
| **EcoFlow / generac PWRcell hybrid** | $25-60k modular | bolt-on, expandable. easier permitting than large fixed array. |

**vendors to actually contact:**
- **Sunpro Solar (now ADT Solar)** — gulf south footprint, MS commercial work
- **Lightwave Solar / Pearl Power Solutions** — TN/MS commercial
- **EcoFlow Power Kits** for distributed/modular
- local: **Mississippi Solar LLC** (Jackson, MS) — has done campground work

source: campgrounds report 30-50% utility reduction post-solar; 3-5 yr ROI on 20-site shared arrays per industry data.
https://software.camplife.com/blog/septic-systems-for-rv-parks-costs-and-considerations
https://www.roverpass.com/blog/rv-solar-panels/

### b. battery storage

residential-class powerwall economics extended to small commercial:

| product | capacity / unit | install cost | best use |
|---|---|---|---|
| **Tesla Powerwall 3** | 13.5 kWh | $15.3-16.2k installed | grid-tie backup, peak shaving |
| **Enphase IQ Battery 5P** | 5 kWh modular | ~$1,300-1,400/kWh | scale-up flexibility, MID switching |
| **Sol-Ark 15K + EG4 LiFePO4** | configurable | $0.60-0.90/Wh installed | true off-grid, lower $/kWh |
| **Generac PWRcell** | 9-18 kWh | $14-22k installed | dealer-supported in MS |

**recommendation:** start with one Sol-Ark inverter + 30 kWh EG4 stack tied to a small (15 kW) shared array. ~$45k all-in. powers office, bath house, well pump, maintains lights through hurricane outages. expand modularly.

sources:
https://www.solarreviews.com/blog/is-the-tesla-powerwall-the-best-solar-battery-available
https://nuwattenergy.com/en/battery-storage-cost-2026

### c. EV charging integration

RV park 50A pedestals already deliver 240V/50A — that's effectively a level-2 EV charger. but: pulling 40-50A continuous off a pedestal blows the load calc. proper play:

- install 2-4 dedicated **ChargePoint CT4000** or **EnelX JuiceBox Pro 80** L2 stations near common areas. ~$1,500-3,500/unit equipment + $2-5k install each.
- one **DC fast charger** (50 kW) if site is on a corridor — $40-75k installed. apply for **NEVI funds** (MDOT) + **Inflation Reduction Act 30C** (30% credit, up to $100k/charger for commercial).
- mark certain RV pedestals "EV permitted, $15-25/night surcharge" as low-friction phase 1.

vendors:
- **ChargePoint** (best fleet management software)
- **EnelX JuiceBox** (lower entry cost, decent OCPP)
- **Blink Charging** (turnkey hosted model, takes a cut, zero upfront)

source: https://www.energysage.com/news/ev-charging-rv-parks-campgrounds/

### d. smart power metering / per-site automated billing

this is the highest-ROI tech investment in the entire build.

| vendor | model | $/site (est) | notes |
|---|---|---|---|
| **Wild Energy** | smart-pedestal submeter w/ PMS integration | ~$300-600/site equipment + setup; quote-only | best PMS integration (KOA, others). 18-mo ROI typical, up to 35% usage reduction. |
| **Vutility HotDrop** | clamp-on, no rewire | $200-400/site, lifetime license (no subscription) | fastest install, no electrician required for some configs |
| **EKM Metering** | hardwired w/ 485Bees wireless | $150-300/site + gateway | DIY-friendly, robust API |
| **CampLife Remote Meter Reading** | bundled w/ PMS | included w/ subscription | locks you into CampLife PMS |

**recommendation:** Wild Energy if you commit to one of their integrated PMS partners; Vutility if you want flexibility + no subscription lock-in.

sources:
https://wildenergyco.com/pages/rv-parks-and-campgrounds
https://vutility.com/blog/campground-energy-management-cutting-costs-improving-guest-experience
https://www.ekmmetering.com/pages/rv-parks

---

## 2. WATER + WASTE

### a. greywater recycling

NSF/ANSI 350 + IAPMO 324 govern. campgrounds classed as commercial buildings — same approval path as hotels. systems can cut water cost up to 45%.

| vendor | scale | $ range | notes |
|---|---|---|---|
| **Aqua2use / Water Wise Group** | distributed (per-cluster) | $3-8k/cluster | proven, NSF-compliant |
| **Greyter Home/HC** | central commercial | $25-60k installed | full-property scale, used by hotels |
| **ECOnsult / NEXtreater** | engineered membrane bio-reactor | $80-200k | overkill for phase 1, future option |

**phase 1 play:** route bath house showers + laundry to a central Aqua2use system feeding non-potable irrigation. ~$10-15k installed. 30-min/week maintenance.

source: https://insiderperks.com/blog/sustainability-accessibility/greywater-recycling-boost-eco-credentials-and-profits-at-glamping-resorts/3/

### b. composting toilets (tent / glamping)

self-contained, no plumbing, no permit hassle in MS rural counties.

| product | price | capacity |
|---|---|---|
| **CompoCloset Cuddy** | $999 | ~2 weeks for 2 ppl |
| **CompoCloset Cuddy Lite** | $899 | same, no agitator |
| **Separett Villa 9215** | $639 | urine-separating, 12V/AC |
| **Nature's Head** | $1,030 | RV/marine standard |
| **Sun-Mar Centrex 1000** | $2,100-3,500 | high-throughput, central composting unit for shared facility |

**glamping deploy:** Cuddy or Separett per platform, $700-1k per site. one Sun-Mar central unit serves a multi-tent cluster for ~$3.5k.

sources:
https://compocloset.com/products/cuddy
https://separett.shop/collections/composting-toilets

### c. rainwater harvesting at scale

mississippi gets ~55-60" annual rainfall — high yield. legal in MS without restriction.

| storage size | $ range (poly) | $ range (steel) | use |
|---|---|---|---|
| 2,500 gal | $1,200-2,500 | $2,000-4,000 | single-bath irrigation |
| 5,000 gal | $2,000-4,000 | $3,000-6,000 | small bath house non-potable |
| 10,000 gal | $4,000-8,000 | $6,000-12,000 | full property non-potable, fire reserve |
| 20,000+ gal underground | $15-24k | n/a | full backup, drought reserve |

**phase 1 play:** two 5,000-gal poly cisterns ($6-8k installed) catching bath house roof + studio roof. plumb to irrigation + toilet flush. doubles as hurricane/grid-out reserve.

source: https://homeguide.com/costs/rainwater-system-cost

### d. sewer alternatives — mississippi-specific

the mississippi onsite wastewater rules (title 15, ch. 12) are the governing doc. for high-density RV parks, four real options:

| option | when to use | $ range (50-site park) |
|---|---|---|
| **municipal sewer tie-in** | if available within ~1,500 ft | $50-150k extension + tap fees |
| **conventional septic w/ multiple drainfields** | sandy/loamy soil, perc test passes | $80-200k, requires acreage |
| **lagoon (oxidation pond)** | clay soil, rural, available land | $40-120k, needs ~1 acre + 2-ft freeboard berm. clay-loam soils don't need liner; others need 20 mil + 6" clay |
| **engineered mound system** | poor perc, high water table | $30-80k for shared mound, expensive per-site |
| **packaged wastewater treatment plant (Orenco AdvanTex / FAST)** | high density, want clean discharge | $100-250k, easier permitting in tight conditions |

**natchez/adams county note:** mississippi state dept of health issues onsite permits. licensed installer required. soil tests + engineered plans mandatory regardless of county code laxity. lagoon is often cheapest in adams county clay if you have the acreage.

source: https://www.roverpass.com/blog/rv-park-septic-system-cost/

---

## 3. CONNECTIVITY

### a. starlink roam vs fiber (rural mississippi)

honest take: check fiber FIRST. **C Spire fiber** has expanded aggressively in MS (natchez has partial coverage as of 2026); **AT&T fiber** in pockets. if available within reasonable run, fiber wins on every metric.

| option | $ install | $ monthly | speed | notes |
|---|---|---|---|---|
| **fiber (C Spire / AT&T business)** | $0-2k drop | $80-300/mo (250-1000 Mbps) | excellent | best if available. zero weather risk. |
| **starlink business priority** | $599 hardware (free w/ promos) | $250/mo, 1TB priority | 100-300 Mbps typical | works anywhere, oversubscription in MS is real (sub-10 Mbps reported in saturated areas) |
| **starlink roam regional** | $599 | $150/mo, 50GB priority | 50-150 Mbps | underwhelms for >5 active users |
| **dual-WAN failover** (fiber + starlink) | combined | $400-500/mo | best of both | one router handles failover (peplink, ubiquiti UDM-Pro) |

**phase 1:** starlink business priority at the studio + bath house for day 1, parallel-track fiber ISP install. switch to fiber-primary + starlink-failover within 6 months.

sources:
https://www.usmobile.com/blog/starlink-roam-vs-residential/
https://www.usmobile.com/blog/starlink-cost/

### b. per-site mesh wifi

**Ubiquiti UniFi** is the de facto standard for campground deployments. weatherproof, mesh-capable, single dashboard.

| ap | price | coverage | use |
|---|---|---|---|
| **UniFi U6-Mesh** | $179 | 300+ devices, ~150 ft outdoor radius | best new deploy, WiFi 6 |
| **UAP-AC-M Pro** | $199 | wide-area outdoor mesh | budget, WiFi 5 |
| **UniFi UAP-AC-M** | $109 | small outdoor cell | low-density coverage |
| **UDM Pro SE** controller | $499 | central management + PoE | one per property |

**phase 1 mesh design:** 1 UDM Pro + 6-8 U6-Mesh APs = ~$1,800-2,200 covers ~50 RV sites + bath house + studio. PoE switch ($300-500). cat6 conduit run during initial trenching saves a fortune later.

source: https://ui.com/wifi/outdoor

### c. smart locks / keyless RV check-in

less relevant for transient RV sites (guests bring their own RV). highly relevant for glamping, bath houses, and tiny homes.

| product | $ per door | platform |
|---|---|---|
| **RemoteLock OpenEdge** | $300-500 + $5-15/mo/door | central PMS integration, code expiry tied to reservation |
| **Schlage Encode (z-wave)** | $250-300 + hub | DIY-tier, less PMS integration |
| **August Smart Lock + bridge** | $230-280 | residential-grade |
| **Yale Assure SL** | $200-300 | strong RemoteLock support |

**recommendation:** RemoteLock is the only one with mature campground/PMS integration. integrates w/ Cloudbeds, Newbook, RoverPass, Campspot.

source: https://remotelock.com/vacation-rental/unlock-access-control-for-campgrounds-and-rv-parks-with-remotelock/

---

## 4. SITE BUILD

### a. permeable paving for RV pads

mississippi clay = drainage problem. permeable paver grids over geotextile fabric over compacted base solves both load and drainage.

| product | $ /sq ft | load rating |
|---|---|---|
| **TRUEGRID Pro Lite** | $4-6 (incl gravel fill) | 120,000 lb |
| **TRUEGRID Pro Plus** | $6-9 | heavier-duty, 120k lb |
| **Vodaland EasyPave** | $3-5 | mid-grade |
| **Geocell (Presto Geosystems GEOWEB)** | $2-4 + fill | flexible cell, deep build |

**RV pad spec:** 12x40 ft = 480 sq ft. base = 8-12" compacted aggregate over geotextile. paver grid ($1,500-2,800/pad) + gravel ($300-500). total per pad = **$2,000-3,500**. compare to concrete ($4,500-7,000) or asphalt ($3,000-5,000) — permeable wins on cost AND drainage AND environmental story.

source: https://www.truegridpaver.com/rv-parking/

### b. native landscaping (mississippi wetland-tolerant)

low-maintenance, drought-tolerant when established, hurricane-resilient (deep-root natives don't blow over like ornamentals).

**recommended natives:**
- **bald cypress, sweet bay magnolia** (canopy)
- **buttonbush, winterberry holly, leucothoe** (shrub layer, wetland-edge)
- **bigleaf gallberry holly** (privacy hedges, evergreen)
- **muhly grass, switchgrass, bushy bluestem** (groundcover, no-mow)
- **eastern redbud, american beautyberry** (color, wildlife)

**nurseries:**
- **Pine Hills Nursery & Garden Center** (pass christian, MS)
- **Mississippi Woodland Nursery**
- **Izel Native Plants** (mail-order, wholesale-friendly)
- **MSU Extension Service** has free landscape consult for commercial properties

**budget:** $5-15k for initial planting on 20-acre site, mostly bare-root + 1-gal stock.

sources:
https://extension.msstate.edu/lawn-and-garden/landscape-architecture/landscape-design-and-management/plants-and-wildlife/native-shrubs-for-mississippi-landscapes
https://www.mississippilandcan.org/state-resources/Native-Species-Nurseries/39

### c. modular bath house

| vendor | type | $ range | notes |
|---|---|---|---|
| **Conestoga Log Cabin Kits** | wood prefab bathhouse | $35-90k for 2-6 stall | aesthetic match for MS context, customizable |
| **Commercial Structures Corp** | steel modular | $60-150k | code-stamped, fast install |
| **Romtec** (oregon) | concrete vault + frame, parks-grade | $70-200k | overbuilt, durable, used by NPS |
| **modular rentals (United Rentals etc)** | construction-trailer style | $1,500-3,000/mo | bridge solution while permanent built |

**phase 1 bath house spec:** 2 unisex full bath + laundry (washer/dryer). prefab from Conestoga or similar = $40-65k installed. add greywater plumbing for $5-10k. tie to lagoon or septic.

source: https://comstruc.com/modular-bathrooms/

### d. glamping platforms / safari tents

| product | $ tent | $ platform | total turnkey |
|---|---|---|---|
| **Tentrr "Signature" platform** (turnkey) | included | included | hosts list w/ them, they take a booking cut. $5-7k self-buy upfront option exists. |
| **Davis Tent canvas wall tents** (16x20) | $1,800-3,500 | $2,500-4,500 (16x20 deck) | $4,500-8,000 |
| **Jumei safari tents** (commercial PVC) | $4,500-12,000 | $3,000-5,000 | $7,500-17,000 |
| **Shelter-Dome modular deck + dome** | $8,000-25,000 | included | premium tier |

**phase 1 glamping unit budget:** 4 sites @ ~$8-12k each = $32-48k. compocloset toilet + outdoor solar shower included.

sources:
https://www.tentrr.com/
https://www.davistent.com/glamping/
https://jumei-glamping.com/

---

## 5. BOOKING / OPS TECH

### a. RV park management platforms

| platform | setup | monthly | strengths | weaknesses |
|---|---|---|---|---|
| **Campspot** | low/free | tiered, percentage of bookings | best UX, marketplace traffic, real-time grid | limited 3rd party integrations |
| **Newbook** | $1-3k | from $150/mo + commission-free engine | 100+ integrations, open API, hospitality-grade | steeper learning curve, complex UI |
| **RoverPass** | low | tiered, per-site | dynamic pricing built-in (free), marketplace | mid-tier feature set |
| **CampLife** | quote | quote | strong submeter + utility billing native | smaller footprint, less marketplace |
| **Cloudbeds** (current Inn stack) | varies | from $75/mo + booking fees | best for mixed-use (Inn + RV + glamping) — single PMS for whole property | not RV-park-specific, weaker site grid |

**recommendation:** since you already run **Cloudbeds for the Big Muddy Inn**, the path of least resistance is **extend Cloudbeds** to handle RV/glamping. cloudbeds + hipcamp API integration (live as of 2025) automates marketplace exposure. pros: one PMS, one P&L, one staff workflow. cons: native RV grid view weaker than Campspot.

**alternative:** dual-stack — keep Cloudbeds for Inn, run Newbook for RV + glamping (because of the open API + integrations). harder ops, cleaner segmentation.

sources:
https://software.campspot.com/
https://www.newbook.cloud/solutions/rv-parks-campgrounds/
https://moderncampground.com/usa/california/hipcamp-and-cloudbeds-launch-integration-to-streamline-bookings-for-campground-operators/

### b. self check-in kiosks

- **Ariane Self Check-In Kiosk** (~$8-15k hardware + $100-200/mo software)
- **Cloudbeds + Mews kiosk integrations** (~$3-8k)
- **DIY tablet kiosk (iPad + custom flow)** (~$500-1.5k) — works for low-volume

most RV operators skip the physical kiosk and run mobile-first check-in (text msg w/ gate code + site #) — cheaper, guests prefer it.

### c. dynamic pricing

- **RoverPass Advanced Dynamic Pricing** — included free with subscription
- **Newbook revenue management add-on** — extra fee
- **Cloudbeds Pricing Intelligence** — built-in, hotel-grade

monthly $500 RV rate is below dynamic-pricing zone (it's a near-fixed-cost product). dynamic pricing matters more for nightly/weekly rates.

### d. cloudbeds integration potential

- **Hipcamp ↔ Cloudbeds API** — live, syncs availability + reservations
- **Cloudbeds Marketplace** — 300+ integrations including channel managers (booking.com, expedia, airbnb, vrbo)
- **Stripe / Square** native payment processing
- **Wild Energy** does NOT have native cloudbeds connector (newbook + KOA primary). this is the friction point if you want submetered billing flowing into cloudbeds.

source: https://woodallscm.com/hipcamp-cloudbeds-partner-to-streamline-bookings-for-parks/

---

## 6. COMMUNITY-SPECIFIC

### a. outdoor performance space

| approach | $ range | capacity |
|---|---|---|
| **USA Shade tensile structure over concrete pad** | $25-80k | 100-500, no permanent walls |
| **Carolina Recreation amphitheater / band shell** | $40-150k | small to mid |
| **prefab steel band shell (Litefighter, Poligon)** | $30-100k | moderate |
| **custom timber-frame stage w/ metal roof** | $25-60k DIY-build, MS labor | flexible, brand-aligned aesthetic |
| **mobile trailer stage (rent vs buy)** | $15-40k buy / $1-3k/event rent | event-flexible |

**phase 1:** simple covered concrete pad (24x32) under a peaked-roof timber structure with mounting points for lights/PA. ~$30-40k. tie into shared solar+battery for power. add a small greenroom shed. design for 100-300 audience capacity.

**PA system:** QSC K12.2 (mains) + KS118 (subs) + small mixer = $5-8k portable rig. or commit to installed Yamaha DZR/EAW = $15-30k. **save the budget; portable wins for flexibility.**

source: https://www.usa-shade.com/project-category/amphitheaters/

### b. recording studio / rehearsal room

| approach | $ range | notes |
|---|---|---|
| **shipping container conversion (DIY w/ contractor)** | $25-75k all-in | most cost-effective, decent acoustics if done right |
| **Container Studios** (containerstudios.com) | $80-200k+ | turnkey pro studio in container, broadcast-grade |
| **MECART prefab modular studio** | $100-300k+ | broadcast/audio-pro grade, plug & play |
| **stick-build standalone 600 sq ft w/ acoustic treatment** | $90-180k | most flexible, longest timeline, best long-term |
| **convert existing barn / outbuilding** | $20-60k | only if you already have one |

**phase 1 minimum:** one 40' high-cube container conversion = control room + iso booth + small live room. budget $40-60k incl. 8-channel front-end, monitors, basic acoustic treatment. expandable.

**phase 2:** purpose-built 800-1200 sq ft tracking room w/ proper iso, 24-channel console — $200-400k bracket.

sources:
https://www.containerstudios.com/
https://mecart.com/products/prefabricated-modular-studio/

### c. tiny home pad infrastructure

mississippi tiny home regs: state has no statewide tiny home rules. **adams county does NOT enforce IRC** — discretion lies with city of natchez if inside city limits, county outside. park model RVs (under 400 sq ft, on chassis) are titled as RVs, dramatically simpler.

| type | typical cost | reg path |
|---|---|---|
| **park model RV (400 sq ft, chassis)** | $40-90k unit | RV-titled, RV-park zoning, easiest |
| **THOW (tiny house on wheels)** | $50-110k | RV-classed if registered as such |
| **on-foundation tiny / ADU** | $100-210k | full residential permit, IRC review |
| **modular cabin shell (Zook, Conestoga)** | $40-80k base | varies by setup |

**utility pad spec (per tiny home pad):**
- concrete or grade-beam foundation: $4-8k
- electrical (200A panel + meter): $2-4k
- water tap: $1-2k
- sewer tap (lagoon/septic tie): $1-3k
- gas (propane tank if no nat gas): $1-2k
- hurricane tie-down (wind zone II if gulf-six county; adams isn't gulf-six but engineered anchoring still smart): $500-1.5k
- driveway + landscape: $2-4k

**total pad infra: $11-25k. tiny home itself: $40-100k. phase 2 per-pad all-in: $50-125k.**

sources:
https://www.tinyhouse.com/post/mississippis-tiny-home-rules-regulations
https://greatlakestinyhome.com/what-counties-in-mississippi-allow-tiny-houses/
https://regulations.justia.com/states/mississippi/title-19/part-7/chapter-5/rule-19-7-5-04/section-19-7-5-04-3/

---

## mississippi-specific call-outs

1. **no hard freeze advantage** — saves on freeze-protected pedestals, frost-line trenching (12-18" works), heat-tape, freeze-shutoff valves. saves 15-20% on civils. greywater + rainwater systems run year-round, no winterization.
2. **hurricane risk** — natchez (adams county) is ~150mi inland, NOT in the gulf-six wind zone II (those are pearl river, stone, george, hancock, harrison, jackson). still spec for 110-130 mph design wind. all glamping platforms get hurricane-rated tie-downs ($300-500/unit). RVs evacuate; permanent structures stay.
3. **clay soil** — drainage is the #1 site engineering issue. permeable paving + proper grading + french drains around all bath houses + studio + tiny home pads. lagoons work well in clay (often no liner needed).
4. **humidity / mold** — every conditioned space needs proper mechanical ventilation + dehumidification. spec mini-splits w/ dry mode in everything (not standard residential AC).
5. **adams county regulatory** — county declines IRC enforcement. natchez (city) does enforce within city limits. siting big muddy acres outside city limits = lighter plan-review burden but you're still on the hook for: state health dept septic permit, electrical inspection (if served by entergy), MS dept of environmental quality if you cross any wetland, NFIP flood compliance if any of the parcel is in 100-yr floodplain.
6. **water rights** — mississippi is a riparian state, well-permits fast through MDEQ (no real allocation contest in adams county), rainwater harvesting unrestricted.

---

## phase 1 stack (RV cash flow only — minimum viable)

assumes 50 RV sites, 4 glamping units, 1 bath house, 1 studio shed, 1 covered stage. anchor budget ~$1.0-1.5M total cap-ex.

| item | spec | $ |
|---|---|---|
| site work (clearing, grading, roads) | 20 acres, gravel internal roads | $150-250k |
| permeable RV pads (50) | TRUEGRID over geotextile, 12x40 | $100-175k |
| electrical service + 50 pedestals (50A/30A/20A) | from utility drop, trenching, panels, pedestals | $200-350k |
| water service (well + distribution) | 1 well, treatment, manifold, per-site spigots | $40-80k |
| sewer (lagoon system, 50-site sized) | engineered, permitted, fenced | $60-100k |
| smart submetering (Wild Energy or Vutility) | per pedestal | $15-30k |
| modular bath house (Conestoga, 4-stall + laundry) | installed | $50-75k |
| greywater system (Aqua2use, central) | bath house tie-in | $10-15k |
| rainwater cisterns (2 x 5,000 gal) | poly, plumbed to irrigation/toilet | $6-10k |
| starlink business + dual-WAN router | hardware + first year | $4-6k |
| ubiquiti mesh wifi (UDM Pro + 8 APs) | property-wide | $2.5k |
| RV park PMS (Cloudbeds extension OR Newbook) | first-year setup + license | $3-8k |
| 4 glamping platforms + safari tents | turnkey | $40-60k |
| compocloset toilets (4 + spares) | for glamping | $4-5k |
| shared solar+battery (15 kW PV + 30 kWh storage) | Sol-Ark + EG4 | $40-55k |
| EV chargers (2 L2 stations) | ChargePoint or JuiceBox | $8-15k |
| covered outdoor stage (24x32 timber-frame) | power, roof, basic lighting | $30-45k |
| recording studio (40' container conversion) | basic build | $40-60k |
| native landscaping (initial planting) | bare-root + 1-gal stock | $5-15k |
| signage, security cameras, fencing | basic perimeter + entry | $15-25k |
| permitting + engineering + soft costs | health dept, MDEQ, electrical inspection | $30-60k |
| **subtotal hard cost** | | **$853k - $1.44M** |
| 12% contingency | | $100k - $175k |
| **all-in phase 1** | | **~$950k - $1.6M** |

**estimated capital per RV site (phase 1, fully amortized):** **$18,000 - $32,000** (varies heavily by how much shared infra cost gets allocated to RV vs glamping/studio/stage)

at $500/mo per site x 50 sites = **$25k/mo gross = $300k/yr** at full occupancy. payback on the RV-allocable portion alone: **~3.5-5 years**.

---

## phase 2 stack (build-out — tiny homes, full community)

adds 12 tiny home pads + expanded studio + cooperative common house + workshop space.

| item | spec | $ |
|---|---|---|
| 12 tiny home pads (utilities, anchors, drives) | per spec above | $130-300k |
| 12 tiny homes (assume mix park-model + ADU) | $40-120k each | $600k - $1.4M |
| second bath house / laundry | scaled for 12-pad cluster | $50-75k |
| common house (kitchen, gathering, library) | 1,200-1,800 sq ft | $200-400k |
| workshop / maker space (2,000 sq ft) | open span steel building | $80-150k |
| expanded studio (purpose-built 800 sq ft) | tracking room + iso | $200-400k |
| upgrade solar array (50 kW + 100 kWh battery) | tied to phase 1 | $90-175k |
| municipal sewer extension OR upgrade lagoon to packaged WWTP | depends on growth + DEQ | $100-300k |
| fiber internet primary + backup | install + first year | $5-10k |
| additional EV chargers (2-4 more L2 + 1 DCFC if traffic warrants) | with NEVI/30C | $50-150k post-credit |
| permitting + engineering | full residential review | $40-80k |
| **subtotal phase 2** | | **$1.55M - $3.4M** |

**estimated capital per tiny home pad (phase 2, all-in including the structure):** **$45,000 - $85,000 for pad + utilities + share of common infra; $90,000 - $200,000 fully loaded with the tiny home itself.**

---

## top 5 vendors / products to actually contact

1. **Wild Energy** (smart submetering w/ PMS integration) — https://wildenergyco.com/pages/rv-parks-and-campgrounds — get a quote for 50-site installation, ask about cloudbeds connector roadmap.
2. **TRUEGRID** (permeable paving) — https://www.truegridpaver.com/rv-parking/ — request commercial RV park bulk pricing on Pro Lite for 50 pads.
3. **Conestoga Log Cabin Kits** (modular bath house, aesthetic match) — https://conestogalogcabins.com/bathhouse-log-cabin-kits/ — request 4-stall bath house quote, MS delivery.
4. **Sol-Ark + EG4 (via local installer)** — find a MS-licensed installer through Signature Solar (signaturesolar.com) or a local Sol-Ark certified pro; get a 15 kW + 30 kWh system bid.
5. **Cloudbeds** (existing relationship) — https://www.cloudbeds.com/ — book a call to scope extending current Inn account to RV + glamping; discuss Hipcamp API integration.

honorable mentions to contact in parallel:
- **Newbook** (if dual-PMS path)
- **CompoCloset** (Cuddy bulk pricing for glamping)
- **Ubiquiti** (no rep needed, order direct from store.ui.com or any UISP partner)
- **Container Studios** (for studio scoping conversation, even if you DIY phase 1)
- **MS State Univ Extension Service** (free landscape + soil consult)

---

## sources

- https://software.camplife.com/blog/septic-systems-for-rv-parks-costs-and-considerations
- https://www.roverpass.com/blog/rv-park-septic-system-cost/
- https://www.roverpass.com/blog/rv-solar-panels/
- https://www.roverpass.com/blog/rv-park-cost-2025/
- https://software.campspot.com/
- https://www.newbook.cloud/solutions/rv-parks-campgrounds/
- https://moderncampground.com/usa/california/hipcamp-and-cloudbeds-launch-integration-to-streamline-bookings-for-campground-operators/
- https://wildenergyco.com/pages/rv-parks-and-campgrounds
- https://vutility.com/blog/campground-energy-management-cutting-costs-improving-guest-experience
- https://www.ekmmetering.com/pages/rv-parks
- https://www.solarreviews.com/blog/is-the-tesla-powerwall-the-best-solar-battery-available
- https://nuwattenergy.com/en/battery-storage-cost-2026
- https://www.energysage.com/news/ev-charging-rv-parks-campgrounds/
- https://insiderperks.com/blog/sustainability-accessibility/greywater-recycling-boost-eco-credentials-and-profits-at-glamping-resorts/3/
- https://compocloset.com/products/cuddy
- https://separett.shop/collections/composting-toilets
- https://homeguide.com/costs/rainwater-system-cost
- https://www.usmobile.com/blog/starlink-roam-vs-residential/
- https://www.usmobile.com/blog/starlink-cost/
- https://ui.com/wifi/outdoor
- https://remotelock.com/vacation-rental/unlock-access-control-for-campgrounds-and-rv-parks-with-remotelock/
- https://www.truegridpaver.com/rv-parking/
- https://extension.msstate.edu/lawn-and-garden/landscape-architecture/landscape-design-and-management/plants-and-wildlife/native-shrubs-for-mississippi-landscapes
- https://www.mississippilandcan.org/state-resources/Native-Species-Nurseries/39
- https://comstruc.com/modular-bathrooms/
- https://conestogalogcabins.com/bathhouse-log-cabin-kits/
- https://www.tentrr.com/
- https://www.davistent.com/glamping/
- https://jumei-glamping.com/
- https://software.camplife.com/remote-meter-reading
- https://www.usa-shade.com/project-category/amphitheaters/
- https://www.containerstudios.com/
- https://mecart.com/products/prefabricated-modular-studio/
- https://www.tinyhouse.com/post/mississippis-tiny-home-rules-regulations
- https://greatlakestinyhome.com/what-counties-in-mississippi-allow-tiny-houses/
- https://regulations.justia.com/states/mississippi/title-19/part-7/chapter-5/rule-19-7-5-04/section-19-7-5-04-3/
- https://sos.ms.gov/ACProposed/00012764B.pdf
- https://www.zookcabins.com/regulations/tiny-homes-in-mississippi
- https://rvshare.com/blog/how-much-does-it-cost-to-install-rv-hookups/
- https://www.nadigroup.com/insights/how-much-does-it-cost-to-start-an-rv-park/
- https://campgroundconsultinggroup.com/understanding-campground-construction-costs/
