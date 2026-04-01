export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

const BEEHIIV_API = 'https://api.beehiiv.com/v2';

// POST /api/newsletter/[id]/publish
// Publishes the newsletter issue to Beehiiv.
// Requires: BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID env vars (Phase 3).
export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // Fetch the issue from our database
    const issue = await prisma.newsletterIssue.findUnique({
      where: { id },
    });

    if (!issue) {
      return NextResponse.json({ error: 'Newsletter issue not found' }, { status: 404 });
    }

    if (issue.status === 'sent') {
      return NextResponse.json(
        { error: 'This issue has already been sent' },
        { status: 409 }
      );
    }

    // Beehiiv integration — Phase 3
    // Requires BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID to be set in env.
    if (!process.env.BEEHIIV_API_KEY || !process.env.BEEHIIV_PUBLICATION_ID) {
      // Graceful stub: mark as sent in our DB even without Beehiiv configured.
      // Remove this branch in Phase 3 once env vars are wired up.
      await prisma.newsletterIssue.update({
        where: { id },
        data: {
          status: 'sent',
          sendDate: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        beehiiv: false,
        message:
          'Issue marked as sent locally. Configure BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID to publish to Beehiiv.',
      });
    }

    // Build Beehiiv post payload from our issue content.
    // Beehiiv API reference: https://developers.beehiiv.com/docs/v2
    const beehiivPayload = {
      subject_line: issue.subject,
      // Beehiiv accepts HTML content for the post body
      content: buildBeehiivHtml(issue),
      // Schedule or send immediately
      status: issue.sendDate && issue.sendDate > new Date() ? 'scheduled' : 'draft',
      ...(issue.sendDate && issue.sendDate > new Date() && {
        scheduled_at: issue.sendDate.toISOString(),
      }),
    };

    const beehiivRes = await fetch(
      `${BEEHIIV_API}/publications/${process.env.BEEHIIV_PUBLICATION_ID}/posts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(beehiivPayload),
      }
    );

    if (!beehiivRes.ok) {
      const errorBody = await beehiivRes.text();
      console.error('[Beehiiv Error]', beehiivRes.status, errorBody);
      return NextResponse.json(
        { error: `Beehiiv API error: ${beehiivRes.status}`, details: errorBody },
        { status: 502 }
      );
    }

    const beehiivData = await beehiivRes.json();

    // Update our database to reflect the sent status
    const updatedIssue = await prisma.newsletterIssue.update({
      where: { id },
      data: {
        status: 'sent',
        sendDate: issue.sendDate ?? new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      beehiiv: true,
      beehiivPostId: beehiivData?.data?.id,
      issue: updatedIssue,
    });
  } catch (error) {
    console.error('[API Error] POST /api/newsletter/[id]/publish', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Build a simple HTML body for Beehiiv from our newsletter fields.
// In Phase 3, replace with a proper template engine or rich-text editor output.
function buildBeehiivHtml(issue: {
  storyTitle?: string | null;
  storyBody?: string | null;
  playlist?: string | null;
  reason?: string | null;
  quickHits?: string | null;
}): string {
  const sections: string[] = [];

  if (issue.storyTitle || issue.storyBody) {
    sections.push(`
      <h2>${issue.storyTitle ?? 'This Week\'s Story'}</h2>
      ${issue.storyBody ? `<p>${issue.storyBody.replace(/\n/g, '</p><p>')}</p>` : ''}
    `);
  }

  if (issue.playlist) {
    sections.push(`
      <h3>On the Radio</h3>
      <p>${issue.playlist}</p>
    `);
  }

  if (issue.reason) {
    sections.push(`
      <h3>Why You Should Go</h3>
      <p>${issue.reason}</p>
    `);
  }

  if (issue.quickHits) {
    let bullets: string[] = [];
    try {
      bullets = JSON.parse(issue.quickHits);
    } catch {
      bullets = issue.quickHits.split(',').map((s) => s.trim()).filter(Boolean);
    }
    if (bullets.length > 0) {
      sections.push(`
        <h3>Quick Hits</h3>
        <ul>
          ${bullets.map((b) => `<li>${b}</li>`).join('\n')}
        </ul>
      `);
    }
  }

  return sections.join('\n\n');
}
