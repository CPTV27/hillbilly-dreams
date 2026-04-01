export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate basic fields
        if (!body.portfolioUrl || !body.artistStatement || !body.email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // We find the user by their email (which we passed from the client session)
        // In a strictly secure setup, we would use NextAuth getServerSession() here directly
        // to grab the canonical user identity. But we resolve user by email for this scaffold.
        const user = await prisma.user.findUnique({
            where: { email: body.email }
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

        console.log(`[BCA Gallery] New artist application created: ${application.id} for user ${user.id}`);

        return NextResponse.json({ success: true, id: application.id });
    } catch (err: any) {
        console.error('Failed to save artist application:', err);
        return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
    }
}
