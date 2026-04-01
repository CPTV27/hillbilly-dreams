export const dynamic = 'force-dynamic';
// apps/web/app/api/directory/enrich/route.ts
// POST /api/directory/enrich
// Enriches a DirectoryBusiness with Google Places data.
// Admin only — called by cron or manually.

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { enrichBusinessFromPlaces } from '@/lib/google-places';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessId } = body;

    if (!businessId) {
      return NextResponse.json({ error: 'businessId is required' }, { status: 400 });
    }

    const business = await prisma.directoryBusiness.findUnique({
      where: { id: businessId },
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const result = await enrichBusinessFromPlaces(business.name, business.city, business.state);

    if (!result) {
      return NextResponse.json({
        success: false,
        message: 'No Google Places match found',
      });
    }

    // Update business with enrichment data
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
        website: business.website || result.website || undefined,
        lastEnrichedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      businessId,
      enriched: {
        googlePlaceId: result.googlePlaceId,
        address: result.address,
        phone: result.phone,
        lat: result.lat,
        lng: result.lng,
        rating: result.rating,
        reviewCount: result.reviewCount,
      },
    });
  } catch (error) {
    console.error('[API Error] POST /api/directory/enrich', error);
    return NextResponse.json({ error: 'Enrichment failed' }, { status: 500 });
  }
}
