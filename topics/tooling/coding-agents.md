---
title: "Coding agents"
tags: [coding-agents, agents, cli, ide]
related: [agents/agent-patterns, tooling/skills, tooling/mcp, practices/security]
last_reviewed: 2026-10-16
---

## Overview

Coding agents read a codebase, plan, edit files, run commands and tests, and iterate
until a task is done. They range from IDE assistants to terminal tools to cloud agents
that open pull requests by themselves. In 2026 they are the most widely used kind of AI agent.

## Key concepts

- **Main tools:** Claude Code (Anthropic; terminal, IDE, desktop, web), Codex (OpenAI),
  Gemini CLI and Jules (Google), GitHub Copilot's agent mode, and editors such as Cursor.
  Open-source options include Aider, Cline, and OpenCode.
- **Project instructions:** files such as `CLAUDE.md` or `AGENTS.md` describe build
  commands, conventions, and rules.
- **Permissions:** modes from "ask every time" to automatic approval with safety checks;
  sandboxes and worktrees isolate changes. Prompts alone protect little: Anthropic found
  users approved about 93% of Claude Code prompts, and OS-level sandboxing (Seatbelt,
  bubblewrap) cut prompts by 84% while confining writes to the workspace and blocking
  network by default. Claude Code's auto mode adds a classifier that catches about 83% of
  overeager actions, and project settings and hooks are not parsed before the user
  trusts the project (Anthropic, May 2026; see [security](../practices/security.md)).
- **Extensibility:** [skills](skills.md), slash commands, hooks, subagents, plugins,
  and [MCP](mcp.md) servers. Hooks used as guardrails should fail closed: since 2.1.295
  (2026-10-08), Claude Code hooks can set `onFailure: "block"` so that a hook that
  crashes or times out blocks the action.
- **Background and scheduled agents:** run in the cloud on a schedule or trigger.
- **SDKs:** for example the Claude Agent SDK packages the Claude Code harness as a
  library for building your own agents.
- **Infrastructure at agent scale:** when most commits come from agents, source control
  and review become the bottleneck. Anthropic's merges grew from about 2,500 a day (May
  2026) to over 30,000 (September 2026), and it replaced git with a server-side,
  on-demand system (Scion), dropped its global merge queue in favour of post-merge
  testing, and added review rules that separate cosmetic from sensitive changes.

## How to use it

- Give the agent a way to check its work: tests, type checks, linters, screenshots.
- Keep project instruction files short, current, and specific.
- Start with small, well-scoped tasks; review diffs before merging.
- Never give an agent production credentials it does not need.

## Current state

- **2026-10-15:** Claude Code 2.1.301: a cap on how long unattended retry mode waits for
  usage limits, OpenTelemetry fields that show why auto mode allowed or blocked a tool
  call, summarise-first switching to smaller-context models, and fixes for silent
  Grep/Glob failures and hook-created worktrees deleted on quit.
- **2026-10-14:** Claude Code 2.1.299 and 2.1.300: idle compaction before the prompt
  cache expires, `@` mentions that pass paths instead of contents, stricter MCP allow
  rules, more fail-closed hook and sandbox behaviour, and OpenTelemetry GenAI attributes.
- **2026-10-14:** Singapore's GovTech has over 1,500 engineers and technical staff using
  Claude Code to modernise government systems (Anthropic, Singapore office launch).
- **2026-10-13:** Anthropic described Scion, its in-house git replacement built in five
  months to handle about 25 million CI checkouts and over 30,000 merges a day. Engineers'
  role shifted to setting constraints and reviewing intent; Claude resolves most merge
  conflicts.

- **2026-10-06 to 2026-10-09:** Claude Code 2.1.292–2.1.296: the stateless MCP protocol
  becomes the default for local servers, the Agent tool takes an `effort` parameter for
  subagents, hooks can fail closed, and 2.1.294 fixed a bug that let instruction-style
  `prompt` hooks allow what they should block.
- **2026-10-07:** Claude Code 2.1.293 made Claude Haiku 5.5 its default Haiku model.
- **2026-10-04:** Claude Code runs as CLI, desktop app, web app, and IDE extensions, with
  cloud scheduled routines. OpenAI's GPT-6 models are available in Codex.

## Open questions

- How teams should review the volume of code agents produce. Partly answered
  (2026-10-13): Anthropic uses semantic approval rules and post-merge testing rather
  than reviewing every change equally, but gives no data on defect rates.

## Sources

- [Agent Skills overview](../../sources/2026/10/2026-10-04-claude-agent-skills-overview.md)
- [Introducing GPT-6 Sol and Luna](../../sources/2026/10/2026-10-04-gpt-6-sol-and-luna.md)
- [How we contain Claude across products](../../sources/2026/10/2026-10-09-how-anthropic-contains-claude.md)
- [Claude Haiku 5.5](../../sources/2026/10/2026-10-08-claude-haiku-5-5.md)
- [Claude Code 2.1.292 to 2.1.296](../../sources/2026/10/2026-10-12-claude-code-2-1-292-296.md)
- [Redesigning source control at Anthropic](../../sources/2026/10/2026-10-14-anthropic-scion-source-control.md)
- [Claude Code releases 2.1.299 and 2.1.300](../../sources/2026/10/2026-10-15-claude-code-2-1-299-300.md)
- [Anthropic opens Singapore office](../../sources/2026/10/2026-10-15-anthropic-singapore-office.md)
- [Claude Code release 2.1.301](../../sources/2026/10/2026-10-16-claude-code-2-1-301.md)
