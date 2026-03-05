// apps/web/lib/structured-data.ts

export const siteUrl = 'https://bigmuddytouring.com';
export const defaultLogo = 'https://storage.googleapis.com/bmt-media-bigmuddy/brand/bmt-logo-dark.png';

// Organization schema for Big Muddy Touring
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Big Muddy Touring',
        url: siteUrl,
        logo: defaultLogo,
        sameAs: [
            'https://instagram.com/bigmuddytouring',
            'https://twitter.com/bigmuddytouring',
            'https://facebook.com/bigmuddytouring',
        ],
    };
}

// WebSite schema with SearchAction
export function getWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Big Muddy Touring',
        url: siteUrl,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };
}

// Article schema (for city guide pages)
export function getArticleSchema({
    headline,
    authorName = 'Big Muddy Touring',
    datePublished,
    dateModified,
    images,
}: {
    headline: string;
    authorName?: string;
    datePublished: string;
    dateModified?: string;
    images: string[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        image: images,
        author: {
            '@type': 'Person',
            name: authorName,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Big Muddy Touring',
            logo: {
                '@type': 'ImageObject',
                url: defaultLogo,
            },
        },
        datePublished,
        dateModified: dateModified || datePublished,
    };
}

// Event schema (for events)
export function getEventSchema({
    name,
    startDate,
    endDate,
    locationName,
    locationAddress,
    offersUrl,
    image,
}: {
    name: string;
    startDate: string;
    endDate?: string;
    locationName: string;
    locationAddress: string;
    offersUrl?: string;
    image?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name,
        startDate,
        ...(endDate && { endDate }),
        ...(image && { image }),
        location: {
            '@type': 'Place',
            name: locationName,
            address: {
                '@type': 'PostalAddress',
                streetAddress: locationAddress,
            },
        },
        ...(offersUrl && {
            offers: {
                '@type': 'Offer',
                url: offersUrl,
                availability: 'https://schema.org/InStock',
            },
        }),
    };
}

// MusicPlaylist schema (for playlists)
export function getMusicPlaylistSchema({
    name,
    description,
    numTracks,
}: {
    name: string;
    description?: string;
    numTracks?: number;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MusicPlaylist',
        name,
        ...(description && { description }),
        ...(numTracks && { numTracks }),
    };
}

// Reusable JSON-LD script component
export function JsonLd({ schema }: { schema: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
