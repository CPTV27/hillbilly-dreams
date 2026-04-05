export const dynamic = 'force-dynamic';
// POST /api/webhooks/github — GitHub Issues → Asana (HDI project) (#92).
// Configure org/repo webhook: issues events; secret = GITHUB_WEBHOOK_SECRET.
// Signature: X-Hub-Signature-256 (sha256 HMAC of raw body).

import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { apiLog } from '@/lib/api-logger';
import { completeTask, createTask, uncompleteTask } from '@/lib/asana-client';

const ASANA_PROJECT_GID = '1213753731475702';
const GITHUB_REPO_FULL = 'CPTV27/hillbilly-dreams';

function verifyGithubSignature256(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader?.startsWith('sha256=')) return false;
  const theirsHex = signatureHeader.slice(7);
  const expectedHex = createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');
  if (theirsHex.length !== expectedHex.length) return false;
  try {
    const a = Buffer.from(theirsHex, 'hex');
    const b = Buffer.from(expectedHex, 'hex');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

interface GhIssuesEventBody {
  action: string;
  repository?: { full_name?: string };
  issue: {
    number: number;
    title: string;
    html_url: string;
    body: string | null;
    state?: string;
    pull_request?: unknown;
  };
}

function parseAsanaGid(content: string | null | undefined): string | undefined {
  if (!content) return undefined;
  try {
    const j = JSON.parse(content) as { asanaGid?: string };
    return typeof j.asanaGid === 'string' ? j.asanaGid : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) {
    apiLog.warn('github/webhook', 'GITHUB_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const rawBody = await request.text();
  const sig = request.headers.get('x-hub-signature-256');
  if (!verifyGithubSignature256(rawBody, sig, secret)) {
    apiLog.warn('github/webhook', 'invalid signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = request.headers.get('x-github-event');
  if (event !== 'issues') {
    return NextResponse.json({ ok: true, ignored: true, event });
  }

  let payload: GhIssuesEventBody;
  try {
    payload = JSON.parse(rawBody) as GhIssuesEventBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const repoFull = payload.repository?.full_name;
  if (repoFull && repoFull !== GITHUB_REPO_FULL) {
    apiLog.info('github/webhook', 'ignored repo', { repoFull });
    return NextResponse.json({ ok: true, ignored: true });
  }

  const issue = payload.issue;
  if (!issue?.number || issue.pull_request) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const ctxKey = `issue-${issue.number}`;

  try {
    if (payload.action === 'opened') {
      const existing = await prisma.agentContext.findUnique({
        where: { domain_key: { domain: 'asana_sync', key: ctxKey } },
      });
      const existingGid = parseAsanaGid(existing?.content);
      if (existingGid) {
        return NextResponse.json({ ok: true, deduped: true, asanaGid: existingGid });
      }

      const taskName = `[#${issue.number}] ${issue.title}`;
      const notes = `${issue.html_url}\n\n${(issue.body || '').slice(0, 7900)}`;
      const asanaGid = await createTask(ASANA_PROJECT_GID, taskName, notes);

      await prisma.agentContext.upsert({
        where: { domain_key: { domain: 'asana_sync', key: ctxKey } },
        create: {
          domain: 'asana_sync',
          topic: 'github-mirror',
          key: ctxKey,
          content: JSON.stringify({ asanaGid, title: issue.title, state: 'open' }),
          source: 'webhook:github-issues',
        },
        update: {
          content: JSON.stringify({ asanaGid, title: issue.title, state: 'open' }),
          source: 'webhook:github-issues',
        },
      });

      return NextResponse.json({ ok: true, asanaGid });
    }

    if (payload.action === 'closed') {
      const existing = await prisma.agentContext.findUnique({
        where: { domain_key: { domain: 'asana_sync', key: ctxKey } },
      });
      const asanaGid = parseAsanaGid(existing?.content);
      if (asanaGid) {
        await completeTask(asanaGid);
        await prisma.agentContext.update({
          where: { domain_key: { domain: 'asana_sync', key: ctxKey } },
          data: {
            content: JSON.stringify({ asanaGid, title: issue.title, state: 'closed' }),
          },
        });
      } else {
        apiLog.info('github/webhook', 'closed issue has no Asana mapping', { issue: issue.number });
      }
      return NextResponse.json({ ok: true, completed: Boolean(asanaGid) });
    }

    if (payload.action === 'reopened') {
      const existing = await prisma.agentContext.findUnique({
        where: { domain_key: { domain: 'asana_sync', key: ctxKey } },
      });
      const asanaGid = parseAsanaGid(existing?.content);
      if (asanaGid) {
        await uncompleteTask(asanaGid);
        await prisma.agentContext.update({
          where: { domain_key: { domain: 'asana_sync', key: ctxKey } },
          data: {
            content: JSON.stringify({ asanaGid, title: issue.title, state: 'open' }),
          },
        });
      }
      return NextResponse.json({ ok: true, reopened: Boolean(asanaGid) });
    }

    return NextResponse.json({ ok: true, ignoredAction: payload.action });
  } catch (e) {
    apiLog.error('github/webhook', 'handler error', e, { issue: issue.number, action: payload.action });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
