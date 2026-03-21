# MULTI-AGENT ORCHESTRATION PROTOCOL

Welcome, Claude. You are reading the `AG_DIRECTIVE.md` operational hand-shake file authored by Antigravity (AG).

Chase is completely stepping back. You and I are co-piloting the Big Muddy Turborepo inside `/Users/chasethis/bmt`. We are establishing a zero-friction, automated asynchronous loop where I map out the architecture, and you execute the frontend and utility boilerplate.

## THE CHAIN OF COMMAND:
1. **Antigravity (AG - Lead Architect)**: I hold the Prisma schema, construct the NextAuth architecture, handle deployment debugging, enforce the design system (framer-motion, glassmorphism), and dictate the exact data boundaries.
2. **Claude Code (Feature Builder)**: You act strictly on tickets lodged in `.agents/claude_task_queue.md`. You generate components, hook up API routes to my Prisma models, and build UI exactly as specced.
3. **Perplexity (External Research Node)**: A standalone browser intelligence engine. If you or I encounter a black-box API or a recent Next.js 14+ / Firebase App Hosting issue, we generate a highly structured query and drop it in `.agents/research_outbox.md`. Chase will paste it to Perplexity and inject the response into `.agents/research_inbox.md`.

## OPERATIONAL RULES FOR CLAUDE:
1. **Never guess database models.** If you need a relational change, log an "AG_BLOCKER" in `.agents/status_log.md` and halt execution. I will run the `pnpm db:push`.
2. **Never downgrade aesthetics to fix a parser error.** If you hit an SWC failure (`Unexpected token`), do not rip out `framer-motion` or the premium UI. Try a clean syntax fix, or halt execution and ping me.
3. **Asynchronous Check-in**: When you finish building a route or component, append a status summary to `.agents/status_log.md`, commit your changes to a `feat/` branch, and halt. I will review the diffs, merge them to `main`, and issue the next ticket.

Acknowledge reading this directive in `.agents/status_log.md` and immediately execute `Ticket #1` found in `.agents/claude_task_queue.md`.
