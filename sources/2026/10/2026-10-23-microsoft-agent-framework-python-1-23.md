---
title: "Microsoft Agent Framework (Python) 1.23.0"
url: https://github.com/microsoft/agent-framework/releases/tag/python-1.23.0
archived:
type: release
author: Microsoft
date_published: 2026-10-22
date_added: 2026-10-23
tags: [frameworks, agents, mcp, security, open-source]
topics: [frameworks/landscape, tooling/mcp]
---

## Summary

Microsoft Agent Framework for Python 1.23.0 (2026-10-22) moves the framework to MCP 2.x.
It also tightens two security defaults. The MCP change is breaking and touches
transports, errors, schemas, and lifecycle handling across the core, hosting, AG-UI,
declarative, and lab packages. The notes do not name the MCP SDK or protocol versions.

## Key points

- **MCP 2.x migration (breaking):** the release adds an "MCP 2.x compatibility
  foundation". It splits MCP client lifecycles into caller-owned and framework-owned
  clients, and drops the old DevUI stale-connection workaround. See PRs #9236, #9237,
  and #9532 for the code changes.
- **AG-UI (breaking):** to register an endpoint you must now give an explicit
  authorization scope or declare it single-user.
- **Docker shell tool (breaking):** `extra_run_args` is renamed to
  `unsafe_extra_run_args` to make the trust implication clear.
- **New:** A2A request metadata can forward function-invocation and client arguments
  (allowlisted). An opt-in synthetic trailing user turn handles providers that return
  empty text after a prompt that ends with an assistant turn.
- **Other:** Python 3.15 support, and many fixes (Anthropic bash tool results, Gemini
  structured output, Bedrock per-call arguments, MCP connection recovery).

## Why it matters

After Google ADK's opt-in support and Claude Code's default, this is another major
framework moving to the stateless MCP generation. Upgrading requires code changes for
MCP users and AG-UI hosts.
