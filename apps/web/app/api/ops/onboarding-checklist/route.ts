export const dynamic = 'force-dynamic';
// app/api/ops/onboarding-checklist/route.ts
// POST — Generate and dispatch the ops setup checklist after team member onboarding.
// Sends to Chase via email + creates Asana task.

import { NextRequest, NextResponse } from 'next/server';
import { dispatchToChannel, BMT_EMAILS } from '@bigmuddy/shared';

export async function POST(req: NextRequest) {
  let body: {
    preferredName: string;
    businessEmail: string;
    personalEmail: string;
    jobTitle: string;
    brandAffiliation: string;
    signatureStyle: string;
    bioBlurb?: string;
    phoneDisplay?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.preferredName || !body.jobTitle) {
    return NextResponse.json({ error: 'preferredName and jobTitle required' }, { status: 400 });
  }

  const emailAddr = body.businessEmail || `${body.preferredName.toLowerCase().replace(/\s+/g, '.')}@bigmuddytouring.com`;

  const checklist = [
    `## New Team Member Setup: ${body.preferredName}`,
    `**Title:** ${body.jobTitle}`,
    `**Brand:** ${body.brandAffiliation || 'BMT'}`,
    `**Personal Email:** ${body.personalEmail}`,
    `**Business Email:** ${emailAddr}`,
    '',
    '### Setup Checklist',
    `- [ ] Create Google Workspace account: ${emailAddr}`,
    `- [ ] Add to QuickBooks Online as employee/contractor`,
    `- [ ] Connect bank account in QBO (ask ${body.preferredName} for routing/account info)`,
    `- [ ] Add to Asana workspace`,
    `- [ ] Set up email signature (${body.signatureStyle || 'classic'} style)`,
    body.bioBlurb ? `  - Bio: "${body.bioBlurb}"` : '',
    body.phoneDisplay ? `  - Phone: ${body.phoneDisplay}` : '',
    `- [ ] Add to admin allowlist in admin-auth.ts if needed`,
    `- [ ] Send welcome email with login credentials`,
  ].filter(Boolean).join('\n');

  try {
    // Email the checklist to Chase
    await dispatchToChannel('email', {
      triggerId: 'team_onboarding_checklist',
      recipientEmail: BMT_EMAILS.admin,
      subject: `New Team Setup: ${body.preferredName} — ${body.jobTitle}`,
      body: checklist,
      priority: 'high',
    });

    // Create Asana task
    await dispatchToChannel('asana', {
      triggerId: 'team_onboarding_checklist',
      recipientEmail: BMT_EMAILS.admin,
      subject: `Onboard ${body.preferredName} (${body.jobTitle}) — Setup Checklist`,
      body: checklist,
      priority: 'high',
    });

    console.log(`[Onboarding] Checklist dispatched for ${body.preferredName}`);
  } catch (err) {
    console.error('[Onboarding] Dispatch failed (non-blocking):', err);
  }

  return NextResponse.json({ success: true, checklist });
}
