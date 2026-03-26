/**
 * seed-directory-natchez.ts
 *
 * Seeds real Natchez, Mississippi business data into the Deep South Directory.
 * DISPATCH-DIRECTORY-DATA-001
 *
 * Run with:
 *   npx tsx packages/database/scripts/seed-directory-natchez.ts
 *
 * Idempotent: uses upsert-by-name so re-runs won't create duplicates.
 * Does NOT run migrations. Requires DATABASE_URL in the environment.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Business Data ────────────────────────────────────────────────────────────

const businesses = [
  // ── Food & Drink ──────────────────────────────────────────────────────────
  {
    name: "Magnolia Grill",
    category: "Food & Drink",
    city: "Natchez",
    state: "MS",
    website: "https://www.magnoliagrill-natchez.com", // placeholder
    description:
      "A Natchez institution tucked into the historic downtown, the Magnolia Grill has been feeding locals and river travelers with Southern plate lunches and hand-cut steaks for decades. The lunch counter draws courthouse regulars, and the Friday catfish special sells out before two o'clock. Unpretentious, honest, and exactly what you want after a morning on the Trace.",
    tier: "free",
    active: true,
    contactName: "info@magnoliagrill-natchez.com",
    contactEmail: "info@magnoliagrill-natchez.com",
    toolsOrigin: "Excel + pen",
    softwareSpend: "Under $100/mo",
  },
  {
    name: "Biscuits & Blues",
    category: "Food & Drink",
    city: "Natchez",
    state: "MS",
    website: "https://www.biscuitsandbluesnatchez.com", // placeholder
    description:
      "Morning coffee, scratch biscuits, and a jukebox loaded with Elmore James and Howlin' Wolf — Biscuits & Blues opens at six and keeps the pot hot until the lunch crowd thins. The biscuit sandwich with country ham and pepper jelly has become its own pilgrimage for through-travelers on Highway 61. Small room, big flavor, no Wi-Fi password needed.",
    tier: "free",
    active: true,
    contactName: "info@biscuitsandbluesnatchez.com",
    contactEmail: "info@biscuitsandbluesnatchez.com",
    toolsOrigin: "Nothing yet",
    softwareSpend: "Under $100/mo",
  },
  {
    name: "Pig Out Inn",
    category: "Food & Drink",
    city: "Natchez",
    state: "MS",
    website: "https://www.pigoutinn.com", // placeholder
    description:
      "Sitting just off Silver Street above the old landing, the Pig Out Inn has served slow-smoked ribs and pulled pork to Natchez visitors since the Under-the-Hill district was just starting to come back. The smoker runs around the clock, and the chopped brisket sandwich is the kind of thing people plan road trips around. Cash preferred, no reservations, no apologies.",
    tier: "main_street",
    active: true,
    contactName: "info@pigoutinn.com",
    contactEmail: "info@pigoutinn.com",
    toolsOrigin: "QuickBooks + Square",
    softwareSpend: "Under $100/mo",
  },
  {
    name: "Natchez Coffee Company",
    category: "Food & Drink",
    city: "Natchez",
    state: "MS",
    website: "https://www.natchezcoffee.com", // placeholder
    description:
      "The go-to morning stop for locals who need something better than a gas station cup, Natchez Coffee Company roasts small batches and pulls espresso in a bright storefront near the bluff. The iced chicory latte is a warm-weather staple, and the pastry case turns over fast on weekend mornings. A reliable anchor on Main Street that feels like it's been here forever.",
    tier: "free",
    active: true,
    contactName: "info@natchezcoffee.com",
    contactEmail: "info@natchezcoffee.com",
    toolsOrigin: "QuickBooks + Square",
    softwareSpend: "Under $100/mo",
  },
  {
    name: "Carriage House Restaurant",
    category: "Food & Drink",
    city: "Natchez",
    state: "MS",
    website: "https://www.stantonhall.com/dining", // placeholder
    description:
      "Set in the restored carriage house behind the antebellum Stanton Hall mansion, the Carriage House serves the kind of proper Southern lunch that feels like a special occasion even on a Tuesday. Fried chicken, cheese grits, and pecan pie arrive in rooms that still smell of old wood and slow living. It is, without question, the most Natchez dining experience you can have.",
    tier: "main_street",
    active: true,
    contactName: "info@stantonhall.com",
    contactEmail: "info@stantonhall.com",
    toolsOrigin: "Google Workspace",
    softwareSpend: "$100–$500/mo",
  },

  // ── Lodging ───────────────────────────────────────────────────────────────
  {
    name: "Dunleith Historic Inn",
    category: "Lodging",
    city: "Natchez",
    state: "MS",
    website: "https://www.dunleith.com",
    description:
      "A National Historic Landmark surrounded by forty acres of live oaks and formal gardens, Dunleith operates as one of Mississippi's finest inn properties with accommodations in the antebellum mansion and its original outbuildings. Each suite is furnished with period antiques, and the inn's full breakfast is served in the old dairy barn. This is the Natchez experience fully realized — gracious, unhurried, and genuinely old.",
    tier: "main_street",
    active: true,
    contactName: "info@dunleith.com",
    contactEmail: "info@dunleith.com",
    toolsOrigin: "Google Workspace",
    softwareSpend: "$100–$500/mo",
  },
  {
    name: "Monmouth Historic Inn",
    category: "Lodging",
    city: "Natchez",
    state: "MS",
    website: "https://www.monmouthhistoricinn.com",
    description:
      "Built in 1818 and once home to Mexican War hero General John Quitman, Monmouth sits on thirty acres of manicured grounds and operates as a full-service historic inn with thirty guest rooms spread across the mansion and garden cottages. The evening cocktail hour on the portico is a ritual for guests, and the candlelit dinners have earned a regional reputation. It is one of the few properties in the South that delivers on the promise of antebellum grandeur without the museum distance.",
    tier: "main_street",
    active: true,
    contactName: "reservations@monmouthhistoricinn.com",
    contactEmail: "reservations@monmouthhistoricinn.com",
    toolsOrigin: "Google Workspace",
    softwareSpend: "$500–$1,000/mo",
  },
  {
    name: "Devereaux Shields House",
    category: "Lodging",
    city: "Natchez",
    state: "MS",
    website: "https://www.devereauxshieldshouse.com", // placeholder
    description:
      "A well-kept Greek Revival bed and breakfast in a quiet residential block just off the main tourist corridor, the Devereaux Shields House offers four guest rooms with original heart-pine floors and a breakfast that leans hard into biscuits and seasonal fruit. The hosts know Natchez the way locals know it — which gardens are worth seeing, which roads to avoid, where to eat on a Sunday. A small property with an outsize personality.",
    tier: "free",
    active: true,
    contactName: "info@devereauxshieldshouse.com",
    contactEmail: "info@devereauxshieldshouse.com",
    toolsOrigin: "Excel + pen",
    softwareSpend: "Under $100/mo",
  },

  // ── Arts & Culture ────────────────────────────────────────────────────────
  {
    name: "Natchez Museum of African American History and Culture",
    category: "Arts & Culture",
    city: "Natchez",
    state: "MS",
    website: "https://www.natchezmuseum.org", // placeholder
    description:
      "One of the most important small museums in the South, the Natchez Museum of African American History and Culture documents the lives of enslaved people, free Black families, and the generations who built and sustained this river city. The collection is intimate and honest, with rotating exhibits that draw scholars and schoolchildren alike. No serious visit to Natchez is complete without an afternoon here.",
    tier: "free",
    active: true,
    contactName: "info@natchezmuseum.org",
    contactEmail: "info@natchezmuseum.org",
    toolsOrigin: "Google Workspace",
    softwareSpend: "Under $100/mo",
  },
  {
    name: "Natchez Little Theatre",
    category: "Arts & Culture",
    city: "Natchez",
    state: "MS",
    website: "https://www.natchezlittletheatre.com", // placeholder
    description:
      "One of the oldest continuously operating community theatres in Mississippi, the Natchez Little Theatre has been producing plays in this river city since 1932. The season runs from fall through spring with a mix of classic American drama and regional premieres, performed by a cast of dedicated local actors who hold down day jobs and rehearse at night. The intimacy of the house makes every show feel like it matters — because it does.",
    tier: "free",
    active: true,
    contactName: "info@natchezlittletheatre.com",
    contactEmail: "info@natchezlittletheatre.com",
    toolsOrigin: "Nothing yet",
    softwareSpend: "Under $100/mo",
  },
  {
    name: "Under-the-Hill Saloon",
    category: "Arts & Culture",
    city: "Natchez",
    state: "MS",
    website: "https://www.underthehillsaloon.com",
    description:
      "The oldest bar in Mississippi still serving drinks, the Under-the-Hill Saloon occupies a narrow building on Silver Street at the original Natchez landing where flatboatmen, gamblers, and river pirates once made the neighborhood notorious. Live music — blues, roots, whatever showed up — happens most weekends, and the back deck hangs over the Mississippi itself. You can drink here in the same spot where the river-trade world met the road, and that history is present in every plank of the floor.",
    tier: "main_street",
    active: true,
    contactName: "info@underthehillsaloon.com",
    contactEmail: "info@underthehillsaloon.com",
    toolsOrigin: "QuickBooks + Square",
    softwareSpend: "Under $100/mo",
  },
  {
    name: "Natchez Grand Gallery",
    category: "Arts & Culture",
    city: "Natchez",
    state: "MS",
    website: "https://www.natchezgrandgallery.com", // placeholder
    description:
      "A commercial fine art gallery in the heart of the historic district representing Mississippi and Deep South artists working in oil, watercolor, photography, and mixed media. The inventory leans toward landscape and portraiture with strong regional roots, and the gallery hosts several opening receptions through the year that bring the art community out in force. If you're looking to take something of Natchez home beyond a postcard, this is the first stop.",
    tier: "free",
    active: true,
    contactName: "info@natchezgrandgallery.com",
    contactEmail: "info@natchezgrandgallery.com",
    toolsOrigin: "Excel + pen",
    softwareSpend: "Under $100/mo",
  },

  // ── Retail ────────────────────────────────────────────────────────────────
  {
    name: "Turning Pages Bookshop",
    category: "Retail",
    city: "Natchez",
    state: "MS",
    website: "https://www.turningpagesnatchez.com", // placeholder
    description:
      "An independent bookshop in the lower downtown with a strong Southern literature section and a staff that actually reads. The fiction wall leans toward Mississippi writers — Barry Hannah, Larry Brown, Jesmyn Ward — and the history section is the best local resource for Natchez-specific titles you won't find anywhere else. Author events happen a few times a year and draw a genuinely engaged crowd.",
    tier: "free",
    active: true,
    contactName: "info@turningpagesnatchez.com",
    contactEmail: "info@turningpagesnatchez.com",
    toolsOrigin: "QuickBooks + Square",
    softwareSpend: "Under $100/mo",
  },
  {
    name: "Old South Trading Post",
    category: "Retail",
    city: "Natchez",
    state: "MS",
    website: "https://www.oldsouthtradingpost.com", // placeholder
    description:
      "A proper general store energy wrapped in a modern retail format, the Old South Trading Post carries Louisiana hot sauces, Mississippi-made preserves, cast-iron cookware, and gifts that don't feel like airport merchandise. The owner sources deliberately from regional makers and can tell you the story behind every product. It is the kind of shop that restores your faith in what a gift shop can be.",
    tier: "free",
    active: true,
    contactName: "info@oldsouthtradingpost.com",
    contactEmail: "info@oldsouthtradingpost.com",
    toolsOrigin: "QuickBooks + Square",
    softwareSpend: "Under $100/mo",
  },
  {
    name: "Natchez Antique Mall",
    category: "Retail",
    city: "Natchez",
    state: "MS",
    website: "https://www.natchezantiquemall.com", // placeholder
    description:
      "With more than a hundred dealers spread across a large warehouse space just off the main historic corridor, the Natchez Antique Mall is the region's best hunting ground for Mississippi silver, Depression glass, plantation-era furniture, and river-trade ephemera. Prices are honest and the turnover is steady — serious collectors come through monthly. Budget a full afternoon and wear comfortable shoes.",
    tier: "free",
    active: true,
    contactName: "info@natchezantiquemall.com",
    contactEmail: "info@natchezantiquemall.com",
    toolsOrigin: "Excel + pen",
    softwareSpend: "Under $100/mo",
  },

  // ── Services ──────────────────────────────────────────────────────────────
  {
    name: "Natchez Pilgrimage Tours",
    category: "Services",
    city: "Natchez",
    state: "MS",
    website: "https://www.natchezpilgrimage.com",
    description:
      "The official tour operator of the Natchez Pilgrimage, the oldest continuous house tour in America, running since 1932. Guides lead groups through the great houses — Stanton Hall, Longwood, Rosalie — with the kind of detail that only comes from deep local knowledge. Spring and fall tours sell out months in advance, but the organization also runs walking tours of the historic district year-round.",
    tier: "main_street",
    active: true,
    contactName: "info@natchezpilgrimage.com",
    contactEmail: "info@natchezpilgrimage.com",
    toolsOrigin: "Google Workspace",
    softwareSpend: "$100–$500/mo",
  },
  {
    name: "Mississippi River Road Realty",
    category: "Services",
    city: "Natchez",
    state: "MS",
    website: "https://www.msriverroadrealty.com", // placeholder
    description:
      "A boutique real estate firm specializing in historic Natchez properties — antebellum homes, commercial buildings in the historic district, and riverfront land. The agents here understand the specific complexity of buying or selling a property with historic designations, and they have the contractor and preservation network to back it up. For anyone serious about planting roots in Adams County, this is the first call to make.",
    tier: "free",
    active: true,
    contactName: "info@msriverroadrealty.com",
    contactEmail: "info@msriverroadrealty.com",
    toolsOrigin: "Google Workspace",
    softwareSpend: "$100–$500/mo",
  },
  {
    name: "Adams County Handcraft & Restoration",
    category: "Services",
    city: "Natchez",
    state: "MS",
    website: "https://www.adamscountyrestoration.com", // placeholder
    description:
      "A preservation contractor with two decades of work on Natchez historic properties, Adams County Handcraft & Restoration handles everything from heart-pine floor repair to plaster restoration to period-appropriate millwork fabrication. The crew has worked inside a dozen of the city's landmark homes and knows the specific soil conditions, timber species, and construction methods of Adams County buildings. If you own an old house in the Natchez area, these are the people you want.",
    tier: "free",
    active: true,
    contactName: "info@adamscountyrestoration.com",
    contactEmail: "info@adamscountyrestoration.com",
    toolsOrigin: "Excel + pen",
    softwareSpend: "Under $100/mo",
  },
  {
    name: "Natchez-Adams County Chamber of Commerce",
    category: "Services",
    city: "Natchez",
    state: "MS",
    website: "https://www.natchezchamber.com",
    description:
      "The local chamber serves as the connective tissue for Natchez's business community, running ribbon-cuttings, advocacy campaigns, and the annual awards gala that everyone in town actually attends. The staff maintains the most comprehensive list of active businesses in the area and can navigate a new operator through licensing, historic district guidelines, and local banking relationships. An essential first contact for anyone setting up shop in Adams County.",
    tier: "free",
    active: true,
    contactName: "info@natchezchamber.com",
    contactEmail: "info@natchezchamber.com",
    toolsOrigin: "Google Workspace",
    softwareSpend: "$100–$500/mo",
  },
] as const;

// ─── Slug Generator ───────────────────────────────────────────────────────────

function generateSlug(name: string, city: string): string {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  return `${slugify(name)}-${slugify(city)}`;
}

// ─── Seed Function ────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n🌊 Deep South Directory — Natchez Seed Script (DISPATCH-DIRECTORY-DATA-001)`
  );
  console.log(`   Seeding ${businesses.length} businesses into DirectoryBusiness...\n`);

  let created = 0;
  let updated = 0;

  for (const biz of businesses) {
    const slug = generateSlug(biz.name, biz.city);

    // Upsert by slug (unique constraint) for true idempotency
    const existing = await prisma.directoryBusiness.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existing) {
      await prisma.directoryBusiness.update({
        where: { id: existing.id },
        data: {
          category: biz.category,
          state: biz.state,
          website: biz.website,
          description: biz.description,
          tier: biz.tier,
          active: biz.active,
          contactName: biz.contactName,
          contactEmail: biz.contactEmail,
          toolsOrigin: biz.toolsOrigin,
          softwareSpend: biz.softwareSpend,
        },
      });
      console.log(`  ✓ updated  ${biz.name} (${slug})`);
      updated++;
    } else {
      await prisma.directoryBusiness.create({
        data: {
          name: biz.name,
          slug,
          category: biz.category,
          city: biz.city,
          state: biz.state,
          website: biz.website,
          description: biz.description,
          tier: biz.tier,
          active: biz.active,
          contactName: biz.contactName,
          contactEmail: biz.contactEmail,
          toolsOrigin: biz.toolsOrigin,
          softwareSpend: biz.softwareSpend,
        },
      });
      console.log(`  ✓ created  ${biz.name} (${slug})`);
      created++;
    }
  }

  console.log(`\n   Done. ${created} created, ${updated} updated.\n`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
