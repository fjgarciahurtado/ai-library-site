---
title: "Agent and LLM framework landscape"
tags: [frameworks, agents, sdk]
related: [agents/agent-patterns, agents/tool-use, tooling/mcp]
last_reviewed: 2026-11-08
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
    [Claude](../models/claude.md)). They break code that sets `temperature`, `top_p`,
    or `top_k`, and proxies that read `X-Api-Key`. Agent SDK hooks can fail closed:
    with `on_failure="block"` on `HookMatcher` (Python 0.2.177, 2026-11-03) or
    `onFailure: "block"` (TypeScript 0.3.317), a hook callback that raises, returns
    nothing, or returns an invalid value blocks the action; connecting to an older CLI
    with the option set raises `CLIConnectionError`. TypeScript 0.3.317 also removed the
    `file_unchanged` Read result (breaking: a repeated Read now returns the content).
  - OpenAI SDKs and the OpenAI Agents SDK (still 0.x; 0.23 hardened sandboxes,
    sessions, MCP, and realtime agents).
  - Google's Agent Development Kit (ADK); 2.11 added run cancellation, tool approval in
    workflows, SQLite memory, and opt-in MCP SDK 2.x support. 2.13 (2026-10-22)
    promoted 12 experimental features to stable. It added classifier nodes for routing
    (`LlmClassifier`, `TypesafeClassifier`, `ClassifierNode`), MongoDB session and
    memory services, live-audio barge-in, and eval commands whose exit code reflects
    pass or fail. Breaking change: telemetry now defaults to OpenTelemetry GenAI v2 and
    drops the `call_llm` span (opt out with
    `ADK_TELEMETRY_SCHEMA_VERSION_OPT_IN=otel_semconv_1_36`). Google's Agents CLI
    (scaffold, eval, deploy) no longer requires ADK: since 1.8.0 a LangChain extension
    deploys LangChain or LangGraph agents to Cloud Run, and Git-hosted extensions can
    override commands, for example to add an SBOM scan before deploy (`agents-cli create
    my-agent --agent google/agents-cli/extensions/langchain/template@v1.8.0 -d
    cloud_run`). Extensions are experimental and pinned to a commit.
  - Mistral AI Studio (2026-11-05): managed agents with skills, code sandboxes,
    subagents, and hooks; durable workflows with human approvals; hosted apps; and a
    Mistral MCP server for building from a coding agent and deploying with one command.
    It can run in Mistral's cloud, your VPC, or on-premises, and emits OpenTelemetry
    traces. No prices were given at launch.
- **Local runtimes:** Ollama runs open models locally behind an OpenAI-compatible API,
  and `ollama launch` wires them into coding agents such as Claude Code (it clamps
  Claude Code's auto-compact window since 0.40.7). Recent releases: 0.40.7
  reports each model's chat template source, widens speculative decoding, and adds
  Perplexity's `pplx-decider` (27B); 0.40.8 adds Recursive's Flint coding model; 0.40.9
  (2026-10-22) adds Phonon text-to-speech (Apple Silicon, also on `/v1/audio/speech`),
  d3 decision models (2B–27B) for local classification, and Flint on Linux and Windows;
  0.40.12 and 0.40.13 (2026-10-27/29) add Liquid AI's LFM3 small models, now on macOS,
  Linux, and Windows (see [open-weight models](../models/open-weight.md)).
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
    interop, and migration guides from both predecessors. Python 1.23.0 (2026-10-22)
    moved to MCP 2.x as a breaking change, requires AG-UI endpoints to declare an auth
    scope or single-user mode, and renames the Docker shell's `extra_run_args` to
    `unsafe_extra_run_args`.
  - Pydantic AI: typed, Python-first agents, with near-daily minor releases (2.61 to
    2.63 shipped in five days). 2.59.0 and 1.107.9 fix a high-severity `web_fetch` HTML
    denial-of-service issue (GHSA-4whf-38hw-pxxh), so agents that fetch untrusted pages
    should be on at least those versions. The 2.5x
    line added sandboxed workspaces (E2B, SSH, Bubblewrap, Sprites, Daytona since 2.59,
    and local `DockerSandbox` for Docker/Podman and `BoxLiteSandbox` micro-VMs since
    2.60), plugins, and its own `clai2` terminal agent. 2.58 (2026-10-20) added hard
    limits on runs (`timeout=`, `RunContext.deadline`) and model requests
    (`request_timeout`, `max_retries`), steering for delegated tasks, and an
    `openai-chatgpt` provider that signs in with a ChatGPT plan. 2.59 added ElevenLabs
    realtime, `non_retryable_model_errors` for Temporal, and cache-preserving
    `on_change='append'` instructions. 2.60 (2026-10-22) added judge-model `SmartSearch`
    code search, `RelevanceCompaction`, and per-run `auth`/`headers` for `MCPToolset`.
    2.61 (2026-10-23) added structured citations on `TextPart`, normalized across
    Bedrock, OpenRouter, and xAI. It also added Kimi K3.1 Pro models and
    `Shell.max_log_bytes`, and made the durable engine's extension API public. 2.62
    (2026-10-26) lets `SubAgents` delegations run in the background, where you can steer,
    answer, or cancel them (`task_control`). It added `CompactOnRequest`, so the model can
    ask for compaction, plus `AnthropicModel.compact_messages()` and provider batch APIs
    (`BatchModelRequests`). Thinking effort can now change mid-conversation on OpenAI and
    Anthropic, and Temporal can run tool calls as child workflows. 2.63 (2026-10-27)
    added `DetectLoops` (interrupts repeated-action loops), `IPythonCodeMode`,
    `PostgresSpendStore` for spend budgets shared across processes, `task_timeout` for
    evals, AG-UI 1.0, and GPT-6.1 Terra; `CodeMode` now appends revealed tools by
    default (`dynamic_catalog=True`), which keeps the cached prompt stable. 2.64
    (2026-10-30) added a `ModelFallback` capability (per-attempt
    `prepare_model_request`, `sticky` fallback, and `first_event_timeout` for streams
    that never start), `BoxdSandbox`, and `ArtifactScanner` security scanning for
    `Memory` and `Skills`. Check before upgrading: `json-repair` became optional and
    `Coder` tools default to non-strict schemas.
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
| Microsoft Agent Framework | Python 1.23.0 / .NET 1.26.0 | 2026-10-22 / 2026-10-23 | 1.0 GA on 2026-04-03; Python 1.23 moves to MCP 2.x; .NET 1.26 has breaking AG-UI auth-scope and Docker parameter changes (checked 2026-10-26) |
| OpenAI Agents SDK (Python) | 0.24.0 | 2026-10-15 | Still 0.x; adds MCP annotations on converted tools (checked 2026-10-26) |
| Google ADK (Python) | 2.13.0 | 2026-10-22 | Classifier nodes, 12 features stable, OTel GenAI v2 default (checked 2026-10-26) |
| Pydantic AI | 2.64.0 | 2026-10-30 | Near-daily minor releases (checked 2026-11-02) |
| Claude Agent SDK (Python) | 0.2.177 | 2026-11-03 | Bundles Claude Code 2.1.317; `HookMatcher(on_failure="block")` makes hooks fail closed (checked 2026-11-03) |
| Claude Agent SDK (TypeScript) | 0.3.318 | 2026-11-04 | Parity with Claude Code 2.1.318; 0.3.317 added `onFailure: "block"` on hook matchers and removed the `file_unchanged` Read result (checked 2026-11-04) |
| CrewAI | 1.15.30 | 2026-10-24 | 1.15.0 on 2026-06-25; 1.15.29 (2026-10-23) promoted AgentExecutor out of experimental (checked 2026-10-27 on GitHub) |
| LlamaIndex | 0.14.25 | 2026-09-21 | Patch release (removes deprecated IPEX integrations); no newer `llama-index-core` on PyPI (checked 2026-11-06) |
| LangGraph | 1.2.18 | 2026-10-26 | 1.2.0 on 2026-05-12; 1.2.18 snapshots `DeltaChannel` every 100 updates instead of 1000 (faster reads on long threads, more storage; `snapshot_frequency=1000` restores the old value) (checked 2026-10-27 on GitHub) |
| DSPy | 3.4.1 | 2026-10-12 | 3.4.0 on 2026-09-25; 3.0.0 on 2025-08-12 (checked 2026-10-22) |
| Vercel AI SDK | 7.x | 2026-06-25 (7.0) | Latest 7.x patch not checked; date from Vercel's announcement (checked 2026-10-16) |

Release features are described under Key concepts.

- **2026-11-06:** Claude Agent SDK (Python) 0.2.178 only bundles Claude Code 2.1.318;
  LlamaIndex is still on 0.14.25 on both GitHub and PyPI (see Open questions).
- **2026-11-04:** OpenAI Agents SDK shipped only a preview (0.24.0-alpha.6 on
  2026-11-03, GitHub only) with breaking API changes such as `Turn.get_result()`
  replacing `wait()`, so 0.24.0 stays the stable row. Expect those changes in the next
  stable release.
- **2026-11-03:** Ollama 0.40.14 is a release candidate only.
- **2026-11-02:** LangGraph had only patch releases (1.2.19 on 2026-10-30); no new ADK
  release since the table date.

## Open questions

- Add a primary source for a LlamaIndex major release. None exists yet: on 2026-11-06
  the GitHub release feed and PyPI (`llama-index-core`) both still ended at 0.14.25
  (2026-09-21), with no 0.15 or 1.0. Releases have slowed from monthly (April–May) to
  every one to two months (0.14.23 on 06-24, 0.14.24 on 08-19, 0.14.25 on 09-21). Keep
  checking; if nothing ships by December, note LlamaIndex as slowing down.
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
- [Google ADK (Python) v2.13.0](../../sources/2026/10/2026-10-26-google-adk-python-v2-13.md)
- [Pydantic AI v2.61.0](../../sources/2026/10/2026-10-26-pydantic-ai-v2-61.md)
- [Pydantic AI v2.62.0](../../sources/2026/10/2026-10-27-pydantic-ai-v2-62.md)
- [Pydantic AI v2.63.0](../../sources/2026/10/2026-10-28-pydantic-ai-v2-63.md)
- [Pydantic AI v2.64.0](../../sources/2026/11/2026-11-02-pydantic-ai-v2-64.md)
- [Claude Agent SDK (Python) v0.2.177](../../sources/2026/11/2026-11-03-claude-agent-sdk-python-0-2-177.md)
- [Claude Agent SDK (TypeScript) v0.3.317 and v0.3.318](../../sources/2026/11/2026-11-04-claude-agent-sdk-ts-0-3-318.md)
- [Mistral AI Studio: managed agents and workflows](../../sources/2026/11/2026-11-06-mistral-studio-managed-agents.md)
