export const dynamic = 'force-dynamic';
// apps/web/app/api/clients/[id]/report/pdf/route.ts
// GET /api/clients/:id/report/pdf?month=3&year=2026
// Generates a branded PDF report and optionally uploads to GCS

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { renderToBuffer } from '@react-pdf/renderer';
import { uploadToGCS } from '@/lib/gcs';
import { MonthlyReportDocument } from './template';

type Params = { params: { id: string } };

const MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export async function GET(request: NextRequest, { params }: Params) {
  const clientId = parseInt(params.id, 10);
  if (isNaN(clientId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const searchParams = request.nextUrl.searchParams;
  const now = new Date();
  const month = parseInt(searchParams.get('month') || String(now.getMonth() || 12), 10);
  const year = parseInt(searchParams.get('year') || String(month === 12 && now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()), 10);

  try {
    const client = await (prisma as any).client.findUnique({ where: { id: clientId } });
    if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

    // Find existing report
    const report = await (prisma as any).report.findUnique({
      where: { clientId_month_year: { clientId, month, year } },
    });

    if (!report) {
      return NextResponse.json({
        error: `No report found for ${MONTH_NAMES[month]} ${year}. Generate it first via POST /api/clients/${clientId}/report`,
      }, { status: 404 });
    }

    const data = report.data as Record<string, unknown>;

    // Render PDF
    const pdfBuffer = await renderToBuffer(
      MonthlyReportDocument({
        clientName: client.name,
        businessType: client.businessType || 'Business',
        city: client.city || 'Natchez',
        state: client.state || 'MS',
        period: `${MONTH_NAMES[month]} ${year}`,
        postsPublished: (data.postsPublished as number) || 0,
        reviewCount: (data.reviewCount as number) || 0,
        avgRating: (data.avgRating as number) || 0,
        reviewsResponded: (data.reviewsResponded as number) || 0,
        summary: report.summary || '',
        tier: (data.tier as string) || client.tier || 'front-porch',
      })
    );

    // Upload to GCS if save param is set
    const save = searchParams.get('save') === 'true';
    if (save) {
      const slug = client.slug || client.name.toLowerCase().replace(/\s+/g, '-');
      const path = `reports/${slug}/${year}-${String(month).padStart(2, '0')}.pdf`;
      const pdfUrl = await uploadToGCS(Buffer.from(pdfBuffer), path, 'application/pdf');

      await (prisma as any).report.update({
        where: { id: report.id },
        data: { pdfUrl },
      });
    }

    // Return PDF as download — copy into a plain Uint8Array (Node Buffer is not accepted as BodyInit here).
    const body = new Uint8Array(pdfBuffer);
    return new NextResponse(body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${client.name.replace(/[^a-zA-Z0-9]/g, '-')}-${MONTH_NAMES[month]}-${year}.pdf"`,
      },
    });
  } catch (err) {
    console.error('[GET /api/clients/:id/report/pdf]', err);
    return NextResponse.json({ error: 'Failed to generate PDF report' }, { status: 500 });
  }
}
