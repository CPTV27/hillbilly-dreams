import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/auth';
import { requireRoleResponse } from '@/lib/requireRole';

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const roleError = requireRoleResponse(session, 'admin', 'ops', 'artist');
    if (roleError) return roleError;

    const { searchParams } = new URL(req.url);
    const sessionFilter = searchParams.get('session');

    const tasks = await prisma.launchTask.findMany({
        where: sessionFilter ? { session: parseInt(sessionFilter) } : undefined,
        include: { contentPack: true },
        orderBy: { taskNumber: 'asc' }
    });

    return NextResponse.json(tasks);
}
