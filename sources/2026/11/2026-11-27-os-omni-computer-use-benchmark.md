---
title: "OS-Omni: benchmarking computer-use agents on long cross-platform workflows"
url: https://arxiv.org/abs/2611.34232
archived:
type: paper
author: Hui Shen, Yunta Hsieh, Jianing Ma, et al. (Touchstone AI and others)
date_published: 2026-11-26
date_added: 2026-11-27
tags: [evals, computer-use, agents, research]
topics: [practices/evals, agents/agent-patterns]
---

## Summary

OS-Omni is a benchmark of 300 long computer-use tasks across Windows, Ubuntu, macOS,
iOS, Android, and the web, including workflows that span a desktop and a phone. Tasks
are graded on the final state of the environment, not on how closely the agent's steps
match a reference. The best agent, Claude Opus 5.5, reaches 68.5% against a human
baseline of 77.3%. Figures come from the first part of the arXiv HTML (v1); the paper's
appendix was not read.

## Key points

- **Size:** 48 tasks per platform for six platforms (288) plus 12 cross-platform
  workflows that pair Ubuntu or Windows with an Android phone mirrored through scrcpy.
- **Length:** humans need on average 67.5 steps and about 201 seconds per task, versus
  15 steps and 112 seconds for OSWorld, so the tasks are roughly four times longer.
- **Grading:** checkers parse output files, inspect app databases, and query device
  state. The main setting gives agents screenshots only.
- **Budgets:** up to 300 steps per single-platform task and up to 650 for cross-platform
  ones, with per-step timeouts of 120–180 seconds.
- **Results (nine models):** Claude Opus 5.5 has the best macro-average (68.5%);
  GPT-6 Astra has the best micro-average (67.0% versus 66.7%). Humans score 77.3% macro.
- **Uneven by platform:** frontier models beat humans on Linux, but the best results on
  iOS (41.7%) and macOS (54.2%) are 33.5 and 25.6 points below humans.
- About 70 authors from industry and universities; one OpenAI employee contributed in a
  personal capacity.

## Why it matters

It is a concrete, reproducible answer to "how do we evaluate long-horizon agents": long
tasks, many platforms, and state-based grading. It also shows that "computer use is near
human level" holds on Linux but not on Apple platforms.
