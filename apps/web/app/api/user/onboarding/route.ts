import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  const session = await auth();
  const email = (session?.user as any)?.email;

  if (!email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json();
  const { interfaceTheme, communicationStyle, communicationChannels } = body;

  // Validate interfaceTheme
  const validThemes = ['futuristic', 'retro', 'minimal'];
  if (interfaceTheme && !validThemes.includes(interfaceTheme)) {
    return NextResponse.json({ error: 'Invalid interfaceTheme' }, { status: 400 });
  }

  // Validate communicationStyle
  const validStyles = ['bulleted_brief', 'detailed_warm', 'data_heavy'];
  if (communicationStyle && !validStyles.includes(communicationStyle)) {
    return NextResponse.json({ error: 'Invalid communicationStyle' }, { status: 400 });
  }

  // Validate communicationChannels
  const validChannels = ['asana', 'email', 'google_chat', 'sms', 'slack'];
  if (communicationChannels && Array.isArray(communicationChannels)) {
    for (const ch of communicationChannels) {
      if (!validChannels.includes(ch)) {
        return NextResponse.json({ error: `Invalid channel: ${ch}` }, { status: 400 });
      }
    }
  }

  const user = await prisma.user.update({
    where: { email },
    data: {
      ...(interfaceTheme && { interfaceTheme }),
      ...(communicationStyle && { communicationStyle }),
      ...(communicationChannels && { communicationChannels }),
      onboardingStep: 'completed',
      communicationPrefsUpdatedAt: new Date(),
    },
  });

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      interfaceTheme: user.interfaceTheme,
      communicationStyle: user.communicationStyle,
      communicationChannels: user.communicationChannels,
      onboardingStep: user.onboardingStep,
    },
  });
}
