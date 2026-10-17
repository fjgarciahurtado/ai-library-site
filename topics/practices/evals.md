---
title: "Evaluating LLM applications"
tags: [evals, prompting, agents]
related: [practices/prompting, agents/agent-patterns]
last_reviewed: 2026-10-16
---

## Overview

An eval is a repeatable test of how well a model, prompt, or agent does a task. Without
evals, changes to prompts, models, or tools are guesswork. Public benchmarks compare
models in general; your own evals tell you what works for your use case.

## Key concepts

- **Eval set:** realistic inputs, ideally drawn from real usage, including hard and edge cases.
- **Grading methods:**
  - *Code-based:* exact match, regex, tests passing, valid JSON. Cheap and reliable.
  - *LLM-as-judge:* a model scores outputs against a rubric. Flexible; check it against
    human judgement.
  - *Human review:* slowest; the reference for subjective quality.
- **Agent evals:** judge the final outcome (did the tests pass, was the task done) more
  than the exact path; read transcripts to understand failures.
- **Train / test split:** keep a held-out set so prompt tuning does not overfit.
- **Variance:** outputs vary between runs; run each case several times.
- **Common benchmarks:** SWE-bench (coding), Terminal-Bench (command-line work), GPQA
  (science), tau-bench (tool-using agents), OSWorld (computer use), Humanity's Last
  Exam. Benchmarks saturate and leak into training data, so treat them as rough guides.
- **Limits of capability evals:** dangerous-capability evals try to elicit what a model
  can do. A 2026 paper shows a developer can hide an arbitrary capability behind a
  cryptographic trigger so that fine-tuning, weight noise, and trigger search cannot
  surface it. Evals measure what a model shows, not what it can do.
- **Third-party evaluator access:** external evaluators are only as useful as their
  access and their freedom to publish. Anthropic's 2026 scheme defines three tiers:
  (1) narrow access with lab approval to publish; (2) broader information and
  publication without approval, subject to fixed redaction categories; (3)
  "employee-like" internal access plus the same publication rights.

## How to use it

1. Start small: 20–50 real cases are enough to catch big regressions.
2. Automate grading wherever possible.
3. Run the eval on every prompt, model, or tool change.
4. Track cost and latency alongside quality.

## Current state

- **2026-10-15:** Anthropic embedded a six-person METR team with employee-like access
  (Tier 3). Anthropic cannot veto publication, only redact customer data, privileged
  legal material, and architecture details. SecureBio (Tier 2-style review of the CBRN
  chapter), Accenture, Faculty, and Hugging Face are at earlier stages.
- **2026-10-13:** "AI Models Can Provably Hide Arbitrary Capabilities" (arXiv, 2026-10-09)
  embeds encrypted networks in model weights that run only on a secret trigger. A
  proof-of-concept on a CBRN proxy task resisted four elicitation methods; the authors
  released the models for defence research.
- **2026-10-04:** Agentic benchmarks (long coding tasks, computer use, multi-hour work)
  have replaced static quizzes as the headline comparisons for frontier models.

## Open questions

- How to evaluate multi-hour autonomous agent runs affordably.
- Will other frontier labs give evaluators comparable (Tier 3) access? None had
  announced it as of 2026-10-16.

## Sources

- [Building effective agents](../../sources/2026/10/2026-10-04-building-effective-agents.md)
- [AI Models Can Provably Hide Arbitrary Capabilities](../../sources/2026/10/2026-10-13-ai-models-hide-capabilities.md)
- [An update on independent evaluators](../../sources/2026/10/2026-10-16-anthropic-independent-evaluators-update.md)
