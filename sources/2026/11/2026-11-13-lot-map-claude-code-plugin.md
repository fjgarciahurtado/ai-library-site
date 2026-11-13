---
title: "lot-map: a live map of what Claude Code is doing"
url: https://github.com/alexeyw/lot-map
archived:
type: repo
author: alexeyw
date_published: 2026-11-09
date_added: 2026-11-13
tags: [plugins, coding-agents, open-source]
topics: [tooling/coding-agents]
---

## Summary

lot-map is a Claude Code plugin (MIT) that shows a live map beside the chat: tool calls,
model steps, hooks, skills, subagents, and compaction light up as they happen. It is built
on Claude Code's hooks and mod pane, runs locally, and makes no network requests. It
appeared in the GitHub trends report with about 630 stars in its first four days
(2026-11-13); the README, changelog, and test commands suggest a real, maintained project.
The publication date is approximate (first seen in trends on 2026-11-13, four days old).

## Key points

- **Install:** `/plugin install lot-map --marketplace alexeyw/lot-map`, or from a shell
  `claude plugin marketplace add alexeyw/lot-map` then
  `claude plugin install lot-map@lot-map`. In the desktop app: **+** → **Plugins** →
  **Add marketplace** (`alexeyw/lot-map`).
- **Use:** the pane opens on its own in terminals at least 144 columns wide; otherwise type
  `/lot-map`. Options are in `/config` or `claude plugin configure`.
- **Update:** `claude plugin marketplace update lot-map`, then
  `claude plugin update lot-map@lot-map`, then start a new session.
- Built and tested on Claude Code 2.1.321 on macOS; users report it works on Windows. The
  optional terminal picture needs iTerm2 3.5+, kitty, or Ghostty.
- It sees each tool call's full input (hooks receive it), but the README says it only
  passes events through and does not read files or start processes. The marketplace
  follows the `main` branch, so updates arrive unreviewed.

## Why it matters

Long sessions with subagents and hooks are hard to follow from the transcript alone. A
live view helps you see where time and tool calls go and spot a stuck or looping agent.
