---
title: "Training language models to follow instructions with human feedback"
url: https://arxiv.org/abs/2203.02155
archived:
type: paper
author: Ouyang et al. (OpenAI)
date_published: 2022-03-04
date_added: 2026-10-04
tags: [training, safety, research]
topics: [fundamentals/training-and-fine-tuning]
---

## Summary

Describes InstructGPT: a pre-trained model fine-tuned on human demonstrations, then
optimised with reinforcement learning from human feedback (RLHF) using a reward model
trained on human rankings of outputs.

## Key points

- Three stages: supervised fine-tuning, reward model training, RL optimisation (PPO).
- A 1.3B InstructGPT model was preferred by raters over the 175B base GPT-3.
- Alignment training improves helpfulness and truthfulness at small cost to benchmarks.

## Why it matters

Established the post-training recipe behind chat assistants; later methods (RLAIF,
constitutional training, DPO, RL with verifiable rewards) build on or replace parts of it.
