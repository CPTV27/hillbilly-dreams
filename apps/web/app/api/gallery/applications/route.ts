export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const body = await req.json();

        if (!body.portfolioUrl || !body.artistStatement) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const sessionEmail = session.user.email.trim().toLowerCase();
        if (body.email && String(body.email).trim().toLowerCase() !== sessionEmail) {
            return NextResponse.json({ error: 'Email must match signed-in user' }, { status: 403 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found in system' }, { status: 403 });
        }

        const application = await prisma.artistApplication.create({
            data: {
                userId: user.id,
                portfolioUrl: body.portfolioUrl,
                artistStatement: body.artistStatement,
                status: 'PENDING',
            }
        });

        return NextResponse.json({ success: true, id: application.id });
    } catch (err: any) {
        console.error('Failed to save artist application:', err);
        return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
    }
}
