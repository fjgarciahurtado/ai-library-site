---
title: "MCPtoCodeMode: all your MCP servers behind three tools"
url: https://github.com/minkaworks/mcptocodemode
archived:
type: repo
author: minkaworks
date_published: 2026-10-22
date_added: 2026-10-23
tags: [mcp, tool-use, coding-agents, cost, open-source]
topics: [tooling/mcp, agents/tool-use]
---

## Summary

MCPtoCodeMode (MIT) is a single MCP server that sits in front of the MCP servers you
already use. Your agent sees three tools instead of every tool definition. To chain
calls, the agent writes one short JavaScript program instead of making many separate
tool calls. It appeared in today's GitHub trends (7 stars, first seen 2026-10-22; the
publication date is approximate). It is young but well documented, with 28 commits, a
CHANGELOG, a SPEC, a SECURITY policy, and CI.

## Key points

- **The three tools:** `search` finds methods by keyword and returns TypeScript
  signatures. `describe` gives the full signature of a server or method. `execute` runs
  JavaScript in which each server is a global, for example
  `await notes.get({ id: "1" })`. Only the return value, the console output, and the list
  of methods called go back to the model.
- **Sandbox:** the code runs in a QuickJS WebAssembly isolate with no network, no
  filesystem, and no credentials. Its only way out is through the configured MCP servers.
  Each run is limited to 30 seconds and 100 tool calls.
- **Install:**
  - Guided: `npx -y mcptocodemode setup` finds your installed agents and offers to edit
    their configs.
  - Claude Code: `claude mcp add codemode -- npx -y mcptocodemode serve`.
  - Codex: add `[mcp_servers.codemode]` with `command = "npx"` and
    `args = ["-y", "mcptocodemode", "serve"]` to `~/.codex/config.toml`.
  - Any client: `npx -y mcptocodemode serve --config /path/to/servers.json`.
- **Tested clients (per the README):** Claude Code 2.1, Codex 0.163, OpenCode 2.1,
  Pi 1.3, and Grok 1.0. Cursor's config format is covered by tests, but Cursor itself was
  not run.
- **Savings claim:** about 5.7× fewer input tokens on the author's test tasks. This is
  self-reported, and the caveats are in REPORT.md.

## Why it matters

It is a ready-made way to try the "code mode" pattern with many MCP servers: load tools
on demand, and chain calls in code so intermediate results stay out of the context.
Clients with built-in tool search (Claude Code has it on by default) already get part of
this benefit. The main gain is for multi-step chains and for clients without tool search.
