export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await auth();
  const email = (session?.user as any)?.email;

  if (!email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json();

  // ── Validate existing fields ──
  const validThemes = ['futuristic', 'retro', 'minimal'];
  if (body.interfaceTheme && !validThemes.includes(body.interfaceTheme)) {
    return NextResponse.json({ error: 'Invalid interfaceTheme' }, { status: 400 });
  }

  const validStyles = ['bulleted_brief', 'detailed_warm', 'data_heavy'];
  if (body.communicationStyle && !validStyles.includes(body.communicationStyle)) {
    return NextResponse.json({ error: 'Invalid communicationStyle' }, { status: 400 });
  }

  const validChannels = ['asana', 'email', 'google_chat', 'sms', 'slack'];
  if (body.communicationChannels && Array.isArray(body.communicationChannels)) {
    for (const ch of body.communicationChannels) {
      if (!validChannels.includes(ch)) {
        return NextResponse.json({ error: `Invalid channel: ${ch}` }, { status: 400 });
      }
    }
  }

  // ── Validate new fields ──
  const validBrands = ['BMT', 'Storefront', 'Corporate'];
  if (body.brandAffiliation && !validBrands.includes(body.brandAffiliation)) {
    return NextResponse.json({ error: 'Invalid brandAffiliation' }, { status: 400 });
  }

  const validSigStyles = ['classic', 'minimal', 'bold'];
  if (body.signatureStyle && !validSigStyles.includes(body.signatureStyle)) {
    return NextResponse.json({ error: 'Invalid signatureStyle' }, { status: 400 });
  }

  const validNotifyTo = ['personal', 'business', 'both'];
  if (body.notifyTo && !validNotifyTo.includes(body.notifyTo)) {
    return NextResponse.json({ error: 'Invalid notifyTo' }, { status: 400 });
  }

  // Build update payload — only include fields that were provided
  const data: Record<string, unknown> = {
    onboardingStep: 'completed',
    communicationPrefsUpdatedAt: new Date(),
    onboardingCompletedAt: new Date(),
  };

  // Existing fields
  if (body.interfaceTheme) data.interfaceTheme = body.interfaceTheme;
  if (body.communicationStyle) data.communicationStyle = body.communicationStyle;
  if (body.communicationChannels) data.communicationChannels = body.communicationChannels;

  // Identity fields
  if (body.preferredName !== undefined) data.preferredName = body.preferredName;
  if (body.personalEmail !== undefined) data.personalEmail = body.personalEmail;
  if (body.businessEmail !== undefined) data.businessEmail = body.businessEmail;
  if (body.jobTitle !== undefined) data.jobTitle = body.jobTitle;
  if (body.brandAffiliation) data.brandAffiliation = body.brandAffiliation;
  if (body.notifyTo) data.notifyTo = body.notifyTo;

  // Signature fields
  if (body.avatarUrl !== undefined) data.avatarUrl = body.avatarUrl;
  if (body.signatureStyle) data.signatureStyle = body.signatureStyle;
  if (body.bioBlurb !== undefined) data.bioBlurb = body.bioBlurb;
  if (body.phoneDisplay !== undefined) data.phoneDisplay = body.phoneDisplay;

  const user = await prisma.user.update({
    where: { email },
    data,
  });

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      preferredName: (user as any).preferredName,
      businessEmail: (user as any).businessEmail,
      jobTitle: (user as any).jobTitle,
      brandAffiliation: (user as any).brandAffiliation,
      signatureStyle: (user as any).signatureStyle,
      interfaceTheme: user.interfaceTheme,
      communicationStyle: user.communicationStyle,
      communicationChannels: user.communicationChannels,
      onboardingStep: user.onboardingStep,
    },
  });
}
