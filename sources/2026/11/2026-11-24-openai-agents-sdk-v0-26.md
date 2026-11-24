---
title: "OpenAI Agents SDK v0.26.0 and v1.0.0-alpha.2"
url: https://github.com/openai/openai-agents-python/releases/tag/v0.26.0
archived:
type: release
author: OpenAI
date_published: 2026-11-24
date_added: 2026-11-24
tags: [openai, frameworks, sdk, mcp]
topics: [frameworks/landscape]
---

## Summary

The OpenAI Agents SDK for Python released v0.26.0 on 2026-11-24, a minor release with
breaking changes for Docker sandboxes and custom tracing. A day earlier it published
v1.0.0-alpha.2, a preview on GitHub only
(<https://github.com/openai/openai-agents-python/releases/tag/v1.0.0-alpha.2>). The
preview adds resumable sessions that save pending approvals, and hooks that rewrite
tool inputs and outputs.

## Key points

- **v0.26.0, breaking:** Docker sandboxes reject `InContainerMountStrategy`. Use
  `DockerVolumeMountStrategy` and start a fresh session. A custom `TraceProvider` must
  implement `is_disabled()` to keep Realtime server traces.
- **v0.26.0, guardrails:** an input guardrail tripwire now stops queued function tools.
  With `run_in_parallel=False`, input is checked before any tool starts.
- **v0.26.0, MCP and Codex tool:** per-call MCP metadata now beats `tool_meta_resolver`
  and discovery defaults. Local images sent through the Codex tool need a named grant
  (`image_attachments`).
- **v1.0.0-alpha.2:** `ResumableSession` saves conversation history and pending
  approvals together, with a `RedisSessionStore` backend. A run that waits for human
  approval can survive a restart.
- **v1.0.0-alpha.2:** experimental `RunConfig.tool_execution` hooks
  (`prepare_tool_input`, `prepare_tool_output`, `prepare_tool_declaration`) and opt-in
  `RunConfig.redact_text` for tracing.
- alpha.2 writes RunState schema 1.24, which alpha.1 cannot read.
- Install: `pip install -U openai-agents`. The 1.0 alpha is installed from the GitHub
  release.

## Why it matters

The 1.0 line is taking shape around durable human-in-the-loop runs and tool-call
middleware. The guardrail change in 0.26 closes a gap where tools could run after a
tripwire fired.
