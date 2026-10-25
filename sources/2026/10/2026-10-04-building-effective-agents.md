---
title: "Building effective agents"
url: https://www.anthropic.com/research/building-effective-agents
archived:
type: article
author: Anthropic
date_published: 2024-12-19
date_added: 2026-10-04
tags: [agents, multi-agent, anthropic]
topics: [agents/agent-patterns]
---

## Summary

Anthropic's guide to agentic systems, based on work with customers. It separates
workflows (LLMs and tools on predefined code paths) from agents (LLMs directing their
own process) and recommends the simplest pattern that works.

## Key points

- Building block: an LLM augmented with retrieval, tools, and memory.
- Workflow patterns: prompt chaining, routing, parallelisation, orchestrator-workers,
  evaluator-optimiser.
- Agents fit open-ended problems where the steps cannot be predicted.
- Invest in tool design and documentation as much as in prompts.
- Frameworks help start quickly but can hide prompts and responses; understand the layer.

## Why it matters

A widely cited vocabulary for agent architectures and a sound default: start simple.
