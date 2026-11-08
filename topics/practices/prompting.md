---
title: "Prompting and context engineering"
tags: [prompting, reasoning, agents]
related: [fundamentals/reasoning-models, practices/evals, agents/tool-use]
last_reviewed: 2026-11-08
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
- **Thinking:** let reasoning models think; do not micromanage their steps. Depth is now
  set with an effort parameter rather than with prompt wording: Claude's
  `output_config.effort` (`low` to `max`), OpenAI's reasoning effort (`none` to `max` on
  GPT-6.1 Terra), and Gemini's thinking levels (as of 2026-11-08; see
  [reasoning models](../fundamentals/reasoning-models.md)).
- **Instructions replace sampling knobs:** Claude API version `2026-10-21` rejects
  `temperature`, `top_p`, and `top_k`, and Gemini 2.5 traffic routed to newer models
  loses them from 2026-12-01, so tone and variety have to be asked for in the prompt.
- **Cache-friendly prompts:** put stable content (tools, system prompt, documents) first
  and per-request data last, so the prefix can be cached (see
  [cost and caching](cost-and-caching.md)).
- **Structured outputs:** use schema-constrained output instead of "reply only in JSON".
- **Prompt chaining:** split complex jobs into steps with checks in between.
- **Outdated habits:** ALL-CAPS warnings, threats, and heavy "you MUST" language often
  make newer models over-react. Assistant prefill is no longer supported on current
  Claude models, and Gemini's newer models also reject prefilled model turns (as of
  2026-11-03); use structured outputs or instructions instead. Forced `tool_choice` is
  rejected by Claude Fable 5.1, Opus 5.5, and Sonnet 5.5 (see
  [tool use](../agents/tool-use.md)).

## How to use it

1. Write the prompt as a brief to a capable new colleague.
2. Test on real examples, including hard and edge cases.
3. Change one thing at a time and measure with [evals](evals.md).
4. Re-check prompts when you switch to a newer model; prompts tuned for older models
   are often too prescriptive.

## Current state

- **2026-11-08:** With adaptive thinking on by default, the trend is toward shorter,
  goal-focused prompts and investment in tool descriptions and context selection.
  Providers keep removing prompt-level controls (prefill, sampling parameters), so more
  of the steering moves into instructions, effort settings, and schemas.
- **2026-09-25:** Automatic prompt optimisation is moving into frameworks: DSPy's GEPA
  optimiser can change program structure as well as prompts (see
  [framework landscape](../frameworks/landscape.md)).

## Open questions

- Reliable automatic prompt optimisation for agents. DSPy's GEPA is the main framework
  option; no independent comparison of optimisers on agent tasks is in the library yet
  (checked 2026-11-08).

## Sources

- [Chain-of-thought prompting](../../sources/2026/10/2026-10-04-chain-of-thought-prompting.md)
- [Claude models overview](../../sources/2026/10/2026-10-04-claude-models-overview.md)
- [Prompt caching docs](../../sources/2026/10/2026-10-04-claude-prompt-caching-docs.md)
- [DSPy 3.4.0 release notes](../../sources/2026/10/2026-10-12-dspy-3-4-release.md)
- [Troubleshooting thinking (Claude API docs)](../../sources/2026/10/2026-10-13-claude-thinking-config-by-model.md)
- [Migrating to API version 2026-10-21](../../sources/2026/10/2026-10-22-claude-api-version-2026-10-21.md)
- [GPT-6.1 Terra (OpenAI API model page)](../../sources/2026/10/2026-10-27-gpt-6-1-terra.md)
- [Gemini API changelog: Gemini 2.5 Pro and 2.5 Flash deprecated](../../sources/2026/11/2026-11-03-gemini-2-5-pro-flash-deprecation.md)
