---
title: "Troubleshooting thinking (Claude API docs)"
url: https://platform.claude.com/docs/en/build-with-claude/thinking-troubleshooting
archived:
type: docs
author: Anthropic
date_published:
date_added: 2026-10-13
tags: [anthropic, reasoning, llm]
topics: [models/claude, fundamentals/reasoning-models]
---

## Summary

Anthropic's troubleshooting page for thinking. It opens with a per-model table of which
`thinking.type` values each Claude model supports, its default, and which values return
a 400 error, then explains the common thinking-related errors. No publication date is
shown; content as read on 2026-10-13.

## Key points

- **Always on (cannot disable):** Fable 5.1, Fable 5, Opus 5.5, Mythos 5.1, Mythos 5,
  and Mythos Preview. Sending `"disabled"` returns a 400; use `display: "omitted"` to
  hide thinking text instead.
- **On by default, can be turned off:** Opus 5 and Haiku 5.5 accept
  `thinking: {type: "disabled"}`, but only at effort `high` or below; `xhigh` or `max`
  with thinking disabled returns a 400. On Haiku 5.5, changing effort per message while
  thinking is disabled also fails. Sonnet 5 also accepts `"disabled"`.
- **Sonnet 5.5** rejects `"disabled"` and instead takes `thinking: {type:
  "between_tools"}` (no up-front thinking; short updates between tool calls), at effort
  `high` or below.
- Off by default: Opus 4.8 and 4.7 (adaptive only), Opus 4.6 and Sonnet 4.6 (adaptive or
  deprecated extended). Claude 4.5 models support only extended thinking with
  `budget_tokens`; 4.7 and later reject `"enabled"`.
- Replayed thinking blocks on Fable 5.1, Opus 5.5, Sonnet 5.5, and Haiku 5.5 are bound to
  an unchanged prefix (system, tools, earlier messages); enforced for accounts created
  on or after 2026-08-31.
- Opus 5 with thinking disabled can leak tool calls or XML tags into text output;
  Anthropic recommends keeping thinking on and lowering effort instead.

## Why it matters

The table settles which Claude models can run without thinking. Among current models,
Haiku 5.5 is the only one where a plain `"disabled"` works, which matters for
low-latency classification and routing.
