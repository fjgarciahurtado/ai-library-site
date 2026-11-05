---
title: "Codex docs: Import from another agent"
url: https://learn.chatgpt.com/docs/import
archived:
type: docs
author: OpenAI
date_published:
date_added: 2026-11-05
tags: [coding-agents, memory, openai, cli, skills, mcp]
topics: [agents/memory, tooling/coding-agents]
---

## Summary

OpenAI's documentation page for importing an existing setup from another coding agent
into Codex (formerly at developers.openai.com/codex/import). The ChatGPT desktop app
imports from Claude Code, Claude Cowork, or Cursor; Codex CLI imports from Claude Code or
Cursor. Instructions, settings, skills, plugins, MCP servers, hooks, subagents, project
memories, and recent chats are each mapped to the Codex equivalent. The page shows no
publication date; it was read on 2026-11-05.

## Key points

- **How to run it:** in Codex CLI, type `/import` in an idle session, pick Claude Code or
  Cursor, choose the setup, project files, and chats, then review the result. In the
  desktop app, use **Settings > Import**.
- **Mapping:** instruction files → `AGENTS.md`; `settings.json` → `config.toml`; skills →
  skills; slash commands → skills; plugins → plugins; MCP server configuration → Codex
  MCP configuration; hooks → Codex hooks; subagents → Codex subagents; "Project memories
  from Claude Code" → Codex memories; chats from the last 30 days → chats.
- **One-time vs sync:** a one-time copy by default. Only the desktop app offers automatic
  updates (under **Settings > Import**) to keep imported work in sync; the page does not
  describe sync for the CLI.
- **Limits:** the CLI imports at most 50 chats from the last 30 days. Importing does not
  change or delete the source agent's setup.
- **Not stated:** which exact files count as Claude Code "project memories" (for example
  `CLAUDE.md` versus the auto-memory `MEMORY.md` directory), and what happens to an
  existing `AGENTS.md`. A secondary write-up says an existing `AGENTS.md` is skipped; that
  is unconfirmed.
- **Check after importing:** tool permissions in imported skills and agents, MCP servers
  with custom auth, headers, or environment variables (may need signing in again), hooks
  whose behaviour may differ, and prompt templates that rely on arguments or shell
  interpolation.
- Codex stores its own memories under `~/.codex` (`$CODEX_HOME/memories_v2/` in a fresh
  CLI home), per the separate Memories page.

## Why it matters

It is the most complete cross-agent migration path so far: almost every Claude Code
customisation (skills, hooks, MCP, subagents, memories) has a Codex counterpart, which
makes trying a second agent on the same project cheap.
