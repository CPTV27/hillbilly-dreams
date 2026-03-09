import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/auth';
import { requireRoleResponse } from '@/lib/requireRole';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const roleError = requireRoleResponse(session, 'admin', 'ops', 'artist');
    if (roleError) return roleError;

    const body = await req.json();
    const taskNumber = parseInt(params.id);

    const updateData: any = {};
    if (body.status !== undefined) {
        updateData.status = body.status;
        if (body.status === 'done') {
            updateData.completedAt = new Date();
            updateData.completedBy = session.user?.email || 'unknown';
        }
        if (body.status === 'pending') {
            updateData.completedAt = null;
            updateData.completedBy = null;
        }
    }
    if (body.notes !== undefined) updateData.notes = body.notes;
    if (body.assignedTo !== undefined) updateData.assignedTo = body.assignedTo;

    const task = await prisma.launchTask.update({
        where: { taskNumber },
        data: updateData,
        include: { contentPack: true }
    });

    // Log activity
    await prisma.opsActivity.create({
        data: {
            type: body.status === 'done' ? 'task_completed' : 'task_updated',
            message: `${session.user?.name || session.user?.email || 'Someone'} ${body.status === 'done' ? 'completed' : 'updated'} "${task.title}"`,
            userId: session.user?.email || null,
            userName: session.user?.name || null,
            taskId: taskNumber,
        }
    });

    return NextResponse.json(task);
}
