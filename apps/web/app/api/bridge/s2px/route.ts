// ── S2PX → BMT Bridge Ingest Endpoint ──
// Receives HMAC-signed payloads from S2PX and creates draft articles.
// No session auth — HMAC is the only security gate.
// Middleware skips /api routes, so no NextAuth session required.

import { NextRequest, NextResponse } from 'next/server';
import { verifyPayload, isTimestampValid, type SignedPayload } from '@/lib/hmac';

// ── Types matching S2PX payload shape ──

interface SanitizedProject {
  upid: string;
  city: string;
  state: string;
  buildingType: string;
  totalSqft: number | null;
  numFloors: number | null;
  era: string | null;
  scanScope: string | null;
  scannerType: string | null;
  lodDelivered: string | null;
  disciplines: string[];
  georeferenced: boolean;
  scanAccuracyMm: number | null;
  qcStatus: string | null;
  completedAt: string;
  buildingFeatures: string[];
}

interface ArticleDraft {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  city: string;
  author: string;
  readTime: string;
}

interface BridgePayload {
  project: SanitizedProject;
  article: ArticleDraft;
}

// ── POST /api/bridge/s2px ──

export async function POST(request: NextRequest) {
  // 1. Read the secret
  const secret = process.env.BMT_BRIDGE_SECRET;
  if (!secret) {
    console.error('[bridge/s2px] BMT_BRIDGE_SECRET not configured');
    return NextResponse.json(
      { error: 'Bridge not configured' },
      { status: 500 }
    );
  }

  // 2. Parse the signed payload
  let payload: SignedPayload<BridgePayload>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  // 3. Validate structure
  if (!payload.version || !payload.timestamp || !payload.data || !payload.signature) {
    return NextResponse.json(
      { error: 'Missing required fields: version, timestamp, data, signature' },
      { status: 400 }
    );
  }

  // 4. Verify HMAC signature
  try {
    if (!verifyPayload(payload, secret)) {
      console.warn('[bridge/s2px] HMAC verification failed');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error('[bridge/s2px] HMAC verification error:', err);
    return NextResponse.json(
      { error: 'Signature verification failed' },
      { status: 401 }
    );
  }

  // 5. Check timestamp freshness (5 minute window)
  if (!isTimestampValid(payload.timestamp)) {
    return NextResponse.json(
      { error: 'Payload timestamp expired or invalid' },
      { status: 401 }
    );
  }

  // 6. Extract article + project data
  const { project, article } = payload.data;

  if (!project?.upid || !article?.slug) {
    return NextResponse.json(
      { error: 'Missing project.upid or article.slug in payload' },
      { status: 400 }
    );
  }

  // 7. Create draft article in database
  try {
    const { default: prisma } = await import('@bigmuddy/database');

    // Check for duplicate — same source project already ingested
    const existing = await (prisma as any).article.findFirst({
      where: {
        sourceSystem: 's2px',
        sourceProjectId: project.upid,
      },
    });

    if (existing) {
      console.log(`[bridge/s2px] Duplicate detected for ${project.upid} — updating existing article ${existing.id}`);

      const updated = await (prisma as any).article.update({
        where: { id: existing.id },
        data: {
          title: article.title,
          slug: article.slug,
          category: article.category,
          city: article.city || null,
          author: article.author,
          excerpt: article.excerpt || null,
          body: article.body || null,
          readTime: article.readTime || null,
          sourcePayload: JSON.stringify(project),
          sourceSyncedAt: new Date(),
        },
      });

      return NextResponse.json({
        message: 'Article updated (duplicate source project)',
        data: { id: updated.id, slug: updated.slug, status: updated.status },
      });
    }

    // Handle slug collision — append timestamp suffix
    let finalSlug = article.slug;
    const slugExists = await (prisma as any).article.findUnique({
      where: { slug: finalSlug },
    });

    if (slugExists) {
      finalSlug = `${article.slug}-${Date.now()}`;
    }

    const created = await (prisma as any).article.create({
      data: {
        title: article.title,
        slug: finalSlug,
        category: article.category,
        city: article.city || null,
        author: article.author,
        status: 'draft',
        excerpt: article.excerpt || null,
        body: article.body || null,
        readTime: article.readTime || null,
        sourceSystem: 's2px',
        sourceProjectId: project.upid,
        sourcePayload: JSON.stringify(project),
        sourceSyncedAt: new Date(),
      },
    });

    console.log(`[bridge/s2px] Created draft article ${created.id} from ${project.upid}`);

    return NextResponse.json(
      {
        message: 'Draft article created',
        data: { id: created.id, slug: created.slug, status: created.status },
      },
      { status: 201 }
    );
  } catch (dbError: unknown) {
    const message = dbError instanceof Error ? dbError.message : 'Unknown database error';

    if (
      message.includes('datasource') ||
      message.includes('DATABASE_URL') ||
      message.includes('Cannot find module') ||
      message.includes('P1001') ||
      message.includes('P1003')
    ) {
      return NextResponse.json(
        { error: 'Database not available', code: 'DATABASE_UNAVAILABLE' },
        { status: 503 }
      );
    }

    console.error('[bridge/s2px] Database error:', dbError);
    return NextResponse.json(
      { error: 'Failed to create article', message },
      { status: 500 }
    );
  }
}
