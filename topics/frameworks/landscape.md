---
title: "Agent and LLM framework landscape"
tags: [frameworks, agents, sdk]
related: [agents/agent-patterns, agents/tool-use, tooling/mcp]
last_reviewed: 2026-10-23
---

## Overview

Frameworks provide building blocks for LLM applications: model clients, tool loops,
retrieval, memory, orchestration, tracing. They speed up getting started, but add a layer
between you and the model that can hide prompts and make debugging harder. Many teams
now start from vendor SDKs and add a framework only when it clearly helps.

## Key concepts

- **Vendor SDKs and agent kits:**
  - Anthropic SDKs (with tool runner) and the Claude Agent SDK (the Claude Code harness
    as a library), plus Managed Agents for hosted agents. New SDK majors on 2026-10-21
    (Python 2.0, TypeScript 1.0, Go 2.0, Java 3.0, and others) target API version
    `2026-10-21`, drop sampling parameters and Text Completions, send keys as
    `Authorization: Bearer`, and move from MIT to Apache 2.0 (see
    [Claude](../models/claude.md)).
  - OpenAI SDKs and the OpenAI Agents SDK (still 0.x; 0.23 hardened sandboxes,
    sessions, MCP, and realtime agents).
  - Google's Agent Development Kit (ADK); 2.11 added run cancellation, tool approval in
    workflows, SQLite memory, and opt-in MCP SDK 2.x support. Google's Agents CLI
    (scaffold, eval, deploy) no longer requires ADK: since 1.8.0 a LangChain extension
    deploys LangChain or LangGraph agents to Cloud Run, and Git-hosted extensions can
    override commands, for example to add an SBOM scan before deploy.
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
    line added sandboxed workspaces (E2B, SSH, Bubblewrap, Sprites, and Daytona since
    2.59), plugins, and its own `clai2` terminal agent.
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

Latest versions from GitHub release feeds or PyPI, with the check date in each row
(rows without one were checked on 2026-10-04):

| Framework | Latest stable | Date | Note |
|---|---|---|---|
| Microsoft Agent Framework | Python 1.23.0 / .NET 1.25.0 | 2026-10-22 / 2026-10-14 | 1.0 GA on 2026-04-03; Python 1.23 moves to MCP 2.x (checked 2026-10-23) |
| OpenAI Agents SDK (Python) | 0.24.0 | 2026-10-15 | Still 0.x; adds MCP annotations on converted tools (checked 2026-10-22) |
| Google ADK (Python) | 2.12.0 | 2026-10-13 | `after_tool_callback` output filtering, workflow node confirmation (checked 2026-10-22) |
| Pydantic AI | 2.60.0 | 2026-10-22 | Near-daily minor releases (checked 2026-10-23) |
| CrewAI | 1.15.28 | 2026-10-14 | 1.15.0 on 2026-06-25 (checked 2026-10-22 on GitHub) |
| LlamaIndex | 0.14.25 | 2026-09-21 | Patch release; no note |
| LangGraph | 1.2.14 | 2026-10-06 | 1.2.0 on 2026-05-12; dates from PyPI (checked 2026-10-08) |
| DSPy | 3.4.1 | 2026-10-12 | 3.4.0 on 2026-09-25; 3.0.0 on 2025-08-12 (checked 2026-10-22) |
| Vercel AI SDK | 7.x | 2026-06-25 (7.0) | Latest 7.x patch not checked; date from Vercel's announcement (checked 2026-10-16) |

Release features are described under Key concepts.

- **2026-10-22:** Pydantic AI v2.60.0 adds local sandboxes for its harness
  (`DockerSandbox` for Docker/Podman, `BoxLiteSandbox` micro-VMs), judge-model
  `SmartSearch` code search and `RelevanceCompaction`, and per-run `auth`/`headers` for
  `MCPToolset`.
- **2026-10-22:** Microsoft Agent Framework (Python) 1.23.0 migrates to MCP 2.x
  (breaking). AG-UI endpoints now need an explicit auth scope or a single-user
  declaration, and the Docker shell's `extra_run_args` is renamed
  `unsafe_extra_run_args`.
- **2026-10-23:** Ollama v0.40.9 adds Phonon text-to-speech (Apple Silicon, also on
  `/v1/audio/speech`), d3 decision models (2B–27B, from vLLM Semantic Router) for local
  classification, and Flint on Linux and Windows.
- **2026-10-21:** Anthropic released new major SDK versions for API version
  `2026-10-21`; upgrading breaks code that sets `temperature`, `top_p`, or `top_k`, or
  proxies that read `X-Api-Key`.
- **2026-10-21:** Google's Agents CLI 1.8.0 ships a first-party LangChain extension
  (`agents-cli create my-agent --agent google/agents-cli/extensions/langchain/template@v1.8.0 -d cloud_run`)
  and an experimental extension system with commit-pinned, Git-hosted extensions.
- **2026-10-20/21:** Pydantic AI v2.59.0 fixes a high-severity `web_fetch` HTML
  denial-of-service issue (GHSA-4whf-38hw-pxxh, also fixed in 1.107.9). It adds
  `DaytonaSandbox`, `ElevenLabsRealtimeModel`, `non_retryable_model_errors` for
  Temporal, and cache-preserving `on_change='append'` instructions.
- **2026-10-21:** Ollama v0.40.8 adds Recursive's Flint coding model (macOS only until
  v0.40.9; see [open-weight models](../models/open-weight.md)).
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
- [Migrating to API version 2026-10-21](../../sources/2026/10/2026-10-22-claude-api-version-2026-10-21.md)
- [Agents CLI extensions and LangChain template](../../sources/2026/10/2026-10-22-google-agents-cli-extensions.md)
- [Pydantic AI v2.59.0](../../sources/2026/10/2026-10-22-pydantic-ai-v2-59.md)
- [Ollama v0.40.8 and Flint](../../sources/2026/10/2026-10-22-ollama-flint-coding-model.md)
- [Pydantic AI v2.60.0](../../sources/2026/10/2026-10-23-pydantic-ai-v2-60.md)
- [Microsoft Agent Framework (Python) 1.23.0](../../sources/2026/10/2026-10-23-microsoft-agent-framework-python-1-23.md)
- [Ollama v0.40.9](../../sources/2026/10/2026-10-23-ollama-v0-40-9-phonon-d3.md)
