---
title: "REA: reverse engineering with agents (MCP server and CLI)"
url: https://github.com/morluto/rea
archived:
type: repo
author: morluto
date_published: 2026-11-19
date_added: 2026-11-19
tags: [mcp, cli, coding-agents, security, open-source]
topics: [tooling/mcp, practices/security]
---

## Summary

REA is an MIT-licensed MCP server and CLI that lets coding agents inspect software
without its source: native binaries, JavaScript and Electron apps, .NET assemblies,
Android APKs, websites, firmware, and packet captures. The agent explains how a feature
works and shows the evidence. `date_published` is the date the README was read; the repo
has no releases.

## Key points

- **Install:** `npx rea-agents setup` proposes config changes for your agents (review
  them, then restart the agent), or `npm install --global rea-agents` and `rea --help`.
  Needs Node.js 22.23.4+, 24.22.1+, or 26.12.1+.
- **Agents:** Claude Code, Codex, Cursor, Gemini CLI, Grok Build, and any client via
  manual MCP registration.
- **Engines:** static JavaScript analysis works on its own; native analysis drives an
  existing disassembler (Ghidra, Hopper, IDA, or Kuna) that you must obtain legally.
- **Good for:** understanding an undocumented dependency or binary, debugging a closed
  third-party app's behaviour, malware triage, and checking what an Electron app does.
- **Caution:** the README warns that look-alike repos copy its name; install only from
  the repo, rea.tools, or the `rea-agents` npm package. The star count (468k on
  2026-11-19, +15k in a week) is unusually high, but the repo shows about 8,450 commits
  and 670 open issues, so it is actively used.

## Why it matters

It turns a coding agent into a reverse-engineering assistant using tools many security
engineers already have. Only analyse software you are allowed to.
