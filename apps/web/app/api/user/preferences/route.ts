import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  const email = (session?.user as any)?.email;

  if (!email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      interfaceTheme: true,
      communicationStyle: true,
      communicationChannels: true,
      communicationPrefsUpdatedAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}
