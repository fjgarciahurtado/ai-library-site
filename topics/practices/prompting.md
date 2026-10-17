---
title: "Prompting and context engineering"
tags: [prompting, reasoning, agents]
related: [fundamentals/reasoning-models, practices/evals, agents/tool-use]
last_reviewed: 2026-10-04
---

## Overview

Prompting is writing the instructions and context a model works from. As models have
improved, the craft has moved from tricks and magic phrases toward *context engineering*:
choosing what information, tools, and examples go into the context window so the model
can do the job.

## Key concepts

- **System prompt:** role, goals, constraints, and output expectations.
- **Be explicit about the task:** what done looks like, the audience, the format.
- **Give the why:** explaining the reason behind a rule helps the model apply it sensibly.
- **Examples (few-shot):** show the desired output; vary them so the model does not copy one.
- **Structure:** separate instructions, documents, and examples clearly (headings or XML tags).
- **Long documents first, question last:** usually improves long-context answers.
- **Thinking:** let reasoning models think; do not micromanage their steps.
- **Structured outputs:** use schema-constrained output instead of "reply only in JSON".
- **Prompt chaining:** split complex jobs into steps with checks in between.
- **Outdated habits:** ALL-CAPS warnings, threats, and heavy "you MUST" language often
  make newer models over-react; assistant prefill is no longer supported on current Claude models.

## How to use it

1. Write the prompt as a brief to a capable new colleague.
2. Test on real examples, including hard and edge cases.
3. Change one thing at a time and measure with [evals](evals.md).
4. Re-check prompts when you switch to a newer model; prompts tuned for older models
   are often too prescriptive.

## Current state

- **2026-10-04:** With adaptive thinking on by default, the trend is toward shorter,
  goal-focused prompts and investment in tool descriptions and context selection.

## Open questions

- Reliable automatic prompt optimisation for agents.

## Sources

- [Chain-of-thought prompting](../../sources/2026/10/2026-10-04-chain-of-thought-prompting.md)
- [Claude models overview](../../sources/2026/10/2026-10-04-claude-models-overview.md)
