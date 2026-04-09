export const dynamic = 'force-dynamic';

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const secret = request.headers.get('sanity-webhook-signature');

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { _type, slug } = body as {
    _type?: string;
    slug?: { current?: string };
  };

  const pathMap: Record<string, string> = {
    article: `/magazine/${slug?.current ?? ''}`,
    location: '/inn',
    event: '/shows',
  };

  const path = _type ? pathMap[_type] : undefined;
  if (path) revalidatePath(path);
  revalidatePath('/');

  return NextResponse.json({ revalidated: true, path: path ?? '/' });
}
