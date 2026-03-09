import DOMPurify from 'dompurify';

export const sanitizeTaskGuide = (html: string | null | undefined): string => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['ul', 'ol', 'li', 'a', 'strong', 'em', 'code', 'pre', 'p', 'br', 'h3', 'h4'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
};

export const sanitizeChatHtml = (html: string | null | undefined): string => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'br'],
        ALLOWED_ATTR: [],
    });
};

export const sanitizeSnippet = (html: string | null | undefined): string => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['mark', 'b', 'strong', 'em', 'i'],
        ALLOWED_ATTR: [],
    });
};
