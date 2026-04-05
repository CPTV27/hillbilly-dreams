export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/db';

// GET /api/page-edits?path=/touring
// Returns all active edits for a given page path
export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const path = req.nextUrl.searchParams.get('path');
  if (!path) {
    return NextResponse.json({ error: 'path is required' }, { status: 400 });
  }

  const edits = await prisma.pageEdit.findMany({
    where: { path, active: true },
    select: { editId: true, editType: true, content: true },
  });

  return NextResponse.json({ path, edits });
}

// POST /api/page-edits
// Save a batch of edits for a page
// Body: { path: string, edits: Array<{ editId: string, editType: "text"|"image", content: string }>, editedBy?: string }
export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await req.json();
  const { path, edits, editedBy } = body as {
    path: string;
    edits: Array<{ editId: string; editType: string; content: string }>;
    editedBy?: string;
  };

  if (!path || !edits || !Array.isArray(edits)) {
    return NextResponse.json({ error: 'path and edits[] are required' }, { status: 400 });
  }

  const results = await Promise.all(
    edits.map((edit) =>
      prisma.pageEdit.upsert({
        where: { path_editId: { path, editId: edit.editId } },
        update: { content: edit.content, editType: edit.editType, editedBy: editedBy ?? null },
        create: { path, editId: edit.editId, editType: edit.editType, content: edit.content, editedBy: editedBy ?? null },
      })
    )
  );

  return NextResponse.json({ saved: results.length, path });
}

// DELETE /api/page-edits?path=/touring&editId=edit-5
// Revert a single edit (soft delete)
export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const path = req.nextUrl.searchParams.get('path');
  const editId = req.nextUrl.searchParams.get('editId');

  if (!path) {
    return NextResponse.json({ error: 'path is required' }, { status: 400 });
  }

  if (editId) {
    // Revert single edit
    await prisma.pageEdit.updateMany({
      where: { path, editId, active: true },
      data: { active: false },
    });
    return NextResponse.json({ reverted: editId, path });
  }

  // Revert all edits for page
  const result = await prisma.pageEdit.updateMany({
    where: { path, active: true },
    data: { active: false },
  });
  return NextResponse.json({ reverted: result.count, path });
}
