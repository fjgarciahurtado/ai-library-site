---
title: "OpenAI Agents SDK (Python) v0.23.0"
url: https://github.com/openai/openai-agents-python/releases/tag/v0.23.0
archived:
type: release
author: OpenAI
date_published: 2026-10-02
date_added: 2026-10-04
tags: [frameworks, sdk, openai, agents, mcp]
topics: [frameworks/landscape]
---

## Summary

Minor release of OpenAI's Python Agents SDK. It adds few headline features; most of the
release is hardening of sandboxes, sessions, MCP, and realtime agents, with a large batch
of bug fixes. The SDK is still versioned 0.x. A v0.23.1 patch followed on 2026-10-02.

## Key points

- MCP: configurable page limits when listing tools and other items from MCP servers.
- Sandboxes: optional protection against Docker container removal; configurable memory
  consolidation turns.
- Sessions: an optional scan budget for encrypted conversation history.
- Realtime: WebSocket message size bounds; tool output guardrails now enforced.
- Fixes include isolation of nested agent state, tool identity during async runs, and
  session compaction recovery. No breaking changes are listed.
- The release date is 2026-10-01 in the releases list and 2026-10-02 on the tag page;
  the tag page date is used here.
- The previous series (v0.22.x) added MCP server-wide guardrails, output guardrail
  customisation, and web search tool images.

## Why it matters

Shows the OpenAI Agents SDK moving its effort to reliability, sandboxing, and security
for long-running agents rather than new abstractions.
