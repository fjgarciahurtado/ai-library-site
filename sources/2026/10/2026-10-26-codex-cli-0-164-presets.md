---
title: "OpenAI Codex CLI 0.164.0: presets and inline settings"
url: https://github.com/openai/codex/releases/tag/rust-v0.164.0
archived:
type: release
author: OpenAI
date_published: 2026-10-23
date_added: 2026-10-26
tags: [openai, coding-agents, cli, mcp, security]
topics: [tooling/coding-agents, tooling/mcp]
---

## Summary

Codex CLI 0.164.0 (2026-10-23, from the GitHub release page) adds reusable presets for
prompts, slash commands, and permission settings, and lets `/model` and `/permissions`
take their values inline. It also adds image previews in capable terminals, enterprise
sign-in for MCP connections, and credential masking in remote shells. The changelog
lists over 150 pull requests. Most of the rest is about compaction, session resume,
Windows, and the remote exec server.

## Key points

- **Presets:** `/presets` stores prompts, slash commands, or permission settings in ten
  numbered slots, with a keyboard menu. There are also quick-dial presets for the
  terminal title and status-line layouts.
- **Inline arguments:** `/model` takes model, reasoning effort, and speed in one command.
  `/permissions` takes a permission profile. `/title` and `/statusline` take arguments
  that last only for the session.
- **Image previews:** images the agent viewed or generated show in the fullscreen
  transcript on terminals with Kitty or Sixel graphics.
- **MCP:** connections can authenticate with eligible Codex account grants or a
  dedicated sign-in, including OAuth clients that need a client secret. Changes to a
  server's tool list now take effect within a turn. OAuth discovery prefers
  resource-specific scopes, and coordinated OAuth refresh is on by default.
- **Credential masking:** credentials are hidden in supported remote Bash commands and
  Zsh snapshot sessions, including credentials from custom providers.
- **Other:** the Amazon Bedrock setup wizard is on by default. A new `log_dir` setting
  chooses where the SQLite logs go. `-c`/`--config` overrides are kept when given at
  several subcommand levels. A failed compaction no longer leaves a partial summary in
  history. Sessions resume with their saved thread settings.
- **Upgrade:** `npm install -g @openai/codex@latest` (or your package manager), then run
  `/presets` in a session to set up slots.

## Why it matters

Presets and inline `/model` arguments make it quicker to switch between set-ups (for
example a cheap fast model and a careful reasoning model) without editing config files.
The MCP auth changes help in companies whose MCP servers sit behind single sign-on.
