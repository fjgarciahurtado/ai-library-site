---
title: "Tokens and context windows"
tags: [tokens, llm, cost]
related: [fundamentals/llms, practices/cost-and-caching, agents/memory]
last_reviewed: 2026-10-11
---

## Overview

Models read and write tokens, not characters or words. A tokenizer splits text into
sub-word pieces from a fixed vocabulary. Everything about using an LLM is measured in
tokens: price, speed, rate limits, and how much fits in the context window.

## Key concepts

- **Tokenizer:** maps text to token IDs. Each model family has its own, so the same text
  can be a different number of tokens on different models (even between versions of
  one family).
- **Rule of thumb:** about 3–4 characters or 0.75 words per token in English; code,
  non-English text, and unusual formatting use more.
- **Context window:** maximum tokens the model can consider in one request, input and
  output combined. 1M tokens is common on frontier models in 2026.
- **Max output tokens:** a separate, smaller cap on the response length.
- **Context rot:** quality can fall as context fills with irrelevant material, even well
  below the limit. More context is not automatically better.
- **Input vs output pricing:** output tokens usually cost about 5x input tokens.
- **Cached input:** reused prefixes are billed at a fraction of normal input price.
- **Thinking tokens:** reasoning models bill their internal reasoning as output tokens.

## How to use it

- Count tokens with the provider's tool (for Claude, the `count_tokens` endpoint), not by
  guessing or with another vendor's tokenizer.
- Put stable content first and enable caching; see [cost and caching](../practices/cost-and-caching.md).
- For long-running agents, manage context: clear old tool results, summarise (compaction),
  or move facts to external [memory](../agents/memory.md).
- Retrieve only the relevant documents instead of including everything; see [RAG](rag.md).

- On the Claude API, server-side compaction and context editing (beta) manage long
  conversations.
- **Long-context pricing:** a large window does not mean a flat price. Some providers
  charge more per token once a prompt passes a threshold (OpenAI: 272K input tokens;
  Claude Haiku 5.5: 100K; Gemini Pro models: 200K).

Limits of current frontier models (as of 2026-10-08):

| Models | Context | Max output |
|---|---|---|
| Claude Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5 | 1M | 128K |
| OpenAI GPT-6 Astra, 6.1 Sol, Luna | 1.05M | 128K |
| Google Gemini 3.8 Flash | 1,048,576 | 65,536 |

## Current state

- **2026-10-07:** Claude Haiku 5.5 brought 1M context to Anthropic's smallest tier
  (Haiku 4.5 had 200K), but bills prompts above 100K tokens at 5x.

## Open questions

- How to measure and prevent quality loss in very long contexts.

## Sources

- [Claude models overview](../../sources/2026/10/2026-10-04-claude-models-overview.md)
- [Prompt caching docs](../../sources/2026/10/2026-10-04-claude-prompt-caching-docs.md)
- [OpenAI API models and pricing: GPT-6 family](../../sources/2026/10/2026-10-06-openai-gpt-6-models-and-pricing.md)
- [Gemini 3.8 Flash model page and pricing](../../sources/2026/10/2026-10-06-gemini-3-8-flash-model-page.md)
- [Gemini Developer API pricing](../../sources/2026/10/2026-10-07-gemini-api-pricing.md)
- [Claude Haiku 5.5](../../sources/2026/10/2026-10-08-claude-haiku-5-5.md)
