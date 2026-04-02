/**
 * seed-regina.ts — Create Regina Charboneau / Regina's Kitchen DSD listing
 * The first real external dogfood client.
 *
 * Run: npx tsx packages/database/scripts/seed-regina.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const slug = "reginas-kitchen-natchez";

  const existing = await prisma.directoryBusiness.findUnique({
    where: { slug },
    select: { id: true },
  });

  const data = {
    name: "Regina's Kitchen",
    slug,
    category: "Food & Drink",
    subcategory: "Cooking School / Restaurant",
    city: "Natchez",
    state: "MS",
    website: "https://reginaskitchen.com",
    description:
      "Chef Regina Charboneau — the Biscuit Queen of Natchez. Paris-trained, Alaska-hardened, San Francisco-tested. She opened Biscuits & Blues in San Francisco in 1995 (multiple W.C. Handy awards for Best Blues Club in America), served as culinary director of the American Queen riverboat, restored King's Tavern (the oldest building in Natchez), and wrote four cookbooks. Now she runs cooking classes at Regina's Kitchen in downtown Natchez and hosts at Twin Oaks, her historic home. Fifty years of professional cooking, and the biscuits are still the thing people drive across the state for.",
    spotlight:
      "Regina Charboneau doesn't need an introduction in Natchez — she IS Natchez food. The Biscuit Queen earned her title the hard way: cooking in the Alaska bush, running restaurants in San Francisco, directing the kitchen on the American Queen paddleboat, and restoring a 200-year-old tavern. Four cookbooks. A cooking school. A bed and breakfast. And biscuits that the New York Times, the Travel Channel, and the Hallmark Channel all agree are the best in the South. She came home to Natchez in 2001 to raise her sons, and she never left. The corridor starts at her table.",
    tier: "engine",
    active: true,
    contactName: "Regina Charboneau",
    contactEmail: "info@reginaskitchen.com",
    toolsOrigin: "Word of mouth",
    softwareSpend: "Under $100/mo",
    hearAbout: "chase_told_me",
  };

  if (existing) {
    await prisma.directoryBusiness.update({
      where: { id: existing.id },
      data,
    });
    console.log(`  ✓ updated  Regina's Kitchen → /directory/${slug}`);
  } else {
    await prisma.directoryBusiness.create({ data });
    console.log(`  ✓ created  Regina's Kitchen → /directory/${slug}`);
  }

  console.log(`\n  Live at: deepsouthdirectory.com/directory/${slug}`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
