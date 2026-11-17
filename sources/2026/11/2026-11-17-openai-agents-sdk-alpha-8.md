---
title: "OpenAI Agents SDK v0.24.0-alpha.8"
url: https://github.com/openai/openai-agents-python/releases/tag/v0.24.0-alpha.8
archived:
type: release
author: OpenAI
date_published: 2026-11-16
date_added: 2026-11-17
tags: [openai, frameworks, sdk, agents, tool-use, mcp]
topics: [frameworks/landscape, agents/tool-use]
---

## Summary

The eighth preview of OpenAI Agents SDK 0.24 (2026-11-16) adds human approval of Python
tool calls, support for model clients other than OpenAI's, realtime voice in sessions,
and checkpoints that keep budget usage. It is a preview installed from the release's
wheels, and it has several upgrade steps.

## Key points

- **Tool approvals:** review a Python tool's arguments and approve or reject the call
  before it runs (`FunctionToolApprovalRequest`, `FunctionToolApprovalDecision`); a
  decision can be remembered for the rest of the session.
- **Bring your own model client:** the native tool loop works with your own async
  Responses or Chat Completions client, LiteLLM, AnyLLM, or a custom adapter.
- **Realtime voice:** add voice to a session over a server WebSocket, WebRTC in the
  browser, or an existing SIP call (`agents.realtime.native`; the old API stays under
  `agents.realtime`).
- **Resumable work:** pending runs and approvals can be checkpointed and restored with
  request or token budgets that keep what was already spent.
- **Tools and storage:** `ToolSearch` defers eligible tool schemas, MCP tools can be
  picked by alias, `SQLAlchemySQLiteSessionStore` and `CustomStorage` (Redis, MongoDB,
  SQLAlchemy, Dapr) store sessions; read-only workspaces and native skills in execution
  environments.
- **Upgrade notes:** back up saved state (alpha.7 cannot read alpha.8 checkpoints);
  replace bare `"*"` network rules with exact hosts or `NetworkPolicy.allow_all()`;
  ChatGPT Apps tools now need an explicit `ChatGPTAppsMCP` declaration. Local execution
  on Linux needs `bubblewrap` (`bwrap`).

## Why it matters

Per-call approval and non-OpenAI model clients were the main gaps compared with other
agent frameworks. Still a preview: wait for the stable 0.24 release for production.
