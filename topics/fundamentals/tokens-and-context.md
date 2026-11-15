---
title: "Tokens and context windows"
tags: [tokens, llm, cost]
related: [fundamentals/llms, practices/cost-and-caching, agents/memory]
last_reviewed: 2026-11-15
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
  non-English text, and unusual formatting use more. Newer tokenizers can be less
  dense: Anthropic says 1M tokens is about 555K words (2.5M characters) on the tokenizer
  introduced with Claude Opus 4.7, against about 750K words on earlier models (models
  overview, read 2026-11-15). So the same text costs more tokens on current Claude
  models than on Claude 4.6 and earlier.
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

Limits of current frontier models (as of 2026-11-15):

| Models | Context | Max output |
|---|---|---|
| Claude Fable 5.2, Opus 5.5, Sonnet 5.5, Haiku 5.5 | 1M | 128K (up to 300K on the Batch API with the `output-300k-2026-03-24` beta, except Fable) |
| OpenAI GPT-6 Astra, 6.1 Sol, 6.1 Terra, Luna | 1.05M | 128K (Terra: at most 922K input) |
| Google Gemini 4 Carbon and Argon | 1M shared by input and output | 64K by default, up to 1M with long decode |
| Google Gemini 4 Hydrogen | 1M input | up to 1M (per the announcement) |
| Google Gemini 3.8 Flash | 1,048,576 | 65,536 |

## Current state

- **2026-11-15:** Every current Claude model, Haiku 5.5 included, has a 1M context and
  128K output (Haiku 4.5 had 200K); Haiku 5.5 bills prompts above 100K tokens at 5x.
  Gemini 4 models can spend most of their 1M window on output, which no other family
  offers so far.

## Open questions

- How to measure and prevent quality loss in very long contexts.

## Sources

- [Claude models overview](../../sources/2026/10/2026-10-04-claude-models-overview.md)
- [Prompt caching docs](../../sources/2026/10/2026-10-04-claude-prompt-caching-docs.md)
- [OpenAI API models and pricing: GPT-6 family](../../sources/2026/10/2026-10-06-openai-gpt-6-models-and-pricing.md)
- [Gemini 3.8 Flash model page and pricing](../../sources/2026/10/2026-10-06-gemini-3-8-flash-model-page.md)
- [Gemini Developer API pricing](../../sources/2026/10/2026-10-07-gemini-api-pricing.md)
- [Claude Haiku 5.5](../../sources/2026/10/2026-10-08-claude-haiku-5-5.md)
- [GPT-6.1 Terra (OpenAI API model page)](../../sources/2026/10/2026-10-27-gpt-6-1-terra.md)
- [Gemini 4 Argon model page](../../sources/2026/10/2026-10-15-gemini-4-argon-model-page.md)
- [Introducing Claude Fable 5.2 and Claude Mythos 5.2](../../sources/2026/11/2026-11-10-claude-fable-mythos-5-2.md)
- [Gemini 4 Carbon is now available](../../sources/2026/11/2026-11-11-gemini-4-carbon-available.md)
- [Introducing Gemini 4 Hydrogen](../../sources/2026/11/2026-11-13-gemini-4-hydrogen.md)
