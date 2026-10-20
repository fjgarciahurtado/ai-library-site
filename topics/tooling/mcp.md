---
title: "Model Context Protocol (MCP)"
tags: [mcp, tool-use, security]
related: [agents/tool-use, tooling/skills, practices/security]
last_reviewed: 2026-10-20
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

## How to use it

- Use existing servers for common services before writing your own.
- Install only servers you trust; a server's tool descriptions and outputs go straight
  into the model's context (see [security](../practices/security.md)).
- Keep tool lists small; prefer clients that load tools on demand.
- Build a server when you want one integration usable from many AI clients.

## Current state

- **2026-10-20:** Graphicle (new, pre-release) is a local MCP server that gives coding
  agents code-graph tools (`query_graph`, `get_neighbors`, `shortest_path`) and memory
  tools. See [memory](../agents/memory.md).
- **2026-10-19:** Claude Code 2.1.304: cloud sessions no longer wait for a plugin's
  stdio MCP servers to start unless the server sets `alwaysLoad: true`, and tool search
  is on by default behind a custom `ANTHROPIC_BASE_URL`.
- **2026-10-16:** Claude Code 2.1.302 fixed servers that negotiate the 2026-07-28
  protocol but omit `resultType`, `ttlMs`, or `cacheScope`: they had shown no tools or
  failed every call. Servers on the new spec do not all send these fields yet, so clients
  need to tolerate their absence.
- **2026-10-14:** Claude Code 2.1.299 extends the 2026-07-28 protocol default to cloud
  session and Remote Control connectors, so remote connections now negotiate it too.
  MCP permission rules were tightened: `mcp__a` no longer matches a server named `a__b`,
  and policy-blocked servers are reported as blocked without being contacted.
- **2026-10-06:** Claude Code 2.1.292 negotiates the 2026-07-28 protocol by default for
  local stdio servers (opt out with `MCP_PROTOCOL_NEGOTIATION=legacy`); servers that do
  not answer the newer check fall back to the old handshake. Its default cap on MCP tool
  descriptions rose to 4,096 characters on 2026-10-09.
- **2026-10-02:** Google ADK for Python 2.11 adds opt-in support for MCP SDK 2.x, an
  example of frameworks starting to move to the newer protocol.

## Open questions

- How quickly clients and servers migrate to the stateless spec. Partly answered: Google
  ADK supports MCP SDK 2.x only as an opt-in (2026-10-02), while Claude Code has used the
  new protocol by default for local servers since 2026-10-06 and for its cloud and
  Remote Control connectors since 2026-10-14. Still unknown: other major clients, and how
  many servers support it.

## Sources

- [The 2026-07-28 MCP specification](../../sources/2026/10/2026-10-04-mcp-spec-2026-07-28.md)
- [Google ADK (Python) v2.11.0](../../sources/2026/10/2026-10-04-google-adk-python-v2-11.md)
- [Claude Code 2.1.292 to 2.1.296](../../sources/2026/10/2026-10-12-claude-code-2-1-292-296.md)
- [Claude Code releases 2.1.299 and 2.1.300](../../sources/2026/10/2026-10-15-claude-code-2-1-299-300.md)
- [Claude Code releases 2.1.302 and 2.1.303](../../sources/2026/10/2026-10-19-claude-code-2-1-302-303.md)
- [Claude Code release 2.1.304](../../sources/2026/10/2026-10-20-claude-code-2-1-304.md)
- [Graphicle: code graph and memory for coding agents](../../sources/2026/10/2026-10-20-graphicle-code-graph-memory-mcp.md)
