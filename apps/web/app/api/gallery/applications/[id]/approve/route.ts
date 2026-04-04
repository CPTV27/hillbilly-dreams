export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import Stripe from 'stripe';
import { dispatchToChannel } from '@bigmuddy/shared';
import { requireAdmin } from '@/lib/admin-auth';

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const denied = await requireAdmin();
    if (denied) return denied;

    try {
        const appId = params.id;

        const application = await prisma.artistApplication.findUnique({
            where: { id: appId },
        });

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        if (application.status !== 'PENDING') {
            return NextResponse.json({ error: 'Application already processed' }, { status: 400 });
        }

        // Soft FK: look up user separately (cross-sovereign, no @relation)
        const user = await prisma.user.findUnique({ where: { id: application.userId } });
        const artistEmail = user?.email ?? '';
        const artistName = user?.name ?? 'Artist';

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
            apiVersion: '2024-06-20' as any,
        });

        const account = await stripe.accounts.create({
            type: 'express',
            email: artistEmail || undefined,
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
            business_type: 'individual',
            business_profile: {
                url: application.portfolioUrl || undefined,
                product_description: 'Artist on Venture Gallery.',
            },
        });

        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/gallery/apply/refresh`,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/gallery/apply/success`,
            type: 'account_onboarding',
        });

        await prisma.artistApplication.update({
            where: { id: appId },
            data: { status: 'APPROVED', stripeAccountId: account.id },
        });

        const slug = artistName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const uniqueSlug = `${slug.substring(0, 30)}-${Date.now().toString().slice(-4)}`;

        await prisma.artistProfile.create({
            data: {
                name: artistName,
                slug: uniqueSlug,
                bio: application.artistStatement,
                status: 'pending',
                stripeAccountId: account.id,
            },
        });

        try {
            await dispatchToChannel('email', {
                triggerId: 'gallery_artist_approved',
                recipientEmail: artistEmail,
                subject: 'Welcome to Venture Gallery! Complete your profile setup.',
                body: `🎨 *New Artist Approved:* ${artistName}!\n\nStripe Onboarding Link:\n${accountLink.url}`,
                priority: 'high',
            });
        } catch (dispatchErr) {
            console.error('Failed to dispatch notification', dispatchErr);
        }

        return NextResponse.redirect(new URL('/ops/gallery', req.url), 303);

    } catch (err: any) {
        console.error('Failed to approve artist application:', err);
        return NextResponse.json({ error: 'Failed to process application approval', details: err.message }, { status: 500 });
    }
}
