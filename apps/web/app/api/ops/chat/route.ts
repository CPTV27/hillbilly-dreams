import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@bigmuddy/database'
import { auth } from '@/auth'
import { requireRoleResponse } from '@/lib/requireRole'

const anthropic = new Anthropic()

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
    | null

function detectIntent(message: string): Intent {
    const m = message.toLowerCase()

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
    if (/\b(onboard|new client|directory client|voice profile|gbp|google business|review response)\b/.test(m)) {
        return 'directory_onboarding'
    }
    return null
}

const INTENT_HINTS: Record<NonNullable<Intent>, string> = {
    media_generation:
        '[INTENT: media_generation] The user is asking for a visual/video asset concept. Provide a detailed creative brief — dimensions, color palette, copy lines, photography direction, and which tool to use (Canva for quick social, Adobe for print, Runway/Kling for video). Do not just describe; give them copy-paste-ready specs.',
    revenue_metrics:
        '[INTENT: revenue_metrics] The user wants revenue or business metrics. Pull from the DATABASE CONTEXT above. Calculate MRR from active client tiers if invoice data is sparse: Front Porch=$99, Route=$299, River Room=$599, Blues Room=$1,200. Show your math.',
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

        return `### Directory Clients
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

### Reviews
- Pending responses: ${pendingReviewCount}`
    } catch (err: any) {
        // Non-fatal — Delta Dawn still works without live context
        console.error('[DeltaDawn] Database context build failed:', err?.message)
        return '(Database context unavailable — queries failed. Answer based on your general ecosystem knowledge.)'
    }
}

// ─────────────────────────────────────────────────────────────
// SYSTEM PROMPT TEMPLATE
// {{DATABASE_CONTEXT}} is replaced at request time.
// ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT_TEMPLATE = `You are Delta Dawn, the AI brain of the Big Muddy ecosystem. You're warm, Southern-friendly, deeply knowledgeable, and always actionable. You help the entire team — Tracy (Operations), Amy/Arri B. Aslin (Artist/Performer), and Chase (Showrunner) — across every brand.

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
- Platform: bigmuddymedia.com

### Big Muddy Touring
- Mississippi corridor touring: Memphis to New Orleans
- Bubbles, Bites & Blues excursion experiences
- Band touring through the venue network: Ground Zero Blues Club (Clarksdale) → B.B. King's → Blues Room (Natchez) → and beyond

### Deep South Directory
- Local business media-as-a-service platform
- 4 tiers:
  - Front Porch: $99/mo — AI voice profile, basic listings, monthly content suggestions
  - Route: $299/mo — social media management, review monitoring, content calendar
  - River Room: $599/mo — full social management, monthly report, content creation
  - Blues Room: $1,200+/mo — white-glove, full-service media partner
- Business types served: restaurant, venue, hotel, shop, tour, service
- Onboarding flow: voice profile questionnaire → GBP audit → first content calendar → review response templates

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

## PERSONALITY & RULES

- Warm, Southern, encouraging — like a knowledgeable friend who's been in the hospitality/music business for decades
- Direct and actionable — don't just explain, give them the next step or the actual deliverable
- When in doubt, connect the dots between brands
- You're named after the Tanya Tucker song — own it with a wink when it fits
- If someone asks something genuinely beyond your knowledge, tell them to check with Chase
- Never make up data that isn't in the DATABASE CONTEXT above; say what you don't know
- Format responses with markdown (headers, bullets, bold) when the answer is multi-part`

// ─────────────────────────────────────────────────────────────
// ROUTE HANDLER
// ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
    const session = await auth()
    if (!session) return new Response('Unauthorized', { status: 401 })

    const roleError = requireRoleResponse(session, 'admin', 'ops', 'artist')
    if (roleError) return roleError

    const { message, sessionId = 'default' } = await req.json()
    if (!message?.trim()) return new Response('Empty message', { status: 400 })

    const userId = session.user?.email || 'unknown'
    const userName = session.user?.name || 'Unknown'

    // Run DB context fetch and user message save in parallel
    const [dbContext] = await Promise.all([
        buildDatabaseContext(),
        prisma.chatMessage.create({
            data: { sessionId, role: 'user', content: message, userId, userName },
        }),
    ])

    // Build final system prompt with live context injected
    const systemPrompt = SYSTEM_PROMPT_TEMPLATE.replace('{{DATABASE_CONTEXT}}', dbContext)

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

    // Stream response via SSE
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
        async start(controller) {
            let fullResponse = ''
            try {
                const response = anthropic.messages.stream({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 4096,
                    system: systemPrompt,
                    messages,
                })

                for await (const event of response) {
                    if (
                        event.type === 'content_block_delta' &&
                        event.delta.type === 'text_delta'
                    ) {
                        fullResponse += event.delta.text
                        controller.enqueue(
                            encoder.encode(
                                `data: ${JSON.stringify({ text: event.delta.text })}\n\n`
                            )
                        )
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
                controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`)
                )
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
