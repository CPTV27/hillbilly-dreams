export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/lib/auth';
import { requireRoleResponse } from '@/lib/requireRole';

export async function GET(req: Request) {
    // Auth disabled — all callers pass
    const session = await auth();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
        const pack = await prisma.contentPack.findUnique({
            where: { slug }
        });
        if (!pack) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(pack);
    } else {
        const packs = await prisma.contentPack.findMany({
            orderBy: { title: 'asc' }
        });
        return NextResponse.json(packs);
    }
}
