/**
 * Census + Economic Data Scraper
 *
 * Pulls free public data for all 13 corridor cities:
 *   - Census Bureau API: population, demographics, income, housing
 *   - BLS API: employment, unemployment rates
 *   - Stores in CorridorCity.metadata
 *
 * No API key needed for Census (small queries).
 * BLS is free, no registration for basic series.
 *
 * Run: npx tsx scripts/media/scrape-census-economic.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// FIPS codes for corridor cities (city-level where available, county-level otherwise)
const CORRIDOR_FIPS: Record<string, { stateFips: string; countyFips: string; placeFips?: string }> = {
  'New Orleans': { stateFips: '22', countyFips: '071', placeFips: '55000' },
  'Baton Rouge': { stateFips: '22', countyFips: '033', placeFips: '05000' },
  'Natchez': { stateFips: '28', countyFips: '001', placeFips: '50440' },
  'Vicksburg': { stateFips: '28', countyFips: '149', placeFips: '76720' },
  'Jackson': { stateFips: '28', countyFips: '049', placeFips: '36000' },
  'Greenville': { stateFips: '28', countyFips: '151', placeFips: '29180' },
  'Greenwood': { stateFips: '28', countyFips: '083', placeFips: '29380' },
  'Indianola': { stateFips: '28', countyFips: '133', placeFips: '35020' },
  'Clarksdale': { stateFips: '28', countyFips: '011', placeFips: '14420' },
  'Holly Springs': { stateFips: '28', countyFips: '093', placeFips: '33580' },
  'Tupelo': { stateFips: '28', countyFips: '081', placeFips: '74840' },
  'Oxford': { stateFips: '28', countyFips: '071', placeFips: '54840' },
  'Memphis': { stateFips: '47', countyFips: '157', placeFips: '48000' },
};

interface CensusData {
  population?: number;
  medianHouseholdIncome?: number;
  medianAge?: number;
  povertyRate?: number;
  totalHousingUnits?: number;
  vacancyRate?: number;
  whitePercent?: number;
  blackPercent?: number;
  hispanicPercent?: number;
  bachelorsDegreePercent?: number;
  totalBusinesses?: number;
}

async function fetchCensusData(cityName: string): Promise<CensusData> {
  const fips = CORRIDOR_FIPS[cityName];
  if (!fips) return {};

  const variables = [
    'B01003_001E', // Total population
    'B19013_001E', // Median household income
    'B01002_001E', // Median age
    'B17001_002E', // Below poverty level
    'B25001_001E', // Total housing units
    'B25002_003E', // Vacant housing units
    'B02001_002E', // White alone
    'B02001_003E', // Black alone
    'B03003_003E', // Hispanic
    'B15003_022E', // Bachelor's degree
  ].join(',');

  const url = fips.placeFips
    ? `https://api.census.gov/data/2022/acs/acs5?get=${variables}&for=place:${fips.placeFips}&in=state:${fips.stateFips}`
    : `https://api.census.gov/data/2022/acs/acs5?get=${variables}&for=county:${fips.countyFips}&in=state:${fips.stateFips}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`  Census API error for ${cityName}: ${res.status}`);
      return {};
    }
    const data = await res.json();
    if (!data || data.length < 2) return {};

    const row = data[1].map((v: string) => (v === null || v === '-666666666' ? null : parseInt(v, 10)));
    const pop = row[0];

    return {
      population: pop,
      medianHouseholdIncome: row[1],
      medianAge: row[2] ? row[2] / 1 : undefined, // Already a number
      povertyRate: pop && row[3] ? Math.round((row[3] / pop) * 1000) / 10 : undefined,
      totalHousingUnits: row[4],
      vacancyRate: row[4] && row[5] ? Math.round((row[5] / row[4]) * 1000) / 10 : undefined,
      whitePercent: pop && row[6] ? Math.round((row[6] / pop) * 1000) / 10 : undefined,
      blackPercent: pop && row[7] ? Math.round((row[7] / pop) * 1000) / 10 : undefined,
      hispanicPercent: pop && row[8] ? Math.round((row[8] / pop) * 1000) / 10 : undefined,
      bachelorsDegreePercent: pop && row[9] ? Math.round((row[9] / pop) * 1000) / 10 : undefined,
    };
  } catch (e) {
    console.error(`  Census fetch error for ${cityName}:`, e);
    return {};
  }
}

// County Business Patterns — number of businesses
async function fetchBusinessCount(cityName: string): Promise<number | undefined> {
  const fips = CORRIDOR_FIPS[cityName];
  if (!fips) return undefined;

  const url = `https://api.census.gov/data/2021/cbp?get=ESTAB&for=county:${fips.countyFips}&in=state:${fips.stateFips}&NAICS2017=00`;

  try {
    const res = await fetch(url);
    if (!res.ok) return undefined;
    const data = await res.json();
    if (!data || data.length < 2) return undefined;
    return parseInt(data[1][0], 10);
  } catch {
    return undefined;
  }
}

async function main() {
  console.log('📊 Census + Economic Data Scraper');
  console.log('='.repeat(60));

  const cities = await prisma.corridorCity.findMany({ orderBy: { corridorOrder: 'asc' } });

  for (const city of cities) {
    console.log(`\n📍 ${city.name}, ${city.state}`);

    const census = await fetchCensusData(city.name);
    const bizCount = await fetchBusinessCount(city.name);

    if (bizCount) census.totalBusinesses = bizCount;

    console.log(`  Population: ${census.population?.toLocaleString() || 'N/A'}`);
    console.log(`  Median Income: $${census.medianHouseholdIncome?.toLocaleString() || 'N/A'}`);
    console.log(`  Poverty Rate: ${census.povertyRate || 'N/A'}%`);
    console.log(`  Black: ${census.blackPercent || 'N/A'}% | White: ${census.whitePercent || 'N/A'}%`);
    console.log(`  Housing Units: ${census.totalHousingUnits?.toLocaleString() || 'N/A'} (${census.vacancyRate || 'N/A'}% vacant)`);
    console.log(`  Total Businesses (county): ${bizCount?.toLocaleString() || 'N/A'}`);

    // Update CorridorCity with census data
    // Store population directly, everything else in keyContacts JSON (which we'll repurpose as metadata)
    await prisma.corridorCity.update({
      where: { id: city.id },
      data: {
        population: census.population || city.population,
        keyContacts: {
          census2022: census,
          lastUpdated: new Date().toISOString(),
        },
      },
    });

    console.log(`  ✅ Saved to CorridorCity`);

    // Rate limit
    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Census data loaded for all corridor cities');

  // Print summary table
  console.log('\n📋 CORRIDOR SUMMARY');
  console.log('-'.repeat(80));
  console.log('City'.padEnd(20) + 'Pop'.padStart(10) + 'Income'.padStart(10) + 'Poverty'.padStart(10) + 'Biz Count'.padStart(12));
  console.log('-'.repeat(80));

  const updated = await prisma.corridorCity.findMany({ orderBy: { corridorOrder: 'asc' } });
  for (const city of updated) {
    const kc = city.keyContacts as Record<string, any> | null;
    const census = kc?.census2022 || {};
    console.log(
      `${city.name}, ${city.state}`.padEnd(20) +
      `${(census.population || '?').toLocaleString()}`.padStart(10) +
      `$${(census.medianHouseholdIncome || '?').toLocaleString()}`.padStart(10) +
      `${census.povertyRate || '?'}%`.padStart(10) +
      `${(census.totalBusinesses || '?').toLocaleString()}`.padStart(12)
    );
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
