---
title: "stalemap: tell coding agents which dependencies changed after their cutoff"
url: https://github.com/Umair/stalemap
archived:
type: repo
author: Umair
date_published: 2026-10-19
date_added: 2026-10-22
tags: [coding-agents, mcp, plugins, open-source]
topics: [tooling/coding-agents, tooling/mcp]
---

## Summary

stalemap finds the npm dependencies in a project that changed after the model's training
cutoff, and tells the coding agent about them so it does not write code against an old
API. It works as a Claude Code plugin, an MCP server, or a setup command for other
agents. It is MIT licensed, published on npm (0.4.1 when read), and was in the
2026-10-22 GitHub trends log (97 stars in 3 days). The publication date is approximate,
based on that log.

## Key points

- **Install in Claude Code:** `/plugin marketplace add Umair/stalemap`, then
  `/plugin install stalemap@stalemap`.
- **Other agents:** `stalemap setup --agent cursor` (also `codex`, `opencode`, `claude`;
  add `--dry-run` to preview). The README says the non-Claude setups have not been tested
  in real installs yet. Any MCP client can run it as `npx -y stalemap@latest mcp`.
- **Three outputs:** a ranked list of changes written into `AGENTS.md` or `CLAUDE.md`; an
  edit-time guard that runs the project's type check after each edit and links errors to
  the matching release note; and a `search_changes` MCP tool the agent can query.
- **How it works:** it takes the model's cutoff from models.dev (or `--cutoff`), picks the
  newest dependency version released at least 30 days before it, and compares its type
  definitions and release notes with the version you have installed. It checks only
  packages your code imports, unless you pass `--all`. The import scan runs locally.
- **Limits:** JavaScript and TypeScript only, one `package.json` (no workspaces yet). It
  is early-stage and maintained by one person, and the author wrote its benchmark.

## Why it matters

Out-of-date API knowledge is a common cause of agent mistakes in fast-moving JS
projects. This tool targets that problem with release data, without fetching whole
documentation sets the way Context7-style servers do. It is useful when a project uses
packages with recent major releases.
