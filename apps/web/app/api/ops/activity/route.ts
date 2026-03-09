import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/auth';

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const activities = await prisma.opsActivity.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
    });

    return NextResponse.json(activities);
}
