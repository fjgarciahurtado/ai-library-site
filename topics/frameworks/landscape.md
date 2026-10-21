---
title: "Agent and LLM framework landscape"
tags: [frameworks, agents, sdk]
related: [agents/agent-patterns, agents/tool-use, tooling/mcp]
last_reviewed: 2026-10-21
---

## Overview

Frameworks provide building blocks for LLM applications: model clients, tool loops,
retrieval, memory, orchestration, tracing. They speed up getting started, but add a layer
between you and the model that can hide prompts and make debugging harder. Many teams
now start from vendor SDKs and add a framework only when it clearly helps.

## Key concepts

- **Vendor SDKs and agent kits:**
  - Anthropic SDKs (with tool runner) and the Claude Agent SDK (the Claude Code harness
    as a library), plus Managed Agents for hosted agents.
  - OpenAI SDKs and the OpenAI Agents SDK (still 0.x; 0.23 hardened sandboxes,
    sessions, MCP, and realtime agents).
  - Google's Agent Development Kit (ADK); 2.11 added run cancellation, tool approval in
    workflows, SQLite memory, and opt-in MCP SDK 2.x support.
- **Orchestration frameworks:**
  - LangChain / LangGraph: components plus graph-based, stateful agent workflows.
    LangGraph 1.2 (2026-05-12) resumes error handlers durably after host crashes and
    adds `set_node_defaults()`; 1.2.12 added `response_schema` to `interrupt()`.
  - LlamaIndex: data and retrieval focus, with agent workflows.
  - CrewAI: role-based multi-agent teams ("crews") plus Flows, an event-driven
    workflow layer. Since 1.15 (2026-06-25) flows and crews can be declared in
    configuration files. 1.15.24 (2026-10-07) added `crewai eval`, which compares
    models by swapping them in via `llm_overlay`, plus Oracle integrations and an
    experimental job runner.
  - Microsoft Agent Framework: successor to AutoGen and Semantic Kernel, for .NET and
    Python. Version 1.0 (2026-04-03) brought stable APIs, long-term support, MCP and A2A
    interop, and migration guides from both predecessors.
  - Pydantic AI: typed, Python-first agents, with near-daily minor releases. The 2.5x
    line added sandboxed workspaces (E2B, SSH, Bubblewrap, Sprites), plugins, and its own
    `clai2` terminal agent.
  - Vercel AI SDK: TypeScript toolkit for AI apps, UIs, and agents. Version 7
    (2026-06-25) adds per-tool approval policies, durable resumable runs
    (`WorkflowAgent`), layered timeouts, a portable sandbox abstraction, OpenTelemetry
    integration, and an experimental `HarnessAgent` that wraps Claude Code, Codex, and
    other harnesses behind one interface.
  - DSPy: programming LLM pipelines with automatic prompt optimisation. Its GEPA
    optimiser can also change program structure (Flex, since 3.3). 3.4 (2026-09-25)
    is the "LM transition" release: model calls move to native engines with LiteLLM as
    fallback, and it adds experimental typed decision outputs and async ReActV2. The
    legacy LM interfaces are deprecated for removal in 3.5 (no date given).
- **Observability and evals:** Langfuse, LangSmith, Braintrust, Arize Phoenix,
  OpenTelemetry GenAI conventions.
- **Interop standards:** [MCP](../tooling/mcp.md) for tools and data; agent-to-agent
  protocols (such as A2A) for agents talking to each other.
- **Shared direction (late 2026):** the main frameworks are converging on sandboxed code
  execution, human approval of tool calls, cancellation of long runs, and the newer MCP
  SDKs.

## How to use it

- Prototype directly with the vendor SDK to see real prompts and responses.
- Adopt a framework for a specific need: durable state, complex graphs, many providers,
  built-in tracing.
- Prefer frameworks that let you see and control the exact prompts.
- Add tracing from day one, whatever you choose.

## Current state

Latest versions checked on 2026-10-04 (GitHub releases pages), except CrewAI and
LangGraph, checked later on PyPI because their GitHub release pages show wrong years:

| Framework | Latest stable | Date | Note |
|---|---|---|---|
| Microsoft Agent Framework | Python 1.20.0 / .NET 1.23.0 | 2026-10-02 / 2026-10-01 | 1.0 GA on 2026-04-03 |
| OpenAI Agents SDK (Python) | 0.23.1 | 2026-10-02 | Still 0.x |
| Google ADK (Python) | 2.11.0 | 2026-10-02 | |
| Pydantic AI | 2.58.0 | 2026-10-20 | Near-daily minor releases (checked 2026-10-21) |
| CrewAI | 1.15.26 | 2026-10-08 | 1.15.0 on 2026-06-25; dates from PyPI (checked 2026-10-09) |
| LlamaIndex | 0.14.25 | 2026-09-21 | Patch release; no note |
| LangGraph | 1.2.14 | 2026-10-06 | 1.2.0 on 2026-05-12; dates from PyPI (checked 2026-10-08) |
| DSPy | 3.4.0 | 2026-09-25 | 3.0.0 on 2025-08-12; dates from PyPI (checked 2026-10-12) |
| Vercel AI SDK | 7.x | 2026-06-25 (7.0) | Latest 7.x patch not checked; date from Vercel's announcement (checked 2026-10-16) |

Release features are described under Key concepts.

- **2026-10-21:** Ollama v0.40.7: `ollama show` reports each model's chat template
  source, more draft models work for speculative decoding, and `ollama launch claude`
  clamps Claude Code's auto-compact window. It adds Perplexity's `pplx-decider` (27B).
- **2026-10-20:** Pydantic AI v2.58.0 adds hard limits on agent runs (`timeout=`,
  `RunContext.deadline`) and model requests (`request_timeout`, `max_retries`), steering
  for delegated tasks, an `openai-chatgpt` provider that lets users sign in with their
  ChatGPT plan, and ElevenLabs realtime support.

## Open questions

- Add a primary source for a LlamaIndex major release; it was still on 0.14.x on
  2026-10-12.
- When will DSPy 3.5 remove the legacy LM interfaces? No date given (checked
  2026-10-12).

## Sources

- [Building effective agents](../../sources/2026/10/2026-10-04-building-effective-agents.md)
- [Microsoft Agent Framework version 1.0](../../sources/2026/10/2026-10-04-microsoft-agent-framework-1-0.md)
- [OpenAI Agents SDK v0.23.0](../../sources/2026/10/2026-10-04-openai-agents-sdk-v0-23.md)
- [Google ADK (Python) v2.11.0](../../sources/2026/10/2026-10-04-google-adk-python-v2-11.md)
- [Pydantic AI v2.54.0](../../sources/2026/10/2026-10-04-pydantic-ai-v2-54.md)
- [LangGraph 1.2.0 release notes](../../sources/2026/10/2026-10-08-langgraph-1-2-release.md)
- [crewAI 1.15.0 release notes](../../sources/2026/10/2026-10-09-crewai-1-15-release.md)
- [DSPy 3.4.0 release notes](../../sources/2026/10/2026-10-12-dspy-3-4-release.md)
- [AI SDK 7](../../sources/2026/10/2026-10-16-vercel-ai-sdk-7.md)
- [Pydantic AI v2.58.0](../../sources/2026/10/2026-10-21-pydantic-ai-v2-58.md)
- [Ollama v0.40.7](../../sources/2026/10/2026-10-21-ollama-v0-40-7.md)
