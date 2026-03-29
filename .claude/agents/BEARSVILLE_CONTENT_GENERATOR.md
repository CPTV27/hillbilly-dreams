# Bearsville Content Generator — Seed a New Town

## Mission

Generate initial content for Bearsville Media Group (Woodstock, NY) to populate the second tenant of the platform. This proves the system replicates — same architecture, different town, real content.

## Before You Start

Read `.claude/agents/MASTER_HANDOFF.md` and `.claude/agents/ORIGIN_STORY.md` for full context.

## About Bearsville

- **Location:** Bearsville/Woodstock, New York (Ulster County, Hudson Valley)
- **Entity:** Bearsville Media Group LLC
- **Partners:** Studio C (video/recording studio), Utopia (venue/campus)
- **Infrastructure:** Ubiquiti WiFi network across the campus, radio broadcast over WiFi
- **Vibe:** Historic music town. Woodstock Festival legacy. Bob Dylan, The Band, Todd Rundgren's Utopia studio. Artists, musicians, makers. Hudson Valley farm-to-table. Not hippie nostalgia — living creative economy.

## Content to Generate

### 1. Directory Listings (20 businesses)
Generate realistic but real Woodstock/Bearsville area businesses:
- 5 restaurants/cafes (farm-to-table, diners, bakeries)
- 3 music venues/studios (Bearsville Theater, Levon Helm Studios, etc.)
- 3 shops/retail (bookstores, art supplies, vintage)
- 3 lodging (B&Bs, inns, vacation rentals)
- 3 tours/experiences (hiking, art walks, music history tours)
- 3 services (photography, web design, recording)

For each: name, category, city, address (real Woodstock addresses), phone, description (2-3 sentences in the Big Muddy editorial voice), hours

### 2. Magazine Articles (6 articles)
- "The Bearsville Sound" — history of recording in Bearsville, from Albert Grossman to today
- "Farm to Table in the Hudson Valley" — food scene guide
- "Woodstock Without the Festival" — what the town actually is vs the myth
- "The Recording Studios of Ulster County" — studio guide for musicians
- "Weekend in Bearsville" — 48-hour itinerary
- "The Makers of Tinker Street" — shop owners and artisans

### 3. Radio Shows (8 shows)
Create a Bearsville Radio schedule — same format as Big Muddy Radio but Hudson Valley vibe:
- Morning show (local news, weather, community calendar)
- Music show (Hudson Valley artists, folk/indie/Americana)
- Interview show (local makers, musicians, business owners)
- Evening show (acoustic sets, live recordings)
- Weekend special (Woodstock history, archival recordings)

For each: name, time, host character name, description

### 4. Illustrations (6 images)
Generate via `/api/media/generate` endpoint:
- Bearsville Theater exterior (watercolor)
- Tinker Street shops (woodcut)
- Hudson Valley landscape (watercolor)
- Recording studio interior (folk art)
- Farm-to-table meal (editorial)
- Woodstock town green (cartographic detail — zoomed in tight)

Style: Same lookbook palette but Hudson Valley aesthetic — autumn leaves, stone walls, barn wood, mountain views

### 5. Splash Page Copy
Write the landing page for bearsvillemedia.com:
- Hero: "Bearsville Media Group — The Hudson Valley's Creative Engine"
- Tagline: One sentence about what it is
- Three sections: Directory, Radio, Magazine
- CTA: "Get Listed" for businesses, "Listen" for radio, "Read" for magazine
- Footer: Powered by [platform name] — same architecture as Big Muddy

## Output Format

Return all content as structured data (JSON or markdown) that can be directly imported into the platform's database or used to seed the tenant.

## QC Rules

- All businesses must be real or realistic for the Woodstock/Bearsville area
- Diverse representation in any illustrations with people
- No wide AI maps — zoom tight on details
- Hudson Valley voice: warm, creative, grounded. Not pretentious, not rustic-cosplay.
