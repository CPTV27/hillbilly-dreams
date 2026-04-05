export const dynamic = 'force-dynamic';
// ── Multi-Tenant Bridge Ingest Endpoint ──
// Receives HMAC-signed payloads from any registered bridge client.
// Auth flow:
//   1. x-api-key header  → lookup client in BridgeClient table
//   2. x-api-secret header → bcrypt.compare against stored hash (authenticates)
//   3. raw secret from header → verify HMAC-SHA256 signature (payload integrity)
// Falls back to BMT_BRIDGE_SECRET env var for legacy/single-tenant mode.

import { NextRequest, NextResponse } from 'next/server';
import { apiLog } from '@/lib/api-logger';
import bcrypt from 'bcryptjs';
import { verifyPayload, isTimestampValid, type SignedPayload } from '@/lib/hmac';
import { prisma } from '@/lib/db';

// ── Generic payload types ──

interface ArticleDraft {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  city?: string;
  author: string;
  readTime?: string;
}

interface BridgePayload {
  project?: Record<string, unknown>; // Opaque project metadata (stored as sourcePayload)
  article: ArticleDraft;
}

// ── Resolve HMAC secret: multi-tenant or legacy ──

type ClientResolved = { secret: string; clientName: string; clientId: number | null };
type ClientError = { error: string; status: number };

async function resolveClient(
  request: NextRequest
): Promise<ClientResolved | ClientError> {
  const apiKey = request.headers.get('x-api-key');
  const apiSecret = request.headers.get('x-api-secret');

  if (apiKey) {
    // Multi-tenant mode: look up client by API key
    try {
      const client = await (prisma as any).bridgeClient.findUnique({
        where: { apiKey },
      });

      if (!client) {
        return { error: 'Unknown API key', status: 401 };
      }
      if (client.status !== 'active') {
        return { error: 'Client suspended', status: 403 };
      }

      // Determine the HMAC secret: prefer x-api-secret header (new protocol)
      // Fall back to stored value for legacy clients with plaintext secrets
      if (apiSecret) {
        // New protocol: verify raw secret against bcrypt hash
        const secretValid = await bcrypt.compare(apiSecret, client.apiSecret);
        if (!secretValid) {
          return { error: 'Invalid API secret', status: 401 };
        }
        return {
          secret: apiSecret, // Use raw secret from header for HMAC verification
          clientName: client.name.toLowerCase().replace(/\s+/g, '-'),
          clientId: client.id,
        };
      }

      // Legacy fallback: stored secret is plaintext (pre-migration clients)
      // Detect by checking if stored value looks like a bcrypt hash
      if (client.apiSecret.startsWith('$2')) {
        // Stored value is hashed — can't use without x-api-secret header
        return {
          error: 'x-api-secret header required (client secret is hashed)',
          status: 401,
        };
      }

      // Plaintext legacy secret — use directly for HMAC
      return {
        secret: client.apiSecret,
        clientName: client.name.toLowerCase().replace(/\s+/g, '-'),
        clientId: client.id,
      };
    } catch (err) {
      console.error('[bridge/ingest] Client lookup error:', err);
      return { error: 'Client lookup failed', status: 500 };
    }
  }

  // Legacy single-tenant mode: use env var
  const envSecret = process.env.BMT_BRIDGE_SECRET;
  if (!envSecret) {
    return { error: 'Bridge not configured (no x-api-key header and no BMT_BRIDGE_SECRET)', status: 500 };
  }
  return { secret: envSecret, clientName: 's2px', clientId: null };
}

// ── POST /api/bridge/ingest ──

export async function POST(request: NextRequest) {
  // 1. Resolve client + secret
  const resolved = await resolveClient(request);
  if ('error' in resolved) {
    return NextResponse.json({ error: resolved.error }, { status: resolved.status });
  }
  const client = resolved;

  // 2. Parse the signed payload
  let payload: SignedPayload<BridgePayload>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
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
    if (!verifyPayload(payload, client.secret)) {
      console.warn(`[bridge/ingest] HMAC verification failed for client: ${client.clientName}`);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  } catch (err) {
    console.error('[bridge/ingest] HMAC verification error:', err);
    return NextResponse.json({ error: 'Signature verification failed' }, { status: 401 });
  }

  // 5. Check timestamp freshness (5 minute window)
  if (!isTimestampValid(payload.timestamp)) {
    return NextResponse.json(
      { error: 'Payload timestamp expired or invalid' },
      { status: 401 }
    );
  }

  // 6. Extract article data
  const { project, article } = payload.data;

  if (!article?.slug || !article?.title) {
    return NextResponse.json(
      { error: 'Missing article.slug or article.title in payload' },
      { status: 400 }
    );
  }

  // Derive a source project ID from project metadata or slug
  const sourceProjectId = (project as any)?.upid ?? article.slug;

  // 7. Create draft article in database
  try {

    // Check for duplicate — same source project already ingested by this client
    const existing = await (prisma as any).article.findFirst({
      where: {
        sourceSystem: client.clientName,
        sourceProjectId,
      },
    });

    if (existing) {
      apiLog.info('bridge/ingest', 'duplicate source project; updating article', {
        client: client.clientName,
        sourceProjectId,
        articleId: existing.id,
      });

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
          sourcePayload: project ? JSON.stringify(project) : null,
          sourceSyncedAt: new Date(),
        },
      });

      // Update client lastSyncAt
      if (client.clientId) {
        await (prisma as any).bridgeClient.update({
          where: { id: client.clientId },
          data: { lastSyncAt: new Date() },
        });
      }

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
        sourceSystem: client.clientName,
        sourceProjectId,
        sourcePayload: project ? JSON.stringify(project) : null,
        sourceSyncedAt: new Date(),
      },
    });

    // Update client lastSyncAt
    if (client.clientId) {
      await (prisma as any).bridgeClient.update({
        where: { id: client.clientId },
        data: { lastSyncAt: new Date() },
      });
    }

    apiLog.info('bridge/ingest', 'created draft article', {
      articleId: created.id,
      client: client.clientName,
      sourceProjectId,
    });

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

    console.error('[bridge/ingest] Database error:', dbError);
    return NextResponse.json(
      { error: 'Failed to create article', message },
      { status: 500 }
    );
  }
}
