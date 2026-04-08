# Art Direction Analysis: Hillbilly Dreams Inc / Big Muddy

**Prepared:** April 2026
**For:** Chase Pierson, CEO/CTO/Showrunner
**By:** Art Direction Review (Claude Opus 4.6)

---

## INVENTORY

### Local Image Library (~350+ images across 12 directories)

**`/images/studio-c/` (59 images)**
Recording studio documentation from Utopia Sound / Studio C demo day. Primarily equipment shots: Aputure lighting rigs, multi-monitor video production setups (Hollyland wireless, Stream Deck, color grading monitors), piano in haze, control room environments. One standout: the silhouetted operator at four screens with a magenta-lit studio behind him. This is your best "Glass Engine made physical" image.

- Equipment/tech: ~40%
- Production environments: ~35%
- Behind-the-scenes/people: ~25%

**`/images/processed/slideshow/` (78 images)**
The deepest Natchez archive. Ocean Springs and Natchez street photography from what appears to be two extended shoots (the `oceansprings-natchez2` series and numbered `natchez-` series). Small-town storefronts (Marie's Beauty Salon), downtown life, brick streets, live oaks. DXO DeepPrime processing on the Ocean Springs batch. Several tourism-cart night shots. This is your Main Street proof-of-concept library.

- Street scenes/storefronts: ~45%
- Architecture: ~25%
- Night scenes: ~20%
- People/candid: ~10%

**`/images/corridor/` (27 images)**
The crown jewels. This is your most editorially complete directory. Covers the full corridor experience:
- **Music:** Guitarist under chandelier (stunning), street musician with Telecaster, drummer at Pearl kit
- **Food:** Tomato bruschetta close-up (the only real food shot in the entire library)
- **Nightlife:** Neon Moon entrance, Lost Spring Brewing, green-glow bar, patio string lights
- **Architecture:** Victorian mansion (golden hour, immaculate), craftsman porch columns, historic home
- **Landscape:** Natchez bluff river view, Mississippi River bridge, live oak canopy at night
- **Hospitality:** Fire pit gathering (4 people, warm light, phenomenal), inn hallway gathering (candid, editorial-grade)
- **Street:** Liberty Drug Store (Rexall mural -- perfect Main Street anchor image), cafe sidewalk, downtown sidewalk, Ocean Springs mural

**`/images/ai-corridor/` (10 images)**
AI-generated corridor imagery. The juke joint exterior at blue hour is convincing and usable. The delta cotton field sunset is beautiful but reads as stock. The rest (Beale Street neon, French Quarter balcony, blues parlor, radio studio, vinyl records) are competent AI illustrations that serve as placeholders but should be replaced with real photography as it becomes available.

**`/images/processed/bearsville/` (16 images)**
Bearsville Theater shows (Maggie Rose performance -- blue stage lighting, full band, excellent), Balk recording sessions (4 images), Hudson Valley landscapes (5 images -- farmland, stone walls, reservoir), Matt Pond studio sessions, hamlet morning, venue at night. The theater shots are professional concert photography. The landscapes are scenic but lack the grit of the Natchez work.

**`/images/processed/big-muddy/` (15 images)**
Core brand photography. Natchez night scenes (4 shots -- moody, undersaturated), brick street with live oaks, corridor establishing shots (numbered `corridor-` and `for0336x` series), Regina's Kitchen exterior and sign (important for dogfood narrative), sprinter van concept render.

**`/images/arrie-aslin/` (26 images)**
Arrie Aslin portrait series -- two distinct sessions. The `ta-c2` and `ta-c3` series are studio-lit portraits in the Inn parlor (teal wallpaper, crystal chandelier, purple velvet sofa). Strong, characterful portraits with real personality. The leather jacket + headband + oversized glasses look is distinctive and ownable. These are the best portraits in the entire library.

**`/images/gallery/` (20+ images)**
Mixed fine art and client work:
- `prints/` (37 images): Chase's fine art photography -- Catskills landscapes (valley fog, mountain infrared, false color gorge), Bearsville studio B&W (control room, Slingerland kit on Persian rug -- both exceptional), nature abstracts, winter B&W. This is gallery-grade work.
- `clients/brittany/` (15 images): Portrait session, golden hour backlit maternity/portrait work. Technically excellent -- rim lighting, shallow depth of field, warm tonality.
- Main gallery: Blues musician B&W (absolutely world-class -- film-era tonality, close-up acoustic guitar), abstract expressionist pieces, ceramics, landscape panoramics, mixed media.

**`/images/dsd/` (8 images)**
Deep South Directory hero images. Bluff with azaleas, courtyard fountain, floral bar, guitarist at river bar, live oak canopy, Lost Spring Brewing, river bluff walkway, Tatonut hero.

**`/images/platform/` (35 images)**
DSD product and marketing imagery. Heavy on AI-generated category illustrations (cat-hotel, cat-restaurant, cat-shop, etc.), service icons (service-ai, service-seo, service-social), step illustrations, brand icons (brand-economics, brand-inn, brand-magazine, brand-radio, brand-touring), and background cityscapes (Memphis Beale, Natchez street, NOLA quarter, river aerial). Almost entirely AI-generated. Functional but generic.

**`/images/records/` (7 images)**
Anthologist record shop series -- vinyl bins, turntable, bokeh closeups, dividers, flowers. Consistent warm-analog aesthetic. One Natchez main street establishing shot.

**`/images/portraits/` (1 image)**
Single portrait (`klshoot3-500-of-538.webp`). This directory is essentially empty.

**`/images/marketing/` (6 images)**
AI-generated metaphor illustrations (The Control Room, The Prism, The Weaver) -- each in two versions. Conceptual/abstract. Not photography.

**`/images/radio/` (1 image)**
Single podcast studio placeholder. This directory is starving.

**`/images/auto/` (empty)**
Nothing here.

### Cloud Storage (GCS: `bmt-media-bigmuddy`)

Based on codebase references, the GCS bucket contains organized subdirectories:
- `touring/` -- touring-inn-dusk, touring-main-street
- `magazine/` -- natchez-bluff-sunset, clarksdale-crossroads, vicksburg-bluffs, natchez-trace-parkway, jackson-capitol, new-orleans-frenchmen, eating-the-delta, greenville-levee, blues-trail-marker, juke-joint-saturday, helena-river-levee, oxford-square, memphis-beale-street-neon
- `real/` -- blues-room-harmonica, blues-room-live-show, record-player, inn-foyer, juke-joint-interior, mississippi-river
- `command/` -- highway-61, juke-joint, beale-street
- `events/save-the-hall-ball-2026/hero/` -- 15 numbered event photos
- `illustrations/lookbook/` -- woodcut, travel-poster, cartographic, blueprint, folk-art, neon styles
- `library/smart_previews/hero/` -- AI-curated picks from the full library (604+ images per memory docs)

The magazine subdirectory is the most complete GCS collection -- corridor-wide editorial coverage of Mississippi towns.

---

## 1. STRENGTHS

**Chase can shoot.** This is not a compliment -- it is a material business asset. The library contains at least a dozen images that would hold their own in *Oxford American* or *Garden & Gun*. Specifically:

- **The blues musician B&W** (`gallery/blues-musician-bw.webp`) is a genuine fine-art photograph. Film-era grain structure, perfect tonal separation, intimate framing. This single image validates the entire Big Muddy brand promise. It says: we are in the room where the music happens, and we belong there.

- **The guitarist under the chandelier** (`corridor/guitarist-chandelier-venue.webp`) is the editorial standard for the touring brand. Warm tungsten, shallow focus, the chandelier providing context (this is a parlor, not a club). It tells the Big Muddy story in one frame: music lives in beautiful old rooms.

- **The fire pit gathering** (`corridor/fire-pit-gathering.webp`) is the hospitality hero image. Four people, warm fire, cushions, wood fence, string lights barely visible. It sells the Inn experience without trying.

- **The inn hallway gathering** (`corridor/inn-hallway-gathering.webp`) is editorial gold. Candid, shot through a doorway with leading lines from the green-painted furniture and oriental rug. Three people talking, natural body language. This is the kind of image you cannot stage.

- **Arrie Aslin portraits** -- bold, joyful, specific. The teal-and-purple parlor is an extraordinary backdrop. These portraits have more personality than anything a stock library could produce.

- **Bearsville studio B&W** (`gallery/prints/the-control-room.webp`, `slingerland-kit-waiting.webp`) -- the Slingerland drum kit on the Persian rug, empty room, waiting. This is a photograph about potential energy. It is the visual equivalent of the Big Muddy tagline.

- **Liberty Drug Store** (`corridor/liberty-drug-store.webp`) -- perfect Main Street anchor. The hand-painted Rexall mural, the "Serving Amite County Since 1903" lettering. This is what DSD is for.

- **Night photography** is a genuine differentiator. The Neon Moon entrance, the live oak street at night, the Lost Spring Brewing exterior -- Chase shoots night scenes with controlled highlights and real atmosphere, not blown-out flash or grainy phone snapshots.

**Emerging visual themes that work:**
- Warm tungsten vs. cool night sky (the brand's natural contrast)
- Interiors shot through doorways and frames (voyeuristic intimacy)
- Music equipment as still life (the Slingerland kit, the Pearl drums, vinyl bins)
- Brick, wood, neon, and Spanish moss as recurring textures
- Faces lit by chandeliers and stage lights (not flash)

---

## 2. GAPS

### Critical Gaps (these are hurting the brand right now)

**No portraits of Chase, Tracy, or Amy.** The three principals of the company are invisible in the photo library. There is one `klshoot3` portrait in the portraits directory. For a company that runs on relationships and personal trust, this is a significant hole. Every competitor in the hospitality/media space has founders on the About page. The DSD sales pitch -- walking into businesses in Natchez -- needs a face.

**Almost no food photography.** One tomato bruschetta close-up (`corridor/tomato-bruschetta-closeup.webp`) and one Southern food AI illustration in the platform directory. For a company that operates an Inn with a kitchen, partners with Regina Charboneau (Biscuits & Blues), and sells the hospitality corridor -- this is a glaring omission. Food is the most shareable, lowest-friction content category on social media.

**No Blues Room documentation.** The GCS bucket references `blues-room-harmonica` and `blues-room-live-show`, but the local library has no proper Blues Room series. No wide shots of the room setup, no audience perspective, no detail shots of the equipment, no before/during/after sequence. The Blues Room is the physical proof that Big Muddy Touring exists.

**No Inn room photography.** The GCS has `inn-foyer` but there are zero guest room shots, zero bathroom details, zero bed/linen close-ups, zero window-view images. The Inn is a revenue-generating property with no visual sales collateral.

**Radio has one placeholder image.** Big Muddy Radio is an active brand with its own domain. The `radio/` directory contains a single placeholder. No studio shots, no on-air moments, no equipment details.

### Significant Gaps

**No Sprinter van documentation.** There is a concept render (`sprinter-van-concept.webp`) but no real photos of the actual vehicle, interior buildout, or on-the-road content. The van is a touring asset and a visual storytelling opportunity.

**No audience/crowd shots.** The Bearsville theater photos show performers but not the audience. The corridor night scenes show empty streets. There is no visual evidence that people come to these events. Audience shots are social proof.

**Limited seasonal coverage.** Nearly all Natchez photography appears to be from the same 1-2 shoots. No summer heat, no fall color on the Trace, no winter light, no spring azaleas (except one DSD image). The corridor changes character across seasons.

**No process/behind-the-scenes content.** The Studio C demo day is the only BTS content. No photos of: setting up for a show, soundcheck, Chase on a sales call, the team planning, loading the van, rigging a stage. This is the content that builds parasocial connection on Instagram.

**No map/aerial photography of the corridor.** The platform directory has `bg-river-aerial` (AI-generated). No real drone or aerial shots of Natchez, the bluffs, the river, the downtown grid.

**No partner/business portraits for DSD.** If DSD is selling to Main Street businesses, the site needs portraits of real business owners in their shops. Zero exist.

---

## 3. STYLE ASSESSMENT

### Current State: Inconsistent but with a Clear Best Self

The library operates at three distinct quality tiers:

**Tier 1 -- Editorial (the real work):** The corridor photography, the blues musician B&W, the Arrie Aslin portraits, the Bearsville studio B&W prints, the inn hallway candid, the fire pit gathering. This work has a consistent sensibility: available light (or minimal augmentation), warm color temperature, shallow depth of field for portraits, wide aperture bokeh in interiors, and a preference for shooting into light sources rather than with them. The night photography favors controlled mixed lighting -- tungsten interiors bleeding into blue-hour exteriors.

This tier reads as: photojournalistic editorial with a Southern accent. Think *Garden & Gun* meets *Monocle*.

**Tier 2 -- Processed/HDR (the overcooking problem):** Several images in the slideshow and corridor directories show heavy-handed HDR tonemapping or aggressive color grading. The Natchez bluff river view has a teal-and-orange color grade pushed to the point of artificiality. Some of the slideshow street scenes have that telltale HDR halo around high-contrast edges. The brick street with live oaks has oversaturated reds and cyans that fight each other. The tourism cart night shot is crunchy.

This is the single biggest consistency problem. When a visitor scrolls from the blues musician B&W (film-grade, timeless) to an HDR street scene (2014-era processing), the brand feels confused. The HDR images read as "photography enthusiast blog," not "media company."

**Tier 3 -- AI-generated placeholders:** The platform, ai-corridor, and marketing directories are populated with AI illustrations. Some are convincing (the juke joint exterior, the cotton field), most are obviously generated (the category icons, the service illustrations, the metaphor series). These serve their structural purpose but should be on a replacement schedule.

### Does it match the brand voice?

The North Star Manifesto calls for "Phillips-66 & Polaroid" -- tactile grit plus surgical precision, photography first, technology invisible. **Tier 1 images nail this.** The blues musician, the fire pit, the inn hallway, the Bearsville control room -- these are exactly what the manifesto describes.

But the manifesto is being undermined by the HDR processing and the AI filler. The brand voice says "warm, direct, Southern Gothic, analog." The HDR processing says "Flickr 2013." The AI illustrations say "we couldn't get there to photograph it."

---

## 4. RECOMMENDED STYLE DIRECTIONS

### Style A: "Parlor Light"
**The Big Muddy signature look.**

This is the style already present in the best work -- codify it. Available light from chandeliers, candles, tungsten practicals, and stage lighting. Warm midtones (pulled toward 3200K-4000K), deep shadows that go to true black (not lifted/milky), and highlights that roll off gently rather than clipping hard. Shallow depth of field (f/1.4-2.8 for portraits, f/2.8-4 for interiors). Slight grain structure -- not added artificially, but preserved from high-ISO capture.

- **Color treatment:** Warm shadows (not orange -- think beeswax amber). Desaturate greens and blues slightly. Let reds and golds dominate. Skin tones skew warm but stay natural.
- **Shooting style:** Shoot into the light. Use doorways, windows, and mirrors as framing devices. Never use on-camera flash. Available light or one hidden LED bounce at most.
- **References:** *Garden & Gun* editorial, Danny Clinch's musician portraits, William Eggleston's interiors (the democracy of subject matter), Gordon Parks's color work (the dignity of ordinary moments).
- **When to use:** Inn interiors, bar scenes, Blues Room performances, portraits, food, hospitality moments.

### Style B: "Main Street Documentary"
**The DSD and corridor proof shots.**

Slightly pulled back, context-establishing photography that shows the character of small-town commercial districts. Clean, slightly desaturated daylight. Straight-on architectural framing (not dutched, not heroic angles). The subject is the storefront, the sign, the sidewalk, the human scale of the built environment. Think Walker Evans shooting for the FSA, but in color and without the depression.

- **Color treatment:** Reduced saturation (maybe -15 to -20 globally), lifted blacks slightly (to +10-15 for that faded-print feel), warm white balance but not aggressively so. The Liberty Drug Store and Marie's Beauty Salon shots are the template.
- **Shooting style:** Straight-on or slight three-quarter angle. Shoot at chest height, not eye height (it makes buildings feel more grounded). Include sidewalks, power lines, and parked cars -- do not sanitize. 35mm or 50mm equivalent. Overcast or open shade preferred.
- **References:** Walker Evans, Stephen Shore's *Uncommon Places*, William Christenberry's Alabama storefronts, Alec Soth's Mississippi work.
- **When to use:** DSD business profiles, corridor travel content, Magazine editorial, town features.

### Style C: "Blue Hour / Neon Gothic"
**The touring and nightlife brand.**

This is the night photography style already present in the Neon Moon, Lost Spring, and live oak night shots -- but refined and made consistent. The key contrast: warm interior light spilling out of doorways against deep blue-hour sky or true-black night. Neon signs as color accents, not as the subject. Visible atmosphere (haze, humidity, breath in cold air). Slightly longer exposures to capture motion blur in figures while keeping architecture sharp.

- **Color treatment:** Split-tone -- warm highlights (amber/gold), cool shadows (deep navy, not cyan). Do not push teal-and-orange. Let the natural color temperature difference between tungsten interiors (3200K) and twilight sky (8000K+) do the work. Minimal intervention.
- **Shooting style:** Tripod for architecture, handheld for people. Bracket exposures for the interior/exterior dynamic range problem. 24mm-35mm for establishing shots, 85mm for isolating neon details. Shoot during actual blue hour (20-40 minutes after sunset), not full dark.
- **References:** Todd Hido's *House Hunting*, Gregory Crewdson (the suburban uncanny, minus the production budget), Saul Leiter's night color work, Langston Hughes-era Harlem photography.
- **When to use:** Touring show promotion, entertainment brand, bar/venue marketing, Magazine nightlife features.

### Style D: "The Archive"
**Fine art and legacy content.**

Black and white, or very restrained color with heavy grain. This is the style of the blues musician portrait and the Bearsville studio shots. It says: this moment is already history. It is the visual language of the record label, the magazine's long-form features, and the About/Origin Story page. It positions Big Muddy as a legacy institution, not a startup.

- **Color treatment:** True B&W with full tonal range (Zone System thinking -- deep blacks, textured midtones, clean whites). If color, desaturate to near-monochrome and let one warm accent remain (a gold lamp, a red guitar). Add genuine film grain (Kodak Tri-X 400 or Ilford HP5 profiles).
- **Shooting style:** Close-up portraits and detail shots. Hands on instruments, worn wood, patina on brass, cracked leather. Slow and deliberate. No candids -- this is the composed, considered work.
- **References:** Danny Clinch (musician portraits), Anton Corbijn (U2/Depeche Mode era), Jim Marshall's jazz and blues documentation, the *Oxford American* music issue photography.
- **When to use:** Records brand, Magazine feature profiles, About pages, artist pages, legacy content.

---

## 5. PRIORITY SHOT LIST

### Tier 1 -- Shoot This Week (Revenue-Critical)

1. **Chase Pierson working portrait** -- behind the bar, in the Blues Room, or at the production desk. Not posed corporate headshot. Caught mid-sentence or mid-task. Parlor Light style.
2. **Tracy and Amy working portrait** -- at the Inn, doing what they actually do. Candid preferred. Two shots: one together, one each solo. They are equity partners; they need to look like principals, not staff.
3. **The Blues Room, empty and set up** -- wide shot showing the full room, chairs, stage, lighting rig. Archive style (B&W). This is the "Slingerland kit waiting" equivalent for Natchez.
4. **The Blues Room during a show** -- wide from the back showing audience + performer. Detail shot of hands on guitar/harmonica. Audience reaction close-up. Blue Hour/Neon Gothic style.
5. **Inn guest room hero shot** -- the best room, late afternoon light, bed made, window open. One wide, one detail (pillow/linen/bedside table). Parlor Light style.
6. **Food from the kitchen** -- 3-5 dishes, shot on real plates on real tables with real flatware. Not food-styled. Parlor Light style with shallow DOF. Overhead and 45-degree angle.
7. **Inn exterior at golden hour** -- front facade, full frame, live oaks in foreground. Main Street Documentary style.

### Tier 2 -- Shoot This Month (Brand-Building)

8. **Regina Charboneau at Biscuits & Blues** -- portrait in her kitchen or at the counter. She is the first dogfood client; her image validates DSD.
9. **Sprinter van, real** -- exterior three-quarter view, interior with gear loaded, driver's perspective on Highway 61. Blue Hour exterior preferred.
10. **Bar detail shots** -- bottles backlit, hands pouring, condensation on glass, cocktail close-up. Parlor Light style. These fill social media for weeks.
11. **Downtown Natchez storefronts** -- 10 businesses in the Main Street Documentary style. These become DSD case study headers and directory listings.
12. **Radio studio/setup** -- the actual broadcasting equipment, headphones on hook, microphone detail, on-air light. Archive style.
13. **Live show load-in/soundcheck** -- BTS content. Handheld, slightly rough, honest. Cases on dollies, cables being run, monitors being tested.
14. **Mississippi River from the bluff at blue hour** -- this is an iconic shot that should be in the library as a clean, non-HDR version. Tripod, bracketed, subtle processing.
15. **Audience at a show** -- faces lit by stage light, hands holding drinks, people talking between sets. Shallow DOF, warm tones.

### Tier 3 -- Shoot This Quarter (Depth and Seasonal)

16. **Natchez Trace in spring** -- the Parkway with wildflowers or early-green canopy. Main Street Documentary style.
17. **Morning at the Inn** -- coffee, porch, fog if possible. Parlor Light but cooler -- early morning color temperature.
18. **Small-town business owner portraits for DSD** -- 5 real owners, in their shops, natural light. Main Street Documentary crossed with Parlor Light. These are the testimonial images.
19. **Team working session** -- Chase, Tracy, Amy around a table or in the bar with laptops and notebooks. Not staged. Parlor Light style.
20. **The corridor at seasonal transitions** -- cotton fields at harvest, pecan groves, fall color on the Trace, Christmas lights on Main Street. One shoot per season, building a year-round library.

---

## 6. POST-PROCESSING RECOMMENDATIONS

### The One Rule
**Kill the HDR.** Remove all tonemapped processing from the active library. Any image that has visible HDR halos, oversaturated dual-tone color casts, or "crunchy" texture in the midtones should be either reprocessed from the RAW file or retired. This is the single highest-impact change to visual consistency.

### Standard Edit (Parlor Light / Main Street Documentary)

Apply as a Lightroom preset or Capture One style to all new work:

```
EXPOSURE
  Exposure: 0 to +0.3 (shoot slightly under, recover in post)
  Contrast: +10
  Highlights: -30 to -50 (protect window/light source rolloff)
  Shadows: +15 to +25 (open shadows but keep depth)
  Whites: +5
  Blacks: -10 to -20 (anchor the blacks -- do NOT lift them to milky)

PRESENCE
  Texture: +10 (subtle -- adds tactile quality without sharpening artifacts)
  Clarity: +5 to +10 (NO MORE. Clarity above +15 is the gateway to HDR brain.)
  Dehaze: 0 (never touch this for interior/night work)
  Vibrance: -5 to -10 (pull back slightly -- let the warm tones dominate naturally)
  Saturation: -5

COLOR
  White Balance: 5500-6000K for daylight, do NOT correct tungsten interiors
  Tint: +5 to +8 (slight magenta shift keeps skin tones honest)

  HSL Adjustments:
    Orange Hue: -5 (warm the skin tones slightly)
    Orange Saturation: -10 (prevent fake-tan look)
    Blue Saturation: -15 (prevent oversaturated skies and neon bleed)
    Green Saturation: -10 (keep foliage from going nuclear)
    Aqua Saturation: -20 (kill the teal cast entirely)

TONE CURVE
  Gentle S-curve: lift shadows to ~5/255, pull highlights to ~245/255
  This gives a very subtle film-fade without going full VSCO

DETAIL
  Sharpening: 40, Radius 1.0, Detail 25
  Noise Reduction: As needed, but preserve grain structure up to ISO 3200
  Do NOT use aggressive luminance NR -- grain is part of the brand

GRAIN (optional -- for Archive style only)
  Amount: 15-20
  Size: 25
  Roughness: 50

LENS CORRECTIONS
  Enable profile corrections (remove distortion)
  Remove chromatic aberration
  Do NOT add vignetting in post -- if vignetting is present from fast lenses, leave it
```

### Night/Blue Hour Edit (Neon Gothic)

Same base as above, with modifications:

```
  Shadows: +30 to +40 (night shadows need more recovery)
  Color Temp: Do NOT auto-white-balance. Set manually to 4500-5000K.
    This preserves the warm/cool split between interior tungsten and exterior sky.
  Blue Saturation: -5 (less aggressive reduction -- let the blue hour breathe)
  Aqua Saturation: -15
  Split Toning (if using):
    Highlights: 40/10 (warm gold)
    Shadows: 220/8 (subtle navy)
```

### Archive / B&W Edit

```
  B&W Mix (from color original):
    Red: +15 (brightens skin tones)
    Orange: +20 (opens midtone faces)
    Yellow: +10
    Green: -10 (darkens foliage for drama)
    Blue: -20 (darkens skies -- Ansel Adams red-filter effect)
  Contrast: +20
  Clarity: +15 (B&W tolerates more clarity than color)
  Grain: Amount 20, Size 30, Roughness 50
  Tone Curve: Full S-curve -- deeper blacks, brighter whites than color work
```

### What NOT to Do

- **No teal-and-orange color grading.** It is the visual equivalent of Comic Sans -- once ubiquitous, now a marker of amateur work.
- **No HDR tonemapping.** Not Photomatix, not Lightroom's HDR merge with aggressive settings, not Aurora HDR. If you need dynamic range, bracket and blend manually or use Lightroom's highlight/shadow recovery on a single RAW.
- **No skin smoothing.** Real skin texture is part of the brand. These are working people, not cosmetics ads.
- **No heavy vignetting in post.** Natural lens vignetting at f/1.4-2.0 is fine and desirable. Lightroom's post-crop vignette tool creates an obviously fake effect.
- **No selective color (B&W with one color element).** It is a dated technique that signals hobbyist processing.
- **No AI upscaling artifacts.** If an image is too small, reshoot it. Do not run it through Topaz Gigapixel and pretend.
- **No compositing.** Every image should be a single capture, single moment. The brand promise is authenticity. Composites break that promise.

---

## IMPLEMENTATION PRIORITIES

1. **Immediately:** Pull the 10-12 Tier 1 images identified in Strengths and reprocess them to the Standard Edit spec if they are not already there. These become the canonical brand images.

2. **This week:** Reprocess or retire any HDR/overcranked images currently in active use on the sites. Check every `<img>` tag across all brand pages.

3. **This week:** Schedule the Tier 1 shot list. Items 1-7 can all be captured in a single dedicated shoot day at the Inn and Blues Room, plus one golden hour exterior session.

4. **This month:** Build a Lightroom preset pack (4 presets: Parlor Light, Main Street Documentary, Neon Gothic, Archive B&W) and apply them to all new captures going forward. Every photographer who touches this brand uses these presets as a starting point.

5. **This quarter:** Replace AI-generated images in the platform and DSD directories with real photography as it becomes available. Prioritize the category icons and hero images first -- these are the most-viewed, lowest-quality images in the library.

6. **Ongoing:** Every show, every event, every interesting Tuesday at the bar -- shoot 20 frames. The library should be growing by 50-100 real images per month. The best brands have thousands of images to draw from. You currently have ~350 with maybe 40 that meet Tier 1 standards.

---

*"Does this make the photography look more expensive and the technology look more invisible?"*
*That is still the test. The photography is already expensive-looking when it is processed correctly and shot with intention. The work is to stop undermining it with inconsistent processing and to fill the gaps that leave entire brand verticals visually empty.*
