---
title: "Training and fine-tuning"
tags: [training, fine-tuning, llm]
related: [fundamentals/llms, fundamentals/reasoning-models, models/open-weight]
last_reviewed: 2026-10-15
---

## Overview

LLMs are built in stages. Pre-training gives broad knowledge and language skill;
post-training turns the result into a helpful, safe assistant. Fine-tuning adapts a
trained model further for a specific task, style, or domain.

## Key concepts

- **Pre-training:** next-token prediction on trillions of tokens. Extremely expensive;
  only large labs do it.
- **Supervised fine-tuning (SFT):** training on example prompts and ideal responses.
- **RLHF:** a reward model trained on human preference rankings guides reinforcement
  learning. Introduced at scale by InstructGPT.
- **RLAIF and constitutional methods:** AI feedback guided by written principles replaces
  much of the human labelling.
- **DPO and related methods:** learn directly from preference pairs without a separate
  reward model or RL loop.
- **RL with verifiable rewards:** reinforcement learning on tasks with checkable answers
  (maths, code tests). The main driver of [reasoning models](reasoning-models.md).
- **Distillation:** training a smaller model to imitate a larger one.
- **LoRA / QLoRA:** parameter-efficient fine-tuning that trains small adapter matrices
  (QLoRA on a quantised base), so fine-tuning fits on one GPU.
- **Quantisation:** storing weights in fewer bits (8, 4, or less) to cut memory and cost,
  with some quality loss.

## How to use it

Try these in order before fine-tuning:

1. Better prompts and examples ([prompting](../practices/prompting.md)).
2. Retrieval for knowledge ([RAG](rag.md)).
3. Tools, [skills](../tooling/skills.md), or a larger model.

Fine-tune when you need a consistent format or style at high volume, a smaller and
cheaper model for a narrow task, or behaviour that prompting cannot reach. Closed models
offer limited or no fine-tuning; open-weight models can be fine-tuned freely with LoRA.

A common pattern for private, high-volume classification is a cascade: a cheap
classifier screens everything, and only flagged items go to a small fine-tuned model,
which can run on the user's device so the data never leaves it. Google and Singapore's
scam detector (fine-tuned Gemma, announced 2026-10-14) is an example.

## Current state

- **2026-10-14:** Google DeepMind and Singapore's government fine-tuned a lightweight
  Gemma model on anonymised local scam conversations for on-device scam detection. No
  accuracy figures, model size, or fine-tuning method were published; rollout into apps
  will be phased.
- **2026-10-13:** Managed fine-tuning is spreading beyond language models: Physical
  Intelligence opened a waitlisted API beta to fine-tune its robot foundation models on
  customers' own demonstration data and serve them through hosted inference (no prices
  published).
- **2026-10-04:** Most capability gains now come from post-training, especially RL on
  verifiable tasks and agentic environments, rather than from pre-training scale alone.

## Open questions

- How well do RL gains on maths and code transfer to open-ended tasks?

## Sources

- [InstructGPT: training with human feedback](../../sources/2026/10/2026-10-04-instructgpt-rlhf.md)
- [LoRA](../../sources/2026/10/2026-10-04-lora-low-rank-adaptation.md)
- [Physical Intelligence API Beta](../../sources/2026/10/2026-10-14-physical-intelligence-api-beta.md)
- [On-device scam detection with a fine-tuned Gemma](../../sources/2026/10/2026-10-15-gemma-on-device-scam-detection.md)
