---
title: "Prompt caching (Claude API docs)"
url: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
archived:
type: docs
author: Anthropic
date_published:
date_added: 2026-10-04
tags: [caching, cost, anthropic]
topics: [practices/cost-and-caching]
---

## Summary

How to reuse a prompt prefix across requests so repeated context (system prompt, tools,
documents, conversation history) is billed at a much lower cache-read rate and
processed faster.

## Key points

- Caching is a prefix match over tools, then system, then messages; any byte change
  invalidates everything after it.
- Mark cache breakpoints with `cache_control`, or use top-level automatic caching.
- Up to 4 breakpoints per request; prefixes below a model-specific minimum length are not cached.
- Check `usage.cache_read_input_tokens` to confirm hits.
- Common silent invalidators: timestamps in the system prompt, unsorted JSON, changing tool lists.

## Why it matters

Usually the largest free cost and latency saving for agents and chat apps with long,
stable context.
