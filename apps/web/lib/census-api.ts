// lib/census-api.ts
// Census Bureau ACS 5-Year and County Business Patterns API client.
// Free API — no key needed for basic access.
// Reference: https://api.census.gov/data.html

import { prisma } from '@/lib/db';

const CENSUS_BASE = 'https://api.census.gov/data';

// Key ACS 5-Year variables we care about
export const ACS_VARIABLES = {
  B01003_001E: 'total_population',
  B19013_001E: 'median_household_income',
  B17001_002E: 'population_below_poverty',
  B17001_001E: 'total_population_poverty_universe',
  B15003_022E: 'bachelors_degree_holders',
  B15003_023E: 'masters_degree_holders',
  B15003_025E: 'doctorate_holders',
  B25077_001E: 'median_home_value',
  B25064_001E: 'median_gross_rent',
  B23025_005E: 'unemployed_population',
  B23025_003E: 'civilian_labor_force',
} as const;

// Target corridor counties: FIPS state + county codes
export const CORRIDOR_COUNTIES: Array<{ fips: string; name: string; state: string }> = [
  { fips: '28001', name: 'Adams County', state: 'MS' },
  { fips: '28011', name: 'Coahoma County', state: 'MS' },
  { fips: '28033', name: 'DeSoto County', state: 'MS' },
  { fips: '28035', name: 'Forrest County', state: 'MS' },
  { fips: '28047', name: 'Harrison County', state: 'MS' },
  { fips: '28049', name: 'Hinds County', state: 'MS' },
  { fips: '28071', name: 'Lafayette County', state: 'MS' },
  { fips: '28081', name: 'Lee County', state: 'MS' },
  { fips: '28087', name: 'Lowndes County', state: 'MS' },
  { fips: '28149', name: 'Warren County', state: 'MS' },
  { fips: '28151', name: 'Washington County', state: 'MS' },
  { fips: '28163', name: 'Yazoo County', state: 'MS' },
  { fips: '22071', name: 'Orleans Parish', state: 'LA' },
  { fips: '47157', name: 'Shelby County', state: 'TN' },
];

/**
 * Fetch ACS 5-Year data for a county.
 * Returns raw Census API response variables.
 */
export async function fetchACSCounty(
  stateFips: string,
  countyFips: string,
  year: number = 2023
): Promise<Record<string, string | null>> {
  const variables = Object.keys(ACS_VARIABLES).join(',');
  const url = `${CENSUS_BASE}/${year}/acs/acs5?get=${variables}&for=county:${countyFips}&in=state:${stateFips}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Census API error (${response.status}): ${await response.text()}`);
  }

  const data = await response.json();
  // Census API returns [header_row, data_row]
  const headers = data[0] as string[];
  const values = data[1] as string[];

  const result: Record<string, string | null> = {};
  for (let i = 0; i < headers.length; i++) {
    result[headers[i]] = values[i] === '-666666666' ? null : values[i]; // Census uses this for "not available"
  }

  return result;
}

/**
 * Sync Census ACS data for a single county into the CensusData table.
 * Upserts to avoid duplicates on re-runs.
 */
export async function syncCountyCensusData(
  county: { fips: string; name: string; state: string },
  year: number = 2023
): Promise<number> {
  const stateFips = county.fips.slice(0, 2);
  const countyFips = county.fips.slice(2);

  const rawData = await fetchACSCounty(stateFips, countyFips, year);
  let upserted = 0;

  for (const [variable, friendlyName] of Object.entries(ACS_VARIABLES)) {
    const rawValue = rawData[variable];
    const value = rawValue ? parseFloat(rawValue) : null;

    await prisma.censusData.upsert({
      where: {
        geoType_geoId_dataset_variable_year: {
          geoType: 'county',
          geoId: county.fips,
          dataset: 'acs5',
          variable: friendlyName,
          year,
        },
      },
      update: { value, fetchedAt: new Date() },
      create: {
        geoType: 'county',
        geoId: county.fips,
        geoName: `${county.name}, ${county.state}`,
        dataset: 'acs5',
        variable: friendlyName,
        value,
        year,
      },
    });
    upserted++;
  }

  console.log(`[census] Synced ${upserted} variables for ${county.name}, ${county.state} (${year})`);
  return upserted;
}

/**
 * Sync Census data for all corridor counties.
 */
export async function syncAllCorridorCensus(year: number = 2023): Promise<{ counties: number; variables: number; errors: string[] }> {
  const errors: string[] = [];
  let totalVariables = 0;

  for (const county of CORRIDOR_COUNTIES) {
    try {
      const count = await syncCountyCensusData(county, year);
      totalVariables += count;
    } catch (err) {
      const msg = `Failed to sync Census for ${county.name}: ${err}`;
      console.error(`[census] ${msg}`);
      errors.push(msg);
    }
  }

  return { counties: CORRIDOR_COUNTIES.length - errors.length, variables: totalVariables, errors };
}

/**
 * Get Census data for a county, formatted for display.
 */
export async function getCountyProfile(fips: string): Promise<Record<string, number | null>> {
  const data = await prisma.censusData.findMany({
    where: { geoId: fips, dataset: 'acs5' },
    orderBy: { year: 'desc' },
  });

  // Return the most recent year's data as a keyed object
  const profile: Record<string, number | null> = {};
  const seenVariables = new Set<string>();

  for (const row of data) {
    if (!seenVariables.has(row.variable)) {
      profile[row.variable] = row.value;
      seenVariables.add(row.variable);
    }
  }

  return profile;
}
