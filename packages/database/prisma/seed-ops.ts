import { PrismaClient } from '@prisma/client'
import tasksData from '../data/ops-tasks.json'
import contentPacksData from '../data/ops-content-packs.json'

const prisma = new PrismaClient()

async function seedOps() {
    console.log('Seeding content packs...')

    // Content packs come as an object keyed by slug
    for (const [slug, pack] of Object.entries(contentPacksData)) {
        await prisma.contentPack.upsert({
            where: { slug },
            update: { title: (pack as any).title, sections: (pack as any).sections },
            create: { slug, title: (pack as any).title, sections: (pack as any).sections }
        })
    }
    console.log(`Seeded ${Object.keys(contentPacksData).length} content packs`)

    console.log('Seeding launch tasks...')
    for (const task of tasksData as any[]) {
        await prisma.launchTask.upsert({
            where: { taskNumber: task.id },
            update: {},
            create: {
                taskNumber: task.id,
                title: task.name,
                session: task.session,
                sessionName: task.session_name,
                platform: task.platform || null,
                timeEstimate: task.time || null,
                status: task.status,
                assignedTo: task.assigned_to || null,
                guide: task.guide || null,
                link: task.link || null,
                requiresLogin: task.requires_login || false,
                contentPackSlug: task.content_pack || null,
                triggers: task.triggers || [],
                notes: task.notes || [],
                completedAt: task.completed_at ? new Date(task.completed_at) : null,
                completedBy: task.completed_by || null,
            }
        })
    }
    console.log(`Seeded ${Object.keys(tasksData).length} launch tasks`)
}

seedOps()
    .then(() => prisma.$disconnect())
    .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
