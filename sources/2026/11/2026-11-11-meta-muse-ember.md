---
title: "Muse Ember"
url: https://research.meta.ai/blog/muse-ember
archived:
type: article
author: Meta
date_published: 2026-11-09
date_added: 2026-11-11
tags: [meta, llm, agents, coding-agents, cost]
topics: [models/open-weight]
---

## Summary

Muse Ember (`muse-ember-1.0`) is Meta's smallest and cheapest Muse model, released on
2026-11-09 for agent sub-work: tool calls, coding subtasks, routing, extraction, and
long-document parsing. It is the first model trained with Muse Wonder Full. It is
API-only: Meta Model API (including a Responses-style API), Muse Code, Google Cloud,
and Oracle Cloud. The page does not mention open weights or a licence.

## Key points

- 1M-token context, up to 512K output tokens; text, image, audio, and video input;
  reasoning levels medium, high, xhigh, and max.
- Price per 1M tokens: $0.10 input, $0.004 cached input, $0.50 output for prompts up to
  200K; $0.30 / $0.012 / $1.50 above 200K.
- Meta's figures at max reasoning, against GPT-6 Luna and Claude Haiku 5.5:
  Terminal-Bench 4.0 40.9% (39.2%, 16.4%), OSWorld 2.1 69.5% (68.9%, 50.5%),
  AutomationBench-AA 37.8% (20.2%, 13.9%); behind Haiku 5.5 on FrontierCode 2.0-AA
  (27.2% vs 34.9%). Artificial Analysis Intelligence Index 36, against 37 for Muse
  Spark 1.3 at about 17 times the cost per task.
- Safety: below high-risk thresholds in Meta's scaling framework for the categories
  tested; tested for following user intent and resisting injected instructions.

## Why it matters

A low-cost sub-agent model with a 1M context, priced like Claude Haiku 5.5's lowest
tier, gives another option for the cheap worker model in planner/worker setups. The
benchmarks come from Meta and have not been independently checked.
