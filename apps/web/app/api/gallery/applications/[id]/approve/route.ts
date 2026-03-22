import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import Stripe from 'stripe';
import { dispatchForUser, dispatchToChannel } from '@bigmuddy/shared';

// Force dynamic execution for POST requests
export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const appId = params.id;

        const application = await prisma.artistApplication.findUnique({
            where: { id: appId },
        });

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        if (application.status !== 'pending') {
            return NextResponse.json({ error: 'Application already processed' }, { status: 400 });
        }

        // Initialize Stripe
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
            apiVersion: '2024-06-20' as any,
        });

        // 1. Create a Stripe Express Account for the artist
        const account = await stripe.accounts.create({
            type: 'express',
            email: application.email,
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
            business_type: 'individual',
            business_profile: {
                url: application.portfolioUrl || application.website || undefined,
                product_description: `Artist on BuyCurious Art Marketplace. Medium: ${application.medium}`,
            },
        });

        // 2. Generate Account Link for Onboarding
        // Ensure you have an appropriate callback URL
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/gallery/apply/refresh`,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/gallery/apply/success`,
            type: 'account_onboarding',
        });

        // 3. Mark Application as Approved & Update schema
        const approvedApp = await prisma.artistApplication.update({
            where: { id: appId },
            data: { status: 'approved' },
        });

        // 4. Create the Artist Profile in the Database
        const slug = application.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        // ensure unique slug
        const prefix = slug.substring(0, 30);
        const uniqueSlug = `${prefix}-${Date.now().toString().slice(-4)}`;

        const profile = await prisma.artistProfile.create({
            data: {
                name: application.name,
                slug: uniqueSlug,
                bio: application.bio,
                city: application.city,
                state: application.state,
                medium: application.medium,
                website: application.website,
                instagram: application.instagram,
                status: 'pending', // Pending until they finish Stripe onboarding
                stripeAccountId: account.id,
            }
        });

        // 5. Fire off a webhook/dispatch to let the team know to email the artist
        try {
            await dispatchToChannel('email', {
                triggerId: 'gallery_artist_approved',
                recipientEmail: application.email,
                subject: `Welcome to BuyCurious Art! Complete your profile setup.`,
                body: `🎨 *New Artist Approved:* ${application.name}!\n\nHere is your unique Stripe Onboarding Link to get activated:\n${accountLink.url}`,
                priority: 'high'
            });
        } catch (dispatchErr) {
            console.error('Failed to dispatch notification', dispatchErr);
        }

        // Redirect back to ops gallery page
        return NextResponse.redirect(new URL('/ops/gallery', req.url), 303);

    } catch (err: any) {
        console.error('Failed to approve artist application:', err);
        return NextResponse.json({ error: 'Failed to process application approval', details: err.message }, { status: 500 });
    }
}
