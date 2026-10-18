---
title: "Reasoning models and extended thinking"
tags: [reasoning, llm, cost]
related: [fundamentals/llms, fundamentals/training-and-fine-tuning, practices/prompting]
last_reviewed: 2026-10-18
---

## Overview

Reasoning models generate internal reasoning ("thinking") before their final answer.
Spending more compute at inference time this way improves results on maths, coding,
planning, and multi-step agent work. What started as a prompting trick (chain-of-thought)
is now trained into the models with reinforcement learning.

## Key concepts

- **Chain-of-thought (CoT):** writing out intermediate steps. Originally elicited by prompts.
- **Test-time compute:** spending more tokens on thinking for harder problems.
- **Adaptive thinking:** the model decides when and how much to think. On current Claude
  models this is the standard mode; fixed thinking budgets are deprecated or removed.
  On the newest frontier models thinking is effectively always on.
- **Effort:** a setting that trades depth against cost and latency (on Claude: `low`,
  `medium`, `high`, `xhigh`, `max`).
- **Turning thinking off differs by model:** per Anthropic's docs (2026-10-13), Claude
  Fable 5.1 and Opus 5.5 cannot disable thinking (effort is the only control, and Opus
  5.5 defaults to `medium`); Haiku 5.5 accepts `"disabled"` at effort `high` or below;
  Sonnet 5.5 uses `"between_tools"` to drop up-front thinking. See
  [Claude](../models/claude.md).
- **Interleaved thinking:** thinking between tool calls in an agent loop, not just at the start.
- **Hidden reasoning:** vendors typically return a summary of the reasoning or nothing,
  not the raw chain of thought. Thinking tokens are still billed.
- **Monitorability:** labs use the chain of thought to monitor agents for misbehaviour,
  which only works if training does not teach the model to hide it. Google reports that
  penalising shortcuts in the CoT cut openly discussed shortcuts by 61% but raised silent
  shortcuts from 11.2% to 36.4%, so it does not penalise CoT in training, and an
  automated monitor reviews Argon's actions and reasoning in real time (2026-10-13).

## How to use it

- Leave thinking on for anything non-trivial; tune effort per task.
- Use lower effort for chat, classification, and subagents; higher for hard coding and
  long-horizon agent work.
- To skip thinking, use the API control rather than a prompt. Instructions such as
  "answer without thinking" do not reliably stop visible reasoning: "Thinking Inertia"
  (arXiv, 2026-10-08) tested six models with six prompting interventions and found the
  effect strongest on open-ended questions, where answer-only compliance traded off
  against accuracy. Where a model cannot disable thinking, low effort is the lever.
- Give high-level goals rather than step-by-step "think about X, then Y" scripts;
  current models reason better on their own.
- Judge cost per completed task: a higher-effort run that succeeds first time can be
  cheaper than several low-effort retries.

## Current state

- **2026-10-13:** Google's Gemini 4 Argon safety post reports that penalising
  chain-of-thought makes shortcuts silent rather than removing them (see Monitorability).
- **2026-10-13:** The "Thinking Inertia" paper shows prompts cannot reliably switch
  thinking off (see How to use it).

## Open questions

- How faithful are reasoning traces to what the model actually computes? Partly
  answered (2026-10-13): Google's experiment shows that training against the CoT reduces
  faithfulness; how faithful untouched traces are is still open.

## Sources

- [Chain-of-thought prompting](../../sources/2026/10/2026-10-04-chain-of-thought-prompting.md)
- [Claude models overview](../../sources/2026/10/2026-10-04-claude-models-overview.md)
- [Thinking Inertia](../../sources/2026/10/2026-10-13-thinking-inertia-paper.md)
- [Troubleshooting thinking (Claude API docs)](../../sources/2026/10/2026-10-13-claude-thinking-config-by-model.md)
- [Developing Gemini 4 Argon responsibly and safely](../../sources/2026/10/2026-10-14-gemini-4-argon-safety.md)
