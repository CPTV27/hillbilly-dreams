export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

// GET /api/newsletter/[id]
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const issue = await prisma.newsletterIssue.findUnique({
      where: { id },
    });

    if (!issue) {
      return NextResponse.json({ error: 'Newsletter issue not found' }, { status: 404 });
    }

    return NextResponse.json(issue);
  } catch (error) {
    console.error('[API Error] GET /api/newsletter/[id]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/newsletter/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();

    // Build update data — only include defined fields
    const data: Record<string, unknown> = {};
    if (body.issueNumber !== undefined) data.issueNumber = parseInt(body.issueNumber);
    if (body.subject !== undefined) data.subject = body.subject;
    if (body.storyTitle !== undefined) data.storyTitle = body.storyTitle;
    if (body.storyBody !== undefined) data.storyBody = body.storyBody;
    if (body.playlist !== undefined) data.playlist = body.playlist;
    if (body.reason !== undefined) data.reason = body.reason;
    if (body.quickHits !== undefined) data.quickHits = body.quickHits;
    if (body.status !== undefined) data.status = body.status;
    if (body.sendDate !== undefined) {
      data.sendDate = body.sendDate ? new Date(body.sendDate) : null;
    }

    const issue = await prisma.newsletterIssue.update({
      where: { id },
      data,
    });

    return NextResponse.json(issue);
  } catch (error: unknown) {
    console.error('[API Error] PUT /api/newsletter/[id]', error);
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Newsletter issue not found' }, { status: 404 });
    }
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

// DELETE /api/newsletter/[id]
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await prisma.newsletterIssue.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error('[API Error] DELETE /api/newsletter/[id]', error);
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Newsletter issue not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
