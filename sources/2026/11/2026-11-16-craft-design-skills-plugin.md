---
title: "craft: design skills for AI agents"
url: https://github.com/diego3g/craft
archived:
type: repo
author: Diego Fernandes (diego3g)
date_published: 2026-11-15
date_added: 2026-11-16
tags: [skills, plugins, coding-agents, open-source]
topics: [tooling/skills]
---

## Summary

craft is a new MIT-licensed set of design skills for coding agents (Claude Code, Codex,
Cursor, OpenCode, and others). It makes the agent work like a careful product designer:
write a design brief first, enumerate every state a screen can be in, reuse the design
system's components, and critique the result before showing it. Decisions persist in a
`DESIGN.md` file. It is early (about 50 stars and 17 commits on 2026-11-16; the date
above is approximate, from the GitHub trends report).

## Key points

- **Install in Claude Code:** `/plugin marketplace add diego3g/craft`, then
  `/plugin install craft@craft`; update with `claude plugin update craft@craft`. In
  Claude Desktop or claude.ai: Customize → Plugins → Add marketplace → `diego3g/craft`.
- **Other agents:** `npx skills add diego3g/craft -a codex` (or `-a cursor`,
  `-a opencode`; add `-g` for global). Without the plugin's session hook, paste the
  routing rules from the README into `AGENTS.md`.
- **Skills:** `craft-setup` (interviews you, writes `DESIGN.md` and base tokens),
  `craft` (designs screens and flows with all states), `craft-states` (edge-case
  states), `craft-explore` (three structurally different directions), `craft-system`
  (tokens and component states), `craft-sync` (sync a design system between code and the
  design tool), `craft-critique` (ranked review of a rendered design). As a plugin they
  are namespaced, for example `/craft:craft-setup`.
- **Targets:** Paper, Figma (adapter not yet tested, per the README), or plain HTML.

## Why it matters

It complements Taste Skill and Impeccable, which focus on visual polish: craft focuses
on process (brief, states, design system), which is where agent-built UIs usually fall
short. Being new, it is worth a trial rather than a default.
