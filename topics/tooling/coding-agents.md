---
title: "Coding agents"
tags: [coding-agents, agents, cli, ide]
related: [agents/agent-patterns, tooling/skills, tooling/mcp, practices/security]
last_reviewed: 2026-10-20
---

## Overview

Coding agents read a codebase, plan, edit files, run commands and tests, and iterate
until a task is done. They range from IDE assistants to terminal tools to cloud agents
that open pull requests by themselves. In 2026 they are the most widely used kind of AI agent.

## Key concepts

- **Main tools:** Claude Code (Anthropic; CLI, desktop app, web app, IDE extensions, and
  cloud scheduled routines), Codex (OpenAI; GPT-6 models since October 2026), Gemini CLI
  and Jules (Google), GitHub Copilot's agent mode, and editors such as Cursor.
  Open-source options include Aider, Cline, and OpenCode. Adoption extends to government:
  over 1,500 engineers and technical staff at Singapore's GovTech use Claude Code
  (Anthropic, 2026-10-14).
- **Project instructions:** files such as `CLAUDE.md` or `AGENTS.md` describe build
  commands, conventions, and rules.
- **Permissions:** modes from "ask every time" to automatic approval with safety checks;
  sandboxes and worktrees isolate changes. Prompts alone protect little: Anthropic found
  users approved about 93% of Claude Code prompts, and OS-level sandboxing (Seatbelt,
  bubblewrap) cut prompts by 84% while confining writes to the workspace and blocking
  network by default. Claude Code's auto mode adds a classifier that catches about 83% of
  overeager actions, and project settings and hooks are not parsed before the user
  trusts the project (Anthropic, May 2026; see [security](../practices/security.md)).
  Since 2.1.304 (2026-10-19), `/auto-mode-setup` teaches the auto mode classifier about
  a project, and a permission mod can answer `decider: "person"` to require a human
  decision even under auto mode.
- **Extensibility:** [skills](skills.md), slash commands, hooks, subagents, plugins,
  and [MCP](mcp.md) servers. Hooks used as guardrails should fail closed: since 2.1.295
  (2026-10-08), Claude Code hooks can set `onFailure: "block"` so that a hook that
  crashes or times out blocks the action.
- **Background and scheduled agents:** run in the cloud on a schedule or trigger.
- **SDKs:** for example the Claude Agent SDK packages the Claude Code harness as a
  library for building your own agents.
- **Infrastructure at agent scale:** when most commits come from agents, source control
  and review become the bottleneck. Anthropic's merges grew from about 2,500 a day (May
  2026) to over 30,000 (September 2026), with about 25 million CI checkouts a day. In
  five months it replaced git with a server-side, on-demand system (Scion), dropped its
  global merge queue in favour of post-merge testing, and added review rules that
  separate cosmetic from sensitive changes. Claude resolves most merge conflicts, and
  engineers' role shifted to setting constraints and reviewing intent.
- **Reviewing agent-written code:** the Claude Code team (about 90% of its code written
  by Claude) aims for the least human review time that does not raise revert or incident
  rates. Every PR gets a multi-agent AI review (parallel bug hunters, a voting step, only
  confirmed findings posted) and a security pass; open findings block merge. Human
  approvals scale with risk set by a classifier: none for low-risk changes, one person for
  ordinary changes, two for the riskiest paths. An agent's approval never replaces a
  human's. Review rounds are capped at three to make review converge. Anthropic reports
  merged PRs more than doubled from June to September 2026 while the reverted share fell
  by over 40% (Anthropic's own figures). The hosted Claude Code Review product offers
  Quick, Standard, and Deep levels per organization or repository (since 2026-10-19).

## How to use it

- Give the agent a way to check its work: tests, type checks, linters, screenshots.
- Keep project instruction files short, current, and specific.
- Start with small, well-scoped tasks; review diffs before merging.
- Never give an agent production credentials it does not need.
- Add a `REVIEW.md` saying what failure looks like in each area, and fix recurring
  review comments at the source (a lint rule, a skill, or `CLAUDE.md`).

## Current state

- **2026-10-19:** Claude Code 2.1.304: `/auto-mode-setup`, Code Review levels (Quick,
  Standard, Deep) and an option to review every repository in an organization,
  `decider: "person"` and `e.isReadOnly` for permission mods, settings-layer rewriting
  for managed mods, a usage warning before expensive resumes on Pro and Max, and tool
  search on by default behind custom gateways.
- **2026-10-16:** Claude Code 2.1.302: fork subagents on by default in `claude -p`, the
  Agent SDK, desktop, and VS Code; desktop and VS Code always run subagents in the
  background; headless sessions on third-party providers start in `default` permission
  mode; `CLAUDE_CODE_AUTO_MODE_MODEL` for the client-side classifier; at most 12 hooks per
  event at once; an MCP compatibility fix. 2.1.303 is fixes only.
- **2026-10-15:** The Claude Code team described its code review process (see
  Reviewing agent-written code).
- **2026-10-15:** Claude Code 2.1.301: a cap on how long unattended retry mode waits for
  usage limits, OpenTelemetry fields that show why auto mode allowed or blocked a tool
  call, summarise-first switching to smaller-context models, and fixes for silent
  Grep/Glob failures and hook-created worktrees deleted on quit.
- **2026-10-14:** Claude Code 2.1.299 and 2.1.300: idle compaction before the prompt
  cache expires, `@` mentions that pass paths instead of contents, stricter MCP allow
  rules, more fail-closed hook and sandbox behaviour, and OpenTelemetry GenAI attributes.
- **2026-10-13:** Anthropic described Scion, its in-house git replacement (see
  Infrastructure at agent scale).
- **2026-10-06 to 2026-10-09:** Claude Code 2.1.292–2.1.296: the stateless MCP protocol
  becomes the default for local servers, the Agent tool takes an `effort` parameter for
  subagents, hooks can fail closed, Claude Haiku 5.5 becomes the default Haiku (2.1.293),
  and 2.1.294 fixed a bug that let instruction-style `prompt` hooks allow what they
  should block.

## Open questions

- How teams should review the volume of code agents produce. Partly answered
  (2026-10-13): Anthropic uses semantic approval rules and post-merge testing rather
  than reviewing every change equally. On 2026-10-15 the Claude Code team published
  outcome data (reverted share down over 40% while merged PRs doubled), but only for its
  own repositories; no independent or cross-company figures yet.

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
- [How the Claude Code team does code review](../../sources/2026/10/2026-10-19-claude-code-team-code-review.md)
- [Claude Code releases 2.1.302 and 2.1.303](../../sources/2026/10/2026-10-19-claude-code-2-1-302-303.md)
- [Claude Code release 2.1.304](../../sources/2026/10/2026-10-20-claude-code-2-1-304.md)
