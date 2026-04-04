/**
 * Seed the ProductFeature, ProductBundle, and BundleFeature tables.
 *
 * Run: npx tsx packages/database/scripts/seed-product-catalog.ts
 *
 * This seeds the full competitive feature matrix (20 SaaS-replacement categories
 * + 7 unique media/moat features) and creates starter bundles for pricing exploration.
 * Bundles have NO prices set — pricing is TBD and will be decided through testing.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding product catalog...');

  // ── FEATURES: SaaS Replacement Categories ──────────────────────────

  const features = [
    // Software replacements (what competitors charge for)
    // ── PARITY AUDIT (April 2026) ──
    // Each feature tagged with honest parity verdict from deep research.
    // metadata.parity = "full" | "partial" | "not-comparable" | "dsd-advantage"
    // metadata.honestClaim = what we can actually say to customers
    // metadata.gap = what the competitor does that we can't match

    { slug: 'business-listing', name: 'Business Listing Sync', category: 'software', competitor: 'Yext', competitorPrice: 19900, status: 'shipped', tags: ['core', 'saas-replacement'], description: 'Sync business info across Google, Apple, Bing, and Facebook. Fix wrong hours, addresses, and phone numbers.', sortOrder: 1, metadata: { parity: 'partial', honestClaim: 'We sync your listings and they stay fixed. Yext reverts your data if you stop paying — ours is permanent.', gap: 'Yext syncs to 200+ directories. We cover the ones that matter for Main Street (Google, Apple, Bing, FB, Yelp).' } },
    { slug: 'review-management', name: 'Review Monitoring & Response', category: 'software', competitor: 'Birdeye', competitorPrice: 32000, status: 'shipped', tags: ['core', 'saas-replacement'], description: 'Alert on new Google/Yelp reviews. AI drafts responses, you approve with one tap.', sortOrder: 2, metadata: { parity: 'partial', honestClaim: 'We monitor your reviews and draft AI responses you approve. Simple and fast.', gap: 'Birdeye has deep SMS automation and review solicitation campaigns. We do monitoring + response, not outbound campaigns.' } },
    { slug: 'social-scheduling', name: 'Social Media Scheduling', category: 'software', competitor: 'Hootsuite', competitorPrice: 12000, status: 'building', tags: ['core', 'saas-replacement'], description: 'AI generates posts from your photos and events. Schedule and publish to Facebook, Instagram, and Google Business.', sortOrder: 3, metadata: { parity: 'full', honestClaim: 'Hootsuite is an empty box — it publishes whatever you put in. We give you the photos AND publish them.', gap: 'Hootsuite supports more platforms (TikTok, Pinterest, Twitter). We focus on FB, IG, Google — where Main Street customers actually look.' } },
    { slug: 'email-marketing', name: 'Email Marketing & Newsletter', category: 'software', competitor: 'Mailchimp', competitorPrice: 7500, status: 'building', tags: ['saas-replacement'], description: 'Monthly newsletter with your latest reviews, photos, and events. Automated, branded, sent to your customer list.', sortOrder: 4, metadata: { parity: 'full', honestClaim: 'Mailchimp has become too expensive for small lists. Your newsletter is included in your DSD subscription.', gap: 'Mailchimp has advanced automation sequences. We do monthly newsletters, not drip campaigns.' } },
    { slug: 'seo-tools', name: 'Local SEO Basics', category: 'software', competitor: 'Semrush', competitorPrice: 11900, status: 'shipped', tags: ['saas-replacement'], description: 'GBP keyword tracking and on-page SEO for your DSD profile. Not a full SEO suite — the 20% that matters.', sortOrder: 5, metadata: { parity: 'not-comparable', honestClaim: 'We handle the local SEO basics that actually move the needle for a Main Street business. We are not Semrush.', gap: 'Semrush is a nuclear reactor. We are a lightbulb. Different tools for different jobs. Do not claim parity.' } },
    { slug: 'crm', name: 'Simple Customer List', category: 'software', competitor: 'HubSpot', competitorPrice: 5000, status: 'shipped', tags: ['saas-replacement'], description: 'A simple Rolodex — name, email, last visit. Auto-populated from reviews, bookings, and social. The customer list Main Street actually wants.', sortOrder: 6, metadata: { parity: 'full', honestClaim: 'Main Street hates HubSpot complexity. They just want a list they can text or email. That is what we give you.', gap: 'HubSpot has pipeline stages, deal tracking, automation. We have a contact list. For a 3-person restaurant, ours is better.' } },
    { slug: 'invoicing', name: 'Simple Payments', category: 'software', competitor: 'FreshBooks', competitorPrice: 2500, status: 'shipped', tags: ['saas-replacement'], description: 'A "Pay Now" button via Stripe. Send invoice links, track payments. Not accounting software — a digital cash register.', sortOrder: 7, metadata: { parity: 'partial', honestClaim: 'We handle simple invoicing and payment links. For tax prep and complex accounting, keep QuickBooks.', gap: 'FreshBooks handles tax categorization, expense tracking, time billing. We are just a payment button.' } },
    { slug: 'booking-reservations', name: 'Online Reservation Widget', category: 'software', competitor: 'OpenTable / Cloudbeds', competitorPrice: 24900, status: 'building', tags: ['saas-replacement'], description: 'A "Request a Table" or "Book a Room" form on your listing. Syncs with Cloudbeds for hotels. NOT a table management system.', sortOrder: 8, metadata: { parity: 'not-comparable', honestClaim: 'We replace your online reservation WIDGET, not your reservation SYSTEM. OpenTable owns a diner network we cannot match.', gap: 'OpenTable has floor maps, table management, and 2,000 diners/month from the app. We have a booking form. BIGGEST HONESTY RISK — never claim to replace OpenTable.' } },
    { slug: 'content-calendar', name: 'Content Calendar', category: 'software', competitor: 'CoSchedule', competitorPrice: 2900, status: 'shipped', tags: ['saas-replacement'], description: 'Plan and schedule all content across social, email, and magazine from one calendar view.', sortOrder: 9, metadata: { parity: 'full', honestClaim: 'See everything you are publishing this month in one view.', gap: 'CoSchedule has team approval workflows. We have a calendar.' } },
    { slug: 'analytics', name: 'One-Number Analytics', category: 'software', competitor: 'GA4 + extras', competitorPrice: 2500, status: 'shipped', tags: ['core', 'saas-replacement'], description: 'How many people clicked your Call button? How many asked for directions? One page, plain English. Not a data warehouse.', sortOrder: 10, metadata: { parity: 'dsd-advantage', honestClaim: 'GA4 is impossible for humans to read. Our One Number report tells you what actually happened this month.', gap: 'GA4 can slice data 50 ways. We show you the 3 numbers that matter. For Main Street, this is a feature, not a bug.' } },
    { slug: 'video-production', name: 'Video Production', category: 'creative', competitor: 'Agency retainer', competitorPrice: 60000, status: 'building', tags: ['saas-replacement'], description: 'We visit your business and shoot video. Social clips, promo reels, event recaps. A software company cannot visit Natchez.', sortOrder: 11, metadata: { parity: 'dsd-advantage', honestClaim: 'No software company can walk into your restaurant and film a 30-second reel. We can.', gap: 'A dedicated agency produces higher volume. We produce 1 hero video or 4 reels per quarter.' } },
    { slug: 'ai-content', name: 'AI Content Writing', category: 'software', competitor: 'Jasper / Writer', competitorPrice: 5900, status: 'shipped', tags: ['core', 'saas-replacement'], description: 'AI writes social posts, review responses, email copy, and article drafts. Trained on your business context.', sortOrder: 12, metadata: { parity: 'partial', honestClaim: 'Our AI knows your town, your menu, your reviews. Jasper is generic. Ours is local.', gap: 'Jasper has brand voice training and long-form workflows. Our AI is best at short-form (posts, replies, captions).' } },
    { slug: 'poster-design', name: 'Ready-Made Graphics', category: 'creative', competitor: 'Canva Pro / designer', competitorPrice: 1500, status: 'shipped', tags: ['saas-replacement'], description: 'We provide the final graphics — event posters, social images, marketing materials. You do not need to learn an editor.', sortOrder: 13, metadata: { parity: 'partial', honestClaim: 'Canva is a world-class editor. We do not build an editor — we deliver the finished files.', gap: 'Canva lets you design anything. We provide pre-made, branded templates and finished assets.' } },
    { slug: 'event-promotion', name: 'Event Promotion', category: 'software', competitor: 'Eventbrite + ads', competitorPrice: 5000, status: 'shipped', tags: ['saas-replacement'], description: 'Create events, promote across social + radio + magazine. No per-ticket fees like Eventbrite.', sortOrder: 14, metadata: { parity: 'dsd-advantage', honestClaim: 'Eventbrite charges fees and gives you a listing. We promote your event on the radio and in the magazine.', gap: 'Eventbrite has a massive discovery network. Our promotion is local but deeper (radio + magazine + directory).' } },
    { slug: 'task-management', name: 'Simple To-Do List', category: 'operations', competitor: 'Asana', competitorPrice: 3000, status: 'shipped', tags: ['saas-replacement'], description: 'A simple task list for the business owner. Not project management — just what needs doing this week.', sortOrder: 15, metadata: { parity: 'not-comparable', honestClaim: 'We include a simple to-do list. If you need full project management, use Asana — this claim is feature bloat.', gap: 'No one uses Asana for a 3-person restaurant. Consider dropping this from the comparison entirely.' } },
    { slug: 'knowledge-base', name: 'Digital Filing Cabinet', category: 'operations', competitor: 'Notion', competitorPrice: 2000, status: 'shipped', tags: ['saas-replacement'], description: 'Store employee handbooks, standard menus, and business docs. AI-searchable. A filing cabinet, not a wiki builder.', sortOrder: 16, metadata: { parity: 'partial', honestClaim: 'A place to store your important business documents, searchable by AI.', gap: 'Notion is for builders and teams. We are a filing cabinet. Different tools.' } },
    { slug: 'ecommerce', name: 'Online Gift Cards & Merch Store', category: 'software', competitor: 'Shopify', competitorPrice: 3900, status: 'shipped', tags: ['saas-replacement'], description: 'Sell gift cards, merch, prints, and simple products online via Stripe. NOT a full ecommerce platform with shipping/inventory.', sortOrder: 17, metadata: { parity: 'not-comparable', honestClaim: 'We replace your online gift card and merch store, not your entire ecommerce operation.', gap: 'Shopify has shipping, inventory, tax, 6,000+ apps. We have a Stripe-powered product page. NEVER claim to replace Shopify.' } },
    { slug: 'competitor-watch', name: 'Competitor Snapshot', category: 'software', competitor: 'Semrush / SpyFu', competitorPrice: 9900, status: 'shipped', tags: ['saas-replacement'], description: 'See what the shop across the street is doing — their review count, Google rating, social activity. Public data only.', sortOrder: 18, metadata: { parity: 'partial', honestClaim: 'We show you what your competitors are doing with publicly visible data.', gap: 'SpyFu sees hidden ad spend and keyword bids. We only see what is public.' } },
    { slug: 'gbp-audit', name: 'Google Business Profile Audit', category: 'software', competitor: 'BrightLocal', competitorPrice: 3500, status: 'building', tags: ['saas-replacement'], description: 'Score your Google listing health 0-100. Fix recommendations. BrightLocal gives you a report — we include the photography to actually fix it.', sortOrder: 19, metadata: { parity: 'dsd-advantage', honestClaim: 'BrightLocal tells you your photos are bad. We send a photographer to fix them.', gap: 'BrightLocal has citation tracking across hundreds of directories. We focus on the GBP score.' } },
    { slug: 'monthly-report', name: 'Monthly Report PDF', category: 'software', competitor: 'AgencyAnalytics', competitorPrice: 1800, status: 'building', tags: ['core', 'saas-replacement'], description: 'Branded PDF report delivered monthly. Plain English: what happened, what worked, what to do next.', sortOrder: 20, metadata: { parity: 'full', honestClaim: 'A clean, branded report in your inbox on the 1st of every month. Easy to automate, highly valued by owners.', gap: 'AgencyAnalytics has live dashboards. We send a PDF. For Main Street, the PDF is better.' } },

    // Unique media features (THE MOAT — no competitor has these)
    { slug: 'magazine-feature', name: 'Magazine Editorial Coverage', category: 'media', competitor: 'PR agency', competitorPrice: 300000, isUnique: true, status: 'shipped', tags: ['moat', 'media'], description: 'Full editorial feature article about your business in Big Muddy Magazine. Print and digital distribution.', sortOrder: 101 },
    { slug: 'radio-airplay', name: 'Radio Airplay & Mentions', category: 'media', competitor: 'Local radio buy', competitorPrice: 50000, isUnique: true, status: 'building', tags: ['moat', 'media'], description: 'On-air mentions, commercial spots, and DJ shoutouts on Big Muddy Radio.', sortOrder: 102 },
    { slug: 'professional-photography', name: 'Professional Photography', category: 'creative', competitor: 'Freelancer avg', competitorPrice: 40000, isUnique: true, status: 'shipped', tags: ['moat', 'media', 'hero-bundle'], description: 'Chase Pierson shoots your business. Professional photos for social, listings, and marketing. One session per year.', sortOrder: 103 },
    { slug: 'touring-promotion', name: 'Touring Circuit Promotion', category: 'media', competitor: 'Event marketing agency', competitorPrice: 100000, isUnique: true, status: 'shipped', tags: ['moat', 'media'], description: 'Your business promoted to touring audiences. Musicians and their fans routed to your door.', sortOrder: 104 },
    { slug: 'wifi-portal', name: 'WiFi Captive Portal', category: 'media', competitor: 'Purple WiFi', competitorPrice: 10000, isUnique: true, status: 'shipped', tags: ['moat', 'media'], description: 'Capture email addresses from every WiFi login at partner venues. Tonight\'s show, your business, one tap.', sortOrder: 105 },
    { slug: 'plex-tv', name: 'In-Room TV Channels', category: 'media', competitor: null, competitorPrice: null, isUnique: true, status: 'building', tags: ['moat', 'media'], description: 'Your business featured on branded TV channels playing in hotel rooms and partner venues via Plex.', sortOrder: 106 },
    { slug: 'record-label', name: 'Record Label Ecosystem', category: 'media', competitor: null, competitorPrice: null, isUnique: true, status: 'shipped', tags: ['moat', 'media'], description: 'Big Muddy Records brings audiences to the corridor. Your business benefits from the music ecosystem.', sortOrder: 107 },
  ];

  for (const f of features) {
    await prisma.productFeature.upsert({
      where: { slug: f.slug },
      update: { ...f },
      create: { ...f },
    });
  }

  console.log(`  ${features.length} features seeded.`);

  // ── BUNDLES: Starter tiers for pricing exploration ─────────────────
  // Prices are NULL — intentionally. Pricing is TBD.

  const bundles = [
    { slug: 'free', name: 'Free', description: 'Basic directory listing. The door opener.', market: 'general', sortOrder: 1 },
    { slug: 'starter', name: 'Starter', description: 'Core digital tools. Listings, reviews, analytics. For the business that just wants to be found.', market: 'general', sortOrder: 2 },
    { slug: 'pro', name: 'Pro', description: 'Full marketing engine. Social, email, content calendar, competitor watch. For the business that wants to grow.', market: 'general', sortOrder: 3 },
    { slug: 'media', name: 'Media', description: 'Everything in Pro plus magazine features, radio airplay, and professional photography. The full media company in your corner.', market: 'general', sortOrder: 4 },

    // Market-specific bundles (for exploration)
    { slug: 'restaurant', name: 'Restaurant Package', description: 'Tuned for restaurants: menu sync, review responses, photography, magazine feature.', market: 'restaurant', sortOrder: 10 },
    { slug: 'hotel', name: 'Hotel Package', description: 'Tuned for lodging: Cloudbeds sync, WiFi portal, in-room TV, touring traffic.', market: 'hotel', sortOrder: 11 },
    { slug: 'musician', name: 'Musician Package', description: 'Tuned for artists: distribution, sync licensing, showcase slots, touring circuit.', market: 'musician', sortOrder: 12 },
    { slug: 'venue', name: 'Venue Package', description: 'Tuned for venues: event promotion, radio spots, photography, touring partnership.', market: 'venue', sortOrder: 13 },
  ];

  for (const b of bundles) {
    await prisma.productBundle.upsert({
      where: { slug: b.slug },
      update: { ...b },
      create: { ...b },
    });
  }

  console.log(`  ${bundles.length} bundles seeded.`);

  // ── BUNDLE-FEATURE MAPPING ─────────────────────────────────────────
  // Map which features go in which bundle. This is the matrix to iterate on.

  const allFeatures = await prisma.productFeature.findMany();
  const allBundles = await prisma.productBundle.findMany();
  const f = (slug: string) => allFeatures.find(x => x.slug === slug)!.id;
  const b = (slug: string) => allBundles.find(x => x.slug === slug)!.id;

  const mappings: Array<{ bundleId: number; featureId: number; limit?: string; notes?: string }> = [
    // Free tier
    { bundleId: b('free'), featureId: f('business-listing'), limit: 'basic', notes: 'Directory listing only' },
    { bundleId: b('free'), featureId: f('analytics'), limit: 'basic', notes: 'View count only' },

    // Starter tier
    { bundleId: b('starter'), featureId: f('business-listing') },
    { bundleId: b('starter'), featureId: f('review-management'), notes: 'Monitor + alerts, AI drafts' },
    { bundleId: b('starter'), featureId: f('seo-tools'), limit: 'basic' },
    { bundleId: b('starter'), featureId: f('analytics') },
    { bundleId: b('starter'), featureId: f('monthly-report') },
    { bundleId: b('starter'), featureId: f('ai-content'), limit: '1/week' },
    { bundleId: b('starter'), featureId: f('competitor-watch'), limit: '1 competitor' },
    { bundleId: b('starter'), featureId: f('event-promotion') },
    { bundleId: b('starter'), featureId: f('gbp-audit'), limit: 'quarterly' },

    // Pro tier
    { bundleId: b('pro'), featureId: f('business-listing') },
    { bundleId: b('pro'), featureId: f('review-management') },
    { bundleId: b('pro'), featureId: f('social-scheduling'), limit: '4/week' },
    { bundleId: b('pro'), featureId: f('email-marketing') },
    { bundleId: b('pro'), featureId: f('seo-tools') },
    { bundleId: b('pro'), featureId: f('crm') },
    { bundleId: b('pro'), featureId: f('content-calendar') },
    { bundleId: b('pro'), featureId: f('analytics') },
    { bundleId: b('pro'), featureId: f('monthly-report') },
    { bundleId: b('pro'), featureId: f('ai-content'), limit: '4/week' },
    { bundleId: b('pro'), featureId: f('poster-design') },
    { bundleId: b('pro'), featureId: f('competitor-watch'), limit: '3 competitors' },
    { bundleId: b('pro'), featureId: f('event-promotion') },
    { bundleId: b('pro'), featureId: f('task-management') },
    { bundleId: b('pro'), featureId: f('knowledge-base') },
    { bundleId: b('pro'), featureId: f('ecommerce') },
    { bundleId: b('pro'), featureId: f('gbp-audit'), limit: 'monthly' },

    // Media tier (everything in Pro + moat)
    { bundleId: b('media'), featureId: f('business-listing') },
    { bundleId: b('media'), featureId: f('review-management') },
    { bundleId: b('media'), featureId: f('social-scheduling') },
    { bundleId: b('media'), featureId: f('email-marketing') },
    { bundleId: b('media'), featureId: f('seo-tools') },
    { bundleId: b('media'), featureId: f('crm') },
    { bundleId: b('media'), featureId: f('invoicing') },
    { bundleId: b('media'), featureId: f('booking-reservations') },
    { bundleId: b('media'), featureId: f('content-calendar') },
    { bundleId: b('media'), featureId: f('analytics') },
    { bundleId: b('media'), featureId: f('monthly-report') },
    { bundleId: b('media'), featureId: f('video-production') },
    { bundleId: b('media'), featureId: f('ai-content') },
    { bundleId: b('media'), featureId: f('poster-design') },
    { bundleId: b('media'), featureId: f('competitor-watch'), limit: '5 competitors' },
    { bundleId: b('media'), featureId: f('event-promotion') },
    { bundleId: b('media'), featureId: f('task-management') },
    { bundleId: b('media'), featureId: f('knowledge-base') },
    { bundleId: b('media'), featureId: f('ecommerce') },
    { bundleId: b('media'), featureId: f('gbp-audit'), limit: 'weekly' },
    { bundleId: b('media'), featureId: f('magazine-feature'), limit: 'quarterly', notes: 'One feature article per quarter' },
    { bundleId: b('media'), featureId: f('radio-airplay'), limit: 'monthly', notes: 'Monthly on-air mention' },
    { bundleId: b('media'), featureId: f('professional-photography'), limit: '1/year', notes: 'One professional photoshoot per year' },
    { bundleId: b('media'), featureId: f('touring-promotion') },
    { bundleId: b('media'), featureId: f('wifi-portal') },
    { bundleId: b('media'), featureId: f('plex-tv') },

    // Restaurant package (market-specific)
    { bundleId: b('restaurant'), featureId: f('business-listing') },
    { bundleId: b('restaurant'), featureId: f('review-management') },
    { bundleId: b('restaurant'), featureId: f('social-scheduling'), limit: '4/week' },
    { bundleId: b('restaurant'), featureId: f('professional-photography'), limit: '1/year', notes: 'Menu + interior shoot' },
    { bundleId: b('restaurant'), featureId: f('magazine-feature'), limit: '1/year', notes: 'Annual restaurant feature' },
    { bundleId: b('restaurant'), featureId: f('analytics') },
    { bundleId: b('restaurant'), featureId: f('monthly-report') },
    { bundleId: b('restaurant'), featureId: f('gbp-audit'), limit: 'monthly' },

    // Hotel package
    { bundleId: b('hotel'), featureId: f('business-listing') },
    { bundleId: b('hotel'), featureId: f('review-management') },
    { bundleId: b('hotel'), featureId: f('booking-reservations') },
    { bundleId: b('hotel'), featureId: f('wifi-portal') },
    { bundleId: b('hotel'), featureId: f('plex-tv') },
    { bundleId: b('hotel'), featureId: f('touring-promotion') },
    { bundleId: b('hotel'), featureId: f('professional-photography'), limit: '2/year', notes: 'Seasonal property shoots' },
    { bundleId: b('hotel'), featureId: f('analytics') },
    { bundleId: b('hotel'), featureId: f('monthly-report') },

    // Musician package
    { bundleId: b('musician'), featureId: f('business-listing'), notes: 'Artist profile in directory' },
    { bundleId: b('musician'), featureId: f('social-scheduling'), limit: '4/week' },
    { bundleId: b('musician'), featureId: f('record-label') },
    { bundleId: b('musician'), featureId: f('touring-promotion') },
    { bundleId: b('musician'), featureId: f('radio-airplay'), limit: 'weekly', notes: 'Regular rotation' },
    { bundleId: b('musician'), featureId: f('event-promotion') },
    { bundleId: b('musician'), featureId: f('ecommerce'), notes: 'Merch + music sales' },

    // Venue package
    { bundleId: b('venue'), featureId: f('business-listing') },
    { bundleId: b('venue'), featureId: f('review-management') },
    { bundleId: b('venue'), featureId: f('event-promotion') },
    { bundleId: b('venue'), featureId: f('radio-airplay'), limit: 'per event', notes: 'Radio spot per booked show' },
    { bundleId: b('venue'), featureId: f('professional-photography'), limit: '1/year' },
    { bundleId: b('venue'), featureId: f('touring-promotion') },
    { bundleId: b('venue'), featureId: f('poster-design') },
    { bundleId: b('venue'), featureId: f('analytics') },
  ];

  // Upsert all mappings
  for (const m of mappings) {
    await prisma.bundleFeature.upsert({
      where: { bundleId_featureId: { bundleId: m.bundleId, featureId: m.featureId } },
      update: { limit: m.limit || null, notes: m.notes || null },
      create: { bundleId: m.bundleId, featureId: m.featureId, limit: m.limit || null, notes: m.notes || null },
    });
  }

  console.log(`  ${mappings.length} bundle-feature mappings seeded.`);
  console.log('Product catalog seeding complete.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
