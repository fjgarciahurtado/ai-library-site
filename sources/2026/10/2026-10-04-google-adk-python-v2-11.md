---
title: "Google Agent Development Kit (Python) v2.11.0"
url: https://github.com/google/adk-python/releases/tag/v2.11.0
archived:
type: release
author: Google
date_published: 2026-10-02
date_added: 2026-10-04
tags: [frameworks, sdk, google, agents, mcp, memory]
topics: [frameworks/landscape, tooling/mcp]
---

## Summary

Minor release of Google's ADK for Python. It adds graceful cancellation, human approval
for tool calls inside workflows, a tool for consulting another model, local SQLite
memory, and opt-in support for MCP SDK 2.x.

## Key points

- Cancellation: pass an `abort_signal` to the Runner, workflows, and nodes; the
  `/run_sse` endpoint cancels the run when the client disconnects.
- Tool nodes in workflows pause for user confirmation through `RequestInput`, as
  `LlmAgent` already did.
- `ModelConsultTool` lets an agent ask a different model mid-task, with per-turn and
  per-session budgets.
- SQLite memory service using `sqlite://` URIs.
- Opt-in path for MCP SDK 2.x, for servers on the newer protocol.
- Breaking: the dev UI's runtime config is served per request; set logos with
  `--logo-text` and `--logo-image-url`.
- The previous release, v2.10.0 (2026-09-25), added skill lifecycle management and
  MongoDB vector search.

## Why it matters

A concrete sign of framework migration to newer MCP SDKs, and of agent frameworks adding
cancellation and human-in-the-loop approval as standard features.
