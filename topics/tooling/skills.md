---
title: "Agent skills"
tags: [skills, agents, anthropic]
related: [tooling/mcp, agents/tool-use, tooling/coding-agents]
last_reviewed: 2026-10-20
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
  Claude API (with code execution), and Managed Agents.
- **Plugins:** bundles of skills, commands, hooks, agents, and MCP servers that can be
  shared through marketplaces (Claude Code plugins).

## How to use it

- Write the `description` carefully: it decides when the skill is used.
- Keep `SKILL.md` focused; move long reference material into separate files.
- Include scripts for steps that must be exact.
- Test that the skill triggers on the right requests and not on the wrong ones.
- Review third-party skills before installing: they can contain instructions and code.

## Current state

- **2026-10-19:** Claude Code 2.1.304 resends the full skill list after compaction, so
  skills stay discoverable in long sessions. `/reload-skills` now sends only new or
  changed skills, and one source can register at most 1,024 skill hooks per session.
- **2026-10-04:** The Skills API (`/v1/skills`) is generally available; the earlier beta
  header is no longer needed.

## Open questions

- Will a shared skill format be adopted across vendors, as MCP was?

## Sources

- [Agent Skills overview](../../sources/2026/10/2026-10-04-claude-agent-skills-overview.md)
- [Claude Code release 2.1.304](../../sources/2026/10/2026-10-20-claude-code-2-1-304.md)
