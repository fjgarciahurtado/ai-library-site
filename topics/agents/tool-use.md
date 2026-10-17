---
title: "Tool use (function calling)"
tags: [tool-use, agents, structured-output]
related: [agents/agent-patterns, tooling/mcp, tooling/skills]
last_reviewed: 2026-10-11
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
  intermediate results never enter its context.
- **Tool runners:** SDK helpers that run the loop for you.
- **Standard connections:** [MCP](../tooling/mcp.md) packages tools as reusable servers.
- **Forcing a tool:** `tool_choice` can require a tool call on many APIs, but Claude
  Fable 5.1, Opus 5.5, and Sonnet 5.5 reject forced `tool_choice` (`any` or `tool`); use
  `auto` with clear instructions, strict schemas, or structured outputs instead.
- **Hosted computer use:** providers increasingly run the browser or desktop for the
  agent (OpenAI's Agents API since 2026-09-29), while the application handles site
  approvals and sign-in.

## How to use it

- Write tool descriptions like documentation for a new colleague: purpose, when to use,
  input meaning, examples, edge cases.
- Prefer a few well-designed tools over many overlapping ones.
- Return concise, high-signal results; truncate or paginate big outputs.
- Return errors as tool results (with an error flag) so the model can recover.
- Validate inputs and require confirmation for destructive actions.

## Current state

- **2026-10-07:** Claude Haiku 5.5 added computer and browser use to Anthropic's
  smallest tier.
- **2026-09-29:** OpenAI's Agents API added hosted computer use.

## Open questions

- Best practices for very large tool catalogues (hundreds of tools).

## Sources

- [ReAct](../../sources/2026/10/2026-10-04-react-reasoning-and-acting.md)
- [Claude models overview](../../sources/2026/10/2026-10-04-claude-models-overview.md)
- [OpenAI API changelog: GPT-6.1 Sol](../../sources/2026/10/2026-10-06-openai-api-changelog-gpt-6-1-sol.md)
- [Claude Haiku 5.5](../../sources/2026/10/2026-10-08-claude-haiku-5-5.md)
