#!/usr/bin/env npx tsx
/**
 * Sales Scout — Adams County / Natchez high-influence candidates for Intel ($300) tier.
 *
 * Uses on-hand DB signals: `DirectoryBusiness`, `Client`, optional `CensusData` / `EconomicIndicator`
 * for county context (FIPS 28001). Does not fabricate individuals — surfaces **primary contacts**
 * and orgs with outsized local graph centrality heuristics.
 *
 * Run from repo root:
 *   pnpm scout:leads
 *   pnpm scout:leads -- --write   # upsert `Lead` rows (requires migrated DB)
 *
 * Env: `DATABASE_URL` (loads `apps/web/.env.local` when present).
 */
import * as fs from 'fs';
import * as path from 'path';
import { prisma } from '../../packages/database/index';

const ADAMS_FIPS = '28001';
function loadEnvLocal(): void {
  const envPath = path.join(process.cwd(), 'apps/web/.env.local');
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, 'utf8');
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq <= 0) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

interface ScoredProspect {
  name: string;
  industry: string;
  perceivedPower: number;
  email: string | null;
  phone: string | null;
  source: 'directory_business' | 'client';
  sourceId: string;
  rationale: string;
  socialGraphNodes: Record<string, unknown>;
}

function tierWeight(tier: string): number {
  const t = tier.toLowerCase();
  if (t.includes('hdx') || t.includes('engine')) return 4;
  if (t.includes('route') || t.includes('works')) return 3;
  if (t.includes('main') || t.includes('listing')) return 2;
  return 1;
}

function categoryInfluenceBoost(category: string, name: string): number {
  const blob = `${category} ${name}`.toLowerCase();
  if (blob.includes('chamber')) return 3;
  if (blob.includes('bank') || blob.includes('credit')) return 2;
  if (blob.includes('real estate') || blob.includes('realty')) return 2;
  if (blob.includes('museum') || blob.includes('pilgrimage') || blob.includes('tourism')) return 2;
  if (blob.includes('county') || blob.includes('municipal') || blob.includes('city hall')) return 3;
  if (blob.includes('school') || blob.includes('district')) return 2;
  return 0;
}

async function loadCountyPulse(): Promise<string[]> {
  const lines: string[] = [];
  const census = await prisma.censusData.findMany({
    where: { geoId: ADAMS_FIPS, geoType: 'county' },
    take: 8,
    orderBy: { year: 'desc' },
    select: { variable: true, value: true, year: true, geoName: true },
  });
  for (const row of census) {
    if (row.value != null) {
      lines.push(`${row.geoName} ${row.year} ${row.variable}: ${row.value}`);
    }
  }
  const econ = await prisma.economicIndicator.findMany({
    where: { geoId: ADAMS_FIPS },
    take: 6,
    orderBy: { fetchedAt: 'desc' },
    select: { indicator: true, value: true, period: true, geoName: true },
  });
  for (const row of econ) {
    lines.push(`${row.geoName} ${row.period} ${row.indicator}: ${row.value}`);
  }
  return lines;
}

async function collectProspects(): Promise<ScoredProspect[]> {
  const out: ScoredProspect[] = [];

  const businesses = await prisma.directoryBusiness.findMany({
    where: {
      state: 'MS',
      OR: [{ city: { contains: 'Natchez', mode: 'insensitive' } }, { zip: { startsWith: '391' } }],
    },
    select: {
      id: true,
      name: true,
      category: true,
      contactName: true,
      contactEmail: true,
      phone: true,
      tier: true,
      googleReviewCount: true,
    },
  });

  for (const b of businesses) {
    const score =
      tierWeight(b.tier) * 2 +
      categoryInfluenceBoost(b.category, b.name) +
      Math.min(3, Math.floor((b.googleReviewCount ?? 0) / 50));
    const perceivedPower = Math.max(1, Math.min(10, 4 + score));
    const contactLabel = b.contactName?.trim() || b.name;
    out.push({
      name: contactLabel,
      industry: b.category,
      perceivedPower,
      email: b.contactEmail,
      phone: b.phone,
      source: 'directory_business',
      sourceId: String(b.id),
      rationale: `Directory: ${b.name} (${b.tier}) — reviews ~${b.googleReviewCount ?? 0}`,
      socialGraphNodes: {
        directoryBusinessId: b.id,
        organization: b.name,
        role: 'primary_listing_contact',
      },
    });
  }

  const clients = await prisma.client.findMany({
    where: {
      state: 'MS',
      city: { contains: 'Natchez', mode: 'insensitive' },
    },
    select: {
      id: true,
      name: true,
      businessType: true,
      tier: true,
      contactName: true,
      contactEmail: true,
      contactPhone: true,
    },
  });

  for (const c of clients) {
    const score = tierWeight(c.tier) * 2 + categoryInfluenceBoost(c.businessType, c.name);
    const perceivedPower = Math.max(1, Math.min(10, 5 + score));
    const contactLabel = c.contactName?.trim() || c.name;
    out.push({
      name: contactLabel,
      industry: c.businessType,
      perceivedPower,
      email: c.contactEmail,
      phone: c.contactPhone,
      source: 'client',
      sourceId: String(c.id),
      rationale: `Paid client pipeline: ${c.name} (${c.tier})`,
      socialGraphNodes: {
        clientId: c.id,
        organization: c.name,
        role: 'billing_contact',
      },
    });
  }

  out.sort((a, b) => b.perceivedPower - a.perceivedPower || a.name.localeCompare(b.name));
  const dedup = new Map<string, ScoredProspect>();
  for (const p of out) {
    const key = `${p.email ?? p.name}`.toLowerCase();
    if (!dedup.has(key)) dedup.set(key, p);
  }
  return [...dedup.values()].sort((a, b) => b.perceivedPower - a.perceivedPower);
}

async function main(): Promise<void> {
  loadEnvLocal();
  if (!process.env.DATABASE_URL) {
    console.error('[lead-generator] DATABASE_URL missing. Set env or ensure apps/web/.env.local exists.');
    process.exit(1);
  }

  const write = process.argv.includes('--write');

  try {
    const pulse = await loadCountyPulse();
    if (pulse.length) {
      console.log('--- Adams County (FIPS 28001) data pulse (sample) ---');
      pulse.slice(0, 6).forEach((l) => console.log(l));
      console.log('');
    }

    const prospects = await collectProspects();
    const top = prospects.slice(0, 20);

    console.log(`Top ${top.length} Intel-tier candidates (heuristic, org-linked contacts):\n`);
    for (const p of top) {
      console.log(
        JSON.stringify(
          {
            name: p.name,
            industry: p.industry,
            perceivedPower: p.perceivedPower,
            email: p.email,
            source: p.source,
            sourceId: p.sourceId,
            rationale: p.rationale,
          },
          null,
          0
        )
      );
    }

    if (!write) {
      console.log('\nDry run. Pass --write to persist `Lead` rows.');
      return;
    }

    for (const p of top) {
      const existing =
        p.email != null && p.email.length > 0
          ? await prisma.lead.findFirst({ where: { email: p.email } })
          : await prisma.lead.findFirst({
              where: { name: p.name, industry: p.industry, source: 'scout' },
            });

      const data = {
        name: p.name,
        industry: p.industry,
        perceivedPower: p.perceivedPower,
        email: p.email,
        phone: p.phone,
        source: 'scout' as const,
        notes: p.rationale,
        socialGraphNodes: p.socialGraphNodes as object,
        lastInteraction: new Date(),
      };

      if (existing) {
        await prisma.lead.update({ where: { id: existing.id }, data });
      } else {
        await prisma.lead.create({ data });
      }
    }
    console.log(`\nPersisted ${top.length} Lead rows (create/update by email or name+industry+scout).`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  void prisma.$disconnect().finally(() => process.exit(1));
});
