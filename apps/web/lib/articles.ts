// apps/web/lib/articles.ts
// Central data file — all 18 Big Muddy city guide articles
// Replace with prisma queries once DATABASE_URL is connected

import type { Article } from '@bigmuddy/config';

export const CITY_GUIDE_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Memphis After Midnight: The River City That Invented the Sound',
    slug: 'memphis-after-midnight-the-river-city-that-invented-the-sound',
    category: 'city-guide',
    city: 'memphis',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'The heat comes off the asphalt on Union Avenue like something you can hold in your hand. Memphis doesn\'t whisper. It hums — low and constant, a frequency that gets into your blood the moment you cross the bridge over the Mississippi.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/memphis-beale-street-neon.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-01').toISOString(),
    createdAt: new Date('2026-02-01').toISOString(),
    updatedAt: new Date('2026-02-01').toISOString(),
    body: `# Memphis After Midnight: The River City That Invented the Sound

The heat comes off the asphalt on Union Avenue like something you can hold in your hand. It's late. The neon from Beale Street bleeds into the sky three blocks south, and somewhere in the distance a tenor sax is bending a note that Sam Phillips would have recognized. Memphis doesn't whisper. It hums — low and constant, a frequency that gets into your blood the moment you cross the bridge over the Mississippi.

This is the city that gave us Elvis and Otis, B.B. and Al Green. The city where rock and roll was born in a storefront studio and soul music was built in a converted movie theater on McLemore Avenue. But Memphis isn't a museum. It's a living, breathing, sweating thing. The music is still here, pouring out of doorways at 1 a.m. The barbecue smoke is still here, drifting from pits that have been burning since your grandparents were young.

You start the Big Muddy Loop here. And there's a reason for that. Memphis is the overture.

## Where to Stay

**The Peabody Memphis** — You walk into the lobby of the Peabody and the first thing you understand is gravity. Not the physics kind. The historical kind. This grand dame has stood on Union Avenue since 1869, and every square foot of marble and brass knows it. The famous ducks march through the lobby at 11 a.m. and 5 p.m. — a ritual so strange and so Memphis that it somehow makes perfect sense. Rooms start around $199. Wake up here and you wake up inside the city's mythology. *149 Union Ave, Memphis, TN 38103.*

**ARRIVE Memphis** — If the Peabody is Memphis in black tie, ARRIVE is Memphis in a vintage tour jacket. This boutique hotel on South Main celebrates local artists and Memphis soul with a design-forward sensibility that feels like the city's creative future. Steps from Beale Street, surrounded by galleries and coffee shops that didn't exist ten years ago. Rooms run $250–$450. *477 S Main St, Memphis, TN 38103.*

**The James Lee House** — An 1848 Victorian mansion on Adams Avenue, now a luxury B&B with the kind of opulent suites that make you feel like a character in a Tennessee Williams play. National Historic Landmark. Four-poster beds, claw-foot tubs, the whole Southern fantasy. From $325. This is where you stay when you want to remember that Memphis was once the cotton capital of the world. *690 Adams Ave, Memphis, TN 38105.*

## Where to Eat

**Central BBQ** — The argument over Memphis's best barbecue is eternal and unresolvable, but Central has been voted number one enough times to make the case. Hickory and pecan wood. Slow-smoked pulled pork that falls apart like a confession. Ribs with a bark so dark they look like they were forged, not cooked. The kind of place where you eat with your hands and nobody judges. $$. *147 E Butler Ave, Memphis, TN 38103.*

**Charlie Vergos' Rendezvous** — You find it by walking down an alley off Second Street, descending into a basement that's been serving dry rub ribs since 1948. That sentence alone should tell you everything. The walls are covered in memorabilia so thick it's become architecture. The ribs are charcoal-broiled, not smoked — heresy to some, gospel to others. Order the cheese plate to start. Trust us. $$. *52 S 2nd St (Rendezvous Alley), Memphis, TN 38103.*

**Gus's World Famous Fried Chicken** — The chicken is spicy. The chicken is crispy. The chicken is, frankly, a religious experience. Gus's started in Mason, Tennessee, a small town north of Memphis, but this Front Street location has become a pilgrimage site. The batter has a cayenne kick that sneaks up on you mid-bite, and the meat stays impossibly juicy. No frills. Paper plates. Perfection. $. *310 S Front St, Memphis, TN 38103.*

## Where to Hear the Music

**B.B. King's Blues Club** — The anchor of Beale Street, named for the King of the Blues himself. Live music every single day. The house bands are not messing around — these are working musicians who could headline anywhere, and they play like the ghost of B.B. is watching from the balcony. Which, in a way, he is. *143 Beale St, Memphis, TN 38103.*

**Blues City Cafe** — Old-school juke joint energy with a dedicated music room — the Band Box — next door where nightly blues sets run hot and loud. Famous for ribs and catfish during dinner, but you come back at night for the music. The kind of place where the floor vibrates. *138 Beale St, Memphis, TN 38103.*

**Mr. Handy's Blues Hall** — The last authentic juke joint on Beale. Named for W.C. Handy, the Father of the Blues, this cramped, historic space delivers raw live blues nightly. No stage production. No light show. Just a musician, an amplifier, and a room full of people who came to feel something. This is where Beale Street still sounds like Beale Street. *79 S 2nd St, Memphis, TN 38103.*

Memphis will ruin you for other cities. Not because it's the prettiest or the cleanest or the easiest. Because it's the most honest. The music here doesn't perform — it testifies. And when you pull south toward Clarksdale and the Delta, you'll carry that testimony with you like a hymn you can't quite shake.`,
  },
  {
    id: 2,
    title: 'Clarksdale at Midnight: Where the Blues Were Born',
    slug: 'clarksdale-at-midnight-where-the-blues-were-born',
    category: 'city-guide',
    city: 'clarksdale',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'The Delta is flat. So flat that the sky becomes the landscape and the land just holds it up. Clarksdale rises out of the cotton fields like a dream somebody forgot to finish — and on a Saturday night, the juke joints light up and the music spills out into the humid Delta air.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/clarksdale-crossroads.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-03').toISOString(),
    createdAt: new Date('2026-02-03').toISOString(),
    updatedAt: new Date('2026-02-03').toISOString(),
    body: `# Clarksdale at Midnight: Where the Blues Were Born

The Delta is flat. So flat that the sky becomes the landscape and the land just holds it up. You drive south from Memphis on Highway 61 — the Blues Highway, the Devil's backbone — and Clarksdale rises out of the cotton fields like a dream somebody forgot to finish. The buildings downtown have that beautiful Mississippi decay: brick facades with painted-over signs for businesses that closed in 1962, shotgun houses leaning at angles that defy engineering.

But Clarksdale is not dead. Not even close. This town of 15,000 is the ground zero of American music, the place where Robert Johnson allegedly sold his soul at the crossroads, where Muddy Waters learned to play slide guitar on a sharecropper's porch, where the blues became the blues. And on a Saturday night, when the juke joints light up and the music spills out into the humid Delta air, you understand that this isn't history. It's happening.

## Where to Stay

**Shack Up Inn** — There is no place on earth like the Shack Up Inn. Renovated sharecropper shacks on the old Hopson Plantation, each one filled with folk art, vintage instruments, and the kind of intentional rust that would make a Brooklyn designer weep. They call it "Bed & Beer," which is accurate. You fall asleep to crickets and wake up to cotton fields. From $65. If you want to understand the Delta, you sleep here. *1 Commissary Circle Rd, Clarksdale, MS 38614.*

**Clark House Inn** — The historic 1859 home of Clarksdale's founder, John Clark, now a National Register inn in the residential historic district. Walking distance to every blues site that matters. Rooms from $75. Quiet, dignified, Southern in the old sense of the word. *211 Clark St, Clarksdale, MS 38614.*

**Travelers Hotel** — An artist-run boutique hotel in a restored downtown building that functions as equal parts lodging and community hub. Local art on every wall. A gathering point for the creatives and wanderers who wash up in Clarksdale and never quite leave. $$. *212 3rd St, Clarksdale, MS 38614.*

## Where to Eat

**Abe's Bar-B-Q** — Open since 1923, sitting right at the crossroads of Highways 61 and 49 — the same crossroads, depending on who you ask. The Big Abe sandwich is a sloppy, glorious mess of smoked pork. But you're really here for the Delta hot tamales, those small, spicy, cornmeal-wrapped mysteries that exist nowhere else on earth quite like they exist in Mississippi. $. *616 State St, Clarksdale, MS 38614.*

**Hicks' Famous Hot Tamales** — Speaking of tamales. The Hicks family has been rolling them since 1960, and the line that forms at this small stand is a daily act of devotion. The tamales are spicier than Abe's, tighter in the wrap, with a kick that builds. This is not Mexican food. This is Delta food — a cuisine unto itself. $. *305 S State St, Clarksdale, MS 38614.*

**Rest Haven** — Family-owned since 1947, and here's where Clarksdale surprises you: the menu is half Southern comfort, half Lebanese. Kibbie — fried or in omelet form — sits next to cabbage rolls and fried catfish. It's a reminder that the Delta was built by more cultures than you'd guess, all of them hungry, all of them homesick. $. *419 S State St, Clarksdale, MS 38614.*

## Where to Hear the Music

**Ground Zero Blues Club** — Co-owned by Morgan Freeman and Bill Luckett, but don't let the celebrity pedigree fool you. Ground Zero is a real juke joint — concrete floors, Christmas lights, graffiti on every surface, and live blues that shakes the walls. On a good night, the whole room becomes one organism, swaying and stomping. *387 Delta Ave, Clarksdale, MS 38614.*

**Red's Lounge** — This is the one. The real one. A cinder-block room on Sunflower Avenue where the blues sounds like it did before anyone put it on a record. Cash only. No frills. The musicians play close enough to touch, and the Delta blues in this room is so raw it feels like eavesdropping on something private. If you visit one juke joint in your life, make it Red's. *395 Sunflower Ave, Clarksdale, MS 38614.*

**Delta Blues Museum** — The world's first blues museum, housed in a historic freight depot on Blues Alley. Exhibits on Muddy Waters, B.B. King, John Lee Hooker — the whole pantheon. Muddy's actual cabin from Stovall Plantation is here. You stand inside it and you feel the weight of what started in rooms exactly like this one. *1 Blues Alley, Clarksdale, MS 38614.*

You leave Clarksdale changed. Not in a dramatic, cinematic way — in a quiet way. The Delta gets under your skin. The flatness, the heat, the music that seems to rise out of the earth itself. You'll think about Red's Lounge on a Tuesday afternoon six months from now, and you'll understand why people keep coming back.`,
  },
  {
    id: 3,
    title: 'Vicksburg: Bluffs, Battlefields, and the Blues Between',
    slug: 'vicksburg-bluffs-battlefields-and-the-blues-between',
    category: 'city-guide',
    city: 'vicksburg',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Vicksburg sits on bluffs above the Mississippi like a city that refused to let the river have the last word. Civil War cannons still point toward the river. The blues floats up from somewhere below.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/vicksburg-bluffs.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-05').toISOString(),
    createdAt: new Date('2026-02-05').toISOString(),
    updatedAt: new Date('2026-02-05').toISOString(),
    body: `# Vicksburg: Bluffs, Battlefields, and the Blues Between

Vicksburg sits on bluffs above the Mississippi like a city that refused to let the river have the last word. The streets tilt and wind, and the old houses cling to hillsides with the stubbornness of a place that survived a 47-day siege and kept standing. The light here is different than in the Delta — sharper, cut by elevation and the shadows of live oaks draped in Spanish moss. Civil War cannons still point toward the river. The blues floats up from somewhere below.

This is a city built on layers. Antebellum mansions on top, wartime history in the middle, and music running underneath everything like groundwater. Vicksburg doesn't shout about its blues heritage the way Clarksdale does. It just plays, quietly, on Friday and Saturday nights, in bars and juke joints along Washington Street, as if the music has always been here and always will be.

## Where to Stay

**Anchuca Historic Mansion & Inn** — A grand 1830s antebellum mansion with columns that would make Scarlett O'Hara pause. Pool in the garden, period furnishings in every room, and the kind of creaking floorboards that sound like the house is breathing. Wake up here and you're waking up inside a chapter of Mississippi history. $$–$$$. *1010 1st East St, Vicksburg, MS.*

**Duff Green Mansion** — This one has stories. Built in the 1850s, used as a Confederate hospital during the siege, reportedly haunted by the soldiers who never left. Period furnishings, a pool, and a three-course breakfast every morning. The ghosts, if they're here, are well-mannered. $$–$$$. *1114 1st East St, Vicksburg, MS.*

**Oak Hall Bed & Breakfast** — A 1910 Mission Revival mansion known locally as the Stained Glass Manor, and for good reason: 32 original stained glass windows throw color across the rooms like a kaleidoscope. The Delta Blues Room is the one to request. $$. *2430 Drummond St, Vicksburg, MS.*

## Where to Eat

**Walnut Hills Restaurant** — World-famous fried chicken served in a historic setting along the blues trail. This is the kind of place where locals have been eating Sunday dinner for generations, and the fried chicken is the reason. Golden crust, seasoned with decades of practice. The round table in the center is communal — you sit with strangers and leave with friends. $$. *1214 Adams St, Vicksburg, MS.*

**Goldie's Trail Bar-B-Que** — A Vicksburg landmark since 1961. Goldie's does ribs the old way — slow, smoky, sauced with a homemade recipe that's stayed in the family. The portions are big enough to share, and the sides are the kind of Southern that tastes like somebody's grandmother made them. Because somebody's grandmother probably did. $. *2430 S Frontage Rd, Vicksburg, MS.*

**LD's Kitchen** — Forty years of plate lunches. That's LD's resume, and it's the only one that matters. This is authentic soul food — the kind where you point at what you want behind the counter and they pile it on a Styrofoam plate until it nearly buckles. No menu needed. Whatever LD is cooking today is what you're eating, and it will be extraordinary. $. *1111 Mulberry St, Vicksburg, MS.*

## Where to Hear the Music

**Bottleneck Blues Bar** — The live music nerve center of Vicksburg. National blues, R&B, and soul acts come through on Friday and Saturday nights, and there's no cover charge — just walk in, grab a drink, and let the music do the rest. The sound in this room is warm and immediate, the kind of blues you feel in your chest. *4116 Washington St (Ameristar Casino), Vicksburg, MS.*

**Juke Joint Restaurant and Blues Exhibit** — Part restaurant, part blues museum, all Vicksburg. The attached exhibit celebrates the city's place on the Southern blues trail, and the dining room has the atmosphere of a working juke joint — dim lights, blues on the speakers, walls covered in photographs of the musicians who built this sound. *1415 Washington St, Vicksburg, MS.*

**Blue Room Blues Trail Marker** — Not a venue in the traditional sense, but a sacred site. This Mississippi Blues Trail marker commemorates the Blue Room, the legendary venue where blues, jazz, and R&B artists performed for decades. Stand here and you're standing on hallowed musical ground. *601 Clay St, Vicksburg, MS.*

Vicksburg is the city on the loop where the war and the music and the river all converge. You carry its weight with you — the bluffs, the cannons, the fried chicken at Walnut Hills, the late-night blues at the Bottleneck. It's a city that knows what it's survived, and plays the blues accordingly.`,
  },
  {
    id: 4,
    title: 'Natchez: The Oldest Song on the River',
    slug: 'natchez-the-oldest-song-on-the-river',
    category: 'city-guide',
    city: 'natchez',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Natchez is the oldest settlement on the Mississippi River, and it wears its age like a velvet coat — a little threadbare at the elbows, impossibly beautiful in the right light. The light in Natchez is golden. Not metaphorically — actually golden.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/natchez-bluff-sunset.webp',
    readTime: '6 min read',
    publishedAt: new Date('2026-02-07').toISOString(),
    createdAt: new Date('2026-02-07').toISOString(),
    updatedAt: new Date('2026-02-07').toISOString(),
    body: `# Natchez: The Oldest Song on the River

Natchez is the oldest settlement on the Mississippi River, and it wears its age like a velvet coat — a little threadbare at the elbows, impossibly beautiful in the right light. The antebellum mansions along the bluffs are the most photographed homes in Mississippi, but it's the streets below — the Under-the-Hill district, where the riverboats used to dock and the saloons never closed — that tell the real story. This was a place of music and sin long before anyone built a plantation house.

The light in Natchez is golden. Not metaphorically — actually golden, filtered through live oaks and magnolias and the river haze that hangs over everything like gauze. You walk these streets in the late afternoon and the shadows are longer here than anywhere else on the loop, as if time itself has stretched out and settled in.

At night, the music starts. And in Natchez, the music has always been the point.

## Where to Stay

**The Big Muddy Inn & Blues Room** — Six suites in a boutique inn on Commerce Street, each one a love letter to the city's musical soul. The Big Muddy is where you stay if you understand that the best nights on the road start with live blues downstairs and end with a short walk to your bed. The Blues Room hosts local and touring artists in an intimate, art-filled space that feels like a private concert. Wake up here and the first thing you remember is last night's set. This is our kind of place — built for the road, tuned to the music. *411 N Commerce St, Natchez, MS 39120.*

**Monmouth Historic Inn** — A National Historic Landmark on 26 acres of manicured gardens. Monmouth is antebellum Mississippi at its most cinematic — columned porticos, canopy beds, magnolias blooming outside your window. This is luxury lodging in the old Southern tradition, where hospitality is not a service but a way of life. $$$. *1358 John A. Quitman Blvd, Natchez, MS 39120.*

**Devereaux Shields House** — An 1893 Queen Anne Victorian with the kind of intricate woodwork and stained glass that makes architects weep. Gourmet breakfasts, lush gardens, suites that feel like stepping into a daguerreotype. If Monmouth is the plantation fantasy, Devereaux Shields is the Victorian one — equally romantic, slightly more intimate. $$. *709 N Union St, Natchez, MS 39120.*

## Where to Eat

**Biscuits & Blues** — The name is the mission statement. Southern comfort food served alongside live blues on weekends in a room with a wall of old doors and beadboard ceilings. The gumbo is dark and complex. The fried oysters are crisp and briny. And the biscuits with apricot butter are the kind of thing you'll describe to people for years. This is where Southern Gothic becomes Southern gastronomy. $$. *315 Main St, Natchez, MS 39120.*

**Rolling River Reloaded** — Soulful Southern classics with creative twists, built on generational recipes in a welcoming downtown spot. The jambalaya seafood egg rolls are the kind of inspired fusion that only works when the cook understands both traditions deeply. Every plate here tells a family story. $$. *406 Main St, Natchez, MS 39120.*

**Southern Style Restaurant** — No website. No Instagram. Just soul food so authentic it borders on spiritual. This local institution serves classic plates for breakfast and lunch — the kind of cooking that doesn't need a brand because the food speaks for itself. You eat here because a local told you to, and you thank them afterward. $. *227 Devereaux Dr, Natchez, MS 39120.*

## Where to Hear the Music

**Smoot's Grocery** — A restored juke joint with a mural depicting Natchez's blues history and an outdoor patio overlooking the Mississippi River. Live blues, jazz, and rock fill the room on weekends, and the river catches the sound and carries it downstream. Standing on that patio with a drink in your hand and the music behind you, you understand why people have been gathering on this bluff for three hundred years. *319 N Broadway St, Natchez, MS 39120.*

**The Big Muddy Inn Blues Room** — A vibrant speakeasy-style venue hosting live blues from local and touring artists, with an artist-in-residence program that keeps the calendar unpredictable in the best way. The space is intimate and art-filled — the kind of room where you can see the sweat on the guitarist's forehead. This is blues the way it's meant to be heard: close, loud, and personal. *411 N Commerce St, Natchez, MS 39120.*

**Rhythm Night Club Memorial Museum** — In 1940, a fire at the Rhythm Night Club killed 209 people — one of the deadliest building fires in American history. The tragedy inspired blues songs like "Natchez Burning" and left a wound in the city's musical soul that has never fully healed. This Mississippi Blues Trail site is a place of remembrance, and visiting it is essential to understanding the full weight of what music has meant — and cost — in Natchez. *5 St. Catherine St, Natchez, MS 39120.*

Natchez is where the loop gets quiet and heavy. The beauty here is real — the mansions, the river, the light — but so is the sorrow. You leave carrying both, and that's what makes Natchez unforgettable. The oldest song on the river is always a little sad.`,
  },
  {
    id: 5,
    title: 'St. Francisville: Ghosts, Gardens, and the River Road',
    slug: 'st-francisville-ghosts-gardens-and-the-river-road',
    category: 'city-guide',
    city: 'st-francisville',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'You cross into Louisiana and the world changes. St. Francisville appears like something out of a Walker Percy novel — a two-street town of antebellum homes and live oaks so old they\'ve forgotten what century it is.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/natchez-trace-parkway.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-09').toISOString(),
    createdAt: new Date('2026-02-09').toISOString(),
    updatedAt: new Date('2026-02-09').toISOString(),
    body: `# St. Francisville: Ghosts, Gardens, and the River Road

You cross into Louisiana and the world changes. The trees get closer to the road, the moss gets thicker, and St. Francisville appears like something out of a Walker Percy novel — a two-street town of antebellum homes and live oaks so old they've forgotten what century it is. This is the heart of English Louisiana, the plantation country along the River Road, where the ghosts are a selling point and the gardens bloom even when no one's watching.

St. Francisville is small. You can walk the entire historic district in twenty minutes. But the density of beauty here is staggering — every house has a story, every garden has a secret, and the light filtering through the canopy of oaks is the color of sweet tea.

## Where to Stay

**The Myrtles Plantation** — One of America's most haunted homes, and it looks the part. Built in 1796, draped in mystery, surrounded by gardens that feel enchanted even in daylight. Ghost tours run nightly, and guests have reported everything from apparitions to cold spots to the sound of a piano playing in empty rooms. The lodging ranges from historic rooms to private cabins. Even if you don't believe in ghosts, you'll sleep with one eye open. $200–$350/night. *7747 US Hwy 61, St. Francisville, LA 70775.*

**The St. Francisville Inn** — A luxurious boutique inn in a renovated 19th-century home, with antiques, a spa, a pool, and a central location in the historic district. This is where you stay when you want the plantation atmosphere without the paranormal. Wake up here and the first thing you see is the garden through your window, dripping with dew. $250–$400/night. *5720 Commerce St, St. Francisville, LA 70775.*

**Barrow House Inn** — Two historic downtown houses filled with American antiques, private baths, and the warmth of owners who treat you like family. Walking distance to everything. The rooms are cozy, the coffee is strong, and the porch is the kind you sit on for three hours without realizing it. $150–$250/night. *9779 Royal St, St. Francisville, LA 70775.*

## Where to Eat

**The Saint Restaurant** — Upscale dining inside the St. Francisville Inn, Michelin Recommended, with locally sourced seasonal dishes rooted in Creole heritage. The pecan-crusted redfish is the signature — a golden fillet with a nutty crunch that gives way to flaky, butter-soft fish. Coriander-crusted scallops for the adventurous. This is fine dining that still feels like Louisiana. $$–$$$. *5720 Commerce St, St. Francisville, LA 70775.*

**Magnolia Cafe** — A quaint local institution on Commerce Street serving po'boys, sandwiches, and salads in a room that hasn't changed much since your parents were dating. The spicy shrimp po'boy is legendary — Gulf shrimp, fried golden, dressed and dripping on French bread that crunches when you bite through it. The Turkey Special is the other move. $$. *5689 Commerce St, St. Francisville, LA 70775.*

**Restaurant 1796** — Fine dining inside the Myrtles Plantation, because of course there's a restaurant in the haunted house. Wood-fired hearth, shared plates from local produce, chargrilled oysters bubbling in garlic butter, and blackened redfish that tastes like the bayou distilled onto a plate. The candlelight flickers. The floorboards creak. Dinner here is theater. $$$. *7747 US Hwy 61, St. Francisville, LA 70775.*

## Where to Hear the Music

**The Oyster Bar** — A dive bar and honky tonk on Bayou Sarah with regular live music, pool tables, darts, and the kind of local energy that makes you forget you're a tourist. Country, rock, blues — whatever the band feels like playing. Cold beer, loud music, no pretension. This is St. Francisville after dark. *11101 Ferdinand St, St. Francisville, LA 70775.*

**The Chill Mill** — Live bands in a laid-back setting that functions as the town's unofficial living room. The music varies — rock one night, acoustic blues the next — but the atmosphere stays the same: easy, friendly, and slightly wild around the edges. *10003 Wilcox St, St. Francisville, LA 70775.*

**The Myrtles Plantation** — Even the music here has a ghostly quality. The Myrtles hosts events rooted in Southern and blues heritage, and there's something about hearing live music in a 230-year-old plantation house that makes every note feel haunted. The oaks outside catch the sound and hold it. *7747 US Hwy 61, St. Francisville, LA 70775.*

St. Francisville is the pause on the loop. The deep breath between Mississippi's blues country and Louisiana's Cajun fire. You carry the ghosts with you — the literal ones from the Myrtles, and the figurative ones that live in every moss-draped oak and candlelit dining room. Some places haunt you because they're beautiful. St. Francisville haunts you because it's true.`,
  },
  {
    id: 6,
    title: 'Baton Rouge: Capital City Blues and Bayou Smoke',
    slug: 'baton-rouge-capital-city-blues-and-bayou-smoke',
    category: 'city-guide',
    city: 'baton-rouge',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Underneath the politics and the Purple and Gold, Baton Rouge is a blues town. A juke joint town. A city where the music lives in the neighborhoods, not the tourist districts, and where you have to know where to look.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/jackson-capitol.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-11').toISOString(),
    createdAt: new Date('2026-02-11').toISOString(),
    updatedAt: new Date('2026-02-11').toISOString(),
    body: `# Baton Rouge: Capital City Blues and Bayou Smoke

Baton Rouge sprawls. It's not a walking city — it's a driving city, a city of wide boulevards and strip-mall churches and neighborhoods that shift from LSU tailgate culture to deep-rooted Black Southern tradition in the space of a single turn. The state capitol — that Art Deco tower Huey Long built to look like a middle finger aimed at Washington — rises above the downtown riverfront, and the Mississippi runs wide and brown below it.

But underneath the politics and the Purple and Gold, Baton Rouge is a blues town. A juke joint town. A city where the music lives in the neighborhoods, not the tourist districts, and where you have to know where to look. The food helps. Baton Rouge sits at the border of Cajun country and the Deep South, and the plates here show the collision — crawfish étouffée next to smothered pork chops, gumbo next to fried alligator.

This is also the junction where New Orleans spurs off the loop. Head southeast for an hour and you're in another world entirely. But first, Baton Rouge has some things to show you.

## Where to Stay

**WATERMARK Baton Rouge** — A luxe boutique hotel inside a meticulously restored 1927 bank building. Marble floors, soaring ceilings, and the kind of preserved grandeur that makes you stand up straighter. The downtown riverfront location puts you steps from the capitol and the levee. $170–$300+/night. *150 3rd St, Baton Rouge, LA 70801.*

**Origin Hotel Baton Rouge** — Artsy and design-forward, built inside a repurposed mid-century downtown building with local flavor throughout. Rooftop deck with views of the city. This is where Baton Rouge's creative class drinks and where out-of-towners feel like insiders. $150–$250/night. *101 St Ferdinand St, Baton Rouge, LA 70802.*

**The Stockade Bed and Breakfast** — A quiet, historic B&B with a residential setting on Highland Road, near LSU. Porch, garden, the sound of birds in the morning instead of traffic. For travelers who want a personal, unhurried Baton Rouge experience. $150–$250/night. *8860 Highland Rd, Baton Rouge, LA 70808.*

## Where to Eat

**The New Ethel's Snack Shack** — A beloved North Baton Rouge institution tied to Southern University's community. No-frills soul food with deep local roots — red beans and rice on Monday the way God intended, rotating specials like smothered pork chops that sell out before you arrive if you're not early. This is the food that sustains a city. $. *1553 Fairchild St, Baton Rouge, LA 70807.*

**The Chimes** — The iconic Baton Rouge hangout near LSU. Loud, beer-forward, packed with students and locals and the occasional visiting parent trying to keep up. The crawfish étouffée is the standard order. Fried alligator for the adventurous. Jambalaya for the faithful. It's not refined, but it's alive, and on a Saturday night during football season, there's no place in Louisiana more electric. $$. *3357 Highland Rd, Baton Rouge, LA 70802.*

**Poor Boy Lloyd's** — An old-school downtown counter-service spot known for classic Louisiana plates. The fried shrimp po'boy is the benchmark against which all other po'boys in Baton Rouge are measured. Gumbo, red beans and rice, and a lunch crowd of legislators and laborers eating the same thing. This is democracy at the lunch counter. $. *201 Florida St, Baton Rouge, LA 70801.*

## Where to Hear the Music

**Henry Turner Jr.'s Listening Room** — Often described as Baton Rouge's last blues juke joint, and it lives up to the title. A tight, community-driven listening room centered on blues heritage and live local performers. Henry Turner Jr. himself is a blues institution — musician, historian, keeper of the flame. When he introduces the next act, you listen. *2733 North St, Baton Rouge, LA 70802.*

**Phil Brady's Bar & Grill** — A long-running Baton Rouge bar known for its weekly blues jam. Working musicians sit in, the sets stretch past midnight, and the audience is half musicians waiting for their turn. This is the blues as a living, collaborative art form, not a performance. *4848 Government St, Baton Rouge, LA 70806.*

**Teddy's Juke Joint** — A genuine backroad juke joint just outside Baton Rouge in Zachary. Memorabilia on every wall, dance floor worn smooth by decades of feet, and live blues on weekends that will rearrange your understanding of a Saturday night. You drive down Old Scenic Highway to get there, and the name of the road is not ironic. *16999 Old Scenic Hwy, Zachary, LA 70791.*

Baton Rouge is the crossroads of the loop — geographically and spiritually. Cajun country starts here. The Deep South lingers. The blues runs through everything like the river that gives the city its shape. You leave Baton Rouge heading west toward Lafayette, or you detour south to New Orleans. Either way, you leave fuller than you arrived.`,
  },
  {
    id: 7,
    title: 'New Orleans: The Eternal Spur, the Inevitable City',
    slug: 'new-orleans-the-eternal-spur-the-inevitable-city',
    category: 'city-guide',
    city: 'new-orleans',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'New Orleans is not on the Big Muddy Loop. It\'s a spur off Baton Rouge — an hour southeast, a world apart. But you cannot drive through Louisiana and not go to New Orleans. That would be like visiting Rome and skipping the Vatican.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/new-orleans-frenchmen.webp',
    readTime: '6 min read',
    publishedAt: new Date('2026-02-13').toISOString(),
    createdAt: new Date('2026-02-13').toISOString(),
    updatedAt: new Date('2026-02-13').toISOString(),
    body: `# New Orleans: The Eternal Spur, the Inevitable City

New Orleans is not on the Big Muddy Loop. It's a spur off Baton Rouge — an hour southeast, a world apart. But you cannot drive through Louisiana and not go to New Orleans. That would be like visiting Rome and skipping the Vatican. New Orleans is the cathedral.

You smell it before you see it — river water and jasmine and something frying in a cast-iron skillet. The humidity wraps around you like a second skin. The architecture in the French Quarter is Caribbean, not Southern, the wrought-iron balconies dripping with ferns and the ghosts of every jazz funeral that's ever marched down these streets. Bourbon Street is loud and tacky and impossible to resist. But the real New Orleans is one block over, on Royal Street, where a clarinetist plays for tips at midnight and the sound bounces off 300-year-old walls.

This is the city that invented jazz, perfected the cocktail, and treats death as an excuse for a parade. You don't visit New Orleans. You survive it.

## Where to Stay

**Hotel Monteleone** — A French Quarter landmark since 1886, with the iconic rotating Carousel Piano Bar in the lobby where literary giants — Tennessee Williams, Truman Capote, William Faulkner — drank and wrote and drank some more. The rooms are elegant, the location is unbeatable, and waking up here means waking up in the center of the oldest story in American cities. $250–$500/night. *214 Royal St, New Orleans, LA 70130.*

**Hotel Peter and Paul** — A converted 19th-century church, school, and convent in the Marigny, with stained glass, cloistered courtyards, and a speakeasy bar that feels like absolution. The gothic ecclesiastical vibe is extraordinary — you're sleeping in a building that was sacred, and it still feels that way. Steps from the Frenchmen Street music scene. $200–$500/night. *2317 Burgundy St, New Orleans, LA 70117.*

**Dauphine Orleans Hotel** — A boutique hotel in a historic Creole cottage with a past: May Baily's bar, the former on-site lounge, was once a bordello. The haunted history is part of the charm. Saltwater pool, central French Quarter location, and the kind of courtyard that makes you forget you're in the loudest city in America. $150–$400/night. *415 Dauphine St, New Orleans, LA 70112.*

## Where to Eat

**Dooky Chase's Restaurant** — If New Orleans has a soul, it lives at Dooky Chase's. Founded in 1941, this Creole soul food institution served as a civil rights meeting place — because Jim Crow didn't dare cross Leah Chase's threshold. James Beard America's Classics winner. The fried chicken is legendary. The gumbo is a sermon. Every plate here carries the weight of history and the taste of love. $$$. *2301 Orleans Ave, New Orleans, LA 70119.*

**Willie Mae's Scotch House** — A Tremé legend since 1957, winner of the James Beard America's Classics award, and home to what many consider the greatest fried chicken on the planet. The batter is impossibly crispy. The meat is impossibly juicy. The sides — butter beans, red beans — are impossibly good. The line will be long. Stand in it. $$. *2401 St Ann St, New Orleans, LA 70119.*

**Compère Lapin** — Chef Nina Compton's Caribbean-Creole fusion in the Warehouse District. The curried goat is a masterpiece — rich, spiced, tender, served with the confidence of a chef who knows she's bridging two worlds. The pig ears are for the adventurous, and they reward the adventure. This is New Orleans moving forward without looking back. $$$. *535 Tchoupitoulas St, New Orleans, LA 70130.*

## Where to Hear the Music

**Preservation Hall** — The most important room in American music. A small, un-air-conditioned hall in the French Quarter where traditional New Orleans jazz has been played nightly since 1961. No drinks. No food. No phones. Just the music — trumpet, trombone, clarinet, piano, drums — played by musicians who carry a tradition older than recording technology. You stand or sit on the floor, and the sound fills you up. *726 St Peter St, New Orleans, LA 70116.*

**Maple Leaf Bar** — An Uptown institution on Oak Street, where the music is blues and funk and R&B and whatever else the band decides. The Tuesday night Rebirth Brass Band residency is one of the greatest standing gigs in American music. The floor bounces. The walls sweat. The brass section hits you in the sternum. *8316 Oak St, New Orleans, LA 70118.*

**Kermit's Tremé Mother-in-Law Lounge** — Kermit Ruffins' bar in the Tremé, the oldest African American neighborhood in the country. Jazz, blues, funk, barbecue, and the kind of hospitality that only Kermit — trumpeter, chef, legend — can provide. Some nights he cooks red beans and rice for the whole bar. Every night, the music is extraordinary. *1500 N Claiborne Ave, New Orleans, LA 70116.*

New Orleans is the city you carry forever. Not because it's perfect — it's deeply, beautifully imperfect — but because it's alive in a way no other American city manages. The spur off the loop becomes the emotional center of the whole journey. You drive back to Baton Rouge with jazz in your ears and powdered sugar on your shirt, and you understand that the Big Muddy isn't just a route. It's a love letter to the South, and New Orleans is the signature.`,
  },
  {
    id: 8,
    title: 'Lafayette: The Heartbeat of Cajun Country',
    slug: 'lafayette-the-heartbeat-of-cajun-country',
    category: 'city-guide',
    city: 'lafayette',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Lafayette hits you like a two-step. The moment you cross the city limits, accordion and fiddle replace guitar and harmonica, the rhythms shift from 12-bar blues to Cajun waltz, and the food gets richer, spicier, more unapologetically itself.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/eating-the-delta.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-15').toISOString(),
    createdAt: new Date('2026-02-15').toISOString(),
    updatedAt: new Date('2026-02-15').toISOString(),
    body: `# Lafayette: The Heartbeat of Cajun Country

Lafayette hits you like a two-step. The moment you cross the city limits, the music changes — accordion and fiddle replace guitar and harmonica, the rhythms shift from 12-bar blues to Cajun waltz, and the food gets richer, spicier, more unapologetically itself. This is the capital of French Louisiana, the hub of Cajun and Creole culture, and a city that treats every meal like a celebration and every Saturday night like a birthright.

The streets smell like boudin and roux. The live oaks form canopies over neighborhoods where French is still spoken on front porches. And in the dance halls and honky-tonks that dot the city, the music is not a performance for tourists — it's a way of life for the people who've been playing it for three hundred years.

Lafayette doesn't just welcome you. It grabs your hand and pulls you onto the dance floor.

## Where to Stay

**Maison Mouton Bed & Breakfast** — A historic 1820s plantation home in the Sterling Grove Historic District, tucked under ancient oaks with antique furnishings and lush gardens. The Cajun hospitality is genuine — you're a guest in someone's ancestral home, and they treat you accordingly. Wake up here and breakfast is an event. $$. *338 North Sterling St, Lafayette, LA.*

**T'Frere's House** — An Acadian-style B&B in a preserved 1880 home where the hospitality is so old-school it includes complimentary cocktails and a full breakfast. The gardens are beautiful, the rooms are quiet, and the house itself is a museum of Cajun domestic life. $190–$295/night. *1905 Verot School Rd, Lafayette, LA.*

**Carriage House Hotel** — AAA Four Diamond boutique in the upscale River Ranch district. Marble showers, private parking, personalized service. This is Lafayette's polished side — proof that Cajun country can do luxury without losing its soul. $250–$450/night. *603 Silverstone Rd, Lafayette, LA.*

## Where to Eat

**Laura's II** — James Beard semifinalist Madonna Broussard's iconic spot for soul food and Sunday BBQ. The stuffed baked turkey wing is a work of art — a massive wing stuffed with cornbread dressing and smothered in gravy so rich it belongs in a museum. Laura's preserves Lafayette's culinary traditions with every plate. $$. *1904 W University Ave, Lafayette, LA.*

**Johnson's Boucaniere** — A family smokehouse since 1937, named best BBQ in Louisiana by Food Network. The brisket is chopped and smoky and perfect. The boudin — that Cajun rice-and-pork sausage that defies description — is the thing you didn't know you needed. Hickory smoke, plastic chairs, cold drinks. This is Cajun BBQ at its finest. $$. *1111 Saint John St, Lafayette, LA.*

**Olde Tyme Grocery** — A neighborhood grocery since 1965, famous for the best po'boys in America. That's not hyperbole — Tripadvisor gave it the title, and once you bite through the crunchy French bread into a pile of fried Gulf shrimp, you'll agree. The line is long. The sandwich is worth it. $. *218 W Saint Mary Blvd, Lafayette, LA.*

## Where to Hear the Music

**Blue Moon Saloon** — The iconic Lafayette honky-tonk, a neighborhood bar with a backyard stage where Cajun, zydeco, and blues fill the air on most nights. The crowd is a mix of locals, students, and travelers, all two-stepping under string lights. This is where you learn that Cajun music is not a museum piece — it's a party. *215 E Convent St, Lafayette, LA.*

**Rock 'n' Bowl** — Yes, it's a bowling alley. Yes, there's live zydeco and Cajun music. Yes, you can bowl and dance at the same time. Rock 'n' Bowl is the most joyfully absurd venue on the entire loop, and a Saturday night here — with a brass band on stage and bowling pins crashing in the background — is pure Lafayette. *905 Jefferson St, Lafayette, LA.*

**Freetown Boom Boom Room** — Zydeco, blues, and everything in between in a venue that captures the creative, multicultural energy of Lafayette's music scene. The Boom Boom Room is where you go when you want to hear something you can't quite categorize — the place where Cajun and Creole and blues and funk all shake hands. *300 McKinley St, Lafayette, LA.*

Lafayette is joy. Pure, uncomplicated, accordion-fueled joy. You leave with boudin grease on your fingers and a two-step rhythm in your head and the knowledge that whatever else the South is — haunted, complicated, heavy — it is also, in Lafayette, a celebration. Carry that with you. You'll need it.`,
  },
  {
    id: 9,
    title: 'Alexandria: The Crossroads Nobody Expected',
    slug: 'alexandria-the-crossroads-nobody-expected',
    category: 'city-guide',
    city: 'alexandria',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Alexandria sits in the geographic center of Louisiana, which means most people drive through it on their way to somewhere else. That\'s a mistake. A Gilded Age hotel that once hosted World War II generals, bayou cottages hidden in pecan orchards.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/greenville-levee.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-17').toISOString(),
    createdAt: new Date('2026-02-17').toISOString(),
    updatedAt: new Date('2026-02-17').toISOString(),
    body: `# Alexandria: The Crossroads Nobody Expected

Alexandria sits in the geographic center of Louisiana, which means most people drive through it on their way to somewhere else. That's a mistake. This small city on the Red River has a Gilded Age hotel that once hosted World War II generals, bayou cottages hidden in pecan orchards, and a soul food tradition that could hold its own against any city twice its size.

The downtown is quiet. Main Street has that post-industrial Southern feel — beautiful old buildings, some renovated, some waiting. The Red River moves slowly past the amphitheater on the waterfront. And on the right night, in the right bar, Alexandria reveals itself as exactly what it is: a genuine Southern crossroads, unhurried and unapologetic, with stories worth stopping for.

## Where to Stay

**Hotel Bentley** — A 1908 Gilded Age masterpiece with an Ionic-columned facade and an opulent lobby that looks like it was designed by someone who'd just returned from Paris. During World War II, generals like Eisenhower and Patton stayed here while training troops at nearby Camp Beauregard. The grandeur is preserved — the marble, the chandeliers, the wide staircase — and sleeping here feels like stepping into a sepia photograph. $100–$200/night. *200 DeSoto St, Alexandria, LA 71301.*

**Susan's Cottages** — Private romantic cottages nestled in a pecan orchard along Bayou Rapides. Each cottage has a whirlpool tub and a bayou-view balcony. You wake up to the sound of water moving slowly through trees, and for a moment you forget the rest of the world exists. This is Louisiana at its most secret and most beautiful. $200+/night. *7107 Bayou Rapides Rd, Alexandria, LA 71303.*

**Parc England Boutique Hotel** — A charming hotel in a former Air Force officers' club, with Louisiana-style rooms, a pool, and a bayou bistro ambiance that makes the military origins feel like a distant memory. ~$135/night. *1321 Chappie James Ave, Alexandria, LA 71303.*

## Where to Eat

**Pamela's Bayou in a Bowl** — Soul food the way your grandmother made it, if your grandmother happened to be a genius. Baked or smothered chicken, red beans and rice, cornbread that crumbles perfectly, and cake for dessert because Pamela insists. The portions are enormous. The love in the food is palpable. This is not a restaurant — it's an institution. $$. *2049 N Mall Dr, Alexandria, LA 71301.*

**Outlaw's Barbecue** — Award-winning smoked meats in a family-friendly atmosphere. The brisket is the headliner — bark so black and beautiful it looks lacquered — but the Outlaw's Special (brisket, sausage, and ribs together) is the power move. The sides are homemade, the tea is sweet, and the smoke is in the air before you even park. $$. *818 S MacArthur Dr, Alexandria, LA 71301.*

**Spirits Food and Friends** — BBQ shrimp and deviled eggs in a setting that pulls double duty as one of Alexandria's best music venues. The food is creative but grounded — Louisiana flavors with a chef's touch. Come for dinner, stay for the music. That's the Alexandria way. $$. *1200 Texas Ave, Alexandria, LA 71301.*

## Where to Hear the Music

**Spirits Food and Friends** — The same spot where you ate those deviled eggs transforms into Alexandria's live music hub after dark. Blues, R&B, and local acts fill the room, and the intimacy of the space makes every performance feel personal. The bartender knows the band. The band knows the regulars. You become a regular by the second drink. *1200 Texas Ave, Alexandria, LA 71301.*

**Coughlin-Saunders Performing Arts Center** — A more formal venue for jazz, symphony, and touring acts. The acoustics are excellent, the programming is varied, and on the right night, you'll hear a jazz quartet that makes you forget you're in central Louisiana. Or remember, depending on how you feel about central Louisiana. *1202 3rd St, Alexandria, LA 71301.*

**Alexandria Riverfront Amphitheater** — Open-air concerts on the Red River waterfront. Festivals, pops concerts, and touring acts perform against the backdrop of the water and the sky, and there's something about hearing live music outside in Louisiana — the humidity, the cicadas, the river smell — that no indoor venue can replicate. *Red River waterfront, Alexandria, LA.*

Alexandria is the surprise on the loop. The city nobody told you about, the one you almost skipped. You'll carry the Hotel Bentley's lobby in your memory, and Pamela's cooking in your stomach, and the quiet conviction that some of the best places in the South are the ones that don't advertise.`,
  },
  {
    id: 10,
    title: 'Natchitoches: The Oldest Town and the Longest Memory',
    slug: 'natchitoches-the-oldest-town-and-the-longest-memory',
    category: 'city-guide',
    city: 'natchitoches',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Say it: NAK-uh-tish. Now you belong here. Natchitoches is the oldest permanent settlement in the Louisiana Purchase territory, founded in 1714. The brick streets are still here, the Cane River still curves through downtown like a ribbon.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/blues-trail-marker.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-19').toISOString(),
    createdAt: new Date('2026-02-19').toISOString(),
    updatedAt: new Date('2026-02-19').toISOString(),
    body: `# Natchitoches: The Oldest Town and the Longest Memory

Say it: NAK-uh-tish. Now you belong here.

Natchitoches is the oldest permanent settlement in the Louisiana Purchase territory, founded in 1714 by French colonists who looked at the Cane River and decided this was the place. Three centuries later, the brick streets are still here, the Cane River still curves through downtown like a ribbon on a gift, and the iron-lace balconies still hang over Front Street like something out of a fever dream set in France.

You may recognize it. *Steel Magnolias* was filmed here, and the town has the movie's same quality — beautiful, stubborn, deeply Southern, and more complicated than it first appears. The Creole heritage runs deep. The food is unlike anything else on the loop. And the light on the Cane River at sunset is the kind of thing that makes you pull over and just stand there.

## Where to Stay

**Château Saint Denis Hotel** — A downtown boutique hotel with French Quarter-inspired courtyard vibes — brick courtyard, fountain, old-world lobby. Walkable to everything in the historic district. This is where you stay when you want Natchitoches at your doorstep. $150–$250/night. *751 2nd St, Natchitoches, LA 71457.*

**Church Street Inn** — A stylish, locally owned inn built inside a renovated 1940s bank building. Balconies, a courtyard, and Southern hospitality that feels personal because it is. Prime downtown location. $140–$220/night. *120 Church St, Natchitoches, LA 71457.*

**Sweet Cane Inn Bed & Breakfast** — A restored Victorian B&B with high ceilings, fireplaces, stained glass, and a breakfast that alone justifies the stay. The kind of place where the owners know your name by evening and your coffee order by morning. $130–$200/night. *926 Washington St, Natchitoches, LA 71457.*

## Where to Eat

**Lasyone's Meat Pie Restaurant** — You cannot come to Natchitoches and not eat a meat pie. It's the law. Lasyone's has been the go-to since 1967 — a family-run institution serving the official Natchitoches specialty: a crescent of fried dough stuffed with seasoned pork and beef that shatters when you bite into it. The crawfish pie is the secret second order. $$. *622 2nd St, Natchitoches, LA 71457.*

**Mayeaux's Steak & Seafood** — A Front Street staple for upscale nights in the historic district. Aged steaks and Louisiana seafood, but the signature dish is the Catfish Acadiana — fried catfish topped with crawfish étouffée, which is essentially two perfect dishes stacked on top of each other. This is Natchitoches at its most indulgent. $$$. *512 Front St, Natchitoches, LA 71457.*

**Merci Beaucoup Restaurant** — A beloved downtown lunch institution with a quirky, local energy. The Cajun Potato — a baked potato stuffed with crawfish étouffée and fried shrimp — is the kind of dish that sounds excessive and tastes essential. Comfort food with Cajun soul, served by people who clearly love what they do. $$. *Historic District, Front St area, Natchitoches, LA 71457.*

## Where to Hear the Music

**Mama's Blues Room** — Tucked inside Mama's Oyster House on Front Street, this blues room hosts acoustic and electric sets that range from deep Delta blues to jazz and zydeco crossover. The room is small, the sound is big, and the oysters downstairs give you an excuse to arrive early. This is Natchitoches's beating musical heart. *608 Front St, Natchitoches, LA 71457.*

**Natchitoches Jazz/R&B Festival** — A downtown riverbank festival that draws jazz, R&B, blues, and zydeco acts to the banks of the Cane River. When the festival is running, the entire town becomes a venue — music drifting over the water, crowds on the brick streets, and the sense that Natchitoches has been throwing parties like this for centuries. Because it has. *Downtown Riverbank, Natchitoches, LA 71457.*

**Cane River Creole National Historical Park** — The park hosts music-focused events including the Cane River Music Festival, celebrating Creole traditions like juré singing alongside blues and jazz influences. This is living cultural history — the music of the Cane River Creole community, preserved and performed in the landscape where it was born. *Oakland Plantation area, near Natchitoches, LA.*

Natchitoches is the most beautiful town on the loop, and possibly the most underrated. You carry the taste of the meat pie and the sound of blues on the Cane River and the image of those iron-lace balconies in the golden light. Some towns try to be charming. Natchitoches just is.`,
  },
  {
    id: 11,
    title: 'Shreveport: Neon, Hayrides, and the Ghost of Elvis',
    slug: 'shreveport-neon-hayrides-and-the-ghost-of-elvis',
    category: 'city-guide',
    city: 'shreveport',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Before there was Nashville, there was Shreveport. The Louisiana Hayride — the radio show that launched Elvis Presley, Hank Williams, Johnny Cash — broadcast from the Municipal Auditorium. Shreveport was the second city of country music, the place where rockabilly was born.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/juke-joint-saturday.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-21').toISOString(),
    createdAt: new Date('2026-02-21').toISOString(),
    updatedAt: new Date('2026-02-21').toISOString(),
    body: `# Shreveport: Neon, Hayrides, and the Ghost of Elvis

Before there was Nashville, there was Shreveport. The Louisiana Hayride — the radio show that launched Elvis Presley, Hank Williams, Johnny Cash, and a dozen other legends — broadcast from the Municipal Auditorium on what is now, with appropriate poetry, Elvis Presley Boulevard. Shreveport was the second city of country music, the place where rockabilly was born, and a blues town in its own right, long before the casinos came and the neon went up along the Red River.

The city has a split personality. Downtown is riverboat casinos and renovated warehouses. The Highland neighborhood, a few miles south, is Victorian houses, college bars, and the kind of tree-lined streets where the music scene actually lives. The food is a blend of Cajun, Creole, and North Louisiana traditions that tastes like nowhere else. And the ghosts — not literal ones, but the musical kind — are everywhere.

## Where to Stay

**The Remington Suite Hotel & Spa** — A downtown boutique all-suite hotel in a building over a century old. The suites are artsy, the rooftop is excellent, and there's a 1920s-style lounge with speakeasy energy that perfectly captures Shreveport's talent for reinventing itself without forgetting where it came from. $200–$400/night. *220 Travis St, Shreveport, LA 71101.*

**Stay Fairfield** — A historic Highland District B&B spanning two classic Fairfield Avenue homes. Porches, gardens, old-house romance with modern comforts. This is Shreveport's residential best — the neighborhood where the city's stories live, told in architecture. $120–$200/night. *2221 Fairfield Ave, Shreveport, LA 71104.*

**2439 Fairfield "A Bed & Breakfast"** — A circa-1905 Victorian mansion packed with antiques and gardens. Pure Southern Gothic ambiance on Shreveport's grand historic Fairfield Avenue. The kind of B&B where you sit on the porch in the morning and feel the weight of a century pressing gently on your shoulders. $150–$250/night. *2439 Fairfield Ave, Shreveport, LA 71104.*

## Where to Eat

**Herby-K's** — A time-capsule seafood joint open since 1936, and home to the Shrimp Buster — a Shreveport original sandwich that's been copied but never duplicated. Fried shrimp on a bun with a signature sauce that the family won't share. The interior hasn't changed much since Eisenhower was president, and that's the point. $$. *1833 Pierre Ave, Shreveport, LA 71103.*

**Strawn's Eat Shop** — The classic Shreveport greasy spoon. An iconic breakfast-and-pie pilgrimage that locals have been making for generations. The icebox pie — especially the strawberry — is the reason. Creamy, cold, sweet, and sitting in a case by the register like a dare. You will eat a whole slice. You may eat two. $. *125 E Kings Hwy, Shreveport, LA 71104.*

**Us Up North Kitchen** — Chef-driven, deeply local Southern cooking celebrating North Louisiana's distinct culinary identity. The fried catfish is the standard, but the rotating specials reward repeat visits. This is the restaurant that proves North Louisiana deserves its own food conversation, separate from New Orleans, separate from Cajun country, and just as worthy. $$. *300 N Allen Ave, Shreveport, LA 71101.*

## Where to Hear the Music

**Shreveport Municipal Auditorium** — A National Historic Landmark Art Deco auditorium and the home of the Louisiana Hayride. Elvis performed here. Hank Williams performed here. Johnny Cash performed here. The building itself is a living museum of early American popular music, and attending a show in this room is like stepping into a photograph from 1954. *705 Elvis Presley Blvd, Shreveport, LA 71101.*

**Bear's on Fairfield** — A neighborhood bar in the Highland area with strong local-arts energy and frequent live sets. Rock, blues, Americana, singer-songwriters — whatever's happening, it's authentic. This is where Shreveport's musicians play when they're not on tour, which is to say, this is where the real music lives. *1401 Fairfield Ave, Shreveport, LA 71101.*

**Highland Jazz & Blues Festival** — A free annual party in Columbia Park, across from Centenary College. One of the best ways to experience Shreveport's jazz and blues community in a single afternoon — local artists, local food, and the sense that this neighborhood has been holding this party, in one form or another, since long before it had a name. *Columbia Park, Shreveport, LA 71104.*

Shreveport is the city on the loop that surprises people most. They come expecting casinos and leave humming the Hayride theme. You carry the Shrimp Buster and the Municipal Auditorium and the sound of a band at Bear's, and you understand that the roots of American music run deeper and wider than any single city can contain.`,
  },
  {
    id: 12,
    title: 'El Dorado: Oil Boom Echoes and Arkansas Soul',
    slug: 'el-dorado-oil-boom-echoes-and-arkansas-soul',
    category: 'city-guide',
    city: 'el-dorado',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Oil burst from the ground in 1921 and turned this quiet South Arkansas town into a boomtown overnight. The boom faded, as booms do, but the architecture stayed, the pride stayed, and the Murphy Arts District has given El Dorado a second act.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/helena-river-levee.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-23').toISOString(),
    createdAt: new Date('2026-02-23').toISOString(),
    updatedAt: new Date('2026-02-23').toISOString(),
    body: `# El Dorado: Oil Boom Echoes and Arkansas Soul

The name means "the golden one," and for a few wild decades in the early twentieth century, El Dorado lived up to it. Oil burst from the ground in 1921 and turned this quiet South Arkansas town into a boomtown overnight — mansions went up, money poured in, and the population tripled. The boom faded, as booms do, but the architecture stayed, the pride stayed, and the Murphy Arts District has given El Dorado a second act that honors the first without trying to repeat it.

You arrive from Shreveport on the last leg north, and El Dorado feels different. Quieter. Arkansas different from Louisiana. The accent shifts, the terrain flattens into timber country, and the downtown square has that small-town Southern solidity — brick buildings, a courthouse, people who wave at you from their cars. But the music halls are world-class, the BBQ is serious, and the soul food is the real thing.

## Where to Stay

**The Haywood, Tapestry Collection by Hilton** — A 70-room boutique hotel in the heart of the Murphy Arts District, blending modern comfort with historic charm. Walk out the door and you're steps from the music halls, the restaurants, and the energy of the MAD. This is where you stay when you want to be in the middle of El Dorado's renaissance. $150–$250. *210 S Washington Ave, El Dorado, AR.*

**Union Square Guest Quarters** — A historic downtown hotel with suites that evoke Southern elegance. Some rooms overlook a courtyard fountain, and the whole place has the feeling of a time when El Dorado was flush with oil money and good manners. $169–$199. *234 E Main St, El Dorado, AR.*

**Pinson House Bed & Breakfast** — A circa-1919 historic B&B two blocks from the downtown square. Full breakfast, classic charm, and the kind of quiet that only a small Arkansas town can provide. $100–$150. *213 Southwest Ave, El Dorado, AR.*

## Where to Eat

**JJ's Barbecue** — An El Dorado institution since 1990 with unique private-recipe sauces and daily smoked meats. The ribs are the star — fall-off-the-bone tender, lacquered in a sauce that balances sweet and heat with the precision of a chemist. The catfish is the backup plan, and it's excellent. $$. *1000 E Main St, El Dorado, AR.*

**Howell's BBQ** — Family-owned since 2010, serving authentic wood-smoked meats and Southern sides. The pulled pork is smoky and loose, the ribs are competition-worthy, and the banana pudding — creamy, vanilla-rich, layered with wafers — is the kind of dessert that makes you close your eyes. $$. *2011 Junction City Rd, El Dorado, AR.*

**Smitty's Soul Food** — A cozy hole-in-the-wall serving traditional Southern soul food like home cooking. Pig feet, mac and cheese, collard greens — the dishes your great-aunt made on Sundays, served without ceremony and with complete sincerity. This is not a restaurant that needs to explain itself. $. *510 Martin Luther King Ave, El Dorado, AR.*

## Where to Hear the Music

**Murphy Arts District** — El Dorado's crown jewel. A premier arts district with an outdoor amphitheater that hosts live music festivals, including blues and heritage events. The amphitheater is beautiful — modern design in a historic setting — and on a summer night, with the music carrying across the district and the stars above South Arkansas, you understand why they built this. *101 E Locust St, El Dorado, AR.*

**First Financial Music Hall** — An intimate indoor music hall within the Murphy Arts District, hosting concerts by national acts. The acoustics are tuned for the kind of music that matters on this loop — blues, roots, rock, soul — and the intimacy of the room means there's no bad seat. *101 E Locust St, El Dorado, AR.*

**Griffin Music Hall** — Another gem in the MAD complex, known for blues performances and live Southern music events. Smaller than the Music Hall, tighter, with the kind of energy that comes from putting good musicians in a room that was built to listen. *101 E Locust St, El Dorado, AR.*

El Dorado is the last stop before Memphis, and it earns its place on the loop. This is where the South becomes the Mid-South, where Louisiana gives way to Arkansas, and where a small town with oil boom history proves that great music and great food don't require a big city. You leave heading north, the loop nearly closed, carrying El Dorado's quiet confidence with you like a stone in your pocket.`,
  },
  {
    id: 13,
    title: 'Monroe: Ouachita Gothic and the Forgotten River Sound',
    slug: 'monroe-ouachita-gothic-and-the-forgotten-river-sound',
    category: 'city-guide',
    city: 'monroe',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Monroe sits on the Ouachita River\'s western bank like a city that knows something the rest of Louisiana hasn\'t gotten around to admitting — that the real music, the raw and complicated kind, didn\'t only come from the Delta. Some of it came from right here.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/oxford-square.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-25').toISOString(),
    createdAt: new Date('2026-02-25').toISOString(),
    updatedAt: new Date('2026-02-25').toISOString(),
    body: `# Monroe: Ouachita Gothic and the Forgotten River Sound

The Ouachita River doesn't get the attention of the Mississippi, but it moves with the same dark patience, carrying sediment and memory south through the pine hills of Northeast Louisiana. Monroe sits on its western bank like a city that knows something the rest of Louisiana hasn't gotten around to admitting — that the real music, the raw and complicated kind, didn't only come from the Delta. Some of it came from right here, from porch steps and honky-tonks and the Saturday nights of a river town that bottled Coca-Cola before Atlanta ever thought to brag about it.

There's a Gothic quality to Monroe that the Spanish moss in the courthouse square makes literal. The antebellum ghosts are present — you feel them in the old neighborhoods where the oaks grow thick enough to block the afternoon sun — but so are the living traditions: the blues that floated up the Ouachita from the Delta, the country twang that Webb Pierce carried out of West Monroe and into Nashville's hall of fame, the R&B shimmer of Mighty Sam McClain. This is a city with a musical soul it doesn't always advertise, which is exactly the kind of soul worth finding.

Monroe is part of the Big Muddy's expanded territory — not on the core region, but woven into the same fabric. The river connects everything eventually. You just have to follow it.

## Where to Stay

**The Hotel Monroe** — A restored complex of 1891 buildings in the heart of downtown, converted into a boutique hotel that wears its age with pride rather than apology. Local art fills the walls, the brick shows through where the plaster has been pulled back with intentional restraint, and the suites manage to feel both historic and genuinely comfortable. This is where you stay when you want Monroe to feel like a discovery rather than a stopover. $$–$$$. *120 Walnut St, Monroe, LA.*

**Hamilton House Inn** — Across the river in West Monroe, on the stretch known as Antique Alley, this luxury B&B occupies a property with a rooftop terrace that catches the river breeze and lets you watch the sky go orange over the Ouachita. The neighborhood is quieter than downtown — old brick storefronts, dealers with dusty treasures in the windows — and the inn sits inside it like a secret. $$–$$$. *318 Trenton St, West Monroe, LA.*

**John Thomas Bed and Breakfast** — An 1904 Victorian two blocks from Louisiana Tech's campus, the kind of house that existed before anyone thought to make houses efficient. Private baths, high ceilings, the wood floors that only a century of living can produce. Wake up here to birdsong and strong coffee and the quiet conviction that the South still knows how to build a room. $$. *105 N 3rd St, West Monroe, LA.*

## Where to Eat

**Big Momma's Fine Foods** — The fried chicken here has the kind of crust that shatters and the kind of seasoning that makes you want to ask questions you know won't be answered. The hot water cornbread is served fresh from the skillet. The oxtails are a slow, patient reward for people who understand that some things cannot be rushed. Big Momma's is North Louisiana soul food at its most unapologetic — a corner institution where the portions are generous because stinginess is a character flaw. $–$$. *1118 S 2nd St, Monroe, LA.*

**Restaurant Cotton** — Named for the crop that built and broke this part of the South in equal measure, Restaurant Cotton serves Delta-inflected Southern cuisine in a downtown setting that manages to be elegant without being precious. The shrimp and grits come to the table looking like something painted and tasting like something earned. The catfish is treated with the respect a river fish deserves. $$–$$$. *101 N Grand St, Monroe, LA.*

**Waterfront Grill** — On the Desiard Street stretch where the evening light falls long across the river, the Waterfront Grill has been feeding Monroe with Gulf seafood and local specialties long enough to be considered part of the landscape. The Catfish Desiard — the house preparation, named for the very street it sits on — is the move. A plate of fried catfish filets with a sauce that tastes like someone grew up along a Louisiana waterway and cooked accordingly. $$–$$$. *5201 Desiard St, Monroe, LA.*

## Where to Hear the Music

**Enoch's Irish Pub** — Don't let the name mislead you. Since 1980, this Arch Street institution has been the beating heart of Monroe's live music scene — blues, folk, bluegrass, and Irish traditional in a room that smells like decades of spilled Guinness and good nights. The music ranges from acoustic solo sets to full band blowouts, and the crowd is the kind that listens with its whole body. Enoch's is a local treasure that never needed a marquee because everyone already knows where it is. *118 Arch St, Monroe, LA.*

**The Hub Music Hall** — A historic warehouse on Washington Street that was saved from the usual fate of historic warehouses by people who understood that a good room is worth preserving. Rock, blues, and soul move through this space on rotation, and the acoustics — all brick and beam and height — are the kind that make every band sound better than they expected. Monroe's concert anchor. *201 Washington St, Monroe, LA.*

**Mustang Sally** — Monroe's country music room, where the honky-tonk tradition Webb Pierce carried to Nashville lives on in a local key. Live entertainment most weekends, a crowd that two-steps without self-consciousness, and the particular energy of a room that has always known what it is and never tried to be anything else. *Monroe, LA.*

Monroe is the kind of city the Big Muddy network was built to celebrate — not famous, not on the postcard, but alive in the ways that matter. The Ouachita will carry you south toward Baton Rouge and the main region if you let it. But Monroe earns a longer look. Sit with the river for a night. Listen to what it knows.`,
  },
  {
    id: 14,
    title: 'Ruston: Pine Hills, College Town, and the Sound of Something Almost Lost',
    slug: 'ruston-pine-hills-college-town-and-the-sound-of-something-almost-lost',
    category: 'city-guide',
    city: 'ruston',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Ruston sits in Lincoln Parish like a rumor about what the South used to be. This is the town that produced Jeff Mangum of Neutral Milk Hotel — that somewhere in this quiet, gospel-scented college town, a musician figured out something transcendent about longing.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/command/highway-61.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-02-27').toISOString(),
    createdAt: new Date('2026-02-27').toISOString(),
    updatedAt: new Date('2026-02-27').toISOString(),
    body: `# Ruston: Pine Hills, College Town, and the Sound of Something Almost Lost

Ruston sits in Lincoln Parish like a rumor about what the South used to be — a railroad town that grew up around Louisiana Tech, kept its historic downtown more or less intact, and produces a particular quality of Saturday night that you can't manufacture or import. The pine hills press in from all sides, and the light filters through them in the late afternoon with a Gothic warmth that makes the brick buildings on the square glow the color of old blood.

This is the town that produced Jeff Mangum of Neutral Milk Hotel, which is an extraordinary thing to know about a small North Louisiana city — that somewhere in this quiet, gospel-scented college town, a musician figured out something transcendent about longing and recorded it in a lo-fi masterpiece that people still play on vinyl at 2 a.m. when they need to feel something real. That's the thing about Ruston: the depth here is disproportionate to the size.

The Big Muddy's expanded territory reaches into these pine hills, connecting the blues of the Delta below to the raw country sounds of the Ozarks above. Ruston is the link in the middle, unhurried and a little wild around the edges.

## Where to Stay

**The Big House** — Downtown Ruston's most characterful lodging, occupying a historic building that has been made into a series of luxurious king suites without losing the bones that make it interesting. The history stays in the walls while the comfort stays in the room, and the location puts you in the middle of everything the downtown square has to offer. $$–$$$. *Downtown Ruston, LA.*

**Ruston Lofts** — A micro-boutique hotel inside a restored 1920s department store, which is a description that should already have you interested. The minimalist modern suites preserve the building's tall ceilings and original details while layering in the kind of clean, contemporary comfort that makes you grateful someone had the vision to save this thing rather than tear it down. $$–$$$. *Downtown Ruston, LA.*

**The Lewis House Victorian Bed & Breakfast** — A short walk from Louisiana Tech's campus, this Victorian inn occupies that sweet spot between antique and livable — enough period detail to make you feel like you're sleeping inside history, enough actual comfort to make you sleep well. The private baths are a virtue. The front porch is an argument for slowing down. $$. *1212 N Trenton St, Ruston, LA.*

## Where to Eat

**Ponchatoulas** — North Louisiana might be pine hills and Protestant churches, but this South Vienna Street spot proves the Cajun and Creole traditions reach further north than you'd think. The seafood gumbo is dark and complex, the stuffed catfish arrives golden and improbable, and the whole menu reads like a love letter to Louisiana written by someone who meant every word. $$. *200 S Vienna St, Ruston, LA.*

**Log Cabin Grill & Market** — A West Park Avenue institution where mesquite smoke hangs in the air like a benediction and the steaks and ribs arrive with the confidence of a kitchen that has been doing this correctly for a long time. The Tex-Mex inflection in the menu is a reminder that Louisiana's borders are porous and that the best cooking borrows without apology. $$. *126 W Park Ave, Ruston, LA.*

**Beau Vines Steakhouse** — The move here is the Crab Cake Beignets — a dish that sounds like culinary braggadocio and delivers like a promise. Beau Vines takes the steakhouse tradition and runs it through a Creole filter, which is the right call for a city that sits at the intersection of several different Southern food cultures. The steak is serious. The sides are Louisiana. $$. *704 Celebrity Dr, Ruston, LA.*

## Where to Hear the Music

**The Revelry of Ruston** — An outdoor concert venue on the south end of town that brings national rock and country acts to a city that knows how to receive them. The large outdoor areas and high-energy programming make the Revelry feel like a portal to somewhere bigger, which is both its charm and its argument for existing — Ruston doesn't have to travel to the music if the music comes to Ruston. *2647 S Service Rd W, Ruston, LA.*

**Dixie Center for the Arts** — The 1930s theater that anchors Ruston's cultural life, a historic room with the kind of intimate scale that makes a live concert feel like a conversation. The programming runs from live concerts to theater to community music events, and the building itself — a survivor from the Depression era, when people built things to last — is worth the visit on its own terms. *212 N Vienna St, Ruston, LA.*

**Howard Auditorium at Louisiana Tech** — A 1,150-seat hall that hosts classical programs, jazz ensembles, and visiting performers in a space built for serious listening. There's a particular thrill to hearing a jazz quartet in a room designed with this kind of acoustic care — every note arriving clean and complete, the way music sounds when the room is on its side. *Louisiana Tech campus, Ruston, LA.*

Ruston earns its place on the Big Muddy's expanded map not by shouting but by being genuinely itself — a college town with Gothic undertones, a food scene that punches upward, and a music community that understands its own traditions. You leave on Highway 80, heading toward Monroe or toward Shreveport and the main loop, carrying the pine hills with you. Some places are quiet in the way that means empty. Ruston is quiet in the way that means full.`,
  },
  {
    id: 15,
    title: 'Little Rock: The Capital City That Kept Its Wound Open',
    slug: 'little-rock-the-capital-city-that-kept-its-wound-open',
    category: 'city-guide',
    city: 'little-rock',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Central High School sits in the middle of a residential neighborhood and you can stand across the street and feel 1957 pressing against your chest. But Little Rock is more than its famous wound. The Dreamland Ballroom alone is worth the detour.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/command/juke-joint.webp',
    readTime: '6 min read',
    publishedAt: new Date('2026-03-01').toISOString(),
    createdAt: new Date('2026-03-01').toISOString(),
    updatedAt: new Date('2026-03-01').toISOString(),
    body: `# Little Rock: The Capital City That Kept Its Wound Open

There are cities that memorialize their history by sealing it in glass, and there are cities that keep it raw and present, visible from the street. Little Rock is the second kind. Central High School sits in the middle of a residential neighborhood on Daisy L. Gatson Bates Drive, and you can stand across the street from it and feel 1957 pressing against your chest like a hand — the nine students, the federal troops, the screaming crowd, the weight of what this country was and what it took to change it. The National Historic Site does not soften the story. Neither does Little Rock.

But the city is more than its famous wound. The Arkansas River cuts through downtown, the Clinton Presidential Library rises over it like a glass jetty, and the neighborhoods south of Cantrell Road contain a blues and rock history that goes back to the Dreamland Ballroom on Ninth Street, where Duke Ellington and Louis Armstrong played on the Chitlin' Circuit to audiences who understood that music was not escapism but survival. The White Water Tavern on West Seventh has been keeping that faith in a different key for decades — gritty, loud, stubbornly authentic. Little Rock knows what it survived, and it plays accordingly.

This is the northernmost capital city on the Big Muddy's expanded territory — the place where the Delta music tradition climbs up out of the lowlands and meets the Arkansas hills. It's a significant junction, and it sounds like one.

## Where to Stay

**Capital Hotel** — An 1876 Gilded Age landmark on Markham Street, the kind of grand hotel that makes you walk more slowly through the lobby because the marble floor and the iron-lace staircase deserve the attention. Heads of state, politicians, and a fair number of musicians have slept here over a century and a half, and the rooms carry that history in their bones — not as a burden but as a depth charge, a slow-releasing weight that makes the stay feel momentous. $$$. *111 W Markham St, Little Rock, AR.*

**The Empress of Little Rock** — A Victorian B&B on Louisiana Street in the Quapaw Quarter historic district, a neighborhood of tower-crowned gables and wraparound porches and the peculiar beauty of a prosperous Southern city at the turn of the last century. The Empress is exactly what it sounds like: dramatic, period-faithful, and possessed of the kind of ornate charm that makes you feel like a character in a novel you're not sure you'd survive. $$–$$$. *2120 Louisiana St, Little Rock, AR.*

**The Burgundy Hotel** — West Little Rock's boutique answer to the question of what a contemporary hotel looks like when it decides to be serious about hospitality. Upscale suites with fireplaces, the kind of room where you pour a drink and don't feel like checking your phone. For travelers who want Little Rock's modern creative energy alongside genuine comfort. $$$. *West Little Rock, AR.*

## Where to Eat

**Bobbie D's** — Soul food the way the tradition intended — not as nostalgia bait, not as elevated reimagination, but as the real thing, cooked by people who grew up eating it. The oxtails are the prize: slow-braised to falling tenderness, swimming in a gravy that deserves its own story. The smothered dishes arrive as testimony. The hot water cornbread is the amen. This is the food that fed Little Rock's Ninth Street community through everything history threw at it. $–$$. *3201 W 65th St, Little Rock, AR.*

**Flying Fish** — Southern seafood as Arkansas interprets it — which means catfish, fried golden and served in a basket with hushpuppies that crunch on the outside and stay soft in the middle, the way hushpuppies are supposed to be but rarely are. The River Market location puts you in the middle of Little Rock's most energetic neighborhood, and the dining room has the comfortable, unpretentious energy of a place that has earned its regulars. $$–$$$. *511 President Clinton Ave, Little Rock, AR.*

**Maddie's Place** — On Rebsamen Park Road near the river, Maddie's takes the Cajun and Southern seafood tradition and executes it with the kind of quiet confidence that comes from not trying to prove anything to anyone. The seafood boils are theatrical and delicious. The étouffée is patient and rich. The catfish is the benchmark for what catfish can be when someone cooks it right. $$–$$$. *1615 Rebsamen Park Rd, Little Rock, AR.*

## Where to Hear the Music

**Dreamland Ballroom** — The crown jewel of Little Rock's musical history and one of the sacred sites of the entire Big Muddy network. This second-floor ballroom on West Ninth Street was a premier stop on the Chitlin' Circuit — Ella Fitzgerald, Duke Ellington, Louis Armstrong, and B.B. King all played here to audiences who had come to feel alive. The ballroom is now a National Historic Landmark and cultural heritage site, and when they hold events here, you are standing on the same floor where those musicians stood. Not near it. On it. *800 W 9th St, Little Rock, AR.*

**White Water Tavern** — The dive bar that Arkansas music needed and still needs. On West Seventh Street, the White Water has been hosting the gritty, genre-fluid edge of Little Rock's music scene for years — alt-country, punk, indie rock, blues-adjacent sounds that defy easy categorization but share a commitment to doing things their own way without a safety net. If the Dreamland represents where the music came from, the White Water represents where it went. *2500 W 7th St, Little Rock, AR.*

**Stickyz Rock 'n' Roll Chicken Shack** — A River Market venue that does two things well and doesn't pretend otherwise: live rock and punk music and fried chicken that fortifies you for both. The national and regional acts that come through run the spectrum of guitar-driven American music, and the room has the comfortable, slightly chaotic energy of a place where the music always gets the last word. *107 River Market Ave, Little Rock, AR.*

Little Rock demands something from you. It's a city that has stared at hard things and not looked away, and spending time here requires a similar willingness to be present for what it shows you. The Dreamland Ballroom alone is worth the detour off the main corridor. Leave on Interstate 40 heading west toward the Ozarks, or south toward the Delta — but leave knowing you've been somewhere that counts.`,
  },
  {
    id: 16,
    title: 'Fayetteville: The Ozark Hills and the Oldest Bar in Arkansas',
    slug: 'fayetteville-the-ozark-hills-and-the-oldest-bar-in-arkansas',
    category: 'city-guide',
    city: 'fayetteville',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Fayetteville is the kind of college town that sneaks up on you. You come expecting stadium banners and leave having drunk too many Arkansas craft beers in a bar that\'s been open since 1927. George\'s Majestic Lounge is a sacred site on the expanded Big Muddy map.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/mississippi-river.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-03-03').toISOString(),
    createdAt: new Date('2026-03-03').toISOString(),
    updatedAt: new Date('2026-03-03').toISOString(),
    body: `# Fayetteville: The Ozark Hills and the Oldest Bar in Arkansas

Fayetteville is the kind of college town that sneaks up on you. You come expecting stadium banners and pizza chains and leave having drunk too many Arkansas craft beers in a bar that's been open since 1927, in a city where the Civil War dead still lie in a cemetery a few blocks from the campus gates. The University of Arkansas gives Fayetteville its energy, but the Ozark hills give it its soul — that slightly vertiginous feeling of a landscape that keeps its own counsel, where the hollows run deep and the music coming out of them sounds ancient even when it's new.

This is one of the Big Muddy's northernmost stops, the place where the region connecting the Delta to the hill country arrives at the base of the Ozarks proper. Louis Jordan — the Arkansas-born proto-rock and roller, one of the most important musicians America ever produced — lived in these rhythms. Sonny Boy Williamson came from the same soil. And in the 1950s and early 1960s, at a club called the Rockwood, Jerry Lee Lewis and Roy Orbison and a young band that would eventually become The Band played to Fayetteville crowds who barely knew they were witnessing the future of American music.

The city has Civil War echoes, creative tumult, and the particular electricity of a place with sixty thousand students and one hundred years of juke-joint tradition. That combination produces something.

## Where to Stay

**Inn at Carnall Hall** — A 1905 residence hall for the University of Arkansas's first women students, now a boutique hotel on the edge of campus that carries its history with grace and offers it to guests without apology. The rooms are handsomely finished. The location, walking distance to Dickson Street and the Fayetteville square, is exactly where you want to be. $148–$349. *465 N Arkansas Ave, Fayetteville, AR.*

**Pratt Place Inn** — On a wooded estate outside the city, this luxury B&B operates in the register of the English country house — multiple rooms and cottages, manicured grounds, the kind of deep quiet that the forest provides when there's enough of it. For the traveler who wants Fayetteville's cultural richness and the opposite of Dickson Street's noise. $234–$676. *2231 W Markham Rd, Fayetteville, AR.*

**Stay-Inn-Style B&B** — A historic bungalow on Rock Street furnished with antiques and the kind of considered comfort that comes from an owner who thought hard about what a guest actually needs. Affordable by Fayetteville standards, genuine by any standard, and within walking distance of the music and the food. $95–$115. *117 W Rock St, Fayetteville, AR.*

## Where to Eat

**Hugo's** — A Block Avenue institution that occupies the sweet spot between bar and restaurant without committing fully to either, which turns out to be exactly the right call. The American classics are executed with a kitchen's worth of care — the burgers are serious, the atmosphere is lived-in, and the low-lit room on a weeknight has the comfortable energy of a place where the regulars actually like being there. $$–$$$. *25 1/2 N Block Ave, Fayetteville, AR.*

**Hammontree's Grilled Cheese** — The proposition sounds simple. What arrives is not simple. Hammontree's has turned the most humble of American sandwiches into a vehicle for genuine creativity — combinations that shouldn't work and do, a rotating menu that rewards repeat visits, and a commitment to quality that makes every grilled cheese feel like a considered act of cooking rather than an afterthought. $$–$$$. *326 N West Ave, Fayetteville, AR.*

**Penguin Ed's BBQ** — South Arkansas BBQ traditions interpreted in the Ozark foothills, which means the smoke is real and the competition is the forty years of Arkansas pitmasters who came before. The pulled pork is the benchmark. The ribs are the argument. The sides — baked beans, slaw, corn on the cob — are the kind that BBQ joints produce when they're paying attention. $$–$$$. *230 S East Ave, Fayetteville, AR.*

## Where to Hear the Music

**George's Majestic Lounge** — Arkansas's oldest standing music venue, open since 1927 on West Dickson Street, and the kind of place that earns its legend by continuing to deserve it. The stage is small enough that no seat is bad. The booking has always leaned toward the interesting rather than the safe — all genres, but with a consistent preference for musicians who mean it. Jerry Lee Lewis played here. Whoever's playing tonight is working in that tradition. A sacred site on the expanded Big Muddy map. *519 W Dickson St, Fayetteville, AR.*

**Tin Roof** — The eclectic counterpart to George's — daily live music ranging from regional bands to DJ nights, an outdoor component that Fayetteville's climate occasionally cooperates with, and the inclusive energy of a room that doesn't have a type. Whatever's happening tonight, the Tin Roof is going to find a way to make it feel inevitable. *430 W Dickson St, Fayetteville, AR.*

**Kingfish** — The dive bar as it was meant to be: local bands, outdoor patio, the kind of beer-and-wood smell that comes from years of both, and a crowd that walked from the neighborhood rather than Ubered from a hotel. Fayetteville has a genuine music scene that lives below the tourist-facing venues, and Kingfish is where that scene holds its own on a Thursday night. *262 N School Ave, Fayetteville, AR.*

Fayetteville is where the Big Muddy climbs into the hills and changes register — not quieter, exactly, but more internally complex, the way hill country music has always been more layered than people from the flatlands expect. You carry George's and the Ozark light with you when you leave. Head northwest toward Bentonville, or turn back south toward Little Rock and the Delta. The hills will follow you either way.`,
  },
  {
    id: 17,
    title: 'Bentonville: Crystal, Trails, and the Ozark Whisper Beneath the Wealth',
    slug: 'bentonville-crystal-trails-and-the-ozark-whisper-beneath-the-wealth',
    category: 'city-guide',
    city: 'bentonville',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'There\'s a joke in Arkansas that Bentonville is what happens when you give a small Ozark town more money than God. The Walton family dropped a world-class contemporary art museum into the middle of a town that was selling fishing tackle a generation ago.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/command/beale-street.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-03-03').toISOString(),
    createdAt: new Date('2026-03-03').toISOString(),
    updatedAt: new Date('2026-03-03').toISOString(),
    body: `# Bentonville: Crystal, Trails, and the Ozark Whisper Beneath the Wealth

There's a joke in Arkansas that Bentonville is what happens when you give a small Ozark town more money than God. It's not entirely wrong. The Walton family's philanthropy has dropped a world-class contemporary art museum into the middle of a town that was selling fishing tackle and seed corn a generation ago, and the result is one of the more surreal experiences available on the American road — an art complex worth a billion dollars sitting in a hollow surrounded by mountain bike trails and cattle pasture, with the Ozarks rising behind it in all directions.

But underneath the Crystal Bridges gleam, underneath the polished downtown square and the gallery restaurants and the bike culture, Bentonville is still an Ozark town. The hollows run deep here. The old hymns still sound in the churches on Sunday mornings. And the music coming out of the mountain communities around it — roots, folk, bluegrass, the hard-country sounds that predate Nashville's industry by two hundred years — persists in the way that things persist in the Ozarks: quietly, stubbornly, in rooms that don't announce themselves.

The Big Muddy's expanded territory reaches to Bentonville not because it looks like the rest of the network, but because the musical traditions it connects — Ozark mountain music, Arkansas blues, the folk sounds of the hill country — are part of the same conversation that runs from the Delta to Missouri. Bentonville is where that conversation gets complicated in the best possible way.

## Where to Stay

**The Victoria Bed & Breakfast** — A Victorian-era inn that shares a fence line with Crystal Bridges Museum, which makes it either the most fortuitously located B&B in Arkansas or a metaphor for the town itself — old architecture pressed up against world-class contemporary vision, both somehow making sense together. The rooms are handsomely done, the grounds are beautiful, and waking up steps from a Frank Lloyd Wright and a Winslow Homer is not a thing most mornings can claim. $200–$400. *306 N Main St, Bentonville, AR.*

**21c Museum Hotel Bentonville** — The art doesn't stop when you check in. 21c operates as both boutique hotel and contemporary art gallery, which means the lobby, the hallways, and the rooms themselves are all part of an ongoing exhibition. The beds are excellent. The conversation pieces are everywhere. For travelers who came to Bentonville for the culture, there is no more complete way to live inside it. $$$. *200 NE A St, Bentonville, AR.*

**The Bike Inn** — Bentonville has become one of the premier mountain biking destinations in the country, and the Bike Inn exists to serve the culture that created. Bike-centric cabins and motel rooms on Walton Boulevard — a place to stay that's honest about what Bentonville has become and doesn't apologize for it. The trails start practically outside your door. $$. *3400 S Walton Blvd, Bentonville, AR.*

## Where to Eat

**Tusk & Trotter** — An Ozark pub that leans into its pork traditions with the pride of a region that has been raising hogs in these hills since before the Civil War. The menu is built around what the Ozarks actually produce — pork in its many forms, alongside regional specialties that feel indigenous rather than imported. It's the kind of place that proves you don't need a New York résumé to cook well; you need to know your ingredients. $$–$$$. *110 SE A St, Bentonville, AR.*

**Crepes Paulette** — A French crêperie on the Bentonville square, and the fact that this exists — and works — in a small Arkansas city says everything about what the Walton investment has done to the local dining culture. The sweet crêpes are excellent. The savory ones are the move. And the cognitive dissonance of eating a Breton galette in the Ozarks fades by the third bite. $–$$. *100 SW 8th St, Bentonville, AR.*

**Table Mesa Bistro** — Modern Latin and Mexican fusion on East Central Avenue, the kind of creative cooking that arrives when a talented chef has access to local Ozark ingredients and the freedom to use them imaginatively. The menu changes, the technique is solid, and the result feels like something particular to Bentonville's new identity — globally minded, locally rooted, constantly becoming. $$–$$$. *110 E Central Ave, Bentonville, AR.*

## Where to Hear the Music

**The Momentary** — Crystal Bridges' satellite space devoted to contemporary performing arts, and one of the most architecturally interesting music venues on the expanded Big Muddy network. The former factory building hosts indie, bluegrass, roots music, and hip-hop in both indoor and outdoor configurations, and the programming reaches beyond the obvious toward the adventurous. This is where Bentonville's relationship with contemporary music gets serious. *507 SE E St, Bentonville, AR.*

**Meteor Guitar Gallery** — An intimate venue inside a historic downtown theater where small-batch live music happens in the way it's supposed to — close enough to hear the guitar strings individually, small enough that the performer can see your face. The gallery functions as both instrument shop and concert space, and the combination produces an atmosphere that serious music lovers recognize as rare and worth protecting. *128 W Central Ave, Bentonville, AR.*

**Haxton Road Studios** — A recording studio that opens its doors to live showcases, giving audiences the experience of hearing music in a room designed for the critical listening of professionals. The sonic intimacy is unlike what any stage-and-PA setup can provide. Downtown Bentonville. *Downtown Bentonville, AR.*

Bentonville is the Big Muddy's most unexpected stop — a city that shouldn't cohere and does, where Ozark mountain traditions and world-class contemporary art share the same square mile without either destroying the other. You leave on Highway 72 toward Missouri, or you double back south through the Ozarks toward Fayetteville and Little Rock. Either way, Crystal Bridges will be with you in your rearview longer than you'd expect a glass building surrounded by trees to be.`,
  },
  {
    id: 18,
    title: 'Branson: Sequins, Fog, and the Old Religion of the Ozarks',
    slug: 'branson-sequins-fog-and-the-old-religion-of-the-ozarks',
    category: 'city-guide',
    city: 'branson',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'The fog comes down off the Ozark hills on autumn mornings while Highway 76 blinks to life with marquee lights advertising seventeen country shows. Branson is the city that confounds people who haven\'t been there and confirms everything they expected once they have.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/juke-joint-interior.webp',
    readTime: '5 min read',
    publishedAt: new Date('2026-03-04').toISOString(),
    createdAt: new Date('2026-03-04').toISOString(),
    updatedAt: new Date('2026-03-04').toISOString(),
    body: `# Branson: Sequins, Fog, and the Old Religion of the Ozarks

Branson is the city that confounds people who haven't been there and confirms everything they expected once they have — which makes it one of the more honest places in America. The fog comes down off the Ozark hills on autumn mornings and sits in the hollows while Highway 76 blinks to life with marquee lights advertising seventeen different country shows happening simultaneously, and the whole effect is genuinely Gothic in a way that no amount of sequins can neutralize. This is mountain music country, Baldknobber country, a place where the vigilante ghosts of the 1880s and the ghost of Roy Clark are equally at home.

The story starts in the hills, not on the Strip. The Baldknobbers — the night-rider vigilantes who terrorized the Ozarks in the 1880s, the ones Harold Bell Wright wrote about in *The Shepherd of the Hills* — gave Branson its original drama. The music that grew out of this culture was gospel-tinged country, shaped by the hymns and the hollows, by people who believed that God and hard times were equally present in the Missouri hills. When the Baldknobbers Jamboree launched in 1959, blending that old-time religion with comedy and country swing, they were bottling something that had been fermenting for a century. By 1991, Branson had more theater seats than Broadway and had earned the right to call itself exactly what it was.

Branson is the northern terminus of the Big Muddy's expanded arc — the place where the Ozark mountain traditions connect back down through Arkansas to the Delta and the river. It's further from the Mississippi than the rest of the network, but closer in spirit than the geography suggests. The old songs carry the same freight.

## Where to Stay

**Carriage House Inn** — A Victorian-style inn on the 76 Country Boulevard region that manages to feel like a genuine lodging rather than a theme park accessory. The rooms are comfortable in the way of a place that has been doing this a long time and learned from the doing — nothing flashy, everything that matters. The Strip location means you're close to every show, which is either a virtue or a hazard depending on your constitution. $$–$$$. *4006 W 76 Country Blvd, Branson, MO.*

**Lodge of the Ozarks** — The cabin-feel hotel on the Strip that most successfully bridges the gap between mountain heritage and road comfort. Wood tones, stone accents, the aesthetic of the hills made accessible to people who drove here from St. Louis. There's genuine warmth in the Lodge's approach to hospitality — it feels like the Ozarks decided to make you feel at home rather than the other way around. $$–$$$. *3431 W 76 Country Blvd, Branson, MO.*

**Bradford House Bed and Breakfast** — Downtown Branson, away from the Strip, where the original town exists with its 1900s buildings and the cemetery of founder Reuben Branson still present and accounted for. The Bradford House is an elegant Victorian B&B in this quieter Branson — the one that was here before the theaters, the one that will be here after the last marquee goes dark. This is where you stay when you want to understand where all of it came from. $$–$$$. *401 N Zinc Ave, Branson, MO.*

## Where to Eat

**Billy Gail's** — The breakfast religion of the Ozarks, practiced on South Wildwood Drive in a dining room that takes pancakes as seriously as any theological proposition. The portions are the first thing you notice — these are not polite portions — and the second thing you notice is that everything tastes like someone got up before dawn to make it. For Ozark country, a two-hour wait is not a hardship. It's a feature. $$–$$$. *202 S Wildwood Dr, Branson, MO.*

**Danna's BBQ & Burger Shop** — On Historic Highway 165, which in Branson means a road that predates the Strip and remembers the earlier Ozarks. The brisket is chopped and served with the unstudied confidence of a kitchen that doesn't need to compete with anyone because it already knows what it is. The burgers are the other argument. Come hungry. $$–$$$. *963 Historic Hwy 165, Branson, MO.*

**Pickin' Porch Grill** — Inside the Branson Craft Mall, which describes the location without capturing the experience. The Pickin' Porch is the kind of straightforward Ozark eating — burgers, BBQ, comfort food done without irony — that sustains a city built on long days of show-going and hill-country air. The name is also a description: there is, in fact, a porch, and it is the right place to eat if the weather cooperates. $$–$$$. *Inside Branson Craft Mall, Branson, MO.*

## Where to Hear the Music

**Grand Country Music Hall** — The traditional country variety show as it has been practiced in Branson since the first theater opened on Highway 76 — gospel, comedy, patriotic numbers, and the kind of country music that precedes Nashville's pop ambitions and has no interest in them. The Grand Country is the old religion, sequined and amplified, sincere in a way that the cynical miss entirely. The sincerity is the point. *4210 W 76 Country Blvd, Branson, MO.*

**Presley's Country Jubilee Theater** — The first theater built on the Highway 76 strip, opened by the Presley family in 1967, and the one that established the blueprint everyone else followed. Three generations of Presleys have performed here, and the show carries that family history in every number — this is not a tribute act or a recreation, it's the original, still running, still true to the tradition it helped define. The oldest continuously operating show on the Strip is also its conscience. *2920 W 76 Country Blvd, Branson, MO.*

**Clay Cooper Theatre** — The high-energy counterpart to the more traditional shows — a revue format with the full force of contemporary production values behind it and a cast that moves like they mean it. Cooper's show is Branson taking pride in what it does rather than apologizing for it, and the room responds accordingly. *3216 W 76 Country Blvd, Branson, MO.*

Branson is the end of the line and the beginning of the line, depending on which direction you came from. The Big Muddy's extended arc reaches its northern extreme in these fog-wrapped Missouri hills, where the Ozark music tradition is old enough to have forgotten it was ever called folk and country enough to have forgotten it was ever called gospel. Head south through Arkansas, back toward the Delta and the river, and carry Branson's unabashed sincerity with you — a reminder that some places have been playing the same songs for a hundred years because the songs are worth playing.`,
  },
  {
    id: 19,
    title: 'The Anthologist: Where Vinyl Meets Violets on Main Street Natchez',
    slug: 'the-anthologist-where-vinyl-meets-violets-on-main-street-natchez',
    category: 'feature',
    city: 'natchez',
    author: 'Chase Pierson',
    status: 'published',
    excerpt:
      'A record store inside a flower shop inside a performance venue. The Anthologist is what happens when someone decides that the things that make a small town worth living in should all exist under one roof.',
    heroImage: '/images/records/anthologist-vinyl-bins.webp',
    readTime: '8 min read',
    publishedAt: new Date('2026-03-19').toISOString(),
    createdAt: new Date('2026-03-19').toISOString(),
    updatedAt: new Date('2026-03-19').toISOString(),
    body: `# The Anthologist: Where Vinyl Meets Violets on Main Street Natchez

A record store inside a flower shop inside a performance venue. The Anthologist is what happens when someone decides that the things that make a small town worth living in should all exist under one roof — and then actually does it.

Main Street, Natchez. The brick storefronts here have been standing since before the Civil War, and half of them have been empty since the last cotton broker closed up. The ones that aren't empty tend toward antique shops and gift stores selling porcelain figurines of plantation homes. Nothing wrong with that. But it's not exactly the future.

The Anthologist is the future. Or at least a version of the future that respects the past enough to carry it forward.

## The Space

You walk in and the first thing you notice is the smell — not old vinyl and dust, which is what you expect from a record store, but fresh-cut stems and greenery. There's a flower cooler along one wall, the kind with glass doors and LED strips, holding roses and snapdragons and whatever's in season from local growers. The flowers aren't an afterthought or a side hustle. They're half the business.

Then your eye adjusts and you see the bins. Wooden crates, hand-built, stained warm, running along the opposite wall and down a center aisle. The vinyl collection is curated — not the biggest selection in Mississippi, but one of the most intentional. You'll find Delta blues next to 90s hip-hop next to Patsy Cline next to Coltrane. The dividers are hand-lettered. The prices are fair. VG/VG+ for fifteen dollars. Promo copies marked clearly.

In the back, past the bins and the bouquets, there's a vintage Realistic turntable on a wooden counter — the kind with the faux-wood panel and the brushed-metal badge that says "Realistic" like it's making a philosophical statement. It's not for sale. It's for listening. There's a small PA system. A couple of mic stands. Room for maybe thirty people if they don't mind standing close.

This is a performance venue.

## Three Businesses, One Room

The Anthologist operates on a principle that most business consultants would call insane and most small-town operators would call obvious: if you need three things to survive, build three things.

**The flower shop** serves Natchez's wedding industry, its funeral homes, its "I forgot our anniversary" emergency market, and its growing population of people who just want something alive and beautiful on their kitchen table. Cut arrangements, potted plants, seasonal wreaths. The margins on flowers are good if you know what you're doing. They know what they're doing.

**The record store** serves a different customer — or sometimes the same customer on a different day. Vinyl collectors driving the Natchez Trace. Tourists who wandered off the main drag and found something real. Locals who've been buying records here since the bins went in and now treat it like a weekly ritual: flip through what's new, pull something they forgot they loved, drop fifteen dollars. Repeat.

**The performance space** is where it gets interesting. The Anthologist hosts live music — acoustic sets, small bands, solo artists who can work a room without a full PA. The space is intimate by necessity and perfect by accident. Low ceilings. Warm light. The sound bounces off the brick walls in a way that no amount of acoustic engineering could replicate. You feel the music in the room the way you feel it in a church — not amplified at you, but present with you.

## Why It Matters

There are approximately 16,000 people in Natchez, Mississippi. The median household income is around $35,000. This is not Austin. This is not Nashville. This is not a place where a record store opens because the demographics say it should work. This is a place where a record store opens because somebody decided it mattered.

That distinction — between things that pencil out on a spreadsheet and things that matter — is the entire story of small-town America right now. The spreadsheet says Natchez should have a Dollar General and a Subway and maybe a decent Mexican restaurant if it's lucky. The Anthologist says Natchez should have a place where you can buy a first pressing of Muddy Waters and a dozen roses in the same transaction, and then stick around for a live set on Friday.

The spreadsheet is not wrong. But it's not interesting either.

## The Recording Setup

Here's where the Anthologist intersects with what we're building at Big Muddy Records.

The space has a recording rig. Not a studio — nobody's pretending this is Muscle Shoals. But a clean signal chain, a decent set of microphones, and a room that sounds good without trying. When an artist plays the Anthologist, we can capture it. The live cut goes to Big Muddy Radio. The session footage goes to the Magazine. The best performances become releases.

This is what we mean when we talk about the ecosystem. A flower shop on Main Street in a town of 16,000 becomes a node in a network that connects recording, radio, publishing, and touring. The artist who plays the Anthologist on Friday night gets a feature in Big Muddy Magazine by Tuesday. Their live cut is on Big Muddy Radio by the following week. Their merch is on Venture Gallery by month's end.

The infrastructure is the thing. And the Anthologist is a piece of infrastructure that smells like roses.

## The Venue Network

The Anthologist joins two other recording venues in the Big Muddy Records network in Natchez:

**The Blues Room** at the Big Muddy Inn is the anchor — a listening room inside the Inn with capacity for about 40 people, a corner stage with good light, and an open mic every Friday night that we record stem to stem. The Blues Room is the flagship. It's where the label was born.

**Bobby J's** is the juke joint — louder, looser, later. The kind of place where the music starts at 10 and nobody's checking the clock. Bobby J's gives us the raw end of the spectrum, the performances that happen when the audience is three whiskeys in and the band is feeding off the energy.

**The Anthologist** fills the space between — more intimate than the Blues Room, more curated than Bobby J's. The acoustic acts. The singer-songwriters who need a quiet room. The artists whose music requires you to actually listen, which requires the audience to actually shut up, which requires a room that encourages it.

Three venues. Three vibes. One label recording all of it.

## What You'll Find in the Bins

If you're driving the region and you stop at the Anthologist — and you should — here's what to look for:

The blues section is strong. Mississippi artists, Delta recordings, Chicago blues that started in Mississippi and migrated north with the Great Migration. Fat Possum releases. Hill Country stuff. If it came from this soil, they probably have it.

The soul section leans toward the deep cuts — not just Otis and Aretha (though they have those), but the Muscle Shoals session players, the Stax B-sides, the Hi Records catalog that most people outside of Memphis have never heard.

The country section is real country. Not the truck-and-beer-and-tan-legs formula that Nashville pushes. Hank Williams. Loretta Lynn. Townes Van Zandt. The outlaw stuff. The mountain stuff. The songs that sound better on vinyl because they were recorded on vinyl.

And then there's the oddball section — the records that don't fit any category and are better for it. Local artists. Private pressings. The one-of-a-kind finds that make crate-digging worth the drive.

## Hours and Details

The Anthologist is on Main Street in downtown Natchez, Mississippi. Walk south from the bluffs and you'll find it.

The flower shop keeps regular retail hours. The record bins are open whenever the flowers are. The performance schedule runs Friday and Saturday nights, with occasional weeknight shows when someone interesting is passing through.

No cover for most shows. Tips go directly to the artist.

If you're planning a trip across the Deep South — Memphis to New Orleans, or the reverse — put Natchez on the itinerary and put the Anthologist on the list. Buy flowers for the person you're traveling with. Buy a record for yourself. Stay for the music.

And if you're a musician looking for a place to play — a real place, not a festival stage or a bar that treats live music as background noise — reach out. The Anthologist books artists who take the room seriously. The room will take you seriously back.

*The Anthologist is a featured venue in the Big Muddy Records network and a Deep South Directory member. For booking inquiries, contact music@bigmuddyrecordlabel.com.*`,
  },
  {
    id: 20,
    title: 'Save the Hall Ball: The Pilgrimage Garden Club\'s Fight for Stanton Hall',
    slug: 'save-the-hall-ball-pilgrimage-garden-clubs-fight-for-stanton-hall',
    category: 'feature',
    city: 'natchez',
    author: 'Chase Pierson',
    status: 'published',
    excerpt:
      'The Pilgrimage Garden Club is throwing a fundraiser at Stanton Hall — the antebellum mansion they\'ve maintained since 1938. The building needs work. The party will be worth the drive.',
    heroImage: null,
    readTime: '7 min read',
    publishedAt: new Date('2026-03-22').toISOString(),
    createdAt: new Date('2026-03-19').toISOString(),
    updatedAt: new Date('2026-03-19').toISOString(),
    body: `# Save the Hall Ball: The Pilgrimage Garden Club's Fight for Stanton Hall

The Pilgrimage Garden Club has been maintaining Stanton Hall since 1938. That's 88 years of keeping an antebellum mansion standing through Mississippi summers, Hurricane Katrina, economic downturns, and the slow erosion that happens when a building built in 1857 has to survive in a world that doesn't build things to last anymore.

Now they need help. And they're throwing a party to get it.

## The Hall

Stanton Hall sits on a full city block at the corner of High and Pearl Streets in downtown Natchez. Frederick Stanton built it in 1857 with cotton money — the kind of fortune that could commission Corinthian columns shipped from Europe and a cast-iron fence forged in Philadelphia. The house cost $83,000 to build. In 1857 dollars, that's roughly "I own a small country" money.

The scale of Stanton Hall is the first thing that hits you. The front gallery is 70 feet wide. The parlors have 16-foot ceilings. The chandeliers are the originals — gas-to-electric conversions that still throw light the way they did when the house was the social center of one of the wealthiest communities in pre-war America.

Natchez had more millionaires per capita than any city in the country before the Civil War. The cotton economy built mansions that survive because they were built by people who assumed their grandchildren's grandchildren would still be using them. In the case of Stanton Hall, they were right — though the grandchildren turned out to be a garden club, which is probably better than what Frederick Stanton had in mind.

## The Garden Club

The Pilgrimage Garden Club was founded in 1932 by a group of Natchez women who understood something that took the rest of the country another 30 years to figure out: if you don't preserve historic buildings, they disappear. Period. Nobody else is going to do it. Not the state. Not the federal government. Not the market.

The Club purchased Stanton Hall in 1938 and has operated it as a historic house museum and event venue ever since. They run the Natchez Spring Pilgrimage — the annual tour of antebellum homes that has been bringing tourists to Natchez since 1932 and remains one of the longest-running heritage tourism events in the American South.

The Pilgrimage Garden Club is not a passive custodian. They are an economic engine. The Spring Pilgrimage alone generates significant tourism revenue for a town of 16,000 people. The events hosted at Stanton Hall — weddings, receptions, corporate retreats, the kind of Southern social occasions that require a room with 16-foot ceilings and original chandeliers — pump money directly into the local economy.

But maintaining a 169-year-old mansion is not cheap. The roof. The foundation. The ironwork. The gardens. The mechanical systems that keep a pre-air-conditioning house habitable in a Mississippi summer. Every year, there's a list of things that need repair, and the list is always longer than the budget.

## The Ball

The Save the Hall Ball is the Pilgrimage Garden Club's answer to the gap between what Stanton Hall needs and what the annual operating budget can cover.

It's a fundraiser, yes. But it's also Natchez doing what Natchez does best — throwing a party in a room that was designed for exactly this purpose. Stanton Hall's parlors were built for gatherings. The proportions are right. The light is right. The acoustics, accidentally, are right. When you fill these rooms with music and people and the particular energy that happens when a community gathers to save something it loves, you understand why the building has survived 169 years.

Live music. Dancing. The kind of food that Natchez does when it's showing off — which is different from the kind of food Natchez does on a Tuesday, though both are better than what you'd get in most American cities. Formal attire encouraged but not required, because this is Natchez and the dress code has always been "make an effort."

## Why It Matters

Here's the thing about preservation in a small Southern town: it's not abstract. It's not a policy debate. It's a building that you drive past every day, that your grandmother had her wedding reception in, that your kids went on a field trip to in third grade. When Stanton Hall needs a new roof, the people who show up to pay for it are the people who live here. That's it. That's the whole preservation strategy.

The Pilgrimage Garden Club model is one of the most successful grassroots preservation frameworks in the country, and it works because it's local. The decisions are made by people who have to look at the building every morning. The money comes from events held inside the building. The labor comes from volunteers who care about the building not because they read about it in a magazine but because it's part of the landscape of their daily lives.

This is the kind of institution that Outsider Economics would call a "porch network" — a group of people who organize around a shared resource, maintain it through direct action, and fund it through community participation rather than external grants or government subsidy. The Pilgrimage Garden Club has been doing this since 1932. They didn't need a TED talk to figure it out.

## The Photography

Big Muddy Magazine will be on site for the Save the Hall Ball. Chase Pierson is shooting the event — the rooms, the crowd, the light falling through those 16-foot windows at the particular angle that happens in late March when the sun is low enough to be golden but high enough to fill the room.

Expect a full photo essay in Big Muddy Magazine after the event. The Anthologist will have prints. Big Muddy Radio will have coverage of any live music performances.

This is the ecosystem at work: a local fundraiser becomes a Magazine feature becomes a photo exhibit becomes a radio segment. The event doesn't end when the band stops playing. It amplifies.

## Details

**What:** Save the Hall Ball — fundraiser for Stanton Hall preservation
**Who:** The Pilgrimage Garden Club of Natchez
**Where:** Stanton Hall, corner of High and Pearl Streets, Natchez, MS 39120
**When:** Spring 2026 (check local listings for exact date)
**Dress:** Formal encouraged
**Photography:** Chase Pierson / Big Muddy Magazine

For ticket information, contact the Pilgrimage Garden Club directly or check their website. Stanton Hall is also open for regular tours during the Spring Pilgrimage season.

If you're driving the region and you're anywhere near Natchez in late March — come. Buy a ticket. Dance in a room that's been standing since 1857. Help keep it standing for another 169 years.

*Stanton Hall is a National Historic Landmark and a featured property in the Big Muddy Touring region guide. The Pilgrimage Garden Club is a Deep South Directory member.*`,
  },
  {
    id: 21,
    title: 'Regina\'s Biscuits: How the Biscuit Queen of Natchez Trained in Paris and Came Home',
    slug: 'reginas-biscuits-how-the-biscuit-queen-of-natchez-trained-in-paris-and-came-home',
    category: 'feature',
    city: 'natchez',
    author: 'Chase Pierson',
    status: 'published',
    excerpt:
      'Regina Charboneau trained at Le Cordon Bleu, cooked in San Francisco, and came back to Natchez to make biscuits. The Biscuit Queen sold the restaurant, but the legacy \u2014 and the cooking classes \u2014 live on.',
    heroImage: null,
    readTime: '9 min read',
    publishedAt: new Date('2026-03-19').toISOString(),
    createdAt: new Date('2026-03-19').toISOString(),
    updatedAt: new Date('2026-03-19').toISOString(),
    body: '# Regina\'s Biscuits: How the Biscuit Queen of Natchez Trained in Paris and Came Home\n\nRegina Charboneau trained at Le Cordon Bleu. She cooked in San Francisco restaurants where the prix fixe could cover a week of groceries in Natchez. She wrote cookbooks. She appeared on the Food Network. Andrew Zimmern has her number in his phone.\n\nAnd she came back to Natchez, Mississippi \u2014 population 16,000, median household income $35,000, a town where the nearest Whole Foods is a two-hour drive \u2014 to make biscuits.\n\nNot artisanal small-batch heritage-grain biscuits with a $14 price tag and a manifesto about flour provenance. Just biscuits. The kind your grandmother made if your grandmother knew what she was doing. Except Regina also knows what Escoffier was doing, and the difference between a good biscuit and a Regina biscuit is the difference between someone who learned to cook and someone who learned to cook and then went to Paris and then came home and remembered why the biscuit was the point all along.\n\n## The Story\n\nRegina built Biscuits & Blues at 315 Main Street in downtown Natchez into a destination. People flew to Mississippi to eat her biscuits and take her cooking classes. The building was old \u2014 like everything on Main Street, standing since before most American cities existed. The space was warm without trying. Counter. Tables. A cooking school in the back.\n\nShe\'s since sold the restaurant. The Biscuit Queen has moved on to new things, including a presence in San Francisco. But the impact she left on Natchez \u2014 and on the people who ate those biscuits \u2014 is permanent. What she proved is more important than any single restaurant: that a world-class culinary talent can thrive in a town of 16,000, that people will travel to eat food made with real skill in a real place, and that Natchez doesn\'t have to apologize for competing with cities a hundred times its size.\n\nThe cooking classes she ran are the template for what we\'re building at the Big Muddy Inn \u2014 workshops as economic engines, pulling visitors who spend across the entire local economy.\n\n## The Biscuit\n\nLet\'s talk about the biscuit.\n\nA Regina Charboneau biscuit is not tall. It\'s not a skyscraper biscuit, the kind that looks impressive in a food photograph but collapses under the weight of its own ambition. It\'s about two inches high. Golden on top. Pale on the sides where it was touching its neighbor in the pan. When you pull it apart \u2014 and you pull it apart, you don\'t cut it, cutting a biscuit is violence \u2014 the interior is layered. Not flaky in the croissant sense. Layered in the geological sense. Strata of butter and flour that separated during baking and created something that is simultaneously tender and structured.\n\nThe outside has a slight crunch. Not a crust \u2014 a crunch. The difference matters. A crust is hard. A crunch yields. It gives way to the soft interior with exactly the right amount of resistance, like opening a door that was built to swing properly.\n\nThe flavor is butter and flour and salt and buttermilk, in proportions that took decades to calibrate. There is no vanilla. There is no sugar. There is no secret ingredient that you can point to and say "that\'s the trick." The trick is that there is no trick. The trick is doing simple things correctly, every time, at 5 a.m., before the tourists wake up, before Main Street comes alive, before anyone is watching. The biscuit doesn\'t care if anyone is watching.\n\n## The Paris Connection\n\nHere\'s what Paris gave Regina that Natchez didn\'t: vocabulary.\n\nNot French vocabulary \u2014 culinary vocabulary. The language of technique. The understanding that cooking is not a set of recipes but a set of principles, and that once you understand the principles, you can cook anything. Butter lamination. Maillard reaction. The behavior of gluten at different hydration levels. The way fat inhibits gluten development, which is why a biscuit made with cold butter has layers and a biscuit made with melted butter doesn\'t.\n\nRegina learned these things in Paris and brought them back to a kitchen in Natchez, where she applied them to food that her grandmother would recognize. The technique is French. The food is Mississippi. The combination is the reason people flew here.\n\nThis is the pattern we see across the region \u2014 the tension between leaving and returning, between learning what the wider world has to teach and bringing it back to the place that formed you. The blues musicians who went to Chicago and came back different. The writers who went to New York and came back with new eyes for the landscape they\'d always known. Regina went to Paris and came back to make biscuits. It\'s the same story.\n\n## The Cooking School Legacy\n\nThe classes were the second business. Maybe the more important business, depending on how you measure importance.\n\nRegina taught biscuit-making classes in Natchez. Hands in the flour. Cold butter, cut into cubes, worked into the dry ingredients with your fingers until it looks like coarse meal with some pea-sized pieces remaining. Buttermilk added all at once. Folded \u2014 not kneaded, never kneaded \u2014 three times. Cut with a sharp biscuit cutter pressed straight down, never twisted, because twisting seals the edges and prevents the rise.\n\nPeople came from everywhere. Food writers. Home cooks. Professional chefs who wanted to understand Southern baking from someone who speaks both languages \u2014 the language of a Paris kitchen and the language of a Mississippi kitchen. The classes sold out. They always sold out.\n\nWhat made the cooking school work is what makes all good teaching work: Regina was not performing. She was standing in a kitchen with flour on her hands, talking about what she was doing while she did it, and the students learned because the gap between them and the teacher was close enough to cross.\n\nThis is the model we\'re inheriting at the Big Muddy Inn. Our workshop program \u2014 photography, music production, songwriting, hospitality \u2014 follows the same principle: bring the expert, build the class, let the student leave with something they didn\'t have before. Regina proved that Natchez is a place people will travel to for knowledge. That proof is worth more than any recipe.\n\n## The Andrew Zimmern Call\n\nThere\'s a story that gets told around Natchez \u2014 the kind that becomes legend because it\'s too good and too specific to be invented. Chase and Tracy and Amy are in Natchez, early days, figuring out what the Big Muddy Inn is going to be. Someone says: "You need to talk to Regina." They get her number. They call.\n\nRegina picks up the phone. She\'s on a boat. With Andrew Zimmern. She says, "I can\'t talk right now, I\'m with Andrew. Let me call you back."\n\nShe calls back.\n\nThat\'s the part that matters. Not that she was with Andrew Zimmern \u2014 that\'s just a fun detail. The part that matters is that she called back. In a town of 16,000 people, when someone says "let me call you back," they mean it. This is not Los Angeles, where "let me call you back" means "I will never call you back." This is Natchez. The callback is the handshake. The callback is how business gets done, how relationships start, how a biscuit queen and a couple of newcomers end up on the same team.\n\n## The Economics of a Biscuit\n\nHere\'s what a cooking class does for Natchez that a cooking class in Brooklyn could never do:\n\nWhen someone flies to Mississippi for a class, they don\'t just take the class. They stay somewhere \u2014 hopefully at the Big Muddy Inn, but even if not, they\'re sleeping in a Natchez bed. They eat dinner somewhere \u2014 The Camp, Cotton Alley, Fat Mama\'s. They walk Main Street and stop at the Anthologist for a record. They drive out to see Windsor Ruins. They buy something from the antique shops. They take photographs from the bluffs.\n\nA $150 cooking class generates $500 to $800 in total spending in a town that needs every dollar. Regina\'s biscuits were an economic engine disguised as breakfast.\n\nThis is the model that Outsider Economics describes as "anchor attraction economics" \u2014 a single draw strong enough to pull people to a place they wouldn\'t otherwise visit, and then the entire local economy benefits. The class is the anchor. Main Street is the beneficiary.\n\nIt\'s also why the Big Muddy ecosystem works the way it does. The Inn is an anchor. The Blues Room sessions are an anchor. The Magazine features are an anchor. And Regina\'s biscuits were an anchor. Each one pulls a slightly different audience, and each audience spends money across the whole network.\n\n## The Biscuit Queen\n\nRegina Charboneau has been called the Biscuit Queen of Natchez, and she wears the title the way Natchez wears its history \u2014 with pride, without apology, and with the understanding that the thing you\'re known for should be the thing you do best.\n\nShe could have stayed in San Francisco. She could have opened a bistro in New York. She could have become a celebrity chef in the modern sense \u2014 the kind with a product line and a ghostwriter and a social media team who hasn\'t actually cooked in their own restaurant in years.\n\nInstead, she came to Natchez. She made biscuits at 5 a.m. She taught classes in the afternoon. She picked up the phone when it rang, even when she was on a boat with Andrew Zimmern. She built something that proved a town of 16,000 could punch above its weight. Then she moved on, and the proof stayed behind.\n\nThe biscuit is the metaphor. Simple. Honest. Made with technique that took decades to develop but looks effortless. Made in a place that the food media mostly ignores, which means the people who find it feel like they\'ve discovered something \u2014 and they have. Made by someone who left and came back, which is the most Mississippi story there is.\n\nDrive the region. Stop in Natchez. Pull a biscuit apart with your hands. Taste the layers. That\'s the whole review.\n\n*Regina Charboneau is a Deep South Directory featured chef and a key figure in the Big Muddy Touring region story. More at reginacharboneau.com.*',
  },
  {
    id: 22,
    title: 'Studio C: Inside Utopia\'s Live Room',
    slug: 'studio-c-inside-utopias-live-room',
    category: 'feature',
    city: null,
    author: 'Bearsville Magazine',
    status: 'published',
    excerpt:
      'Todd Rundgren built Utopia Studios in the woods outside Woodstock in 1977. The live room still sounds the way he designed it — warm, wide, and honest. Studio C is where the next chapter gets recorded.',
    heroImage: '/images/studio-c/utopiademo-day-18.webp',
    readTime: '7 min read',
    publishedAt: new Date('2026-04-01').toISOString(),
    createdAt: new Date('2026-04-01').toISOString(),
    updatedAt: new Date('2026-04-01').toISOString(),
    body: `# Studio C: Inside Utopia's Live Room

Todd Rundgren built Utopia Studios in the woods outside Bearsville, New York in 1977. He wanted a compound — not a commercial studio squeezed into a Manhattan basement, but a place where a band could live and work and eat and walk into the woods when they needed to clear their head. The live room was designed to sound like the records he wanted to make: warm, wide, honest. The kind of room where you can hear the air between the instruments.

Nearly fifty years later, the room still sounds the way he designed it.

## The Room

Studio C sits inside the Utopia compound on a hillside in Bearsville, a hamlet so small it doesn't have its own zip code — mail goes through Woodstock. You drive past the old Bearsville Theater, past the restaurant site where Albert Grossman used to hold court, and up a gravel road into the trees. The studio doesn't announce itself. There's no neon sign, no marquee. Just a building in the woods that happens to contain one of the most important rooms in American recording history.

The live room is the centerpiece. High ceilings with exposed wood beams. Acoustic treatment that was designed by ear, not by software — panels placed where the reflections needed to be caught, left open where the natural decay of the room adds something you can't fake with a plugin. The floor is hardwood, which gives the low end a warmth that concrete kills. When a drummer hits a snare in this room, you hear the stick, then the drum, then the room answering back. That answer is what you're paying for.

![Studio C tracking room — acoustic panels and drum kit](/images/studio-c/utopiademo-day-17.webp)

## The Signal Chain

The control room is built around a console that has seen decades of records pass through its faders. Outboard gear lines the walls in racks — compressors, equalizers, preamps, each one chosen because it does one thing well. There's a philosophy here that's the opposite of the plugin era: every piece of gear in the signal chain is there for a reason, and that reason is that it sounds better than the digital version.

The monitoring setup is tuned to the room. Near-field speakers on the meter bridge for detail work, mains mounted in the wall for playback that shakes your chest. The sweet spot — that one chair position where the stereo image locks into focus — has been worn into the floor by fifty years of engineers leaning forward at the same angle.

![Control room monitoring — near-field speakers](/images/studio-c/utopiademo-day-12.webp)

## The Sessions

The Balk sessions were the first recordings we documented for Bearsville Magazine. Four musicians in the live room, tracking live to capture the room sound. No isolation booths. No click track. The band played and the room did what the room does — it made them sound like a band, not like four people who happened to be recording at the same time.

![Balk recording session — tracking day at Studio C](/images/processed/bearsville/balk-session-01.webp)

Matt Pond recorded at Studio C and sat in the same chair that Rundgren sat in. He worked the console with the kind of quiet focus that comes from knowing the room is doing half the work for you. The rough mixes from that session sounded finished. That's what a good room gives you — less to fix later.

![Matt Pond at the console, Studio C](/images/processed/bearsville-matt-pond-studio-02.webp)

## The Gear

A partial inventory, because the full list would read like a museum catalog:

Vintage compressors that add warmth without thinking about it. Ribbon microphones that capture the room the way your ears hear it — not hyped, not scooped, just honest. Preamps with transformers that saturate in a way that software has been trying to emulate for twenty years and still hasn't nailed. Patch bays that let you route any signal to any piece of gear in the building, because the best engineers don't follow a template — they build the signal chain for the song.

![Patch bay and signal routing at Studio C](/images/studio-c/utopiademo-day-13.webp)

The gear is not a museum exhibit. It's maintained, it's calibrated, and it gets used every week. The difference between a studio that has vintage gear and a studio that uses vintage gear is the difference between a guitar on a wall and a guitar with worn frets. The frets at Studio C are worn.

## The Hudson Valley Studio Map

Studio C doesn't exist in isolation. The Hudson Valley has one of the densest concentrations of recording studios in the Northeast, and they're all within an hour of each other:

**Dreamland Recording** in Hurley — a converted church with drum sounds that rival any room in Nashville. The ceiling height gives you natural reverb that would cost $50,000 to build from scratch.

**Levon Helm Studios** in Woodstock — The Barn. Where the Midnight Ramble sessions happened. History soaked into every plank of that floor. You don't record there because the gear is better than anywhere else. You record there because the room remembers.

These rooms are neighbors. Engineers who work at one room recommend the others. Session players float between them. A guitarist who tracks at Studio C might overdub at Dreamland and mix at Levon Helm. The studios aren't competing — they're a network, and the network is what makes the Hudson Valley a destination for recording, not just a place where studios happen to exist.

## What Bearsville Magazine Does With This

Chase Pierson photographs recording studios professionally. The console close-ups, the gear macro shots, the engineer portraits, the tracking room wide angles — this is the raw material that becomes the magazine. Every studio profile starts with a photo session. The photos become the article. The article becomes the radio interview. The interview becomes the directory listing. One visit to one room feeds the entire system.

This is what makes Bearsville different from Big Muddy. Big Muddy is the road — touring, cities, the region between Memphis and New Orleans. Bearsville is the room — where the sound gets made, documented, and sent out into the world.

The room is open. Bring your project north.

*Studio C at Utopia Studios is available for tracking, mixing, and mastering sessions. Contact hello@bearsvillemediagroup.com for rates and availability.*`,
  },
  {
    id: 22,
    title: 'Save the Hall Ball — A Night at Stanton Hall',
    slug: 'save-the-hall-ball-pilgrimage-garden-clubs-fight-for-stanton-hall',
    category: 'events',
    city: 'natchez',
    author: 'Chase Pierson',
    status: 'published',
    excerpt:
      'Stanton Hall has stood on High Street since 1857. On March 21, Natchez came together to make sure it keeps standing. A photo essay from the Save the Hall Ball.',
    heroImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-003.webp',
    readTime: '3 min read',
    publishedAt: new Date('2026-03-22').toISOString(),
    createdAt: new Date('2026-03-22').toISOString(),
    updatedAt: new Date('2026-03-22').toISOString(),
    body: `# Save the Hall Ball — A Night at Stanton Hall

Stanton Hall has stood on High Street since 1857. Built by Frederick Stanton, an Irish immigrant who made his fortune in cotton, the house is one of the grandest antebellum mansions in the American South. The Pilgrimage Garden Club has maintained it since 1938 as a National Historic Landmark, open to the public, a living piece of the corridor's story.

On March 21, 2026, Natchez came together to make sure it keeps standing.

---

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-010.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-020.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-030.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-040.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-050.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-060.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-070.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-080.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-090.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-100.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-110.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-120.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-130.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-140.webp)

![Save the Hall Ball](https://storage.googleapis.com/bmt-media-bigmuddy/events/save-the-hall-ball-2026/hero/save-the-hall-ball-150.webp)

---

*All photos by Chase Pierson. Stanton Hall, 401 High Street, Natchez, Mississippi. March 21, 2026.*

*The Pilgrimage Garden Club maintains Stanton Hall as a National Historic Landmark. Learn more at the [Deep South Directory](/directory).*`,
  },
  {
    id: 23,
    title: 'Test — Library Picker Works',
    slug: 'test-library-picker-works',
    category: 'photo-essay',
    city: 'other',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'Sanity workflow check: hero plus three in-body frames sourced from the Big Muddy Photo Library index (grid derivatives).',
    heroImage:
      'https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/liberty-ms/untitled-70-of-97-dxo_deepprime-3jpg/a39e08605489-grid.webp',
    readTime: '2 min read',
    publishedAt: new Date('2026-04-15').toISOString(),
    createdAt: new Date('2026-04-15').toISOString(),
    updatedAt: new Date('2026-04-15').toISOString(),
    body: `# Test — Library Picker Works

This article exists to prove the Big Muddy Photo Library picker lines up with magazine rendering: one hero frame and three inline frames, all using the grid-sized derivatives from the approved index.

If you can read this on the site, the library index, CDN URLs, and article body pipeline are aligned.

## Frames from the library

![Liberty, MS — library grid still](https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/liberty-ms/untitled-71-of-97-dxo_deepprime-3jpg/b201b53fac5b-grid.webp)

![Liberty, MS — library grid still](https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/liberty-ms/untitled-72-of-97-dxo_deepprime-3jpg/6175278a71bb-grid.webp)

![Liberty, MS — library grid still](https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/liberty-ms/untitled-74-of-97-dxo_deepprime-3jpg/5c40cd3613c2-grid.webp)

---

Editorial note: replace this test entry when the Story Engine Day 1 ship lands.`,
  },
];

// Helper: get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return CITY_GUIDE_ARTICLES.find((a) => a.slug === slug);
}

// Helper: get articles by city
export function getArticlesByCity(city: string): Article[] {
  return CITY_GUIDE_ARTICLES.filter((a) => a.city === city);
}

// Helper: get articles by region
export const DEEP_SOUTH_GUIDE_CITIES = ['memphis', 'clarksdale', 'vicksburg', 'natchez', 'new-orleans'];
/** @deprecated Use DEEP_SOUTH_GUIDE_CITIES */
export const CORRIDOR_CITIES = DEEP_SOUTH_GUIDE_CITIES;
export const LOUISIANA_CITIES = ['st-francisville', 'baton-rouge', 'lafayette', 'alexandria', 'monroe', 'ruston', 'natchitoches', 'shreveport'];
export const ARKANSAS_MISSOURI_CITIES = ['el-dorado', 'little-rock', 'fayetteville', 'bentonville', 'branson'];

export function getArticlesByRegion(region: 'region' | 'louisiana' | 'arkansas-missouri'): Article[] {
  const cityList = region === 'region'
    ? DEEP_SOUTH_GUIDE_CITIES
    : region === 'louisiana'
    ? LOUISIANA_CITIES
    : ARKANSAS_MISSOURI_CITIES;
  return CITY_GUIDE_ARTICLES.filter((a) => cityList.includes(a.city as string));
}
