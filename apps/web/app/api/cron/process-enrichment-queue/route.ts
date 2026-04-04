export const dynamic = 'force-dynamic';
// apps/web/app/api/cron/process-enrichment-queue/route.ts
// POST /api/cron/process-enrichment-queue
// Processes pending enrichment jobs. Designed to run every 5 minutes via Vercel Cron.

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireCronOrAdmin } from '@/lib/cron-or-admin';
import { enrichBusinessFromPlaces } from '@/lib/google-places';
import { embedDirectoryBusiness } from '@/lib/embedding-pipeline';

const BATCH_SIZE = 50;

export async function POST(request: NextRequest) {
  const denied = await requireCronOrAdmin(request);
  if (denied) return denied;

  try {
    // Grab pending jobs, oldest first
    const jobs = await prisma.enrichmentJob.findMany({
      where: { status: 'pending' },
      orderBy: { createdAt: 'asc' },
      take: BATCH_SIZE,
    });

    if (jobs.length === 0) {
      return NextResponse.json({ processed: 0, message: 'No pending jobs' });
    }

    let completed = 0;
    let failed = 0;

    for (const job of jobs) {
      // Mark as processing
      await prisma.enrichmentJob.update({
        where: { id: job.id },
        data: { status: 'processing', attempts: job.attempts + 1 },
      });

      try {
        if (job.entityType === 'directory_business') {
          const businessId = parseInt(job.entityId, 10);

          if (job.jobType === 'google_places') {
            const biz = await prisma.directoryBusiness.findUnique({ where: { id: businessId } });
            if (biz) {
              const result = await enrichBusinessFromPlaces(biz.name, biz.city, biz.state);
              if (result) {
                await prisma.directoryBusiness.update({
                  where: { id: businessId },
                  data: {
                    googlePlaceId: result.googlePlaceId,
                    address: result.address || undefined,
                    phone: result.phone || undefined,
                    lat: result.lat || undefined,
                    lng: result.lng || undefined,
                    googleRating: result.rating,
                    googleReviewCount: result.reviewCount,
                    hoursJson: result.hours || undefined,
                    photoUrls: result.photoReferences,
                    lastEnrichedAt: new Date(),
                  },
                });
              }
            }
          } else if (job.jobType === 'embedding') {
            await embedDirectoryBusiness(businessId);
          }
        }

        // Mark completed
        await prisma.enrichmentJob.update({
          where: { id: job.id },
          data: { status: 'completed', processedAt: new Date() },
        });
        completed++;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        const newStatus = job.attempts + 1 >= job.maxAttempts ? 'failed' : 'pending';
        await prisma.enrichmentJob.update({
          where: { id: job.id },
          data: { status: newStatus, error: errorMsg },
        });
        if (newStatus === 'failed') failed++;
        console.error(`[enrichment] Job ${job.id} (${job.jobType}) failed: ${errorMsg}`);
      }
    }

    return NextResponse.json({ processed: jobs.length, completed, failed });
  } catch (error) {
    console.error('[API Error] POST /api/cron/process-enrichment-queue', error);
    return NextResponse.json({ error: 'Queue processing failed' }, { status: 500 });
  }
}
