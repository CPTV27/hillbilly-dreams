export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/lib/auth';
import { requireRoleResponse } from '@/lib/requireRole';

export async function GET(req: Request) {
    // Auth disabled — all callers pass
    const session = await auth();

    const activities = await prisma.opsActivity.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
    });

    return NextResponse.json(activities);
}
