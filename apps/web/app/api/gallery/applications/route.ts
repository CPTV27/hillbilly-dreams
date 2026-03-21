import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Basic validation
        if (!body.name || !body.email || !body.city || !body.state || !body.medium || !body.bio || !body.portfolioUrl) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const application = await prisma.artistApplication.create({
            data: {
                name: body.name,
                email: body.email,
                city: body.city,
                state: body.state,
                website: body.website || null,
                instagram: body.instagram || null,
                medium: body.medium,
                yearsActive: body.yearsActive || null,
                bio: body.bio,
                portfolioUrl: body.portfolioUrl,
                priceRange: body.priceRange || null,
                whyBCA: body.whyBCA || null,
                status: 'pending',
            }
        });

        // Try to dispatch a notification via the new shared library if possible
        try {
            // we could dispatch here to the ops channel
            console.log(`[Gallery] New artist application saved: ${application.id}`);
        } catch (dispatchErr) {
            console.error('Failed to dispatch notification', dispatchErr);
        }

        return NextResponse.json({ success: true, id: application.id });
    } catch (err: any) {
        console.error('Failed to save artist application:', err);
        return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
    }
}
