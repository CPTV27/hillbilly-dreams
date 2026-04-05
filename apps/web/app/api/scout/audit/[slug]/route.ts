export const dynamic = 'force-dynamic';

// GET /api/scout/audit/:slug — Generate a pre-call audit for a DirectoryBusiness
// Pulls Google Places data and scores the business's digital presence

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { enrichBusinessFromPlaces } from '@/lib/google-places';

type Params = { params: { slug: string } };

interface AuditResult {
  business: {
    name: string;
    slug: string;
    city: string;
    state: string;
    category: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;
  };
  google: {
    found: boolean;
    placeId: string | null;
    rating: number | null;
    reviewCount: number | null;
    hours: Record<string, { open: string; close: string }> | null;
    photoCount: number;
    businessStatus: string | null;
    website: string | null;
  };
  issues: Array<{ severity: 'critical' | 'warning' | 'info'; title: string; detail: string; fix: string }>;
  score: number;
  dsdPitch: string;
}

function scoreAndAudit(
  business: { name: string; phone: string | null; website: string | null; googleRating: number | null; googleReviewCount: number | null },
  google: AuditResult['google'],
): { issues: AuditResult['issues']; score: number } {
  const issues: AuditResult['issues'] = [];
  let score = 100;

  // Google presence
  if (!google.found) {
    issues.push({ severity: 'critical', title: 'Not found on Google', detail: 'Google Places returned no result for this business.', fix: 'Create a Google Business Profile immediately.' });
    score -= 40;
  } else {
    // Rating
    if (google.rating === null || google.rating === 0) {
      issues.push({ severity: 'critical', title: 'No Google rating', detail: 'Business has no reviews on Google.', fix: 'DSD review monitoring catches new reviews and drafts responses.' });
      score -= 20;
    } else if (google.rating < 4.0) {
      issues.push({ severity: 'warning', title: `Google rating: ${google.rating}`, detail: 'Below 4.0 hurts search visibility.', fix: 'DSD AI drafts professional responses to negative reviews.' });
      score -= 10;
    }

    // Review count
    if (google.reviewCount !== null && google.reviewCount < 10) {
      issues.push({ severity: 'warning', title: `Only ${google.reviewCount} Google reviews`, detail: 'Businesses with 10+ reviews rank significantly higher in local search.', fix: 'DSD sends review request reminders to customers.' });
      score -= 10;
    }

    // Hours
    if (!google.hours || Object.keys(google.hours).length === 0) {
      issues.push({ severity: 'warning', title: 'No hours listed on Google', detail: 'Customers can\'t tell when you\'re open.', fix: 'DSD syncs your hours across Google and 50+ directories.' });
      score -= 10;
    }

    // Photos
    if (google.photoCount === 0) {
      issues.push({ severity: 'critical', title: 'No photos on Google', detail: 'Listings without photos get 42% fewer direction requests.', fix: 'DSD Engine tier includes professional photography.' });
      score -= 15;
    } else if (google.photoCount < 3) {
      issues.push({ severity: 'warning', title: `Only ${google.photoCount} photo(s) on Google`, detail: 'More photos = more clicks. Best practice is 10+.', fix: 'DSD uploads and manages your Google photos.' });
      score -= 5;
    }
  }

  // Website
  if (!business.website && !google.website) {
    issues.push({ severity: 'warning', title: 'No website', detail: 'No website found on Google or in directory.', fix: 'DSD listing serves as a web presence with your hours, photos, and reviews.' });
    score -= 10;
  }

  // Phone
  if (!business.phone) {
    issues.push({ severity: 'info', title: 'No phone number on file', detail: 'Phone number missing from directory record.', fix: 'Add during DSD onboarding.' });
    score -= 5;
  }

  return { issues, score: Math.max(0, score) };
}

function generatePitch(business: { name: string; city: string }, score: number, issues: AuditResult['issues']): string {
  const criticals = issues.filter(i => i.severity === 'critical').length;
  const warnings = issues.filter(i => i.severity === 'warning').length;

  if (score >= 80) {
    return `${business.name} is doing the basics right. DSD adds autopilot — social posts, review responses, and magazine exposure that nobody else in ${business.city} offers.`;
  }
  if (score >= 50) {
    return `${business.name} has ${warnings} fixable issues. DSD handles all of them for $99/mo — Google listing corrected, reviews monitored, social posts going out. Set it and forget it.`;
  }
  return `${business.name} has ${criticals} critical issues hurting their online presence right now. Every day without a fix is lost customers. DSD fixes the basics on day one.`;
}

export async function GET(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { slug } = params;

  try {
    const business = await prisma.directoryBusiness.findUnique({ where: { slug } });
    if (!business) {
      return NextResponse.json({ error: `No business found with slug "${slug}"` }, { status: 404 });
    }

    // Try to enrich from Google Places if not recently enriched
    let google: AuditResult['google'] = {
      found: false,
      placeId: business.googlePlaceId,
      rating: business.googleRating,
      reviewCount: business.googleReviewCount,
      hours: business.hoursJson as Record<string, { open: string; close: string }> | null,
      photoCount: business.photoUrls?.length ?? 0,
      businessStatus: null,
      website: null,
    };

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const needsRefresh = !business.lastEnrichedAt || business.lastEnrichedAt < oneWeekAgo;

    if (needsRefresh) {
      try {
        const enriched = await enrichBusinessFromPlaces(business.name, business.city, business.state);
        if (enriched) {
          google = {
            found: true,
            placeId: enriched.googlePlaceId,
            rating: enriched.rating,
            reviewCount: enriched.reviewCount,
            hours: enriched.hours,
            photoCount: enriched.photoReferences.length,
            businessStatus: enriched.businessStatus,
            website: enriched.website,
          };

          // Update the DB record
          await prisma.directoryBusiness.update({
            where: { id: business.id },
            data: {
              googlePlaceId: enriched.googlePlaceId,
              googleRating: enriched.rating,
              googleReviewCount: enriched.reviewCount,
              hoursJson: enriched.hours ?? undefined,
              photoUrls: enriched.photoReferences.slice(0, 3),
              address: enriched.address || business.address,
              phone: enriched.phone || business.phone,
              lat: enriched.lat,
              lng: enriched.lng,
              lastEnrichedAt: new Date(),
            },
          });
        }
      } catch (err) {
        console.error('[scout/audit] Enrichment failed:', err);
        // Continue with existing data
        if (business.googlePlaceId) google.found = true;
      }
    } else {
      google.found = !!business.googlePlaceId;
    }

    const { issues, score } = scoreAndAudit(
      { name: business.name, phone: business.phone, website: business.website, googleRating: business.googleRating, googleReviewCount: business.googleReviewCount },
      google,
    );

    const dsdPitch = generatePitch({ name: business.name, city: business.city }, score, issues);

    const result: AuditResult = {
      business: {
        name: business.name,
        slug: business.slug,
        city: business.city,
        state: business.state,
        category: business.category,
        phone: business.phone,
        website: business.website,
        address: business.address,
      },
      google,
      issues,
      score,
      dsdPitch,
    };

    return NextResponse.json({ data: result });
  } catch (err) {
    console.error('[GET /api/scout/audit/:slug]', err);
    return NextResponse.json({ error: 'Audit failed' }, { status: 500 });
  }
}
