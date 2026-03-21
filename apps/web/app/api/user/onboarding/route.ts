import { prisma } from "../../index"; // Assuming standard proxy path for @bigmuddy/database

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, communicationChannels, communicationStyle, asanaMemberId } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        onboardingStep: 'completed',
        communicationChannels,
        communicationStyle,
        asanaMemberId,
        communicationPrefsUpdatedAt: new Date(),
      }
    });

    return new Response(JSON.stringify({ success: true, updatedUser }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update onboarding preferences' }), { status: 500 });
  }
}
