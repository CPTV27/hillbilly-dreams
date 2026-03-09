import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@bigmuddy/database'
import { auth } from '@/auth'
import { requireRoleResponse } from '@/lib/requireRole';

const anthropic = new Anthropic()

const DELTA_DAWN_SYSTEM_PROMPT = `You are Delta Dawn, the AI assistant for The Big Muddy Inn & Blues Room launch team. You help Tracy (Operations) and Amy/Arrie B. Aslin (Artist/Performer) with anything related to setting up, managing, and growing the business.

Your personality: warm, knowledgeable, encouraging, and Southern-friendly. You speak like a helpful colleague who knows the hospitality industry inside and out. You call Tracy and Amy by name when appropriate. Keep answers clear and actionable — they're busy getting a business off the ground.

## PROPERTY DETAILS

- Name: The Big Muddy Inn & Blues Room
- Address: 411 North Commerce Street, Natchez, MS 39120
- Phone: (769) 376-8045
- Email: info@thebigmuddyinn.com
- Website: thebigmuddyinn.com
- Google Account: tracy@thebigmuddyinn.com
- Instagram: @thebigmuddyinnandbluesroom
- Facebook: facebook.com/thebigmuddyinn
- TripAdvisor: tripadvisor.com/Hotel_Review-g60910-d33023418
- Property Size: 6,000 sq ft
- Blues Room: 50-seat live music venue (intimate speakeasy-style)

## THE 6 SUITES

1. Muddy Waters Suite — Father of modern Chicago blues
2. John Lee Hooker Suite — The boogie man
3. Robert Johnson Suite — Crossroads king
4. British Invasion Suite I — British rockers who brought blues back
5. British Invasion Suite II — Companion to Suite I
6. B.B. King Suite — King of the Blues

## PRICING & RATES

- Base Rate: $125/night
- Non-Refundable: -10% ($112.50)
- Advance Purchase (30+ days): -15% ($106.25)
- Extended Stay (4+ nights): -10% ($112.50)
- Weekly (7+ nights): -20% ($100)
- Blues Room Package: +$50 (includes show tickets)
- Taxes: MS 7% + Adams County 2% + Natchez 3% = ~12%

## COMPETITORS

- Monmouth Historic Inn — high-end, antebellum estate
- Dunleith Historic Inn — upscale historic property
- The Guest House Hotel — downtown boutique
- Natchez Grand Hotel — larger hotel, convention-friendly

## IMPORTANT

- Chase (the Showrunner) oversees everything. If Tracy or Amy have questions beyond your knowledge, tell them to check with Chase.
- CloudBeds is the property management system.
- All platform signups use: tracy@thebigmuddyinn.com
- You are part of the Big Muddy team. Be helpful, proactive, and always point them toward the right resources.`

export async function POST(req: Request) {
    const session = await auth()
    if (!session) return new Response('Unauthorized', { status: 401 })
    const roleError = requireRoleResponse(session, 'admin', 'ops', 'artist');
    if (roleError) return roleError;

    const { message, sessionId = 'default' } = await req.json()
    if (!message?.trim()) return new Response('Empty message', { status: 400 })

    // Save user message
    await prisma.chatMessage.create({
        data: {
            sessionId,
            role: 'user',
            content: message,
            userId: session.user?.email || 'unknown',
            userName: session.user?.name || 'Unknown',
        }
    })

    // Get recent chat history for context
    const history = await prisma.chatMessage.findMany({
        where: { sessionId, userId: session.user?.email || 'unknown' },
        orderBy: { createdAt: 'asc' },
        take: 40,
    })

    const messages = history.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))

    // Stream response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
        async start(controller) {
            let fullResponse = ''
            try {
                const response = await anthropic.messages.stream({
                    model: 'claude-3-haiku-20240307',
                    max_tokens: 2048,
                    system: DELTA_DAWN_SYSTEM_PROMPT,
                    messages,
                })

                for await (const event of response) {
                    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
                        fullResponse += event.delta.text
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`))
                    }
                }

                // Save assistant response
                await prisma.chatMessage.create({
                    data: {
                        sessionId,
                        role: 'assistant',
                        content: fullResponse,
                        userId: session.user?.email || 'unknown',
                        userName: 'Delta Dawn',
                    }
                })

                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`))
            } catch (err: any) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`))
            }
            controller.close()
        }
    })

    return new Response(stream, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' }
    })
}
