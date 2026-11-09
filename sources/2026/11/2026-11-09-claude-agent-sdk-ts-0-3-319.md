---
title: "Claude Agent SDK (TypeScript) v0.3.319"
url: https://github.com/anthropics/claude-agent-sdk-typescript/releases/tag/v0.3.319
archived:
type: release
author: Anthropic
date_published: 2026-11-06
date_added: 2026-11-09
tags: [anthropic, sdk, agents, mcp]
topics: [frameworks/landscape]
---

## Summary

Version 0.3.319 of the TypeScript Claude Agent SDK, released on 2026-11-06, matches
Claude Code 2.1.319. Its one new feature is MCP task support in SDK sessions. The rest
are fixes to session metrics and session deletion.

## Key points

- **MCP tasks:** with `CLAUDE_AUTO_BACKGROUND_TASKS=1` and streaming input, an MCP tool
  call that the server runs as a task goes to the background, with `task_type` set to
  `"mcp_task"`. Not available on Bedrock, Vertex, or Foundry.
- `deleteSession()` now rejects with `ENOTEMPTY` if the session folder could not be fully
  deleted.
- `session_writes_lost` is sent only when the CLI exits 0, and now names the right
  session after `/clear` in a resumed session.
- The OpenTelemetry `claude_code.session.count` metric no longer counts `prewarm()`
  processes that were never claimed.
- Install: `npm install @anthropic-ai/claude-agent-sdk@0.3.319`.

## Why it matters

SDK agents can start long MCP jobs and keep working while they run, the same as Claude
Code in the terminal (see [Claude Code 2.1.319](2026-11-09-claude-code-2-1-319.md)).
