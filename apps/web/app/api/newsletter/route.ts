export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

// GET /api/newsletter
// Query params: ?status=draft|scheduled|sent&limit=20&page=1
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const [issues, total] = await Promise.all([
      prisma.newsletterIssue.findMany({
        where: {
          ...(status && { status }),
        },
        orderBy: { issueNumber: 'desc' },
        take: limit,
        skip,
      }),
      prisma.newsletterIssue.count({
        where: {
          ...(status && { status }),
        },
      }),
    ]);

    return NextResponse.json({
      issues,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[API Error] GET /api/newsletter', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/newsletter
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.issueNumber) {
      return NextResponse.json(
        { error: 'issueNumber is required' },
        { status: 400 }
      );
    }
    if (!body.subject) {
      return NextResponse.json(
        { error: 'subject is required' },
        { status: 400 }
      );
    }

    const issue = await prisma.newsletterIssue.create({
      data: {
        issueNumber: parseInt(body.issueNumber),
        subject: body.subject,
        storyTitle: body.storyTitle || null,
        storyBody: body.storyBody || null,
        playlist: body.playlist || null,
        reason: body.reason || null,
        quickHits: Array.isArray(body.quickHits) ? JSON.stringify(body.quickHits) : (body.quickHits || null),
        status: body.status || 'draft',
        sendDate: body.sendDate ? new Date(body.sendDate) : null,
      },
    });

    return NextResponse.json(issue, { status: 201 });
  } catch (error: unknown) {
    console.error('[API Error] POST /api/newsletter', error);
    // Unique constraint violation on issueNumber
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'An issue with that number already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
