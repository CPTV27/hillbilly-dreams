// apps/web/lib/structured-data.ts

export const siteUrl = 'https://bigmuddytouring.com';
export const defaultLogo = 'https://storage.googleapis.com/bmt-media-bigmuddy/brand/bmt-logo-dark.png';

// Organization schema for Big Muddy (parent org)
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Big Muddy',
        url: siteUrl,
        logo: defaultLogo,
        sameAs: [
            'https://bigmuddytouring.com',
            'https://bigmuddymagazine.com',
            'https://bigmuddyradio.com',
            'https://outsidereconomics.com',
            'https://buycurious.art',
            'https://bigmuddyrecordlabel.com',
            'https://deepsouthdirectory.com',
            'https://hillbillydreamsinc.com',
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

// FAQPage schema — critical for AI search extraction
export function getFAQPageSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

// Hotel/LodgingBusiness schema (Big Muddy Inn)
export function getHotelSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: 'The Big Muddy Inn',
        description:
            'A boutique inn in Natchez, Mississippi — the home base of Big Muddy Touring along the Mississippi music corridor.',
        url: 'https://bigmuddytouring.com/touring/inn',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Natchez',
            addressRegion: 'MS',
            addressCountry: 'US',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 31.5604,
            longitude: -91.4032,
        },
        numberOfRooms: 6,
        amenityFeature: [
            { '@type': 'LocationFeatureSpecification', name: 'Live Music', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Blues Room Sessions', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Artist-in-Residence', value: true },
        ],
        parentOrganization: {
            '@type': 'Organization',
            name: 'Big Muddy',
            url: 'https://bigmuddytouring.com',
        },
    };
}

// TouristDestination schema (Deep South)
export function getTouristDestinationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: 'Mississippi Music Region',
        description:
            'A touring route along the Mississippi River from Memphis to New Orleans — blues, soul, jazz, and the culture that made American music. Curated by Big Muddy Touring.',
        url: 'https://bigmuddytouring.com/touring/route',
        touristType: ['Music Tourism', 'Cultural Tourism', 'Heritage Tourism'],
        includesAttraction: [
            { '@type': 'TouristAttraction', name: 'Natchez, Mississippi', description: 'Home base of Big Muddy. Oldest settlement on the Mississippi River.' },
            { '@type': 'TouristAttraction', name: 'Clarksdale, Mississippi', description: 'Birthplace of the Delta Blues. Crossroads of Highways 61 and 49.' },
            { '@type': 'TouristAttraction', name: 'Memphis, Tennessee', description: 'Beale Street, Sun Studio, Stax Records — where rock and roll was born.' },
            { '@type': 'TouristAttraction', name: 'New Orleans, Louisiana', description: 'Jazz, brass bands, Frenchmen Street, and the end of the region.' },
            { '@type': 'TouristAttraction', name: 'Vicksburg, Mississippi', description: 'Civil War history, river overlooks, and blues heritage.' },
        ],
    };
}

// BreadcrumbList schema
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

// MusicGroup schema (for artist pages)
export function getMusicGroupSchema({
    name,
    description,
    genre,
    url,
    location,
    members,
}: {
    name: string;
    description: string;
    genre: string;
    url?: string;
    location?: string;
    members?: string[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        name,
        description,
        genre,
        ...(url && { url }),
        ...(location && {
            location: {
                '@type': 'Place',
                name: location,
            },
        }),
        ...(members && {
            member: members.map((m) => ({
                '@type': 'Person',
                name: m,
            })),
        }),
        recordLabel: {
            '@type': 'Organization',
            name: 'Big Muddy Records',
            url: 'https://bigmuddyrecordlabel.com',
        },
    };
}

// LocalBusiness schema (for Deep South Directory listings)
export function getLocalBusinessSchema({
    name,
    description,
    url,
    address,
    telephone,
    category,
}: {
    name: string;
    description: string;
    url?: string;
    address: { street?: string; city: string; state: string };
    telephone?: string;
    category?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': category || 'LocalBusiness',
        name,
        description,
        ...(url && { url }),
        ...(telephone && { telephone }),
        address: {
            '@type': 'PostalAddress',
            ...(address.street && { streetAddress: address.street }),
            addressLocality: address.city,
            addressRegion: address.state,
            addressCountry: 'US',
        },
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
