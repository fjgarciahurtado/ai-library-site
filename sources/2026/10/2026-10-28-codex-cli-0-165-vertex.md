---
title: "Codex CLI 0.165.0"
url: https://github.com/openai/codex/releases/tag/rust-v0.165.0
archived:
type: release
author: OpenAI
date_published: 2026-10-27
date_added: 2026-10-28
tags: [openai, coding-agents, cli, memory, google]
topics: [tooling/coding-agents, agents/memory]
---

## Summary

Codex CLI 0.165.0 was released on 2026-10-27. It adds a built-in Google Cloud Vertex AI
provider, turns Memory v2 on by default for new profiles (with import of memories from
other agents), and lets you change reasoning effort mid-conversation. It also adds GPT-6.1
Terra to the model catalogue and better session navigation across worktrees.

## Key points

- **Vertex AI provider:** set `model_provider = "gcp"` in the Codex config to run through
  Google Cloud Vertex AI without a custom provider block.
- **Memory v2 by default:** fresh profiles get Memory v2 switched on. It can import
  memories from other coding agents, so you can carry context over when switching tools.
  Existing profiles keep their current setting.
- **Effort mid-conversation:** on supported models, reasoning effort can now be changed
  during a conversation by default.
- **GPT-6.1 Terra** is in the model catalogues.
- **Worktrees:** the session picker gains a repository filter, and the agent command
  centre groups sessions by directory, which helps when you work across linked worktrees.
- **App-server API:** experimental attached thread forks.
- Update with `npm install -g @openai/codex@0.165.0` (or your package manager).

## Why it matters

Memory import lowers the cost of trying Codex next to Claude Code. The Vertex provider
makes Codex usable for teams whose model access goes through Google Cloud.
