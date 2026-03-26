// lib/bls-api.ts
// Bureau of Labor Statistics API v2 client.
// Free tier: 500 queries/day with registration key.
// Reference: https://www.bls.gov/developers/

import { prisma } from '@/lib/db';

const BLS_API_KEY = process.env.BLS_API_KEY || '';
const BLS_BASE = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';

/**
 * LAUS series ID format for county unemployment rate:
 * LAUCN{stateFips}{countyFips}0000000003
 * The "3" suffix = unemployment rate
 */
function buildLAUSSeriesId(fips: string): string {
  return `LAUCN${fips}0000000003`;
}

/**
 * LAUS series for unemployment count:
 * LAUCN{stateFips}{countyFips}0000000004
 */
function buildLAUSUnemploymentCountId(fips: string): string {
  return `LAUCN${fips}0000000004`;
}

/**
 * LAUS series for labor force:
 * LAUCN{stateFips}{countyFips}0000000006
 */
function buildLAUSLaborForceId(fips: string): string {
  return `LAUCN${fips}0000000006`;
}

interface BLSDataPoint {
  year: string;
  period: string;
  periodName: string;
  value: string;
  footnotes: Array<{ code: string; text: string }>;
}

interface BLSSeriesResult {
  seriesID: string;
  data: BLSDataPoint[];
}

/**
 * Fetch time series data from BLS API v2.
 * Supports up to 50 series per request, 20 years of data.
 */
export async function fetchBLSSeries(
  seriesIds: string[],
  startYear: number,
  endYear: number
): Promise<BLSSeriesResult[]> {
  const body: Record<string, unknown> = {
    seriesid: seriesIds,
    startyear: String(startYear),
    endyear: String(endYear),
  };

  if (BLS_API_KEY) {
    body.registrationkey = BLS_API_KEY;
  }

  const response = await fetch(BLS_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`BLS API error (${response.status}): ${await response.text()}`);
  }

  const data = await response.json();

  if (data.status !== 'REQUEST_SUCCEEDED') {
    throw new Error(`BLS API request failed: ${JSON.stringify(data.message)}`);
  }

  return data.Results.series as BLSSeriesResult[];
}

/**
 * Sync LAUS unemployment data for a county.
 * Fetches unemployment rate, count, and labor force.
 */
export async function syncCountyLAUS(
  county: { fips: string; name: string; state: string },
  startYear: number = 2023,
  endYear: number = 2025
): Promise<number> {
  const seriesIds = [
    buildLAUSSeriesId(county.fips),
    buildLAUSUnemploymentCountId(county.fips),
    buildLAUSLaborForceId(county.fips),
  ];

  const indicatorMap: Record<string, string> = {
    [seriesIds[0]]: 'unemployment_rate',
    [seriesIds[1]]: 'unemployment_count',
    [seriesIds[2]]: 'labor_force',
  };

  const results = await fetchBLSSeries(seriesIds, startYear, endYear);
  let upserted = 0;

  for (const series of results) {
    const indicator = indicatorMap[series.seriesID];
    if (!indicator) continue;

    for (const point of series.data) {
      // BLS period format: "M01" through "M13" (M13 = annual average)
      const month = point.period.replace('M', '').padStart(2, '0');
      const period = month === '13' ? point.year : `${point.year}-${month}`;

      await prisma.economicIndicator.upsert({
        where: {
          source_seriesId_period: {
            source: 'bls_laus',
            seriesId: series.seriesID,
            period,
          },
        },
        update: { value: parseFloat(point.value), fetchedAt: new Date() },
        create: {
          source: 'bls_laus',
          seriesId: series.seriesID,
          geoType: 'county',
          geoId: county.fips,
          geoName: `${county.name}, ${county.state}`,
          period,
          indicator,
          value: parseFloat(point.value),
        },
      });
      upserted++;
    }
  }

  console.log(`[bls] Synced ${upserted} LAUS data points for ${county.name}, ${county.state}`);
  return upserted;
}

/**
 * Get the latest economic indicators for a county.
 */
export async function getCountyEconomics(fips: string): Promise<Record<string, { value: number; period: string }>> {
  const data = await prisma.economicIndicator.findMany({
    where: { geoId: fips },
    orderBy: { period: 'desc' },
  });

  // Return the most recent value for each indicator
  const result: Record<string, { value: number; period: string }> = {};
  const seen = new Set<string>();

  for (const row of data) {
    if (!seen.has(row.indicator)) {
      result[row.indicator] = { value: row.value, period: row.period };
      seen.add(row.indicator);
    }
  }

  return result;
}
