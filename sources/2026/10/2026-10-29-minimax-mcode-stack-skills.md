---
title: "mcode-stack: the MiniMax Code team's skills and workflows"
url: https://github.com/MiniMax-AI/mcode-stack
archived:
type: repo
author: MiniMax
date_published: 2026-10-28
date_added: 2026-10-29
tags: [skills, plugins, coding-agents]
topics: [tooling/skills]
---

## Summary

MiniMax published the skills and workflows its MiniMax Code team uses to build its own
coding agent. There are two "stacks": `ronny` (about 13 skills for planning, context
management, long sessions, review, and experiments) and `jiachen` (`lifting-loops` and
`making-content`). Four Engineering Notes articles explain the practices behind them.
The repo is new (8 commits, about 290 stars on 2026-10-29; the date above is when it
first appeared in the trends report, about 2026-10-28).

## Key points

- **Install in Claude Code:** `/plugin marketplace add MiniMax-AI/mcode-stack`, then
  `/plugin install ronny@mcode-stack`.
- **Other agents:** the skills use the common `SKILL.md` format; copy a skill folder
  into your agent's skills directory (for example
  `cp -R mcode-stack/stacks/ronny/skills/long-command-check ~/.agents/skills/`). There
  are no Codex-specific instructions.
- **Good for:** long agent sessions and context management, which are the areas the
  ronny stack focuses on. Some skills are checklists, also provided as plain text in
  `checklists/`.
- **Licence:** MIT, except where a stack's `NOTICE.md` says otherwise; the
  `engineering-*` skills adapt Google's Engineering Practices under CC-BY 3.0.
- Includes a validator (`scripts/check.mjs`) run in CI, and a template for contributing
  a stack.

## Why it matters

It is a rare look at how a model vendor's own agent team works day to day, packaged so
you can install it. It is very new, so expect changes.
