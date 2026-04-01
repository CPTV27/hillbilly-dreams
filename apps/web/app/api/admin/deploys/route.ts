export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

// Vercel API integration for deployment status
// Uses VERCEL_TOKEN env var for authentication

interface VercelDeployment {
  uid: string;
  name: string;
  url: string;
  state: string;
  created: number;
  meta?: {
    githubCommitRef?: string;
    githubCommitSha?: string;
    githubCommitMessage?: string;
  };
  target?: string | null;
}

async function fetchVercelDeployments(): Promise<VercelDeployment[]> {
  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    console.warn('[Deploys API] VERCEL_TOKEN not set — returning mock data');
    return [];
  }

  try {
    const projectId = process.env.VERCEL_PROJECT_ID || 'hillbilly-dreams';
    const teamId = process.env.VERCEL_TEAM_ID;
    const params = new URLSearchParams({
      projectId,
      limit: '30',
      ...(teamId ? { teamId } : {}),
    });

    const res = await fetch(
      `https://api.vercel.com/v6/deployments?${params}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 30 },
      }
    );

    if (!res.ok) {
      console.error('[Deploys API] Vercel API error:', res.status);
      return [];
    }

    const data = await res.json();
    return data.deployments || [];
  } catch (err) {
    console.error('[Deploys API] Failed to fetch from Vercel:', err);
    return [];
  }
}

function mapVercelState(state: string): 'live' | 'building' | 'pending' | 'error' {
  switch (state) {
    case 'READY': return 'live';
    case 'BUILDING': return 'building';
    case 'QUEUED': return 'pending';
    case 'INITIALIZING': return 'pending';
    case 'ERROR': return 'error';
    case 'CANCELED': return 'error';
    default: return 'pending';
  }
}

function classifyEnv(deploy: VercelDeployment): 'production' | 'staging' | 'sandbox' {
  if (deploy.target === 'production') return 'production';
  const branch = deploy.meta?.githubCommitRef || '';
  if (branch.startsWith('feature/') || branch.startsWith('fix/')) return 'staging';
  if (branch.startsWith('claude/') || branch.startsWith('ag-')) return 'sandbox';
  if (branch === 'main') return 'production';
  return 'sandbox';
}

function extractFeatures(message: string): string[] {
  const features: string[] = [];
  const lower = message.toLowerCase();
  if (lower.includes('oauth') || lower.includes('auth')) features.push('auth');
  if (lower.includes('consent') || lower.includes('privacy')) features.push('privacy');
  if (lower.includes('sovereign') || lower.includes('box') || lower.includes('pi')) features.push('sovereign-box');
  if (lower.includes('jp') || lower.includes('welcome')) features.push('onboarding');
  if (lower.includes('tenant') || lower.includes('studio c') || lower.includes('tuthill')) features.push('multi-tenant');
  if (lower.includes('creative') || lower.includes('imagen') || lower.includes('veo')) features.push('creative-hub');
  if (lower.includes('radio') || lower.includes('broadcast')) features.push('radio');
  if (lower.includes('whiteboard') || lower.includes('tour')) features.push('presentation');
  if (lower.includes('directory') || lower.includes('dsd')) features.push('directory');
  if (lower.includes('ecosystem') || lower.includes('dashboard')) features.push('dashboard');
  return features;
}

export async function GET() {
  const vercelDeploys = await fetchVercelDeployments();

  if (vercelDeploys.length === 0) {
    // Fallback: static data from known branch state
    // This gets replaced once VERCEL_TOKEN is set
    const fallbackDeployments = [
      {
        env: 'production' as const,
        name: 'Big Muddy Platform',
        branch: 'main',
        status: 'live' as const,
        url: 'https://bigmuddytouring.com',
        lastCommit: 'Sovereign Box spec + OAuth fix + JP page',
        lastCommitDate: new Date().toLocaleDateString(),
        features: ['auth', 'onboarding', 'sovereign-box', 'multi-tenant'],
      },
      {
        env: 'staging' as const,
        name: 'Honest Data Consent',
        branch: 'feature/honest-data-consent',
        status: 'building' as const,
        url: undefined,
        lastCommit: 'PrivacyConsentDialog + consent API + schema',
        lastCommitDate: new Date().toLocaleDateString(),
        features: ['privacy', 'onboarding', 'multi-tenant'],
      },
      {
        env: 'sandbox' as const,
        name: 'AG Tour Redesign',
        branch: 'ag-tour-redesign',
        status: 'pending' as const,
        url: undefined,
        lastCommit: 'Presentation layer redesign (AG)',
        lastCommitDate: '3/28/2026',
        features: ['presentation', 'onboarding'],
      },
      {
        env: 'sandbox' as const,
        name: 'Editorial Copy Overhaul',
        branch: 'editorial/copy-overhaul-and-qa',
        status: 'pending' as const,
        url: undefined,
        lastCommit: 'Brand narrative + copy refresh',
        lastCommitDate: '3/28/2026',
        features: ['presentation', 'directory'],
      },
    ];

    return NextResponse.json({ deployments: fallbackDeployments, source: 'fallback' });
  }

  // Group by branch, take latest per branch
  const byBranch = new Map<string, VercelDeployment>();
  for (const d of vercelDeploys) {
    const branch = d.meta?.githubCommitRef || 'unknown';
    if (!byBranch.has(branch)) {
      byBranch.set(branch, d);
    }
  }

  const deployments = Array.from(byBranch.values()).map(d => ({
    env: classifyEnv(d),
    name: d.meta?.githubCommitRef === 'main'
      ? 'Big Muddy Platform'
      : (d.meta?.githubCommitRef || 'Unknown branch').replace(/^(feature|fix|claude|ag-)\//, '').replace(/-/g, ' '),
    branch: d.meta?.githubCommitRef || 'unknown',
    status: mapVercelState(d.state),
    url: d.state === 'READY' ? `https://${d.url}` : undefined,
    lastCommit: (d.meta?.githubCommitMessage || '').slice(0, 80),
    lastCommitDate: new Date(d.created).toLocaleDateString(),
    features: extractFeatures(d.meta?.githubCommitMessage || ''),
  }));

  // Sort: production first, then staging, then sandbox
  const order = { production: 0, staging: 1, sandbox: 2 };
  deployments.sort((a, b) => order[a.env] - order[b.env]);

  return NextResponse.json({ deployments, source: 'vercel' });
}
