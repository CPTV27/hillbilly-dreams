/**
 * PublicQueries — read-only, sanitized data access for AI assistants and external users.
 *
 * RULE: These queries NEVER return billing, client financials, internal operations,
 * auth credentials, or strategic business data. If you're adding a new query here,
 * ask: "Would I be comfortable if a stranger saw this data?" If no, use PrivateQueries.
 */

import { prisma } from '../index';

// Domains safe for public AI assistant access
const PUBLIC_DOMAINS = ['touring', 'brand', 'product'] as const;

export const PublicQueries = {
  /** Published articles only — excludes internal fields */
  articles: (options?: { city?: string; category?: string; limit?: number }) =>
    prisma.article.findMany({
      where: {
        status: 'published',
        publishedAt: { not: null },
        ...(options?.city && { city: options.city }),
        ...(options?.category && { category: options.category }),
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        body: true,
        category: true,
        city: true,
        heroImage: true,
        author: true,
        publishedAt: true,
        // EXCLUDED: sourcePayload, clientId, createdAt, updatedAt
      },
      orderBy: { publishedAt: 'desc' },
      take: options?.limit || 20,
    }),

  /** Approved directory listings only — excludes billing and survey fields */
  directoryListings: (options?: { city?: string; category?: string; limit?: number }) =>
    prisma.directoryBusiness.findMany({
      where: {
        active: true,
        visibility: { in: ['approved', 'featured'] },
        ...(options?.city && { city: options.city }),
        ...(options?.category && { category: options.category }),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        subcategory: true,
        city: true,
        state: true,
        address: true,
        phone: true,
        website: true,
        description: true,
        spotlight: true,
        googleRating: true,
        googleReviewCount: true,
        yelpRating: true,
        hoursJson: true,
        photoUrls: true,
        // EXCLUDED: contactName, contactEmail, tier, toolsOrigin, softwareSpend,
        //           hearAbout, clientId, lastEnrichedAt, googlePlaceId, yelpBusinessId
      },
      orderBy: { name: 'asc' },
      take: options?.limit || 50,
    }),

  /** Upcoming events only */
  events: (options?: { limit?: number }) =>
    prisma.event.findMany({
      where: {
        status: 'upcoming',
        date: { gte: new Date() },
      },
      select: {
        id: true,
        name: true,
        date: true,
        time: true,
        artist: true,
        venue: true,
        status: true,
        price: true,
        stream: true,
        // EXCLUDED: capacity, notes, createdAt, updatedAt
      },
      orderBy: { date: 'asc' },
      take: options?.limit || 20,
    }),

  /** Public knowledge only — touring, brand, product domains */
  agentContext: (options?: { topic?: string; limit?: number }) =>
    prisma.agentContext.findMany({
      where: {
        domain: { in: [...PUBLIC_DOMAINS] },
        ...(options?.topic && { topic: options.topic }),
        OR: [
          { validUntil: null },
          { validUntil: { gt: new Date() } },
        ],
      },
      select: {
        key: true,
        content: true,
        domain: true,
        topic: true,
        confidence: true,
        // EXCLUDED: agentAuthor, source, id, createdAt, updatedAt
      },
      orderBy: { confidence: 'desc' },
      take: options?.limit || 30,
    }),

  /** Active playlists */
  playlists: (options?: { limit?: number }) =>
    prisma.playlist.findMany({
      where: { status: 'active' },
      select: {
        id: true,
        name: true,
        trackCount: true,
        status: true,
      },
      take: options?.limit || 10,
    }),

  /** Census and economic data — always public */
  economicData: (options?: { state?: string; limit?: number }) =>
    prisma.censusData.findMany({
      where: options?.state ? { state: options.state } : {},
      take: options?.limit || 50,
    }),
};
