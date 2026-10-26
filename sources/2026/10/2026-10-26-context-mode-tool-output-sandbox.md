---
title: "Context Mode: keep raw tool output out of the context window"
url: https://github.com/mksglu/context-mode
archived:
type: repo
author: mksglu
date_published: 2026-10-26
date_added: 2026-10-26
tags: [mcp, plugins, coding-agents, tokens, memory]
topics: [tooling/mcp, agents/memory]
---

## Summary

Context Mode is an MCP server and Claude Code plugin that runs large tool calls in a
sandbox. Only what the code prints goes back to the model, and the raw output stays out.
It also records session events in SQLite so the agent can recover its working state
after compaction. It was a "rising" repo in today's GitHub trends (+1,402 stars in 7
days, about 32,000 in total, over 2,200 commits). It is source-available under the
Elastic License 2.0, not an OSI open-source licence. `date_published` is the date the
README was read; the project is older.

## Key points

- **Install in Claude Code (plugin, with hooks and slash commands):**
  `/plugin marketplace add mksglu/context-mode`, then
  `/plugin install context-mode@context-mode`, then `/reload-plugins` (needs Claude Code
  1.0.33 or later). Check it with `/context-mode:ctx-doctor`.
- **MCP only (no automatic routing):**
  `claude mcp add context-mode -- npx -y context-mode`.
- **Other agents:** the README lists 17 platforms, including Codex CLI, Gemini CLI,
  Copilot (VS Code, JetBrains, CLI), Cursor, OpenCode, Kiro, and Zed. Hook support
  differs between them.
- **What it is good for:** long sessions where logs, test output, large files, or web
  pages would fill the context. `ctx_execute` runs code in 12 language runtimes and
  returns only stdout. `ctx_fetch_and_index` fetches a page, indexes it, and caches it
  for 24 hours, so the agent can search it instead of reading all of it.
- **Session memory:** file edits, git operations, tasks, and errors go into SQLite and
  are found again after compaction with full-text search (FTS5/BM25 plus trigram
  matching).
- **Claimed savings:** the README gives one example in which 315 KB of output became
  5.4 KB (about 98% less). This is self-reported.

## Why it matters

It deals with the other half of context bloat: tool results, not tool definitions.
Tool search and code-mode proxies such as MCPtoCodeMode cut the definitions. The two
approaches can be combined.
