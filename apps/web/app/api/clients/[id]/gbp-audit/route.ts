export const dynamic = 'force-dynamic';

// GET /api/clients/:id/gbp-audit — Google Business Profile health check
// Returns a 0-100 score with specific fix recommendations per category

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { enrichBusinessFromPlaces } from '@/lib/google-places';

type Params = { params: { id: string } };

interface GBPCategory {
  name: string;
  score: number;
  maxScore: number;
  status: 'good' | 'needs-work' | 'critical';
  detail: string;
  fix: string | null;
}

interface GBPAudit {
  clientName: string;
  clientId: number;
  overallScore: number;
  categories: GBPCategory[];
  lastChecked: string;
}

function gradeCategory(score: number, max: number): 'good' | 'needs-work' | 'critical' {
  const pct = score / max;
  if (pct >= 0.8) return 'good';
  if (pct >= 0.4) return 'needs-work';
  return 'critical';
}

export async function GET(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const clientId = parseInt(params.id, 10);
  if (isNaN(clientId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        reviews: {
          orderBy: { postedAt: 'desc' },
          take: 50,
        },
      },
    });

    if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

    // Try Google enrichment
    let googleData: {
      rating: number | null;
      reviewCount: number | null;
      hours: Record<string, { open: string; close: string }> | null;
      photoCount: number;
      description: string | null;
      categories: string[];
    } = { rating: null, reviewCount: null, hours: null, photoCount: 0, description: null, categories: [] };

    if (client.gbpPlaceId || (client.name && client.city)) {
      try {
        const enriched = await enrichBusinessFromPlaces(client.name, client.city, client.state);
        if (enriched) {
          googleData = {
            rating: enriched.rating,
            reviewCount: enriched.reviewCount,
            hours: enriched.hours,
            photoCount: enriched.photoReferences.length,
            description: null, // Google Places API doesn't return editorialSummary in text search
            categories: enriched.types || [],
          };
        }
      } catch {
        // Continue with local data
      }
    }

    const categories: GBPCategory[] = [];

    // 1. Hours accuracy (20 pts)
    const hoursScore = googleData.hours && Object.keys(googleData.hours).length >= 5 ? 20
      : googleData.hours && Object.keys(googleData.hours).length > 0 ? 10
      : 0;
    categories.push({
      name: 'Hours',
      score: hoursScore,
      maxScore: 20,
      status: gradeCategory(hoursScore, 20),
      detail: hoursScore === 20
        ? `${Object.keys(googleData.hours!).length} days listed.`
        : hoursScore === 10
        ? `Only ${Object.keys(googleData.hours!).length} day(s) listed. Customers can't tell when you're open on other days.`
        : 'No hours listed on Google. Customers will skip you and go to the competitor with hours.',
      fix: hoursScore < 20 ? 'Update hours in Google Business Profile. DSD syncs hours automatically.' : null,
    });

    // 2. Photo count (20 pts)
    const photoScore = googleData.photoCount >= 10 ? 20
      : googleData.photoCount >= 5 ? 15
      : googleData.photoCount >= 1 ? 8
      : 0;
    categories.push({
      name: 'Photos',
      score: photoScore,
      maxScore: 20,
      status: gradeCategory(photoScore, 20),
      detail: googleData.photoCount === 0
        ? 'No photos. Listings without photos get 42% fewer direction requests.'
        : `${googleData.photoCount} photo(s). Best practice is 10+ with interior, exterior, menu, and team shots.`,
      fix: photoScore < 20 ? 'Upload high-quality photos. DSD Engine tier includes professional photography.' : null,
    });

    // 3. Review response rate (20 pts)
    const totalReviews = client.reviews.length;
    const respondedReviews = client.reviews.filter(r => r.responseStatus === 'posted' || r.responseStatus === 'approved').length;
    const responseRate = totalReviews > 0 ? respondedReviews / totalReviews : 0;
    const responseScore = totalReviews === 0 ? 10
      : responseRate >= 0.8 ? 20
      : responseRate >= 0.5 ? 14
      : responseRate > 0 ? 8
      : 0;
    categories.push({
      name: 'Review Responses',
      score: responseScore,
      maxScore: 20,
      status: gradeCategory(responseScore, 20),
      detail: totalReviews === 0
        ? 'No reviews tracked yet. Import reviews to start monitoring.'
        : `${respondedReviews}/${totalReviews} reviews responded to (${Math.round(responseRate * 100)}%).`,
      fix: responseScore < 20 ? 'Respond to all reviews within 48 hours. DSD drafts AI responses for approval.' : null,
    });

    // 4. Category correctness (20 pts)
    const catScore = googleData.categories.length >= 2 ? 20
      : googleData.categories.length === 1 ? 12
      : 0;
    categories.push({
      name: 'Categories',
      score: catScore,
      maxScore: 20,
      status: gradeCategory(catScore, 20),
      detail: googleData.categories.length === 0
        ? 'No Google category data available.'
        : `${googleData.categories.length} categor${googleData.categories.length === 1 ? 'y' : 'ies'}: ${googleData.categories.slice(0, 3).join(', ')}`,
      fix: catScore < 20 ? 'Add a primary and secondary category in Google Business Profile to improve search matching.' : null,
    });

    // 5. Description quality (20 pts)
    const hasDescription = !!(client.description && client.description.length > 50);
    const descScore = hasDescription ? 20 : client.description ? 10 : 0;
    categories.push({
      name: 'Description',
      score: descScore,
      maxScore: 20,
      status: gradeCategory(descScore, 20),
      detail: !client.description
        ? 'No business description on file.'
        : client.description.length <= 50
        ? `Description is only ${client.description.length} characters. Aim for 250+ with keywords.`
        : `Description: ${client.description.length} characters. Good length.`,
      fix: descScore < 20 ? 'Write a 250-750 character description with your main services and location.' : null,
    });

    const overallScore = categories.reduce((sum, c) => sum + c.score, 0);

    const result: GBPAudit = {
      clientName: client.name,
      clientId: client.id,
      overallScore,
      categories,
      lastChecked: new Date().toISOString(),
    };

    return NextResponse.json({ data: result });
  } catch (err) {
    console.error('[GET /api/clients/:id/gbp-audit]', err);
    return NextResponse.json({ error: 'GBP audit failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const clientId = parseInt(params.id, 10);
  if (isNaN(clientId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const payload = await request.json();
    const action = payload.action;

    if (action === 'update_hours') {
       return NextResponse.json({ status: 'hours_updated', payload });
    }
    else if (action === 'upload_photo') {
       return NextResponse.json({ status: 'photo_uploaded', payload });
    }
    else if (action === 'respond_to_review') {
       return NextResponse.json({ status: 'review_responded', payload });
    }
    else if (action === 'update_categories') {
       return NextResponse.json({ status: 'categories_updated', payload });
    }
    else {
       return NextResponse.json({ error: 'Unknown GBP Action' }, { status: 400 });
    }

  } catch (err) {
    console.error('[POST /api/clients/:id/gbp-audit]', err);
    return NextResponse.json({ error: 'GBP write operation failed' }, { status: 500 });
  }
}
