---
title: "AI SDK 7"
url: https://vercel.com/blog/ai-sdk-7
archived:
type: release
author: Vercel
date_published: 2026-06-25
date_added: 2026-10-16
tags: [frameworks, sdk, agents, mcp]
topics: [frameworks/landscape]
---

## Summary

Vercel's announcement of AI SDK 7, the TypeScript toolkit for AI apps and agents. The
release focuses on running agents in production: tool approvals, durable workflows,
timeouts, sandboxes, and telemetry. It also adds an experimental way to drive existing
agent harnesses such as Claude Code and Codex through one API.

## Key points

- **Developing agents:** one `reasoning` option mapped to each provider's native
  setting; typed per-tool context (`contextSchema`, `toolsContext`) so tools see only
  their own context; typed `runtimeContext` on `ToolLoopAgent`; `uploadFile` and
  `uploadSkill` return reusable provider references; MCP Apps rendering in sandboxed
  iframes (experimental); `@ai-sdk/tui` for a terminal agent UI.
- **Running agents:** per-tool approval policies (`toolApproval`) with optional
  HMAC-signed approvals; `WorkflowAgent` (`@ai-sdk/workflow`) for resumable runs that
  survive restarts and delayed approvals; layered timeouts (`totalMs`, `stepMs`,
  `chunkMs`, `toolMs`); a portable `SandboxSession` abstraction.
- **HarnessAgent (experimental):** runs harnesses such as Claude Code, Codex, and Pi
  behind the SDK's `Agent` interface, with sandbox, skills, and tools configuration and
  mid-turn interrupt and resume.
- **Observability:** `registerTelemetry` once at startup; `@ai-sdk/otel` follows the
  OpenTelemetry GenAI semantic conventions; per-step performance stats such as
  time-to-first-output and tokens per second.
- Experimental realtime (OpenAI, Google, xAI) and video generation APIs.
- Upgrade with `npx @ai-sdk/codemod v7` or a migration skill. The post lists no breaking
  changes; see the migration guide.

## Why it matters

AI SDK 7 follows the same direction as the Python frameworks: approvals, durability,
sandboxes, and tracing. It also treats complete coding-agent harnesses as components
you can embed, rather than building every agent loop from scratch.
