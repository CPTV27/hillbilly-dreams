import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/auth';
import { requireRoleResponse } from '@/lib/requireRole';

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const roleError = requireRoleResponse(session, 'admin', 'ops', 'artist');
    if (roleError) return roleError;

    const activities = await prisma.opsActivity.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
    });

    return NextResponse.json(activities);
}
