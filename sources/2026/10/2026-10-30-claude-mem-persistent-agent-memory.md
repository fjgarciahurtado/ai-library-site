---
title: "claude-mem: persistent memory across agent sessions"
url: https://github.com/thedotmack/claude-mem
archived:
type: repo
author: thedotmack
date_published: 2026-10-29
date_added: 2026-10-30
tags: [memory, plugins, coding-agents, open-source]
topics: [agents/memory, tooling/coding-agents]
---

## Summary

claude-mem is an Apache-2.0 plugin that gives coding agents memory between sessions. Hooks
record what the agent does during a session (tool calls and their results), a background
worker condenses that into summaries, and the relevant summaries are injected into later
sessions. It started as a Claude Code plugin and now also has install paths for Codex,
Gemini CLI, Copilot, OpenCode, Cursor, and others. It is very active: v15.4.0 to v15.6.0
shipped on 2026-10-28 and 2026-10-29. Date published is the latest release date.

## Key points

- **Install in Claude Code:** `/plugin marketplace add thedotmack/claude-mem`, then
  `/plugin install claude-mem`, then restart. Or run `npx claude-mem install`.
- **Pitfall:** `npm install -g claude-mem` installs only the library; it does not register
  the hooks or the worker, so nothing is recorded.
- **What it is good for:** picking up a project after a break without re-explaining
  decisions, or recalling how a past bug was fixed. Recent releases add a "My Work" viewer
  that groups past conversations by focus area and request, plus fixes to how it redacts
  recorded data.
- **Cost:** the observer that summarises sessions calls a model; v15.5.0 added opt-in
  batching for OpenAI-compatible endpoints to reduce that cost.
- Around 105,000 stars (+2,650 in the week to 2026-10-30), with steady daily commits,
  so the popularity looks organic.

## Why it matters

It is the most widely used third-party take on automatic memory for coding agents, as
opposed to hand-written files like CLAUDE.md or Claude Code's own auto-memory. Check what
it records before using it on sensitive repositories.
