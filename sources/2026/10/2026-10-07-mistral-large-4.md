---
title: "Introducing Mistral Large 4"
url: https://mistral.ai/news/mistral-large-4/
archived:
type: release
author: Mistral AI
date_published: 2026-10-06
date_added: 2026-10-07
tags: [mistral, llm, open-source, reasoning, multimodal]
topics: [models/open-weight]
---

## Summary

Mistral AI announced Mistral Large 4, a 1-trillion-parameter mixture-of-experts model with
49B active parameters. It is a single hybrid model for instruction following, reasoning,
and agentic work, and takes text and image input. It is in public preview on Mistral
Studio and the API now; Mistral says open weights will follow at the end of October 2026.

## Key points

- 1T total / 49B active parameters (MoE), "natively multimodal".
- Trained on 3,800 NVIDIA Grace Blackwell GPUs in Mistral's European datacenters, on
  data covering 160+ languages, including all official EU languages.
- API model ID `mistral-large-4-0`; preview prices $1.36 input / $4.18 output per 1M tokens
  (as of 2026-10-06).
- Reasoning is selectable per request; Simon Willison reports two API levels, `none`
  and `high`.
- Mistral's own benchmark claims: 93% on Cybench, 61.7% on DeepSWE 1.1, 28.3% on
  Terminal-Bench 4.0, 59.9% on AutomationBench. Simon Willison reports an Artificial
  Analysis index of 38, just behind DeepSeek-V4.1-Flash and far above Mistral Large 3 (9).
- The announcement does not state the context window or the licence for the weights.

## Why it matters

If the weights ship as promised, this is the largest open-weight model from a Western lab
and Mistral's first trillion-parameter model. It is a step up from Mistral Large 3
(~675B / 41B). Licence and context length are still unknown.
