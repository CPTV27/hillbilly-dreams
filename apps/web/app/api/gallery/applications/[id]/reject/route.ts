export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';


export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const appId = params.id;

        const application = await prisma.artistApplication.update({
            where: { id: appId },
            data: { status: 'rejected' },
        });

        // Redirect back to ops gallery page
        return NextResponse.redirect(new URL('/ops/gallery', req.url), 303);
    } catch (err: any) {
        console.error('Failed to reject artist application:', err);
        return NextResponse.json({ error: 'Failed to process application rejection', details: err.message }, { status: 500 });
    }
}
