export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * GET /api/admin/system-health
 * Booleans only for env — never return secret values.
 */
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  let databaseOk = false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    databaseOk = true;
  } catch {
    databaseOk = false;
  }

  const ragBase = process.env.RAG_HEALTH_URL || 'http://127.0.0.1:8090';
  let ragOk = false;
  let ragMessage: string | null = null;
  try {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 2500);
    const r = await fetch(`${ragBase.replace(/\/$/, '')}/health`, { signal: ac.signal });
    clearTimeout(t);
    ragOk = r.ok;
    if (!r.ok) ragMessage = `HTTP ${r.status}`;
  } catch (e) {
    ragMessage = e instanceof Error ? e.message : String(e);
  }

  const asanaPat = Boolean(process.env.ASANA_PAT || process.env.ASANA_ACCESS_TOKEN);

  return NextResponse.json({
    ok: true,
    database: databaseOk,
    deploy: {
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      createdAt: process.env.VERCEL_DEPLOYMENT_CREATED_AT ?? null,
    },
    build: {
      nodeEnv: process.env.NODE_ENV ?? null,
      vercelEnv: process.env.VERCEL_ENV ?? null,
    },
    rag: { ok: ragOk, baseUrl: ragBase, message: ragMessage },
    env: {
      googleApplicationCredentialsJson: Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
      stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
      metaAppId: Boolean(process.env.META_APP_ID),
      asanaPat,
      cloudbedsApiKey: Boolean(process.env.CLOUDBEDS_API_KEY),
      cronSecret: Boolean(process.env.CRON_SECRET),
    },
  });
}
