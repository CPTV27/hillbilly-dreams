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
