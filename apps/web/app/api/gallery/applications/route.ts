import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { dispatchToChannel, BMT_EMAILS } from '@bigmuddy/shared';

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

        // Dispatch notifications to BMT Ops
        try {
            // 1. Email notification → artists@bigmuddytouring.com (routes to Amy + Asana)
            await dispatchToChannel('email', {
                triggerId: 'gallery_artist_application',
                recipientEmail: BMT_EMAILS.artists,
                subject: `New Artist Application: ${body.name} — ${body.medium}`,
                body: [
                    `🎨 *New Artist Application*`,
                    ``,
                    `**Name:** ${body.name}`,
                    `**Email:** ${body.email}`,
                    `**Location:** ${body.city}, ${body.state}`,
                    `**Medium:** ${body.medium}`,
                    `**Years Active:** ${body.yearsActive || 'Not specified'}`,
                    `**Portfolio:** ${body.portfolioUrl}`,
                    `**Price Range:** ${body.priceRange || 'Not specified'}`,
                    body.instagram ? `**Instagram:** ${body.instagram}` : '',
                    body.website ? `**Website:** ${body.website}` : '',
                    ``,
                    `**Bio:**`,
                    body.bio,
                    ``,
                    body.whyBCA ? `**Why BCA:**\n${body.whyBCA}` : '',
                    ``,
                    `Reply directly to this email to reach the applicant.`,
                ].filter(Boolean).join('\n'),
                priority: 'high',
            });

            // 2. Asana task creation → auto-generates a task in BMT workspace
            await dispatchToChannel('asana', {
                triggerId: 'gallery_artist_application',
                recipientEmail: BMT_EMAILS.artists,
                subject: `Review Artist Application: ${body.name} (${body.medium})`,
                body: [
                    `Portfolio: ${body.portfolioUrl}`,
                    `Email: ${body.email}`,
                    `Location: ${body.city}, ${body.state}`,
                    body.priceRange ? `Price Range: ${body.priceRange}` : '',
                ].filter(Boolean).join('\n'),
                priority: 'normal',
            });

            console.log(`[Gallery] New artist application dispatched: ${application.id}`);
        } catch (dispatchErr) {
            // Don't fail the submission if notifications fail
            console.error('Failed to dispatch notification', dispatchErr);
        }

        return NextResponse.json({ success: true, id: application.id });
    } catch (err: any) {
        console.error('Failed to save artist application:', err);
        return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
    }
}

