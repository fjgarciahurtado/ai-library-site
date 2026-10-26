---
title: "Google ADK (Python) v2.13.0"
url: https://github.com/google/adk-python/releases/tag/v2.13.0
archived:
type: release
author: Google
date_published: 2026-10-22
date_added: 2026-10-26
tags: [google, frameworks, agents, memory, evals, sdk]
topics: [frameworks/landscape, tooling/mcp]
---

## Summary

ADK for Python 2.13.0 is dated 2026-10-22 in its changelog (the GitHub release was
created on 2026-10-23). It promotes 12 experimental features to stable and adds
classifier nodes for routing workflows. It also adds barge-in for live audio, MongoDB
session and memory services, and up to 8× faster turns for agents given a model name as
a string. It has one breaking change in telemetry.

## Key points

- **Breaking:** telemetry now defaults to the OpenTelemetry GenAI v2 conventions
  (`otel_semconv_1_44`), and the `call_llm` span is gone. To keep the old schema, set
  `ADK_TELEMETRY_SCHEMA_VERSION_OPT_IN=otel_semconv_1_36`.
- **Classifiers for routing:** `BaseClassifier`, `LlmClassifier`, `TypesafeClassifier`
  (uses TypeSafe's Jev models, which return calibrated probabilities faster than an LLM),
  and `ClassifierNode` for workflow graphs.
- **Memory and sessions:** `delete_memory` on `BaseMemoryService`, plus experimental
  `MongoDbSessionService` and `MongoDbMemoryService`. The memory service uses keyword
  matching and needs no vector index.
- **Live audio:** barge-in for `CascadeLiveConnection`, and Gemini speech-to-text and
  text-to-speech.
- **Evals and telemetry:** invocation time is split into model, tool, and framework
  time. Eval results include Vertex rubric verdicts. `AgentEvaluator` and the CLI eval
  command exit with a pass/fail code, which is useful in CI.
- **Sandboxes and deployment:** an OpenSandbox environment, `AgentEngineEnvironment`,
  and readiness helpers in the sandbox manager.
- **MCP:** only fixes (auth and header precedence, `McpToolset` now uses `McpTool`). The
  notes do not say that MCP SDK 2.x is now the default, so it still seems to be opt-in.
- **Stable features:** the release notes do not list the 12 promoted features by name.
  They point to the feature registry guide.

## Why it matters

Exit codes that match eval results make ADK evals easy to use as a CI gate. Teams with
dashboards built on the old `call_llm` span must change them or set the opt-in variable
before upgrading.
