---
title: "agent-skills: engineering lifecycle skills for coding agents (Addy Osmani)"
url: https://github.com/addyosmani/agent-skills
archived:
type: repo
author: Addy Osmani
date_published: 2026-10-29
date_added: 2026-10-29
tags: [skills, plugins, coding-agents]
topics: [tooling/skills]
---

## Summary

agent-skills is an MIT-licensed pack of 25 `SKILL.md` workflows that walk a coding agent
through the software lifecycle: define, plan, build, verify, review, and ship. Each
skill has steps, checkpoints, and verification gates, and the pack adds nine slash
commands and four agent personas. It had about 772 commits and 111,500 stars when read
on 2026-10-29 (the date above is that reading date, not a release date).

## Key points

- **Install in Claude Code:** `/plugin marketplace add addyosmani/agent-skills`, then
  `/plugin install agent-skills@addy-agent-skills`.
- **Install in Codex (0.122+):** `codex plugin marketplace add addyosmani/agent-skills`,
  then `codex plugin add agent-skills@agent-skills`.
- **Other agents:** `npx skills add addyosmani/agent-skills` (add `--list` to browse
  first). Per-skill `npx` installs leave out the shared `references/` folder (issue #361),
  so install the whole pack.
- **Good for:** giving an agent a disciplined process. Examples: `interview-me` and
  `spec-driven-development` before coding, `test-driven-development` and
  `incremental-implementation` while building, `browser-testing-with-devtools` and
  `code-review-and-quality` before merging, and `/spec`, `/plan`, `/build`, `/test`,
  `/review`, and `/ship` as shortcuts.
- Its star count rose by about 2,100 in the week to 2026-10-29; the long commit history
  and per-agent setup guides suggest active maintenance.

## Why it matters

Most skill packs cover one task; this one encodes a whole engineering process in a
portable format that installs the same way in Claude Code, Codex, and other agents.
