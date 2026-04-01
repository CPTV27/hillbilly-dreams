# Memory Index

## Source of Truth (read order matters)
- `docs/BUSINESS_ARCHITECTURE.md` — THE canonical reference. Wins all conflicts. Three layers, two products, nine modules.
- `docs/COPY_RESET_PLAN.md` — Every page ranked by priority. What's wrong, what's next, who does what.
- `CLAUDE.md` — Master handoff. Points to architecture doc. Updated 2026-03-31.

## Agent Files (in repo)
- `.claude/agents/NORTH_STAR_MANIFESTO.md` — Visual direction: photo-first, obsidian+gold+bone, Glass Engine
- `.claude/agents/QA_CHASE.md` — QC standards, brand voice per property, claim ladder, shipping gate
- `.claude/agents/CHIEF_OF_STAFF.md` — Big picture context, priority stack, drift prevention

## Feedback
- [feedback_chase_voice.md](feedback_chase_voice.md) — Chase's writing voice: direct, specific, action-oriented. Living doc.
- [feedback_mbt_value_is_ecosystem.md](feedback_mbt_value_is_ecosystem.md) — MBT is intelligence layer inside Big Muddy, not a separate product
- [feedback_bitwarden_policy.md](feedback_bitwarden_policy.md) — All secrets go into Bitwarden, no exceptions

## Project
- [project_dogfood_phase.md](project_dogfood_phase.md) — No external MBT sales. 4 internal clients first (Inn, Magazine, Radio, DSD)

## Design Tokens (updated 2026-03-31)
- Palette: "Editorial Obsidian" — --bg #0a0a0a, --accent #c8943e, --text #f5f0eb
- Token source: `packages/config/base/variables.css`
- 17 theme files in `packages/config/themes/`
