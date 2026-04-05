/**
 * CORS allowlist for public read APIs (directory profile, feeds, search).
 * Matches production hostnames across the HDI / MBT domain set.
 */

const HOSTS = [
  'bigmuddytouring.com',
  'bigmuddymagazine.com',
  'bigmuddyradio.com',
  'bigmuddyentertainment.com',
  'bigmuddyrecordlabel.com',
  'deepsouthdirectory.com',
  'outsidereconomics.com',
  'hillbillydreamsinc.com',
  'tuthilldesign.com',
  'studiocvideo.com',
  'bearsvillemediagroup.com',
  'bearsvillemedia.com',
  'measurablybetter.life',
  'buycurious.art',
] as const;

function expandOrigins(): string[] {
  const out: string[] = [];
  for (const h of HOSTS) {
    out.push(`https://${h}`);
    out.push(`https://www.${h}`);
  }
  out.push('http://localhost:3000', 'http://127.0.0.1:3000');
  return out;
}

export const PUBLIC_DATA_CORS_ORIGINS = new Set(expandOrigins());

/** Reflect allowed Origin or omit ACAO (browser same-origin only). */
export function publicDataCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('origin');
  const base: Record<string, string> = { Vary: 'Origin' };
  if (origin && PUBLIC_DATA_CORS_ORIGINS.has(origin)) {
    base['Access-Control-Allow-Origin'] = origin;
    base['Access-Control-Allow-Methods'] = 'GET, HEAD, OPTIONS';
    base['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }
  return base;
}

export function mergePublicCorsHeaders(
  request: Request,
  headers: Record<string, string>
): Record<string, string> {
  return { ...headers, ...publicDataCorsHeaders(request) };
}
