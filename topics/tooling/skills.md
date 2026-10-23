---
title: "Agent skills"
tags: [skills, agents, anthropic]
related: [tooling/mcp, agents/tool-use, tooling/coding-agents]
last_reviewed: 2026-10-23
---

## Overview

A skill is a folder of instructions, scripts, and reference files that teaches an agent
how to do a specific job: fill in a PDF form, follow a company style guide, run a
deployment. The agent sees only each skill's name and description until a task needs it,
then loads the rest. Skills package *know-how*; [MCP](mcp.md) provides *connections*.

## Key concepts

- **`SKILL.md`:** the entry file, with frontmatter (`name`, `description`) and the
  instructions in Markdown.
- **Progressive disclosure:** metadata always loaded, body loaded when relevant, extra
  files and scripts read or run only when needed. Many skills can be installed at little
  context cost.
- **Scripts:** skills can include code the agent runs instead of generating it each time.
- **Where they run:** Claude apps, Claude Code (project, user, and plugin skills), the
  Claude API (with code execution, including through Google Cloud since 2026-10-22), and
  Managed Agents, plus the other agents that follow the open standard.
- **Open standard:** Agent Skills has been an open standard (spec at agentskills.io)
  since December 2025, and since 2026-10-22 the Agentic AI Foundation (Linux Foundation)
  governs it, as it does MCP. Anthropic counts over 70 platforms that load skills,
  including ChatGPT, Codex, Cursor, GitHub Copilot, and VS Code, so a skill is portable
  across agents.
- **Plugins:** bundles of skills, commands, hooks, agents, and MCP servers that can be
  shared through marketplaces (Claude Code plugins).

## How to use it

- Write the `description` carefully: it decides when the skill is used.
- Keep `SKILL.md` focused; move long reference material into separate files.
- Include scripts for steps that must be exact.
- Test that the skill triggers on the right requests and not on the wrong ones.
- Review third-party skills before installing: they can contain instructions and code.

## Current state

- **2026-10-22:** Anthropic donated Agent Skills (spec, name, GitHub org, agentskills.io)
  to the Agentic AI Foundation. Maintainers from Anthropic, Google, OpenAI, and others
  now steer it. Anthropic reports about 1 million skills published and nearly 280
  million installs. The planned versioned releases, proposal process, and security
  guidance have no dates yet.
- **2026-10-22:** Claude Code 2.1.309: a skill in an `--add-dir` folder whose name
  clashes with another is offered as `<folder>:<name>`. The bundled `/claude-api` skill
  builds Managed Agents teams on `multiagent_20261001`, and dataviz adds APCA contrast
  checks.
- **2026-10-21:** Dashboard Design (new, MIT) is a skill for building and critiquing
  analytics dashboards (web and SwiftUI) with a screenshot QA pass. Install it with
  `/plugin marketplace add abdiraimov-otabek/dashboard-design-skill`, then
  `/plugin install dashboard-design@dashboard-design-skill`. It adds a promotional
  sign-off once per conversation unless you turn it off.
- **2026-10-19:** Claude Code 2.1.304 resends the full skill list after compaction, so
  skills stay discoverable in long sessions. `/reload-skills` now sends only new or
  changed skills, and one source can register at most 1,024 skill hooks per session.
- **2026-10-04:** The Skills API (`/v1/skills`) is generally available; the earlier beta
  header is no longer needed.

## Open questions

- Will a shared skill format be adopted across vendors, as MCP was? Largely answered
  (2026-10-22): over 70 platforms support it (Anthropic's count), and it now has neutral
  governance at the AAIF. Still open: when the first versioned spec release and the
  security guidance arrive.

## Sources

- [Agent Skills overview](../../sources/2026/10/2026-10-04-claude-agent-skills-overview.md)
- [Claude Code release 2.1.304](../../sources/2026/10/2026-10-20-claude-code-2-1-304.md)
- [Dashboard Design: a Claude Code skill for analytics dashboards](../../sources/2026/10/2026-10-21-dashboard-design-skill.md)
- [Donating Agent Skills to the Agentic AI Foundation](../../sources/2026/10/2026-10-23-agent-skills-donated-to-aaif.md)
- [Claude Code releases 2.1.308 and 2.1.309](../../sources/2026/10/2026-10-23-claude-code-2-1-308-309.md)
