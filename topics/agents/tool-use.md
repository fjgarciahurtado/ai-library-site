---
title: "Tool use (function calling)"
tags: [tool-use, agents, structured-output]
related: [agents/agent-patterns, tooling/mcp, tooling/skills]
last_reviewed: 2026-10-28
---

## Overview

Tool use lets a model call functions you define: search a database, call an API, run
code, edit files. The model does not run anything itself. It returns a structured request
(tool name plus JSON arguments); your code runs it and sends back the result. This is
how LLMs act in the world and the core of every agent.

## Key concepts

- **Tool definition:** name, description, and JSON Schema for the inputs. The
  description is a prompt: it is how the model knows when and how to use the tool.
- **Loop:** request, then `tool_use` response, run the tool, send `tool_result`, repeat
  until the model gives a final answer.
- **Parallel tool calls:** several calls in one turn; return all results together.
- **Strict mode:** guarantees arguments match the schema exactly.
- **Server tools:** tools the provider runs for you (web search, web fetch, code execution).
- **Tool search / deferred loading:** with many tools, load definitions only when needed
  to save context.
- **Programmatic tool calling:** the model writes code that calls your tools, so large
  intermediate results never enter its context. "Code mode" proxies apply this to MCP:
  MCPtoCodeMode (2026-10-22) puts any set of MCP servers behind `search`, `describe`, and
  `execute`, and runs the model's JavaScript in a QuickJS sandbox.
- **Tool runners:** SDK helpers that run the loop for you.
- **Standard connections:** [MCP](../tooling/mcp.md) packages tools as reusable servers.
- **Forcing a tool:** `tool_choice` can require a tool call on many APIs, but Claude
  Fable 5.1, Opus 5.5, and Sonnet 5.5 reject forced `tool_choice` (`any` or `tool`); use
  `auto` with clear instructions, strict schemas, or structured outputs instead.
- **Hosted computer use:** providers increasingly run the browser or desktop for the
  agent (OpenAI's Agents API since 2026-09-29), while the application handles site
  approvals and sign-in. Computer use has also reached small models: Claude Haiku 5.5
  (2026-10-07) supports computer and browser use.

## How to use it

- Write tool descriptions like documentation for a new colleague: purpose, when to use,
  input meaning, examples, edge cases.
- Prefer a few well-designed tools over many overlapping ones.
- Return concise, high-signal results; truncate or paginate big outputs.
- Return errors as tool results (with an error flag) so the model can recover.
- Validate inputs and require confirmation for destructive actions.

## Current state

- **2026-10-27:** Google's `gemini-api` CLI (beta) is another CLI-first alternative to an
  MCP server: one binary with `--help`, `--schema`, `--dry-run`, and `-o json` built for
  agents to discover and call, plus a suggested `CLAUDE.md`/`AGENTS.md` snippet instead
  of a skill (see [Gemini](../models/gemini.md)).
- **2026-10-26:** webframe (MIT, Go) runs a page in the system's own web view from the
  shell: console output goes to stdout, and JavaScript can be piped in on stdin. It is a
  light, Playwright-free browser tool an agent can call (`go install
  tractor.dev/webframe/cmd/webframe@latest`). Simon Willison's evaluation found it fast
  for scraping but limited: CSP failures, a 0×0 viewport, hanging loads, and no HTTP
  metadata.
- **2026-10-22:** MCPtoCodeMode (MIT) is a code-mode proxy for MCP tools. Its author
  reports about 5.7× fewer input tokens on test tasks (self-reported). See
  [MCP](../tooling/mcp.md) for install commands.

## Open questions

- Best practices for very large tool catalogues (hundreds of tools). Two approaches so
  far: tool search / deferred loading, and code-mode proxies that hide tools behind
  search and execute (2026-10-22). There is no independent comparison of the two yet.

## Sources

- [ReAct](../../sources/2026/10/2026-10-04-react-reasoning-and-acting.md)
- [Claude models overview](../../sources/2026/10/2026-10-04-claude-models-overview.md)
- [OpenAI API changelog: GPT-6.1 Sol](../../sources/2026/10/2026-10-06-openai-api-changelog-gpt-6-1-sol.md)
- [Claude Haiku 5.5](../../sources/2026/10/2026-10-08-claude-haiku-5-5.md)
- [MCPtoCodeMode](../../sources/2026/10/2026-10-23-mcptocodemode-mcp-code-mode-proxy.md)
- [webframe](../../sources/2026/10/2026-10-27-webframe-headless-webview-runner.md)
- [Gemini API CLI (gemini-api) beta](../../sources/2026/10/2026-10-28-gemini-api-cli-beta.md)
