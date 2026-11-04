---
title: "Model Context Protocol (MCP)"
tags: [mcp, tool-use, security]
related: [agents/tool-use, tooling/skills, practices/security]
last_reviewed: 2026-11-04
---

## Overview

MCP is an open protocol for connecting AI applications to tools and data. A service
builds one MCP server; any MCP-capable client (Claude, ChatGPT, IDEs, coding agents,
custom agents) can use it. Anthropic introduced it in November 2024; within a year it was
the de facto standard, with official SDKs in many languages.

## Key concepts

- **Host / client / server:** the host app (for example Claude Code) runs a client that
  connects to each server.
- **Primitives:** *tools* (functions the model can call), *resources* (data the app can
  read), *prompts* (reusable templates).
- **Stateless core:** since the 2026-07-28 spec there is no `initialize` handshake and
  no protocol session; each request stands alone, so remote servers can run behind
  ordinary load balancers (routing uses `Mcp-Method` and `Mcp-Name` headers). This was
  the largest revision since launch, so servers and clients built on earlier versions
  need changes.
- **Deprecated features:** the 2026-07-28 spec deprecated Roots, Sampling, and Logging
  with a 12-month removal window, so they may disappear from around July 2027.
- **Scale:** the maintainers reported SDK downloads approaching 500 million a month
  (2026-07-28).
- **Transports:** stdio for local servers; HTTP for remote ones.
- **Authorization:** OAuth-based for remote servers, aligned with OpenID Connect.
- **Extensions:** a formal extensions framework and deprecation policy. Tasks (for
  long-running operations) is an opt-in extension.
- **MCP Apps:** servers can render interactive HTML UIs in a sandboxed iframe.
- **MCP connector:** some APIs (including Claude's) can connect to remote MCP servers directly.
- **Hosted connectors:** clients increasingly offer a curated list of hosted servers you
  sign in to once, instead of installing servers yourself. Claude has connectors, and
  since 2026-10-28 GitHub Copilot has "connectors" (GitHub-verified MCP servers, public
  preview): 26 services such as Slack, Figma, Notion, Sentry, and Linear, shared across
  the Copilot app, Copilot CLI (`/mcp` → **Connectors**), VS Code, cloud sessions, and
  GitHub Mobile.
- **Adoption of the stateless spec:** Claude Code negotiates the 2026-07-28 protocol by
  default for local stdio servers since 2.1.292 (2026-10-06; opt out with
  `MCP_PROTOCOL_NEGOTIATION=legacy`, and servers that do not answer fall back to the old
  handshake), and for cloud session and Remote Control connectors since 2.1.299
  (2026-10-14). Google ADK for Python supports MCP SDK 2.x as an opt-in (2.11,
  2026-10-02), and Microsoft Agent Framework (Python) moved to MCP 2.x as a breaking
  change in 1.23.0 (2026-10-22). Some servers on the new spec omit `resultType`, `ttlMs`,
  or `cacheScope`, so clients must tolerate their absence (Claude Code fixed this in
  2.1.302).
- **Client behaviour in Claude Code:** MCP permission rules match exact server names
  (`mcp__a` no longer matches `a__b`), and policy-blocked servers are not contacted
  (2.1.299). Tool descriptions are capped at 4,096 characters by default. After a
  dropped connection, an HTTP tool call is retried only if the tool is read-only or
  idempotent (2.1.307). Cloud sessions do not wait for a plugin's stdio servers unless
  the server sets `alwaysLoad: true`, and tool search is on by default behind a custom
  `ANTHROPIC_BASE_URL` (2.1.304). Since 2.1.309 sandboxed commands cannot modify the
  `--mcp-config` file, and a disabled server is no longer reconnected by a later
  permission prompt. Headless runs recover servers after sleep (2.1.307) and do not
  repeat a call that timed out waiting for an unanswered elicitation (2.1.310). Since
  2.1.314 (2026-10-30), servers that also work signed out are used without sign-in when
  their stored sign-in breaks. For organizations: since 2.1.305, `allowedMcpServers` no
  longer filters `managed-mcp.json` stdio servers that use `${VAR}` only in `env`, so
  list servers you mean to block in `deniedMcpServers`.
- **Client behaviour in Codex:** since Codex CLI 0.164.0 (2026-10-23) MCP connections
  can sign in with Codex account grants or a dedicated sign-in, including OAuth clients
  that need a secret; tool-list changes apply within a turn, and coordinated OAuth
  refresh is on by default.
- **Notable new servers (October 2026):** MCPtoCodeMode (MIT) puts all your MCP servers
  behind three tools (`search`, `describe`, `execute`); the model writes JavaScript that
  runs in a QuickJS sandbox with no network or filesystem, and the project claims about
  5.7× fewer input tokens (self-reported). Graphicle (pre-release) gives coding agents
  code-graph tools (`query_graph`, `get_neighbors`, `shortest_path`) and memory tools
  (see [memory](../agents/memory.md)). stalemap's `search_changes` tool reports
  dependency changes after a model's cutoff (`npx -y stalemap@latest mcp`; see
  [coding agents](coding-agents.md)). Context Mode (Elastic License 2.0, about 32,000
  stars) handles the output side. It runs large tool calls in a sandbox
  (`ctx_execute`, 12 runtimes) and returns only stdout. It indexes fetched pages for
  search and keeps session events in SQLite so work state survives compaction
  ([memory](../agents/memory.md)). It claims about 98% less output in one example
  (self-reported). codebase-memory-mcp (MIT, about 48K stars) is a local server with 17
  tools (`trace_path`, `detect_changes`, `get_architecture`, and others) over a
  persistent graph of code, docs, and infrastructure, with no API key.

## How to use it

- Use existing servers for common services before writing your own.
- Install only servers you trust; a server's tool descriptions and outputs go straight
  into the model's context (see [security](../practices/security.md)).
- Keep tool lists small; prefer clients that load tools on demand. With many servers, a
  "code mode" proxy such as MCPtoCodeMode exposes only search/describe/execute tools and
  lets the model chain calls in sandboxed code. Add it to Claude Code with
  `claude mcp add codemode -- npx -y mcptocodemode serve`, or run
  `npx -y mcptocodemode setup` for other agents.
- If tool *results* (logs, test output, web pages) are what fill your context, try
  Context Mode: `claude mcp add context-mode -- npx -y context-mode`, or install it as a
  plugin (`/plugin marketplace add mksglu/context-mode`) to get its routing hooks.
- Build a server when you want one integration usable from many AI clients.

## Current state

- **2026-11-04:** Microsoft's APM can declare MCP servers by registry ID (for example
  `io.github.github/github-mcp-server`) in `apm.yml` next to skills, install them into
  each supported agent, and check them against an `apm-policy.yml`; Dependabot can now
  update its git dependencies (see [skills](skills.md)).
- **2026-10-30:** codebase-memory-mcp (v0.12.1, 2026-10-16) is rising in GitHub trends
  (see above and [memory](../agents/memory.md)).
- **2026-10-28:** GitHub Copilot connectors (verified MCP servers, preview, all plans;
  Business and Enterprise need the `Editor preview features` policy). VS Code's new
  customizations browser lists MCP servers next to skills and plugins.
- **2026-10-22:** Microsoft Agent Framework (Python) 1.23.0 migrates to MCP 2.x as a
  breaking change: new transports, errors, and schemas, and separate caller-owned and
  framework-owned client lifecycles. Google ADK (Python) 2.13.0 has only MCP fixes; its
  notes do not say MCP SDK 2.x became the default.

## Open questions

- How quickly clients and servers migrate to the stateless spec. Partly answered: Google
  ADK supports MCP SDK 2.x only as an opt-in (2026-10-02), while Claude Code has used the
  new protocol by default for local servers since 2026-10-06 and for its cloud and
  Remote Control connectors since 2026-10-14. Microsoft Agent Framework (Python) moved to
  MCP 2.x in 1.23.0 (2026-10-22). Checked 2026-10-26: the Codex 0.164 and ADK 2.13
  release notes do not mention the 2026-07-28 protocol, and modelcontextprotocol.io has
  no client support matrix. Still unknown: other major clients, and how many servers
  support it.

## Sources

- [The 2026-07-28 MCP specification](../../sources/2026/10/2026-10-04-mcp-spec-2026-07-28.md)
- [Google ADK (Python) v2.11.0](../../sources/2026/10/2026-10-04-google-adk-python-v2-11.md)
- [Claude Code 2.1.292 to 2.1.296](../../sources/2026/10/2026-10-12-claude-code-2-1-292-296.md)
- [Claude Code releases 2.1.299 and 2.1.300](../../sources/2026/10/2026-10-15-claude-code-2-1-299-300.md)
- [Claude Code releases 2.1.302 and 2.1.303](../../sources/2026/10/2026-10-19-claude-code-2-1-302-303.md)
- [Claude Code release 2.1.304](../../sources/2026/10/2026-10-20-claude-code-2-1-304.md)
- [Graphicle: code graph and memory for coding agents](../../sources/2026/10/2026-10-20-graphicle-code-graph-memory-mcp.md)
- [Claude Code releases 2.1.305 and 2.1.306](../../sources/2026/10/2026-10-21-claude-code-2-1-305-306.md)
- [Claude Code release 2.1.307](../../sources/2026/10/2026-10-22-claude-code-2-1-307.md)
- [stalemap](../../sources/2026/10/2026-10-22-stalemap-post-cutoff-dependency-changes.md)
- [MCPtoCodeMode](../../sources/2026/10/2026-10-23-mcptocodemode-mcp-code-mode-proxy.md)
- [Microsoft Agent Framework (Python) 1.23.0](../../sources/2026/10/2026-10-23-microsoft-agent-framework-python-1-23.md)
- [Claude Code releases 2.1.308 and 2.1.309](../../sources/2026/10/2026-10-23-claude-code-2-1-308-309.md)
- [Codex CLI 0.164.0](../../sources/2026/10/2026-10-26-codex-cli-0-164-presets.md)
- [Context Mode](../../sources/2026/10/2026-10-26-context-mode-tool-output-sandbox.md)
- [Google ADK (Python) v2.13.0](../../sources/2026/10/2026-10-26-google-adk-python-v2-13.md)
- [Copilot connectors](../../sources/2026/10/2026-10-29-copilot-connectors-verified-mcp.md)
- [Copilot in VS Code: Universe 2026](../../sources/2026/10/2026-10-29-copilot-vscode-universe-agent-host.md)
- [codebase-memory-mcp](../../sources/2026/10/2026-10-30-codebase-memory-mcp-code-graph.md)
- [APM: Agent Package Manager](../../sources/2026/11/2026-11-04-apm-agent-package-manager.md)
