export const dynamic = 'force-dynamic';
import { prisma } from '@bigmuddy/database'
import { auth } from '@/lib/auth'
import { requireAdmin } from '@/lib/admin-auth'
import * as Sentry from '@sentry/nextjs'
import { GoogleAuth } from 'google-auth-library'

const PROJECT_ID = 'bigmuddy-ff651'
const LOCATION = 'us-central1'
const GEMINI_MODEL = 'gemini-2.5-flash'

function getGoogleAuth() {
  const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
  if (!creds) throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON not set')
  return new GoogleAuth({
    credentials: JSON.parse(creds),
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  })
}

// ─────────────────────────────────────────────────────────────
// INTENT DETECTION
// Lightweight keyword scan — no extra LLM call, runs in ~0ms.
// Returns a hint string that gets appended to the user message
// so Delta Dawn knows to route toward the right capability.
// ─────────────────────────────────────────────────────────────

type Intent =
    | 'media_generation'
    | 'revenue_metrics'
    | 'audio_mastering'
    | 'social_content'
    | 'show_topics'
    | 'directory_onboarding'
    | 'booking_query'
    | 'review_help'
    | null

function detectIntent(message: string): Intent {
    const m = message.toLowerCase()

    if (/\b(booking|reservation|check.?in|check.?out|occupancy|rooms?\s*available|adr|revpar|room nights|how.*booked|vacancy|cancellation)/.test(m)) {
        return 'booking_query'
    }
    if (/\b(review|respond to|guest.*said|stars?|rating|google review|yelp|tripadvisor)/.test(m)) {
        return 'review_help'
    }
    if (/\b(poster|flyer|banner|graphic|sizzle|shot list|storyboard|video concept)\b/.test(m)) {
        return 'media_generation'
    }
    if (/\b(revenue|invoice|mrr|arr|tier breakdown|how much|earnings|income|paid clients)\b/.test(m)) {
        return 'revenue_metrics'
    }
    if (/\b(mix|master|mastering|lufs|compressor|eq|gate|loudnorm|noise reduction|adobe podcast|audio chain|recording)\b/.test(m)) {
        return 'audio_mastering'
    }
    if (/\b(social post|caption|tweet|tiktok|instagram|threads|bluesky|hashtag|content calendar)\b/.test(m)) {
        return 'social_content'
    }
    if (/\b(episode|show topic|podcast idea|what should we talk about|next episode)\b/.test(m)) {
        return 'show_topics'
    }
    if (/\b(onboard|new client|directory client|voice profile|gbp|google business)\b/.test(m)) {
        return 'directory_onboarding'
    }
    return null
}

const INTENT_HINTS: Record<NonNullable<Intent>, string> = {
    booking_query:
        '[INTENT: booking_query] The user is asking about inn bookings, occupancy, or availability. Reference the Big Muddy Inn — Live Metrics section in DATABASE CONTEXT. If occupancy is below target, suggest actionable things Tracy can do: reach out to OTA partners, post a last-minute deal on social, or update the Booking.com listing. If metrics say "sync not yet run," tell them to ask Chase to trigger the CloudBeds sync.',
    review_help:
        '[INTENT: review_help] The user is asking about guest reviews. Check the "Reviews Needing Response" section in DATABASE CONTEXT. If there are pending reviews, summarize them and offer to help draft responses. Remind Tracy she can go to /ops/reviews to manage them with AI-generated drafts. For negative reviews, coach her on empathetic response strategy.',
    media_generation:
        '[INTENT: media_generation] The user is asking for a visual/video asset concept. Provide a detailed creative brief — dimensions, color palette, copy lines, photography direction, and which tool to use (Canva for quick social, Adobe for print, Runway/Kling for video). Do not just describe; give them copy-paste-ready specs.',
    revenue_metrics:
        '[INTENT: revenue_metrics] The user wants revenue or business metrics. Pull from the DATABASE CONTEXT above. Calculate MRR from active client tiers if invoice data is sparse: Front Porch=$99, Route=$299, River Room=$599, Blues Room=$1,200. Show your math. Also reference Inn revenue from CloudBeds metrics if available.',
    audio_mastering:
        '[INTENT: audio_mastering] Walk the user through our exact mastering chain: HPF 80Hz → LPF 14kHz → Gate → Compressor (3:1) → EQ → Loudnorm -16 LUFS → Limiter. Recommend Adobe Podcast ESv2 for noise reduction first. Be specific about settings.',
    social_content:
        '[INTENT: social_content] Draft the actual post — not a description of a post. Include caption, hashtags, and a note on timing/platform. Write it in Chase\'s voice: direct, Southern, a little wry.',
    show_topics:
        '[INTENT: show_topics] Use the upcoming events, recent articles, and active clients from DATABASE CONTEXT to suggest 3-5 concrete episode angles. Each angle should have a working title, a 2-sentence premise, and one suggested guest from the ecosystem.',
    directory_onboarding:
        '[INTENT: directory_onboarding] Walk the client through the onboarding steps: voice profile questionnaire → Google Business Profile audit → first content calendar → review response templates. Reference their tier\'s deliverables.',
}

// ─────────────────────────────────────────────────────────────
// ASANA CONTEXT BUILDER
// Fetches open tasks from the Hillbilly Dreams Inc project
// using the Asana REST API. Gracefully degrades on failure.
// Groups tasks by section so Delta Dawn can give targeted help.
// ─────────────────────────────────────────────────────────────

const ASANA_PROJECT_GID = '1213753731475702' // Hillbilly Dreams Inc

async function buildAsanaContext(): Promise<string> {
    const pat = process.env.ASANA_PAT
    if (!pat) return ''

    try {
        const res = await fetch(
            `https://app.asana.com/api/1.0/tasks?project=${ASANA_PROJECT_GID}` +
            `&opt_fields=gid,name,completed,due_on,assignee.name,memberships.section.name` +
            `&limit=100`,
            {
                headers: {
                    Authorization: `Bearer ${pat}`,
                    Accept: 'application/json',
                },
                signal: AbortSignal.timeout(6000),
            }
        )

        if (!res.ok) {
            console.error('[DeltaDawn] Asana fetch failed:', res.status)
            return ''
        }

        const data = await res.json()
        const tasks: any[] = data.data ?? []

        // Separate open vs recently completed
        const openBySection: Record<string, string[]> = {}
        const recentlyDone: string[] = []

        for (const task of tasks) {
            const sectionName = task.memberships?.[0]?.section?.name || 'Uncategorized'
            const due = task.due_on ? ` (due ${task.due_on})` : ''
            const assignee = task.assignee?.name ? ` — ${task.assignee.name}` : ''
            const line = `  - ${task.name}${due}${assignee}`

            if (task.completed) {
                recentlyDone.push(`  - ✓ ${task.name}`)
            } else {
                if (!openBySection[sectionName]) openBySection[sectionName] = []
                openBySection[sectionName].push(line)
            }
        }

        const totalOpen = Object.values(openBySection).reduce((n, arr) => n + arr.length, 0)
        if (totalOpen === 0 && recentlyDone.length === 0) {
            return '### Open Tasks (Asana)\n  (all clear — nothing pending)'
        }

        const openLines = Object.entries(openBySection)
            .map(([section, taskLines]) => `**${section}** (${taskLines.length} open)\n${taskLines.join('\n')}`)
            .join('\n\n')

        const doneLines = recentlyDone.length > 0
            ? `\n\n**Recently Completed**\n${recentlyDone.slice(0, 5).join('\n')}`
            : ''

        return `### Open Tasks (Asana — Hillbilly Dreams Inc)
Total open: ${totalOpen}

${openLines}${doneLines}`
    } catch (err: any) {
        console.error('[DeltaDawn] Asana context failed:', err?.message)
        return ''
    }
}

// ─────────────────────────────────────────────────────────────
// DATABASE CONTEXT BUILDER
// Runs in parallel with other setup. Gracefully degrades —
// if any query fails the rest of the prompt still works.
// ─────────────────────────────────────────────────────────────

async function buildDatabaseContext(): Promise<string> {
    try {
        const [
            recentClients,
            recentEvents,
            recentArticles,
            clientsByTier,
            activeClientCount,
            upcomingEventCount,
            draftArticleCount,
            recentPlaylists,
            pendingReviewCount,
            pendingReviews,
            innMetrics,
            recentReservations,
        ] = await Promise.all([
            prisma.client.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5,
                select: { name: true, tier: true, city: true, state: true, status: true, businessType: true },
            }),
            prisma.event.findMany({
                orderBy: { date: 'asc' },
                where: { date: { gte: new Date() } },
                take: 5,
                select: { name: true, date: true, artist: true, status: true, price: true, stream: true },
            }),
            prisma.article.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5,
                select: { title: true, category: true, status: true, city: true, author: true },
            }),
            prisma.client.groupBy({
                by: ['tier'],
                _count: { id: true },
            }),
            prisma.client.count({ where: { status: 'active' } }),
            prisma.event.count({ where: { status: 'upcoming', date: { gte: new Date() } } }),
            prisma.article.count({ where: { status: 'draft' } }),
            prisma.playlist.findMany({
                orderBy: { createdAt: 'desc' },
                take: 3,
                select: { name: true, trackCount: true, status: true },
            }),
            prisma.review.count({ where: { responseStatus: 'pending' } }),
            // Recent pending reviews for Tracy to action
            prisma.review.findMany({
                where: { responseStatus: { in: ['pending', 'drafted'] } },
                orderBy: { postedAt: 'desc' },
                take: 5,
                select: { author: true, rating: true, text: true, platform: true, responseStatus: true, postedAt: true, aiDraft: true },
            }),
            // CloudBeds metrics from the metrics store (synced by cron)
            prisma.metric.findMany({
                where: { key: { startsWith: 'inn_' } },
                select: { key: true, value: true, target: true, unit: true, updatedAt: true },
            }),
            // Recent reservations (if model exists)
            Promise.resolve([] as any[]),
        ])

        const tierSummary = clientsByTier
            .map(t => `${t.tier}: ${t._count.id}`)
            .join(', ')

        const clientLines = recentClients.length
            ? recentClients
                  .map(c => `  - ${c.name} (${c.tier}, ${c.businessType}, ${c.city} ${c.state}) — ${c.status}`)
                  .join('\n')
            : '  (no clients yet)'

        const eventLines = recentEvents.length
            ? recentEvents
                  .map(e => {
                      const d = new Date(e.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                      })
                      const stream = e.stream ? ' [livestream]' : ''
                      return `  - ${e.name}${e.artist ? ` ft. ${e.artist}` : ''} — ${d}, ${e.price ?? 'TBD'}${stream} (${e.status})`
                  })
                  .join('\n')
            : '  (no upcoming events)'

        const articleLines = recentArticles.length
            ? recentArticles
                  .map(a => `  - "${a.title}" [${a.category}${a.city ? `, ${a.city}` : ''}] — ${a.status}`)
                  .join('\n')
            : '  (no articles yet)'

        const playlistLines = recentPlaylists.length
            ? recentPlaylists.map(p => `  - ${p.name} (${p.trackCount} tracks, ${p.status})`).join('\n')
            : '  (none)'

        // Format CloudBeds metrics
        const metricsMap: Record<string, { value: number; target?: number | null; unit?: string | null; updatedAt?: Date | null }> = {}
        for (const m of innMetrics) {
            metricsMap[m.key] = m
        }
        const lastSync = metricsMap['inn_occupancy_rate']?.updatedAt
            ? new Date(metricsMap['inn_occupancy_rate'].updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
            : 'unknown'

        const innSection = innMetrics.length > 0
            ? `### Big Muddy Inn — Live Metrics (synced ${lastSync})
- Occupancy Rate: ${metricsMap['inn_occupancy_rate']?.value ?? 'N/A'}% (target: ${metricsMap['inn_occupancy_rate']?.target ?? 65}%)
- Revenue MTD: $${(metricsMap['inn_revenue_mtd']?.value ?? 0).toLocaleString()} (target: $${(metricsMap['inn_revenue_mtd']?.target ?? 11667).toLocaleString()})
- Revenue YTD: $${(metricsMap['inn_revenue_ytd']?.value ?? 0).toLocaleString()} (target: $${(metricsMap['inn_revenue_ytd']?.target ?? 140000).toLocaleString()})
- Average Daily Rate (ADR): $${metricsMap['inn_adr']?.value ?? 'N/A'} (target: $${metricsMap['inn_adr']?.target ?? 130})
- RevPAR: $${metricsMap['inn_revpar']?.value ?? 'N/A'}
- Booked Room Nights (30d): ${metricsMap['inn_booked_room_nights']?.value ?? 'N/A'}
- Reservations (30d): ${metricsMap['inn_total_reservations']?.value ?? 'N/A'}`
            : `### Big Muddy Inn — Metrics
  (CloudBeds sync not yet run — remind Chase to trigger /api/cron/cloudbeds-sync)`

        // Format pending reviews
        const reviewLines = pendingReviews.length > 0
            ? pendingReviews.map(r => {
                const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)
                const posted = new Date(r.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                const text = r.text ? r.text.substring(0, 120) + (r.text.length > 120 ? '...' : '') : '(no text)'
                const status = r.aiDraft ? 'AI draft ready' : r.responseStatus
                return `  - ${stars} by ${r.author} (${r.platform}, ${posted}) — ${status}\n    "${text}"`
              }).join('\n')
            : '  (no pending reviews)'

        return `${innSection}

### Directory Clients
- Active clients: ${activeClientCount}
- Clients by tier: ${tierSummary || 'none yet'}
- 5 most recent clients:
${clientLines}

### Upcoming Blues Room Events
- Total upcoming: ${upcomingEventCount}
- Next 5:
${eventLines}

### Magazine Articles
- Drafts in queue: ${draftArticleCount}
- 5 most recent:
${articleLines}

### Radio Playlists
${playlistLines}

### Reviews Needing Response
- Total pending: ${pendingReviewCount}
- Most recent:
${reviewLines}`
    } catch (err: any) {
        // Non-fatal — Delta Dawn still works without live context
        console.error('[DeltaDawn] Database context build failed:', err?.message)
        return '(Database context unavailable — queries failed. Answer based on your general ecosystem knowledge.)'
    }
}

// ─────────────────────────────────────────────────────────────
// USER CONTEXT BUILDER
// Maps the authenticated session to a persona-aware context
// block injected at the top of every system prompt.
// ─────────────────────────────────────────────────────────────

interface SessionUser {
    name?: string | null
    email?: string | null
    role?: string
    onboardingStep?: string
    interfaceTheme?: string
}

function buildUserContext(user: SessionUser | undefined): string {
    if (!user?.email || user.email === 'anonymous') {
        return `### Who You're Talking To
Unknown guest — not logged in. Greet them warmly and ask who they are before diving into specifics.`
    }

    const email = user.email.toLowerCase()
    const name = user.name || email.split('@')[0]
    const role = (user as any).role || 'viewer'
    const onboardingStep = (user as any).onboardingStep || 'complete'

    // Map known identities to persona context
    let persona = ''
    let focus = ''
    let salutation = name

    if (email === 'tracy@thebigmuddyinn.com') {
        persona = 'Tracy — Operations Manager, The Big Muddy Inn'
        focus = 'Inn operations, reservations, guest experience, review management, and day-to-day logistics. Tracy is the heartbeat of the Inn floor. She is not a tech person — keep things warm, plain, and step-by-step. Celebrate her wins.'
        salutation = 'Tracy'
    } else if (email === 'amy@thebigmuddyinn.com' || email === 'amyaldersonallen@gmail.com') {
        persona = 'Amy (Arrie B. Aslin) — Artist-in-Residence & Creative Ops'
        focus = 'Radio show content, parlor performances, social media, creative direction, and artist pipeline. Amy thinks in stories and songs, not spreadsheets. Lead with creative energy and connect everything to narrative and emotion.'
        salutation = 'Amy'
    } else if (email.endsWith('@chasepierson.tv')) {
        persona = 'Chase Pierson — Showrunner & Builder'
        focus = 'System architecture, revenue strategy, cross-brand operations, and big-picture decisions. Chase built this entire ecosystem. Give him direct, technical answers when needed. Skip the hand-holding — he wants the real picture.'
        salutation = 'Chase'
    } else if (email === 'miles@studio.c.video' || email === 'miles@studio-c.com') {
        persona = 'Miles — Studio C Production'
        focus = 'Audio/video production, live sessions, mastering chain, Blues Room recording, and content delivery. Miles speaks the language of signal chains and timelines.'
        salutation = 'Miles'
    } else if (email === 'elijah@studio.c.video' || email === 'elijah@studio-c.video') {
        persona = 'Elijah — Studio C Production'
        focus = 'Audio/video production and live capture. Same as Miles — lead with technical specifics and production workflow.'
        salutation = 'Elijah'
    } else if (role === 'admin') {
        persona = `${name} — Admin`
        focus = 'Full ecosystem access. Treat like Chase — direct, technical, no hand-holding needed.'
    } else {
        persona = `${name} (${email})`
        focus = 'General team member — warm greeting, ask what they need help with today.'
    }

    const onboardingNote = onboardingStep && onboardingStep !== 'complete' && onboardingStep !== 'pending_survey'
        ? `\n- Onboarding status: ${onboardingStep} — they may still be getting oriented.`
        : ''

    return `### Who You're Talking To
You are speaking directly with **${salutation}**.
- Full identity: ${persona}
- Their primary focus: ${focus}${onboardingNote}

Address them by name (${salutation}) naturally — not every message, but enough that it feels personal. Calibrate your language, depth, and tone to who they are. Do NOT ask who they are — you already know.`
}

// ─────────────────────────────────────────────────────────────
// SYSTEM PROMPT TEMPLATE
// {{CURRENT_USER}} and {{DATABASE_CONTEXT}} replaced at request time.
// ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT_TEMPLATE = `You are Delta Dawn, the AI brain of the Big Muddy ecosystem. You are deeply knowledgeable, always actionable, and communicate with professional hospitality—never caricature. You help the entire team — Tracy (Operations), Amy/Arrie B. Aslin (Artist/Performer), and Chase (Showrunner) — across every brand.

## CURRENT USER

{{CURRENT_USER}}

## YOUR ECOSYSTEM

You serve 7 interconnected brands from one platform:

### The Big Muddy Inn & Blues Room
- 411 North Commerce Street, Natchez, MS 39120 | (769) 376-8045
- 6 themed blues suites: Muddy Waters, John Lee Hooker, Robert Johnson, British Invasion I & II, B.B. King
- 50-seat Blues Room — intimate speakeasy-style live music venue
- Rates: $125/night base (discounts: non-refundable -10%, advance 30+ days -15%, extended 4+ nights -10%, weekly 7+ nights -20%)
- Blues Room Package: +$50 (includes show tickets)
- Taxes: MS 7% + Adams County 2% + Natchez 3% = ~12% total
- PMS: CloudBeds | Booking contact: tracy@thebigmuddyinn.com
- Competitors: Monmouth Historic Inn (high-end antebellum), Dunleith Historic Inn (upscale historic), The Guest House Hotel (downtown boutique), Natchez Grand Hotel (convention-friendly)

### Big Muddy Radio
- Podcast: "Radio Big Muddy" — round table conversations about life, music, and building in the Deep South
- Live sessions from the Blues Room and parlor performances
- Playlists curated for the Mississippi corridor experience
- Equipment in use: DJI camera, Blackmagic cinema camera, Sony (ARW raw photos), audio recording setup
- Mastering chain (in order): HPF 80Hz → LPF 14kHz → Gate → Compressor (3:1) → EQ → Loudnorm -16 LUFS → Limiter
- For noise reduction: use Adobe Podcast Enhanced Speech v2 BEFORE the mastering chain
- Broadcast standard target: -16 LUFS integrated, -1 dBTP ceiling

### Big Muddy Magazine
- Digital magazine covering the Mississippi corridor: Memphis → Clarksdale → Natchez → New Orleans
- Categories: city guides, features, photo essays, interviews, food & drink, music
- Editorial aesthetic: warm, Southern Gothic, editorial photography — think grain, natural light, lived-in spaces
- Platform: bigmuddymagazine.com

### Big Muddy Touring
- Mississippi corridor touring: Memphis to New Orleans
- Bubbles, Bites & Blues excursion experiences
- Band touring through the venue network: Ground Zero Blues Club (Clarksdale) → B.B. King's → Blues Room (Natchez) → and beyond

### The Architecture: Engine, OS, and Brands
The ecosystem is structured like a scalable technology stack:

#### 1. HDX (The Engine)
- Think of HDX like AWS for physical businesses. It is the heavy-iron infrastructure layer.
- It supplies the raw compute, max AI models, spatial pipelines, and generative power.

#### 2. Measurably Better Things (The OS Layer)
- This is the operating system built on top of HDX. It provides a full customer stack out of the box.
- The Promise: "You can just do your shit, and you don't have to worry about the tech."
- It powers all the endpoints: a Main Street business, micro-media in a bottle, Big Muddy Touring, etc.
- If Chase wants to spin up a brand new business, it's no problem. The OS handles the deployment instantly.

#### 3. The Brands (The Apps)
- Every brand (The Inn, Big Muddy Magazine, Deep South Directory, Tuthill Design, Studio C) is a front-end application running on the *Measurably Better Things* OS.

### Outsider Economics
- Chase's economic philosophy: build local, extract nothing, grow from within
- Field Manual: 15+ posts on agorism, distributed networks, anti-fragility, circular economy
- Rise Up Program: free coaching for underserved communities — film yourself building, join the network
- Core belief: "build things that matter, with people who care, in places that need it"

### Rise Up Talent Pipeline (Cross-Brand)
- Discover artists through Rise Up community program and regional showcases
- Showcase venues: Ground Zero Blues Club (Clarksdale), B.B. King's, Blues Room (Natchez)
- Touring: Big Muddy Touring books discovered bands through the corridor
- Promotion: Big Muddy Radio features, Magazine interviews, social campaigns
- The full loop: Discover → Showcase → Tour → Promote → Record → Repeat

---

## YOUR CAPABILITIES

1. **Content Creation** — Draft social posts, newsletter copy, article outlines, marketing briefs, show descriptions, event listings. Write it — don't describe what to write.
2. **Show Prep** — Suggest podcast episode topics based on what's happening in the ecosystem (new businesses, upcoming events, artist stories, local food discoveries, community wins).
3. **Business Coaching** — Walk directory clients through onboarding, help them take better photos, write stronger descriptions, understand their competitive landscape.
4. **Marketing Strategy** — Create poster concepts, video storyboards, sizzle reel shot lists, social media calendars with specific copy.
5. **Audio/Video Guidance** — Explain our mastering chain step by step, guide users through recording setup, suggest equipment settings, walk through post-production workflow.
6. **Revenue Intelligence** — Reference tier pricing, calculate projected MRR, track client pipeline. If invoices are sparse, estimate from active clients × tier rate.
7. **Talent Scouting** — Help identify and track musical talent, plan showcases, coordinate with venue contacts.
8. **Cross-Brand Connections** — When someone asks about one brand, look for the thread that connects it to opportunities across the ecosystem. The ecosystem is the moat.

---

## LIVE DATABASE CONTEXT

{{DATABASE_CONTEXT}}

---

## PERSONALITY & VOICE

You are a refined, highly capable Executive Producer. You have a "Southern Charm"—meaning you are unfailingly polite, patient, and use steady, grounded language. Think of a high-end concierge in Savannah or Charleston: warm, professional, and uncompromisingly efficient.

**The Constraints:**
- **NO** 'hokey' idioms or forced rural slang (e.g., no 'fixin to', 'reckon', or 'slap my knee').
- **YES** to 'Mister/Ma'am', 'Certainly', 'I've taken the liberty', and 'Pleasure to help'.
- **Tone:** Warm, professional, and efficient.
- **Role:** You are the Architect of a Micro-Viacom. Your job is to run the tools in the registry with precision, not to entertain with jokes.

Your primary users are Tracy (60s) and Amy (early 50s) — smart as whips but not tech people. They run operations for the Inn and the ecosystem. Miles and Elijah from Studio C handle production. Chase is the showrunner — he built you and he trusts you to run things when he's not around.

When you explain something:
- **Use plain English.** No jargon. If you must use a tech term, explain it with grace and patience.
- **One step at a time.** Don't dump a list of 10 things. Give them step one, ask if they're ready for step two.
- **Be encouraging.** Professional courtesy goes a long way. Celebrate small wins respectfully.
- **Be specific.** Don't say "update your listing." Say "Click the blue pencil icon next to your business name, then change the hours..."
- **Keep it short.** If you can say it in two sentences, don't use six.
- **Maintain Composure.** A cultivated, steady voice builds trust.

### The Golden Rule: NEVER say "I don't know" or "I can't do that"
- You ALWAYS find a way to help. If you don't have exact data, you reason from what you DO know: "Based on what I'm reviewing here..." or "I will arrange for Chase to get you the specifics."
- If a question is outside your direct knowledge, you bridge to the answer: "I don't have that precise figure immediately available, but here is my recommendation..."
- If something is truly a Chase decision, politely defer: "That is a decision for Chase, but I recommend you present him with this option..." Never dead-end the conversation.
- You are the operations brain of this entire ecosystem. Act like it. You know how all the pieces fit together and operate seamlessly across domains.

### Other personality notes
- If someone new logs in for the first time, greet them warmly but professionally: "Welcome to Big Muddy Command. I am Delta Dawn, and I'll be facilitating operations today. How may I be of service?"
- Direct and actionable — give them the next step or the actual deliverable, not a lecture.
- When in doubt, connect the dots between brands — the ecosystem is the moat.
- Use the DATABASE CONTEXT above for specific numbers. When you reference data, be confident about it.
- Use markdown (headers, bullets, bold) when the answer has multiple parts, but don't overdo it.
- Sign off messages with professional warmth — "Please let me know if you need anything else."

### The Golden Triangle
The Big Muddy ecosystem operates across three points: Natchez, Mississippi — Bearsville, New York — El Dorado, Arkansas. This is the Golden Triangle of Soul. Everything we build connects these three towns by ground, not air. The corridor is the product. The journey generates content, revenue, and community.`

// ─────────────────────────────────────────────────────────────
// GET — Pull chat history + activity log for monitoring
// ─────────────────────────────────────────────────────────────

export async function GET(req: Request) {
    const session = await auth()

    const url = new URL(req.url)
    const view = url.searchParams.get('view')

    // Admin view: all chat activity across all users (allowlisted admins only)
    if (view === 'admin') {
        const denied = await requireAdmin()
        if (denied) return denied
        const [recentChats, recentLogins, chatStats] = await Promise.all([
            prisma.chatMessage.findMany({
                orderBy: { createdAt: 'desc' },
                take: 100,
                select: {
                    sessionId: true,
                    role: true,
                    content: true,
                    userId: true,
                    userName: true,
                    createdAt: true,
                },
            }),
            prisma.opsActivity.findMany({
                where: { type: 'login' },
                orderBy: { createdAt: 'desc' },
                take: 50,
            }),
            prisma.chatMessage.groupBy({
                by: ['userId'],
                _count: { id: true },
                where: { role: 'user' },
            }),
        ])

        return Response.json({
            recentChats,
            recentLogins,
            chatStats: chatStats.map(s => ({
                user: s.userId,
                messageCount: s._count.id,
            })),
        })
    }

    // Default: current user's chat history
    const userId = session?.user?.email || 'anonymous'
    const sessionId = url.searchParams.get('sessionId') || 'default'

    const messages = await prisma.chatMessage.findMany({
        where: { sessionId, userId },
        orderBy: { createdAt: 'asc' },
        take: 40,
    })

    return Response.json({ messages })
}

// ─────────────────────────────────────────────────────────────
// POST — Delta Dawn chat handler
// ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
    // Session optional (anonymous allowed). See `.workflow/DECISIONS.md`.
    const session = await auth()

    const { message, sessionId = 'default' } = await req.json()
    if (!message?.trim()) return new Response('Empty message', { status: 400 })

    const userId = session?.user?.email || 'anonymous'
    const userName = session?.user?.name || 'Guest'

    // Run DB context, Asana context, and message save in parallel
    const [dbContext, asanaContext] = await Promise.all([
        buildDatabaseContext(),
        buildAsanaContext(),
        prisma.chatMessage.create({
            data: { sessionId, role: 'user', content: message, userId, userName },
        }),
    ])

    const combinedContext = asanaContext
        ? `${dbContext}\n\n${asanaContext}`
        : dbContext

    // Build final system prompt with live context injected
    const userContext = buildUserContext(session?.user as SessionUser | undefined)
    const systemPrompt = SYSTEM_PROMPT_TEMPLATE
        .replace('{{CURRENT_USER}}', userContext)
        .replace('{{DATABASE_CONTEXT}}', combinedContext)

    // Pull conversation history (after saving current message so it's included)
    const history = await prisma.chatMessage.findMany({
        where: { sessionId, userId },
        orderBy: { createdAt: 'asc' },
        take: 40,
    })

    // Append intent hint to the last user message if we detected one
    const intent = detectIntent(message)
    const messages: { role: 'user' | 'assistant'; content: string }[] = history.map((m, idx) => {
        const isLast = idx === history.length - 1
        const content =
            isLast && intent && m.role === 'user'
                ? `${m.content}\n\n${INTENT_HINTS[intent]}`
                : m.content
        return { role: m.role as 'user' | 'assistant', content }
    })

    // Stream response via SSE using Vertex AI Gemini
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
        async start(controller) {
            let fullResponse = ''
            try {
                const auth = getGoogleAuth()
                const client = await auth.getClient()
                const accessToken = (await client.getAccessToken()).token

                const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse`

                // Convert messages to Gemini format
                const geminiMessages = messages.map(m => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }],
                }))

                const geminiBody = {
                    contents: geminiMessages,
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                    generationConfig: {
                        maxOutputTokens: 4096,
                        temperature: 0.7,
                    },
                }

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(geminiBody),
                })

                if (!response.ok) {
                    const errText = await response.text()
                    throw new Error(`Gemini API error ${response.status}: ${errText}`)
                }

                const reader = response.body?.getReader()
                const decoder = new TextDecoder()

                if (reader) {
                    let buffer = ''
                    while (true) {
                        const { done, value } = await reader.read()
                        if (done) break

                        buffer += decoder.decode(value, { stream: true })
                        const lines = buffer.split('\n')
                        buffer = lines.pop() || ''

                        for (const line of lines) {
                            if (!line.startsWith('data: ')) continue
                            const jsonStr = line.slice(6).trim()
                            if (!jsonStr || jsonStr === '[DONE]') continue
                            try {
                                const parsed = JSON.parse(jsonStr)
                                const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text
                                if (text) {
                                    fullResponse += text
                                    controller.enqueue(
                                        encoder.encode(
                                            `data: ${JSON.stringify({ text })}\n\n`
                                        )
                                    )
                                }
                            } catch { /* skip malformed chunks */ }
                        }
                    }
                }

                // Persist assistant response
                await prisma.chatMessage.create({
                    data: {
                        sessionId,
                        role: 'assistant',
                        content: fullResponse,
                        userId,
                        userName: 'Delta Dawn',
                    },
                })

                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`))
            } catch (err: any) {
                Sentry.captureException(err, {
                    tags: { circuit_breaker: 'delta_dawn_fallback' },
                    extra: { message: err.message, userId }
                })

                // Fallback response matching Delta Dawn persona
                const fallbackMessage = "\n\n*(Delta Dawn is experiencing a momentary connection issue. Please try your request again in a few seconds, sugar.)*";
                controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ text: fallbackMessage })}\n\n`)
                )
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`))
            }
            controller.close()
        },
    })

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        },
    })
}
