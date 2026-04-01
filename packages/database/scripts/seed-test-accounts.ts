/**
 * seed-test-accounts.ts
 *
 * Creates 5 internal test accounts for the DSD team to verify the full flow
 * before external sales. Each account is a real-ish Natchez business assigned
 * to a team member. All are set active=true so they render immediately.
 *
 * Run with:
 *   npx tsx packages/database/scripts/seed-test-accounts.ts
 *
 * Idempotent: upserts by slug, safe to re-run.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Slug Generator (same as main seed) ──────────────────────────────────────

function generateSlug(name: string, city: string): string {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  return `${slugify(name)}-${slugify(city)}`;
}

// ─── Test Accounts ───────────────────────────────────────────────────────────
// Each maps to a team member. Mix of tiers and categories to test all paths.

const testAccounts = [
  {
    // Chase — tests The Engine ($99) flow
    name: "The Big Muddy Inn",
    category: "Lodging",
    city: "Natchez",
    state: "MS",
    website: "https://bigmuddytouring.com",
    description:
      "Six rooms, a Blues Room, and the headquarters of everything you're reading right now. A boutique hotel built around live music, Southern hospitality, and the belief that a 40-seat venue can anchor a whole economy.",
    spotlight:
      "The Big Muddy Inn isn't just a place to sleep — it's the nerve center of a media-hospitality experiment on the Mississippi. Six guest rooms upstairs, the Blues Room downstairs, a radio station broadcasting from the parlor, and a magazine being written in the kitchen. If you stay here, you're not a guest. You're part of the story.",
    tier: "engine",
    contactName: "Chase Pierson",
    contactEmail: "me@chasepierson.tv",
    toolsOrigin: "Google Workspace, Stripe, Cloudbeds",
    softwareSpend: "$100–$500/mo",
    phone: "+16015551001",
    address: "100 Main Street",
  },
  {
    // Tracy — tests The Listing ($20) flow
    name: "Bluff City Books & Records",
    category: "Retail",
    city: "Natchez",
    state: "MS",
    website: "https://example.com/bluffcitybooks",
    description:
      "Used books, vinyl records, and local art in a storefront overlooking the river bluff. The kind of shop where you walk in for one thing and leave two hours later with a bag full of Mississippi fiction and a Howlin' Wolf LP you didn't know you needed.",
    tier: "listing",
    contactName: "Tracy Alderson-Allen",
    contactEmail: "tracyaldersonallen@gmail.com",
    toolsOrigin: "Square",
    softwareSpend: "Under $100/mo",
    phone: "+16015551002",
    address: "200 Commerce Street",
  },
  {
    // Amy — tests The Engine ($99) flow (bar/venue category)
    name: "The Porch Bar & Social Club",
    category: "Bar / Venue",
    city: "Natchez",
    state: "MS",
    website: "https://example.com/theporchbar",
    description:
      "A neighborhood bar with a backyard stage, craft cocktails made with Mississippi spirits, and a Tuesday open mic that's become the best-kept secret on the corridor. The porch wraps around two sides of the building and seats forty on a good night.",
    tier: "engine",
    contactName: "Amy Alderson-Allen",
    contactEmail: "amyaldersonallen@gmail.com",
    toolsOrigin: "Toast, QuickBooks",
    softwareSpend: "$100–$500/mo",
    phone: "+16015551003",
    address: "300 Franklin Street",
  },
  {
    // JP — tests free tier with venue category
    name: "The Juke Joint Revival Hall",
    category: "Arts & Culture",
    city: "Natchez",
    state: "MS",
    website: "https://example.com/jukejointrevival",
    description:
      "A reclaimed warehouse turned 200-capacity live music venue booking blues, soul, gospel, and everything in between. Friday and Saturday nights are standing room only when the touring acts come through. The sound system was built by the same guy who wired the Blues Room.",
    tier: "free",
    contactName: "JP Houston",
    contactEmail: "jphoustonlives@gmail.com",
    toolsOrigin: "Nothing yet",
    softwareSpend: "Under $100/mo",
    phone: "+16015551004",
    address: "400 Silver Street",
  },
  {
    // Spare test account — tests The Listing ($20) with restaurant
    name: "River Road Kitchen",
    category: "Food & Drink",
    city: "Natchez",
    state: "MS",
    website: "https://example.com/riverroadkitchen",
    description:
      "Farm-to-table Southern cooking in a converted cotton warehouse. The menu changes weekly based on what the local farms bring in, but the fried green tomato stack and smoked catfish are permanent fixtures. Lunch only, closed Mondays, cash and card.",
    tier: "listing",
    contactName: "Test Account",
    contactEmail: "listings@hillbillydreamsinc.com",
    toolsOrigin: "Square, Mailchimp",
    softwareSpend: "$100–$500/mo",
    phone: "+16015551005",
    address: "500 Broadway Street",
  },
];

// ─── Seed Function ───────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n🧪 DSD Test Accounts — Seeding ${testAccounts.length} internal test listings...\n`
  );

  let created = 0;
  let updated = 0;

  for (const acct of testAccounts) {
    const slug = generateSlug(acct.name, acct.city);

    const data = {
      name: acct.name,
      slug,
      category: acct.category,
      city: acct.city,
      state: acct.state,
      website: acct.website,
      description: acct.description,
      spotlight: "spotlight" in acct ? (acct as { spotlight: string }).spotlight : undefined,
      tier: acct.tier,
      active: true,
      contactName: acct.contactName,
      contactEmail: acct.contactEmail,
      toolsOrigin: acct.toolsOrigin,
      softwareSpend: acct.softwareSpend,
      phone: acct.phone,
      address: acct.address,
      // Fake but realistic hours for demo purposes
      hoursJson: {
        monday: { open: "8:00 AM", close: "9:00 PM" },
        tuesday: { open: "8:00 AM", close: "9:00 PM" },
        wednesday: { open: "8:00 AM", close: "9:00 PM" },
        thursday: { open: "8:00 AM", close: "10:00 PM" },
        friday: { open: "8:00 AM", close: "11:00 PM" },
        saturday: { open: "9:00 AM", close: "11:00 PM" },
        sunday: null,
      },
    };

    const existing = await prisma.directoryBusiness.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existing) {
      await prisma.directoryBusiness.update({
        where: { id: existing.id },
        data,
      });
      console.log(
        `  ✓ updated  ${acct.name} → /directory/${slug}  (${acct.contactName})`
      );
      updated++;
    } else {
      await prisma.directoryBusiness.create({ data });
      console.log(
        `  ✓ created  ${acct.name} → /directory/${slug}  (${acct.contactName})`
      );
      created++;
    }
  }

  console.log(`\n   Done. ${created} created, ${updated} updated.`);
  console.log(`\n   Test URLs:`);
  for (const acct of testAccounts) {
    const slug = generateSlug(acct.name, acct.city);
    console.log(
      `     ${acct.contactName.padEnd(22)} → deepsouthdirectory.com/directory/${slug}`
    );
  }
  console.log();
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
