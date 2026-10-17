---
title: "LoRA: Low-Rank Adaptation of Large Language Models"
url: https://arxiv.org/abs/2106.09685
archived:
type: paper
author: Hu et al. (Microsoft)
date_published: 2021-06-17
date_added: 2026-10-04
tags: [fine-tuning, training, research]
topics: [fundamentals/training-and-fine-tuning]
---

## Summary

Freezes the pre-trained weights and trains small low-rank matrices added to each layer,
cutting trainable parameters by orders of magnitude with quality comparable to full
fine-tuning.

## Key points

- Up to 10,000x fewer trainable parameters than full fine-tuning in the paper's GPT-3 tests.
- No extra inference latency once the adapter is merged into the weights.
- Many adapters can share one base model.

## Why it matters

The default way to fine-tune open-weight models on modest hardware; QLoRA and most
fine-tuning tools build on it.
