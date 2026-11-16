---
title: "Run tool calls from code with Code Mode"
url: https://code.claude.com/docs/en/code-mode
archived:
type: docs
author: Anthropic
date_published: 2026-11-16
date_added: 2026-11-16
tags: [anthropic, coding-agents, cli, tool-use]
topics: [tooling/coding-agents, agents/tool-use]
---

## Summary

The Claude Code documentation page for Code Mode, an experimental, off-by-default mode
(since 2.1.323) in which Claude writes JavaScript that makes several tool calls in one
step, instead of asking for one tool call at a time. The page was 404 on 2026-11-13 and
was live when read on 2026-11-16 (no publication date shown; the date above is the read
date). It explains how to turn the mode on, its requirements and limits, and how
permissions apply.

## Key points

- **Turn it on:** start with `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1 claude`, or put the
  variable in the `env` block of `~/.claude/settings.json`; confirm the first-run prompt.
  Project settings cannot turn it on. A `0` anywhere keeps it off; organizations block it
  by setting `0` in managed settings (they cannot force it on).
- **Requirements:** Claude Code 2.1.323 or later (native build), interactive terminal
  sessions only (not `-p`, the Agent SDK, VS Code, Desktop, or cloud), a Claude
  subscription or Console account (no Bedrock, Vertex, Foundry, gateways, or API key
  helpers), Opus 5.5, Sonnet 5.5, Haiku 5.5, or Fable 5.2, and no HIPAA or zero data
  retention setup. OpenTelemetry export, agent teams, and `DISABLE_TELEMETRY` also block it.
- **How it works:** Claude's code can run commands in parallel, feed one result into the
  next call, and return only what Claude needs. You see the tool calls; `Ctrl+O` shows
  the code. The tool that runs the code is called `REPL`.
- **Permissions:** every tool call made by the code still goes through deny and ask rules
  and `PreToolUse` hooks. In auto mode the classifier reviews the code once, not each
  call, so it cannot see runtime values such as paths found by a search. A `PreToolUse`
  hook matching `REPL` can inspect the code in `tool_input.code`.
- **Limits:** code stops after 10 minutes unless it runs in the background (up to 2 hours,
  needs auto or `bypassPermissions` mode); Code Mode sessions resume only with Code Mode
  on; no Remote Control, Claude in Chrome, computer use, or move to Desktop/background.
- **Good for:** the same change across many files, searches whose results need filtering
  before Claude reads them, and several independent commands at once.

## Why it matters

It brings the "code execution with tools" pattern, until now done with MCP proxies, into
Claude Code itself, and answers how to enable it. The auto-mode caveat matters: rules
and hooks, not the classifier, are what still check each call.
