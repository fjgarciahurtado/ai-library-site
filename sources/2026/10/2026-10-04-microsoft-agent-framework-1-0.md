---
title: "Microsoft Agent Framework version 1.0"
url: https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/
archived:
type: release
author: Shawn Henry (Microsoft)
date_published: 2026-04-03
date_added: 2026-10-04
tags: [frameworks, multi-agent, sdk, mcp]
topics: [frameworks/landscape]
---

## Summary

Microsoft's announcement that Agent Framework reached 1.0 for both .NET and Python on
2026-04-03, with stable APIs and a long-term support commitment. The framework merges the
enterprise foundations of Semantic Kernel with AutoGen's multi-agent orchestration into
one open-source SDK; it was introduced in October 2025 and reached release candidate in
February 2026.

## Key points

- Stable single-agent abstractions and service connectors for Microsoft Foundry, Azure
  OpenAI, OpenAI, Anthropic Claude, Amazon Bedrock, Google Gemini, and Ollama.
- Middleware hooks to intercept and extend agent behaviour.
- Pluggable memory backends (Foundry, Mem0, Redis, Neo4j).
- Graph-based workflow engine; orchestration patterns: sequential, concurrent, handoff,
  group chat, and Magentic-One.
- Declarative agents and workflows in YAML.
- Interop through MCP (tools) and A2A (agent-to-agent).
- Migration guides and assistants for Semantic Kernel and AutoGen users.
- Releases continue at a fast pace: Python 1.20.0 (2026-10-02) and .NET 1.23.0
  (2026-10-01) per the GitHub releases page.

## Why it matters

Confirms the Microsoft Agent Framework as the supported successor to both Semantic Kernel
and AutoGen, and as one of the few major agent frameworks with a declared stable 1.x API.
