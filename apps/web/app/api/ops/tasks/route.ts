export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/lib/auth';
import { requireRoleResponse } from '@/lib/requireRole';

export async function GET(req: Request) {
    // Auth disabled — all callers pass
    const session = await auth();

    const { searchParams } = new URL(req.url);
    const sessionFilter = searchParams.get('session');

    const tasks = await prisma.launchTask.findMany({
        where: sessionFilter ? { session: parseInt(sessionFilter) } : undefined,
        include: { contentPack: true },
        orderBy: { taskNumber: 'asc' }
    });

    return NextResponse.json(tasks);
}
