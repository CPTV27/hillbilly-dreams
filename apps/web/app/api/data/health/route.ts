export const dynamic = 'force-dynamic';
// apps/web/app/api/data/health/route.ts
// GET /api/data/health
// Data platform health monitor — completeness and freshness stats.

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // DirectoryBusiness stats
    const [totalBusinesses, enrichedBusinesses, staleBusinesses, noLatLng, noPhone] =
      await Promise.all([
        prisma.directoryBusiness.count(),
        prisma.directoryBusiness.count({ where: { lastEnrichedAt: { not: null } } }),
        prisma.directoryBusiness.count({
          where: {
            lastEnrichedAt: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          },
        }),
        prisma.directoryBusiness.count({ where: { lat: null } }),
        prisma.directoryBusiness.count({ where: { phone: null } }),
      ]);

    // Embedding stats
    const totalEmbeddings = await prisma.embedding.count();

    // Census stats
    const censusCounties = await prisma.censusData.groupBy({
      by: ['geoId'],
      _count: true,
    });
    const latestCensusYear = await prisma.censusData.aggregate({
      _max: { year: true },
    });

    // Economic stats
    const econCounties = await prisma.economicIndicator.groupBy({
      by: ['geoId'],
      _count: true,
    });
    const latestEconPeriod = await prisma.economicIndicator.aggregate({
      _max: { period: true },
    });

    // Enrichment queue stats
    const [pendingJobs, failedJobs] = await Promise.all([
      prisma.enrichmentJob.count({ where: { status: 'pending' } }),
      prisma.enrichmentJob.count({ where: { status: 'failed' } }),
    ]);

    // MetricSnapshot stats
    const totalSnapshots = await prisma.metricSnapshot.count();

    return NextResponse.json({
      directoryBusinesses: {
        total: totalBusinesses,
        enriched: enrichedBusinesses,
        stale: staleBusinesses,
        noLatLng,
        noPhone,
        enrichmentRate: totalBusinesses > 0 ? Math.round((enrichedBusinesses / totalBusinesses) * 100) : 0,
      },
      embeddings: { total: totalEmbeddings },
      census: {
        counties: censusCounties.length,
        latestYear: latestCensusYear._max.year,
      },
      economics: {
        counties: econCounties.length,
        latestPeriod: latestEconPeriod._max.period,
      },
      enrichmentQueue: { pending: pendingJobs, failed: failedJobs },
      metricSnapshots: { total: totalSnapshots },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API Error] GET /api/data/health', error);
    return NextResponse.json({ error: 'Health check failed' }, { status: 500 });
  }
}
