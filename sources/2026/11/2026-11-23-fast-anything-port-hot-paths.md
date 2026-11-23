---
title: "fast-anything: port only the slow functions to Rust"
url: https://github.com/EL4CTEO/fast-anything
archived:
type: repo
author: EL4CTEO
date_published: 2026-11-23
date_added: 2026-11-23
tags: [coding-agents, plugins, mcp, skills, open-source]
topics: [tooling/coding-agents, tooling/skills]
---

## Summary

fast-anything is an MIT-licensed tool, Claude Code plugin, MCP server, and skill. It
profiles an app, finds the hot functions, has a coding agent port only those to Rust,
replays recorded calls to check the port matches the original, and swaps it in
reversibly. It supports Python, JS/TS, Ruby, Java, Kotlin, Go, PHP, C/C++, C#, and R. It
is the counterpart to [rust-anything](2026-11-20-rust-anything-incremental-rust-rewrites.md),
which rewrites a whole app. Version 0.8.0 was tagged on 2026-11-23 (the date above). The
creation date was not visible.

## Key points

- **Install:** `npm i -g @el4cteo/fast-anything` (or `cargo install fast-anything`).
  - Claude Code plugin: `/plugin marketplace add EL4CTEO/fast-anything`, then
    `/plugin install fast-anything@fast-anything`.
  - MCP server for Claude Code, Codex, or Cursor:
    `claude mcp add fast-anything -- fast-anything mcp`.
  - Other agents: point them at the `skills/fast-anything` folder.
- **Use:** run it in one shot with `fast-anything go --agent claude -- python app.py`,
  or in Claude Code with `/fast-anything:fast python app.py`.
  - Step by step: `scan`, `port [id]`, `verify`, `enable` / `disable`, `bench`,
    `report`, and `doctor`.
  - The MCP server exposes the same steps as eight tools (`fast_scan` to
    `fast_status`).
- **Good for:** speeding up a CPU-bound hotspot in an existing app without rewriting
  it. The behaviour check and the one-command `disable` keep the change low-risk.
- **Caveats (2026-11-23):** about 2,200 stars in two days, with 137 forks and commits
  from several contributors, so the stars look genuine. The benchmark tables are the
  author's own. Three bug reports about `verify`, `enable`, and `go` were opened on
  2026-11-23.

## Why it matters

It shows "verify by replay" spreading as a pattern for agent-written ports. Agents
change code only where profiling shows it pays off, and recorded behaviour checks the
result.
