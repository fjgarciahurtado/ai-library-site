---
title: "ReAct: Synergizing Reasoning and Acting in Language Models"
url: https://arxiv.org/abs/2210.03629
archived:
type: paper
author: Yao et al. (Princeton, Google Research)
date_published: 2022-10-06
date_added: 2026-10-04
tags: [agents, tool-use, reasoning, research]
topics: [agents/agent-patterns, agents/tool-use]
---

## Summary

Shows that interleaving reasoning traces ("thought") with actions (tool calls) and
observations lets a language model solve tasks more reliably than reasoning alone or
acting alone.

## Key points

- Loop: think, act, observe, repeat until done.
- Reasoning helps plan and recover from errors; actions ground the model in real data.
- Reduces hallucination on knowledge tasks compared with chain-of-thought alone.

## Why it matters

The think-act-observe loop is the basic shape of almost every modern agent, including
tool-use loops in vendor APIs.
