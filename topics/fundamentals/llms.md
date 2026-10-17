---
title: "Large language models"
tags: [llm, training]
related: [fundamentals/transformers, fundamentals/tokens-and-context, fundamentals/training-and-fine-tuning, fundamentals/reasoning-models]
last_reviewed: 2026-10-04
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
  top-p). Several current models fix these settings and no longer let callers change them.
- **Hallucination:** fluent but false output; reduced by grounding (see [RAG](rag.md)),
  tools, and better training, but never fully eliminated.
- **Knowledge cutoff:** the date after which the model has no training data.

## How to use it

- Use an API or chat app for closed models; run open-weight models locally or on a host.
- Give clear instructions and enough context; see [prompting](../practices/prompting.md).
- Ground answers in documents or tool results when facts matter.
- Measure quality on your own tasks; see [evals](../practices/evals.md).

## Current state

- **2026-10-04:** Frontier families are Claude (Anthropic), GPT-6 (OpenAI), and Gemini
  (Google), with 1M-token context windows now common. Leading open-weight families include
  Qwen, DeepSeek, Llama, Mistral, and Gemma. See [models](../models/).

## Open questions

- How far will scaling post-training and test-time compute keep improving results?
- How to make models reliably say "I don't know" instead of guessing.

## Sources

- [Attention Is All You Need](../../sources/2026/10/2026-10-04-attention-is-all-you-need.md)
- [InstructGPT: training with human feedback](../../sources/2026/10/2026-10-04-instructgpt-rlhf.md)
