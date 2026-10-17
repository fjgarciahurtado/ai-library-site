---
title: "Thinking Inertia: LLMs Keep Thinking When Told Not To"
url: https://arxiv.org/abs/2610.11765
archived:
type: paper
author: Dianqiao Lei, Kevin Qinghong Lin, Pan Lu, Philip Torr, James Zou
date_published: 2026-10-08
date_added: 2026-10-13
tags: [research, reasoning, prompting]
topics: [fundamentals/reasoning-models]
---

## Summary

A study of what happens when language models are told not to reason before answering.
The authors argue that earlier checks, such as switching off a thinking mode or
measuring trace length, do not show whether the model actually stopped reasoning. Across
six models and six prompting interventions, explicit "don't think" instructions did not
reliably stop visible reasoning. They call this "Thinking Inertia".

## Key points

- Three new measures: the share of answer-only responses, how relevant the text before
  the answer is to the question, and a judge-based rate of explicit inference.
- Tested on Boolean, multiple-choice, and open-ended questions.
- The inertia grows as the answer space opens up: it is strongest on open-ended tasks.
- Accuracy held steady on Boolean and multiple-choice tasks, but open-ended tasks showed
  a trade-off between complying with "answer only" and getting the answer right.
- The abstract gives no percentages; read the full paper for model-level results.

## Why it matters

Prompting a model to "just answer" is not a dependable way to cut reasoning tokens or
latency. Use the API's thinking and effort controls where they exist, and measure the
output rather than trusting the instruction.
