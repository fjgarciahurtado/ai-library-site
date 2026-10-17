---
title: "Introducing Timestral"
url: https://mistral.ai/news/timestral/
archived:
type: release
author: Mistral AI
date_published: 2026-10-15
date_added: 2026-10-16
tags: [mistral, open-source, research]
topics: [models/open-weight]
---

## Summary

Timestral is Mistral's first family of time-series foundation models. They produce
probabilistic, multivariate forecasts zero-shot, using past-only and known-future
covariates. There are four sizes (5M, 28M, 123M, 209M parameters) under a Modified MIT
licence, with weights on Hugging Face and code on GitHub.

## Key points

- Context of 32,768 time steps; outputs 21 quantiles.
- The 209M model ranks first among pre-trained zero-shot models on GIFT-Eval, TIME, and
  fev-bench across all five metrics, according to Mistral. It uses a single checkpoint,
  with no ensembling. Exact scores appear only in charts.
- Mistral says the 28M model beats Chronos-2 (about four times larger) on GIFT-Eval and
  TIME, and the 209M model beats TimesFM-3 and Falcon-2.0 with fewer parameters.
- Runs on CPU: a one-day forecast from three weeks of 15-minute data takes about 10 ms
  (5M) to 140 ms (209M) on an 8-thread server CPU.
- Technique: "Decoupled Horizon Forecasting", covariate-aware attention, synthetic-first
  pre-training, then post-training on real and synthetic data at 4x longer context;
  pinball loss over the quantiles.
- Fine-tuning and custom training are offered through Mistral Forge, with on-premises,
  VPC, and air-gapped deployment. No API pricing is given.

## Why it matters

Foundation models are spreading beyond text and images to numeric forecasting. Small
open models that run on a CPU make zero-shot forecasting cheap enough to try before
building a custom model. The benchmark claims are Mistral's own.
