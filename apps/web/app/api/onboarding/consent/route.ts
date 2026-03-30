import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { profileType, dataTier, consentTimestamp } = await request.json();

    if (!profileType || !dataTier) {
      return NextResponse.json(
        { error: 'Missing profileType or dataTier' },
        { status: 400 }
      );
    }

    // Update user record with consent data and advance onboarding
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        profileType,
        dataTier,
        consentVersion: '1.0',
        consentTimestamp: new Date(consentTimestamp),
        onboardingStep: 'complete',
        onboardingCompletedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      onboardingStep: 'complete',
      profileType,
      dataTier,
    });
  } catch (error) {
    console.error('[Onboarding Consent]', error);
    return NextResponse.json(
      { error: 'Failed to record consent' },
      { status: 500 }
    );
  }
}
