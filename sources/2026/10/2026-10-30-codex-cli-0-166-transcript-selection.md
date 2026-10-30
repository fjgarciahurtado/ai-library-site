---
title: "Codex CLI 0.166.0"
url: https://github.com/openai/codex/releases/tag/rust-v0.166.0
archived:
type: release
author: OpenAI
date_published: 2026-10-29
date_added: 2026-10-30
tags: [openai, coding-agents, cli]
topics: [tooling/coding-agents]
---

## Summary

Codex CLI 0.166.0, released on 2026-10-29, improves the terminal UI: keyboard selection
and search in the transcript, consistent Markdown rendering, and clearer explanations
when a request hits a safety block. It also adds GPT-6.1 Terra to the bundled, Vertex
AI, and Amazon Bedrock model catalogs and two small commands for queues and diagnostics.

## Key points

- **Transcript selection:** select by word, line, or page from the keyboard, with search
  built in; the shortcuts are configurable.
- **Markdown:** rendered the same way in async questions, choices, answers, and
  transcript replies.
- **Models:** GPT-6.1 Terra appears in the bundled, Vertex AI, and Bedrock catalogs.
- **`codex queue --resume`:** resumes unloaded threads after you queue a message to them.
- **Safety blocks:** the TUI explains why a request was blocked and offers safer
  follow-up prompts to pick from.
- **`codex doctor --network-only`:** checks only configuration, connectivity, and
  WebSocket. Useful behind proxies.
- Update with `npm i -g @openai/codex` or `brew upgrade codex`.

## Why it matters

Mostly quality of life. Copying from and searching long transcripts in the terminal was
awkward before, and `doctor --network-only` makes proxy problems quicker to diagnose.
