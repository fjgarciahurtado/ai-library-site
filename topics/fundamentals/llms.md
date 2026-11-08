---
title: "Large language models"
tags: [llm, training]
related: [fundamentals/transformers, fundamentals/tokens-and-context, fundamentals/training-and-fine-tuning, fundamentals/reasoning-models]
last_reviewed: 2026-11-08
---

## Overview

A large language model (LLM) is a neural network trained to predict the next token in a
sequence of text. Trained on a huge corpus and then tuned to follow instructions, that
one skill turns into general abilities: answering questions, writing and editing code,
summarising, translating, planning, and using tools.

Modern LLMs are decoder-only [transformers](transformers.md) with billions to trillions
of parameters. Frontier models also take images, audio, or video as input, and many
can "think" before answering (see [reasoning models](reasoning-models.md)).

## Key concepts

- **Token:** the unit of text the model reads and writes; roughly 3–4 characters of
  English. See [tokens and context](tokens-and-context.md).
- **Context window:** the maximum tokens (input plus output) the model can attend to at once.
- **Parameters / weights:** the learned numbers in the network. Open-weight models
  publish them; closed models are reachable only through an API.
- **Pre-training:** next-token prediction over a large text corpus; gives broad knowledge.
- **Post-training:** instruction tuning and reinforcement learning that make the model
  helpful, safe, and good at tasks. See [training and fine-tuning](training-and-fine-tuning.md).
- **Inference:** running the model to generate output, one token at a time.
- **Sampling:** choosing each next token from the predicted distribution (temperature,
  top-p). Providers are removing these controls: Claude API version `2026-10-21` rejects
  `temperature`, `top_p`, and `top_k` on every model, and Gemini's newer models drop
  sampling parameters too (as of 2026-11-03; see [Claude](../models/claude.md) and
  [Gemini](../models/gemini.md)). Steer output with instructions and schemas instead.
- **Hallucination:** fluent but false output; reduced by grounding (see [RAG](rag.md)),
  tools, and better training, but never fully eliminated.
- **Knowledge cutoff:** the date after which the model has no training data.

## How to use it

- Use an API or chat app for closed models; run open-weight models locally or on a host.
- Give clear instructions and enough context; see [prompting](../practices/prompting.md).
- Ground answers in documents or tool results when facts matter.
- Measure quality on your own tasks; see [evals](../practices/evals.md).

## Current state

- **2026-11-08:** Frontier families are Claude (Anthropic; Fable 5.1, Opus 5.5, Sonnet
  5.5, Haiku 5.5), GPT-6 (OpenAI; Astra, 6.1 Sol, 6.1 Terra, Luna), and Gemini (Google;
  Gemini 4 Argon and 3.8 Flash). About 1M-token context windows are standard at the top:
  1M on all current Claude models, 1.05M on GPT-6, and 1M shared input and output on
  Argon. Leading open-weight families include Qwen, DeepSeek, Llama, Mistral, Gemma,
  Kimi, and GLM. See [Claude](../models/claude.md), [GPT](../models/gpt.md),
  [Gemini](../models/gemini.md), and [open-weight models](../models/open-weight.md).
- **2026-11-08:** Knowledge cutoffs of current frontier models fall in April to June
  2026 (Claude 5.5-generation: June 2026; GPT-6 Astra and 6.1 Sol: 2026-04-30; GPT-6.1
  Terra: 2026-06-01), so tools such as web search matter for anything newer.

## Open questions

- How far will scaling post-training and test-time compute keep improving results?
- How to make models reliably say "I don't know" instead of guessing.

## Sources

- [Attention Is All You Need](../../sources/2026/10/2026-10-04-attention-is-all-you-need.md)
- [InstructGPT: training with human feedback](../../sources/2026/10/2026-10-04-instructgpt-rlhf.md)
- [Claude models overview](../../sources/2026/10/2026-10-04-claude-models-overview.md)
- [OpenAI API models and pricing: GPT-6 family](../../sources/2026/10/2026-10-06-openai-gpt-6-models-and-pricing.md)
- [GPT-6.1 Terra (OpenAI API model page)](../../sources/2026/10/2026-10-27-gpt-6-1-terra.md)
- [Gemini 4 Argon model page](../../sources/2026/10/2026-10-15-gemini-4-argon-model-page.md)
- [Migrating to API version 2026-10-21](../../sources/2026/10/2026-10-22-claude-api-version-2026-10-21.md)
- [Gemini API changelog: Gemini 2.5 Pro and 2.5 Flash deprecated](../../sources/2026/11/2026-11-03-gemini-2-5-pro-flash-deprecation.md)
